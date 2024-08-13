# Release History

## 1.1.0 (2024-04-15)

### Other Changes

- General Availability version of PSTN dial-out capability feature

## 1.1.0-beta.1 (2023-09-21)

### Features Added

- Added support for PSTN dial-out capability

## 1.0.0 (2023-06-12)

General Availability version of the Azure Communication Services Rooms JavaScript SDK.

## 1.0.0-beta.2 (2023-05-17)

### Features Added

- Added `listRooms` method
- Added pagination support to `listParticipants`

### Breaking Changes

- Changed: Renamed `getParticipants` to `listParticipants` with `Promise<PagedAsyncIterableIterator<Partial<RoomParticipant>>>` return type
- Changed: Renamed `createdDateTime` to `createdAt` in `Room`
- Changed: Rename `Room` to `CommunicationRoom`
- Changed: Replaced `addParticipants` and `updateParticipants` methods with `upsertParticipants`
- Changed: Renamed `RoleType` to `ParticipantRole`
- Removed: `roomJoinPolicy` and `participants` from `UpdateRoomOptions`
- Removed: `participants` from `Room`
- Removed: `roomJoinPolicy` from `Room`, all rooms are invite-only by default


### Other Changes

- Updated to `@azure/communication-common` 2.2.0.

## 1.0.0-beta.1 (2022-08-09)

The first preview of the Azure Communication Rooms Client has the following features:

- create a room with upto 6 months validity
- add, remove and update participants to the room
- create open or closed rooms
