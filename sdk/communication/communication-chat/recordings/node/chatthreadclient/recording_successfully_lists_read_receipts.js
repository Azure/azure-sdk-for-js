let nock = require('nock');

module.exports.hash = "9efaea99e71681e119e42483f0f46e96";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A6GWcNAPQG7ZctIOLMIvOZnlvHJo5gahbUshyKQfgCa41%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-159f-281b-e3c7-593a0d00f59c"}},"chatMessageId":"1629767961421","readOn":"2021-08-24T01:19:21Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'w/tXxNuoKkWUKA2cfa8SoA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '139ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0G0kkYQAAAADRdYMYpjSjSpmAemtacF0qUERYMzFFREdFMDIxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 24 Aug 2021 01:19:23 GMT'
]);
