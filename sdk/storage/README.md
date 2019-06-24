# Azure Storage SDK V10 for JavaScript

- @azure/storage-blob [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-blob.svg)](https://badge.fury.io/js/%40azure%2Fstorage-blob)
- @azure/storage-file [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-file.svg)](https://badge.fury.io/js/%40azure%2Fstorage-file)
- @azure/storage-queue [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-queue.svg)](https://badge.fury.io/js/%40azure%2Fstorage-queue)
- [API Reference documentation](https://docs.microsoft.com/en-us/javascript/api/overview/azure/storage/client?view=azure-node-preview)
- [Advanced Examples in Wiki](https://github.com/Azure/azure-storage-js/wiki)

## Introduction

This project provides a JavaScript SDK that makes it easy to consume Microsoft Azure Storage services from your Node.js and browser-based client applications. This respository contains the source for the latest version of the JavaScript SDK, v10.

Note that this version of the SDK is based on the new Storage SDK architecture and replaces the [legacy SDK for Node.js and JavaScript in Browsers](https://github.com/azure/azure-storage-node).

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
Or you can load separate polyfills for missed ES feature(s).
This library depends on following ES features which need external polyfills loaded.

- `Promise`
- `String.prototype.startsWith`
- `String.prototype.endsWith`
- `String.prototype.repeat`
- `String.prototype.includes`
- `Array.prototype.includes`
- `Object.keys` (Override IE11's `Object.keys` with ES6 polyfill forcely to enable [ES6 behavior](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Notes))

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting start with this SDK, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

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
  - `FileClient.uploadFile()`
  - `FileClient.uploadStream()`
  - `FileClient.downloadToBuffer()`

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

- ServiceURL, ContainerURL and BlobURL objects provide the low-level API functionality and map one-to-one to the [Azure Storage Blob REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api).

- The high-level APIs provide convenience abstractions such as uploading a large stream to a block blob (using multiple PutBlock requests).

## Code Samples

```javascript
const {
  BlobServiceClient,
  newPipeline,
  SharedKeyCredential,
  AnonymousCredential,
  TokenCredential
} = require("@azure/storage-blob");

async function main() {
  // Enter your storage account name and shared key
  const account = "account";
  const accountKey = "accountkey";

  // Use SharedKeyCredential with storage account and account key
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use TokenCredential with OAuth token
  const tokenCredential = new TokenCredential("token");
  tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = newPipeline(sharedKeyCredential);

  // List containers
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.blob.core.windows.net`,
    pipeline
  );

  let marker;
  do {
    const listContainersResponse = await blobServiceClient.listContainersSegment(
      marker
    );

    marker = listContainersResponse.nextMarker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobClient = containerClient.getBlobClient(blobName);
  const blockBlobClient = blobClient.getBlockBlobClient();
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );

  // List blobs
  marker = undefined;
  do {
    const listBlobsResponse = await containerClient.listBlobFlatSegment(
      marker
    );

    marker = listBlobsResponse.nextMarker;
    for (const blob of listBlobsResponse.segment.blobItems) {
      console.log(`Blob: ${blob.name}`);
    }
  } while (marker);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobClient.download(0);
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

  // Delete container
  await containerClient.delete();

  console.log("deleted container");
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
```

## More Samples

- [Advanced Examples in Wiki](https://github.com/Azure/azure-storage-js/wiki)
- [Blob Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples)
- [Blob Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/test/)
- [File Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file/samples)
- [File Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file/test/)
- [Queue Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/samples)
- [Queue Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-queue/test/)

## License

This project is licensed under MIT.

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
