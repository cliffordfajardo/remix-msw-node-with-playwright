#!/bin/bash

# Build the app before serving
echo "Preparing to build app ...."
npm run build;

# Start up the app before having playwright visit it
echo "Preparing to start app ...."
npm run start & disown;

sleep 6;
echo "Preparing curl the app in order to trigger MSW mock server activation"
curl --silent --output /dev/null http://localhost:3000;