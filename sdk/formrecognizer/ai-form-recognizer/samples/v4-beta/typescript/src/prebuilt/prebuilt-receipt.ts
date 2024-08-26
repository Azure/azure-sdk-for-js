// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-receipt
// Description: Extract key information from receipts.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

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
   * Name of the merchant issuing the receipt
   */
  merchantName?: fr.DocumentStringField;
  /**
   * Listed phone number of merchant
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * Listed address of merchant
   */
  merchantAddress?: fr.DocumentAddressField;
  /**
   * Full transaction total of receipt
   */
  total?: fr.DocumentNumberField;
  /**
   * Date the receipt was issued
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * Time the receipt was issued
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * Subtotal of receipt, often before taxes are applied
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * Tax on receipt, often sales tax or equivalent
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * Tip included by buyer
   */
  tip?: fr.DocumentNumberField;
  /**
   * `Receipt` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptItemsElement>>;
  /**
   * `Receipt` "TaxDetails" field
   */
  taxDetails?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptTaxDetailsElement>>;
}

/**
 * Describes the fields of `ReceiptItemsElement`.
 */
export interface ReceiptItemsElement {
  /**
   * Total price of line item
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * Item description
   */
  description?: fr.DocumentStringField;
  /**
   * Quantity of each item
   */
  quantity?: fr.DocumentNumberField;
  /**
   * Individual price of each item unit
   */
  price?: fr.DocumentNumberField;
  /**
   * Product code, product number, or SKU associated with the specific line item
   */
  productCode?: fr.DocumentStringField;
  /**
   * Quantity unit of each item
   */
  quantityUnit?: fr.DocumentStringField;
}

/**
 * Describes the fields of `ReceiptTaxDetailsElement`.
 */
export interface ReceiptTaxDetailsElement {
  /**
   * The amount of the tax detail
   */
  amount?: fr.DocumentCurrencyField;
}

/**
 * Describes the fields of `ReceiptRetailMealFields`.
 */
export interface ReceiptRetailMealFields {
  /**
   * Name of the merchant issuing the receipt
   */
  merchantName?: fr.DocumentStringField;
  /**
   * Listed phone number of merchant
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * Listed address of merchant
   */
  merchantAddress?: fr.DocumentAddressField;
  /**
   * Full transaction total of receipt
   */
  total?: fr.DocumentNumberField;
  /**
   * Date the receipt was issued
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * Time the receipt was issued
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * Subtotal of receipt, often before taxes are applied
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * Tax on receipt, often sales tax or equivalent
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * Tip included by buyer
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptRetailMeal` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptRetailMealItemsElement>>;
  /**
   * `ReceiptRetailMeal` "TaxDetails" field
   */
  taxDetails?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptRetailMealTaxDetailsElement>>;
}

/**
 * Describes the fields of `ReceiptRetailMealItemsElement`.
 */
export interface ReceiptRetailMealItemsElement {
  /**
   * Total price of line item
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * Item description
   */
  description?: fr.DocumentStringField;
  /**
   * Quantity of each item
   */
  quantity?: fr.DocumentNumberField;
  /**
   * Individual price of each item unit
   */
  price?: fr.DocumentNumberField;
  /**
   * Product code, product number, or SKU associated with the specific line item
   */
  productCode?: fr.DocumentStringField;
  /**
   * Quantity unit of each item
   */
  quantityUnit?: fr.DocumentStringField;
}

/**
 * Describes the fields of `ReceiptRetailMealTaxDetailsElement`.
 */
export interface ReceiptRetailMealTaxDetailsElement {
  /**
   * The amount of the tax detail
   */
  amount?: fr.DocumentCurrencyField;
}

/**
 * Describes the fields of `ReceiptCreditCardFields`.
 */
export interface ReceiptCreditCardFields {
  /**
   * Name of the merchant issuing the receipt
   */
  merchantName?: fr.DocumentStringField;
  /**
   * Listed phone number of merchant
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * Listed address of merchant
   */
  merchantAddress?: fr.DocumentAddressField;
  /**
   * Full transaction total of receipt
   */
  total?: fr.DocumentNumberField;
  /**
   * Date the receipt was issued
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * Time the receipt was issued
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * Subtotal of receipt, often before taxes are applied
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * Tax on receipt, often sales tax or equivalent
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * Tip included by buyer
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptCreditCard` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptCreditCardItemsElement>>;
  /**
   * `ReceiptCreditCard` "TaxDetails" field
   */
  taxDetails?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptCreditCardTaxDetailsElement>>;
}

/**
 * Describes the fields of `ReceiptCreditCardItemsElement`.
 */
export interface ReceiptCreditCardItemsElement {
  /**
   * Total price of line item
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * Item description
   */
  description?: fr.DocumentStringField;
  /**
   * Quantity of each item
   */
  quantity?: fr.DocumentNumberField;
  /**
   * Individual price of each item unit
   */
  price?: fr.DocumentNumberField;
  /**
   * Product code, product number, or SKU associated with the specific line item
   */
  productCode?: fr.DocumentStringField;
  /**
   * Quantity unit of each item
   */
  quantityUnit?: fr.DocumentStringField;
}

