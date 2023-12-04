// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
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
        it("creates an assistant", async function () {
          const model = "gpt-4-1106-preview";
          const assistantResponse = await client.createAssistant({
            model,
            name: "JS Math Tutor",
            instructions: "You are a personal math tutor. Write and run code to answer math questions.",
            tools: [{ type: "code_interpreter" }]
          });
          assert.equal(assistantResponse.model, model);
        });
      });
    });
  });
});
