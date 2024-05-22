// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the laterality discrepancy of the Radiology Insights request.
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
    * Print the laterality discrepancy recommendation inference
 */

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


// Create request body for radiology insights
function createRequestBody(): CreateJobParameters {

  const codingData = {
    system: "Http://hl7.org/fhir/ValueSet/cpt-all",
    code: "26688-1",
    display: "US BREAST - LEFT LIMITED"
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
    description: "US BREAST - LEFT LIMITED"
  };

  const administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1"
  };

  const content = {
    sourceType: "inline",
    value: `Exam:   US LT BREAST TARGETED
    Technique:  Targeted imaging of the  right breast  is performed.
    
    Findings:
    Targeted imaging of the left breast is performed from the 6:00 to the 9:00 position.
    At the 6:00 position, 5 cm from the nipple, there is a 3 x 2 x 4 mm minimally hypoechoic mass with a peripheral calcification.
    This may correspond to the mammographic finding. No other cystic or solid masses visualized.`
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
    createdAt: new Date("2021-05-31T20:00:00.000"),
    orderedProceduresAsCsv: "US BREAST - LEFT LIMITED"
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
  console.error("The laterality discrepancy encountered an error:", err);
});
