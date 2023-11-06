# Azure Cognitive Search client library for JavaScript

[Azure Cognitive Search](https://docs.microsoft.com/azure/search/) is a search-as-a-service cloud solution that gives developers APIs and tools for adding a rich search experience over private, heterogeneous content in web, mobile, and enterprise applications.

The Azure Cognitive Search service is well suited for the following application scenarios:

- Consolidate varied content types into a single searchable index. To populate an index, you can push JSON documents that contain your content, or if your data is already in Azure, create an indexer to pull in data automatically.
- Attach skillsets to an indexer to create searchable content from images and large text documents. A skillset leverages AI from Cognitive Services for built-in OCR, entity recognition, key phrase extraction, language detection, text translation, and sentiment analysis. You can also add custom skills to integrate external processing of your content during data ingestion.
- In a search client application, implement query logic and user experiences similar to commercial web search engines.

Use the @azure/search-documents client library to:

- Submit queries for simple and advanced query forms that include fuzzy search, wildcard search, regular expressions.
- Implement filtered queries for faceted navigation, geospatial search, or to narrow results based on filter criteria.
- Create and manage search indexes.
- Upload and update documents in the search index.
- Create and manage indexers that pull data from Azure into an index.
- Create and manage skillsets that add AI enrichment to data ingestion.
- Create and manage analyzers for advanced text analysis or multi-lingual content.
- Optimize results through scoring profiles to factor in business logic or freshness.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/search-documents)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/search-documents)
- [REST API documentation](https://docs.microsoft.com/rest/api/searchservice/)
- [Product documentation](https://docs.microsoft.com/azure/search/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples)

## Getting started

### Install the `@azure/search-documents` package

```bash
npm install @azure/search-documents
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Search service][create_search_service_docs]

To create a new search service, you can use the [Azure portal][create_search_service_docs], [Azure PowerShell][create_search_service_ps], or the [Azure CLI][create_search_service_cli]. Here's an example using the Azure CLI to create a free instance for getting started:

```Powershell
az search service create --name <mysearch> --resource-group <mysearch-rg> --sku free --location westus
```

See [choosing a pricing tier](https://docs.microsoft.com/azure/search/search-sku-tier) for more information about available options.

### Authenticate the client

All requests to a search service need an API key that was generated specifically for your service. [The API key is the sole mechanism for authenticating access to your search service endpoint.](https://docs.microsoft.com/azure/search/search-security-api-keys)

You can obtain your api-key from the [Azure portal](https://portal.azure.com/) or via the Azure CLI:

```PowerShell
az search admin-key show --resource-group <your-resource-group-name> --service-name <your-resource-name>
```

Alternatively, you can get the endpoint and Admin Key from the resource information in the [Azure Portal][azure_portal].

There are two types of keys used to access your search service: **admin** _(read-write)_ and **query** _(read-only)_ keys. Restricting access and operations in client apps is essential to safeguarding the search assets on your service. Always use a query key rather than an admin key for any query originating from a client app.

_Note: The example Azure CLI snippet above retrieves an admin key so it's easier to get started exploring APIs, but it should be managed carefully._

Once you have an api-key, you can use it as follows:

```js
const {
  SearchClient,
  SearchIndexClient,
  SearchIndexerClient,
  AzureKeyCredential,
} = require("@azure/search-documents");

// To query and manipulate documents
const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

// To manage indexes and synonymmaps
const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

// To manage indexers, datasources and skillsets
const indexerClient = new SearchIndexerClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
```

### Authenticate in a National Cloud

To authenticate in a [National Cloud](https://docs.microsoft.com/azure/active-directory/develop/authentication-national-cloud), you will need to make the following additions to your client configuration:

- Set the `Audience` in `SearchClientOptions`

```js
const {
  SearchClient,
  SearchIndexClient,
  SearchIndexerClient,
  AzureKeyCredential,
  KnownSearchAudience,
} = require("@azure/search-documents");

// To query and manipulate documents
const searchClient = new SearchClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>"),
  {
    audience: KnownSearchAudience.AzureChina,
  }
);

// To manage indexes and synonymmaps
const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"), {
  audience: KnownSearchAudience.AzureChina,
});

