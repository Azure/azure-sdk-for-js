// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrebuiltBusinessCardModel } from "./schemas/prebuilt-businessCard.js";
import { PrebuiltDocumentModel } from "./schemas/prebuilt-document.js";
import { PrebuiltHealthInsuranceCardUsModel } from "./schemas/prebuilt-healthInsuranceCard.us.js";
import { PrebuiltIdDocumentModel } from "./schemas/prebuilt-idDocument.js";
import { PrebuiltInvoiceModel } from "./schemas/prebuilt-invoice.js";
import { PrebuiltLayoutModel } from "./schemas/prebuilt-layout.js";
import { PrebuiltReadModel } from "./schemas/prebuilt-read.js";
import { PrebuiltReceiptModel } from "./schemas/prebuilt-receipt.js";
import { PrebuiltTaxUsW2Model } from "./schemas/prebuilt-tax.us.w2.js";

/**
 * Prebuilt models used for testing.
 */
export const PrebuiltModels = {
  Receipt: PrebuiltReceiptModel,
  BusinessCard: PrebuiltBusinessCardModel,
  Invoice: PrebuiltInvoiceModel,
  IdentityDocument: PrebuiltIdDocumentModel,
  TaxUsW2: PrebuiltTaxUsW2Model,
  HealthInsuranceCardUs: PrebuiltHealthInsuranceCardUsModel,
  GeneralDocument: PrebuiltDocumentModel,
  Read: PrebuiltReadModel,
  Layout: PrebuiltLayoutModel,
};
