let nock = require('nock');

module.exports.hash = "249aab18203729a212201d3b43328029";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes')
  .query(true)
  .reply(200, {"shortCodes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '8SX/6CBWzEiAP1yOkfnHNg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '321ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dHxUYgAAAACzFspg7/ijRY9u8ctjdC/yTUVYMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Apr 2022 19:07:32 GMT'
]);
