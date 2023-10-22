#!/bin/bash


# echo "Running database migrations"
yarn run migrate

# echo "Seeding database"
yarn run seed

echo "Starting server"
yarn run start