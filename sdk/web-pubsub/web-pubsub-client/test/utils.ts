// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function getAckMessagePayload(
  ackId: number,
  success: boolean = true,
  reason: string = "",
): object {
  return {
    type: "ack",
    ackId: ackId,
    success: success,
    error: { name: reason, message: "message" },
  };
}

export function getGroupDataPayload(groupName: string, data: string, sequenceId?: number): object {
  return {
    sequenceId: sequenceId,
    type: "message",
    from: "group",
    group: groupName,
    dataType: "text",
    data: data,
    fromUserId: "user",
  };
}

export function getConnectedPayload(connectionId: string, reconnectionToken?: string): object {
  return {
    type: "system",
    event: "connected",
    userId: "user",
    connectionId: connectionId,
    reconnectionToken: reconnectionToken,
  };
}
