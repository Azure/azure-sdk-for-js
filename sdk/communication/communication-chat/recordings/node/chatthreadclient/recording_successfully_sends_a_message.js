let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1613524939985"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://mattstestresource.communication.azure.com/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb@thread.v2/messages/1613524939985',
  'MS-CV',
  'CAYAmBUvGkOzmJkmhrXl/A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '505ms',
  'X-Azure-Ref',
  '0y28sYAAAAADOW4cjdgYTT4H4VosBDxVfU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:19 GMT'
]);
