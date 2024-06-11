// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the finding of the Radiology Insights request.
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
    * Print the finding inference
 */

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

// Create request body for radiology insights
function createRequestBody(): CreateJobParameters {

  const codingData = {
    system: "Http://hl7.org/fhir/ValueSet/cpt-all",
    code: "ANG366",
    display: "XA VENACAVA FILTER INSERTION"
  };

  const code = {
    coding: [codingData]
  };

  const patientInfo = {
    sex: "male",
    birthDate: new Date("1980-04-22T02:00:00+00:00")
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
    description: "XA VENACAVA FILTER INSERTION"
  };

  const administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1"
  };

  const content = {
    sourceType: "inline",
    value: `FINDINGS:
    1. Inferior vena cavagram using CO2 contrast shows the IVC is normal
    in course and caliber without filling defects to indicate clot. It
    measures 19.8 mm. in diameter infrarenally.

    2. Successful placement of IVC filter in infrarenal location.`
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
    orderedProceduresAsCsv: "XA VENACAVA FILTER INSERTION"
  };


  const patientData = {
    id: "Roberto Lewis",
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
  console.error("The finding encountered an error:", err);
});
