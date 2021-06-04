// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Parse initializes the AccountSASPermissions fields from a string.
 *
 * @param permissions -
 */
export function accountSASPermissionsFromString(permissions: string) {
  let accountSASPermissions: AccountSASPermissions = {};

  for (const c of permissions) {
    switch (c) {
      case "r":
        accountSASPermissions.query = true;
        break;
      case "w":
        accountSASPermissions.write = true;
        break;
      case "d":
        accountSASPermissions.delete = true;
        break;
      case "l":
        accountSASPermissions.list = true;
        break;
      case "a":
        accountSASPermissions.add = true;
        break;
      case "u":
        accountSASPermissions.update = true;
        break;

      default:
        throw new RangeError(`Invalid permission character: ${c}`);
    }
  }

  return accountSASPermissions;
}

/**
 * Produces the SAS permissions string for an Azure Storage account.
 * Call this method to set AccountSASSignatureValues Permissions field.
 *
 * Using this method will guarantee the resource types are in
 * an order accepted by the service.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 */
export function accountSASPermissionsToString(permissions: AccountSASPermissions) {
  // The order of the characters should be as specified here to ensure correctness:
  // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
  // Use a string array instead of string concatenating += operator for performance
  const permissionString: string[] = [];
  if (permissions.query) {
    permissionString.push("r");
  }
  if (permissions.write) {
    permissionString.push("w");
  }
  if (permissions.delete) {
    permissionString.push("d");
  }
  if (permissions.list) {
    permissionString.push("l");
  }
  if (permissions.add) {
    permissionString.push("a");
  }
  if (permissions.update) {
    permissionString.push("u");
  }

  return permissionString.join("");
}

/**
 * A type that looks like an account SAS permission.
 * Used in {@link AccountSASPermissions} to parse SAS permissions from raw objects.
 */
export interface AccountSASPermissions {
  /**
   * Grants permission to list entities.
   */
  query?: boolean;

  /**
   * Grants permission to create tables
   */
  write?: boolean;

  /**
   * Grants permission to delete tables and entities
   */
  delete?: boolean;

  /**
   * Grants permission to list tables
   */
  list?: boolean;

  /**
   * Grants permission to create entities
   */
  add?: boolean;

  /**
   * Permissions to update messages and table entities granted.
   */
  update?: boolean;
}
