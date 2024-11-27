# Azure Storage Queue client library for JavaScript

Azure Storage Queue provides cloud messaging between application components. In designing applications for scale, application components are often decoupled, so that they can scale independently. Queue storage delivers asynchronous messaging for communication between application components, whether they are running in the cloud, on the desktop, on an on-premises server, or on a mobile device. Queue storage also supports managing asynchronous tasks and building process work flows.

This project provides a client library in JavaScript that makes it easy to consume the Azure Storage Queue service.

Use the client libraries in this package to:

- Get/Set Queue Service Properties
- Create/List/Delete Queues
- Send/Receive/Peek/Clear/Update/Delete Queue Messages

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-queue)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/storage-queue)
- [Product documentation](https://docs.microsoft.com/azure/storage/queues/storage-queues-introduction)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue/samples)
- [Azure Storage Queue REST APIs](https://docs.microsoft.com/rest/api/storageservices/queue-service-rest-api)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Storage Account](https://docs.microsoft.com/azure/storage/common/storage-account-create)

### Install the package

The preferred way to install the Azure Storage Queue client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-queue
```

### Authenticate the client

Azure Storage supports several ways to authenticate. In order to interact with the Azure Queue Storage service you'll need to create an instance of a Storage client - `QueueServiceClient` or `QueueClient` for example. See [samples for creating the `QueueServiceClient`](#create-the-queue-service-client) to learn more about authentication.

- [Azure Active Directory](#with-defaultazurecredential-from-azureidentity-package)
- [Shared Key](#with-storagesharedkeycredential)
- [Shared access signatures](#with-sas-token)

#### Azure Active Directory

The Azure Queue Storage service supports the use of Azure Active Directory to authenticate requests to its APIs. The [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) package provides a variety of credential types that your application can use to do this. Please see the [README for `@azure/identity`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/README.md) for more details and samples to get you started.

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

#### Web Workers

This library requires certain DOM objects to be globally available when used in the browser, which web workers do not make available by default. You will need to polyfill these to make this library work in web workers.

For more information please refer to our [documentation for using Azure SDK for JS in Web Workers](https://aka.ms/azsdk/js/web-workers)

This library depends on following DOM APIs which need external polyfills loaded when used in web workers:

- [`document`](https://developer.mozilla.org/docs/Web/API/Document)
- [`DOMParser`](https://developer.mozilla.org/docs/Web/API/DOMParser)
- [`Node`](https://developer.mozilla.org/docs/Web/API/Node)
- [`XMLSerializer`](https://developer.mozilla.org/docs/Web/API/XMLSerializer)

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `StorageSharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateQueueSASQueryParameters()`

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Key concepts

A Queue is a data store within an Azure Storage Queue service account for sending/receiving messages
between connected clients.

Key data types in our library related to these services are:

- A `QueueServiceClient` represents a connection (via a URL) to a given _storage account_ in the Azure Storage Queue service and provides APIs for manipulating its queues. It is authenticated to the service and can be used to create `QueueClient` objects, as well as create, delete, list queues from the service.
- A `QueueClient` represents a single _queue_ in the storage account. It can be used to manipulate the queue's messages, for example to send, receive, and peek messages in the queue.

## Examples

### Import the package

To use the clients, import the package into your file:

```javascript
const AzureStorageQueue = require("@azure/storage-queue");
```

Alternatively, selectively import only the types you need:

```javascript
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");
```

### Create the queue service client

The `QueueServiceClient` requires an URL to the queue service and an access credential. It also optionally accepts some settings in the `options` parameter.

#### with `DefaultAzureCredential` from `@azure/identity` package

**Recommended way to instantiate a `QueueServiceClient`**

Setup : Reference - Authorize access to blobs and queues with Azure Active Directory from a client application - https://docs.microsoft.com/azure/storage/common/storage-auth-aad-app

- Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user

  - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app
  - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`.
  - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.

- Grant access to Azure Storage Queue data with RBAC in the Azure Portal

  - RBAC roles for blobs and queues - https://docs.microsoft.com/azure/storage/common/storage-auth-aad-rbac-portal.
  - In the azure portal, go to your storage-account and assign **Storage Queue Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal).

- Environment setup for the sample
  - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
  - Make sure you have `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` as environment variables to successfully execute the sample (can leverage process.env).

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);
```

[Note - Above steps are only for Node.js]

#### using connection string

Alternatively, you can instantiate a `QueueServiceClient` using the `fromConnectionString()` static method with the full connection string as the argument. (The connection string can be obtained from the azure portal.) [ONLY AVAILABLE IN NODE.JS RUNTIME]

```javascript
const { QueueServiceClient } = require("@azure/storage-queue");

