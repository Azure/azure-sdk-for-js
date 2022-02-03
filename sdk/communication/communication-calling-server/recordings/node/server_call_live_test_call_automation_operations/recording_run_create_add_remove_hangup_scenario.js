let nock = require('nock');

module.exports.hash = "48bd5ab9d95a06def1fb62ee116ac0ec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"a01f1300-1a76-49b2-9e19-1689978a8587"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'b0b8f890-7ac4-48e6-8763-01cd8c1ecb17',
  'X-Microsoft-Skype-Chain-ID',
  '6a9e33d6-2986-40a7-995d-aba1635d8b57',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rz76YQAAAAB5AmMa2srNSJbK8c+HyIIOQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:20:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"a01f1300-160b-4363-a38d-6a52581b4909"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '751de136-3f19-4428-acdb-2530d71c5ea9',
  'X-Microsoft-Skype-Chain-ID',
  'e65af656-1e3a-43ab-aa92-2a9553aee893',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0sj76YQAAAADxMB7jgx81RKqO5/D7kw0gQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:20:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"callbackUri":"https://endpoint/callback","participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}}})
  .query(true)
  .reply(202, {"operationId":"016326ec-5188-4a29-9e5d-7e4cef86aa98","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '0f896714-a3e6-4be4-8edf-f5b783bfa8b8',
  'X-Microsoft-Skype-Chain-ID',
  'c2bcd674-962c-405e-9759-72e4e5c77da4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vD76YQAAAACl9KwQPTGNRYO+iwNxcFmsQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:20:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:remove', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}}})
  .query(true)
  .reply(202, "", [
  'x-ms-client-request-id',
  '15f441b1-216a-49fe-81d1-8cb2765531c5',
  'X-Microsoft-Skype-Chain-ID',
  '139d4f7e-7ba1-4a82-8c0c-2985c68ea486',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xT76YQAAAAB/PYDl2WbGQ79VricVqDz+Qk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:20:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/a01f1300-1a76-49b2-9e19-1689978a8587/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '6a9e33d6-2986-40a7-995d-aba1635d8b57',
  'x-ms-client-request-id',
  '37ca628a-e7d2-4faf-848c-b76ee12a3fa9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yj76YQAAAABxhRNTLWs4RJ1ll2ISMOrgQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:20:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/a01f1300-160b-4363-a38d-6a52581b4909/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '6a9e33d6-2986-40a7-995d-aba1635d8b57',
  'x-ms-client-request-id',
  '13fe2b47-1171-450d-a1b6-b7af332e9552',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yj76YQAAAABGkUxOsgSPSISl9mEdxXgGQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:20:26 GMT',
  'Content-Length',
  '0'
]);
