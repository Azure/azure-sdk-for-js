// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * TableSASSignatureValues is used to help generating SAS tokens for tables.
 */

import { NamedKeyCredential } from "@azure/core-auth";
import { computeHMACSHA256 } from "../utils/computeHMACSHA256";
import { SERVICE_VERSION } from "../utils/constants";
import { truncatedISO8061Date } from "../utils/truncateISO8061Date";
import { ipRangeToString, SasIPRange } from "./sasIPRange";
import { SASProtocol, SASQueryParameters } from "./sasQueryParameters";
import { TableSASPermissions, tableSASPermissionsToString } from "./tableSASPermisions";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * TableSASSignatureValues is used to help generating Table service SAS tokens for tables
 */
export interface TableSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional only when identifier is provided.
   * Please refer to {@link TableSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   */
  permissions?: TableSASPermissions;
  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;

  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

  /**
   * Define the start of a Partition Key range
   * Table queries will only return results that are within the range, and attempts to use the shared access signature to add, update, or delete entities outside this range will fail.
   * If startPartitionKey equals endPartitionKey the shared access signature only authorizes access to entities in one partition in the table.
   * If startPartitionKey equals endPartitionKey and startRowKey equals endRowKey, the shared access signature can only access one entity in one partition
   */
  startPartitionKey?: string;
  /**
   * Define the end of a Partition Key range
   * Table queries will only return results that are within the range, and attempts to use the shared access signature to add, update, or delete entities outside this range will fail.
   * If startPartitionKey equals endPartitionKey the shared access signature only authorizes access to entities in one partition in the table.
   * If startPartitionKey equals endPartitionKey and startRowKey equals endRowKey, the shared access signature can only access one entity in one partition
   */
  endPartitionKey?: string;
  /**
   * Define the start of a Row Key range
   * Table queries will only return results that are within the range, and attempts to use the shared access signature to add, update, or delete entities outside this range will fail.
   * If startPartitionKey equals endPartitionKey the shared access signature only authorizes access to entities in one partition in the table.
   * If startPartitionKey equals endPartitionKey and startRowKey equals endRowKey, the shared access signature can only access one entity in one partition
   */
  startRowKey?: string;
  /**
   * Define the end of a Row Key range
   * Table queries will only return results that are within the range, and attempts to use the shared access signature to add, update, or delete entities outside this range will fail.
   * If startPartitionKey equals endPartitionKey the shared access signature only authorizes access to entities in one partition in the table.
   * If startPartitionKey equals endPartitionKey and startRowKey equals endRowKey, the shared access signature can only access one entity in one partition
   */
  endRowKey?: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiresOn are required.
 * You MUST assign value to identifier or expiresOn & permissions manually if you initial with
 * this constructor.
 */
export function generateTableSASQueryParameters(
  tableName: string,
  credential: NamedKeyCredential,
  tableSASSignatureValues: TableSASSignatureValues
): SASQueryParameters {
  const version = tableSASSignatureValues.version ?? SERVICE_VERSION;

  if (credential === undefined) {
    throw TypeError("Invalid NamedKeyCredential");
  }

  if (!tableName) {
    throw new Error("Must provide a 'tableName'");
  }

  const signedPermissions = tableSASPermissionsToString(tableSASSignatureValues.permissions);
  const signedStart = tableSASSignatureValues.startsOn
    ? truncatedISO8061Date(tableSASSignatureValues.startsOn, false /** withMilliseconds */)
    : "";
  const signedExpiry = tableSASSignatureValues.expiresOn
    ? truncatedISO8061Date(tableSASSignatureValues.expiresOn, false /** withMilliseconds */)
    : "";
  const canonicalizedResource = getCanonicalName(credential.name, tableName);
  const signedIdentifier = tableSASSignatureValues.identifier ?? "";
  const signedIP = ipRangeToString(tableSASSignatureValues.ipRange);
  const signedProtocol = tableSASSignatureValues.protocol || "";
  const startingPartitionKey = tableSASSignatureValues.startPartitionKey ?? "";
  const startingRowKey = tableSASSignatureValues.startRowKey ?? "";
  const endingPartitionKey = tableSASSignatureValues.endPartitionKey ?? "";
  const endingRowKey = tableSASSignatureValues.endRowKey ?? "";

  const stringToSign = [
    signedPermissions,
    signedStart,
    signedExpiry,
    canonicalizedResource,
    signedIdentifier,
    signedIP,
    signedProtocol,
    version,
    startingPartitionKey,
    startingRowKey,
    endingPartitionKey,
    endingRowKey
  ].join("\n");

  const signature = computeHMACSHA256(stringToSign, credential.key);

  return new SASQueryParameters(version, signature, {
    permissions: signedPermissions,
    protocol: tableSASSignatureValues.protocol,
    startsOn: tableSASSignatureValues.startsOn,
    expiresOn: tableSASSignatureValues.expiresOn,
    ipRange: tableSASSignatureValues.ipRange,
    identifier: tableSASSignatureValues.identifier,
    tableName
  });
}

function getCanonicalName(accountName: string, tableName: string): string {
  // Sample CanonicalName for URL = https://myaccount.table.core.windows.net/Employees(PartitionKey='Jeff',RowKey='Price'):
  //   canonicalizedResource = "/table/myaccount/employees"
  return `/table/${accountName}/${tableName.toLowerCase()}`;
}
