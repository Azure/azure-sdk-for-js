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
        while (_) try {
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
exports.__esModule = true;
exports.main = void 0;
/**
 * This sample demonstrates how to analyze a conversation for issue resolution
 *
 * @summary Conversation Summarization
 */
var ai_language_conversations_1 = require("@azure/ai-language-conversations");
var core_auth_1 = require("@azure/core-auth");
var dotenv = require("dotenv");
dotenv.config();
//Get secrets
//You will have to set these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var service = new ai_language_conversations_1.ConversationAnalysisClient(clu_endpoint, new core_auth_1.AzureKeyCredential(clu_key));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var poller, actionResult, task_result, resolution_result, conversation_result, summaries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.beginConversationAnalysis({
                        "displayName": "Analyze conversations from xxx",
                        "analysisInput": {
                            "conversations": [
                                {
                                    "conversationItems": [
                                        {
                                            "text": "Hello, how can I help you?",
                                            "modality": "text",
                                            "id": "1",
                                            "participantId": "Agent"
                                        },
                                        {
                                            "text": "How to upgrade Office? I am getting error messages the whole day.",
                                            "modality": "text",
                                            "id": "2",
                                            "participantId": "Customer"
                                        },
                                        {
                                            "text": "Press the upgrade button please. Then sign in and follow the instructions.",
                                            "modality": "text",
                                            "id": "3",
                                            "participantId": "Agent"
                                        }
                                    ],
                                    "modality": "text",
                                    "id": "conversation1",
                                    "language": "en"
                                },
                            ]
                        },
                        "tasks": [
                            {
                                "taskName": "analyze 1",
                                "kind": "ConversationalSummarizationTask",
                                "parameters": {
                                    "summaryAspects": ["Issue, Resolution"]
                                }
                            }
                        ]
                    })];
                case 1:
                    poller = _a.sent();
                    return [4 /*yield*/, poller.pollUntilDone()];
                case 2:
                    actionResult = _a.sent();
                    task_result = actionResult.tasks.items[0];
                    console.log("... view task status ...");
                    console.log("status: %s", task_result.status);
                    resolution_result = task_result.results;
                    if (resolution_result.errors && resolution_result.errors.length != 0) {
                        console.log("... errors occured ...");
                        resolution_result.errors.forEach(function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        conversation_result = resolution_result.conversations[0];
                        if (conversation_result.warnings && conversation_result.warnings.length != 0) {
                            console.log("... view warnings ...");
                            conversation_result.warning.forEach(function (warning) {
                                console.log(warning);
                            });
                        }
                        else {
                            summaries = conversation_result.summaries;
                            console.log("... view task result ...");
                            console.log("issue: %s", summaries[0].text);
                            console.log("resolution: %s", summaries[1].text);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main()["catch"](function (err) {
    console.error("The sample encountered an error:", err);
});
