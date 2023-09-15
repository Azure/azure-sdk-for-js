// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { getChatCompletionsResult, getCompletionsResult } from "../../src/api/deserializers.js";

describe("deserializers", () => {
  describe("getCompletionsResult", () => {
    it("should deserialize completions response", () => {
      const body = {
        id: "123",
        created: "2022-01-01T00:00:00.000Z",
        prompt_annotations: [
          {
            prompt_index: 0,
            content_filter_results: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              self_harm: {
                severity: "low",
                filtered: false,
              },
            },
          },
        ],
        choices: [
          {
            text: "Hello",
            index: 0,
            content_filter_results: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              self_harm: {
                severity: "low",
                filtered: false,
              },
            },
            logprobs: {
              tokens: ["Hello", "there", "!"],
              token_logprobs: [-0.1, -0.2, -0.3],
              top_logprobs: [
                {
                  "1": -0.1,
                },
              ],
              text_offset: [0, 6, 11],
            },
            finish_reason: "stop",
          },
        ],
      };

      const result = getCompletionsResult(body);

      assert.deepStrictEqual(result, {
        id: "123",
        created: new Date("2022-01-01T00:00:00.000Z"),
        promptFilterResults: [
          {
            promptIndex: 0,
            contentFilterResults: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              selfHarm: {
                severity: "low",
                filtered: false,
              },
            },
          },
        ],
        choices: [
          {
            text: "Hello",
            index: 0,
            contentFilterResults: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              selfHarm: {
                severity: "low",
                filtered: false,
              },
            },
            logprobs: {
              tokens: ["Hello", "there", "!"],
              tokenLogprobs: [-0.1, -0.2, -0.3],
              topLogprobs: [
                {
                  "1": -0.1,
                },
              ],
              textOffset: [0, 6, 11],
            },
            finishReason: "stop",
          },
        ],
      });
    });
  });
  describe("getChatCompletionsResult", () => {
    it("should deserialize chat completions result", () => {
      const body = {
        id: "123",
        created: "2022-01-01T00:00:00.000Z",
        prompt_annotations: [
          {
            prompt_index: 0,
            content_filter_results: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              self_harm: {
                severity: "low",
                filtered: false,
              },
            },
          },
        ],
        choices: [
          {
            message: {
              role: "bot",
              content: "Hello",
            },
            index: 0,
            finish_reason: "stop",
            content_filter_results: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              self_harm: {
                severity: "low",
                filtered: false,
              },
            },
          },
        ],
        usage: { completion_tokens: 135, prompt_tokens: 68, total_tokens: 203 },
      };

      const result = getChatCompletionsResult(body);

      assert.deepStrictEqual(result, {
        id: "123",
        created: new Date("2022-01-01T00:00:00.000Z"),
        promptFilterResults: [
          {
            promptIndex: 0,
            contentFilterResults: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              selfHarm: {
                severity: "low",
                filtered: false,
              },
            },
          },
        ],
        choices: [
          {
            message: {
              role: "bot",
              content: "Hello",
            },
            index: 0,
            finishReason: "stop",
            contentFilterResults: {
              sexual: {
                severity: "low",
                filtered: false,
              },
              violence: {
                severity: "low",
                filtered: false,
              },
              hate: {
                severity: "low",
                filtered: false,
              },
              selfHarm: {
                severity: "low",
                filtered: false,
              },
            },
          },
        ],
        usage: { completionTokens: 135, promptTokens: 68, totalTokens: 203 },
      });
    });

    it("should deserialize error in content filter", () => {
      const body = {
        id: "123",
        created: "2022-01-01T00:00:00.000Z",
        prompt_annotations: [
          {
            prompt_index: 0,
            content_filter_results: {
              error: {
                code: "content_filter_error",
                message: "The contents are not filtered",
              },
            },
          },
        ],
        choices: [
          {
            message: {
              role: "bot",
              content: "Hello",
            },
            index: 0,
            finish_reason: "stop",
            content_filter_results: {
              error: {
                code: "content_filter_error",
                message: "The contents are not filtered",
              },
            },
          },
        ],
        usage: { completion_tokens: 135, prompt_tokens: 68, total_tokens: 203 },
      };

      const result = getChatCompletionsResult(body);

      assert.deepStrictEqual(result, {
        id: "123",
        created: new Date("2022-01-01T00:00:00.000Z"),
        promptFilterResults: [
          {
            promptIndex: 0,
            contentFilterResults: {
              error: {
                code: "content_filter_error",
                message: "The contents are not filtered",
                details: [],
              },
            },
          },
        ],
        choices: [
          {
            message: {
              role: "bot",
              content: "Hello",
            },
            index: 0,
            finishReason: "stop",
            contentFilterResults: {
              error: {
                code: "content_filter_error",
                message: "The contents are not filtered",
                details: [],
              },
            },
          },
        ],
        usage: { completionTokens: 135, promptTokens: 68, totalTokens: 203 },
      });
    });
  });
});
