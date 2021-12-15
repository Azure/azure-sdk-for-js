let nock = require('nock');

module.exports.hash = "d87e7b9e94a632ff868121ad98deefec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes')
  .query(true)
  .reply(200, {"shortCodes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'lVL9ALr+m0exrdRA5bTtPQ.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '216ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0lGe6YQAAAACvav8YcQbwQ5eJLBxLKjoLU0pDRURHRTA1MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 15 Dec 2021 22:09:24 GMT'
]);
