"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockServer = void 0;
const tslib_1 = require("tslib");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
const events_1 = require("events");
const convertBufferToMessage_js_1 = require("../utils/convertBufferToMessage.js");
/**
 * A Mock AMQP server.
 *
 * This class is meant to make it easier for a mock service
 * to interact with incoming messages and link notifications.
 */
class MockServer extends events_1.EventEmitter {
    constructor(options = {}) {
        super();
        this._handleMessage = (context) => {
            var _a;
            if (!context.message || !context.receiver) {
                return;
            }
            const incomingMessages = this._normalizeIncomingMessage(context.message);
            const entityPath = (_a = context.receiver.target.address) !== null && _a !== void 0 ? _a : "";
            this.emit("onMessages", {
                messages: incomingMessages,
                entityPath,
                sendMessage: (message) => {
                    this._sendMessage(context, message, message.to);
                },
                context,
            });
        };
        this._sendMessage = (context, outgoingMessage, toLinkName) => {
            const sender = context.connection.find_sender((s) => s.name === toLinkName || s.target.address === toLinkName);
            if (sender) {
                sender.send(outgoingMessage);
            }
            else {
                context.connection.send(outgoingMessage);
            }
        };
        this._options = options;
        this._container = rhea_1.default.create_container();
    }
    /**
     * The port number the server is listening on.
     * Returns `-1` if the server is not currently listening.
     */
    get port() {
        var _a;
        const address = (_a = this._listener) === null || _a === void 0 ? void 0 : _a.address();
        if (!address || typeof address === "string") {
            return -1;
        }
        return address.port;
    }
    /**
     * Starts the server.
     */
    start() {
        return new Promise((resolve, reject) => {
            var _a, _b, _c, _d;
            const options = this._options;
            const ONE_MB = 1024 * 1024;
            const listenOptions = Object.assign({ port: (_a = options.port) !== null && _a !== void 0 ? _a : 0, max_frame_size: 65536, channel_max: 4999, idle_time_out: (_b = options.idleTimeOut) !== null && _b !== void 0 ? _b : 240000, receiver_options: {
                    max_message_size: (_c = options.maxMessageSize) !== null && _c !== void 0 ? _c : ONE_MB,
                    autosettle: true,
                    autoaccept: false,
                }, sender_options: {
                    max_message_size: (_d = options.maxMessageSize) !== null && _d !== void 0 ? _d : ONE_MB,
                    autosettle: true,
                }, transport: "tls", rejectUnauthorized: true }, options.tlsOptions);
            this._setupDefaultListeners();
            this._listener = this._container.listen(listenOptions);
            this._listener.once("error", reject);
            this._listener.on("listening", () => {
                resolve();
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    emit(type, event) {
        return super.emit(type, event);
    }
    on(type, listener) {
        return super.on(type, listener);
    }
    /**
     * Closes the server.
     */
    stop() {
        const listener = this._listener;
        this._listener = undefined;
        if (!listener) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            listener.close((err) => {
                setTimeout(() => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }, 0);
            });
        });
    }
    _setupDefaultListeners() {
        this._container.sasl_server_mechanisms.enable_anonymous();
        this._container.sasl.server_add_external(this._container.sasl_server_mechanisms);
        this._container.sasl_server_mechanisms["MSSBCBS"] =
            this._container.sasl_server_mechanisms["EXTERNAL"];
        this._container.on(rhea_1.default.ConnectionEvents.connectionError, () => {
            /* do nothing */
        });
        this._container.on(rhea_1.default.ConnectionEvents.protocolError, () => {
            /* do nothing */
        });
        this._container.on(rhea_1.default.ConnectionEvents.connectionOpen, (context) => {
            context.connection.on("error", function (err) {
                console.log(`Error occurred on connection:`, err === null || err === void 0 ? void 0 : err.message);
            });
            this.emit("connectionOpen", {
                context,
            });
        });
        this._container.on(rhea_1.default.ConnectionEvents.connectionClose, (context) => {
            this.emit("connectionClose", {
                context,
                error: context.error,
            });
        });
        this._container.on(rhea_1.default.ConnectionEvents.disconnected, (context) => {
            this.emit("connectionClose", {
                context,
                error: context.error,
            });
        });
        this._container.on(rhea_1.default.SenderEvents.senderOpen, (context) => {
            if (context.sender) {
                const entityPath = context.sender.source.address;
                this.emit("senderOpen", {
                    context,
                    entityPath,
                    sender: context.sender,
                });
            }
        });
        this._container.on(rhea_1.default.ReceiverEvents.receiverOpen, (context) => {
            if (context.receiver) {
                const entityPath = context.receiver.target.address;
                this.emit("receiverOpen", {
                    context,
                    entityPath,
                    receiver: context.receiver,
                });
            }
        });
        this._container.on(rhea_1.default.ReceiverEvents.message, this._handleMessage);
        this._container.on(rhea_1.default.SenderEvents.senderClose, (context) => {
            if (context.sender) {
                const entityPath = context.sender.source.address;
                this.emit("senderClose", {
                    context,
                    entityPath,
                    sender: context.sender,
                });
            }
        });
        this._container.on(rhea_1.default.ReceiverEvents.receiverClose, (context) => {
            if (context.receiver) {
                const entityPath = context.receiver.target.address;
                this.emit("receiverClose", {
                    context,
                    entityPath,
                    receiver: context.receiver,
                });
            }
        });
        this._container.on("error", function (err) {
            console.log("Unexpected error encountered:", err);
        });
    }
    _normalizeIncomingMessage(message) {
        var _a;
        const incomingMessages = Buffer.isBuffer(message)
            ? (0, convertBufferToMessage_js_1.convertBufferToMessages)(message)
            : [message];
        for (const m of incomingMessages) {
            // The multiple check detects if an AMQP message is actually a batch of messages.
            // If it is, then content is an array of individual AMQP messages.
            // Otherwise, it's the content of a single AMQP message (e.g. sequence body type).
            if (m.body.multiple && ((_a = m.body) === null || _a === void 0 ? void 0 : _a.content)) {
                m.body = m.body.content;
            }
        }
        return incomingMessages;
    }
}
exports.MockServer = MockServer;
//# sourceMappingURL=mockServer.js.map