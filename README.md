## Running instructions

```sh
# install de dependencies
npm i

# up the Docker container
docker compose up -d

# run the migrations to create database tables
npx prisma migrate dev

# visualize database schema
npx prisma studio
```

### Other commands

```sh
# stop the Docker container
docker compose stop
```
