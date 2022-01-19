let nock = require('nock');

module.exports.hash = "8d57e055a15d4e06c89bd4f68b80e330";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"serverCallId":"6ba7b812-9dad-11d1-80b4-00c04fd430c8","kind":"serverCallLocator"},"recordingStateCallbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(400, {"error":{"code":"8527","message":"Invalid join identity, cannot join call."}}, [
  'Content-Length',
  '78',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6827bf85-8853-426f-9e8e-133ec5309588',
  'X-Microsoft-Skype-Chain-ID',
  'f4c5fcae-585b-41d8-8465-2fff673e0a2b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '073DhYQAAAAAJle61Jvt3QJOa4FdwQq9gREVMMDFFREdFMDQyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 12:47:44 GMT'
]);
