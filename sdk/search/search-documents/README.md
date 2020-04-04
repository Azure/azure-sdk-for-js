# Azure Cognitive Search client library for JavaScript

[Azure Cognitive Search](https://docs.microsoft.com/azure/search/) is a search-as-a-service cloud solution that gives developers APIs and tools for adding a rich search experience over private, heterogeneous content in web, mobile, and enterprise applications.

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

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/search/search/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/search-documents) |
[API reference documentation](https://aka.ms/azsdk-js-search-ref-docs) |
[Product documentation](https://docs.microsoft.com/azure/search/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples)

## Getting started

### Currently supported environments

- [Node.js](https://nodejs.org/) version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Azure Cognitive Search][search_resource] resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```PowerShell
az search service create --resource-group <your-resource-group-name> --name <your-resource-name> --sku S
```

The above creates a resource with the "Standard" pricing tier. See [choosing a pricing tier](https://docs.microsoft.com/azure/search/search-sku-tier) for more information.

### 1. Install the `@azure/search-documents` package

```bash
npm install @azure/search-documents
```

### 2. Create and authenticate a `SearchIndexClient` or `SearchServiceClient`

Azure Cognitive Search uses keys for authentication.

#### Using an Admin Key

Use the [Azure CLI][azure_cli] snippet below to get the Admin Key from the Azure Cognitive Search resource.

```PowerShell
az search admin-key show --resource-group <your-resource-group-name> --service-name <your-resource-name>
```

Alternatively, you can get the endpoint and Admin Key from the resource information in the [Azure Portal][azure_portal].

Once you have an Admin Key, you can use it as follows:

```js
const {
  SearchIndexClient,
  SearchServiceClient,
  AzureKeyCredential
} = require("@azure/search-documents");

// To query and manipulate documents
const indexClient = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

// To manage indexes, datasources, skillsets and more
const serviceClient = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
```

## Key concepts

### SearchIndexClient

`SearchIndexClient` provides methods for working with documents in an index. Its methods allow you to query, upload, update, and delete documents. It also has methods for building auto-completion and search suggestion experiences based on partial queries.

### SearchServiceClient

`SearchServiceClient` provides methods for configuring and customizing an Azure Cognitive Search instance. The client currently has support for creating and managing search indexes and will later expand to support creating and managing other service entities such as indexers, synonym maps, cognitive skillsets, and data sources.

### Documents

An item stored inside a search index. The shape of this document is described in the index using `Field`s. Each Field has a name, a datatype, and additional metadata such as if it is searchable or filterable.

### Pagination

Typically you will only wish to [show a subset of search results](https://docs.microsoft.com/azure/search/search-pagination-page-layout#total-hits-and-page-counts) to a user at one time. To support this, you can use the `top`, `skip` and `includeTotalResultCount` parameters to provide a paged experience on top of search results.

### Document field encoding

[Supported data types](https://docs.microsoft.com/rest/api/searchservice/Supported-data-types) in an index are mapped to JSON types in API requests/responses. The JS client library keeps these mostly the same, with some exceptions:

- `Edm.DateTimeOffset` is converted to a JS `Date`.
- `Edm.GeographyPoint` is converted to a `GeographyPoint` type exported by the client library.
- Special values of the `number` type (NaN, Infinity, -Infinity) are serialized as strings in the REST API, but are converted back to `number` by the client library.

**Note**: Data types are converted based on value, not the field type in the index schema. This means that if you have an ISO8601 Date string (e.g. "2020-03-06T18:48:27.896Z") as the value of a field, it will be converted to a Date regardless of how you stored it in your schema.

## Examples

### SearchIndexClient Examples

#### Query documents in an index

To list all results of a particular query, you can use `search` with a search string that uses [simple query syntax](https://docs.microsoft.com/azure/search/query-simple-syntax):

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const searchResults = await client.search({ searchText: "wifi -luxury" });
  for await (const result of searchResults.results) {
    console.log(result);
  }
}

main();
```

For a more advanced search that uses [Lucene syntax](https://docs.microsoft.com/azure/search/query-lucene-syntax), specify `queryType` to be `all`:

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const searchResults = await client.search({
    searchText: 'Category:budget AND "recently renovated"^3',
    queryType: "full",
    searchMode: "all"
  });
  for await (const result of searchResults.results) {
    console.log(result);
  }
}

main();
```

#### Querying with TypeScript

In TypeScript `SearchIndexClient` takes a generic parameter that is the model shape of your index documents. This allows you to perform strongly typed lookup of fields returned in results. TypeScript is also able to check for fields returned when specifying a `select` parameter.

```ts
import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";

// An example schema for documents in the index
interface Hotel {
  HotelId: string;
  HotelName: string;
  Description: string;
  ParkingIncluded: boolean;
  LastRenovationDate: Date;
  Rating: number;
}

const client = new SearchIndexClient<Hotel>(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const searchResults = await client.search({
    searchText: "wifi -luxury",
    // Only fields in Hotel can be added to this array.
    // TS will complain if one is misspelled.
    select: ["HotelId", "HotelName", "Rating"]
  });

  for await (const result of searchResults.results) {
    // result has HotelId, HotelName, and Rating.
    // Trying to access result.Description would emit a TS error.
    console.log(result.HotelName);
  }
}

main();
```

#### Querying with OData filters

Using the `filter` query parameter allows you to query an index using the syntax of an [OData \$filter expression](https://docs.microsoft.com/azure/search/search-query-odata-filter).

```js
const { SearchIndexClient, AzureKeyCredential, odata } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const baseRateMax = 200;
  const ratingMin = 4;
  const searchResults = await client.search({
    searchText: "WiFi",
    filter: odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`,
    orderBy: ["Rating desc"],
    select: ["HotelId", "HotelName", "Rating"]
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
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const searchResults = await client.search({
    searchText: "WiFi",
    facets: ["Category,count:3,sort:count", "Rooms/BaseRate,interval:100"]
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

#### Retrieving documents by id

A specific document can be retrieved by its primary key value:

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const result = await client.getDocument("1234");
  console.log(result);
}

main();
```

#### Retrieve suggestions from an index

If you [created a suggester](https://docs.microsoft.com/azure/search/index-add-suggesters) on your index, you can use it to return result suggestions for a user query.

This example shows returning the top three suggestions for the input "wifi" from the suggester "sg":

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const suggestResult = await client.suggest({
    searchText: "wifi",
    suggesterName: "sg",
    select: ["HotelId", "HotelName"],
    highlightPreTag: "<em>",
    highlightPostTag: "</em>",
    top: 3
  });

  for (const result of suggestResult.results) {
    console.log(`Suggestion: ${result.HotelName}; Match text: ${result.text}`);
  }
}

main();
```

#### Autocomplete a partial query using an index

To implement type-ahead behavior in your application, you can query the index with partial user input and return a list of suggested completions. You must have [created a suggester](https://docs.microsoft.com/azure/search/index-add-suggesters) on your index first.

The below example tries to complete the string "de" using the suggester named "sg" on the index:

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const autocompleteResult = await client.autocomplete({
    searchText: "de",
    suggesterName: "sg"
  });

  for (const result of autocompleteResult.results || []) {
    console.log(result.text);
  }
}

main();
```

#### Return the count of documents in an index

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const count = await client.countDocuments();
  console.log(`${count} documents in index ${client.indexName}`);
}

main();
```

#### Delete documents in an index

Given the name of a primary key and a list of indexes, you can delete multiple documents from the index at the same time:

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const deleteResult = await client.deleteDocuments("HotelId", ["1", "2", "3"]);
  for (const result of deleteResult.results) {
    console.log(`Deleting ${result.key}; succeeded? ${result.succeeded}`);
  }
}

main();
```

#### Upload documents into an index

You can upload multiple documents into index inside a batch:

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  const uploadResult = await client.uploadDocuments([
    // JSON objects matching the shape of the client's index
    {},
    {},
    {}
  ]);
  for (const result of uploadResult.results) {
    console.log(`Uploaded ${result.key}; succeeded? ${result.succeeded}`);
  }
}

main();
```

#### Update existing documents in an index

You can update multiple documents in an index at once, or create them if they do not exist. For more details about how merging works, see: https://docs.microsoft.com/rest/api/searchservice/AddUpdate-or-Delete-Documents

```js
const { SearchIndexClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchIndexClient(
  "<endpoint>",
  "<indexName>",
  new AzureKeyCredential("<apiKey>")
);

async function main() {
  // use mergeOrUploadDocuments if the document might not be upload
  const updateResult = await client.mergeDocuments(
    [
      // JSON objects matching the shape of the client's index
      {},
      {},
      {}
    ],
    {
      // throw if updating any document in this batch fails
      throwOnAnyFailure: true
    }
  );
  for (const result of updateResult.results) {
    console.log(`Update ${result.key}; succeeded? ${result.succeeded}`);
  }
}

main();
```

### SearchServiceClient Examples

#### Get a list of existing indexes in the service

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const listOfIndexes = await client.listIndexes();
  for (let index of listOfIndexes) {
    console.log(`Index: ${index.name}`);
    for (let field of index.fields) {
      console.log(`\tField: ${field.name}`);
    }
  }
}

main();
```

#### Get a list of existing skillsets in the service

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const listOfSkillSets = await client.listSkillsets();
  for (let skillset of listOfSkillSets) {
    console.log(`Name: ${skillset.name}`);
    console.log(`Description: ${skillset.description}`);
    console.log(`Skills`);
    for (let skill of skillset.skills) {
      console.log(`\tOdatatype: ${skill.odatatype}`);
      console.log(`\tName: ${skill.name}`);
      console.log(`\tDescription: ${skill.description}`);
    }
  }
}

main();
```

#### Get a list of existing synonymMaps in the service

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const listOfSynonymMaps = await client.listSynonymMaps();
  for (let synonymMap of listOfSynonymMaps) {
    console.log(`Name: ${synonymMap.name}`);
    console.log(`Synonyms`);
    for (let synonym of synonymMap.synonyms) {
      console.log(`Synonym: ${synonym}`);
    }
  }
}

main();
```

#### Get a list of existing indexers in the service
```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  let listOfIndexers = await client.listIndexers({
    select: ['name', 'skillsetName', 'dataSourceName']
  });

  for(let indexer of listOfIndexers) {
    console.log(`Name: ${indexer.name}`);
    console.log(`Datasource Name: ${indexer.dataSourceName}`);
    console.log(`Skillset Name: ${indexer.skillsetName}`);
    console.log();
  }
}

main();
```

#### Create an Index

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const result = await client.createIndex({
    name: "example-index",
    fields: [
      {
        type: "Edm.String",
        name: "id",
        key: true
      },
      {
        type: "Edm.Double",
        name: "awesomenessLevel",
        sortable: true,
        filterable: true,
        facetable: true
      },
      {
        type: "Edm.String",
        name: "description",
        searchable: true
      },
      {
        type: "Edm.ComplexType",
        name: "details",
        fields: [
          {
            type: "Collection(Edm.String)",
            name: "tags",
            searchable: true
          }
        ]
      },
      {
        type: "Edm.Int32",
        name: "hiddenWeight",
        hidden: true
      }
    ]
  });

  console.log(result);
}

main();
```

#### Retrieve an existing index and add a new field to it

A common scenario is extending an existing index definition with an additional field. This can be done without repopulating the index, as all fields that are not key fields are nullable.

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const index = await client.getIndex("example-index");

  index.fields.push({
    type: "Edm.DateTimeOffset",
    name: "lastUpdatedOn",
    filterable: true
  });

  const updatedIndex = await client.createOrUpdateIndex(index);

  console.log("Fields after updating:");

  for (const field of updatedIndex.fields) {
    console.log(`\t ${field.name}`);
  }
}

main();
```

#### Define a custom analyzer and test its output

Custom analyzers can be defined per-index and then referenced by name when defining a field in order to influence how searching is performed against that field.

In order to ensure that analysis is configured correctly, developers can directly ask the service to analyze a given input string to check the result.

```js
const {
  SearchServiceClient,
  AzureKeyCredential,
  KnownTokenFilterNames
} = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const index = await client.getIndex("example-index");
  index.tokenizers.push({
    name: "example-tokenizer",
    odatatype: "#Microsoft.Azure.Search.StandardTokenizerV2",
    maxTokenLength: 125
  });
  index.charFilters.push({
    name: "example-char-filter",
    odatatype: "#Microsoft.Azure.Search.MappingCharFilter",
    mappings: ["MSFT=>Microsoft"]
  });
  index.tokenFilters.push({
    name: "example-token-filter",
    odatatype: "#Microsoft.Azure.Search.StopwordsTokenFilter",
    stopwords: ["xyzzy"]
  });
  index.analyzers.push({
    name: "example-analyzer",
    odatatype: "#Microsoft.Azure.Search.CustomAnalyzer",
    tokenizer: "example-tokenizer",
    charFilters: ["example-char-filter"],
    tokenFilters: [KnownTokenFilterNames.Lowercase, "example-token-filter"]
  });

  // Note adding this analyzer to an existing index will cause it to be unresponsive
  // for a short period, hence the need to pass `allowIndexDowntime: true`.
  await client.createOrUpdateIndex(index, { allowIndexDowntime: true });

  const result = await client.analyzeText("example-index", {
    text: "MSFT is xyzzy Great!",
    analyzer: "example-analyzer"
  });

  console.log(result.tokens);
  // Output looks like
  // [
  //   { token: 'microsoft', startOffset: 0, endOffset: 4, position: 0 },
  //   { token: 'is', startOffset: 5, endOffset: 7, position: 1 },
  //   { token: 'great', startOffset: 14, endOffset: 19, position: 3 }
  // ]
}

main();
```

#### Create a Skillset

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const skillset = await client.createSkillset({
    name: `my-azureblob-skillset`,
    description: `Skillset description`,
    skills: [
      {
        odatatype: "#Microsoft.Skills.Text.EntityRecognitionSkill",
        inputs: [
          {
            name: "text",
            source: "/document/merged_content"
          },
          {
            name: "languageCode",
            source: "/document/language"
          }
        ],
        outputs: [
          {
            name: "persons",
            targetName: "people"
          },
          {
            name: "organizations",
            targetName: "organizations"
          },
          {
            name: "locations",
            targetName: "locations"
          }
        ]
      }
    ]
  });
}

main();
```

#### Create an Indexer
```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const indexer = await client.createIndexer({
    name: 'my-azure-indexer-1',
    description: "My Azure Indexer 1",
    dataSourceName: "testblobstoragesjama",  
    targetIndexName: "azureblob-index-2",
    isDisabled: false,
    fieldMappings: [{
      sourceFieldName: "metadata_storage_path",
      targetFieldName: "metadata_storage_path",
      mappingFunction: {
        name: "base64Encode"
      }
    }]
  });
}

