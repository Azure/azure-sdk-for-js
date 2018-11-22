# Azure Storage SDK V10 for JavaScript - File

* [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-file.svg)](https://badge.fury.io/js/%40azure%2Fstorage-file)
* [API Reference documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/storage-file/index?view=azure-node-preview)

## Introduction

This project provides a SDK in JavaScript that makes it easy to consume Microsoft Azure Storage services.

Please note that this version of the SDK is a compete overhaul of the current [Azure Storage SDK for Node.js and JavaScript in Browsers](https://github.com/azure/azure-storage-node), and is based on the new Storage SDK architecture.

### Features

* File Storage
  * Get/Set File Service Properties
  * Create/List/Delete File Shares
  * Create/List/Delete File Directories
  * Create/Read/List/Update/Delete Files
* Features new
  * Asynchronous I/O for all operations using the async methods
  * HttpPipeline which enables a high degree of per-request configurability
  * 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This SDK is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=6.5) and latest versions of Chrome, Firefox and Edge.

#### Compatible with IE11

You need polyfills to make this library work with IE11. The easiest way is to use [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill), or [polyfill service](https://polyfill.io/v2/docs/).
Or you can load separate polyfills for missed ES feature(s).
This library depends on following ES6 features which need external polyfills loaded.

* `Promise`
* `String.prototype.startsWith`
* `String.prototype.endsWith`
* `String.prototype.repeat`
* `String.prototype.includes`

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting start with this SDK, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

* Shared Key Authorization based on account name and account key
  * `SharedKeyCredential`
* Shared Access Signature(SAS) generation
  * `generateAccountSASQueryParameters()`
  * `generateFileSASQueryParameters()`
* Parallel uploading and downloading
  * `uploadFileToAzureFile()`
  * `uploadStreamToAzureFile()`
  * `downloadAzureFileToBuffer()`

##### Following features, interfaces, classes or functions are only available in browsers

* Parallel uploading and downloading
  * `uploadBrowserDataToAzureFile()`

## Getting Started

### NPM

The preferred way to install the Azure Storage SDK for JavaScript is to use the npm package manager. Simply type the following into a terminal window:

```bash
npm install @azure/storage-file
```

In your TypeScript or JavaScript file, import via following:

```JavaScript
import * as Azure from "@azure/storage-file";
```

Or

```JavaScript
const Azure = require("@azure/storage-file");
```

### JavaScript Bundle

To use the SDK with JS bundle in the browsers, simply add a script tag to your HTML pages pointing to the downloaded JS bundle file(s):

```html
<script src="https://mydomain/azure-storage.file.min.js"></script>
```

The JS bundled file is compatible with [UMD](https://github.com/umdjs/umd) standard, if no module system found, following global variable(s) will be exported:

- `azfile`

#### Download

Download latest released JS bundles from links in the [GitHub release page](https://github.com/Azure/azure-storage-js/releases). Or from following links directly:

- File [https://aka.ms/downloadazurestoragejsfile](https://aka.ms/downloadazurestoragejsfile)

### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/zh-cn/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## SDK Architecture

The Azure Storage SDK for JavaScript provides low-level and high-level APIs.

- ServiceURL, ShareURL, DirectoryURL and FileURL objects provide the low-level API functionality and map one-to-one to the [Azure Storage File REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/file-service-rest-api).

- The high-level APIs provide convenience abstractions such as uploading a large stream to a file (using multiple PutBlock requests).

## Code Samples

```javascript
const {
  Aborter,
  StorageURL,
  ServiceURL,
  ShareURL,
  DirectoryURL,
  FileURL,
  SharedKeyCredential,
  AnonymousCredential,
  TokenCredential
} = require("@azure/storage-file");

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  // Use TokenCredential with OAuth token
  const tokenCredential = new TokenCredential("token");
  tokenCredential.token = "renewedToken"; // Renew the token by updating token field of token credential object

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
  const pipeline = StorageURL.newPipeline(sharedKeyCredential);

  // List shares
  const serviceURL = new ServiceURL(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    pipeline
  );

  console.log(`List shares`);
  let marker;
  do {
    const listSharesResponse = await serviceURL.listSharesSegment(
      Aborter.none,
      marker
    );

    marker = listSharesResponse.nextMarker;
    for (const share of listSharesResponse.shareItems) {
      console.log(`\tShare: ${share.name}`);
    }
  } while (marker);

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  await shareURL.create(Aborter.none);
  console.log(`Create share ${shareName} successfully`);

  // Create a directory
  const directoryName = `newdirectory${new Date().getTime()}`;
  const directoryURL = DirectoryURL.fromShareURL(shareURL, directoryName);
  await directoryURL.create(Aborter.none);
  console.log(`Create directory ${directoryName} successfully`);

  // Create a file
  const content = "Hello World!";
  const fileName = "newfile" + new Date().getTime();
  const fileURL = FileURL.fromDirectoryURL(directoryURL, fileName);
  await fileURL.create(Aborter.none, content.length);
  console.log(`Create file ${fileName} successfully`);

  // Upload file range
  await fileURL.uploadRange(Aborter.none, content, 0, content.length);
  console.log(`Upload file range "${content}" to ${fileName} successfully`);

  // List directories and files
  console.log(`List directories and files under directory ${directoryName}`);
  marker = undefined;
  do {
    const listFilesAndDirectoriesResponse = await directoryURL.listFilesAndDirectoriesSegment(
      Aborter.none,
      marker
    );

    marker = listFilesAndDirectoriesResponse.nextMarker;
    for (const file of listFilesAndDirectoriesResponse.segment.fileItems) {
      console.log(`\tFile: ${file.name}`);
    }
    for (const directory of listFilesAndDirectoriesResponse.segment
      .directoryItems) {
      console.log(`\tDirectory: ${directory.name}`);
    }
  } while (marker);

  // Get file content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadFileResponse.blobBody
  const downloadFileResponse = await fileURL.download(Aborter.none, 0);
  console.log(
    `Downloaded file content${await streamToString(
      downloadFileResponse.readableStreamBody
    )}`
  );

  // Delete share
  await shareURL.delete(Aborter.none);
  console.log(`deleted share ${shareName}`);
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", data => {
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
  .catch(err => {
    console.log(err.message);
  });
```

## More Code Samples

* [File Storage Examples](https://github.com/azure/azure-storage-js/tree/master/file/samples)
* [File Storage Examples - Test Cases](https://github.com/azure/azure-storage-js/tree/master/file/test/)

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
