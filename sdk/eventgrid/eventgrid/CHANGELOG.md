# Release History

## 4.0.0 (2021-03-17)

- Update version to 4.0.0 to align with other EventGrid SDKs

### Breaking Changes

- `EventGridConsumer` no longer applies any conversions to the `data` property of system events. The interfaces that describe the data payload of each
  system event has been updated to reflect this. The most visible impact of this change is that some properties of events are no longer converted into JavaScript
  `Date` objects, and instead are kepts as strings which contain ISO 8601 timestamps.
- Related to the above, `EventGridConsumer` no longer accepts a set of custom converters that can be used to further transform the `data` property of a specific
  event type when deserializing events.
- The interfaces which describe the shape of the `data` member of system events have been updated so that properties always included in the event are not typed as optional.

## 3.0.0-beta.3 (2020-10-06)

- Added distributed tracing support. `EventGridProducerClient` will now create spans when sending events to Event Grid.
- Added support for system events sent by Azure Key Vault.

### Breaking Changes

- The type definitions for SMS events sent by Azure Communication Services have been renamed, to use the prefix "AcsSms" instead of "Acssms". If you are
  using TypeScript and explicitly referencing these interfaces, you will need to update your code to use the new names. The payload of the events is unchanged.
- `EventGridSharedAccessCredential` has been removed, in favor of `AzureSASCredential`. Code which is using `EventGridSharedAccessCredential` should
  now use `AzureSASCredential` instead.
- When constructing the client, you must now include the schema type your topic is configured to expect (one of "EventGrid", "CloudEvent" or "Custom").
- The `sendEvents` methods have been collapsed into a single method on the client called `send` which uses the input schema that was configured on the client.

## 3.0.0-beta.2 (2020-09-24)

- Added support for system events sent by the Azure Communication Services.

## 3.0.0-beta.1 (2020-09-08)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
