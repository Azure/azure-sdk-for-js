// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getBaseTransactionHeaders } from "./baseTransactionHeaders.js";

/**
 * @internal
 * Builds an object with the required headers for a Transaction request. For the Browser
 */
export const getTransactionHeaders = getBaseTransactionHeaders;
