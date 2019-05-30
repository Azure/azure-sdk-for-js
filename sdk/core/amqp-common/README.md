# Azure Core AMQP client library for AMQP operations

Library that provides common functionality for different **Azure** Javascript libraries using amqp protocol.
Some of the common functionalities include:

- CBS Auth
- Request-Response link for sending request and receiving response over AMQP
- Error translation of different AMQP error codes.
- Creation of `ConnectionConfig` by parsing the connection-string
- AMQP message header and message property transformation
- AMQP message data transformation (encoding/decoding) that most AMQP based Azure services use for communication
- RetryPolicy for retrying different operations

## Getting started

### Pre-requisite

- **Node.js version: 6.x or higher.**
- We would **still encourage you** to install the latest available LTS version at any given time from https://nodejs.org. **It is a good practice to always install the latest available LTS version of node.js.**
- Installing node.js on **Windows or macOS** is very simple with available installers on the [node.js website](https://nodejs.org). If you are using a **linux based OS**, then you can find easy to follow, one step installation instructions over [here](https://nodejs.org/en/download/package-manager/).

### Installation

- Installing this library

```bash
npm install @azure/amqp-common
```

- [`rhea-promise`](https://github.com/amqp/rhea-promise) is a peer dependency. You need to explicitly install this library as a dependency
  in your application.

### IDE

This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com)
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Key concepts

This SDK houses core AMQP common related functionality in use bu Azure SDKs that use the protocol.

## Examples

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/amqp-common_1.0.0-preview.5/sdk/core/amqp-common/samples) directory for detailed samples.
You can run the samples by cloning the repo or copy pasting the below sample in your sample.js file.

```bash
- git clone https://github.com/Azure/azure-sdk-for-js.git
- cd azure-sdk-for-js/sdk/core/amqp-common
- npm i
- npm i -g typescript  #This is optional. However it is useful to have typescript installed globally on your box
- npm i -g ts-node     #This is optional. However it is useful to have ts-node installed globally on your box
# Make sure to set the environment variables and then run
- ts-node ./samples/cbsAuth.ts
```

The samples below are generic for EventHubs and Servicebus. You can find EventHub specific samples,
in the [samples](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/amqp-common_1.0.0-preview.5/sdk/core/amqp-common/samples) directory.

## Example 1 - CBS (Claims Based Authorization Specification) example

