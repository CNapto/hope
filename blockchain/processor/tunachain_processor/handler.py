
import logging

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction

from tunachain_processor.tunachain_payload import TunachainPayload
from tunachain_processor.tunachain_state import TunachainState
from tunachain_processor.tunachain_state import TUNACHAIN_NAMESPACE


LOGGER = logging.getLogger(__name__)


class TunachainTransactionHandler(TransactionHandler):

    @property
    def family_name(self):
        return 'transfer-chain'

    @property
    def family_versions(self):
        return ['0.0']

    @property
    def encodings(self):
        return ['application/json']

    @property
    def namespaces(self):
        return [TUNACHAIN_NAMESPACE]

    def apply(self, transaction, context):
        header = transaction.header
        signer = header.signer_public_key

        payload = TunachainPayload(transaction.payload)
        state = TunachainState(context)

        LOGGER.info('Handling transaction: %s > %s %s:: %s',
                    payload.action,
                    payload.asset,
                    '> ' + payload.owner[:8] + '... ' if payload.owner else '',
                    signer[:8] + '... ')

        if payload.action == 'create':
            _create_asset(asset=payload.asset,
                          owner=signer,
                          state=state)

        elif payload.action == 'transfer':
            _transfer_asset(asset=payload.asset,
                            owner=payload.owner,
                            signer=signer,
                            state=state)

        elif payload.action == 'accept':
            _accept_transfer(asset=payload.asset,
                             signer=signer,
                             state=state)

        elif payload.action == 'reject':
            _reject_transfer(asset=payload.asset,
                             signer=signer,
                             state=state)

        else:
            raise InvalidTransaction('Unhandled action: {}'.format(
                payload.action))


def _create_asset(asset, owner, state):
    if state.get_asset(asset) is not None:
        raise InvalidTransaction(
            'Invalid action: Asset already exists: {}'.format(asset))

    state.set_asset(asset, owner)


def _transfer_asset(asset, owner, signer, state):
    asset_data = state.get_asset(asset)
    if asset_data is None:
        raise InvalidTransaction('Asset does not exist')

    if signer != asset_data.get('owner'):
        raise InvalidTransaction('Only an Asset\'s owner may transfer it')

    state.set_transfer(asset, owner)


def _accept_transfer(asset, signer, state):
    transfer_data = state.get_transfer(asset)
    if transfer_data is None:
        raise InvalidTransaction('Asset is not being transfered')

    if signer != transfer_data.get('owner'):
        raise InvalidTransaction(
            'Transfers can only be accepted by the new owner')

    state.set_asset(asset, transfer_data.get('owner'))
    state.delete_transfer(asset)


def _reject_transfer(asset, signer, state):
    transfer_data = state.get_transfer(asset)
    if transfer_data is None:
        raise InvalidTransaction('Asset is not being transfered')

    if signer != transfer_data.get('owner'):
        raise InvalidTransaction(
            'Transfers can only be rejected by the potential new owner')

    state.delete_transfer(asset)
