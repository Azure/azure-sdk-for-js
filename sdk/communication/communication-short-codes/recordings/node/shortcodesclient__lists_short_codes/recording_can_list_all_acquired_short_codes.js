let nock = require('nock');

module.exports.hash = "5961d6997afea3ffd1118dfacea58c64";

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
  'v8XKfIEgoEGkN9iaiACDlA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '1505ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fP7mYQAAAAAv7CxNa0R1SrLrvV+6+FWATUlBRURHRTIyMTMAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 18 Jan 2022 17:53:01 GMT'
]);
