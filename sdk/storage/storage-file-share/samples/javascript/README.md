---
page_type: sample
languages:
- javascript
products:
- azure
- azure-storage
urlFragment: storage-file-share-javascript
---

# Azure Storage File Share client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Storage File Shares in some common scenarios.

|__File Name__|__Description__|
|-------------|---------------|
|[basic.js][basic]|authenticate with the service using an account name & key (or anonymously with a SAS URL), upload a file, list files and directories, and download a file to a string|
|[withConnString.js][withConnString]|connect to and authenticate with the service using a connection string|
|[sharedKeyCred.js][sharedKeyCred]|authenticate with the service using an account name and a shared key|
|[anonymousCred.js][anonymousCred]|authenticate with the service anonymously using a SAS URL|
|[proxyAuth.js][proxyAuth]|connect to the service using a proxy and authenticate with an account name & key|
|[iterators-shares.js][iterators-shares]|connect to the service and iterate through the shares in the account|
|[iterators-files-and-directories.js][iterators-files-and-directories]|create a few directories and iterate through them individually (using async `for await` syntax), by page, and resuming paging using a marker|
|[iterators-handles.js][iterators-handles]|connect to the service and iterate through open handles|
|[customPipeline.js][customPipeline]|use custom HTTP pipeline options when connecting to the service|
|[advanced.js][advanced]|use custom logging and pipeline options, then upload a local file to a share|

## Prerequisites

The sample are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require Node.js >= 10.0.0.

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the storage account from environment variables. See each individual sample for details on which environment variables it requires to function.

Adapting the samples to run in the browser requires some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:
```bash
npm install
```
2. Run the sample with the correct environment variables set, for example (cross-platform):
```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/basic.js
[proxyAuth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/proxyAuth.js
[withConnString]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/withConnString.js
[iterators-files-and-directories]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/iterators-files-and-directories.js
[sharedKeyCred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/sharedKeyCred.js
[anonymousCred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/anonymousCred.js
[iterators-handles]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/iterators-handles.js
[customPipeline]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/customPipeline.js
[advanced]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/advanced.js
[iterators-shares]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/javascript/iterators-shares.js

[apiref]: https://azure.github.io/azure-sdk-for-js/storage.html#azure-storage-file-share
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/README.md