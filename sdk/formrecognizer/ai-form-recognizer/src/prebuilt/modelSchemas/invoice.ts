// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as InvoiceSchema } from "./data/prebuilt-invoice.json";

/**
 * The type of a document extracted using the prebuilt invoice model (`PrebuiltModels.Invoice`).
 */
export type Invoice = ReifyPrebuiltSchema<typeof InvoiceSchema>;

export { InvoiceSchema };
