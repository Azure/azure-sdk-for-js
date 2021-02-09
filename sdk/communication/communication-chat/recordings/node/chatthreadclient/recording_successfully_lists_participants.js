let nock = require('nock');

module.exports.hash = "fac03bc2291695d3a2d13747ec814837";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ae51-b0b7-3a3a0d0000a9","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-be05-b0b7-3a3a0d0000aa","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '9IwRp/CiA0SOpMFZpIVh+Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '266ms',
  'X-Azure-Ref',
  '0U1ccYAAAAAA3uetVYgo7T6PMHgS+1P+UWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:39 GMT'
]);
