let nock = require('nock');

module.exports.hash = "a1bc7837a8a847920508613f2a4897ce";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31c8-6f1e-d68a-0848220037ba"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'b3+8fqJ/zkO47RATWG67KQ.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b7f80cee-712c-4293-8922-28790279643c',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '52ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0TxrwYQAAAAB7Wcz197t2R4ypIY3+WKrxREVMMDFFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:42:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31c8-6f1e-d68a-0848220037ba"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"b8201300-7a4c-42d7-9548-876a2dd7d525"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'e5c6f9aa-807a-44e5-b354-8bc75f949a22',
  'X-Microsoft-Skype-Chain-ID',
  '2473fe08-d5e7-43e2-8b4e-af93c450231d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UBrwYQAAAACqsr0bAsi0QLjT+ZOwhnbsREVMMDFFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:42:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b8201300-7a4c-42d7-9548-876a2dd7d525/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-2c81-cd63-7bfa-553a0d001166"}}})
  .query(true)
  .reply(202, {"operationId":"9005c5bf-c9e9-49c8-a789-cfafa6a29073","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '2473fe08-d5e7-43e2-8b4e-af93c450231d',
  'x-ms-client-request-id',
  '661ecb3d-5c89-458e-8636-6a618649c956',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YBrwYQAAAAAGDRANFk4cR6m6hGnbFYliREVMMDFFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:42:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b8201300-7a4c-42d7-9548-876a2dd7d525/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-2c81-cd63-7bfa-553a0d001166"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '2473fe08-d5e7-43e2-8b4e-af93c450231d',
  'x-ms-client-request-id',
  'a65943fd-fe7a-4743-811b-8fb235f4a3d2',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bBrwYQAAAABm0sqeC8lOTYWDDXpcNk6VREVMMDFFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:42:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b8201300-7a4c-42d7-9548-876a2dd7d525/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '2473fe08-d5e7-43e2-8b4e-af93c450231d',
  'x-ms-client-request-id',
  '429f6554-a9e6-4416-9ba2-0b0d78ba03b9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bxrwYQAAAAClqezx1iYWQr3VUquBbwbHREVMMDFFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:42:39 GMT',
  'Content-Length',
  '0'
]);
