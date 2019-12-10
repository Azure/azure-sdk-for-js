// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { makeAnalyzeSentimentResultCollection } from "../src/analyzeSentimentResultCollection";

describe("SentimentResultCollection gets ordered by input", () => {
  it("merges items in order", () => {
    const input = [
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
