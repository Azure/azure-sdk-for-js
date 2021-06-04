// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Creates an {@link AccountSASServices} from the specified services string. This method will throw an
 * Error if it encounters a character that does not correspond to a valid service.
 *
 * @param services -
 */
export function accountSASServicesFromString(services: string): AccountSASServices {
  const accountSASServices: AccountSASServices = {};

  for (const c of services) {
    switch (c) {
      case "b":
        accountSASServices.blob = true;
        break;
      case "f":
        accountSASServices.file = true;
        break;
      case "q":
        accountSASServices.queue = true;
        break;
      case "t":
        accountSASServices.table = true;
        break;
      default:
        throw new RangeError(`Invalid service character: ${c}`);
    }
  }

  return accountSASServices;
}

/**
 * Converts the given services to a string.
 *
 */
export function accountSASServicesToString(services: AccountSASServices = { table: true }): string {
  const servicesString: string[] = [];
  if (services.blob) {
    servicesString.push("b");
  }
  if (services.table) {
    servicesString.push("t");
  }
  if (services.queue) {
    servicesString.push("q");
  }
  if (services.file) {
    servicesString.push("f");
  }
  return servicesString.join("");
}
/**
 * Services that the SAS token can access
 */
export interface AccountSASServices {
  /**
   * Permission to access blob resources granted.
   */
  blob?: boolean;

  /**
   * Permission to access file resources granted.
   */
  file?: boolean;

  /**
   * Permission to access queue resources granted.
   */

  queue?: boolean;
  /**
   * Permission to access table resources granted.
   */
  table?: boolean;
}
