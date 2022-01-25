let nock = require('nock');

module.exports.hash = "6072ddcf6757aa82a80571cb0a5928f6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"bf201300-9542-4148-802b-6d3f9fd3d2c3"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6a481af7-995e-492c-ba49-040c0c953231',
  'X-Microsoft-Skype-Chain-ID',
  'ccdc1c8a-e788-4663-b0e8-931d4553cdca',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0PyDwYQAAAADFG+xyOtIpT5jfEc8KKgZKREVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 16:07:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"bf201300-194e-407c-abde-2c4604a3d2e7"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '530cc1b4-89e4-4f75-b55e-de3f30a0f66e',
  'X-Microsoft-Skype-Chain-ID',
  '9eeba115-15ee-4134-9456-45d809f398d8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QSDwYQAAAABs5EYPCwioSoHVPtqi26PfREVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 16:07:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"callbackUri":"https://endpoint/callback","participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(202, {"operationId":"7717f77c-33e3-44b4-9163-82792790011b","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '0236b63a-550e-45ca-989c-e670ee9cf3aa',
  'X-Microsoft-Skype-Chain-ID',
  '895ec9b1-7c89-47d8-97eb-12716d53770b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0VSDwYQAAAABV+rUOCIGrQ4HSSJjc4fYzREVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 16:07:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/participants:remove', {"callLocator":{"groupCallId":"1212b187-3379-51fd-ac4f-89756d7fb74a"},"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(202, "", [
  'x-ms-client-request-id',
  '3096173b-92a8-4ab1-bfeb-abc215d14dbb',
  'X-Microsoft-Skype-Chain-ID',
  'fce38575-8da6-43d5-9987-eb3a42e9fbb0',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0giDwYQAAAAAbbFlK9WOTQroD3O+g9nGKREVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 16:08:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/bf201300-9542-4148-802b-6d3f9fd3d2c3/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'abd477ae-fd2e-45de-b9e9-dbfbe7cd2833',
  'x-ms-client-request-id',
  'fb144a50-a3d0-46a2-950f-884d9d661d35',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jyDwYQAAAADvEtpPoBQyTKv+XT4iqK6YREVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 16:08:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/bf201300-194e-407c-abde-2c4604a3d2e7/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'abd477ae-fd2e-45de-b9e9-dbfbe7cd2833',
  'x-ms-client-request-id',
  '6bd9b0c6-6647-4aea-a451-80ad87829a8d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kCDwYQAAAABoY0zBqyTMR4FUTeu1t9JLREVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 16:08:47 GMT',
  'Content-Length',
  '0'
]);
