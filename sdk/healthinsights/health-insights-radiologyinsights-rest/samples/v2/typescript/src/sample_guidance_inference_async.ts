// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Displays the clinical guidance of the Radiology Insights request.
 */
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";
import {
  CreateJobParameters,
  RadiologyInsightsJobOutput,
} from "@azure-rest/health-insights-radiologyinsights";
import AzureHealthInsightsClient, {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/health-insights-radiologyinsights";

// You will need to set this environment variables or edit the following values

const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

/**
 * Print the clinical guidance inference
 */

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        patientResult.inferences.forEach(
          (inference: {
            kind: string;
            finding?: any;
            identifier?: any;
            presentGuidanceInformation?: any[];
            ranking?: any;
            recommendationProposals?: any;
            missingGuidanceInformation?: string[];
          }) => {
            if (inference.kind === "guidance") {
              console.log("Guidance Inference found:");
              if ("finding" in inference) {
                const find = inference.finding;
                if ("code" in find) {
                  const fcode = find.code;
                  console.log("   Finding Code: ");
                  displayCodes(fcode);
                }
              }

              if ("identifier" in inference) {
                console.log("   Identifier: ", inference.identifier);
                if ("code" in inference.identifier) {
                  displayCodes(inference.identifier.code);
                }
              }

              inference.presentGuidanceInformation?.forEach((presentInfo: any) => {
                console.log("   Present Guidance Information: ");
                displayPresentGuidanceInformation(presentInfo);
              })

              if ("ranking" in inference) {
                console.log("   Ranking: ", inference.ranking);
              }

              if ("recommendationProposals" in inference) {
                inference.recommendationProposals.forEach((proposal: any) => {
                  console.log("   Recommendation Proposal: ", proposal.kind);
                  console.log("      Recommendation Procedure: ", proposal.recommendedProcedure.kind);
                  if ("imagingProcedures" in proposal.recommendedProcedure) {
                    proposal.recommendedProcedure.imagingProcedures?.forEach((imagingProcedure: any) => {
                      console.log("      Recommended Imaging Procedure Codes: ");
                      displayImaging(imagingProcedure);
                    });
                  }
                });
              }

              inference.missingGuidanceInformation?.forEach((missingInfo: any) => {
                console.log("   Missing Guidance Information: ", missingInfo);
              })

            }
          })
      });
    } else {
      const error = radiologyInsightsResult.error;
      if (error) {
        console.log(error.code, ":", error.message);
      }
    }

    function displayCodes(codeableConcept: any): void {
      codeableConcept.coding?.forEach((coding: any) => {
        if ("code" in coding) {
          if ("display" in coding && "system" in coding && "code" in coding) {
            console.log(
              "      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")",
            );
          }
        }
      });
    }

    function displayPresentGuidanceInformation(guidanceinfo: any): void {
      console.log("     Present Guidance Information Item: ", guidanceinfo.presentGuidanceItem);

      guidanceinfo.presentGuidanceValues?.forEach((sizes: any) => {
        console.log("     Present Guidance Value: ", sizes);
      })

      guidanceinfo.sizes?.forEach((sizes: any) => {
        if ("valueQuantity" in sizes) {
          console.log("     Size valueQuantity: ");
          displayQuantityOutput(guidanceinfo.sizes.valueQuantity);
        }
        if ("valueRange" in sizes) {
          if ("low" in sizes.valueRange) {
            console.log("     Size ValueRange: min", sizes.valueRange.low);
          }
          if ("high" in sizes.valueRange) {
            console.log("     Size ValueRange: max", sizes.valueRange.high);
          }
        }
      })

      if ("maximumDiameterAsInText" in guidanceinfo) {
        console.log("     Maximum Diameter As In Text: ");
        displayQuantityOutput(guidanceinfo.maximumDiameterAsInText);
      }

      if ("extension" in guidanceinfo) {
        console.log("     Extension: ");
        displaySectionInfo(guidanceinfo.extension);
      }
    }

    function displayQuantityOutput(quantity: any): void {
      if ("value" in quantity) {
        console.log("     Value: ", quantity.value);
      }
      if ("unit" in quantity) {
        console.log("     Unit: ", quantity.unit);
      }
    }

    function displaySectionInfo(inference: { extension: any[] }): void {
      inference.extension?.forEach((ext: any) => {
        if ("url" in ext && ext.url === "section") {
          console.log("   Section:");
          ext.extension?.forEach((subextension: { url: string; valueString: string }) => {
            if ("url" in subextension && "valueString" in subextension) {
              console.log("      " + subextension.url + ": " + subextension.valueString);
            }
          });
        }
      });
    }

    function displayImaging(images: {
      modality: { coding: any[] };
      anatomy: { coding: any[] };
      laterality: { coding: any[] };
      contrast: { code: { coding: any[] } };
      view: { code: { coding: any[] } };
    }): void {
      console.log("     Modality Codes: ");
      displayCodes(images.modality);
      console.log("     Anatomy Codes: ");
      displayCodes(images.anatomy);
      if ("laterality" in images) {
        console.log("     Laterality Codes: ");
        displayCodes(images.laterality);
      }
      if ("contrast" in images) {
        console.log("     Contrast Codes: ");
        displayCodes(images.contrast.code);
      }
      if ("view" in images) {
        console.log("     View Codes: ");
        displayCodes(images.view.code);
      }
    }

  }

}
// Create request body for radiology insights
function createRequestBody(): CreateJobParameters {
  const codingData = {
    system: "http://www.ama-assn.org/go/cpt",
    code: "71250",
    display: "CT CHEST WO CONTRAST",
  };

  const code = {
    coding: [codingData],
  };

  const patientInfo = {
    sex: "female",
    birthDate: "1959-11-11T19:00:00+00:00",
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
    description: "CT CHEST WO CONTRAST",
  };

  const administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1",
  };

  const content = {
    sourceType: "inline",
    value: `History:
    Left renal tumor with thin septations.
    Findings:
    There is a right kidney tumor with nodular calcification.`,
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
    createdAt: "2021-05-31T16:00:00.000Z",
    orderedProceduresAsCsv: "CT CHEST WO CONTRAST",
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
    "scoringAndAssessment",
    "guidance",
    "qualityMeasure",
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
  const RadiologyInsightsJob = {
    jobData: {
      patients: [patientData],
      configuration: configuration,
    },
  };

  return {
    body: RadiologyInsightsJob,
  };
}

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = AzureHealthInsightsClient(endpoint, credential);

  // Create request body
  const radiologyInsightsParameter = createRequestBody();

  // Initiate radiology insights job and retrieve results
  const dateString = Date.now();
  const jobID = "jobId-" + dateString;
  const initialResponse = await client
    .path("/radiology-insights/jobs/{id}", jobID)
    .put(radiologyInsightsParameter);
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

main().catch((err) => {
  console.error("The clinical guidance encountered an error:", err);
});