// To manage indexers, datasources and skillsets
const indexerClient = new SearchIndexerClient("<endpoint>", new AzureKeyCredential("<apiKey>"), {
  audience: KnownSearchAudience.AzureChina,
});
```

## Key concepts

An Azure Cognitive Search service contains one or more indexes that provide persistent storage of searchable data in the form of JSON documents. _(If you're brand new to search, you can make a very rough analogy between indexes and database tables.)_ The @azure/search-documents client library
exposes operations on these resources through three main client types.

- `SearchClient` helps with:
  - [Searching](https://docs.microsoft.com/azure/search/search-lucene-query-architecture) your indexed documents using [rich queries](https://docs.microsoft.com/azure/search/search-query-overview) and [powerful data shaping](https://docs.microsoft.com/azure/search/search-filters)
  - [Autocompleting](https://docs.microsoft.com/rest/api/searchservice/autocomplete) partially typed search terms based on documents in the index
  - [Suggesting](https://docs.microsoft.com/rest/api/searchservice/suggestions) the most likely matching text in documents as a user types
  - [Adding, Updating or Deleting Documents](https://docs.microsoft.com/rest/api/searchservice/addupdate-or-delete-documents) documents from an index
- `SearchIndexClient` allows you to:
  - [Create, delete, update, or configure a search index](https://docs.microsoft.com/rest/api/searchservice/index-operations)
  - [Declare custom synonym maps to expand or rewrite queries](https://docs.microsoft.com/rest/api/searchservice/synonym-map-operations)
- `SearchIndexerClient` allows you to:
  - [Start indexers to automatically crawl data sources](https://docs.microsoft.com/rest/api/searchservice/indexer-operations)
  - [Define AI powered Skillsets to transform and enrich your data](https://docs.microsoft.com/rest/api/searchservice/skillset-operations)

**Note**: These clients cannot function in the browser because the APIs it calls do not have support for Cross-Origin Resource Sharing (CORS).

## TypeScript/JavaScript specific concepts

### Documents

An item stored inside a search index. The shape of this document is described in the index using `Field`s. Each Field has a name, a datatype, and additional metadata such as if it is searchable or filterable.

### Pagination

Typically you will only wish to [show a subset of search results](https://docs.microsoft.com/azure/search/search-pagination-page-layout#total-hits-and-page-counts) to a user at one time. To support this, you can use the `top`, `skip` and `includeTotalCount` parameters to provide a paged experience on top of search results.

### Document field encoding

[Supported data types](https://docs.microsoft.com/rest/api/searchservice/Supported-data-types) in an index are mapped to JSON types in API requests/responses. The JS client library keeps these mostly the same, with some exceptions:

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

### Create an Index

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const result = await client.createIndex({
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

  console.log(result);
}

main();
```

### Retrieve a specific document from an index

A specific document can be retrieved by its primary key value:

```js
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchClient("<endpoint>", "<indexName>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const result = await client.getDocument("1234");
  console.log(result);
}

main();
```

### Adding documents into an index

You can upload multiple documents into index inside a batch:

```js
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchClient("<endpoint>", "<indexName>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const uploadResult = await client.uploadDocuments([
    // JSON objects matching the shape of the client's index
    {},
    {},
    {},
  ]);
  for (const result of uploadResult.results) {
    console.log(`Uploaded ${result.key}; succeeded? ${result.succeeded}`);
  }
}

main();
```

### Perform a search on documents

