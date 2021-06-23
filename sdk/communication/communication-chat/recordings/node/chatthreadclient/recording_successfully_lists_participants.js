let nock = require('nock');

module.exports.hash = "95dcb31f768c13ecb44ca6ed39d58046";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AoXeDm2YWQ-rjbfG0ilcCtPs5GBwZEeVt5ssFsYc0Ehc1%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"communicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-8140-7679-5b3a0d000826"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-820c-7679-5b3a0d000827"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-9bbd-7679-5b3a0d000828","communicationUser":{"id":"8:acs:1b5cc06b-f352-4571-b1e6-d9b259b7c776_0000000a-ac42-9bbd-7679-5b3a0d000828"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'PYclnk3AREaOhcBZhdurFw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '267ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '058bHYAAAAAB4UnwSKij5S6Dxm+kWHJX0UERYMzFFREdFMDIxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Mon, 14 Jun 2021 21:15:19 GMT'
]);
