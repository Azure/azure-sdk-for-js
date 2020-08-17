// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { makeAnalyzeSentimentResultArray } from "../src/analyzeSentimentResultArray";
import { makeDetectLanguageResultArray } from "../src/detectLanguageResultArray";
import { makeExtractKeyPhrasesResultArray } from "../src/extractKeyPhrasesResultArray";
import { makeRecognizeLinkedEntitiesResultArray } from "../src/recognizeLinkedEntitiesResultArray";
import { makeRecognizeCategorizedEntitiesResultArray } from "../src/recognizeCategorizedEntitiesResultArray";
import { DetectLanguageInput, TextDocumentInput } from "../src/generated/models";
import { makeRecognizePiiEntitiesResultArray } from "../src/recognizePiiEntitiesResultArray";

describe("SentimentResultArray", () => {
  it("merges items in order", () => {
    const input: TextDocumentInput[] = [
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
    const result = makeAnalyzeSentimentResultArray(input, {
      documents: [
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
      errors: [
        {
          id: "B",
          error: {
            code: "InternalServerError",
            message: "test error"
          }
        }
      ],
      _response: {} as any,
      modelVersion: ""
    });

    const inputOrder = input.map((item) => item.id);
    const outputOrder = result.map((item) => item.id);
    assert.deepEqual(inputOrder, outputOrder);
  });
});

describe("DetectLanguageResultArray", () => {
  it("merges items in order", () => {
    const input: DetectLanguageInput[] = [
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
    const result = makeDetectLanguageResultArray(
      input,
      [
        {
          id: "A",
          detectedLanguage: {
            name: "English",
            iso6391Name: "en",
            confidenceScore: 1
          },
          warnings: []
        },
        {
          id: "C",
          detectedLanguage: {
            name: "French",
            iso6391Name: "fr",
            confidenceScore: 1
          },
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

describe("ExtractKeyPhrasesResultArray", () => {
  it("merges items in order", () => {
    const input: TextDocumentInput[] = [
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
    const result = makeExtractKeyPhrasesResultArray(
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

describe("RecognizeCategorizedEntitiesResultArray", () => {
  it("merges items in order", () => {
    const input: TextDocumentInput[] = [
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
    const result = makeRecognizeCategorizedEntitiesResultArray(
      input,
      [
        {
          id: "A",
          entities: [
            {
              text: "Microsoft",
              category: "Organization",
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

describe("RecognizeLinkedEntitiesResultArray", () => {
  it("merges items in order", () => {
    const input: TextDocumentInput[] = [
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
    const result = makeRecognizeLinkedEntitiesResultArray(
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

  describe("RecognizePiiEntitiesResultArray", () => {
    it("merges items in order", () => {
      const input: TextDocumentInput[] = [
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
      const result = makeRecognizePiiEntitiesResultArray(input, {
        documents: [
          {
            id: "A",
            entities: [
              {
                text: "(555) 555-5555",
                category: "US Phone Number",
                confidenceScore: 0.9989
              }
            ],
            warnings: []
          },
          {
            id: "C",
            entities: [
              {
                text: "1234 Default Ln.",
                category: "US Address",
                subCategory: "",
                confidenceScore: 0.8
              }
            ],
            warnings: []
          }
        ],
        errors: [
          {
            id: "B",
            error: {
              code: "InternalServerError",
              message: "test error"
            }
          }
        ],
        modelVersion: "",
        _response: {} as any
      });

      const inputOrder = input.map((item) => item.id);
      const outputOrder = result.map((item) => item.id);
      assert.deepEqual(inputOrder, outputOrder);
    });
  });
});
