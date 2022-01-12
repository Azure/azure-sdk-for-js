---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
urlFragment: storage-file-datalake-javascript
---

# Azure Data Lake Storage client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Data Lake Storage in some common scenarios.

| **File Name**                                     | **Description**                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| [dataLakeServiceClient.js][datalakeserviceclient] | use `DataLakeServiceClient` to create and read file systems and files |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dataLakeServiceClient.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dataLakeServiceClient.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[datalakeserviceclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-datalake/samples/v12/javascript/dataLakeServiceClient.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/storage-file-datalake
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-file-datalake/README.md