/**
 * Describes the fields of `ReceiptCreditCardTaxDetailsElement`.
 */
export interface ReceiptCreditCardTaxDetailsElement {
  /**
   * The amount of the tax detail
   */
  amount?: fr.DocumentCurrencyField;
}

/**
 * Describes the fields of `ReceiptGasFields`.
 */
export interface ReceiptGasFields {
  /**
   * Name of the merchant issuing the receipt
   */
  merchantName?: fr.DocumentStringField;
  /**
   * Listed phone number of merchant
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * Listed address of merchant
   */
  merchantAddress?: fr.DocumentAddressField;
  /**
   * Full transaction total of receipt
   */
  total?: fr.DocumentNumberField;
  /**
   * Date the receipt was issued
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * Time the receipt was issued
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * Subtotal of receipt, often before taxes are applied
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * Tax on receipt, often sales tax or equivalent
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * Tip included by buyer
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptGas` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptGasItemsElement>>;
  /**
   * `ReceiptGas` "TaxDetails" field
   */
  taxDetails?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptGasTaxDetailsElement>>;
}

/**
 * Describes the fields of `ReceiptGasItemsElement`.
 */
export interface ReceiptGasItemsElement {
  /**
   * Total price of line item
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * Item description
   */
  description?: fr.DocumentStringField;
  /**
   * Quantity of each item
   */
  quantity?: fr.DocumentNumberField;
  /**
   * Individual price of each item unit
   */
  price?: fr.DocumentNumberField;
  /**
   * Product code, product number, or SKU associated with the specific line item
   */
  productCode?: fr.DocumentStringField;
  /**
   * Quantity unit of each item
   */
  quantityUnit?: fr.DocumentStringField;
}

/**
 * Describes the fields of `ReceiptGasTaxDetailsElement`.
 */
export interface ReceiptGasTaxDetailsElement {
  /**
   * The amount of the tax detail
   */
  amount?: fr.DocumentCurrencyField;
}

/**
 * Describes the fields of `ReceiptParkingFields`.
 */
export interface ReceiptParkingFields {
  /**
   * Name of the merchant issuing the receipt
   */
  merchantName?: fr.DocumentStringField;
  /**
   * Listed phone number of merchant
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * Listed address of merchant
   */
  merchantAddress?: fr.DocumentAddressField;
  /**
   * Full transaction total of receipt
   */
  total?: fr.DocumentNumberField;
  /**
   * Date the receipt was issued
   */
  transactionDate?: fr.DocumentDateField;
  /**
   * Time the receipt was issued
   */
  transactionTime?: fr.DocumentTimeField;
  /**
   * Subtotal of receipt, often before taxes are applied
   */
  subtotal?: fr.DocumentNumberField;
  /**
   * Tax on receipt, often sales tax or equivalent
   */
  totalTax?: fr.DocumentNumberField;
  /**
   * Tip included by buyer
   */
  tip?: fr.DocumentNumberField;
  /**
   * `ReceiptParking` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptParkingItemsElement>>;
  /**
   * `ReceiptParking` "TaxDetails" field
   */
  taxDetails?: fr.DocumentArrayField<fr.DocumentObjectField<ReceiptParkingTaxDetailsElement>>;
}

/**
 * Describes the fields of `ReceiptParkingItemsElement`.
 */
export interface ReceiptParkingItemsElement {
  /**
   * Total price of line item
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * Item description
   */
  description?: fr.DocumentStringField;
  /**
   * Quantity of each item
   */
  quantity?: fr.DocumentNumberField;
  /**
   * Individual price of each item unit
   */
  price?: fr.DocumentNumberField;
  /**
   * Product code, product number, or SKU associated with the specific line item
   */
  productCode?: fr.DocumentStringField;
  /**
   * Quantity unit of each item
   */
  quantityUnit?: fr.DocumentStringField;
}

/**
 * Describes the fields of `ReceiptParkingTaxDetailsElement`.
 */
export interface ReceiptParkingTaxDetailsElement {
  /**
   * The amount of the tax detail
   */
  amount?: fr.DocumentCurrencyField;
}

/**
 * Describes the fields of `ReceiptHotelFields`.
 */
export interface ReceiptHotelFields {
  /**
   * Name of the merchant issuing the receipt
   */
  merchantName?: fr.DocumentStringField;
  /**
   * Listed phone number of merchant
   */
  merchantPhoneNumber?: fr.DocumentPhoneNumberField;
  /**
   * Listed address of merchant
   */
  merchantAddress?: fr.DocumentAddressField;
  /**
   * Full transaction total of receipt
   */
  total?: fr.DocumentNumberField;
  /**
   * Date of arrival
   */
  arrivalDate?: fr.DocumentDateField;
  /**
   * Date of departure
   */
  departureDate?: fr.DocumentDateField;
  /**
   * Currency unit of receipt amounts (ISO 4217), or 'MIXED' if multiple values are found
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
   * Total price of line item
   */
  totalPrice?: fr.DocumentNumberField;
  /**
   * Item description
   */
  description?: fr.DocumentStringField;
  /**
   * Item date
   */
  date?: fr.DocumentDateField;
  /**
   * Item category
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
  } as const;
}
