let nock = require('nock');

module.exports.hash = "e55b24bca85df7c28afcc70e3c6d6993";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '62ef029d-b4b5-404c-a403-599c32153100',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Am8SB5kzXPRLtY4n6CW_iE9J0eYvAQAAAO_5OtcOAAAA; expires=Wed, 09-Dec-2020 08:50:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 09 Nov 2020 08:50:55 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .put('/dataflows/shangweidataflow', {"properties":{"type":"MappingDataFlow"}})
  .query(true)
  .reply(202, {"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.Synapse/workspaces/workspace_name/dataflows/shangweidataflow","recordId":455489,"state":"Updating","created":"2020-11-06T13:14:44.7833333Z","changed":"2020-11-06T13:21:30.77Z","type":"DataFlow","name":"shangweidataflow","operationId":"4ba6a852-0292-4a66-9cac-abc794bf391d","artifactId":"CCFD1E01-93C8-4D91-A77D-263F030E79A3"}, [
  'Content-Length',
  '442',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://workspace_name.dev.azuresynapse.net/operationResults/4ba6a852-0292-4a66-9cac-abc794bf391d?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  '685e4b42-fc43-4836-88e1-70f4503da0aa',
  'Date',
  'Mon, 09 Nov 2020 08:50:56 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/operationResults/4ba6a852-0292-4a66-9cac-abc794bf391d')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://workspace_name.dev.azuresynapse.net/operationResults/4ba6a852-0292-4a66-9cac-abc794bf391d?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  '98880f8f-acdd-49e8-ac69-f9f619081d49',
  'Date',
  'Mon, 09 Nov 2020 08:50:56 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/operationResults/4ba6a852-0292-4a66-9cac-abc794bf391d')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://workspace_name.dev.azuresynapse.net/operationResults/4ba6a852-0292-4a66-9cac-abc794bf391d?api-version=2019-06-01-preview',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Allow-Headers',
  'Retry-After',
  'Access-Control-Expose-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Retry-After',
  'x-ms-request-id',
  'c0cf0cbd-093e-4311-be50-c57ab0465e15',
  'Date',
  'Mon, 09 Nov 2020 08:50:59 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/operationResults/4ba6a852-0292-4a66-9cac-abc794bf391d')
  .query(true)
  .reply(200, {"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.Synapse/workspaces/workspace_name/dataflows/shangweidataflow","name":"shangweidataflow","type":"Microsoft.Synapse/workspaces/dataflows","properties":{"type":"MappingDataFlow"},"etag":"1100c54f-0000-0100-0000-5fa902f30000"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '339',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0 Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'x-ms-correlation-request-id',
  '346c2407-6005-4a75-9052-24ea8c3ea138',
  'X-Content-Type-Options',
  'nosniff',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-request-id',
  '27ac4cfe-3209-4398-99d8-1222f8c48caf',
  'Date',
  'Mon, 09 Nov 2020 08:51:01 GMT'
]);
