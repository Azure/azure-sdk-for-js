let nock = require('nock');

module.exports.hash = "a0b3199ce0b5940c129dc54de3271114";

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
  '66f9c80e-1bf5-4e1b-8ed8-e219dca98700',
  'x-ms-ests-server',
  '2.1.11787.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAwAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4WFCUIlFOzz1dQMmttklSHpzJwcq5uf9PcvJInAv14Uvrf0R4RGnf90w5m0v7YFGt1qgZvgM9Txv89YKrs1OpYtSawSN7XoVomoVhWcqVCLw3i4eZ1yb-WuRXKaZufPHqQn--DfUcpFS27ya-ah05jfRhQkHQjQu_5tt_s9IR3MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:40:23 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  'eae53b9c-a261-4400-90bc-1c42f78f2a00',
  'x-ms-ests-server',
  '2.1.11829.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAwAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5unCj66bbGBRSJeM2wVRYqkhJks5CDgakNsUxHITG1zbnmVXVkC1sEf2tBvYZeR6pdZ7CECMZWRYZ-3DV_eKDAjcL7cE5bJCitX1Qg5NQfQHtoIr4CZW06tAZ2yHs1w-t38sWzPR-T5hC8dEfzjszJuFp6tQ0EJV-7Kh3kmC2U4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:40:23 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&client-request-id=603a605d-d4e0-4ac2-951d-82ec96e131e3&client_secret=azure_client_secret")
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
  'a6d9cd41-6ba7-4e1a-bf7b-adbf0b721a00',
  'x-ms-ests-server',
  '2.1.11829.4 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqKv1ITPGqNOizUDgikpmKnKOuyWAwAAAPekVdgOAAAA; expires=Sun, 11-Jul-2021 18:40:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Jun 2021 18:40:23 GMT',
  'Content-Length',
  '1322'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .delete('/dataflows/testdataflow2')
  .query(true)
  .reply(202, {"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/xiangyan/providers/Microsoft.Synapse/workspaces/xysynapsetest/dataflows/testdataflow2","recordId":0,"state":"Deleting","created":"0001-01-01T00:00:00","changed":"0001-01-01T00:00:00","type":"DataFlow","name":"testdataflow2","operationId":"c737135f-c70d-4d6f-b385-6a446e7deca6"}, [
  'Content-Length',
  '351',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/c737135f-c70d-4d6f-b385-6a446e7deca6?api-version=2020-12-01',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Access-Control-Allow-Headers',
  'Location',
  'Access-Control-Expose-Headers',
  'Location',
  'x-ms-request-id',
  '333c6393-a27f-467f-97e0-dee81560438c',
  'Date',
  'Fri, 11 Jun 2021 18:40:24 GMT',
  'Connection',
  'close'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/c737135f-c70d-4d6f-b385-6a446e7deca6')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/c737135f-c70d-4d6f-b385-6a446e7deca6?api-version=2020-12-01',
  'Retry-After',
  '0',
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
  '1c334efd-ebdc-4753-87f8-ee017967f92d',
  'Date',
  'Fri, 11 Jun 2021 18:40:24 GMT',
  'Connection',
  'close'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/c737135f-c70d-4d6f-b385-6a446e7deca6')
  .query(true)
  .reply(202, {"status":"InProgress"}, [
  'Content-Length',
  '23',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://testaccount.dev.azuresynapse.net/operationResults/c737135f-c70d-4d6f-b385-6a446e7deca6?api-version=2020-12-01',
  'Retry-After',
  '0',
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
  '1d966b67-c20d-4982-b03e-e53b5513f513',
  'Date',
  'Fri, 11 Jun 2021 18:40:26 GMT',
  'Connection',
  'close'
]);

nock('https://testaccount.dev.azuresynapse.net', {"encodedQueryParams":true})
  .get('/operationResults/c737135f-c70d-4d6f-b385-6a446e7deca6')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '86a81e6a-b2e2-4d8e-9f10-884d839c7a38',
  'Date',
  'Fri, 11 Jun 2021 18:40:28 GMT',
  'Connection',
  'close'
]);
