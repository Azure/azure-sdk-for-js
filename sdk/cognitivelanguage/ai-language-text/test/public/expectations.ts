// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeBatchResult,
  EntityLinkingResult,
  EntityRecognitionResult,
  KeyPhraseExtractionResult,
  KnownErrorCode,
  LanguageDetectionResult,
  PiiEntityRecognitionResult,
  PiiEntityRecognitionSuccessResult,
  SentimentAnalysisResult,
} from "../../src/";

const failedOn = undefined as any;
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
            text: "Casey Jensen",
            category: "BorrowerName",
            offset: 138,
            length: 12,
            confidenceScore: 0.99,
          },
          {
            text: "2469 Pennsylvania Avenue",
            category: "BorrowerAddress",
            offset: 177,
            length: 24,
            confidenceScore: 0.97,
          },
          {
            text: "New",
            category: "BorrowerState",
            offset: 211,
            length: 3,
            confidenceScore: 0.77,
          },
          {
            text: "Brunswick",
            category: "BorrowerCity",
            offset: 215,
            length: 9,
            confidenceScore: 0.96,
          },
          {
            text: "New",
            category: "BorrowerState",
            offset: 235,
            length: 3,
            confidenceScore: 0.97,
          },
          {
            text: "Jersey",
            category: "BorrowerCity",
            offset: 239,
            length: 6,
            confidenceScore: 0.55,
          },
          {
            text: "Hollie Rees",
            category: "LenderName",
            offset: 265,
            length: 11,
            confidenceScore: 0.98,
          },
          {
            text: "42 Gladwell Street",
            category: "LenderAddress",
            offset: 303,
            length: 18,
            confidenceScore: 0.92,
          },
          {
            text: "Memphis",
            category: "LenderCity",
            offset: 331,
            length: 7,
            confidenceScore: 0.99,
          },
          {
            text: "Tennessee",
            category: "LenderState",
            offset: 349,
            length: 9,
            confidenceScore: 0.99,
          },
        ],
      },
      {
        id: "1",
        warnings: [],
        entities: [
          {
            text: "one hundred ninety-two thousand nine hundred eighty-nine Dollars",
            category: "LoanAmountWords",
            offset: 47,
            length: 64,
            confidenceScore: 1.0,
          },
          {
            text: "$192,989.00",
            category: "LoanAmountNumbers",
            offset: 113,
            length: 11,
            confidenceScore: 1.0,
          },
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
        classifications: [{ category: "Civil_engineering", confidenceScore: 0.76 }],
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
    results: [
      {
        id: "0",
        warnings: [],
        classifications: [
          {
            category: "Comedy",
            confidenceScore: 0.98,
          },
          {
            category: "Drama",
            confidenceScore: 0.95,
          },
        ],
      },
    ],
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
            category: "NZSocialWelfareNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.65,
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
            category: "PhoneNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.8,
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
    completedOn,
    modelVersion,
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
                  confidenceScores: { positive: 0.02, negative: 0.98 },
                  offset: 4,
                  length: 4,
                  text: "food",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0.02, negative: 0.98 },
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
                  confidenceScores: { positive: 0.01, negative: 0.99 },
                  offset: 42,
                  length: 6,
                  text: "toilet",
                },
                assessments: [
                  {
                    sentiment: "negative",
                    confidenceScores: { positive: 0.01, negative: 0.99 },
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
            "Invalid language code 'english'. Supported languages: ar,cs,da,fi,hu,no,nl,pl,ru,sv,tr,zh-Hans,ja,ko,en,es,de,fr,pt-PT,pt-BR,it. For additional details see https://aka.ms/language-service/language-support",
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
    completedOn,
    modelVersion,
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
            "Invalid language code 'english'. Supported languages: zh-Hans,ja,ko,en,es,de,fr,pt-PT,pt-BR,it. For additional details see https://aka.ms/language-service/language-support",
        },
      },
      {
        id: "3",
        warnings: [],
        redactedText: "The restaurant had really good food. I recommend you try it.",
        entities: [],
      },
    ],
    completedOn,
    modelVersion,
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
            "Invalid language code 'english'. Supported languages: de,en,es,fr,it,pt-BR,pt-PT,af,am,ar,as,az,be,bg,bn,br,bs,ca,cs,cy,da,el,eo,et,eu,fa,fi,fil,fy,ga,gd,gl,gu,ha,he,hi,hr,hu,hy,id,ja,jv,ka,kk,km,kn,ko,ku,ky,la,lo,lt,lv,mg,mk,ml,mn,mr,ms,my,ne,nl,no,om,or,pa,pl,ps,ro,ru,sa,sd,si,sk,sl,so,sq,sr,su,sv,sw,ta,te,th,tr,ug,uk,ur,uz,vi,xh,yi,zh-Hans,zh-Hant. For additional details see https://aka.ms/language-service/language-support",
        },
      },
      { id: "3", warnings: [], keyPhrases: ["good food", "restaurant"] },
    ],
    completedOn,
    modelVersion,
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
            "Invalid language code 'english'. Supported languages: ar,cs,da,fi,hu,no,nl,pl,ru,sv,tr,zh-Hans,ja,ko,en,es,de,fr,pt-PT,pt-BR,it. For additional details see https://aka.ms/language-service/language-support",
        },
      },
      { id: "3", error: { code: "InvalidDocument", message: "Document text is empty." } },
    ],
    completedOn,
    modelVersion,
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
            "Invalid language code 'english'. Supported languages: zh-Hans,ja,ko,en,es,de,fr,pt-PT,pt-BR,it. For additional details see https://aka.ms/language-service/language-support",
        },
      },
      { id: "3", error: { code: "InvalidDocument", message: "Document text is empty." } },
    ],
    completedOn,
    modelVersion,
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
            "Invalid language code 'english'. Supported languages: de,en,es,fr,it,pt-BR,pt-PT,af,am,ar,as,az,be,bg,bn,br,bs,ca,cs,cy,da,el,eo,et,eu,fa,fi,fil,fy,ga,gd,gl,gu,ha,he,hi,hr,hu,hy,id,ja,jv,ka,kk,km,kn,ko,ku,ky,la,lo,lt,lv,mg,mk,ml,mn,mr,ms,my,ne,nl,no,om,or,pa,pl,ps,ro,ru,sa,sd,si,sk,sl,so,sq,sr,su,sv,sw,ta,te,th,tr,ug,uk,ur,uz,vi,xh,yi,zh-Hans,zh-Hant. For additional details see https://aka.ms/language-service/language-support",
        },
      },
      { id: "3", error: { code: "InvalidDocument", message: "Document text is empty." } },
    ],
    completedOn,
    modelVersion,
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
          {
            text: "park",
            category: "Location",
            offset: 17,
            subCategory: "Structural",
            length: 4,
            confidenceScore: 0.99,
          },
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
            "Invalid language code 'notalanguage'. Supported languages: ar,cs,da,fi,hu,no,nl,pl,ru,sv,tr,zh-Hans,ja,ko,en,es,de,fr,pt-PT,pt-BR,it. For additional details see https://aka.ms/language-service/language-support",
        },
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
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code 'notalanguage'. Supported languages: zh-Hans,ja,ko,en,es,de,fr,pt-PT,pt-BR,it. For additional details see https://aka.ms/language-service/language-support",
        },
      },
    ],
    completedOn,
    modelVersion,
  },
  {
    kind: "KeyPhraseExtraction",
    results: [
      {
        id: "0",
        error: {
          code: "UnsupportedLanguageCode",
          message:
            "Invalid language code 'notalanguage'. Supported languages: de,en,es,fr,it,pt-BR,pt-PT,af,am,ar,as,az,be,bg,bn,br,bs,ca,cs,cy,da,el,eo,et,eu,fa,fi,fil,fy,ga,gd,gl,gu,ha,he,hi,hr,hu,hy,id,ja,jv,ka,kk,km,kn,ko,ku,ky,la,lo,lt,lv,mg,mk,ml,mn,mr,ms,my,ne,nl,no,om,or,pa,pl,ps,ro,ru,sa,sd,si,sk,sl,so,sq,sr,su,sv,sw,ta,te,th,tr,ug,uk,ur,uz,vi,xh,yi,zh-Hans,zh-Hant. For additional details see https://aka.ms/language-service/language-support",
        },
      },
    ],
    completedOn,
    modelVersion,
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
            confidenceScore: 0.99,
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
                  confidenceScore: 0.99,
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
              { name: "SNOMEDCT_US", entityId: "133931009" },
            ],
            text: "Baby",
            category: "FamilyRelation",
            offset: 0,
            length: 4,
            confidenceScore: 1,
            normalizedText: "Infant",
          },
          {
            dataSources: [
              { name: "UMLS", entityId: "C0025289" },
              { name: "AOD", entityId: "0000006185" },
              { name: "BI", entityId: "BI00546" },
              { name: "CCPSS", entityId: "1018016" },
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
            assertion: { certainty: "negativePossible", association: "other" },
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
            confidenceScore: 0.99,
            assertion: { conditionality: "hypothetical" },
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
            confidenceScore: 0.99,
            assertion: { conditionality: "conditional", certainty: "neutralPossible" },
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
            confidenceScore: 1,
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
            confidenceScore: 1,
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
            category: "NZSocialWelfareNumber",
            offset: 44,
            length: 9,
            confidenceScore: 0.65,
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
            category: "PhoneNumber",
            offset: 44,
            length: 9,
            confidenceScore: 0.8,
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
            category: "NZSocialWelfareNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.65,
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
            category: "PhoneNumber",
            offset: 18,
            length: 9,
            confidenceScore: 0.8,
          },
        ],
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
            confidenceScore: 0.99,
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
                  confidenceScore: 0.99,
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
        confidenceScores: { positive: 0.46, neutral: 0.5, negative: 0.05 },
        sentences: [
          {
            text: "Patient does not suffer from high blood pressure.",
            sentiment: "neutral",
            confidenceScores: { positive: 0.46, neutral: 0.5, negative: 0.05 },
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
        confidenceScores: { positive: 0.01, neutral: 0.99, negative: 0 },
        sentences: [
          {
            text: "Prescribed 100mg ibuprofen, taken twice daily.",
            sentiment: "neutral",
            confidenceScores: { positive: 0.01, neutral: 0.99, negative: 0 },
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
            text: "Windows 365 is a new virtualization technology for Windows that is easy to set up and deploy for today’s login-from-anywhere, mobile and elastic workforces.",
            rankScore: 1,
            offset: 2610,
            length: 156,
          },
          {
            text: "Windows is already accessible in the cloud via Azure Virtual Desktop, which offers customers flexibility to create and run their own virtualization service.",
            rankScore: 0.43,
            offset: 2453,
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
            text: "The ability to login to a Cloud PC from anywhere on any device is part of Microsoft’s larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future, she added.",
            rankScore: 1,
            offset: 1102,
            length: 234,
          },
          {
            text: "In this new world of Windows 365, remote workers flip the lid on their laptop, bootup the family workstation or clip a keyboard onto a tablet, launch a native app or modern web browser and login to their Windows 365 account.",
            rankScore: 0.84,
            offset: 479,
            length: 224,
          },
          {
            text: "Windows 365 was in the works before COVID-19 sent companies around the world on a scramble to secure solutions to support employees suddenly forced to work from home, but “what really put the firecracker behind it was the pandemic, it accelerated everything,” McKelvey said.",
            rankScore: 0.79,
            offset: 10,
            length: 274,
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
            text: "Microsoft is releasing Windows 365, a new operating system that is easy to set up and deploy for today’s login-from- anywhere, mobile and elastic workforces. The Cloud PC is a new virtualization technology for Windows that is easier to set Up and Deploy for today's login. The Cloud PCs are accessible through a native application or web browser on any device, from anywhere with an internet connection.",
            contexts: [{ offset: 0, length: 7519 }],
          },
        ],
        warnings: [],
      },
      {
        id: "1",
        summaries: [
          {
            text: "Microsoft is rolling out Windows 365 Cloud PCs for employees forced to work from home. The ability to login to a Cloud PC from anywhere on any device is part of a larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future.",
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
            text: "Microsoft is releasing Windows 365, a new operating system that is easy to set up and deploy for today’s login-from- anywhere, mobile and elastic workforces. The Cloud PC is a new virtualization technology for Windows that is easier to set Up and Deploy for today's login. The Cloud PCs are accessible through a native application or web browser on any device, from anywhere with an internet connection.",
            contexts: [{ offset: 0, length: 7519 }],
          },
        ],
        warnings: [],
      },
      {
        id: "1",
        summaries: [
          {
            text: "Microsoft is rolling out Windows 365 Cloud PCs for employees forced to work from home. The ability to login to a Cloud PC from anywhere on any device is part of a larger strategy around tailoring products such as Microsoft Teams and Microsoft 365 for the post-pandemic hybrid workforce of the future.",
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

export const expectation63: SentimentAnalysisResult[] = [
  {
    id: "0",
    warnings: [],
    sentiment: "positive",
    confidenceScores: { positive: 1, neutral: 0, negative: 0 },
    sentences: [
      {
        text: "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
        sentiment: "positive",
        confidenceScores: { positive: 1, neutral: 0, negative: 0 },
        offset: 0,
        length: 86,
        opinions: [],
      },
    ],
  },
  {
    id: "1",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
    sentences: [
      {
        text: "Unfortunately, it rained during my entire trip to Seattle. ",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
        offset: 0,
        length: 59,
        opinions: [],
      },
      {
        text: "I didn't even get to visit the Space Needle",
        sentiment: "neutral",
        confidenceScores: { positive: 0, neutral: 0.92, negative: 0.08 },
        offset: 59,
        length: 43,
        opinions: [],
      },
    ],
  },
  {
    id: "2",
    warnings: [],
    sentiment: "neutral",
    confidenceScores: { positive: 0.19, neutral: 0.28, negative: 0.53 },
    sentences: [
      {
        text: "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
        sentiment: "neutral",
        confidenceScores: { positive: 0.19, neutral: 0.28, negative: 0.53 },
        offset: 0,
        length: 101,
        opinions: [],
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
    sentences: [
      {
        text: "I didn't like the last book I read at all.",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
        offset: 0,
        length: 42,
        opinions: [],
      },
    ],
  },
];

export const expectation65: SentimentAnalysisResult[] = [
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
              confidenceScores: { positive: 0.02, negative: 0.98 },
              offset: 4,
              length: 4,
              text: "food",
            },
            assessments: [
              {
                sentiment: "negative",
                confidenceScores: { positive: 0.02, negative: 0.98 },
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
              confidenceScores: { positive: 0.01, negative: 0.99 },
              offset: 42,
              length: 6,
              text: "toilet",
            },
            assessments: [
              {
                sentiment: "negative",
                confidenceScores: { positive: 0.01, negative: 0.99 },
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
];

export const expectation66: SentimentAnalysisResult[] = [
  {
    id: "0",
    warnings: [],
    sentiment: "positive",
    confidenceScores: { positive: 1, neutral: 0, negative: 0 },
    sentences: [
      {
        text: "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
        sentiment: "positive",
        confidenceScores: { positive: 1, neutral: 0, negative: 0 },
        offset: 0,
        length: 86,
        opinions: [],
      },
    ],
  },
  { id: "1", error: { code: "InvalidDocument", message: "Document text is empty." } },
  {
    id: "2",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
    sentences: [
      {
        text: "Unfortunately, it rained during my entire trip to Seattle. ",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
        offset: 0,
        length: 59,
        opinions: [],
      },
      {
        text: "I didn't even get to visit the Space Needle",
        sentiment: "neutral",
        confidenceScores: { positive: 0, neutral: 0.92, negative: 0.08 },
        offset: 59,
        length: 43,
        opinions: [],
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    sentiment: "neutral",
    confidenceScores: { positive: 0.19, neutral: 0.28, negative: 0.53 },
    sentences: [
      {
        text: "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
        sentiment: "neutral",
        confidenceScores: { positive: 0.19, neutral: 0.28, negative: 0.53 },
        offset: 0,
        length: 101,
        opinions: [],
      },
    ],
  },
  {
    id: "4",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
    sentences: [
      {
        text: "I didn't like the last book I read at all.",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
        offset: 0,
        length: 42,
        opinions: [],
      },
    ],
  },
];

export const expectation34: SentimentAnalysisResult[] = [
  {
    id: "1",
    warnings: [],
    sentiment: "positive",
    confidenceScores: { positive: 1, neutral: 0, negative: 0 },
    sentences: [
      {
        text: "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
        sentiment: "positive",
        confidenceScores: { positive: 1, neutral: 0, negative: 0 },
        offset: 0,
        length: 86,
        opinions: [],
      },
    ],
  },
  {
    id: "2",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
    sentences: [
      {
        text: "Unfortunately, it rained during my entire trip to Seattle. ",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
        offset: 0,
        length: 59,
        opinions: [],
      },
      {
        text: "I didn't even get to visit the Space Needle",
        sentiment: "neutral",
        confidenceScores: { positive: 0, neutral: 0.92, negative: 0.08 },
        offset: 59,
        length: 43,
        opinions: [],
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    sentiment: "neutral",
    confidenceScores: { positive: 0.19, neutral: 0.28, negative: 0.53 },
    sentences: [
      {
        text: "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
        sentiment: "neutral",
        confidenceScores: { positive: 0.19, neutral: 0.28, negative: 0.53 },
        offset: 0,
        length: 101,
        opinions: [],
      },
    ],
  },
  {
    id: "4",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
    sentences: [
      {
        text: "I didn't like the last book I read at all.",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.01, negative: 0.99 },
        offset: 0,
        length: 42,
        opinions: [],
      },
    ],
  },
  {
    id: "5",
    warnings: [],
    sentiment: "positive",
    confidenceScores: { positive: 1, neutral: 0, negative: 0 },
    sentences: [
      {
        text: "Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.",
        sentiment: "positive",
        confidenceScores: { positive: 1, neutral: 0, negative: 0 },
        offset: 0,
        length: 73,
        opinions: [],
      },
    ],
  },
  {
    id: "6",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0.03, negative: 0.97 },
    sentences: [
      {
        text: "La carretera estaba atascada. ",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0.03, negative: 0.97 },
        offset: 0,
        length: 30,
        opinions: [],
      },
      {
        text: "Había mucho tráfico el día de ayer.",
        sentiment: "neutral",
        confidenceScores: { positive: 0.03, neutral: 0.93, negative: 0.04 },
        offset: 30,
        length: 35,
        opinions: [],
      },
    ],
  },
];

export const expectation35: SentimentAnalysisResult[] = [
  {
    id: "0",
    warnings: [],
    sentiment: "positive",
    confidenceScores: { positive: 0.99, neutral: 0.01, negative: 0 },
    sentences: [
      {
        text: "It has a sleek premium aluminum design that makes it beautiful to look at.",
        sentiment: "positive",
        confidenceScores: { positive: 0.99, neutral: 0.01, negative: 0 },
        offset: 0,
        length: 74,
        opinions: [
          {
            target: {
              sentiment: "positive",
              confidenceScores: { positive: 1, negative: 0 },
              offset: 32,
              length: 6,
              text: "design",
            },
            assessments: [
              {
                sentiment: "positive",
                confidenceScores: { positive: 1, negative: 0 },
                offset: 9,
                length: 5,
                text: "sleek",
                isNegated: false,
              },
              {
                sentiment: "positive",
                confidenceScores: { positive: 1, negative: 0 },
                offset: 53,
                length: 9,
                text: "beautiful",
                isNegated: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const expectation36: SentimentAnalysisResult[] = [
  {
    id: "0",
    warnings: [],
    sentiment: "negative",
    confidenceScores: { positive: 0, neutral: 0, negative: 1 },
    sentences: [
      {
        text: "The food and service are not good",
        sentiment: "negative",
        confidenceScores: { positive: 0, neutral: 0, negative: 1 },
        offset: 0,
        length: 33,
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
                offset: 29,
                length: 4,
                text: "good",
                isNegated: true,
              },
            ],
          },
          {
            target: {
              sentiment: "negative",
              confidenceScores: { positive: 0, negative: 1 },
              offset: 13,
              length: 7,
              text: "service",
            },
            assessments: [
              {
                sentiment: "negative",
                confidenceScores: { positive: 0, negative: 1 },
                offset: 29,
                length: 4,
                text: "good",
                isNegated: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const expectation37: SentimentAnalysisResult[] = [
  {
    id: "0",
    warnings: [],
    sentiment: "neutral",
    confidenceScores: { positive: 0.17, neutral: 0.81, negative: 0.01 },
    sentences: [
      {
        text: "today is a hot day",
        sentiment: "neutral",
        confidenceScores: { positive: 0.17, neutral: 0.81, negative: 0.01 },
        offset: 0,
        length: 18,
        opinions: [],
      },
    ],
  },
];

export const expectation38: LanguageDetectionResult[] = [
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "0",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "1",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "2",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "3",
    warnings: [],
  },
];

export const expectation39: LanguageDetectionResult[] = [
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "0",
    warnings: [],
  },
];

export const expectation40: LanguageDetectionResult[] = [
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 0.95 },
    id: "0",
    warnings: [],
  },
];

export const expectation41: LanguageDetectionResult[] = [
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "1",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "2",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "3",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "4",
    warnings: [],
  },
  {
    primaryLanguage: { name: "Spanish", iso6391Name: "es", confidenceScore: 0.99 },
    id: "5",
    warnings: [],
  },
  {
    primaryLanguage: { name: "Spanish", iso6391Name: "es", confidenceScore: 1 },
    id: "6",
    warnings: [],
  },
];

export const expectation42: LanguageDetectionResult[] = [
  {
    id: "0",
    error: {
      code: "InvalidCountryHint",
      message:
        "Country hint is not valid. Please specify an ISO 3166-1 alpha-2 two letter country code.",
    },
  },
];

export const expectation43: LanguageDetectionResult[] = [
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "1",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "2",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "3",
    warnings: [],
  },
  {
    primaryLanguage: { name: "English", iso6391Name: "en", confidenceScore: 1 },
    id: "4",
    warnings: [],
  },
  {
    primaryLanguage: { name: "Spanish", iso6391Name: "es", confidenceScore: 0.99 },
    id: "5",
    warnings: [],
  },
  {
    primaryLanguage: { name: "Spanish", iso6391Name: "es", confidenceScore: 1 },
    id: "6",
    warnings: [],
  },
];

export const expectation44: EntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    entities: [
      { text: "trip", category: "Event", offset: 18, length: 4, confidenceScore: 0.61 },
      {
        text: "Seattle",
        category: "Location",
        subCategory: "GPE",
        offset: 26,
        length: 7,
        confidenceScore: 1,
      },
      {
        text: "last week",
        category: "DateTime",
        subCategory: "DateRange",
        offset: 34,
        length: 9,
        confidenceScore: 0.8,
      },
      { text: "Space Needle", category: "Location", offset: 65, length: 12, confidenceScore: 0.96 },
      {
        text: "2",
        category: "Quantity",
        subCategory: "Number",
        offset: 78,
        length: 1,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "1",
    warnings: [],
    entities: [
      { text: "trip", category: "Event", offset: 42, length: 4, confidenceScore: 0.82 },
      {
        text: "Seattle",
        category: "Location",
        subCategory: "GPE",
        offset: 50,
        length: 7,
        confidenceScore: 1,
      },
      { text: "Space Needle", category: "Location", offset: 90, length: 12, confidenceScore: 0.92 },
    ],
  },
  {
    id: "2",
    warnings: [],
    entities: [
      {
        text: "Saturday",
        category: "DateTime",
        subCategory: "Date",
        offset: 25,
        length: 8,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    entities: [{ text: "book", category: "Product", offset: 23, length: 4, confidenceScore: 0.92 }],
  },
];

export const expectation45: EntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    entities: [
      { text: "trip", category: "Event", offset: 18, length: 4, confidenceScore: 0.61 },
      {
        text: "Seattle",
        category: "Location",
        subCategory: "GPE",
        offset: 26,
        length: 7,
        confidenceScore: 1,
      },
      {
        text: "last week",
        category: "DateTime",
        subCategory: "DateRange",
        offset: 34,
        length: 9,
        confidenceScore: 0.8,
      },
      { text: "Space Needle", category: "Location", offset: 65, length: 12, confidenceScore: 0.96 },
      {
        text: "2",
        category: "Quantity",
        subCategory: "Number",
        offset: 78,
        length: 1,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "1",
    warnings: [],
    entities: [
      { text: "trip", category: "Event", offset: 42, length: 4, confidenceScore: 0.82 },
      {
        text: "Seattle",
        category: "Location",
        subCategory: "GPE",
        offset: 50,
        length: 7,
        confidenceScore: 1,
      },
      { text: "Space Needle", category: "Location", offset: 90, length: 12, confidenceScore: 0.92 },
    ],
  },
  {
    id: "2",
    warnings: [],
    entities: [
      {
        text: "Saturday",
        category: "DateTime",
        subCategory: "Date",
        offset: 25,
        length: 8,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    entities: [{ text: "book", category: "Product", offset: 23, length: 4, confidenceScore: 0.92 }],
  },
];

export const expectation47: EntityRecognitionResult[] = [
  {
    id: "1",
    warnings: [],
    entities: [
      { text: "trip", category: "Event", offset: 18, length: 4, confidenceScore: 0.61 },
      {
        text: "Seattle",
        category: "Location",
        subCategory: "GPE",
        offset: 26,
        length: 7,
        confidenceScore: 1,
      },
      {
        text: "last week",
        category: "DateTime",
        subCategory: "DateRange",
        offset: 34,
        length: 9,
        confidenceScore: 0.8,
      },
      { text: "Space Needle", category: "Location", offset: 65, length: 12, confidenceScore: 0.96 },
      {
        text: "2",
        category: "Quantity",
        subCategory: "Number",
        offset: 78,
        length: 1,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "2",
    warnings: [],
    entities: [
      { text: "trip", category: "Event", offset: 42, length: 4, confidenceScore: 0.82 },
      {
        text: "Seattle",
        category: "Location",
        subCategory: "GPE",
        offset: 50,
        length: 7,
        confidenceScore: 1,
      },
      { text: "Space Needle", category: "Location", offset: 90, length: 12, confidenceScore: 0.92 },
    ],
  },
  {
    id: "3",
    warnings: [],
    entities: [
      {
        text: "Saturday",
        category: "DateTime",
        subCategory: "Date",
        offset: 25,
        length: 8,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "4",
    warnings: [],
    entities: [
      {
        text: "Monte Rainier",
        category: "Location",
        offset: 29,
        length: 13,
        confidenceScore: 0.85,
      },
    ],
  },
  {
    id: "5",
    warnings: [],
    entities: [
      { text: "carretera", category: "Location", offset: 3, length: 9, confidenceScore: 0.81 },
      {
        text: "ayer",
        category: "DateTime",
        subCategory: "Date",
        offset: 60,
        length: 4,
        confidenceScore: 0.8,
      },
    ],
  },
];

export const expectation48: KeyPhraseExtractionResult[] = [
  { id: "0", warnings: [], keyPhrases: ["wonderful trip", "Space Needle", "Seattle"] },
  { id: "1", warnings: [], keyPhrases: ["entire trip", "Space Needle", "Seattle"] },
  { id: "2", warnings: [], keyPhrases: ["movie", "Saturday"] },
  { id: "3", warnings: [], keyPhrases: ["last book"] },
];

export const expectation49: KeyPhraseExtractionResult[] = [
  { id: "0", warnings: [], keyPhrases: ["wonderful trip", "Space Needle", "Seattle"] },
  { id: "1", warnings: [], keyPhrases: ["entire trip", "Space Needle", "Seattle"] },
  { id: "2", warnings: [], keyPhrases: ["movie", "Saturday"] },
  { id: "3", warnings: [], keyPhrases: ["last book"] },
];

export const expectation51: KeyPhraseExtractionResult[] = [
  { id: "1", warnings: [], keyPhrases: ["wonderful trip", "Space Needle", "Seattle"] },
  { id: "2", warnings: [], keyPhrases: ["entire trip", "Space Needle", "Seattle"] },
  { id: "3", warnings: [], keyPhrases: ["movie", "Saturday"] },
  { id: "4", warnings: [], keyPhrases: ["last book"] },
  { id: "5", warnings: [], keyPhrases: ["Monte Rainier", "caminos"] },
  { id: "6", warnings: [], keyPhrases: ["mucho tráfico", "día", "carretera", "ayer"] },
];

export const expectation52: PiiEntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    redactedText:
      "I had a wonderful trip to Seattle ********* and even visited the Space Needle 2 times!",
    entities: [
      {
        text: "last week",
        category: "DateTime",
        subCategory: "DateRange",
        offset: 34,
        length: 9,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "1",
    warnings: [],
    redactedText:
      "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
    entities: [],
  },
  {
    id: "2",
    warnings: [],
    redactedText:
      "I went to see a movie on ******** and it was perfectly average, nothing more or less than I expected.",
    entities: [
      {
        text: "Saturday",
        category: "DateTime",
        subCategory: "Date",
        offset: 25,
        length: 8,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    redactedText: "I didn't like the last book I read at all.",
    entities: [],
  },
];

export const expectation53: PiiEntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    redactedText:
      "I had a wonderful trip to Seattle ********* and even visited the Space Needle 2 times!",
    entities: [
      {
        text: "last week",
        category: "DateTime",
        subCategory: "DateRange",
        offset: 34,
        length: 9,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "1",
    warnings: [],
    redactedText:
      "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
    entities: [],
  },
  {
    id: "2",
    warnings: [],
    redactedText:
      "I went to see a movie on ******** and it was perfectly average, nothing more or less than I expected.",
    entities: [
      {
        text: "Saturday",
        category: "DateTime",
        subCategory: "Date",
        offset: 25,
        length: 8,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "3",
    warnings: [],
    redactedText: "I didn't like the last book I read at all.",
    entities: [],
  },
];

export const expectation54: PiiEntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    redactedText: "Your Social Security Number is ***********.",
    entities: [
      {
        text: "859-98-0987",
        category: "USSocialSecurityNumber",
        offset: 31,
        length: 11,
        confidenceScore: 0.65,
      },
    ],
  },
];

export const expectation56: PiiEntityRecognitionResult[] = [
  {
    id: "1",
    warnings: [],
    redactedText:
      "I had a wonderful trip to Seattle ********* and even visited the Space Needle 2 times!",
    entities: [
      {
        text: "last week",
        category: "DateTime",
        subCategory: "DateRange",
        offset: 34,
        length: 9,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "2",
    warnings: [],
    redactedText:
      "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
    entities: [],
  },
  {
    id: "3",
    warnings: [],
    redactedText:
      "I went to see a movie on ******** and it was perfectly average, nothing more or less than I expected.",
    entities: [
      {
        text: "Saturday",
        category: "DateTime",
        subCategory: "Date",
        offset: 25,
        length: 8,
        confidenceScore: 0.8,
      },
    ],
  },
  {
    id: "4",
    warnings: [],
    redactedText: "Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.",
    entities: [],
  },
  {
    id: "5",
    warnings: [],
    redactedText: "La carretera estaba atascada. Había mucho tráfico el día de ****.",
    entities: [
      {
        text: "ayer",
        category: "DateTime",
        subCategory: "Date",
        offset: 60,
        length: 4,
        confidenceScore: 0.8,
      },
    ],
  },
];

export const expectation57: PiiEntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    redactedText: "I work at ********* and my phone number is ************",
    entities: [
      { text: "Microsoft", category: "Organization", offset: 10, length: 9, confidenceScore: 0.94 },
      {
        text: "333-333-3333",
        category: "PhoneNumber",
        offset: 43,
        length: 12,
        confidenceScore: 0.8,
      },
    ],
  },
];

export const expectation58: PiiEntityRecognitionResult[] = [
  {
    id: "0",
    warnings: [],
    redactedText: "Patient name is Joe and SSN is ***********",
    entities: [
      {
        text: "859-98-0987",
        category: "USSocialSecurityNumber",
        offset: 31,
        length: 11,
        confidenceScore: 0.65,
      },
    ],
  },
];

export const expectation59: PiiEntityRecognitionSuccessResult[] = [
  {
    id: "0",
    warnings: [],
    redactedText: "Patient name is *** and SSN is ***********",
    entities: [
      { text: "Joe", category: "Person", offset: 16, length: 3, confidenceScore: 0.78 },
      {
        text: "859-98-0987",
        category: "USSocialSecurityNumber",
        offset: 31,
        length: 11,
        confidenceScore: 0.65,
      },
    ],
  },
];

export const expectation60: EntityLinkingResult[] = [
  {
    id: "0",
    warnings: [],
    entities: [
      {
        name: "Seattle",
        matches: [{ confidenceScore: 0.21, text: "Seattle", offset: 26, length: 7 }],
        language: "en",
        dataSourceEntityId: "Seattle",
        url: "https://en.wikipedia.org/wiki/Seattle",
        dataSource: "Wikipedia",
        bingEntitySearchApiId: "5fbba6b8-85e1-4d41-9444-d9055436e473",
      },
      {
        name: "Space Needle",
        matches: [{ confidenceScore: 0.42, text: "Space Needle", offset: 65, length: 12 }],
        language: "en",
        dataSourceEntityId: "Space Needle",
        url: "https://en.wikipedia.org/wiki/Space_Needle",
        dataSource: "Wikipedia",
        bingEntitySearchApiId: "f8dd5b08-206d-2554-6e4a-893f51f4de7e",
      },
    ],
  },
  {
    id: "1",
    warnings: [],
    entities: [
      {
        name: "Seattle",
        matches: [{ confidenceScore: 0.2, text: "Seattle", offset: 50, length: 7 }],
        language: "en",
        dataSourceEntityId: "Seattle",
        url: "https://en.wikipedia.org/wiki/Seattle",
        dataSource: "Wikipedia",
        bingEntitySearchApiId: "5fbba6b8-85e1-4d41-9444-d9055436e473",
      },
      {
        name: "Space Needle",
        matches: [{ confidenceScore: 0.36, text: "Space Needle", offset: 90, length: 12 }],
        language: "en",
        dataSourceEntityId: "Space Needle",
        url: "https://en.wikipedia.org/wiki/Space_Needle",
        dataSource: "Wikipedia",
        bingEntitySearchApiId: "f8dd5b08-206d-2554-6e4a-893f51f4de7e",
      },
    ],
  },
  {
    id: "2",
    warnings: [],
    entities: [
      {
        name: "Saturday",
        matches: [{ confidenceScore: 0.05, text: "Saturday", offset: 25, length: 8 }],
        language: "en",
        dataSourceEntityId: "Saturday",
        url: "https://en.wikipedia.org/wiki/Saturday",
        dataSource: "Wikipedia",
        bingEntitySearchApiId: "296617ab-4ddb-cc10-beba-56e0f42af76b",
      },
    ],
  },
  { id: "3", warnings: [], entities: [] },
];

export const expectation62: EntityLinkingResult[] = [
  {
    id: "1",
    warnings: [],
    entities: [
      {
        name: "Saturday",
        matches: [{ confidenceScore: 0.05, text: "Saturday", offset: 25, length: 8 }],
        language: "en",
        dataSourceEntityId: "Saturday",
        url: "https://en.wikipedia.org/wiki/Saturday",
        dataSource: "Wikipedia",
        bingEntitySearchApiId: "296617ab-4ddb-cc10-beba-56e0f42af76b",
      },
    ],
  },
  { id: "2", warnings: [], entities: [] },
];

export const expectation73: AnalyzeBatchResult[] = [
  {
    kind: "EntityRecognition",
    error: {
      code: KnownErrorCode.InvalidRequest,
      message: "oh my bad",
    },
    modelVersion,
    failedOn,
  },
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
              "Document is large and must be split to be processed; relations across splits may not be caught by the model",
          },
        ],
      },
    ],
    completedOn,
    modelVersion,
  },
];
