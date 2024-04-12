// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the limited order discrepancy of the Radiology Insights request.
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
    * Print the limited order discrepancy inference
 */

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

  function displayCodes(codableConcept: any): void {
    codableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log("   Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
      }
    });
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
    value: "CLINICAL HISTORY:   "
      + "\r\n20-year-old female presenting with abdominal pain. Surgical history significant for appendectomy."
      + "\r\n "
      + "\r\nCOMPARISON:   "
      + "\r\nRight upper quadrant sonographic performed 1 day prior."
      + "\r\n "
      + "\r\nTECHNIQUE:   "
      + "\r\nTransabdominal grayscale pelvic sonography with duplex color Doppler "
      + "\r\nand spectral waveform analysis of the ovaries."
      + "\r\n "
      + "\r\nFINDINGS:   "
      + "\r\nThe uterus is unremarkable given the transabdominal technique with "
      + "\r\nendometrial echo complex within physiologic normal limits. The "
      + "\r\novaries are symmetric in size, measuring 2.5 x 1.2 x 3.0 cm and the "
      + "\r\nleft measuring 2.8 x 1.5 x 1.9 cm.\n \r\nOn duplex imaging, Doppler signal is symmetric."
      + "\r\n "
      + "\r\nIMPRESSION:   "
      + "\r\n1. Normal pelvic sonography. Findings of testicular torsion."
      + "\r\n\nA new US pelvis within the next 6 months is recommended."
      + "\n\nThese results have been discussed with Dr. Jones at 3 PM on November 5 2020.\n "
      + "\r\n"
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
    createdAt: new Date("2021-06-01T00:00:00.000"),
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
  console.error("The limited order encountered an error:", err);
});
