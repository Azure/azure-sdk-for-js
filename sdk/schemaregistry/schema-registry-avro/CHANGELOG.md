# Release History

## 1.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.0 (2023-10-25)

### Features Added

- Adds support for serializing and deserializing for `timestamp-millis` logical type as native `Date` objects.

## 1.0.0 (2022-05-10)

### Other Changes

- Compatability for old payload format has been removed.
- Errors may include a `cause` field that stores inner errors if any.

## 1.0.0-beta.8 (2022-04-05)

### Breaking Changes
- The `encodeMessageData` method has been renamed to `serialize`.
- The `decodeMessageData` method has been renamed to `deserialize`.
- The `MessageWithMetadata` interface has been renamed to `MessageContent`.
- `MessageContent`'s `body` has been renamed to `data`.
- `MessageAdapter`'s `consumeMessage` and `produceMessage` have been renamed to `consume` and `produce`.

## 1.0.0-beta.7 (2022-03-10)

### Breaking Changes
- `AvroEncoder` has been renamed to `AvroSerializer`
- The `encodeMessageData` method has been renamed to `serializeMessageData`
- The `decodeMessageData` method has been renamed to `deserializeMessageData`

## 1.0.0-beta.6 (2022-02-10)

### Features Added

- The encoder APIs have been revamped to work on messages instead of buffers where the payload is the pure encoded-data. The schema ID became part of the content type of that message. This change will improve the experience of using this encoder with the other messaging clients (e.g. Event Hubs, Service Bus, and Event Grid clients). The encoder also supports decoding messages with payloads that follow the old format where the schema ID was part of the payload.
- `decodeMessageData` now supports decoding using a different but compatible schema

### Breaking Changes
- The `SchemaRegistryAvroSerializer` class has been renamed to `AvroEncoder`
- The `serialize` method has been renamed to `encodeMessageData` and it now returns a message
- The `deserialize` method has been renamed to `decodeMessageData` and it now takes a message as input

### Other Changes
- The internal cache has been updated to be an LRU one with a max entries count of 128

## 1.0.0-beta.5 (2021-11-17)

### Other Changes

- Depends on @azure/schema-registry@1.0.1.

## 1.0.0-beta.4 (2021-11-11)

### Other Changes

- Depends on @azure/schema-registry@1.0.0.

## 1.0.0-beta.3 (2021-10-05)

### Breaking Changes

- `schemaGroup` is no longer a constructor parameter and has been moved to the constructor options because it is only required for serialization.

### Other Changes

- Depends on @azure/schema-registry@1.0.0-beta.3.

## 1.0.0-beta.2 (2021-08-17)

### Features Added

- Depends on @azure/schema-registry@1.0.0-beta.2 which supports client-level caching.

## 1.0.0-beta.1 (2020-09-08)

- Initial preview release
