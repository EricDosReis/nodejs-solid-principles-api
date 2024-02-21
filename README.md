## Running instructions

Follow the instructions below to run the project.

```sh
# install de dependencies
npm i

# up the Docker container
npm run services:up

# run the migrations to create database tables
npx prisma migrate dev

# run the application
npm run dev
```

### Other commands

```sh
# stop the Docker container
npm run services:stop

# view database schema
npx prisma studio
```
