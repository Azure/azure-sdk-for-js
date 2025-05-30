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
exports.testPollerOptions = void 0;
exports.createRecorder = createRecorder;
exports.createRecordedClient = createRecordedClient;
exports.createMockToken = createMockToken;
var dotenv = require("dotenv");
var test_recorder_1 = require("@azure-tools/test-recorder");
var index_js_1 = require("../../src/index.js");
// import { isNode } from "@azure-tools/test-utils";
var core_util_1 = require("@azure/core-util");
var msUserAgentPolicy_js_1 = require("./msUserAgentPolicy.js");
if (core_util_1.isNodeLike) {
    dotenv.config();
}
var envSetupForPlayback = {
    COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    COMMUNICATION_ENDPOINT: "https://endpoint/",
    AZURE_CLIENT_ID: "SomeClientId",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "SomeTenantId",
    AZURE_PHONE_NUMBER: "+14155550100",
    AZURE_USERAGENT_OVERRIDE: "fake-useragent",
};
var sanitizerOptions = {
    connectionStringSanitizers: [
        {
            actualConnString: test_recorder_1.env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING,
            fakeConnString: envSetupForPlayback["COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING"],
        },
    ],
    generalSanitizers: [
        { regex: true, target: "\"access_token\"\\s?:\\s?\"[^\"]*\"", value: "\"access_token\":\"sanitized\"" },
        {
            regex: true,
            target: "(https://)([^/'\",}]*)",
            value: "$1endpoint",
        },
        {
            regex: true,
            target: "[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}",
            value: "a551dbcf-30a8-440c-9fb0-6baafbc411e8",
        },
    ],
};
var recorderOptions = {
    envSetupForPlayback: envSetupForPlayback,
    sanitizerOptions: sanitizerOptions,
    removeCentralSanitizers: [
        "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
        "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    ],
};
function createRecorder(context) {
    return __awaiter(this, void 0, void 0, function () {
        var recorder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recorder = new test_recorder_1.Recorder(context);
                    return [4 /*yield*/, recorder.start(recorderOptions)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, recorder.setMatcher("CustomDefaultMatcher", {
                            excludedHeaders: [
                                "Accept-Language", // This is env-dependent
                                "x-ms-content-sha256", // This is dependent on the current datetime
                            ],
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, recorder];
            }
        });
    });
}
function createRecordedClient(context) {
    return __awaiter(this, void 0, void 0, function () {
        var recorder, client;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createRecorder(context.currentTest)];
                case 1:
                    recorder = _b.sent();
                    client = new index_js_1.TenDlcClient((_a = test_recorder_1.env.COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING) !== null && _a !== void 0 ? _a : "", recorder.configureClientOptions({
                        additionalPolicies: [
                            {
                                policy: (0, msUserAgentPolicy_js_1.createMSUserAgentPolicy)(),
                                position: "perCall",
                            },
                        ],
                    }));
                    // casting is a workaround to enable min-max testing
                    return [2 /*return*/, { client: client, recorder: recorder }];
            }
        });
    });
}
function createMockToken() {
    var _this = this;
    return {
        getToken: function (_scopes) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { token: "testToken", expiresOnTimestamp: 11111 }];
            });
        }); },
    };
}
exports.testPollerOptions = {
    pollInterval: (0, test_recorder_1.isPlaybackMode)() ? 0 : undefined,
};
