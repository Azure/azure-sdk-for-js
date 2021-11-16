let nock = require('nock');

module.exports.hash = "de33ebb0ef19ac76d33e9ba8414e51e3";

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
  'bb38216c-2516-4c2f-a747-b8440fbc0100',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aqsq5AFbRRpFhP1VrpB5DhU; expires=Thu, 16-Dec-2021 04:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvvBn6pZ-_gAw2GrX-BGJEcFB1IuRfBMDXrJujrWy1cU5XOcJITdINkJajm-oyCEdZ8XoIgd2NS4ph8UH537FdZn98vYXttdiTtnnIqy8lxKZE93jQYV8rsTQdDIEQmCKxzpIC3IbUumooMqouepWraC9u0GguT_vOVC_1WJeRL4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:40:25 GMT',
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
  '8eef547c-b276-4bd5-af48-16ed5d190200',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsBuFu930EhLtQlTYgrsRzM; expires=Thu, 16-Dec-2021 04:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmUotJLPO5IIFR0sOXnR2NRa-e3rwK1pLXW2SVzFP7ksxhqdBItJamAVpPPI43O2YIYlRQiybSklQhWBLEdGjl_0pFeFjNxprfckhuTLAdZ8-iuP-6bBSH4n6jnVQTD5JiYq7HQqA6PY_Iqg6RJTc_Wk8XOR8QB032weFnl04AtwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:40:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d690a832-3903-4838-98c3-56d8094f9d68&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'f0acc770-0b86-478e-8099-57246ca10100',
  'x-ms-ests-server',
  '2.1.12249.11 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AojPHwfLJHFLrqS-H7vKRF8WPr5BAQAAADktJdkOAAAA; expires=Thu, 16-Dec-2021 04:40:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Nov 2021 04:40:25 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/databaseAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7d574bdc897edd3277767599b4db2263f9e4eabf5b2c58b99fcfaeeddbbfb1f8d3e5a660bc2eca3eec76535cd801d7d759a356dfad56bfab0bd5ea1edad3aa2e66f8b2546fb79594db2d235a56fdaeca2f9e8d12ffe25a38f9a6b1ac6e229bd4c7f7f34adf3accd67c72dbdb6b7b3b7bbbd4bfffbf4cdcefea37b9f3edad91fdfbbb7ffe9eede839ffa88dea481aff2ba2d7240c25f9745430817cb8bd72d012108afd7d3699ecff219f538d3ee4f97b355552cd1c1bc6d57cda3bb2145c6a66133ce7eb0aef3f1b45a3cdadfbf779760acd693b298bec8dbabaa7e4be3cc1beafaa3d3653629b98f9c7f3b5eb7d58268377d9615657599d71f3d3acfca2637df7fb12edb6255e6dfad8b367fae64264041a397198d0c5ffc5ef9f51734a8b672608ae6278bba5d67a562f2ac28dbbc3668985697419b57eb1274fadef74706dfe355f186a6933efce8f52f2a09fb59d1e00beaf0094de3ec8bbccd30a78ca619acc2161c9fd579fea6e88def789995d734fcac7c4d5867173413fa7dd6fde6a45a9e1717eb9a4980596ca6f37c91012f42ebbb79593ecdcf8b258d8ae6bb58366db69ce66734c68f26d96c3ad99bed6cdf7b9893c8ec9f67dbd9c1e4c1f6eec3c9dea7345db3f3fd0c63a201784cf9e5f9795e2b746292e52cab316fb3fc3ca349399bd1b417ed357df9aca89b1673706d3f244911521e4fcb27d7ab0ce4f8e845b5cce91b251d26b3a4e99fdb114f69660b62f0e5f4fa6545bc43b07fb1e98e066fbe7b9e5fe625817b4d440625461f2db277674b9a55521c67cbd739c199517ff7f90bc2bccc97d4f4654dd479f7d1a3dd9d1da20fb571c4fc92f8ae26b5402f41caae3089400fdfd167461105acbf7d45fa640dc135c2ff4274c377e973510046386e922205b551986e10d873959e97755111f644b91de281e6a788e2aff2d99ae60edd339d7f097135298ed9ff7f07388a0e870c423b9f52ef7556c686f51adfa727d2e03dc717c2fe66c7b9f79ee3cc33d09a4075c6e70c9341efc66109a86f7638bb83c321be3428ff8827331ed68f78b2372c01f5cd0e67234fdae63049ec3f7d5dd6b4906cc76489a2b0c2b9a3573b30237cd107be37005c2848af7480bac9e8c3da0525a6558dd1e3b76c954d8a927c2ea6077d52ac3ca769924ddfae574c307af7171b4ff8654ef066c5947a205f947ffda29ae52f03d754de75e6fc8b62b926d79d86b34fd225dfbecac91100e6aed9b7c9dda74607a689fa4c664281c7479fe7d547bf84ec7bd73579a5c1c219bc86ef7d9f5a902f40f031708b3c3b2fbfe4977cff97","fc3ff323be4da00c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11280',
  'x-ms-request-id',
  '54cdd315-0335-4bd8-81d6-541ce89ea7d4',
  'x-ms-correlation-request-id',
  '54cdd315-0335-4bd8-81d6-541ce89ea7d4',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211116T044026Z:54cdd315-0335-4bd8-81d6-541ce89ea7d4',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 04:40:25 GMT'
]);
