// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { makeAnalyzeSentimentResultCollection } from "../src/analyzeSentimentResultCollection";
import { makeDetectLanguageResultCollection } from "../src/detectLanguageResultCollection";
import { makeExtractKeyPhrasesResultCollection } from "../src/extractKeyPhrasesResultCollection";
import { makeRecognizeLinkedEntitiesResultCollection } from "../src/recognizeLinkedEntitiesResultCollection";
import { makeRecognizeCategorizedEntitiesResultCollection } from "../src/recognizeCategorizedEntitiesResultCollection";
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
          confidenceScores: {
            positive: 1,
            negative: 0,
            neutral: 0
          },
          sentenceSentiments: [],
          sentiment: "positive",
          warnings: []
        },
        {
          id: "C",
          confidenceScores: {
            positive: 0,
            negative: 1,
            neutral: 0
          },
          sentenceSentiments: [],
          sentiment: "negative",
          warnings: []
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "InternalServerError",
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
              confidenceScore: 1
            }
          ],
          warnings: []
        },
        {
          id: "C",
          detectedLanguages: [
            {
              name: "French",
              iso6391Name: "fr",
              confidenceScore: 1
            },
            {
              name: "English",
              iso6391Name: "en",
              confidenceScore: 0.5
            }
          ],
          warnings: []
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "InternalServerError",
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

describe("ExtractKeyPhrasesResultCollection", () => {
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
    const result = makeExtractKeyPhrasesResultCollection(
      input,
      [
        {
          id: "A",
          keyPhrases: ["test", "test2"],
          warnings: []
        },
        {
          id: "C",
          keyPhrases: ["awesome"],
          warnings: []
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "InternalServerError",
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

describe("RecognizeCategorizedEntitiesResultCollection", () => {
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
    const result = makeRecognizeCategorizedEntitiesResultCollection(
      input,
      [
        {
          id: "A",
          entities: [
            {
              text: "Microsoft",
              category: "Organization",
              graphemeOffset: 10,
              graphemeLength: 9,
              confidenceScore: 0.9989
            }
          ],
          warnings: []
        },
        {
          id: "C",
          entities: [
            {
              text: "last week",
              category: "DateTime",
              subCategory: "DateRange",
              graphemeOffset: 34,
              graphemeLength: 9,
              confidenceScore: 0.8
            }
          ],
          warnings: []
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "InternalServerError",
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

describe("RecognizeLinkedEntitiesResultCollection", () => {
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
    const result = makeRecognizeLinkedEntitiesResultCollection(
      input,
      [
        {
          id: "A",
          entities: [
            {
              name: "Seattle",
              matches: [
                {
                  text: "Seattle",
                  graphemeOffset: 26,
                  graphemeLength: 7,
                  confidenceScore: 0.15046201222847677
                }
              ],
              language: "en",
              dataSourceEntityId: "Seattle",
              url: "https://en.wikipedia.org/wiki/Seattle",
              dataSource: "Wikipedia"
            }
          ],
          warnings: []
        },
        {
          id: "C",
          entities: [
            {
              name: "Microsoft",
              matches: [
                {
                  text: "Microsoft",
                  graphemeOffset: 10,
                  graphemeLength: 9,
                  confidenceScore: 0.1869365971673207
                }
              ],
              language: "en",
              dataSourceEntityId: "Microsoft",
              url: "https://en.wikipedia.org/wiki/Microsoft",
              dataSource: "Wikipedia"
            }
          ],
          warnings: []
        }
      ],
      [
        {
          id: "B",
          error: {
            code: "InternalServerError",
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
