let nock = require('nock');

module.exports.hash = "2e4fa53335bfc4a276c6308e83b59eb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-163636434695309101","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c',
  'x-request-id',
  'f6ca79e8-2de8-4236-8a92-9b5fcb114824',
  'x-envoy-upstream-service-time',
  '294',
  'apim-request-id',
  'f6ca79e8-2de8-4236-8a92-9b5fcb114824',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:08 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c')
  .reply(200, {"dataSourceCredentialId":"fb5f6aa0-4915-43d5-a006-bc9c6a4c3a5c","dataSourceCredentialName":"js-test-servicePrincipalCred-163636434695309101","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '316',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c45bdb1d-01ec-4ea9-b189-36dfcc784ea2',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'c45bdb1d-01ec-4ea9-b189-36dfcc784ea2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:08 GMT'
]);
