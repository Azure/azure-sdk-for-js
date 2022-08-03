// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
    ConversationAnalysisClient
  } from "../../dist";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient";
import { Context, Suite } from "mocha";
import { assert, matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { setLogLevel } from "@azure/logger";
import { conv1, conv2, conv3, conv4, conv5, conv6 } from "./inputs";

matrix([["APIKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] ConversationAnalysisClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: ConversationAnalysisClient;

    let getId: () => string;

    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient({
        authMethod,
        recorder
      });
      let nextId = 0;
      getId = function () {
        nextId += 1;
        return nextId.toString();
      };
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("#sync", () => {

    it("Test Conversation App", (done) => {
      var message = client.analyzeConversation(conv1).then((message) => {
        //Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        assert.equal(message.result.prediction.projectKind, "Conversation");

        //Assert top intent
        assert.equal(message.result.prediction.topIntent, "Send");
        assert.isAtLeast(message.result.prediction.intents.length, 1);
        assert.equal(message.result.prediction.intents[0].category, "Send");
        assert.isAbove(message.result.prediction.intents[0].confidence, 0);
        
        //Assert entities
        assert.isAtLeast(message.result.prediction.entities.length, 1);
        assert.equal(message.result.prediction.entities[0].category, "Contact");
        assert.equal(message.result.prediction.entities[0].text, "Carol");
        assert.isAbove(message.result.prediction.entities[0].confidence, 0);

        done();
      }).catch((error) => {
        assert.fail();
      })
    })
    
    it("Test Orchestration App Conversational Response", (done) => {
      client.analyzeConversation(conv2).then((message) => {
        //Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        assert.equal(message.result.prediction.projectKind, "Orchestration");

        //Assert top matching project
        assert.equal(message.result.prediction.topIntent, "EmailIntent");
        assert.exists(message.result.prediction.intents.EmailIntent);
        var top_intent_object = message.result.prediction.intents.EmailIntent;
        assert.equal(top_intent_object.targetProjectKind, "Conversation");

        //Assert intent
        var conversation_result = top_intent_object.result.prediction;
        assert.equal(conversation_result.topIntent, "Send");
        assert.isAtLeast(conversation_result.intents.length, 1);
        assert.equal(conversation_result.intents[0].category, "Send");
        assert.isAbove(conversation_result.intents[0].confidence, 0);
        
        //Assert entities
        assert.isAtLeast(conversation_result.entities.length, 1);
        assert.equal(conversation_result.entities[0].category, "Contact");
        assert.equal(conversation_result.entities[0].text, "Carol");
        assert.isAbove(conversation_result.entities[0].confidence, 0);

        done();
      }).catch((error) => {
        assert.fail();
      })
    })

    it.skip("Test Orchestration App LUIS Response", (done) => {
      client.analyzeConversation(conv3).then((message) => {
        //Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        assert.equal(message.result.prediction.projectKind, "Orchestration");

        //Assert top matching project
        assert.equal(message.result.prediction.topIntent, "RestaurantIntent");
        assert.exists(message.result.prediction.intents.RestaurantIntent);
        var top_intent_object = message.result.prediction.intents.RestaurantIntent;
        assert.equal(top_intent_object.targetProjectKind, "Luis");

        //Assert intent
        var luis_result = top_intent_object.result.prediction;
        assert.equal(luis_result.topIntent, "Reserve");
        assert.isAtLeast(luis_result.intents.length, 1);
        assert.isAbove(luis_result.intents.Reserve.confidence, 0);
        
        //Assert entities
        assert.isAtLeast(luis_result.entities.length, 1);

        done();
      }).catch((error) => {
        assert.fail();
      })
    })

    it("Test Orchestration App QnA Response", (done) => {
      client.analyzeConversation(conv4).then((message) => {
        //Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        assert.equal(message.result.prediction.projectKind, "Orchestration");

        //Assert top matching project
        assert.equal(message.result.prediction.topIntent, "ChitChat-QnA");
        assert.exists(message.result.prediction.intents["ChitChat-QnA"]);
        var top_intent_object = message.result.prediction.intents["ChitChat-QnA"];
        assert.equal(top_intent_object.targetProjectKind, "QuestionAnswering");

        //Assert intent
        var qna_result = top_intent_object.result;
        assert.exists(qna_result.answers[0].answer);
        assert.isAbove(qna_result.answers[0].confidence, 0);

        done();
      }).catch((error) => {
        assert.fail();
      })
    })

    it("Test Conversation App PII transcript", (done) => {
      client.beginConversationAnalysisAndWait(conv5).then((message) => {
        //Assert main object
        assert.equal(message.status, "succeeded");

        //Assert task result
        var task_result = message.tasks.items[0];
        assert.equal(task_result.status, "succeeded");
        assert.equal(task_result.kind, "conversationalPIIResults");

        //Assert Conversation Result
        var conversation_items = task_result.results.conversations[0].conversationItems;
        assert.exists(conversation_items);
        conversation_items.forEach((conversation) => {
          assert.exists(conversation.redactedContent);
          assert.exists(conversation.entities);
        })

        done();
      }).catch((error) => {
        assert.fail();
      })
    })

    it("Test Conversation Summarization App", (done) => {
      client.beginConversationAnalysisAndWait(conv6).then((message) => {
        //Assert main object
        assert.equal(message.status, "succeeded");

        //Assert task result
        var task_result = message.tasks.items[0];
        assert.equal(task_result.status, "succeeded");
        assert.equal(task_result.kind, "conversationalSummarizationResults");

        //Assert Conversation Result
        var conversation_result = task_result.results.conversations[0];
        assert.exists(conversation_result.summaries);
        
        done();
      }).catch((error) => {
        assert.fail();
      })
    })
  });

  describe("#async", () => {

    it("Test Conversation App PII transcript", (done) => {
      client.beginConversationAnalysis(conv5).then((poller) => {
        return poller.pollUntilDone();
      }).then((message) => {
        //Assert main object
        assert.equal(message.status, "succeeded");

        //Assert task result
        var task_result = message.tasks.items[0];
        assert.equal(task_result.status, "succeeded");
        assert.equal(task_result.kind, "conversationalPIIResults");

        //Assert Conversation Result
        var conversation_items = task_result.results.conversations[0].conversationItems;
        assert.exists(conversation_items);
        conversation_items.forEach((conversation) => {
          assert.exists(conversation.redactedContent);
          assert.exists(conversation.entities);
        })

        done();
      }).catch((error) => {
        assert.fail();
      })
    })

    it("Test Conversation Summarization App", (done) => {
      client.beginConversationAnalysis(conv6).then((poller) => {
        return poller.pollUntilDone();
      }).then((message) => {
        //Assert main object
        assert.equal(message.status, "succeeded");

        //Assert task result
        var task_result = message.tasks.items[0];
        assert.equal(task_result.status, "succeeded");
        assert.equal(task_result.kind, "conversationalSummarizationResults");

        //Assert Conversation Result
        var conversation_result = task_result.results.conversations[0];
        assert.exists(conversation_result.summaries);
        
        done();
      }).catch((error) => {
        assert.fail();
      })
    })
  });

  })
})