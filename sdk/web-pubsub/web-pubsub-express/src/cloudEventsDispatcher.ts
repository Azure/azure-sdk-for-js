// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as utils from "./utils.js";
import type { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";
import { logger } from "./logger.js";

import type {
  ConnectRequest,
  ConnectResponse,
  ConnectedRequest,
  ConnectionContext,
  ConnectResponseHandler,
  DisconnectedRequest,
  UserEventRequest,
  UserEventResponseHandler,
  WebPubSubEventHandlerOptions,
  MqttConnectRequest,
  MqttConnectErrorResponse,
  MqttConnectionContextProperties,
  ConnectErrorResponse,
  MqttDisconnectedRequest,
} from "./cloudEventsProtocols.js";
import { MqttV311ConnectReturnCode } from "./enum/MqttErrorCodes/mqttV311ConnectReturnCode.js";
import { MqttV500ConnectReasonCode } from "./enum/MqttErrorCodes/mqttV500ConnectReasonCode.js";

enum EventType {
  Connect,
  Connected,
  Disconnected,
  UserEvent,
}

function getConnectResponseHandler(
  connectRequest: ConnectRequest,
  response: ServerResponse,
): ConnectResponseHandler {
  const states: Record<string, any> = connectRequest.context.states;
  let modified = false;
  const handler = {
    setState(name: string, value: unknown): void {
      states[name] = value;
      modified = true;
    },
    success(res?: ConnectResponse): void {
      if (modified) {
        response.setHeader("ce-connectionState", utils.toBase64JsonString(states));
      }
      if (res === undefined) {
        response.statusCode = 204;
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(res));
      }
    },
    fail(code: 400 | 401 | 500, detail?: string): void {
      handleConnectErrorResponse(connectRequest, response, code, detail);
    },
    failWith(res: ConnectErrorResponse | MqttConnectErrorResponse) {
      if ("mqtt" in res) {
        response.statusCode = getStatusCodeFromMqttConnectCode(res.mqtt.code);
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(res));
      } else {
        handleConnectErrorResponse(connectRequest, response, res.code, res.detail);
      }
    },
  };

  return handler;
}

