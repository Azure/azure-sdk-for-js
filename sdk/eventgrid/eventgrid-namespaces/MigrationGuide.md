<!-- dev-tool snippets ignore -->

# Migration Guide: From `@azure/eventgrid` to `@azure/eventgrid-namespaces` and `@azure/eventgrid-systemevents`

> **Note:** The `@azure/eventgrid` SDK is being deprecated. Its main functionaility is split into two separate packages. Microsoft recommends migrating to the latest Azure Event Grid SDKs:
> - [`@azure/eventgrid-namespaces`](https://www.npmjs.com/package/@azure/eventgrid-namespaces): For interacting with the modern Event Grid Namespace resource model, including publishing/receiving CloudEvents.
> - [`@azure/eventgrid-systemevents`](https://www.npmjs.com/package/@azure/eventgrid-systemevents): For strongly-typed system event schemas.

This guide will help you transition your applications from `@azure/eventgrid` to the new SDKs.

---

## 1. Overview of Package Changes

| Scenario                                  | Old Package                  | Replacement Package(s)              |
|-------------------------------------------|------------------------------|-------------------------------------|
| Publish events to Event Grid Topics       | `@azure/eventgrid`           | `@azure/eventgrid-namespaces`       |
| Process CloudEvents                       | `@azure/eventgrid`           | `@azure/eventgrid-namespaces` and `@azure/eventgrid-systemevents`      |
| Strongly-typed system event payloads      | `@azure/eventgrid`           | `@azure/eventgrid-systemevents`     |

---

## 2. Installation

Uninstall the old package:
```bash
npm uninstall @azure/eventgrid
```

Install the new packages:
```bash
npm install @azure/eventgrid-namespaces @azure/eventgrid-systemevents
```

---

## 3. Publishing Events

### Old (`@azure/eventgrid`)
```ts
import { EventGridPublisherClient } from "@azure/eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

const client = new EventGridPublisherClient(
  "<endpoint>",
  "EventGrid",
  new DefaultAzureCredential(),
);

await client.send([
  {
    eventType: "Azure.Sdk.SampleEvent",
    subject: "Event Subject",
    dataVersion: "1.0",
    data: {
      hello: "world",
    },
  },
]);
```

### New (`@azure/eventgrid-namespaces`)
```ts
import { EventGridSenderClient } from "@azure/eventgrid-namespaces";
import { DefaultAzureCredential } from "@azure/identity";

const client = new EventGridSenderClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<topic-name>",
);

const cloudEvent = {
  type: "example",
  source: "https://example.com",
  id: `singleEventIdV210001`,
  time: new Date(),
  data: {
    resourceUri: "https://dummyurl.com",
  },
  specversion: "1.0",
};

await client.sendEvents(cloudEvent);
```
> **Key changes:**
> - Only CloudEvents 1.0 schema is supported for publishing.
> - The interface for CloudEvents follows the [CloudEvents spec](https://cloudevents.io/).
> - The client is initialized without the "EventGrid" schema argument.
> - Use `sendEvents()` instead of `send()`.

---

## 4. Consuming Events

### Old (`@azure/eventgrid`)
- You may have used utilities to parse `EventGridEvent` or `CloudEvent` from HTTP requests.

### New (`@azure/eventgrid-namespaces`)
- Use the [CloudEvents SDK for JavaScript](https://www.npmjs.com/package/cloudevents) for parsing, or process the JSON directly.
- For system events, use types from `@azure/eventgrid-systemevents`.

---

## 5. Handling System Events

### Old (`@azure/eventgrid`)
```ts
import { StorageBlobCreatedEventData } from "@azure/eventgrid";

function handleStorageEvent(event: StorageBlobCreatedEventData) {
  // ...
}
```

### New (`@azure/eventgrid-systemevents`)
```ts
import { StorageBlobCreatedEventData } from "@azure/eventgrid-systemevents";

function handleStorageEvent(event: StorageBlobCreatedEventData) {
  // ...
}
```

> **Key change:**
> Import system event types from `@azure/eventgrid-systemevents`.

---

## 6. System Events Helpers

### Old (`@azure/eventgrid`)
```ts
import { isSystemEvent, KnownSystemEventTypes, SystemEventNameToEventData } from "@azure/eventgrid";
```

### New (`@azure/eventgrid-systemevents`)
```ts
import { isSystemEvent, KnownSystemEventTypes, SystemEventNameToEventData } from "@azure/eventgrid-systemevents";
```

## 7. Deserializer

### Old (`@azure/eventgrid`)
```ts
import { EventGridDeserializer } from "@azure/eventgrid";
```

### New (`@azure/eventgrid-systemevents`)
```ts
import { EventGridDeserializer } from "@azure/eventgrid-namespaces";
```

---

## 7. Additional Resources

- [@azure/eventgrid-namespaces Docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid-namespaces)
- [@azure/eventgrid-systemevents Docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid-systemevents)
- [Event Grid CloudEvents Schema](https://docs.microsoft.com/azure/event-grid/cloudevents-schema)
- [Azure Event Grid Documentation](https://docs.microsoft.com/azure/event-grid/)

---

## 8. Troubleshooting

- If you encounter issues with the new SDKs, check the [GitHub issues](https://github.com/Azure/azure-sdk-for-js/issues) or open a new one for assistance.
- For feature parity concerns, consult the [Azure Event Grid SDK release notes](https://github.com/Azure/azure-sdk-for-js/releases).

---

**Migrating will help ensure your applications are supported, secure, and take advantage of the latest Azure Event Grid features.**
