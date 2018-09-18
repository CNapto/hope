## IBM'S CALL FOR CODE
---

<br/>


![Alt image](./static/cfc.jpg)

<br/>
<br/>


### An application to acheive the following:

<br/>

 - [X] Internet-less chat
 - [X] Alert broadcasting 
 - [X] location sharing
 - [X] charity supply chain tracking using blockchain
 - [X] barter using blockchain
 - [X] automatic deployment server

<br/>
<br/>

### Open port list and functionality

| PORT  |   FUNCTIONALITY | ROUTE |
|---|---|---|
| 80 | Chatroom and location sharing | / |
| 80 | Alert broadcasting and location handler | /admin |
| 8008 | Sawtooth rest-api | - |
| 8000 | blockchain client | - |
| 4000 | chain validator | - |
| 6666 | automated deployment node server | POST /webhook/github | 


<br />

### NOTE

<br/>
* Go to state.js line 21 and change url accroding to your URL
* Go to bundle.js line 30014 and change url accroding to your URL