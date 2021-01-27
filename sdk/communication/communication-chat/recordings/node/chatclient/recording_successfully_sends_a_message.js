let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1611606392859"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://13.64.171.212/chat/threads/19%3A14724b43dee94c22a938d44457110b8a@thread.v2/messages/1611606392859',
  'MS-CV',
  'JC8ltbis102p7mCNbHjZxA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '122ms',
  'X-Azure-Ref',
  '0eCkPYAAAAACcIYKmFVVmQ6IsniroLx2nWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:32 GMT'
]);
