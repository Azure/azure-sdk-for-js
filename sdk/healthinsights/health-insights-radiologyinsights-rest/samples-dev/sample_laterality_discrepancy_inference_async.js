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
 * Displays the laterality discrepancy of the Radiology Insights request.
 */
var core_auth_1 = require("@azure/core-auth");
var dotenv = require("dotenv");
var src_1 = require("../src");
dotenv.config();
// You will need to set this environment variables or edit the following values
var apiKey = process.env["HEALTH_INSIGHTS_KEY"] || "";
var endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
/**
    * Print the laterality discrepancy recommendation inference
 */
function printResults(radiologyInsightsResult) {
    if (radiologyInsightsResult.status === "succeeded") {
        var results = radiologyInsightsResult.result;
        if (results !== undefined) {
            results.patientResults.forEach(function (patientResult) {
                patientResult.inferences.forEach(function (inference) {
                    if (inference.kind === "lateralityDiscrepancy") {
                        console.log("Laterality Discrepancy Inference found: ");
                        displayCodes(inference.lateralityIndication);
                    }
                });
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
                console.log("   Coding: " + coding.code + ", " + coding.display + " (" + coding.system + "), type: " + coding.type);
            }
        });
    }
}
// Create request body for radiology insights
function createRequestBody() {
    var codingData = {
        system: "Http://hl7.org/fhir/ValueSet/cpt-all",
        code: "26688-1",
        display: "US BREAST - LEFT LIMITED"
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
        description: "US BREAST - LEFT LIMITED"
    };
    var administrativeMetadata = {
        orderedProcedures: [orderedProceduresData],
        encounterId: "encounterid1"
    };
    var content = {
        sourceType: "inline",
        value: "Exam:   US LT BREAST TARGETED"
            + "\r\n\r\nTechnique:  Targeted imaging of the  right breast  is performed."
            + "\r\n\r\nFindings:\\r\\n\\r\\nTargeted imaging of the left breast is performed from the 6:00 to the 9:00 position.  "
            + "\r\n\r\nAt the 6:00 position, 5 cm from the nipple, there is a 3 x 2 x 4 mm minimally hypoechoic mass with a peripheral calcification. This may correspond to the mammographic finding. No other cystic or solid masses visualized."
            + "\r\n"
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
        orderedProceduresAsCsv: "US BREAST - LEFT LIMITED"
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
    console.error("The laterality discrepancy encountered an error:", err);
});
