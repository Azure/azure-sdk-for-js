let nock = require('nock');

module.exports.hash = "cb45fa53cb5d83c598a46274e82e7c8f";

module.exports.testInfo = {"uniqueName":{"js-test-sqlServerCred-":"js-test-sqlServerCred-164264036985608229","js-test-datalakeCred-":"js-test-datalakeCred-164264036985603664","js-test-servicePrincipalCred-":"js-test-servicePrincipalCred-164264036985605505","js-test-servicePrincipalInKVCred-":"js-test-servicePrincipalInKVCred-164264036985602901"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-164264036985608229","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/2527beee-a546-4f61-b95a-e807d5c645a2',
  'x-request-id',
  '78f45dbc-5e69-4d6d-bc53-98f72fda6971',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '78f45dbc-5e69-4d6d-bc53-98f72fda6971',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/2527beee-a546-4f61-b95a-e807d5c645a2')
  .reply(200, {"dataSourceCredentialId":"2527beee-a546-4f61-b95a-e807d5c645a2","dataSourceCredentialName":"js-test-sqlServerCred-164264036985608229","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '748306ce-c2bc-4858-8b5d-f456d0113a8c',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '748306ce-c2bc-4858-8b5d-f456d0113a8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:30 GMT'
]);