To list all results of a particular query, you can use `search` with a search string that uses [simple query syntax](https://docs.microsoft.com/azure/search/query-simple-syntax):

```js
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchClient("<endpoint>", "<indexName>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const searchResults = await client.search("wifi -luxury");
  for await (const result of searchResults.results) {
    console.log(result);
  }
}

main();
```

For a more advanced search that uses [Lucene syntax](https://docs.microsoft.com/azure/search/query-lucene-syntax), specify `queryType` to be `full`:

```js
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchClient("<endpoint>", "<indexName>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const searchResults = await client.search('Category:budget AND "recently renovated"^3', {
    queryType: "full",
    searchMode: "all",
  });
  for await (const result of searchResults.results) {
    console.log(result);
  }
}

main();
```

#### Querying with TypeScript

In TypeScript `SearchClient` takes a generic parameter that is the model shape of your index documents. This allows you to perform strongly typed lookup of fields returned in results. TypeScript is also able to check for fields returned when specifying a `select` parameter.

```ts
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

// An example schema for documents in the index
interface Hotel {
  HotelId: string;
  HotelName: string;
  Description: string;
  ParkingIncluded: boolean;
  LastRenovationDate: Date;
  Rating: number;
}

const client = new SearchClient<Hotel>(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const searchResults = await client.search("wifi -luxury", {
    // Only fields in Hotel can be added to this array.
    // TS will complain if one is misspelled.
    select: ["HotelId", "HotelName", "Rating"],
  });

  for await (const result of searchResults.results) {
    // result.document has HotelId, HotelName, and Rating.
    // Trying to access result.document.Description would emit a TS error.
    console.log(result.document.HotelName);
  }
}

main();
```

#### Querying with OData filters

Using the `filter` query parameter allows you to query an index using the syntax of an [OData \$filter expression](https://docs.microsoft.com/azure/search/search-query-odata-filter).

```js
const { SearchClient, AzureKeyCredential, odata } = require("@azure/search-documents");

const client = new SearchClient("<endpoint>", "<indexName>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const baseRateMax = 200;
  const ratingMin = 4;
  const searchResults = await client.search("WiFi", {
    filter: odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`,
    orderBy: ["Rating desc"],
    select: ["HotelId", "HotelName", "Rating"],
  });
  for await (const result of searchResults.results) {
    // Each result will have "HotelId", "HotelName", and "Rating"
    // in addition to the standard search result property "score"
    console.log(result);
  }
}

main();
```

#### Querying with facets

[Facets](https://docs.microsoft.com/azure/search/search-filters-facets) are used to help a user of your application refine a search along pre-configured dimensions. [Facet syntax](https://docs.microsoft.com/rest/api/searchservice/search-documents#facetstring-zero-or-more) provides the options to sort and bucket facet values.

```js
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchClient("<endpoint>", "<indexName>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const searchResults = await client.search("WiFi", {
    facets: ["Category,count:3,sort:count", "Rooms/BaseRate,interval:100"],
  });
  console.log(searchResults.facets);
  // Output will look like:
  // {
  //   'Rooms/BaseRate': [
  //     { count: 16, value: 0 },
  //     { count: 17, value: 100 },
  //     { count: 17, value: 200 }
  //   ],
  //   Category: [
  //     { count: 5, value: 'Budget' },
  //     { count: 5, value: 'Luxury' },
  //     { count: 5, value: 'Resort and Spa' }
  //   ]
  // }
}

main();
```

When retrieving results, a `facets` property will be available that will indicate the number of results that fall into each facet bucket. This can be used to drive refinement (e.g. issuing a follow-up search that filters on the `Rating` being greater than or equal to 3 and less than 4.)

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

- [Go further with search-documents and our samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/search/search-documents/samples)
- [Watch a demo or deep dive video](https://azure.microsoft.com/resources/videos/index/?services=search)
- [Read more about the Azure Cognitive Search service](https://docs.microsoft.com/azure/search/search-what-is-azure-search)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

This project has adopted the [Microsoft Open Source Code of Conduct][coc].For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsearch%2Fsearch%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[azure_portal]: https://portal.azure.com
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
[create_search_service_docs]: https://docs.microsoft.com/azure/search/search-create-service-portal
[create_search_service_ps]: https://docs.microsoft.com/azure/search/search-manage-powershell#create-or-delete-a-service
[create_search_service_cli]: https://docs.microsoft.com/cli/azure/search/service?view=azure-cli-latest#az-search-service-create
[cla]: https://cla.microsoft.com
[coc]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com
