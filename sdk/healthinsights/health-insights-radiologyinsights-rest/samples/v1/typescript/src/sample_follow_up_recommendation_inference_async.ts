// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the follow up recommendation of the Radiology Insights request.
 */
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

import AzureHealthInsightsClient, {
  CreateJobParameters,
  RadiologyInsightsJobOutput,
  getLongRunningPoller,
  isUnexpected
} from "@azure-rest/health-insights-radiologyinsights";

dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["HEALTH_INSIGHTS_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

/**
    * Print the follow up recommendation inference
 */

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
        console.log("         Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
  }

  function displayImaging(images: { modality: { coding: any[]; }; anatomy: { coding: any[]; }; laterality: { coding: any[]; }; contrast: { code: { coding: any[]; }; }; view: { code: { coding: any[]; }; }; }) {
    console.log("     Modality Codes: ");
    displayCodes(images.modality);
    console.log("     Anatomy Codes: ");
    displayCodes(images.anatomy);
    if ("laterality" in images) {
      console.log("    Laterality Codes: ");
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


// Create request body for radiology insights
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

    These results have been discussed with Dr. Jones at 3 PM on November 5 2020.`
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
    createdAt: new Date("2021-05-31T16:00:00.000"),
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

  // Create RI Configuration
  const configuration = {
    inferenceOptions: inferenceOptions,
    inferenceTypes: inferenceTypes,
    locale: "en-US",
    verbose: false,
    includeEvidence: true
  };

  // create RI Data
  const RadiologyInsightsJob = {
    jobData: {
      patients: [patientData],
      configuration: configuration,
    }
  };

  const param = {
    body: RadiologyInsightsJob,
  };

}

export async function main() {
  const credential = new AzureKeyCredential(apiKey);
  const client = AzureHealthInsightsClient(endpoint, credential);

  // Create request body
  const radiologyInsightsParameter = createRequestBody();

  // Initiate radiology insights job and retrieve results
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

main().catch((err) => {
  console.error("The follow up recommendation encountered an error:", err);
});
