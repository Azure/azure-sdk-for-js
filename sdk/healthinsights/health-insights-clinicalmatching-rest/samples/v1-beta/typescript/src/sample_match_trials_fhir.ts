// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Trial Eligibility Assessment for a Custom Trial.
 *
 * @summary detects change points.
 */

import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import * as fs from 'fs';
import ClinicalMatchingRestClient, {
    ClinicalCodedElement,
    ClinicalTrialRegistryFilter,
    ClinicalTrials,
    DocumentContent,
    GeographicLocation,
    getLongRunningPoller,
    isUnexpected,
    CreateJobBodyParam,
    PatientDocument,
    PatientInfo,
    PatientRecord,
    TrialMatcherData,
    TrialMatcherModelConfiguration,
    TrialMatcherResultOutput, TrialMatcherResultsOutput
} from "../src";

dotenv.config();

// You will need to set this environment variables or edit the following values

const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "https://eastus.api.cognitive.microsoft.com";

function getPatientDocContent(): string {
  const content = fs.readFileSync("./example-data/match_trial_fhir_data.txt").toString();
  return content;
}

function printResults(trialMatcherResult: TrialMatcherResultOutput): void {
    if (trialMatcherResult.status === "succeeded") {
      const results = trialMatcherResult.results as TrialMatcherResultsOutput;
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
    else {
      const errors = trialMatcherResult.errors;
      if (errors) {
          for (const error of errors) {
              console.log(error.code, ":", error.message);
          }
      }
  }
}

export async function main() {
  const credential = new AzureKeyCredential(apiKey);
  const client = ClinicalMatchingRestClient(endpoint, credential);

  const clinicalInfoList: ClinicalCodedElement[] = [
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
    }
  ];

  const patientInfo: PatientInfo = {
    sex: "MALE",
    birthDate: new Date(1965, 11, 26), // Note: Months are zero-based (11 represents December)
    clinicalInfo: clinicalInfoList,
  };
  const docContent: DocumentContent = {sourceType: "INLINE", value: getPatientDocContent()};
  const patientDataList: PatientDocument = {
      type: "fhirBundle",
      id: "Consultation-14-Demo",
      content: docContent,
      clinicalType: "CONSULTATION"
  };

  const patient1: PatientRecord = {
    id: "patient_id",
    info: patientInfo,
    data: [patientDataList]
  };

  const geographicLocation: GeographicLocation = { countryOrRegion: "United States", city: "Gilbert", state: "Arizona" };
  const registryFilters: ClinicalTrialRegistryFilter = {
    conditions: ["Non-small cell lung cancer"],
    phases: ["PHASE1"],
    sources: ["CLINICALTRIALS_GOV"],
    facilityLocations: [ geographicLocation ],
    studyTypes: ["INTERVENTIONAL"]
  };

  const clinicalTrials: ClinicalTrials = ({
    registryFilters: [registryFilters]
  });

  const configuration: TrialMatcherModelConfiguration = {
    clinicalTrials: clinicalTrials,
  };

  const trialMatcherData: TrialMatcherData = {
    patients: [patient1],
    configuration: configuration,
  };

  const trialMatcherParameter: CreateJobBodyParam = {
    body: trialMatcherData
  };

  const initialResponse = await client.path("/trialmatcher/jobs").post(trialMatcherParameter);
  if (isUnexpected(initialResponse)) {
    throw initialResponse;
  }
  const poller = await getLongRunningPoller(client, initialResponse);
  const res = await poller.pollUntilDone();
  if (isUnexpected(res)) {
      throw initialResponse;
  }
  const resultBody = res.body as TrialMatcherResultOutput;
  printResults(resultBody);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});