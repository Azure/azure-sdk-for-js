// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as msalCommon from "@azure/msal-common";
import { DefaultTenantId } from "../constants";
import { MsalAccountInfo, AuthenticationRecord } from "./types";
import { getAuthorityHost } from "./utils";

export function publicToMsal(account: AuthenticationRecord): msalCommon.AccountInfo {
  const [environment] = account.authority.match(/([a-z]*\.[a-z]*\.[a-z]*)/) || [];
  return {
    ...account,
    localAccountId: account.homeAccountId,
    environment
  };
}

export function msalToPublic(account: MsalAccountInfo): AuthenticationRecord {
  const record = {
    authority: getAuthorityHost(account.tenantId, account.environment),
    homeAccountId: account.homeAccountId,
    tenantId: account.tenantId || DefaultTenantId,
    username: account.username,
    serialize: () => serializeAuthenticationRecord(record)
  };
  return record;
}

/**
 * Serializes a given authentication record to string.
 * @param record - Authentication Record
 * @internal
 */
export function serializeAuthenticationRecord(record: AuthenticationRecord): string {
  return JSON.stringify({
    authority: record.authority,
    home_account_id: record.homeAccountId,
    tenant_id: record.tenantId,
    username: record.username
  });
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
