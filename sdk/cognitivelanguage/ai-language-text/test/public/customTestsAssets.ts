// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Source: https://github.com/Azure-Samples/cognitive-services-sample-data-files/tree/master/language-service
import {
  ExportedCustomEntityRecognitionProjectAssets,
  ExportedCustomMultiLabelClassificationProjectAssets,
  ExportedCustomSingleLabelClassificationProjectAssets,
} from "@azure/ai-language-textauthoring";

export const customEntityAssets: ExportedCustomEntityRecognitionProjectAssets = {
  projectKind: "CustomEntityRecognition",
  entities: [
    {
      category: "Date",
    },
    {
      category: "BorrowerName",
    },
    {
      category: "BorrowerAddress",
    },
    {
      category: "BorrowerCity",
    },
    {
      category: "BorrowerState",
    },
    {
      category: "LenderName",
    },
    {
      category: "LenderAddress",
    },
    {
      category: "LenderCity",
    },
    {
      category: "LenderState",
    },
    {
      category: "LoanAmountWords",
    },
    {
      category: "LoanAmountNumbers",
    },
    {
      category: "Interest",
    },
  ],
  documents: [
    {
      location: "01.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1793,
          labels: [
            {
              category: "BorrowerAddress",
              offset: 200,
              length: 13,
            },
            {
              category: "BorrowerCity",
              offset: 223,
              length: 9,
            },
            {
              category: "BorrowerState",
              offset: 243,
              length: 8,
            },
            {
              category: "LenderAddress",
              offset: 314,
              length: 15,
            },
            {
              category: "LenderCity",
              offset: 339,
              length: 10,
            },
            {
              category: "LenderState",
              offset: 360,
              length: 8,
            },
            {
              category: "LoanAmountWords",
              offset: 446,
              length: 66,
            },
            {
              category: "LoanAmountNumbers",
              offset: 514,
              length: 11,
            },
            {
              category: "Interest",
              offset: 601,
              length: 2,
            },
            {
              category: "Date",
              offset: 5,
              length: 9,
            },
            {
              category: "BorrowerName",
              offset: 160,
              length: 13,
            },
            {
              category: "LenderName",
              offset: 273,
              length: 14,
            },
          ],
        },
      ],
    },
    {
      location: "02.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1804,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 10,
            },
            {
              category: "BorrowerName",
              offset: 161,
              length: 12,
            },
            {
              category: "BorrowerAddress",
              offset: 200,
              length: 18,
            },
            {
              category: "BorrowerCity",
              offset: 228,
              length: 11,
            },
            {
              category: "BorrowerState",
              offset: 251,
              length: 12,
            },
            {
              category: "LenderName",
              offset: 284,
              length: 10,
            },
            {
              category: "LenderAddress",
              offset: 321,
              length: 20,
            },
            {
              category: "LenderCity",
              offset: 351,
              length: 9,
            },
            {
              category: "LenderState",
              offset: 371,
              length: 8,
            },
            {
              category: "LoanAmountWords",
              offset: 457,
              length: 66,
            },
            {
              category: "LoanAmountNumbers",
              offset: 525,
              length: 11,
            },
            {
              category: "Interest",
              offset: 612,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "03.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1801,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 9,
            },
            {
              category: "BorrowerName",
              offset: 160,
              length: 12,
            },
            {
              category: "BorrowerAddress",
              offset: 199,
              length: 18,
            },
            {
              category: "BorrowerCity",
              offset: 227,
              length: 9,
            },
            {
              category: "BorrowerState",
              offset: 247,
              length: 8,
            },
            {
              category: "LenderName",
              offset: 276,
              length: 11,
            },
            {
              category: "LenderAddress",
              offset: 314,
              length: 19,
            },
            {
              category: "LenderCity",
              offset: 343,
              length: 9,
            },
            {
              category: "LenderState",
              offset: 363,
              length: 10,
            },
            {
              category: "LoanAmountWords",
              offset: 451,
              length: 69,
            },
            {
              category: "LoanAmountNumbers",
              offset: 522,
              length: 11,
            },
            {
              category: "Interest",
              offset: 609,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "04.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1786,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 9,
            },
            {
              category: "BorrowerName",
              offset: 160,
              length: 16,
            },
            {
              category: "BorrowerAddress",
              offset: 203,
              length: 18,
            },
            {
              category: "BorrowerCity",
              offset: 231,
              length: 6,
            },
            {
              category: "BorrowerState",
              offset: 248,
              length: 4,
            },
            {
              category: "LenderName",
              offset: 273,
              length: 11,
            },
            {
              category: "LenderAddress",
              offset: 311,
              length: 19,
            },
            {
              category: "LenderCity",
              offset: 340,
              length: 10,
            },
            {
              category: "LenderState",
              offset: 361,
              length: 9,
            },
            {
              category: "LoanAmountWords",
              offset: 448,
              length: 57,
            },
            {
              category: "LoanAmountNumbers",
              offset: 507,
              length: 11,
            },
            {
              category: "Interest",
              offset: 594,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "05.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1810,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 9,
            },
            {
              category: "BorrowerName",
              offset: 160,
              length: 11,
            },
            {
              category: "BorrowerAddress",
              offset: 195,
              length: 23,
            },
            {
              category: "BorrowerCity",
              offset: 228,
              length: 8,
            },
            {
              category: "BorrowerState",
              offset: 247,
              length: 10,
            },
            {
              category: "LenderName",
              offset: 278,
              length: 12,
            },
            {
              category: "LenderAddress",
              offset: 317,
              length: 18,
            },
            {
              category: "LenderCity",
              offset: 345,
              length: 16,
            },
            {
              category: "LenderState",
              offset: 372,
              length: 12,
            },
            {
              category: "LoanAmountWords",
              offset: 462,
              length: 67,
            },
            {
              category: "LoanAmountNumbers",
              offset: 531,
              length: 11,
            },
            {
              category: "Interest",
              offset: 618,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "06.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1790,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 8,
            },
            {
              category: "BorrowerAddress",
              offset: 165,
              length: 49,
            },
            {
              category: "BorrowerName",
              offset: 159,
              length: 5,
            },
            {
              category: "BorrowerCity",
              offset: 224,
              length: 7,
            },
            {
              category: "BorrowerState",
              offset: 242,
              length: 8,
            },
            {
              category: "LenderName",
              offset: 271,
              length: 15,
            },
            {
              category: "LenderAddress",
              offset: 313,
              length: 14,
            },
            {
              category: "LenderCity",
              offset: 337,
              length: 6,
            },
            {
              category: "LenderState",
              offset: 354,
              length: 8,
            },
            {
              category: "LoanAmountWords",
              offset: 440,
              length: 69,
            },
            {
              category: "LoanAmountNumbers",
              offset: 511,
              length: 11,
            },
            {
              category: "Interest",
              offset: 598,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "07.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1814,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 9,
            },
            {
              category: "BorrowerName",
              offset: 160,
              length: 12,
            },
            {
              category: "BorrowerAddress",
              offset: 199,
              length: 26,
            },
            {
              category: "BorrowerCity",
              offset: 235,
              length: 10,
            },
            {
              category: "BorrowerState",
              offset: 256,
              length: 10,
            },
            {
              category: "LenderName",
              offset: 287,
              length: 10,
            },
            {
              category: "LenderAddress",
              offset: 324,
              length: 19,
            },
            {
              category: "LenderCity",
              offset: 353,
              length: 11,
            },
            {
              category: "LenderState",
              offset: 375,
              length: 13,
            },
            {
              category: "LoanAmountWords",
              offset: 466,
              length: 67,
            },
            {
              category: "LoanAmountNumbers",
              offset: 535,
              length: 11,
            },
            {
              category: "Interest",
              offset: 622,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "08.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1804,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 10,
            },
            {
              category: "BorrowerName",
              offset: 161,
              length: 11,
            },
            {
              category: "BorrowerAddress",
              offset: 199,
              length: 20,
            },
            {
              category: "BorrowerCity",
              offset: 229,
              length: 13,
            },
            {
              category: "BorrowerState",
              offset: 253,
              length: 14,
            },
            {
              category: "LenderName",
              offset: 288,
              length: 12,
            },
            {
              category: "LenderAddress",
              offset: 327,
              length: 16,
            },
            {
              category: "LenderCity",
              offset: 353,
              length: 9,
            },
            {
              category: "LenderState",
              offset: 373,
              length: 14,
            },
            {
              category: "LoanAmountWords",
              offset: 465,
              length: 57,
            },
            {
              category: "LoanAmountNumbers",
              offset: 524,
              length: 11,
            },
            {
              category: "Interest",
              offset: 611,
              length: 3,
            },
          ],
        },
      ],
    },
    {
      location: "09.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1790,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 10,
            },
            {
              category: "BorrowerName",
              offset: 161,
              length: 11,
            },
            {
              category: "BorrowerAddress",
              offset: 199,
              length: 14,
            },
            {
              category: "BorrowerCity",
              offset: 223,
              length: 6,
            },
            {
              category: "BorrowerState",
              offset: 240,
              length: 10,
            },
            {
              category: "LenderName",
              offset: 271,
              length: 13,
            },
            {
              category: "LenderAddress",
              offset: 311,
              length: 18,
            },
            {
              category: "LenderCity",
              offset: 339,
              length: 7,
            },
            {
              category: "LenderState",
              offset: 357,
              length: 9,
            },
            {
              category: "LoanAmountWords",
              offset: 444,
              length: 65,
            },
            {
              category: "LoanAmountNumbers",
              offset: 511,
              length: 11,
            },
            {
              category: "Interest",
              offset: 598,
              length: 2,
            },
          ],
        },
      ],
    },
    {
      location: "10.txt",
      language: "en-us",
      entities: [
        {
          regionOffset: 0,
          regionLength: 1795,
          labels: [
            {
              category: "Date",
              offset: 5,
              length: 9,
            },
            {
              category: "BorrowerName",
              offset: 160,
              length: 11,
            },
            {
              category: "BorrowerAddress",
              offset: 198,
              length: 18,
            },
            {
              category: "BorrowerCity",
              offset: 226,
              length: 7,
            },
            {
              category: "BorrowerState",
              offset: 244,
              length: 8,
            },
            {
              category: "LenderName",
              offset: 273,
              length: 15,
            },
            {
              category: "LenderAddress",
              offset: 315,
              length: 25,
            },
            {
              category: "LenderCity",
              offset: 350,
              length: 5,
            },
            {
              category: "LenderState",
              offset: 366,
              length: 5,
            },
            {
              category: "LoanAmountWords",
              offset: 449,
              length: 65,
            },
            {
              category: "LoanAmountNumbers",
              offset: 516,
              length: 11,
            },
            {
              category: "Interest",
              offset: 603,
              length: 2,
            },
          ],
        },
      ],
    },
  ],
};

