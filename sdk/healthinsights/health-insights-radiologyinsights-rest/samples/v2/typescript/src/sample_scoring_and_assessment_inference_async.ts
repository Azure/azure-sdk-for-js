// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Displays the quality measure the Radiology Insights request.
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
 * Print the quality measure inference
 */

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: any) => {
        patientResult.inferences.forEach(
          (inference: {
            kind: string;
            category: string;
            categoryDescription: string;
            singleValue?: string[];
            rangeValue?: any;
          }) => {
            if (inference.kind === "scoringAndAssessment") {
              console.log("Scoring and Assessment Inference found:");

              if ("category" in inference) {
                console.log("   Category: ", inference.category);
              }

              if ("categoryDescription" in inference) {
                console.log("   Category Description: ", inference.categoryDescription);
              }

              if ("singleValue" in inference) {
                console.log("   Single Value: ", inference.singleValue);
              }

              if ("rangeValue" in inference) {
                console.log("   Range Value: ");
                displayValueRange(inference.rangeValue);
              }

            }
          })
      });
    } else {
      const error = radiologyInsightsResult.error;
      if (error) {
        console.log(error.code, ":", error.message);
      }
    }
  }
}

function displayValueRange(range: any): void {
  if ("minimum" in range) {
    console.log("     Min: ", range.minimum);
  }
  if ("maximum" in range) {
    console.log("     Max: ", range.maximum);
  }
}

// Create request body for radiology insights
function createRequestBody(): CreateJobParameters {
  const codingData = {
    system: "http://www.ama-assn.org/go/cpt",
    code: "USTHY",
    display: "US THYROID",
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
    value: `Exam: US THYROID
    
    Clinical History: Thyroid nodules. 76 year old patient.
    
    Comparison: none.
    
    Findings:
      Right lobe: 4.8 x 1.6 x 1.4 cm
      Left Lobe: 4.1 x 1.3 x 1.3 cm
      
    Isthmus: 4 mm
    
    There are multiple cystic and partly cystic sub-5 mm nodules noted within the right lobe (TIRADS 2).
    
    In the lower pole of the left lobe there is a 9 x 8 x 6 mm predominantly solid isoechoic nodule (TIRADS 3).
    
    Impression:
      Multiple bilateral small cystic benign thyroid nodules. 
      A low suspicion 9 mm left lobe thyroid nodule (TI-RAD 3) which, given its small size, does not warrant follow-up. 
      CADRADS 3/4.`,
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
  console.error("The quality measure encountered an error:", err);
});
