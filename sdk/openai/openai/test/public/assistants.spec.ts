// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AssistantCreateParams } from "openai/resources/beta/assistants.mjs";
import { assert, describe } from "vitest";
import { assertAssistantEquality } from "../utils/asserts.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import type { ClientsAndDeploymentsInfo, Metadata } from "../utils/types.js";
import { APIVersion, isRateLimitRun, testWithDeployments } from "../utils/utils.js";

describe.each([APIVersion.v2025_04_01_preview])("Assistants [%s]", (apiVersion: APIVersion) => {
  function createCodeAssistant(deploymentName: string): AssistantCreateParams {
    return {
      tools: [{ type: "code_interpreter" as const }],
      model: deploymentName,
      name: "JS CI Math Tutor",
      description: "Math Tutor for Math Problems",
      instructions: "You are a personal math tutor. Write and run code to answer math questions.",
      metadata: { foo: "bar" },
    };
  }

  const clientsAndDeploymentsInfo: ClientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    { assistants: "true" },
    {
      deploymentsToSkip: [
        "gpt-4o-mini-batch",
        "gpt-4o-mini-2",
        "gpt-4o-mini-global-batch",
        "gpt-35-turbo",
        "gpt-4-turbo",
      ],
    },
  );

  describe("all CRUD APIs", function () {
    describe("creates, gets, lists, modifies, and deletes an assistant", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client, deployment) => {
          const codeAssistant = createCodeAssistant(deployment);
          const assistantResponse = await client.beta.assistants.create(codeAssistant);
          try {
            assertAssistantEquality(codeAssistant, assistantResponse);
            const getAssistantResponse = await client.beta.assistants.retrieve(
              assistantResponse.id,
            );
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
          } finally {
            const deleteAssistantResponse = await client.beta.assistants.delete(
              assistantResponse.id,
            );
            assert.equal(deleteAssistantResponse.deleted, true);
          }
        },
        modelsListToSkip: [
          { name: "gpt-4.1" }, // 400 The requested deployment 'gpt-4.1' with engine 'gpt-4.1-2025-04-14' cannot be used with this API.
          { name: "gpt-4.1-nano" }, // 400 The requested deployment 'gpt-4.1-nano' with engine 'gpt-4.1-nano-2025-04-14' cannot be used with this API.
        ],
      });
    });

    describe("creates, gets, modifies, and deletes a thread", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client) => {
          const metadataValue = "bar";
          const thread = {
            metadata: { foo: metadataValue },
          };
          const threadResponse = await client.beta.threads.create(thread);
          try {
            assert.isNotNull(threadResponse.id);
            assert.equal((threadResponse.metadata as unknown as Metadata).foo, metadataValue);
            const getThreadResponse = await client.beta.threads.retrieve(threadResponse.id);
            assert.equal(threadResponse.id, getThreadResponse.id);
            assert.equal((getThreadResponse.metadata as unknown as Metadata).foo, metadataValue);

            const newMetadataValue = "other value";
            thread.metadata.foo = newMetadataValue;

            const updateThreadResponse = await client.beta.threads.update(
              threadResponse.id,
              thread,
            );
            assert.equal(threadResponse.id, updateThreadResponse.id);
            assert.equal(
              (updateThreadResponse.metadata as unknown as Metadata).foo,
              newMetadataValue,
            );
          } finally {
            const deleteThreadResponse = await client.beta.threads.delete(threadResponse.id);
            assert.equal(deleteThreadResponse.deleted, true);
          }
        },
      });
    });

    describe("creates, gets, modifies, and lists a message", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client) => {
          const thread = {
            messages: [],
          };
          const threadResponse = await client.beta.threads.create(thread);
          try {
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
            assert.equal((messageResponse.metadata as unknown as Metadata).foo, metadataValue);
            const getMessageResponse = await client.beta.threads.messages.retrieve(
              messageResponse.id,
              { thread_id: threadResponse.id },
            );
            messageContent = getMessageResponse.content[0];
            assert.equal(messageResponse.id, getMessageResponse.id);
            assert.equal(getMessageResponse.role, role);
            if (messageContent.type === "text") {
              assert.equal(messageContent.text.value, content);
            }
            assert.equal((getMessageResponse.metadata as unknown as Metadata).foo, metadataValue);

            const newMetadataValue = "other value";
            messageOptions.metadata.foo = newMetadataValue;

            const updateMessageResponse = await client.beta.threads.messages.update(
              messageResponse.id,
              {
                thread_id: threadResponse.id,
                metadata: messageOptions.metadata,
              },
            );
            assert.equal(messageResponse.id, updateMessageResponse.id);
            assert.equal(
              (updateMessageResponse.metadata as unknown as Metadata).foo,
              newMetadataValue,
            );

            const listLength = 1;
            const oneMessageList = await client.beta.threads.messages.list(threadResponse.id, {
              limit: listLength,
            });
            assert.equal(oneMessageList.data.length, listLength);
            const firstID = (oneMessageList as any).body.first_id;
            const lastID = (oneMessageList as any).body.last_id;
            assert.equal(firstID, lastID);
            assert.equal(oneMessageList.data[0].id, firstID);
          } finally {
            const deleteThreadResponse = await client.beta.threads.delete(threadResponse.id);
            assert.equal(deleteThreadResponse.deleted, true);
          }
        },
      });
    });

    describe.concurrent("creates, lists, gets, and cancels a run", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client, deployment) => {
          const [assistant, thread] = await Promise.all([
            client.beta.assistants.create({
              model: deployment,
              name: "JS CI Math Tutor",
              instructions:
                "You are a personal math tutor. Write and run code to answer math questions.",
              tools: [{ type: "code_interpreter" }],
            }),
            client.beta.threads.create(),
          ]);

          try {
            assert.isNotNull(assistant.id);
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
            assert.equal((run.metadata as unknown as Metadata).foo, metadataValue);

            // With no messages, there should be no steps, but sometimes there is a step...
            // so can't evaluate anything on threads.runs.steps.list

            const listLength = 1;
            const list = await client.beta.threads.runs.list(thread.id, { limit: listLength });
            assert.equal(list.data.length, listLength);
            const firstID = (list as any).body.first_id;
            const lastID = (list as any).body.last_id;
            assert.equal(firstID, lastID);
            assert.equal(list.data[0].id, firstID);

            const cancel = await client.beta.threads.runs.cancel(run.id, { thread_id: thread.id });
            assert.equal(cancel.id, run.id);
            assert.equal(cancel.thread_id, thread.id);
            assert.equal(cancel.assistant_id, assistant.id);
            assert.equal(cancel.instructions, instructions);
            assert.equal(cancel.status, "cancelling");

            const getRun = await client.beta.threads.runs.retrieve(run.id, {
              thread_id: thread.id,
            });
            assert.equal(getRun.id, run.id);
            assert.equal(getRun.thread_id, thread.id);
            assert.equal(getRun.assistant_id, assistant.id);
            assert.equal(getRun.instructions, instructions);
            assert.equal((getRun.metadata as unknown as Metadata).foo, metadataValue);
          } finally {
            const deleteThreadResponse = await client.beta.threads.delete(thread.id);
            const deleteAssistantResponse = await client.beta.assistants.delete(assistant.id);
            // All deletes before any asserts
            assert.equal(deleteThreadResponse.deleted, true);
            assert.equal(deleteAssistantResponse.deleted, true);
          }
        },
        acceptableErrors: {
          messageSubstring: ["400 Cannot cancel run with status"],
        },
        modelsListToSkip: [
          { name: "gpt-4.1" }, // 400 The requested deployment 'gpt-4.1' with engine 'gpt-4.1-2025-04-14' cannot be used with this API.
          { name: "gpt-4.1-nano" }, // 400 The requested deployment 'gpt-4.1-nano' with engine 'gpt-4.1-nano-2025-04-14' cannot be used with this API.
        ],
      });
    });
  });

  describe(`customer scenarios`, function () {
    describe("create and run code interpreter scenario", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client, deployment) => {
          const codeAssistant = createCodeAssistant(deployment);
          const assistant = await client.beta.assistants.create(codeAssistant);
          const thread = await client.beta.threads.create();
          try {
            assertAssistantEquality(codeAssistant, assistant);
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
            const run = await client.beta.threads.runs.createAndPoll(thread.id, {
              assistant_id: assistant.id,
              instructions,
            });
            if (isRateLimitRun(run)) {
              return;
            }
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
          } finally {
            const deleteThreadResponse = await client.beta.threads.delete(thread.id);
            const deleteAssistantResponse = await client.beta.assistants.delete(assistant.id);
            // All deletes before any asserts
            assert.equal(deleteThreadResponse.deleted, true);
            assert.equal(deleteAssistantResponse.deleted, true);
          }
        },
        modelsListToSkip: [
          { name: "o1" }, // "Sorry, something went wrong" 2025-04-15
          { name: "o1-preview" }, // "Sorry, something went wrong" 2025-04-15
          { name: "o1-mini" }, // "Sorry, something went wrong" 2025-04-15
          { name: "o3-mini" }, // "Sorry, something went wrong" 2025-04-15
          { name: "gpt-4.1" }, // 400 The requested deployment 'gpt-4.1' with engine 'gpt-4.1-2025-04-14' cannot be used with this API.
          { name: "gpt-4.1-nano" }, // 400 The requested deployment 'gpt-4.1-nano' with engine 'gpt-4.1-nano-2025-04-14' cannot be used with this API.
        ],
      });
    });

    describe.sequential("create and run function scenario for assistant", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: async (client, deployment) => {
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
            model: deployment,
            name: "JS SDK Test Assistant - Nickname",
            instructions,
            tools: [getUserFavoriteCityTool, getCityNicknameTool],
          };
          const assistant = await client.beta.assistants.create(functionAssistant);
          const thread = await client.beta.threads.create();
          try {
            assert.isNotNull(assistant.id);
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
            if (isRateLimitRun(run)) {
              return;
            }
            if (
              run.status === "requires_action" &&
              run.required_action?.type === "submit_tool_outputs"
            ) {
              const toolOutputs = [];

              assert.isDefined(run.required_action?.submit_tool_outputs?.tool_calls);
              if (run.required_action?.submit_tool_outputs?.tool_calls !== undefined) {
                for (const toolCall of run.required_action.submit_tool_outputs.tool_calls) {
                  toolOutputs.push(getResolvedToolOutput(toolCall));
                }
              }
              run = await client.beta.threads.runs.submitToolOutputsAndPoll(run.id, {
                thread_id: thread.id,
                tool_outputs: toolOutputs,
              });

              if (isRateLimitRun(run)) {
                return;
              }
              assert.equal(favoriteCityCalled, true);
              // Some models can't perform the two tool calls in one run
              if (toolOutputs.length === 2) {
                assert.equal(nicknameCalled, true);
              }
            }

            const runMessages = await client.beta.threads.messages.list(thread.id);
            for (const runMessageDatum of runMessages.data) {
              for (const item of runMessageDatum.content) {
                assert.equal(item.type, "text");
                if (item.type === "text") {
                  assert.isNotEmpty(item.text?.value);
                }
              }
            }
          } finally {
            const deleteThreadResponse = await client.beta.threads.delete(thread.id);
            const deleteAssistantResponse = await client.beta.assistants.delete(assistant.id);
            // All deletes before any asserts
            assert.equal(deleteThreadResponse.deleted, true);
            assert.equal(deleteAssistantResponse.deleted, true);
          }
        },
        modelsListToSkip: [
          { name: "o1" }, // "Sorry, something went wrong" 2025-04-15
          { name: "o1-preview" }, // "Sorry, something went wrong" 2025-04-15
          { name: "o1-mini" }, // "Sorry, something went wrong" 2025-04-15
          { name: "o3-mini" }, // "Sorry, something went wrong" 2025-04-15
          { name: "gpt-4.1" }, // 400 The requested deployment 'gpt-4.1' with engine 'gpt-4.1-2025-04-14' cannot be used with this API.
          { name: "gpt-4.1-nano" }, // 400 The requested deployment 'gpt-4.1-nano' with engine 'gpt-4.1-nano-2025-04-14' cannot be used with this API.
        ],
      });
    });
  });
});
