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
can be used to authenticate the client. See more info on defaultAzureCredentials [default_information].
Managed Identities can also be used to authenticate through DefaultAzureCredential [managed_identity].

## Examples

### Create a RadiologyInsights asynchronous client

```ts snippet:ReadmeSampleCreateClient_Node
import { DefaultAzureCredential } from "@azure/identity";
import RadiologyInsightsRestClient from "@azure-rest/health-insights-radiologyinsights";

const endpoint = "https://<your-endpoint>";
const credential = new DefaultAzureCredential();
const client = RadiologyInsightsRestClient(endpoint, credential);
```

### Build a request, send it to the client and print out the description of a Critical Result Inference

```ts snippet:ReadmeSampleCriticalResultInference
import { DefaultAzureCredential } from "@azure/identity";
import RadiologyInsightsRestClient, {
  ClinicalDocumentTypeEnum,
  isUnexpected,
  getLongRunningPoller,
  RadiologyProcedureInference,
  Coding,
  ImagingProcedure,
} from "@azure-rest/health-insights-radiologyinsights";

const endpoint = "https://<your-endpoint>";
const credential = new DefaultAzureCredential();
const client = RadiologyInsightsRestClient(endpoint, credential);

const codingData = {
  system: "Http://hl7.org/fhir/ValueSet/cpt-all",
  code: "24727-0",
  display: "CT HEAD W CONTRAST IV",
};

const code = {
  coding: [codingData],
};

const patientInfo = {
  sex: "female",
  birthDate: new Date("1959-11-11T19:00:00+00:00"),
};

const encounterData = {
  id: "encounterid1",
  period: {
    start: "2021-8-28T00:00:00",
    end: "2021-8-28T00:00:00",
  },
  class: "inpatient",
};

const authorData = {
  id: "authorid1",
  fullName: "authorname1",
};

const orderedProceduresData = {
  code: code,
  description: "CT HEAD W CONTRAST IV",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: ` Exam:  Head CT with Contrast

    History:  Headaches for 2 months
    Technique: Axial, sagittal, and coronal images were reconstructed from helical CT through the head without IV contrast.
    IV contrast:  100 mL IV Omnipaque 300.

    Findings: There is no mass effect. There is no abnormal enhancement of the brain or within injuries with IV contrast.
    However, there is no evidence of enhancing lesion in either internal auditory canal.
    Impression: Negative CT of the brain without IV contrast.
    I recommend a new brain CT within nine months.`,
};

const patientDocumentData = {
  type: "note",
  clinicalType: ClinicalDocumentTypeEnum.RadiologyReport,
  id: "docid1",
  language: "en",
  authors: [authorData],
  specialtyType: "radiology",
  administrativeMetadata: administrativeMetadata,
  content: content,
  createdAt: new Date("2021-05-31T16:00:00.000Z"),
  orderedProceduresAsCsv: "CT HEAD W CONTRAST IV",
};

const patientData = {
  id: "Samantha Jones",
  details: patientInfo,
  encounters: [encounterData],
  patientDocuments: [patientDocumentData],
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
  "radiologyProcedure",
];

const followupRecommendationOptions = {
  includeRecommendationsWithNoSpecifiedModality: true,
  includeRecommendationsInReferences: true,
  provideFocusedSentenceEvidence: true,
};

const findingOptions = {
  provideFocusedSentenceEvidence: true,
};

const inferenceOptions = {
  followupRecommendationOptions: followupRecommendationOptions,
  findingOptions: findingOptions,
};

// Create RI Configuration
const configuration = {
  inferenceOptions: inferenceOptions,
  inferenceTypes: inferenceTypes,
  locale: "en-US",
  verbose: false,
  includeEvidence: true,
};

// create RI Data
const radiologyInsightsJob = {
  jobData: {
    patients: [patientData],
    configuration: configuration,
  },
};

// Create request body
const radiologyInsightsParameter = { body: radiologyInsightsJob };

// Initiate radiology insights job and retrieve results
const dateString = Date.now();
const jobID = "jobId-" + dateString;
const initialResponse = await client
  .path("/radiology-insights/jobs/{id}", jobID)
  .put(radiologyInsightsParameter);

if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const poller = await getLongRunningPoller(client, initialResponse);
const radiologyInsightsResult = await poller.pollUntilDone();

if (isUnexpected(radiologyInsightsResult)) {
  throw radiologyInsightsResult.body.error;
}

const result = radiologyInsightsResult.body.result;

if (result) {
  for (const patientResult of result.patientResults) {
    if (patientResult.inferences) {
      for (const inference of patientResult.inferences) {
        if (inference.kind === "radiologyProcedure") {
          console.log("Radiology Procedure Inference found");
          const radiologyProcedureInference = inference as RadiologyProcedureInference;
          for (const procedureCode of radiologyProcedureInference?.procedureCodes || []) {
            console.log("   Procedure Codes: ");
            displayCodes(procedureCode.coding);
          }

          if (radiologyProcedureInference.imagingProcedures) {
            console.log("   Imaging Procedure Codes: ");
            for (const imagingProcedure of radiologyProcedureInference.imagingProcedures) {
              displayImaging(imagingProcedure);
            }
          }

          if (radiologyProcedureInference.orderedProcedure) {
            console.log("   Ordered Procedure Codes: ");
            displayCodes(radiologyProcedureInference.orderedProcedure.code?.coding);
          }

          if (radiologyProcedureInference.orderedProcedure.description) {
            console.log(
              `   Description: ${radiologyProcedureInference.orderedProcedure.description}`,
            );
          }
        }
      }
    }
  }
}

function displayCodes(codingList: Coding[] | undefined) {
  for (const coding of codingList || []) {
    console.log(`      Coding: ${coding.code} , ${coding.display} (${coding.system})`);
  }
}

function displayImaging(images: ImagingProcedure): void {
  console.log("     Modality Codes: ");
  displayCodes(images.modality.coding);
  console.log("     Anatomy Codes: ");
  displayCodes(images.anatomy.coding);
  if (images.laterality) {
    console.log("     Laterality Codes: ");
    displayCodes(images.laterality.coding);
  }
  if (images.contrast) {
    console.log("     Contrast Codes: ");
    displayCodes(images.contrast.code.coding);
  }
  if (images.view) {
    console.log("     View Codes: ");
    displayCodes(images.view.code.coding);
  }
}
```

