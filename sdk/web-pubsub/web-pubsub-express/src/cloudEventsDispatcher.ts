// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CloudEvent, Message, HTTP } from "cloudevents";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";
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

class DefaultConnectResponseHandler implements ConnectResponseHandler {
  constructor(private response: ServerResponse) {}
  public success(response?: ConnectResponse): void {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json; charset=utf-8");
    this.response.end(JSON.stringify(response));
  }
  public fail(code: 400 | 401 | 500, detail?: string): void {
    this.response.statusCode = code;
    this.response.end(detail ?? "");
  }
}

class DefaultUserEventResponseHandler implements UserEventResponseHandler {
  constructor(private response: ServerResponse) {}
  public success(data?: string | ArrayBuffer, dataType?: "binary" | "text" | "json"): void {
    this.response.statusCode = 200;
    switch (dataType) {
      case "json":
        this.response.setHeader("Content-Type", "application/json; charset=utf-8");
        break;
      case "text":
        this.response.setHeader("Content-Type", "text/plain; charset=utf-8");
        break;
      default:
        this.response.setHeader("Content-Type", "application/octet-stream");
        break;
    }
    this.response.end(data ?? "");
  }
  public fail(code: 400 | 401 | 500, detail?: string): void {
    this.response.statusCode = code;
    this.response.end(detail ?? "");
  }
}

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
    var eventType = this.tryGetWebPubSubEvent(request);
    if (eventType === undefined) {
      return false;
    }

    // check if hub matches
    if (request.headers["ce-hub"] !== this.hub) {
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
        throw new Error(`Unknown EventType ${eventType}`);
    }

    var eventRequest = await this.convertHttpToEvent(request);
    const receivedEvent = HTTP.toEvent(eventRequest);

    if (this._dumpRequest) {
      console.log(receivedEvent);
    }

    switch (eventType) {
      case EventType.Connect: {
        var handler = new DefaultConnectResponseHandler(response);

        var connectRequest = receivedEvent.data as ConnectRequest;
        connectRequest.context = this.GetContext(receivedEvent, request.headers.host!);
        this.eventHandler.handleConnect!(connectRequest, handler);
        return true;
      }
      case EventType.Connected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        var connectedRequest = receivedEvent.data as ConnectedRequest;
        connectedRequest.context = this.GetContext(receivedEvent, request.headers.host!);
        this.eventHandler.onConnected!(connectedRequest);
        return true;
      }
      case EventType.Disconnected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        var disconnectedRequest = receivedEvent.data as DisconnectedRequest;
        disconnectedRequest.context = this.GetContext(receivedEvent, request.headers.host!);
        this.eventHandler.onDisconnected!(disconnectedRequest);
        return true;
      }
      case EventType.UserEvent: {
        var eventHandler = new DefaultUserEventResponseHandler(response);
        var data: ArrayBuffer | string;
        var dataType: "binary" | "text" | "json" = "binary";

        if (receivedEvent.data) {
          data = receivedEvent.data as string;
          dataType = receivedEvent.datacontenttype === "application/json" ? "json" : "text";
        } else if (receivedEvent.data_base64) {
          data = Buffer.from(receivedEvent.data_base64, "base64");
        } else {
          throw new Error("empty data payload");
        }

        var userRequest: UserEventRequest = {
          context: this.GetContext(receivedEvent, request.headers.host!),
          data: data,
          dataType: dataType
        };
        this.eventHandler.handleUserEvent!(userRequest, eventHandler);
        return true;
      }
      default:
        throw new Error(`Unknown EventType ${eventType}`);
    }
  }

  private tryGetWebPubSubEvent(req: IncomingMessage): EventType | undefined {
    // check ce-type to see if it is a valid WebPubSub CloudEvent request
    const prefix = "azure.webpubsub.";
    const connect = "azure.webpubsub.sys.connect";
    const connected = "azure.webpubsub.sys.connected";
    const disconnectd = "azure.webpubsub.sys.disconnected";
    const userPrefix = "azure.webpubsub.user.";
    var type = req.headers["ce-type"];
    if (!type || typeof type !== "string" || !type.startsWith(prefix)) {
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

  private GetContext(ce: CloudEvent, host: string): ConnectionContext {
    var context = {
      signature: ce["signature"] as string,
      userId: ce["userid"] as string,
      hub: ce["hub"] as string,
      connectionId: ce["connectionid"] as string,
      eventName: ce["eventname"] as string,
      host: host
    };

    // TODO: validation
    return context;
  }

  private async convertHttpToEvent(request: IncomingMessage): Promise<Message> {
    const normalized: Message = {
      headers: {},
      body: ""
    };
    if (request.headers) {
      for (const key in request.headers) {
        if (Object.prototype.hasOwnProperty.call(request.headers, key)) {
          const element = request.headers[key];
          if (element === undefined) {
            continue;
          }
          if (typeof element === "string") {
            normalized.headers[key] = element;
          } else {
            normalized.headers[key] = element.join(",");
          }
        }
      }
    }

    normalized.body = await this.readRequestBody(request);
    return normalized;
  }

  private readRequestBody(req: IncomingMessage): Promise<string> {
    return new Promise(function(resolve, reject) {
      var body = "";
      req.on("data", function(chunk) {
        body += chunk;
      });
      req.on("end", function() {
        resolve(body);
      });
      // reject on request error
      req.on("error", function(err) {
        // This is not a "Second reject", just a different sort of failure
        reject(err);
      });
    });
  }
}

enum EventType {
  Connect,
  Connected,
  Disconnected,
  UserEvent
}
