// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient";
import { Context, Suite } from "mocha";
import { assert, matrix } from "@azure-tools/test-utils";
import { ConversationAnalysisClient } from "../../src";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";

matrix([["APIKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] ConversationAnalysisClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: ConversationAnalysisClient;

    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient({
        authMethod,
        recorder,
      });
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("#sync", function () {
      it("Test Conversation App", async function () {
        const message = await client.analyzeConversation({
          kind: "Conversation",
          analysisInput: {
            conversationItem: {
              participantId: "1",
              id: "1",
              modality: "text",
              language: "en",
              text: "Send an email to Carol about the tomorrow's demo",
            },
          },
          parameters: {
            projectName: assertEnvironmentVariable("LANGUAGE_CLU_PROJECT_NAME"),
            deploymentName: assertEnvironmentVariable("LANGUAGE_CLU_DEPLOYMENT_NAME"),
            verbose: true,
            isLoggingEnabled: false,
          },
        });
        // Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        if (message.result.prediction.projectKind !== "Conversation") {
          assert.fail("Expected a Conversation prediction");
        }
        // Assert top intent
        assert.equal(message.result.prediction.topIntent, "Send");
        assert.isAtLeast(message.result.prediction.intents.length, 1);
        assert.equal(message.result.prediction.intents[0].category, "Send");
        assert.isAbove(message.result.prediction.intents[0].confidence, 0);

        // Assert entities
        assert.isAtLeast(message.result.prediction.entities.length, 1);
        assert.equal(message.result.prediction.entities[0].category, "Contact");
        assert.equal(message.result.prediction.entities[0].text, "Carol");
        assert.isAbove(message.result.prediction.entities[0].confidence, 0);
      });

      it("Test Orchestration App Conversational Response", async function () {
        const message = await client.analyzeConversation({
          kind: "Conversation",
          analysisInput: {
            conversationItem: {
              participantId: "1",
              id: "1",
              modality: "text",
              language: "en",
              text: "Send an email to Carol about the tomorrow's demo",
            },
          },
          parameters: {
            projectName: assertEnvironmentVariable("LANGUAGE_ORCHESTRATION_PROJECT_NAME"),
            deploymentName: assertEnvironmentVariable("LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME"),
            verbose: true,
            isLoggingEnabled: false,
          },
        });
        // Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        if (message.result.prediction.projectKind !== "Orchestration") {
          assert.fail("Expected an Orchestration prediction");
        }
        // Assert top matching project
        assert.equal(message.result.prediction.topIntent, "EmailIntent");
        assert.exists(message.result.prediction.intents.EmailIntent);
        const top_intent_object = message.result.prediction.intents.EmailIntent;

        if (
          top_intent_object.targetProjectKind !== "Conversation" ||
          top_intent_object.result?.prediction === undefined
        ) {
          assert.fail("Expected a Conversational response");
        }
        // Assert intent
        const conversation_result = top_intent_object.result.prediction;
        assert.equal(conversation_result.topIntent, "Send");
        assert.isAtLeast(conversation_result.intents.length, 1);
        assert.equal(conversation_result.intents[0].category, "Send");
        assert.isAbove(conversation_result.intents[0].confidence, 0);

        // Assert entities
        assert.isAtLeast(conversation_result.entities.length, 1);
        assert.equal(conversation_result.entities[0].category, "Contact");
        assert.equal(conversation_result.entities[0].text, "Carol");
        assert.isAbove(conversation_result.entities[0].confidence, 0);
      });

      it.skip("Test Orchestration App LUIS Response", async function () {
        const message = await client.analyzeConversation({
          kind: "Conversation",
          analysisInput: {
            conversationItem: {
              participantId: "1",
              id: "1",
              modality: "text",
              language: "en",
              text: "Reserve a table for 2 at the Italian restaurant",
            },
          },
          parameters: {
            projectName: assertEnvironmentVariable("LANGUAGE_ORCHESTRATION_PROJECT_NAME"),
            deploymentName: assertEnvironmentVariable("LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME"),
            verbose: true,
            isLoggingEnabled: false,
          },
        });
        // Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);

        if (message.result.prediction.projectKind !== "Orchestration") {
          assert.fail("Expected an Orchestration prediction");
        }
        // Assert top matching project
        assert.equal(message.result.prediction.topIntent, "RestaurantIntent");
        assert.exists(message.result.prediction.intents.RestaurantIntent);
        const top_intent_object = message.result.prediction.intents.RestaurantIntent;
        assert.equal(top_intent_object.targetProjectKind, "Luis");

        // Assert intent
        if (
          top_intent_object.targetProjectKind !== "Luis" ||
          top_intent_object.result?.prediction === undefined
        ) {
          assert.fail("Expected a LUIS response");
        }
        const luis_result = top_intent_object.result.prediction;
        assert.equal(luis_result.topIntent, "Reserve");
        assert.isAtLeast(luis_result.intents.length, 1);
        assert.isAbove(luis_result.intents[0].confidence, 0);

        // Assert entities
        assert.isAtLeast(luis_result.entities.length, 1);
      });

      it("Test Orchestration App QnA Response", async function () {
        const message = await client.analyzeConversation({
          kind: "Conversation",
          analysisInput: {
            conversationItem: {
              participantId: "1",
              id: "1",
              modality: "text",
              language: "en",
              text: "How are you?",
            },
          },
          parameters: {
            projectName: assertEnvironmentVariable("LANGUAGE_ORCHESTRATION_PROJECT_NAME"),
            deploymentName: assertEnvironmentVariable("LANGUAGE_ORCHESTRATION_DEPLOYMENT_NAME"),
            verbose: true,
            isLoggingEnabled: false,
          },
        });
        // Assert prediction type
        assert.equal(message.kind, "ConversationResult");
        assert.exists(message.result.query);
        if (message.result.prediction.projectKind !== "Orchestration") {
          assert.fail("Expected an Orchestration prediction");
        }

        // Assert top matching project
        assert.equal(message.result.prediction.topIntent, "ChitChat-QnA");
        assert.exists(message.result.prediction.intents["ChitChat-QnA"]);
        const top_intent_object = message.result.prediction.intents["ChitChat-QnA"];
        assert.equal(top_intent_object.targetProjectKind, "QuestionAnswering");

        // Assert intent
        if (
          top_intent_object.targetProjectKind !== "QuestionAnswering" ||
          top_intent_object.result?.answers === undefined
        ) {
          assert.fail("Expected a QnA response");
        }
        assert.exists(top_intent_object.result.answers[0].answer);
        assert.isAbove(top_intent_object.result.answers[0].confidence || 0, 0);
      });
    });

    describe("#async", function () {
      it("Test Conversation App PII transcript", async function () {
        const poller = await client.beginConversationAnalysis({
          displayName: "Analyze PII in conversation",
          analysisInput: {
            conversations: [
              {
                conversationItems: [
                  {
                    id: "1",
                    participantId: "0",
                    modality: "transcript",
                    text: "It is john doe.",
                    lexical: "It is john doe",
                    itn: "It is john doe",
                    maskedItn: "It is john doe",
                  },
                  {
                    id: "2",
                    participantId: "1",
                    modality: "transcript",
                    text: "Yes, 633-27-8199 is my phone",
                    lexical: "yes six three three two seven eight one nine nine is my phone",
                    itn: "yes 633278199 is my phone",
                    maskedItn: "yes 633278199 is my phone",
                  },
                  {
                    id: "3",
                    participantId: "1",
                    modality: "transcript",
                    text: "j.doe@yahoo.com is my email",
                    lexical: "j dot doe at yahoo dot com is my email",
                    maskedItn: "j.doe@yahoo.com is my email",
                    itn: "j.doe@yahoo.com is my email",
                  },
                ],
                modality: "transcript",
                id: "1",
                language: "en",
              },
            ],
          },
          tasks: [
            {
              kind: "ConversationalPIITask",
              parameters: {
                redactionSource: "lexical",
                piiCategories: ["all"],
              },
            },
          ],
        });
        const message = await poller.pollUntilDone();
        // Assert main object
        assert.equal(message.status, "succeeded");

        // Assert task result
        if (
          message.tasks.items === undefined ||
          message.tasks.items[0].kind !== "conversationalPIIResults"
        ) {
          assert.fail("Expected a Conversational PII result");
        }

        const task_result = message.tasks.items[0];
        assert.equal(task_result.status, "succeeded");
        assert.equal(task_result.kind, "conversationalPIIResults");

        // Assert Conversation Result
        const conversation_items = task_result.results.conversations[0].conversationItems;
        assert.exists(conversation_items);
        conversation_items.forEach((conversation) => {
          assert.exists(conversation.redactedContent);
          assert.exists(conversation.entities);
        });
      });

      it("Test Conversation Summarization App", async function () {
        const poller = await client.beginConversationAnalysis({
          displayName: "Analyze conversations from xxx",
          analysisInput: {
            conversations: [
              {
                conversationItems: [
                  {
                    text: "Hello, how can I help you?",
                    modality: "text",
                    id: "1",
                    participantId: "Agent",
                  },
                  {
                    text: "How to upgrade Office? I am getting error messages the whole day.",
                    modality: "text",
                    id: "2",
                    participantId: "Customer",
                  },
                  {
                    text: "Press the upgrade button please. Then sign in and follow the instructions.",
                    modality: "text",
                    id: "3",
                    participantId: "Agent",
                  },
                ],
                modality: "text",
                id: "conversation1",
                language: "en",
              },
            ],
          },
          tasks: [
            {
              taskName: "analyze 1",
              kind: "ConversationalSummarizationTask",
              parameters: {
                summaryAspects: ["Issue, Resolution"],
              },
            },
          ],
        });
        const message = await poller.pollUntilDone();
        // Assert main object
        assert.equal(message.status, "succeeded");

        // Assert task result
        if (
          message.tasks.items === undefined ||
          message.tasks.items[0].kind !== "conversationalSummarizationResults"
        ) {
          assert.fail("Expected a Conversational Summarization result");
        }

        const task_result = message.tasks.items[0];
        assert.equal(task_result.status, "succeeded");

        // Assert Conversation Result
        const conversation_result = task_result.results.conversations[0];
        assert.exists(conversation_result.summaries);
      });
    });
  });
});