### Print out the Age Mismatch Inference evidences

```ts snippet:ReadmeSampleAgeMismatch
import {
  RadiologyInsightsJobOutput,
  ExtensionOutput,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput, content: string): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "ageMismatch") {
        console.log("Age Mismatch Inference found: ");
        const evidence = findAgeEvidence(inference.extension, content);
        console.log("   Evidence: " + evidence);
      }
    }
  }

  function findAgeEvidence(extensions: ExtensionOutput[], content: string) {
    let offset = -1;
    let length = -1;
    let piece = "";
    let evidence = "";
    // for loop needed for traversing from top to bottom of the array
    for (const first of extensions) {
      for (const ext of first.extension) {
        if (ext.url === "offset") {
          offset = ext.valueInteger;
        } else if (ext.url === "length") {
          length = ext.valueInteger;
        }
        if (offset > 0 && length > 0) {
          piece = content.substring(offset, offset + length);
        }
      }
      evidence += `${piece} `;
    }
    return evidence;
  }
}
```

### Print out the Complete Order Discrepancy Inference ordertype and its missing Body Parts and missing Body Part Measurements

```ts snippet:ReadmeSampleCompleteOrderDiscrepancy
import {
  RadiologyInsightsJobOutput,
  CompleteOrderDiscrepancyInference,
  CodeableConcept,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "completeOrderDiscrepancy") {
        const completeOrderDiscrepancyInference = inference as CompleteOrderDiscrepancyInference;
        console.log("Complete Order Discrepancy Inference found: ");
        console.log("   Ordertype: ");
        displayCodes({ codeableConcept: completeOrderDiscrepancyInference.orderType });

        for (const missingBodyPart of completeOrderDiscrepancyInference.missingBodyParts) {
          console.log("   Missing Body Parts: ");
          displayCodes({ codeableConcept: missingBodyPart });
        }

        for (const missingBodymeasure of completeOrderDiscrepancyInference.missingBodyPartMeasurements) {
          console.log("   Missing Body Part Measurements: ");
          displayCodes({ codeableConcept: missingBodymeasure });
        }
      }
    }
  }

  function displayCodes({ codeableConcept }: { codeableConcept: CodeableConcept }): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }
}
```

