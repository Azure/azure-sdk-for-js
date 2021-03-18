---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - azure-text-analytics
urlFragment: ai-text-analytics-typescript
---

# Azure Text Analytics client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Text Analytics in some common scenarios.

| **File Name**                                                             | **Description**                                                                                    |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [analyzeSentiment.ts][analyzesentiment]                                   | analyzes the sentiment of a piece of text                                                          |
| [detectLanguage.ts][detectlanguage]                                       | detects the language of a piece of text                                                            |
| [extractKeyPhrases.ts][extractkeyphrases]                                 | extracts key phrases from a piece of text                                                          |
| [recognizeEntities.ts][recognizeentities]                                 | detects entites in a piece of text and prints them along with the entity type                      |
| [recognizeLinkedEntities.ts][recognizelinkedentities]                     | detects entities that have links to more information on the web                                    |
| [beginAnalyzeHealthcareEntities.ts][beginanalyzehealthcareentities]       | detects healthcare entities in a piece of text and prints them                                     |
| [recognizePii.ts][recognizepii]                                           | detects personally-identifiable information                                                        |
| [authenticationMethods.ts][authenticationmethods]                         | authenticates a service client using both Azure Active Directory and an API key                    |
| [beginAnalyzeBatchActions.ts][beginanalyzebatchactions]                   | extracts key phrases, entities, and pii entities from a piece of text                              |
| [alternativeDocumentInput.ts][alternativedocumentinput]                   | uses object document inputs with attached metadata rather than simple strings for more flexibility |
| [analyzeSentimentWithOpinionMining.ts][analyzesentimentwithopinionmining] | analyzes the sentiment of a piece of text and mine opinions about different targets                |

## Prerequisites

The sample programs are compatible with Node.js >= 12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs. Samples retrieve credentials to access the endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables / credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/analyzeSentiment.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TEXT_ANALYTICS_API_KEY="<text analytics api key>" node dist/analyzeSentiment.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[analyzesentiment]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/analyzeSentiment.ts
[detectlanguage]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/detectLanguage.ts
[extractkeyphrases]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/extractKeyPhrases.ts
[recognizeentities]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/recognizeEntities.ts
[recognizelinkedentities]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/recognizeLinkedEntities.ts
[beginanalyzehealthcareentities]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/beginAnalyzeHealthcareEntities.ts
[recognizepii]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/recognizePii.ts
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/authenticationMethods.ts
[beginanalyzebatchactions]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/beginAnalyzeBatchActions.ts
[alternativedocumentinput]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/alternativeDocumentInput.ts
[analyzesentimentwithopinionmining]: https://github.com/Azure/azure-sdk-for-js/sdk/textanalytics/ai-text-analytics/samples/v5/typescript/src/analyzeSentimentWithOpinionMining.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
