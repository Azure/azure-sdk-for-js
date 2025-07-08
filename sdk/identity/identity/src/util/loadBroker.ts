// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { credentialLogger } from "./logging.js";

const logger = credentialLogger("VisualStudioCodeHelpers");

/**
 * Load the broker plugin from \@azure/identity-broker package.
 * @returns The native broker plugin if available, undefined otherwise.
 */
export function loadBrokerPlugin(): ReturnType<typeof require> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ESM only output
    const brokerModule = createRequire(import.meta.url)("@azure/identity-broker");
    return brokerModule.nativeBrokerPlugin;
  } catch (error: any) {
    logger.info("The @azure/identity-broker package is not installed.");
    return undefined;
  }
}
