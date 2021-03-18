// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URL } from "url";
import { CloudEventsDispatcher, WebPubSubEventHandler } from "./webPubSubCloudEventsDispatcher";
import { IncomingMessage, ServerResponse } from "http";
import express from "express";

/**
 * The options for the CloudEvents handler
 */
export interface WebPubSubEventHandlerOptions extends WebPubSubEventHandler {
  /**
   * Custom serving path for the path of the CloudEvents handler
   */
  path?: string;

  /**
   * Configures if you'd like to dump the incoming HTTP request
   */
  dumpRequest?: boolean;
}

/**
 * The handler to handle incoming CloudEvents messages
 */
export class WebPubSubCloudEventsHandler {
  /**
   * The path this CloudEvents handler listens to
   */
  public readonly path: string;

  private _cloudEventsHandler: CloudEventsDispatcher;

  private _allowedOrigins: string[];

  /**
   * Creates an instance of a WebPubSubCloudEventsHandler for handling incoming CloudEvents messages.
   *
   * Example usage:
   * ```ts
   * import express from "express";
   * import { WebPubSubCloudEventsHandler } from "@azure/web-pubsub-express";
   * const endpoint = "https://xxxx.webpubsubdev.azure.com"
   * const handler = new WebPubSubCloudEventsHandler('chat', [ endpoint ] {
   *   onConnect: async connectRequest => {
   *     console.log(JSON.stringify(connectRequest));
   *     return {};
   *   },
   *   onConnected: async connectedRequest => {
   *     console.log(JSON.stringify(connectedRequest));
   *   },
   *   onUserEvent: async userRequest => {
   *     console.log(JSON.stringify(userRequest));
   *     return {
   *      payload: {
   *        data: "Hey " + userRequest.payload.data,
   *        dataType: userRequest.payload.dataType
   *      }
   *    };
   *  },
   * });
   * ```
   *
   * @param hub The name of the hub to listen to
   * @param allowedEndpoints The allowed endpoints for the incoming CloudEvents request
   * @param options Options to configure the event handler
   */
  constructor(
    private hub: string,
    allowedEndpoints: string[],
    options?: WebPubSubEventHandlerOptions
  ) {
    const path = options?.path ?? `/api/webpubsub/hubs/${hub}`;
    this.path = path.endsWith("/") ? path : path + "/";
    this._allowedOrigins = allowedEndpoints.map((endpoint) => new URL(endpoint).host);

    this._cloudEventsHandler = new CloudEventsDispatcher(this.hub, options, options?.dumpRequest);
  }

  /**
   * Get the middleware to be used in express
   */
  public getMiddleware(): express.Router {
    const router = express.Router();
    router.options(this.path, this.handleAbuseProtectionRequests);
    router.post(this.path, this._cloudEventsHandler.processRequest);
    return router;
  }

  private handleAbuseProtectionRequests(
    request: IncomingMessage,
    response: ServerResponse
  ): boolean {
    if (request.headers["webhook-request-origin"]) {
      response.setHeader("WebHook-Allowed-Origin", this._allowedOrigins);
    } else {
      console.log(`Invalid abuse protection request ${request}`);
      response.statusCode = 400;
    }
    response.end();
    return true;
  }
}
