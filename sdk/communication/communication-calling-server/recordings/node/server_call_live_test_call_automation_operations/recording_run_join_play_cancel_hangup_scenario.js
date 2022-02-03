let nock = require('nock');

module.exports.hash = "81e7b9c1295b22193148d1caa74370e4";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164379238002706609","operationContext":"operationContext164379238002701614"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"961f1300-82a1-4182-bd4f-98854e76c637"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'c7842269-6f32-4ef5-8940-0660a7287978',
  'X-Microsoft-Skype-Chain-ID',
  '999c997b-7f6e-4c82-b99c-b939923bfa9c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+Ef6YQAAAACQnmX8ZRCPRIO8rPSMjItcREVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"961f1300-b989-40f5-a372-40272c4ddd1f"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'abf12491-650f-427e-9050-e99f811b97ee',
  'X-Microsoft-Skype-Chain-ID',
  '27d51394-707e-4218-ae46-efbee16b9400',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+kf6YQAAAAC5puCP5JtZTI2DdyyFwAVeREVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:playAudio', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a"},"callbackUri":"https://endpoint/callback","audioFileUri":"https://endpoint/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164379238002701614","audioFileId":"audioFileId164379238002706609"})
  .query(true)
  .reply(202, {"operationId":"961f1300-1467-4de4-b0aa-33f872558677","status":"running","operationContext":"operationContext164379238002701614"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '4dcc79e0-26ed-42e3-903f-b7b90fc45b1d',
  'X-Microsoft-Skype-Chain-ID',
  '410fb337-c6a3-4baf-8058-239b2214d6fc',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/0f6YQAAAAA6wN6bArAMQ6fFTMyiig/6REVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/961f1300-82a1-4182-bd4f-98854e76c637/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"6b1a2061-ff77-483f-b735-5765f3070574","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '999c997b-7f6e-4c82-b99c-b939923bfa9c',
  'x-ms-client-request-id',
  '432b2df0-d1ee-4df7-8167-a3d6e579f619',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BUj6YQAAAABrLoNvXhLgSJ87KG59kw+7REVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/961f1300-b989-40f5-a372-40272c4ddd1f/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"f3a81e60-b169-42b8-890a-66e3ff1a8843","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '999c997b-7f6e-4c82-b99c-b939923bfa9c',
  'x-ms-client-request-id',
  '84a17609-1689-410e-8fda-aa37eab6a505',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Bkj6YQAAAADu0udhYrnlTKu1OIICU4X5REVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/961f1300-82a1-4182-bd4f-98854e76c637/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '999c997b-7f6e-4c82-b99c-b939923bfa9c',
  'x-ms-client-request-id',
  '3dfb2801-d9a5-4dd2-8890-fbad9637189d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CUj6YQAAAAD6BZcFHA89T4p26U+hwalHREVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/961f1300-b989-40f5-a372-40272c4ddd1f/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '999c997b-7f6e-4c82-b99c-b939923bfa9c',
  'x-ms-client-request-id',
  'fedd8226-fba9-4371-9f3b-9558c62be38e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CUj6YQAAAAAiKR2pY4xpRYPFzRTvoH4DREVMMDFFREdFMDUxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:59:54 GMT',
  'Content-Length',
  '0'
]);
