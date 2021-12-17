let nock = require('nock');

module.exports.hash = "e3cd214a3cbe23dd7ad2cb121caa5d1a";

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
  'cea5795e-3301-4fb9-b860-18405cd40a00',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aoc0Ilk7PGlPhjf3Luopneo; expires=Sun, 16-Jan-2022 05:44:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnFBlGS0-m8pgC-8-6zy2PgVQj9Msg-ch_8X_PBQpqDd_FCEbHeGDNPxu9mF_7xV2CccRzSHg0pMR8YFqQ92-zYUGjbN9JGtbAJPd0T5M0dHLUtSGn9U1-Q4r2TfNudbBK4E0o0gquekI1WPrXwwtv5EDtH7WnaVarlLoFnKg--EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 05:44:27 GMT',
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
  'c026a237-edf6-4187-b74c-80215de80a00',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqtoI5M2ayxLsDn2ET1Tk6s; expires=Sun, 16-Jan-2022 05:44:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7TuXkUIBRpiv27_30wSxAt1UQ16F0Z01DrEoPsh2okZ9BQJchTROplfupALzwB5--tNCS8Or6izenwbVpuzx1dcVYV7xnFb4CPuhZegEG25C6heplGDZEkgQpQk_aiWKOEUxTJ_RuOTXTUJKPFRahmL0gmb1pJamoimxXO1atw8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 05:44:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=380432ba-430d-45cf-9078-7c4116920079&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '5285c3d9-cae3-4c1d-810a-40fa4c620a00',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmWvUNPIqxJHgca6wh8ebwgWPr5BAQAAALsaTtkOAAAA; expires=Sun, 16-Jan-2022 05:44:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 05:44:27 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac5f8b94b9f5f66e53adffde8978c3ef247cc34b8cda009a019f605864daf9971d3573975429fd06f4483555eb745ce7d1bbce88fefb9bfa8e52961997ef59a5ea8ab12a35bd5c522abaf09bfa0dd77097ed0aec9a7d572c62dbf4f4369b3169f1e4fdbe232a756d4fd65d1d0bbc5f2e2b57ef97a3d9de6f92c9fd1f7c5ea5951b679fd6a5d024342ea9cff7e91f104d4f431869a113ceeff985e5d6184c5ea8bac794b9fecdedb1defee3e18efde7f38be7f8fb158e6ed5555bf05ccd7794b607ff147b3fc3c5b972df062384ff3e53541c956abf2fa4df5644d9d9e2d4f2ff32566f074395b55c5b2fde8515baf73f4055004e766f4cab2baa20f86b1a3f99e574dab00220c36ce7eb0aef3ed99f0d498c642f0f20e6684cb2f960ff9b73a6fe95742e14db1c8cf964fb36bfa7897a89fd1cce3f3936a8de1ec791f9dcda8cdf73eda21e8bb1f11d156593b8f63442d72ed971a34934777ef4a9bed65b3edda6fef7eba7f6ff7c1c307db0fb24f3fa5414f77f7c74d5e631c937533be2a96b3ea8a4774f7a35f427420b66d892d3000039f50fac51fe93b4fd6cd4facf335d39df0739fbea956c5543f651a1061f4cfa6adeaec223fa9966d562c49f2f1b17665009d676539c9a66f5fe133f4a7c2febb992f68bc2258f4a188f61779d310584831b89de9475f823be823833ce6147d08520d885a34a7cb6c5212ab3f22e84d8e612b8ec154fe6eca9ff8bdc99a376d79dc9c35d5c1a73b50152fdfec7e9bfaa1ae973973daebb666c241c0e953192bbac747e883102184a94dd00bf16efea26a8bf342e4993f24e17efb745df3079d4ebf20f06d149545f6ee695e9288d7d7ca5abb3be837e7d19248e75fadca2a9b757a631a10ca65b59ebda984b6c021066e6464364e8c73d2203c59f4fa373a84f33c6b490009db8f5e544bccefa258be299b9f246e22f8f4f1ee788f3e2566a9aef2d9b35f345b3e2f48e9126fd1dbcddb353052967a0de5d016798ddfdb0c7a124a6f9aadb269d15e5397f40a5928925dfc45b6414c0b77fc4b7e","c9ff038348319e13070000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '4998',
  'x-ms-request-id',
  '3e5d1005-5d17-4408-addd-63a9be237a0a',
  'x-ms-correlation-request-id',
  '3e5d1005-5d17-4408-addd-63a9be237a0a',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T054431Z:3e5d1005-5d17-4408-addd-63a9be237a0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 05:44:30 GMT'
]);
