    cd call_for_code

    echo "pulling from master..."

    git pull origin master

    echo "pulled successfully..."

    echo "stopping containers..."

    docker-compose down

    echo "starting containers"

    docker-compose up --build -d

    echo "containers started"