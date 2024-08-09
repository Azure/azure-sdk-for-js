// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, beforeEach, it } from "vitest";
import { matrix } from "@azure-tools/test-utils";
import OpenAI, { AzureOpenAI } from "openai";
import { createClient } from "./utils/createClient.js";
import { APIMatrix, APIVersion } from "./utils/utils.js";

describe("AbortSignal", () => {
  let client: AzureOpenAI | OpenAI;

  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    beforeEach(async function () {
      client = createClient(apiVersion, "completions");
    });

    // TODO: Fix the tests for client.chat.completions.create
    it("Abort signal test for streaming method", async function () {
      const messages = [
        {
          role: "system",
          content: "You are a helpful assistant. You will talk like a pirate.",
        } as const,
        { role: "user", content: "Can you help me?" } as const,
        {
          role: "assistant",
          content: "Arrrr! Of course, me hearty! What can I do for ye?",
        } as const,
        { role: "user", content: "What's the best way to train a parrot?" } as const,
      ];

      const deploymentName = "gpt-35-turbo";
      let currentMessage = "";
      try {
        const events = client.beta.chat.completions.stream({
          model: deploymentName,
          messages,
          stream: true,
          max_tokens: 800,
          temperature: 0.7,
          presence_penalty: 0,
          frequency_penalty: 0,
        });
        for await (const event of events) {
          assert.isDefined(event);
          events.abort();
        }
        assert.isDefined(currentMessage);
        assert.fail("Expected to abort streaming");
      } catch (error: any) {
        assert.isTrue(error.message.includes("aborted"));
      }
    });
  });
});
