// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";

/**
 * The type of a document extracted using the prebuilt invoice model (`PrebuiltModels.Invoice`).
 */
export type Invoice = ReifyPrebuiltSchema<typeof InvoiceSchema>;

/**
 * The schema of the prebuilt invoice model.
 * @hidden
 */
export const InvoiceSchema = {
  modelId: "prebuilt-invoice",
  description:
    "Prebuilt model to extract key information from English invoices, including customer, vendor, invoice ID, due date, total, and more.",
  createdDateTime: "2021-07-30T00:00:00Z",
  docTypes: {
    invoice: {
      description: "Invoice",
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
          type: "string",
          description: "Mailing address for the Vendor",
          example: "123 456th St New York, NY, 10001",
        },
        VendorAddressRecipient: {
          type: "string",
          description: "Name associated with the VendorAddress",
          example: "Contoso Headquarters",
        },
        CustomerAddress: {
          type: "string",
          description: "Mailing address for the Customer",
          example: "123 Other St, Redmond WA, 98052",
        },
        CustomerAddressRecipient: {
          type: "string",
          description: "Name associated with the CustomerAddress",
          example: "Microsoft Corp",
        },
        BillingAddress: {
          type: "string",
          description: "Explicit billing address for the customer",
          example: "123 Bill St, Redmond WA, 98052",
        },
        BillingAddressRecipient: {
          type: "string",
          description: "Name associated with the BillingAddress",
          example: "Microsoft Services",
        },
        ShippingAddress: {
          type: "string",
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
          type: "string",
          description: "Explicit remittance or payment address for the customer",
          example: "123 Remit St New York, NY, 10001",
        },
        RemittanceAddressRecipient: {
          type: "string",
          description: "Name associated with the RemittanceAddress",
          example: "Contoso Billing",
        },
        ServiceAddress: {
          type: "string",
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
        TotalVAT: {
          type: "currency",
          description: "Total VAT tax amount in document",
          example: "€10.00",
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
        Items: {
          type: "array",
          description: "List of line items",
          items: {
            type: "object",
            description: "A single line item",
            example: "3/4/2021\nA123\nConsulting Services\b2 hours\n$30.00\n10%\n$60.00",
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
              VAT: {
                type: "currency",
                description: "Value added tax: this is the flat tax levied on an item",
                example: "€10.00",
              },
            },
          },
        },
      },
    },
  },
} as const;
