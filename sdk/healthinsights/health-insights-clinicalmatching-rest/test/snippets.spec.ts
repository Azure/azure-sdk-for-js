// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import ClinicalMatchingRestClient, { getLongRunningPoller, isUnexpected } from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { readFileSync } from "node:fs";

describe("snippets", () => {
  it("ReadmeSampleMatchTrials", async () => {
    const endpoint = "https://<your-endpoint>";
    const apiKey = "<your-api-key>";
    const credential = new AzureKeyCredential(apiKey);
    const client = ClinicalMatchingRestClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Create request body for clinical matching
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
    // @ts-preserve-whitespace
    const patientInfo = {
      sex: "MALE",
      birthDate: new Date("1965-11-26T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
      clinicalInfo: clinicalInfoList,
    };
    const docContent = {
      sourceType: "INLINE",
      value: readFileSync("./example-data/match_trial_fhir_data.txt").toString(),
    };
    const patientDataList = {
      type: "fhirBundle",
      id: "Consultation-14-Demo",
      content: docContent,
      clinicalType: "CONSULTATION",
    };
    // @ts-preserve-whitespace
    const patient1 = {
      id: "patient_id",
      info: patientInfo,
      data: [patientDataList],
    };
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    const clinicalTrials = {
      registryFilters: [registryFilters],
    };
    // @ts-preserve-whitespace
    const configuration = {
      clinicalTrials: clinicalTrials,
    };
    // @ts-preserve-whitespace
    const trialMatcherData = {
      patients: [patient1],
      configuration: configuration,
    };
    // @ts-preserve-whitespace
    const trialMatcherParameter = {
      body: trialMatcherData,
    };
    // @ts-preserve-whitespace
    // Initiate clinical matching job and retrieve results
    const initialResponse = await client.path("/trialmatcher/jobs").post(trialMatcherParameter);
    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }
    const poller = await getLongRunningPoller(client, initialResponse);
    const trialMatcherResult = await poller.pollUntilDone();
    if (isUnexpected(trialMatcherResult)) {
      throw trialMatcherResult.body.error;
    }
    const resultBody = trialMatcherResult.body;
    // @ts-preserve-whitespace
    const results = resultBody.results;
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
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
