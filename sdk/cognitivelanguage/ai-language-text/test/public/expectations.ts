// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AnalyzeBatchResult } from "../../src/";

const modelVersion = undefined as any;
const completedOn = undefined as any;
const deploymentName = undefined as any;
const projectName = undefined as any;

export const expectation1: AnalyzeBatchResult[] = [
  {
    kind: "CustomEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        entities: [
          {
            text: "Government",
            category: "restaurant_name",
            offset: 23,
            length: 10,
            confidenceScore: 0.05,
          },
          {
            text: "Accountability",
            category: "geographic_poi",
            offset: 34,
            length: 14,
            confidenceScore: 0.07,
          },
          {
            text: "Office",
            category: "restaurant_name",
            offset: 49,
            length: 6,
            confidenceScore: 0.11,
          },
          {
            text: "GAO",
            category: "restaurant_name",
            offset: 57,
            length: 3,
            confidenceScore: 0.04,
          },
          { text: "dramatic", category: "sort", offset: 77, length: 8, confidenceScore: 0.03 },
          {
            text: "oil",
            category: "restaurant_type",
            offset: 98,
            length: 3,
            confidenceScore: 0.03,
          },
          { text: "and", category: "served_dish", offset: 102, length: 3, confidenceScore: 0.07 },
          {
            text: "natural",
            category: "geographic_poi",
            offset: 106,
            length: 7,
            confidenceScore: 0.04,
          },
          {
            text: "gas",
            category: "restaurant_type",
            offset: 114,
            length: 3,
            confidenceScore: 0.09,
          },
          {
            text: "development",
            category: "object_type",
            offset: 118,
            length: 11,
            confidenceScore: 0.06,
          },
          { text: "federal", category: "state", offset: 133, length: 7, confidenceScore: 0.07 },
          { text: "lands", category: "poi", offset: 141, length: 5, confidenceScore: 0.04 },
          { text: "the", category: "timeRange", offset: 152, length: 3, confidenceScore: 0.24 },
          {
            text: "past six years",
            category: "timeRange",
            offset: 156,
            length: 14,
            confidenceScore: 0.54,
          },
          { text: "BLM", category: "poi", offset: 202, length: 3, confidenceScore: 0.07 },
          { text: "protection", category: "state", offset: 267, length: 10, confidenceScore: 0.05 },
        ],
      },
    ],
    completedOn,
    deploymentName,
    projectName,
  },
];

export const expectation2: AnalyzeBatchResult[] = [
  {
    kind: "CustomSingleLabelClassification",
    results: [
      {
        id: "0",
        warnings: [],
        classifications: [{ category: "RateBook", confidenceScore: 0.76 }],
      },
    ],
    deploymentName,
    projectName,
    completedOn,
  },
];

