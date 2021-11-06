let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'dee07769-9593-4083-baea-2ce996366500',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgEy-PZ1-XFDsJbn4tOc81g; expires=Mon, 06-Dec-2021 02:08:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Nov 2021 02:08:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163616448381601567","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/5056902d-f0c9-4570-8dc9-21607e8d45e8',
  'x-request-id',
  '5bf49067-7cd1-40c6-8a09-757bedadb61f',
  'x-envoy-upstream-service-time',
  '536',
  'apim-request-id',
  '5bf49067-7cd1-40c6-8a09-757bedadb61f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5056902d-f0c9-4570-8dc9-21607e8d45e8')
  .reply(200, {"hookId":"5056902d-f0c9-4570-8dc9-21607e8d45e8","hookName":"js-test-webHook-163616448381601567","hookType":"Webhook","externalLink":"","description":"description","admins":["azure_client_id"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '306',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '650e2d0c-abd1-47f8-8e8b-57b8a14e856b',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '650e2d0c-abd1-47f8-8e8b-57b8a14e856b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:05 GMT'
]);
