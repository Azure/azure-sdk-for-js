let nock = require('nock');

module.exports.hash = "fb5e8197d261ca82151def1448387286";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/messages/1610503608398')
  .query(true)
  .reply(200, {"id":"1610503608398","type":"Text","priority":"Normal","version":"1610503608398","content":"content","senderDisplayName":"","createdOn":"2021-01-13T02:06:48Z","senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'vkcy4nhGgkObzkQigB3ZQg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '75ms',
  'X-Azure-Ref',
  '0uVX+XwAAAADaKFC5EZXIRZJV7Fnt0m0+V1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:49 GMT'
]);
