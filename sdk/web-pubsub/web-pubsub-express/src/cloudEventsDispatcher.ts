// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  WebPubSubEventHandlerOptions,
} from "./cloudEventsProtocols";

enum DataType {
  None,
  Binary,
  Json,
  Text,
}

enum EventType {
  Connect,
  Connected,
  Disconnected,
  UserEvent,
}

function getDataType(request: IncomingMessage): DataType {
  const contentTypeheader = utils.getHttpHeader(request, "content-type");
  if (contentTypeheader === undefined) {
    return DataType.None;
  }

  var contentType = contentTypeheader.split(";")[0].trim();
  if (contentType === "application/json") {
    return DataType.Json;
  }
  if (contentType === "application/octet-stream") {
    return DataType.Binary;
  }
  if (contentType === "text/plain") {
    return DataType.Text;
  }

  return DataType.None;
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
    },
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
    },
  };
  return handler;
}

function getContext(request: IncomingMessage, origin: string): ConnectionContext {
  const context = {
    signature: utils.getHttpHeader(request, "ce-signature"),
    userId: utils.getHttpHeader(request, "ce-userid"),
    hub: utils.getHttpHeader(request, "ce-hub")!,
    connectionId: utils.getHttpHeader(request, "ce-connectionid")!,
    eventName: utils.getHttpHeader(request, "ce-eventname")!,
    origin: origin,
    states: utils.fromBase64JsonString(utils.getHttpHeader(request, "ce-connectionstate")),
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

    switch (eventType) {
      case EventType.Connect: {
        const body = (await utils.readRequestBody(request)).toString();
        const connectRequest = JSON.parse(body) as ConnectRequest;
        connectRequest.context = getContext(request, origin);
        logger.verbose(connectRequest);

        this.eventHandler.handleConnect!(
          connectRequest,
          getConnectResponseHandler(connectRequest, response)
        );
        return true;
      }
      case EventType.Connected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const body = (await utils.readRequestBody(request)).toString();
        const connectedRequest = JSON.parse(body) as ConnectedRequest;
        connectedRequest.context = getContext(request, origin);
        logger.verbose(connectedRequest);
        this.eventHandler.onConnected!(connectedRequest);
        return true;
      }
      case EventType.Disconnected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const body = (await utils.readRequestBody(request)).toString();
        const disconnectedRequest = JSON.parse(body) as DisconnectedRequest;
        disconnectedRequest.context = getContext(request, origin);
        logger.verbose(disconnectedRequest);
        this.eventHandler.onDisconnected!(disconnectedRequest);
        return true;
      }
      case EventType.UserEvent: {
        let userRequest: UserEventRequest;
        const dataType = getDataType(request);

        switch (dataType) {
          case DataType.Binary:
            userRequest = {
              context: getContext(request, origin),
              data: await utils.readRequestBody(request),
              dataType: "binary",
            };
            break;
          case DataType.Json:
            userRequest = {
              context: getContext(request, origin),
              data: JSON.parse((await utils.readRequestBody(request)).toString()),
              dataType: "json",
            };
            break;
          case DataType.Text:
            userRequest = {
              context: getContext(request, origin),
              data: (await utils.readRequestBody(request)).toString(),
              dataType: "text",
            };
            break;
          default:
            logger.warning(
              `Unsupported content type ${utils.getHttpHeader(request, "content-type")}`
            );
            return false;
        }
        logger.verbose(userRequest);
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
