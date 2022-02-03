let nock = require('nock');

module.exports.hash = "11769d8cc43be48e902c010967199d1c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-58cb-b586-28c5-593a0d00ffc0"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'kS3yB4tjCUKyG5+JXMsLzA.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7ce2d264-bcdb-41a3-bfbf-2f637db96a08',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '33ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Dhf6YQAAAADlwxFp7CChQaNBR8mbyZzCS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 05:30:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-58cb-b586-28c5-593a0d00ffc0"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"06201300-e1e5-43b0-9d78-11695e0ccae7"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'e11eca9a-2da5-4705-b18a-df6a64d5ef68',
  'X-Microsoft-Skype-Chain-ID',
  'f5b091cc-43a8-4c59-8fcc-d2c7c8cfd886',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Dxf6YQAAAABf0JWUKqIvT5tFJngh8MKdS1VMMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 05:30:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/06201300-e1e5-43b0-9d78-11695e0ccae7/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}}})
  .query(true)
  .reply(202, {"operationId":"0d0951c4-cc21-497e-82f8-6968efbff346","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'f5b091cc-43a8-4c59-8fcc-d2c7c8cfd886',
  'x-ms-client-request-id',
  '6c16078e-42bd-48cd-8e2b-5556acbc7e41',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Ghf6YQAAAADjYBh6zfhpR4EjH1xBNMZPS1VMMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 05:31:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/06201300-e1e5-43b0-9d78-11695e0ccae7/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f5b091cc-43a8-4c59-8fcc-d2c7c8cfd886',
  'x-ms-client-request-id',
  'a8fa0a79-617b-476b-b882-a7c9b6500788',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JRf6YQAAAADBaz6I0CncTb9lLbMVtSNeS1VMMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 05:31:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/06201300-e1e5-43b0-9d78-11695e0ccae7/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f5b091cc-43a8-4c59-8fcc-d2c7c8cfd886',
  'x-ms-client-request-id',
  'a29f3406-3742-4d7a-8a8c-e1ab6b86218e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0KRf6YQAAAADXZqoRx77PS6CTEQTB5JPrS1VMMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 05:31:21 GMT',
  'Content-Length',
  '0'
]);
