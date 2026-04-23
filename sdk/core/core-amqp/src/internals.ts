// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SasTokenProvider } from "./auth/tokenProvider.js";
import { createSasTokenProvider } from "./auth/tokenProvider.js";
import { isSasTokenProvider } from "./util/typeGuards.js";

export { type SasTokenProvider, createSasTokenProvider, isSasTokenProvider };
