// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a directory.
 * Setting a value to true means that any SAS which uses these permissions will grant permissions for that operation.
 * Once all the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link DataLakeSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class DirectorySASPermissions
 */
export class DirectorySASPermissions {
  /**
   * Creates an {@link DirectorySASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @static
   * @param {string} permissions
   * @returns {DirectorySASPermissions}
   * @memberof DirectorySASPermissions
   */
  public static parse(permissions: string) {
    const directorySASPermissions = new DirectorySASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          directorySASPermissions.read = true;
          break;
        case "a":
          directorySASPermissions.add = true;
          break;
        case "c":
          directorySASPermissions.create = true;
          break;
        case "w":
          directorySASPermissions.write = true;
          break;
        case "d":
          directorySASPermissions.delete = true;
          break;
        case "l":
          directorySASPermissions.list = true;
          break;
        case "m":
          directorySASPermissions.move = true;
          break;
        case "e":
          directorySASPermissions.execute = true;
          break;
        case "o":
          directorySASPermissions.ownership = true;
          break;
        case "p":
          directorySASPermissions.permission = true;
          break;
        default:
          throw new RangeError(`Invalid permission ${char}`);
      }
    }

    return directorySASPermissions;
  }

  /**
   * Specifies Read access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public read: boolean = false;

  /**
   * Specifies Add access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public add: boolean = false;

  /**
   * Specifies Create access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public create: boolean = false;

  /**
   * Specifies Write access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public write: boolean = false;

  /**
   * Specifies Delete access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public delete: boolean = false;

  /**
   * Specifies List access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public list: boolean = false;

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
   * Specifies Ownership access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public ownership: boolean = false;

  /**
   * Specifies Permission access granted.
   *
   * @type {boolean}
   * @memberof DirectorySASPermissions
   */
  public permission: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * The order of the characters should be as specified here to ensure correctness.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @returns {string}
   * @memberof DirectorySASPermissions
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
    if (this.list) {
      permissions.push("l");
    }
    if (this.move) {
      permissions.push("m");
    }
    if (this.execute) {
      permissions.push("e");
    }
    if (this.ownership) {
      permissions.push("o");
    }
    if (this.permission) {
      permissions.push("p");
    }
    return permissions.join("");
  }
}
