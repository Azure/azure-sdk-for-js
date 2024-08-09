// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils";
import { assert, describe, beforeEach, it } from "vitest";
import { assertAssistantEquality } from "./utils/asserts.js";
import { createClient } from "./utils/createClient.js";
import OpenAI, { AzureOpenAI } from "openai";
import { APIVersion, handleAssistantsRunFailure, Metadata } from "./utils/utils.js";

describe("OpenAIAssistants", () => {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      const model = "gpt-4-1106-preview";

      const codeAssistant = {
        tools: [{ type: "code_interpreter" as const }],
        model: "gpt-4-1106-preview",
        name: "JS CI Math Tutor",
        description: "Math Tutor for Math Problems",
        instructions: "You are a personal math tutor. Write and run code to answer math questions.",
        metadata: { foo: "bar" },
      };

      beforeEach(async function () {
        client = createClient(apiVersion, "vision");
      });

      describe("all CRUD APIs", function () {
        it("creates, gets, lists, modifies, and deletes an assistant", async function () {
          const assistantResponse = await client.beta.assistants.create(codeAssistant);
          assertAssistantEquality(codeAssistant, assistantResponse);
          const getAssistantResponse = await client.beta.assistants.retrieve(assistantResponse.id);
          assertAssistantEquality(codeAssistant, getAssistantResponse);
          codeAssistant.name = "Completely different name";
          const updateAssistantResponse = await client.beta.assistants.update(
            assistantResponse.id,
            codeAssistant,
          );
          assertAssistantEquality(codeAssistant, updateAssistantResponse);
          const listLength = 1;
          const oneAssistantList = await client.beta.assistants.list({ limit: listLength });
          assert.equal(oneAssistantList.data.length, listLength);
          // TODO: Fix this any cast
          const firstID = (oneAssistantList as any).body.first_id;
          const lastID = (oneAssistantList as any).body.last_id;
          assert.equal(firstID, lastID);
          assert.equal(oneAssistantList.data[0].id, firstID);

          const deleteAssistantResponse = await client.beta.assistants.del(assistantResponse.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });

        it("creates, gets, modifies, and deletes a thread", async function () {
          const metadataValue = "bar";
          const thread = {
            metadata: { foo: metadataValue },
          };

          const threadResponse = await client.beta.threads.create(thread);
          assert.isNotNull(threadResponse.id);
          assert.equal((threadResponse.metadata as Metadata).foo, metadataValue);
          const getThreadResponse = await client.beta.threads.retrieve(threadResponse.id);
          assert.equal(threadResponse.id, getThreadResponse.id);
          assert.equal((getThreadResponse.metadata as Metadata).foo, metadataValue);

          const newMetadataValue = "other value";
          thread.metadata.foo = newMetadataValue;

          const updateThreadResponse = await client.beta.threads.update(threadResponse.id, thread);
          assert.equal(threadResponse.id, updateThreadResponse.id);
          assert.equal((updateThreadResponse.metadata as Metadata).foo, newMetadataValue);
          const deleteThreadResponse = await client.beta.threads.del(threadResponse.id);
          assert.equal(deleteThreadResponse.deleted, true);
        });

        it("creates, gets, modifies, and lists a message", async function () {
          const thread = {
            messages: [],
          };
          const threadResponse = await client.beta.threads.create(thread);
          assert.isNotNull(threadResponse.id);
          const role = "user";
          const content = "explain the fibonacci sequence";

          const metadataValue = "bar";
          const messageOptions = {
            metadata: { foo: metadataValue },
          };
          const messageResponse = await client.beta.threads.messages.create(threadResponse.id, {
            role,
            content,
            ...messageOptions,
          });

          let messageContent = messageResponse.content[0];
          assert.isNotNull(messageResponse.id);
          assert.equal(messageResponse.role, role);
          if (messageContent.type === "text") {
            assert.equal(messageContent.text.value, content);
          }
          assert.equal((messageResponse.metadata as Metadata).foo, metadataValue);
          const getMessageResponse = await client.beta.threads.messages.retrieve(
            threadResponse.id,
            messageResponse.id || "",
          );
          messageContent = getMessageResponse.content[0];
          assert.equal(messageResponse.id, getMessageResponse.id);
          assert.equal(getMessageResponse.role, role);
          if (messageContent.type === "text") {
            assert.equal(messageContent.text.value, content);
          }
          assert.equal((getMessageResponse.metadata as Metadata).foo, metadataValue);

          const newMetadataValue = "other value";
          messageOptions.metadata.foo = newMetadataValue;

          const updateMessageResponse = await client.beta.threads.messages.update(
            threadResponse.id,
            messageResponse.id || "",
            messageOptions,
          );
          assert.equal(messageResponse.id, updateMessageResponse.id);
          assert.equal((updateMessageResponse.metadata as Metadata).foo, newMetadataValue);

          const listLength = 1;
          const oneMessageList = await client.beta.threads.messages.list(threadResponse.id, {
            limit: listLength,
          });
          assert.equal(oneMessageList.data.length, listLength);
          const firstID = (oneMessageList as any).body.first_id;
          const lastID = (oneMessageList as any).body.last_id;
          assert.equal(firstID, lastID);
          assert.equal(oneMessageList.data[0].id, firstID);
        });

        it("create, lists, gets, and cancels a run", async function () {
          const assistant = await client.beta.assistants.create({
            model: "gpt-4-1106-preview",
            name: "JS CI Math Tutor",
            instructions:
              "You are a personal math tutor. Write and run code to answer math questions.",
            tools: [{ type: "code_interpreter" }],
          });
          assert.isNotNull(assistant.id);
          const thread = await client.beta.threads.create();
          assert.isNotNull(thread.id);

          const metadataValue = "bar";
          const metadata = { foo: metadataValue };
          const instructions =
            "Please address the user as Jane Doe. The user has a premium account.";
          const run = await client.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
            instructions,
            metadata,
          });
          assert.isNotNull(run.id);
          assert.equal(run.thread_id, thread.id);
          assert.equal(run.assistant_id, assistant.id);
          assert.equal(run.instructions, instructions);
          assert.equal((run.metadata as Metadata).foo, metadataValue);

          const runSteps = await client.beta.threads.runs.steps.list(thread.id, run.id);
          // with no messages, there should be no steps
          assert.equal(runSteps.data.length, 0);
          assert.equal((runSteps as any).body.first_id, null);
          assert.equal((runSteps as any).body.last_id, null);

          const listLength = 1;
          const list = await client.beta.threads.runs.list(thread.id, { limit: listLength });
          assert.equal(list.data.length, listLength);
          const firstID = (list as any).body.first_id;
          const lastID = (list as any).body.last_id;
          assert.equal(firstID, lastID);
          assert.equal(list.data[0].id, firstID);

          const cancel = await client.beta.threads.runs.cancel(thread.id, run.id);
          assert.equal(cancel.id, run.id);
          assert.equal(cancel.thread_id, thread.id);
          assert.equal(cancel.assistant_id, assistant.id);
          assert.equal(cancel.instructions, instructions);
          assert.equal(cancel.status, "cancelling");

          const getRun = await client.beta.threads.runs.retrieve(thread.id, run.id);
          assert.equal(getRun.id, run.id);
          assert.equal(getRun.thread_id, thread.id);
          assert.equal(getRun.assistant_id, assistant.id);
          assert.equal(getRun.instructions, instructions);
          assert.equal((getRun.metadata as Metadata).foo, metadataValue);
          const deleteThreadResponse = await client.beta.threads.del(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.beta.assistants.del(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
      });

      describe(`customer scenarios`, function () {
        it("create and run code interpreter scenario", async function (context) {
          const assistant = await client.beta.assistants.create(codeAssistant);
          assertAssistantEquality(codeAssistant, assistant);
          const thread = await client.beta.threads.create();
          assert.isNotNull(thread.id);
          const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
          const role = "user";
          const message = await client.beta.threads.messages.create(thread.id, {
            role,
            content: question,
          });
          const messageContent = message.content[0];
          assert.isNotNull(message.id);
          assert.equal(message.role, role);
          if (messageContent.type === "text") {
            assert.equal(messageContent.text.value, question);
          }
          const instructions =
            "Please address the user as Jane Doe. The user has a premium account.";
          let run = await client.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistant.id,
            instructions,
          });
          handleAssistantsRunFailure(run, context);
          assert.isNotNull(run.id);
          assert.equal(run.thread_id, thread.id);
          assert.equal(run.assistant_id, assistant.id);
          assert.equal(run.instructions, instructions);
          assert.equal(run.status, "completed");

          const runMessages = await client.beta.threads.messages.list(thread.id);
          for (const runMessageDatum of runMessages.data) {
            for (const item of runMessageDatum.content) {
              assert.equal(item.type, "text");
              if (item.type === "text") {
                assert.isNotEmpty(item.text.value);
              }
            }
          }
          const deleteThreadResponse = await client.beta.threads.del(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.beta.assistants.del(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });

        it("create and run function scenario for assistant", async function (context) {
          const favoriteCityFunctionName = "getUserFavoriteCity";
          const favoriteCityFunctionDescription = "Gets the user's favorite city.";
          const getFavoriteCity = (): string => "Atlanta, GA";
          const getUserFavoriteCityTool = {
            type: "function" as const,
            function: {
              name: favoriteCityFunctionName,
              description: favoriteCityFunctionDescription,
              parameters: {
                type: "object",
                properties: {},
              },
            },
          };

          const getCityNickname = (city: string): string => {
            switch (city) {
              case "Atlanta, GA":
                return "The ATL";
              case "Seattle, WA":
                return "The Emerald City";
              case "Los Angeles, CA":
                return "LA";
              default:
                return "Unknown";
            }
          };

          const getCityNicknameFunctionName = "getCityNickname";
          const getCityNicknameFunctionDescription =
            "Gets the nickname for a city, e.g. 'LA' for 'Los Angeles, CA'.";
          const getCityNicknameTool = {
            type: "function" as const,
            function: {
              name: getCityNicknameFunctionName,
              description: getCityNicknameFunctionDescription,
              parameters: {
                type: "object",
                properties: {
                  city: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                  },
                },
              },
            },
          };

          let favoriteCityCalled = false;
          let nicknameCalled = false;
          const getResolvedToolOutput = (toolCall: {
            id: string;
            function?: any;
          }): { output: string } => {
            const toolOutput = { tool_call_id: toolCall.id, output: "" };
            if (toolCall["function"]) {
              const functionCall = toolCall["function"];
              const functionName = functionCall.name;
              const functionArgs = JSON.parse(functionCall["arguments"] ?? {});
              switch (functionName) {
                case favoriteCityFunctionName:
                  toolOutput.output = getFavoriteCity();
                  favoriteCityCalled = true;
                  break;
                case getCityNicknameFunctionName:
                  toolOutput.output = getCityNickname(functionArgs["city"]);
                  nicknameCalled = true;
                  break;
                default:
                  toolOutput.output = `Unknown function: ${functionName}`;
                  break;
              }
            }

            return toolOutput;
          };

          const instructions = `You are a helpful assistant. Use the provided functions to help answer questions.
            Customize your responses to the user's preferences as much as possible and use friendly
            nicknames for cities whenever possible.
        `;
          const functionAssistant = {
            model,
            name: "JS SDK Test Assistant - Nickname",
            instructions,
            tools: [getUserFavoriteCityTool, getCityNicknameTool],
          };
          const assistant = await client.beta.assistants.create(functionAssistant);
          assert.isNotNull(assistant.id);
          const thread = await client.beta.threads.create();
          assert.isNotNull(thread.id);
          const content = "What's the nickname of my favorite city?";
          const role = "user";
          const message = await client.beta.threads.messages.create(thread.id, { role, content });
          assert.isNotNull(message.id);
          assert.equal(message.thread_id, thread.id);
          let run = await client.beta.threads.runs.createAndPoll(
            thread.id,
            {
              assistant_id: assistant.id,
              tools: [getUserFavoriteCityTool, getCityNicknameTool],
            },
            {
              timeout: 10000,
            },
          );
          handleAssistantsRunFailure(run, context);
          if (
            run.status === "requires_action" &&
            run.required_action?.type === "submit_tool_outputs"
          ) {
            const toolOutputs = [];

            assert.notEqual(run.required_action?.submit_tool_outputs?.tool_calls, undefined);
            if (run.required_action?.submit_tool_outputs?.tool_calls !== undefined) {
              for (const toolCall of run.required_action.submit_tool_outputs.tool_calls) {
                toolOutputs.push(getResolvedToolOutput(toolCall));
              }
            }
            run = await client.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
              tool_outputs: toolOutputs,
            });
          }
          handleAssistantsRunFailure(run, context);
          assert.equal(favoriteCityCalled, true);
          assert.equal(nicknameCalled, true);

          const runMessages = await client.beta.threads.messages.list(thread.id);
          for (const runMessageDatum of runMessages.data) {
            for (const item of runMessageDatum.content) {
              assert.equal(item.type, "text");
              if (item.type === "text") {
                assert.isNotEmpty(item.text?.value);
              }
            }
          }

          const deleteThreadResponse = await client.beta.threads.del(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.beta.assistants.del(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
      });
    });
  });
});
