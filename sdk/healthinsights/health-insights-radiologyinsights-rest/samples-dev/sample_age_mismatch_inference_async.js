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
  var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
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
 * Displays the age mismatch of the Radiology Insights request.
 */
var core_auth_1 = require("@azure/core-auth");
var health_insights_radiologyinsights_1 = require("@azure-rest/health-insights-radiologyinsights");
var dotenv = require("dotenv");
dotenv.config();
// You will need to set this environment variables or edit the following values
var apiKey = process.env["HEALTH_INSIGHTS_KEY"] || "";
var endpoint = process.env["HEALTH_INSIGHTS_ENDPOINT"] || "";
/**
    * Print the age mismatch inference
 */
function printResults(radiologyInsightsResult, content) {
  if (radiologyInsightsResult.status === "succeeded") {
    var results = radiologyInsightsResult.result;
    if (results !== undefined) {
      results.patientResults.forEach(function (patientResult) {
        if (patientResult.inferences) {
          patientResult.inferences.forEach(function (inference) {
            if (inference.kind === "ageMismatch") {
              console.log("Age Mismatch Inference found: ");
              var evidence = findAgeEvidence(inference.extension, content);
              console.log("   Evidence: " + evidence);
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
  function findAgeEvidence(extensions, content) {
    var offset = -1;
    var length = -1;
    var piece = "";
    var evidence = "";
    // for loop needed for traversing from top to bottom of the array
    for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
      var first = extensions_1[_i];
      for (var _a = 0, _b = first.extension; _a < _b.length; _a++) {
        var ext = _b[_a];
        if (ext.url === "offset") {
          offset = ext.valueInteger;
        }
        else if (ext.url === "length") {
          length = ext.valueInteger;
        }
        if (offset > 0 && length > 0) {
          piece = content.substring(offset, offset + length);
        }
      }
      evidence += "".concat(piece, " ");
    }
    return evidence;
  }
}
// Create request body for radiology insights
function createRequestBody() {
  var codingData = {
    system: "Http://hl7.org/fhir/ValueSet/cpt-all",
    code: "USPELVIS",
    display: "US PELVIS COMPLETE"
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
    description: "US PELVIS COMPLETE"
  };
  var administrativeMetadata = {
    orderedProcedures: [orderedProceduresData],
    encounterId: "encounterid1"
  };
  var content = {
    sourceType: "inline",
    value: "CLINICAL HISTORY:   "
      + "\r\n20-year-old female presenting with abdominal pain. Surgical history significant for appendectomy."
      + "\r\n "
      + "\r\nCOMPARISON:   "
      + "\r\nRight upper quadrant sonographic performed 1 day prior."
      + "\r\n "
      + "\r\nTECHNIQUE:   "
      + "\r\nTransabdominal grayscale pelvic sonography with duplex color Doppler "
      + "\r\nand spectral waveform analysis of the ovaries."
      + "\r\n "
      + "\r\nFINDINGS:   "
      + "\r\nThe uterus is unremarkable given the transabdominal technique with "
      + "\r\nendometrial echo complex within physiologic normal limits. The "
      + "\r\novaries are symmetric in size, measuring 2.5 x 1.2 x 3.0 cm and the "
      + "\r\nleft measuring 2.8 x 1.5 x 1.9 cm.\n \r\nOn duplex imaging, Doppler signal is symmetric."
      + "\r\n "
      + "\r\nIMPRESSION:   "
      + "\r\n1. Normal pelvic sonography. Findings of testicular torsion."
      + "\r\n\nA new US pelvis within the next 6 months is recommended."
      + "\n\nThese results have been discussed with Dr. Jones at 3 PM on November 5 2020.\n "
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
    orderedProceduresAsCsv: "US PELVIS COMPLETE"
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
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return __awaiter(this, void 0, void 0, function () {
    var credential, client, radiologyInsightsParameter, dateString, jobID, initialResponse, poller, RadiologyInsightsResult, resultBody, content;
    return __generator(this, function (_j) {
      switch (_j.label) {
        case 0:
          credential = new core_auth_1.AzureKeyCredential(apiKey);
          client = (0, health_insights_radiologyinsights_1.default)(endpoint, credential);
          radiologyInsightsParameter = createRequestBody();
          dateString = Date.now();
          jobID = "jobId-" + dateString;
          return [4 /*yield*/, client.path("/radiology-insights/jobs/{id}", jobID).put(radiologyInsightsParameter)];
        case 1:
          initialResponse = _j.sent();
          if ((0, health_insights_radiologyinsights_1.isUnexpected)(initialResponse)) {
            throw initialResponse;
          }
          return [4 /*yield*/, (0, health_insights_radiologyinsights_1.getLongRunningPoller)(client, initialResponse)];
        case 2:
          poller = _j.sent();
          return [4 /*yield*/, poller.pollUntilDone()];
        case 3:
          RadiologyInsightsResult = _j.sent();
          if ((0, health_insights_radiologyinsights_1.isUnexpected)(RadiologyInsightsResult)) {
            throw RadiologyInsightsResult;
          }
          resultBody = RadiologyInsightsResult.body;
          content = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = radiologyInsightsParameter === null || radiologyInsightsParameter === void 0 ? void 0 : radiologyInsightsParameter.body) === null || _a === void 0 ? void 0 : _a.jobData) === null || _b === void 0 ? void 0 : _b.patients) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.patientDocuments) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '';
          printResults(resultBody, content);
          return [2 /*return*/];
      }
    });
  });
}
exports.main = main;
main().catch(function (err) {
  console.error("The age mismatch encountered an error:", err);
});
