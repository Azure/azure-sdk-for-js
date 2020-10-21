# Release History

## 3.0.0-beta.3 (2020-10-06)

- Added distributed tracing support. `EventGridProducerClient` will now create spans when sending events to Event Grid.
- Added support for system events sent by Azure Key Vault.

### Breaking Changes

- The type definitions for SMS events sent by Azure Communication Services have been renamed, to use the prefix "AcsSms" instead of "Acssms". If you are
  using TypeScript and explicitly referencing these interfaces, you will need to update your code to use the new names. The payload of the events is unchanged.

## 3.0.0-beta.2 (2020-09-24)

- Added support for system events sent by the Azure Communication Services.

## 3.0.0-beta.1 (2020-09-08)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
