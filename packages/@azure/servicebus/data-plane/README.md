# @azure/service-bus

This library provides a convenient way to interact with [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/).

## Status

This library is currently in preview and may change prior to release.

## Pre-requisite

- **Node.js version: 6.x or higher.**

## Installation

```bash
npm install @azure/service-bus
```

TypeScript users need to install Node types:

```bash
npm install @types/node
```

And also enable `compilerOptions.esModuleInterop` in tsconfig.json.

## Examples

Please take a look at the [examples](https://github.com/Azure/azure-sdk-for-js/tree/master/packages/%40azure/servicebus/data-plane/examples)
directory for detailed examples on how to use this library to send and receive messages to/from
[Service Bus Queues, Topics and Subscriptions](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview).

## Debug logs

You can set the following environment variable to get the debug logs when using this library.

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
