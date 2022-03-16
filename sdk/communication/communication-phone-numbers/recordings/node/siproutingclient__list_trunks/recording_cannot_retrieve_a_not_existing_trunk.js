let nock = require('nock');

module.exports.hash = "89805621ee57a21e8aafb427fb1a3490";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'h10mvQDQ0EmfPFBKuzMKCw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '259ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bLsPYwAAAABPZMYuEg0HRZGeOij53vpBUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:04 GMT'
]);
