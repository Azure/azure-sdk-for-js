// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it, assert, beforeAll } from "vitest";
import { createClient } from "./utils/createClient.js";
import { APIVersion, type DeploymentInfo, getDeployments, withDeployments } from "./utils/utils.js";
import type { OpenAI, AzureOpenAI } from "openai";
import { ttsModelsToSkip } from "./utils/models.js";

describe("OpenAI", function () {
  let deployments: DeploymentInfo[] = [];

  beforeAll(async function () {
    deployments = await getDeployments("audio");
  });

  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function () {
        client = createClient(apiVersion, "audio");
      });

      describe("textToSpeech", function () {
        it("returns speech based on text input", async function () {
          await withDeployments(
            deployments,
            (deployment) =>
              client.audio.speech.create({
                model: deployment,
                input: "Hello, it is a great day. How are you doing today? ",
                voice: "shimmer",
              }),
            async (audio) => {
              const buffer = await audio.arrayBuffer();
              assert.isNotNull(buffer);
            },
            // Skip Whisper model for text to speech test because of server unexpected response error
            ttsModelsToSkip,
          );
        });
      });
    });
  });
});
