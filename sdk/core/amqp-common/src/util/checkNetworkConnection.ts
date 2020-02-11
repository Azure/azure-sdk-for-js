// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { resolve, CONNREFUSED, TIMEOUT } from "dns";
import * as log from "../log";

/**
 * Checks whether a network connection is detected.
 * @ignore
 * @internal
 */
export function checkNetworkConnection(host: string): Promise<boolean> {
  return new Promise((res) => {
    log.retry("Calling dns.resolve to determine network connection status.");
    resolve(host, function(err: any): void {
      if (err) {
        log.retry(
          "Error thrown from dns.resolve in network connection check: '%s', %O",
          err.code || err.name,
          err
        );
        // List of possible DNS error codes: https://nodejs.org/dist/latest-v12.x/docs/api/dns.html#dns_error_codes
        // Only when dns.resolve returns an error we expect to see when the network is down, resolve as 'false'.
        if (err.code === CONNREFUSED || err.code === TIMEOUT) {
          return res(false);
        }
      } else {
        log.retry("Successfully resolved host via dns.resolve in network connection check.");
      }

      return res(true);
    });
  });
}
