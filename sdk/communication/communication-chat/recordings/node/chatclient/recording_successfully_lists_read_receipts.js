let nock = require('nock');

module.exports.hash = "d5ac84c6512134066cc2b9a1c527b9a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/readreceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e","chatMessageId":"1600132531629","readOn":"2020-09-15T01:15:31Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'uQvxSIW3SEaaqZDeJ+gy0g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '78ms',
  'X-Azure-Ref',
  '0tRVgXwAAAACzJBDsDsJGR7neoafbRrWeV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:33 GMT'
]);
