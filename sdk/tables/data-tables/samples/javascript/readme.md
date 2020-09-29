---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-storage
  - azure-cosmosdb
urlFragment: data-tables-javascript
---

# Azure Tables client library samples for Javascript

These sample programs show how to use the Javascript client libraries for Azure Tables in some common scenarios.

| **File Name**                                         | **Description**                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [authenticationMethods.js][authenticationmethods]     | Different ways to authenticate with the Tables Service                                               |
| [createAndDeleteTable.js][createanddeletetable]       | Create a new table and how to delete it                                                              |
| [quertTables.js][querttables]                         | List all tables in an account using an optional filter                                               |
| [createAndDeleteEntities.js][createanddeleteentities] | Create a new entity and how to delete it                                                             |
| [queryEntities.js][queryentities]                     | List entities in a table using optional filters                                                      |
| [updateAndUpsertEntities.js][updateandupsertentities] | Upsert a new entity, replace it with a new one, retreive the entity and update with a `merge` method |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async for await syntax, which require a Node.js >= 10.0.0.

You need [an Azure subscription][freesub] and [an Azure Storage account][azstorage] to run these sample programs. Samples retrieve credentials to access the Tables Service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node createAndDeleteTable.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples/javascript/src/authenticationMethods.js
[createanddeletetable]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples/javascript/src/createAndDeleteTable.js
[querttables]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples/javascript/src/queryTables.js
[createanddeleteentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples/javascript/src/createAndDeleteEntities.js
[queryentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples/javascript/src/queryEntities.js
[updateandupsertentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples/javascript/src/updateAndUpsertEntities.js
[apiref]: https://azure.github.io/azure-sdk-for-js/tables.html
[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/README.md
