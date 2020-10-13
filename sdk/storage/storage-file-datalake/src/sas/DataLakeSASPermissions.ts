// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link DataLakeSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class DataLakeSASPermissions
 */
export class DataLakeSASPermissions {
  /**
   * Creates a {@link DataLakeSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @static
   * @param {string} permissions
   * @returns {DataLakeSASPermissions}
   * @memberof DataLakeSASPermissions
   */
  public static parse(permissions: string): DataLakeSASPermissions {
    const blobSASPermissions = new DataLakeSASPermissions();

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
        case "m":
          blobSASPermissions.move = true;
          break;
        case "e":
          blobSASPermissions.execute = true;
          break;
        case "o":
          blobSASPermissions.manageOwnership = true;
          break;
        case "p":
          blobSASPermissions.manageAccessControl = true;
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
   * @memberof DataLakeSASPermissions
   */
  public read: boolean = false;

  /**
   * Specifies Add access granted.
   *
   * @type {boolean}
   * @memberof DataLakeSASPermissions
   */
  public add: boolean = false;

  /**
   * Specifies Create access granted.
   *
   * @type {boolean}
   * @memberof DataLakeSASPermissions
   */
  public create: boolean = false;

  /**
   * Specifies Write access granted.
   *
   * @type {boolean}
   * @memberof DataLakeSASPermissions
   */
  public write: boolean = false;

  /**
   * Specifies Delete access granted.
   *
   * @type {boolean}
   * @memberof DataLakeSASPermissions
   */
  public delete: boolean = false;

  /**
   * Specifies Move access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public move: boolean = false;

  /**
   * Specifies Execute access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public execute: boolean = false;

  /**
   * Specifies Ownership access granted, which allows the caller to set owner, owning group,
   * or act as the owner when renaming or deleting a blob (file or directory) within a folder
   * that has the sticky bit set.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public manageOwnership: boolean = false;

  /**
   * Specifies Permission access granted, which allows the caller to set permissions and
   * POSIX ACLs on blobs (files and directories).
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public manageAccessControl: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returns {string} A string which represents the DataLakeSASPermissions
   * @memberof DataLakeSASPermissions
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
    if (this.move) {
      permissions.push("m");
    }
    if (this.execute) {
      permissions.push("e");
    }
    if (this.manageOwnership) {
      permissions.push("o");
    }
    if (this.manageAccessControl) {
      permissions.push("p");
    }
    return permissions.join("");
  }
}
