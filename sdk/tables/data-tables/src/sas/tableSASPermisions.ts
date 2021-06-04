// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a table. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link TableSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export class TableSASPermissions {
  /**
   * Creates a {@link TableSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  public static parse(permissions: string): TableSASPermissions {
    const tableSASPermissions = new TableSASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          tableSASPermissions.query = true;
          break;
        case "a":
          tableSASPermissions.add = true;
          break;
        case "u":
          tableSASPermissions.update = true;
          break;
        case "d":
          tableSASPermissions.delete = true;
          break;
        default:
          throw new RangeError(`Invalid permission: ${char}`);
      }
    }

    return tableSASPermissions;
  }

  /**
   * Creates a {@link TableSASPermissions} from a raw object which contains same keys as it
   * and boolean values for them.
   *
   * @param permissionLike -
   */
  public static from(permissionLike: TableSASPermissionsLike): TableSASPermissions {
    const tableSASPermissions = new TableSASPermissions();
    if (permissionLike.query) {
      tableSASPermissions.query = true;
    }
    if (permissionLike.add) {
      tableSASPermissions.add = true;
    }
    if (permissionLike.update) {
      tableSASPermissions.update = true;
    }

    if (permissionLike.delete) {
      tableSASPermissions.delete = true;
    }

    return tableSASPermissions;
  }

  /**
   * Specifies Read access granted.
   */
  public query: boolean = false;

  /**
   * Specifies Add access granted.
   */
  public add: boolean = false;

  /**
   * Specifies Delete access granted.
   */
  public delete: boolean = false;

  /**
   * Specifies Update access granted.
   */
  public update: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returns A string which represents the TableSASPermissions
   */
  public toString(): string {
    const permissions: string[] = [];
    if (this.query) {
      permissions.push("r");
    }
    if (this.add) {
      permissions.push("a");
    }
    if (this.update) {
      permissions.push("u");
    }

    if (this.delete) {
      permissions.push("d");
    }
    return permissions.join("");
  }
}

/**
 * A type that looks like a Table SAS permission.
 * Used in {@link TableSASPermissions} to parse SAS permissions from raw objects.
 */
export interface TableSASPermissionsLike {
  /**
   * Specifies Query access granted.
   */
  query?: boolean;

  /**
   * Specifies Add access granted.
   */
  add?: boolean;

  /**
   * Specifies Update access granted.
   */
  update?: boolean;

  /**
   * Specifies Delete access granted.
   */
  delete?: boolean;
}
