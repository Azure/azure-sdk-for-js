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
 * This sample demonstrates how to analyze a conversation for PII (personally identifiable information).
 *
 * @summary PII conversational analysis
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
        var poller, actionResult, task_result, conv_pii_result, conversation_result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.beginConversationAnalysis({
                        "displayName": "Analyze PII in conversation",
                        "analysisInput": {
                            "conversations": [
                                {
                                    "conversationItems": [
                                        {
                                            "id": "1",
                                            "participantId": "0",
                                            "modality": "transcript",
                                            "text": "It is john doe.",
                                            "lexical": "It is john doe",
                                            "itn": "It is john doe",
                                            "maskedItn": "It is john doe"
                                        },
                                        {
                                            "id": "2",
                                            "participantId": "1",
                                            "modality": "transcript",
                                            "text": "Yes, 633-27-8199 is my phone",
                                            "lexical": "yes six three three two seven eight one nine nine is my phone",
                                            "itn": "yes 633278199 is my phone",
                                            "maskedItn": "yes 633278199 is my phone"
                                        },
                                        {
                                            "id": "3",
                                            "participantId": "1",
                                            "modality": "transcript",
                                            "text": "j.doe@yahoo.com is my email",
                                            "lexical": "j dot doe at yahoo dot com is my email",
                                            "maskedItn": "j.doe@yahoo.com is my email",
                                            "itn": "j.doe@yahoo.com is my email"
                                        }
                                    ],
                                    "modality": "transcript",
                                    "id": "1",
                                    "language": "en"
                                }
                            ]
                        },
                        "tasks": [
                            {
                                "kind": "ConversationalPIITask",
                                "parameters": {
                                    "redactionSource": "lexical",
                                    "piiCategories": [
                                        "all"
                                    ]
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
                    console.log("status: ", task_result.status);
                    conv_pii_result = task_result.results;
                    if (conv_pii_result.errors && conv_pii_result.errors.length != 0) {
                        console.log("... errors occured ...");
                        conv_pii_result.errors.forEach(function (error) {
                            console.log(error);
                        });
                    }
                    else {
                        conversation_result = conv_pii_result.conversations[0];
                        if (conversation_result.warnings && conversation_result.warnings.length != 0) {
                            console.log("... view warnings ...");
                            conversation_result.warning.forEach(function (warning) {
                                console.log(warning);
                            });
                        }
                        else {
                            console.log("... view task result ...");
                            conversation_result.conversationItems.forEach(function (conversation) {
                                console.log("conversation id: ", conversation.id);
                                console.log("... entities ...");
                                conversation.entities.forEach(function (entity) {
                                    console.log("text: ", entity.text);
                                    console.log("category: ", entity.category);
                                    console.log("confidence: ", entity.confidenceScore);
                                    console.log("offset: ", entity.offset);
                                    console.log("length: ", entity.length);
                                });
                            });
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
