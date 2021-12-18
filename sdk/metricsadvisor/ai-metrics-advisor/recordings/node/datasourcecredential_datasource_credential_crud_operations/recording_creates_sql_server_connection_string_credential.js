let nock = require('nock');

module.exports.hash = "cb45fa53cb5d83c598a46274e82e7c8f";

module.exports.testInfo = {"uniqueName":{"js-test-sqlServerCred-":"js-test-sqlServerCred-163978895648309718","js-test-datalakeCred-":"js-test-datalakeCred-163978895648305805","js-test-servicePrincipalCred-":"js-test-servicePrincipalCred-163978895648408359","js-test-servicePrincipalInKVCred-":"js-test-servicePrincipalInKVCred-163978895648400227"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-163978895648309718","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/credentials/fd1ceed7-0f5a-4867-83f7-e5a75d128458',
  'x-request-id',
  '23a79db4-d49f-4c65-9b34-00a27793f1f8',
  'x-envoy-upstream-service-time',
  '266',
  'apim-request-id',
  '23a79db4-d49f-4c65-9b34-00a27793f1f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/fd1ceed7-0f5a-4867-83f7-e5a75d128458')
  .reply(200, {"dataSourceCredentialId":"fd1ceed7-0f5a-4867-83f7-e5a75d128458","dataSourceCredentialName":"js-test-sqlServerCred-163978895648309718","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f938b306-b68d-4898-aa78-216255d60ab4',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  'f938b306-b68d-4898-aa78-216255d60ab4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:55:56 GMT'
]);
