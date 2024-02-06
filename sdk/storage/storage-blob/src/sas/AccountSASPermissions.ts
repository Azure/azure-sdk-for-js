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
          accountSASPermissions.read = true;
          break;
        case "w":
          accountSASPermissions.write = true;
          break;
        case "d":
          accountSASPermissions.delete = true;
          break;
        case "x":
          accountSASPermissions.deleteVersion = true;
          break;
        case "l":
          accountSASPermissions.list = true;
          break;
        case "a":
          accountSASPermissions.add = true;
          break;
        case "c":
          accountSASPermissions.create = true;
          break;
        case "u":
          accountSASPermissions.update = true;
          break;
        case "p":
          accountSASPermissions.process = true;
          break;
        case "t":
          accountSASPermissions.tag = true;
          break;
        case "f":
          accountSASPermissions.filter = true;
          break;
        case "i":
          accountSASPermissions.setImmutabilityPolicy = true;
          break;
        case "y":
          accountSASPermissions.permanentDelete = true;
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
    if (permissionLike.read) {
      accountSASPermissions.read = true;
    }
    if (permissionLike.write) {
      accountSASPermissions.write = true;
    }
    if (permissionLike.delete) {
      accountSASPermissions.delete = true;
    }
    if (permissionLike.deleteVersion) {
      accountSASPermissions.deleteVersion = true;
    }
    if (permissionLike.filter) {
      accountSASPermissions.filter = true;
    }
    if (permissionLike.tag) {
      accountSASPermissions.tag = true;
    }
    if (permissionLike.list) {
      accountSASPermissions.list = true;
    }
    if (permissionLike.add) {
      accountSASPermissions.add = true;
    }
    if (permissionLike.create) {
      accountSASPermissions.create = true;
    }
    if (permissionLike.update) {
      accountSASPermissions.update = true;
    }
    if (permissionLike.process) {
      accountSASPermissions.process = true;
    }
    if (permissionLike.setImmutabilityPolicy) {
      accountSASPermissions.setImmutabilityPolicy = true;
    }
    if (permissionLike.permanentDelete) {
      accountSASPermissions.permanentDelete = true;
    }
    return accountSASPermissions;
  }

  /**
   * Permission to read resources and list queues and tables granted.
   */
  public read: boolean = false;

  /**
   * Permission to write resources granted.
   */
  public write: boolean = false;

  /**
   * Permission to create blobs and files granted.
   */
  public delete: boolean = false;

  /**
   * Permission to delete versions granted.
   */
  public deleteVersion: boolean = false;

  /**
   * Permission to list blob containers, blobs, shares, directories, and files granted.
   */
  public list: boolean = false;

  /**
   * Permission to add messages, table entities, and append to blobs granted.
   */
  public add: boolean = false;

  /**
   * Permission to create blobs and files granted.
   */
  public create: boolean = false;

  /**
   * Permissions to update messages and table entities granted.
   */
  public update: boolean = false;

  /**
   * Permission to get and delete messages granted.
   */
  public process: boolean = false;

  /**
   * Specfies Tag access granted.
   */
  public tag: boolean = false;

  /**
   * Permission to filter blobs.
   */
  public filter: boolean = false;

  /**
   * Permission to set immutability policy.
   */
  public setImmutabilityPolicy: boolean = false;

  /**
   * Specifies that Permanent Delete is permitted.
   */
  public permanentDelete: boolean = false;

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
    if (this.read) {
      permissions.push("r");
    }
    if (this.write) {
      permissions.push("w");
    }
    if (this.delete) {
      permissions.push("d");
    }
    if (this.deleteVersion) {
      permissions.push("x");
    }
    if (this.filter) {
      permissions.push("f");
    }
    if (this.tag) {
      permissions.push("t");
    }
    if (this.list) {
      permissions.push("l");
    }
    if (this.add) {
      permissions.push("a");
    }
    if (this.create) {
      permissions.push("c");
    }
    if (this.update) {
      permissions.push("u");
    }
    if (this.process) {
      permissions.push("p");
    }
    if (this.setImmutabilityPolicy) {
      permissions.push("i");
    }
    if (this.permanentDelete) {
      permissions.push("y");
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
   * Permission to read resources and list queues and tables granted.
   */
  read?: boolean;

  /**
   * Permission to write resources granted.
   */
  write?: boolean;

  /**
   * Permission to delete blobs and files granted.
   */
  delete?: boolean;

  /**
   * Permission to delete versions granted.
   */
  deleteVersion?: boolean;

  /**
   * Permission to list blob containers, blobs, shares, directories, and files granted.
   */
  list?: boolean;

  /**
   * Permission to add messages, table entities, and append to blobs granted.
   */
  add?: boolean;

  /**
   * Permission to create blobs and files granted.
   */
  create?: boolean;

  /**
   * Permissions to update messages and table entities granted.
   */
  update?: boolean;

  /**
   * Permission to get and delete messages granted.
   */
  process?: boolean;

  /**
   * Specfies Tag access granted.
   */
  tag?: boolean;

  /**
   * Permission to filter blobs.
   */
  filter?: boolean;

  /**
   * Permission to set immutability policy.
   */
  setImmutabilityPolicy?: boolean;

  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete?: boolean;
}
