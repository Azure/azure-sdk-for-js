// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-invoice
// Description: Extract key information from invoices.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from invoices.
 */
const PrebuiltInvoiceModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-invoice",
    description: "Extract key information from invoices.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
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
  };
}

module.exports = {
  PrebuiltInvoiceModel,
  PrebuiltInvoiceResult,
  PrebuiltInvoiceDocument,
  Invoice,
  InvoiceFields,
  InvoicePaymentDetailsElement,
  InvoiceTaxDetailsElement,
  InvoiceItemsElement,
};
