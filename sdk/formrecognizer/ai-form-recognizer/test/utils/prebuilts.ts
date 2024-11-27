// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrebuiltBusinessCardModel } from "./schemas/prebuilt-businessCard";
import { PrebuiltDocumentModel } from "./schemas/prebuilt-document";
import { PrebuiltHealthInsuranceCardUsModel } from "./schemas/prebuilt-healthInsuranceCard.us";
import { PrebuiltIdDocumentModel } from "./schemas/prebuilt-idDocument";
import { PrebuiltInvoiceModel } from "./schemas/prebuilt-invoice";
import { PrebuiltLayoutModel } from "./schemas/prebuilt-layout";
import { PrebuiltReadModel } from "./schemas/prebuilt-read";
import { PrebuiltReceiptModel } from "./schemas/prebuilt-receipt";
import { PrebuiltTaxUsW2Model } from "./schemas/prebuilt-tax.us.w2";

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
