let nock = require('nock');

module.exports.hash = "3b26ef694bf46025b536723153ef1756";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'e26d6036-8ed7-4299-8775-58c73aa43600',
  'x-ms-ests-server',
  '2.1.11829.9 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap4NeeLKqOpIlcTRHUTrwPfGLH8mAgAAAGXgZtgOAAAA; expires=Sat, 24-Jul-2021 20:22:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 24 Jun 2021 20:22:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/1409ab03-d455-465e-9df0-ef5db2cdb961')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4666cc14-a826-4061-947a-085483e932ac',
  'x-envoy-upstream-service-time',
  '5984',
  'apim-request-id',
  '4666cc14-a826-4061-947a-085483e932ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1409ab03-d455-465e-9df0-ef5db2cdb961')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c3d92522-51c4-4c5b-8b5a-30f3808a3793',
  'x-envoy-upstream-service-time',
  '5314',
  'apim-request-id',
  'c3d92522-51c4-4c5b-8b5a-30f3808a3793',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:22 GMT'
]);
