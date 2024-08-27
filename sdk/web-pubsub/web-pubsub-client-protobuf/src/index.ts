// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubClientProtocol } from "@azure/web-pubsub-client";
import { WebPubSubProtobufProtocolImpl } from "./webPubSubProtobufProtocol";
import { WebPubSubProtobufReliableProtocolImpl } from "./webPubSubProtobufReliableProtocol";

/**
 * Return the "protobuf.webpubsub.azure.v1" protocol
 */
export const WebPubSubProtobufProtocol = (): WebPubSubClientProtocol => {
  return new WebPubSubProtobufProtocolImpl();
};

/**
 * Return the "protobuf.reliable.webpubsub.azure.v1" protocol
 */
export const WebPubSubProtobufReliableProtocol = (): WebPubSubClientProtocol => {
  return new WebPubSubProtobufReliableProtocolImpl();
};
