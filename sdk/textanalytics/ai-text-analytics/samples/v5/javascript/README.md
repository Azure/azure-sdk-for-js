---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-text-analytics
urlFragment: ai-text-analytics-javascript
---

# Azure Text Analytics client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Text Analytics in some common scenarios.

| **File Name**                                                             | **Description**                                                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [analyzeSentiment.js][analyzesentiment]                                   | analyzes the sentiment of a piece of text                                               |
| [detectLanguage.js][detectlanguage]                                       | detects the language of a piece of text                                                 |
| [extractKeyPhrases.js][extractkeyphrases]                                 | extracts key phrases from a piece of text                                               |
| [recognizeEntities.js][recognizeentities]                                 | detects entites in a piece of text                                                      |
| [recognizeLinkedEntities.js][recognizelinkedentities]                     | detects entities that have links to more information on the web                         |
| [recognizePii.js][recognizepii]                                           | detects personally-identifiable information                                             |
| [analyzeSentimentWithOpinionMining.js][analyzesentimentwithopinionmining] | analyzes the sentiment of a piece of text and mine opinions about different targets     |
| [beginAnalyzeHealthcareEntities.js][beginanalyzehealthcareentities]       | detects healthcare entities in a piece of text                                          |
| [alternativeDocumentInput.js][alternativedocumentinput]                   | uses objects with attached metadata instead of simple strings as inputs for flexibility |
| [authenticationMethods.js][authenticationmethods]                         | authenticates a service client using both Azure Active Directory and an API key         |
| [beginAnalyzeActions.js][beginanalyzeactions]                             | applies multiple Text Analytics actions per document                                    |
| [customText.js][customtext]                                               | applies multiple Custom Text Analytics actions per document                             |
| [modelVersion.js][modelversion]                                           | shows how to choose model versions for pre-built models.                                |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services instance][createinstance_azurecognitiveservicesinstance]

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
node analyzeSentiment.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TEXT_ANALYTICS_API_KEY="<text analytics api key>" node analyzeSentiment.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[analyzesentiment]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/analyzeSentiment.js
[detectlanguage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/detectLanguage.js
[extractkeyphrases]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/extractKeyPhrases.js
[recognizeentities]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/recognizeEntities.js
[recognizelinkedentities]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/recognizeLinkedEntities.js
[recognizepii]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/recognizePii.js
[analyzesentimentwithopinionmining]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/analyzeSentimentWithOpinionMining.js
[beginanalyzehealthcareentities]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/beginAnalyzeHealthcareEntities.js
[alternativedocumentinput]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/alternativeDocumentInput.js
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/authenticationMethods.js
[beginanalyzeactions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/beginAnalyzeActions.js
[customtext]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/customText.js
[modelversion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/textanalytics/ai-text-analytics/samples/v5/javascript/modelVersion.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/textanalytics/ai-text-analytics/README.md
