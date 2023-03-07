let nock = require('nock');

module.exports.hash = "7d5412dce3f01fb6c33a499f48c9f34b";

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
  '2MmUMjYF5k2C4pOvKg0Zzg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '237ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FqMDYwAAAAC0AcRGO+YxTbhc7a51KiOsUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:02 GMT'
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
  'xdMcLNL2bE+qolkgPy8oew.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '190ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F6MDYwAAAACOef7mjUnMQYBHMFmctJ57UFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:03 GMT'
]);
