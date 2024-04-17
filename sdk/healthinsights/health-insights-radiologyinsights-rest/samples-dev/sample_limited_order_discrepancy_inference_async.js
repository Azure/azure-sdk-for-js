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
 * Displays the limited order discrepancy of the Radiology Insights request.
 */
var core_auth_1 = require("@azure/core-auth");
var dotenv = require("dotenv");
var src_1 = require("../src");
dotenv.config();
// You will need to set this environment variables or edit the following values
var apiKey = process.env["HEALTH_INSIGHTS_KEY"] || "";
var endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
/**
    * Print the limited order discrepancy inference
 */
function printResults(radiologyInsightsResult) {
    if (radiologyInsightsResult.status === "succeeded") {
        var results = radiologyInsightsResult.result;
        if (results !== undefined) {
            results.patientResults.forEach(function (patientResult) {
                if (patientResult.inferences) {
                    patientResult.inferences.forEach(function (inference) {
                        var _a, _b;
                        if (inference.kind === "limitedOrderDiscrepancy") {
                            console.log("Limited Order Discrepancy Inference found: ");
                            if ("orderType" in inference) {
                                console.log("   Ordertype: ");
                                displayCodes(inference.orderType);
                            }
                            ;
                            (_a = inference.presentBodyParts) === null || _a === void 0 ? void 0 : _a.forEach(function (bodyparts) {
                                console.log("   Present Body Parts: ");
                                displayCodes(bodyparts);
                            });
                            (_b = inference.presentBodyPartMeasurements) === null || _b === void 0 ? void 0 : _b.forEach(function (bodymeasure) {
                                console.log("   Present Body Part Measurements: ");
                                displayCodes(bodymeasure);
                            });
                        }
                    });
                }
            });
        }
    }
    else {
        var error = radiologyInsightsResult.error;
        if (error) {
            console.log(error.code, ":", error.message);
        }
    }
    function displayCodes(codableConcept) {
        var _a;
        (_a = codableConcept.coding) === null || _a === void 0 ? void 0 : _a.forEach(function (coding) {
            if ("code" in coding) {
                console.log("   Coding: " + coding.code + ", " + coding.display + " (" + coding.system + ")");
            }
        });
    }
}
// Create request body for radiology insights
function createRequestBody() {
    var codingData = {
        system: "Http://hl7.org/fhir/ValueSet/cpt-all",
        code: "30704-1",
        display: "US ABDOMEN LIMITED"
    };
    var code = {
        coding: [codingData]
    };
    var patientInfo = {
        sex: "female",
        birthDate: new Date("1959-11-11T19:00:00+00:00"),
    };
    var encounterData = {
        id: "encounterid1",
        period: {
            "start": "2021-8-28T00:00:00",
            "end": "2021-8-28T00:00:00"
        },
        class: "inpatient"
    };
    var authorData = {
        id: "authorid1",
        fullName: "authorname1",
    };
    var orderedProceduresData = {
        code: code,
        description: "US ABDOMEN LIMITED"
    };
    var administrativeMetadata = {
        orderedProcedures: [orderedProceduresData],
        encounterId: "encounterid1"
    };
    var content = {
        sourceType: "inline",
        value: "\\nHISTORY: 49-year-old male with a history of tuberous sclerosis presenting with epigastric pain and diffuse tenderness."
            + "\r\n The patient was found to have pericholecystic haziness on CT; evaluation for acute cholecystitis."
            + "\r\n TECHNIQUE: Ultrasound evaluation of the abdomen was performed. "
            + "\r\n Comparison is made to the prior abdominal ultrasound (2004) and to the enhanced CT of the abdomen and pelvis (2014)."
            + "\r\n FINDINGS:"
            + "\r\n The liver is elongated, measuring 19.3 cm craniocaudally, and is homogeneous in echotexture without evidence of focal mass lesion. "
            + "\r\n The liver contour is smooth on high resolution images."
            + "\r\n There is no appreciable intra- or extrahepatic biliary ductal dilatation, with the visualized extrahepatic bile duct measuring up to 6 mm."
            + "\r\n There are multiple shadowing gallstones, including within the gallbladder neck, which do not appear particularly mobile."
            + "\r\n In addition, there is thickening of the gallbladder wall up to approximately 7 mm with probable mild mural edema."
            + "\r\n There is no pericholecystic fluid. No sonographic Murphy's sign was elicited; however the patient reportedly received pain medications in the emergency department."
            + "\r\n The pancreatic head, body and visualized portions of the tail are unremarkable."
            + "\r\n The spleen is normal in size, measuring 9.9 cm in length."
            + "\r\n The kidneys are normal in size."
            + "\r\n The right kidney measures 11.5 x 5.2 x 4.3 cm and the left kidney measuring 11.8 x 5.3 x 5.1 cm."
            + "\r\n There are again multiple bilateral echogenic renal masses consistent with angiomyolipomas, in keeping with the patient's history of tuberous sclerosis."
            + "\r\n The largest echogenic mass on the right is located in the upper pole and measures 1.2 x 1.3 x 1.3 cm."
            + "\r\n The largest echogenic mass on the left is located within the renal sinus and measures approximately 2.6 x 2.7 x 4.6 cm."
            + "\r\n Additional indeterminate renal lesions are present bilaterally and are better characterized on CT."
            + "\r\n There is no hydronephrosis.\\n\\nNo ascites is identified within the upper abdomen."
            + "\r\n The visualized portions of the upper abdominal aorta and IVC are normal in caliber."
            + "\r\n IMPRESSION: "
            + "\r\n 1. Numerous gallstones associated with gallbladder wall thickening and probable gallbladder mural edema, highly suspicious for acute cholecystitis in this patient presenting with epigastric pain and pericholecystic hazy density identified on CT."
            + "\r\n Although no sonographic Murphy sign was elicited, evaluation is limited secondary to reported prior administration of pain medication."
            + "\r\n Thus, clinical correlation is required. No evidence of biliary ductal dilation."
            + "\r\n 2. There are again multiple bilateral echogenic renal masses consistent with angiomyolipomas, in keeping with the patient's history of tuberous sclerosis."
            + "\r\n Additional indeterminate renal lesions are present bilaterally and are better characterized on CT and MR."
            + "\r\n These findings were discussed with Dr. Doe at 5:05 p.m. on 1/1/15."
    };
    var patientDocumentData = {
        type: "note",
        clinicalType: "radiologyReport",
        id: "docid1",
        language: "en",
        authors: [authorData],
        specialtyType: "radiology",
        administrativeMetadata: administrativeMetadata,
        content: content,
        createdAt: new Date("2021-06-01T00:00:00.000"),
        orderedProceduresAsCsv: "US ABDOMEN LIMITED"
    };
    var patientData = {
        id: "Samantha Jones",
        details: patientInfo,
        encounters: [encounterData],
        patientDocuments: [patientDocumentData]
    };
    var inferenceTypes = [
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
        "radiologyProcedure"
    ];
    var followupRecommendationOptions = {
        includeRecommendationsWithNoSpecifiedModality: true,
        includeRecommendationsInReferences: true,
        provideFocusedSentenceEvidence: true
    };
    var findingOptions = {
        provideFocusedSentenceEvidence: true
    };
    var inferenceOptions = {
        followupRecommendationOptions: followupRecommendationOptions,
        findingOptions: findingOptions
    };
    // Create RI Configuration
    var configuration = {
        inferenceOptions: inferenceOptions,
        inferenceTypes: inferenceTypes,
        locale: "en-US",
        verbose: false,
        includeEvidence: true
    };
    // create RI Data
    var RadiologyInsightsJob = {
        jobData: {
            patients: [patientData],
            configuration: configuration,
        }
    };
    return {
        body: RadiologyInsightsJob,
    };
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var credential, client, radiologyInsightsParameter, dateString, jobID, initialResponse, poller, RadiologyInsightsResult, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = new core_auth_1.AzureKeyCredential(apiKey);
                    client = (0, src_1.default)(endpoint, credential);
                    radiologyInsightsParameter = createRequestBody();
                    dateString = Date.now();
                    jobID = "jobId-" + dateString;
                    return [4 /*yield*/, client.path("/radiology-insights/jobs/{id}", jobID).put(radiologyInsightsParameter)];
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
                    RadiologyInsightsResult = _a.sent();
                    if ((0, src_1.isUnexpected)(RadiologyInsightsResult)) {
                        throw RadiologyInsightsResult;
                    }
                    resultBody = RadiologyInsightsResult.body;
                    printResults(resultBody);
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main().catch(function (err) {
    console.error("The limited order encountered an error:", err);
});
