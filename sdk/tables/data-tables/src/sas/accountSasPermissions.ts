// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Parse initializes the AccountSASPermissions fields from a string.
 *
 * @param permissions -
 */
export function accountSasPermissionsFromString(permissions: string): AccountSasPermissions {
  const accountSasPermissions: AccountSasPermissions = {};

  for (const c of permissions) {
    switch (c) {
      case "r":
        accountSasPermissions.query = true;
        break;
      case "w":
        accountSasPermissions.write = true;
        break;
      case "d":
        accountSasPermissions.delete = true;
        break;
      case "l":
        accountSasPermissions.list = true;
        break;
      case "a":
        accountSasPermissions.add = true;
        break;
      case "u":
        accountSasPermissions.update = true;
        break;

      default:
        throw new RangeError(`Invalid permission character: ${c}`);
    }
  }

  return accountSasPermissions;
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
export function accountSasPermissionsToString(permissions: AccountSasPermissions): string {
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
 * Used in {@link AccountSasPermissions} to parse SAS permissions from raw objects.
 */
export interface AccountSasPermissions {
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
