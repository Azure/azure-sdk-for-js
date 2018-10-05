@azure/service-bus
================

This sdk provides a convenient way to interact with the Azure Event Hubs service.

## Pre-requisite ##
- **Node.js version: 6.x or higher.** 
- We would **still encourage you** to install the latest available LTS version at any given time from https://nodejs.org. **It is a good practice to always install the latest available LTS version of node.js.**
- Installing node.js on **Windows or macOS** is very simple with available installers on the [node.js website](https://nodejs.org). If you are using a **linux based OS**, then you can find easy to follow, one step installation instructions over [here](https://nodejs.org/en/download/package-manager/).

## Installation ##
```bash
npm install @azure/service-bus
```

## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) 
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Debug logs ##

You can set the following environment variable to get the debug logs.

- Getting debug logs from the Event Hub SDK
```bash
export DEBUG=azure*
```
- Getting debug logs from the Event Hub SDK and the protocol level library.
```bash
export DEBUG=azure*,rhea*
```
- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:
```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```
- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:
```bash
export DEBUG=azure:service-bus:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

#### Logging to a file
- Set the `DEBUG` environment variable as shown above and then run your test script as follows:
  - Logging statements from you test script go to `out.log` and logging statement from the sdk go to `debug.log`.
    ```bash
    node your-test-script.js > out.log 2>debug.log
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log` by redirecting stderr to stdout (&1), and then redirect stdout to a file:
    ```bash
    node your-test-script.js >out.log 2>&1
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log`.
    ```bash
      node your-test-script.js &> out.log
    ```

## Examples ##

Please take a look at the [examples](https://github.com/Azure/azure-service-bus-node/tree/master/client/examples) directory for detailed examples.

## AMQP Dependencies ##
It depends on [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.