let nock = require('nock');

module.exports.hash = "e915bc90bd02330ead1047085daec471";

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
  '81ad14af-1d81-4c69-8113-712db18c1700',
  'x-ms-ests-server',
  '2.1.12507.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ahn4THgDVVxBixbTt85-WGw; expires=Thu, 24-Mar-2022 10:21:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrynT6ywfngCZD64qT2H-Q5YLf9M1zgnZ6QGDGHCQrdhzYKHQdzzsMNQNFVdat9stG76i2l5_2UVfA9-EIW2nFkjrMVr2RpeW8du7otwXbVauE8zXdCBeB2fUSqz-RZlNqua7uMU7cuhuJsMhG7wAXKpDV9cI85dkGi52e1mL65KUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
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
  '6899a10f-a79f-4b72-86f0-da23fe019700',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aljltc9iNMlCq5jDqBSMJpk; expires=Thu, 24-Mar-2022 10:21:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrk8EKsmVXyCohw54PNZEFbs7AslWEwb4aAWkJe_UZVOjzFi89wWU4Bo5mhSvFGShmmeu_5lrT7Css1dFNQDGSXR5PyTlGc-DDM4M8p4AiM_47mVyVKNJ9eNkLr7b8aXWzuSRMKrTppWY97zTTDyTJ27GMlmTz-4Oo_-yLw3Q76okgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
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
  'd5d7c1cd-f81e-45d0-8548-ae2b43309100',
  'x-ms-ests-server',
  '2.1.12470.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AraxqMyzi4lKqpDB76L2b4s; expires=Thu, 24-Mar-2022 10:21:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryJxR898kBfLbjfV1gcnelbekLenhp2XH8D-AtBBS1K4VGN76Jp5Zu9DV1T2D5RgF2IQ4uqV7IvYSsjr_7lAAI3Y7qiG4yeUVzH56q3-ocgjJuG6O6kr3bZcsmYkVIOdh36WY4s1dE3AfDPjmSdZju2zPEYQG0cmBdeaV21f_eP8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
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
  'ca0f45fc-abed-4b78-99ad-ef2e00116b01',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aj-jdoXpOb1JmecWuNMW-qY; expires=Thu, 24-Mar-2022 10:21:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzV1A9q2lXht_brokJ8eNzxudS9r0U9VbhKGwUw-FxQCPPMyMaTV2lDUH0HO2YHTHyLlajMFHZ2BAc-vOtdDJ9lg9bZ5ivYmuntuAzaspkFXODzCOBBNrFXeZhOmdVyyVq6dT7NW6jhO-trMsdjh5FdWQ95t_VUDb5TMb-JlOMrggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00e97bc9-0c58-43f6-a232-f29eb36f895c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '9d5bd505-7f94-4b12-91c9-0132c6396501',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmElq5uP9nxHpajgNP9HDfU; expires=Thu, 24-Mar-2022 10:21:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3e375188-9eb0-414b-a05b-f48986752ac0&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '0f2ae6a6-ff51-490e-aa8a-f2ecdbf04401',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtYqEQ7_4HtMk78kZoJ3jUE; expires=Thu, 24-Mar-2022 10:21:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=eafb3bb5-af13-45b9-9063-f4538d128b3e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '6a56a40c-853f-42fb-b2d8-11af13d03401',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aj_5cYdfrVpJtaI0c57J9uU; expires=Thu, 24-Mar-2022 10:21:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .post('/search/address/reverse/batch/json', {"batchItems":[{"query":"?query=48.858561,2.294911"},{"query":"?query=47.639765,-122.127896&radius=5000"},{"query":"?query=47.621028,-122.34817"}]})
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '2',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://atlas.microsoft.com/search/address/reverse/batch/<batch-id>?api-version=1.0',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 2E5F83B90306444387553C873969BDEC Ref B: TYAEDGE0409 Ref C: 2022-02-22T10:21:58Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:58 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/batch/<batch-id>7')
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
  'Ref A: 7BEEAAA72D4E40169213BFE028E4F264 Ref B: TYBEDGE0409 Ref C: 2022-02-22T10:21:58Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/batch/')
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
  'Ref A: 65D62BD6E9204B3BB64A6533FFED8A25 Ref B: TYO01EDGE1715 Ref C: 2022-02-22T10:21:58Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:57 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"queryTime":4,"numResults":1},"addresses":[{"address":{"buildingNumber":"5","streetNumber":"5","routeNumbers":[],"street":"Esplanade des Ouvriers de la Tour Eiffel","streetName":"Esplanade des Ouvriers de la Tour Eiffel","streetNameAndNumber":"5 Esplanade des Ouvriers de la Tour Eiffel","countryCode":"FR","countrySubdivision":"Île-de-France","countrySecondarySubdivision":"Paris","municipality":"Paris","postalCode":"75007","municipalitySubdivision":"7ème Arrondissement","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Esplanade des Ouvriers de la Tour Eiffel, 75007 Paris","boundingBox":{"northEast":"48.858576,2.295027","southWest":"48.858321,2.294559","entity":"position"},"localName":"Paris"},"position":"48.858582,2.294525"}]}},{"statusCode":200,"response":{"summary":{"queryTime":3,"numResults":1},"addresses":[{"address":{"buildingNumber":"16000","streetNumber":"16000","routeNumbers":[],"street":"Northeast 31st Street","streetName":"Northeast 31st Street","streetNameAndNumber":"16000 Northeast 31st Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Redmond","postalCode":"98008","country":"United States","countryCodeISO3":"USA","freeformAddress":"16000 Northeast 31st Street, Bellevue, WA 98008","boundingBox":{"northEast":"47.638988,-122.126617","southWest":"47.638122,-122.127537","entity":"position"},"countrySubdivisionName":"Washington","localName":"Bellevue"},"position":"47.638988,-122.127541"}]}},{"statusCode":200,"response":{"summary":{"queryTime":5,"numResults":1},"addresses":[{"address":{"buildingNumber":"410","streetNumber":"410","routeNumbers":[],"street":"Thomas Street","streetName":"Thomas Street","streetNameAndNumber":"410 Thomas Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Seattle","postalCode":"98109","municipalitySubdivision":"Queen Anne","country":"United States","countryCodeISO3":"USA","freeformAddress":"410 Thomas Street, Seattle, WA 98109","boundingBox":{"northEast":"47.620954,-122.347601","southWest":"47.620944,-122.348498","entity":"position"},"countrySubdivisionName":"Washington","localName":"Seattle"},"position":"47.620945,-122.348175"}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
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
  'Ref A: FEC9702A25A647798B83FF7B6E3FD26D Ref B: TYAEDGE0409 Ref C: 2022-02-22T10:21:58Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:58 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/batch/<batch-id>')
  .query(true)
  .reply(200, {"batchItems":[{"statusCode":200,"response":{"summary":{"queryTime":4,"numResults":1},"addresses":[{"address":{"buildingNumber":"5","streetNumber":"5","routeNumbers":[],"street":"Esplanade des Ouvriers de la Tour Eiffel","streetName":"Esplanade des Ouvriers de la Tour Eiffel","streetNameAndNumber":"5 Esplanade des Ouvriers de la Tour Eiffel","countryCode":"FR","countrySubdivision":"Île-de-France","countrySecondarySubdivision":"Paris","municipality":"Paris","postalCode":"75007","municipalitySubdivision":"7ème Arrondissement","country":"France","countryCodeISO3":"FRA","freeformAddress":"5 Esplanade des Ouvriers de la Tour Eiffel, 75007 Paris","boundingBox":{"northEast":"48.858576,2.295027","southWest":"48.858321,2.294559","entity":"position"},"localName":"Paris"},"position":"48.858582,2.294525"}]}},{"statusCode":200,"response":{"summary":{"queryTime":3,"numResults":1},"addresses":[{"address":{"buildingNumber":"16000","streetNumber":"16000","routeNumbers":[],"street":"Northeast 31st Street","streetName":"Northeast 31st Street","streetNameAndNumber":"16000 Northeast 31st Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Redmond","postalCode":"98008","country":"United States","countryCodeISO3":"USA","freeformAddress":"16000 Northeast 31st Street, Bellevue, WA 98008","boundingBox":{"northEast":"47.638988,-122.126617","southWest":"47.638122,-122.127537","entity":"position"},"countrySubdivisionName":"Washington","localName":"Bellevue"},"position":"47.638988,-122.127541"}]}},{"statusCode":200,"response":{"summary":{"queryTime":5,"numResults":1},"addresses":[{"address":{"buildingNumber":"410","streetNumber":"410","routeNumbers":[],"street":"Thomas Street","streetName":"Thomas Street","streetNameAndNumber":"410 Thomas Street","countryCode":"US","countrySubdivision":"WA","countrySecondarySubdivision":"King","municipality":"Seattle","postalCode":"98109","municipalitySubdivision":"Queen Anne","country":"United States","countryCodeISO3":"USA","freeformAddress":"410 Thomas Street, Seattle, WA 98109","boundingBox":{"northEast":"47.620954,-122.347601","southWest":"47.620944,-122.348498","entity":"position"},"countrySubdivisionName":"Washington","localName":"Seattle"},"position":"47.620945,-122.348175"}]}}],"summary":{"successfulRequests":3,"totalRequests":3}}, [
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
  'Ref A: 94C5E3E158EE4B4E8908A42EACE7859E Ref B: TYAEDGE0409 Ref C: 2022-02-22T10:21:58Z',
  'Date',
  'Tue, 22 Feb 2022 10:21:58 GMT'
]);
