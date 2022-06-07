// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReifyPrebuiltSchema } from "../schema";
import { modelInfo as IdentityDocumentSchema } from "./data/prebuilt-idDocument.json";

/**
 * The type of a document extracted using the prebuilt identity document model (`PrebuiltModels.IdentityDocument`).
 */
export type IdentityDocument = ReifyPrebuiltSchema<typeof IdentityDocumentSchema>;

export { IdentityDocumentSchema };
