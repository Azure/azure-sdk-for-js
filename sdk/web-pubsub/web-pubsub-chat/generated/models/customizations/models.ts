// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChatTopicState } from "../models.js";

/** Chat topic input for creation, excluding the lifecycle state. */
export interface ChatTopicCreateCustomized {
  /** Topic identifier unique within the room. */
  readonly id: string;
  /** Topic title. */
  title: string;
  /** Timestamp when the topic was created. */
  readonly createdAt: Date;
  /** User who created the topic. */
  readonly createdBy: string;
  /** Conversation associated with this topic. */
  readonly conversationId: string;
  /** Entity tag for conditional requests. */
  readonly etag: string;
}

export function chatTopicCreateCustomizedSerializer(item: ChatTopicCreateCustomized): any {
  return { title: item["title"] };
}

/** Chat topic model used by the client-specific update operation. */
export interface ChatTopicUpdateCustomized {
  /** Topic identifier unique within the room. */
  readonly id: string;
  /** Topic title. */
  title?: string;
  /** Timestamp when the topic was created. */
  readonly createdAt: Date;
  /** User who created the topic. */
  readonly createdBy: string;
  /** Current lifecycle state of the topic. */
  state?: ChatTopicState;
  /** Conversation associated with this topic. */
  readonly conversationId: string;
  /** Entity tag for conditional requests. */
  readonly etag: string;
}

export function chatTopicUpdateCustomizedSerializer(item: ChatTopicUpdateCustomized): any {
  return { title: item["title"], state: item["state"] };
}

/** Response containing a Web PubSub client access token. */
export interface GenerateClientTokenResponse {
  /** Access token used to connect to Azure Web PubSub. */
  token: string;
}

export function generateClientTokenResponseDeserializer(item: any): GenerateClientTokenResponse {
  return {
    token: item["token"],
  };
}

/** Chat topic input for creation, excluding the lifecycle state. */
export interface ChatTopicCreateCustomizedCreateOrUpdate {
  /** Topic title. */
  title: string;
}

export function chatTopicCreateCustomizedCreateOrUpdateSerializer(
  item: ChatTopicCreateCustomizedCreateOrUpdate,
): any {
  return { title: item["title"] };
}

/** Chat topic model used by the client-specific update operation. */
export interface ChatTopicUpdateCustomizedUpdate {
  /** Topic title. */
  title?: string;
  /** Current lifecycle state of the topic. */
  state?: ChatTopicState;
}

export function chatTopicUpdateCustomizedUpdateSerializer(
  item: ChatTopicUpdateCustomizedUpdate,
): any {
  return { title: item["title"], state: item["state"] };
}