export const customSingleLabelAssets: ExportedCustomSingleLabelClassificationProjectAssets = {
  projectKind: "CustomSingleLabelClassification",
  classes: [
    {
      category: "Computer_science",
    },
    {
      category: "Electrical_engineering",
    },
    {
      category: "Psychology",
    },
    {
      category: "Mechanical_engineering",
    },
    {
      category: "Civil_engineering",
    },
    {
      category: "Medical",
    },
    {
      category: "Biochemistry",
    },
  ],
  documents: [
    {
      location: "109.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "132.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "208.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "107.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "191.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "035.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "005.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "025.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "119.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "105.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "205.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "151.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "137.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "170.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "174.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "084.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "196.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "077.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "062.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "181.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "143.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "116.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "042.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "022.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "044.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "010.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "074.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "085.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "016.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "180.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "094.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "161.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "031.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "057.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "142.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "090.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "207.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "040.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "200.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "141.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "054.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "195.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "134.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "015.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "097.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "187.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "039.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "079.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "206.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "145.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "169.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "058.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "102.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "100.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "012.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "133.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "198.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "160.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "017.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "028.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "112.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "023.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "043.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "121.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "008.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "070.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "101.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "159.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "018.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "185.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "076.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "130.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "113.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "188.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "038.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "115.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "075.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "192.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "167.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "065.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "086.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "061.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "153.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "163.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "067.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "146.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "131.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "168.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "114.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "033.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "002.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "051.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "138.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "034.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "210.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "089.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "164.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "064.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "144.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "120.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "126.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "199.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "032.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "125.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "091.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "201.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "124.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "046.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "176.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "029.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "136.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "123.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "003.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "189.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "155.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "098.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "006.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "014.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "099.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "209.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "013.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "172.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "052.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "183.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "081.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "026.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "041.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "068.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "024.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "148.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "009.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "157.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "060.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "158.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "110.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "104.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "072.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "078.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "036.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "092.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "027.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "071.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "171.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "019.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "204.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "129.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "117.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "194.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "152.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "059.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "082.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "179.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "004.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "011.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "053.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "021.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "173.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "037.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "197.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "118.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "165.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "020.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "139.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "128.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "056.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "156.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "108.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "122.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "083.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "093.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "184.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "166.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "127.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "103.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "045.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "162.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "096.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "190.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "080.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "140.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "111.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "066.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "007.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "202.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "047.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "154.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "186.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "150.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "106.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
    {
      location: "069.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "193.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "135.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "030.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "055.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "178.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "147.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "050.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "175.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "048.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "149.txt",
      language: "en-us",
      class: {
        category: "Civil_engineering",
      },
    },
    {
      location: "088.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "182.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "001.txt",
      language: "en-us",
      class: {
        category: "Computer_science",
      },
    },
    {
      location: "049.txt",
      language: "en-us",
      class: {
        category: "Electrical_engineering",
      },
    },
    {
      location: "203.txt",
      language: "en-us",
      class: {
        category: "Biochemistry",
      },
    },
    {
      location: "073.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "087.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "063.txt",
      language: "en-us",
      class: {
        category: "Psychology",
      },
    },
    {
      location: "177.txt",
      language: "en-us",
      class: {
        category: "Medical",
      },
    },
    {
      location: "095.txt",
      language: "en-us",
      class: {
        category: "Mechanical_engineering",
      },
    },
  ],
};

export const customMultiLabelAssets: ExportedCustomMultiLabelClassificationProjectAssets = {
  projectKind: "CustomMultiLabelClassification",
  classes: [
    {
      category: "Mystery",
    },
    {
      category: "Drama",
    },
    {
      category: "Thriller",
    },
    {
      category: "Comedy",
    },
    {
      category: "Action",
    },
  ],
  documents: [
    {
      location: "And_Justice_for_All.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "14_Going_on_30.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "33_Scenes_from_Life.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "A_King_and_His_Movie.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "A_Reasonable_Man.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "A_Woman_in_Flames.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "A_Zed_And_Two_Noughts.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Aaah_Belinda.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Aadavari_Matalaku_Ardhalu_Verule.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Aduri.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Affinity.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Agneekaal.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "All_the_Queen's_Men.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Amy.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "And_God_Created_Woman.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Anokha_Rishta.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Aparan.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Archie_To_Riverdale_and_Back_Again.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Asoka.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Asylum_Seekers.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Baba_Kalyani.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Baby_Boy.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Bad_Day_at_Black_Rock.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Bangkok_Dangerous.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Barah_Aana.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Barricade.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Beachhead.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Bindiya_Chamkegi.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Bleeder.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Bless_the_Child.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Bring_Me_the_Head_of_Alfredo_Garcia.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "C.H.U.D.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Cash.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Chandra_Mukhi.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Children_of_Glory.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Chura_Liyaa_Hai_Tumne.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Clash_of_the_Titans.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Closing_the_Ring.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Colombiana.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Coney_Island_Baby.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Confessions_of_a_Dangerous_Mind.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Convoy.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Count_Your_Blessings.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Crime_Doctor.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Daddy_and_Them.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Das_schreckliche_Madchen.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Deadly_Voyage.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Dhamarukam.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Dilliwala_Rajakumaran.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Don_The_Chase_Begins_Again.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Double_Jeopardy.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Dragonfly.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Dream_Home.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Durval_discos.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Dylan_Dog_Dead_of_Night.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Enemy_Territory.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Extreme_Prejudice.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Fanfan_la_Tulipe.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Fatal_Attraction.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Fay_Grim.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Fled.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Flesh.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "G.I._Jane.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Gagamboy.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Garage_Days.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Go_Fish.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Goldie.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Good_Morning_Miss_Dove.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Gospel_Hill.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Grace_of_My_Heart.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Grampy's_Indoor_Outing.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Gwendoline.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Hathyar_Face_to_Face_with_Reality.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Henry_V.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Henry's_Crime.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Hermanas.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "I_Could_Never_Be_Your_Woman.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "If_They_Tell_You_I_Fell.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "In_Harihar_Nagar.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Inferno.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Inland_Empire.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Is_There_a_Doctor_in_the_Mouse.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "It_Came_Upon_the_Midnight_Clear.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Jaal.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Jackie_Brown.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Juice.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Just_Wright.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "K-19_The_Widowmaker.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Kaboom.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Karayilekku_Oru_Kadal_Dooram.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Kausthubham.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Kempe_Gowda.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Kickboxer_3.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Killer_Hair.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Kinjite_Forbidden_Subjects.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Kireedam.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Knife_in_the_Water.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "L.A._Confidential.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Larceny_on_the_Air.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Laura.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Lee_Dae-ro_Can't_Die.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Little_city.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Loverboy.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Lucia_Lucia.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Malibu_Express.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Man_on_Fire.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Mary_Poppins.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Mehndi_Waley_Hath.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Mengejar_Mas-Mas.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Midnight_Express.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Minsaara_Kanavu.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Mon_Mane_Na.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Mortelle_randonnee.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Motives.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Nariman.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Next.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Nine_Dead.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "No_Time_for_Sergeants.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Nothing_to_Lose.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Okinawa_Rendez-vous.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Om_Shanti_Om.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "On_the_Beach.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Ordinary_Decent_Criminal.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Oru_Black_And_White_Kudumbam.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Over_the_Rainbow.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Pale_Rider.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Peddarayudu.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Perrier's_Bounty.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Pirates_of_Treasure_Island.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Pretty_Poison.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Prizzi's_Honor.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Pusher_II.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Raampur_Ka_Lakshman.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Raju_Chacha.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Return_to_Babylon.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "RoboCop_3.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Rogues'_Regiment.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Rudo_y_Cursi.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Serenity.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Shadow.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Shaft.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Shagird.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Sherlock_Holmes_A_Game_of_Shadows.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Siam_Sunset.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Sioux_City.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Snow_Falling_on_Cedars.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Someone_to_Watch_Over_Me.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Sorry,_Wrong_Number.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Stage_Beauty.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Star.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "Straw_Dogs.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Suddenly,_Last_Summer.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Teheran_43.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Terrorama.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_39_Steps.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Bone_Collector.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Boston_Strangler.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Bourne_Supremacy.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Box.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Bridge.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "The_Clearing.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Contract.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_East.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Final_Cut.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Gods_Must_Be_Crazy.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Golden_Spiders_A_Nero_Wolfe_Mystery.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "The_Great_New_Wonderful.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "The_Hero_Love_Story_of_a_Spy.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_High_Cost_of_Living.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "The_Human_Tornado.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Iron_Maiden.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_January_Man.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Killers.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_King_and_the_Clown.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Lady_Vanishes.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Life_of_David_Gale.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Little_Hut.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Lone_Wolf_Meets_a_Lady.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Man_with_the_Perfect_Swing.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Mechanical_Monsters.txt",
      language: "en-us",
      classes: [
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Minx.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Mirror_Crack'd.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Moment_After_2_The_Awakening.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Naked_Kitchen.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Prize.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Program.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_Sleeping_Car_Murders.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "The_Way.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "The_Whistle_Blower.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "The_World_of_Geisha.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
      ],
    },
    {
      location: "The_X_Files_2.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "They_Met_in_Bombay.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Things_to_Do_in_Denver_When_You're_Dead.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Three_Monkeys.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Tokyo_Joe.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Trixie.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Twelve_Monkeys.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Unknown.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Vandanam.txt",
      language: "en-us",
      classes: [
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Vanishing_on_7th_Street.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "Vice_Squad.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Walk_a_Crooked_Mile.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Walking_Tall_Final_Chapter.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "What_Have_I_Done_To_Deserve_This.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "White_Of_The_Eye.txt",
      language: "en-us",
      classes: [
        {
          category: "Thriller",
        },
      ],
    },
    {
      location: "White_on_Rice.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Yamla_Pagla_Deewana.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Young_Sherlock_Holmes.txt",
      language: "en-us",
      classes: [
        {
          category: "Mystery",
        },
        {
          category: "Drama",
        },
        {
          category: "Thriller",
        },
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
    {
      location: "Ziddi.txt",
      language: "en-us",
      classes: [
        {
          category: "Drama",
        },
        {
          category: "Comedy",
        },
      ],
    },
    {
      location: "Get_Smart's_Bruce_And_Lloyd_Out_of_Control.txt",
      language: "en-us",
      classes: [
        {
          category: "Comedy",
        },
        {
          category: "Action",
        },
      ],
    },
  ],
};
