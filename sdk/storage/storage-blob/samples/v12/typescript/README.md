---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-storage
urlFragment: storage-blob-typescript
---

# Azure Storage Blob client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Storage Blob in some common scenarios.

| **File Name**                                         | **Description**                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [sharedKeyAuth.ts][sharedkeyauth]                     | authenticate using an account name and a static key                                                          |
| [azureAdAuth.ts][azureadauth]                         | authenticate with the storage service using Azure Active Directory                                           |
| [anonymousAuth.ts][anonymousauth]                     | authenticate anonymously using a SAS-encoded URL                                                             |
| [connectionStringAuth.ts][connectionstringauth]       | authenticate with the storage service using a connection string                                              |
| [listBlobsByHierarchy.ts][listblobsbyhierarchy]       | list blobs by hierarchy, using separators in the blob names, using options for paging, resuming paging, etc. |
| [listBlobsFlat.ts][listblobsflat]                     | list blobs in a container, showing options for paging, resuming paging, etc.                                 |
| [listContainers.ts][listcontainers]                   | list containers in an account, showing options for paging, resuming paging, etc.                             |
| [snapshots.ts][snapshots]                             | create and read from a blob snapshot                                                                         |
| [errorsAndResponses.ts][errorsandresponses]           | explores various error scenarios and their response data                                                     |
| [proxyAuth.ts][proxyauth]                             | configure proxy settings when connecting to the storage service                                              |
| [customizedClientHeaders.ts][customizedclientheaders] | customize request headers such as `X-Ms-Client-Request-Id` using an HTTP policy                              |
| [advancedRequestOptions.ts][advancedrequestoptions]   | use advanced HTTP pipeline and request options for several methods                                           |
| [customPipeline.ts][custompipeline]                   | use custom HTTP pipeline options when connecting to the service                                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/sharedKeyAuth.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dist/sharedKeyAuth.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sharedkeyauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/sharedKeyAuth.ts
[azureadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/azureAdAuth.ts
[anonymousauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/anonymousAuth.ts
[connectionstringauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/connectionStringAuth.ts
[listblobsbyhierarchy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/listBlobsByHierarchy.ts
[listblobsflat]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/listBlobsFlat.ts
[listcontainers]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/listContainers.ts
[snapshots]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/snapshots.ts
[errorsandresponses]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/errorsAndResponses.ts
[proxyauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/proxyAuth.ts
[customizedclientheaders]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/customizedClientHeaders.ts
[advancedrequestoptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/advancedRequestOptions.ts
[custompipeline]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-blob/samples/v12/typescript/src/customPipeline.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-blob
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
