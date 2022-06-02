// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as TaxUsW2Schema } from "./data/prebuilt-tax.us.w2.json";

/**
 * The type of a document extracted using the prebuilt United States W2 tax document model (`PrebuiltModels.TaxUsW2`).
 */
export type TaxUsW2 = ReifyPrebuiltSchema<typeof TaxUsW2Schema>;

export { TaxUsW2Schema };
