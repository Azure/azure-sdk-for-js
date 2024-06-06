// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the radiology procedure of the Radiology Insights request.
 */
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

import AzureHealthInsightsClient, {
  CreateJobParameters,
  RadiologyInsightsJobOutput,
  getLongRunningPoller,
  isUnexpected
} from "../src";

dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["HEALTH_INSIGHTS_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

/**
    * Print the radiology procedure inference
 */

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

// Create request body for radiology insights
function createRequestBody(): CreateJobParameters {

  const codingData = {
    system: "Http://hl7.org/fhir/ValueSet/cpt-all",
    code: "24727-0",
    display: "CT HEAD W CONTRAST IV"
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
    description: "CT HEAD W CONTRAST IV"
  };

  const administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1"
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
    clinicalType: "radiologyReport",
    id: "docid1",
    language: "en",
    authors: [authorData],
    specialtyType: "radiology",
    administrativeMetadata: administrativeMetadata,
    content: content,
    createdAt: new Date("2021-05-31T100:00.000"),
    orderedProceduresAsCsv: "CT HEAD W CONTRAST IV"
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

  return {
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
  console.error("The radiology procedure encountered an error:", err);
});