const connStr = "<connection string>";

const queueServiceClient = QueueServiceClient.fromConnectionString(connStr);
```

#### with `StorageSharedKeyCredential`

Alternatively, you instantiate a `QueueServiceClient` with a `StorageSharedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
[ONLY AVAILABLE IN NODE.JS RUNTIME]

```javascript
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  sharedKeyCredential,
  {
    retryOptions: { maxTries: 4 }, // Retry options
    telemetry: { value: "BasicSample/V11.0.0" } // Customized telemetry string
  }
);
```

#### with SAS Token

Also, You can instantiate a `QueueServiceClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal or generate one using `generateAccountSASQueryParameters()`.

```javascript
const { QueueServiceClient } = require("@azure/storage-queue");
const account = "<account name>";
const sas = "<service Shared Access Signature Token>";
const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net${sas}`
);
```

### List queues in this account

Use `QueueServiceClient.listQueues()` function to iterate the queues,
with the new `for-await-of` syntax:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

async function main() {
  const iter1 = queueServiceClient.listQueues();
  let i = 1;
  for await (const item of iter1) {
    console.log(`Queue${i}: ${item.name}`);
    i++;
  }
}

main();
```

Alternatively without `for-await-of`:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

async function main() {
  const iter2 = queueServiceClient.listQueues();
  let i = 1;
  let item = await iter2.next();
  while (!item.done) {
    console.log(`Queue ${i++}: ${item.value.name}`);
    item = await iter2.next();
  }
}

main();
```

For a complete sample on iterating queues please see [samples/v12/typescript/listQueues.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/typescript/src/listQueues.ts).

### Create a new queue

Use `QueueServiceClient.getQueueClient()` function to create a new queue.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "<valid queue name>";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );
}

main();
```

### Send a message to the queue

Use `sendMessage()` to add a message to the queue:

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "<valid queue name>";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  // Send a message into the queue using the sendMessage method.
  const sendMessageResponse = await queueClient.sendMessage("Hello World!");
  console.log(
    `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
  );
}

main();
```

### Peek a message

`QueueClient.peekMessages()` allows looking at one or more messages in front of the queue. This call
doesn't prevent other code from accessing peeked messages.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "<valid queue name>";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const peekMessagesResponse = await queueClient.peekMessages();
  console.log(`The peeked message is: ${peekMessagesResponse.peekedMessageItems[0].messageText}`);
}

main();
```

### Processing a message

Messages are processed in two steps.

- First call `queueClient.receiveMessages()`. This makes the messages invisible to other code reading messages from this queue for a default period of 30 seconds.
- When processing of a message is done, call `queueClient.deleteMessage()` with the message's `popReceipt`.

If your code fails to process a message due to hardware or software failure, this two-step process ensures that another instance of your code can get the same message and try again.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "<valid queue name>";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const response = await queueClient.receiveMessages();
  if (response.receivedMessageItems.length === 1) {
    const receivedMessageItem = response.receivedMessageItems[0];
    console.log(`Processing & deleting message with content: ${receivedMessageItem.messageText}`);
    const deleteMessageResponse = await queueClient.deleteMessage(
      receivedMessageItem.messageId,
      receivedMessageItem.popReceipt
    );
    console.log(
      `Delete message successfully, service assigned request Id: ${deleteMessageResponse.requestId}`
    );
  }
}

main();
```

### Delete a queue

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");

const account = "<account>";
const credential = new DefaultAzureCredential();

const queueServiceClient = new QueueServiceClient(
  `https://${account}.queue.core.windows.net`,
  credential
);

const queueName = "<valid queue name>";

async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Deleted queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

main();
```

A complete example of simple `QueueServiceClient` scenarios is at [samples/v12/typescript/src/queueClient.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-queue/samples/v12/typescript/src/queueClient.ts).

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

## Next steps

More code samples

- [Queue Storage Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue/samples)
- [Queue Storage Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-queue/test)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

Also refer to [Storage specific guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/CONTRIBUTING.md) for additional information on setting up the test environment for storage libraries.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-queue%2FREADME.png)
