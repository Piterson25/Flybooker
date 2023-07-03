#!/bin/bash

cd backend

npm install

npm start &

cd ..

cd frontend

npm install

npm start
