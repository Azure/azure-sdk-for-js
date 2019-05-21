// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a blob. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class BlobSASPermissions
 */
export class BlobSASPermissions {
  /**
   * Creates a {@link BlobSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @static
   * @param {string} permissions
   * @returns {BlobSASPermissions}
   * @memberof BlobSASPermissions
   */
  public static parse(permissions: string): BlobSASPermissions {
    const blobSASPermissions = new BlobSASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          blobSASPermissions.read = true;
          break;
        case "a":
          blobSASPermissions.add = true;
          break;
        case "c":
          blobSASPermissions.create = true;
          break;
        case "w":
          blobSASPermissions.write = true;
          break;
        case "d":
          blobSASPermissions.delete = true;
          break;
        default:
          throw new RangeError(`Invalid permission: ${char}`);
      }
    }

    return blobSASPermissions;
  }

  /**
   * Specifies Read access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public read: boolean = false;

  /**
   * Specifies Add access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public add: boolean = false;

  /**
   * Specifies Create access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public create: boolean = false;

  /**
   * Specifies Write access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public write: boolean = false;

  /**
   * Specifies Delete access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public delete: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returns {string} A string which represents the BlobSASPermissions
   * @memberof BlobSASPermissions
   */
  public toString(): string {
    const permissions: string[] = [];
    if (this.read) {
      permissions.push("r");
    }
    if (this.add) {
      permissions.push("a");
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
