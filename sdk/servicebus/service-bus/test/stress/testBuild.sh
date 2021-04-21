#!/bin/bash

set -e      # bail if any commands exit with non-zero exit codes.

if [ "$1" == "" ]; then
    echo "Usage: $ <service-bus-package-version (ex: dev|latest|specific-version)>"
    exit 1
fi

# don't forget to fill out the .env file (use sample.env as your base)
source .env

SERVICEBUS_PACKAGE_VERSION=$1

# update a temporary copy of the package.json file
NEW_PACKAGE_JSON=$(sed -e "s/service-bus\":[^,]*/service-bus\": \"$SERVICEBUS_PACKAGE_VERSION\"/" package.json)
echo "$NEW_PACKAGE_JSON" > temp.package.json

# REGISTRY_NAME and DOCKER_REPOSITORY_NAME come from the .env file
DOCKER_IMAGE_NAME="$REGISTRY_NAME/$DOCKER_REPOSITORY_NAME:$SERVICEBUS_PACKAGE_VERSION"

# build the image
docker build -t $DOCKER_IMAGE_NAME .

# login to an internal Docker registry where we'll push our image
echo $REGISTRY_PASSWORD | docker login --username=$REGISTRY_USERNAME --password-stdin $REGISTRY_NAME

# push the image
docker push "$DOCKER_IMAGE_NAME"