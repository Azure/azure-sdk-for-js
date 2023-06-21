# CancerProfiling REST client library for JavaScript

[Health Insights](https://learn.microsoft.com/azure/azure-health-insights/overview?branch=main) is an Azure Applied AI Service built with the Azure Cognitive Services Framework, that leverages multiple Cognitive Services, Healthcare API services and other Azure resources.
The [Cancer Profiling model](https://learn.microsoft.com/azure/azure-health-insights/oncophenotype/overview?branch=main) receives clinical records of oncology patients and outputs cancer staging, such as clinical stage TNM categories and pathologic stage TNM categories as well as tumor site, histology.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

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

### Create and authenticate a `CancerProfilingRestClient`

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

const initialResponse = await client.path("/oncophenotype/jobs").post(parameters);
if (isUnexpected(initialResponse)) {
    throw initialResponse;
}
    
const poller = await getLongRunningPoller(client, initialResponse);
const cancerProfilingResult = await poller.pollUntilDone();
if (isUnexpected(cancerProfilingResult)) {
    throw cancerProfilingResult;
}
const resultBody = cancerProfilingResult.body as OncoPhenotypeResultOutput;

if (cancerProfilingResult.status === "succeeded") {
    const results = cancerProfilingResult.results as OncoPhenotypeResultsOutput;
    const patients = results.patients;
    for (const patientResult of patients) {
        console.log(`Inferences of Patient ${patientResult.id}`);
        for (const inferences of patientResult.inferences) {
            console.log(`Clinical Type: ${String(inferences.type)} Value: ${inferences.value}, ConfidenceScore: ${inferences.confidenceScore}`);
            if (inferences.evidence != undefined) {
                for (const evidence of inferences.evidence) {
                    if (evidence.patientDataEvidence != undefined)
                    {
                        let dataEvidence = evidence.patientDataEvidence;
                        console.log(`Evidence: ${dataEvidence.id} ${dataEvidence.offset} ${dataEvidence.length} ${dataEvidence.text}`);
                    }
                }
            }
        }
    }
} else {
    const errors = cancerProfilingResult.errors;
    if (errors) {
        for (const error of errors) {
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

## Next steps
<!--
This code sample show common scenario operation with the Azure Health Insights Cancer Profiling library. More samples can be found under the [samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthinsights/azure-healthinsights-cancerprofiling/samples/) directory.
- Infer Cancer Profiling: [sample_infer_cancer_profiling.ts](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/healthinsights/azure-healthinsights-cancerprofiling/samples/sample_infer_cancer_profiling.ts)
-->

### Additional documentation
<!--
For more extensive documentation on Azure Health Insights Cancer Profiling, see the [Cancer Profiling documentation](https://review.learn.microsoft.com/en-us/azure/cognitive-services/health-decision-support/oncophenotype/overview?branch=main) on docs.microsoft.com.
-->

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

<!-- LINKS -->
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com
