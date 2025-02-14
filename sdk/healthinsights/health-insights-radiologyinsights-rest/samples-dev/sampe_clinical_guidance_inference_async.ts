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
  ClinicalDocumentType,
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/health-insights-radiologyinsights";

// You will need to set this environment variables or edit the following values

const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

/**
 * Print the clincal guidance inference
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
              console.log("Clinical Guidance Inference found");
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

              inference.presentGuidanceInformation?.forEach((presentGuidanceInformation: any) => {
                console.log("   Present Guidance Information: ");
                displayPresentGuidanceInformation(inference.presentGuidanceInformation);
              })

              if ("ranking" in inference) {
                console.log("   Ranking: ", inference.ranking);
              }

              if ("recommendationProposal" in inference) {
                console.log("   Recommendation Proposal: ", inference.recommendationProposal.recommendedProcedure.kind);
              }

              inference.missingGuidanceInfromation?.forEach((missingGuidanceInfromation: any) => {
                console.log("   Missing Guidance Information: ", inference.missingGuidanceInfromation);
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


      guidanceinfo.presentGuidanceValues?.forEach((sizes: any) => {
        console.log("     Present Guidance Value: ", guidanceinfo.presentGuidanceValue);
      })

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
    description: "CT CHEST WO CONTRAST",
  };

  const administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1",
  };

  const content = {
    sourceType: "inline",
    value: `EXAM: CT CHEST WO CONTRAST
INDICATION: abnormal lung findings. History of emphysema.
TECHNIQUE: Helical CT images through the chest, without contrast. This exam was performed using one or more of the following dose reduction techniques: Automated exposure control, adjustment of the mA and/or kV according to patient size, and/or use of iterative reconstruction technique.
COMPARISON: Chest CT dated 6/21/2022.
Number of previous CT examinations or cardiac nuclear medicine (myocardial perfusion) examinations performed in the preceding 12-months: 2

FINDINGS:
Heart size is normal. No pericardial effusion. Thoracic aorta as well as pulmonary arteries are normal in caliber. There are dense coronary artery calcifications. No enlarged axillary, mediastinal, or hilar lymph nodes by CT size criteria. Central airways are widely patent. No bronchial wall thickening. No pneumothorax, pleural effusion or pulmonary edema. The previously identified posterior right upper lobe nodules are no longer seen. However, there are multiple new small pulmonary nodules. An 8 mm nodule in the right upper lobe, image #15 series 4. New posterior right upper lobe nodule measuring 6 mm, image #28 series 4. New 1.2 cm pulmonary nodule, right upper lobe, image #33 series 4. New 4 mm pulmonary nodule left upper lobe, image #22 series 4. New 8 mm pulmonary nodule in the left upper lobe adjacent to the fissure, image #42 series 4. A few new tiny 2 to 3 mm pulmonary nodules are also noted in the left lower lobe. As before there is a background of severe emphysema. No evidence of pneumonia.
Limited evaluation of the upper abdomen shows no concerning abnormality.
Review of bone windows shows no aggressive appearing osseous lesions.

IMPRESSION:

1. Previously identified small pulmonary nodules in the right upper lobe have resolved, but there are multiple new small nodules scattered throughout both lungs. Recommend short-term follow-up with noncontrast chest CT in 3 months as per current  Current guidelines (2017 Fleischner Society).
2. Severe emphysema.

Findings communicated to Dr. Jane Smith.`,
  };

  const patientDocumentData = {
    type: "note",
    clinicalType: "radiologyReport"
    id: "docid1",
    language: "en",
    authors: [authorData],
    specialtyType: "radiology",
    administrativeMetadata: administrativeMetadata,
    content: content,
    createdAt: new Date("2021-05-31T16:00:00.000Z"),
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
  const content =
    radiologyInsightsParameter?.body?.jobData?.patients?.[0]?.patientDocuments?.[0]?.content
      ?.value ?? "";
  await printResults(resultBody);
}

main().catch((err) => {
  console.error("The clinical guidance encountered an error:", err);
});
