// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { Assistant, AssistantCreationOptions } from "../../../src/index.js";

export function assertAssistantEquality(
  assistant: AssistantCreationOptions,
  response: Assistant,
): void {
  assert.isNotNull(response);
  assert.equal(response.model, assistant.model);
  assert.equal(response.name, assistant.name);
  assert.equal(response.instructions, assistant.instructions);
  assert.equal(response.description, assistant.description);
  assert.equal(response.metadata?.foo, "bar");
  assert.isNotNull(response.tools[0]);
  const tools = assistant.tools || [];
  assert.equal(response.tools[0].type, tools[0].type);
}
