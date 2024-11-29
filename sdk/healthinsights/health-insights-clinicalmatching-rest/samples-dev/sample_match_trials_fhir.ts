// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Trial Eligibility Assessment for a Custom Trial.
 *
 * @summary detects change points.
 */

import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";
import type { CreateJobParameters, TrialMatcherResultOutput } from "../src/index.js";
import ClinicalMatchingRestClient, { getLongRunningPoller, isUnexpected } from "../src/index.js";
import "dotenv/config";

// You will need to set this environment variables or edit the following values
const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

// Get patient data in fhir format
function getPatientDocContent(): string {
  const content = readFileSync("./example-data/match_trial_fhir_data.txt").toString();
  return content;
}

// Print the inference results for a patient's cancer attributes
function printResults(trialMatcherResult: TrialMatcherResultOutput): void {
  if (trialMatcherResult.status === "succeeded") {
    const results = trialMatcherResult.results;
    if (results) {
      const patients = results.patients;
      for (const patientResult of patients) {
        console.log(`Inferences of Patient ${patientResult.id}`);
        for (const tmInferences of patientResult.inferences) {
          console.log(`Trial Id ${tmInferences.id}`);
          console.log(`Type: ${String(tmInferences.type)}  Value: ${tmInferences.value}`);
          console.log(`Description ${tmInferences.description}`);
        }
      }
    }
  } else {
    const errors = trialMatcherResult.errors;
    if (errors) {
      for (const error of errors) {
        console.log(error.code, ":", error.message);
      }
    }
  }
}

// Create request body for clinical matching
function createRequestBody(): CreateJobParameters {
  // Define patient information and clinical info
  const clinicalInfoList = [
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0006826",
      name: "Malignant Neoplasms",
      value: "true",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C1522449",
      name: "Therapeutic radiology procedure",
      value: "true",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C1512162",
      name: "Eastern Cooperative Oncology Group",
      value: "1",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0019693",
      name: "HIV Infections",
      value: "false",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C1300072",
      name: "Tumor stage",
      value: "2",
    },
  ];

  const patientInfo = {
    sex: "MALE",
    birthDate: new Date("1965-11-26T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
    clinicalInfo: clinicalInfoList,
  };

  const docContent = { sourceType: "INLINE", value: getPatientDocContent() };
  const patientDataList = {
    type: "fhirBundle",
    id: "Consultation-14-Demo",
    content: docContent,
    clinicalType: "CONSULTATION",
  };

  const patient1 = {
    id: "patient_id",
    info: patientInfo,
    data: [patientDataList],
  };

  const geographicLocation = {
    countryOrRegion: "United States",
    city: "Gilbert",
    state: "Arizona",
  };
  const registryFilters = {
    conditions: ["Non-small cell lung cancer"],
    phases: ["PHASE1"],
    sources: ["CLINICALTRIALS_GOV"],
    facilityLocations: [geographicLocation],
    studyTypes: ["INTERVENTIONAL"],
  };

  const clinicalTrials = {
    registryFilters: [registryFilters],
  };

  const configuration = {
    clinicalTrials: clinicalTrials,
  };

  const trialMatcherData = {
    patients: [patient1],
    configuration: configuration,
  };

  return {
    body: trialMatcherData,
  };
}

export async function main(): Promise<void> {
  const credential = new AzureKeyCredential(apiKey);
  const client = ClinicalMatchingRestClient(endpoint, credential);

  // Create request body for clinical matching
  const trialMatcherParameter = createRequestBody();
  // Initiate clinical matching job and retrieve results
  const initialResponse = await client.path("/trialmatcher/jobs").post(trialMatcherParameter);
  if (isUnexpected(initialResponse)) {
    throw initialResponse;
  }
  const poller = await getLongRunningPoller(client, initialResponse);
  const trialMatcherResult = await poller.pollUntilDone();
  if (isUnexpected(trialMatcherResult)) {
    throw trialMatcherResult;
  }
  const resultBody = trialMatcherResult.body;
  printResults(resultBody);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
