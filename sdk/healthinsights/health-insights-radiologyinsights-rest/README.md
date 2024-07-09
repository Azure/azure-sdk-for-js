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

## Examples

### Create a RadiologyInsights asynchronous client

```typescript
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
const credential = new DefaultAzureCredential();
const client = RadiologyInsightsRestClient(endpoint, credential);
```

### Build a request, send it to the client and print out the description of a Critical Result Inference

```typescript

export async function main() {
  const credential = new DefaultAzureCredential();
  const client = AzureHealthInsightsClient(endpoint, credential);
 
 // if you want to use DefaultAzureCredential in you test, you can use the createTestCredential to do the correct switches between node and browser tests
  import { createTestCredential } from "@azure-tools/test-credential";

  export async function createTestClient(recorder: Recorder): Promise<AzureHealthInsightsClient> {
  const endpoint = assertEnvironmentVariable("HEALTH_INSIGHTS_ENDPOINT");
  const credential = createTestCredential();
  return AHIClient(endpoint, credential, recorder.configureClientOptions({}));
}

  // Create request body
  const radiologyInsightsParameter = createRequestBody();

  // Initiate radiology insights job and retrieve results
  // The jobID can be adapted by preference of the client, there are restrictions in size and it cannot contain spaces
    const dateString = Date.now();
    const jobID = "jobId-" + dateString;
    const initialResponse = await client.path("/radiology-insights/jobs/{id}", jobID).put(radiologyInsightsParameter);
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
  id: "authorid1",
  fullName: "authorname1",
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
    value: `CLINICAL HISTORY:   
  20-year-old female presenting with abdominal pain. Surgical history significant for appendectomy.
   
  COMPARISON:   
  Right upper quadrant sonographic performed 1 day prior.
   
  TECHNIQUE:   
  Transabdominal grayscale pelvic sonography with duplex color Doppler 
  and spectral waveform analysis of the ovaries.
   
  FINDINGS:   
  The uterus is unremarkable given the transabdominal technique with 
  endometrial echo complex within physiologic normal limits. The 
  ovaries are symmetric in size, measuring 2.5 x 1.2 x 3.0 cm and the 
  left measuring 2.8 x 1.5 x 1.9 cm.
   
  On duplex imaging, Doppler signal is symmetric.
   
  IMPRESSION:   
  1. Normal pelvic sonography. Findings of testicular torsion.
  A new US pelvis within the next 6 months is recommended.

  These results have been discussed with Dr. Jones at 3 PM on November 5 2020.`,
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
    createdAt: new Date("2021-05-31T16:00:00.000Z"),
    orderedProceduresAsCsv: "US PELVIS COMPLETE"
  };


  const patientData = {
    id: "Samantha Jones",
    details: patientInfo,
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

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
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
### Print out the Age Mismatch Inference evidences
```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput, content: string): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference: any) => {
            if (inference.kind === "ageMismatch") {
              console.log("Age Mismatch Inference found: ");
              const evidence = findAgeEvidence(inference.extension, content);
              console.log("   Evidence: " + evidence);
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

  function findAgeEvidence(extensions: any, content: string) {
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

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference: any) => {
            if (inference.kind === "completeOrderDiscrepancy") {
              console.log("Complete Order Discrepancy Inference found: ");
              if ("orderType" in inference) {
                console.log("   Ordertype: ");
                displayCodes({ codeableConcept: inference.orderType });
              };

              inference.missingBodyParts?.forEach((bodyparts: any) => {
                console.log("   Missing Body Parts: ");
                displayCodes({ codeableConcept: bodyparts });
              });

              inference.missingBodyPartMeasurements?.forEach((bodymeasure: any) => {
                console.log("   Missing Body Part Measurements: ");
                displayCodes({ codeableConcept: bodymeasure });
              });
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

  function displayCodes({ codeableConcept }: { codeableConcept: any; }): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
  }

}
```

### Print out the Finding Inference code, interpretation, Component codes and the section info

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: { inferences: any[]; }) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "finding") {
              console.log("Finding Inference found: ");

              let find = inference.finding;
              if ("code" in find) {
                let fcode = find.code;
                console.log("   Code: ");
                displayCodes(fcode);
              }

              find.interpretation?.forEach((inter: any) => {
                console.log("   Interpretation: ");
                displayCodes(inter);
              });

              inference.finding.component?.forEach((comp: { code: any; valueCodeableConcept: any }) => {
                console.log("   Component code: ");
                displayCodes(comp.code);
                if ("valueCodeableConcept" in comp) {
                  console.log("     Value component codeable concept: ");
                  displayCodes(comp.valueCodeableConcept);
                }
              });

              if ("extension" in inference) {
                displaySectionInfo(inference);
              };

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

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
  }

  function displaySectionInfo(inference: { extension: any[]; }) {
    inference.extension?.forEach((ext: any) => {
      if ("url" in ext && ext.url === "section") {
        console.log("   Section:");
        ext.extension?.forEach((subextension: { url: string; valueString: string; }) => {
          if ("url" in subextension && "valueString" in subextension) {
            console.log("      " + subextension.url + ": " + subextension.valueString);
          }
        });
      }
    });
  }

}
```

### Print out the Follow Up Communication Inference date and recipient

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        patientResult.inferences.forEach((inference: { kind: string; communicatedAt: any[]; recipient: any[]; wasAcknowledged: string; }) => {
          if (inference.kind === "followupCommunication") {
            console.log("Followup Communication Inference found");
            if ("communicatedAt" in inference) {
              console.log("Communicated at: " + inference.communicatedAt.join(" "));
            }
            if ("recipient" in inference) {
              console.log("Recipient: " + inference.recipient.join(" "));
            }
            console.log("   Aknowledged: " + inference.wasAcknowledged);
          }
        });
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

### Print out the Follow Up Recommendation Inference booleans, Generic Procedure code, description and Imaging Procedure codes

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        patientResult.inferences.forEach((inference: { kind: string; isConditional: any; isGuideline: any; isHedging: any; isOption: any; recommendedProcedure: any; }) => {
          if (inference.kind === "followupRecommendation") {
            console.log("Follow Up Recommendation Inference found");
            console.log("   Is conditional: ", inference.isConditional);
            console.log("   Is guidline: ", inference.isGuideline);
            console.log("   Is hedging: ", inference.isHedging);
            console.log("   Is option: ", inference.isOption);

            var procedure = inference.recommendedProcedure;
            if ("kind" in procedure && procedure.kind === "genericProcedureRecommendation") {
              if ("code" in procedure) {
                console.log("   Recommended Generic Procedure: ", procedure.code);
              }
              if ("description" in procedure) {
                console.log("   Description: ", procedure.description);
              }
            } else if ("kind" in procedure && procedure.kind === "imagingProcedureRecommendation") {
              procedure.procedureCodes?.forEach((procedureCode: any) => {
                console.log("   Recommended Procedure Codes: ");
                displayCodes(procedureCode);
              });

              if ("imagingProcedures" in procedure) {
                procedure.imagingProcedures?.forEach((imagingProcedure: any) => {
                  console.log("   Recommended Imaging Procedure Codes: ");
                  displayImaging(imagingProcedure);
                });
              }
            }
          }
        });
      });
    }
  } else {
    const error = radiologyInsightsResult.error;
    if (error) {
      console.log(error.code, ":", error.message);
    }
  }

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
  }

  function displayImaging(images: { modality: { coding: any[]; }; anatomy: { coding: any[]; }; laterality: { coding: any[]; }; contrast: { code: { coding: any[]; }; }; view: { code: { coding: any[]; }; }; }) {
    console.log("   Modality Codes: ");
    displayCodes(images.modality);
    console.log("   Anatomy Codes: ");
    displayCodes(images.anatomy);
    if ("laterality" in images) {
      console.log("   Laterality Codes: ");
      displayCodes(images.laterality);
    }
    if ("contrast" in images) {
      console.log("   Contrast Codes: ");
      displayCodes(images.contrast.code);
    }
    if ("view" in images) {
      console.log("   View Codes: ");
      displayCodes(images.view.code);
    }
  }

}
```

### Print out the Laterality Discrepancy Inference code

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        patientResult.inferences.forEach((inference: { kind: string; lateralityIndication: any }) => {
          if (inference.kind === "lateralityDiscrepancy") {
            console.log("Laterality Discrepancy Inference found: ");
            displayCodes(inference.lateralityIndication);
          }
        });
      });
    }
  } else {
    const error = radiologyInsightsResult.error;
    if (error) {
      console.log(error.code, ":", error.message);
    }
  }

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("   Coding: " + coding.code + ", " + coding.display + " (" + coding.system + "), type: " + coding.type);
      }
    });
  }

}
```

