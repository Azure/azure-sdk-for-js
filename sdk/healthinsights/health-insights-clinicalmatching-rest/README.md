# ClinicalMatching REST client library for JavaScript

[Health Insights](https://learn.microsoft.com/azure/azure-health-insights/overview?branch=main) is an Azure Applied AI Service built with the Azure Cognitive Services Framework, that leverages multiple Cognitive Services, Healthcare API services and other Azure resources.
The [Clinical Matching model](https://learn.microsoft.com/azure/azure-health-insights/trial-matcher/overview) receives patients data and clinical trials protocols, and provides relevant clinical trials based on eligibility criteria.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/tree/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-clinicalmatching-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/health-insights-clinicalmatching)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-clinicalmatching-rest/samples/v1-beta)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- LTS versions of Node.js
- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.
- An existing Cognitive Services Health Insights instance.

### Install the `@azure-rest/health-insights-clinicalmatching` package

Install the ClinicalMatching REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/health-insights-clinicalmatching
```

|SDK version|Supported API version of service |
|-------------|---------------|
|1.0.0-beta.1 | 2023-03-01-preview|

### Create and authenticate a `ClinicalMatchingRestClient`

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

Trial Matcher provides the user of the services two main modes of operation: patients centric and clinical trial centric.
- On patient centric mode, the Trial Matcher model bases the patient matching on the clinical condition, location, priorities, eligibility criteria, and other criteria that the patient and/or service users may choose to prioritize. The model helps narrow down and prioritize the set of relevant clinical trials to a smaller set of trials to start with, that the specific patient appears to be qualified for.
- On clinical trial centric, the Trial Matcher is finding a group of patients potentially eligible to a clinical trial. The Trial Matcher narrows down the patients, first filtered on clinical condition and selected clinical observations, and then focuses on those patients who met the baseline criteria, to find the group of patients that appears to be eligible patients to a trial.

## Examples

- [Match Trials - Find potential eligible trials for a patient](#match-trials)

```typescript
const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint =
  process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
const credential = new AzureKeyCredential(apiKey);
const client = ClinicalMatchingRestClient(endpoint, credential);

// Create request body for clinical matching
const clinicalInfoList = [
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0006826",
      name: "Malignant Neoplasms",
      value: "true",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C1522449",
      name: "Therapeutic radiology procedure",
      value: "true",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C1512162",
      name: "Eastern Cooperative Oncology Group",
      value: "1",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0019693",
      name: "HIV Infections",
      value: "false",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C1300072",
      name: "Tumor stage",
      value: "2",
    }
  ];

  const patientInfo = {
    sex: "MALE",
    birthDate: new Date("1965-11-26T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
    clinicalInfo: clinicalInfoList,
  };
  const docContent = {sourceType: "INLINE", value: getPatientDocContent()};
  const patientDataList = {
      type: "fhirBundle",
      id: "Consultation-14-Demo",
      content: docContent,
      clinicalType: "CONSULTATION"
  };

  const patient1 = {
    id: "patient_id",
    info: patientInfo,
    data: [patientDataList]
  };

  const geographicLocation = { countryOrRegion: "United States", city: "Gilbert", state: "Arizona" };
  const registryFilters = {
    conditions: ["Non-small cell lung cancer"],
    phases: ["PHASE1"],
    sources: ["CLINICALTRIALS_GOV"],
    facilityLocations: [ geographicLocation ],
    studyTypes: ["INTERVENTIONAL"]
  };

  const clinicalTrials = ({
    registryFilters: [registryFilters]
  });

  const configuration = {
    clinicalTrials: clinicalTrials,
  };

  const trialMatcherData = {
    patients: [patient1],
    configuration: configuration,
  };

  const trialMatcherParameter = {
    body: trialMatcherData
  };
  
  // Initiate clinical matching job and retrieve results
const initialResponse = await client.path("/trialmatcher/jobs").post(trialMatcherParameter);
if (isUnexpected(initialResponse)) {
throw initialResponse;
}
const poller = await getLongRunningPoller(client, initialResponse);
const trialMatcherResult = await poller.pollUntilDone();
if (isUnexpected(trialMatcherResult)) {
    throw trialMatcherResult;
  }
const resultBody = trialMatcherResult.body;

// Print the inference results for a patient's cancer attributes
if (resultBody.status === "succeeded") {
  const results = resultBody.results;
  const patients = results.patients;
  for (const patientResult of patients) {
      console.log(`Inferences of Patient ${patientResult.id}`);
      for (const tmInferences of patientResult.inferences) {
          console.log(`Trial Id ${tmInferences.id}`);
          console.log(`Type: ${String(tmInferences.type)}  Value: ${tmInferences.value}`);
          console.log(`Description ${tmInferences.description}`);
      }
  }
}
else {
  const errors = trialMatcherResult.errors;
  if (errors) {
      for (const error of errors) {
          console.log('${error.code} ":" ${error.message}');
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

This code sample show common scenario operation with the Azure Health Insights Clinical Matching library. More samples can be found under the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-clinicalmatching-rest/samples/v1-beta/typescript/src/) directory.

- Match Trials FHIR: [sample_match_trials_fhir.ts](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-clinicalmatching-rest/samples/v1-beta/typescript/src/sample_match_trials_fhir.ts)

- Match Trials Structured Coded Elements: [sample_match_trials_structured_coded_elements.ts](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-clinicalmatching-rest/samples/v1-beta/typescript/src/sample_match_trials_structured_coded_elements.ts)

- Match Trials Unstructured Clinical Note: [sample_match_trials_unstructured_clinical_note.ts](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-clinicalmatching-rest/samples/v1-beta/typescript/src/sample_match_trials_unstructured_clinical_note.ts)


### Additional documentation

For more extensive documentation on Azure Health Insights Clinical Matching, see the [Clinical Matching documentation](https://learn.microsoft.com/azure/azure-health-insights/trial-matcher/overview) on docs.microsoft.com.


## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit [cla.microsoft.com][cla].

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct][code_of_conduct]. For more information see the [Code of Conduct FAQ][coc_faq] or contact [opencode@microsoft.com][coc_contact] with any additional questions or comments.

<!-- LINKS -->
[cla]: https://cla.microsoft.com
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[coc_faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc_contact]: mailto:opencode@microsoft.com