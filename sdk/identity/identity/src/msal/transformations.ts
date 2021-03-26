// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalCommon from "@azure/msal-common";
import { AuthenticationRecord } from "./types";

export function publicToMsal(account: AuthenticationRecord): msalCommon.AccountInfo {
  const [environment] = account.authority.match(/([a-z]*\.[a-z]*\.[a-z]*)/) || [];
  return {
    ...account,
    localAccountId: account.homeAccountId,
    environment
  };
}

/**
 * Deserializes a previously serialzied authentication record from a string into an object.
 * @param serializedRecord - Authentication record previously serialized into string.
 * @returns AuthenticationRecord.
 */
export function deserializeAuthenticationRecord(serializedRecord: string): AuthenticationRecord {
  const parsed = JSON.parse(serializedRecord);
  return {
    authority: parsed.authority,
    homeAccountId: parsed.home_account_id,
    tenantId: parsed.tenant_id,
    username: parsed.username,
    serialize: () => serializedRecord
  };
}
