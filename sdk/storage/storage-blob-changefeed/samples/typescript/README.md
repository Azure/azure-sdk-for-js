---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-storage
urlFragment: storage-blob-changefeed-typescript
---

# Azure Storage Blob Change Feed client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Storage Blobs in some common scenarios.

| **File Name**       | **Description**                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| [basic.ts][basic]   | iterate through the Change Feed between a start and end date                |
| [resume.ts][resume] | resuming a previous iteration of a Change Feed using the continuation token |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require a Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the storage account from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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

4. Run whichever samples you like:

```bash
node dist/basic.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dist/basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples/typescript/src/basic.ts
[resume]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples/typescript/src/resume.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-blob-changefeed
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[typescript]: https://www.typescriptlang.org/docs/home.html
