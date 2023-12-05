// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { assertAssistantEquality } from "./utils/asserts.js";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient.js";
import { getModels } from "./utils/utils.js";
import { Context } from "mocha";
import { AssistantsClient } from "../../src/assistantsClient.js";

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

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, { recorder });
      });

      describe("createAssistant", function () {
        it("creates, retrieves, lists, modifies, and deletes an assistant", async function () {
          const codeAssistant = {
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4-1106-preview",
            name: "JS Math Tutor",
            description: "Math Tutor for Math Problems",
            instructions: "You are a personal math tutor. Write and run code to answer math questions.",
            metadata: { "foo": "bar" },
          };

          const assistantResponse = await client.createAssistant(codeAssistant);
          assertAssistantEquality(codeAssistant, assistantResponse);
          const getAssistantResponse = await client.retrieveAssistant(assistantResponse.id);
          assertAssistantEquality(codeAssistant, getAssistantResponse);
          codeAssistant.name = "Completely different name";
          const modifyAssistantResponse = await client.modifyAssistant(assistantResponse.id, codeAssistant);
          assertAssistantEquality(codeAssistant, modifyAssistantResponse);
          const listLength = 1;
          const oneAssistantList = await client.listAssistants({ limit: listLength });
          assert.equal(oneAssistantList.data.length, listLength);
          assert.equal(oneAssistantList.firstId, oneAssistantList.lastId);
          assert.equal(oneAssistantList.firstId, oneAssistantList.lastId);
          assert.equal(oneAssistantList.data[0].id, oneAssistantList.firstId);
          const deleteAssistantResponse = await client.deleteAssistant(assistantResponse.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
      });
    });
  });
});
