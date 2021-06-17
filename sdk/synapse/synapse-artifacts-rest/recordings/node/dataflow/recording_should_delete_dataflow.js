let nock = require('nock');

module.exports.hash = "dd70b2ac8893aa5fa7e32e3af04564ee";

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
  'bbe1a40a-0559-45b2-8a5b-7e7db2d56600',
  'x-ms-ests-server',
  '2.1.11787.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgQ8Fa9jwhJAo4vW4fuiLdrKOuyWBgAAAAhyXdgOAAAA; expires=Sat, 17-Jul-2021 16:41:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmCuZfSGK4tBN_QsF5e4qmEUU5tMHPAuC0BZjNaFksQs0o-DAC1sxPtxEK5XWQn19jD4wC4CVrgWDaap9hNNjY9ZiBLbK8x_ebPb4TUqjepUAh0-N0CrmeAoIKsIhgCu1qYVxcSDsRR_Vadbia2PtQlWlV7yRBcQQqGfyOMC31_AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 16:41:09 GMT',
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
  '23930fd5-a06e-4043-bdb3-22360af53d00',
  'x-ms-ests-server',
  '2.1.11829.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgQ8Fa9jwhJAo4vW4fuiLdrKOuyWBgAAAAhyXdgOAAAA; expires=Sat, 17-Jul-2021 16:41:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_pJRJeHFNQBdeSE5JeKBKqZp_qATZOB8jwMyVn5xoHCLuOZmMPYvquz6LyAP5HjN_5npUpCI1L42vVru9YohIHU2-HjGcWk5CyHJhdAQr9X4Q1GItJohxISkn9NvLOuY5m-OfJEmxhheA_KGy2XsAeE9wUEbL0XUCMrF2GVsvuAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 16:41:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=2823b14d-7347-4f4f-95a0-d5d141d068f4&client_secret=azure_client_secret")
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
  '26787d3d-1366-40ec-a8e5-c59989b03800',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgQ8Fa9jwhJAo4vW4fuiLdrKOuyWBwAAAAhyXdgOAAAA; expires=Sat, 17-Jul-2021 16:41:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 17 Jun 2021 16:41:09 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .delete('/dataflows/testdataflow2')
  .query(true)
  .reply(202, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/dataflows/testdataflow2","recordId":0,"state":"Deleting","created":"0001-01-01T00:00:00","changed":"0001-01-01T00:00:00","type":"DataFlow","name":"testdataflow2","operationId":"19c46f6a-be25-41d7-ba06-dbf8edd3082e"}, [
  'Content-Length',
  '351',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/19c46f6a-be25-41d7-ba06-dbf8edd3082e?api-version=2019-06-01-preview',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Location',
  'x-ms-request-id',
  '4de71414-8983-4185-bbb1-d98a23176fed',
  'Date',
  'Thu, 17 Jun 2021 16:41:10 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/19c46f6a-be25-41d7-ba06-dbf8edd3082e')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/19c46f6a-be25-41d7-ba06-dbf8edd3082e?api-version=2019-06-01-preview',
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
  '74a7b5a6-a50b-43b6-b4f0-81bd5daa9fd9',
  'Date',
  'Thu, 17 Jun 2021 16:41:10 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/19c46f6a-be25-41d7-ba06-dbf8edd3082e')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/19c46f6a-be25-41d7-ba06-dbf8edd3082e?api-version=2019-06-01-preview',
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
  'e17820c6-61d1-495f-8cc7-a086ffdf262a',
  'Date',
  'Thu, 17 Jun 2021 16:41:11 GMT'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/19c46f6a-be25-41d7-ba06-dbf8edd3082e')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '79c380ac-d316-4e82-8493-709af30faf2e',
  'Date',
  'Thu, 17 Jun 2021 16:41:14 GMT'
]);
