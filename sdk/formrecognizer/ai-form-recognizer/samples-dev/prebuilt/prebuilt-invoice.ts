// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @azsdk-util
 * @azsdk-skip-javascript
 */

// Model:       prebuilt-invoice
// Description: Extract key information from invoices.
// API Version: 2023-07-31
// Created:     Wed Aug 02 2023

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from invoices.
 */
export const PrebuiltInvoiceModel = fr.createModelFromSchema(
  modelInfo(),
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
   * Customer being invoiced
   */
  customerName?: fr.DocumentStringField;
  /**
   * Reference ID for the customer
   */
  customerId?: fr.DocumentStringField;
  /**
   * A purchase order reference number
   */
  purchaseOrder?: fr.DocumentStringField;
  /**
   * ID for this specific invoice (often 'Invoice Number')
   */
  invoiceId?: fr.DocumentStringField;
  /**
   * Date the invoice was issued
   */
  invoiceDate?: fr.DocumentDateField;
  /**
   * Date payment for this invoice is due
   */
  dueDate?: fr.DocumentDateField;
  /**
   * Vendor who has created this invoice
   */
  vendorName?: fr.DocumentStringField;
  /**
   * Mailing address for the Vendor
   */
  vendorAddress?: fr.DocumentAddressField;
  /**
   * Name associated with the VendorAddress
   */
  vendorAddressRecipient?: fr.DocumentStringField;
  /**
   * Mailing address for the Customer
   */
  customerAddress?: fr.DocumentAddressField;
  /**
   * Name associated with the CustomerAddress
   */
  customerAddressRecipient?: fr.DocumentStringField;
  /**
   * Explicit billing address for the customer
   */
  billingAddress?: fr.DocumentAddressField;
  /**
   * Name associated with the BillingAddress
   */
  billingAddressRecipient?: fr.DocumentStringField;
  /**
   * Explicit shipping address for the customer
   */
  shippingAddress?: fr.DocumentAddressField;
  /**
   * Name associated with the ShippingAddress
   */
  shippingAddressRecipient?: fr.DocumentStringField;
  /**
   * Subtotal field identified on this invoice
   */
  subTotal?: fr.DocumentCurrencyField;
  /**
   * Total discount field identified on this invoice
   */
  totalDiscount?: fr.DocumentCurrencyField;
  /**
   * Total tax field identified on this invoice
   */
  totalTax?: fr.DocumentCurrencyField;
  /**
   * Total new charges associated with this invoice
   */
  invoiceTotal?: fr.DocumentCurrencyField;
  /**
   * Total Amount Due to the vendor
   */
  amountDue?: fr.DocumentCurrencyField;
  /**
   * Explicit previously unpaid balance
   */
  previousUnpaidBalance?: fr.DocumentCurrencyField;
  /**
   * Explicit remittance or payment address for the customer
   */
  remittanceAddress?: fr.DocumentAddressField;
  /**
   * Name associated with the RemittanceAddress
   */
  remittanceAddressRecipient?: fr.DocumentStringField;
  /**
   * Explicit service address or property address for the customer
   */
  serviceAddress?: fr.DocumentAddressField;
  /**
   * Name associated with the ServiceAddress
   */
  serviceAddressRecipient?: fr.DocumentStringField;
  /**
   * First date for the service period (for example, a utility bill service period)
   */
  serviceStartDate?: fr.DocumentDateField;
  /**
   * End date for the service period (for example, a utility bill service period)
   */
  serviceEndDate?: fr.DocumentDateField;
  /**
   * The government ID number associated with the vendor
   */
  vendorTaxId?: fr.DocumentStringField;
  /**
   * The government ID number associated with the customer
   */
  customerTaxId?: fr.DocumentStringField;
  /**
   * The terms under which the payment is meant to be paid
   */
  paymentTerm?: fr.DocumentStringField;
  /**
   * List of payment details
   */
  paymentDetails?: fr.DocumentArrayField<fr.DocumentObjectField<InvoicePaymentDetailsElement>>;
  /**
   * List of tax details
   */
  taxDetails?: fr.DocumentArrayField<fr.DocumentObjectField<InvoiceTaxDetailsElement>>;
  /**
   * List of line items
   */
  items?: fr.DocumentArrayField<fr.DocumentObjectField<InvoiceItemsElement>>;
}

