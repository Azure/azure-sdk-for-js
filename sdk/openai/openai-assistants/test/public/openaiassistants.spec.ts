// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { assertAssistantEquality } from "./utils/asserts.js";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient.js";
import { getModels } from "./utils/utils.js";
import { Context } from "mocha";
import { AssistantsClient } from "../../src/index.js";

describe("OpenAIAssistants", () => {
  let recorder: Recorder;
  let models: string[] = [];

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
    if (!models.length) {
      models = await getModels(recorder);
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // const authTypes = ["AzureAPIKey", "OpenAIKey", "AAD"] as AuthMethod[];
  const authTypes = ["OpenAIKey" as AuthMethod];

  matrix([authTypes] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: AssistantsClient;
      const codeAssistant = {
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview",
        name: "JS CI Math Tutor",
        description: "Math Tutor for Math Problems",
        instructions: "You are a personal math tutor. Write and run code to answer math questions.",
        metadata: { foo: "bar" },
      };

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, { recorder });
      });

      describe("all CRUD APIs", function () {
        it("creates, retrieves, lists, modifies, and deletes an assistant", async function () {
          const assistantResponse = await client.assistants.createAssistant(codeAssistant);
          assertAssistantEquality(codeAssistant, assistantResponse);
          const getAssistantResponse = await client.assistants.retrieveAssistant(
            assistantResponse.id
          );
          assertAssistantEquality(codeAssistant, getAssistantResponse);
          codeAssistant.name = "Completely different name";
          const modifyAssistantResponse = await client.assistants.modifyAssistant(
            assistantResponse.id,
            codeAssistant
          );
          assertAssistantEquality(codeAssistant, modifyAssistantResponse);
          const listLength = 1;
          const oneAssistantList = await client.assistants.listAssistants({ limit: listLength });
          assert.equal(oneAssistantList.data.length, listLength);
          assert.equal(oneAssistantList.firstId, oneAssistantList.lastId);
          assert.equal(oneAssistantList.firstId, oneAssistantList.lastId);
          assert.equal(oneAssistantList.data[0].id, oneAssistantList.firstId);

          const deleteAssistantResponse = await client.assistants.deleteAssistant(
            assistantResponse.id
          );
          assert.equal(deleteAssistantResponse.deleted, true);
        });

        it("creates, retrieves, modifies, and deletes a thread", async function () {
          const metadataValue = "bar";
          const thread = {
            messages: [],
            metadata: { foo: metadataValue },
          };
          const threadResponse = await client.assistantThreads.createThread(thread);
          assert.isNotNull(threadResponse.id);
          assert.equal(threadResponse.metadata?.foo, metadataValue);
          const getThreadResponse = await client.assistantThreads.retrieveThread(threadResponse.id);
          assert.equal(threadResponse.id, getThreadResponse.id);
          assert.equal(getThreadResponse.metadata?.foo, metadataValue);

          const newMetadataValue = "other value";
          thread.metadata.foo = newMetadataValue;

          const modifyThreadResponse = await client.assistantThreads.modifyThread(
            threadResponse.id,
            thread
          );
          assert.equal(threadResponse.id, modifyThreadResponse.id);
          assert.equal(modifyThreadResponse.metadata?.foo, newMetadataValue);
          const deleteThreadResponse = await client.assistantThreads.deleteThread(
            threadResponse.id
          );
          assert.equal(deleteThreadResponse.deleted, true);
        });
        it("creates, retrieves, modifies, and lists a message", async function () {
          const thread = {
            messages: [],
          };
          const threadResponse = await client.assistantThreads.createThread(thread);
          assert.isNotNull(threadResponse.id);
          const role = "user";
          const content = "explain the fibonacci sequence";

          const metadataValue = "bar";
          const messageOptions = {
            file_ids: [],
            metadata: { foo: metadataValue },
          };
          const messageResponse = await client.threadMessages.createMessage(
            threadResponse.id,
            role,
            content,
            messageOptions
          );
          assert.isNotNull(messageResponse.id);
          assert.equal(messageResponse.role, role);
          assert.equal(messageResponse.content[0].text?.value, content);
          assert.equal(messageResponse.metadata?.foo, metadataValue);
          const getMessageResponse = await client.threadMessages.retrieveMessage(
            threadResponse.id,
            messageResponse.id || ""
          );
          assert.equal(messageResponse.id, getMessageResponse.id);
          assert.equal(getMessageResponse.role, role);
          assert.equal(getMessageResponse.content[0].text?.value, content);
          assert.equal(getMessageResponse.metadata?.foo, metadataValue);

          const newMetadataValue = "other value";
          messageOptions.metadata.foo = newMetadataValue;

          const modifyMessageResponse = await client.threadMessages.modifyMessage(
            threadResponse.id,
            messageResponse.id || "",
            messageOptions
          );
          assert.equal(messageResponse.id, modifyMessageResponse.id);
          assert.equal(modifyMessageResponse.metadata?.foo, newMetadataValue);

          const listLength = 1;
          const oneMessageList = await client.threadMessages.listMessages(threadResponse.id, {
            limit: listLength,
          });
          assert.equal(oneMessageList.data.length, listLength);
          assert.equal(oneMessageList.firstId, oneMessageList.lastId);
          assert.equal(oneMessageList.firstId, oneMessageList.lastId);
          assert.equal(oneMessageList.data[0].id, oneMessageList.firstId);
        });
        it("uploads, retrieves, and lists a file", async function () {
          /*
          // move to node only, currently failing in browser
          const filename = "sample_file_for_upload.txt";
          const text = "The word 'apple' uses the code 442345, while the word 'banana' uses the code 673457.";
          const uint8 = Uint8Array.from(text.split("").map(x => x.charCodeAt(0)));
          const uploadedFile = await client.uploadFile(uint8, "assistants", { filename });
          assert.isNotNull(uploadedFile.id);
          assert.equal(uploadedFile.filename, filename);
          assert.equal(uploadedFile.bytes, uint8.length);
          */
          const fileList = await client.files.listFiles();
          assert.isNotEmpty(fileList.data);
          assert.isNotNull(fileList.data[0].id);
        });
        it("create, lists, retrieves, and cancels a run", async function () {
          const assistant = await client.assistants.createAssistant({
            model: "gpt-4-1106-preview",
            name: "JS CI Math Tutor",
            instructions:
              "You are a personal math tutor. Write and run code to answer math questions.",
            tools: [{ type: "code_interpreter" }],
          });
          assert.isNotNull(assistant.id);
          const thread = await client.assistantThreads.createThread({});
          assert.isNotNull(thread.id);

          const metadataValue = "bar";
          const metadata = { foo: metadataValue };
          const instructions =
            "Please address the user as Jane Doe. The user has a premium account.";
          const run = await client.threadRuns.createRun(thread.id, assistant.id, {
            instructions,
            metadata,
          });
          assert.isNotNull(run.id);
          assert.equal(run.threadId, thread.id);
          assert.equal(run.assistantId, assistant.id);
          assert.equal(run.instructions, instructions);
          assert.equal(run.metadata?.foo, metadataValue);

          const runSteps = await client.runSteps.listRunSteps(thread.id, run.id);
          // with no messages, there should be no steps
          assert.equal(runSteps.data.length, 0);
          assert.equal(runSteps.firstId, null);
          assert.equal(runSteps.lastId, null);

          const listLength = 1;
          const list = await client.threadRuns.listRuns(thread.id, { limit: listLength });
          assert.equal(list.data.length, listLength);
          assert.equal(list.firstId, list.lastId);
          assert.equal(list.firstId, list.lastId);
          assert.equal(list.data[0].id, list.firstId);

          const cancel = await client.threadRuns.cancelRun(thread.id, run.id);
          assert.equal(cancel.id, run.id);
          assert.equal(cancel.threadId, thread.id);
          assert.equal(cancel.assistantId, assistant.id);
          assert.equal(cancel.instructions, instructions);
          assert.equal(cancel.status, "cancelling");

          const getRun = await client.threadRuns.retrieveRun(thread.id, run.id);
          assert.equal(getRun.id, run.id);
          assert.equal(getRun.threadId, thread.id);
          assert.equal(getRun.assistantId, assistant.id);
          assert.equal(getRun.instructions, instructions);
          assert.equal(getRun.metadata?.foo, metadataValue);

          const deleteThreadResponse = await client.assistantThreads.deleteThread(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.assistants.deleteAssistant(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
      });
      describe("user scenarios", function () {
        it("create and run code interpreter scenario", async function () {
          const assistant = await client.assistants.createAssistant(codeAssistant);
          assertAssistantEquality(codeAssistant, assistant);
          const thread = await client.assistantThreads.createThread({});
          assert.isNotNull(thread.id);
          const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
          const role = "user";
          const message = await client.threadMessages.createMessage(thread.id, role, question);
          assert.isNotNull(message.id);
          assert.equal(message.role, role);
          assert.equal(message.content[0].text?.value, question);

          const instructions =
            "Please address the user as Jane Doe. The user has a premium account.";
          let run = await client.threadRuns.createRun(thread.id, assistant.id, { instructions });
          assert.isNotNull(run.id);
          assert.equal(run.threadId, thread.id);
          assert.equal(run.assistantId, assistant.id);
          assert.equal(run.instructions, instructions);

          do {
            await new Promise((r) => setTimeout(r, 500));
            run = await client.threadRuns.retrieveRun(thread.id, run.id);
            const listLength = 1;
            const runSteps = await client.runSteps.listRunSteps(thread.id, run.id, {
              limit: listLength,
            });
            if (runSteps.data.length > 0) {
              const runStep = runSteps.data[0];
              assert.isNotNull(runStep.id);
              assert.equal(runSteps.data.length, listLength);

              const runMessage = await client.runSteps.retrieveRunStep(
                thread.id,
                run.id,
                runStep.id
              );
              assert.equal(runStep.id, runMessage.id);
              assert.equal(runMessage.runId, run.id);
              assert.equal(runMessage.threadId, thread.id);
              assert.equal(runMessage.assistantId, assistant.id);
            }
          } while (run.status === "queued" || run.status === "in_progress");
          assert.equal(run.status, "completed");

          const runMessages = await client.threadMessages.listMessages(thread.id);
          for (const runMessageDatum of runMessages.data) {
            for (const item of runMessageDatum.content) {
              assert.equal(item.type, "text");
              assert.isNotEmpty(item.text?.value);
            }
          }
          const deleteThreadResponse = await client.assistantThreads.deleteThread(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.assistants.deleteAssistant(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
        it("create and run function scenario for weather bot", async function () {
          const favoriteCityFunctionName = "getUserFavoriteCity";
          const favoriteCityFunctionDescription = "Gets the user's favorite city.";
          const getFavoriteCity = () => "Atlanta, GA";
          const getUserFavoriteCityTool = {
            type: "function",
            function: {
              name: favoriteCityFunctionName,
              description: favoriteCityFunctionDescription,
              parameters: {
                type: "object",
                properties: {},
              },
            },
          };

          const getCityNickname = (city: string) => {
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
            type: "function",
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

          const getWeatherAtLocation = (location: string, temperatureUnit = "f") => {
            switch (location) {
              case "Atlanta, GA":
                return temperatureUnit === "f" ? "84f" : "26c";
              case "Seattle, WA":
                return temperatureUnit === "f" ? "70f" : "21c";
              case "Los Angeles, CA":
                return temperatureUnit === "f" ? "90f" : "28c";
              default:
                return "Unknown";
            }
          };
          const getWeatherFunctionName = "getWeatherAtLocation";
          const getWeatherFunctionDescription = "Gets the current weather at a provided location.";
          const getWeatherAtLocationTool = {
            type: "function",
            function: {
              name: getWeatherFunctionName,
              description: getWeatherFunctionDescription,
              parameters: {
                type: "object",
                properties: {
                  location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                  },
                  temperatureUnit: {
                    type: "string",
                    enum: ["f", "c"],
                  },
                },
                required: ["location"],
              },
            },
          };

          let favoriteCityCalled = false;
          let nicknameCalled = false;
          let weatherCalled = false;
          const getResolvedToolOutput = (toolCall: {
            id: string;
            function?: any;
          }): { output: string } => {
            const toolOutput = { toolCallId: toolCall.id, output: "" };
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
                case getWeatherFunctionName:
                  toolOutput.output = getWeatherAtLocation(
                    functionArgs.location,
                    functionArgs.temperatureUnit
                  );
                  weatherCalled = true;
                  break;
                default:
                  toolOutput.output = `Unknown function: ${functionName}`;
                  break;
              }
            }

            return toolOutput;
          };

          const instructions = `You are a weather bot. Use the provided functions to help answer questions.
              Customize your responses to the user's preferences as much as possible and use friendly
              nicknames for cities whenever possible.
          `;
          const functionAssistant = {
            model: "gpt-4-1106-preview",
            name: "JS SDK Test Assistant - Weather",
            instructions,
            tools: [getUserFavoriteCityTool, getCityNicknameTool, getWeatherAtLocationTool],
          };
          const assistant = await client.assistants.createAssistant(functionAssistant);
          assert.isNotNull(assistant.id);
          const thread = await client.assistantThreads.createThread({});
          assert.isNotNull(thread.id);
          const content = "What's the weather like right now in my favorite city?";
          const role = "user";
          const message = await client.threadMessages.createMessage(thread.id, role, content);
          assert.isNotNull(message.id);
          assert.equal(message.threadId, thread.id);
          let run = await client.threadRuns.createRun(thread.id, assistant.id, {
            tools: [getUserFavoriteCityTool, getCityNicknameTool, getWeatherAtLocationTool],
          });
          const runId = run.id;
          assert.isNotNull(runId);

          do {
            await new Promise((r) => setTimeout(r, 500));
            run = await client.threadRuns.retrieveRun(thread.id, run.id);
            assert.equal(run.id, runId);
            assert.equal(run.threadId, thread.id);
            assert.equal(run.assistantId, assistant.id);
            assert.equal(run.instructions, instructions);

            if (
              run.status === "requires_action" &&
              run.requiredAction?.type === "submit_tool_outputs"
            ) {
              const toolOutputs = [];

              assert.notEqual(run.requiredAction?.submitToolOutputs?.toolCalls, undefined);
              if (run.requiredAction?.submitToolOutputs?.toolCalls !== undefined) {
                for (const toolCall of run.requiredAction.submitToolOutputs.toolCalls) {
                  toolOutputs.push(getResolvedToolOutput(toolCall));
                }
              }
              run = await client.threadRuns.submitRunToolOutputs(thread.id, run.id, toolOutputs);
            }
          } while (run.status === "queued" || run.status === "in_progress");

          assert.equal(favoriteCityCalled, true);
          assert.equal(nicknameCalled, true);
          assert.equal(weatherCalled, true);

          const runMessages = await client.threadMessages.listMessages(thread.id);
          for (const runMessageDatum of runMessages.data) {
            for (const item of runMessageDatum.content) {
              assert.equal(item.type, "text");
              assert.isNotEmpty(item.text?.value);
            }
          }

          const deleteThreadResponse = await client.assistantThreads.deleteThread(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.assistants.deleteAssistant(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
      });
    });
  });
});
