// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient } from "./utils/createClient.js";
import { AuthMethod } from "./utils/types.js";
import OpenAI from "openai";

describe("Completions", function () {
  matrix([["OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAI;

      beforeEach(async function (this: Context) {
        client = createClient("completions");
      });

      describe("Completions", function () {
        it("Comletions test", async function () {
          const completions = await client.chat.completions.create({
            model: "",
            messages: [{ role: "system", content: "You are a helpful assistant." }],
          });
          assertChatCompletions(completions);
        });
      });
    });
  });
});

function assertChatCompletions(completions: OpenAI.Chat.Completions.ChatCompletion): void {
  if (completions.choices.length > 0) {
    assert.isArray(completions.choices);
    assert.isNotEmpty(completions.choices);
    // Iterate through choice and assert each choice
    completions.choices.forEach((choice) => {
      assert.isNumber(choice.index);
      ifDefined(choice.finish_reason, assert.isString);
      assert.isDefined(choice.message.role);
    });
  }
}

function ifDefined(
  val: any,
  validate: (x: any) => void,
  { defined }: { defined?: boolean } = {},
): void {
  if (val !== undefined && val !== null) {
    validate(val);
  } else if (defined) {
    throw new Error("Expected value to be defined");
  }
}
