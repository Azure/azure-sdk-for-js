// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { createClient } from "../utils/createClient";
import { AuthMethod } from "../utils/types";
import OpenAI from "openai";

describe("Completions", function () {
  matrix([["OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAI;
      let modelName: string;

      beforeEach(async function (this: Context) {
        client = createClient();
        modelName = "gpt-3.5-turbo-1106";
      });

      describe("Completions", function () {
        it("Comletions test", async function () {
          const completions = await client.chat.completions.create({
            model: modelName,
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
