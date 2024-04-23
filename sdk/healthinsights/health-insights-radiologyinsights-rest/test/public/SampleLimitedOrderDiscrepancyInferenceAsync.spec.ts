// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { AzureHealthInsightsClient, getLongRunningPoller } from "../../src";
import { createClient, createRecorder } from "./utils/recordedClient";

const codingData = {
  system: "Http://hl7.org/fhir/ValueSet/cpt-all",
  code: "30704-1",
  display: "US ABDOMEN LIMITED",
};

const code = {
  coding: [codingData],
};

const patientInfo = {
  sex: "female",
  birthDate: new Date("1959-11-11T19:00:00+00:00"),
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
  description: "US ABDOMEN LIMITED",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value:
    "\\nHISTORY: 49-year-old male with a history of tuberous sclerosis presenting with epigastric pain and diffuse tenderness." +
    "\r\n The patient was found to have pericholecystic haziness on CT; evaluation for acute cholecystitis." +
    "\r\n TECHNIQUE: Ultrasound evaluation of the abdomen was performed. " +
    "\r\n Comparison is made to the prior abdominal ultrasound (2004) and to the enhanced CT of the abdomen and pelvis (2014)." +
    "\r\n FINDINGS:" +
    "\r\n The liver is elongated, measuring 19.3 cm craniocaudally, and is homogeneous in echotexture without evidence of focal mass lesion. " +
    "\r\n The liver contour is smooth on high resolution images." +
    "\r\n There is no appreciable intra- or extrahepatic biliary ductal dilatation, with the visualized extrahepatic bile duct measuring up to 6 mm." +
    "\r\n There are multiple shadowing gallstones, including within the gallbladder neck, which do not appear particularly mobile." +
    "\r\n In addition, there is thickening of the gallbladder wall up to approximately 7 mm with probable mild mural edema." +
    "\r\n There is no pericholecystic fluid. No sonographic Murphy's sign was elicited; however the patient reportedly received pain medications in the emergency department." +
    "\r\n The pancreatic head, body and visualized portions of the tail are unremarkable." +
    "\r\n The spleen is normal in size, measuring 9.9 cm in length." +
    "\r\n The kidneys are normal in size." +
    "\r\n The right kidney measures 11.5 x 5.2 x 4.3 cm and the left kidney measuring 11.8 x 5.3 x 5.1 cm." +
    "\r\n There are again multiple bilateral echogenic renal masses consistent with angiomyolipomas, in keeping with the patient's history of tuberous sclerosis." +
    "\r\n The largest echogenic mass on the right is located in the upper pole and measures 1.2 x 1.3 x 1.3 cm." +
    "\r\n The largest echogenic mass on the left is located within the renal sinus and measures approximately 2.6 x 2.7 x 4.6 cm." +
    "\r\n Additional indeterminate renal lesions are present bilaterally and are better characterized on CT." +
    "\r\n There is no hydronephrosis.\\n\\nNo ascites is identified within the upper abdomen." +
    "\r\n The visualized portions of the upper abdominal aorta and IVC are normal in caliber." +
    "\r\n IMPRESSION: " +
    "\r\n 1. Numerous gallstones associated with gallbladder wall thickening and probable gallbladder mural edema, highly suspicious for acute cholecystitis in this patient presenting with epigastric pain and pericholecystic hazy density identified on CT." +
    "\r\n Although no sonographic Murphy sign was elicited, evaluation is limited secondary to reported prior administration of pain medication." +
    "\r\n Thus, clinical correlation is required. No evidence of biliary ductal dilation." +
    "\r\n 2. There are again multiple bilateral echogenic renal masses consistent with angiomyolipomas, in keeping with the patient's history of tuberous sclerosis." +
    "\r\n Additional indeterminate renal lesions are present bilaterally and are better characterized on CT and MR." +
    "\r\n These findings were discussed with Dr. Doe at 5:05 p.m. on 1/1/15.",
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
  createdAt: new Date("2021-06-01T00:00:00.000"),
  orderedProceduresAsCsv: "US ABDOMEN LIMITED",
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

const param = {
  body: RadiologyInsightsJob,
};

/**
 *
 * Display the limited order disrepancy inference of the Radiology Insights request.
 *
 */

function findLimitedOrderDiscrep(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach((inference: any) => {
          if (inference.kind === "limitedOrderDiscrepancy") {
            console.log("Limited Order Discrepancy Inference found: ");
            if ("orderType" in inference) {
              console.log("   Ordertype: ");
              displayCodes(inference.orderType);
            }

            inference.presentBodyParts?.forEach((bodyparts: any) => {
              console.log("   Present Body Parts: ");
              displayCodes(bodyparts);
            });

            inference.presentBodyPartMeasurements?.forEach((bodymeasure: any) => {
              console.log("   Present Body Part Measurements: ");
              displayCodes(bodymeasure);
            });
          }
        });
      }
    });
  }

  function displayCodes(codableConcept: any[]) {
    (codableConcept as { coding?: any[] }).coding?.forEach((coding) => {
      if ("code" in coding && "display" in coding && "system" in coding) {
        console.log(
          "      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")",
        );
      }
    });
  }
}

describe("Limited Order Discrepancy Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("limited order discrepancy inference test", async function () {
    const dateString = Date.now();
    const jobID = "jobId-" + dateString;
    const result = await client.path("/radiology-insights/jobs/{id}", jobID).put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findLimitedOrderDiscrep(res);
  });
});
