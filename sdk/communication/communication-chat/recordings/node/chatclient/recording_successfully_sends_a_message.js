let nock = require('nock');

module.exports.hash = "44a1a3fb76689a98de0cbdfbe9b12da6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1600132531629"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://23.100.36.56/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f@thread.v2/messages/1600132531629',
  'MS-CV',
  'FIg3LxgblEGJIxYzt0fwOA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '385ms',
  'X-Azure-Ref',
  '0sxVgXwAAAACkhkEcouZ3T6w5FninU+PvV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:31 GMT'
]);
