"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const rhea_promise_1 = require("./rhea-promise");
const debugModule = require("debug");
const debug = debugModule("azure:event-hubs:rpc");
async function createRequestResponseLink(connection, senderOptions, receiverOptions) {
    if (!connection) {
        throw new Error(`Please provide a connection to create the sender/receiver link on the same session.`);
    }
    if (!senderOptions) {
        throw new Error(`Please provide sender options.`);
    }
    if (!receiverOptions) {
        throw new Error(`Please provide receiver options.`);
    }
    let session = await rhea_promise_1.createSession(connection);
    let [sender, receiver] = await Promise.all([
        rhea_promise_1.createSender(session, senderOptions),
        rhea_promise_1.createReceiver(session, receiverOptions)
    ]);
    debug(`[${connection.options.id}] Successfully created the sender and receiver links on the same session.`);
    return {
        session: session,
        sender: sender,
        receiver: receiver
    };
}
exports.createRequestResponseLink = createRequestResponseLink;
async function createReceiverLink(connection, receiverOptions) {
    if (!connection) {
        throw new Error(`Please provide a connection to create the receiver link on a session.`);
    }
    if (!receiverOptions) {
        throw new Error(`Please provide receiver options.`);
    }
    let session = await rhea_promise_1.createSession(connection);
    let receiver = await rhea_promise_1.createReceiver(session, receiverOptions);
    debug(`[${connection.options.id}] Successfully created the receiver link on a dedicated session for it.`);
    return {
        session: session,
        receiver: receiver
    };
}
exports.createReceiverLink = createReceiverLink;
async function createSenderLink(connection, senderOptions) {
    if (!connection) {
        throw new Error(`Please provide a connection to create the sender link on a session.`);
    }
    if (!senderOptions) {
        throw new Error(`Please provide sender options.`);
    }
    let session = await rhea_promise_1.createSession(connection);
    let sender = await rhea_promise_1.createSender(session, senderOptions);
    debug(`[${connection.options.id}] Successfully created the sender link on a dedicated session for it.`);
    return {
        session: session,
        sender: sender
    };
}
exports.createSenderLink = createSenderLink;
//# sourceMappingURL=rpc.js.map