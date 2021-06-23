let nock = require('nock');

module.exports.hash = "3f3e581d127d4ee7534cf66acf4944a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1%40thread.v2/participants/:remove', {"communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827"}})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'qFO+14I8ZUqaoGOVHSuw/w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '514ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '06MbHYAAAAADOHuUDKsoARoYH96bjACYyUERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:20 GMT'
]);