export const expectation3: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      {
        id: "1",
        warnings: [],
        entities: [
          {
            text: "Microsoft",
            category: "Organization",
            offset: 0,
            length: 9,
            confidenceScore: 1,
          },
          {
            text: "Bill Gates",
            category: "Person",
            offset: 25,
            length: 10,
            confidenceScore: 1,
          },
          {
            text: "Paul Allen",
            category: "Person",
            offset: 40,
            length: 10,
            confidenceScore: 1,
          },
        ],
      },
      {
        id: "2",
        warnings: [],
        entities: [
          {
            text: "Microsoft",
            category: "Organization",
            offset: 0,
            length: 9,
            confidenceScore: 1,
          },
          {
            text: "Bill Gates",
            category: "Person",
            offset: 26,
            length: 10,
            confidenceScore: 1,
          },
          {
            text: "Paul Allen",
            category: "Person",
            offset: 39,
            length: 10,
            confidenceScore: 0.99,
          },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation4: AnalyzeBatchResult[] = [
  {
    kind: "CustomMultiLabelClassification",
    results: [{ id: "0", warnings: [], classifications: [] }],
    deploymentName,
    projectName,
    completedOn,
  },
];

export const expectation5: AnalyzeBatchResult[] = [
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "1", warnings: [], keyPhrases: ["Bill Gates", "Paul Allen", "Microsoft"] },
      { id: "2", warnings: [], keyPhrases: ["Bill Gates", "Paul Allen", "Microsoft"] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation6: AnalyzeBatchResult[] = [
  {
    kind: "EntityLinking",
    results: [
      {
        id: "0",
        warnings: [],
        entities: [
          {
            name: "Microsoft",
            matches: [{ confidenceScore: 0.39, text: "Microsoft", offset: 0, length: 9 }],
            language: "en",
            dataSourceEntityId: "Microsoft",
            url: "https://en.wikipedia.org/wiki/Microsoft",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "a093e9b9-90f5-a3d5-c4b8-5855e1b01f85",
          },
          {
            name: "Bellevue, Washington",
            matches: [
              {
                confidenceScore: 0.87,
                text: "Bellevue, Washington",
                offset: 36,
                length: 20,
              },
            ],
            language: "en",
            dataSourceEntityId: "Bellevue, Washington",
            url: "https://en.wikipedia.org/wiki/Bellevue,_Washington",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "a2e3a3eb-b83e-42f0-bf19-95b4c4c9d3c0",
          },
          {
            name: "Briann January",
            matches: [{ confidenceScore: 0.14, text: "January", offset: 60, length: 7 }],
            language: "en",
            dataSourceEntityId: "Briann January",
            url: "https://en.wikipedia.org/wiki/Briann_January",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "19fb6fb4-3c50-f314-30e4-7b5470e08274",
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        entities: [
          {
            name: "Steve Ballmer",
            matches: [{ confidenceScore: 0.92, text: "Steve Ballmer", offset: 0, length: 13 }],
            language: "en",
            dataSourceEntityId: "Steve Ballmer",
            url: "https://en.wikipedia.org/wiki/Steve_Ballmer",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "56ff0719-4791-406b-99de-0e99c3e8cefc",
          },
          {
            name: "Chief executive officer",
            matches: [{ confidenceScore: 0.25, text: "CEO", offset: 30, length: 3 }],
            language: "en",
            dataSourceEntityId: "Chief executive officer",
            url: "https://en.wikipedia.org/wiki/Chief_executive_officer",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "cf5db860-9fd2-390d-0b6d-5ba856efed49",
          },
          {
            name: "Microsoft",
            matches: [{ confidenceScore: 0.36, text: "Microsoft", offset: 37, length: 9 }],
            language: "en",
            dataSourceEntityId: "Microsoft",
            url: "https://en.wikipedia.org/wiki/Microsoft",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "a093e9b9-90f5-a3d5-c4b8-5855e1b01f85",
          },
          {
            name: "Satya Nadella",
            matches: [{ confidenceScore: 0.9, text: "Satya Nadella", offset: 68, length: 13 }],
            language: "en",
            dataSourceEntityId: "Satya Nadella",
            url: "https://en.wikipedia.org/wiki/Satya_Nadella",
            dataSource: "Wikipedia",
            bingEntitySearchApiId: "e23e51ed-d16f-4800-9a31-ed056168b9a2",
          },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation7: AnalyzeBatchResult[] = [
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        redactedText: "My SSN is ***********.",
        entities: [
          {
            text: "859-98-0987",
            category: "USSocialSecurityNumber",
            offset: 10,
            length: 11,
            confidenceScore: 0.65,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        redactedText:
          "Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.",
        entities: [
          {
            text: "111000025",
            category: "PhoneNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.8,
          },
          {
            text: "111000025",
            category: "ABARoutingNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.75,
          },
          {
            text: "111000025",
            category: "NZSocialWelfareNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.65,
          },
        ],
      },
      {
        id: "2",
        warnings: [],
        redactedText: "Is 998.214.865-68 your Brazilian CPF number?",
        entities: [],
      },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation8: AnalyzeBatchResult[] = [
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        redactedText:
          "My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
        entities: [
          {
            text: "859-98-0987",
            category: "USSocialSecurityNumber",
            offset: 10,
            length: 11,
            confidenceScore: 0.65,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        redactedText:
          "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
        entities: [],
      },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation9: AnalyzeBatchResult[] = [
  {
    kind: "SentimentAnalysis",
    results: [
      {
        id: "0",
        warnings: [],
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0, negative: 1 },
        sentences: [
          {
            text: "The food was unacceptable",
            sentiment: "negative",
            confidenceScores: { positive: 0, neutral: 0, negative: 1 },
            offset: 0,
            length: 25,
            opinions: [
              {
                target: {
                  sentiment: "negative",
                  confidenceScores: { positive: 0, negative: 1 },
                  offset: 4,
                  length: 4,
                  text: "food",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0, negative: 1 },
                    offset: 13,
                    length: 12,
                    text: "unacceptable",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        sentiment: "positive",
        confidenceScores: { positive: 0.99, neutral: 0.01, negative: 0 },
        sentences: [
          {
            text: "The rooms were beautiful. ",
            sentiment: "positive",
            confidenceScores: { positive: 1, neutral: 0, negative: 0 },
            offset: 0,
            length: 26,
            opinions: [
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 4,
                  length: 5,
                  text: "rooms",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 15,
                    length: 9,
                    text: "beautiful",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
          {
            text: "The AC was good and quiet.",
            sentiment: "positive",
            confidenceScores: { positive: 0.99, neutral: 0.01, negative: 0 },
            offset: 26,
            length: 26,
            opinions: [
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 30,
                  length: 2,
                  text: "AC",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 37,
                    length: 4,
                    text: "good",
                    isNegated: false,
                  },
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 46,
                    length: 5,
                    text: "quiet",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        warnings: [],
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0, negative: 0.99 },
        sentences: [
          {
            text: "The breakfast was good, but the toilet was smelly.",
            sentiment: "negative",
            confidenceScores: { positive: 0, neutral: 0, negative: 0.99 },
            offset: 0,
            length: 50,
            opinions: [
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 4,
                  length: 9,
                  text: "breakfast",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 18,
                    length: 4,
                    text: "good",
                    isNegated: false,
                  },
                ],
              },
              {
                target: {
                  sentiment: "negative",
                  confidenceScores: { positive: 0, negative: 1 },
                  offset: 32,
                  length: 6,
                  text: "toilet",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0, negative: 1 },
                    offset: 43,
                    length: 6,
                    text: "smelly",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "3",
        warnings: [],
        sentiment: "positive",
        confidenceScores: { positive: 1, neutral: 0, negative: 0 },
        sentences: [
          {
            text: "Loved this hotel - good breakfast - nice shuttle service - clean rooms.",
            sentiment: "positive",
            confidenceScores: { positive: 1, neutral: 0, negative: 0 },
            offset: 0,
            length: 71,
            opinions: [
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 11,
                  length: 5,
                  text: "hotel",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 0,
                    length: 5,
                    text: "Loved",
                    isNegated: false,
                  },
                ],
              },
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 24,
                  length: 9,
                  text: "breakfast",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 19,
                    length: 4,
                    text: "good",
                    isNegated: false,
                  },
                ],
              },
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 41,
                  length: 15,
                  text: "shuttle service",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 36,
                    length: 4,
                    text: "nice",
                    isNegated: false,
                  },
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 59,
                    length: 5,
                    text: "clean",
                    isNegated: false,
                  },
                ],
              },
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 65,
                  length: 5,
                  text: "rooms",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 59,
                    length: 5,
                    text: "clean",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "4",
        warnings: [],
        sentiment: "positive",
        confidenceScores: { positive: 0.92, neutral: 0.07, negative: 0.01 },
        sentences: [
          {
            text: "I had a great unobstructed view of the Microsoft campus.",
            sentiment: "positive",
            confidenceScores: { positive: 0.92, neutral: 0.07, negative: 0.01 },
            offset: 0,
            length: 56,
            opinions: [
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 27,
                  length: 4,
                  text: "view",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 8,
                    length: 5,
                    text: "great",
                    isNegated: false,
                  },
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 0.99, negative: 0.01 },
                    offset: 14,
                    length: 12,
                    text: "unobstructed",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "5",
        warnings: [],
        sentiment: "negative",
        confidenceScores: { positive: 0.04, neutral: 0, negative: 0.96 },
        sentences: [
          {
            text: "Nice rooms but bathrooms were old and the toilet was dirty when we arrived.",
            sentiment: "negative",
            confidenceScores: { positive: 0.04, neutral: 0, negative: 0.96 },
            offset: 0,
            length: 75,
            opinions: [
              {
                target: {
                  sentiment: "positive",
                  confidenceScores: { positive: 1, negative: 0 },
                  offset: 5,
                  length: 5,
                  text: "rooms",
                },
                assessments: [
                  {
                    sentiment: "positive",
                    confidenceScores: { positive: 1, negative: 0 },
                    offset: 0,
                    length: 4,
                    text: "Nice",
                    isNegated: false,
                  },
                ],
              },
              {
                target: {
                  sentiment: "negative",
                  confidenceScores: { positive: 0, negative: 1 },
                  offset: 15,
                  length: 9,
                  text: "bathrooms",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0, negative: 1 },
                    offset: 30,
                    length: 3,
                    text: "old",
                    isNegated: false,
                  },
                ],
              },
              {
                target: {
                  sentiment: "negative",
                  confidenceScores: { positive: 0, negative: 1 },
                  offset: 42,
                  length: 6,
                  text: "toilet",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0, negative: 1 },
                    offset: 53,
                    length: 5,
                    text: "dirty",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "6",
        warnings: [],
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.02, negative: 0.98 },
        sentences: [
          {
            text: "The toilet smelled.",
            sentiment: "negative",
            confidenceScores: { positive: 0, neutral: 0.02, negative: 0.98 },
            offset: 0,
            length: 19,
            opinions: [
              {
                target: {
                  sentiment: "negative",
                  confidenceScores: { positive: 0, negative: 1 },
                  offset: 4,
                  length: 6,
                  text: "toilet",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0, negative: 1 },
                    offset: 11,
                    length: 7,
                    text: "smelled",
                    isNegated: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation10: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
      {
        id: "2",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition",
        },
      },
      {
        id: "3",
        warnings: [],
        entities: [
          {
            text: "restaurant",
            category: "Location",
            subCategory: "Structural",
            offset: 4,
            length: 10,
            confidenceScore: 0.97,
          },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
      {
        id: "2",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition",
        },
      },
      {
        id: "3",
        warnings: [],
        redactedText: "The restaurant had really good food. I recommend you try it.",
        entities: [],
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
      {
        id: "2",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,da,el,et,fi,hr,hu,id,lv,nl,no,pl,ro,ru,sk,sl,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction",
        },
      },
      { id: "3", warnings: [], keyPhrases: ["good food", "restaurant"] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation11: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
      {
        id: "2",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition",
        },
      },
      { id: "3", error: { code: "InvalidDocument", message: "Document text is empty." } },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
      {
        id: "2",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition",
        },
      },
      { id: "3", error: { code: "InvalidDocument", message: "Document text is empty." } },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
      {
        id: "2",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,da,el,et,fi,hr,hu,id,lv,nl,no,pl,ro,ru,sk,sl,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction",
        },
      },
      { id: "3", error: { code: "InvalidDocument", message: "Document text is empty." } },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation12: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      {
        id: "1",
        warnings: [],
        entities: [
          {
            text: "one",
            category: "Quantity",
            subCategory: "Number",
            offset: 0,
            length: 3,
            confidenceScore: 0.8,
          },
        ],
      },
      {
        id: "2",
        warnings: [],
        entities: [
          {
            text: "two",
            category: "Quantity",
            subCategory: "Number",
            offset: 0,
            length: 3,
            confidenceScore: 0.8,
          },
        ],
      },
      {
        id: "3",
        warnings: [],
        entities: [
          {
            text: "three",
            category: "Quantity",
            subCategory: "Number",
            offset: 0,
            length: 5,
            confidenceScore: 0.8,
          },
        ],
      },
      {
        id: "4",
        warnings: [],
        entities: [
          {
            text: "four",
            category: "Quantity",
            subCategory: "Number",
            offset: 0,
            length: 4,
            confidenceScore: 0.8,
          },
        ],
      },
      {
        id: "5",
        warnings: [],
        entities: [
          {
            text: "five",
            category: "Quantity",
            subCategory: "Number",
            offset: 0,
            length: 4,
            confidenceScore: 0.8,
          },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      { id: "1", warnings: [], redactedText: "one", entities: [] },
      { id: "2", warnings: [], redactedText: "two", entities: [] },
      { id: "3", warnings: [], redactedText: "three", entities: [] },
      { id: "4", warnings: [], redactedText: "four", entities: [] },
      { id: "5", warnings: [], redactedText: "five", entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "1", warnings: [], keyPhrases: [] },
      { id: "2", warnings: [], keyPhrases: [] },
      { id: "3", warnings: [], keyPhrases: [] },
      { id: "4", warnings: [], keyPhrases: [] },
      { id: "5", warnings: [], keyPhrases: [] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation13: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      { id: "56", warnings: [], entities: [] },
      { id: "0", warnings: [], entities: [] },
      { id: "22", warnings: [], entities: [] },
      { id: "19", warnings: [], entities: [] },
      { id: "1", warnings: [], entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      { id: "56", warnings: [], redactedText: ":)", entities: [] },
      { id: "0", warnings: [], redactedText: ":(", entities: [] },
      { id: "22", warnings: [], redactedText: "w", entities: [] },
      { id: "19", warnings: [], redactedText: ":P", entities: [] },
      { id: "1", warnings: [], redactedText: ":D", entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "56", warnings: [], keyPhrases: [] },
      { id: "0", warnings: [], keyPhrases: [] },
      { id: "22", warnings: [], keyPhrases: [] },
      { id: "19", warnings: [], keyPhrases: [] },
      { id: "1", warnings: [], keyPhrases: [] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation14: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      { id: "0", warnings: [], entities: [] },
      {
        id: "1",
        warnings: [],
        entities: [
          {
            text: "hotel",
            category: "Location",
            offset: 19,
            length: 5,
            confidenceScore: 0.99,
          },
        ],
      },
      {
        id: "2",
        warnings: [],
        entities: [
          {
            text: "restaurant",
            category: "Location",
            subCategory: "Structural",
            offset: 4,
            length: 10,
            confidenceScore: 0.96,
          },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        redactedText: "This was the best day of my life.",
        entities: [],
      },
      {
        id: "1",
        warnings: [],
        redactedText: "I did not like the hotel we stayed at. It was too expensive.",
        entities: [],
      },
      {
        id: "2",
        warnings: [],
        redactedText: "The restaurant was not as good as I hoped.",
        entities: [],
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "0", warnings: [], keyPhrases: ["best day", "life"] },
      { id: "1", warnings: [], keyPhrases: ["hotel"] },
      { id: "2", warnings: [], keyPhrases: ["restaurant"] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation15: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      {
        id: "1",
        warnings: [],
        entities: [
          { text: "park", category: "Location", offset: 17, length: 4, confidenceScore: 0.99 },
        ],
      },
      {
        id: "2",
        warnings: [],
        entities: [
          { text: "Español", category: "Skill", offset: 31, length: 7, confidenceScore: 0.94 },
        ],
      },
      { id: "3", warnings: [], entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      { id: "1", warnings: [], redactedText: "I will go to the park.", entities: [] },
      {
        id: "2",
        warnings: [],
        redactedText: "Este es un document escrito en Español.",
        entities: [],
      },
      { id: "3", warnings: [], redactedText: "猫は幸せ", entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "1", warnings: [], keyPhrases: ["park"] },
      { id: "2", warnings: [], keyPhrases: ["Español", "document"] },
      { id: "3", warnings: [], keyPhrases: ["は幸せ"] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation16: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      {
        id: "0",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition",
        },
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition",
        },
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      {
        id: "0",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,da,el,et,fi,hr,hu,id,lv,nl,no,pl,ro,ru,sk,sl,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction",
        },
      },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation17: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    results: [
      { id: "0", warnings: [], entities: [] },
      { id: "1", warnings: [], entities: [] },
      { id: "2", warnings: [], entities: [] },
      { id: "3", warnings: [], entities: [] },
      { id: "4", warnings: [], entities: [] },
      { id: "5", warnings: [], entities: [] },
      { id: "6", warnings: [], entities: [] },
      { id: "7", warnings: [], entities: [] },
      { id: "8", warnings: [], entities: [] },
      { id: "9", warnings: [], entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "0", warnings: [], keyPhrases: ["random text"] },
      { id: "1", warnings: [], keyPhrases: ["random text"] },
      { id: "2", warnings: [], keyPhrases: ["random text"] },
      { id: "3", warnings: [], keyPhrases: ["random text"] },
      { id: "4", warnings: [], keyPhrases: ["random text"] },
      { id: "5", warnings: [], keyPhrases: ["random text"] },
      { id: "6", warnings: [], keyPhrases: ["random text"] },
      { id: "7", warnings: [], keyPhrases: ["random text"] },
      { id: "8", warnings: [], keyPhrases: ["random text"] },
      { id: "9", warnings: [], keyPhrases: ["random text"] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "EntityRecognition",
    results: [
      { id: "10", warnings: [], entities: [] },
      { id: "11", warnings: [], entities: [] },
      { id: "12", warnings: [], entities: [] },
      { id: "13", warnings: [], entities: [] },
      { id: "14", warnings: [], entities: [] },
      { id: "15", warnings: [], entities: [] },
      { id: "16", warnings: [], entities: [] },
      { id: "17", warnings: [], entities: [] },
      { id: "18", warnings: [], entities: [] },
      { id: "19", warnings: [], entities: [] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "10", warnings: [], keyPhrases: ["random text"] },
      { id: "11", warnings: [], keyPhrases: ["random text"] },
      { id: "12", warnings: [], keyPhrases: ["random text"] },
      { id: "13", warnings: [], keyPhrases: ["random text"] },
      { id: "14", warnings: [], keyPhrases: ["random text"] },
      { id: "15", warnings: [], keyPhrases: ["random text"] },
      { id: "16", warnings: [], keyPhrases: ["random text"] },
      { id: "17", warnings: [], keyPhrases: ["random text"] },
      { id: "18", warnings: [], keyPhrases: ["random text"] },
      { id: "19", warnings: [], keyPhrases: ["random text"] },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "EntityRecognition",
    results: [
      { id: "20", warnings: [], entities: [] },
      { id: "21", warnings: [], entities: [] },
      { id: "22", warnings: [], entities: [] },
      { id: "23", warnings: [], entities: [] },
      {
        id: "24",
        warnings: [],
        entities: [
          { text: "Microsoft", category: "Organization", offset: 0, length: 9, confidenceScore: 1 },
          { text: "Bill Gates", category: "Person", offset: 25, length: 10, confidenceScore: 1 },
          { text: "Paul Allen", category: "Person", offset: 40, length: 10, confidenceScore: 1 },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      { id: "20", warnings: [], keyPhrases: ["random text"] },
      { id: "21", warnings: [], keyPhrases: ["random text"] },
      { id: "22", warnings: [], keyPhrases: ["random text"] },
      { id: "23", warnings: [], keyPhrases: ["random text"] },
      { id: "24", warnings: [], keyPhrases: ["Bill Gates", "Paul Allen", "Microsoft"] },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation18: AnalyzeBatchResult[] = [
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        redactedText: "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********",
        entities: [
          {
            text: "859-98-0987",
            category: "USSocialSecurityNumber",
            offset: 17,
            length: 11,
            confidenceScore: 0.65,
          },
        ],
      },
    ],
    modelVersion,
    completedOn,
  },
];

export const expectation19: AnalyzeBatchResult[] = [
  {
    kind: "PiiEntityRecognition",
    results: [{ id: "0", warnings: [], redactedText: "I will go to the park.", entities: [] }],
    actionName: "action1",
    completedOn,
    modelVersion,
  },
  {
    kind: "PiiEntityRecognition",
    results: [{ id: "0", warnings: [], redactedText: "I will go to the park.", entities: [] }],
    actionName: "action2",
    completedOn,
    modelVersion,
  },
];

export const expectation20: AnalyzeBatchResult[] = [
  {
    kind: "Healthcare",
    results: [
      {
        entities: [
          {
            dataSources: [
              { name: "UMLS", entityId: "C0020538" },
              { name: "AOD", entityId: "0000023317" },
              { name: "BI", entityId: "BI00001" },
              { name: "CCPSS", entityId: "1017493" },
              { name: "CCS", entityId: "7.1" },
              { name: "CHV", entityId: "0000015800" },
              { name: "COSTAR", entityId: "397" },
              { name: "CSP", entityId: "0571-5243" },
              { name: "CST", entityId: "HYPERTENS" },
              { name: "DXP", entityId: "U002034" },
              { name: "HPO", entityId: "HP:0000822" },
              { name: "ICD10", entityId: "I10-I15.9" },
              { name: "ICD10AM", entityId: "I10-I15.9" },
              { name: "ICD10CM", entityId: "I10" },
              { name: "ICD9CM", entityId: "997.91" },
              { name: "ICPC2ICD10ENG", entityId: "MTHU035456" },
              { name: "ICPC2P", entityId: "K85004" },
              { name: "LCH", entityId: "U002317" },
              { name: "LCH_NW", entityId: "sh85063723" },
              { name: "LNC", entityId: "LA14293-7" },
              { name: "MDR", entityId: "10020772" },
              { name: "MEDCIN", entityId: "33288" },
              { name: "MEDLINEPLUS", entityId: "34" },
              { name: "MSH", entityId: "D006973" },
              { name: "MTH", entityId: "005" },
              { name: "MTHICD9", entityId: "997.91" },
              { name: "NANDA-I", entityId: "00905" },
              { name: "NCI", entityId: "C3117" },
              { name: "NCI_CPTAC", entityId: "C3117" },
              { name: "NCI_CTCAE", entityId: "E13785" },
              { name: "NCI_CTRP", entityId: "C3117" },
              { name: "NCI_FDA", entityId: "1908" },
              { name: "NCI_GDC", entityId: "C3117" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000458091" },
              { name: "NCI_NICHD", entityId: "C3117" },
              { name: "NCI_caDSR", entityId: "C3117" },
              { name: "NOC", entityId: "060808" },
              { name: "OMIM", entityId: "MTHU002068" },
              { name: "PCDS", entityId: "PRB_11000.06" },
              { name: "PDQ", entityId: "CDR0000686951" },
              { name: "PSY", entityId: "23830" },
              { name: "RCD", entityId: "XE0Ub" },
              { name: "SNM", entityId: "F-70700" },
              { name: "SNMI", entityId: "D3-02000" },
              { name: "SNOMEDCT_US", entityId: "38341003" },
              { name: "WHO", entityId: "0210" },
            ],
            text: "high blood pressure",
            category: "SymptomOrSign",
            offset: 29,
            length: 19,
            confidenceScore: 1,
            assertion: { certainty: "negative" },
            normalizedText: "Hypertensive disease",
          },
        ],
        entityRelations: [],
        id: "0",
        warnings: [],
      },
      {
        entities: [
          {
            dataSources: [],
            text: "100mg",
            category: "Dosage",
            offset: 11,
            length: 5,
            confidenceScore: 0.98,
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0020740" },
              { name: "AOD", entityId: "0000019879" },
              { name: "ATC", entityId: "M01AE01" },
              { name: "CCPSS", entityId: "0046165" },
              { name: "CHV", entityId: "0000006519" },
              { name: "CSP", entityId: "2270-2077" },
              { name: "DRUGBANK", entityId: "DB01050" },
              { name: "GS", entityId: "1611" },
              { name: "LCH_NW", entityId: "sh97005926" },
              { name: "LNC", entityId: "LP16165-0" },
              { name: "MEDCIN", entityId: "40458" },
              { name: "MMSL", entityId: "d00015" },
              { name: "MSH", entityId: "D007052" },
              { name: "MTHSPL", entityId: "WK2XYI10QM" },
              { name: "NCI", entityId: "C561" },
              { name: "NCI_CTRP", entityId: "C561" },
              { name: "NCI_DCP", entityId: "00803" },
              { name: "NCI_DTP", entityId: "NSC0256857" },
              { name: "NCI_FDA", entityId: "WK2XYI10QM" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
              { name: "NDDF", entityId: "002377" },
              { name: "PDQ", entityId: "CDR0000040475" },
              { name: "RCD", entityId: "x02MO" },
              { name: "RXNORM", entityId: "5640" },
              { name: "SNM", entityId: "E-7772" },
              { name: "SNMI", entityId: "C-603C0" },
              { name: "SNOMEDCT_US", entityId: "387207008" },
              { name: "USP", entityId: "m39860" },
              { name: "USPMG", entityId: "MTHU000060" },
              { name: "VANDF", entityId: "4017840" },
            ],
            text: "ibuprofen",
            category: "MedicationName",
            offset: 17,
            length: 9,
            confidenceScore: 1,
            normalizedText: "ibuprofen",
          },
          {
            dataSources: [],
            text: "twice daily",
            category: "Frequency",
            offset: 34,
            length: 11,
            confidenceScore: 1,
          },
        ],
        entityRelations: [
          {
            relationType: "DosageOfMedication",
            confidenceScore: 1,
            roles: [
              {
                entity: {
                  dataSources: [],
                  text: "100mg",
                  category: "Dosage",
                  offset: 11,
                  length: 5,
                  confidenceScore: 0.98,
                },
                name: "Dosage",
              },
              {
                entity: {
                  dataSources: [
                    { name: "UMLS", entityId: "C0020740" },
                    { name: "AOD", entityId: "0000019879" },
                    { name: "ATC", entityId: "M01AE01" },
                    { name: "CCPSS", entityId: "0046165" },
                    { name: "CHV", entityId: "0000006519" },
                    { name: "CSP", entityId: "2270-2077" },
                    { name: "DRUGBANK", entityId: "DB01050" },
                    { name: "GS", entityId: "1611" },
                    { name: "LCH_NW", entityId: "sh97005926" },
                    { name: "LNC", entityId: "LP16165-0" },
                    { name: "MEDCIN", entityId: "40458" },
                    { name: "MMSL", entityId: "d00015" },
                    { name: "MSH", entityId: "D007052" },
                    { name: "MTHSPL", entityId: "WK2XYI10QM" },
                    { name: "NCI", entityId: "C561" },
                    { name: "NCI_CTRP", entityId: "C561" },
                    { name: "NCI_DCP", entityId: "00803" },
                    { name: "NCI_DTP", entityId: "NSC0256857" },
                    { name: "NCI_FDA", entityId: "WK2XYI10QM" },
                    { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
                    { name: "NDDF", entityId: "002377" },
                    { name: "PDQ", entityId: "CDR0000040475" },
                    { name: "RCD", entityId: "x02MO" },
                    { name: "RXNORM", entityId: "5640" },
                    { name: "SNM", entityId: "E-7772" },
                    { name: "SNMI", entityId: "C-603C0" },
                    { name: "SNOMEDCT_US", entityId: "387207008" },
                    { name: "USP", entityId: "m39860" },
                    { name: "USPMG", entityId: "MTHU000060" },
                    { name: "VANDF", entityId: "4017840" },
                  ],
                  text: "ibuprofen",
                  category: "MedicationName",
                  offset: 17,
                  length: 9,
                  confidenceScore: 1,
                  normalizedText: "ibuprofen",
                },
                name: "Medication",
              },
            ],
          },
          {
            relationType: "FrequencyOfMedication",
            confidenceScore: 1,
            roles: [
              {
                entity: {
                  dataSources: [
                    { name: "UMLS", entityId: "C0020740" },
                    { name: "AOD", entityId: "0000019879" },
                    { name: "ATC", entityId: "M01AE01" },
                    { name: "CCPSS", entityId: "0046165" },
                    { name: "CHV", entityId: "0000006519" },
                    { name: "CSP", entityId: "2270-2077" },
                    { name: "DRUGBANK", entityId: "DB01050" },
                    { name: "GS", entityId: "1611" },
                    { name: "LCH_NW", entityId: "sh97005926" },
                    { name: "LNC", entityId: "LP16165-0" },
                    { name: "MEDCIN", entityId: "40458" },
                    { name: "MMSL", entityId: "d00015" },
                    { name: "MSH", entityId: "D007052" },
                    { name: "MTHSPL", entityId: "WK2XYI10QM" },
                    { name: "NCI", entityId: "C561" },
                    { name: "NCI_CTRP", entityId: "C561" },
                    { name: "NCI_DCP", entityId: "00803" },
                    { name: "NCI_DTP", entityId: "NSC0256857" },
                    { name: "NCI_FDA", entityId: "WK2XYI10QM" },
                    { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
                    { name: "NDDF", entityId: "002377" },
                    { name: "PDQ", entityId: "CDR0000040475" },
                    { name: "RCD", entityId: "x02MO" },
                    { name: "RXNORM", entityId: "5640" },
                    { name: "SNM", entityId: "E-7772" },
                    { name: "SNMI", entityId: "C-603C0" },
                    { name: "SNOMEDCT_US", entityId: "387207008" },
                    { name: "USP", entityId: "m39860" },
                    { name: "USPMG", entityId: "MTHU000060" },
                    { name: "VANDF", entityId: "4017840" },
                  ],
                  text: "ibuprofen",
                  category: "MedicationName",
                  offset: 17,
                  length: 9,
                  confidenceScore: 1,
                  normalizedText: "ibuprofen",
                },
                name: "Medication",
              },
              {
                entity: {
                  dataSources: [],
                  text: "twice daily",
                  category: "Frequency",
                  offset: 34,
                  length: 11,
                  confidenceScore: 1,
                },
                name: "Frequency",
              },
            ],
          },
        ],
        id: "1",
        warnings: [],
      },
      {
        entities: [
          {
            dataSources: [
              { name: "UMLS", entityId: "C0021270" },
              { name: "AOD", entityId: "0000005273" },
              { name: "CCPSS", entityId: "0030805" },
              { name: "CHV", entityId: "0000006675" },
              { name: "DXP", entityId: "U002089" },
              { name: "LCH", entityId: "U002421" },
              { name: "LCH_NW", entityId: "sh85066022" },
              { name: "LNC", entityId: "LA19747-7" },
              { name: "MDR", entityId: "10021731" },
              { name: "MSH", entityId: "D007223" },
              { name: "NCI", entityId: "C27956" },
              { name: "NCI_FDA", entityId: "C27956" },
              { name: "NCI_NICHD", entityId: "C27956" },
              { name: "SNOMEDCT_US", entityId: "133931009" },
            ],
            text: "Baby",
            category: "Age",
            offset: 0,
            length: 4,
            confidenceScore: 0.94,
            normalizedText: "Infant",
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0025289" },
              { name: "AOD", entityId: "0000006185" },
              { name: "BI", entityId: "BI00546" },
              { name: "CCPSS", entityId: "1018016" },
              { name: "CCSR_10", entityId: "NVS001" },
              { name: "CCSR_ICD10CM", entityId: "NVS001" },
              { name: "CHV", entityId: "0000007932" },
              { name: "COSTAR", entityId: "478" },
              { name: "CSP", entityId: "2042-5301" },
              { name: "CST", entityId: "MENINGITIS" },
              { name: "DXP", entityId: "U002543" },
              { name: "HPO", entityId: "HP:0001287" },
              { name: "ICD10", entityId: "G03.9" },
              { name: "ICD10AM", entityId: "G03.9" },
              { name: "ICD10CM", entityId: "G03.9" },
              { name: "ICD9CM", entityId: "322.9" },
              { name: "ICPC2ICD10ENG", entityId: "MTHU048434" },
              { name: "ICPC2P", entityId: "N71002" },
              { name: "LCH", entityId: "U002901" },
              { name: "LCH_NW", entityId: "sh85083562" },
              { name: "LNC", entityId: "LP20756-0" },
              { name: "MDR", entityId: "10027199" },
              { name: "MEDCIN", entityId: "31192" },
              { name: "MEDLINEPLUS", entityId: "324" },
              { name: "MSH", entityId: "D008581" },
              { name: "NANDA-I", entityId: "02899" },
              { name: "NCI", entityId: "C26828" },
              { name: "NCI_CPTAC", entityId: "C26828" },
              { name: "NCI_CTCAE", entityId: "E11458" },
              { name: "NCI_FDA", entityId: "2389" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000471780" },
              { name: "NCI_NICHD", entityId: "C26828" },
              { name: "NCI_caDSR", entityId: "C26828" },
              { name: "OMIM", entityId: "MTHU005994" },
              { name: "PSY", entityId: "30660" },
              { name: "RCD", entityId: "X000H" },
              { name: "SNM", entityId: "M-40000" },
              { name: "SNMI", entityId: "DA-10010" },
              { name: "SNOMEDCT_US", entityId: "7180009" },
              { name: "WHO", entityId: "0955" },
            ],
            text: "Meningitis",
            category: "Diagnosis",
            offset: 24,
            length: 10,
            confidenceScore: 1,
            assertion: { certainty: "negativePossible" },
            normalizedText: "Meningitis",
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0015967" },
              { name: "AIR", entityId: "FEVER" },
              { name: "AOD", entityId: "0000004396" },
              { name: "BI", entityId: "BI00751" },
              { name: "CCC", entityId: "K25.2" },
              { name: "CCPSS", entityId: "1017166" },
              { name: "CCSR_10", entityId: "SYM002" },
              { name: "CCSR_ICD10CM", entityId: "SYM002" },
              { name: "CHV", entityId: "0000005010" },
              { name: "COSTAR", entityId: "300" },
              { name: "CPM", entityId: "65287" },
              { name: "CSP", entityId: "2871-4310" },
              { name: "CST", entityId: "FEVER" },
              { name: "DXP", entityId: "U001483" },
              { name: "GO", entityId: "GO:0001660" },
              { name: "HPO", entityId: "HP:0001945" },
              { name: "ICD10", entityId: "R50.9" },
              { name: "ICD10AM", entityId: "R50.9" },
              { name: "ICD10CM", entityId: "R50.9" },
              { name: "ICD9CM", entityId: "780.60" },
              { name: "ICNP", entityId: "10041539" },
              { name: "ICPC", entityId: "A03" },
              { name: "ICPC2EENG", entityId: "A03" },
              { name: "ICPC2ICD10ENG", entityId: "MTHU041751" },
              { name: "ICPC2P", entityId: "A03002" },
              { name: "LCH", entityId: "U001776" },
              { name: "LCH_NW", entityId: "sh85047994" },
              { name: "LNC", entityId: "MTHU013518" },
              { name: "MDR", entityId: "10005911" },
              { name: "MEDCIN", entityId: "6005" },
              { name: "MEDLINEPLUS", entityId: "511" },
              { name: "MSH", entityId: "D005334" },
              { name: "MTHICD9", entityId: "780.60" },
              { name: "NANDA-I", entityId: "01128" },
              { name: "NCI", entityId: "C3038" },
              { name: "NCI_CTCAE", entityId: "E11102" },
              { name: "NCI_FDA", entityId: "1858" },
              { name: "NCI_GDC", entityId: "C3038" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000450108" },
              { name: "NCI_NICHD", entityId: "C3038" },
              { name: "NCI_caDSR", entityId: "C3038" },
              { name: "NOC", entityId: "070307" },
              { name: "OMIM", entityId: "MTHU005439" },
              { name: "OMS", entityId: "50.03" },
              { name: "PCDS", entityId: "PRB_11020.02" },
              { name: "PDQ", entityId: "CDR0000775882" },
              { name: "PSY", entityId: "23840" },
              { name: "QMR", entityId: "Q0200115" },
              { name: "RCD", entityId: "X76EI" },
              { name: "SNM", entityId: "F-03003" },
              { name: "SNMI", entityId: "F-03003" },
              { name: "SNOMEDCT_US", entityId: "386661006" },
              { name: "WHO", entityId: "0725" },
            ],
            text: "fever",
            category: "SymptomOrSign",
            offset: 47,
            length: 5,
            confidenceScore: 0.98,
            normalizedText: "Fever",
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0026591" },
              { name: "AOD", entityId: "0000027173" },
              { name: "CCPSS", entityId: "U000286" },
              { name: "CHV", entityId: "0000008266" },
              { name: "CSP", entityId: "1124-5492" },
              { name: "HL7V3.0", entityId: "MTH" },
              { name: "LCH", entityId: "U003028" },
              { name: "LCH_NW", entityId: "sh85087526" },
              { name: "LNC", entityId: "LA10417-6" },
              { name: "MSH", entityId: "D009035" },
              { name: "NCI", entityId: "C25189" },
              { name: "NCI_CDISC", entityId: "C25189" },
              { name: "NCI_GDC", entityId: "C25189" },
              { name: "NCI_caDSR", entityId: "C25189" },
              { name: "PSY", entityId: "32140" },
              { name: "RCD", entityId: "X78ym" },
              { name: "SNMI", entityId: "S-10120" },
              { name: "SNOMEDCT_US", entityId: "72705000" },
            ],
            text: "mother",
            category: "FamilyRelation",
            offset: 60,
            length: 6,
            confidenceScore: 0.99,
            normalizedText: "Mother (person)",
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0030842" },
              { name: "AOD", entityId: "0000019206" },
              { name: "ATC", entityId: "J01C" },
              { name: "CCPSS", entityId: "0014106" },
              { name: "CHV", entityId: "0000009423" },
              { name: "CSP", entityId: "0199-8025" },
              { name: "GS", entityId: "4011" },
              { name: "LCH", entityId: "U003521" },
              { name: "LCH_NW", entityId: "sh85099402" },
              { name: "LNC", entityId: "LP14319-5" },
              { name: "MEDCIN", entityId: "40319" },
              { name: "MMSL", entityId: "d00116" },
              { name: "MSH", entityId: "D010406" },
              { name: "NCI", entityId: "C1500" },
              { name: "NCI_DTP", entityId: "NSC0402815" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000045296" },
              { name: "NDDF", entityId: "016121" },
              { name: "PSY", entityId: "37190" },
              { name: "RCD", entityId: "x009C" },
              { name: "SNM", entityId: "E-7260" },
              { name: "SNMI", entityId: "C-54000" },
              { name: "SNOMEDCT_US", entityId: "764146007" },
              { name: "VANDF", entityId: "4019880" },
            ],
            text: "Penicillin",
            category: "MedicationName",
            offset: 77,
            length: 10,
            confidenceScore: 0.84,
            assertion: { certainty: "neutralPossible" },
            normalizedText: "penicillins",
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0021270" },
              { name: "AOD", entityId: "0000005273" },
              { name: "CCPSS", entityId: "0030805" },
              { name: "CHV", entityId: "0000006675" },
              { name: "DXP", entityId: "U002089" },
              { name: "LCH", entityId: "U002421" },
              { name: "LCH_NW", entityId: "sh85066022" },
              { name: "LNC", entityId: "LA19747-7" },
              { name: "MDR", entityId: "10021731" },
              { name: "MSH", entityId: "D007223" },
              { name: "NCI", entityId: "C27956" },
              { name: "NCI_FDA", entityId: "C27956" },
              { name: "NCI_NICHD", entityId: "C27956" },
              { name: "SNOMEDCT_US", entityId: "133931009" },
            ],
            text: "baby",
            category: "FamilyRelation",
            offset: 96,
            length: 4,
            confidenceScore: 1,
            normalizedText: "Infant",
          },
        ],
        entityRelations: [],
        id: "2",
        warnings: [],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation21: AnalyzeBatchResult[] = [
  {
    kind: "Healthcare",
    results: [
      {
        entities: [],
        entityRelations: [],
        id: "0",
        warnings: [
          {
            code: "DocumentTruncated",
            message:
              "Document is greater than 5120 chars; relations across splits of 5120 chars may be skipped by the model",
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation22: AnalyzeBatchResult[] = [
  {
    kind: "Healthcare",
    results: [
      {
        entities: [
          {
            dataSources: [
              { name: "UMLS", entityId: "C0020740" },
              { name: "AOD", entityId: "0000019879" },
              { name: "ATC", entityId: "M01AE01" },
              { name: "CCPSS", entityId: "0046165" },
              { name: "CHV", entityId: "0000006519" },
              { name: "CSP", entityId: "2270-2077" },
              { name: "DRUGBANK", entityId: "DB01050" },
              { name: "GS", entityId: "1611" },
              { name: "LCH_NW", entityId: "sh97005926" },
              { name: "LNC", entityId: "LP16165-0" },
              { name: "MEDCIN", entityId: "40458" },
              { name: "MMSL", entityId: "d00015" },
              { name: "MSH", entityId: "D007052" },
              { name: "MTHSPL", entityId: "WK2XYI10QM" },
              { name: "NCI", entityId: "C561" },
              { name: "NCI_CTRP", entityId: "C561" },
              { name: "NCI_DCP", entityId: "00803" },
              { name: "NCI_DTP", entityId: "NSC0256857" },
              { name: "NCI_FDA", entityId: "WK2XYI10QM" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
              { name: "NDDF", entityId: "002377" },
              { name: "PDQ", entityId: "CDR0000040475" },
              { name: "RCD", entityId: "x02MO" },
              { name: "RXNORM", entityId: "5640" },
              { name: "SNM", entityId: "E-7772" },
              { name: "SNMI", entityId: "C-603C0" },
              { name: "SNOMEDCT_US", entityId: "387207008" },
              { name: "USP", entityId: "m39860" },
              { name: "USPMG", entityId: "MTHU000060" },
              { name: "VANDF", entityId: "4017840" },
            ],
            text: "ibuprofen",
            category: "MedicationName",
            offset: 20,
            length: 9,
            confidenceScore: 0.95,
            normalizedText: "ibuprofen",
          },
        ],
        entityRelations: [],
        id: "0",
        warnings: [],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation23: AnalyzeBatchResult[] = [
  {
    kind: "Healthcare",
    results: [
      {
        entities: [
          {
            dataSources: [
              { name: "UMLS", entityId: "C0020740" },
              { name: "AOD", entityId: "0000019879" },
              { name: "ATC", entityId: "M01AE01" },
              { name: "CCPSS", entityId: "0046165" },
              { name: "CHV", entityId: "0000006519" },
              { name: "CSP", entityId: "2270-2077" },
              { name: "DRUGBANK", entityId: "DB01050" },
              { name: "GS", entityId: "1611" },
              { name: "LCH_NW", entityId: "sh97005926" },
              { name: "LNC", entityId: "LP16165-0" },
              { name: "MEDCIN", entityId: "40458" },
              { name: "MMSL", entityId: "d00015" },
              { name: "MSH", entityId: "D007052" },
              { name: "MTHSPL", entityId: "WK2XYI10QM" },
              { name: "NCI", entityId: "C561" },
              { name: "NCI_CTRP", entityId: "C561" },
              { name: "NCI_DCP", entityId: "00803" },
              { name: "NCI_DTP", entityId: "NSC0256857" },
              { name: "NCI_FDA", entityId: "WK2XYI10QM" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
              { name: "NDDF", entityId: "002377" },
              { name: "PDQ", entityId: "CDR0000040475" },
              { name: "RCD", entityId: "x02MO" },
              { name: "RXNORM", entityId: "5640" },
              { name: "SNM", entityId: "E-7772" },
              { name: "SNMI", entityId: "C-603C0" },
              { name: "SNOMEDCT_US", entityId: "387207008" },
              { name: "USP", entityId: "m39860" },
              { name: "USPMG", entityId: "MTHU000060" },
              { name: "VANDF", entityId: "4017840" },
            ],
            text: "ibuprofen",
            category: "MedicationName",
            offset: 12,
            length: 9,
            confidenceScore: 0.95,
            normalizedText: "ibuprofen",
          },
        ],
        entityRelations: [],
        id: "0",
        warnings: [],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation24: AnalyzeBatchResult[] = [
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        redactedText:
          "My SSN is *********** and your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.",
        entities: [
          {
            text: "859-98-0987",
            category: "USSocialSecurityNumber",
            offset: 10,
            length: 11,
            confidenceScore: 0.65,
          },
          {
            text: "111000025",
            category: "PhoneNumber",
            offset: 44,
            length: 9,
            confidenceScore: 0.8,
          },
          {
            text: "111000025",
            category: "ABARoutingNumber",
            offset: 44,
            length: 9,
            confidenceScore: 0.75,
          },
          {
            text: "111000025",
            category: "NZSocialWelfareNumber",
            offset: 44,
            length: 9,
            confidenceScore: 0.65,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        redactedText:
          "Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.",
        entities: [
          {
            text: "111000025",
            category: "PhoneNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.8,
          },
          {
            text: "111000025",
            category: "ABARoutingNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.75,
          },
          {
            text: "111000025",
            category: "NZSocialWelfareNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.65,
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation25: AnalyzeBatchResult[] = [
  {
    kind: "Healthcare",
    results: [
      {
        entities: [
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0020538",
              },
              {
                name: "AOD",
                entityId: "0000023317",
              },
              {
                name: "BI",
                entityId: "BI00001",
              },
              {
                name: "CCPSS",
                entityId: "1017493",
              },
              {
                name: "CCS",
                entityId: "7.1",
              },
              {
                name: "CHV",
                entityId: "0000015800",
              },
              {
                name: "COSTAR",
                entityId: "397",
              },
              {
                name: "CSP",
                entityId: "0571-5243",
              },
              {
                name: "CST",
                entityId: "HYPERTENS",
              },
              {
                name: "DXP",
                entityId: "U002034",
              },
              {
                name: "HPO",
                entityId: "HP:0000822",
              },
              {
                name: "ICD10",
                entityId: "I10-I15.9",
              },
              {
                name: "ICD10AM",
                entityId: "I10-I15.9",
              },
              {
                name: "ICD10CM",
                entityId: "I10",
              },
              {
                name: "ICD9CM",
                entityId: "997.91",
              },
              {
                name: "ICPC2ICD10ENG",
                entityId: "MTHU035456",
              },
              {
                name: "ICPC2P",
                entityId: "K85004",
              },
              {
                name: "LCH",
                entityId: "U002317",
              },
              {
                name: "LCH_NW",
                entityId: "sh85063723",
              },
              {
                name: "LNC",
                entityId: "LA14293-7",
              },
              {
                name: "MDR",
                entityId: "10020772",
              },
              {
                name: "MEDCIN",
                entityId: "33288",
              },
              {
                name: "MEDLINEPLUS",
                entityId: "34",
              },
              {
                name: "MSH",
                entityId: "D006973",
              },
              {
                name: "MTH",
                entityId: "005",
              },
              {
                name: "MTHICD9",
                entityId: "997.91",
              },
              {
                name: "NANDA-I",
                entityId: "00905",
              },
              {
                name: "NCI",
                entityId: "C3117",
              },
              {
                name: "NCI_CPTAC",
                entityId: "C3117",
              },
              {
                name: "NCI_CTCAE",
                entityId: "E13785",
              },
              {
                name: "NCI_CTRP",
                entityId: "C3117",
              },
              {
                name: "NCI_FDA",
                entityId: "1908",
              },
              {
                name: "NCI_GDC",
                entityId: "C3117",
              },
              {
                name: "NCI_NCI-GLOSS",
                entityId: "CDR0000458091",
              },
              {
                name: "NCI_NICHD",
                entityId: "C3117",
              },
              {
                name: "NCI_caDSR",
                entityId: "C3117",
              },
              {
                name: "NOC",
                entityId: "060808",
              },
              {
                name: "OMIM",
                entityId: "MTHU002068",
              },
              {
                name: "PCDS",
                entityId: "PRB_11000.06",
              },
              {
                name: "PDQ",
                entityId: "CDR0000686951",
              },
              {
                name: "PSY",
                entityId: "23830",
              },
              {
                name: "RCD",
                entityId: "XE0Ub",
              },
              {
                name: "SNM",
                entityId: "F-70700",
              },
              {
                name: "SNMI",
                entityId: "D3-02000",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "38341003",
              },
              {
                name: "WHO",
                entityId: "0210",
              },
            ],
            text: "high blood pressure",
            category: "SymptomOrSign",
            offset: 29,
            length: 19,
            confidenceScore: 1,
            assertion: {
              certainty: "negative",
            },
            normalizedText: "Hypertensive disease",
          },
        ],
        entityRelations: [],
        id: "0",
        warnings: [],
        fhirBundle: {
          resourceType: "Bundle",
          id: "7bd29b2d-172c-4cd0-869d-6813d05463f0",
          meta: {
            profile: ["http://hl7.org/fhir/4.0.1/StructureDefinition/Bundle"],
          },
          identifier: {
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:7bd29b2d-172c-4cd0-869d-6813d05463f0",
          },
          type: "document",
          entry: [
            {
              fullUrl: "Composition/cbc0f79a-1440-4b55-8380-eee05febc27c",
              resource: {
                resourceType: "Composition",
                id: "cbc0f79a-1440-4b55-8380-eee05febc27c",
                status: "final",
                type: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "11526-1",
                      display: "Pathology study",
                    },
                  ],
                  text: "Pathology study",
                },
                subject: {
                  reference: "Patient/e400ac6e-6e20-4378-949e-276bfdef56fd",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8b86cc70-9633-4f90-8104-63acb374bd67",
                  type: "Encounter",
                  display: "unknown",
                },
                date: "2022-10-08",
                author: [
                  {
                    reference: "Practitioner/d46df9b5-c61a-4d49-8bb6-859e457077a9",
                    type: "Practitioner",
                    display: "Unknown",
                  },
                ],
                title: "Pathology study",
                section: [
                  {
                    title: "General",
                    code: {
                      coding: [
                        {
                          system: "",
                          display: "Unrecognized Section",
                        },
                      ],
                      text: "General",
                    },
                    text: {
                      status: "additional",
                      div: "<div>\r\n\t\t\t\t\t\t\t<h1>General</h1>\r\n\t\t\t\t\t\t\t<p>Patient does not suffer from high blood pressure.</p>\r\n\t\t\t\t\t</div>",
                    },
                    entry: [
                      {
                        reference: "List/c3bc8724-5cb3-476d-9f71-5a4d40ba0ce2",
                        type: "List",
                        display: "General",
                      },
                    ],
                  },
                ],
              },
            },
            {
              fullUrl: "Practitioner/d46df9b5-c61a-4d49-8bb6-859e457077a9",
              resource: {
                resourceType: "Practitioner",
                id: "d46df9b5-c61a-4d49-8bb6-859e457077a9",
                name: [
                  {
                    text: "Unknown",
                    family: "Unknown",
                  },
                ],
              },
            },
            {
              fullUrl: "Patient/e400ac6e-6e20-4378-949e-276bfdef56fd",
              resource: {
                resourceType: "Patient",
                id: "e400ac6e-6e20-4378-949e-276bfdef56fd",
                gender: "unknown",
              },
            },
            {
              fullUrl: "Encounter/8b86cc70-9633-4f90-8104-63acb374bd67",
              resource: {
                resourceType: "Encounter",
                id: "8b86cc70-9633-4f90-8104-63acb374bd67",
                meta: {
                  profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter"],
                },
                status: "finished",
                class: {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                  display: "unknown",
                },
                subject: {
                  reference: "Patient/e400ac6e-6e20-4378-949e-276bfdef56fd",
                  type: "Patient",
                },
                period: {
                  start: "2022-10-08",
                  end: "2022-10-08",
                },
              },
            },
            {
              fullUrl: "Observation/1b5bb510-1658-44a0-8326-8938b570a69d",
              resource: {
                resourceType: "Observation",
                id: "1b5bb510-1658-44a0-8326-8938b570a69d",
                extension: [
                  {
                    extension: [
                      {
                        url: "offset",
                        valueInteger: 29,
                      },
                      {
                        url: "length",
                        valueInteger: 19,
                      },
                    ],
                    url: "http://hl7.org/fhir/StructureDefinition/derivation-reference",
                  },
                ],
                status: "final",
                category: [
                  {
                    coding: [
                      {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "exam",
                        display: "Exam",
                      },
                    ],
                    text: "Exam",
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://www.nlm.nih.gov/research/umls",
                      code: "C0020538",
                      display: "Hypertensive disease",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/aod",
                      code: "0000023317",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/bi",
                      code: "BI00001",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccpss",
                      code: "1017493",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccs",
                      code: "7.1",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/chv",
                      code: "0000015800",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/costar",
                      code: "397",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/csp",
                      code: "0571-5243",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/cst",
                      code: "HYPERTENS",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/dxp",
                      code: "U002034",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/hpo",
                      code: "HP:0000822",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10",
                      code: "I10-I15.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10-am",
                      code: "I10-I15.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10-cm",
                      code: "I10",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-9-cm",
                      code: "997.91",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icpc2icd10eng",
                      code: "MTHU035456",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icpc-2p",
                      code: "K85004",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch",
                      code: "U002317",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch_nw",
                      code: "sh85063723",
                    },
                    {
                      system: "http://loinc.org",
                      code: "LA14293-7",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mdr",
                      code: "10020772",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medcin",
                      code: "33288",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medlineplus",
                      code: "34",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/msh",
                      code: "D006973",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mth",
                      code: "005",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mthicd9",
                      code: "997.91",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nanda-i",
                      code: "00905",
                    },
                    {
                      system: "http://ncimeta.nci.nih.gov",
                      code: "C3117",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_cptac",
                      code: "C3117",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_ctcae",
                      code: "E13785",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_ctrp",
                      code: "C3117",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_fda",
                      code: "1908",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_gdc",
                      code: "C3117",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                      code: "CDR0000458091",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nichd",
                      code: "C3117",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_cadsr",
                      code: "C3117",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/noc",
                      code: "060808",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/omim",
                      code: "MTHU002068",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/pcds",
                      code: "PRB_11000.06",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/pdq",
                      code: "CDR0000686951",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/psy",
                      code: "23830",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rcd",
                      code: "XE0Ub",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "F-70700",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "D3-02000",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "38341003",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/who",
                      code: "0210",
                    },
                  ],
                  text: "high blood pressure",
                },
                subject: {
                  reference: "Patient/e400ac6e-6e20-4378-949e-276bfdef56fd",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8b86cc70-9633-4f90-8104-63acb374bd67",
                  type: "Encounter",
                  display: "unknown",
                },
                interpretation: [
                  {
                    coding: [
                      {
                        system:
                          "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: "NEG",
                        display: "Negative",
                      },
                    ],
                    text: "Negative",
                  },
                ],
              },
            },
            {
              fullUrl: "List/c3bc8724-5cb3-476d-9f71-5a4d40ba0ce2",
              resource: {
                resourceType: "List",
                id: "c3bc8724-5cb3-476d-9f71-5a4d40ba0ce2",
                status: "current",
                mode: "snapshot",
                title: "General",
                subject: {
                  reference: "Patient/e400ac6e-6e20-4378-949e-276bfdef56fd",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8b86cc70-9633-4f90-8104-63acb374bd67",
                  type: "Encounter",
                  display: "unknown",
                },
                entry: [
                  {
                    item: {
                      reference: "Observation/1b5bb510-1658-44a0-8326-8938b570a69d",
                      type: "Observation",
                      display: "high blood pressure",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        entities: [
          {
            dataSources: [],
            text: "100mg",
            category: "Dosage",
            offset: 11,
            length: 5,
            confidenceScore: 0.98,
          },
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0020740",
              },
              {
                name: "AOD",
                entityId: "0000019879",
              },
              {
                name: "ATC",
                entityId: "M01AE01",
              },
              {
                name: "CCPSS",
                entityId: "0046165",
              },
              {
                name: "CHV",
                entityId: "0000006519",
              },
              {
                name: "CSP",
                entityId: "2270-2077",
              },
              {
                name: "DRUGBANK",
                entityId: "DB01050",
              },
              {
                name: "GS",
                entityId: "1611",
              },
              {
                name: "LCH_NW",
                entityId: "sh97005926",
              },
              {
                name: "LNC",
                entityId: "LP16165-0",
              },
              {
                name: "MEDCIN",
                entityId: "40458",
              },
              {
                name: "MMSL",
                entityId: "d00015",
              },
              {
                name: "MSH",
                entityId: "D007052",
              },
              {
                name: "MTHSPL",
                entityId: "WK2XYI10QM",
              },
              {
                name: "NCI",
                entityId: "C561",
              },
              {
                name: "NCI_CTRP",
                entityId: "C561",
              },
              {
                name: "NCI_DCP",
                entityId: "00803",
              },
              {
                name: "NCI_DTP",
                entityId: "NSC0256857",
              },
              {
                name: "NCI_FDA",
                entityId: "WK2XYI10QM",
              },
              {
                name: "NCI_NCI-GLOSS",
                entityId: "CDR0000613511",
              },
              {
                name: "NDDF",
                entityId: "002377",
              },
              {
                name: "PDQ",
                entityId: "CDR0000040475",
              },
              {
                name: "RCD",
                entityId: "x02MO",
              },
              {
                name: "RXNORM",
                entityId: "5640",
              },
              {
                name: "SNM",
                entityId: "E-7772",
              },
              {
                name: "SNMI",
                entityId: "C-603C0",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "387207008",
              },
              {
                name: "USP",
                entityId: "m39860",
              },
              {
                name: "USPMG",
                entityId: "MTHU000060",
              },
              {
                name: "VANDF",
                entityId: "4017840",
              },
            ],
            text: "ibuprofen",
            category: "MedicationName",
            offset: 17,
            length: 9,
            confidenceScore: 1,
            normalizedText: "ibuprofen",
          },
          {
            dataSources: [],
            text: "twice daily",
            category: "Frequency",
            offset: 34,
            length: 11,
            confidenceScore: 1,
          },
        ],
        entityRelations: [
          {
            relationType: "DosageOfMedication",
            confidenceScore: 1,
            roles: [
              {
                entity: {
                  dataSources: [],
                  text: "100mg",
                  category: "Dosage",
                  offset: 11,
                  length: 5,
                  confidenceScore: 0.98,
                },
                name: "Dosage",
              },
              {
                entity: {
                  dataSources: [
                    {
                      name: "UMLS",
                      entityId: "C0020740",
                    },
                    {
                      name: "AOD",
                      entityId: "0000019879",
                    },
                    {
                      name: "ATC",
                      entityId: "M01AE01",
                    },
                    {
                      name: "CCPSS",
                      entityId: "0046165",
                    },
                    {
                      name: "CHV",
                      entityId: "0000006519",
                    },
                    {
                      name: "CSP",
                      entityId: "2270-2077",
                    },
                    {
                      name: "DRUGBANK",
                      entityId: "DB01050",
                    },
                    {
                      name: "GS",
                      entityId: "1611",
                    },
                    {
                      name: "LCH_NW",
                      entityId: "sh97005926",
                    },
                    {
                      name: "LNC",
                      entityId: "LP16165-0",
                    },
                    {
                      name: "MEDCIN",
                      entityId: "40458",
                    },
                    {
                      name: "MMSL",
                      entityId: "d00015",
                    },
                    {
                      name: "MSH",
                      entityId: "D007052",
                    },
                    {
                      name: "MTHSPL",
                      entityId: "WK2XYI10QM",
                    },
                    {
                      name: "NCI",
                      entityId: "C561",
                    },
                    {
                      name: "NCI_CTRP",
                      entityId: "C561",
                    },
                    {
                      name: "NCI_DCP",
                      entityId: "00803",
                    },
                    {
                      name: "NCI_DTP",
                      entityId: "NSC0256857",
                    },
                    {
                      name: "NCI_FDA",
                      entityId: "WK2XYI10QM",
                    },
                    {
                      name: "NCI_NCI-GLOSS",
                      entityId: "CDR0000613511",
                    },
                    {
                      name: "NDDF",
                      entityId: "002377",
                    },
                    {
                      name: "PDQ",
                      entityId: "CDR0000040475",
                    },
                    {
                      name: "RCD",
                      entityId: "x02MO",
                    },
                    {
                      name: "RXNORM",
                      entityId: "5640",
                    },
                    {
                      name: "SNM",
                      entityId: "E-7772",
                    },
                    {
                      name: "SNMI",
                      entityId: "C-603C0",
                    },
                    {
                      name: "SNOMEDCT_US",
                      entityId: "387207008",
                    },
                    {
                      name: "USP",
                      entityId: "m39860",
                    },
                    {
                      name: "USPMG",
                      entityId: "MTHU000060",
                    },
                    {
                      name: "VANDF",
                      entityId: "4017840",
                    },
                  ],
                  text: "ibuprofen",
                  category: "MedicationName",
                  offset: 17,
                  length: 9,
                  confidenceScore: 1,
                  normalizedText: "ibuprofen",
                },
                name: "Medication",
              },
            ],
          },
          {
            relationType: "FrequencyOfMedication",
            confidenceScore: 1,
            roles: [
              {
                entity: {
                  dataSources: [
                    {
                      name: "UMLS",
                      entityId: "C0020740",
                    },
                    {
                      name: "AOD",
                      entityId: "0000019879",
                    },
                    {
                      name: "ATC",
                      entityId: "M01AE01",
                    },
                    {
                      name: "CCPSS",
                      entityId: "0046165",
                    },
                    {
                      name: "CHV",
                      entityId: "0000006519",
                    },
                    {
                      name: "CSP",
                      entityId: "2270-2077",
                    },
                    {
                      name: "DRUGBANK",
                      entityId: "DB01050",
                    },
                    {
                      name: "GS",
                      entityId: "1611",
                    },
                    {
                      name: "LCH_NW",
                      entityId: "sh97005926",
                    },
                    {
                      name: "LNC",
                      entityId: "LP16165-0",
                    },
                    {
                      name: "MEDCIN",
                      entityId: "40458",
                    },
                    {
                      name: "MMSL",
                      entityId: "d00015",
                    },
                    {
                      name: "MSH",
                      entityId: "D007052",
                    },
                    {
                      name: "MTHSPL",
                      entityId: "WK2XYI10QM",
                    },
                    {
                      name: "NCI",
                      entityId: "C561",
                    },
                    {
                      name: "NCI_CTRP",
                      entityId: "C561",
                    },
                    {
                      name: "NCI_DCP",
                      entityId: "00803",
                    },
                    {
                      name: "NCI_DTP",
                      entityId: "NSC0256857",
                    },
                    {
                      name: "NCI_FDA",
                      entityId: "WK2XYI10QM",
                    },
                    {
                      name: "NCI_NCI-GLOSS",
                      entityId: "CDR0000613511",
                    },
                    {
                      name: "NDDF",
                      entityId: "002377",
                    },
                    {
                      name: "PDQ",
                      entityId: "CDR0000040475",
                    },
                    {
                      name: "RCD",
                      entityId: "x02MO",
                    },
                    {
                      name: "RXNORM",
                      entityId: "5640",
                    },
                    {
                      name: "SNM",
                      entityId: "E-7772",
                    },
                    {
                      name: "SNMI",
                      entityId: "C-603C0",
                    },
                    {
                      name: "SNOMEDCT_US",
                      entityId: "387207008",
                    },
                    {
                      name: "USP",
                      entityId: "m39860",
                    },
                    {
                      name: "USPMG",
                      entityId: "MTHU000060",
                    },
                    {
                      name: "VANDF",
                      entityId: "4017840",
                    },
                  ],
                  text: "ibuprofen",
                  category: "MedicationName",
                  offset: 17,
                  length: 9,
                  confidenceScore: 1,
                  normalizedText: "ibuprofen",
                },
                name: "Medication",
              },
              {
                entity: {
                  dataSources: [],
                  text: "twice daily",
                  category: "Frequency",
                  offset: 34,
                  length: 11,
                  confidenceScore: 1,
                },
                name: "Frequency",
              },
            ],
          },
        ],
        id: "1",
        warnings: [],
        fhirBundle: {
          resourceType: "Bundle",
          id: "2d625a4a-39d4-48c2-9ec9-b09ceded1923",
          meta: {
            profile: ["http://hl7.org/fhir/4.0.1/StructureDefinition/Bundle"],
          },
          identifier: {
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:2d625a4a-39d4-48c2-9ec9-b09ceded1923",
          },
          type: "document",
          entry: [
            {
              fullUrl: "Composition/c2bbbf05-ed68-4efa-b2fe-c63e8c30bfc7",
              resource: {
                resourceType: "Composition",
                id: "c2bbbf05-ed68-4efa-b2fe-c63e8c30bfc7",
                status: "final",
                type: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "11526-1",
                      display: "Pathology study",
                    },
                  ],
                  text: "Pathology study",
                },
                subject: {
                  reference: "Patient/25a33aa6-366f-4b6a-bcd0-75127fb62118",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/9f4ffa88-6422-4c70-a5e1-4c8c1b7c768d",
                  type: "Encounter",
                  display: "unknown",
                },
                date: "2022-10-08",
                author: [
                  {
                    reference: "Practitioner/b335a2b3-98f9-460d-a3ca-ea5e00d917e3",
                    type: "Practitioner",
                    display: "Unknown",
                  },
                ],
                title: "Pathology study",
                section: [
                  {
                    title: "General",
                    code: {
                      coding: [
                        {
                          system: "",
                          display: "Unrecognized Section",
                        },
                      ],
                      text: "General",
                    },
                    text: {
                      status: "additional",
                      div: "<div>\r\n\t\t\t\t\t\t\t<h1>General</h1>\r\n\t\t\t\t\t\t\t<p>Prescribed 100mg ibuprofen, taken twice daily.</p>\r\n\t\t\t\t\t</div>",
                    },
                    entry: [
                      {
                        reference: "List/b2e73b7b-999b-440d-8522-dd08a675b63d",
                        type: "List",
                        display: "General",
                      },
                    ],
                  },
                ],
              },
            },
            {
              fullUrl: "Practitioner/b335a2b3-98f9-460d-a3ca-ea5e00d917e3",
              resource: {
                resourceType: "Practitioner",
                id: "b335a2b3-98f9-460d-a3ca-ea5e00d917e3",
                name: [
                  {
                    text: "Unknown",
                    family: "Unknown",
                  },
                ],
              },
            },
            {
              fullUrl: "Patient/25a33aa6-366f-4b6a-bcd0-75127fb62118",
              resource: {
                resourceType: "Patient",
                id: "25a33aa6-366f-4b6a-bcd0-75127fb62118",
                gender: "unknown",
              },
            },
            {
              fullUrl: "Encounter/9f4ffa88-6422-4c70-a5e1-4c8c1b7c768d",
              resource: {
                resourceType: "Encounter",
                id: "9f4ffa88-6422-4c70-a5e1-4c8c1b7c768d",
                meta: {
                  profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter"],
                },
                status: "finished",
                class: {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                  display: "unknown",
                },
                subject: {
                  reference: "Patient/25a33aa6-366f-4b6a-bcd0-75127fb62118",
                  type: "Patient",
                },
                period: {
                  start: "2022-10-08",
                  end: "2022-10-08",
                },
              },
            },
            {
              fullUrl: "MedicationStatement/6e48775e-9788-4d75-b2e1-9304656c6800",
              resource: {
                resourceType: "MedicationStatement",
                id: "6e48775e-9788-4d75-b2e1-9304656c6800",
                extension: [
                  {
                    extension: [
                      {
                        url: "offset",
                        valueInteger: 17,
                      },
                      {
                        url: "length",
                        valueInteger: 9,
                      },
                    ],
                    url: "http://hl7.org/fhir/StructureDefinition/derivation-reference",
                  },
                ],
                status: "active",
                medicationCodeableConcept: {
                  coding: [
                    {
                      system: "http://www.nlm.nih.gov/research/umls",
                      code: "C0020740",
                      display: "ibuprofen",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/aod",
                      code: "0000019879",
                    },
                    {
                      system: "http://www.whocc.no/atc",
                      code: "M01AE01",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccpss",
                      code: "0046165",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/chv",
                      code: "0000006519",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/csp",
                      code: "2270-2077",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/drugbank",
                      code: "DB01050",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/gs",
                      code: "1611",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch_nw",
                      code: "sh97005926",
                    },
                    {
                      system: "http://loinc.org",
                      code: "LP16165-0",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medcin",
                      code: "40458",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mmsl",
                      code: "d00015",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/msh",
                      code: "D007052",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mthspl",
                      code: "WK2XYI10QM",
                    },
                    {
                      system: "http://ncimeta.nci.nih.gov",
                      code: "C561",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_ctrp",
                      code: "C561",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_dcp",
                      code: "00803",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_dtp",
                      code: "NSC0256857",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_fda",
                      code: "WK2XYI10QM",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                      code: "CDR0000613511",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nddf",
                      code: "002377",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/pdq",
                      code: "CDR0000040475",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rcd",
                      code: "x02MO",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                      code: "5640",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "E-7772",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "C-603C0",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "387207008",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/usp",
                      code: "m39860",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/uspmg",
                      code: "MTHU000060",
                    },
                    {
                      system: "http://hl7.org/fhir/ndfrt",
                      code: "4017840",
                    },
                  ],
                  text: "ibuprofen",
                },
                subject: {
                  reference: "Patient/25a33aa6-366f-4b6a-bcd0-75127fb62118",
                  type: "Patient",
                },
                context: {
                  reference: "Encounter/9f4ffa88-6422-4c70-a5e1-4c8c1b7c768d",
                  type: "Encounter",
                  display: "unknown",
                },
                dosage: [
                  {
                    text: "100mg",
                    timing: {
                      repeat: {
                        frequency: 2,
                        period: 1,
                        periodUnit: "d",
                      },
                      code: {
                        text: "twice daily",
                      },
                    },
                    doseAndRate: [
                      {
                        doseQuantity: {
                          value: 100,
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              fullUrl: "List/b2e73b7b-999b-440d-8522-dd08a675b63d",
              resource: {
                resourceType: "List",
                id: "b2e73b7b-999b-440d-8522-dd08a675b63d",
                status: "current",
                mode: "snapshot",
                title: "General",
                subject: {
                  reference: "Patient/25a33aa6-366f-4b6a-bcd0-75127fb62118",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/9f4ffa88-6422-4c70-a5e1-4c8c1b7c768d",
                  type: "Encounter",
                  display: "unknown",
                },
                entry: [
                  {
                    item: {
                      reference: "MedicationStatement/6e48775e-9788-4d75-b2e1-9304656c6800",
                      type: "MedicationStatement",
                      display: "ibuprofen",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        entities: [
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0021270",
              },
              {
                name: "AOD",
                entityId: "0000005273",
              },
              {
                name: "CCPSS",
                entityId: "0030805",
              },
              {
                name: "CHV",
                entityId: "0000006675",
              },
              {
                name: "DXP",
                entityId: "U002089",
              },
              {
                name: "LCH",
                entityId: "U002421",
              },
              {
                name: "LCH_NW",
                entityId: "sh85066022",
              },
              {
                name: "LNC",
                entityId: "LA19747-7",
              },
              {
                name: "MDR",
                entityId: "10021731",
              },
              {
                name: "MSH",
                entityId: "D007223",
              },
              {
                name: "NCI",
                entityId: "C27956",
              },
              {
                name: "NCI_FDA",
                entityId: "C27956",
              },
              {
                name: "NCI_NICHD",
                entityId: "C27956",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "133931009",
              },
            ],
            text: "Baby",
            category: "Age",
            offset: 0,
            length: 4,
            confidenceScore: 0.94,
            normalizedText: "Infant",
          },
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0025289",
              },
              {
                name: "AOD",
                entityId: "0000006185",
              },
              {
                name: "BI",
                entityId: "BI00546",
              },
              {
                name: "CCPSS",
                entityId: "1018016",
              },
              {
                name: "CCSR_10",
                entityId: "NVS001",
              },
              {
                name: "CCSR_ICD10CM",
                entityId: "NVS001",
              },
              {
                name: "CHV",
                entityId: "0000007932",
              },
              {
                name: "COSTAR",
                entityId: "478",
              },
              {
                name: "CSP",
                entityId: "2042-5301",
              },
              {
                name: "CST",
                entityId: "MENINGITIS",
              },
              {
                name: "DXP",
                entityId: "U002543",
              },
              {
                name: "HPO",
                entityId: "HP:0001287",
              },
              {
                name: "ICD10",
                entityId: "G03.9",
              },
              {
                name: "ICD10AM",
                entityId: "G03.9",
              },
              {
                name: "ICD10CM",
                entityId: "G03.9",
              },
              {
                name: "ICD9CM",
                entityId: "322.9",
              },
              {
                name: "ICPC2ICD10ENG",
                entityId: "MTHU048434",
              },
              {
                name: "ICPC2P",
                entityId: "N71002",
              },
              {
                name: "LCH",
                entityId: "U002901",
              },
              {
                name: "LCH_NW",
                entityId: "sh85083562",
              },
              {
                name: "LNC",
                entityId: "LP20756-0",
              },
              {
                name: "MDR",
                entityId: "10027199",
              },
              {
                name: "MEDCIN",
                entityId: "31192",
              },
              {
                name: "MEDLINEPLUS",
                entityId: "324",
              },
              {
                name: "MSH",
                entityId: "D008581",
              },
              {
                name: "NANDA-I",
                entityId: "02899",
              },
              {
                name: "NCI",
                entityId: "C26828",
              },
              {
                name: "NCI_CPTAC",
                entityId: "C26828",
              },
              {
                name: "NCI_CTCAE",
                entityId: "E11458",
              },
              {
                name: "NCI_FDA",
                entityId: "2389",
              },
              {
                name: "NCI_NCI-GLOSS",
                entityId: "CDR0000471780",
              },
              {
                name: "NCI_NICHD",
                entityId: "C26828",
              },
              {
                name: "NCI_caDSR",
                entityId: "C26828",
              },
              {
                name: "OMIM",
                entityId: "MTHU005994",
              },
              {
                name: "PSY",
                entityId: "30660",
              },
              {
                name: "RCD",
                entityId: "X000H",
              },
              {
                name: "SNM",
                entityId: "M-40000",
              },
              {
                name: "SNMI",
                entityId: "DA-10010",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "7180009",
              },
              {
                name: "WHO",
                entityId: "0955",
              },
            ],
            text: "Meningitis",
            category: "Diagnosis",
            offset: 24,
            length: 10,
            confidenceScore: 1,
            assertion: {
              certainty: "negativePossible",
            },
            normalizedText: "Meningitis",
          },
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0015967",
              },
              {
                name: "AIR",
                entityId: "FEVER",
              },
              {
                name: "AOD",
                entityId: "0000004396",
              },
              {
                name: "BI",
                entityId: "BI00751",
              },
              {
                name: "CCC",
                entityId: "K25.2",
              },
              {
                name: "CCPSS",
                entityId: "1017166",
              },
              {
                name: "CCSR_10",
                entityId: "SYM002",
              },
              {
                name: "CCSR_ICD10CM",
                entityId: "SYM002",
              },
              {
                name: "CHV",
                entityId: "0000005010",
              },
              {
                name: "COSTAR",
                entityId: "300",
              },
              {
                name: "CPM",
                entityId: "65287",
              },
              {
                name: "CSP",
                entityId: "2871-4310",
              },
              {
                name: "CST",
                entityId: "FEVER",
              },
              {
                name: "DXP",
                entityId: "U001483",
              },
              {
                name: "GO",
                entityId: "GO:0001660",
              },
              {
                name: "HPO",
                entityId: "HP:0001945",
              },
              {
                name: "ICD10",
                entityId: "R50.9",
              },
              {
                name: "ICD10AM",
                entityId: "R50.9",
              },
              {
                name: "ICD10CM",
                entityId: "R50.9",
              },
              {
                name: "ICD9CM",
                entityId: "780.60",
              },
              {
                name: "ICNP",
                entityId: "10041539",
              },
              {
                name: "ICPC",
                entityId: "A03",
              },
              {
                name: "ICPC2EENG",
                entityId: "A03",
              },
              {
                name: "ICPC2ICD10ENG",
                entityId: "MTHU041751",
              },
              {
                name: "ICPC2P",
                entityId: "A03002",
              },
              {
                name: "LCH",
                entityId: "U001776",
              },
              {
                name: "LCH_NW",
                entityId: "sh85047994",
              },
              {
                name: "LNC",
                entityId: "MTHU013518",
              },
              {
                name: "MDR",
                entityId: "10005911",
              },
              {
                name: "MEDCIN",
                entityId: "6005",
              },
              {
                name: "MEDLINEPLUS",
                entityId: "511",
              },
              {
                name: "MSH",
                entityId: "D005334",
              },
              {
                name: "MTHICD9",
                entityId: "780.60",
              },
              {
                name: "NANDA-I",
                entityId: "01128",
              },
              {
                name: "NCI",
                entityId: "C3038",
              },
              {
                name: "NCI_CTCAE",
                entityId: "E11102",
              },
              {
                name: "NCI_FDA",
                entityId: "1858",
              },
              {
                name: "NCI_GDC",
                entityId: "C3038",
              },
              {
                name: "NCI_NCI-GLOSS",
                entityId: "CDR0000450108",
              },
              {
                name: "NCI_NICHD",
                entityId: "C3038",
              },
              {
                name: "NCI_caDSR",
                entityId: "C3038",
              },
              {
                name: "NOC",
                entityId: "070307",
              },
              {
                name: "OMIM",
                entityId: "MTHU005439",
              },
              {
                name: "OMS",
                entityId: "50.03",
              },
              {
                name: "PCDS",
                entityId: "PRB_11020.02",
              },
              {
                name: "PDQ",
                entityId: "CDR0000775882",
              },
              {
                name: "PSY",
                entityId: "23840",
              },
              {
                name: "QMR",
                entityId: "Q0200115",
              },
              {
                name: "RCD",
                entityId: "X76EI",
              },
              {
                name: "SNM",
                entityId: "F-03003",
              },
              {
                name: "SNMI",
                entityId: "F-03003",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "386661006",
              },
              {
                name: "WHO",
                entityId: "0725",
              },
            ],
            text: "fever",
            category: "SymptomOrSign",
            offset: 47,
            length: 5,
            confidenceScore: 0.98,
            normalizedText: "Fever",
          },
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0026591",
              },
              {
                name: "AOD",
                entityId: "0000027173",
              },
              {
                name: "CCPSS",
                entityId: "U000286",
              },
              {
                name: "CHV",
                entityId: "0000008266",
              },
              {
                name: "CSP",
                entityId: "1124-5492",
              },
              {
                name: "HL7V3.0",
                entityId: "MTH",
              },
              {
                name: "LCH",
                entityId: "U003028",
              },
              {
                name: "LCH_NW",
                entityId: "sh85087526",
              },
              {
                name: "LNC",
                entityId: "LA10417-6",
              },
              {
                name: "MSH",
                entityId: "D009035",
              },
              {
                name: "NCI",
                entityId: "C25189",
              },
              {
                name: "NCI_CDISC",
                entityId: "C25189",
              },
              {
                name: "NCI_GDC",
                entityId: "C25189",
              },
              {
                name: "NCI_caDSR",
                entityId: "C25189",
              },
              {
                name: "PSY",
                entityId: "32140",
              },
              {
                name: "RCD",
                entityId: "X78ym",
              },
              {
                name: "SNMI",
                entityId: "S-10120",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "72705000",
              },
            ],
            text: "mother",
            category: "FamilyRelation",
            offset: 60,
            length: 6,
            confidenceScore: 0.99,
            normalizedText: "Mother (person)",
          },
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0030842",
              },
              {
                name: "AOD",
                entityId: "0000019206",
              },
              {
                name: "ATC",
                entityId: "J01C",
              },
              {
                name: "CCPSS",
                entityId: "0014106",
              },
              {
                name: "CHV",
                entityId: "0000009423",
              },
              {
                name: "CSP",
                entityId: "0199-8025",
              },
              {
                name: "GS",
                entityId: "4011",
              },
              {
                name: "LCH",
                entityId: "U003521",
              },
              {
                name: "LCH_NW",
                entityId: "sh85099402",
              },
              {
                name: "LNC",
                entityId: "LP14319-5",
              },
              {
                name: "MEDCIN",
                entityId: "40319",
              },
              {
                name: "MMSL",
                entityId: "d00116",
              },
              {
                name: "MSH",
                entityId: "D010406",
              },
              {
                name: "NCI",
                entityId: "C1500",
              },
              {
                name: "NCI_DTP",
                entityId: "NSC0402815",
              },
              {
                name: "NCI_NCI-GLOSS",
                entityId: "CDR0000045296",
              },
              {
                name: "NDDF",
                entityId: "016121",
              },
              {
                name: "PSY",
                entityId: "37190",
              },
              {
                name: "RCD",
                entityId: "x009C",
              },
              {
                name: "SNM",
                entityId: "E-7260",
              },
              {
                name: "SNMI",
                entityId: "C-54000",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "764146007",
              },
              {
                name: "VANDF",
                entityId: "4019880",
              },
            ],
            text: "Penicillin",
            category: "MedicationName",
            offset: 77,
            length: 10,
            confidenceScore: 0.84,
            assertion: {
              certainty: "neutralPossible",
            },
            normalizedText: "penicillins",
          },
          {
            dataSources: [
              {
                name: "UMLS",
                entityId: "C0021270",
              },
              {
                name: "AOD",
                entityId: "0000005273",
              },
              {
                name: "CCPSS",
                entityId: "0030805",
              },
              {
                name: "CHV",
                entityId: "0000006675",
              },
              {
                name: "DXP",
                entityId: "U002089",
              },
              {
                name: "LCH",
                entityId: "U002421",
              },
              {
                name: "LCH_NW",
                entityId: "sh85066022",
              },
              {
                name: "LNC",
                entityId: "LA19747-7",
              },
              {
                name: "MDR",
                entityId: "10021731",
              },
              {
                name: "MSH",
                entityId: "D007223",
              },
              {
                name: "NCI",
                entityId: "C27956",
              },
              {
                name: "NCI_FDA",
                entityId: "C27956",
              },
              {
                name: "NCI_NICHD",
                entityId: "C27956",
              },
              {
                name: "SNOMEDCT_US",
                entityId: "133931009",
              },
            ],
            text: "baby",
            category: "FamilyRelation",
            offset: 96,
            length: 4,
            confidenceScore: 1,
            normalizedText: "Infant",
          },
        ],
        entityRelations: [],
        id: "2",
        warnings: [],
        fhirBundle: {
          resourceType: "Bundle",
          id: "96684605-4d17-47e5-b93c-41cd6adce346",
          meta: {
            profile: ["http://hl7.org/fhir/4.0.1/StructureDefinition/Bundle"],
          },
          identifier: {
            system: "urn:ietf:rfc:3986",
            value: "urn:uuid:96684605-4d17-47e5-b93c-41cd6adce346",
          },
          type: "document",
          entry: [
            {
              fullUrl: "Composition/558c82b5-4f10-49bc-a9ba-a1e83a0a2839",
              resource: {
                resourceType: "Composition",
                id: "558c82b5-4f10-49bc-a9ba-a1e83a0a2839",
                status: "final",
                type: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "11526-1",
                      display: "Pathology study",
                    },
                  ],
                  text: "Pathology study",
                },
                subject: {
                  reference: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8d75645e-a6f3-4893-821c-369a3d2bb2aa",
                  type: "Encounter",
                  display: "unknown",
                },
                date: "2022-10-08",
                author: [
                  {
                    reference: "Practitioner/49882566-5685-4268-9966-f5e9bf404626",
                    type: "Practitioner",
                    display: "Unknown",
                  },
                ],
                title: "Pathology study",
                section: [
                  {
                    title: "General",
                    code: {
                      coding: [
                        {
                          system: "",
                          display: "Unrecognized Section",
                        },
                      ],
                      text: "General",
                    },
                    text: {
                      status: "additional",
                      div: "<div>\r\n\t\t\t\t\t\t\t<h1>General</h1>\r\n\t\t\t\t\t\t\t<p>Baby not likely to have Meningitis. in case of fever in the mother, consider Penicillin for the baby too.</p>\r\n\t\t\t\t\t</div>",
                    },
                    entry: [
                      {
                        reference: "List/fd55a7ac-f237-4208-aa38-fbf4a7c51a82",
                        type: "List",
                        display: "General",
                      },
                    ],
                  },
                ],
              },
            },
            {
              fullUrl: "Practitioner/49882566-5685-4268-9966-f5e9bf404626",
              resource: {
                resourceType: "Practitioner",
                id: "49882566-5685-4268-9966-f5e9bf404626",
                name: [
                  {
                    text: "Unknown",
                    family: "Unknown",
                  },
                ],
              },
            },
            {
              fullUrl: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
              resource: {
                resourceType: "Patient",
                id: "4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                gender: "unknown",
              },
            },
            {
              fullUrl: "Encounter/8d75645e-a6f3-4893-821c-369a3d2bb2aa",
              resource: {
                resourceType: "Encounter",
                id: "8d75645e-a6f3-4893-821c-369a3d2bb2aa",
                meta: {
                  profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter"],
                },
                status: "finished",
                class: {
                  system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                  display: "unknown",
                },
                subject: {
                  reference: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                  type: "Patient",
                },
                period: {
                  start: "2022-10-08",
                  end: "2022-10-08",
                },
              },
            },
            {
              fullUrl: "Condition/1418363e-c718-4760-b18c-a433928d1068",
              resource: {
                resourceType: "Condition",
                id: "1418363e-c718-4760-b18c-a433928d1068",
                meta: {
                  profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-condition"],
                },
                extension: [
                  {
                    extension: [
                      {
                        url: "offset",
                        valueInteger: 24,
                      },
                      {
                        url: "length",
                        valueInteger: 10,
                      },
                    ],
                    url: "http://hl7.org/fhir/StructureDefinition/derivation-reference",
                  },
                ],
                verificationStatus: {
                  coding: [
                    {
                      system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                      code: "unconfirmed",
                      display: "Unconfirmed",
                    },
                  ],
                  text: "Unconfirmed",
                },
                category: [
                  {
                    coding: [
                      {
                        system: "http://terminology.hl7.org/CodeSystem/condition-category",
                        code: "encounter-diagnosis",
                        display: "Encounter Diagnosis",
                      },
                    ],
                    text: "Encounter Diagnosis",
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://www.nlm.nih.gov/research/umls",
                      code: "C0025289",
                      display: "Meningitis",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/aod",
                      code: "0000006185",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/bi",
                      code: "BI00546",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccpss",
                      code: "1018016",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccsr_10",
                      code: "NVS001",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccsr_icd10cm",
                      code: "NVS001",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/chv",
                      code: "0000007932",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/costar",
                      code: "478",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/csp",
                      code: "2042-5301",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/cst",
                      code: "MENINGITIS",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/dxp",
                      code: "U002543",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/hpo",
                      code: "HP:0001287",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10",
                      code: "G03.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10-am",
                      code: "G03.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10-cm",
                      code: "G03.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-9-cm",
                      code: "322.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icpc2icd10eng",
                      code: "MTHU048434",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icpc-2p",
                      code: "N71002",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch",
                      code: "U002901",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch_nw",
                      code: "sh85083562",
                    },
                    {
                      system: "http://loinc.org",
                      code: "LP20756-0",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mdr",
                      code: "10027199",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medcin",
                      code: "31192",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medlineplus",
                      code: "324",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/msh",
                      code: "D008581",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nanda-i",
                      code: "02899",
                    },
                    {
                      system: "http://ncimeta.nci.nih.gov",
                      code: "C26828",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_cptac",
                      code: "C26828",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_ctcae",
                      code: "E11458",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_fda",
                      code: "2389",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                      code: "CDR0000471780",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nichd",
                      code: "C26828",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_cadsr",
                      code: "C26828",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/omim",
                      code: "MTHU005994",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/psy",
                      code: "30660",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rcd",
                      code: "X000H",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "M-40000",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "DA-10010",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "7180009",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/who",
                      code: "0955",
                    },
                  ],
                  text: "Meningitis",
                },
                subject: {
                  reference: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8d75645e-a6f3-4893-821c-369a3d2bb2aa",
                  type: "Encounter",
                  display: "unknown",
                },
              },
            },
            {
              fullUrl: "Observation/99a0b903-03db-4cff-8eac-065c57c01385",
              resource: {
                resourceType: "Observation",
                id: "99a0b903-03db-4cff-8eac-065c57c01385",
                extension: [
                  {
                    extension: [
                      {
                        url: "offset",
                        valueInteger: 47,
                      },
                      {
                        url: "length",
                        valueInteger: 5,
                      },
                    ],
                    url: "http://hl7.org/fhir/StructureDefinition/derivation-reference",
                  },
                ],
                status: "final",
                category: [
                  {
                    coding: [
                      {
                        system: "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "exam",
                        display: "Exam",
                      },
                    ],
                    text: "Exam",
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://www.nlm.nih.gov/research/umls",
                      code: "C0015967",
                      display: "Fever",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/air",
                      code: "FEVER",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/aod",
                      code: "0000004396",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/bi",
                      code: "BI00751",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccc",
                      code: "K25.2",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccpss",
                      code: "1017166",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccsr_10",
                      code: "SYM002",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccsr_icd10cm",
                      code: "SYM002",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/chv",
                      code: "0000005010",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/costar",
                      code: "300",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/cpm",
                      code: "65287",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/csp",
                      code: "2871-4310",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/cst",
                      code: "FEVER",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/dxp",
                      code: "U001483",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/go",
                      code: "GO:0001660",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/hpo",
                      code: "HP:0001945",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10",
                      code: "R50.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10-am",
                      code: "R50.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-10-cm",
                      code: "R50.9",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icd-9-cm",
                      code: "780.60",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/icnp",
                      code: "10041539",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/icpc",
                      code: "A03",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/icpc2eeng",
                      code: "A03",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icpc2icd10eng",
                      code: "MTHU041751",
                    },
                    {
                      system: "http://hl7.org/fhir/sid/icpc-2p",
                      code: "A03002",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch",
                      code: "U001776",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch_nw",
                      code: "sh85047994",
                    },
                    {
                      system: "http://loinc.org",
                      code: "MTHU013518",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mdr",
                      code: "10005911",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medcin",
                      code: "6005",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medlineplus",
                      code: "511",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/msh",
                      code: "D005334",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mthicd9",
                      code: "780.60",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nanda-i",
                      code: "01128",
                    },
                    {
                      system: "http://ncimeta.nci.nih.gov",
                      code: "C3038",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_ctcae",
                      code: "E11102",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_fda",
                      code: "1858",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_gdc",
                      code: "C3038",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                      code: "CDR0000450108",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nichd",
                      code: "C3038",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_cadsr",
                      code: "C3038",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/noc",
                      code: "070307",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/omim",
                      code: "MTHU005439",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/oms",
                      code: "50.03",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/pcds",
                      code: "PRB_11020.02",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/pdq",
                      code: "CDR0000775882",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/psy",
                      code: "23840",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/qmr",
                      code: "Q0200115",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rcd",
                      code: "X76EI",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "F-03003",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "F-03003",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "386661006",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/who",
                      code: "0725",
                    },
                  ],
                  text: "fever",
                },
                subject: {
                  reference: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8d75645e-a6f3-4893-821c-369a3d2bb2aa",
                  type: "Encounter",
                  display: "unknown",
                },
                interpretation: [
                  {
                    coding: [
                      {
                        system:
                          "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                        code: "POS",
                        display: "Positive",
                      },
                    ],
                    text: "Positive",
                  },
                ],
              },
            },
            {
              fullUrl: "MedicationStatement/9e0910da-742e-45e9-adfc-608188e1be2b",
              resource: {
                resourceType: "MedicationStatement",
                id: "9e0910da-742e-45e9-adfc-608188e1be2b",
                extension: [
                  {
                    extension: [
                      {
                        url: "offset",
                        valueInteger: 77,
                      },
                      {
                        url: "length",
                        valueInteger: 10,
                      },
                    ],
                    url: "http://hl7.org/fhir/StructureDefinition/derivation-reference",
                  },
                ],
                status: "unknown",
                medicationCodeableConcept: {
                  coding: [
                    {
                      system: "http://www.nlm.nih.gov/research/umls",
                      code: "C0030842",
                      display: "penicillins",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/aod",
                      code: "0000019206",
                    },
                    {
                      system: "http://www.whocc.no/atc",
                      code: "J01C",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/ccpss",
                      code: "0014106",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/chv",
                      code: "0000009423",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/csp",
                      code: "0199-8025",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/gs",
                      code: "4011",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch",
                      code: "U003521",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/lch_nw",
                      code: "sh85099402",
                    },
                    {
                      system: "http://loinc.org",
                      code: "LP14319-5",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/medcin",
                      code: "40319",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/mmsl",
                      code: "d00116",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/msh",
                      code: "D010406",
                    },
                    {
                      system: "http://ncimeta.nci.nih.gov",
                      code: "C1500",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_dtp",
                      code: "NSC0402815",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nci_nci-gloss",
                      code: "CDR0000045296",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/nddf",
                      code: "016121",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/psy",
                      code: "37190",
                    },
                    {
                      system: "http://www.nlm.nih.gov/research/umls/rcd",
                      code: "x009C",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "E-7260",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "C-54000",
                    },
                    {
                      system: "http://snomed.info/sct",
                      code: "764146007",
                    },
                    {
                      system: "http://hl7.org/fhir/ndfrt",
                      code: "4019880",
                    },
                  ],
                  text: "Penicillin",
                },
                subject: {
                  reference: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                  type: "Patient",
                },
                context: {
                  reference: "Encounter/8d75645e-a6f3-4893-821c-369a3d2bb2aa",
                  type: "Encounter",
                  display: "unknown",
                },
              },
            },
            {
              fullUrl: "List/fd55a7ac-f237-4208-aa38-fbf4a7c51a82",
              resource: {
                resourceType: "List",
                id: "fd55a7ac-f237-4208-aa38-fbf4a7c51a82",
                status: "current",
                mode: "snapshot",
                title: "General",
                subject: {
                  reference: "Patient/4a7e292e-8925-46c7-8a5c-cf256ee612b5",
                  type: "Patient",
                },
                encounter: {
                  reference: "Encounter/8d75645e-a6f3-4893-821c-369a3d2bb2aa",
                  type: "Encounter",
                  display: "unknown",
                },
                entry: [
                  {
                    item: {
                      reference: "Condition/1418363e-c718-4760-b18c-a433928d1068",
                      type: "Condition",
                      display: "Meningitis",
                    },
                  },
                  {
                    item: {
                      reference: "Observation/99a0b903-03db-4cff-8eac-065c57c01385",
                      type: "Observation",
                      display: "fever",
                    },
                  },
                  {
                    item: {
                      reference: "MedicationStatement/9e0910da-742e-45e9-adfc-608188e1be2b",
                      type: "MedicationStatement",
                      display: "Penicillin",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation26: AnalyzeBatchResult[] = [
  {
    kind: "Healthcare",
    results: [
      {
        entities: [
          {
            dataSources: [
              { name: "UMLS", entityId: "C0020538" },
              { name: "AOD", entityId: "0000023317" },
              { name: "BI", entityId: "BI00001" },
              { name: "CCPSS", entityId: "1017493" },
              { name: "CCS", entityId: "7.1" },
              { name: "CHV", entityId: "0000015800" },
              { name: "COSTAR", entityId: "397" },
              { name: "CSP", entityId: "0571-5243" },
              { name: "CST", entityId: "HYPERTENS" },
              { name: "DXP", entityId: "U002034" },
              { name: "HPO", entityId: "HP:0000822" },
              { name: "ICD10", entityId: "I10-I15.9" },
              { name: "ICD10AM", entityId: "I10-I15.9" },
              { name: "ICD10CM", entityId: "I10" },
              { name: "ICD9CM", entityId: "997.91" },
              { name: "ICPC2ICD10ENG", entityId: "MTHU035456" },
              { name: "ICPC2P", entityId: "K85004" },
              { name: "LCH", entityId: "U002317" },
              { name: "LCH_NW", entityId: "sh85063723" },
              { name: "LNC", entityId: "LA14293-7" },
              { name: "MDR", entityId: "10020772" },
              { name: "MEDCIN", entityId: "33288" },
              { name: "MEDLINEPLUS", entityId: "34" },
              { name: "MSH", entityId: "D006973" },
              { name: "MTH", entityId: "005" },
              { name: "MTHICD9", entityId: "997.91" },
              { name: "NANDA-I", entityId: "00905" },
              { name: "NCI", entityId: "C3117" },
              { name: "NCI_CPTAC", entityId: "C3117" },
              { name: "NCI_CTCAE", entityId: "E13785" },
              { name: "NCI_CTRP", entityId: "C3117" },
              { name: "NCI_FDA", entityId: "1908" },
              { name: "NCI_GDC", entityId: "C3117" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000458091" },
              { name: "NCI_NICHD", entityId: "C3117" },
              { name: "NCI_caDSR", entityId: "C3117" },
              { name: "NOC", entityId: "060808" },
              { name: "OMIM", entityId: "MTHU002068" },
              { name: "PCDS", entityId: "PRB_11000.06" },
              { name: "PDQ", entityId: "CDR0000686951" },
              { name: "PSY", entityId: "23830" },
              { name: "RCD", entityId: "XE0Ub" },
              { name: "SNM", entityId: "F-70700" },
              { name: "SNMI", entityId: "D3-02000" },
              { name: "SNOMEDCT_US", entityId: "38341003" },
              { name: "WHO", entityId: "0210" },
            ],
            text: "high blood pressure",
            category: "SymptomOrSign",
            offset: 29,
            length: 19,
            confidenceScore: 1,
            assertion: { certainty: "negative" },
            normalizedText: "Hypertensive disease",
          },
        ],
        entityRelations: [],
        id: "0",
        warnings: [],
      },
      {
        entities: [
          {
            dataSources: [],
            text: "100mg",
            category: "Dosage",
            offset: 11,
            length: 5,
            confidenceScore: 0.98,
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0020740" },
              { name: "AOD", entityId: "0000019879" },
              { name: "ATC", entityId: "M01AE01" },
              { name: "CCPSS", entityId: "0046165" },
              { name: "CHV", entityId: "0000006519" },
              { name: "CSP", entityId: "2270-2077" },
              { name: "DRUGBANK", entityId: "DB01050" },
              { name: "GS", entityId: "1611" },
              { name: "LCH_NW", entityId: "sh97005926" },
              { name: "LNC", entityId: "LP16165-0" },
              { name: "MEDCIN", entityId: "40458" },
              { name: "MMSL", entityId: "d00015" },
              { name: "MSH", entityId: "D007052" },
              { name: "MTHSPL", entityId: "WK2XYI10QM" },
              { name: "NCI", entityId: "C561" },
              { name: "NCI_CTRP", entityId: "C561" },
              { name: "NCI_DCP", entityId: "00803" },
              { name: "NCI_DTP", entityId: "NSC0256857" },
              { name: "NCI_FDA", entityId: "WK2XYI10QM" },
              { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
              { name: "NDDF", entityId: "002377" },
              { name: "PDQ", entityId: "CDR0000040475" },
              { name: "RCD", entityId: "x02MO" },
              { name: "RXNORM", entityId: "5640" },
              { name: "SNM", entityId: "E-7772" },
              { name: "SNMI", entityId: "C-603C0" },
              { name: "SNOMEDCT_US", entityId: "387207008" },
              { name: "USP", entityId: "m39860" },
              { name: "USPMG", entityId: "MTHU000060" },
              { name: "VANDF", entityId: "4017840" },
            ],
            text: "ibuprofen",
            category: "MedicationName",
            offset: 17,
            length: 9,
            confidenceScore: 1,
            normalizedText: "ibuprofen",
          },
          {
            dataSources: [],
            text: "twice daily",
            category: "Frequency",
            offset: 34,
            length: 11,
            confidenceScore: 1,
          },
        ],
        entityRelations: [
          {
            relationType: "DosageOfMedication",
            confidenceScore: 1,
            roles: [
              {
                entity: {
                  dataSources: [],
                  text: "100mg",
                  category: "Dosage",
                  offset: 11,
                  length: 5,
                  confidenceScore: 0.98,
                },
                name: "Dosage",
              },
              {
                entity: {
                  dataSources: [
                    { name: "UMLS", entityId: "C0020740" },
                    { name: "AOD", entityId: "0000019879" },
                    { name: "ATC", entityId: "M01AE01" },
                    { name: "CCPSS", entityId: "0046165" },
                    { name: "CHV", entityId: "0000006519" },
                    { name: "CSP", entityId: "2270-2077" },
                    { name: "DRUGBANK", entityId: "DB01050" },
                    { name: "GS", entityId: "1611" },
                    { name: "LCH_NW", entityId: "sh97005926" },
                    { name: "LNC", entityId: "LP16165-0" },
                    { name: "MEDCIN", entityId: "40458" },
                    { name: "MMSL", entityId: "d00015" },
                    { name: "MSH", entityId: "D007052" },
                    { name: "MTHSPL", entityId: "WK2XYI10QM" },
                    { name: "NCI", entityId: "C561" },
                    { name: "NCI_CTRP", entityId: "C561" },
                    { name: "NCI_DCP", entityId: "00803" },
                    { name: "NCI_DTP", entityId: "NSC0256857" },
                    { name: "NCI_FDA", entityId: "WK2XYI10QM" },
                    { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
                    { name: "NDDF", entityId: "002377" },
                    { name: "PDQ", entityId: "CDR0000040475" },
                    { name: "RCD", entityId: "x02MO" },
                    { name: "RXNORM", entityId: "5640" },
                    { name: "SNM", entityId: "E-7772" },
                    { name: "SNMI", entityId: "C-603C0" },
                    { name: "SNOMEDCT_US", entityId: "387207008" },
                    { name: "USP", entityId: "m39860" },
                    { name: "USPMG", entityId: "MTHU000060" },
                    { name: "VANDF", entityId: "4017840" },
                  ],
                  text: "ibuprofen",
                  category: "MedicationName",
                  offset: 17,
                  length: 9,
                  confidenceScore: 1,
                  normalizedText: "ibuprofen",
                },
                name: "Medication",
              },
            ],
          },
          {
            relationType: "FrequencyOfMedication",
            confidenceScore: 1,
            roles: [
              {
                entity: {
                  dataSources: [
                    { name: "UMLS", entityId: "C0020740" },
                    { name: "AOD", entityId: "0000019879" },
                    { name: "ATC", entityId: "M01AE01" },
                    { name: "CCPSS", entityId: "0046165" },
                    { name: "CHV", entityId: "0000006519" },
                    { name: "CSP", entityId: "2270-2077" },
                    { name: "DRUGBANK", entityId: "DB01050" },
                    { name: "GS", entityId: "1611" },
                    { name: "LCH_NW", entityId: "sh97005926" },
                    { name: "LNC", entityId: "LP16165-0" },
                    { name: "MEDCIN", entityId: "40458" },
                    { name: "MMSL", entityId: "d00015" },
                    { name: "MSH", entityId: "D007052" },
                    { name: "MTHSPL", entityId: "WK2XYI10QM" },
                    { name: "NCI", entityId: "C561" },
                    { name: "NCI_CTRP", entityId: "C561" },
                    { name: "NCI_DCP", entityId: "00803" },
                    { name: "NCI_DTP", entityId: "NSC0256857" },
                    { name: "NCI_FDA", entityId: "WK2XYI10QM" },
                    { name: "NCI_NCI-GLOSS", entityId: "CDR0000613511" },
                    { name: "NDDF", entityId: "002377" },
                    { name: "PDQ", entityId: "CDR0000040475" },
                    { name: "RCD", entityId: "x02MO" },
                    { name: "RXNORM", entityId: "5640" },
                    { name: "SNM", entityId: "E-7772" },
                    { name: "SNMI", entityId: "C-603C0" },
                    { name: "SNOMEDCT_US", entityId: "387207008" },
                    { name: "USP", entityId: "m39860" },
                    { name: "USPMG", entityId: "MTHU000060" },
                    { name: "VANDF", entityId: "4017840" },
                  ],
                  text: "ibuprofen",
                  category: "MedicationName",
                  offset: 17,
                  length: 9,
                  confidenceScore: 1,
                  normalizedText: "ibuprofen",
                },
                name: "Medication",
              },
              {
                entity: {
                  dataSources: [],
                  text: "twice daily",
                  category: "Frequency",
                  offset: 34,
                  length: 11,
                  confidenceScore: 1,
                },
                name: "Frequency",
              },
            ],
          },
        ],
        id: "1",
        warnings: [],
      },
    ],
    completedOn,
    modelVersion,
  },
  {
    kind: "EntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        entities: [
          { text: "Patient", category: "PersonType", offset: 0, length: 7, confidenceScore: 0.99 },
        ],
      },
      {
        id: "1",
        warnings: [],
        entities: [
          {
            text: "100mg",
            category: "Quantity",
            subCategory: "Dimension",
            offset: 11,
            length: 5,
            confidenceScore: 0.8,
          },
          { text: "ibuprofen", category: "Product", offset: 17, length: 9, confidenceScore: 0.89 },
          {
            text: "daily",
            category: "DateTime",
            subCategory: "Set",
            offset: 40,
            length: 5,
            confidenceScore: 0.8,
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
  {
    kind: "PiiEntityRecognition",
    results: [
      {
        id: "0",
        warnings: [],
        redactedText: "******* does not suffer from high blood pressure.",
        entities: [
          { text: "Patient", category: "PersonType", offset: 0, length: 7, confidenceScore: 0.94 },
        ],
      },
      {
        id: "1",
        warnings: [],
        redactedText: "Prescribed 100mg ibuprofen, taken twice *****.",
        entities: [
          {
            text: "daily",
            category: "DateTime",
            subCategory: "Set",
            offset: 40,
            length: 5,
            confidenceScore: 0.8,
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
  {
    kind: "SentimentAnalysis",
    results: [
      {
        id: "0",
        warnings: [],
        sentiment: "neutral",
        confidenceScores: { positive: 0.04, neutral: 0.76, negative: 0.2 },
        sentences: [
          {
            text: "Patient does not suffer from high blood pressure.",
            sentiment: "neutral",
            confidenceScores: { positive: 0.04, neutral: 0.76, negative: 0.2 },
            offset: 0,
            length: 49,
            opinions: [],
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        sentiment: "neutral",
        confidenceScores: { positive: 0, neutral: 0.99, negative: 0.01 },
        sentences: [
          {
            text: "Prescribed 100mg ibuprofen, taken twice daily.",
            sentiment: "neutral",
            confidenceScores: { positive: 0, neutral: 0.99, negative: 0.01 },
            offset: 0,
            length: 46,
            opinions: [],
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation27: AnalyzeBatchResult[] = [
  {
    kind: "ExtractiveSummarization",
    results: [
      {
        id: "0",
        warnings: [],
        sentences: [
          {
            text: "Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service.",
            rankScore: 0.43,
            offset: 2453,
            length: 156,
          },
          {
            text: "Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.",
            rankScore: 1,
            offset: 2610,
            length: 156,
          },
          {
            text: "With Windows 365, she added, IT admins can manage and deploy Cloud PCs using the same tools they use today to manage physical PCs.",
            rankScore: 0.25,
            offset: 3161,
            length: 130,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        sentences: [
          {
            text: "Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.",
            rankScore: 0.79,
            offset: 10,
            length: 274,
          },
          {
            text: "In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account.",
            rankScore: 0.84,
            offset: 479,
            length: 224,
          },
          {
            text: "The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added.",
            rankScore: 1,
            offset: 1102,
            length: 234,
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation28: AnalyzeBatchResult[] = [
  {
    kind: "ExtractiveSummarization",
    results: [
      {
        id: "0",
        warnings: [],
        sentences: [
          {
            text: "Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service.",
            rankScore: 0.43,
            offset: 2453,
            length: 156,
          },
          {
            text: "Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.",
            rankScore: 1,
            offset: 2610,
            length: 156,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        sentences: [
          {
            text: "In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account.",
            rankScore: 0.84,
            offset: 479,
            length: 224,
          },
          {
            text: "The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added.",
            rankScore: 1,
            offset: 1102,
            length: 234,
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation29: AnalyzeBatchResult[] = [
  {
    kind: "ExtractiveSummarization",
    results: [
      {
        id: "0",
        warnings: [],
        sentences: [
          {
            text: "Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service.",
            rankScore: 0.43,
            offset: 2453,
            length: 156,
          },
          {
            text: "Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.",
            rankScore: 1,
            offset: 2610,
            length: 156,
          },
          {
            text: "With Windows 365, she added, IT admins can manage and deploy Cloud PCs using the same tools they use today to manage physical PCs.",
            rankScore: 0.25,
            offset: 3161,
            length: 130,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        sentences: [
          {
            text: "Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.",
            rankScore: 0.79,
            offset: 10,
            length: 274,
          },
          {
            text: "In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account.",
            rankScore: 0.84,
            offset: 479,
            length: 224,
          },
          {
            text: "The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added.",
            rankScore: 1,
            offset: 1102,
            length: 234,
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation30: AnalyzeBatchResult[] = [
  {
    kind: "AbstractiveSummarization",
    results: [
      {
        id: "0",
        summaries: [
          {
            text: "Microsoft's Windows 365 puts the Windows operating system in the cloud. Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy. Users access their Cloud PC through a native application or web browser on any device. Windows 365 follows other products and services to the cloud, from Windows Server on Azure to the suite of Microsoft Office applications in Microsoft 365.",
            contexts: [{ offset: 0, length: 7519 }],
          },
        ],
        warnings: [],
      },
      {
        id: "1",
        summaries: [
          {
            text: "Microsoft has launched Windows 365 Cloud PCs for remote workers. The new service lets workers access their old PCs from anywhere on any device. The Cloud PCs are powered by Microsoft's cloud computing platform.",
            contexts: [{ offset: 0, length: 3416 }],
          },
        ],
        warnings: [],
      },
    ],
    completedOn,
    modelVersion,
  },
];

export const expectation31: AnalyzeBatchResult[] = [
  {
    kind: "AbstractiveSummarization",
    results: [
      {
        id: "0",
        summaries: [
          {
            text: "Microsoft's Windows 365 puts the Windows operating system in the cloud.Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy.Users access their Cloud PC through a native application or web browser on any device, from anywhere with an internet connection.",
            contexts: [{ offset: 0, length: 7519 }],
          },
        ],
        warnings: [],
      },
      {
        id: "1",
        summaries: [
          {
            text: "Microsoft has launched Windows 365 Cloud PCs for remote workers.The new service lets workers access their old desktop from anywhere on any device.The ability to login to a Cloud PC from anywhere is part of Microsoft's larger strategy.",
            contexts: [{ offset: 0, length: 3416 }],
          },
        ],
        warnings: [],
      },
    ],
    completedOn,
    modelVersion,
  },
];
