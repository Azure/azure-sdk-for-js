// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-receipt
// Description: Extract key information from receipts.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from receipts.
 */
const PrebuiltReceiptModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-receipt",
    description: "Extract key information from receipts.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
    docTypes: {
      receipt: {
        buildMode: "template",
        fieldSchema: {
          MerchantName: {
            type: "string",
            description: "Name of the merchant issuing the receipt",
            example: "Contoso",
          },
          MerchantPhoneNumber: {
            type: "phoneNumber",
            description: "Listed phone number of merchant",
            example: "987-654-3210",
          },
          MerchantAddress: {
            type: "address",
            description: "Listed address of merchant",
            example: "123 Main St Redmond WA 98052",
          },
          Total: {
            type: "number",
            description: "Full transaction total of receipt",
            example: "$14.34",
          },
          TransactionDate: {
            type: "date",
            description: "Date the receipt was issued",
            example: "June 06, 2019",
          },
          TransactionTime: {
            type: "time",
            description: "Time the receipt was issued",
            example: "4:49 PM",
          },
          Subtotal: {
            type: "number",
            description: "Subtotal of receipt, often before taxes are applied",
            example: "$12.34",
          },
          TotalTax: {
            type: "number",
            description: "Tax on receipt, often sales tax or equivalent",
            example: "$2.00",
          },
          Tip: {
            type: "number",
            description: "Tip included by buyer",
            example: "$1.00",
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                TotalPrice: {
                  type: "number",
                  description: "Total price of line item",
                  example: "$999.00",
                },
                Description: {
                  type: "string",
                  description: "Item description",
                  example: "Surface Pro 6",
                },
                Quantity: {
                  type: "number",
                  description: "Quantity of each item",
                  example: "1",
                },
                Price: {
                  type: "number",
                  description: "Individual price of each item unit",
                  example: "$999.00",
                },
                ProductCode: {
                  type: "string",
                  description:
                    "Product code, product number, or SKU associated with the specific line item",
                  example: "A123",
                },
                QuantityUnit: {
                  type: "string",
                  description: "Quantity unit of each item",
                },
              },
            },
          },
          TaxDetails: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the tax detail",
                  example: "$999.00",
                },
              },
            },
          },
        },
      },
      "receipt.retailMeal": {
        buildMode: "template",
        fieldSchema: {
          MerchantName: {
            type: "string",
            description: "Name of the merchant issuing the receipt",
            example: "Contoso",
          },
          MerchantPhoneNumber: {
            type: "phoneNumber",
            description: "Listed phone number of merchant",
            example: "987-654-3210",
          },
          MerchantAddress: {
            type: "address",
            description: "Listed address of merchant",
            example: "123 Main St Redmond WA 98052",
          },
          Total: {
            type: "number",
            description: "Full transaction total of receipt",
            example: "$14.34",
          },
          TransactionDate: {
            type: "date",
            description: "Date the receipt was issued",
            example: "June 06, 2019",
          },
          TransactionTime: {
            type: "time",
            description: "Time the receipt was issued",
            example: "4:49 PM",
          },
          Subtotal: {
            type: "number",
            description: "Subtotal of receipt, often before taxes are applied",
            example: "$12.34",
          },
          TotalTax: {
            type: "number",
            description: "Tax on receipt, often sales tax or equivalent",
            example: "$2.00",
          },
          Tip: {
            type: "number",
            description: "Tip included by buyer",
            example: "$1.00",
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                TotalPrice: {
                  type: "number",
                  description: "Total price of line item",
                  example: "$999.00",
                },
                Description: {
                  type: "string",
                  description: "Item description",
                  example: "Surface Pro 6",
                },
                Quantity: {
                  type: "number",
                  description: "Quantity of each item",
                  example: "1",
                },
                Price: {
                  type: "number",
                  description: "Individual price of each item unit",
                  example: "$999.00",
                },
                ProductCode: {
                  type: "string",
                  description:
                    "Product code, product number, or SKU associated with the specific line item",
                  example: "A123",
                },
                QuantityUnit: {
                  type: "string",
                  description: "Quantity unit of each item",
                },
              },
            },
          },
          TaxDetails: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the tax detail",
                  example: "$999.00",
                },
              },
            },
          },
        },
      },
      "receipt.creditCard": {
        buildMode: "template",
        fieldSchema: {
          MerchantName: {
            type: "string",
            description: "Name of the merchant issuing the receipt",
            example: "Contoso",
          },
          MerchantPhoneNumber: {
            type: "phoneNumber",
            description: "Listed phone number of merchant",
            example: "987-654-3210",
          },
          MerchantAddress: {
            type: "address",
            description: "Listed address of merchant",
            example: "123 Main St Redmond WA 98052",
          },
          Total: {
            type: "number",
            description: "Full transaction total of receipt",
            example: "$14.34",
          },
          TransactionDate: {
            type: "date",
            description: "Date the receipt was issued",
            example: "June 06, 2019",
          },
          TransactionTime: {
            type: "time",
            description: "Time the receipt was issued",
            example: "4:49 PM",
          },
          Subtotal: {
            type: "number",
            description: "Subtotal of receipt, often before taxes are applied",
            example: "$12.34",
          },
          TotalTax: {
            type: "number",
            description: "Tax on receipt, often sales tax or equivalent",
            example: "$2.00",
          },
          Tip: {
            type: "number",
            description: "Tip included by buyer",
            example: "$1.00",
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                TotalPrice: {
                  type: "number",
                  description: "Total price of line item",
                  example: "$999.00",
                },
                Description: {
                  type: "string",
                  description: "Item description",
                  example: "Surface Pro 6",
                },
                Quantity: {
                  type: "number",
                  description: "Quantity of each item",
                  example: "1",
                },
                Price: {
                  type: "number",
                  description: "Individual price of each item unit",
                  example: "$999.00",
                },
                ProductCode: {
                  type: "string",
                  description:
                    "Product code, product number, or SKU associated with the specific line item",
                  example: "A123",
                },
                QuantityUnit: {
                  type: "string",
                  description: "Quantity unit of each item",
                },
              },
            },
          },
          TaxDetails: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the tax detail",
                  example: "$999.00",
                },
              },
            },
          },
        },
      },
      "receipt.gas": {
        buildMode: "template",
        fieldSchema: {
          MerchantName: {
            type: "string",
            description: "Name of the merchant issuing the receipt",
            example: "Contoso",
          },
          MerchantPhoneNumber: {
            type: "phoneNumber",
            description: "Listed phone number of merchant",
            example: "987-654-3210",
          },
          MerchantAddress: {
            type: "address",
            description: "Listed address of merchant",
            example: "123 Main St Redmond WA 98052",
          },
          Total: {
            type: "number",
            description: "Full transaction total of receipt",
            example: "$14.34",
          },
          TransactionDate: {
            type: "date",
            description: "Date the receipt was issued",
            example: "June 06, 2019",
          },
          TransactionTime: {
            type: "time",
            description: "Time the receipt was issued",
            example: "4:49 PM",
          },
          Subtotal: {
            type: "number",
            description: "Subtotal of receipt, often before taxes are applied",
            example: "$12.34",
          },
          TotalTax: {
            type: "number",
            description: "Tax on receipt, often sales tax or equivalent",
            example: "$2.00",
          },
          Tip: {
            type: "number",
            description: "Tip included by buyer",
            example: "$1.00",
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                TotalPrice: {
                  type: "number",
                  description: "Total price of line item",
                  example: "$999.00",
                },
                Description: {
                  type: "string",
                  description: "Item description",
                  example: "Surface Pro 6",
                },
                Quantity: {
                  type: "number",
                  description: "Quantity of each item",
                  example: "1",
                },
                Price: {
                  type: "number",
                  description: "Individual price of each item unit",
                  example: "$999.00",
                },
                ProductCode: {
                  type: "string",
                  description:
                    "Product code, product number, or SKU associated with the specific line item",
                  example: "A123",
                },
                QuantityUnit: {
                  type: "string",
                  description: "Quantity unit of each item",
                },
              },
            },
          },
          TaxDetails: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the tax detail",
                  example: "$999.00",
                },
              },
            },
          },
        },
      },
      "receipt.parking": {
        buildMode: "template",
        fieldSchema: {
          MerchantName: {
            type: "string",
            description: "Name of the merchant issuing the receipt",
            example: "Contoso",
          },
          MerchantPhoneNumber: {
            type: "phoneNumber",
            description: "Listed phone number of merchant",
            example: "987-654-3210",
          },
          MerchantAddress: {
            type: "address",
            description: "Listed address of merchant",
            example: "123 Main St Redmond WA 98052",
          },
          Total: {
            type: "number",
            description: "Full transaction total of receipt",
            example: "$14.34",
          },
          TransactionDate: {
            type: "date",
            description: "Date the receipt was issued",
            example: "June 06, 2019",
          },
          TransactionTime: {
            type: "time",
            description: "Time the receipt was issued",
            example: "4:49 PM",
          },
          Subtotal: {
            type: "number",
            description: "Subtotal of receipt, often before taxes are applied",
            example: "$12.34",
          },
          TotalTax: {
            type: "number",
            description: "Tax on receipt, often sales tax or equivalent",
            example: "$2.00",
          },
          Tip: {
            type: "number",
            description: "Tip included by buyer",
            example: "$1.00",
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                TotalPrice: {
                  type: "number",
                  description: "Total price of line item",
                  example: "$999.00",
                },
                Description: {
                  type: "string",
                  description: "Item description",
                  example: "Surface Pro 6",
                },
                Quantity: {
                  type: "number",
                  description: "Quantity of each item",
                  example: "1",
                },
                Price: {
                  type: "number",
                  description: "Individual price of each item unit",
                  example: "$999.00",
                },
                ProductCode: {
                  type: "string",
                  description:
                    "Product code, product number, or SKU associated with the specific line item",
                  example: "A123",
                },
                QuantityUnit: {
                  type: "string",
                  description: "Quantity unit of each item",
                },
              },
            },
          },
          TaxDetails: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the tax detail",
                  example: "$999.00",
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
            description: "Name of the merchant issuing the receipt",
            example: "Contoso",
          },
          MerchantPhoneNumber: {
            type: "phoneNumber",
            description: "Listed phone number of merchant",
            example: "987-654-3210",
          },
          MerchantAddress: {
            type: "address",
            description: "Listed address of merchant",
            example: "123 Main St Redmond WA 98052",
          },
          Total: {
            type: "number",
            description: "Full transaction total of receipt",
            example: "$14.34",
          },
          ArrivalDate: {
            type: "date",
            description: "Date of arrival",
            example: "27Mar21",
          },
          DepartureDate: {
            type: "date",
            description: "Date of departure",
            example: "28Mar21",
          },
          Currency: {
            type: "string",
            description:
              "Currency unit of receipt amounts (ISO 4217), or 'MIXED' if multiple values are found",
            example: "USD",
          },
          MerchantAliases: {
            type: "array",
            items: {
              type: "string",
              description: "Alternative name of merchant",
              example: "Contoso (R)",
            },
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              description: "Extracted line item",
              example: "1\nSurface Pro 6\n$999.00\n$999.00",
              properties: {
                TotalPrice: {
                  type: "number",
                  description: "Total price of line item",
                  example: "$999.00",
                },
                Description: {
                  type: "string",
                  description: "Item description",
                  example: "Room Charge",
                },
                Date: {
                  type: "date",
                  description: "Item date",
                  example: "27Mar21",
                },
                Category: {
                  type: "string",
                  description: "Item category",
                  example: "Room",
                },
              },
            },
          },
        },
      },
    },
  };
}

module.exports = {
  PrebuiltReceiptModel,
  PrebuiltReceiptResult,
  PrebuiltReceiptDocument,
  Receipt,
  ReceiptRetailMeal,
  ReceiptCreditCard,
  ReceiptGas,
  ReceiptParking,
  ReceiptHotel,
  ReceiptFields,
  ReceiptItemsElement,
  ReceiptTaxDetailsElement,
  ReceiptRetailMealFields,
  ReceiptRetailMealItemsElement,
  ReceiptRetailMealTaxDetailsElement,
  ReceiptCreditCardFields,
  ReceiptCreditCardItemsElement,
  ReceiptCreditCardTaxDetailsElement,
  ReceiptGasFields,
  ReceiptGasItemsElement,
  ReceiptGasTaxDetailsElement,
  ReceiptParkingFields,
  ReceiptParkingItemsElement,
  ReceiptParkingTaxDetailsElement,
  ReceiptHotelFields,
  ReceiptHotelItemsElement,
};
