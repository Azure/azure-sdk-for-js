// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { credentialLogger } from "./logging.js";

const logger = credentialLogger("VisualStudioCodeHelpers");

/**
 * Load the broker plugin from \@azure/identity-broker package.
 * @returns The native broker plugin if available, undefined otherwise.
 */
export function loadBrokerPlugin(): ReturnType<typeof require> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const brokerModule = require("@azure/identity-broker");
    return brokerModule.nativeBrokerPlugin;
  } catch (error: any) {
    logger.info("The @azure/identity-broker package is not installed.");
    return undefined;
  }
}
