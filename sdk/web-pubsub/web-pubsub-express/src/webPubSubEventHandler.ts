// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express-serve-static-core";

import { CloudEventsDispatcher } from "./cloudEventsDispatcher";
import { WebPubSubEventHandlerOptions } from "./cloudEventsProtocols";

/**
 * The handler to handle incoming CloudEvents messages
 */
export class WebPubSubEventHandler {
  /**
   * The path this CloudEvents handler listens to
   */
  public readonly path: string;

  private _cloudEventsHandler: CloudEventsDispatcher;

  /**
   * Creates an instance of a WebPubSubEventHandler for handling incoming CloudEvents messages.
   *
   * Example usage:
   * ```ts
   * import express from "express";
   * import { WebPubSubEventHandler } from "@azure/web-pubsub-express";
   * const endpoint = "https://xxxx.webpubsubdev.azure.com"
   * const handler = new WebPubSubEventHandler('chat', [ endpoint ] {
   *   handleConnect: (req, res) => {
   *     console.log(JSON.stringify(req));
   *     return {};
   *   },
   *   onConnected: req => {
   *     console.log(JSON.stringify(req));
   *   },
   *   handleUserEvent: (req, res) => {
   *     console.log(JSON.stringify(req));
   *     res.success("Hey " + req.data, req.dataType);
   *    };
   *  },
   * });
   * ```
   *
   * @param hub - The name of the hub to listen to
   * @param allowedEndpoints - The allowed endpoints for the incoming CloudEvents request
   * @param options - Options to configure the event handler
   */
  constructor(
    private hub: string,
    allowedEndpoints: string[],
    options?: WebPubSubEventHandlerOptions
  ) {
    const path = (options?.path ?? `/api/webpubsub/hubs/${hub}/`).toLowerCase();
    this.path = path.endsWith("/") ? path : path + "/";
    this._cloudEventsHandler = new CloudEventsDispatcher(this.hub, allowedEndpoints, options);
  }

  /**
   * Get the middleware to process the CloudEvents requests
   */
  public getMiddleware(): express.RequestHandler {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): Promise<void> => {
      // Request originalUrl can contain query while baseUrl + path not
      let requestUrl = (req.baseUrl + req.path).toLowerCase();

      // normalize the Url
      requestUrl = requestUrl.endsWith("/") ? requestUrl : requestUrl + "/";
      if (requestUrl.startsWith(this.path)) {
        if (req.method === "OPTIONS") {
          if (this._cloudEventsHandler.processValidateRequest(req, res)) {
            return;
          }
        } else if (req.method === "POST") {
          try {
            if (await this._cloudEventsHandler.processRequest(req, res)) {
              return;
            }
          } catch (err) {
            next(err);
            return;
          }
        }
      }

      next();
    };
  }
}
