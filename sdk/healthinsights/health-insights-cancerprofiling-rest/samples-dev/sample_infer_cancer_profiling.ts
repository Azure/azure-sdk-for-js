// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Infer key cancer attributes such as tumor site, histology, clinical stage TNM categories and pathologic stage TNM
 *  categories from a patient's unstructured clinical documents.
 *
 * @summary detects change points.
 */

import {AzureKeyCredential} from "@azure/core-auth";

import * as dotenv from "dotenv";
import CancerProfilingRestClient, {
    CreateJobParameters,
    getLongRunningPoller,
    isUnexpected,
    OncoPhenotypeData,
    OncoPhenotypeResultOutput
} from "../src";

dotenv.config();

// You will need to set this environment variables or edit the following values
const endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
const apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "";

// Print the inference results
function printResults(cancerProfilingResult: OncoPhenotypeResultOutput): void {
    if (cancerProfilingResult.status === "succeeded") {
        const results = cancerProfilingResult.results;
        if (results) {
            for (const patientResult of results.patients) {
                console.log(`Inferences of Patient ${patientResult.id}`);
                for (const { type, value, confidenceScore, evidence } of patientResult.inferences) {
                    console.log(`Clinical Type: ${String(type)} Value: ${value}, ConfidenceScore: ${confidenceScore}`);
                    for (const { patientDataEvidence } of evidence || []) {
                        if (patientDataEvidence) {
                            console.log(`Evidence: ${patientDataEvidence.id} ${patientDataEvidence.offset} ${patientDataEvidence.length} ${patientDataEvidence.text}`);
                        }
                    }
                }
            }
        }
    } else {
        const errors = cancerProfilingResult.errors;
        if (errors) {
          for (const error of errors) {
              console.log(error.code, ":", error.message);
          }
        }
    }
}

