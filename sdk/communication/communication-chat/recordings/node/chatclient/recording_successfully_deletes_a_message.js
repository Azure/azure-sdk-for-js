let nock = require('nock');

module.exports.hash = "6f90ac401c7903dfc7bd077bcdb108f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/messages/1605570543468')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'frMFsL/HMU20F1bwkq3peA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '426ms',
  'X-Azure-Ref',
  '08Q+zXwAAAAAFtO4L1lKNSpWoop3CYW3SV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:05 GMT'
]);