function getUserEventResponseHandler(
  userRequest: UserEventRequest,
  response: ServerResponse,
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
  const baseContext: ConnectionContext = {
    signature: utils.getHttpHeader(request, "ce-signature")!,
    userId: utils.getHttpHeader(request, "ce-userid"),
    hub: utils.getHttpHeader(request, "ce-hub")!,
    connectionId: utils.getHttpHeader(request, "ce-connectionid")!,
    eventName: utils.getHttpHeader(request, "ce-eventname")!,
    origin: origin,
    states: utils.fromBase64JsonString(utils.getHttpHeader(request, "ce-connectionstate")),
    clientProtocol: "default",
  };

  if (isMqttRequest(request)) {
    const mqttProperties: MqttConnectionContextProperties = {
      physicalConnectionId: utils.getHttpHeader(request, "ce-physicalConnectionId")!,
      sessionId: utils.getHttpHeader(request, "ce-sessionId"),
    };
    return {
      ...baseContext,
      clientProtocol: "mqtt",
      mqtt: mqttProperties,
    };
  } else {
    return baseContext;
  }
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

function getStatusCodeFromMqttConnectCode(
  mqttConnectCode: MqttV311ConnectReturnCode | MqttV500ConnectReasonCode,
): number {
  if (mqttConnectCode < 0x80) {
    switch (mqttConnectCode) {
      case MqttV311ConnectReturnCode.UnacceptableProtocolVersion:
      case MqttV311ConnectReturnCode.IdentifierRejected:
        return 400; // BadRequest
      case MqttV311ConnectReturnCode.ServerUnavailable:
        return 503; // ServiceUnavailable
      case MqttV311ConnectReturnCode.BadUsernameOrPassword:
      case MqttV311ConnectReturnCode.NotAuthorized:
        return 401; // Unauthorized
      default:
        logger.warning(`Invalid MQTT connect return code: ${mqttConnectCode}.`);
        return 500; // InternalServerError
    }
  } else {
    switch (mqttConnectCode) {
      case MqttV500ConnectReasonCode.NotAuthorized:
      case MqttV500ConnectReasonCode.BadUserNameOrPassword:
        return 401; // Unauthorized
      case MqttV500ConnectReasonCode.ClientIdentifierNotValid:
      case MqttV500ConnectReasonCode.MalformedPacket:
      case MqttV500ConnectReasonCode.UnsupportedProtocolVersion:
      case MqttV500ConnectReasonCode.BadAuthenticationMethod:
      case MqttV500ConnectReasonCode.TopicNameInvalid:
      case MqttV500ConnectReasonCode.PayloadFormatInvalid:
      case MqttV500ConnectReasonCode.ImplementationSpecificError:
      case MqttV500ConnectReasonCode.PacketTooLarge:
      case MqttV500ConnectReasonCode.RetainNotSupported:
      case MqttV500ConnectReasonCode.QosNotSupported:
        return 400; // BadRequest
      case MqttV500ConnectReasonCode.QuotaExceeded:
      case MqttV500ConnectReasonCode.ConnectionRateExceeded:
        return 429; // TooManyRequests
      case MqttV500ConnectReasonCode.Banned:
        return 403; // Forbidden
      case MqttV500ConnectReasonCode.UseAnotherServer:
      case MqttV500ConnectReasonCode.ServerMoved:
      case MqttV500ConnectReasonCode.ServerUnavailable:
      case MqttV500ConnectReasonCode.ServerBusy:
      case MqttV500ConnectReasonCode.UnspecifiedError:
        return 500; // InternalServerError
      default:
        logger.warning(`Invalid MQTT connect return code: ${mqttConnectCode}.`);
        return 500; // InternalServerError
    }
  }
}

function getMqttConnectCodeFromStatusCode(
  statusCode: 400 | 401 | 500,
  protocolVersion: number,
): MqttV311ConnectReturnCode | MqttV500ConnectReasonCode {
  if (protocolVersion === 4) {
    switch (statusCode) {
      case 400:
        return MqttV311ConnectReturnCode.BadUsernameOrPassword;
      case 401:
        return MqttV311ConnectReturnCode.NotAuthorized;
      case 500:
        return MqttV311ConnectReturnCode.ServerUnavailable;
      default:
        logger.warning(`Unsupported HTTP Status Code: ${statusCode}.`);
        return MqttV311ConnectReturnCode.ServerUnavailable;
    }
  } else if (protocolVersion === 5) {
    switch (statusCode) {
      case 400:
        return MqttV500ConnectReasonCode.BadUserNameOrPassword;
      case 401:
        return MqttV500ConnectReasonCode.NotAuthorized;
      case 500:
        return MqttV500ConnectReasonCode.UnspecifiedError;
      default:
        logger.warning(`Unsupported HTTP Status Code: ${statusCode}.`);
        return MqttV500ConnectReasonCode.UnspecifiedError;
    }
  } else {
    logger.warning(`Invalid MQTT protocol version: ${protocolVersion}.`);
    return MqttV311ConnectReturnCode.UnacceptableProtocolVersion;
  }
}

function handleConnectErrorResponse(
  connectRequest: ConnectRequest,
  response: ServerResponse,
  code: 400 | 401 | 500,
  detail?: string,
): void {
  const isMqttReq = connectRequest.context.clientProtocol === "mqtt";
  if (isMqttReq) {
    const protocolVersion = (connectRequest as MqttConnectRequest).mqtt.protocolVersion;
    const mqttErrorResponse: MqttConnectErrorResponse = {
      mqtt: {
        code: getMqttConnectCodeFromStatusCode(code, protocolVersion),
        reason: detail,
      },
    };
    response.statusCode = code;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify(mqttErrorResponse));
  } else {
    response.statusCode = code;
    response.end(detail ?? "");
  }
}

function isWebPubSubRequest(req: IncomingMessage): boolean {
  return utils.getHttpHeader(req, "ce-awpsversion") !== undefined;
}

function isMqttRequest(req: IncomingMessage): boolean {
  const subprotocol = utils.getHttpHeader(req, "ce-subprotocol");
  const physicalConnectionId = utils.getHttpHeader(req, "ce-physicalConnectionId");
  return (
    subprotocol !== undefined &&
    subprotocol.toLowerCase().includes("mqtt") &&
    physicalConnectionId !== undefined
  );
}