### Print out the Finding Inference code, interpretation, Component codes and the section info

```ts snippet:ReadmeSampleFindingInference
import {
  RadiologyInsightsJobOutput,
  FindingInference,
  CodeableConcept,
  Extension,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.result) {
    for (const patientResult of radiologyInsightsResult.result.patientResults) {
      if (patientResult.inferences) {
        for (const inference of patientResult.inferences) {
          console.log("Finding Inference found: ");
          if (inference.kind === "finding") {
            const findingInference = inference as FindingInference;

            if (findingInference.finding.code) {
              console.log("   Code: ");
              displayCodes(findingInference.finding.code);
            }

            for (const interpretation of findingInference.finding.interpretation) {
              console.log("   Interpretation: ");
              displayCodes(interpretation);
            }

            for (const component of findingInference.finding.component) {
              console.log("   Component code: ");
              displayCodes(component.code);
              if (component.valueCodeableConcept) {
                console.log("     Value component codeable concept: ");
                displayCodes(component.valueCodeableConcept);
              }
            }

            if (findingInference.extension) {
              displaySectionInfo(findingInference);
            }
          }
        }
      }
    }
  }

  function displayCodes(codeableConcept: CodeableConcept): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }

  function displaySectionInfo(inference: { extension?: Extension[] }) {
    for (const extension of inference.extension || []) {
      if (extension.url === "section") {
        console.log("   Section:");
        for (const { url, valueString } of extension.extension || []) {
          console.log(`      ${url}: ${valueString}`);
        }
      }
    }
  }
}
```

### Print out the Follow Up Communication Inference date and recipient

```ts snippet:ReadmeSampleFollowUpCommunication
import {
  RadiologyInsightsJobOutput,
  FollowupCommunicationInference,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "followupCommunication") {
        const followupCommunicationInference = inference as FollowupCommunicationInference;
        console.log("Followup Communication Inference found");
        if (followupCommunicationInference.communicatedAt) {
          console.log(
            `Communicated at: ${followupCommunicationInference.communicatedAt.join(" ")}`,
          );
        }
        if (followupCommunicationInference.recipient) {
          console.log(`Recipient: ${followupCommunicationInference.recipient.join(" ")}`);
        }
        console.log(`   Acknowledged: ${followupCommunicationInference.wasAcknowledged}`);
      }
    }
  }
}
```

### Print out the Follow Up Recommendation Inference booleans, Generic Procedure code, description and Imaging Procedure codes

