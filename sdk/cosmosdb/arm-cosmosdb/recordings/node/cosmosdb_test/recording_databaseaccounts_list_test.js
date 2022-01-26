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
  '8072c932-7798-47de-b5c9-9457f6d30900',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuGJHTWzAulJglT0ZBhxD-s; expires=Sun, 09-Jan-2022 03:24:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0HzHgycWLzuLci-nEBOr_8WhiG_IRvAnTNBn1T8P0HKKSUraqa8-hJ5_0c5qXpoYeCsPnLuf2cyJpAZbiCwiNemNSW3VRrNHwAF83oby_1hQ7QEl07umBviK8eSe8rFDRuSrYkcHME8uJ0AQ0PfEIwV-9RSDoV9Md7zv3oe67YQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 03:24:08 GMT',
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
  '056f2747-a290-418e-88dc-c95846370900',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Amy7VfU8jsVJpbnuXHAtAXE; expires=Sun, 09-Jan-2022 03:24:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreXmzELu9zbGK9KjIV8VP5DlSA9hdJ0g0dj_DSMYTRxdCkysYjhGZkKr79VQNLVQ-EvgjZcRJqEl27sZcQJ__vFu6OGHvxMYR1MeOORIq8kfbX4LZ87pYFjqzdntWnO53VERjmJAIidewVhU3qXLkRChpHsUFjmCfrCzyeYk-bQsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 03:24:08 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=7cb9cb4d-38eb-46ad-852a-650ee64af056&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '84e10da0-7734-4177-95ed-c343d0cb0a00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au6Z3hmE6idIhosBKwujT1MWPr5BAQAAAFi_RNkOAAAA; expires=Sun, 09-Jan-2022 03:24:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 03:24:08 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/databaseAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7d574bdc897edd3277767599b4db2263f9e4eabf5b2c58b99fcfaeeddf5f5de47a38f96d98250fba8f779594d33e047df9d664d9b7ef59a3e6caf57687cabaea8f9db6289f17e5e5693ac744de99b36bb683e7af48b7fc9e8a3e69a06b2784a2fd3df1f4deb3c6bf3d9714bafededeced6eefee6defeebcd9b9f7686fe7d1cefe7877ffd37b7bf7effdd447f4260d7d95d76d910312feba2c1a42b8585ebc6e09084178bd9e4ef37c96cfa8c799767fba9cadaa62890ee66dbb6a1eddedd0646c5a36e3ec07eb3a1f4fabc5a3fdfd7b7709c86a3d298be98bbcbdaaeab734d0bca1be3f3a5d6693923bc9f9b7e3755b2d8878d3675951569779fdd1a3f3ac6c72f3fd17ebb22d5665feddba68f3e74a670214347a99d1d0f0c5ef955f7f41a36a2b07a6687eb2a8db75562a26cf8ab2cd6b8386697519b479b52e41a8ef7d7f64f03d5e156f683ee9c38f5effa292b09f150dbea00e9fd03ccebec8db0c93ca689ac12a6cc1f1599de76f8adef88e9759794dc3cfcad78475764153a1df67dd6f4eaae57971b1ae990498c6663acf1719f022b4be9b97e5d3fcbc58d2a868c28b65d366cb697e4663fc68baf3e9e460baff60fbe103129dfd879fceb627d3fbb3ed9dfd9dc95ef6e0feecd3fc21c64403f0b8f2cbf3f3bc56e8c425cb595663de66f97946937236a3692fda6bfaf25951372de6e0da7e48b222a43c9e964fae5719c8f1d18b6a99d3374a3a4c6649d33fb7239ed2cc16c4e1cbe9f5cb8a788760ff62d31d0dde7cf73cbfcc4b02f79a880c4a8c3e5a64efce9634aba43bce96af738233a3feeef3178479992fa9e9cb9aa8f3eea347bb3b3b441f6ae388f925f15d4d9a815e82985d6112811ebea3cf8c2e0a797ffb8a74ca1aa26bc4ff85a887efd2e7a2028c74dc28470a6ba338dd20b3e72a3f2feba222fc89763bc405cd4f11cd5fe5b335cd1efa674aff12e26bd21db3ff3f0f71141f509e010982d5199053db06bf9b0724b0bed901edbeef80c8d2b5f329755f67656c60aff17d7a220dde778421f06f76a47b832325ee3483f81167fe8833a3230c817fb323ddc899b6390c14bb535f9b412d28db3319a6383099507aa703cc31471fd8ee10b09076f46e07686462fad0f7408c69558300f82d5b6593a224278c49429f142bcf8b9a64d3b7eb15d38cdefdc5c6377e9913bc5931a51ec83be55fbfa866f9cbc05995779d7dffa258aec99d2714f649c8e4db5739790618826bf66d0a01a8d18169a24e949953e0f1d1e779f5d12f2183dff5555e6900710637e27bdfa716e41c107c0cdc22cfdecc2ff925dfff25","ff0f5bed0ab0b40c0000"], [
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
  '11180',
  'x-ms-request-id',
  '4084f6a3-2e0d-44d0-a700-a5aa2b1c77f5',
  'x-ms-correlation-request-id',
  '4084f6a3-2e0d-44d0-a700-a5aa2b1c77f5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T032409Z:4084f6a3-2e0d-44d0-a700-a5aa2b1c77f5',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 10 Dec 2021 03:24:08 GMT'
]);
