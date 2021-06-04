// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant permissions for that operation. Once all the
 * values are set, this should be serialized with toString and set as the permissions field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export class AccountSASPermissions {
  /**
   * Parse initializes the AccountSASPermissions fields from a string.
   *
   * @param permissions -
   */
  public static parse(permissions: string): AccountSASPermissions {
    const accountSASPermissions = new AccountSASPermissions();

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
   * Creates a {@link AccountSASPermissions} from a raw object which contains same keys as it
   * and boolean values for them.
   *
   * @param permissionLike -
   */
  public static from(permissionLike: AccountSASPermissionsLike): AccountSASPermissions {
    const accountSASPermissions = new AccountSASPermissions();
    if (permissionLike.query) {
      accountSASPermissions.query = true;
    }
    if (permissionLike.write) {
      accountSASPermissions.write = true;
    }
    if (permissionLike.delete) {
      accountSASPermissions.delete = true;
    }
    if (permissionLike.list) {
      accountSASPermissions.list = true;
    }
    if (permissionLike.add) {
      accountSASPermissions.add = true;
    }
    if (permissionLike.update) {
      accountSASPermissions.update = true;
    }
    return accountSASPermissions;
  }

  /**
   * Grants permission to list entities.
   */
  public query: boolean = false;

  /**
   * Grants permission to create tables
   */
  public write: boolean = false;

  /**
   * Grants permission to delete tables and entities
   */
  public delete: boolean = false;

  /**
   * Grants permission to list tables
   */
  public list: boolean = false;

  /**
   * Grants permission to create entities
   */
  public add: boolean = false;

  /**
   * Permissions to update messages and table entities granted.
   */
  public update: boolean = false;

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
  public toString(): string {
    // The order of the characters should be as specified here to ensure correctness:
    // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
    // Use a string array instead of string concatenating += operator for performance
    const permissions: string[] = [];
    if (this.query) {
      permissions.push("r");
    }
    if (this.write) {
      permissions.push("w");
    }
    if (this.delete) {
      permissions.push("d");
    }
    if (this.list) {
      permissions.push("l");
    }
    if (this.add) {
      permissions.push("a");
    }
    if (this.update) {
      permissions.push("u");
    }

    return permissions.join("");
  }
}

/**
 * A type that looks like an account SAS permission.
 * Used in {@link AccountSASPermissions} to parse SAS permissions from raw objects.
 */
export interface AccountSASPermissionsLike {
  /**
   * Grants permission to list entities.
   */
  query: boolean;

  /**
   * Grants permission to create tables
   */
  write: boolean;

  /**
   * Grants permission to delete tables and entities
   */
  delete: boolean;

  /**
   * Grants permission to list tables
   */
  list: boolean;

  /**
   * Grants permission to create entities
   */
  add: boolean;

  /**
   * Permissions to update messages and table entities granted.
   */
  update: boolean;
}
