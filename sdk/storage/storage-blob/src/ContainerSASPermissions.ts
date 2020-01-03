// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a container.
 * Setting a value to true means that any SAS which uses these permissions will grant permissions for that operation.
 * Once all the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class ContainerSASPermissions
 */
export class ContainerSASPermissions {
  /**
   * Creates an {@link ContainerSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @static
   * @param {string} permissions
   * @returns {ContainerSASPermissions}
   * @memberof ContainerSASPermissions
   */
  public static parse(permissions: string) {
    const containerSASPermissions = new ContainerSASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          containerSASPermissions.read = true;
          break;
        case "a":
          containerSASPermissions.add = true;
          break;
        case "c":
          containerSASPermissions.create = true;
          break;
        case "w":
          containerSASPermissions.write = true;
          break;
        case "d":
          containerSASPermissions.delete = true;
          break;
        case "l":
          containerSASPermissions.list = true;
          break;
        default:
          throw new RangeError(`Invalid permission ${char}`);
      }
    }

    return containerSASPermissions;
  }

  /**
   * Specifies Read access granted.
   *
   * @type {boolean}
   * @memberof ContainerSASPermissions
   */
  public read: boolean = false;

  /**
   * Specifies Add access granted.
   *
   * @type {boolean}
   * @memberof ContainerSASPermissions
   */
  public add: boolean = false;

  /**
   * Specifies Create access granted.
   *
   * @type {boolean}
   * @memberof ContainerSASPermissions
   */
  public create: boolean = false;

  /**
   * Specifies Write access granted.
   *
   * @type {boolean}
   * @memberof ContainerSASPermissions
   */
  public write: boolean = false;

  /**
   * Specifies Delete access granted.
   *
   * @type {boolean}
   * @memberof ContainerSASPermissions
   */
  public delete: boolean = false;

  /**
   * Specifies List access granted.
   *
   * @type {boolean}
   * @memberof ContainerSASPermissions
   */
  public list: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * The order of the characters should be as specified here to ensure correctness.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @returns {string}
   * @memberof ContainerSASPermissions
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
    return permissions.join("");
  }
}
