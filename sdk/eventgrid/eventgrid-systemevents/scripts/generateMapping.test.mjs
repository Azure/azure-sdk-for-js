// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import assert from "node:assert/strict";
import { test } from "node:test";
import { extractEventDataTypes, renderNameMapping } from "./generateMapping.mjs";

const models = `
/** Schema of the data property of an EventGridEvent for a Microsoft.ApiCenter.ApiDefinitionAdded event. */
export interface ApiCenterApiDefinitionAddedEventData {
  title: string;
}

/** Event data for Microsoft.EventGrid.MQTTClientCreatedOrUpdated event. */
export interface EventGridMqttClientCreatedOrUpdatedEventData {
  clientName: string;
}

/**
 * Schema of the Data property of an EventGridEvent for a
 * Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged
 * event.
 */
export interface ResourceNotificationsHealthResourcesAvailabilityStatusChangedEventData {
  resourceInfo: string;
}

/** Schema of the Data property of an event grid event for a Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted preview event. */
export interface ContainerServiceNewKubernetesVersionAvailableEventData {
  latest: string;
}

/** Common base type without an event name. */
export interface CommonBaseEventData {
  id: string;
}

/** Not an event data type: Microsoft.Ignored.Event event. */
export interface SomethingElse {
  id: string;
}
`;

test("extracts event names for every comment pattern and skips common base types", () => {
  const messages = [];
  const result = extractEventDataTypes(models, "/virtual/models.ts", (m) => messages.push(m));
  assert.deepEqual(result, [
    {
      name: "Microsoft.ApiCenter.ApiDefinitionAdded",
      interface: "ApiCenterApiDefinitionAddedEventData",
    },
    {
      name: "Microsoft.EventGrid.MQTTClientCreatedOrUpdated",
      interface: "EventGridMqttClientCreatedOrUpdatedEventData",
    },
    {
      name: "Microsoft.ResourceNotifications.HealthResources.AvailabilityStatusChanged",
      interface: "ResourceNotificationsHealthResourcesAvailabilityStatusChangedEventData",
    },
    {
      name: "Microsoft.ResourceNotifications.ContainerServiceEventResources.ScheduledEventEmitted",
      interface: "ContainerServiceNewKubernetesVersionAvailableEventData",
    },
  ]);
  assert.match(messages[0], /CommonBaseEventData/);
});

test("renders a sorted name mapping", () => {
  const content = renderNameMapping([
    { name: "Microsoft.B.Two", interface: "BTwoEventData" },
    { name: "Microsoft.A.One", interface: "AOneEventData" },
  ]);
  assert.equal(
    content,
    `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AOneEventData,
  BTwoEventData,
} from "./models/index.js";

/**
 * A mapping of event type names to event data type interfaces.
 */
export interface SystemEventNameToEventData {
  /** An interface for the event data of a "Microsoft.A.One" event. */
  "Microsoft.A.One": AOneEventData;
  /** An interface for the event data of a "Microsoft.B.Two" event. */
  "Microsoft.B.Two": BTwoEventData;
}
`,
  );
});

test("can parse repeatedly without leaking an API process", () => {
  for (let i = 0; i < 3; i++) {
    assert.equal(extractEventDataTypes(models, "/virtual/models.ts", () => {}).length, 4);
  }
});
