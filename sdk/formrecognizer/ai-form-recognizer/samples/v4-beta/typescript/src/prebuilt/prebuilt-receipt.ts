// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-receipt
// Description: Extract key information from receipts.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from receipts.
 */
export const PrebuiltReceiptModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltReceiptResult>;

export interface PrebuiltReceiptResult extends fr.AnalyzeResultCommon {
  /**
   * Extracted pages.
   */
  pages?: fr.DocumentPage[];
  /**
   * Extracted document paragraphs.
   */
  paragraphs?: fr.DocumentParagraph[];
  /**
   * Extracted font styles.
   */
  styles?: fr.DocumentStyle[];
  /**
   * Extracted key-value pairs.
   */
  keyValuePairs?: fr.DocumentKeyValuePair[];
  /**
   * Extracted documents.
   */
  documents: PrebuiltReceiptDocument[];
}

export type PrebuiltReceiptDocument =
  | Receipt
  | ReceiptRetailMeal
  | ReceiptCreditCard
  | ReceiptGas
  | ReceiptParking
  | ReceiptHotel;

export interface Receipt {
  /**
   * Document type: "receipt".
   */
  docType: "receipt";
  /**
   * Document fields.
   */
  fields: ReceiptFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface ReceiptRetailMeal {
  /**
   * Document type: "receipt.retailMeal".
   */
  docType: "receipt.retailMeal";
  /**
   * Document fields.
   */
  fields: ReceiptRetailMealFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface ReceiptCreditCard {
  /**
   * Document type: "receipt.creditCard".
   */
  docType: "receipt.creditCard";
  /**
   * Document fields.
   */
  fields: ReceiptCreditCardFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface ReceiptGas {
  /**
   * Document type: "receipt.gas".
   */
  docType: "receipt.gas";
  /**
   * Document fields.
   */
  fields: ReceiptGasFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface ReceiptParking {
  /**
   * Document type: "receipt.parking".
   */
  docType: "receipt.parking";
  /**
   * Document fields.
   */
  fields: ReceiptParkingFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

export interface ReceiptHotel {
  /**
   * Document type: "receipt.hotel".
   */
  docType: "receipt.hotel";
  /**
   * Document fields.
   */
  fields: ReceiptHotelFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

/**
 * Describes the fields of `ReceiptFields`.
 */
export interface ReceiptFields {
  /**
   * `Receipt` "MerchantName" field
   */
  merchantName?: fr.DocumentStringField;
  /**
   * `Receipt` "MerchantPhoneNumber" field
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * `Receipt` "MerchantAddress" field
   */
  merchantAddress?: fr.DocumentStringField;
  /**
   * `Receipt` "Total" field
   */
  total?: fr.DocumentNumberField;
  /**
   * `Receipt` "TransactionDate" field
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * `Receipt` "TransactionTime" field
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * `Receipt` "Subtotal" field
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * `Receipt` "TotalTax" field
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * `Receipt` "Tip" field
   */
  tip?: fr.DocumentNumberField;
  /**
   * `Receipt` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptItemsElement>>;
}

/**
 * Describes the fields of `ReceiptItemsElement`.
 */
export interface ReceiptItemsElement {
  /**
   * `Receipt` "TotalPrice" field
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * `Receipt` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `Receipt` "Quantity" field
   */
  quantity?: fr.DocumentNumberField;
  /**
   * `Receipt` "Price" field
   */
  price?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `ReceiptRetailMealFields`.
 */
export interface ReceiptRetailMealFields {
  /**
   * `ReceiptRetailMeal` "MerchantName" field
   */
  merchantName?: fr.DocumentStringField;
  /**
   * `ReceiptRetailMeal` "MerchantPhoneNumber" field
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * `ReceiptRetailMeal` "MerchantAddress" field
   */
  merchantAddress?: fr.DocumentStringField;
  /**
   * `ReceiptRetailMeal` "Total" field
   */
  total?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "TransactionDate" field
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * `ReceiptRetailMeal` "TransactionTime" field
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * `ReceiptRetailMeal` "Subtotal" field
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "TotalTax" field
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "Tip" field
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptRetailMealItemsElement>>;
}

/**
 * Describes the fields of `ReceiptRetailMealItemsElement`.
 */
export interface ReceiptRetailMealItemsElement {
  /**
   * `ReceiptRetailMeal` "TotalPrice" field
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `ReceiptRetailMeal` "Quantity" field
   */
  quantity?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "Price" field
   */
  price?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `ReceiptCreditCardFields`.
 */
export interface ReceiptCreditCardFields {
  /**
   * `ReceiptCreditCard` "MerchantName" field
   */
  merchantName?: fr.DocumentStringField;
  /**
   * `ReceiptCreditCard` "MerchantPhoneNumber" field
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * `ReceiptCreditCard` "MerchantAddress" field
   */
  merchantAddress?: fr.DocumentStringField;
  /**
   * `ReceiptCreditCard` "Total" field
   */
  total?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "TransactionDate" field
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * `ReceiptCreditCard` "TransactionTime" field
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * `ReceiptCreditCard` "Subtotal" field
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "TotalTax" field
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "Tip" field
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptCreditCardItemsElement>>;
}

/**
 * Describes the fields of `ReceiptCreditCardItemsElement`.
 */
export interface ReceiptCreditCardItemsElement {
  /**
   * `ReceiptCreditCard` "TotalPrice" field
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `ReceiptCreditCard` "Quantity" field
   */
  quantity?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "Price" field
   */
  price?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `ReceiptGasFields`.
 */
export interface ReceiptGasFields {
  /**
   * `ReceiptGas` "MerchantName" field
   */
  merchantName?: fr.DocumentStringField;
  /**
   * `ReceiptGas` "MerchantPhoneNumber" field
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * `ReceiptGas` "MerchantAddress" field
   */
  merchantAddress?: fr.DocumentStringField;
  /**
   * `ReceiptGas` "Total" field
   */
  total?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "TransactionDate" field
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * `ReceiptGas` "TransactionTime" field
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * `ReceiptGas` "Subtotal" field
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "TotalTax" field
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "Tip" field
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptGasItemsElement>>;
}

/**
 * Describes the fields of `ReceiptGasItemsElement`.
 */
export interface ReceiptGasItemsElement {
  /**
   * `ReceiptGas` "TotalPrice" field
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `ReceiptGas` "Quantity" field
   */
  quantity?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "Price" field
   */
  price?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `ReceiptParkingFields`.
 */
export interface ReceiptParkingFields {
  /**
   * `ReceiptParking` "MerchantName" field
   */
  merchantName?: fr.DocumentStringField;
  /**
   * `ReceiptParking` "MerchantPhoneNumber" field
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * `ReceiptParking` "MerchantAddress" field
   */
  merchantAddress?: fr.DocumentStringField;
  /**
   * `ReceiptParking` "Total" field
   */
  total?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "TransactionDate" field
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * `ReceiptParking` "TransactionTime" field
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * `ReceiptParking` "Subtotal" field
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "TotalTax" field
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "Tip" field
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptParkingItemsElement>>;
}

/**
 * Describes the fields of `ReceiptParkingItemsElement`.
 */
export interface ReceiptParkingItemsElement {
  /**
   * `ReceiptParking` "TotalPrice" field
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `ReceiptParking` "Quantity" field
   */
  quantity?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "Price" field
   */
  price?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `ReceiptHotelFields`.
 */
export interface ReceiptHotelFields {
  /**
   * `ReceiptHotel` "MerchantName" field
   */
  merchantName?: fr.DocumentStringField;
  /**
   * `ReceiptHotel` "MerchantPhoneNumber" field
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * `ReceiptHotel` "MerchantAddress" field
   */
  merchantAddress?: fr.DocumentStringField;
  /**
   * `ReceiptHotel` "Total" field
   */
  total?: fr.DocumentNumberField;
  /**
   * `ReceiptHotel` "ArrivalDate" field
   */
  arrivalDate?: fr.DocumentDateField;
  /**
   * `ReceiptHotel` "DepartureDate" field
   */
  departureDate?: fr.DocumentDateField;
  /**
   * `ReceiptHotel` "Currency" field
   */
  currency?: fr.DocumentStringField;
  /**
   * `ReceiptHotel` "MerchantAliases" field
   */
  merchantAliases?: fr.DocumentArrayField<fr.DocumentStringField>;
  /**
   * `ReceiptHotel` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptHotelItemsElement>>;
}

/**
 * Describes the fields of `ReceiptHotelItemsElement`.
 */
export interface ReceiptHotelItemsElement {
  /**
   * `ReceiptHotel` "TotalPrice" field
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * `ReceiptHotel` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `ReceiptHotel` "Date" field
   */
  date?: fr.DocumentDateField;
  /**
   * `ReceiptHotel` "Category" field
   */
  category?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-receipt",
    description: "Extract key information from receipts.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
    docTypes: {
      receipt: {
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
}
