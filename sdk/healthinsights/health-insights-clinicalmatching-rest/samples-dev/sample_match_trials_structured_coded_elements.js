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
 * Finding potential eligible trials for a patient, based on patient’s structured medical information.
 *
 * @summary detects change points.
 */
var core_auth_1 = require("@azure/core-auth");
// Load the .env file if it exists
var dotenv = require("dotenv");
var src_1 = require("../src");
dotenv.config();
// You will need to set this environment variables or edit the following values
var apiKey = process.env["HEALTH_INSIGHTS_API_KEY"] || "f8f24c0e49174c148b832052c5190834";
var endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "https://eastus.api.cognitive.microsoft.com";
function printResults(trialMatcherResult) {
    if (trialMatcherResult.status === "succeeded") {
        var results = trialMatcherResult.results;
        var patients = results.patients;
        for (var _i = 0, patients_1 = patients; _i < patients_1.length; _i++) {
            var patientResult = patients_1[_i];
            console.log("Inferences of Patient ".concat(patientResult.id));
            for (var _a = 0, _b = patientResult.inferences; _a < _b.length; _a++) {
                var tmInferences = _b[_a];
                console.log("Trial Id ".concat(tmInferences.id));
                console.log("Type: ".concat(String(tmInferences.type), "  Value: ").concat(tmInferences.value));
                console.log("Description ".concat(tmInferences.description));
            }
        }
    }
    else {
        var errors = trialMatcherResult.errors;
        if (errors) {
            for (var _c = 0, errors_1 = errors; _c < errors_1.length; _c++) {
                var error = errors_1[_c];
                console.log('${error.code} ":" ${error.message}');
            }
        }
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var credential, client, clinicalInfoList, patientInfo, patient1, geographicLocation, registryFilters, clinicalTrials, configuration, trialMatcherData, trialMatcherParameter, initialResponse, poller, trialMatcherResult, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = new core_auth_1.AzureKeyCredential(apiKey);
                    client = (0, src_1.default)(endpoint, credential);
                    clinicalInfoList = [
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
                            code: "METASTATIC",
                            name: "metastatic",
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
                    patientInfo = {
                        sex: "MALE",
                        birthDate: new Date(1965, 11, 26),
                        clinicalInfo: clinicalInfoList,
                    };
                    patient1 = {
                        id: "patient_id",
                        info: patientInfo,
                    };
                    geographicLocation = { countryOrRegion: "United States", city: "Gilbert", state: "Arizona" };
                    registryFilters = {
                        conditions: ["Non-small cell lung cancer"],
                        phases: ["PHASE1"],
                        sources: ["CLINICALTRIALS_GOV"],
                        facilityLocations: [geographicLocation],
                        studyTypes: ["INTERVENTIONAL"]
                    };
                    clinicalTrials = ({
                        registryFilters: [registryFilters]
                    });
                    configuration = {
                        clinicalTrials: clinicalTrials,
                    };
                    trialMatcherData = {
                        patients: [patient1],
                        configuration: configuration,
                    };
                    trialMatcherParameter = {
                        body: trialMatcherData
                    };
                    return [4 /*yield*/, client.path("/trialmatcher/jobs").post(trialMatcherParameter)];
                case 1:
                    initialResponse = _a.sent();
                    if ((0, src_1.isUnexpected)(initialResponse)) {
                        throw initialResponse;
                    }
                    console.log("********");
                    return [4 /*yield*/, (0, src_1.getLongRunningPoller)(client, initialResponse)];
                case 2:
                    poller = _a.sent();
                    console.log("********");
                    return [4 /*yield*/, poller.pollUntilDone()];
                case 3:
                    trialMatcherResult = _a.sent();
                    console.log("********");
                    if ((0, src_1.isUnexpected)(trialMatcherResult)) {
                        throw trialMatcherResult;
                    }
                    resultBody = trialMatcherResult.body;
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
