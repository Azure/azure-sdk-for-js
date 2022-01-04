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
  'ODBm+jgUrEScJWQ3tIPTag.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '246ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0h53UYQAAAAALn0/PiXNRSqXLjOD8hZAqTUlBMzAxMDAwMTA5MDM1ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 04 Jan 2022 19:18:31 GMT'
]);
