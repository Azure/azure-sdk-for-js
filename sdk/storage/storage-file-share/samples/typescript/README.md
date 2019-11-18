---
page_type: sample
languages:
- typescript
products:
- azure
- azure-storage
urlFragment: storage-file-share-typescript
---

# Azure Storage File Share client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Storage File Shares in some common scenarios.

|__File Name__|__Description__|
|-------------|---------------|
|[basic.ts][basic]|authenticate with the service using an account name & key (or anonymously with a SAS URL), upload a file, list files and directories, and download a file to a string|
|[withConnString.ts][withConnString]|connect to and authenticate with the service using a connection string|
|[sharedKeyCred.ts][sharedKeyCred]|authenticate with the service using an account name and a shared key|
|[anonymousCred.ts][anonymousCred]|authenticate with the service anonymously using a SAS URL|
|[proxyAuth.ts][proxyAuth]|connect to the service using a proxy and authenticate with an account name & key|
|[iterators-shares.ts][iterators-shares]|connect to the service and iterate through the shares in the account|
|[iterators-files-and-directories.ts][iterators-files-and-directories]|create a few directories and iterate through them individually (using async `for await` syntax), by page, and resume paging using a marker|
|[iterators-handles.ts][iterators-handles]|connect to the service and iterate through open handles|
|[customPipeline.ts][customPipeline]|use custom HTTP pipeline options when connecting to the service|
|[advanced.ts][advanced]|use custom logging and pipeline options, then upload a local file to a share|

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require a Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the storage account from environment variables. See each individual sample for details on which environment variables it requires to function.

Adapting the samples to run in the browser requires some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:
```bash
npm install
```
2. Compile the samples
```bash
npm run build
```
3. Run the sample with the correct environment variables set, for example (cross-platform):
```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dist/basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/basic.ts
[proxyAuth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/proxyAuth.ts
[withConnString]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/withConnString.ts
[iterators-files-and-directories]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/iterators-files-and-directories.ts
[sharedKeyCred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/sharedKeyCred.ts
[anonymousCred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/anonymousCred.ts
[iterators-handles]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/iterators-handles.ts
[customPipeline]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/customPipeline.ts
[advanced]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/advanced.ts
[iterators-shares]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/iterators-shares.ts

[apiref]: https://azure.github.io/azure-sdk-for-js/storage.html#azure-storage-file-share
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html