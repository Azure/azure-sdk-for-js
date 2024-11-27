// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Creates a {@link TableSasPermissions} from the specified permissions string. This method will throw an
 * Error if it encounters a character that does not correspond to a valid permission.
 *
 * @param permissions -
 */
export function tableSasPermissionsFromString(permissions: string): TableSasPermissions {
  const tableSasPermissions: TableSasPermissions = {};
  for (const char of permissions) {
    switch (char) {
      case "r":
        tableSasPermissions.query = true;
        break;
      case "a":
        tableSasPermissions.add = true;
        break;
      case "u":
        tableSasPermissions.update = true;
        break;
      case "d":
        tableSasPermissions.delete = true;
        break;
      default:
        throw new RangeError(`Invalid permission: ${char}`);
    }
  }

  return tableSasPermissions;
}

/**
 * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
 * order accepted by the service.
 *
 * @returns A string which represents the TableSasPermissions
 */
export function tableSasPermissionsToString(permissions?: TableSasPermissions): string {
  if (!permissions) {
    return "";
  }

  const permissionsString: string[] = [];
  if (permissions.query) {
    permissionsString.push("r");
  }
  if (permissions.add) {
    permissionsString.push("a");
  }
  if (permissions.update) {
    permissionsString.push("u");
  }

  if (permissions.delete) {
    permissionsString.push("d");
  }
  return permissionsString.join("");
}

/**
 * A type that looks like a Table SAS permission.
 * Used in {@link TableSasPermissions} to parse SAS permissions from raw objects.
 */
export interface TableSasPermissions {
  /**
   * Specifies Query access granted.
   */
  query?: boolean;

  /**
   * Specifies Add access granted.
   */
  add?: boolean;

  /**
   * Specifies Update access granted.
   */
  update?: boolean;

  /**
   * Specifies Delete access granted.
   */
  delete?: boolean;
}
