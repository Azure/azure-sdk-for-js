import { IncomingMessage, ServerResponse } from "http";
import { CloudEvent, Message } from "cloudevents";

import {
  ConnectRequest,
  ConnectResponse,
  UserEventRequest,
  ConnectionContext,
  ConnectResponseHandler,
  UserEventResponseHandler
} from "./cloudEventsProtocols";

export function toBase64JsonString(obj: any): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

export function fromBase64JsonString(base64String: string): any {
  try {
    let buf = Buffer.from(base64String, "base64").toString();
    let parsed = JSON.parse(buf);
    return parsed;
  } catch (e) {
    console.warn("Unexpected state format:" + e);
    return undefined;
  }
}

export function getHttpHeader(req: IncomingMessage, key: string): string | undefined {
  const value = req.headers[key];
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    return value;
  }

  return value[0];
}

export enum EventType {
  Connect,
  Connected,
  Disconnected,
  UserEvent
}

export function tryGetWebPubSubEvent(req: IncomingMessage): EventType | undefined {
  // check ce-type to see if it is a valid WebPubSub CloudEvent request
  const prefix = "azure.webpubsub.";
  const connect = "azure.webpubsub.sys.connect";
  const connected = "azure.webpubsub.sys.connected";
  const disconnectd = "azure.webpubsub.sys.disconnected";
  const userPrefix = "azure.webpubsub.user.";
  const type = getHttpHeader(req, "ce-type");
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

export function getContext(ce: CloudEvent, origin: string): ConnectionContext {
  const states: Record<string, any> = {};
  const state = ce["connectionstate"] as string;
  if (state !== undefined) {
    const parsed = fromBase64JsonString(state);
    if (parsed !== undefined) {
      for (const key in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, key)) {
          states[key] = parsed[key];
        }
      }
    }
  }

  const context = {
    signature: ce["signature"] as string,
    userId: ce["userid"] as string,
    hub: ce["hub"] as string,
    connectionId: ce["connectionid"] as string,
    eventName: ce["eventname"] as string,
    origin: origin,
    states: states
  };

  // TODO: validation
  return context;
}

export function getConnectResponseHandler(
  connectRequest: ConnectRequest,
  response: ServerResponse
): ConnectResponseHandler {
  let states: Record<string, any> = connectRequest.context.states;
  let modified = false;
  const handler = {
    setState(name: string, value: unknown): ConnectResponseHandler {
      states[name] = value;
      modified = true;
      return handler;
    },
    success(res?: ConnectResponse): void {
      response.statusCode = 200;
      if (modified) {
        response.setHeader("ce-connectionState", toBase64JsonString(states));
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

export function getUserEventResponseHandler(
  userRequest: UserEventRequest,
  response: ServerResponse
): UserEventResponseHandler {
  let states: Record<string, any> = userRequest.context.states;
  let modified = false;
  const handler = {
    setState(name: string, value: unknown): UserEventResponseHandler {
      modified = true;
      states[name] = value;
      return handler;
    },
    success(data?: string | ArrayBuffer, dataType?: "binary" | "text" | "json"): void {
      response.statusCode = 200;
      if (modified) {
        response.setHeader("ce-connectionState", toBase64JsonString(states));
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

export async function convertHttpToEvent(request: IncomingMessage): Promise<Message> {
  const normalized: Message = {
    headers: {},
    body: ""
  };
  if (request.headers) {
    for (const key in request.headers) {
      if (Object.prototype.hasOwnProperty.call(request.headers, key)) {
        const element = request.headers[key];
        if (element !== undefined) {
          normalized.headers[key.toLowerCase()] = element;
        }
      }
    }
  }

  normalized.body = await readRequestBody(request);
  return normalized;
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise(function(resolve, reject) {
    const chunks: any = [];
    req.on("data", function(chunk) {
      chunks.push(chunk);
    });
    req.on("end", function() {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.toString());
    });
    // reject on request error
    req.on("error", function(err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
  });
}
