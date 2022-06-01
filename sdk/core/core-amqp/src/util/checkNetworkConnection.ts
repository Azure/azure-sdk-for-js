// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CONNREFUSED, TIMEOUT, resolve as dnsResolve } from "dns";
import { logger } from "../log";

/**
 * Checks whether a network connection is detected.
 * @internal
 */
export function checkNetworkConnection(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    logger.verbose("Calling dns.resolve to determine network connection status.");
    dnsResolve(host, function (err: any): void {
      if (err) {
        logger.verbose(
          "Error thrown from dns.resolve in network connection check: '%s', %O",
          err.code || err.name,
          err
        );
        // List of possible DNS error codes: https://nodejs.org/dist/latest-v12.x/docs/api/dns.html#dns_error_codes
        // We only resolve with `false` when dnsResolve fails with an error we expect to see when the network is down.
        if (err.code === CONNREFUSED || err.code === TIMEOUT) {
          return resolve(false);
        }
      } else {
        logger.verbose("Successfully resolved host via dns.resolve in network connection check.");
      }

      return resolve(true);
    });
  });
}
