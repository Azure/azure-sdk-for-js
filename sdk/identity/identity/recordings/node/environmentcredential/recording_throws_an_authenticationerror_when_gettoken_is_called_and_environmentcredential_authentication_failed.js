let nock = require('nock');

module.exports.hash = "2e787f040b2b3d4e9b8018136fdfaf32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"12345678-1234-1234-1234-123456789012_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '950',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'fe836dd9-bca5-4328-b92d-f817010e3401',
  'x-ms-ests-server',
  '2.1.11530.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=fpc;; expires=Fri, 16-Apr-2021 03:26:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 17 Mar 2021 03:26:18 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(400, {"error":"invalid_12345678-1234-1234-1234-123456789012","error_description":"AADSTS90002: Tenant '12345678-1234-1234-1234-123456789012' not found. This may happen if there are no active subscriptions for the 12345678-1234-1234-1234-123456789012. Check to make sure you have the correct 12345678-1234-1234-1234-123456789012 ID. Check with your subscription administrator.\r\nTrace ID: 52dd626e-7771-44eb-8c84-09b7e4cd1200\r\nCorrelation ID: 80f90d68-d687-4276-8c4d-e764609d8163\r\nTimestamp: 2021-03-17 03:26:19Z","error_codes":[90002],"timestamp":"2021-03-17 03:26:19Z","trace_id":"52dd626e-7771-44eb-8c84-09b7e4cd1200","correlation_id":"80f90d68-d687-4276-8c4d-e764609d8163","error_uri":"https://login.microsoftonline.com/error?code=90002"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '621',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '52dd626e-7771-44eb-8c84-09b7e4cd1200',
  'x-ms-ests-server',
  '2.1.11562.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=fpc;; expires=Fri, 16-Apr-2021 03:26:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 17 Mar 2021 03:26:18 GMT'
]);
