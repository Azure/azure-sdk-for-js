@azure/amqp-common
================

Library that provides common functionality for different **Azure** Javascript libraries using amqp protocol. 
Some of the common functionalities include:
- CBS Auth
- Request-Response link for sending request and receiving response over AMQP
- Error translation of different AMQP error codes.
- Creation of `ConnectionConfig` by parsing the connection-string
- AMQP message header and message property transformation
- AMQP message data transformation (encoding/decoding) that most AMQP based Azure services use for communication
- RetryPolicy for retrying different operations

## Pre-requisite ##
- **Node.js version: 6.x or higher.**  We would **still encourage** you to install the latest available LTS version at any given time from https://nodejs.org.
- **Please do not use older LTS versions of node.js.** If you are using a linux based OS, then you can find easy to follow installation instructions over [here](https://nodejs.org/en/download/package-manager/).

## Installation ##
```bash
npm install @azure/amqp-common
```

## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) 
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Debug logs ##

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

## Examples ##

Please take a look at the [examples](https://github.com/Azure/amqp-common-js/tree/master/examples) directory for detailed examples.
You can run the examples by cloning the repo or copy pasting the below sample in your sample.js file.
```bash
- git clone https://github.com/Azure/amqp-common-js.git
- cd amqp-common-js
- npm i
- npm i -g typescript  #This is optional. However it is useful to have typescript installed globally on your box
- npm i -g ts-node     #This is optional. However it is useful to have ts-node installed globally on your box
# Make sure to set the environment variables and then run
- ts-node ./examples/cbsAuth.ts
```

## Example 1 - CBS Authentication

```js
const { ConnectionContextBase, CreateConnectionContextBaseParameters, ConnectionConfig } = require("@azure/amqp-common");
// Using dotenv package is optional and should be used only when .env file is used. 
// Please take a look at [sample.env](https://github.com/Azure/amqp-common-js/tree/master/sample.env) 
// file to see how environment variables can be specified.
import * as dotenv from "dotenv"; 
dotenv.config();

const str = process.env.CONNECTION_STRING || "";
const path = process.env.ENTITY_PATH;

async function main() {
  const config = ConnectionConfig.create(str, path);
  const parameters = {
    config: config,
    connectionProperties: {
      product: "MSJSClient",
      userAgent: "/js-amqp-common",
      version: "0.1.0"
    }
  };
  const context = ConnectionContextBase.create(parameters);
  /**
   * The entity token audience in one of the following forms:
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
  const audience = `${config.endpoint}${path}`; // In this example we are providing the audience for an EventHub or ServiceBus sender.
  await context.cbsSession.init();
  const tokenObject = await context.tokenProvider.getToken(audience);
  const result = await context.cbsSession.negotiateClaim(audience, tokenObject);
  console.log("Result is: %O", result);
  await context.connection.close();
  console.log("Successfully closed the connection.");
}

main().catch((err) => { console.log(err); });
```

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
