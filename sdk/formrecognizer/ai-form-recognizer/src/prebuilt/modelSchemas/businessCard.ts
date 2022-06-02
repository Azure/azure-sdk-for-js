// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as BusinessCardSchema } from "./data/prebuilt-businessCard.json";

/**
 * The type of a document extracted using the prebuilt business card model (`PrebuiltModels.BusinessCard`).
 */
export type BusinessCard = ReifyPrebuiltSchema<typeof BusinessCardSchema>;

export { BusinessCardSchema };
