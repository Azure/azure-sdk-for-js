#!/bin/bash

set -e      # bail if any commands exit with non-zero exit codes.

if [ "$1" == "" ]; then
    echo "Usage: $0 <service-bus-package-version (ex: dev|latest|specific-version)>"
    exit 1
fi

SERVICEBUS_PACKAGE_VERSION=$1
#./testBuild.sh $SERVICEBUS_PACKAGE_VERSION

FILES="
    scenarioBatchReceive.ts  
    scenarioLongRunning.ts   
    scenarioRenewMessageLock.ts  
    scenarioSend.ts
    scenarioCloseOpen.ts     
    scenarioPeekMessages.ts  
    scenarioRenewSessionLock.ts  
    scenarioStreamingReceive.ts
"

for tsFile in $FILES; do
    tsFile=${tsFile%.*}
    ./testRun.sh "$SERVICEBUS_PACKAGE_VERSION" "$tsFile"
done
