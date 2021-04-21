// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import express from "express";

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
   *   handleConnect: async (req, res) => {
   *     console.log(JSON.stringify(req));
   *     return {};
   *   },
   *   onConnected: async req => {
   *     console.log(JSON.stringify(req));
   *   },
   *   handleUserEvent: async (req, res) => {
   *     console.log(JSON.stringify(req));
   *     res.success("Hey " + req.data, req.dataType);
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
    const path = options?.path ?? `/api/webpubsub/hubs/${hub}/`;
    this.path = path.endsWith("/") ? path : path + "/";
    this._cloudEventsHandler = new CloudEventsDispatcher(this.hub, allowedEndpoints, options);
  }

  /**
   * Get the middleware to be used in express
   */
  public getMiddleware(): express.Router {
    const router = express.Router();
    router.options(this.path, (req, res, next) => {
      if (!this._cloudEventsHandler.processValidateRequest(req, res)) {
        next();
      }
    });
    router.post(this.path, async (req, res, next) => {
      try {
        if (!(await this._cloudEventsHandler.processRequest(req, res))) {
          next();
        }
      } catch (err) {
        next(err);
      }
    });
    return router;
  }
}
