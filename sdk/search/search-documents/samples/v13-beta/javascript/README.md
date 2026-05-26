---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-search
  - azure-search
urlFragment: search-documents-javascript-beta
---

# Azure Search Documents client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Search Documents in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bufferedSenderAutoFlushSize.js][bufferedsenderautoflushsize]       | Demonstrates the SearchIndexingBufferedSender with Autoflush based on size.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [bufferedSenderAutoFlushTimer.js][bufferedsenderautoflushtimer]     | Demonstrates the SearchIndexingBufferedSender with Autoflush based on timer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [bufferedSenderManualFlush.js][bufferedsendermanualflush]           | Demonstrates the SearchIndexingBufferedSender with Manual Flush.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [dataSourceConnectionOperations.js][datasourceconnectionoperations] | Demonstrates the DataSource Connection Operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [indexOperations.js][indexoperations]                               | Demonstrates the Index Operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [indexerOperations.js][indexeroperations]                           | Demonstrates the Indexer Operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [knowledgeBaseOperations.js][knowledgebaseoperations]               | Demonstrates the Knowledge Base Operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [knowledgeRetrievalOperations.js][knowledgeretrievaloperations]     | Demonstrates Knowledge Retrieval against a `KnowledgeBase` that is composed of multiple knowledge source kinds, including the preview kinds added in `13.1.0-beta.1` (e.g. `file`). The sample provisions a `searchIndex` knowledge source and a `file` knowledge source (with a real file upload), bundles them into a `KnowledgeBase`, and then issues a `retrieve` call through the `KnowledgeRetrievalClient`. The provisioning step is skipped if `KNOWLEDGE_BASE_NAME` is provided — in that case the sample only runs the retrieval call against the pre-existing knowledge base. |
| [knowledgeSourceOperations.js][knowledgesourceoperations]           | Demonstrates the Knowledge Source Operations, including the preview knowledge source kinds added in `13.1.0-beta.1`: `file`, `indexedSharePoint`, `remoteSharePoint`, `workIQ`, `fabricDataAgent`, and `fabricOntology`. The script creates a `searchIndex` knowledge source and a `file` knowledge source (including a file upload), and shows how the other preview kinds are constructed without creating them — they require pre-provisioned external resources (SharePoint sites, Fabric workspaces, etc.).                                                                         |
| [searchClientOperations.js][searchclientoperations]                 | Demonstrates the SearchClient.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [skillSetOperations.js][skillsetoperations]                         | Demonstrates the Skillset Operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [stickySession.js][stickysession]                                   | Demonstrates user sticky sessions, a way to reduce inconsistent behavior by targeting a single replica.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [synonymMapOperations.js][synonymmapoperations]                     | Demonstrates the SynonymMap Operations.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [vectorSearch.js][vectorsearch]                                     | Demonstrates vector search                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" node bufferedSenderAutoFlushSize.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bufferedsenderautoflushsize]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/bufferedSenderAutoFlushSize.js
[bufferedsenderautoflushtimer]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/bufferedSenderAutoFlushTimer.js
[bufferedsendermanualflush]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/bufferedSenderManualFlush.js
[datasourceconnectionoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/dataSourceConnectionOperations.js
[indexoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/indexOperations.js
[indexeroperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/indexerOperations.js
[knowledgebaseoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/knowledgeBaseOperations.js
[knowledgeretrievaloperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/knowledgeRetrievalOperations.js
[knowledgesourceoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/knowledgeSourceOperations.js
[searchclientoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/searchClientOperations.js
[skillsetoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/skillSetOperations.js
[stickysession]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/stickySession.js
[synonymmapoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/synonymMapOperations.js
[vectorsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/samples/v13-beta/javascript/vectorSearch.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/search-documents?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuresearchdocumentsinstance]: https://learn.microsoft.com/azure/search/search-create-service-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/README.md
