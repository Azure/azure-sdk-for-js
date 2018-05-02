// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export const sequenceNumber = "x-opt-sequence-number";
export const enqueuedTime = "x-opt-enqueued-time";
export const offset = "x-opt-offset";
export const enqueuedTimeAnnotation = `amqp.annotation.${enqueuedTime}`;
export const offsetAnnotation = `amqp.annotation.${offset}`;
export const sequenceNumberAnnotation = `amqp.annotation.${sequenceNumber}`;
export const message = "message";
export const error = "error";
export const ensureContainerAndBlob = "ensureContainerAndBlob";
