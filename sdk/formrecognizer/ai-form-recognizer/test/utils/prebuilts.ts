// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PrebuiltBusinessCardModel } from "../../samples-dev/prebuilt/prebuilt-businessCard";
import { PrebuiltDocumentModel } from "../../samples-dev/prebuilt/prebuilt-document";
import { PrebuiltHealthInsuranceCardUsModel } from "../../samples-dev/prebuilt/prebuilt-healthInsuranceCard.us";
import { PrebuiltIdDocumentModel } from "../../samples-dev/prebuilt/prebuilt-idDocument";
import { PrebuiltInvoiceModel } from "../../samples-dev/prebuilt/prebuilt-invoice";
import { PrebuiltLayoutModel } from "../../samples-dev/prebuilt/prebuilt-layout";
import { PrebuiltReadModel } from "../../samples-dev/prebuilt/prebuilt-read";
import { PrebuiltReceiptModel } from "../../samples-dev/prebuilt/prebuilt-receipt";
import { PrebuiltTaxUsW2Model } from "../../samples-dev/prebuilt/prebuilt-tax.us.w2";
import { PrebuiltVaccinationCardModel } from "../../samples-dev/prebuilt/prebuilt-vaccinationCard";

/**
 * Prebuilt models used for testing.
 */
export const PrebuiltModels = {
  Receipt: PrebuiltReceiptModel,
  BusinessCard: PrebuiltBusinessCardModel,
  VaccinationCard: PrebuiltVaccinationCardModel,
  Invoice: PrebuiltInvoiceModel,
  IdentityDocument: PrebuiltIdDocumentModel,
  TaxUsW2: PrebuiltTaxUsW2Model,
  HealthInsuranceCardUs: PrebuiltHealthInsuranceCardUsModel,
  GeneralDocument: PrebuiltDocumentModel,
  Read: PrebuiltReadModel,
  Layout: PrebuiltLayoutModel,
};
