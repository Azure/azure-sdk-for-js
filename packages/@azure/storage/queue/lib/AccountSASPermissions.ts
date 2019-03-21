/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant permissions for that operation. Once all the
 * values are set, this should be serialized with toString and set as the permissions field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class AccountSASPermissions
 */
export class AccountSASPermissions {
  /**
   * Parse initializes the AccountSASPermissions fields from a string.
   *
   * @static
   * @param {string} permissions
   * @returns {AccountSASPermissions}
   * @memberof AccountSASPermissions
   */
  public static parse(permissions: string): AccountSASPermissions {
    const accountSASPermissions = new AccountSASPermissions();

    for (const c of permissions) {
      switch (c) {
        case "r":
          accountSASPermissions.read = true;
          break;
        case "w":
          accountSASPermissions.write = true;
          break;
        case "d":
          accountSASPermissions.delete = true;
          break;
        case "l":
          accountSASPermissions.list = true;
          break;
        case "a":
          accountSASPermissions.add = true;
          break;
        case "c":
          accountSASPermissions.create = true;
          break;
        case "u":
          accountSASPermissions.update = true;
          break;
        case "p":
          accountSASPermissions.process = true;
          break;
        default:
          throw new RangeError(`Invalid permission character: ${c}`);
      }
    }

    return accountSASPermissions;
  }

  /**
   * Permission to read resources granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public read: boolean = false;

  /**
   * Permission to write resources granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public write: boolean = false;

  /**
   * Permission to delete queues and messages granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public delete: boolean = false;

  /**
   * Permission to list queues granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public list: boolean = false;

  /**
   * Permission to add messages, table entities, and append to blobs granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public add: boolean = false;

  /**
   * Permission to create queues, blobs and files granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public create: boolean = false;

  /**
   * Permissions to update messages and table entities granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public update: boolean = false;

  /**
   * Permission to get and delete messages granted.
   *
   * @type {boolean}
   * @memberof AccountSASPermissions
   */
  public process: boolean = false;

  /**
   * Produces the SAS permissions string for an Azure Storage account.
   * Call this method to set AccountSASSignatureValues Permissions field.
   *
   * Using this method will guarantee the resource types are in
   * an order accepted by the service.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
   *
   * @returns {string}
   * @memberof AccountSASPermissions
   */
  public toString(): string {
    // The order of the characters should be as specified here to ensure correctness:
    // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
    // Use a string array instead of string concatenating += operator for performance
    const permissions: string[] = [];
    if (this.read) {
      permissions.push("r");
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
    if (this.add) {
      permissions.push("a");
    }
    if (this.create) {
      permissions.push("c");
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
