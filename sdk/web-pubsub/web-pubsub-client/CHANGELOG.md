# Release History

## 1.0.4 (2026-03-15)

### Features Added

- Added `invokeEvent` method to `WebPubSubClient` that allows invoking server-side event handlers and receiving responses back.
- Added application-layer ping/pong mechanism for more accurate keepalive detection. This enables the client to detect its own disconnection quickly even when WebSocket-level ping/pong frames are inaccessible (e.g., in browser environments). Added `keepAliveTimeoutInMs` option to `WebPubSubClientOptions`.

### Bugs Fixed

- Fixed a bug that `sequenceId` with value `0` would not be sent to the service, which caused keepalive to not work when no messages had been received.

## 1.0.3 (2026-03-14)

## 1.0.2 (2024-05-01)

### Bugs Fixed

- Fix the bug that `sequenceAck` ping won't be sent if nothing has been received for a client

## 1.0.1 (2024-04-24)

### Other Changes

- Update the `sequenceAck` logic to make it more efficient when receiving rate is high
- Periodically send message to detect the connection alive especially when the connection is idle

## 1.0.0 (2023-12-01)

### Other Changes

- Use overload for `SendToGroup` and `SendEvent`

## 1.0.0-beta.3 (2023-04-10)

### Bugs Fixed

- Fix the bug that `isDuplicated` is always `true`

## 1.0.0-beta.2 (2023-02-06)

### Breaking Changes

- To keep the naming consistency, change interface name `OnRestoreGroupFailedArgs` to `OnRejoinGroupFailedArgs`, and change config name `WebPubSubClientOptions.autoRestoreGroups` to `WebPubSubClientOptions.autoRejoinGroups`

### Bugs Fixed

- Fix AutoRejoinGroups doesn't work issue

## 1.0.0-beta.1 (2023-01-13)

### Features Added

- Initial beta release
