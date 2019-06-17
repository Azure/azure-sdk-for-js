# Azure Storage client library for JavaScript - Blob

Azure Blob storage is Microsoft's object storage solution for the cloud. Blob storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that does not adhere to a particular data model or definition, such as text or binary data.

This project provides a client library in JavaScript that makes it easy to consume Microsoft Azure Blob Storage service.

- [Product documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview)
- [Source Code](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob)
- [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-blob.svg)](https://badge.fury.io/js/%40azure%2Fstorage-blob)
- [API Reference documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/storage-blob/index?view=azure-node-preview)
- [Azure Storage Blob REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api)
- [Advanced Examples in Wiki](https://github.com/Azure/azure-storage-js/wiki)

## Key concepts

### Features

- Blob Storage
  - Get/Set Blob Service Properties
  - Create/List/Delete Containers
  - Create/Read/List/Update/Delete Block Blobs
  - Create/Read/List/Update/Delete Page Blobs
  - Create/Read/List/Update/Delete Append Blobs
- Features new
  - Asynchronous I/O for all operations using the async methods
  - HttpPipeline which enables a high degree of per-request configurability
  - 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=6.5) and latest versions of Chrome, Firefox and Edge.

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

There are differences between Node.js and browsers runtime. When getting start with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `SharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateBlobSASQueryParameters()`
- Parallel uploading and downloading
  - `BlockBlobClient.uploadFile()`
  - `BlockBlobClient.uploadStream()`
  - `BlobClient.downloadToBuffer()`

##### Following features, interfaces, classes or functions are only available in browsers

- Parallel uploading and downloading
  - `BlockBlobClient.uploadBrowserData()`

## Getting Started

### NPM

The preferred way to install the Azure Storage library for JavaScript is to use the npm package manager. Simply type the following into a terminal window:

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

To use the library with JS bundle in the browsers, simply add a script tag to your HTML pages pointing to the downloaded JS bundle file(s):

```html
<script src="https://mydomain/azure-storage-blob.min.js"></script>
```

The JS bundled file is compatible with [UMD](https://github.com/umdjs/umd) standard, if no module system found, following global variable(s) will be exported:

- `azblob`

#### Download

Download latest released JS bundles from links in the [GitHub release page](https://github.com/Azure/azure-sdk-for-js/releases). Or from following links directly:

- Blob [https://aka.ms/downloadazurestoragejsblob](https://aka.ms/downloadazurestoragejsblob)

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/zh-cn/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Examples

### Create the Blob service Client

Use the constructor to create a instance of `BlobServiceClient`.

```javascript
  // Enter your storage account name and shared key
  const account = "account";
  const accountKey = "accountkey";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
```

### Create a new container

Use `BlobServiceClient.createContainerClient()` to create a new container.

```javascript
  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerClient = blobServiceClient.createContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );
```

### List the containers

Use `BlobServiceClient.listContainers()` function to iterate the containers,
with the new `for-await-of` syntax:

```javascript
  let iter1 = await blobServiceClient.listContainers();
  let i = 1;
  for await (const container of iter1) {
    console.log(`Container ${i++}: ${container.name}`);
  }
```

Alternatively without using `for-await-of`:

```javascript
  let iter2 = await blobServiceClient.listContainers();
  i = 1;
  let containerItem = await iter2.next();
  do {
    console.log(`Container ${i++}: ${containerItem.value.name}`);
    containerItem = await iter2.next();
  } while (containerItem.value);
```


### Create a blob by uploading data to

```javascript
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobClient = containerClient.createBlobClient(blobName);
  const blockBlobClient = blobClient.createBlockBlobClient();
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
```

### List blobs inside a container

Similar to listing containers.

```javascript
  iter1 = await containerClient.listBlobsFlat();
  i = 1;
  for await (const blob of iter1) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
```

### Download a blob and convert it to a string (Node.js)

```javascript
  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  const downloadBlockBlobResponse = await blobClient.download(0);
  console.log(
    "Downloaded blob content",
    await streamToString(downloadBlockBlobResponse.readableStreamBody)
  );

// [Node.js only] A helper method used to read a Node.js readable stream into string
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
```

### Download a blob and convert it to a string (Browsers)

```javascript
  // Get blob content from position 0 to the end
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blobClient.download(0);
  console.log(
    "Downloaded blob content",
    await blobToString(downloadBlockBlobResponse.blobBody)
  );

// [Browsers only] A helper method used to convert a browser Blob into string.
export async function blobToString(blob: Blob): Promise<string> {
  const fileReader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(blob);
  });
}
```

A complete example of basic scenarios is at [samples/basic.js](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples/basic.js).

## Troubleshooting

It could help diagnozing issues by turning on the console logging. Here's an example logger implementation. First add a custom logger:

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

When creating the `BlobServiceClient` instance, pass the logger in the options

```javascript
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential, {
      logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO),
    }
  );
```

## Next steps

More code examples

- [Advanced Examples in Wiki](https://github.com/Azure/azure-storage-js/wiki)
- [Blob Storage Examples](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/samples)
- [Blob Storage Examples - Test Cases](https://github.com/azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/test/)

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
