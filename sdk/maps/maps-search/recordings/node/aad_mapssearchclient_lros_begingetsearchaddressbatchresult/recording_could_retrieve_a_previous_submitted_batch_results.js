let nock = require('nock');

module.exports.hash = "7c0ad3f85692e2d21951872352d1d3ac";

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
  '93f5ae5b-ce2e-46c2-9735-edbbd8581800',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AqaALhGQgCpKpdBz7K73HqM; expires=Thu, 24-Mar-2022 10:21:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkwwWbv6sAZkxsnMnPb926N3wOsRetI-5i8yY7_upUtpiywx0U2tHV6IItQyiwx7zhnJidYJvNV2nltDNgVUJYyT5bVvHGQIhdoFZbO57DBl6xfc5wkSo4x9IJM46hDQNbWIAilYfEaPOm0uYhlEoIwBywe5h2OcRyQ20VbZtXGYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'cd8480b9-f52e-4019-b1a4-5cf44660d800',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkqamrZSGApEgkkNa5bi3OA; expires=Thu, 24-Mar-2022 10:21:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevryl0LEgmAo3fa9b2WZYEU8BQK6ZdIhqAm8poWAxgLJwiIZKc9Xu_vNwDNvaLMYyFsL9-LPOFrlGzvM2wusF9PqiSoLRd3FRZ19sukWIHt28S5o_2u02RPPq-JZbpDWOPtWQZVexjsYnndVe1d3qGgy_RinsUHVQCIaFq5S-wN8tcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '50b0f92e-bd46-4047-a9d5-598d474a8200',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Agboiws0hixGp43Su9KhdDE; expires=Thu, 24-Mar-2022 10:21:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrs7o4VdrETfNO4F2hyfZ1SW7t8xFQkX9gE372vx6vVTtGjmnjqsMwkaWJzQ7WXW6zAzzn9dXpq2nNr9AxDBbC87V5mc970tXRQGVMhHjpiUeMMN-itrhyxWvupGf7H9kj7QL04RuiNvV7Z_BC8EnGc3BcLoubsUvHTHFBPRfDa3kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '08d3d4bb-8173-4ff0-a4da-ecb35401f200',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtoiCARKZUJOgQa2hphCHnc; expires=Thu, 24-Mar-2022 10:21:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNsiC0XWZFYNGF7FaV174JH1DiU0Utbf0wz_22joFRD3FXLG7YlHF9T6l1MW2xUbKXF7vG_mnWwJufhkN0IdjLLM0qTaXz7dbxZOKDNbTqz_NILclriokZtDUrYegEGjr0zrDgqqTAySAA_J8AWmmL31ZeRb4QrFYiDZcE59zw1MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4b9fe6f6-81ea-4600-a480-3e1946394b74&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '6899a10f-a79f-4b72-86f0-da2353019700',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApsYqhgE2SZIhE1NKF-6fRA; expires=Thu, 24-Mar-2022 10:21:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9a64c8b7-242f-48ba-893d-3d012197ffda&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '0f2ae6a6-ff51-490e-aa8a-f2ec1ef04401',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiJcUvmVAzlEnf346GgDzEI; expires=Thu, 24-Mar-2022 10:21:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=26072438-393d-48c0-a0a1-029dd39ba9dd&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '1e86c3c9-235f-4c14-a712-bffbb24c3b01',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Al7JxAz9iHtNvkZpK8m50wQ; expires=Thu, 24-Mar-2022 10:21:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"query is missing or empty"}}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 8512FC4BFEE84F52BF6D776607AFEC2D Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:54Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/batch/json', {"batchItems":[{"query":"?query=400 Broad St, Seattle, WA 98109&limit=3"},{"query":"?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},{"query":"?query=350 5th Ave, New York, NY 10118&limit=1"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/batch/<batch-id>?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: EC86887217B1466D92637F4424052CD0 Ref B: TYO01EDGE1715 Ref C: 2022-02-22T10:21:54Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:53 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>7')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"Invalid value : 11111111-2222-3333-4444-5555555555557 for parameter batchRequestId"}}, [
  'Content-Length',
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 06CAB59F98F04A0C87495961CC96BA4F Ref B: TYAEDGE0409 Ref C: 2022-02-22T10:21:54Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:54 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":5,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/54557314","score":11.9729099274,"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p0/1439822","score":10.22519207,"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}},{"statusCode":200,"response":{"summary":{"query":"one microsoft way redmond wa 98052","queryType":"NON_NEAR","queryTime":6,"numResults":3,"offset":0,"totalResults":3510,"fuzzyLevel":2},"results":[{"type":"Street","id":"US/STR/p2/2044974","score":10.22519207,"address":{"streetName":"Microsoft Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-6399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Microsoft Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64016,"lon":-122.1245},"viewport":{"topLeftPoint":{"lat":47.64016,"lon":-122.12466},"btmRightPoint":{"lat":47.64012,"lon":-122.12424}}},{"type":"Street","id":"US/STR/p2/2100078","score":10.0968618393,"address":{"streetName":"157th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5344, 98052-5399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"157th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64351,"lon":-122.13056},"viewport":{"topLeftPoint":{"lat":47.64471,"lon":-122.13058},"btmRightPoint":{"lat":47.6425,"lon":-122.13014}}},{"type":"Street","id":"US/STR/p1/1367357","score":7.9237017632,"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-0008, 98052-0578, 98052-0908, 98052-1504, 98052-3824, 98052-3827, 98052-3829, 98052-3830, 98052-3831, 98052-3832, 98052-3833, 98052-3834, 98052-3835, 98052-3836, 98052-3862, 98052-4060, 98052-4403, 98052-4404, 98052-4405, 98052-4406, 98052-4407, 98052-4429, 98052-4433, 98052-4434, 98052-4435, 98052-4448, 98052-4449, 98052-4450, 98052-4472, 98052-4906, 98052-4907, 98052-4909, 98052-4913, 98052-5000, 98052-5006, 98052-5011, 98052-5012, 98052-5016, 98052-5079","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.66985,"lon":-122.10805},"viewport":{"topLeftPoint":{"lat":47.67519,"lon":-122.1244},"btmRightPoint":{"lat":47.6572,"lon":-122.0977}}}]}},{"statusCode":200,"response":{"summary":{"query":"350 5th ave new york ny 10118","queryType":"NON_NEAR","queryTime":150,"numResults":1,"offset":0,"totalResults":841,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/40884249","score":12.0984487534,"address":{"streetNumber":"350","streetName":"5th Avenue","municipalitySubdivision":"Brooklyn","municipality":"New York","countrySecondarySubdivision":"Kings","countrySubdivision":"NY","countrySubdivisionName":"New York","postalCode":"11215","extendedPostalCode":"11215-2813","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"350 5th Avenue, Brooklyn, NY 11215","localName":"Brooklyn"},"position":{"lat":40.67199,"lon":-73.98423},"viewport":{"topLeftPoint":{"lat":40.67289,"lon":-73.98542},"btmRightPoint":{"lat":40.67109,"lon":-73.98304}},"entryPoints":[{"type":"main","position":{"lat":40.67189,"lon":-73.98402}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 260990C8F5FD4699965C7F9BE4F66CC0 Ref B: TYO01EDGE1715 Ref C: 2022-02-22T10:21:54Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:54 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"query":"400 broad st seattle wa 98109","queryType":"NON_NEAR","queryTime":5,"numResults":2,"offset":0,"totalResults":2,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/54557314","score":11.9729099274,"address":{"streetNumber":"400","streetName":"Broad Street","municipalitySubdivision":"Queen Anne","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4607","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"400 Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.62039,"lon":-122.34928},"viewport":{"topLeftPoint":{"lat":47.62129,"lon":-122.35061},"btmRightPoint":{"lat":47.61949,"lon":-122.34795}},"entryPoints":[{"type":"main","position":{"lat":47.61982,"lon":-122.34886}}]},{"type":"Street","id":"US/STR/p0/1439822","score":10.22519207,"address":{"streetName":"Broad Street","municipalitySubdivision":"South Lake Union","municipality":"Seattle","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98109","extendedPostalCode":"98109-4942","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Broad Street, Seattle, WA 98109","localName":"Seattle"},"position":{"lat":47.61911,"lon":-122.3497},"viewport":{"topLeftPoint":{"lat":47.61965,"lon":-122.35041},"btmRightPoint":{"lat":47.61857,"lon":-122.349}}}]}},{"statusCode":200,"response":{"summary":{"query":"one microsoft way redmond wa 98052","queryType":"NON_NEAR","queryTime":6,"numResults":3,"offset":0,"totalResults":3510,"fuzzyLevel":2},"results":[{"type":"Street","id":"US/STR/p2/2044974","score":10.22519207,"address":{"streetName":"Microsoft Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-6399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Microsoft Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64016,"lon":-122.1245},"viewport":{"topLeftPoint":{"lat":47.64016,"lon":-122.12466},"btmRightPoint":{"lat":47.64012,"lon":-122.12424}}},{"type":"Street","id":"US/STR/p2/2100078","score":10.0968618393,"address":{"streetName":"157th Avenue Northeast","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-5344, 98052-5399","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"157th Avenue Northeast, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.64351,"lon":-122.13056},"viewport":{"topLeftPoint":{"lat":47.64471,"lon":-122.13058},"btmRightPoint":{"lat":47.6425,"lon":-122.13014}}},{"type":"Street","id":"US/STR/p1/1367357","score":7.9237017632,"address":{"streetName":"Redmond Way","municipality":"Redmond","countrySecondarySubdivision":"King","countrySubdivision":"WA","countrySubdivisionName":"Washington","postalCode":"98052","extendedPostalCode":"98052-0008, 98052-0578, 98052-0908, 98052-1504, 98052-3824, 98052-3827, 98052-3829, 98052-3830, 98052-3831, 98052-3832, 98052-3833, 98052-3834, 98052-3835, 98052-3836, 98052-3862, 98052-4060, 98052-4403, 98052-4404, 98052-4405, 98052-4406, 98052-4407, 98052-4429, 98052-4433, 98052-4434, 98052-4435, 98052-4448, 98052-4449, 98052-4450, 98052-4472, 98052-4906, 98052-4907, 98052-4909, 98052-4913, 98052-5000, 98052-5006, 98052-5011, 98052-5012, 98052-5016, 98052-5079","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"Redmond Way, Redmond, WA 98052","localName":"Redmond"},"position":{"lat":47.66985,"lon":-122.10805},"viewport":{"topLeftPoint":{"lat":47.67519,"lon":-122.1244},"btmRightPoint":{"lat":47.6572,"lon":-122.0977}}}]}},{"statusCode":200,"response":{"summary":{"query":"350 5th ave new york ny 10118","queryType":"NON_NEAR","queryTime":150,"numResults":1,"offset":0,"totalResults":841,"fuzzyLevel":1},"results":[{"type":"Point Address","id":"US/PAD/p1/40884249","score":12.0984487534,"address":{"streetNumber":"350","streetName":"5th Avenue","municipalitySubdivision":"Brooklyn","municipality":"New York","countrySecondarySubdivision":"Kings","countrySubdivision":"NY","countrySubdivisionName":"New York","postalCode":"11215","extendedPostalCode":"11215-2813","countryCode":"US","country":"United States","countryCodeISO3":"USA","freeformAddress":"350 5th Avenue, Brooklyn, NY 11215","localName":"Brooklyn"},"position":{"lat":40.67199,"lon":-73.98423},"viewport":{"topLeftPoint":{"lat":40.67289,"lon":-73.98542},"btmRightPoint":{"lat":40.67109,"lon":-73.98304}},"entryPoints":[{"type":"main","position":{"lat":40.67189,"lon":-73.98402}}]}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 107D4AAE4D7C4F69B928D429D7E027DF Ref B: TYO01EDGE1715 Ref C: 2022-02-22T10:21:54Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:54 GMT'
]);
