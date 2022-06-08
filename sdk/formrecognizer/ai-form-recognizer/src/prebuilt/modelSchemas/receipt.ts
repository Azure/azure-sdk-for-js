// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as ReceiptSchema } from "./data/prebuilt-receipt.json";

/**
 * The type of a document extracted using the prebuilt receipt model (`PrebuiltModels.Receipt`).
 */
export type Receipt = ReifyPrebuiltSchema<typeof ReceiptSchema>;

export { ReceiptSchema };
