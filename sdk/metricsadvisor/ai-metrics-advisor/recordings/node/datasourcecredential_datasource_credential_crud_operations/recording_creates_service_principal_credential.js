let nock = require('nock');

module.exports.hash = "2e4fa53335bfc4a276c6308e83b59eb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-163978895648408359","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/credentials/ec229472-182b-4961-bcd0-c329f6aa5f4a',
  'x-request-id',
  '49f2fae1-f200-4179-baa2-0340ea23ac2b',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  '49f2fae1-f200-4179-baa2-0340ea23ac2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/ec229472-182b-4961-bcd0-c329f6aa5f4a')
  .reply(200, {"dataSourceCredentialId":"ec229472-182b-4961-bcd0-c329f6aa5f4a","dataSourceCredentialName":"js-test-servicePrincipalCred-163978895648408359","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '316',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a0cfa299-2502-46a8-8115-619514f0011e',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'a0cfa299-2502-46a8-8115-619514f0011e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:58 GMT'
]);