### Print out the Limited Order Discrepancy Inference ordertype with present Body Parts and present Body Part Measurements

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: { inferences: any[]; }) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "limitedOrderDiscrepancy") {
              console.log("Limited Order Discrepancy Inference found: ");
              if ("orderType" in inference) {
                console.log("   Ordertype: ");
                displayCodes(inference.orderType);
              };

              inference.presentBodyParts?.forEach((bodyparts: any) => {
                console.log("   Present Body Parts: ");
                displayCodes(bodyparts);
              });

              inference.presentBodyPartMeasurements?.forEach((bodymeasure: any) => {
                console.log("   Present Body Part Measurements: ");
                displayCodes(bodymeasure);
              });
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

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("   Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
  }

}
```

### Print out the Radiology Procedure Inference codes, Imaging Procedure codes and Order Procedure Codes and its description

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: { inferences: any[]; }) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "radiologyProcedure") {
              console.log("Radiology Procedure Inference found");
              inference.procedureCodes?.forEach((procedureCode: any) => {
                console.log("   Procedure Codes: ");
                displayCodes(procedureCode);
              });

              if ("imagingProcedures" in inference) {
                inference.imagingProcedures?.forEach((imagingProcedure: any) => {
                  console.log("   Imaging Procedure Codes: ");
                  displayImaging(imagingProcedure);
                });
              }

              if ("orderedProcedure" in inference) {
                console.log("   Ordered procedures: ");
                if ("code" in inference.orderedProcedure) {
                  displayCodes(inference.orderedProcedure.code);
                }
              }

              if ("description" in inference.orderedProcedure) {
                console.log("   Description: " + inference.orderedProcedure.description);
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

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
  }

  function displayImaging(images: any): void {
    console.log("   Modality Codes: ");
    displayCodes(images.modality);
    console.log("   Anatomy Codes: ");
    displayCodes(images.anatomy);
    if ("laterality" in images) {
      console.log("   Laterality Codes: ");
      displayCodes(images.laterality);
    }
    if ("contrast" in images) {
      console.log("   Contrast Codes: ");
      displayCodes(images.contrast.code);
    }
    if ("view" in images) {
      console.log("   View Codes: ");
      displayCodes(images.view.code);
    }
  }

}
```

### Print out the Sex Mismatch Inference code

```typescript
function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: { inferences: any[]; }) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "sexMismatch") {
              console.log("Sex Mismatch Inference found: ");
              if ("sexIndication" in inference) {
                displayCodes(inference.sexIndication)
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

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
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
[API reference documentation]: https://learn.microsoft.com/rest/api/cognitiveservices/healthinsights/operation-groups?view=rest-cognitiveservices-healthinsights-2024-04-01
[Product Information]: https://learn.microsoft.com/azure/azure-health-insights/radiology-insights/overview
[Samples]:https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthinsights/health-insights-radiologyinsights-rest/samples/v1
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[identity]: https://www.npmjs.com/package/@azure/identity
[token_credential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
