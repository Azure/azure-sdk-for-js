let nock = require('nock');

module.exports.hash = "861c7575b302b227100513ffee465f66";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"d21f1300-62fd-46b5-afc8-1a48dda0ed4d"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '37ce44e0-a82c-4d08-8ac8-d3db217cd687',
  'X-Microsoft-Skype-Chain-ID',
  '5a3e4a39-231b-4ac9-8178-2b3f6a3a2f99',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hJrhYQAAAADPfoQmBvvRSoDDEm0QyXFQREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"d21f1300-51d5-46d0-90bc-d3ba6c4f5b7f"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '03270848-6715-4899-9fdc-1de48c02099b',
  'X-Microsoft-Skype-Chain-ID',
  '6ace40f3-3e20-449b-be14-32d7a4c9f4ec',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hprhYQAAAABNhvYmlrAdSax2jb4Kqnn8REVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d21f1300-62fd-46b5-afc8-1a48dda0ed4d/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '5a3e4a39-231b-4ac9-8178-2b3f6a3a2f99',
  'x-ms-client-request-id',
  'a0309efc-c03d-492f-bd60-1be9ba0fa4f5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iprhYQAAAACqguvDVUn1RLrhqu8gMt/nREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d21f1300-51d5-46d0-90bc-d3ba6c4f5b7f/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '5a3e4a39-231b-4ac9-8178-2b3f6a3a2f99',
  'x-ms-client-request-id',
  'ec71baf6-1b83-4cb2-8deb-6051198efda2',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iprhYQAAAABKhkOweJxNSrGgrG1W0PxpREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 15:45:14 GMT',
  'Content-Length',
  '0'
]);
