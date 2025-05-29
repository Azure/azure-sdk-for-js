"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPubSubEventHandler = void 0;
const cloudEventsDispatcher_js_1 = require("./cloudEventsDispatcher.js");
/**
 * The handler to handle incoming CloudEvents messages
 */
class WebPubSubEventHandler {
    /**
     * Creates an instance of a WebPubSubEventHandler for handling incoming CloudEvents messages.
     *
     * Example usage:
     * ```ts snippet:WebPubSubEventHandlerHandleMessages
     * import { WebPubSubEventHandler } from "@azure/web-pubsub-express";
     *
     * const endpoint = "https://xxxx.webpubsubdev.azure.com";
     * const handler = new WebPubSubEventHandler("chat", {
     *   handleConnect: (req, res) => {
     *     console.log(JSON.stringify(req));
     *     return {};
     *   },
     *   onConnected: (req) => {
     *     console.log(JSON.stringify(req));
     *   },
     *   handleUserEvent: (req, res) => {
     *     console.log(JSON.stringify(req));
     *     res.success("Hey " + req.data, req.dataType);
     *   },
     *   allowedEndpoints: [endpoint],
     * });
     * ```
     *
     * @param hub - The name of the hub to listen to
     * @param options - Options to configure the event handler
     */
    constructor(hub, options) {
        var _a;
        this.hub = hub;
        const path = ((_a = options === null || options === void 0 ? void 0 : options.path) !== null && _a !== void 0 ? _a : `/api/webpubsub/hubs/${hub}/`).toLowerCase();
        this.path = path.endsWith("/") ? path : path + "/";
        this._cloudEventsHandler = new cloudEventsDispatcher_js_1.CloudEventsDispatcher(this.hub, options);
    }
    /**
     * Get the middleware to process the CloudEvents requests
     */
    getMiddleware() {
        return async (req, res, next) => {
            // Request originalUrl can contain query while baseUrl + path not
            let requestUrl = (req.baseUrl + req.path).toLowerCase();
            // normalize the Url
            requestUrl = requestUrl.endsWith("/") ? requestUrl : requestUrl + "/";
            if (requestUrl.startsWith(this.path)) {
                if (req.method === "OPTIONS") {
                    if (this._cloudEventsHandler.handlePreflight(req, res)) {
                        return;
                    }
                }
                else if (req.method === "POST") {
                    try {
                        if (await this._cloudEventsHandler.handleRequest(req, res)) {
                            return;
                        }
                    }
                    catch (err) {
                        next(err);
                        return;
                    }
                }
            }
            next();
        };
    }
}
exports.WebPubSubEventHandler = WebPubSubEventHandler;
//# sourceMappingURL=webPubSubEventHandler.js.map