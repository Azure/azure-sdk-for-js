let nock = require('nock');

module.exports.hash = "56e6418e4edb192b7cf3ed51a0477e41";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:069d3bbafc4840df836c5fe8e232a17f@thread.v2","topic":"test topic","isDeleted":false,"lastMessageReceivedOn":"2020-09-15T01:15:30Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MTtLJlz4f0C6wl/NutdDmg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '92ms',
  'X-Azure-Ref',
  '0shVgXwAAAAAyxrushZzwS4ScuDHInDYLV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:30 GMT'
]);
