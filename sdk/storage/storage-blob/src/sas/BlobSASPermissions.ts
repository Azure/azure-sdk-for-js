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
   * @param permissions -
   *
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
        case "x":
          blobSASPermissions.deleteVersion = true;
          break;
        case "t":
          blobSASPermissions.tag = true;
          break;
        case "m":
          blobSASPermissions.move = true;
          break;
        case "e":
          blobSASPermissions.execute = true;
          break;
        default:
          throw new RangeError(`Invalid permission: ${char}`);
      }
    }

    return blobSASPermissions;
  }

  /**
   * Creates a {@link BlobSASPermissions} from a raw object which contains same keys as it
   * and boolean values for them.
   *
   * @static
   * @param permissionLike -
   *
   * @memberof BlobSASPermissions
   */
  public static from(permissionLike: BlobSASPermissionsLike): BlobSASPermissions {
    const blobSASPermissions = new BlobSASPermissions();
    if (permissionLike.read) {
      blobSASPermissions.read = true;
    }
    if (permissionLike.add) {
      blobSASPermissions.add = true;
    }
    if (permissionLike.create) {
      blobSASPermissions.create = true;
    }
    if (permissionLike.write) {
      blobSASPermissions.write = true;
    }
    if (permissionLike.delete) {
      blobSASPermissions.delete = true;
    }
    if (permissionLike.deleteVersion) {
      blobSASPermissions.deleteVersion = true;
    }
    if (permissionLike.tag) {
      blobSASPermissions.tag = true;
    }
    if (permissionLike.move) {
      blobSASPermissions.move = true;
    }
    if (permissionLike.execute) {
      blobSASPermissions.execute = true;
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
   * Specifies Delete version access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public deleteVersion: boolean = false;

  /**
   * Specfies Tag access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public tag: boolean = false;

  /**
   * Specifies Move access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public move: boolean = false;

  /**
   * Specifies Execute access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissions
   */
  public execute: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returnsA string which represents the BlobSASPermissions
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
    if (this.deleteVersion) {
      permissions.push("x");
    }
    if (this.tag) {
      permissions.push("t");
    }
    if (this.move) {
      permissions.push("m");
    }
    if (this.execute) {
      permissions.push("e");
    }
    return permissions.join("");
  }
}

/**
 * A type that looks like a Blob SAS permission.
 * Used in {@link BlobSASPermissions} to parse SAS permissions from raw objects.
 */
export interface BlobSASPermissionsLike {
  /**
   * Specifies Read access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  read?: boolean;

  /**
   * Specifies Add access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  add?: boolean;

  /**
   * Specifies Create access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  create?: boolean;

  /**
   * Specifies Write access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  write?: boolean;

  /**
   * Specifies Delete access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  delete?: boolean;

  /**
   * Specifies Delete version access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  deleteVersion?: boolean;

  /**
   * Specfies Tag access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  tag?: boolean;

  /**
   * Specifies Move access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  move?: boolean;

  /**
   * Specifies Execute access granted.
   *
   * @type {boolean}
   * @memberof BlobSASPermissionsLike
   */
  execute?: boolean;
}
