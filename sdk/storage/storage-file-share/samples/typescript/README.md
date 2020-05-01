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

| **File Name**                                                         | **Description**                                                                                                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [basic.ts][basic]                                                     | authenticate with the service using an account name & key (or anonymously with a SAS URL), upload a file, list files and directories, and download a file to a string |
| [withConnString.ts][withconnstring]                                   | connect to and authenticate with the service using a connection string                                                                                                |
| [sharedKeyCred.ts][sharedkeycred]                                     | authenticate with the service using an account name and a shared key                                                                                                  |
| [anonymousCred.ts][anonymouscred]                                     | authenticate with the service anonymously using a SAS URL                                                                                                             |
| [proxyAuth.ts][proxyauth]                                             | connect to the service using a proxy and authenticate with an account name & key (requires a proxy configuration)                                                     |
| [iterators-shares.ts][iterators-shares]                               | connect to the service and iterate through the shares in the account                                                                                                  |
| [iterators-files-and-directories.ts][iterators-files-and-directories] | create a few directories and iterate through them individually (using async `for await` syntax), by page, and resume paging using a marker                            |
| [iterators-handles.ts][iterators-handles]                             | connect to the service and iterate through open handles (requires a pre-existing share and directory)                                                                 |
| [customPipeline.ts][custompipeline]                                   | use custom HTTP pipeline options when connecting to the service                                                                                                       |
| [advanced.ts][advanced]                                               | use custom logging and pipeline options, then upload a local file to a share                                                                                          |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require a Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the storage account from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/basic.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dist/basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/basic.ts
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/proxyAuth.ts
[withconnstring]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/withConnString.ts
[iterators-files-and-directories]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/iterators-files-and-directories.ts
[sharedkeycred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/sharedKeyCred.ts
[anonymouscred]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/anonymousCred.ts
[iterators-handles]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/iterators-handles.ts
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/customPipeline.ts
[advanced]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/advanced.ts
[iterators-shares]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/samples/typescript/src/iterators-shares.ts
[apiref]: https://aka.ms/azsdk/js/docs/ref/storage-file-share
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-file-share/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
