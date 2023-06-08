// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Finding potential eligible trials for a patient, based on patient’s structured medical information.
 *
 * @summary detects change points.
 */

import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import createClient, {
  ClinicalCodedElement,
  ClinicalTrialRegistryFilter, ClinicalTrials,
  GeographicLocation, getLongRunningPoller, MatchTrialsBodyParam,
  PatientInfo,
  PatientRecord, TrialMatcherData, TrialMatcherModelConfiguration, TrialMatcherResultOutput, TrialMatcherResultsOutput
} from "../src";
import {HttpResponse} from "@azure-rest/core-client";
dotenv.config();

// You will need to set this environment variables or edit the following values

const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "https://eastus.api.cognitive.microsoft.com";

function printResults(trialMatcherResult: HttpResponse): void {
    if (trialMatcherResult.status === "200") {
      const resultBody = trialMatcherResult.body as TrialMatcherResultOutput;
      const results = resultBody.results as TrialMatcherResultsOutput;
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

export async function main() {
  const credential = new AzureKeyCredential(apiKey);
  const client = createClient(endpoint, credential);

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

  const patientInfo: PatientInfo = {
    sex: "MALE",
    birthDate: new Date(1965, 11, 26), // Note: Months are zero-based (11 represents December)
    clinicalInfo: clinicalInfoList,
  };

  const patient1: PatientRecord = {
    id: "patient_id",
    info: patientInfo,
  };

  const geographicLocation: GeographicLocation = { countryOrRegion: "United States", city: "Gilbert", state: "Arizona" };
  const registryFilters: ClinicalTrialRegistryFilter = {
    conditions: ["Non-small cell lung cancer"],
    phases: ["PHASE1"],
    sources: ["CLINICALTRIALS_GOV"],
    facilityLocations: [ geographicLocation ],
    studyTypes: ["INTERVENTIONAL"]
  };

  // Construct ClinicalTrial instance and attach the registry filter to it.
  const clinicalTrials: ClinicalTrials = ({
    registryFilters: [registryFilters]
  });

  // Create TrialMatcherRequest
  const configuration: TrialMatcherModelConfiguration = {
    clinicalTrials: clinicalTrials,
  };

  const trialMatcherData: TrialMatcherData = {
    patients: [patient1],
    configuration: configuration,
  };

  const trialMatcherParameter: MatchTrialsBodyParam = {
    body: trialMatcherData
  };

  const initialResponse = await client.path("/trialmatcher/jobs").post(trialMatcherParameter);
/*  if (isUnexpected(initialResponse)) {
    throw initialResponse;
  }*/
  const poller = await getLongRunningPoller(client, initialResponse);
  const res = await poller.pollUntilDone();
  printResults(res);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
