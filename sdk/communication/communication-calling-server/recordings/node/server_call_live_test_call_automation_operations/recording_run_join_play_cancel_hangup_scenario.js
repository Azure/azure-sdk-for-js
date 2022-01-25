let nock = require('nock');

module.exports.hash = "c4b31df152bc5a21dda2b5cdeb16a012";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164303719513003324","operationContext":"operationContext164303719513003631"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"6d201300-0c5e-45b0-ab78-62ebc439e329"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '409eebbd-23f2-4e61-93e5-c5e3126bd87f',
  'X-Microsoft-Skype-Chain-ID',
  '4930fd64-a365-4a44-9d75-831a35840946',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CcLuYQAAAADBkcjG0mJyRIkDQ9Q97bhSREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"6d201300-9433-47fa-8c16-e62be76deb95"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '774d497f-f40c-4cca-8d46-12a7f78402c8',
  'X-Microsoft-Skype-Chain-ID',
  '8b05e0e3-a324-4146-9396-3d383949a60a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CsLuYQAAAAA2RFSuUldRSJNoFxaNqwvNREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:playAudio', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a"},"callbackUri":"https://endpoint/callback","audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext164303719513003631","audioFileId":"audioFileId164303719513003324"})
  .query(true)
  .reply(202, {"operationId":"6d201300-4c0e-4a6e-a143-d07d070fa72d","status":"running","operationContext":"operationContext164303719513003631"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '5d7417f4-40ff-4be6-b847-61c472f7954e',
  'X-Microsoft-Skype-Chain-ID',
  '87f96256-d7b4-4f33-a34f-b81a9ddb6e7b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DsLuYQAAAABoa8Yzx4HwSbbFo5GyW6HdREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/6d201300-0c5e-45b0-ab78-62ebc439e329/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"7e204f08-1d7f-43b4-93d9-9580a652a003","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '4930fd64-a365-4a44-9d75-831a35840946',
  'x-ms-client-request-id',
  'b5468932-9e0f-42a1-8a88-1f7e6f4acc9b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EsLuYQAAAACrXllP1M6bQr95q0THhnDaREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/6d201300-9433-47fa-8c16-e62be76deb95/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"d373afe9-cec2-4347-9246-dd552641c892","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '4930fd64-a365-4a44-9d75-831a35840946',
  'x-ms-client-request-id',
  '2cadb507-0c4a-4898-a6c7-471b3e13037b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EsLuYQAAAAD2HNh0DfcPQo7EAfoDRMhQREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/6d201300-0c5e-45b0-ab78-62ebc439e329/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '4930fd64-a365-4a44-9d75-831a35840946',
  'x-ms-client-request-id',
  'edd82d29-9787-48e5-b242-2cdcac27aaca',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FsLuYQAAAACZD+VlGBa7Q5TODTkhgiTsREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/6d201300-9433-47fa-8c16-e62be76deb95/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '4930fd64-a365-4a44-9d75-831a35840946',
  'x-ms-client-request-id',
  'fe01cc1d-01bd-4054-a1a1-e98815e76cba',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FsLuYQAAAADBj8COZPx4RK47SwHweu3RREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 24 Jan 2022 15:13:26 GMT',
  'Content-Length',
  '0'
]);
