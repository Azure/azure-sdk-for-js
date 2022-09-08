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
 * This sample demonstrates how to analyze user query using an orchestration project.
 * In this sample, orchestration project's top intent will map to a Qna project.
 *
 * @summary Orchestration project with direct target
 */
var ai_language_conversations_1 = require("@azure/ai-language-conversations");
var core_auth_1 = require("@azure/core-auth");
var dotenv = require("dotenv");
dotenv.config();
//Get secrets
//You will have to set these environment variables for the sample to work
var clu_endpoint = process.env.AZURE_CONVERSATIONS_ENDPOINT;
var clu_key = process.env.AZURE_CONVERSATIONS_KEY;
var project_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_PROJECT_NAME;
var deployment_name = process.env.AZURE_CONVERSATIONS_WORKFLOW_DEPLOYMENT_NAME;
var service = new ai_language_conversations_1.ConversationAnalysisClient(clu_endpoint, new core_auth_1.AzureKeyCredential(clu_key));
var query = "How are you?";
var qna_app = "ChitChat-QnA";
var body = {
    "kind": "Conversation",
    "analysisInput": {
        "conversationItem": {
            "participantId": "1",
            "id": "1",
            "modality": "text",
            "language": "en",
            "text": query
        }
    },
    "parameters": {
        "projectName": project_name,
        "deploymentName": deployment_name,
        "isLoggingEnabled": false,
        "directTarget": qna_app,
        "targetProjectParameters": {
            "ChitChat-QnA": {
                "targetProjectKind": "QuestionAnswering",
                "callingOptions": {
                    "question": query
                }
            }
        }
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var actionResult, top_intent, top_intent_object, qna_response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.analyzeConversation(body)];
                case 1:
                    actionResult = _a.sent();
                    console.log("query: ", actionResult.result.query);
                    console.log("project kind: ", actionResult.result.prediction.projectKind);
                    top_intent = actionResult.result.prediction.topIntent;
                    console.log("\ntop intent: ", top_intent);
                    top_intent_object = actionResult.result.prediction.intents[top_intent];
                    console.log("confidence score: ", top_intent_object.confidence);
                    console.log("project kind: ", top_intent_object.targetProjectKind);
                    if (top_intent_object.targetProjectKind == "QuestionAnswering") {
                        console.log("\nqna response:");
                        qna_response = top_intent_object.result;
                        qna_response.answers.forEach(function (answer) {
                            console.log("\nanswer: ", answer.answer);
                            console.log("confidence score: ", answer.confidence);
                        });
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
