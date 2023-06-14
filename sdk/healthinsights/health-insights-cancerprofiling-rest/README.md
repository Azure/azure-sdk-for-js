# CancerProfiling REST client library for JavaScript

[Health Insights](https://review.learn.microsoft.com/en-us/azure/cognitive-services/health-decision-support/overview?branch=main) is an Azure Applied AI Service built with the Azure Cognitive Services Framework, that leverages multiple Cognitive Services, Healthcare API services and other Azure resources.
The [Cancer Profiling model](https://review.learn.microsoft.com/en-us/azure/cognitive-services/health-decision-support/oncophenotype/overview?branch=main) receives clinical records of oncology patients and outputs cancer staging, such as clinical stage TNM categories and pathologic stage TNM categories as well as tumor site, histology.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

## Getting started

### Prerequisites
- 
- LTS versions of Node.js
- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- An existing Cognitive Services Health Insights instance.

### Install the `@azure-rest/health-insights-cancerprofiling` package

Install the CancerProfiling REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/health-insights-cancerprofiling
```

|SDK version|Supported API version of service |
|-------------|---------------|
|1.0.0b1 | 2023-03-01-preview|

### Create and authenticate a `CancerProfilingClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Key concepts

The Cancer Profiling model allows you to infer cancer attributes such as tumor site, histology, clinical stage TNM categories and pathologic stage TNM categories from unstructured clinical documents.

## Examples
- [Infer Cancer Profiling](#cancer_profiling)

```typescript
const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint =
  process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

const poller = await getLongRunningPoller(client, initialResponse);
  const cancerProfilingResult = await poller.pollUntilDone();
  if (isUnexpected(cancerProfilingResult)) {
    throw initialResponse;
  }
  const resultBody = cancerProfilingResult.body as OncoPhenotypeResultOutput;
  
  if (resultBody.status === "succeeded") {
      const results = resultBody.results as OncoPhenotypeResultsOutput;
      const patients = results.patients;
      for (const patientResult of patients) {
          console.log(`Inferences of Patient ${patientResult.id}`);
          for (const inferences of patientResult.inferences) {
              console.log(`Clinical Type: ${String(inferences.type)} Value: ${inferences.value}, ConfidenceScore: ${inferences.confidenceScore}`);
              for (const evidence of inferences.evidence) {
                  let dataEvidence = evidence.patientDataEvidence;
                  console.log(`Evidence: ${dataEvidence.id} ${dataEvidence.offset} ${dataEvidence.length} ${dataEvidence.text}`);
              }
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
