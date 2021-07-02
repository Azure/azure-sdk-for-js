let nock = require('nock');

module.exports.hash = "9efaea99e71681e119e42483f0f46e96";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}},"chatMessageId":"1623705316364","readOn":"2021-06-14T21:15:17Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'DIgH5Lkrmkeysj3ixFhAlw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '254ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '06MbHYAAAAACr7sUtac1+RbD53WNAmBmcUERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:20 GMT'
]);
