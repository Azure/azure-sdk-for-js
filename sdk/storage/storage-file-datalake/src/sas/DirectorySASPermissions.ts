// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a directory.
 * Setting a value to true means that any SAS which uses these permissions will grant permissions for that operation.
 * Once all the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link DataLakeSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export class DirectorySASPermissions {
  /**
   * Creates an {@link DirectorySASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  public static parse(permissions: string): DirectorySASPermissions {
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
          directorySASPermissions.manageOwnership = true;
          break;
        case "p":
          directorySASPermissions.manageAccessControl = true;
          break;
        default:
          throw new RangeError(`Invalid permission ${char}`);
      }
    }

    return directorySASPermissions;
  }

  /**
   * Specifies Read access granted.
   */
  public read: boolean = false;

  /**
   * Specifies Add access granted.
   */
  public add: boolean = false;

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
   * Specifies Move access granted.
   */
  public move: boolean = false;

  /**
   * Specifies Execute access granted.
   */
  public execute: boolean = false;

  /**
   * Specifies Ownership access granted, which allows the caller to set owner, owning group,
   * or act as the owner when renaming or deleting a blob (file or directory) within a folder
   * that has the sticky bit set.
   */
  public manageOwnership: boolean = false;

  /**
   * Specifies Permission access granted, which allows the caller to set permissions and
   * POSIX ACLs on blobs (files and directories).
   */
  public manageAccessControl: boolean = false;

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
    if (this.manageOwnership) {
      permissions.push("o");
    }
    if (this.manageAccessControl) {
      permissions.push("p");
    }
    return permissions.join("");
  }
}
