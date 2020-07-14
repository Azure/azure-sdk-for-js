// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ContainerRegistryImagePushedEventData,
  ContainerRegistryImageDeletedEventData,
  ContainerRegistryChartDeletedEventData,
  ContainerRegistryChartPushedEventData,
  EventHubCaptureFileCreatedEventData
} from "./generated/models";

import { CloudEvent, EventGridEvent } from "./models";

// TODO(matell): We need to generate `isXYZEvent`'s for all the known system events and add
//               the coresponding mappers.

/**
 * isCloudEventLike returns "true" when the event is a CloudEvent
 *
 * @param o Either an EventGrid our CloudEvent event.
 */
function isCloudEventLike(
  o: EventGridEvent<unknown> | CloudEvent<unknown>
): o is CloudEvent<unknown> {
  return (o as any).source !== undefined;
}

/** isEventHubCaptureFileCreatedEvent returns true if the event is of type "Microsoft.EventHub.CaptureFileCreated" */
export function isEventHubCaptureFileCreatedEvent(
  event: EventGridEvent<unknown>
): event is EventGridEvent<EventHubCaptureFileCreatedEventData>;
/** isEventHubCaptureFileCreatedEvent returns true if the event is of type "Microsoft.EventHub.CaptureFileCreated" */
export function isEventHubCaptureFileCreatedEvent(
  event: CloudEvent<unknown>
): event is CloudEvent<EventHubCaptureFileCreatedEventData>;
export function isEventHubCaptureFileCreatedEvent(
  event: EventGridEvent<unknown> | CloudEvent<unknown>
): event is
  | CloudEvent<EventHubCaptureFileCreatedEventData>
  | EventGridEvent<EventHubCaptureFileCreatedEventData> {
  if (isCloudEventLike(event)) {
    return event.type === "Microsoft.EventHub.CaptureFileCreated";
  } else {
    return event.eventType === "Microsoft.EventHub.CaptureFileCreated";
  }
}

/** isContainerRegistryImagePushedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ImagePushed" */
export function isContainerRegistryImagePushedEvent(
  event: EventGridEvent<unknown>
): event is EventGridEvent<ContainerRegistryImagePushedEventData>;
/** isContainerRegistryImagePushedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ImagePushed" */
export function isContainerRegistryImagePushedEvent(
  event: CloudEvent<unknown>
): event is CloudEvent<ContainerRegistryImagePushedEventData>;
export function isContainerRegistryImagePushedEvent(
  event: EventGridEvent<unknown> | CloudEvent<unknown>
): event is
  | CloudEvent<ContainerRegistryImagePushedEventData>
  | EventGridEvent<ContainerRegistryImagePushedEventData> {
  if (isCloudEventLike(event)) {
    return event.type === "Microsoft.ContainerRegistry.ImagePushed";
  } else {
    return event.eventType === "Microsoft.ContainerRegistry.ImagePushed";
  }
}

/** isContainerRegistryImageDeletedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ImageDeleted" */
export function isContainerRegistryImageDeletedEvent(
  event: EventGridEvent<unknown>
): event is EventGridEvent<ContainerRegistryImageDeletedEventData>;
/** isContainerRegistryImageDeletedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ImageDeleted" */
export function isContainerRegistryImageDeletedEvent(
  event: CloudEvent<unknown>
): event is CloudEvent<ContainerRegistryImageDeletedEventData>;
export function isContainerRegistryImageDeletedEvent(
  event: EventGridEvent<unknown> | CloudEvent<unknown>
): event is
  | CloudEvent<ContainerRegistryImageDeletedEventData>
  | EventGridEvent<ContainerRegistryImageDeletedEventData> {
  if (isCloudEventLike(event)) {
    return event.type === "Microsoft.ContainerRegistry.ImageDeleted";
  } else {
    return event.eventType === "Microsoft.ContainerRegistry.ImageDeleted";
  }
}

/** isContainerRegistryChartPushedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ChartPushed" */
export function isContainerRegistryChartPushedEvent(
  event: EventGridEvent<unknown>
): event is EventGridEvent<ContainerRegistryChartPushedEventData>;
/** isContainerRegistryChartPushedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ChartPushed" */
export function isContainerRegistryChartPushedEvent(
  event: CloudEvent<unknown>
): event is CloudEvent<ContainerRegistryChartPushedEventData>;
export function isContainerRegistryChartPushedEvent(
  event: EventGridEvent<unknown> | CloudEvent<unknown>
): event is
  | CloudEvent<ContainerRegistryChartPushedEventData>
  | EventGridEvent<ContainerRegistryChartPushedEventData> {
  if (isCloudEventLike(event)) {
    return event.type === "Microsoft.ContainerRegistry.ChartPushed";
  } else {
    return event.eventType === "Microsoft.ContainerRegistry.ChartPushed";
  }
}

/** isContainerRegistryChartDeletedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ChartDeleted" */
export function isContainerRegistryChartDeletedEvent(
  event: EventGridEvent<unknown>
): event is EventGridEvent<ContainerRegistryChartDeletedEventData>;
/** isContainerRegistryChartDeletedEvent returns true if the event is of type "Microsoft.ContainerRegistry.ChartDeleted" */
export function isContainerRegistryChartDeletedEvent(
  event: CloudEvent<unknown>
): event is CloudEvent<ContainerRegistryChartDeletedEventData>;
export function isContainerRegistryChartDeletedEvent(
  event: EventGridEvent<unknown> | CloudEvent<unknown>
): event is
  | CloudEvent<ContainerRegistryChartDeletedEventData>
  | EventGridEvent<ContainerRegistryChartDeletedEventData> {
  if (isCloudEventLike(event)) {
    return event.type === "Microsoft.ContainerRegistry.ChartDeleted";
  } else {
    return event.eventType === "Microsoft.ContainerRegistry.ChartDeleted";
  }
}
