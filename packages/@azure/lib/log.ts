// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as debugModule from "debug";
/**
 * @ignore
 * log statements for linkEntity
 */
export const link = debugModule("azure:service-bus:linkEntity");
/**
 * @ignore
 * log statements for error
 */
export const error = debugModule("azure:service-bus:error");
/**
 * @ignore
 * log statements for management
 */
export const mgmt = debugModule("azure:service-bus:management");
/**
 * @ignore
 * log statements for sender
 */
export const sender = debugModule("azure:service-bus:sender");
/**
 * @ignore
 * log statements for receiver
 */
export const receiver = debugModule("azure:service-bus:receiver");
/**
 * @ignore
 * log statements for receiverbatching
 */
export const batching = debugModule("azure:service-bus:receiverbatching");
/**
 * @ignore
 * log statements for receiverstreaming
 */
export const streaming = debugModule("azure:service-bus:receiverstreaming");
/**
 * @ignore
 * log statements for connectionContext
 */
export const connectionCtxt = debugModule("azure:service-bus:connectionContext");
/**
 * @ignore
 * log statements for clientEntityContext
 */
export const entityCtxt = debugModule("azure:service-bus:clientEntityContext");
/**
 * @ignore
 * log statements for queue client
 */
export const qClient = debugModule("azure:service-bus:queueClient");
/**
 * @ignore
 * log statements for topic client
 */
export const topicClient = debugModule("azure:service-bus:topicClient");
/**
 * @ignore
 * log statements for subscription client
 */
export const subscriptionClient = debugModule("azure:service-bus:subscriptionClient");
/**
 * @ignore
 * log statements for namespace
 */
export const ns = debugModule("azure:service-bus:namespace");
/**
 * @ignore
 * log statements for servicebusMessage
 */
export const message = debugModule("azure:service-bus:servicebusMessage");
/**
 * @ignore
 * log statements for map
 */
export const map = debugModule("azure:service-bus:concurrentMap");
/**
 * @ignore
 * log statements for utils
 */
export const utils = debugModule("azure:service-bus:utils");
/**
 * @ignore
 * log statements for messageSession
 */
export const messageSession = debugModule("azure:service-bus:messageSession");
/**
 * @ignore
 * log statements for semaphore
 */
export const semaphore = debugModule("azure:service-bus:semaphore");
/**
 * @ignore
 * log statements for sessionManager
 */
export const sessionManager = debugModule("azure:service-bus:sessionManager");
