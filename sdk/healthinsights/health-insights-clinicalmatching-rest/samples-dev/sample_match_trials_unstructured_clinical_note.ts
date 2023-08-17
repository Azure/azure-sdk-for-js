// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Finding potential eligible trials for a patient, provided as unstructured clinical note, and
    understanding Trial Matcher inferences.
 *
 * @summary detects change points.
 */

import * as dotenv from "dotenv";
import ClinicalMatchingRestClient, {
    CreateJobParameters,
    getLongRunningPoller,
    isUnexpected,
    TrialMatcherResultOutput
} from "../src";
import {AzureKeyCredential} from "@azure/core-auth";

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

function getPatientDocContent(): string {
    let content = "TITLE:  Cardiology Consult\r\n                       DIVISION OF CARDIOLOGY\r\n                   "
                  " COMPREHENSIVE CONSULTATION NOTE\r\nCHIEF "
                  "COMPLAINT: Patient is seen in consultation today at the\r\nrequest of Dr. [**Last Name (STitle) "
                  "13959**]. We are asked to give consultative advice\r\nregarding evaluation and management of Acute "
                  "CHF.\r\nHISTORY OF PRESENT ILLNESS:\r\n71 year old man with CAD w/ diastolic dysfunction, CKD, "
                  "Renal\r\nCell CA s/p left nephrectomy, CLL, known lung masses and recent\r\nbrochial artery bleed, "
                  "s/p embolization of LLL bronchial artery\r\n[**1-17**], readmitted with hemoptysis on ["
                  "**2120-2-3**] from [**Hospital 328**] [**Hospital 9250**]\r\ntransferred from BMT floor  following "
                  "second episode of hypoxic\r\nrespiratory failure, HTN and tachycardia in 3 days. Per report,"
                  "\r\non the evening of transfer to the [**Hospital Unit Name 1**], patient continued to\r\nremain "
                  "tachypnic in upper 30s and was receiving IVF NS at\r\n100cc/hr for concern of hypovolemic "
                  "hypernatremia. He also had\r\nreceived 1unit PRBCs with temp rise for 98.3 to 100.4, "
                  "he was\r\ncultured at that time, and transfusion rxn work up was initiated.\r\nAt around 5:30am, "
                  "he was found to be newly hypertensive with SBP\r\n>200 with a regular tachycardia to 160 with new "
                  "hypoxia requiring\r\nshovel mask. He received 1mg IV ativan, 1mg morphine, lasix 40mg\r\nIV x1, "
                  "and lopressor 5mg IV. ABG 7.20/63/61 on shovel mask. He\r\nwas transferred to the ICU for further "
                  "care. On arrival to the\r\n[**Hospital Unit Name 1**], he received 5mg IV Dilt and was found to be "
                  "febrile to\r\n101.3. Blood and urine cultures were draw. He was placed on BIPAP\r\n12/5 with "
                  "improvement in his respiratory rate and sats. Repeat\r\nABG 7.43/34/130.\r\nOvernight, "
                  "he continued to be tachycardic, with stable O2 sats.\r\nHe was treated for agitation with haldol, "
                  "as well as IV beta\r\nblockers, with some improvement in his heart rate to the 80s at\r\nrest.  He "
                  "has and continues to deny symptoms of chest pain.  When\r\nassessed, he grunted responses to "
                  "questions, and was non-verbal.\r\nOn cardiac review of symptoms, no chest pain or other "
                  "discomfort.\r\nFurther questions limited by mental status.\r\nPAST MEDICAL HISTORY:\r\nCLL x 20 "
                  "yrs\r\n-s/p fludarabine and Cytoxan ([**7-14**]) with good response\r\n-auto-immune hemolytic "
                  "anemia on chronic steroids\r\n-mediastinal lymphadenopathy\r\n-h/o bilat pleural effusions with + "
                  "cytology ([**6-13**])\r\nRCC s/p Left nephrectomy [**2106**]\r\nCKD: prior baseline CR 1.5, "
                  "most recently 1.1-1.2\r\nBPH vs Prostate cancer\r\n- h/o multiple prostate biopsies with only 1 "
                  "c/w adenocarcinoma\r\n([**Doctor Last Name 2470**] 3+3)\r\nGERD\r\nType II DM: -recently started "
                  "insulin\r\nR-sided Exotropia\r\nGallstone pancreatitis [**12-10**]; s/p lap "
                  "chole\r\nHyperlipidemia\r\nCAD s/p cath [**4-13**] with diffuse 2 vessel dz\r\n- 70% RCA/PDA, "
                  "60%prox/mid LAD)\r\nHypogammaglobumenia, recurrent URI/PNA, on IVIG X 2years, good\r\nresponse ("
                  "last dose [**2118-11-11**])\r\nAllergic rhinitis\r\nGilberts disease\r\nHypotesteronemia\r\nR "
                  "humeral fracture ([**12-16**])\r\nEnlarged spleen secondary to CLL vs portal "
                  "hypertension.\r\nCardiac Risk Factors include diabetes, dyslipidemia,\r\nhypertension, and family "
                  "history of CAD.\r\nHOME MEDICATIONS:\r\nAlbuterol 90 mcg 2 puffs PRN\r\nAllopurinol 100mg PO "
                  "Daily\r\nFolic Acid 2mg PO Daily\r\nInsulin Lispro Protam & Lispro As Directed\r\nMetoprolol "
                  "Succinate 25mg PO BID\r\nNitroglycerin [NitroQuick] 0.3mg SL PRN\r\nPrednisone 2mg PO "
                  "daily\r\nRosuvastatin 5mg PO daily\r\nDocusate Sodium [Colace] 100mg PO BID\r\nSenna 8.6 PO BID "
                  "PRN\r\nCURRENT MEDICATIONS:\r\nAluminum-Magnesium Hydrox.-Simethicone 15-30 mL PO/NG "
                  "QID:PRN\r\ndyspepsia\r\nAllopurinol 100 mg PO/NG DAILY\r\nAlbuterol 0.083% Neb Soln 1 NEB IH "
                  "Q6H:PRN\r\nBisacodyl 10 mg PO/PR DAILY:PRN constipation\r\nCaphosol 30 mL ORAL QID:PRN dry "
                  "mouth\r\nDextrose 50% 12.5 gm IV PRN hypoglycemia\r\nDocusate Sodium 100 mg PO BID\r\nFamotidine "
                  "20 mg IV Q24H\r\nGlucagon 1 mg IM Q15MIN:PRN\r\nGuaifenesin-Dextromethorphan 10 mL PO/NG Q6H:PRN "
                  "cough\r\nInsulin SC SS\r\nIpratropium Bromide Neb 1 NEB IH Q6H:PRN\r\nMagnesium Sulfate "
                  "Replacement (Oncology) IV Sliding Scale\r\nMetoprolol Tartrate 5 mg IV "
                  "Q6H\r\nPiperacillin-Tazobactam 2.25 g IV Q6H\r\nPotassium Chloride Replacement (Oncology) IV "
                  "Sliding\r\nHydrocortisone Na Succ. 20 mg IV Q24H\r\nSenna 1 TAB PO/NG [**Hospital1 7**]:PRN "
                  "constipation\r\nVancomycin 1000 mg IV\r\nMetoprolol Tartrate 10 mg IV Q6H\r\nDiltiazem 5 mg IV "
                  "ONCE\r\nMetoprolol Tartrate 5 mg IV ONCE\r\nFurosemide 40 mg IV "
                  "ONCE\r\nALLERGIES:\r\nNKDA\r\nSOCIAL HISTORY:\r\nMarried, lives with wife [**Name (NI) **] in ["
                  "**Location (un) 12995**]. Has long history\r\nof CLL since [**2096**]. Is a rabbi working in "
                  "academics with 30 year\r\nhistory prior to that of congregation work in [**State 1698**]. "
                  "They\r\nhave two adult children in [**Location (un) 3063**] and LA and three\r\ngrandchildren. "
                  "Life-time nonsmoker, rare EtOH, no illicit drug\r\nuse.\r\nFAMILY HISTORY:\r\nFather w/ [**Name2 ("
                  "NI) 118**] cancer and coronary artery disease. Multiple\r\nrelatives with DM.\r\nREVIEW OF "
                  "SYSTEMS:  ALL OTHER SYSTEMS NEGATIVE EXCEPT AS NOTED\r\nABOVE\r\nPHYSICAL EXAMINATION\r\nVitals: "
                  "T: 97.8 degrees Farenheit (max 101.3), BP: 128/73  mmHg\r\nsupine, HR 97 bpm, RR 35 bpm, "
                  "O2: 94 % on 0.4 aerosol mask.\r\nCONSTITUTIONAL: No acute distress.\r\nEYES: No conjunctival "
                  "pallor. No icterus.\r\nENT/Mouth: MMM. OP clear.\r\nTHYROID: No thyromegaly or thyroid "
                  "nodules.\r\nCV: Nondisplaced PMI. Tachycardic. Regular rhythm. nl S1, S2. No\r\nextra heart "
                  "sounds. No appreciable murmurs. No JVD. Normal\r\ncarotid upstroke without bruits.\r\nLUNGS: "
                  "Breath sounds bilaterally. No crackles, wheezes or rhonchi\r\nappreciated.\r\nGI: NABS. Soft, NT, "
                  "ND.  No HSM. No abdominal bruits.\r\nMUSCULO: Supple neck. Normal muscle tone. Full strength "
                  "grossly.\r\nHEME/LYMPH: No palpable LAD. No peripheral edema.  Full distal\r\npulses "
                  "bilaterally.\r\nSKIN: Warm extremities. No rashes/lesions, ecchymoses.\r\nNEURO: Limited responses "
                  "to questions.  [**Name8 (MD) 54**] RN, the patient tends\r\nto wax and wane throughout the day; at "
                  "times answering questions\r\nand conversing, at other times being more confused. Other "
                  "exam\r\ngrossly normal without any significant focal deficits\r\nPSYCH: Mood and affect were "
                  "appropriate.\r\nTELEMETRY: Sinus tachycardia at 101.  Runs of sinus tachycardia\r\nto 120s, "
                  "with brief episodes of atrial tach vs AF.\r\nECG ([**2120-2-15**]):  Sinus tach @ 124.  Normal "
                  "Axis/intervals.\r\nDiffuse nonspecific TW flattening with inferolateral T wave\r\ninversions, "
                  "not appreciably worse, and probably better than\r\nprior.  No ECG tracing available more proximal "
                  "to this admission\r\nto ICU.\r\nTRANSTHORACIC ECHOCARDIOGRAM ([**2120-1-15**]):\r\nThe left atrium "
                  "is elongated. No atrial septal defect is seen by\r\n2D or color Doppler. Left ventricular wall "
                  "thicknesses and cavity\r\nsize are normal. There is probably mild regional left "
                  "ventricular\r\nsystolic dysfunction with distal lateral/apical lateral\r\nhypokinesis . There is "
                  "no ventricular septal defect. Right\r\nventricular chamber size and free wall motion are normal. "
                  "The\r\naortic root is mildly dilated at the sinus level. The aortic\r\nvalve leaflets (3) are "
                  "mildly thickened but aortic stenosis is\r\nnot present. No aortic regurgitation is seen. The "
                  "mitral valve\r\nleaflets are mildly thickened. There is no mitral valve prolapse.\r\nTrivial "
                  "mitral regurgitation is seen. The estimated pulmonary\r\nartery systolic pressure is normal. There "
                  "is no pericardial\r\neffusion. Compared with the prior study (images reviewed) of\r\n["
                  "**2119-1-11**], mild regional LV systolic dysfunction is new.\r\nETT ([**2114-11-13**]):\r\nThe "
                  "patient\r\nexercised for 9.5 minutes of [**Initials (NamePattern4) **] [**Last Name (NamePattern4) "
                  "84**] protocol and was stopped at\r\nrequest for fatigue. This represents an average "
                  "functional\r\ncapacity.\r\nThere were no chest, neck, back, or arm discomforts reported "
                  "by\r\npatient throughout the procedure. There were no significant ST\r\nsegment\r\nchanges at peak "
                  "exercise or during recovery. The rhythm was sinus\r\nwith\r\nrare APBs and VPBs. The hemodynamic "
                  "response to exercise was\r\nappropriate.\r\nIMPRESSION: No anginal symptoms or ischemic EKG "
                  "changes at the\r\nachieved\r\nworkload. Nuclear report sent separately. Compared to ETT "
                  "report\r\n[**2113-11-29**], there are now no EKG changes noted and the "
                  "exercise\r\ntolerance\r\nhas increased by one minute.\r\nMIBI: 1) Again noted is mild, reversible "
                  "basilar inferior wall\r\nperfusion\r\ndefect in the face of soft tissue attenuation from the "
                  "diaphragm.\r\n2) Normal\r\nleft ventricular cavity size and function.\r\nCath: [**4-13**]:\r\n1.  "
                  "Coronary angiography in this right-dominant system revealed:\r\n--the LMCA had no angiographically "
                  "apparent disease.\r\n--the LAD had diffuse proximal-mid 60% stenosis\r\n--the LCX had minimal "
                  "disease\r\n--the RCA was a small vessel with a distal 70% lesion going into\r\nthe RPDA\r\n2.  "
                  "Limited resting hemodynamics revealed elevated left-sided\r\nfilling pressures, with LVEDP 18 "
                  "mmHg.  There was high-normal\r\nsystemic arterial systolic pressures, with SBP 134 mmHg.  "
                  "There\r\nwas no significant gradient upon pullback of the angled pigtail\r\ncatheter from LV to "
                  "ascending aorta.\r\nOTHER TESTING:\r\nCXR: Worsening fluid status versus prior. Followup needed to "
                  "see\r\nairspace processes track with CHF or are independent and in the\r\nlatter\r\nsituation "
                  "could represent pneumonia.\r\nLABORATORY DATA: Reviewed in OMR\r\nASSESSMENT AND PLAN:\r\n71 year "
                  "old man with complicated medical history including CAD w/\r\ndiastolic dysfunction, CKD, "
                  "Renal Cell CA s/p left nephrectomy,\r\nCLL, known lung masses and recent brochial artery bleed, "
                  "who has\r\nhad a complicated hospital course including s/p embolization of\r\nLLL bronchial artery "
                  "[**1-17**], readmitted with hemoptysis on [**2120-2-3**]\r\nfrom [**Hospital 328**] Rehab, "
                  "and is now transferred from BMT floor for a\r\nsecond episode of hypoxic respiratory failure, "
                  "HTN and\r\ntachycardia in 3 days.  Although details with regard to the\r\ninitiating event last "
                  "night are limited by difficulty with\r\nobtaining a history, review of his relevant data indicates "
                  "that\r\nventilatory failure as indicated by his elevated PCO2 appears to\r\nhave played a "
                  "significant role.  He clearly has a history of\r\nobstructive coronary artery disease, and likely "
                  "had some element\r\nof diastolic dysfunction in the setting of his "
                  "acute\r\ntachycardia/hypoxia/hypertensive episode yesterday, although\r\nthere is no obvious "
                  "indication that his CAD was a primary cause\r\nof these events based on the history (an ECG from "
                  "the peri-event\r\nwould be helpful, but non-specific).  According to his RN, he has\r\nnot had "
                  "excess secretions today, although he has a new fever and\r\nWBC, which indicates that he could "
                  "have had some mucous plugging\r\nin the setting of a new PNA, which is currently being "
                  "treated\r\nwith antibiotics.  Otherwise, would not diurese him any further\r\nas he looks quite "
                  "dry by exam and labs.  Would try gentle\r\nhydration, and monitor his volume status closely.  I'm "
                  "not sure\r\nthat a TTE will shed a whole lot more light on the current\r\nsituation, but it will "
                  "at least assess any myocardial damage he\r\nmight have sustained.\r\nRecs:\r\n--Continue beta "
                  "blocker as you are\r\n--Hold diuretics, start gentle IV hydration, close monitor "
                  "of\r\nhemodynamics\r\n--Obtain an ECG, monitor for any new changes\r\n--Consider pulmonary causes "
                  "(decreased alveolar ventilation) for hypoxia\r\nThe Assessment and Plan will be reviewed with Dr. "
                  "[**Last Name (STitle) 5550**] in\r\nmulti- disciplinary rounds.  Please see his/her note in "
                  "the\r\n[**Hospital 7382**] medical record for further comments and\r\nrecommendations.  Thank you "
                  "for allowing us to participate in the\r\ncare of this patient. Please feel free to contact us with "
                  "any\r\nquestions or concerns.\r\n";
    return content;
}