// Create request body for cancer profiling
function createRequestBody(): CreateJobParameters {
    // Define patient information and clinical documents
    const patientInfo = {
        sex: "FEMALE",
        birthDate: new Date("1979-10-08T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
    };

    const doc1 = "15.8.2021"
        "Jane Doe 091175-8967"
        "42 year old female, married with 3 children, works as a nurse. "
        "Healthy, no medications taken on a regular basis."
        "PMHx is significant for migraines with aura, uses Mirena for contraception."
        "Smoking history of 10 pack years (has stopped and relapsed several times)."
        "She is in c/o 2 weeks of productive cough and shortness of breath."
        "She has a fever of 37.8 and general weakness. "
        "Denies night sweats and rash. She denies symptoms of rhinosinusitis, asthma, and heartburn. "
        "On PE:"
        "GENERAL: mild pallor, no cyanosis. Regular breathing rate. "
        "LUNGS: decreased breath sounds on the base of the right lung. Vesicular breathing."
        " No crackles, rales, and wheezes. Resonant percussion. "
        "PLAN: "
        "Will be referred for a chest x-ray. "
        "======================================"
        "CXR showed mild nonspecific opacities in right lung base. "
        "PLAN:"
        "Findings are suggestive of a working diagnosis of pneumonia. The patient is referred to a "
        "follow-up CXR in 2 weeks. ";

    const docContent = {
        sourceType: "INLINE",
        value: doc1
    };

    const patientDoc1 = {
        type: "NOTE",
        id: "doc1",
        content: docContent,
        clinicalType: "IMAGING",
        language: "en",
        createdDateTime: new Date("2021-08-15T00:00:00.000Z")
    };

    // Define patientDoc2 and patientDoc3 similarly
    const doc2 = `Oncology Clinic 
       20.10.2021
       Jane Doe 091175-8967
       42-year-old healthy female who works as a nurse in the ER of this hospital. 
       First menstruation at 11 years old. First delivery- 27 years old. She has 3 children.
       Didn’t breastfeed. 
       Contraception- Mirena.
       Smoking- 10 pack years. 
       Mother- Belarusian. Father- Georgian. 
       About 3 months prior to admission, she stated she had SOB and was febrile. 
       She did a CXR as an outpatient which showed a finding in the base of the right lung- 
       possibly an infiltrate.
       She was treated with antibiotics with partial response. 
       6 weeks later a repeat CXR was performed- a few solid dense findings in the right lung. 
       Therefore, she was referred for a PET-CT which demonstrated increased uptake in the right 
       breast, lymph nodes on the right a few areas in the lungs and liver. 
       On biopsy from the lesion in the right breast- triple negative adenocarcinoma. Genetic 
       testing has not been done thus far. 
       Genetic counseling- the patient denies a family history of breast, ovary, uterus, 
       and prostate cancer. Her mother has chronic lymphocytic leukemia (CLL). 
       She is planned to undergo genetic tests because the aggressive course of the disease, 
       and her young age. 
       Impression:
       Stage 4 triple negative breast adenocarcinoma. 
       Could benefit from biological therapy. 
       Different treatment options were explained- the patient wants to get a second opinion.`;

    const docContent2 = {
        sourceType: "INLINE",
        value: doc2
    };

    const patientDoc2 = {
        type: "NOTE",
        id: "doc2",
        content: docContent2,
        clinicalType: "PATHOLOGY",
        language: "en",
        createdDateTime: new Date("2021-10-20T00:00:00.000Z")
    };

    const doc3 = `PATHOLOGY REPORT
                             Clinical Information
   Ultrasound-guided biopsy; A. 18 mm mass; most likely diagnosis based on imaging:  IDC
                                  Diagnosis
    A.  BREAST, LEFT AT 2:00 4 CM FN; ULTRASOUND-GUIDED NEEDLE CORE BIOPSIES:
    - Invasive carcinoma of no special type (invasive ductal carcinoma), grade 1
    Nottingham histologic grade:  1/3 (tubules 2; nuclear grade 2; mitotic rate 1; 
    total score; 5/9)
    Fragments involved by invasive carcinoma:  2
    Largest measurement of invasive carcinoma on a single fragment:  7 mm
    Ductal carcinoma in situ (DCIS):  Present
    Architectural pattern:  Cribriform
    Nuclear grade:  2-
                     -intermediate
    Necrosis:  Not identified
    Fragments involved by DCIS:  1
    Largest measurement of DCIS on a single fragment:  Span 2 mm
    Microcalcifications:  Present in benign breast tissue and invasive carcinoma
    Blocks with invasive carcinoma:  A1
    Special studies: Pending`;

    const docContent3 = {
        sourceType: "INLINE",
        value: doc3
    };

    const patientDoc3 = {
        type: "NOTE",
        id: "doc3",
        content: docContent3,
        clinicalType: "PATHOLOGY",
        language: "en",
        createdDateTime: new Date("2022-01-01T00:00:00.000Z")
    };

    const patient1 = {
        id: "patient_id",
        info: patientInfo,
        data: [patientDoc1, patientDoc2, patientDoc3]
    };

    const cancerProfilingData: OncoPhenotypeData = {
        patients: [patient1],
        configuration: {includeEvidence: true}
    };

    return {
        body: cancerProfilingData
    };

}
export async function main() {
    const credential = new AzureKeyCredential(apiKey);
    const client = CancerProfilingRestClient(endpoint, credential);
    // Create body request for cancer profiling
    const parameters = createRequestBody();
    // Initiate cancer profiling job and retrieve results
    const initialResponse = await client.path("/oncophenotype/jobs").post(parameters);
    if (isUnexpected(initialResponse)) {
        throw initialResponse;
    }
    const poller = await getLongRunningPoller(client, initialResponse);
    const cancerProfilingResult = await poller.pollUntilDone();
    if (isUnexpected(cancerProfilingResult)) {
        throw cancerProfilingResult;
    }
    const resultBody = cancerProfilingResult.body;
    printResults(resultBody);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});