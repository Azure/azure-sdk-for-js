let nock = require('nock');

module.exports.hash = "24407c98612b7b185d604f8a4ee3290a";

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
  'bfd66bfb-5435-4e98-9043-de5d52bf0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AoMXKVtE645Hg2o9vy94fxA; expires=Fri, 03-Dec-2021 09:07:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZpI_4PYGazyUBJzrfAYLF3UJAg3liTRWAty1AVXXB655VQgqTCk4dT9uYZWvLLmBcddSjmTaGcZgsovOnuhsGsVax619m1H221B1uYaKolh6ijUHdqEUFb69tpZGNiN9JiiLbVlzrVaz6JimKvPXz82OOyM1A_2LejOlyvMWBOYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:02 GMT',
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
  'af85092e-a353-43f6-9a00-24a96ade0400',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnDcNRbzwPRDm9Y2jJAlezo; expires=Fri, 03-Dec-2021 09:07:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrr4nCw03WjkveRxytmTH2h5-Mrl8s6A4XOQkWEvxeYDO-Hjf818vfm0NOGPgSTbB6RnINzd1Ey7a70merc7RL9xfVQoffaBnLgj9aH_-V9L016UX7vH0XL4TFH35Dpkm5a4GphZoTtgmZy7N3UTe0AHwz-FliTkU1nhbIYx1NS1MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:02 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=af2b7391-d542-4d2b-8812-e2bb16beea88&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '342d5fbc-e9cb-4f96-b790-c9715c3f0500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgTy2WROBbVLsuYDjnf6NM8WPr5BAQAAADZIFNkOAAAA; expires=Fri, 03-Dec-2021 09:07:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:02 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.ServiceFabric/clusters')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a3f67a85cf3ffaa298d655539db7e3d7797d594cf367d9a42ea677a7e5ba69f3baf968645f29ab69d616d512afe559d3aefd2f8b193ebedbac27cdb42e5668d7dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd2fea6abd6aee2eae7f9a3a6edabbabbaba2c6684c2dd9b70a477f4d777efde5d7b482db3050f72e8fbbccd2ef0fd77effebe1f7d7aefc183ddfb7b0ff6761fdcdb79b0b7b7b3fffb7ee4356daee9fdc5d3accde8054b46fa625ae7599bcf9e5cd3e71f9d67fb0fb2dd7b3bdbe7d9fde9f6fe6cb2b3fd703abdbf3d997e7a7fe7fef460ffc1fe0307d47ffb8dcec7f16a55164ae748c3e3168df676f676b77777b777eebdd979f868e7d347f73f1defecec3c38d8bdf7c9cecea39d9de0d592e6ea8b6a569c17e808efbf379a21889b70f55bdf1661f3fa2fb1803e220658e5755be40d81f0494e5f5c160df55a2c2f5eb74416fafea3d7ebe934cf67f92c4045e7fd8cb9f3c1fdfddd6cffe1bdeddd079fdedbde27e6dc3ed89fee6e4f0fee4df3e9bdbddd7c763ff6f64935cb7f92f88c7a049883f1de7877efdefdf1c3fb0f434a6b7b8bd377b3a2251c9f55f50b02e1890bb55d64cbec225fe4cbf674395b55c59209356fdbd5a3bbc4d027026a2c82369e96d57a96ad56e3ec07eb3a1f4fabc5a3dd873b07d1eebbf01a02a8601a919ff30cf2e360ddadd7cbb658e44ea2be06a90a1aca09e6eb1c3c91bf99af1793554d7860fabef7fd8d8d4faac5a25abe2071ed3716645fe72d48c95fbb2f3d8d268f15f9af56177536cb5561f8a8e2f96895d5d41043a5c601403c1da0782c6062fa9755599e2de965d2ae67cbd7f9b45ace82c9358f55bf1f7dea38dc3cbf24fce0fbfe9fde77012deabc2cb2495116edf5f3fc322f01fa75515ee6b5dffd474be23608696f709d81d9412ddbddcb850f028f99a66ab9cca71072c3582fab1acc450cb8b3d37d070cf739cde855761d69fea0db9c58daa8103403c21d1ca951d366b581b2477d763ba526f972a60deed1f73be1f74ea7c8f351be9a93e4d55989776eee739f30dfd8e7a7fbd420fcbed767d1bcac8b45564301b7f53aef7e3f5bd7dd997d5257cb1ff479f77271b624f49653121b925b6a79bfdba4685807957983d19d676593fb2d86d86b566417cbaa698b29bd5fd5a49f8ea753f4413c705ec05406842222f98d20bed484a1844893c6e6a15343c2e8f7ca4103cfb8e2f9a86131baa11169fe9678319f51237449ad4caf21c2f4c56ee7dd49594d0c4be205702a5423d01de34bd284a40eaf8ae5acba6ac6cbbcbddb81f08bd6f93a1f04c1dfde08a3cd26e5300cfef646180354d803384fcdf82cf8d15af4219965a6d6f1baad162476531ff447d96556944041ad8f1a3df0d046353225a8da969a0e1b483c1f35ebd58ac4e6f4ddaaa8afbf6aa778e3213ddbbb7bdbf776dfecdd7b74ff21fd6f4c1fe1e9bd9f2f2f0b120c584ebcfa5da193376e1ab9fb23e06f25c277b34b26027e3abdac2ff10f52c6bf","e4ff01b785061b410b0000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-request-id',
  'c840e3fa-fa80-49bc-b1f0-0d77bab2a4f7',
  'x-ms-correlation-request-id',
  'c840e3fa-fa80-49bc-b1f0-0d77bab2a4f7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T090703Z:c840e3fa-fa80-49bc-b1f0-0d77bab2a4f7',
  'Date',
  'Wed, 03 Nov 2021 09:07:03 GMT'
]);
