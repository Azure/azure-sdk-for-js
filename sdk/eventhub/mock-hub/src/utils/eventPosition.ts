// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type EventPosition =
  | EnqueuedTimeEventPosition
  | OffsetEventPosition
  | SequenceNumberEventPosition;

export interface BaseEventPosition {
  type: string;
  operator: ">" | ">=";
  value: string | number;
}

export interface OffsetEventPosition extends BaseEventPosition {
  type: "offset";
  value: number | "@latest";
}

export interface SequenceNumberEventPosition extends BaseEventPosition {
  type: "sequenceNumber";
  value: number;
}

export interface EnqueuedTimeEventPosition extends BaseEventPosition {
  type: "enqueuedTime";
  value: number;
}

/**
 * Returns an `EventPosition` given an amqp source filter.
 */
export function getEventPosition(filter: string): EventPosition {
  const [fullType, operator, value] = filter.split(" ");
  const normalizedValue = value.replace(/'/g, "");

  if (operator !== ">" && operator !== ">=") {
    throw new Error(`Invalid event position`);
  }

  if (fullType === "amqp.annotation.x-opt-offset") {
    return {
      type: "offset",
      operator,
      value: normalizedValue === "@latest" ? normalizedValue : parseInt(normalizedValue, 10),
    };
  } else if (fullType === "amqp.annotation.x-opt-sequence-number") {
    return {
      type: "sequenceNumber",
      operator,
      value: parseInt(normalizedValue, 10),
    };
  } else if (fullType === "amqp.annotation.x-opt-enqueued-time") {
    return {
      type: "enqueuedTime",
      operator,
      value: parseInt(normalizedValue, 10),
    };
  }

  throw new Error(`Invalid event position`);
}
