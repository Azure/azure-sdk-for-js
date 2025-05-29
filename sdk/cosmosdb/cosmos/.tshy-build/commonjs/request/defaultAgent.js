"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHttpAgent = exports.defaultHttpsAgent = void 0;
const https = require("https"); // eslint-disable-line @typescript-eslint/no-require-imports
const tls = require("tls"); // eslint-disable-line @typescript-eslint/no-require-imports
// minVersion only available in Node 10+
if (tls.DEFAULT_MIN_VERSION) {
    exports.defaultHttpsAgent = new https.Agent({
        keepAlive: true,
        minVersion: "TLSv1.2",
    });
}
else {
    // Remove when Node 8 support has been dropped
    exports.defaultHttpsAgent = new https.Agent({
        keepAlive: true,
        secureProtocol: "TLSv1_2_method",
    });
}
const http = require("http"); // eslint-disable-line @typescript-eslint/no-require-imports
/**
 * @internal
 */
exports.defaultHttpAgent = new http.Agent({
    keepAlive: true,
});
//# sourceMappingURL=defaultAgent.js.map