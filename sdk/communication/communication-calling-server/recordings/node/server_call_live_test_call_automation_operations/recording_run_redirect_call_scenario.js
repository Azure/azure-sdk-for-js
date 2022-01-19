let nock = require('nock');

module.exports.hash = "0fa25a65addfc20465976b885e4652c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"561f1300-da5c-4d7b-ae21-2f9ffc344d7f"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'd6ebbbbc-a8c5-47bd-bf1d-b187c5bc93f7',
  'X-Microsoft-Skype-Chain-ID',
  'd9f1da05-98c5-4a14-b550-171a0ec73386',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jF/gYQAAAAAt6qRoMZruRrgPuAP9EquEREVMMDFFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 17:21:17 GMT'
]);
