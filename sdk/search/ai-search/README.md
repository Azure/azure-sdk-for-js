# Azure Cognitive Search client library for JavaScript

[Azure Cognitive Search](https://docs.microsoft.com/en-us/azure/search/) is a search-as-a-service cloud solution that gives developers APIs and tools for adding a rich search experience over private, heterogeneous content in web, mobile, and enterprise applications.

Azure Cognitive Search is well suited for the following application scenarios:

- Consolidate varied content types into a single searchable index. Populate the index with your own JSON documents or, if your content is already in Azure, you can create an indexer to pull in data automatically.
- Import raw content such as text, images, or Office files from Azure Blob storage or Cosmos DB.
- Easily implement your own search capabilities similar to commercial web search engines. Azure Cognitive Search APIs simplify query construction, faceted navigation, filters (including geo-spatial search), synonym mapping, typeahead queries, and relevance tuning.
- Index unstructured text and extract both text and information from images. AI enrichment enables capabilities such as OCR, entity recognition, key phrase extraction, language detection, text translation, and sentiment analysis.

Use the client library to:

- Create and manage search indexes.
- Upload and update documents in the search index.
- Manage indexers that pull data from a data source into an index.
- Query documents in the index with a powerful set of search APIs that support faceted navigation, typeahead queries, suggestions, and geo-spatial search.
- Enrich your search index with AI skills that add structure or extract meaning from raw documents during indexing.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/search/ai-search/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-search) |
[API reference documentation](https://aka.ms/azsdk-js-search-ref-docs) |
[Product documentation](https://docs.microsoft.com/en-us/azure/search/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/ai-search/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Search][search_resource] resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az search service create --resource-group <your-resource-group-name> --name <your-resource-name> --sku S
```

The above creates a resource with the "Standard" pricing tier. See [choosing a pricing tier](https://docs.microsoft.com/en-us/azure/search/search-sku-tier) for more information.

### 1. Install the `@azure/ai-search` package

```bash
npm install @azure/ai-search
```

### 2. Create and authenticate a `SearchIndexClient`

Cognitive Search uses keys for authentication.

#### Using an Admin Key

Use the [Azure CLI][azure_cli] snippet below to get the Admin Key from the Cognitive Search resource.

```PowerShell
az search admin-key show --resource-group <your-resource-group-name> --service-name <your-resource-name>
```

Alternatively, you can get the endpoint and Admin Key from the resource information in the [Azure Portal][azure_portal].

Once you have an Admin Key, you can use it as follows:

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);
```

## Key concepts

### SearchIndexClient

`SearchIndexClient` is one of the primary interface for developers using the Cognitive Search client library. It provides asynchronous methods for working with documents in an index.

## Examples

### Query documents in an index

To list all results of a particular query, you can use `listSearchResults` with a search string that uses [simple query syntax](https://docs.microsoft.com/en-us/azure/search/query-simple-syntax):

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

for await (const result of client.listSearchResults("wifi -luxury")) {
  console.log(result);
}
```

For a more advanced search that uses [Lucene syntax](https://docs.microsoft.com/en-us/azure/search/query-lucene-syntax), specify `queryType` to be `all`:

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

for await (const result of client.listSearchResults('category:budget AND "recently renovated"^3', {
  queryType: "full",
  searchMode: "all"
})) {
  console.log(result);
}
```

### Querying with OData filters

Using the `filter` query parameter allows you to query an index using the syntax of an [OData \$filter expression](https://docs.microsoft.com/en-us/azure/search/search-query-odata-filter).

```js
const { SearchIndexClient, SearchApiKeyCredential, odata } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const baseRateMax = 200;
const ratingMin = 4;
const iterator = client.listSearchResults("WiFi", {
  filter: odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`,
  orderBy: "Rating desc",
  select: ["HotelId", "HotelName", "Rating"]
});
for await (const result of iterator) {
  // Each result will have "HotelId", "HotelName", and "Rating"
  // in addition to the standard search result property "score"
  console.log(result);
}
```

### Querying with facets

[Facets](https://docs.microsoft.com/en-us/azure/search/search-filters-facets) are used to help a user of your application refine a search along pre-configured dimensions. [Facet syntax](https://docs.microsoft.com/en-us/rest/api/searchservice/search-documents#facetstring-zero-or-more) provides the options to sort and bucket facet values.

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const iterator = await client
  .listSearchResults("WiFi", {
    facets: ["Category,count:3,sort:count", "Rooms/BaseRate,interval:100"]
  })
  .byPage();
const page = (await iterator.next()).value;

console.log(page.facets);
// Output will look like:
// {
//   Rating: [
//     { count: 4, value: 2 },
//     { count: 5, value: 3 },
//     { count: 8, value: 4 }
//   ],
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
```

When retrieving results, a `facets` property will be available that will indicate the number of results that fall into each facet bucket. This can be used to drive refinement (e.g. issuing a follow-up search that filters on the `Rating` being greater than or equal to 3 and less than 4.)

### Retrieving documents by id

A specific document can be retrieved by its primary key value:

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const result = await client.getDocument("1234");
console.log(result);
```

### Retrieve suggestions from an index

If you [created a suggester](https://docs.microsoft.com/en-us/azure/search/index-add-suggesters) on your index, you can use it to return result suggestions for a user query.

This example shows returning the top three suggestions for the input "wifi" from the suggester "sg":

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const suggesterName = "sg";
const suggestResult = await client.suggest("wifi", suggesterName, {
  select: ["HotelId", "HotelName"],
  highlightPreTag: "<em>",
  highlightPostTag: "</em>",
  top: 3
});

for (const result of suggestResult.results) {
  console.log(`Suggestion: ${result.HotelName}; Match text: ${result.text}`);
}
```

### Autocomplete a partial query using an index

To implement type-ahead behavior in your application, you can query the index with partial user input and return a list of suggested completions. You must have [created a suggester](https://docs.microsoft.com/en-us/azure/search/index-add-suggesters) on your index first.

The below example tries to complete the string "de" using the suggester named "sg" on the index:

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);
const suggesterName = "sg";
const autocompleteResult = await client.autocomplete("de", suggesterName);

for (const result of autocompleteResult.results || []) {
  console.log(result.text);
}
```

### Return the count of documents in an index

```js
const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const count = await client.count();
console.log(`${count} documents in index ${client.indexName}`);
```

### Delete documents in an index

Given the name of a primary key and a list of indexes, you can delete multiple documents from the index at the same time:

```js

const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const deleteResult = await client.deleteDocuments("HotelId", ["1", "2", "3"]);
for (const result of deleteResult.results) {
  console.log(`Deleting ${result.key}; succeeded? ${result.succeeded}`);
}
```

### Upload documents into an index

You can upload multiple documents into index inside a batch:

```js

const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const uploadResult = await client.uploadDocuments([
  // JSON objects matching the shape of the client's index
  { ... },
  { ... },
  { ... }
]);
for (const result of uploadResult.results) {
  console.log(`Uploaded ${result.key}; succeeded? ${result.succeeded}`);
}
```

### Update existing documents in an index

You can update multiple documents in an index at once, or create them if they do not exist. For more details about how merging works, see: https://docs.microsoft.com/en-us/rest/api/searchservice/AddUpdate-or-Delete-Documents

```js

const { SearchIndexClient, SearchApiKeyCredential } = require("@azure/ai-search");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new SearchApiKeyCredential("<Admin Key>");
);

const updateResult = await client.updateDocuments([
  // JSON objects matching the shape of the client's index
  { ... },
  { ... },
  { ... }
], {
  // update existing document if primary key exists
  mergeIfExists: true,
  // throw if updating any document in this batch fails
  throwOnAnyFailure: true
});
for (const result of updateResult.results) {
  console.log(`Update ${result.key}; succeeded? ${result.succeeded}`);
}
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Azure Search client library

```bash
export AZURE_LOG_LEVEL=verbose*
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/ai-search/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsearch%2Fai-search%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[search_resource]: https://docs.microsoft.com/en-us/azure/search/search-create-service-portal
[azure_portal]: https://portal.azure.com
[cognitive_auth]: https://docs.microsoft.com/en-us/azure/cognitive-services/authentication
