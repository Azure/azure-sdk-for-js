"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.partitionKey = "x-opt-partition-key";
exports.sequenceNumber = "x-opt-sequence-number";
exports.enqueuedTime = "x-opt-enqueued-time";
exports.offset = "x-opt-offset";
exports.enqueuedTimeAnnotation = `amqp.annotation.${exports.enqueuedTime}`;
exports.offsetAnnotation = `amqp.annotation.${exports.offset}`;
exports.sequenceNumberAnnotation = `amqp.annotation.${exports.sequenceNumber}`;
exports.message = "message";
exports.error = "error";
exports.statusCode = "status-code";
exports.statusDescription = "status-description";
exports.errorCondition = "error-condition";
exports.management = "$management";
exports.partition = "partition";
exports.partitionId = "partitionId";
exports.readOperation = "READ";
exports.TLS = "tls";
exports.defaultConsumerGroup = "$default";
exports.eventHub = "eventhub";
exports.cbsEndpoint = "$cbs";
exports.cbsReplyTo = "cbs";
exports.operationPutToken = "put-token";
exports.aadEventHubsAudience = "https://eventhubs.azure.net/";
exports.maxUserAgentLength = 128;
exports.vendorString = "com.microsoft";
exports.attachEpoch = `${exports.vendorString}:epoch`;
exports.receiverIdentifierName = `${exports.vendorString}:receiver-name`;
exports.enableReceiverRuntimeMetricName = `${exports.vendorString}:enable-receiver-runtime-metric`;
exports.receiverError = "receiver_error";
exports.senderError = "sender_error";
exports.sessionError = "session_error";
exports.connectionError = "connection_error";
exports.defaultOperationTimeoutInSeconds = 60;
exports.managementRequestKey = "managementRequest";
exports.negotiateCbsKey = "negotiateCbs";
exports.ensureContainerAndBlob = "ensureContainerAndBlob";
exports.packageJsonInfo = {
    name: "azure-event-hubs-js",
    version: "0.1.0"
};
