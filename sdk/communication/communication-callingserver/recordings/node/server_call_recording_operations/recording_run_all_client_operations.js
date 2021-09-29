let nock = require('nock');

module.exports.hash = "5cb733ddbaaf10dc7ec97948130f7de7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/1eaf1f6e-4b07-57a0-befb-778f403d199b/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"421f0b00-fcf8-492b-99d0-734028684bf3"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '4e0b7875-b051-4a06-8c0b-37d45bd31189',
  'X-Microsoft-Skype-Chain-ID',
  'd6619298-2fdd-48f3-a4bd-ac80a786d698',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0e/NUYQAAAADojhkNQRADSJtnBk+kQxXIUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:15:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/1eaf1f6e-4b07-57a0-befb-778f403d199b/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"421f0b00-2396-44f3-a3b6-c7d927bda297"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6ed8f17f-cbdf-45b6-a727-9c73dd5eceef',
  'X-Microsoft-Skype-Chain-ID',
  '91f4fec8-4c6c-4eaf-ae25-9b9a6d05f495',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fPNUYQAAAAALWYqwTeKMTKjahUnlr9SPUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:15:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/1eaf1f6e-4b07-57a0-befb-778f403d199b/recordings', {"recordingStateCallbackUri":"https://bot.contoso.io/callback"})
  .query(true)
  .reply(400, {"error":{"code":"8553","message":"Only one recording of a given type is supported in a call."}}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '1bc29bcb-ea60-4dcd-a208-82453b3b5a04',
  'X-Microsoft-Skype-Chain-ID',
  '7fc4a141-cc76-43f6-acb3-9a4b732e0b43',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ffNUYQAAAABU6aw9sNtHSJr0sBBezxrsUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:15:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/serverCalls/1eaf1f6e-4b07-57a0-befb-778f403d199b/recordings/')
  .query(true)
  .reply(405, {"message":"The requested resource does not support http method 'DELETE'."}, [
  'Allow',
  'POST',
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '7766f68f-2708-4f17-bcf1-567bddd80dd5',
  'X-Microsoft-Skype-Chain-ID',
  '577c3c28-0cd7-4aa6-bc6c-e6d40befd2d4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fvNUYQAAAACSwAUDN9lrTrnzZ276ggfkUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:15:10 GMT'
]);
