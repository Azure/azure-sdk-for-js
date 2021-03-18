// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CloudEvent, Message, HTTP } from "cloudevents";
import { IncomingMessage, ServerResponse } from "http";
import { decode } from "typescript-base64-arraybuffer";
import {
  ConnectRequest,
  ConnectResponse,
  UserEventRequest,
  UserEventResponse,
  DisconnectedRequest,
  ConnectedRequest,
  ConnectionContext,
  ErrorCode,
  PayloadDataType
} from "./webPubSubCloudEventsProtocols";

/**
 * Options to define the event handlers for each event
 */
export interface WebPubSubEventHandler {
  onConnect?: (r: ConnectRequest) => Promise<ConnectResponse>;
  onUserEvent?: (r: UserEventRequest) => Promise<UserEventResponse>;
  onConnected?: (r: ConnectedRequest) => Promise<void>;
  onDisconnected?: (r: DisconnectedRequest) => Promise<void>;
}

export class CloudEventsDispatcher {
  constructor(
    private hub: string,
    private eventHandler?: WebPubSubEventHandler,
    private dumpRequest?: boolean
  ) {}

  public async processRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
    if (!this.eventHandler) {
      response.end();
      return;
    }
    try {
      var eventRequest = await this.convertHttpToEvent(request);
      var eventResponse = await this.getResponse(eventRequest);
      if (!eventResponse) {
        // we consider no response as 200 valid response
        response.end();
        return;
      }
      if (eventResponse.error) {
        switch (eventResponse.error.code) {
          case ErrorCode.userError:
            response.statusCode = 400;
            break;
          case ErrorCode.unauthorized:
            response.statusCode = 401;
            break;
          default:
            response.statusCode = 500;
            break;
        }
        response.end(eventResponse.error.detail ?? "");
        return;
      }

      if (eventResponse?.payload) {
        if (eventResponse.payload.dataType === PayloadDataType.binary) {
          response.setHeader("Content-Type", "application/octet-stream");
        } else if (eventResponse.payload.dataType === PayloadDataType.json) {
          response.setHeader("Content-Type", "application/json");
        } else {
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
        }
        response.end(eventResponse.payload?.data ?? "");
      }
    } catch (err) {
      console.error(`Error processing request ${request}: ${err}`);
      response.statusCode = 500;
      response.end(err.message);
    }
  }

  private async getResponse(request: Message): Promise<UserEventResponse | undefined> {
    const receivedEvent = HTTP.toEvent(request);

    if (this.dumpRequest === true) {
      console.log(receivedEvent);
    }

    var type = receivedEvent.type.toLowerCase();
    var context = this.GetContext(receivedEvent, request.headers.host!);
    if (context.hub !== this.hub) {
      // it is possible when multiple hubs share the same handler
      console.info(
        `Incoming request is for hub '${this.hub}' while the incoming request is for hub '${context.hub}'`
      );
      return;
    }

    // TODO: valid request is a valid cloud event with WebPubSub extension
    if (type === "azure.webpubsub.sys.connect") {
      if (!this.eventHandler?.onConnect) {
        // 401 if onConnect is not configured
        return {
          error: {
            code: ErrorCode.unauthorized
          }
        };
      }
      var connectRequest = receivedEvent.data as ConnectRequest;
      if (!connectRequest) {
        throw new Error("Data is expected");
      }

      connectRequest.context = context;
      var connectResponse = await this.eventHandler.onConnect(connectRequest);
      if (connectRequest) {
        return {
          payload: {
            data: JSON.stringify(connectResponse),
            dataType: PayloadDataType.json
          }
        };
      } else {
        // what is the differnce between not configure and not return? there is no such definition in C#..
        // 401 if onConnect is not configured
        return {
          error: {
            code: ErrorCode.unauthorized
          }
        };
      }
    } else if (type === "azure.webpubsub.sys.connected") {
      if (!this.eventHandler?.onConnected) {
        return;
      }

      var connectedRequest = receivedEvent.data as ConnectedRequest;
      if (!connectedRequest) {
        throw new Error("Data is expected");
      }

      connectedRequest.context = context;
      this.eventHandler.onConnected(connectedRequest);
    } else if (type === "azure.webpubsub.sys.disconnected") {
      if (!this.eventHandler?.onDisconnected) {
        return;
      }

      var disconnectedRequest = receivedEvent.data as DisconnectedRequest;
      if (!disconnectedRequest) {
        throw new Error("Data is expected");
      }

      disconnectedRequest.context = context;
      this.eventHandler.onDisconnected(disconnectedRequest);
    } else if (type.startsWith("azure.webpubsub.user")) {
      if (!this.eventHandler?.onUserEvent) {
        return;
      }
      var data: ArrayBuffer | string;
      var dataType = PayloadDataType.binary;
      if (receivedEvent.data) {
        data = receivedEvent.data as string;
        dataType =
          receivedEvent.datacontenttype === "application/json"
            ? PayloadDataType.json
            : PayloadDataType.text;
      } else if (receivedEvent.data_base64) {
        data = decode(receivedEvent.data_base64);
      } else {
        throw new Error("empty data payload");
      }
      var userRequest: UserEventRequest = {
        context: context,
        payload: {
          data: data,
          dataType: dataType
        }
      };

      if (!userRequest) {
        throw new Error("Data is expected");
      }

      userRequest.context = context;
      return await this.eventHandler.onUserEvent(userRequest);
    } else {
      throw new Error("Not supported event: " + type);
    }
    return;
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
