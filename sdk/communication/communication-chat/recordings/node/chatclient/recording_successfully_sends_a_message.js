let nock = require('nock');

module.exports.hash = "4ef54a833987be8d1884a033e0850755";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1606969659707"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127@thread.v2/messages/1606969659707',
  'MS-CV',
  'o8Wuo0iI706QVK0OePRolA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '662ms',
  'X-Azure-Ref',
  '0O2nIXwAAAACMu2H8tTMsTZvXAamzZqE/WVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:40 GMT'
]);
