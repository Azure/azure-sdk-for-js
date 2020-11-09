let nock = require('nock');

module.exports.hash = "fbfe6526a91323206ed0e809ec87762f";

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
  '792e977d-89c1-4a73-b64b-2b9058402500',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Av1FEdQ_nY9AiyV7a107dg5J0eYvAQAAAMREN9cOAAAA; expires=Sun, 06-Dec-2020 13:21:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 06 Nov 2020 13:21:08 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .put('/dataflows/shangweidataflow', {"properties":{"type":"MappingDataFlow"}})
  .query(true)
  .reply(202, {"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.Synapse/workspaces/workspace_name/dataflows/shangweidataflow","recordId":455489,"state":"Updating","created":"2020-11-06T13:14:44.7833333Z","changed":"2020-11-06T13:16:28.31Z","type":"DataFlow","name":"shangweidataflow","operationId":"3400118b-f901-4fd3-9365-a71c45c4efdb","artifactId":"CCFD1E01-93C8-4D91-A77D-263F030E79A3"}, [
  'Content-Length',
  '442',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://workspace_name.dev.azuresynapse.net/operationResults/3400118b-f901-4fd3-9365-a71c45c4efdb?api-version=2019-06-01-preview',
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
  '05c49e84-8f34-418a-8270-dc63cf317270',
  'Date',
  'Fri, 06 Nov 2020 13:21:10 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/operationResults/3400118b-f901-4fd3-9365-a71c45c4efdb')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://workspace_name.dev.azuresynapse.net/operationResults/3400118b-f901-4fd3-9365-a71c45c4efdb?api-version=2019-06-01-preview',
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
  '4645df97-4917-43a4-84a3-a2e5823ff599',
  'Date',
  'Fri, 06 Nov 2020 13:21:10 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/operationResults/3400118b-f901-4fd3-9365-a71c45c4efdb')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://workspace_name.dev.azuresynapse.net/operationResults/3400118b-f901-4fd3-9365-a71c45c4efdb?api-version=2019-06-01-preview',
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
  'f7049d3b-ac40-4518-93e9-43311259e463',
  'Date',
  'Fri, 06 Nov 2020 13:21:12 GMT'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/operationResults/3400118b-f901-4fd3-9365-a71c45c4efdb')
  .query(true)
  .reply(200, {"id":"/subscriptions/051ddeca-1ed6-4d8b-ba6f-1ff561e5f3b3/resourceGroups/shangwei-synapse/providers/Microsoft.Synapse/workspaces/workspace_name/dataflows/shangweidataflow","name":"shangweidataflow","type":"Microsoft.Synapse/workspaces/dataflows","properties":{"type":"MappingDataFlow"},"etag":"0d00150f-0000-0100-0000-5fa54dc80000"}, [
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
  '18f04179-f70e-4cf5-9488-e05d7a609f68',
  'X-Content-Type-Options',
  'nosniff',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-request-id',
  'a7afa4ee-56f2-4ea7-9eea-3dcf1fc9d53f',
  'Date',
  'Fri, 06 Nov 2020 13:21:14 GMT'
]);
