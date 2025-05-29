import type express from "express-serve-static-core";
import type { WebPubSubEventHandlerOptions } from "./cloudEventsProtocols.js";
/**
 * The handler to handle incoming CloudEvents messages
 */
export declare class WebPubSubEventHandler {
    private hub;
    /**
     * The path this CloudEvents handler listens to
     */
    readonly path: string;
    private _cloudEventsHandler;
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
    constructor(hub: string, options?: WebPubSubEventHandlerOptions);
    /**
     * Get the middleware to process the CloudEvents requests
     */
    getMiddleware(): express.RequestHandler;
}
//# sourceMappingURL=webPubSubEventHandler.d.ts.map