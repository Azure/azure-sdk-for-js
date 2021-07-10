let nock = require('nock');

module.exports.hash = "2e4fa53335bfc4a276c6308e83b59eb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-162527918841009052","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/d1916ee9-be4b-453c-a9c3-38ccdad5672a',
  'x-request-id',
  '819c88c5-a5ef-4d3a-bc28-d767e36cd42e',
  'x-envoy-upstream-service-time',
  '907',
  'apim-request-id',
  '819c88c5-a5ef-4d3a-bc28-d767e36cd42e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d1916ee9-be4b-453c-a9c3-38ccdad5672a')
  .reply(200, {"dataSourceCredentialId":"d1916ee9-be4b-453c-a9c3-38ccdad5672a","dataSourceCredentialName":"js-test-servicePrincipalCred-162527918841009052","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '316',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f4bdd220-695e-4974-acd6-1c04a5da9b8a',
  'x-envoy-upstream-service-time',
  '5326',
  'apim-request-id',
  'f4bdd220-695e-4974-acd6-1c04a5da9b8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:44 GMT'
]);
