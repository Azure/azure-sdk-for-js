---
page_type: sample
languages:
  - javascript
  - nodejs
name: Quickstart in JavaScript
description: |
  Learn how to create and load an Azure Cognitive Search index using the Azure SDK for Javascript, and then use that index for chat operations using the Azure OpenAI SDK for Javascript.
products:
  - azure
  - azure-cognitive-search
  - azure-openai
urlFragment: javascript-quickstart
---

# JavaScript quickstart for integrating Azure Cognitive Search with Azure OpenAI

![Quickstart sample MIT license badge](https://img.shields.io/badge/license-MIT-green.svg)

Demonstrates using JavaScript to use the [Azure Search SDK for JavaScript/TypeScript](https://docs.microsoft.com/javascript/api/overview/azure/search-documents-readme?view=azure-node-latest) to create an Azure Cognitive Search index, load it with documents, and then integrate that search resource with the [Azure OpenAI SDK for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/openai-readme?view=azure-node-preview). The index is modeled on a subset of the Hotels dataset, reduced for readability and comprehension. Index definition and documents are included in the code.

## Prerequisites

+ [Node.js](https://nodejs.org).
+ [NPM](https://www.npmjs.com) should be installed by Node.js.
+ [Create a search service in the portal](https://learn.microsoft.com/azure/search/search-create-service-portal) or [find an existing service](https://ms.portal.azure.com/#blade/HubsExtension/BrowseResourceBlade/resourceType/Microsoft.Search%2FsearchServices) under your current subscription. You can use a free service for this quickstart.
+ [Create and deploy an Azure OpenAI Service resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) under your current subscription. You can use a free service for this quickstart.

## Set up the sample

1. Clone or download this sample repository.

1. Open the folder in Visual Studio Code and navigate to the samples/cookbook/bring-your-own-data folder:

   ```cmd
   cd samples/cookbook/bringYourOwnData
   ```

1. Install the dependencies using `npm`:

    ```bash
    npm install
    ```

1. Edit the file `sample.env`, adding the connection information that's valid for your Azure Cognitive Search service. See 

   ```nodejs
   SEARCH_API_KEY=<search-admin-key>
   SEARCH_API_ENDPOINT=https://<search-service-name>.search.windows.net
   AZURE_API_KEY=<openai_resource_key>
   AZURE_OPENAI_ENDPOINT=<your_azure_openai_endpoint>
   AZURE_OPENAI_DEPLOYMENT_ID=<name_of_chat_deployment>
   ```

1. Rename `sample.env` to just `.env`. The quickstart will read the `.env` file automatically.

## Create the Search Index and Load the sample data

1. Run the following command to create the search index on your azure search resource, load data using that index, and then run an example question with ChatGPT against that search index.

    ```bash
    node index.js
    ```

You should see a series of messages relating to the creation of the search index, adding documents to it, and, finally, results of a sample ChatGPT question.

If you get a 401 error, make sure the API key is correct (you need an admin API key to create objects), and make sure the search service is configured for [key-based authentication](https://learn.microsoft.com/azure/search/search-security-api-keys).

## Key concepts

The file **hotels_quickstart_index.json** holds the definition of an index for the data in the file **hotels.json**. Review those files to see the fields, which ones are searchable, etc.

The file **index.js** automatically reads the **.env** file which contains the  `SEARCH_API_KEY` and `SEARCH_API_ENDPOINT` needed to create the `SearchIndexClient`. The `sleep` function is used to pause execution in between major steps such as creating the index, submitting data for indexing, etc. Such pauses are generally only needed in test, demo, and sample code.

The `run` function :

+ Checks if the `hotels-quickstart` index exists.
+ If so, the program deletes the existing index.
+ Creates a new `hotels-quickstart` index from the structure in **hotels_quickstart_index.json**.
+ Adds the data from **hotels.json** to the `hotels-quickstart` index.
+ Sends a question to Chat GPT regarding the loaded search data.

## Next steps

You can learn more about Azure OpenAI on the [official documentation site](https://docs.microsoft.com/azure/ai-services/openai/).

You can view additional samples for JavaScript/TypeScript in the [azure-sdk-for-js repo](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/openai/openai/samples) or see the [documentation](https://docs.microsoft.com/javascript/api/overview/azure/openai-readme?view=azure-node-preview).
