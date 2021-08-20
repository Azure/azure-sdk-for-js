let nock = require('nock');

module.exports.hash = "2cb650a24e68484a6ecfc3844b10c3c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2/typing', {})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'Z0CHLnQt602jSBYaVvXQfA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-04-05-preview6',
  'X-Processing-Time',
  '164ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bP0fYQAAAADQ3j3mdrkKSqRkQq+PFq3cUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:24 GMT',
  'Content-Length',
  '0'
]);
