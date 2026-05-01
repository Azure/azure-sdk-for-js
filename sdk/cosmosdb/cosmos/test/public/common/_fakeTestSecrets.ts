// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";

// [SuppressMessage("Microsoft.Security", "CS002:SecretInNextLine")]
export const masterKey = inject("cosmosMasterKey");
export const userSasTokenKey = inject("cosmosUserSasTokenKey");
