// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as utils from "./utils.js";
import { URL } from "node:url";
import { logger } from "./logger.js";
import { MqttV311ConnectReturnCode } from "./enum/MqttErrorCodes/mqttV311ConnectReturnCode.js";
import { MqttV500ConnectReasonCode } from "./enum/MqttErrorCodes/mqttV500ConnectReasonCode.js";
var EventType;
(function (EventType) {
    EventType[EventType["Connect"] = 0] = "Connect";
    EventType[EventType["Connected"] = 1] = "Connected";
    EventType[EventType["Disconnected"] = 2] = "Disconnected";
    EventType[EventType["UserEvent"] = 3] = "UserEvent";
})(EventType || (EventType = {}));
function getConnectResponseHandler(connectRequest, response) {
    const states = connectRequest.context.states;
    let modified = false;
    const handler = {
        setState(name, value) {
            states[name] = value;
            modified = true;
        },
        success(res) {
            if (modified) {
                response.setHeader("ce-connectionState", utils.toBase64JsonString(states));
            }
            if (res === undefined) {
                response.statusCode = 204;
                response.end();
            }
            else {
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify(res));
            }
        },
        fail(code, detail) {
            handleConnectErrorResponse(connectRequest, response, code, detail);
        },
        failWith(res) {
            if ("mqtt" in res) {
                response.statusCode = getStatusCodeFromMqttConnectCode(res.mqtt.code);
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify(res));
            }
            else {
                handleConnectErrorResponse(connectRequest, response, res.code, res.detail);
            }
        },
    };
    return handler;
}
function getUserEventResponseHandler(userRequest, response) {
    const states = userRequest.context.states;
    let modified = false;
    const handler = {
        setState(name, value) {
            modified = true;
            states[name] = value;
        },
        success(data, dataType) {
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
            response.end(data !== null && data !== void 0 ? data : "");
        },
        fail(code, detail) {
            response.statusCode = code;
            response.end(detail !== null && detail !== void 0 ? detail : "");
        },
    };
    return handler;
}
function getContext(request, origin) {
    const baseContext = {
        signature: utils.getHttpHeader(request, "ce-signature"),
        userId: utils.getHttpHeader(request, "ce-userid"),
        hub: utils.getHttpHeader(request, "ce-hub"),
        connectionId: utils.getHttpHeader(request, "ce-connectionid"),
        eventName: utils.getHttpHeader(request, "ce-eventname"),
        origin: origin,
        states: utils.fromBase64JsonString(utils.getHttpHeader(request, "ce-connectionstate")),
        clientProtocol: "default",
    };
    if (isMqttRequest(request)) {
        const mqttProperties = {
            physicalConnectionId: utils.getHttpHeader(request, "ce-physicalConnectionId"),
            sessionId: utils.getHttpHeader(request, "ce-sessionId"),
        };
        return Object.assign(Object.assign({}, baseContext), { clientProtocol: "mqtt", mqtt: mqttProperties });
    }
    else {
        return baseContext;
    }
}
function tryGetWebPubSubEvent(req) {
    // check ce-type to see if it is a valid WebPubSub CloudEvent request
    const prefix = "azure.webpubsub.";
    const connect = "azure.webpubsub.sys.connect";
    const connected = "azure.webpubsub.sys.connected";
    const disconnectd = "azure.webpubsub.sys.disconnected";
    const userPrefix = "azure.webpubsub.user.";
    const type = utils.getHttpHeader(req, "ce-type");
    if (!(type === null || type === void 0 ? void 0 : type.startsWith(prefix))) {
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
function getStatusCodeFromMqttConnectCode(mqttConnectCode) {
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
    }
    else {
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
function getMqttConnectCodeFromStatusCode(statusCode, protocolVersion) {
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
    }
    else if (protocolVersion === 5) {
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
    }
    else {
        logger.warning(`Invalid MQTT protocol version: ${protocolVersion}.`);
        return MqttV311ConnectReturnCode.UnacceptableProtocolVersion;
    }
}
function handleConnectErrorResponse(connectRequest, response, code, detail) {
    const isMqttReq = connectRequest.context.clientProtocol === "mqtt";
    if (isMqttReq) {
        const protocolVersion = connectRequest.mqtt.protocolVersion;
        const mqttErrorResponse = {
            mqtt: {
                code: getMqttConnectCodeFromStatusCode(code, protocolVersion),
                reason: detail,
            },
        };
        response.statusCode = code;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(mqttErrorResponse));
    }
    else {
        response.statusCode = code;
        response.end(detail !== null && detail !== void 0 ? detail : "");
    }
}
function isWebPubSubRequest(req) {
    return utils.getHttpHeader(req, "ce-awpsversion") !== undefined;
}
function isMqttRequest(req) {
    const subprotocol = utils.getHttpHeader(req, "ce-subprotocol");
    const physicalConnectionId = utils.getHttpHeader(req, "ce-physicalConnectionId");
    return (subprotocol !== undefined &&
        subprotocol.toLowerCase().includes("mqtt") &&
        physicalConnectionId !== undefined);
}
async function readUserEventRequest(request, origin) {
    const contentTypeheader = utils.getHttpHeader(request, "content-type");
    if (contentTypeheader === undefined) {
        return undefined;
    }
    const contentType = contentTypeheader.split(";")[0].trim();
    switch (contentType) {
        case "application/octet-stream":
            return {
                context: getContext(request, origin),
                data: await utils.readRequestBody(request),
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
async function readSystemEventRequest(request, origin) {
    const body = (await utils.readRequestBody(request)).toString();
    const parsedRequest = JSON.parse(body);
    parsedRequest.context = getContext(request, origin);
    return parsedRequest;
}
/**
 * @internal
 */
export class CloudEventsDispatcher {
    constructor(hub, eventHandler) {
        this.hub = hub;
        this.eventHandler = eventHandler;
        this._allowAll = true;
        this._allowedOrigins = [];
        if (Array.isArray(eventHandler)) {
            throw new Error("Unexpected WebPubSubEventHandlerOptions");
        }
        if ((eventHandler === null || eventHandler === void 0 ? void 0 : eventHandler.allowedEndpoints) !== undefined) {
            this._allowedOrigins = eventHandler.allowedEndpoints.map((endpoint) => new URL(endpoint).host.toLowerCase());
            this._allowAll = false;
        }
    }
    handlePreflight(req, res) {
        if (!isWebPubSubRequest(req)) {
            return false;
        }
        const origin = utils.getHttpHeader(req, "webhook-request-origin");
        if (origin === undefined) {
            logger.warning("Expecting webhook-request-origin header.");
            res.statusCode = 400;
        }
        else if (this._allowAll) {
            res.setHeader("WebHook-Allowed-Origin", "*");
        }
        else {
            // service to do the check
            res.setHeader("WebHook-Allowed-Origin", this._allowedOrigins);
        }
        res.end();
        return true;
    }
    async handleRequest(request, response) {
        var _a, _b, _c, _d;
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
        if ((hub === null || hub === void 0 ? void 0 : hub.toUpperCase()) !== this.hub.toUpperCase()) {
            return false;
        }
        const isMqtt = isMqttRequest(request);
        // No need to read body if handler is not specified
        switch (eventType) {
            case EventType.Connect:
                if (!((_a = this.eventHandler) === null || _a === void 0 ? void 0 : _a.handleConnect)) {
                    if (isMqtt)
                        response.statusCode = 204;
                    response.end();
                    return true;
                }
                break;
            case EventType.Connected:
                if (!((_b = this.eventHandler) === null || _b === void 0 ? void 0 : _b.onConnected)) {
                    response.end();
                    return true;
                }
                break;
            case EventType.Disconnected:
                if (!((_c = this.eventHandler) === null || _c === void 0 ? void 0 : _c.onDisconnected)) {
                    response.end();
                    return true;
                }
                break;
            case EventType.UserEvent:
                if (!((_d = this.eventHandler) === null || _d === void 0 ? void 0 : _d.handleUserEvent)) {
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
                    ? await readSystemEventRequest(request, origin)
                    : await readSystemEventRequest(request, origin);
                // service passes out query property, assign it to queries
                connectRequest.queries = connectRequest.query;
                logger.verbose(connectRequest);
                this.eventHandler.handleConnect(connectRequest, getConnectResponseHandler(connectRequest, response));
                return true;
            }
            case EventType.Connected: {
                // for unblocking events, we responds to the service as early as possible
                response.end();
                const connectedRequest = await readSystemEventRequest(request, origin);
                logger.verbose(connectedRequest);
                this.eventHandler.onConnected(connectedRequest);
                return true;
            }
            case EventType.Disconnected: {
                // for unblocking events, we responds to the service as early as possible
                response.end();
                const disconnectedRequest = isMqtt
                    ? await readSystemEventRequest(request, origin)
                    : await readSystemEventRequest(request, origin);
                logger.verbose(disconnectedRequest);
                this.eventHandler.onDisconnected(disconnectedRequest);
                return true;
            }
            case EventType.UserEvent: {
                const userRequest = await readUserEventRequest(request, origin);
                if (userRequest === undefined) {
                    logger.warning(`Unsupported content type ${utils.getHttpHeader(request, "content-type")}`);
                    return false;
                }
                logger.verbose(userRequest);
                this.eventHandler.handleUserEvent(userRequest, getUserEventResponseHandler(userRequest, response));
                return true;
            }
            default:
                logger.warning(`Unknown EventType ${eventType}`);
                return false;
        }
    }
}
//# sourceMappingURL=cloudEventsDispatcher.js.map