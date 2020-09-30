let nock = require('nock');

module.exports.hash = "fb5e8197d261ca82151def1448387286";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/messages/1600132531629')
  .query(true)
  .reply(200, {"id":"1600132531629","type":"Text","priority":"Normal","version":"1600132531629","content":"content","senderDisplayName":"","createdOn":"2020-09-15T01:15:31Z","senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'pk99aJmf+UGBZucPu7I4IA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '81ms',
  'X-Azure-Ref',
  '0tBVgXwAAAADYcNiBWXSsS6Mlrzo8kRy3V1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:32 GMT'
]);
