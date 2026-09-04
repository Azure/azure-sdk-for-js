// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { CloudEvent, EventGridEvent } from "./events.js";

import type { SystemEventNameToEventData } from "./nameMapping.js";
export type { SystemEventNameToEventData };
/**
 * The Event Types for all System Events. These may be used with `isSystemEvent` to determine if an
 * event is a system event of a given type.
 */
export type KnownSystemEventTypes = keyof SystemEventNameToEventData;

import type { CloudEvent, EventGridEvent } from "./events.js";

/**
 * isCloudEventLike returns "true" when the event is a CloudEvent
 *
 * @param o - Either an EventGrid our CloudEvent event.
 */
function isCloudEventLike(
  o: EventGridEvent<unknown> | CloudEvent<unknown>,
): o is CloudEvent<unknown> {
  return (o as any).source !== undefined;
}

/**
 * iSystemEvent returns "true" when a given event is a system event of a given type. When using
 * TypeScript, this function acts as a custom type guard and allows the TypeScript compiler to
 * identify the underlying data
 *
 * @param eventType - The type of system event to check for, e.g., "Microsoft.AppConfiguration.KeyValueDeleted"
 * @param event - The event to test.
 */
export function isSystemEvent<T extends KnownSystemEventTypes>(
  eventType: T,
  event: EventGridEvent<unknown>,
): event is EventGridEvent<SystemEventNameToEventData[T]>;

/**
 * iSystemEvent returns "true" when a given event is a system event of a given type. When using
 * TypeScript, this function acts as a custom type guard and allows the TypeScript compiler to
 * identify the underlying data
 *
 * @param eventType - The type of system event to check for, e.g., "Microsoft.AppConfiguration.KeyValueDeleted"
 * @param event - The event to test.
 */
export function isSystemEvent<T extends KnownSystemEventTypes>(
  eventType: T,
  event: CloudEvent<unknown>,
): event is CloudEvent<SystemEventNameToEventData[T]>;

export function isSystemEvent<T extends KnownSystemEventTypes>(
  eventType: T,
  event: EventGridEvent<unknown> | CloudEvent<unknown>,
): event is
  EventGridEvent<SystemEventNameToEventData[T]> | CloudEvent<SystemEventNameToEventData[T]> {
  if (isCloudEventLike(event)) {
    return event.type === eventType;
  } else {
    return event.eventType === eventType;
  }
}
