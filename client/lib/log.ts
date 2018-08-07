// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:event-hubs:error");
/**
 * @ignore
 * log statements for management
 */
export const mgmt = debugModule("azure:event-hubs:management");
/**
 * @ignore
 * log statements for sender
 */
export const sender = debugModule("azure:event-hubs:sender");
/**
 * @ignore
 * log statements for receiver
 */
export const receiver = debugModule("azure:event-hubs:receiver");
/**
 * @ignore
 * log statements for receiverbatching
 */
export const batching = debugModule("azure:event-hubs:receiverbatching");
/**
 * @ignore
 * log statements for receiverstreaming
 */
export const streaming = debugModule("azure:event-hubs:receiverstreaming");
/**
 * @ignore
 * log statements for linkEntity
 */
export const link = debugModule("azure:event-hubs:linkEntity");
/**
 * @ignore
 * log statements for connectionContext
 */
export const context = debugModule("azure:event-hubs:connectionContext");
/**
 * @ignore
 * log statements for client
 */
export const client = debugModule("azure:event-hubs:client");

/**
 * @ignore
 * log statements for iothub client
 */
export const iotClient = debugModule("azure:event-hubs:iothubClient");
