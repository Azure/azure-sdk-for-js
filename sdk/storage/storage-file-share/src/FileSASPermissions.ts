// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a file. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link FileSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export class FileSASPermissions {
  /**
   * Creates a FileSASPermissions from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  public static parse(permissions: string): FileSASPermissions {
    const fileSASPermissions = new FileSASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          fileSASPermissions.read = true;
          break;
        case "c":
          fileSASPermissions.create = true;
          break;
        case "w":
          fileSASPermissions.write = true;
          break;
        case "d":
          fileSASPermissions.delete = true;
          break;
        default:
          throw new RangeError(`Invalid permission: ${char}`);
      }
    }

    return fileSASPermissions;
  }

  /**
   * Specifies Read access granted.
   */
  public read: boolean = false;

  /**
   * Specifies Create access granted.
   */
  public create: boolean = false;

  /**
   * Specifies Write access granted.
   */
  public write: boolean = false;

  /**
   * Specifies Delete access granted.
   */
  public delete: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returns A string which represents the FileSASPermissions
   */
  public toString(): string {
    const permissions: string[] = [];
    if (this.read) {
      permissions.push("r");
    }
    if (this.create) {
      permissions.push("c");
    }
    if (this.write) {
      permissions.push("w");
    }
    if (this.delete) {
      permissions.push("d");
    }
    return permissions.join("");
  }
}
