// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { afterEach, assert, beforeEach, it, describe } from "vitest";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type OpenAI from "openai";
import type { AIProjectClient } from "../../../src/index.js";

const calendarEventSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    date: {
      type: "string",
      description: "Date in YYYY-MM-DD format",
    },
    participants: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["name", "date", "participants"],
  additionalProperties: false,
};

describe("responses - structured output", () => {
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;
  let recorder: Recorder;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create response with structured output using JSON schema", async function () {
    const response = await openAIClient.responses.create({
      model: "gpt-5.2",
      instructions:
        "Extracts calendar event information from the input messages, and return it in the desired structured output format.",
      text: {
        format: {
          type: "json_schema",
          name: "CalendarEvent",
          schema: calendarEventSchema,
        },
      },
      input: "Alice and Bob are going to a science fair this Friday, November 7, 2025.",
    });

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(`Response output: ${response.output_text}`);

    // Validate the response is valid JSON matching the schema
    const parsed = JSON.parse(response.output_text);
    assert.isString(parsed.name, "Expected 'name' to be a string");
    assert.isString(parsed.date, "Expected 'date' to be a string");
    assert.isArray(parsed.participants, "Expected 'participants' to be an array");
  }, 60000);
});