// Create request body for clinical matching
function createRequestBody(): CreateJobParameters {
    const docContent = {sourceType: "INLINE", value: getPatientDocContent()};
  const patientDataList = {
      type: "NOTE",
      id: "12-consult_15",
      content: docContent
  };
  const patientInfo = {
    sex: "MALE",
    birthDate: new Date("1965-11-26T00:00:00.000Z"), // Note: Months are zero-based (11 represents December)
  };

  const patient1 = {
    id: "patient_id",
    info: patientInfo,
    data: [patientDataList]
  };

  const geographicLocation = { countryOrRegion: "United States", city: "Gilbert", state: "Arizona" };
  const registryFilters = {
    conditions: ["non small cell lung cancer (nsclc)"],
    sources: ["CLINICALTRIALS_GOV"],
    facilityLocations: [ geographicLocation ],
    recruitmentStatuses: ["RECRUITING"]
  };

  // Construct ClinicalTrial instance and attach the registry filter to it.
  const clinicalTrials = ({
    registryFilters: [registryFilters]
  });

  // Create TrialMatcherRequest
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
  const trialMatcherParameters = createRequestBody()
  // Initiate clinical matching job and retrieve results
  const initialResponse = await client.path("/trialmatcher/jobs").post(trialMatcherParameters);
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
