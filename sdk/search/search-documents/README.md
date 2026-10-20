# Azure AI Search client library for JavaScript

[Azure AI Search](https://learn.microsoft.com/azure/search/) (formerly known as "Azure Cognitive Search") is an AI-powered information retrieval platform that helps developers build rich search experiences and generative AI apps that combine large language models with enterprise data.

The Azure AI Search service is well suited for the following application scenarios:

- Consolidate varied content types into a single searchable index.
  To populate an index, you can push JSON documents that contain your content,
  or if your data is already in Azure, create an indexer to pull in data
  automatically.
- Attach skillsets to an indexer to create searchable content from images
  and unstructured documents. A skillset leverages APIs from Azure AI Services
  for built-in OCR, entity recognition, key phrase extraction, language
  detection, text translation, and sentiment analysis. You can also add
  custom skills to integrate external processing of your content during
  data ingestion.
- In a search client application, implement query logic and user experiences
  similar to commercial web search engines and chat-style apps.

Use the @azure/search-documents client library to:

- Submit queries using vector, keyword, and hybrid query forms.
- Implement filtered queries for metadata, geospatial search, faceted navigation,
  or to narrow results based on filter criteria.
- Create and manage search indexes.
- Upload and update documents in the search index.
- Create and manage indexers that pull data from Azure into an index.
- Create and manage skillsets that add AI enrichment to data ingestion.
- Create and manage analyzers for advanced text analysis or multi-lingual content.
- Optimize results through semantic ranking and scoring profiles to factor in business logic or freshness.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/search-documents)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/search-documents)
- [REST API documentation](https://learn.microsoft.com/rest/api/searchservice/)
- [Product documentation](https://learn.microsoft.com/azure/search/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples)

## Getting started

### Install the `@azure/search-documents` package

```bash
npm install @azure/search-documents
```

Version 14 targets the `2026-10-01` GA service API by default. When upgrading from
version 13, review the [GA-to-GA breaking changes](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md#1400-2026-10-19).
Updated TypeScript and JavaScript examples are available in [samples/v14](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples/v14).

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Microsoft Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Search service][create_search_service_docs]

To create a new search service, you can use the [Azure portal][create_search_service_docs], [Azure PowerShell][create_search_service_ps], or the [Azure CLI][create_search_service_cli]. Here's an example using the Azure CLI to create a free instance for getting started:

```Powershell
az search service create --name <mysearch> --resource-group <mysearch-rg> --sku free --location westus
```

See [choosing a pricing tier](https://learn.microsoft.com/azure/search/search-sku-tier) for more information about available options.

### Authenticate the client

To interact with the search service, create the appropriate client: `SearchClient` for documents, `SearchIndexClient` for indexes and knowledge resources, `SearchIndexerClient` for data sources/indexers/skillsets, or `KnowledgeRetrievalClient` for knowledge-base retrieval. To instantiate a client object, you'll need an **endpoint** and **Azure roles** or an **API key**. You can refer to the documentation for more information on [supported authenticating approaches](https://learn.microsoft.com/azure/search/search-security-overview#authentication) with the search service.

#### Get an API Key

An API key can be an easier approach to start with because it doesn't require pre-existing role assignments.

You can get the **endpoint** and an **API key** from the search service in the [Azure portal](https://portal.azure.com/). Please refer the [documentation](https://learn.microsoft.com/azure/search/search-security-api-keys) for instructions on how to get an API key.

Alternatively, you can use the following [Azure CLI](https://learn.microsoft.com/cli/azure/) command to retrieve the API key from the search service:

```Powershell
az search admin-key show --resource-group <your-resource-group-name> --service-name <your-resource-name>
```

There are two types of keys used to access your search service: **admin** _(read-write)_ and **query** _(read-only)_ keys. Restricting access and operations in client apps is essential to safeguarding the search assets on your service. Always use a query key rather than an admin key for any query originating from a client app.

_Note: The example Azure CLI snippet above retrieves an admin key so it's easier to get started exploring APIs, but it should be managed carefully._

Once you have an api-key, you can use it as follows:

```ts snippet:ReadmeSampleCreateClient_APIKey
import {
  SearchClient,
  AzureKeyCredential,
  SearchIndexClient,
  SearchIndexerClient,
  KnowledgeRetrievalClient,
} from "@azure/search-documents";

// To query and manipulate documents
const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

// To manage indexes and synonymmaps
const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

// To manage indexers, datasources and skillsets
const indexerClient = new SearchIndexerClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

// To retrieve from a knowledge base
const knowledgeRetrievalClient = new KnowledgeRetrievalClient(
  "<endpoint>",
  "<knowledgeBaseName>",
  new AzureKeyCredential("<apiKey>"),
);
```

### Authenticate in a National Cloud

To authenticate in a [National Cloud](https://learn.microsoft.com/azure/active-directory/develop/authentication-national-cloud), you will need to make the following additions to your client configuration:

- Set the `Audience` in `SearchClientOptions`

```ts snippet:ReadmeSampleCreateClient_NationalCloud
import { DefaultAzureCredential } from "@azure/identity";
import {
  SearchClient,
  KnownSearchAudience,
  SearchIndexClient,
  SearchIndexerClient,
  KnowledgeRetrievalClient,
} from "@azure/search-documents";

const credential = new DefaultAzureCredential({
  authorityHost: "https://login.chinacloudapi.cn",
});

// To query and manipulate documents
const searchClient = new SearchClient("<endpoint>", "<indexName>", credential, {
  audience: KnownSearchAudience.AzureChina,
});

// To manage indexes and synonymmaps
const indexClient = new SearchIndexClient("<endpoint>", credential, {
  audience: KnownSearchAudience.AzureChina,
});

// To manage indexers, datasources and skillsets
const indexerClient = new SearchIndexerClient("<endpoint>", credential, {
  audience: KnownSearchAudience.AzureChina,
});

// To retrieve from a knowledge base
const knowledgeRetrievalClient = new KnowledgeRetrievalClient(
  "<endpoint>",
  "<knowledgeBaseName>",
  credential,
  { audience: KnownSearchAudience.AzureChina },
);
```

## Key concepts

An Azure AI Search service contains one or more indexes that provide persistent storage of searchable data in the form of JSON documents. _(If you're brand new to search, you can make a very rough analogy between indexes and database tables.)_ The @azure/search-documents client library
exposes operations on these resources through four main client types.

- `SearchClient` helps with:

  - [Searching](https://learn.microsoft.com/azure/search/search-lucene-query-architecture)
    your indexed documents using [vector queries](https://learn.microsoft.com/azure/search/vector-search-how-to-query),
    [keyword queries](https://learn.microsoft.com/azure/search/search-query-create)
    and [hybrid queries](https://learn.microsoft.com/azure/search/hybrid-search-how-to-query)
  - [Vector query filters](https://learn.microsoft.com/azure/search/vector-search-filters) and [Text query filters](https://learn.microsoft.com/azure/search/search-filters)
  - [Semantic ranking](https://learn.microsoft.com/azure/search/semantic-how-to-query-request) and [scoring profiles](https://learn.microsoft.com/azure/search/index-add-scoring-profiles) for boosting relevance
  - [Autocompleting](https://learn.microsoft.com/rest/api/searchservice/autocomplete) partially typed search terms based on documents in the index
  - [Suggesting](https://learn.microsoft.com/rest/api/searchservice/suggestions) the most likely matching text in documents as a user types
  - [Adding, Updating or Deleting Documents](https://learn.microsoft.com/rest/api/searchservice/addupdate-or-delete-documents) documents from an index

- `SearchIndexClient` allows you to:

  - [Create, delete, update, or configure a search index](https://learn.microsoft.com/rest/api/searchservice/index-operations)
  - [Declare custom synonym maps to expand or rewrite queries](https://learn.microsoft.com/rest/api/searchservice/synonym-map-operations)
  - Manage knowledge bases, knowledge sources, and files uploaded to File knowledge sources

- `SearchIndexerClient` allows you to:
  - [Start indexers to automatically crawl data sources](https://learn.microsoft.com/rest/api/searchservice/indexer-operations)
  - [Define AI powered Skillsets to transform and enrich your data](https://learn.microsoft.com/rest/api/searchservice/skillset-operations)

- `KnowledgeRetrievalClient` allows you to:
  - Retrieve from a knowledge base and inspect its activities and references
  - Stream typed retrieval progress and terminal results as server-sent events

**Note**: Browser use depends on whether the selected Search operation and resource have CORS configured. File knowledge sources and knowledge bases expose CORS settings, but many management operations are intended for trusted server-side applications.

## TypeScript/JavaScript specific concepts

### Documents

An item stored inside a search index. The shape of this document is described in the index using the `fields` property. Each `SearchField` has a name, a datatype, and additional metadata such as if it is searchable or filterable.

### Pagination

Typically you will only wish to [show a subset of search results](https://learn.microsoft.com/azure/search/search-pagination-page-layout#total-hits-and-page-counts) to a user at one time. To support this, you can use the `top`, `skip` and `includeTotalCount` parameters to provide a paged experience on top of search results.

### Document field encoding

[Supported data types](https://learn.microsoft.com/rest/api/searchservice/Supported-data-types) in an index are mapped to JSON types in API requests/responses. The JS client library keeps these mostly the same, with some exceptions:

- `Edm.DateTimeOffset` is converted to a JS `Date`.
- `Edm.GeographyPoint` is converted to a `GeographyPoint` type exported by the client library.
- Special values of the `number` type (NaN, Infinity, -Infinity) are serialized as strings in the REST API, but are converted back to `number` by the client library.

**Note**: Data types are converted based on value, not the field type in the index schema. This means that if you have an ISO8601 Date string (e.g. "2020-03-06T18:48:27.896Z") as the value of a field, it will be converted to a Date regardless of how you stored it in your schema.

## Examples

The following examples demonstrate the basics - please [check out our samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples) for much more.

- [Creating an index](#create-an-index)
- [Retrieving a specific document from your index](#retrieve-a-specific-document-from-an-index)
- [Adding documents to your index](#adding-documents-into-an-index)
- [Perform a search on documents](#perform-a-search-on-documents)
  - [Querying with TypeScript](#querying-with-typescript)
  - [Querying with OData filters](#querying-with-odata-filters)
  - [Querying with facets](#querying-with-facets)
- [Retrieve from a knowledge base](#retrieve-from-a-knowledge-base)
- [Find similar documents](#find-similar-documents)
- [Configure a knowledge base](#configure-a-knowledge-base)
- [List resources with paging controls](#list-resources-with-paging-controls)
- [Configure SharePoint document permissions](#configure-sharepoint-document-permissions)
- [Index SharePoint site content](#index-sharepoint-site-content)
- [Refresh unchanged ADLS Gen2 permissions](#refresh-unchanged-adls-gen2-permissions)
- [Stream knowledge retrieval](#stream-knowledge-retrieval)
- [Check File knowledge source capacity](#check-file-knowledge-source-capacity)
- [Upload and update a knowledge source file](#upload-and-update-a-knowledge-source-file)

The examples below use the stable `2026-10-01` service API, which is the client's default.
They extend the existing index, indexer, knowledge source, and retrieval workflows rather than
requiring a separate set of clients.

For complete runnable workflows, the [sample sources](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples-dev) also cover indexed SQL content
columns, private ingestion and service-selected analyzers, Content Understanding image-description
models and semantic chunking, service/indexer runtime budgets, and Search-owned citation URLs.
The optional resource settings and prerequisites are listed in [sample.env](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/sample.env).

### Find Similar Documents

Use `moreLikeThis` with an existing document key and omit search text. Select top-level searchable
text fields explicitly: complex fields are not supported by this operation. The index must contain
other documents to return useful matches.

```ts snippet:ReadmeSampleSearchMoreLikeThis
import { SearchClient } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchClient("<endpoint>", "<indexName>", new DefaultAzureCredential());

const response = await client.search(undefined, {
  moreLikeThis: "1",
  searchFields: ["hotelName", "description"],
  select: ["hotelId", "hotelName"],
  top: 5,
});
for await (const result of response.results) {
  console.log(result.document);
}
```

### Configure a Knowledge Base

Use a populated knowledge source with semantic search configured. Deploy the configured chat model
and grant the Search service's managed identity **Cognitive Services OpenAI User** on the Azure OpenAI
resource. The deployment name and model name are separate settings; a deployment can have a custom name.
The caller needs **Search Service Contributor** to manage knowledge bases.

Stored instructions, output mode, and reasoning effort can be updated without replacing
the knowledge sources. `answerSynthesis` uses the configured model; `extractiveData` returns extracted
content without synthesizing an answer. GA reasoning modes are `minimal`, `low`, and `medium`.
Explicit request intents bypass model query planning.

```ts snippet:ReadmeSampleConfigureKnowledgeBase
import { SearchIndexClient } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchIndexClient("<endpoint>", new DefaultAzureCredential());

const knowledgeBase = await client.createKnowledgeBase({
  name: "hotel-knowledge-base",
  knowledgeSources: [{ name: "<existingKnowledgeSourceName>" }],
  models: [
    {
      kind: "azureOpenAI",
      azureOpenAIParameters: {
        resourceUrl: "<azureOpenAIEndpoint>",
        deploymentId: "<chatDeploymentName>",
        modelName: "gpt-5.4-mini",
      },
    },
  ],
  retrievalReasoningEffort: { kind: "low" },
  outputMode: "answerSynthesis",
  retrievalInstructions: "Prioritize hotel amenities and pricing information.",
  answerInstructions: "Answer concisely and cite the supporting sources.",
});

knowledgeBase.outputMode = "extractiveData";
await client.createOrUpdateKnowledgeBase(knowledgeBase);
```

### List Resources with Paging Controls

Filter the initial listing by name prefix and let the SDK follow opaque continuation links. The
`SearchIndexClient` pagers expose `byPage()`. The existing synonym-map, indexer, data-source, and skillset
convenience listing methods continue to return arrays after collecting all pages; protocol clients
expose the corresponding paged operations.

```ts snippet:ReadmeSampleListResources
import { SearchIndexClient } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchIndexClient("<endpoint>", new DefaultAzureCredential());

for await (const page of client
  .listIndexes({
    search: "hotel",
    searchType: "prefix",
    pageSize: 10,
  })
  .byPage()) {
  console.log(page.map((index) => index.name));
}
```

### Configure SharePoint Document Permissions

Register the SharePoint connector application and its federated credential before creating the index.
`applicationId` and `federatedCredentialId` are required together; `tenantId` can be provided when it differs
from the Search service tenant. The caller needs **Search Service Contributor**.

An organization-scoped sharing grant uses `orgLink:<tenantId>` in the `userIds` permission field.
`organizationAccessExpiration` identifies its expiration timestamp. At most one top-level
`Edm.DateTimeOffset` field may enable it. The service validates the user's tenant and timestamp during
permission-filtered queries; declaring these fields alone does not grant access.

```ts snippet:ReadmeSampleConfigureSharePointPermissions
import { SearchIndexClient } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchIndexClient("<endpoint>", new DefaultAzureCredential());

await client.createIndex({
  name: "sharepoint-permissions",
  permissionFilterOption: "enabled",
  sharePointConnectorAppRegistration: {
    applicationId: "<applicationId>",
    federatedCredentialId: "<federatedCredentialId>",
  },
  fields: [
    { name: "id", type: "Edm.String", key: true },
    { name: "content", type: "Edm.String", searchable: true },
    {
      name: "userIds",
      type: "Collection(Edm.String)",
      filterable: true,
      permissionFilter: "userIds",
    },
    {
      name: "organizationLinkExpiresAt",
      type: "Edm.DateTimeOffset",
      organizationAccessExpiration: true,
    },
  ],
});
```

### Index SharePoint Site Content

The GA SharePoint scopes include `AllSiteLists`, `AllSitePages`, and `AllSiteContent`, in addition to
the existing library scopes. Supply the connector connection string through the environment rather
than embedding an application secret in source code.

```ts snippet:ReadmeSampleSharePointScope
import { SearchIndexClient, KnownIndexedSharePointContainerName } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchIndexClient("<endpoint>", new DefaultAzureCredential());
const connectionString = process.env.SHAREPOINT_CONNECTION_STRING;
if (!connectionString) {
  throw new Error("Set SHAREPOINT_CONNECTION_STRING before creating the knowledge source.");
}

await client.createKnowledgeSource({
  name: "sharepoint-site",
  kind: "indexedSharePoint",
  indexedSharePointParameters: {
    connectionString,
    containerName: KnownIndexedSharePointContainerName.AllSiteContent,
  },
});
```

### Refresh Unchanged ADLS Gen2 Permissions

For an existing ADLS Gen2 indexer that ingests permissions, `refreshAllAcls` refreshes permission
metadata even when document content has not changed. It defaults to `true`, runs at most once every
24 hours, and does not reprocess content or enrichment. Set it to `false` to disable the refresh.

```ts snippet:ReadmeSampleRefreshIndexerPermissions
import { SearchIndexerClient } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchIndexerClient("<endpoint>", new DefaultAzureCredential());
const indexer = await client.getIndexer("<existingAdlsGen2Indexer>");

indexer.parameters = {
  ...indexer.parameters,
  configuration: {
    ...indexer.parameters?.configuration,
    refreshAllAcls: true,
  },
};
await client.createOrUpdateIndexer(indexer);
```

### Retrieve from a Knowledge Base

```ts snippet:ReadmeSampleRetrieveKnowledge
import {
  KnowledgeRetrievalClient,
  AzureKeyCredential,
  KnownKnowledgeRetrievalReasoningEffortKind,
} from "@azure/search-documents";

const client = new KnowledgeRetrievalClient(
  "<endpoint>",
  "<knowledgeBaseName>",
  new AzureKeyCredential("<apiKey>"),
);

const response = await client.retrieve({
  intents: [{ type: "semantic", search: "What information is available?" }],
  retrievalReasoningEffort: { kind: KnownKnowledgeRetrievalReasoningEffortKind.Low },
  includeActivity: true,
});

console.log(response.response);
```

### Stream Knowledge Retrieval

The typed iterator uses one SSE connection, handles framing and heartbeats, and stops after
`response.completed` or `error`. Completion can report full (`200`) or partial (`206`) results.
Call `controller.abort()` to cancel the request. Unknown event names are ignored; token-delta events
are not part of this API. See the streaming sample for activity correlation and cancellation handling.

```ts snippet:ReadmeSampleRetrieveKnowledgeStream
import { KnowledgeRetrievalClient, AzureKeyCredential } from "@azure/search-documents";

const client = new KnowledgeRetrievalClient(
  "<endpoint>",
  "<knowledgeBaseName>",
  new AzureKeyCredential("<apiKey>"),
);

const controller = new AbortController();
for await (const event of await client.retrieveStream(
  {
    intents: [{ type: "semantic", search: "Summarize the indexed information." }],
    includeActivity: true,
  },
  { abortSignal: controller.signal },
)) {
  if (event.event === "activity.completed") {
    console.log(`Activity ${event.data.id} took ${event.data.elapsedMs}ms`);
  } else if (event.event === "response.completed") {
    console.log(event.data.statusCode === 206 ? "Partial results" : "Complete results");
    console.log(event.data.response.response);
  } else if (event.event === "error") {
    throw new Error(event.data.error.message);
  }
}
```

### Upload and Update a Knowledge Source File

```ts snippet:ReadmeSampleManageKnowledgeSourceFile
import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";

const client = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
const body = {
  metadata: { fileName: "manuals/example.txt", metadata: { category: "manual" } },
  content: {
    contents: new TextEncoder().encode("Azure AI Search retrieves relevant information."),
    contentType: "text/plain",
    filename: "example.txt",
  },
};

const uploaded = await client.uploadKnowledgeSourceFileMultipart("<knowledgeSourceName>", body);
if (!uploaded.fileId) {
  throw new Error("The service did not return an uploaded file ID.");
}

await client.updateKnowledgeSourceFile("<knowledgeSourceName>", uploaded.fileId, {
  ...body,
  metadata: { ...body.metadata, metadata: { category: "updated-manual" } },
});
for await (const file of client.listKnowledgeSourceFiles("<knowledgeSourceName>", {
  prefix: "manuals/",
  pageSize: 10,
})) {
  console.log(file.fileName, file.parsingMode, file.extractionMode);
}
```

### Check File Knowledge Source Capacity

The status of a File knowledge source exposes `fileCapacity` (`KnowledgeSourceFileCapacity`) with the
remaining file count and the per-file byte limit. Check it before uploading; other knowledge source kinds
do not report this field. Direct uploads need **Search Service Contributor**, and the Search service's
managed identity needs **Cognitive Services OpenAI User** on the embedding resource.

```ts snippet:ReadmeSampleKnowledgeSourceCapacity
import { SearchIndexClient } from "@azure/search-documents";
import { DefaultAzureCredential } from "@azure/identity";

const client = new SearchIndexClient("<endpoint>", new DefaultAzureCredential());
const status = await client.getKnowledgeSourceStatus("<fileKnowledgeSourceName>");

if (!status.fileCapacity) {
  throw new Error("The knowledge source did not report File upload capacity.");
}
console.log(`Remaining files: ${status.fileCapacity.remainingFileCount}`);
console.log(`Maximum file size: ${status.fileCapacity.maxFileSizeBytes} bytes`);
```

### Create an Index

```ts snippet:ReadmeSampleCreateIndex
import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";

const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

const result = await indexClient.createIndex({
  name: "example-index",
  fields: [
    {
      type: "Edm.String",
      name: "id",
      key: true,
    },
    {
      type: "Edm.Double",
      name: "awesomenessLevel",
      sortable: true,
      filterable: true,
      facetable: true,
    },
    {
      type: "Edm.String",
      name: "description",
      searchable: true,
    },
    {
      type: "Edm.ComplexType",
      name: "details",
      fields: [
        {
          type: "Collection(Edm.String)",
          name: "tags",
          searchable: true,
        },
      ],
    },
    {
      type: "Edm.Int32",
      name: "hiddenWeight",
      hidden: true,
    },
  ],
});

console.log(`Index created with name ${result.name}`);
```

### Retrieve a specific document from an index

A specific document can be retrieved by its primary key value:

```ts snippet:ReadmeSampleGetDocument
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const result = await searchClient.getDocument("1234");
```

### Adding documents into an index

You can upload multiple documents into index inside a batch:

```ts snippet:ReadmeSampleUploadDocuments
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const uploadResult = await searchClient.uploadDocuments([
  // JSON objects matching the shape of the client's index
  {},
  {},
  {},
]);
for (const result of uploadResult.results) {
  console.log(`Uploaded ${result.key}; succeeded? ${result.succeeded}`);
}
```

### Perform a search on documents

To list all results of a particular query, you can use `search` with a search string that uses [simple query syntax](https://learn.microsoft.com/azure/search/query-simple-syntax):

```ts snippet:ReadmeSampleSearch
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const searchResults = await searchClient.search("wifi -luxury");
for await (const result of searchResults.results) {
  console.log(result);
}
```

For a more advanced search that uses [Lucene syntax](https://learn.microsoft.com/azure/search/query-lucene-syntax), specify `queryType` to be `full`:

```ts snippet:ReadmeSampleSearchLucene
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const searchResults = await searchClient.search('Category:budget AND "recently renovated"^3', {
  queryType: "full",
  searchMode: "all",
});
for await (const result of searchResults.results) {
  console.log(result);
}
```

#### Querying with TypeScript

In TypeScript, `SearchClient` takes a generic parameter that is the model shape of your index documents. This allows you to perform strongly typed lookup of fields returned in results. TypeScript is also able to check for fields returned when specifying a `select` parameter.

```ts snippet:ReadmeSampleSearchWithTypes
import { SearchClient, AzureKeyCredential, SelectFields } from "@azure/search-documents";

// An example schema for documents in the index
interface Hotel {
  hotelId?: string;
  hotelName?: string | null;
  description?: string | null;
  descriptionVector?: Array<number>;
  parkingIncluded?: boolean | null;
  lastRenovationDate?: Date | null;
  rating?: number | null;
  rooms?: Array<{
    beds?: number | null;
    description?: string | null;
  }>;
}

const searchClient = new SearchClient<Hotel>(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const searchResults = await searchClient.search("wifi -luxury", {
  // Only fields in Hotel can be added to this array.
  // TS will complain if one is misspelled.
  select: ["hotelId", "hotelName", "rooms/beds"],
});

// These are other ways to declare the correct type for `select`.
const select = ["hotelId", "hotelName", "rooms/beds"] as const;
// This declaration lets you opt out of narrowing the TypeScript type of your documents,
// though the AI Search service will still only return these fields.
const selectWide: SelectFields<Hotel>[] = ["hotelId", "hotelName", "rooms/beds"];
// This is an invalid declaration. Passing this to `select` will result in a compiler error
// unless you opt out of including the model in the client constructor.
const selectInvalid = ["hotelId", "hotelName", "rooms/beds"];

for await (const result of searchResults.results) {
  // result.document has hotelId, hotelName, and rooms with only the beds property.
  // Trying to access result.document.description would emit a TS error.
  console.log(result.document.hotelName);
}
```

#### Querying with OData filters

Using the `filter` query parameter allows you to query an index using the syntax of an [OData \$filter expression](https://learn.microsoft.com/azure/search/search-query-odata-filter).

```ts snippet:ReadmeSampleSearchWithOData
import { SearchClient, AzureKeyCredential, odata } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const baseRateMax = 200;
const ratingMin = 4;
const searchResults = await searchClient.search("WiFi", {
  filter: odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`,
  orderBy: ["Rating desc"],
  select: ["hotelId", "hotelName", "Rating"],
});
for await (const result of searchResults.results) {
  // Each result will have "HotelId", "HotelName", and "Rating"
  // in addition to the standard search result property "score"
  console.log(result);
}
```

#### Querying with vectors

Text embeddings can be queried using the `vector` search parameter. See [Query vectors](https://learn.microsoft.com/azure/search/vector-search-how-to-query) and [Filter vector queries](https://learn.microsoft.com/azure/search/vector-search-filters) for more information.

```ts snippet:ReadmeSampleSearchWithVector
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const queryVector: number[] = [
  // Embedding of the query "What are the most luxurious hotels?"
];
const searchResults = await searchClient.search("*", {
  vectorSearchOptions: {
    queries: [
      {
        kind: "vector",
        vector: queryVector,
        fields: ["descriptionVector"],
        kNearestNeighborsCount: 3,
      },
    ],
  },
});
for await (const result of searchResults.results) {
  // These results are the nearest neighbors to the query vector
  console.log(result);
}
```

#### Querying with facets

[Facets](https://learn.microsoft.com/azure/search/search-filters-facets) are used to help a user of your application refine a search along pre-configured dimensions. [Facet syntax](https://learn.microsoft.com/rest/api/searchservice/search-documents#facetstring-zero-or-more) provides the options to sort and bucket facet values.

```ts snippet:ReadmeSampleSearchWithFacets
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
);

const searchResults = await searchClient.search("WiFi", {
  facets: ["category,count:3,sort:count", "rooms/baseRate,interval:100"],
});
console.log(searchResults.facets);
```

When retrieving results, a `facets` property will be available that will indicate the number of results that fall into each facet bucket. This can be used to drive refinement (e.g. issuing a follow-up search that filters on the `Rating` being greater than or equal to 3 and less than 4.)

## Troubleshooting

### Logging

Enabling logging can help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

- [Go further with search-documents and our samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples)
- [Read more about the Azure AI Search service](https://learn.microsoft.com/azure/search/search-what-is-azure-search)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

This project has adopted the [Microsoft Open Source Code of Conduct][coc]. For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[search_resource]: https://learn.microsoft.com/azure/search/search-create-service-portal
[azure_portal]: https://portal.azure.com
[cognitive_auth]: https://learn.microsoft.com/azure/cognitive-services/authentication
[create_search_service_docs]: https://learn.microsoft.com/azure/search/search-create-service-portal
[create_search_service_ps]: https://learn.microsoft.com/azure/search/search-manage-powershell#create-or-delete-a-service
[create_search_service_cli]: https://learn.microsoft.com/cli/azure/search/service?view=azure-cli-latest#az-search-service-create
[cla]: https://cla.microsoft.com
[coc]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com
