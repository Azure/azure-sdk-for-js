"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNetworkConnection = checkNetworkConnection;
const node_dns_1 = require("node:dns");
const log_js_1 = require("../log.js");
/**
 * Checks whether a network connection is detected.
 * @internal
 */
function checkNetworkConnection(host) {
    return new Promise((resolve) => {
        log_js_1.logger.verbose("Calling dns.resolve to determine network connection status.");
        (0, node_dns_1.resolve)(host, function (err) {
            if (err) {
                log_js_1.logger.verbose("Error thrown from dns.resolve in network connection check: '%s', %O", err.code || err.name, err);
                // List of possible DNS error codes: https://nodejs.org/dist/latest-v12.x/docs/api/dns.html#dns_error_codes
                // We only resolve with `false` when dnsResolve fails with an error we expect to see when the network is down.
                if (err.code === node_dns_1.CONNREFUSED || err.code === node_dns_1.TIMEOUT) {
                    return resolve(false);
                }
            }
            else {
                log_js_1.logger.verbose("Successfully resolved host via dns.resolve in network connection check.");
            }
            return resolve(true);
        });
    });
}
//# sourceMappingURL=checkNetworkConnection.js.map