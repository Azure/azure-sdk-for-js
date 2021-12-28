let nock = require('nock');

module.exports.hash = "cb45fa53cb5d83c598a46274e82e7c8f";

module.exports.testInfo = {"uniqueName":{"js-test-sqlServerCred-":"js-test-sqlServerCred-163702281643106715","js-test-datalakeCred-":"js-test-datalakeCred-163702281643103059","js-test-servicePrincipalCred-":"js-test-servicePrincipalCred-163702281643106518","js-test-servicePrincipalInKVCred-":"js-test-servicePrincipalInKVCred-163702281643108508"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-163702281643106715","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/44d64215-151e-441d-a446-44477a71f5c6',
  'x-request-id',
  '61e751f2-1464-4e04-8572-b8118cfb689c',
  'x-envoy-upstream-service-time',
  '399',
  'apim-request-id',
  '61e751f2-1464-4e04-8572-b8118cfb689c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/44d64215-151e-441d-a446-44477a71f5c6')
  .reply(200, {"dataSourceCredentialId":"44d64215-151e-441d-a446-44477a71f5c6","dataSourceCredentialName":"js-test-sqlServerCred-163702281643106715","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '49d17afa-d052-445b-ac43-8b8a433fdee0',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '49d17afa-d052-445b-ac43-8b8a433fdee0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:36 GMT'
]);
