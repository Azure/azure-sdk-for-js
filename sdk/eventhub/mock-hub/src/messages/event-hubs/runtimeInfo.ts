// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Message, types } from "rhea";

/**
 * Checks whether the provided message is requesting the EventHub's runtime info.
 * @param entityPath - The path the client sent the request to.
 * Expected to be `$management` if the message is requesting runtime info.
 * @param message - The message sent by the client.
 */
export function isHubRuntimeInfo(entityPath: string, message: Message): boolean {
  if (entityPath !== "$management") {
    return false;
  }

  const properties = message.application_properties;
  if (!properties) {
    return false;
  }

  if (properties.operation !== "READ" || properties.type !== "com.microsoft:eventhub") {
    return false;
  }

  if (!message.body) {
    return true;
  }
  try {
    const body = JSON.parse(message.body);
    if (Array.isArray(body) && !body.length) {
      return true;
    }
  } catch (err: any) {
    return false;
  }
  return false;
}

export interface GenerateHubRuntimeInfoResponseOptions {
  correlationId?: string;
  partitions: string[];
  targetLinkName?: string;
  createdOn: Date;
  eventHubName: string;
}

/**
 * Generates a message containing the EventHub's runtime info.
 */
export function generateHubRuntimeInfoResponse({
  correlationId,
  partitions,
  targetLinkName,
  createdOn,
  eventHubName,
}: GenerateHubRuntimeInfoResponseOptions): Message {
  return {
    to: targetLinkName,
    correlation_id: correlationId,
    application_properties: { operation: "READ", "status-code": types.wrap_int(200) },
    body: {
      name: eventHubName,
      type: "com.microsoft:eventhub",
      created_at: createdOn,
      partition_count: partitions.length,
      partition_ids: types.wrap_array(partitions, 0xa1, undefined),
    },
  };
}
