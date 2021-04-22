#!/bin/bash

set -e      # bail if any commands exit with non-zero exit codes.

if [ "$1" == "" ] || [ "$2" == "" ]; then
    echo "Usage: $0 <scenario.js file (base-name from dist/)> <service-bus-package-version (ex: dev|latest|specific-version)>"
    exit 1
fi

# don't forget to fill out the .env file (use sample.env as your base)
set -a      # export variables from .env
source .env
set +a

# figure out the proper image name, based on the git commit
# and the state of the current clone
export SERVICEBUS_PACKAGE_VERSION=$1
export SCENARIO_JS_BASE_NAME=$2
export KUBERNETES_ENTITY="${SCENARIO_JS_BASE_NAME,,}-$SERVICEBUS_PACKAGE_VERSION"

export DOCKER_IMAGE_NAME="$REGISTRY_NAME/$DOCKER_REPOSITORY_NAME:$SERVICEBUS_PACKAGE_VERSION"
export K8S_POD_NAME="$KUBERNETES_ENTITY"
export K8S_SECRET_NAME="$KUBERNETES_ENTITY"

echo "Will deploy"
echo "  docker image:${DOCKER_IMAGE_NAME}"
echo "  to pod: ${K8S_POD_NAME}"
echo "  with secret: ${K8S_SECRET_NAME}"
echo "  running scenario ${SCENARIO_JS_BASE_NAME}"
echo "  Using your default context and namespace set in kubectl"

createKubernetesSecret() {
    echo "Creating Kubernetes secret"
    SECRET_YAML=$(envsubst < secrets.yaml)
    echo $SECRET_YAML | kubectl replace --force -f -
}

createKubernetesPod() {
    echo "Creating Kubernetes pod"
    POD_YAML=$(envsubst < pod.yaml)
    echo "$POD_YAML" | kubectl replace --force -f -
}

createKubernetesSecret
createKubernetesPod

echo "Some useful commands to monitor your pod:"
echo "  kubectl logs -f ${K8S_POD_NAME} --namespace=<your namespace>"
echo "  kubectl get pods --namespace=<your namespace>"
