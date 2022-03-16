let nock = require('nock');

module.exports.hash = "a7fbe913a813cb4ac7f3085db94efb52";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"name":"sameNameRoute","numberPattern":"^+[1-9][0-9]{3,23}$"},{"name":"sameNameRoute","numberPattern":"^+[1-9][0-9]{3,23}$"}]})
  .query(true)
  .reply(400, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"DuplicatedRoute","message":"There is a duplicated route."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'g+Zx0Gc1fk+P8piDzRw+TA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '75ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ebsPYwAAAABwd6O2qA2AT7nWda/rGew5UFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457},"111.fqdn.com":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '34XjjV1Au0uFOVJe9wxd4Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '230ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ersPYwAAAABnVA+m4NwnRppCtI/t3YoKUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:17 GMT'
]);