You can find more information about cbs authorization over [here](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-protocol-guide#claims-based-authorization).

NOTE: The code block below has been later referred to as "./cbsAuth".

```js
const { ConnectionContextBase, ConnectionConfig, CbsResponse } = require("@azure/amqp-common");
const dotenv = require("dotenv");
dotenv.config(); // Optional for loading environment configuration from a .env (config) file

export const str = process.env.CONNECTION_STRING || "";
export const path = process.env.ENTITY_PATH;
export const connectionConfig = ConnectionConfig.create(str, path);
const parameters = {
  config: connectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-amqp-common",
    version: "0.1.0"
  }
};
export const connectionContext = ConnectionContextBase.create(parameters);

/**
 * audience The entity token audience in one of the following forms:
 *
 * - **ServiceBus**
 *    - **Sender**
 *        - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
 *        - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
 *
 *    - **Receiver**
 *         - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
 *         - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
 *
 *    - **ManagementClient**
 *         - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
 *         - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
 *
 * - **EventHubs**
 *     - **Sender**
 *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
 *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
 *
 *     - **Receiver**
 *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
 *
 *     - **ManagementClient**
 *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
 */
export async function authenticate(audience, closeConnection = false) {
  await connectionContext.cbsSession.init();
  const tokenObject = await connectionContext.tokenProvider.getToken(audience);
  const result = await connectionContext.cbsSession.negotiateClaim(audience, tokenObject);
  console.log(`Result is: ${result}`);
  if (closeConnection) {
    await connectionContext.connection.close();
    console.log("Successfully closed the connection.");
  }
  return result;
}

//Audience is for an EventHub or ServiceBus sender.
// You can uncomment the following line and just run this sample, if required.
// authenticate(`${config.endpoint}${path}`).catch((err) => console.log(err));
```

## Example 2 - Send a message

Building on the above mentioned cbs auth sample, after authentication, we can send a message to EventHub or ServiceBus.

```js
const dotenv = require("dotenv");
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
const { Sender, SenderOptions, EventContext, Message, Delivery } = require("rhea-promise");
const { authenticate, connectionContext, connectionConfig, path } = require("./cbsAuth");

async function main() {
  await authenticate(`${connectionConfig.endpoint}${path}`);
  const senderName = "sender-1";
  const senderOptions = {
    name: senderName,
    target: {
      // Address for EventHub Sender, it can be "<EventHubName>" or "<EventHubName>/Partitions/<PartitionId>"
      // For ServiceBus Queue, it will be "<QueueName>"
      address: `${path}`
    },
    onError: (context) => {
      const senderError = context.sender && context.sender.error;
      if (senderError) {
        console.log(
          ">>>>> [%s] An error occurred for sender '%s': %O.",
          connectionContext.connection.id,
          senderName,
          senderError
        );
      }
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        console.log(
          ">>>>> [%s] An error occurred for session of sender '%s': %O.",
          connectionContext.connection.id,
          senderName,
          sessionError
        );
      }
    }
  };

  const sender = await connectionContext.connection.createSender(senderOptions);
  const message = {
    body: "Hello World!!",
    message_id: "12343434343434"
  };

  const delivery = await sender.send(message);
  console.log(">>>>>[%s] Delivery id: ", connectionContext.connection.id, delivery.id);

  await sender.close();
  await connectionContext.connection.close();
}

main().catch((err) => console.log(err));
```

## Example 3 - Receiving a message

Building on the auth sample, post authentication we can receive messages from an EventHub or ServiceBus.

```js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

const dotenv = require("dotenv");
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
const {
  Receiver,
  ReceiverOptions,
  EventContext,
  ReceiverEvents,
  delay,
  types
} = require("rhea-promise");
const { authenticate, connectionContext, connectionConfig, path } = require("./cbsAuth");

async function main() {
  await authenticate(`${connectionConfig.endpoint}${path}`);
  const receiverName = "receiver-1";
  const filterClause = `amqp.annotation.x-opt-enqueued-time > '${Date.now() - 3600 * 1000}'`; // Get messages from the past hour
  const receiverAddress = `${path}/ConsumerGroups/$default/Partitions/0`; // For ServiceBus "<QueueName>"
  const receiverOptions = {
    name: receiverName,
    source: {
      address: receiverAddress,
      filter: {
        // May not be required for ServiceBus. The current example is for EventHubs.
        "apache.org:selector-filter:string": types.wrap_described(filterClause, 0x468c00000004)
      }
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error;
      if (sessionError) {
        console.log(
          ">>>>> [%s] An error occurred for session of receiver '%s': %O.",
          connectionContext.connection.id,
          receiverName,
          sessionError
        );
      }
    }
  };

  const receiver = await connectionContext.connection.createReceiver(receiverOptions);
  receiver.on(ReceiverEvents.message, (context) => {
    console.log("Received message: %O", context.message);
  });
  receiver.on(ReceiverEvents.receiverError, (context) => {
    const receiverError = context.receiver && context.receiver.error;
    if (receiverError) {
      console.log(
        ">>>>> [%s] An error occurred for receiver '%s': %O.",
        connectionContext.connection.id,
        receiverName,
        receiverError
      );
    }
  });
  // sleeping for 2 mins to let the receiver receive messages and then closing it.
  await delay(120000);
  await receiver.close();
  await connectionContext.connection.close();
}

main().catch((err) => console.log(err));
```

## Troubleshooting

You can set the following environment variable to get the debug logs.

- Getting debug logs from the Event Hub SDK

```bash
export DEBUG=azure:amqp-common*
```

- Getting debug logs from the Event Hub SDK and the protocol level library.

```bash
export DEBUG=azure:amqp-common*,rhea*
```

- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:amqp-common*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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

# Next steps

Please take a look at Examples section above to use the package.

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
