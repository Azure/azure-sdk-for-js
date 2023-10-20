# CancerProfiling REST client library for JavaScript

[Health Insights](https://learn.microsoft.com/azure/azure-health-insights/overview?branch=main) is an Azure Applied AI Service built with the Azure Cognitive Services Framework, that leverages multiple Cognitive Services, Healthcare API services and other Azure resources.
The [Cancer Profiling model](https://learn.microsoft.com/azure/azure-health-insights/oncophenotype/overview?branch=main) receives clinical records of oncology patients and outputs cancer staging, such as clinical stage TNM categories and pathologic stage TNM categories as well as tumor site, histology.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/tree/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-cancerprofiling-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/health-insights-cancerprofiling)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-cancerprofiling-rest/samples/v1-beta)

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
|1.0.0-beta.1 | 2023-03-01-preview|

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
const credential = new AzureKeyCredential(apiKey);
const client = CancerProfilingRestClient(endpoint, credential);

// Define patient information and clinical documents for the request body
const patientInfo = {
        sex: "FEMALE",
        birthDate: new Date("1979-10-08T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
    };

const doc1 = "15.8.2021"
    "Jane Doe 091175-8967"
    "42 year old female, married with 3 children, works as a nurse. "
    "Healthy, no medications taken on a regular basis."
    "PMHx is significant for migraines with aura, uses Mirena for contraception."
    "Smoking history of 10 pack years (has stopped and relapsed several times)."
    "She is in c/o 2 weeks of productive cough and shortness of breath."
    "She has a fever of 37.8 and general weakness. "
    "Denies night sweats and rash. She denies symptoms of rhinosinusitis, asthma, and heartburn. "
    "On PE:"
    "GENERAL: mild pallor, no cyanosis. Regular breathing rate. "
    "LUNGS: decreased breath sounds on the base of the right lung. Vesicular breathing."
    " No crackles, rales, and wheezes. Resonant percussion. "
    "PLAN: "
    "Will be referred for a chest x-ray. "
    "======================================"
    "CXR showed mild nonspecific opacities in right lung base. "
    "PLAN:"
    "Findings are suggestive of a working diagnosis of pneumonia. The patient is referred to a "
    "follow-up CXR in 2 weeks. ";

const docContent = {
    sourceType: "INLINE",
    value: doc1
};

const patientDoc1 = {
    type: "NOTE",
    id: "doc1",
    content: docContent,
    clinicalType: "IMAGING",
    language: "en", 
    createdDateTime: new Date("2021-15-08T00:00:00.000Z")
};

 const doc1 = `15.8.2021
        Jane Doe 091175-8967
        42 year old female, married with 3 children, works as a nurse. 
        Healthy, no medications taken on a regular basis.
        PMHx is significant for migraines with aura, uses Mirena for contraception.
        Smoking history of 10 pack years (has stopped and relapsed several times).
        She is in c/o 2 weeks of productive cough and shortness of breath.
        She has a fever of 37.8 and general weakness. 
        Denies night sweats and rash. She denies symptoms of rhinosinusitis, asthma, and heartburn. 
        On PE:
        GENERAL: mild pallor, no cyanosis. Regular breathing rate. 
        LUNGS: decreased breath sounds on the base of the right lung. Vesicular breathing.
         No crackles, rales, and wheezes. Resonant percussion. 
        PLAN: 
        Will be referred for a chest x-ray. 
        ======================================
        CXR showed mild nonspecific opacities in right lung base. 
        PLAN:
        Findings are suggestive of a working diagnosis of pneumonia. The patient is referred to a 
        follow-up CXR in 2 weeks. `;

    const docContent = {
        sourceType: "INLINE",
        value: doc1
    };

    const patientDoc1 = {
        type: "NOTE",
        id: "doc1",
        content: docContent,
        clinicalType: "IMAGING",
        language: "en", 
        createdDateTime: new Date("2021-15-08T00:00:00.000Z")
    };

    const doc2 = `Oncology Clinic 
       20.10.2021
       Jane Doe 091175-8967
       42-year-old healthy female who works as a nurse in the ER of this hospital. 
       First menstruation at 11 years old. First delivery- 27 years old. She has 3 children.
       Didn’t breastfeed. 
       Contraception- Mirena.
       Smoking- 10 pack years. 
       Mother- Belarusian. Father- Georgian. 
       About 3 months prior to admission, she stated she had SOB and was febrile. 
       She did a CXR as an outpatient which showed a finding in the base of the right lung- 
       possibly an infiltrate.
       She was treated with antibiotics with partial response. 
       6 weeks later a repeat CXR was performed- a few solid dense findings in the right lung. 
       Therefore, she was referred for a PET-CT which demonstrated increased uptake in the right 
       breast, lymph nodes on the right a few areas in the lungs and liver. 
       On biopsy from the lesion in the right breast- triple negative adenocarcinoma. Genetic 
       testing has not been done thus far. 
       Genetic counseling- the patient denies a family history of breast, ovary, uterus, 
       and prostate cancer. Her mother has chronic lymphocytic leukemia (CLL). 
       She is planned to undergo genetic tests because the aggressive course of the disease, 
       and her young age. 
       Impression:
       Stage 4 triple negative breast adenocarcinoma. 
       Could benefit from biological therapy. 
       Different treatment options were explained- the patient wants to get a second opinion.`;

const docContent2 = {
    sourceType: "INLINE",
    value: doc2
};

const patientDoc2 = {
    type: "NOTE",
    id: "doc2",
    content: docContent3,
    clinicalType: "PATHOLOGY",
    language: "en", 
    createdDateTime: new Date("2022-01-01T00:00:00.000Z")
};

const patient1 = {
    id: "patient_id",
    info: patientInfo,
    data: [patientDoc1, patientDoc2]
};

const cancerProfilingData: OncoPhenotypeData = {
    patients: [patient1],
    configuration: {includeEvidence: true}
};

const parameters = {
    body: cancerProfilingData
};

// Initiate cancer profiling job and retrieve results
const initialResponse = await client.path("/oncophenotype/jobs").post(parameters);
if (isUnexpected(initialResponse)) {
    throw initialResponse;
}
const poller = await getLongRunningPoller(client, initialResponse);
const cancerProfilingResult = await poller.pollUntilDone();
if (isUnexpected(cancerProfilingResult)) {
    throw cancerProfilingResult;
}
const resultBody = cancerProfilingResult.body;
// Print the inference results for a patient's cancer attributes
if (cancerProfilingResult.status === "succeeded") {
    const results = cancerProfilingResult.results;
    if (results) {
        for (const patientResult of results.patients) {
            console.log(`Inferences of Patient ${patientResult.id}`);
            for (const { type, value, confidenceScore, evidence } of patientResult.inferences) {
                console.log(`Clinical Type: ${String(type)} Value: ${value}, ConfidenceScore: ${confidenceScore}`);
                for (const { patientDataEvidence } of evidence || []) {
                    if (patientDataEvidence) {
                        console.log(`Evidence: ${patientDataEvidence.id} ${patientDataEvidence.offset} ${patientDataEvidence.length} ${patientDataEvidence.text}`);
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

For more detailed instructions on how to enable logs, you can look at the [@azure/logger](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger) package docs.

## Next steps

This code sample show common scenario operation with the Azure Health Insights Cancer Profiling library. More samples can be found under the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-cancerprofiling-rest/samples/v1-beta/typescript/src/) directory.
- Infer Cancer Profiling: [sample_infer_cancer_profiling.ts](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-cancerprofiling-rest/samples/v1-beta/typescript/src/sample_infer_cancer_profiling.ts)


### Additional documentation

For more extensive documentation on Azure Health Insights Cancer Profiling, see the [Cancer Profiling documentation](https://learn.microsoft.com/azure/azure-health-insights/oncophenotype/overview) on docs.microsoft.com.


## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

<!-- LINKS -->
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com