```ts snippet:ReadmeSampleFollowUpRecommendation
import {
  RadiologyInsightsJobOutput,
  FollowupRecommendationInference,
  GenericProcedureRecommendation,
  ImagingProcedureRecommendation,
  CodeableConcept,
  ImagingProcedure,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "followupRecommendation") {
        const followupRecommendationInference = inference as FollowupRecommendationInference;

        console.log("Follow Up Recommendation Inference found");
        console.log(`   Is conditional: ${followupRecommendationInference.isConditional}`);
        console.log(`   Is guideline: ${followupRecommendationInference.isGuideline}`);
        console.log(`   Is hedging: ${followupRecommendationInference.isHedging}`);
        console.log(`   Is option: ${followupRecommendationInference.isOption}`);

        const procedure = followupRecommendationInference.recommendedProcedure;
        if (procedure.kind === "genericProcedureRecommendation") {
          const genericProcedureRecommendation = procedure as GenericProcedureRecommendation;
          console.log(`   Recommended Generic Procedure: ${genericProcedureRecommendation.code}`);
          console.log(`   Description: ${genericProcedureRecommendation.description}`);
        } else if (procedure.kind === "imagingProcedureRecommendation") {
          const imagingProcedureRecommendation = procedure as ImagingProcedureRecommendation;

          for (const procedureCode of imagingProcedureRecommendation?.procedureCodes || []) {
            console.log("   Recommended Procedure Codes: ");
            displayCodes(procedureCode);
          }

          for (const imagingProcedure of imagingProcedureRecommendation?.imagingProcedures || []) {
            console.log("   Recommended Imaging Procedure Codes: ");
            displayImaging(imagingProcedure);
          }
        }
      }
    }
  }

  function displayCodes(codeableConcept: CodeableConcept): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }

  function displayImaging(images: ImagingProcedure): void {
    console.log("   Modality Codes: ");
    displayCodes(images.modality);
    console.log("   Anatomy Codes: ");
    displayCodes(images.anatomy);
    if (images.laterality) {
      console.log("   Laterality Codes: ");
      displayCodes(images.laterality);
    }
    if (images.contrast) {
      console.log("   Contrast Codes: ");
      displayCodes(images.contrast.code);
    }
    if (images.view) {
      console.log("   View Codes: ");
      displayCodes(images.view.code);
    }
  }
}
```

### Print out the Laterality Discrepancy Inference code

```ts snippet:ReadmeSampleLateralityDiscrepancy
import {
  RadiologyInsightsJobOutput,
  LateralityDiscrepancyInference,
  CodeableConcept,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "lateralityDiscrepancy") {
        const lateralityDiscrepancyInference = inference as LateralityDiscrepancyInference;
        console.log("Laterality Discrepancy Inference found: ");
        displayCodes(lateralityDiscrepancyInference.lateralityIndication);
      }
    }
  }

  function displayCodes(codeableConcept: CodeableConcept): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }
}
```

### Print out the Limited Order Discrepancy Inference ordertype with present Body Parts and present Body Part Measurements

```ts snippet:ReadmeSampleLimitedOrderDiscrepancy
import {
  RadiologyInsightsJobOutput,
  LimitedOrderDiscrepancyInference,
  CodeableConcept,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "limitedOrderDiscrepancy") {
        const limitedOrderDiscrepancyInference = inference as LimitedOrderDiscrepancyInference;

        console.log("Limited Order Discrepancy Inference found: ");
        console.log("   Ordertype: ");
        displayCodes(limitedOrderDiscrepancyInference.orderType);

        for (const presentBodyParts of limitedOrderDiscrepancyInference?.presentBodyParts || []) {
          console.log("   Present Body Parts: ");
          displayCodes(presentBodyParts);
        }

        for (const presentBodymeasure of limitedOrderDiscrepancyInference?.presentBodyPartMeasurements ||
          []) {
          console.log("   Present Body Part Measurements: ");
          displayCodes(presentBodymeasure);
        }
      }
    }
  }

  function displayCodes(codeableConcept: CodeableConcept): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }
}
```

### Print out the Radiology Procedure Inference codes, Imaging Procedure codes and Order Procedure Codes and its description

