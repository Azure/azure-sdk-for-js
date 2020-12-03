let nock = require('nock');

module.exports.hash = "39345a98092c2d516c252dd29423ff64";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'Lx0veSvjlUCtd+7ARzx+Cw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '292ms',
  'X-Azure-Ref',
  '0QGnIXwAAAADYtwjaUI+JQZtrXLUb4HVeWVZSMzBFREdFMDQxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:44 GMT'
]);
