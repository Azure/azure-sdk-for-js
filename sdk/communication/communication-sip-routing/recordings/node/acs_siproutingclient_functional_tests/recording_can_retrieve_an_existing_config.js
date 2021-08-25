let nock = require('nock');

module.exports.hash = "3af516a69e2b5b8fbb6ac9250688dce4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'OxVhzxI6J0WJS+Tz8p2lSQ.0',
  'X-Processing-Time',
  '92ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iYolYQAAAAA0g3Nzf8VQTZ76QEnBq4E3UFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:49 GMT'
]);
