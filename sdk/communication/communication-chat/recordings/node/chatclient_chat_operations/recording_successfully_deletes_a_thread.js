let nock = require('nock');

module.exports.hash = "5f24872081379cf3a7425479e8f94dde";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Abj6i-OBgaSVOJAjHx8MrVMyZ3uGIaCZPnrNf9EYYzxM1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ru63iuBtrE2BHcEI6kEkyg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '320ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03r35YQAAAACRGy07meNkT4jO5HewpYQgUERYMzFFREdFMDIxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:10:22 GMT'
]);
