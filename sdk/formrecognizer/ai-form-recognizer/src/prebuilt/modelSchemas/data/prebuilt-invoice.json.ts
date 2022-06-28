// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * The schema of the prebuilt-invoice model.
 */
export const modelInfo = {
  modelId: "prebuilt-invoice",
  description:
    "Prebuilt model to extract key information from English invoices, including customer, vendor, invoice ID, due date, total, and more.",
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
