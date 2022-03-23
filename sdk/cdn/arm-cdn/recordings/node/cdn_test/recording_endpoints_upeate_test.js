let nock = require('nock');

module.exports.hash = "2a65ccd8a71a7cc6b2d5eb4cff369315";

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
  'f058f362-0d5d-4341-9bc3-777970470200',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsW6uR1Cj8xIricWNt7BEOk; expires=Sat, 15-Jan-2022 02:15:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXcw76XjuzwG8C3nru2bKj1UMiDLYnrfZIBumHrESo0bjHU6aUfZfuEBRmbrwTb8d3PEONPRp9WvTus1wNRHSIqtRcIjY0WvCyWrIvnCCG2Ra7B19aGf3nWs4RtfQkA7r0ddbd3lk3cvJYRFNW3Vqk7dHi565b9k5aDIfCPVtBUwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 16 Dec 2021 02:15:48 GMT',
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
  '9bed8f69-8b1e-4591-be3e-449627ed0600',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjL0gYJ1js5DiugZlzyRmos; expires=Sat, 15-Jan-2022 02:15:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrf-0SPR262Bh6518tX42woU2zHLjUZPgNPoKpFbuUcHymD0SwR6JVzxrcYiGu5hxOlRr8EV5giJdyLvRXed3Veakra23ScEahUBjYp7fZ2to528mwQrKT8G8iIw6XjXCOoeiJ9LNQjJxre7QE6xytzVtbpaXwfdQkArJCoz8KnaYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 16 Dec 2021 02:15:49 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=65d24986-947e-4cc5-b9e1-80aaf51b8626&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '653645f0-3ec7-4ea4-98be-8ae454430200',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjIeZDi_0JRNuijuC28hzVwWPr5BAQAAAFWYTNkOAAAA; expires=Sat, 15-Jan-2022 02:15:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 16 Dec 2021 02:15:49 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cdn/profiles/myprofilexxx/endpoints/myendpointxxx', {"tags":{"additional_properties":"Tag1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e393d9129f9f17658e96faebbb77efeee6cbd9aa2a962d3e36bfd3e71f8d3e6aaf5739a13600c4b46da8e5325ba0651740594d338c87befa2e21f6159ab6d945f3d1a35ffc51369b15f82e2b7f7f02b9caebb6c8e98b8fde6417bb1ffd92d147fe87bff8a379d5b42f229d8cb31faceb3c9f5de4e365de12f8aa2e2e8ae5b7a9f9b7f38c68402f5c5d5d8d27c5f2623cad16b6c5cbac9dd377778b457691d3a7d36ad9e6cbf60d0db979539d548b155197bafede476dfeaebd3b6f1725b5ca56abb29031ddada66dde6e376d9d678b8fbe3ffaa868cc5bf4ede9329b94394d6c5baf737cf7edb65d1d976575d5fdb0e97cfa8bd6797dfdbaad09e1936c3aa71f4ff27976595418ca93eb55d634fa39e15311bb2c8a1f304240fda347cb755932f126b90c513e9041633cbfd84c967cb44b50a8759cd4f875773ccf094325de9c307e59d5ad818bbf1bff0381ead35f3e5fd53482a2bd367f5fe5c5c5dcbe9587e4a2c697599b3f2f966f8fcb2223b4a499f7f92be5fd337aa9f7e573cb77c157a7ca37afdbac5dc7801eaf88149759f9054d22d8825bfc925f42934bb8d3b03e67412322d227b3fc3c5b97ed97ee0b694eacb46eda6af1b45a6442716a7c9157cf8ab2259194bf6779595cd23cbfac889d2c4dd675f9bab858d2d4fe5ef935b5944faff209e145ed7848cf8a3abfcaca52de04d2a61d711e5304a323d43f7ab55e02144d1a0655802be94ff3edebf5744a724334ff25","bfe4ff013035c44083040000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '171358fd-d2d4-4d26-aec3-c87186f3446b',
  'x-ms-client-request-id',
  '1d0b7237-61f4-496a-ab86-7d7ab16635e1',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '98',
  'x-ms-correlation-request-id',
  '95106d11-c418-4bdc-9b8e-958fe27436fe',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211216T021556Z:95106d11-c418-4bdc-9b8e-958fe27436fe',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 16 Dec 2021 02:15:55 GMT'
]);
