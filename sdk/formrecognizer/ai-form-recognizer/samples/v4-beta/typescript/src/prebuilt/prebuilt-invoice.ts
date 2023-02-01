// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-invoice
// Description: Extract key information from invoices.
// API Version: 2022-06-30-preview
// Created:     Thu Jul 14 2022

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from invoices.
 */
export const PrebuiltInvoiceModel = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltInvoiceResult>;

export interface PrebuiltInvoiceResult extends fr.AnalyzeResultCommon {
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
   * Extracted tables.
   */
  tables?: fr.DocumentTable[];
  /**
   * Extracted key-value pairs.
   */
  keyValuePairs?: fr.DocumentKeyValuePair[];
  /**
   * Extracted documents.
   */
  documents: PrebuiltInvoiceDocument[];
}

export type PrebuiltInvoiceDocument = Invoice;

export interface Invoice {
  /**
   * Document type: "invoice".
   */
  docType: "invoice";
  /**
   * Document fields.
   */
  fields: InvoiceFields;
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
 * Describes the fields of `InvoiceFields`.
 */
export interface InvoiceFields {
  /**
   * `Invoice` "CustomerName" field
   */
  customerName?: fr.DocumentStringField;
  /**
   * `Invoice` "CustomerId" field
   */
  customerId?: fr.DocumentStringField;
  /**
   * `Invoice` "PurchaseOrder" field
   */
  purchaseOrder?: fr.DocumentStringField;
  /**
   * `Invoice` "InvoiceId" field
   */
  invoiceId?: fr.DocumentStringField;
  /**
   * `Invoice` "InvoiceDate" field
   */
  invoiceDate?: fr.DocumentDateField;
  /**
   * `Invoice` "DueDate" field
   */
  dueDate?: fr.DocumentDateField;
  /**
   * `Invoice` "VendorName" field
   */
  vendorName?: fr.DocumentStringField;
  /**
   * `Invoice` "VendorAddress" field
   */
  vendorAddress?: fr.DocumentStringField;
  /**
   * `Invoice` "VendorAddressRecipient" field
   */
  vendorAddressRecipient?: fr.DocumentStringField;
  /**
   * `Invoice` "CustomerAddress" field
   */
  customerAddress?: fr.DocumentStringField;
  /**
   * `Invoice` "CustomerAddressRecipient" field
   */
  customerAddressRecipient?: fr.DocumentStringField;
  /**
   * `Invoice` "BillingAddress" field
   */
  billingAddress?: fr.DocumentStringField;
  /**
   * `Invoice` "BillingAddressRecipient" field
   */
  billingAddressRecipient?: fr.DocumentStringField;
  /**
   * `Invoice` "ShippingAddress" field
   */
  shippingAddress?: fr.DocumentStringField;
  /**
   * `Invoice` "ShippingAddressRecipient" field
   */
  shippingAddressRecipient?: fr.DocumentStringField;
  /**
   * `Invoice` "SubTotal" field
   */
  subTotal?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "TotalTax" field
   */
  totalTax?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "InvoiceTotal" field
   */
  invoiceTotal?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "AmountDue" field
   */
  amountDue?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "PreviousUnpaidBalance" field
   */
  previousUnpaidBalance?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "RemittanceAddress" field
   */
  remittanceAddress?: fr.DocumentStringField;
  /**
   * `Invoice` "RemittanceAddressRecipient" field
   */
  remittanceAddressRecipient?: fr.DocumentStringField;
  /**
   * `Invoice` "ServiceAddress" field
   */
  serviceAddress?: fr.DocumentStringField;
  /**
   * `Invoice` "ServiceAddressRecipient" field
   */
  serviceAddressRecipient?: fr.DocumentStringField;
  /**
   * `Invoice` "ServiceStartDate" field
   */
  serviceStartDate?: fr.DocumentDateField;
  /**
   * `Invoice` "ServiceEndDate" field
   */
  serviceEndDate?: fr.DocumentDateField;
  /**
   * `Invoice` "TotalVAT" field
   */
  totalVAT?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "VendorTaxId" field
   */
  vendorTaxId?: fr.DocumentStringField;
  /**
   * `Invoice` "CustomerTaxId" field
   */
  customerTaxId?: fr.DocumentStringField;
  /**
   * `Invoice` "PaymentTerm" field
   */
  paymentTerm?: fr.DocumentStringField;
  /**
   * `Invoice` "Items" field
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<InvoiceItemsElement>>;
}

/**
 * Describes the fields of `InvoiceItemsElement`.
 */
export interface InvoiceItemsElement {
  /**
   * `Invoice` "Amount" field
   */
  amount?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "Date" field
   */
  date?: fr.DocumentDateField;
  /**
   * `Invoice` "Description" field
   */
  description?: fr.DocumentStringField;
  /**
   * `Invoice` "Quantity" field
   */
  quantity?: fr.DocumentNumberField;
  /**
   * `Invoice` "ProductCode" field
   */
  productCode?: fr.DocumentStringField;
  /**
   * `Invoice` "Tax" field
   */
  tax?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "Unit" field
   */
  unit?: fr.DocumentStringField;
  /**
   * `Invoice` "UnitPrice" field
   */
  unitPrice?: fr.DocumentCurrencyField;
  /**
   * `Invoice` "VAT" field
   */
  vAT?: fr.DocumentCurrencyField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-invoice",
    description: "Extract key information from invoices.",
    createdDateTime: "2022-06-30T00:00:00.000Z",
    apiVersion: "2022-06-30-preview",
    docTypes: {
      invoice: {
        buildMode: "template",
        fieldSchema: {
          CustomerName: {
            type: "string",
          },
          CustomerId: {
            type: "string",
          },
          PurchaseOrder: {
            type: "string",
          },
          InvoiceId: {
            type: "string",
          },
          InvoiceDate: {
            type: "date",
          },
          DueDate: {
            type: "date",
          },
          VendorName: {
            type: "string",
          },
          VendorAddress: {
            type: "string",
          },
          VendorAddressRecipient: {
            type: "string",
          },
          CustomerAddress: {
            type: "string",
          },
          CustomerAddressRecipient: {
            type: "string",
          },
          BillingAddress: {
            type: "string",
          },
          BillingAddressRecipient: {
            type: "string",
          },
          ShippingAddress: {
            type: "string",
          },
          ShippingAddressRecipient: {
            type: "string",
          },
          SubTotal: {
            type: "currency",
          },
          TotalTax: {
            type: "currency",
          },
          InvoiceTotal: {
            type: "currency",
          },
          AmountDue: {
            type: "currency",
          },
          PreviousUnpaidBalance: {
            type: "currency",
          },
          RemittanceAddress: {
            type: "string",
          },
          RemittanceAddressRecipient: {
            type: "string",
          },
          ServiceAddress: {
            type: "string",
          },
          ServiceAddressRecipient: {
            type: "string",
          },
          ServiceStartDate: {
            type: "date",
          },
          ServiceEndDate: {
            type: "date",
          },
          TotalVAT: {
            type: "currency",
          },
          VendorTaxId: {
            type: "string",
          },
          CustomerTaxId: {
            type: "string",
          },
          PaymentTerm: {
            type: "string",
          },
          Items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Amount: {
                  type: "currency",
                },
                Date: {
                  type: "date",
                },
                Description: {
                  type: "string",
                },
                Quantity: {
                  type: "number",
                },
                ProductCode: {
                  type: "string",
                },
                Tax: {
                  type: "currency",
                },
                Unit: {
                  type: "string",
                },
                UnitPrice: {
                  type: "currency",
                },
                VAT: {
                  type: "currency",
                },
              },
            },
          },
        },
      },
    },
  } as const;
}
