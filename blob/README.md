# Azure Storage SDK for JavaScript - Blob

[![npm version](https://badge.fury.io/js/%40azure%2Fstorage-blob.svg)](https://badge.fury.io/js/%40azure%2Fstorage-blob)

## Introduction

This project provides a SDK in JavaScript that makes it easy to consume Microsoft Azure Storage services.

Please note that this version of the SDK is a compete overhaul of the current [Azure Storage SDK for Node.js and JavaScript in Browsers](https://github.com/azure/azure-storage-node), and is based on the new Storage SDK architecture.

### Features

* Blob Storage
  * Get/Set Blob Service Properties
  * Create/List/Delete Containers
  * Create/Read/List/Update/Delete Block Blobs
  * Create/Read/List/Update/Delete Page Blobs
  * Create/Read/List/Update/Delete Append Blobs
* Features new
  * Asynchronous I/O for all operations using the async methods
  * HttpPipeline which enables a high degree of per-request configurability
  * 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This SDK is compatible with Node.js and browsers, and validated against LTS Node.js versions and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

This library depends on ES6+ feature(s) `Promise` which IE11 doesn't support.
You need polyfills to make this library work with IE11. The easiest way is to using [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill).
Or you can load separate polyfills for missed ES feature(s).

## Getting Started

### NPM

The preferred way to install the Azure Storage SDK for JavaScript is to use the npm package manager. Simply type the following into a terminal window:

```bash
npm install @azure/storage-blob
```

In your JavaScript or TypeScript file, import via following:

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
<script src="https://mydomain/azure-storage.blob.min.js"></script>
```

The JS bundled file is compatible with [UMD](https://github.com/umdjs/umd) standard, if no module system found, following global variable(s) will be exported:

* `azblob`

Download latest released JS bundles from links in the [release page](https://github.com/Azure/azure-storage-js/releases).

## SDK Architecture

The Azure Storage SDK for JavaScript provides low-level and high-level APIs.

* ServiceURL, ContainerURL and BlobURL objects provide the low-level API functionality and map one-to-one to the [Azure Storage Blob REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api).

* The high-level APIs provide convenience abstractions such as uploading a large stream to a block blob (using multiple PutBlock requests).

## Code Samples

```javascript
  const pipeline = StorageURL.newPipeline(
    new SharedKeyCredential("account", "accountkey")
  );

  // List containers
  const serviceURL = new ServiceURL(
    "https://account.blob.core.windows.net",
    pipeline
  );

  let marker;
  do {
    const listContainersResponse = await serviceURL.listContainersSegment(Aborter.None, marker);

    marker = listContainersResponse.marker;
    for (const container of listContainersResponse.containerItems) {
      console.log(`Container: ${container.name}`);
    }
  } while (marker);

  // Create a container
  const containerName = `newcontainer${new Date().getTime()}`;
  const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);

  const createContainerResponse = await containerURL.create(Aborter.None);
  console.log(
    `Create container ${containerName} successfully`,
    createContainerResponse.requestId
  );

  // Create a blob
  const content = "hello";
  const blobName = "newblob" + new Date().getTime();
  const blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const uploadBlobResponse = await blockBlobURL.upload(Aborter.None, content, content.length);
  console.log(
    `Upload block blob ${blobName} successfully`
  );

  // Get blob content in Node.js runtime
  const downloadBlockBlobResponse = await blobURL.download(Aborter.None, 0);
  console.log(
    "Downloaded blob content",
    downloadBlockBlobResponse
      .readableStreamBody!.read(content.length)
      .toString()
  );
  console.log(`[headers]:${downloadBlockBlobResponse.headers}`);

  // Delete container
  await containerURL.delete(Aborter.None);

  console.log("deleted container");
```

## More Code Samples

- [Blob Storage Examples](https://github.com/azure/azure-storage-js/tree/master/blob/samples)
- [Blob Storage Examples - Test Cases](https://github.com/azure/azure-storage-js/tree/master/blob/test/)

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