async function readUserEventRequest(
  request: IncomingMessage,
  origin: string,
): Promise<UserEventRequest | undefined> {
  const contentTypeheader = utils.getHttpHeader(request, "content-type");
  if (contentTypeheader === undefined) {
    return undefined;
  }

  const contentType = contentTypeheader.split(";")[0].trim();

  switch (contentType) {
    case "application/octet-stream":
      return {
        context: getContext(request, origin),
        data: (await utils.readRequestBody(request)) as any,
        dataType: "binary",
      };
    case "application/json":
      return {
        context: getContext(request, origin),
        data: JSON.parse((await utils.readRequestBody(request)).toString()),
        dataType: "json",
      };
    case "text/plain":
      return {
        context: getContext(request, origin),
        data: (await utils.readRequestBody(request)).toString(),
        dataType: "text",
      };
    default:
      return undefined;
  }
}

async function readSystemEventRequest<T extends { context: ConnectionContext }>(
  request: IncomingMessage,
  origin: string,
): Promise<T> {
  const body = (await utils.readRequestBody(request)).toString();
  const parsedRequest = JSON.parse(body) as T;
  parsedRequest.context = getContext(request, origin);
  return parsedRequest;
}

/**
 * @internal
 */
export class CloudEventsDispatcher {
  private readonly _allowAll: boolean = true;
  private readonly _allowedOrigins: Array<string> = [];
  constructor(
    private hub: string,
    private eventHandler?: WebPubSubEventHandlerOptions,
  ) {
    if (Array.isArray(eventHandler)) {
      throw new Error("Unexpected WebPubSubEventHandlerOptions");
    }
    if (eventHandler?.allowedEndpoints !== undefined) {
      this._allowedOrigins = eventHandler.allowedEndpoints.map((endpoint) =>
        new URL(endpoint).host.toLowerCase(),
      );
      this._allowAll = false;
    }
  }

  public handlePreflight(req: IncomingMessage, res: ServerResponse): boolean {
    if (!isWebPubSubRequest(req)) {
      return false;
    }
    const origin = utils.getHttpHeader(req, "webhook-request-origin");

    if (origin === undefined) {
      logger.warning("Expecting webhook-request-origin header.");
      res.statusCode = 400;
    } else if (this._allowAll) {
      res.setHeader("WebHook-Allowed-Origin", "*");
    } else {
      // service to do the check
      res.setHeader("WebHook-Allowed-Origin", this._allowedOrigins);
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
    if (hub?.toUpperCase() !== this.hub.toUpperCase()) {
      return false;
    }

    const isMqtt = isMqttRequest(request);
    // No need to read body if handler is not specified
    switch (eventType) {
      case EventType.Connect:
        if (!this.eventHandler?.handleConnect) {
          if (isMqtt) response.statusCode = 204;
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
        const connectRequest = isMqtt
          ? await readSystemEventRequest<MqttConnectRequest>(request, origin)
          : await readSystemEventRequest<ConnectRequest>(request, origin);
        // service passes out query property, assign it to queries
        connectRequest.queries = connectRequest.query;
        logger.verbose(connectRequest);
        this.eventHandler.handleConnect!(
          connectRequest,
          getConnectResponseHandler(connectRequest, response),
        );
        return true;
      }
      case EventType.Connected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const connectedRequest = await readSystemEventRequest<ConnectedRequest>(request, origin);
        logger.verbose(connectedRequest);
        this.eventHandler.onConnected!(connectedRequest);
        return true;
      }
      case EventType.Disconnected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const disconnectedRequest = isMqtt
          ? await readSystemEventRequest<MqttDisconnectedRequest>(request, origin)
          : await readSystemEventRequest<DisconnectedRequest>(request, origin);
        logger.verbose(disconnectedRequest);
        this.eventHandler.onDisconnected!(disconnectedRequest);
        return true;
      }
      case EventType.UserEvent: {
        const userRequest = await readUserEventRequest(request, origin);
        if (userRequest === undefined) {
          logger.warning(
            `Unsupported content type ${utils.getHttpHeader(request, "content-type")}`,
          );
          return false;
        }
        logger.verbose(userRequest);
        this.eventHandler.handleUserEvent!(
          userRequest,
          getUserEventResponseHandler(userRequest, response),
        );
        return true;
      }
      default:
        logger.warning(`Unknown EventType ${eventType}`);
        return false;
    }
  }
}
