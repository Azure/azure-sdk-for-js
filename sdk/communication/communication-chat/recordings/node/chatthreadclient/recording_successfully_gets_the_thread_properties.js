let nock = require('nock');

module.exports.hash = "83c28f4ed758d8c7b92b56697f30ed8a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:oXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1@thread.v2","topic":"test topic","createdOn":"2021-06-14T21:15:13Z","createdByCommunicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'XRdx7dUhEE6IUutFLXPemA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '262ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04sbHYAAAAACM40SCEl8aR7nqx/bVNqS3UERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:14 GMT'
]);
