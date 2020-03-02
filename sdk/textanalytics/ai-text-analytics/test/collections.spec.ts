// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { makeAnalyzeSentimentResultCollection } from "../src/analyzeSentimentResultCollection";
import { makeDetectLanguageResultCollection } from "../src/detectLanguageResultCollection";
import { makeExtractKeyPhrasesResultCollection } from "../src/extractKeyPhrasesResultCollection";
import { makeRecognizeLinkedEntitiesResultCollection } from "../src/recognizeLinkedEntitiesResultCollection";
import { makeRecognizeCategorizedEntitiesResultCollection } from "../src/recognizeCategorizedEntitiesResultCollection";
import { LanguageInput, MultiLanguageInput } from "../src/generated/models";
import { makeRecognizePiiEntitiesResultCollection } from "../src/recognizePiiEntitiesResultCollection";

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
          sentenceSentiments: [],
          sentiment: "positive"
        },
        {
          id: "C",
          documentScores: {
            positive: 0,
            negative: 1,
            neutral: 0
          },
          sentenceSentiments: [],
          sentiment: "negative"
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
          keyPhrases: ["test", "test2"]
        },
        {
          id: "C",
          keyPhrases: ["awesome"]
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
              score: 0.9989
            }
          ]
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
              score: 0.8
            }
          ]
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

describe("RecognizePiiEntitiesResultCollection", () => {
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
    const result = makeRecognizePiiEntitiesResultCollection(
      input,
      [
        {
          id: "A",
          entities: [
            {
              text: "(555) 555-5555",
              category: "US Phone Number",
              graphemeOffset: 10,
              graphemeLength: 9,
              score: 0.9989
            }
          ]
        },
        {
          id: "C",
          entities: [
            {
              text: "1234 Default Ln.",
              category: "US Address",
              subCategory: "",
              graphemeOffset: 34,
              graphemeLength: 9,
              score: 0.8
            }
          ]
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
                  score: 0.15046201222847677
                }
              ],
              language: "en",
              dataSourceEntityId: "Seattle",
              url: "https://en.wikipedia.org/wiki/Seattle",
              dataSource: "Wikipedia"
            }
          ]
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
                  score: 0.1869365971673207
                }
              ],
              language: "en",
              dataSourceEntityId: "Microsoft",
              url: "https://en.wikipedia.org/wiki/Microsoft",
              dataSource: "Wikipedia"
            }
          ]
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
