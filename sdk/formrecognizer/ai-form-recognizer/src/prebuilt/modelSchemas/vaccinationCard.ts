// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as VaccinationCardSchema } from "./data/prebuilt-vaccinationCard.json";

/**
 * The type of a document extracted using the prebuilt Vaccination Card document model (`PrebuiltModels.VaccinationCard`).
 */
export type VaccinationCard = ReifyPrebuiltSchema<typeof VaccinationCardSchema>;

export { VaccinationCardSchema };
