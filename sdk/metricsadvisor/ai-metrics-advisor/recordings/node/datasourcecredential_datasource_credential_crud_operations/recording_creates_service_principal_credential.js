let nock = require('nock');

module.exports.hash = "2e4fa53335bfc4a276c6308e83b59eb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"js-test-servicePrincipalCred-163702281643106518","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"clientId":"client-id","clientSecret":"client-secret","tenantId":"tenant-id"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/d92566c8-6a08-4ddc-917f-120139250878',
  'x-request-id',
  'd7b68223-916f-47db-a868-9bfe11e16f08',
  'x-envoy-upstream-service-time',
  '465',
  'apim-request-id',
  'd7b68223-916f-47db-a868-9bfe11e16f08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/d92566c8-6a08-4ddc-917f-120139250878')
  .reply(200, {"dataSourceCredentialId":"d92566c8-6a08-4ddc-917f-120139250878","dataSourceCredentialName":"js-test-servicePrincipalCred-163702281643106518","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"client-id","tenantId":"tenant-id"}}, [
  'Content-Length',
  '316',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2f7c8286-6d82-430f-8935-eecafc3ea566',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '2f7c8286-6d82-430f-8935-eecafc3ea566',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:38 GMT'
]);
