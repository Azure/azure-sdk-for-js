let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1614993263622"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://kimtestacs.communication.azure.com/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41@thread.v2/messages/1614993263622',
  'MS-CV',
  '8MmWVu9sekS2oznweRhj1Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '153ms',
  'X-Azure-Ref',
  '0b9dCYAAAAABM3WaxUomVQ6TU+9Yax6e4WVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:23 GMT'
]);
