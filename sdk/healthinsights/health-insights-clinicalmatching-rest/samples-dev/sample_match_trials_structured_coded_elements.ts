// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Finding potential eligible trials for a patient, based on patient’s structured medical information.
 *
 * @summary detects change points.
 */

import {AzureKeyCredential} from "@azure/core-auth";

import * as dotenv from "dotenv";
import ClinicalMatchingRestClient, {
  CreateJobParameters,
  getLongRunningPoller,
  isUnexpected,
  TrialMatcherResultOutput
} from "../src";

dotenv.config();

// You will need to set this environment variables or edit the following values
const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

// Print the inference results for a patient's cancer attributes
function printResults(trialMatcherResult: TrialMatcherResultOutput): void {
    if (trialMatcherResult.status === "succeeded") {
      const results = trialMatcherResult.results;
      if (results != undefined) {
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
    }
  else {
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
      code: "METASTATIC",
      name: "metastatic",
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
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0019163",
      name: "Hepatitis B",
      value: "false",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0018802",
      name: "Congestive heart failure",
      value: "true",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0019196",
      name: "Hepatitis C",
      value: "false",
    },
    {
      system: "http://www.nlm.nih.gov/research/umls",
      code: "C0220650",
      name: "Metastatic malignant neoplasm to brain",
      value: "true",
    },
  ];

  const patientInfo = {
    sex: "MALE",
    birthDate: new Date("1965-11-26T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
    clinicalInfo: clinicalInfoList,
  };

  const patient1 = {
    id: "patient_id",
    info: patientInfo,
  };

  const geographicLocation = { countryOrRegion: "United States", city: "Gilbert", state: "Arizona" };
  const registryFilters = {
    conditions: ["Non-small cell lung cancer"],
    phases: ["PHASE1"],
    sources: ["CLINICALTRIALS_GOV"],
    facilityLocations: [ geographicLocation ],
    studyTypes: ["INTERVENTIONAL"]
  };

  const clinicalTrials = ({
    registryFilters: [registryFilters]
  });

  const configuration = {
    clinicalTrials: clinicalTrials,
  };

  const trialMatcherData = {
    patients: [patient1],
    configuration: configuration,
  };

  return {
    body: trialMatcherData
  };
}

export async function main() {
  const credential = new AzureKeyCredential(apiKey);
  const client = ClinicalMatchingRestClient(endpoint, credential);

  // Create request body for clinical matching
  const trialMatcherParameter = createRequestBody()
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
