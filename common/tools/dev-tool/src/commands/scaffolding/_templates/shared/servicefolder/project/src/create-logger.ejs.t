---
to: <%= fullProjectPath %>/src/logger.ts
unless_exists: true
---
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientLogger } from "@azure/logger";

/**
 * The \@azure/logger configuration for this package.
 *
 * @internal
 */
export const logger = createClientLogger("<%= name%>");
