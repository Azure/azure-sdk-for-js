// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { makeAnalyzeSentimentResultCollection } from "../src/analyzeSentimentResultCollection";
import { makeDetectLanguageResultCollection } from "../src/detectLanguageResultCollection";
import { LanguageInput, MultiLanguageInput } from "../src/generated/models";

describe("SentimentResultCollection", () => {
  it("merges items in order", () => {
    const input: MultiLanguageInput[] = [
      {
        id: "A",
        text: "test"
      },
      {
        id: "B",
        text: "test2"
      },
      {
        id: "C",
        text: "test3"
      }
    ];
    const result = makeAnalyzeSentimentResultCollection(
      input,
      [
        {
          id: "A",
          documentScores: {
            positive: 1,
            negative: 0,
            neutral: 0
          },
          sentences: [],
          sentiment: "positive"
        },
        {
          id: "C",
          documentScores: {
            positive: 0,
            negative: 1,
            neutral: 0
          },
          sentences: [],
          sentiment: "negative"
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "internalServerError",
            message: "test error"
          }
        }
      ],
      ""
    );

    const inputOrder = input.map((item) => item.id);
    const outputOrder = result.map((item) => item.id);
    assert.deepEqual(inputOrder, outputOrder);
  });
});

describe("DetectLanguageResultCollection", () => {
  it("merges items in order", () => {
    const input: LanguageInput[] = [
      {
        id: "A",
        text: "test"
      },
      {
        id: "B",
        text: "test2"
      },
      {
        id: "C",
        text: "test3"
      }
    ];
    const result = makeDetectLanguageResultCollection(
      input,
      [
        {
          id: "A",
          detectedLanguages: [
            {
              name: "English",
              iso6391Name: "en",
              score: 1
            }
          ]
        },
        {
          id: "C",
          detectedLanguages: [
            {
              name: "French",
              iso6391Name: "fr",
              score: 1
            },
            {
              name: "English",
              iso6391Name: "en",
              score: 0.5
            }
          ]
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "internalServerError",
            message: "test error"
          }
        }
      ],
      ""
    );

    const inputOrder = input.map((item) => item.id);
    const outputOrder = result.map((item) => item.id);
    assert.deepEqual(inputOrder, outputOrder);
  });
});
