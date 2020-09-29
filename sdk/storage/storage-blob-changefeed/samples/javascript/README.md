---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
urlFragment: storage-blob-changefeed-javascript
---

# Azure Storage Blob client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Storage Blobs Change Feed in some common scenarios.

| **File Name**       | **Description**                                                             |
| ------------------- | --------------------------------------------------------------------------- |
| [basic.js][basic]   | iterate through the Change Feed between a start and end date                |
| [resume.js][resume] | resuming a previous iteration of a Change Feed using the continuation token |

## Prerequisites

The sample are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require Node.js >= 10.0.0.

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the storage account from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like:

```bash
node basic.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basic]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples/javascript/basic.js
[resume]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples/javascript/resume.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-blob-changefeed
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
