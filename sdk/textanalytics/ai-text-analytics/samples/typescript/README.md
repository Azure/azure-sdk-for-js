---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-text-analytics-typescript
---

# Azure Text Analytics client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Services Text Analytics in some common scenarios.

| **File Name**                                         | **Description**                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [analyzeSentiment.ts][analyzesentiment]               | analyzes the sentiment of a piece of text                                             |
| [detectLanguage.ts][detectlanguages]                 | detects the language of a piece of text                                               |
| [extractKeyPhrases.ts][extractkeyphrases]             | extracts key phrases from a piece of text                                             |
| [recognizeLinkedEntities.ts][recognizelinkedentities] | detects entities that have links to more information on the web                       |
| [tokenAuth.ts][tokenauth]                             | uses Azure Active Directory (RBAC) to authenticate to the Cognitive Services endpoint |
| [recognizeEntities.ts][recognizeentities]             | detects entites in a piece of text and prints them along with the entity type         |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/analyzeSentiment.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TEXT_ANALYTICS_API_KEY="<api key>" node dist/analyzeSentiment.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[analyzesentiment]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/typescript/src/analyzeSentiment.ts
[detectlanguages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/typescript/src/detectLanguage.ts
[extractkeyphrases]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/typescript/src/extractKeyPhrases.ts
[recognizelinkedentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/typescript/src/recognizeLinkedEntities.ts
[tokenauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/typescript/src/tokenAuth.ts
[recognizeentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/typescript/src/recognizeEntities.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
