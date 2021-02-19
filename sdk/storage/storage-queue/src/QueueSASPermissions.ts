// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a Queue. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link QueueSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export class QueueSASPermissions {
  /**
   * Creates a {@link QueueSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  public static parse(permissions: string): QueueSASPermissions {
    const queueSASPermissions = new QueueSASPermissions();

    for (const char of permissions) {
      switch (char) {
        case "r":
          queueSASPermissions.read = true;
          break;
        case "a":
          queueSASPermissions.add = true;
          break;
        case "u":
          queueSASPermissions.update = true;
          break;
        case "p":
          queueSASPermissions.process = true;
          break;
        default:
          throw new RangeError(`Invalid permission: ${char}`);
      }
    }

    return queueSASPermissions;
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
   * Specifies Update access granted.
   */
  public update: boolean = false;

  /**
   * Specifies Process access granted.
   */
  public process: boolean = false;

  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returns A string which represents the QueueSASPermissions
   */
  public toString(): string {
    const permissions: string[] = [];
    if (this.read) {
      permissions.push("r");
    }
    if (this.add) {
      permissions.push("a");
    }
    if (this.update) {
      permissions.push("u");
    }
    if (this.process) {
      permissions.push("p");
    }
    return permissions.join("");
  }
}
