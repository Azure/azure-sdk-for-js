// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HTTP } from "cloudevents";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

import * as utils from "./utils";
import { EventType } from "./utils";

import {
  ConnectRequest,
  UserEventRequest,
  DisconnectedRequest,
  ConnectedRequest,
  WebPubSubEventHandlerOptions,
} from "./cloudEventsProtocols";

/**
 * @internal
 */
export class CloudEventsDispatcher {
  private readonly _dumpRequest: boolean;
  private readonly _allowedOrigins: string[];
  constructor(
    private hub: string,
    allowedEndpoints: string[],
    private eventHandler?: WebPubSubEventHandlerOptions
  ) {
    this._dumpRequest = eventHandler?.dumpRequest ?? false;
    this._allowedOrigins = allowedEndpoints.map((endpoint) =>
      endpoint === "*" ? "*" : new URL(endpoint).host
    );
  }

  public processValidateRequest(req: IncomingMessage, res: ServerResponse): boolean {
    if (req.headers["webhook-request-origin"]) {
      res.setHeader("WebHook-Allowed-Origin", this._allowedOrigins);
      res.end();
      return true;
    } else {
      return false;
    }
  }

  public async processRequest(
    request: IncomingMessage,
    response: ServerResponse
  ): Promise<boolean> {
    // check if it is a valid WebPubSub cloud events
    const origin = utils.getHttpHeader(request, "webhook-request-origin");
    if (origin === undefined) {
      return false;
    }

    const eventType = utils.tryGetWebPubSubEvent(request);
    if (eventType === undefined) {
      return false;
    }

    // check if hub matches
    const hub = utils.getHttpHeader(request, "ce-hub");
    if (hub !== this.hub) {
      return false;
    }

    // No need to read body if handler is not specified
    switch (eventType) {
      case EventType.Connect:
        if (!this.eventHandler?.handleConnect) {
          response.statusCode = 401;
          response.end("Connect event handler is not configured.");
          return true;
        }
        break;
      case EventType.Connected:
        if (!this.eventHandler?.onConnected) {
          response.end();
          return true;
        }
        break;
      case EventType.Disconnected:
        if (!this.eventHandler?.onDisconnected) {
          response.end();
          return true;
        }
        break;
      case EventType.UserEvent:
        if (!this.eventHandler?.handleUserEvent) {
          response.end();
          return true;
        }
        break;
      default:
        console.warn(`Unknown EventType ${eventType}`);
        return false;
    }

    const eventRequest = await utils.convertHttpToEvent(request);
    const receivedEvent = HTTP.toEvent(eventRequest);

    if (this._dumpRequest) {
      console.log(receivedEvent);
    }

    switch (eventType) {
      case EventType.Connect: {
        const connectRequest = receivedEvent.data as ConnectRequest;
        connectRequest.context = utils.getContext(receivedEvent, origin);
        this.eventHandler.handleConnect!(
          connectRequest,
          utils.getConnectResponseHandler(connectRequest, response)
        );
        return true;
      }
      case EventType.Connected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const connectedRequest = receivedEvent.data as ConnectedRequest;
        connectedRequest.context = utils.getContext(receivedEvent, origin);
        this.eventHandler.onConnected!(connectedRequest);
        return true;
      }
      case EventType.Disconnected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const disconnectedRequest = receivedEvent.data as DisconnectedRequest;
        disconnectedRequest.context = utils.getContext(receivedEvent, origin);
        this.eventHandler.onDisconnected!(disconnectedRequest);
        return true;
      }
      case EventType.UserEvent: {
        let userRequest: UserEventRequest;
        if (receivedEvent.data_base64 !== undefined) {
          userRequest = {
            context: utils.getContext(receivedEvent, origin),
            data: Buffer.from(receivedEvent.data_base64, "base64"),
            dataType: "binary"
          };
        } else if (receivedEvent.data !== undefined) {
          userRequest = {
            context: utils.getContext(receivedEvent, origin),
            data: receivedEvent.data as string,
            dataType: receivedEvent.datacontenttype?.startsWith("application/json;")
              ? "json"
              : "text"
          };
        } else {
          throw new Error("Unexpected data.");
        }

        this.eventHandler.handleUserEvent!(
          userRequest,
          utils.getUserEventResponseHandler(userRequest, response)
        );
        return true;
      }
      default:
        console.warn(`Unknown EventType ${eventType}`);
        return false;
    }
  }
}
