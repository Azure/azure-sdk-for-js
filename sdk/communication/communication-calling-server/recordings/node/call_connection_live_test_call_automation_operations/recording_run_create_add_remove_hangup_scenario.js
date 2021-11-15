let nock = require('nock');

module.exports.hash = "2e24bc640e38e58ec79f16ff3eee33e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-b303-f8be-ec8d-08482200386f"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'e0FxIWn0hkaq2AJNE0Jprw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '586a9335-9293-4ef0-ab0e-25c675c14530',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '26ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0RB2OYQAAAADS/LvOMRY2R7OGCSTEwYg+V1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:52:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-b303-f8be-ec8d-08482200386f"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"881f1300-ceaf-4093-9c48-f09caf4d8185"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '627e766e-664d-4f5c-ae0a-07eb68021464',
  'X-Microsoft-Skype-Chain-ID',
  '1a6b4e63-2fc5-415b-8197-152ccad4df89',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0RR2OYQAAAAA1Blj/18wcT66P65TWLOvHV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:52:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/881f1300-ceaf-4093-9c48-f09caf4d8185/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-b2e1-af9d-02c3-593a0d00388b"}}})
  .query(true)
  .reply(202, {"participantId":"68e4a263-1fe7-4e8b-91d9-6899520bca1a"}, [
  'Content-Length',
  '56',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'fdd6f430-db1f-47e2-83e6-310fc821a949',
  'x-ms-client-request-id',
  '5e3bf195-8447-4d82-902f-8448ef4a277b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0VB2OYQAAAABNyG5PiDh9TZJNu2EVkd+KV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:52:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/881f1300-ceaf-4093-9c48-f09caf4d8185/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-b2e1-af9d-02c3-593a0d00388b"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '20b8b7e0-001f-4683-a185-197b2f0de1ce',
  'x-ms-client-request-id',
  '2a13b41a-f173-4f75-a151-737078fec8f6',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Yx2OYQAAAAAzdvmKLWfBRapWSmreho+nV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:53:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/881f1300-ceaf-4093-9c48-f09caf4d8185/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '30916520-5f90-42bb-b5d0-a16efcd340c8',
  'x-ms-client-request-id',
  '3a315a43-4654-457f-a047-2986f1bbc58e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cx2OYQAAAAA1xZBts8gVSr/tGuy43wc0V1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 12 Nov 2021 07:53:22 GMT',
  'Content-Length',
  '0'
]);
