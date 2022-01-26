---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-search
  - azure-search
urlFragment: search-documents-javascript
---

# Azure Search Documents client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Search Documents in some common scenarios.

| **File Name**                                                       | **Description**                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [bufferedSenderAutoFlushSize.js][bufferedsenderautoflushsize]       | Demonstrates the SearchIndexingBufferedSender with Autoflush based on size.  |
| [bufferedSenderAutoFlushTimer.js][bufferedsenderautoflushtimer]     | Demonstrates the SearchIndexingBufferedSender with Autoflush based on timer. |
| [bufferedSenderManualFlush.js][bufferedsendermanualflush]           | Demonstrates the SearchIndexingBufferedSender with Manual Flush.             |
| [dataSourceConnectionOperations.js][datasourceconnectionoperations] | Demonstrates the DataSource Connection Operations.                           |
| [indexOperations.js][indexoperations]                               | Demonstrates the Index Operations.                                           |
| [indexerOperations.js][indexeroperations]                           | Demonstrates the Indexer Operations.                                         |
| [skillSetOperations.js][skillsetoperations]                         | Demonstrates the Skillset Operations.                                        |
| [synonymMapOperations.js][synonymmapoperations]                     | Demonstrates the SynonymMap Operations.                                      |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Search Documents instance][createinstance_azuresearchdocumentsinstance]

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
node bufferedSenderAutoFlushSize.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" SEARCH_API_ADMIN_KEY="<search api admin key>" node bufferedSenderAutoFlushSize.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bufferedsenderautoflushsize]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/bufferedSenderAutoFlushSize.js
[bufferedsenderautoflushtimer]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/bufferedSenderAutoFlushTimer.js
[bufferedsendermanualflush]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/bufferedSenderManualFlush.js
[datasourceconnectionoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/dataSourceConnectionOperations.js
[indexoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/indexOperations.js
[indexeroperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/indexerOperations.js
[skillsetoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/skillSetOperations.js
[synonymmapoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v11/javascript/synonymMapOperations.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/search-documents
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuresearchdocumentsinstance]: https://docs.microsoft.com/azure/search/search-create-service-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/README.md
