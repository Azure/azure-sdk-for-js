"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rhea_promise_1 = require("./rhea-promise");
const debugModule = require("debug");
const debug = debugModule("azure:event-hubs:rpc");
function createRequestResponseLink(connection, senderOptions, receiverOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error(`Please provide a connection to create the sender/receiver link on the same session.`);
        }
        if (!senderOptions) {
            throw new Error(`Please provide sender options.`);
        }
        if (!receiverOptions) {
            throw new Error(`Please provide receiver options.`);
        }
        const session = yield rhea_promise_1.createSession(connection);
        const [sender, receiver] = yield Promise.all([
            rhea_promise_1.createSender(session, senderOptions),
            rhea_promise_1.createReceiver(session, receiverOptions)
        ]);
        debug(`[${connection.options.id}] Successfully created the sender and receiver links on the same session.`);
        return {
            session: session,
            sender: sender,
            receiver: receiver
        };
    });
}
exports.createRequestResponseLink = createRequestResponseLink;
function createReceiverLink(connection, receiverOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error(`Please provide a connection to create the receiver link on a session.`);
        }
        if (!receiverOptions) {
            throw new Error(`Please provide receiver options.`);
        }
        const session = yield rhea_promise_1.createSession(connection);
        const receiver = yield rhea_promise_1.createReceiver(session, receiverOptions);
        debug(`[${connection.options.id}] Successfully created the receiver link on a dedicated session for it.`);
        return {
            session: session,
            receiver: receiver
        };
    });
}
exports.createReceiverLink = createReceiverLink;
function createSenderLink(connection, senderOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!connection) {
            throw new Error(`Please provide a connection to create the sender link on a session.`);
        }
        if (!senderOptions) {
            throw new Error(`Please provide sender options.`);
        }
        const session = yield rhea_promise_1.createSession(connection);
        const sender = yield rhea_promise_1.createSender(session, senderOptions);
        debug(`[${connection.options.id}] Successfully created the sender link on a dedicated session for it.`);
        return {
            session: session,
            sender: sender
        };
    });
}
exports.createSenderLink = createSenderLink;
//# sourceMappingURL=rpc.js.map