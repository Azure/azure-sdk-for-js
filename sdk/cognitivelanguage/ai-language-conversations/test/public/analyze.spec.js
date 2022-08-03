"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
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
var recordedClient_1 = require("./utils/recordedClient");
var test_utils_1 = require("@azure/test-utils");
var inputs_1 = require("./inputs");
(0, test_utils_1.matrix)([["APIKey"]], function (authMethod) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe("[".concat(authMethod, "] ConversationAnalysisClient"), function () {
            var recorder;
            var client;
            var getId;
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function () {
                    var nextId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, recordedClient_1.startRecorder)(this.currentTest)];
                            case 1:
                                recorder = _a.sent();
                                client = (0, recordedClient_1.createClient)({
                                    authMethod: authMethod,
                                    recorder: recorder
                                });
                                nextId = 0;
                                getId = function () {
                                    nextId += 1;
                                    return nextId.toString();
                                };
                                return [2 /*return*/];
                        }
                    });
                });
            });
            afterEach(function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, recorder.stop()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            describe("#sync", function () {
                it("Test Conversation App", function (done) {
                    var message = client.analyzeConversation(inputs_1.conv1).then(function (message) {
                        //Assert prediction type
                        test_utils_1.assert.equal(message.kind, "ConversationResult");
                        test_utils_1.assert.exists(message.result.query);
                        test_utils_1.assert.equal(message.result.prediction.projectKind, "Conversation");
                        //Assert top intent
                        test_utils_1.assert.equal(message.result.prediction.topIntent, "Send");
                        test_utils_1.assert.isAtLeast(message.result.prediction.intents.length, 1);
                        test_utils_1.assert.equal(message.result.prediction.intents[0].category, "Send");
                        test_utils_1.assert.isAbove(message.result.prediction.intents[0].confidence, 0);
                        //Assert entities
                        test_utils_1.assert.isAtLeast(message.result.prediction.entities.length, 1);
                        test_utils_1.assert.equal(message.result.prediction.entities[0].category, "Contact");
                        test_utils_1.assert.equal(message.result.prediction.entities[0].text, "Carol");
                        test_utils_1.assert.isAbove(message.result.prediction.entities[0].confidence, 0);
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
                it("Test Orchestration App Conversational Response", function (done) {
                    client.analyzeConversation(inputs_1.conv2).then(function (message) {
                        //Assert prediction type
                        test_utils_1.assert.equal(message.kind, "ConversationResult");
                        test_utils_1.assert.exists(message.result.query);
                        test_utils_1.assert.equal(message.result.prediction.projectKind, "Orchestration");
                        //Assert top matching project
                        test_utils_1.assert.equal(message.result.prediction.topIntent, "EmailIntent");
                        test_utils_1.assert.exists(message.result.prediction.intents.EmailIntent);
                        var top_intent_object = message.result.prediction.intents.EmailIntent;
                        test_utils_1.assert.equal(top_intent_object.targetProjectKind, "Conversation");
                        //Assert intent
                        var conversation_result = top_intent_object.result.prediction;
                        test_utils_1.assert.equal(conversation_result.topIntent, "Send");
                        test_utils_1.assert.isAtLeast(conversation_result.intents.length, 1);
                        test_utils_1.assert.equal(conversation_result.intents[0].category, "Send");
                        test_utils_1.assert.isAbove(conversation_result.intents[0].confidence, 0);
                        //Assert entities
                        test_utils_1.assert.isAtLeast(conversation_result.entities.length, 1);
                        test_utils_1.assert.equal(conversation_result.entities[0].category, "Contact");
                        test_utils_1.assert.equal(conversation_result.entities[0].text, "Carol");
                        test_utils_1.assert.isAbove(conversation_result.entities[0].confidence, 0);
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
                // it("Test Orchestration App LUIS Response", (done) => {
                //   client.analyzeConversation(conv3).then((message) => {
                //     //Assert prediction type
                //     assert.equal(message.kind, "ConversationResult");
                //     assert.exists(message.result.query);
                //     assert.equal(message.result.prediction.projectKind, "Orchestration");
                //     //Assert top matching project
                //     assert.equal(message.result.prediction.topIntent, "RestaurantIntent");
                //     assert.exists(message.result.prediction.intents.RestaurantIntent);
                //     var top_intent_object = message.result.prediction.intents.RestaurantIntent;
                //     assert.equal(top_intent_object.targetProjectKind, "Luis");
                //     //Assert intent
                //     var luis_result = top_intent_object.result.prediction;
                //     assert.equal(luis_result.topIntent, "Reserve");
                //     assert.isAtLeast(luis_result.intents.length, 1);
                //     assert.isAbove(luis_result.intents.Reserve.confidence, 0);
                //     //Assert entities
                //     assert.isAtLeast(luis_result.entities.length, 1);
                //     done();
                //   }).catch((error) => {
                //     assert.fail();
                //   })
                //})
                it("Test Orchestration App QnA Response", function (done) {
                    client.analyzeConversation(inputs_1.conv4).then(function (message) {
                        //Assert prediction type
                        test_utils_1.assert.equal(message.kind, "ConversationResult");
                        test_utils_1.assert.exists(message.result.query);
                        test_utils_1.assert.equal(message.result.prediction.projectKind, "Orchestration");
                        //Assert top matching project
                        test_utils_1.assert.equal(message.result.prediction.topIntent, "ChitChat-QnA");
                        test_utils_1.assert.exists(message.result.prediction.intents["ChitChat-QnA"]);
                        var top_intent_object = message.result.prediction.intents["ChitChat-QnA"];
                        test_utils_1.assert.equal(top_intent_object.targetProjectKind, "QuestionAnswering");
                        //Assert intent
                        var qna_result = top_intent_object.result;
                        test_utils_1.assert.exists(qna_result.answers[0].answer);
                        test_utils_1.assert.isAbove(qna_result.answers[0].confidence, 0);
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
                it("Test Conversation App PII transcript", function (done) {
                    client.beginConversationAnalysisAndWait(inputs_1.conv5).then(function (message) {
                        //Assert main object
                        test_utils_1.assert.equal(message.status, "succeeded");
                        //Assert task result
                        var task_result = message.tasks.items[0];
                        test_utils_1.assert.equal(task_result.status, "succeeded");
                        test_utils_1.assert.equal(task_result.kind, "conversationalPIIResults");
                        //Assert Conversation Result
                        var conversation_items = task_result.results.conversations[0].conversationItems;
                        test_utils_1.assert.exists(conversation_items);
                        conversation_items.forEach(function (conversation) {
                            test_utils_1.assert.exists(conversation.redactedContent);
                            test_utils_1.assert.exists(conversation.entities);
                        });
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
                it("Test Conversation Summarization App", function (done) {
                    client.beginConversationAnalysisAndWait(inputs_1.conv6).then(function (message) {
                        //Assert main object
                        test_utils_1.assert.equal(message.status, "succeeded");
                        //Assert task result
                        var task_result = message.tasks.items[0];
                        test_utils_1.assert.equal(task_result.status, "succeeded");
                        test_utils_1.assert.equal(task_result.kind, "conversationalSummarizationResults");
                        //Assert Conversation Result
                        var conversation_result = task_result.results.conversations[0];
                        test_utils_1.assert.exists(conversation_result.summaries);
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
            });
            describe("#async", function () {
                it("Test Conversation App PII transcript", function (done) {
                    client.beginConversationAnalysis(inputs_1.conv5).then(function (poller) {
                        return poller.pollUntilDone();
                    }).then(function (message) {
                        //Assert main object
                        test_utils_1.assert.equal(message.status, "succeeded");
                        //Assert task result
                        var task_result = message.tasks.items[0];
                        test_utils_1.assert.equal(task_result.status, "succeeded");
                        test_utils_1.assert.equal(task_result.kind, "conversationalPIIResults");
                        //Assert Conversation Result
                        var conversation_items = task_result.results.conversations[0].conversationItems;
                        test_utils_1.assert.exists(conversation_items);
                        conversation_items.forEach(function (conversation) {
                            test_utils_1.assert.exists(conversation.redactedContent);
                            test_utils_1.assert.exists(conversation.entities);
                        });
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
                it("Test Conversation Summarization App", function (done) {
                    client.beginConversationAnalysis(inputs_1.conv6).then(function (poller) {
                        return poller.pollUntilDone();
                    }).then(function (message) {
                        //Assert main object
                        test_utils_1.assert.equal(message.status, "succeeded");
                        //Assert task result
                        var task_result = message.tasks.items[0];
                        test_utils_1.assert.equal(task_result.status, "succeeded");
                        test_utils_1.assert.equal(task_result.kind, "conversationalSummarizationResults");
                        //Assert Conversation Result
                        var conversation_result = task_result.results.conversations[0];
                        test_utils_1.assert.exists(conversation_result.summaries);
                        done();
                    })["catch"](function (error) {
                        test_utils_1.assert.fail();
                    });
                });
            });
        });
        return [2 /*return*/];
    });
}); });
