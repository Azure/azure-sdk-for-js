---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-storage
  - azure-blob-storage
urlFragment: storage-blob-typescript
---

# Azure Storage Blob client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Storage Blob in some common scenarios.

| **File Name**                                             | **Description**                                                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [basic.ts][basic]                                         | shows how to use the basic operations (create, list and download blobs, as well as creting and deleting containers) |
| [anonymousCred.ts][anonymouscred]                         | authenticate anonymously using a SAS-encoded URL                                                                    |
| [azureAdAuth.ts][azureadauth]                             | authenticate using Azure Active Directory                                                                           |
| [sharedKeyCred.ts][sharedkeycred]                         | authenticate using an account name and shared key                                                                   |
| [withConnString.ts][withconnstring]                       | connect to the service and authenticate using a connection string                                                   |
| [proxyAuth.ts][proxyauth]                                 | connect to the Azure Storage service through a proxy and authenticate using a shared key                            |
| [iterators-blobs.ts][iterators-blobs]                     | iterate over blobs in a container using different methods, with options for paging, resuming paging, etc.           |
| [iterators-containers.ts][iterators-containers]           | iterate over containers in an account, with options for paging, resuming paging, etc.                               |
| [iterators-blobs-hierarchy.ts][iterators-blobs-hierarchy] | iterate over blobs by hierarchy using separators in blob names, with options for paging etc.                        |
| [iterators-without-await.ts][iterators-without-await]     | iterate over blobs in a container without using ES2018 `for await` syntax                                           |
| [customPipeline.ts][custompipeline]                       | use custom HTTP pipeline options when connecting to Azure Storage                                                   |
| [customizedClientHeaders.ts][customizedclientheaders]     | use a custom request policy to add metadata to requests                                                             |
| [errorsAndResponses.ts][errorsandresponses]               | demonstrate various errors and responses                                                                            |
| [readingSnapshot.ts][readingsnapshot]                     | create and read from a blob snapshot                                                                                |
| [advanced.ts][advanced]                                   | use advanced options when creating the client and containers, as well as when listing and downloading blobs         |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Storage Account][createinstance_azurestorageaccount]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/basic.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dist/basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/basic.ts
[anonymouscred]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/anonymousCred.ts
[azureadauth]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/azureAdAuth.ts
[sharedkeycred]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/sharedKeyCred.ts
[withconnstring]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/withConnString.ts
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/proxyAuth.ts
[iterators-blobs]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/iterators-blobs.ts
[iterators-containers]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/iterators-containers.ts
[iterators-blobs-hierarchy]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/iterators-blobs-hierarchy.ts
[iterators-without-await]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/iterators-without-await.ts
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/customPipeline.ts
[customizedclientheaders]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/customizedClientHeaders.ts
[errorsandresponses]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/errorsAndResponses.ts
[readingsnapshot]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/readingSnapshot.ts
[advanced]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/storage-blob/samples/v12/typescript/src/advanced.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
