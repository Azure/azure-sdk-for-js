let nock = require('nock');

module.exports.hash = "2bd21be6c7d03e230b9633b3c74df963";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f6e0-fe99-1000-343a0d00ea76"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '4VYb1Y/gnUSNnH/UZbzMGQ.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '39db5f81-0c52-47d1-8dde-e21e3be54bdf',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '31ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+QXhYQAAAABL/Q1pHXlvTIenqN8K1PzMREVMMDFFREdFMDYwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 05:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f6e0-fe99-1000-343a0d00ea76"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"a5201300-aea0-4b4f-9e98-7e65cfa526f5"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '58d81025-5783-4adc-bacf-1e8025fb1f48',
  'X-Microsoft-Skype-Chain-ID',
  '171204da-87a7-4e11-b8d8-277c10d82933',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+gXhYQAAAADdKWszKuHkS5ql/OUcejwZREVMMDFFREdFMDUxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 05:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/a5201300-aea0-4b4f-9e98-7e65cfa526f5/:transferToCall', {"targetCallConnectionId":"95201300-2190-4dfd-a254-f0ff7d55af05","userToUserInformation":""})
  .query(true)
  .reply(400, {"error":{"code":"8501","message":"Action is invalid when call is not in Established state"}}, [
  'Content-Length',
  '93',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '171204da-87a7-4e11-b8d8-277c10d82933',
  'x-ms-client-request-id',
  'd90fa21d-994d-4f9e-ab4e-41412d9023d5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/gXhYQAAAAAmNis4YSUtRrVaugcBdnltREVMMDFFREdFMDUxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 05:11:25 GMT'
]);
