// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the sex mismatches of the Radiology Insights request.
 */
const dotenv = require("dotenv");
const AzureHealthInsightsClient = require("@azure-rest/health-insights-radiologyinsights").default,
  { getLongRunningPoller, isUnexpected } = require("@azure-rest/health-insights-radiologyinsights");
const { DefaultAzureCredential } = require("@azure/identity");


config();

// You will need to set this environment variables or edit the following values

const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

/**
    * Print the sex mismatch inferences
 */

function printResults(radiologyInsightsResult) {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "sexMismatch") {
              console.log("Sex Mismatch Inference found: ");
              if ("sexIndication" in inference) {
                displayCode(inference.sexIndication)
              }
            }
          });
        }
      });
    }
  } else {
    const errors = radiologyInsightsResult.errors;
    if (errors) {
      for (const error of errors) {
        console.log(error.code, ":", error.message);
      }
    }
  }
}

function displayCode(codeableConcept) {
  if ("code" in codeableConcept.coding) {
    console.log("   Coding: " + codeableConcept.coding.code + ", " + codeableConcept.coding.display + " (" + codeableConcept.coding.system + ")");
  }
}

// Create request body for radiology insights
function createRequestBody() {

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
    value: `
    CLINICAL HISTORY:
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
    clinicalType: ClinicalDocumentTypeEnum.RadiologyReport,
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

  // Create RI Configuration
  const configuration = {
    inferenceOptions: inferenceOptions,
    inferenceTypes: inferenceTypes,
    locale: "en-US",
    verbose: false,
    includeEvidence: true
  };

  const RadiologyInsightsJob = {
    jobData: {
      patients: [patientData],
      configuration: configuration,
    }
  };



  return {
    body: radiologyInsightsData
  }

}

async function main() {
  const credential = new DefaultAzureCredential();
  const client = new AzureHealthInsightsClient(endpoint, credential);

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
  console.error("The sex mismatch encountered an error:", err);
});

module.exports = { main };