/**
 * Describes the fields of `InvoicePaymentDetailsElement`.
 *
 * List of payment details
 */
export interface InvoicePaymentDetailsElement {
  /**
   * International bank account number
   */
  iBAN?: fr.DocumentStringField;
  /**
   * ISO9362, an international standard for Business Identifier Codes (BIC)
   */
  sWIFT?: fr.DocumentStringField;
}

/**
 * Describes the fields of `InvoiceTaxDetailsElement`.
 *
 * List of tax details
 */
export interface InvoiceTaxDetailsElement {
  /**
   * The amount of the tax detail
   */
  amount?: fr.DocumentCurrencyField;
  /**
   * The rate of the tax detail
   */
  rate?: fr.DocumentStringField;
}

/**
 * Describes the fields of `InvoiceItemsElement`.
 *
 * List of line items
 */
export interface InvoiceItemsElement {
  /**
   * The amount of the line item
   */
  amount?: fr.DocumentCurrencyField;
  /**
   * Date corresponding to each line item. Often it is a date the line item was shipped
   */
  date?: fr.DocumentDateField;
  /**
   * The text description for the invoice line item
   */
  description?: fr.DocumentStringField;
  /**
   * The quantity for this invoice line item
   */
  quantity?: fr.DocumentNumberField;
  /**
   * Product code, product number, or SKU associated with the specific line item
   */
  productCode?: fr.DocumentStringField;
  /**
   * Tax associated with each line item. Possible values include tax amount, tax %, and tax Y/N
   */
  tax?: fr.DocumentCurrencyField;
  /**
   * Tax rate associated with each line item
   */
  taxRate?: fr.DocumentStringField;
  /**
   * The unit of the line item, e.g, kg, lb etc.
   */
  unit?: fr.DocumentStringField;
  /**
   * The net or gross price (depending on the gross invoice setting of the invoice) of one unit of this item
   */
  unitPrice?: fr.DocumentCurrencyField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-invoice",
    description: "Extract key information from invoices.",
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      invoice: {
        buildMode: "template",
        fieldSchema: {
          CustomerName: {
            type: "string",
            description: "Customer being invoiced",
            example: "Microsoft Corp",
          },
          CustomerId: {
            type: "string",
            description: "Reference ID for the customer",
            example: "CID-12345",
          },
          PurchaseOrder: {
            type: "string",
            description: "A purchase order reference number",
            example: "PO-3333",
          },
          InvoiceId: {
            type: "string",
            description: "ID for this specific invoice (often 'Invoice Number')",
            example: "INV-100",
          },
          InvoiceDate: {
            type: "date",
            description: "Date the invoice was issued",
            example: "11/15/2019",
          },
          DueDate: {
            type: "date",
            description: "Date payment for this invoice is due",
            example: "12/15/2019",
          },
          VendorName: {
            type: "string",
            description: "Vendor who has created this invoice",
            example: "CONTOSO LTD.",
          },
          VendorAddress: {
            type: "address",
            description: "Mailing address for the Vendor",
            example: "123 456th St New York, NY, 10001",
          },
          VendorAddressRecipient: {
            type: "string",
            description: "Name associated with the VendorAddress",
            example: "Contoso Headquarters",
          },
          CustomerAddress: {
            type: "address",
            description: "Mailing address for the Customer",
            example: "123 Other St, Redmond WA, 98052",
          },
          CustomerAddressRecipient: {
            type: "string",
            description: "Name associated with the CustomerAddress",
            example: "Microsoft Corp",
          },
          BillingAddress: {
            type: "address",
            description: "Explicit billing address for the customer",
            example: "123 Bill St, Redmond WA, 98052",
          },
          BillingAddressRecipient: {
            type: "string",
            description: "Name associated with the BillingAddress",
            example: "Microsoft Services",
          },
          ShippingAddress: {
            type: "address",
            description: "Explicit shipping address for the customer",
            example: "123 Ship St, Redmond WA, 98052",
          },
          ShippingAddressRecipient: {
            type: "string",
            description: "Name associated with the ShippingAddress",
            example: "Microsoft Delivery",
          },
          SubTotal: {
            type: "currency",
            description: "Subtotal field identified on this invoice",
            example: "$100.00",
          },
          TotalDiscount: {
            type: "currency",
            description: "Total discount field identified on this invoice",
            example: "$5.00",
          },
          TotalTax: {
            type: "currency",
            description: "Total tax field identified on this invoice",
            example: "$10.00",
          },
          InvoiceTotal: {
            type: "currency",
            description: "Total new charges associated with this invoice",
            example: "$110.00",
          },
          AmountDue: {
            type: "currency",
            description: "Total Amount Due to the vendor",
            example: "$610.00",
          },
          PreviousUnpaidBalance: {
            type: "currency",
            description: "Explicit previously unpaid balance",
            example: "$500.00",
          },
          RemittanceAddress: {
            type: "address",
            description: "Explicit remittance or payment address for the customer",
            example: "123 Remit St New York, NY, 10001",
          },
          RemittanceAddressRecipient: {
            type: "string",
            description: "Name associated with the RemittanceAddress",
            example: "Contoso Billing",
          },
          ServiceAddress: {
            type: "address",
            description: "Explicit service address or property address for the customer",
            example: "123 Service St, Redmond WA, 98052",
          },
          ServiceAddressRecipient: {
            type: "string",
            description: "Name associated with the ServiceAddress",
            example: "Microsoft Services",
          },
          ServiceStartDate: {
            type: "date",
            description:
              "First date for the service period (for example, a utility bill service period)",
            example: "10/14/2019",
          },
          ServiceEndDate: {
            type: "date",
            description:
              "End date for the service period (for example, a utility bill service period)",
            example: "11/14/2019",
          },
          VendorTaxId: {
            type: "string",
            description: "The government ID number associated with the vendor",
            example: "123456-7",
          },
          CustomerTaxId: {
            type: "string",
            description: "The government ID number associated with the customer",
            example: "765432-1",
          },
          PaymentTerm: {
            type: "string",
            description: "The terms under which the payment is meant to be paid",
            example: "Net90",
          },
          PaymentDetails: {
            type: "array",
            description: "List of payment details",
            items: {
              type: "object",
              description: "A single payment detail",
              properties: {
                IBAN: {
                  type: "string",
                  description: "International bank account number",
                  example: "DE 94 700 700 100 029 49 00 00",
                },
                SWIFT: {
                  type: "string",
                  description:
                    "ISO9362, an international standard for Business Identifier Codes (BIC)",
                  example: "DEUTDEMMXXX",
                },
              },
            },
          },
          TaxDetails: {
            type: "array",
            description: "List of tax details",
            items: {
              type: "object",
              description: "A single tax detail",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the tax detail",
                  example: "29,520.00",
                },
                Rate: {
                  type: "string",
                  description: "The rate of the tax detail",
                  example: "18 %",
                },
              },
            },
          },
          Items: {
            type: "array",
            description: "List of line items",
            items: {
              type: "object",
              description: "A single line item",
              example: "3/4/2021\nA123\nConsulting Services\n2 hours\n$30.00\n10%\n$60.00",
              properties: {
                Amount: {
                  type: "currency",
                  description: "The amount of the line item",
                  example: "$60.00",
                },
                Date: {
                  type: "date",
                  description:
                    "Date corresponding to each line item. Often it is a date the line item was shipped",
                  example: "3/4/2021",
                },
                Description: {
                  type: "string",
                  description: "The text description for the invoice line item",
                  example: "Consulting service",
                },
                Quantity: {
                  type: "number",
                  description: "The quantity for this invoice line item",
                  example: "2",
                },
                ProductCode: {
                  type: "string",
                  description:
                    "Product code, product number, or SKU associated with the specific line item",
                  example: "A123",
                },
                Tax: {
                  type: "currency",
                  description:
                    "Tax associated with each line item. Possible values include tax amount, tax %, and tax Y/N",
                  example: "$6.00",
                },
                TaxRate: {
                  type: "string",
                  description: "Tax rate associated with each line item",
                  example: "18 %",
                },
                Unit: {
                  type: "string",
                  description: "The unit of the line item, e.g, kg, lb etc.",
                  example: "hours",
                },
                UnitPrice: {
                  type: "currency",
                  description:
                    "The net or gross price (depending on the gross invoice setting of the invoice) of one unit of this item",
                  example: "$30.00",
                },
              },
            },
          },
        },
      },
    },
  } as const;
}
