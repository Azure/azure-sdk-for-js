@azure/service-bus
================

This SDK provides a convenient way to interact with the Azure Service Bus.

## Status ##

This SDK is currently under development and there is no published version of this SDK in npmjs.com yet.

We are working on publishing a preview of this SDK by the end of January 2019.

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

- Getting debug logs from the Service Bus SDK
```bash
export DEBUG=azure*
```
- Getting debug logs from the Service Bus SDK and the protocol level library.
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

## Examples 

Please take a look at the [examples](https://github.com/Azure/azure-service-bus-node/tree/master/examples) directory for detailed examples.

## Building the library
- Clone the repo and cd to the repo directory
```
git clone https://github.com/azure/azure-service-bus-node.git
cd azure-service-bus-node
```
- Install typescript, ts-node globally (optional, but very useful)
```
npm i -g typescript
npm i -g ts-node
```
- NPM install from the root of the package
```
npm i
```
- Build the project
```
npm run build
```

## Run/Debug tests 

If you want to run or debug tests in this project, please see our [Test README](https://github.com/Azure/azure-service-bus-node/blob/master/test/README.md).

## AMQP Dependencies ##
It depends on [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving messages over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.
