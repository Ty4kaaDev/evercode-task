git clone https://github.com/Ty4kaaDev/evercode-task.git

npm i

docker run -d --name postgres-container -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=taskdb -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:17

npm run rowdata

npm run start:dev || npm run start:task1 || npm run start:task2