main();
```

#### Create a SynonymMap

```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const synonymMap = await client.createSynonymMap({
    name: `my-synonymmap`,
    synonyms: ["United States, United States of America => USA", "Washington, Wash. => WA"]
  });
}

main();
```

#### Retrieve an existing indexer and modify a field in it
```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const indexer = await client.getIndexer("my-azure-indexer-1");
  indexer.isDisabled = true;
  indexer = await client.createOrUpdateIndexer(indexer);
  
  console.log(`Name: ${indexer.name}`);
  console.log(`Description: ${indexer.description}`);
  console.log(`Datasource Name: ${indexer.dataSourceName}`);
  console.log(`Target Index Name: ${indexer.targetIndexName}`);
  console.log(`IsDisabled: ${indexer.isDisabled}`);
  console.log(`Field Mappings`);
  for(let fieldMapping of indexer.fieldMappings) {
    console.log(`\tSource Field Name: ${fieldMapping.sourceFieldName}`);
    console.log(`\tTarget Field Name: ${fieldMapping.targetFieldName}`);
    console.log(`\tMapping Function Name: ${fieldMapping.mappingFunction.name}`);
  }
}



main();
```

### Get the status of an indexer
```js
const { SearchServiceClient, AzureKeyCredential } = require("@azure/search-documents");

const client = new SearchServiceClient("<endpoint>", new AzureKeyCredential("<apiKey>"));

async function main() {
  const indexerStatus = await client.getIndexerStatus('azureblob-indexer');
  console.log(`Name: ${indexerStatus.name}`);
  console.log(`OData Context: ${indexerStatus["@odata.context"]}`);
  console.log(`Status: ${indexerStatus.status}`);
  console.log(`Execution History`);
  for(let execution of indexerStatus.executionHistory) {
    console.log(`\tStatus: ${execution.status}`);
    console.log(`\tFinal Tracking State: ${execution.finalTrackingState}`);
    console.log(`\tInitial Tracking State: ${execution.initialTrackingState}`);
  }
}

main();
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Azure Cognitive Search client library

```bash
export AZURE_LOG_LEVEL=verbose*
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/search/search/samples)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsearch%2Fsearch%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[search_resource]: https://docs.microsoft.com/azure/search/search-create-service-portal
[azure_portal]: https://portal.azure.com
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
