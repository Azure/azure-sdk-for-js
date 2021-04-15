---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-table-storage
urlFragment: data-tables-javascript
---

# Azure Data Tables client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Data Tables in some common scenarios.

| **File Name**                                         | **Description**                                      |
| ----------------------------------------------------- | ---------------------------------------------------- |
| [authenticationMethods.js][authenticationmethods]     | authenticates using different authentication methods |
| [batchOperations.js][batchoperations]                 | sends transactional batch requests                   |
| [createAndDeleteEntities.js][createanddeleteentities] | creates and deletes a entities in a table            |
| [createAndDeleteTable.js][createanddeletetable]       | creates and deletes a table                          |
| [queryEntities.js][queryentities]                     | queries entities in a table                          |
| [queryTables.js][querytables]                         | queries tables                                       |
| [updateAndUpsertEntities.js][updateandupsertentities] | updates and upserts entities in a table              |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Storage instance][createinstance_azurestorageinstance]

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
node authenticationMethods.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env TABLES_URL="<tables url>" ACCOUNT_CONNECTION_STRING="<account connection string>" ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" SAS_CONNECTION_STRING="<sas connection string>" SAS_TOKEN="<sas token>" node authenticationMethods.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/authenticationMethods.js
[batchoperations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/batchOperations.js
[createanddeleteentities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/createAndDeleteEntities.js
[createanddeletetable]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/createAndDeleteTable.js
[queryentities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/queryEntities.js
[querytables]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/queryTables.js
[updateandupsertentities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/javascript/updateAndUpsertEntities.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/data-tables
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageinstance]: https://docs.microsoft.com/azure/storage/tables/table-storage-quickstart-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/README.md
