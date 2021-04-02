// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialLogger, formatError } from "../util/logging";

export function checkTenantId(logger: CredentialLogger, tenantId: string): void {
  if (!tenantId.match(/^[0-9a-zA-Z-.:/]+$/)) {
    const error = new Error(
      "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://docs.microsoft.com/partner-center/find-ids-and-domain-names."
    );
    logger.info(formatError("", error));
    throw error;
  }
}
