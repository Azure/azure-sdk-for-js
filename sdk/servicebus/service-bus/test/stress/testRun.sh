#!/bin/bash

set -e      # bail if any commands exit with non-zero exit codes.

if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Usage: $0 <scenario.js file (base-name from dist/)> <service-bus-package-version (ex: dev|latest|specific-version)>"
    exit 1
fi

# don't forget to fill out the .env file (use sample.env as your base)
source .env

# figure out the proper image name, based on the git commit
# and the state of the current clone
SERVICEBUS_PACKAGE_VERSION=$1
SCENARIO_JS_BASE_NAME=$2
KUBERNETES_ENTITY="${SCENARIO_JS_BASE_NAME,,}-$SERVICEBUS_PACKAGE_VERSION"

DOCKER_IMAGE_NAME="$REGISTRY_NAME/$DOCKER_REPOSITORY_NAME:$SERVICEBUS_PACKAGE_VERSION"
K8S_POD_NAME="$KUBERNETES_ENTITY"
K8S_SECRET_NAME="$KUBERNETES_ENTITY"

echo "Will deploy"
echo "  docker image:${DOCKER_IMAGE_NAME}"
echo "  to pod: ${K8S_POD_NAME}"
echo "  with secret: ${K8S_SECRET_NAME}"
echo "  running scenario ${SCENARIO_JS_BASE_NAME}"
echo "  Using your default context and namespace set in kubectl"

createKubernetesSecret() {
    echo "Creating Kubernetes secret"

    # create/recreate our secrets.yml
    SECRETS_YAML=$(<secrets.yml)

    # all the secrets we'll replace (marked with %value% in our secrets.yaml)
    VARIABLES_TO_INJECT="
        K8S_SECRET_NAME
        SERVICEBUS_CONNECTION_STRING
        APPINSIGHTS_INSTRUMENTATIONKEY
    "

    for name in $VARIABLES_TO_INJECT; do
        SECRETS_YAML=${SECRETS_YAML//"%$name%"/${!name}}
    done

    echo "$SECRETS_YAML" | kubectl replace --force -f -
}

createKubernetesPod() {
    echo "Creating Kubernetes pod"

    # recreate the pod
    POD_YAML=$(<pod.yaml)

    VARIABLES_TO_INJECT="
        DOCKER_IMAGE_NAME
        K8S_SECRET_NAME
        K8S_POD_NAME
        KUBERNETES_NAMESPACE
        SCENARIO_JS_BASE_NAME
    "

    for name in $VARIABLES_TO_INJECT; do
        POD_YAML=${POD_YAML//"%$name%"/${!name}}
    done

    echo "$POD_YAML" | kubectl replace --force -f -
}

createKubernetesSecret
createKubernetesPod

echo "Some useful commands to monitor your pod:"
echo "  kubectl logs -f ${K8S_POD_NAME} --namespace=<your namespace>"
echo "  kubectl get pods --namespace=<your namespace>"
