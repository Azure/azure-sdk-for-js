// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CredentialLogger } from "./logging.js";
import { formatError } from "./logging.js";

/**
 * @internal
 */
export function checkSubscription(logger: CredentialLogger, subscription: string): void {
  if (!subscription.match(/^[0-9a-zA-Z-._ ]+$/)) {
    const error = new Error(
      `Subscription "${subscription}" contains invalid characters. If this is the name of a subscription, use its ID instead. You can get this from the Azure CLI: \`az account show --name "${subscription}" --query "id"\`.`,
    );
    logger.info(formatError("", error));
    throw error;
  }
}
