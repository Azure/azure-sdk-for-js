// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, matrix } from "@azure-tools/test-utils";
import { AuthMethod } from "./utils/types.js";
import OpenAI from "openai";
import { CodeInterpreterTool } from "openai/resources/beta/assistants.mjs";

describe("OpenAIAssistants", () => {
  const authTypes = ["OpenAIKey"] as AuthMethod[];

  matrix([authTypes] as const, async function (authMethod: AuthMethod) {
    let client: OpenAI;
    const codeAssistant = {
      tools: [{ type: "code_interpreter" } as CodeInterpreterTool],
      model: "gpt-4-1106-preview",
      name: "JS CI Math Tutor",
      description: "Math Tutor for Math Problems",
      instructions: "You are a personal math tutor. Write and run code to answer math questions.",
      metadata: { foo: "bar" },
    };
    describe(`[${authMethod}] Client`, () => {
      it("all CRUD APIs", async function () {
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
        assert.equal(oneAssistantList.fir, oneAssistantList.lastId);
        assert.equal(oneAssistantList.firstId, oneAssistantList.lastId);
        assert.equal(oneAssistantList.data[0].id, oneAssistantList.firstId);

        const deleteAssistantResponse = await client.deleteAssistant(assistantResponse.id);
        assert.equal(deleteAssistantResponse.deleted, true);
      });
    });
  });
});
function assertAssistantEquality(
  codeAssistant: {
    tools: OpenAI.Beta.Assistants.CodeInterpreterTool[];
    model: string;
    name: string;
    description: string;
    instructions: string;
    metadata: { foo: string };
  },
  assistantResponse: OpenAI.Beta.Assistants.Assistant,
) {
  throw new Error("Function not implemented.");
}
