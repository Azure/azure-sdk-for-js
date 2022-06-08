// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as HealthInsuranceCardUsSchema } from "./data/prebuilt-healthInsuranceCard.us.json";

/**
 * The type of a document extracted using the prebuilt United States health insurance card document model (`PrebuiltModels.HealthInsuranceCardUs`).
 */
export type HealthInsuranceCardUs = ReifyPrebuiltSchema<typeof HealthInsuranceCardUsSchema>;

export { HealthInsuranceCardUsSchema };
