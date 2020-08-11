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

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Services Text Analytics in some common scenarios.

| **File Name**                                                             | **Description**                                                                                    |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [alternativeDocumentInput.js][alternativedocumentinput]                   | uses object document inputs with attached metadata rather than simple strings for more flexibility |
| [analyzeSentiment.js][analyzesentiment]                                   | analyzes the sentiment of a piece of text                                                          |
| [analyzeSentimentWithOpinionMining.js][analyzesentimentwithopinionmining] | analyzes the sentiment of a piece of text and mine opinions about different aspects                |
| [detectLanguage.js][detectlanguages]                                      | detects the language of a piece of text                                                            |
| [extractKeyPhrases.js][extractkeyphrases]                                 | extracts key phrases from a piece of text                                                          |
| [recognizeLinkedEntities.js][recognizelinkedentities]                     | detects entities that have links to more information on the web                                    |
| [authenticationMethods.js][authenticationmethods]                         | authenticates a service client using both Azure Active Directory and an API key                    |
| [recognizeEntities.js][recognizeentities]                                 | detects entites in a piece of text and prints them along with the entity type                      |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TEXT_ANALYTICS_API_KEY="<api key>" node analyzeSentiment.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alternativedocumentinput]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/alternativeDocumentInput.js
[analyzesentiment]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/analyzeSentiment.js
[analyzesentimentwithopinionmining]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/textanalytics/ai-text-analytics/samples/javascript/analyzeSentimentWithOpinionMining.js
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/authenticationMethods.js
[detectlanguages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/detectLanguage.js
[extractkeyphrases]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/extractKeyPhrases.js
[recognizelinkedentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/recognizeLinkedEntities.js
[recognizeentities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/samples/javascript/recognizeEntities.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/ai-text-analytics
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/textanalytics/ai-text-analytics/README.md
