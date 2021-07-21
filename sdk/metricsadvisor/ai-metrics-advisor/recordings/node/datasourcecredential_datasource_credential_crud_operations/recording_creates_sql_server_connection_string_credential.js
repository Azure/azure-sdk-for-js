let nock = require('nock');

module.exports.hash = "cb45fa53cb5d83c598a46274e82e7c8f";

module.exports.testInfo = {"uniqueName":{"js-test-sqlServerCred-":"js-test-sqlServerCred-162527918841004036","js-test-datalakeCred-":"js-test-datalakeCred-162527918841000766","js-test-servicePrincipalCred-":"js-test-servicePrincipalCred-162527918841009052","js-test-servicePrincipalInKVCred-":"js-test-servicePrincipalInKVCred-162527918841007760"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/credentials', {"dataSourceCredentialType":"AzureSQLConnectionString","dataSourceCredentialName":"js-test-sqlServerCred-162527918841004036","dataSourceCredentialDescription":"used for testing purposes only","parameters":{"connectionString":"sql-server-connection-string"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/credentials/c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86',
  'x-request-id',
  '68052932-790a-4669-8206-55531e320000',
  'x-envoy-upstream-service-time',
  '772',
  'apim-request-id',
  '68052932-790a-4669-8206-55531e320000',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86')
  .reply(200, {"dataSourceCredentialId":"c9d924ca-1f7d-4214-a8eb-59a1bfa7ed86","dataSourceCredentialName":"js-test-sqlServerCred-162527918841004036","dataSourceCredentialDescription":"used for testing purposes only","dataSourceCredentialType":"AzureSQLConnectionString","parameters":{}}, [
  'Content-Length',
  '272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'de342d26-b2d2-410a-b160-26b3152f9e47',
  'x-envoy-upstream-service-time',
  '384',
  'apim-request-id',
  'de342d26-b2d2-410a-b160-26b3152f9e47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:29 GMT'
]);
