let nock = require('nock');

module.exports.hash = "e811d91fee0a8c830e94b3f91f3c461d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:8dbd0526e07a41ab8982a9e29a042127@thread.v2","topic":"test topic","lastMessageReceivedOn":"2020-12-03T04:27:38Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'fP4pFWf2x0O3TIaWfdk2Qg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '418ms',
  'X-Azure-Ref',
  '0OmnIXwAAAADwbIprH8V8TKs19qmFFG+aWVZSMzBFREdFMDQxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:38 GMT'
]);
