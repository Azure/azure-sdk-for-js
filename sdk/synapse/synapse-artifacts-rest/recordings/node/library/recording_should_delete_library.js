let nock = require('nock');

module.exports.hash = "69e4e0d498dcae86c4d687c622aefba9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '27a9c3ed-e024-4558-93b6-63637d0a4d00',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgQ8Fa9jwhJAo4vW4fuiLdrKOuyWCgAAAAhyXdgOAAAA; expires=Sat, 17-Jul-2021 16:41:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8RuK38ORN6dHBUtx3DJSBAs2XyT5HlLgIUkqg3gjifQkwba2o6Xd5iXDm4qmTrJGU7nsKO60i6crpmb9Mrasz9AAZCN8CGybFr94p95Rbazt9GVYbREi1PSUR5tN4wLO_48XsvDNxHg4SpRhwljDVqmUcOit8Ym5W3XBceqXYyggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 16:41:20 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '279a36dd-3cda-4a3a-b4ef-e8abd1b89c00',
  'x-ms-ests-server',
  '2.1.11829.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgQ8Fa9jwhJAo4vW4fuiLdrKOuyWCgAAAAhyXdgOAAAA; expires=Sat, 17-Jul-2021 16:41:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsZGGCaIrLI_dhdmqcMF-1onIqUSK6EWf4pTakssyL3BHaDO_fbHErxEek2kbW2uH5Bs-25_VQhnZM7k0lXgmSxZTbIbW6RJZGLgsUwbHO3qZ3QsYVnZCKQWVkDLxaFXqxhozjjTjOcSkGUlQ8bWgyEgH_7ocnqy8DXF3Oi9804QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 16:41:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=8578db0e-b46c-423e-91d5-81b0cafdf8e9&client_secret=azure_client_secret")
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
  '23930fd5-a06e-4043-bdb3-22362ff73d00',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgQ8Fa9jwhJAo4vW4fuiLdrKOuyWCgAAAAhyXdgOAAAA; expires=Sat, 17-Jul-2021 16:41:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 16:41:20 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .delete('/libraries/testLibraryName3.jar')
  .query(true)
  .reply(202, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/libraries/testLibraryName3.jar","recordId":0,"state":"Deleting","created":"0001-01-01T00:00:00","changed":"0001-01-01T00:00:00","type":"LibraryArtifact","name":"testLibraryName3.jar","operationId":"f2cc107b-bc24-412c-9c5a-81763254ba07"}, [
  'Content-Length',
  '372',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07?api-version=2019-06-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Location',
  'x-ms-request-id',
  'bf1b1fe0-f754-424b-85a2-9a14f79cb9fa',
  'Date',
  'Thu, 17 Jun 2021 16:41:19 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07?api-version=2019-06-01-preview',
  'Retry-After',
  '1',
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
  '9fcedd94-ae76-4e83-8d06-4343a1a6b503',
  'Date',
  'Thu, 17 Jun 2021 16:41:19 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07?api-version=2019-06-01-preview',
  'Retry-After',
  '1',
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
  'aa039bac-71b1-4ec1-a6e3-aca2d72ecfe7',
  'Date',
  'Thu, 17 Jun 2021 16:41:22 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07?api-version=2019-06-01-preview',
  'Retry-After',
  '1',
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
  '0b9591d6-140d-44c0-a6a4-41fa22e86868',
  'Date',
  'Thu, 17 Jun 2021 16:41:23 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/libraryOperationResults/f2cc107b-bc24-412c-9c5a-81763254ba07')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '83d2bba3-800c-476c-8336-c0a4f7b11b40',
  'Date',
  'Thu, 17 Jun 2021 16:41:25 GMT'
]);
