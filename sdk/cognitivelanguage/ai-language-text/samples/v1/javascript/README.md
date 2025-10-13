---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - language-service
urlFragment: ai-language-text-javascript
---

# Azure Cognitive Language Service client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Language Service in some common scenarios.

| **File Name**                                                         | **Description**                                                                     |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [entityLinking.js][entitylinking]                                     | detects entities that have links to more information on the web                     |
| [entityRecognition.js][entityrecognition]                             | detects entities in a piece of text                                                 |
| [keyPhraseExtraction.js][keyphraseextraction]                         | extracts key phrases from a piece of text                                           |
| [languageDetection.js][languagedetection]                             | detects the language of a piece of text                                             |
| [piiEntityRecognition.js][piientityrecognition]                       | detects personally-identifiable information                                         |
| [sentimentAnalysis.js][sentimentanalysis]                             | analyzes the sentiment of a piece of text                                           |
| [stats.js][stats]                                                     | access statistics about documents and transactions                                  |
| [abstractiveSummarization.js][abstractivesummarization]               | generates a summary for an article                                                  |
| [customEntityRecognition.js][customentityrecognition]                 | detects custom text in a piece of text                                              |
| [customMultiLabelClassification.js][custommultilabelclassification]   | multi-label classification of pieces of text                                        |
| [customSingleLabelClassification.js][customsinglelabelclassification] | single-label classification of pieces of text                                       |
| [extractiveSummarization.js][extractivesummarization]                 | extracts a summary from an article                                                  |
| [healthcare.js][healthcare]                                           | detects healthcare entities in a piece of text                                      |
| [opinionMining.js][opinionmining]                                     | analyzes the sentiment of a piece of text and mine opinions about different targets |
| [batching.js][batching]                                               | applies multiple Text Analytics actions per document                                |
| [modelVersion.js][modelversion]                                       | shows how to choose model versions for pre-built models.                            |
| [paging.js][paging]                                                   | controls paging for the results of `beginAnalyzeActions`                            |
| [rehydratePolling.js][rehydratepolling]                               | creates a poller using the serialized state of another                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node entityLinking.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env LANGUAGE_ENDPOINT="<language endpoint>" node entityLinking.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[entitylinking]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/entityLinking.js
[entityrecognition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/entityRecognition.js
[keyphraseextraction]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/keyPhraseExtraction.js
[languagedetection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/languageDetection.js
[piientityrecognition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/piiEntityRecognition.js
[sentimentanalysis]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/sentimentAnalysis.js
[stats]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/stats.js
[abstractivesummarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/abstractiveSummarization.js
[customentityrecognition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/customEntityRecognition.js
[custommultilabelclassification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/customMultiLabelClassification.js
[customsinglelabelclassification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/customSingleLabelClassification.js
[extractivesummarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/extractiveSummarization.js
[healthcare]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/healthcare.js
[opinionmining]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/opinionMining.js
[batching]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/batching.js
[modelversion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/modelVersion.js
[paging]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/paging.js
[rehydratepolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/javascript/rehydratePolling.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-language-text
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/README.md
