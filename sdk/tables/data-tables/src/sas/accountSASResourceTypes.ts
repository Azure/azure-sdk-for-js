// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Creates an {@link accountSASResourceTypesFromString} from the specified resource types string. This method will throw an
 * Error if it encounters a character that does not correspond to a valid resource type.
 *
 * @param resourceTypes -
 */
export function accountSASResourceTypesFromString(resourceTypes: string): AccountSASResourceTypes {
  const accountSASResourceTypes: AccountSASResourceTypes = {};

  for (const c of resourceTypes) {
    switch (c) {
      case "s":
        accountSASResourceTypes.service = true;
        break;
      case "c":
        accountSASResourceTypes.container = true;
        break;
      case "o":
        accountSASResourceTypes.object = true;
        break;
      default:
        throw new RangeError(`Invalid resource type: ${c}`);
    }
  }

  return accountSASResourceTypes;
}

/**
 * Converts the given resource types to a string.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 */
export function accountSASResourceTypesToString(resourceTypes: AccountSASResourceTypes): string {
  const resourceTypesString: string[] = [];
  if (resourceTypes.service) {
    resourceTypesString.push("s");
  }
  if (resourceTypes.container) {
    resourceTypesString.push("c");
  }
  if (resourceTypes.object) {
    resourceTypesString.push("o");
  }
  return resourceTypesString.join("");
}

/**
 * Represents the Resources that are accessible by the SAS token
 */
export interface AccountSASResourceTypes {
  /**
   * Permission to access service level APIs granted.
   */
  service?: boolean;

  /**
   * Permission to access container level APIs (Blob Containers, Tables, Queues, File Shares) granted.
   */
  container?: boolean;

  /**
   * Permission to access object level APIs (Blobs, Table Entities, Queue Messages, Files) granted.
   */
  object?: boolean;
}
