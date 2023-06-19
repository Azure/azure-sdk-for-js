"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
/**
 * Infer key cancer attributes such as tumor site, histology, clinical stage TNM categories and pathologic stage TNM
 *  categories from a patient's unstructured clinical documents.
 *
 * @summary detects change points.
 */
var core_auth_1 = require("@azure/core-auth");
// Load the .env file if it exists
var dotenv = require("dotenv");
var src_1 = require("../src");
dotenv.config();
// You will need to set this environment variables or edit the following values
var endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "https://eastus.api.cognitive.microsoft.com";
var apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "f8f24c0e49174c148b832052c5190834";
function printResults(cancerProfilingResult) {
    if (cancerProfilingResult.status === "succeeded") {
        var results = cancerProfilingResult.results;
        var patients = results.patients;
        for (var _i = 0, patients_1 = patients; _i < patients_1.length; _i++) {
            var patientResult = patients_1[_i];
            console.log("Inferences of Patient ".concat(patientResult.id));
            for (var _a = 0, _b = patientResult.inferences; _a < _b.length; _a++) {
                var inferences = _b[_a];
                console.log("Clinical Type: ".concat(String(inferences.type), " Value: ").concat(inferences.value, ", ConfidenceScore: ").concat(inferences.confidenceScore));
                for (var _c = 0, _d = inferences.evidence; _c < _d.length; _c++) {
                    var evidence = _d[_c];
                    var dataEvidence = evidence.patientDataEvidence;
                    console.log("Evidence: ".concat(dataEvidence.id, " ").concat(dataEvidence.offset, " ").concat(dataEvidence.length, " ").concat(dataEvidence.text));
                }
            }
        }
    }
    else {
        var errors = cancerProfilingResult.errors;
        if (errors) {
            for (var _e = 0, errors_1 = errors; _e < errors_1.length; _e++) {
                var error = errors_1[_e];
                console.log('${error.code} ":" ${error.message}');
            }
        }
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var credential, client, patientInfo, patient1, doc1, docContent, patientDoc1, doc2, docContent2, patientDoc2, doc3, docContent3, patientDoc3, patientDocList, configuration, cancerProfilingData, parameters, initialResponse, poller, cancerProfilingResult, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = new core_auth_1.AzureKeyCredential(apiKey);
                    client = (0, src_1.default)(endpoint, credential);
                    patientInfo = {
                        sex: "FEMALE",
                        birthDate: new Date(1979, 10, 8), // Note: Months are zero-based (11 represents December)
                    };
                    patient1 = {
                        id: "patient_id",
                        info: patientInfo,
                    };
                    doc1 = "15.8.2021";
                    "Jane Doe 091175-8967";
                    "42 year old female, married with 3 children, works as a nurse. ";
                    "Healthy, no medications taken on a regular basis.";
                    "PMHx is significant for migraines with aura, uses Mirena for contraception.";
                    "Smoking history of 10 pack years (has stopped and relapsed several times).";
                    "She is in c/o 2 weeks of productive cough and shortness of breath.";
                    "She has a fever of 37.8 and general weakness. ";
                    "Denies night sweats and rash. She denies symptoms of rhinosinusitis, asthma, and heartburn. ";
                    "On PE:";
                    "GENERAL: mild pallor, no cyanosis. Regular breathing rate. ";
                    "LUNGS: decreased breath sounds on the base of the right lung. Vesicular breathing.";
                    " No crackles, rales, and wheezes. Resonant percussion. ";
                    "PLAN: ";
                    "Will be referred for a chest x-ray. ";
                    "======================================";
                    "CXR showed mild nonspecific opacities in right lung base. ";
                    "PLAN:";
                    "Findings are suggestive of a working diagnosis of pneumonia. The patient is referred to a ";
                    "follow-up CXR in 2 weeks. ";
                    docContent = {
                        sourceType: "INLINE",
                        value: doc1
                    };
                    patientDoc1 = {
                        type: "NOTE",
                        id: "doc1",
                        content: docContent,
                        clinicalType: "IMAGING",
                        language: "en",
                        createdDateTime: new Date(2021, 8, 15)
                    };
                    doc2 = "Oncology Clinic ";
                    "20.10.2021";
                    "Jane Doe 091175-8967";
                    "42-year-old healthy female who works as a nurse in the ER of this hospital. ";
                    "First menstruation at 11 years old. First delivery- 27 years old. She has 3 children.";
                    "Didn’t breastfeed. ";
                    "Contraception- Mirena.";
                    "Smoking- 10 pack years. ";
                    "Mother- Belarusian. Father- Georgian. ";
                    "About 3 months prior to admission, she stated she had SOB and was febrile. ";
                    "She did a CXR as an outpatient which showed a finding in the base of the right lung- ";
                    "possibly an infiltrate.";
                    "She was treated with antibiotics with partial response. ";
                    "6 weeks later a repeat CXR was performed- a few solid dense findings in the right lung. ";
                    "Therefore, she was referred for a PET-CT which demonstrated increased uptake in the right ";
                    "breast, lymph nodes on the right a few areas in the lungs and liver. ";
                    "On biopsy from the lesion in the right breast- triple negative adenocarcinoma. Genetic ";
                    "testing has not been done thus far. ";
                    "Genetic counseling- the patient denies a family history of breast, ovary, uterus, ";
                    "and prostate cancer. Her mother has chronic lymphocytic leukemia (CLL). ";
                    "She is planned to undergo genetic tests because the aggressive course of the disease, ";
                    "and her young age. ";
                    "Impression:";
                    "Stage 4 triple negative breast adenocarcinoma. ";
                    "Could benefit from biological therapy. ";
                    "Different treatment options were explained- the patient wants to get a second opinion.";
                    docContent2 = {
                        sourceType: "INLINE",
                        value: doc2
                    };
                    patientDoc2 = {
                        type: "NOTE",
                        id: "doc2",
                        content: docContent2,
                        clinicalType: "PATHOLOGY",
                        language: "en",
                        createdDateTime: new Date(2021, 10, 20)
                    };
                    doc3 = "PATHOLOGY REPORT";
                    "                          Clinical Iדדnformation";
                    "Ultrasound-guided biopsy; A. 18 mm mass; most likely diagnosis based on imaging:  IDC";
                    "                               Diagnosis";
                    " A.  BREAST, LEFT AT 2:00 4 CM FN; ULTRASOUND-GUIDED NEEDLE CORE BIOPSIES:";
                    " - Invasive carcinoma of no special type (invasive ductal carcinoma), grade 1";
                    " Nottingham histologic grade:  1/3 (tubules 2; nuclear grade 2; mitotic rate 1; ";
                    " total score; 5/9)";
                    " Fragments involved by invasive carcinoma:  2";
                    " Largest measurement of invasive carcinoma on a single fragment:  7 mm";
                    " Ductal carcinoma in situ (DCIS):  Present";
                    " Architectural pattern:  Cribriform";
                    " Nuclear grade:  2-";
                    "                  -intermediate";
                    " Necrosis:  Not identified";
                    " Fragments involved by DCIS:  1";
                    " Largest measurement of DCIS on a single fragment:  Span 2 mm";
                    " Microcalcifications:  Present in benign breast tissue and invasive carcinoma";
                    " Blocks with invasive carcinoma:  A1";
                    " Special studies: Pending";
                    docContent3 = {
                        sourceType: "INLINE",
                        value: doc3
                    };
                    patientDoc3 = {
                        type: "NOTE",
                        id: "doc3",
                        content: docContent3,
                        clinicalType: "PATHOLOGY",
                        language: "en",
                        createdDateTime: new Date(2022, 1, 1)
                    };
                    patientDocList = [patientDoc1, patientDoc2, patientDoc3];
                    patient1.data = patientDocList;
                    configuration = { includeEvidence: true };
                    cancerProfilingData = {
                        patients: [patient1],
                        configuration: configuration
                    };
                    parameters = {
                        body: cancerProfilingData
                    };
                    return [4 /*yield*/, client.path("/oncophenotype/jobs").post(parameters)];
                case 1:
                    initialResponse = _a.sent();
                    if ((0, src_1.isUnexpected)(initialResponse)) {
                        throw initialResponse;
                    }
                    return [4 /*yield*/, (0, src_1.getLongRunningPoller)(client, initialResponse)];
                case 2:
                    poller = _a.sent();
                    return [4 /*yield*/, poller.pollUntilDone()];
                case 3:
                    cancerProfilingResult = _a.sent();
                    if ((0, src_1.isUnexpected)(cancerProfilingResult)) {
                        throw cancerProfilingResult;
                    }
                    resultBody = cancerProfilingResult.body;
                    printResults(resultBody);
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main().catch(function (err) {
    console.error("The sample encountered an error:", err);
});
