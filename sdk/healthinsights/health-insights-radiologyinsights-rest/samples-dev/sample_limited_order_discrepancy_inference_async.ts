// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Displays the limited order discrepancy of the Radiology Insights request.
 */
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";
import type { CreateJobParameters, RadiologyInsightsJobOutput } from "../src/index.js";
import AzureHealthInsightsClient, {
  ClinicalDocumentTypeEnum,
  getLongRunningPoller,
  isUnexpected,
} from "../src/index.js";

// You will need to set this environment variables or edit the following values

const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";

/**
 * Print the limited order discrepancy inference
 */

function printResults(radiologyInsightsResult: RadiologyInsightsJobOutput): void {
  if (radiologyInsightsResult.status === "succeeded") {
    const results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach((patientResult: { inferences: any[] }) => {
        if (patientResult.inferences) {
          patientResult.inferences.forEach((inference) => {
            if (inference.kind === "limitedOrderDiscrepancy") {
              console.log("Limited Order Discrepancy Inference found: ");
              if ("orderType" in inference) {
                console.log(" Ordertype: ");
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
  } else {
    const error = radiologyInsightsResult.error;
    if (error) {
      console.log(error.code, ":", error.message);
    }
  }

  function displayCodes(codeableConcept: any): void {
    codeableConcept.coding?.forEach((coding: any) => {
      if ("code" in coding) {
        console.log(
          "      Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")",
        );
      }
    });
  }
}

// Create request body for radiology insights
function createRequestBody(): CreateJobParameters {
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
    value: `HISTORY: 
    49-year-old male with a history of tuberous sclerosis presenting with epigastric pain and diffuse tenderness."
    The patient was found to have pericholecystic haziness on CT; evaluation for acute cholecystitis."
    
    TECHNIQUE: Ultrasound evaluation of the abdomen was performed. 
    Comparison is made to the prior abdominal ultrasound (2004) and to the enhanced CT of the abdomen and pelvis (2014)."
    
    FINDINGS:"
    The liver is elongated, measuring 19.3 cm craniocaudally, and is homogeneous in echotexture without evidence of focal mass lesion. 
    The liver contour is smooth on high resolution images."
    There is no appreciable intra- or extrahepatic biliary ductal dilatation, with the visualized extrahepatic bile duct measuring up to 6 mm."
    There are multiple shadowing gallstones, including within the gallbladder neck, which do not appear particularly mobile."
    In addition, there is thickening of the gallbladder wall up to approximately 7 mm with probable mild mural edema."
    There is no pericholecystic fluid. No sonographic Murphy's sign was elicited; however the patient reportedly received pain medications in the emergency department."
    The pancreatic head, body and visualized portions of the tail are unremarkable."
    The spleen is normal in size, measuring 9.9 cm in length."
    The kidneys are normal in size."
    The right kidney measures 11.5 x 5.2 x 4.3 cm and the left kidney measuring 11.8 x 5.3 x 5.1 cm."
    There are again multiple bilateral echogenic renal masses consistent with angiomyolipomas, in keeping with the patient's history of tuberous sclerosis."
    The largest echogenic mass on the right is located in the upper pole and measures 1.2 x 1.3 x 1.3 cm."
    The largest echogenic mass on the left is located within the renal sinus and measures approximately 2.6 x 2.7 x 4.6 cm."
    Additional indeterminate renal lesions are present bilaterally and are better characterized on CT."
    There is no hydronephrosis.\\n\\nNo ascites is identified within the upper abdomen."
    The visualized portions of the upper abdominal aorta and IVC are normal in caliber."
    
    IMPRESSION: "
    1. Numerous gallstones associated with gallbladder wall thickening and probable gallbladder mural edema, highly suspicious for acute cholecystitis in this patient presenting with epigastric pain and pericholecystic hazy density identified on CT."
    Although no sonographic Murphy sign was elicited, evaluation is limited secondary to reported prior administration of pain medication."
    Thus, clinical correlation is required. No evidence of biliary ductal dilation."
    2. There are again multiple bilateral echogenic renal masses consistent with angiomyolipomas, in keeping with the patient's history of tuberous sclerosis."
    Additional indeterminate renal lesions are present bilaterally and are better characterized on CT and MR."
    These findings were discussed with Dr. Doe at 5:05 p.m. on 1/1/15."`,
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
  console.error("The limited order encountered an error:", err);
});
