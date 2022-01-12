let nock = require('nock');

module.exports.hash = "75422452506266f4031cf7cec8acfddf";

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
  'c8a5e3e9-f35c-4dbc-a255-5341ac9d3f00',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlmacK2-EBFCnbxuLWjamuc; expires=Thu, 27-Jan-2022 03:04:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxJMq3q_B7JfHlVlUDnJpkRllhNrrSy4lN5SufFjYgL3VlDhb1-I-Dry8yC8Kuy-OqmNZwODPxH7eTQefxoZwTDnqWEMAdGZBuo2-UBI2oH5iVqRdyxiICjvQNwdhk4GRtsBAQW2AED0-_7BSYAz6W2xWvWjZpoycjU9UfaJviFIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Dec 2021 03:04:13 GMT',
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
  '8efa0660-ddf1-4551-9d50-4957571a4000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlLKoWmVhqdIpsMauHs4raU; expires=Thu, 27-Jan-2022 03:04:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYPHAQ4L_6Fu__wG_5MDQrgHtwnppKyfx19AUZLwbqJejvV5uPpettR7zBzvE_bCYipce8OZ-t4hTfvGEAcl3_kz6I0XR9P7NvtBaGWWXTrX0n4digsxj5z8LWJCdPWZbSwJ7qxTcFQU-qaeiOyWPY02FESeFG7bwZDMEsezC3HYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Dec 2021 03:04:13 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b463a8e2-0656-4fc0-86f8-319c4484fad6&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'fdc829dd-07f2-418f-81b3-a624f07f3300',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgcZnmtL_k1LlVE9qevzdn3Lj78gAQAAAK11XNkOAAAA; expires=Thu, 27-Jan-2022 03:04:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 28 Dec 2021 03:04:14 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy', {"location":"eastus","tags":{"key":"value"},"sku":{"name":"Premium"},"properties":{"adminUserEnabled":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a39775be28d68b8f461fb5455e7b1ffc12fae47a85265f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147943108a19b5bedbac27cdb42e566d512d9bbb0ff7ce1fde9f1d9c6fdf9b7efa607b7f776f7ffbe1eef4c1f6c1f47ce7c1743639dfdbdfbd5be74db5aea7f9e775b55e357717d73fddb479d3de5dd5d56531cbebe6eeed70a037f58feb77efde5d5f134e3accfe176535cd80227d99674dbbc600daeca2016ddee6d7f4f16556ae73d0a1b92674164fb336c397d33acfda7cf6044df29d8c86708fc6f4e9ee747b7fb6bbb77d70fee9749bc6fae0fececeeef4fe3423b8f6953742d1e3d5aa2cb47bfbed714bdfecedeced6e1394bd83373bf71eedec3fdadb1def1cdcdfbdbfbfffc9cecea39d1d6a5f12ba5f54b3e2bc00487ae9965884ef4551f19bdc121fa20f4dd32aaf897f98786575512c5fe7f525b35387f0e3ec07eb3a9fd6e3a2a2ee78e4d4339116b86ce8eca7a83575735934d4bc585ebc6ee595d7ebe934cf67f98cbecf668b62f95593d7a7cb6c52d2478fceb3b2c98907f2f6aaaadfbe5a97f9eb9c46f58b3f9ae5e7d9ba6c8fa7e89dc01c97657545208a151ad130bef77d8cab22d2e8a87ed13aabb3654b8cf7129f12d949920809e29b471fcd8a467aa497da7addb4ae8dcad08baacd6ab05df49d3a6f73825d2ddd7bb3ec9a5a3d9029f96a35a3e1cede14cccb7d321d8cefef3cdcbb67a664a097fcddaaaa3dd46ca35ce9f54bd06839adaf597683263e1cc2253b5dce5655b16cbba4f6bffb76d5b42fb205e8f7bdef1335ebe2924661be25395ee64c7ff3fd7a4298bd90b93aa6696de88b8f4c07c12c3eb95e654df325a38946c7602ab05c416f51d31f54cbfc553e5b2f67d91263fde8a945ff97","fc3f6ad2621701050000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'api-supported-versions',
  '2021-09-01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-request-id',
  '1418d727-2d55-422e-9859-8db8a740426a',
  'x-ms-correlation-request-id',
  '1418d727-2d55-422e-9859-8db8a740426a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211228T030430Z:1418d727-2d55-422e-9859-8db8a740426a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Dec 2021 03:04:29 GMT'
]);
