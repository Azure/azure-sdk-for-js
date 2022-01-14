let nock = require('nock');

module.exports.hash = "861c7575b302b227100513ffee465f66";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"d21f1300-ba1b-4198-bf91-5c76664b6399"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'c9d25706-1a31-4c51-b9db-830cf80c5e90',
  'X-Microsoft-Skype-Chain-ID',
  '2b82c71c-a3d2-4e3a-b767-fd39c1a86137',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0k5rhYQAAAAD5YggYraNKQYXtu6kl6uUoREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"d21f1300-c349-4686-8599-2dbb0dd81f5f"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'f8f7b869-c62f-4126-bdc1-53f77f63442c',
  'X-Microsoft-Skype-Chain-ID',
  '3186d5dd-3f9f-4495-8cd3-021ee494cfe1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0lJrhYQAAAAA434G6WCPnTrxuqtOJD6XjREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d21f1300-ba1b-4198-bf91-5c76664b6399/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '2b82c71c-a3d2-4e3a-b767-fd39c1a86137',
  'x-ms-client-request-id',
  'bda8ba96-b1ac-479b-a670-d06d9cba5fce',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mJrhYQAAAAAKirwuEMJlT4Ca2D0rsoQsREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d21f1300-c349-4686-8599-2dbb0dd81f5f/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '2b82c71c-a3d2-4e3a-b767-fd39c1a86137',
  'x-ms-client-request-id',
  '23db260d-32e2-4531-b6aa-5ce5ff790253',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mZrhYQAAAACCIHrGqVonQIC+C1XePGHJREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:28 GMT',
  'Content-Length',
  '0'
]);
