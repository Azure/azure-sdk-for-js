let nock = require('nock');

module.exports.hash = "5a2895fae0007d1981d0d301e47888e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"name":"invalidRoutingTrunkRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["notExisting.fqdn.com"]}]})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"MissingTrunk","message":"Route targeting a missing trunk."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'BMlNXGuGBkaHIGsKGznTOg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '228ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fbsPYwAAAAAmfcgsfxRHS7NeB8ClUyQLUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"111.fqdn.com":{"sipSignalingPort":8239},"222.fqdn.com":{"sipSignalingPort":7348}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'xAWei28SxUCDVTS0v1MTwQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '288ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fbsPYwAAAADu/NMkriTYSIbEizWpmcjnUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:21 GMT'
]);
