let nock = require('nock');

module.exports.hash = "1aba59bbf2d8aca7e007575928258017";

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
  '5b88dc2a-b98e-449a-9a73-75be24bd0300',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjSbs8rPcExNtRijVibR36o; expires=Sat, 01-Jan-2022 06:14:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrw9MJvd6oTDeKyqOap745KozYlsciMGjiMZniWzAyc1ltV5LHbHUanzfoD301fVz2M2Y0c2Qz7K5c0Gu4yoNqSHmpsadqz5ouzHKeZOBEuhfo1OlpNkF4ZZVFfWiwZ7_qTw7L-ma7vNuXhyp864L7YCTK1vkQ-fwSkbFlUTNMt9EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:14:27 GMT',
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
  '78434e2b-f6d4-4f30-a1e5-2c4514800300',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuhmfNO06GhFopYwuAV3F2g; expires=Sat, 01-Jan-2022 06:14:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrboDEBDTm4iUQOcTzld00dpT5YdEI4ro6uF-IoY2FtJUAlDgaYBY0ExlLO6kIQwcJzEWqRpTGHA_EENJekIwVkfQlalph_T1d4iXdsMOHvJunPUBZs5480EHsA9dpgIDoK40ES57MqbCpVRNJQCwMYY47YQo-f6IfkXZiYJcX-4QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:14:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ede1e51a-c745-4ee5-ada4-8163e297f5cb&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '5b88dc2a-b98e-449a-9a73-75be26bd0300',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgB7e3dSzgxIkXVlss-ldn8WPr5BAQAAAENbOtkOAAAA; expires=Sat, 01-Jan-2022 06:14:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:14:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc51f376fdd1a35ffcd1325bd0df1fbd6eb3e52cab67bfffe7af5e7f34faa82df2dafbf4a35f32fae86db19cf147559d5de43fb947ad0a7c70b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bd60eef36f2f3783aadd6cbb6317f67f2f70f7ef08377efde114e3a9e816fdbeb15bebd113a352dab69862151f32bc22d5fd715bd4b20b28b06847b9b5fefd2774cd05dfa9cfede337fef81603498555e13254df3933a67886f0aa0c81f01c2decedeeef6eedef6cede9b9d4f1fedee3fdab93fde7db073f0e9bd7b3fe5e06e6cc5bd1597599b9f2e67abaa58b627d572994fd11bf5febdef8f3e5a14cb62b15ebc299b9f24fad2e704f3cdf3d7bbbfff0ef591956575f5a4ac262fd793b2981215f286de6beb754e14cddbabaa7e7b3c2de9a35ffcd1e47a95e1cb8f8e7fb0aef3d7797d59506b027259d4ed3a2b5f48f357eb923ee5ae8b95f7c72c3fcfd6657bccb8010abac6009af56a55d56df3edb65d356feaecfcbc987eb92caf0d1af9725a5f3393018bc6f44bbf9f17a5a1e71b995f1a00a69190ca97d9a4cc894f05489935eda97c24b370235d2744959f25e0049da0be6649a0c63da644f7c4c034156f441cbf5da157e2abcb0233582c2f48405bbcfb7a4dedf219e132fa681ab0590487fdf1c39dfb7b3b0ff7c05ec4378bacbe367cc3049d9dd38f8fe6988847778d68102618b688d2989a8ca7559d8faf482d5457cd98b8e42e81bbca895a9b5ffdc1a7636a157d5b88bdf975b489befc8bd63954dbe6b7b951f4f5161377d3ebdc28faba30e1e6b7d126f2324db3cec2f3019dd3d034af9b2fcf5f4a33fa3abbcc8a12c8e0db7c5a414dfbaf2f4994e6bdf75f9b96d4c241f825bfe4fbbf","e4ff015411227c1a060000"], [
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
  'x-ms-request-id',
  '4a5af1d4-ce0b-4902-859e-23599bdbd675',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11946',
  'x-ms-correlation-request-id',
  'f425333c-0fc7-4270-829a-6f52e0ebf321',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211202T061428Z:f425333c-0fc7-4270-829a-6f52e0ebf321',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Dec 2021 06:14:28 GMT'
]);
