let nock = require('nock');

module.exports.hash = "a92708ae1f92c8ee7d543004ff63fb0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7c2-e122-0e04-343a0d00de2f"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'TzNenkGlmEmVWPEoTG+TSQ.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '2f505d4b-077f-4c25-9e52-b5c55a744f38',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '57ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zT/hYQAAAABiqTODt+RKQ70P3K6dxslHQk9NMDFFREdFMDUxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:18:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7c2-e122-0e04-343a0d00de2f"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"5f201300-8031-4f34-85c6-171732bc1217"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '54b0b1b2-978d-4461-888f-31813cfe4ed0',
  'X-Microsoft-Skype-Chain-ID',
  '4485a7e3-f989-4d39-885c-869e5e7a7d86',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zj/hYQAAAAAu7xKbecLVTrxb4LOH4c+EQk9NMDFFREdFMDUxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:18:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/5f201300-8031-4f34-85c6-171732bc1217/:keepAlive')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '4485a7e3-f989-4d39-885c-869e5e7a7d86',
  'x-ms-client-request-id',
  '0a0e06b1-7333-4cdc-b5c7-8ca83602b4c8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00D/hYQAAAAAZprSUYFYaSbff6iqvBEmlQk9NMDFFREdFMDUxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:18:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/callConnections/5f201300-8031-4f34-85c6-171732bc1217')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '4485a7e3-f989-4d39-885c-869e5e7a7d86',
  'x-ms-client-request-id',
  'd8f07912-8eda-4b1c-8a4a-6939b7add4bb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03D/hYQAAAAD8WQGy/8QZSYZvxYzGfA3UQk9NMDFFREdFMDUxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:18:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/5f201300-8031-4f34-85c6-171732bc1217/:keepAlive')
  .query(true)
  .reply(404, {"error":{"code":"8522","message":"Call not found."}}, [
  'Content-Length',
  '53',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '2f6908e5-9f71-42c1-8a7b-357ca989db4f',
  'x-ms-client-request-id',
  'c7abeaef-14f6-4f60-9640-27b881b1c865',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03z/hYQAAAACJ+JWXnnnQR65bck2USGgrQk9NMDFFREdFMDUxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:18:23 GMT'
]);
