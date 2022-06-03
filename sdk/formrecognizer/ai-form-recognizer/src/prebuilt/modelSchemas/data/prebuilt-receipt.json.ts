// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-receipt model.
 */
export const modelInfo = {
  modelId: "prebuilt-receipt",
  description:
    "Prebuilt model to extract key information from English receipts, including merchant name, transaction date, transaction total, and more.",
  createdDateTime: "2022-06-30T00:00:00.000Z",
  apiVersion: "2022-06-30-preview",
  docTypes: {
    receipt: {
      buildMode: "template",
      fieldSchema: {
        Locale: {
          type: "string",
        },
        MerchantName: {
          type: "string",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
        },
        MerchantAddress: {
          type: "string",
        },
        Total: {
          type: "number",
        },
        TransactionDate: {
          type: "date",
        },
        TransactionTime: {
          type: "time",
        },
        Subtotal: {
          type: "number",
        },
        TotalTax: {
          type: "number",
        },
        Tip: {
          type: "number",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              TotalPrice: {
                type: "number",
              },
              Description: {
                type: "string",
              },
              Quantity: {
                type: "number",
              },
              Price: {
                type: "number",
              },
            },
          },
        },
      },
    },
    "receipt.retailMeal": {
      buildMode: "template",
      fieldSchema: {
        Locale: {
          type: "string",
        },
        MerchantName: {
          type: "string",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
        },
        MerchantAddress: {
          type: "string",
        },
        Total: {
          type: "number",
        },
        TransactionDate: {
          type: "date",
        },
        TransactionTime: {
          type: "time",
        },
        Subtotal: {
          type: "number",
        },
        TotalTax: {
          type: "number",
        },
        Tip: {
          type: "number",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              TotalPrice: {
                type: "number",
              },
              Description: {
                type: "string",
              },
              Quantity: {
                type: "number",
              },
              Price: {
                type: "number",
              },
            },
          },
        },
      },
    },
    "receipt.creditCard": {
      buildMode: "template",
      fieldSchema: {
        Locale: {
          type: "string",
        },
        MerchantName: {
          type: "string",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
        },
        MerchantAddress: {
          type: "string",
        },
        Total: {
          type: "number",
        },
        TransactionDate: {
          type: "date",
        },
        TransactionTime: {
          type: "time",
        },
        Subtotal: {
          type: "number",
        },
        TotalTax: {
          type: "number",
        },
        Tip: {
          type: "number",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              TotalPrice: {
                type: "number",
              },
              Description: {
                type: "string",
              },
              Quantity: {
                type: "number",
              },
              Price: {
                type: "number",
              },
            },
          },
        },
      },
    },
    "receipt.gas": {
      buildMode: "template",
      fieldSchema: {
        Locale: {
          type: "string",
        },
        MerchantName: {
          type: "string",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
        },
        MerchantAddress: {
          type: "string",
        },
        Total: {
          type: "number",
        },
        TransactionDate: {
          type: "date",
        },
        TransactionTime: {
          type: "time",
        },
        Subtotal: {
          type: "number",
        },
        TotalTax: {
          type: "number",
        },
        Tip: {
          type: "number",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              TotalPrice: {
                type: "number",
              },
              Description: {
                type: "string",
              },
              Quantity: {
                type: "number",
              },
              Price: {
                type: "number",
              },
            },
          },
        },
      },
    },
    "receipt.parking": {
      buildMode: "template",
      fieldSchema: {
        Locale: {
          type: "string",
        },
        MerchantName: {
          type: "string",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
        },
        MerchantAddress: {
          type: "string",
        },
        Total: {
          type: "number",
        },
        TransactionDate: {
          type: "date",
        },
        TransactionTime: {
          type: "time",
        },
        Subtotal: {
          type: "number",
        },
        TotalTax: {
          type: "number",
        },
        Tip: {
          type: "number",
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              TotalPrice: {
                type: "number",
              },
              Description: {
                type: "string",
              },
              Quantity: {
                type: "number",
              },
              Price: {
                type: "number",
              },
            },
          },
        },
      },
    },
    "receipt.hotel": {
      buildMode: "template",
      fieldSchema: {
        MerchantName: {
          type: "string",
        },
        MerchantPhoneNumber: {
          type: "phoneNumber",
        },
        MerchantAddress: {
          type: "string",
        },
        Total: {
          type: "number",
        },
        ArrivalDate: {
          type: "date",
        },
        DepartureDate: {
          type: "date",
        },
        Currency: {
          type: "string",
        },
        MerchantAliases: {
          type: "array",
          items: {
            type: "string",
          },
        },
        Items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              TotalPrice: {
                type: "number",
              },
              Description: {
                type: "string",
              },
              Date: {
                type: "date",
              },
              Category: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
} as const;
