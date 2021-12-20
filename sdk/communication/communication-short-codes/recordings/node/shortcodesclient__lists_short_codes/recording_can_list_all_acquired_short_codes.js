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
  'pzJRim7++0atiZRsFi4cIA.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '237ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09grBYQAAAACLMmS2x9MCT6+pQFCDqxF3TUlBMzAxMDAwMTA5MDIxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Mon, 20 Dec 2021 23:00:06 GMT'
]);
