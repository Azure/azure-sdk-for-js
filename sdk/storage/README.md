# Azure Storage client library for JavaScript

Azure Storage is a Microsoft-managed service providing cloud storage that is highly available, secure, durable, scalable, and redundant.

This project provides client libraries in JavaScript that makes it easy to consume Microsoft Azure Storage service.

- [Source Code - Blob](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [Source Code - Queue](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue)
- [Source Code - File](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file)
- [Product documentation](https://docs.microsoft.com/en-us/azure/storage)
- @azure/storage-blob [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-blob.svg)](https://badge.fury.io/js/%40azure%2Fstorage-blob)
- @azure/storage-file [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-file.svg)](https://badge.fury.io/js/%40azure%2Fstorage-file)
- @azure/storage-queue [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-queue.svg)](https://badge.fury.io/js/%40azure%2Fstorage-queue)
- [API Reference documentation](https://docs.microsoft.com/en-us/javascript/api/overview/azure/storage/client?view=azure-node-preview)
- [Azure Storage REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/)
- [Advanced Examples in Wiki](https://github.com/Azure/azure-storage-js/wiki)

## Key concepts

### Features

- Blob Storage
  - Get/Set Blob Service Properties
  - Create/List/Delete Containers
  - Create/Read/List/Update/Delete Block Blobs
  - Create/Read/List/Update/Delete Page Blobs
  - Create/Read/List/Update/Delete Append Blobs
- File Storage
  - Get/Set File Service Properties
  - Create/List/Delete File Shares
  - Create/List/Delete File Directories
  - Create/Read/List/Update/Delete Files
- Queue Storage
  - Get/Set Queue Service Properties
  - Create/List/Delete Queues
  - Enqueue/Dequeue/Peek/Clear/Update/Delete Queue Messages
- Features new
  - Asynchronous I/O for all operations using the async methods
  - HttpPipeline which enables a high degree of per-request configurability
  - 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This SDK is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=6.5) and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

You need polyfills to make this library work with IE11. The easiest way is to use [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill), or [polyfill service](https://polyfill.io/v2/docs/).

You can also load separate polyfills for missed ES feature(s).
This library depends on following ES features which need external polyfills loaded.

- `Promise`
- `String.prototype.startsWith`
- `String.prototype.endsWith`
- `String.prototype.repeat`
- `String.prototype.includes`
- `Array.prototype.includes`
- `Object.keys` (Override IE11's `Object.keys` with ES6 polyfill forcely to enable [ES6 behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))
- `Symbol`
- `Symbol.asyncIterator`

[polyfill.io](https://polyfill.io/v2/docs/) doesn't support `Symbol.asyncIterator` yet. One way to add it (after adding `Symbol` polyfill) is

```javascript
if (typeof Symbol === undefined || !Symbol.asyncIterator) {
  Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator");
}
```

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this SDK, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `SharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateBlobSASQueryParameters()`
  - `generateFileSASQueryParameters()`
  - `generateQueueSASQueryParameters()`
- Parallel uploading and downloading
  - `BlockBlobClient.uploadFile()`
  - `BlockBlobClient.uploadStream()`
  - `BlobClient.downloadToBuffer()`
  - `BlobClient.downloadToFile()`
  - `FileClient.uploadFile()`
  - `FileClient.uploadStream()`
  - `FileClient.downloadToBuffer()`
  - `FileClient.downloadToFile()`

##### Following features, interfaces, classes or functions are only available in browsers

- Parallel uploading and downloading
  - `BlockBlobClient.uploadBrowserData()`
  - `FileClient.uploadBrowserData()`

## Getting Started

### NPM

The preferred way to install the Azure Storage SDK for JavaScript is to use the npm package manager. Take "@azure/storage-blob" for example.

Simply type the following into a terminal window:

```bash
npm install @azure/storage-blob
```

In your TypeScript or JavaScript file, import via following:

```JavaScript
import * as Azure from "@azure/storage-blob";
```

Or

```JavaScript
const Azure = require("@azure/storage-blob");
```

### JavaScript Bundle

To use the SDK with JS bundle in the browsers, simply add a script tag to your HTML pages pointing to the downloaded JS bundle file(s):

```html
<script src="https://mydomain/azure-storage-blob.min.js"></script>
<script src="https://mydomain/azure-storage-file.min.js"></script>
<script src="https://mydomain/azure-storage-queue.min.js"></script>
```

The JS bundled file is compatible with [UMD](https://github.com/umdjs/umd) standard, if no module system found, following global variable(s) will be exported:

- `azblob`
- `azfile`
- `azqueue`

#### Download

Download latest released JS bundles from links in the [GitHub release page](https://github.com/Azure/azure-storage-js/releases). Or from following links directly:

- Blob [https://aka.ms/downloadazurestoragejsblob](https://aka.ms/downloadazurestoragejsblob)
- File [https://aka.ms/downloadazurestoragejsfile](https://aka.ms/downloadazurestoragejsfile)
- Queue [https://aka.ms/downloadazurestoragejsqueue](https://aka.ms/downloadazurestoragejsqueue)

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/zh-cn/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## SDK Architecture

The Azure Storage SDK for JavaScript provides low-level and high-level APIs. Take Blob SDK as example:

- ServiceClient, ContainerClient and BlobClient objects provide the low-level API functionality and map one-to-one to the [Azure Storage Blob REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api).

- The high-level APIs provide convenience abstractions such as uploading a large stream to a block blob (using multiple PutBlock requests).

## Examples

## Code Samples

```javascript
const {
  BlobServiceClient,
  newPipeline,
  SharedKeyCredential
} = require("@azure/storage-blob");

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential);

  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  for (let index = 0; index < 7; index++) {
    // Create a blob
    const content = "hello";
    const blobName = "newblob" + new Date().getTime();
    const blobClient = containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Uploaded block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  }

  // 1. List blobs
  let i = 1;
  let iter = await containerClient.listBlobsFlat();
  for await (const blob of iter) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // 2. Same as the previous example
  i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  // 3. Generator syntax .next()
  i = 1;
  iter = containerClient.listBlobsFlat();
  let blobItem = await iter.next();
  while (!blobItem.done) {
    console.log(`Blob ${i++}: ${blobItem.value.name}`);
    blobItem = await iter.next();
  }

  ////////////////////////////////////////////////////////
  ///////////////  Examples for .byPage()  ///////////////
  ////////////////////////////////////////////////////////

  // 4. list containers by page
  i = 1;
  for await (const response of containerClient.listBlobsFlat().byPage()) {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  // 5. Same as the previous example - passing maxPageSize in the page settings
  i = 1;
  for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  // 6. Generator syntax .next()
  i = 1;
  let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 20 });
  let response = (await iterator.next()).value;
  do {
    for (const blob of response.segment.blobItems) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    response = (await iterator.next()).value;
  } while (response);

  // 7. Passing marker as an argument (similar to the previous example)
  i = 1;
  iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
  response = (await iterator.next()).value;
  // Prints 2 blob names
  for (const blob of response.segment.blobItems) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
  // Gets next marker
  let marker = response.nextMarker;
  // Passing next marker as continuationToken
  iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
  response = (await iterator.next()).value;
  // Prints 5 blob names
  for (const blob of response.segment.blobItems) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
```

## Troubleshooting

It could help diagnozing issues by turning on the console logging. Here's an example logger implementation. First, add a custom logger:

```javascript
class ConsoleHttpPipelineLogger {
  constructor(minimumLogLevel) {
    this.minimumLogLevel = minimumLogLevel;
  }
  log(logLevel, message) {
    const logMessage = `${new Date().toISOString()} ${HttpPipelineLogLevel[logLevel]}: ${message}`;
    switch (logLevel) {
      case HttpPipelineLogLevel.ERROR:
        console.error(logMessage);
        break;
      case HttpPipelineLogLevel.WARNING:
        console.warn(logMessage);
        break;
      case HttpPipelineLogLevel.INFO:
        console.log(logMessage);
        break;
    }
  }
}
```

When creating the `QueueServiceClient` instance, pass the logger in the options

```javascript
  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential, {
      logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO),
    }
  );
```

## Next steps

More samples

- [Advanced Examples in Wiki](https://github.com/Azure/azure-storage-js/wiki)
- [Blob Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples)
- [Blob Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/test/)
- [File Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file/samples)
- [File Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file/test/)
- [Queue Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples)
- [Queue Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/test/)

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit <https://cla.microsoft.com.>

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
