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
  WebPubSubEventHandlerOptions
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
    const origin = this.getSingleHeader(request, "webhook-request-origin");
    if (origin === undefined) {
      return false;
    }

    const eventType = this.tryGetWebPubSubEvent(request);
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
        console.warn(`Unknown EventType ${eventType}`);
        return false;
    }

    const eventRequest = await this.convertHttpToEvent(request);
    const receivedEvent = HTTP.toEvent(eventRequest);

    if (this._dumpRequest) {
      console.log(receivedEvent);
    }

    switch (eventType) {
      case EventType.Connect: {
        const connectRequest = receivedEvent.data as ConnectRequest;
        connectRequest.context = this.GetContext(receivedEvent, origin);
        this.eventHandler.handleConnect!(connectRequest, {
          success(res?: ConnectResponse): void {
            response.statusCode = 200;
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
        });
        return true;
      }
      case EventType.Connected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const connectedRequest = receivedEvent.data as ConnectedRequest;
        connectedRequest.context = this.GetContext(receivedEvent, origin);
        this.eventHandler.onConnected!(connectedRequest);
        return true;
      }
      case EventType.Disconnected: {
        // for unblocking events, we responds to the service as early as possible
        response.end();
        const disconnectedRequest = receivedEvent.data as DisconnectedRequest;
        disconnectedRequest.context = this.GetContext(receivedEvent, origin);
        this.eventHandler.onDisconnected!(disconnectedRequest);
        return true;
      }
      case EventType.UserEvent: {
        let userRequest: UserEventRequest;
        if (receivedEvent.data_base64 !== undefined) {
          userRequest = {
            context: this.GetContext(receivedEvent, origin),
            data: Buffer.from(receivedEvent.data_base64, "base64"),
            dataType: "binary"
          }
        }
        else if (receivedEvent.data !== undefined) {
          userRequest = {
            context: this.GetContext(receivedEvent, origin),
            data: receivedEvent.data as string,
            dataType: receivedEvent.datacontenttype?.startsWith("application/json;") ? "json" : "text"
          }
        } else {
          throw new Error("Unexpected data.");
        }

        this.eventHandler.handleUserEvent!(userRequest, {
          success(data?: string | ArrayBuffer, dataType?: "binary" | "text" | "json"): void {
            response.statusCode = 200;
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
        });
        return true;
      }
      default:
        console.warn(`Unknown EventType ${eventType}`);
        return false;
    }
  }

  private tryGetWebPubSubEvent(req: IncomingMessage): EventType | undefined {
    // check ce-type to see if it is a valid WebPubSub CloudEvent request
    const prefix = "azure.webpubsub.";
    const connect = "azure.webpubsub.sys.connect";
    const connected = "azure.webpubsub.sys.connected";
    const disconnectd = "azure.webpubsub.sys.disconnected";
    const userPrefix = "azure.webpubsub.user.";
    const type = this.getSingleHeader(req, "ce-type");
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

  private getSingleHeader(req: IncomingMessage, key: string): string | undefined {
    const value = req.headers[key];
    if (value === undefined) {
      return undefined;
    }

    if (typeof value === "string") {
      return value;
    }

    return value[0];
  }

  private GetContext(ce: CloudEvent, origin: string): ConnectionContext {
    const context = {
      signature: ce["signature"] as string,
      userId: ce["userid"] as string,
      hub: ce["hub"] as string,
      connectionId: ce["connectionid"] as string,
      eventName: ce["eventname"] as string,
      origin: origin
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
    return new Promise(function (resolve, reject) {
      const chunks: any = [];
      req.on("data", function (chunk) {
        chunks.push(chunk);
      });
      req.on("end", function () {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString());
      });
      // reject on request error
      req.on("error", function (err) {
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
