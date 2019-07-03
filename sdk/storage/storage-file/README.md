# Azure Storage client library for JavaScript - File

Azure Files offers fully managed file shares in the cloud that are accessible via the industry standard Server Message Block (SMB) protocol. Azure file shares can be mounted concurrently by cloud or on-premises deployments of Windows, Linux, and macOS. Additionally, Azure file shares can be cached on Windows Servers with Azure File Sync for fast access near where the data is being used.

- [Source Code](https://github.com/Azure/azure-sdk-for-js/tree/feature/storage/sdk/storage/storage-file)
- [Product documentation](https://docs.microsoft.com/en-us/azure/storage/files/storage-files-introduction)
- [![npm version](https://badge.fury.io/js/%40azure%2Fstorage-file.svg)](https://badge.fury.io/js/%40azure%2Fstorage-file)
- [API Reference documentation](https://azure.github.io/azure-sdk-for-js/storage-file/index.html)
- [Azure Storage File REST APIs](https://docs.microsoft.com/en-us/rest/api/storageservices/file-service-rest-api)

## Key concepts

### Features

- File Storage
  - Get/Set File Service Properties
  - Create/List/Delete File Shares
  - Create/List/Delete File Directories
  - Create/Read/List/Update/Delete Files
- Features new
  - Asynchronous I/O for all operations using the async methods
  - HttpPipeline which enables a high degree of per-request configurability
  - 1-to-1 correlation with the Storage REST API for clarity and simplicity

### Compatibility

This library is compatible with Node.js and browsers, and validated against LTS Node.js versions (>=8.16.0) and latest versions of Chrome, Firefox and Edge.

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

#### Differences between Node.js and browsers

There are differences between Node.js and browsers runtime. When getting started with this library, pay attention to APIs or classes marked with _"ONLY AVAILABLE IN NODE.JS RUNTIME"_ or _"ONLY AVAILABLE IN BROWSERS"_.

##### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `SharedKeyCredential`
- Shared Access Signature(SAS) generation
  - `generateAccountSASQueryParameters()`
  - `generateFileSASQueryParameters()`
- Parallel uploading and downloading
  - `FileClient.uploadFile()`
  - `FileClient.uploadStream()`
  - `FileClient.downloadToBuffer()`
  - `FileClient.downloadToFile()`

##### Following features, interfaces, classes or functions are only available in browsers

- Parallel uploading and downloading
  - `FileClient.uploadBrowserData()`

## Getting started

### NPM

The preferred way to install the Azure File Storage client library for JavaScript is to use the npm package manager. Simply type the following into a terminal window:

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

### JavaScript bundle

To use the library with JS bundle in the browsers, simply add a script tag to your HTML pages pointing to the downloaded JS bundle file(s):

```html
<script src="https://mydomain/azure-storage-file.min.js"></script>
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

## Examples

### Create the file service client

Use the constructor to create a instance of `FileServiceClient`, passing in the credential.

```javascript
// Enter your storage account name and shared key
const account = "";
const accountKey = "";

// Use SharedKeyCredential with storage account and account key
// SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
const sharedKeyCredential = new SharedKeyCredential(account, accountKey);
const serviceClient = new FileServiceClient(
  // When using AnonymousCredential, following url should include a valid SAS
  `https://${account}.file.core.windows.net`,
  sharedKeyCredential
);
```

### List shares in the account

Use `ShareServiceClient.listShares()` to iterator shares in this account,
with the new `for-await-of` syntax:

```javascript
  let shareIter1 = serviceClient.listShares();
  let i = 1;
  for await (const share of shareIter1) {
    console.log(`Share${i}: ${share.name}`);
    i++;
  }
```

Alternatively without `for-await-of`:

```javascript
let shareIter2 = await serviceClient.listShares();
i = 1;
let shareItem = await shareIter2.next();
while (!shareItem.done) {
  console.log(`Share${i++}: ${shareItem.value.name}`);
  shareItem = await shareIter2.next();
}
```

### Create a new share and a directory

```javascript
const shareName = `newshare${new Date().getTime()}`;
const shareClient = serviceClient.getShareClient(shareName);
await shareClient.create();
console.log(`Create share ${shareName} successfully`);

const directoryName = `newdirectory${new Date().getTime()}`;
const directoryClient = shareClient.getDirectoryClient(directoryName);
await directoryClient.create();
console.log(`Create directory ${directoryName} successfully`);
```

### Create an azure file then upload to it

```javascript
const content = "Hello World!";
const fileName = "newfile" + new Date().getTime();
const fileClient = directoryClient.getFileClient(fileName);
await fileClient.create(content.length);
console.log(`Create file ${fileName} successfully`);

// Upload file range
await fileClient.uploadRange(content, 0, content.length);
console.log(`Upload file range "${content}" to ${fileName} successfully`);
```

### List files and directories under a directory

Use `DirectoryClient.listFilesAndDirectories()` to iterator over files and directories,
with the new `for-await-of` syntax. The `kind` property can be used to identify whether
a iterm is a directory or a file.

```javascript
  let dirIter1 = directoryClient.listFilesAndDirectories();
  i = 1;
  for await (const item of dirIter1) {
    if (item.kind === "directory") {
      console.log(`${i} - directory\t: ${item.name}`);
    } else {
      console.log(`${i} - file\t: ${item.name}`);
    }
    i++;
  }
```

Alternatively without using `for-await-of`:

```javascript
let dirIter2 = await directoryClient.listFilesAndDirectories();
i = 1;
let item = await dirIter2.next();
while (!item.done) {
  if (item.value.kind === "directory") {
    console.log(`${i} - directory\t: ${item.value.name}`);
  } else {
    console.log(`${i} - file\t: ${item.value.name}`);
  }
  item = await dirIter2.next();
}
```

For a complete sample on iterating blobs please see [samples/iterators-files-and-directories.ts](https://github.com/Azure/azure-sdk-for-js/blob/feature/storage/sdk/storage/storage-file/samples/typescript/iterators-files-and-directories.ts).

### Download a file and convert it to a string (Node.js)

```javascript
// Get file content from position 0 to the end
// In Node.js, get downloaded data by accessing downloadFileResponse.readableStreamBody
const downloadFileResponse = await fileClient.download(0);
console.log(
  `Downloaded file content${await streamToString(downloadFileResponse.readableStreamBody)}`
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

### Download a file and convert it to a string (Browsers)

```javascript
  // Get file content from position 0 to the end
  // In browsers, get downloaded data by accessing downloadFileResponse.blobBody
  const downloadFileResponse = await fileClient.download(0);
  console.log(
    `Downloaded file content${await streamToString(
      downloadFileResponse.blobBody
    )}`
  );

// [Browser only] A helper method used to convert a browser Blob into string.
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

A complete example of basic scenarios is at [samples/basic.ts](https://github.com/Azure/azure-sdk-for-js/blob/feature/storage/sdk/storage/storage-file/samples/typescript/basic.ts).

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

When creating the `FileServiceClient` instance, pass the logger in the options

```javascript
const fileServiceClient = new FileServiceClient(
  `https://${account}.file.core.windows.net`,
  sharedKeyCredential,
  {
    logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  }
);
```

## Next steps

More code samples

- [File Storage Examples](https://github.com/Azure/azure-sdk-for-js/tree/feature/storage/sdk/storage/storage-file/samples)
- [File Storage Examples - Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/feature/storage/sdk/storage/storage-file/test)

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
