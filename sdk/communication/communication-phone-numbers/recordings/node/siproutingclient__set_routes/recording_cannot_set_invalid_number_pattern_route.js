let nock = require('nock');

module.exports.hash = "eb3bb8df5a4eec16c5334558adf7d766";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"name":"invalidNumberPatternRoute","numberPattern":""}]})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"InvalidRouteNumberPattern","message":"Route with an invalid number pattern."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'KHDmuVh5ikeQC4apNlJbeQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '25ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ebsPYwAAAAArxLK4kewWQKBSOO+HoGFDUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:16 GMT'
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
  '588wjujL20aspi7WkZ2mVQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '278ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ebsPYwAAAAApA8DbOaOZToceP7rjtAlCUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:17 GMT'
]);
