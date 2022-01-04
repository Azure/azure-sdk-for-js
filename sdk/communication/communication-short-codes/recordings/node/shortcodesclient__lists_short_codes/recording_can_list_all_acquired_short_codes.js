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
  '5FVQ/1MmokKBjdhFRl/wRQ.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '535ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Pt7UYQAAAADaLEFxRyIITIkS5CTxaw9MTUlBMzAxMDAwMTA5MDMxADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 04 Jan 2022 23:54:38 GMT'
]);
