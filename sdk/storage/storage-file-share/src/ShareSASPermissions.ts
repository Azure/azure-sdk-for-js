// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a share.
 * Setting a value to true means that any SAS which uses these permissions will grant permissions for that operation.
 * Once all the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link FileSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export class ShareSASPermissions {
  /**
   * Creates an {@link ShareSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  public static parse(permissions: string): ShareSASPermissions {
    const shareSASPermissions = new ShareSASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          shareSASPermissions.read = true;
          break;
        case "c":
          shareSASPermissions.create = true;
          break;
        case "w":
          shareSASPermissions.write = true;
          break;
        case "d":
          shareSASPermissions.delete = true;
          break;
        case "l":
          shareSASPermissions.list = true;
          break;
        default:
          throw new RangeError(`Invalid permission ${char}`);
      }
    }

    return shareSASPermissions;
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
   * Specifies List access granted.
   */
  public list: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * The order of the characters should be as specified here to ensure correctness.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
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
    if (this.list) {
      permissions.push("l");
    }
    return permissions.join("");
  }
}
