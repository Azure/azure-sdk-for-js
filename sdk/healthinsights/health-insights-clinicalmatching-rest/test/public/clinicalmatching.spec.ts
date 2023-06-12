// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import {createClient, createRecorder} from "./utils/recordedClient";
import {
    ClinicalCodedElement,
    ClinicalMatchingClient, ClinicalTrialRegistryFilter, ClinicalTrials, GeographicLocation,
    getLongRunningPoller,
    MatchTrialsBodyParam,
    PatientInfo, PatientRecord, TrialMatcherData, TrialMatcherModelConfiguration
} from "../../src";

const clinicalInfoList: ClinicalCodedElement[] = [
        {
          system: "http://www.nlm.nih.gov/research/umls",
          code: "C0006826",
          name: "Malignant Neoplasms",
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

describe("My test", () => {
  let recorder: Recorder;
  let client: ClinicalMatchingClient;


  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("clinical matching test", async function () {
    const result = await client.path("/trialmatcher/jobs").post(trialMatcherParameter);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res)
    assert.equal(res.status, '200');
  });
});
