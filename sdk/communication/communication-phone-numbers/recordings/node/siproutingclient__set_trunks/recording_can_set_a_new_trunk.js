let nock = require('nock');

module.exports.hash = "e27481b713944f76470e9e85151167c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"111.fqdn.com":{"sipSignalingPort":1231}}})
  .query(true)
  .reply(200, {"trunks":{"777.fqdn.com":{"sipSignalingPort":5678},"888.fqdn.com":{"sipSignalingPort":5678},"111.fqdn.com":{"sipSignalingPort":1231}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'MuKu9knrQ0mFZap+iC4qWQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '1001ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0gLsPYwAAAAAX891wtgSwTIg2K8LAEwndUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"777.fqdn.com":{"sipSignalingPort":5678},"888.fqdn.com":{"sipSignalingPort":5678},"111.fqdn.com":{"sipSignalingPort":1231}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'eN2nP9rGi0SzT5VSv9d88Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '380ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0gbsPYwAAAADgX9GAgSG/Q4RZiTuzy8UZUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:25 GMT'
]);
