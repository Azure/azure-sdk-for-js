let nock = require('nock');

module.exports.hash = "380cdec07305d595225bb62df352ebdc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/credentials/3ee2df85-919c-4e6a-b0b4-dca40b2d7b10', {"dataSourceCredentialType":"ServicePrincipal","dataSourceCredentialName":"UpdatedSPCred","dataSourceCredentialDescription":"updated description","parameters":{"clientId":"updated-client","clientSecret":"updated-secret","tenantId":"updated-tenant"}})
  .reply(200, {"dataSourceCredentialId":"3ee2df85-919c-4e6a-b0b4-dca40b2d7b10","dataSourceCredentialName":"UpdatedSPCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '281',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3da75e69-34bc-4fc7-9510-cae821942e36',
  'x-envoy-upstream-service-time',
  '610',
  'apim-request-id',
  '3da75e69-34bc-4fc7-9510-cae821942e36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:15 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/3ee2df85-919c-4e6a-b0b4-dca40b2d7b10')
  .reply(200, {"dataSourceCredentialId":"3ee2df85-919c-4e6a-b0b4-dca40b2d7b10","dataSourceCredentialName":"UpdatedSPCred","dataSourceCredentialDescription":"updated description","dataSourceCredentialType":"ServicePrincipal","parameters":{"clientId":"updated-client","tenantId":"updated-tenant"}}, [
  'Content-Length',
  '281',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b326300c-d6fc-4aa1-8925-1dcbd615bbb2',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'b326300c-d6fc-4aa1-8925-1dcbd615bbb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 18:52:15 GMT',
  'Connection',
  'close'
]);
