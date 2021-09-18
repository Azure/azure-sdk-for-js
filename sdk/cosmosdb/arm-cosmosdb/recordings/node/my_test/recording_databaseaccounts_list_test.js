let nock = require('nock');

module.exports.hash = "7ecd97bc87ff568a0f33f81876555e80";

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
  '2d052f42-b736-4f4f-8aeb-f8ffc2080600',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ag0GDvvJJ79Gkdr1Y_VPtmc; expires=Mon, 18-Oct-2021 02:39:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAMvu149CalL5HghOHpEV0ZtWPZ5vcXCTcozJLg7U-jyDUNO4_tLwSmtcWupJnR2cinimle4Zvx0KkLJuP5X732YinrRgur0dUf6ljcwgzCYgDQOwHdrSloa62VcxVrHCAq6Dwkru1zWP7BhRqRqIxAGoX3kpCZCW9KgQWnMFWLIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 02:39:37 GMT',
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
  '2d052f42-b736-4f4f-8aeb-f8ffc4080600',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuJQK68kxz9GtUaVPZP2Uak; expires=Mon, 18-Oct-2021 02:39:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrAoCPikclQ0UJaK4_G9frSIrATsE_KivVXM8wDC1XI46xHpueF3OpU-38BWJ1qpkMOgWOQFVEeE32E1i52pvGDil_aOwSQywUFObFNv8buxQ-0_BukVzLMPFaXvR4JE1eq5SqyWrHxA8WaTeRBb1frbnw0fxMvLWMl2EIOvJ940YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 02:39:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9f826ffb-a16d-4ad8-ace1-4f192279e65f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2e7a69bb-6906-4241-9094-705b93a40700',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AjprSEWoe2ZGhGhXulcEc1IWPr5BAQAAAGlI19gOAAAA; expires=Mon, 18-Oct-2021 02:39:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 02:39:37 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/databaseAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7d574bdc897edd3277767599b4db2263f9e4eabf5b2c58b99fcfaeeddbbbd8f461f2db30561f651f7e3b29a66c08ebe3acd9a36fdea357dd85eafd0f6561d51f3b7c512a3fdbcac2659e99ad2376d76d17cf4e817ff92d147cd350d63f1945ea6bf3f9ad679d6e6b3e3965edbdbd9dbddde79b8bd7bf06667efd1bd4f1fedee8e1f3e3c7840fffdd447f4260d7c95d76d910312feba2c1a42b8585ebc6e09084178bd9e4ef37c96cfa8c799767fba9cadaa62890ee66dbb6a1edd0d2932360d9b71f683759d8fa7d5e2d1fefebdbb0463b59e94c5f445de5e55f55b1a67de50d71f9d2eb349c97de4fcdbf1baad1644bbe9b3ac28abcbbcfee8d1795636b9f9fe8b75d916ab32ff6e5db4f9732533010a1abdcc6864f8e2f7caafbfa041b5950353343f59d4ed3a2b15936745d9e6b541c3b4ba0cdabc5a97a0d3f7be3f32f81eaf8a37349df4e147af7f5149d8cf8a065f50874f681a675fe46d86396534cd6015b6e0f8accef337456f7cc7cbacbca6e167e56bc23abba099d0efb3ee3727d5f2bcb858d74c02cc62339de78b0c78115adfcdcbf2697e5e2c695434dfc5b269b3e5343fa3317e949fe70fcef3fd7bdbe7fbf7f7b7f777eecdb6b3dd6c777bba7bffc1e4c183c9417eb08f31d1003ca6fcf2fc3caf153a31c97296d598b7597e9ed1a49ccd68da8bf69abe7c56d44d8b39b8b61f92a408298fa7e593eb5506727cf4a25ae6f48d920e9359d2f4cfed88a734b30531f8727afdb222de21d8bfd874478337df3dcf2ff392c0bd26228312a38f16d9bbb325cd2a298eb3e5eb9ce0cca8bffbfc05615ee64b6afab226eabcfbe8d1eece0ed187da38627e497c57935aa0972065579844a087efe833a38802d6dfbe227db286e01ae17f21bae1bbf4b92800231c37499182da284c3708ecb94acfcbbaa8087ba2dc0ef140f35344f157f96c4d7387ee99cebf84b89a14c7ecffbf031c45874306a19d4fa9f73a2b63c37a8defd31369f09ee30b617fb3e3dc7bcf71e619684da03ae37386c9a077e3b004d4373b9cddc1e1105f1a947fc493190feb473cd91b9680fa6687b391276d739824f69fbe2e6b5a48b663b2445158e1dcd1ab1d9811bee803df1b002e14a4573a40dd64f461ed8212d3aac6e8f15bb6ca2645493e17d3833e29569ed334c9a66fd72b2618bdfb8b8d27fc322778b3624a3d902fcabf7e51cdf297816b2aef3a73fe45b15c93eb4ec3d927e9926f5fe5e4080073d7ecdbe4ee53a303d3447d2633a1c0e3a3cff3eaa35f42f6bdeb9abcd260e10c5e03f09f15d9c5b26ac8f97a5e5dbccedb963889befac5eab33d5b97e59bfc5dfb13ebbc065cf66b00985c08420bf4b263d6efbeff4b","fe1fb578e340d70c0000"], [
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
  '11407',
  'x-ms-request-id',
  '99a9d418-b9eb-460b-adfd-c03a9f5b6e3a',
  'x-ms-correlation-request-id',
  '99a9d418-b9eb-460b-adfd-c03a9f5b6e3a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T023938Z:99a9d418-b9eb-460b-adfd-c03a9f5b6e3a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 02:39:37 GMT'
]);
