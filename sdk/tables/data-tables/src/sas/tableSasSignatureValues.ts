// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * TableSASSignatureValues is used to help generating SAS tokens for tables.
 */

import { SasIPRange, ipRangeToString } from "./sasIPRange";
import { SasProtocol, SasQueryParameters } from "./sasQueryParameters";
import { TableSasPermissions, tableSasPermissionsToString } from "./tableSasPermisions";
import { NamedKeyCredential } from "@azure/core-auth";
import { SERVICE_VERSION } from "../utils/constants";
import { computeHMACSHA256 } from "../utils/computeHMACSHA256";
import { truncatedISO8061Date } from "../utils/truncateISO8061Date";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * TableSASSignatureValues is used to help generating Table service SAS tokens for tables
 */
export interface TableSasSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;

  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SasProtocol;

  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;

  /**
   * Optional. If identifier is not provided has a default value of one hour from the time the token is generated.
   * The time after which the SAS will no longer work.
   */
  expiresOn?: Date;

  /**
   * Optional. If identifier is not provided has a default value of "read"
   * Please refer to {@link TableSasPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   */
  permissions?: TableSasPermissions;
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
 * **Note**: When identifier is not provided, permissions has a default value of "read" and expiresOn of one hour from the time the token is generated.
 */
export function generateTableSasQueryParameters(
  tableName: string,
  credential: NamedKeyCredential,
  tableSasSignatureValues: TableSasSignatureValues
): SasQueryParameters {
  const version = tableSasSignatureValues.version ?? SERVICE_VERSION;

  if (credential === undefined) {
    throw TypeError("Invalid NamedKeyCredential");
  }

  if (!tableName) {
    throw new Error("Must provide a 'tableName'");
  }

  const signedPermissions = tableSasPermissionsToString(tableSasSignatureValues.permissions);
  const signedStart = tableSasSignatureValues.startsOn
    ? truncatedISO8061Date(tableSasSignatureValues.startsOn, false /** withMilliseconds */)
    : "";
  const signedExpiry = tableSasSignatureValues.expiresOn
    ? truncatedISO8061Date(tableSasSignatureValues.expiresOn, false /** withMilliseconds */)
    : "";
  const canonicalizedResource = getCanonicalName(credential.name, tableName);
  const signedIdentifier = tableSasSignatureValues.identifier ?? "";
  const signedIP = ipRangeToString(tableSasSignatureValues.ipRange);
  const signedProtocol = tableSasSignatureValues.protocol || "";
  const startingPartitionKey = tableSasSignatureValues.startPartitionKey ?? "";
  const startingRowKey = tableSasSignatureValues.startRowKey ?? "";
  const endingPartitionKey = tableSasSignatureValues.endPartitionKey ?? "";
  const endingRowKey = tableSasSignatureValues.endRowKey ?? "";

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
    endingRowKey,
  ].join("\n");

  const signature = computeHMACSHA256(stringToSign, credential.key);

  return new SasQueryParameters(version, signature, {
    permissions: signedPermissions,
    protocol: tableSasSignatureValues.protocol,
    startsOn: tableSasSignatureValues.startsOn,
    expiresOn: tableSasSignatureValues.expiresOn,
    ipRange: tableSasSignatureValues.ipRange,
    identifier: tableSasSignatureValues.identifier,
    tableName,
  });
}

function getCanonicalName(accountName: string, tableName: string): string {
  // Sample CanonicalName for URL = https://myaccount.table.core.windows.net/Employees(PartitionKey='Jeff',RowKey='Price'):
  //   canonicalizedResource = "/table/myaccount/employees"
  return `/table/${accountName}/${tableName.toLowerCase()}`;
}
