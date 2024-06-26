// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ClinicalMatchingRestClient, getLongRunningPoller } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

const clinicalInfoList = [
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

const patientInfo = {
  sex: "MALE",
  birthDate: new Date("1965-11-26T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
  clinicalInfo: clinicalInfoList,
};

const patient1 = {
  id: "patient_id",
  info: patientInfo,
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

// Construct ClinicalTrial instance and attach the registry filter to it.
const clinicalTrials = {
  registryFilters: [registryFilters],
};

// Create TrialMatcherRequest
const configuration = {
  clinicalTrials: clinicalTrials,
};

const trialMatcherData = {
  patients: [patient1],
  configuration: configuration,
};

const trialMatcherParameter = {
  body: trialMatcherData,
};

describe("My test", () => {
  let recorder: Recorder;
  let client: ClinicalMatchingRestClient;

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
    console.log(res);
    assert.equal(res.status, "200");
  });
});