```ts snippet:ReadmeSampleRadiologyProcedure
import {
  RadiologyInsightsJobOutput,
  RadiologyProcedureInference,
  CodeableConcept,
  ImagingProcedure,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "radiologyProcedure") {
        const radiologyProcedureInference = inference as RadiologyProcedureInference;
        console.log("Radiology Procedure Inference found");

        for (const procedureCode of radiologyProcedureInference?.procedureCodes || []) {
          console.log("   Procedure Codes: ");
          displayCodes(procedureCode);
        }

        for (const imagingProcedure of radiologyProcedureInference?.imagingProcedures || []) {
          console.log("   Imaging Procedure Codes: ");
          displayImaging(imagingProcedure);
        }

        if (radiologyProcedureInference.orderedProcedure) {
          console.log("   Ordered Procedure Codes: ");
          displayCodes(radiologyProcedureInference.orderedProcedure.code);
        }

        if (radiologyProcedureInference.orderedProcedure.description) {
          console.log(
            `   Description: ${radiologyProcedureInference.orderedProcedure.description}`,
          );
        }
      }
    }
  }

  function displayCodes(codeableConcept: CodeableConcept): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }

  function displayImaging(images: ImagingProcedure): void {
    console.log("   Modality Codes: ");
    displayCodes(images.modality);
    console.log("   Anatomy Codes: ");
    displayCodes(images.anatomy);
    if (images.laterality) {
      console.log("   Laterality Codes: ");
      displayCodes(images.laterality);
    }
    if (images.contrast) {
      console.log("   Contrast Codes: ");
      displayCodes(images.contrast.code);
    }
    if (images.view) {
      console.log("   View Codes: ");
      displayCodes(images.view.code);
    }
  }
}
```

### Print out the Sex Mismatch Inference code

```ts snippet:ReadmeSampleSexMismatch
import {
  RadiologyInsightsJobOutput,
  SexMismatchInference,
  CodeableConcept,
} from "@azure-rest/health-insights-radiologyinsights";

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  for (const patientResult of radiologyInsightsResult?.result?.patientResults || []) {
    for (const inference of patientResult?.inferences || []) {
      if (inference.kind === "sexMismatch") {
        const sexMismatchInference = inference as SexMismatchInference;
        console.log("Sex Mismatch Inference found: ");
        displayCodes(sexMismatchInference.sexIndication);
      }
    }
  }

  function displayCodes(codeableConcept: CodeableConcept): void {
    for (const coding of codeableConcept.coding || []) {
      console.log(`      Coding: ${coding.code}, ${coding.display} (${coding.system})`);
    }
  }
}
```

## Using a Managed Identity require changes in adding the clientID of your managed identity as a const, adding it to you DefaultAzureCredential and add the Authorization Header

```ts snippet:ReadmeSampleManagedIdentity
import { DefaultAzureCredential } from "@azure/identity";
import RadiologyInsightsRestClient from "@azure-rest/health-insights-radiologyinsights";

const managedIdentityClientId = "<client-id>";
const endpoint = "https://<your-endpoint>";
const credential = new DefaultAzureCredential({ managedIdentityClientId });
const client = RadiologyInsightsRestClient(endpoint, credential);

const tokenResponse = await credential.getToken("https://cognitiveservices.azure.com/.default");

const jobID = "jobId-123456789";
const radiologyInsightsJob = {
  jobData: {
    patients: [],
    configuration: {},
  },
};

// Create request body
const radiologyInsightsParameter = { body: radiologyInsightsJob };
// Create request body
const initialResponse = await client
  .path("/radiology-insights/jobs/{id}", jobID)
  .put(radiologyInsightsParameter, {
    headers: {
      Authorization: `Bearer ${tokenResponse?.token}`,
      "Content-Type": "application/json",
    },
  });
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

<!-- LINKS -->

[health_insights]: https://learn.microsoft.com/azure/azure-health-insights/overview
[radiology_insights_docs]: https://learn.microsoft.com/azure/azure-health-insights/radiology-insights/
[Source code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest
[Package (NPM)]: https://www.npmjs.com/package/@azure-rest/health-insights-radiologyinsights
[API reference documentation]: https://learn.microsoft.com/rest/api/cognitiveservices/healthinsights/operation-groups?view=rest-cognitiveservices-healthinsights-2024-04-01
[Product Information]: https://learn.microsoft.com/azure/azure-health-insights/radiology-insights/overview
[Samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[identity]: https://www.npmjs.com/package/@azure/identity
[token_credential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[default_information]: https://learn.microsoft.com/javascript/api/%40azure/identity/defaultazurecredential?view=azure-node-latest
[managed_identity]: https://learn.microsoft.com/javascript/api/%40azure/identity/managedidentitycredential?view=azure-node-latest
[credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
