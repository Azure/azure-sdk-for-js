# Azure Cognitive Services Health Insights Radiology Insights REST client library for JavaScript

[Health Insights][health_insights] is an Azure Applied AI Service built with the Azure Cognitive Services Framework, that leverages multiple Cognitive Services, Healthcare API services and other Azure resources.

[Radiology Insights][radiology_insights_docs] is a model that aims to provide quality checks as feedback on errors and inconsistencies (mismatches) and ensures critical findings are identified and communicated using the full context of the report. Follow-up recommendations and clinical findings with measurements (sizes) documented by the radiologist are also identified.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:
[Source code] | [Package (NPM)] | [API reference documentation] | [Product Information] | [Samples]

## Getting started

### Currently supported environments

- LTS versions of Node.js
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- LTS versions of Node.js
- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- An existing Cognitive Services Health Insights instance.

### Install the `@azure-rest/health-insights-radiologyinsights` package

Install the RadiologyInsights REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/health-insights-radiologyinsights
```

### Create and authenticate a `RadiologyInsightsClient`

To use an [Azure Active Directory (AAD) token credential][token_credential],
provide an instance of the desired credential type obtained from the [Azure Identity library][azure_identity].

To authenticate with AAD, you must first `npm` install [`@azure/identity`][identity]

After setup, you can choose which type of [credential][credential] from `@azure/identity` to use.
As an example, [DefaultAzureCredential][defaultazurecredential]
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Examples

### Create a RadiologyInsights asynchronous client

```typescript
const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
const credential = new AzureKeyCredential(apiKey);
const client = RadiologyInsightsRestClient(endpoint, credential);
```

### Build a request, send it to the client and print the description of a Critical Result Inference

```typescript

export async function main() {
  const credential = new AzureKeyCredential(apiKey);
  const client = AzureHealthInsightsClient(endpoint, credential);

  // Create request body
  const radiologyInsightsParameter = createRequestBody();

  // Initiate radiology insights job and retrieve results
  const initialResponse = await client.path("/radiology-insights/jobs").post(radiologyInsightsParameter);
  if (isUnexpected(initialResponse)) {
    throw initialResponse;
  }
  const poller = await getLongRunningPoller(client, initialResponse);
  const RadiologyInsightsResult = await poller.pollUntilDone();
  if (isUnexpected(RadiologyInsightsResult)) {
    throw RadiologyInsightsResult;
  }
  const resultBody = RadiologyInsightsResult.body;
  printResults(resultBody);
}

function createRequestBody(): CreateJobParameters {

  const codingData = {
    system: "Http://hl7.org/fhir/ValueSet/cpt-all",
    code: "USPELVIS",
    display: "US PELVIS COMPLETE"
  };

  const code = {
    coding: [codingData]
  };

  const patientInfo = {
    sex: "female",
    birthDate: new Date("1959-11-11T19:00:00+00:00"),
  };

  const encounterData = {
    id: "encounterid1",
    period: {
      "start": "2021-8-28T00:00:00",
      "end": "2021-8-28T00:00:00"
    },
    class: "inpatient"
  };

  const authorData = {
    "id": "authorid1",
    "name": "authorname1"
  };

  const orderedProceduresData = {
    code: code,
    description: "US PELVIS COMPLETE"
  };

  const administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1"
  };

  const content = {
    sourceType: "inline",
    value: "CLINICAL HISTORY:   "
      + "\r\n20-year-old female presenting with abdominal pain. Surgical history significant for appendectomy."
      + "\r\n "
      + "\r\nCOMPARISON:   "
      + "\r\nRight upper quadrant sonographic performed 1 day prior."
      + "\r\n "
      + "\r\nTECHNIQUE:   "
      + "\r\nTransabdominal grayscale pelvic sonography with duplex color Doppler "
      + "\r\nand spectral waveform analysis of the ovaries."
      + "\r\n "
      + "\r\nFINDINGS:   "
      + "\r\nThe uterus is unremarkable given the transabdominal technique with "
      + "\r\nendometrial echo complex within physiologic normal limits. The "
      + "\r\novaries are symmetric in size, measuring 2.5 x 1.2 x 3.0 cm and the "
      + "\r\nleft measuring 2.8 x 1.5 x 1.9 cm.\n \r\nOn duplex imaging, Doppler signal is symmetric."
      + "\r\n "
      + "\r\nIMPRESSION:   "
      + "\r\n1. Normal pelvic sonography. Findings of testicular torsion."
      + "\r\n\nA new US pelvis within the next 6 months is recommended."
      + "\n\nThese results have been discussed with Dr. Jones at 3 PM on November 5 2020.\n "
      + "\r\n"
  };

  const patientDocumentData = {
    type: "note",
    clinicalType: "radiologyReport",
    id: "docid1",
    language: "en",
    authors: [authorData],
    specialtyType: "radiology",
    administrativeMetadata: administrativeMetadata,
    content: content,
    createdDateTime: new Date("2021-06-01T00:00:00.000"),
    orderedProceduresAsCsv: "US PELVIS COMPLETE"
  };


  const patientData = {
    id: "Samantha Jones",
    info: patientInfo,
    encounters: [encounterData],
    patientDocuments: [patientDocumentData]
  };

  const inferenceTypes = [
    "finding",
    "ageMismatch",
    "lateralityDiscrepancy",
    "sexMismatch",
    "completeOrderDiscrepancy",
    "limitedOrderDiscrepancy",
    "criticalResult",
    "criticalRecommendation",
    "followupRecommendation",
    "followupCommunication",
    "radiologyProcedure"];

  const followupRecommendationOptions = {
    includeRecommendationsWithNoSpecifiedModality: true,
    includeRecommendationsInReferences: true,
    provideFocusedSentenceEvidence: true
  };

  const findingOptions = {
    provideFocusedSentenceEvidence: true
  };

  const inferenceOptions = {
    followupRecommendationOptions: followupRecommendationOptions,
    findingOptions: findingOptions
  };

  const configuration = {
    inferenceOptions: inferenceOptions,
    inferenceTypes: inferenceTypes,
    locale: "en-US",
    verbose: false,
    includeEvidence: true
  };

  const radiologyInsightsData = {
    patients: [patientData],
    configuration: configuration
  };

  return {
    body: radiologyInsightsData
  }

}

function printResults(radiologyInsightsResult: RadiologyInsightsResultOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: { inferences: any[]; }) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "criticalResult") {
              if ("result" in inference) {
                console.log("Critical Result Inference found: " + inference.result.description);
              }
            }
          });
        }
      });
    }
  } else {
    const error = radiologyInsightsResult.error;
    if (error) {
      console.log(error.code, ":", error.message);
    }
  }
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

<!-- LINKS -->
[health_insights]: https://learn.microsoft.com/azure/azure-health-insights/overview
[radiology_insights_docs]: https://learn.microsoft.com/azure/azure-health-insights/radiology-insights/
[Source code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest
[Package (NPM)]: https://www.npmjs.com/package/@azure-rest/health-insights-radiologyinsights
[API reference documentation]: https://learn.microsoft.com/rest/api/cognitiveservices/healthinsights/operation-groups?view=rest-cognitiveservices-healthinsights-2023-03-01-preview
[Product Information]: https://learn.microsoft.com/azure/azure-health-insights/radiology-insights/overview
[Samples]:https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1-beta
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[identity]: https://www.npmjs.com/package/@azure/identity
[token_credential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
