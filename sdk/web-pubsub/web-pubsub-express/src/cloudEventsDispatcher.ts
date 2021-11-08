// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HTTP, CloudEvent } from "cloudevents";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
import { logger } from "./logger";
import * as utils from "./utils";

import {
  ConnectRequest,
  ConnectResponse,
  UserEventRequest,
  DisconnectedRequest,
  ConnectedRequest,
  ConnectionContext,
  ConnectResponseHandler,
  UserEventResponseHandler,
  WebPubSubEventHandlerOptions
} from "./cloudEventsProtocols";

enum EventType {
  Connect,
  Connected,
  Disconnected,
  UserEvent
}

function getConnectResponseHandler(
  connectRequest: ConnectRequest,
  response: ServerResponse
): ConnectResponseHandler {
  const states: Record<string, any> = connectRequest.context.states;
  let modified = false;
  const handler = {
    setState(name: string, value: unknown): void {
      states[name] = value;
      modified = true;
    },
    success(res?: ConnectResponse): void {
      response.statusCode = 200;
      if (modified) {
        response.setHeader("ce-connectionState", utils.toBase64JsonString(states));
      }
      if (res === undefined) {
        response.end();
      } else {
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(res));
      }
    },
    fail(code: 400 | 401 | 500, detail?: string): void {
      response.statusCode = code;
      response.end(detail ?? "");
    }
  };

  return handler;
}

function getUserEventResponseHandler(
  userRequest: UserEventRequest,
  response: ServerResponse
): UserEventResponseHandler {
  const states: Record<string, any> = userRequest.context.states;
  let modified = false;
  const handler = {
    setState(name: string, value: unknown): void {
      modified = true;
      states[name] = value;
    },
    success(data?: string | ArrayBuffer, dataType?: "binary" | "text" | "json"): void {
      response.statusCode = 200;
      if (modified) {
        response.setHeader("ce-connectionState", utils.toBase64JsonString(states));
      }

      switch (dataType) {
        case "json":
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          break;
        case "text":
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
          break;
        default:
          response.setHeader("Content-Type", "application/octet-stream");
          break;
      }
      response.end(data ?? "");
    },
    fail(code: 400 | 401 | 500, detail?: string): void {
      response.statusCode = code;
      response.end(detail ?? "");
    }
  };
  return handler;
}

function getContext(ce: CloudEvent, origin: string): ConnectionContext {
  const context = {
    signature: ce["signature"] as string,
    userId: ce["userid"] as string,
    hub: ce["hub"] as string,
    connectionId: ce["connectionid"] as string,
    eventName: ce["eventname"] as string,
    origin: origin,
    states: utils.fromBase64JsonString(ce["connectionstate"] as string)
  };

  // TODO: validation
  return context;
}

function tryGetWebPubSubEvent(req: IncomingMessage): EventType | undefined {
  // check ce-type to see if it is a valid WebPubSub CloudEvent request
  const prefix = "azure.webpubsub.";
  const connect = "azure.webpubsub.sys.connect";
  const connected = "azure.webpubsub.sys.connected";
  const disconnectd = "azure.webpubsub.sys.disconnected";
  const userPrefix = "azure.webpubsub.user.";
  const type = utils.getHttpHeader(req, "ce-type");
  if (!type?.startsWith(prefix)) {
    return undefined;
  }
  if (type.startsWith(userPrefix)) {
    return EventType.UserEvent;
  }
  switch (type) {
    case connect:
      return EventType.Connect;
    case connected:
      return EventType.Connected;
    case disconnectd:
      return EventType.Disconnected;
    default:
      return undefined;
  }
}

function isWebPubSubRequest(req: IncomingMessage): boolean {
  return utils.getHttpHeader(req, "ce-awpsversion") !== undefined;
}

/**
 * @internal
 */
export class CloudEventsDispatcher {
  private readonly _allowAll: boolean = true;
  private readonly _allowedOrigins: Array<string> = [];
  constructor(private hub: string, private eventHandler?: WebPubSubEventHandlerOptions) {
    if (Array.isArray(eventHandler)) {
      throw new Error("Unexpected WebPubSubEventHandlerOptions");
    }
    if (eventHandler?.allowedEndpoints !== undefined) {
      this._allowedOrigins = eventHandler.allowedEndpoints.map((endpoint) =>
        new URL(endpoint).host.toLowerCase()
      );
      this._allowAll = false;
    }
  }

  public handlePreflight(req: IncomingMessage, res: ServerResponse): boolean {
    if (!isWebPubSubRequest(req)) {
      return false;
    }
    const origin = utils.getHttpHeader(req, "webhook-request-origin")?.toLowerCase();

    if (origin === undefined) {
      logger.warning("Expecting webhook-request-origin header.");
      res.statusCode = 400;
    } else if (this._allowAll || this._allowedOrigins.indexOf(origin!) > -1) {
      res.setHeader("WebHook-Allowed-Origin", origin!);
    } else {
      logger.warning("Origin does not match the allowed origins: " + this._allowedOrigins);
      res.statusCode = 400;
    }

    res.end();
    return true;
  }

  public async handleRequest(request: IncomingMessage, response: ServerResponse): Promise<boolean> {
    if (!isWebPubSubRequest(request)) {
      return false;
    }

    // check if it is a valid WebPubSub cloud events
    const origin = utils.getHttpHeader(request, "webhook-request-origin");
    if (origin === undefined) {
      return false;
    }

    const eventType = tryGetWebPubSubEvent(request);
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
          response.end();
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
        logger.warning(`Unknown EventType ${eventType}`);
        return false;
    }

    const eventRequest = await utils.convertHttpToEvent(request);
    const receivedEvent = HTTP.toEvent(eventRequest);

    logger.verbose(receivedEvent);

    switch (eventType) {
      case EventType.Connect: {
        const connectRequest = receivedEvent.data as ConnectRequest;
        connectRequest.context = getContext(receivedEvent, origin);
        this.eventHandler.handleConnect!(
          connectRequest,
          getConnectResponseHandler(connectRequest, response)
        );
        return true;
      }
      case EventType.Connected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const connectedRequest = receivedEvent.data as ConnectedRequest;
        connectedRequest.context = getContext(receivedEvent, origin);
        this.eventHandler.onConnected!(connectedRequest);
        return true;
      }
      case EventType.Disconnected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const disconnectedRequest = receivedEvent.data as DisconnectedRequest;
        disconnectedRequest.context = getContext(receivedEvent, origin);
        this.eventHandler.onDisconnected!(disconnectedRequest);
        return true;
      }
      case EventType.UserEvent: {
        let userRequest: UserEventRequest;
        if (receivedEvent.data_base64 !== undefined) {
          userRequest = {
            context: getContext(receivedEvent, origin),
            data: Buffer.from(receivedEvent.data_base64, "base64"),
            dataType: "binary"
          };
        } else if (receivedEvent.data !== undefined) {
          userRequest = {
            context: getContext(receivedEvent, origin),
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
          getUserEventResponseHandler(userRequest, response)
        );
        return true;
      }
      default:
        logger.warning(`Unknown EventType ${eventType}`);
        return false;
    }
  }
}
