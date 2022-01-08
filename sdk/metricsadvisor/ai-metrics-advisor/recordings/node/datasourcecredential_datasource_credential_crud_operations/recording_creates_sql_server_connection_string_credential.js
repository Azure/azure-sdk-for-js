let nock = require('nock');

module.exports.hash = "cb45fa53cb5d83c598a46274e82e7c8f";

module.exports.testInfo = {"uniqueName":{"js-test-sqlServerCred-":"js-test-sqlServerCred-164160823668208076","js-test-datalakeCred-":"js-test-datalakeCred-164160823668202890","js-test-servicePrincipalCred-":"js-test-servicePrincipalCred-164160823668205408","js-test-servicePrincipalInKVCred-":"js-test-servicePrincipalInKVCred-164160823668206422"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-164160823668208076","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc',
  'x-request-id',
  '6b38ba06-ccb6-4b8e-886b-6d24506b013b',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '6b38ba06-ccb6-4b8e-886b-6d24506b013b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc')
  .reply(200, {"dataSourceCredentialId":"c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc","dataSourceCredentialName":"js-test-sqlServerCred-164160823668208076","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6c904079-ab1a-4473-9644-243f4b0d4bda',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '6c904079-ab1a-4473-9644-243f4b0d4bda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:17 GMT'
]);
