let nock = require('nock');

module.exports.hash = "e70b0fdea06a5e63617ec273e122b1d8";

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
  'e01648aa-8c6a-4621-b976-40aae35f0900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AqUnTVrOdllJkwGyBkOZSWk; expires=Sun, 24-Oct-2021 09:04:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvVshuewQQXVM51qulX0KU-0oRKj8VH1OryIeev85GFEUjYRnInF-GcqOKiSlr3hAKrJChdz6MxM5xr-Tgpn-yj4VG7rePYrBWXUKkmj55VoB6n8tSNJfFruogEELV8eguIH5pOjh4HSxThzYC_V1W9Ttmv4NJDvs2YANjM64wjEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:19 GMT',
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
  '72601cd0-040f-4c9c-a388-1eecad370900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlNe5SNUNZtIr9C1TM0vJuk; expires=Sun, 24-Oct-2021 09:04:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWGnJ3RD6YlLcQvTSLSk5BC78pM9No-8J6lrPH_Fo_Lhjfcgwnvf9GvLPJVv3pUMNIp8pbofHTSvN3dLglwQrnI7Uwu0HOvmP2q6HHr8EjYfZUwACuP5tJF32lGwbVE5A3gfleGwbbm75BFamvZOmVi_TkW1k5e49M703dfFH1vEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=36d273c1-e453-4c87-a9ea-47ef6a501836&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'e01648aa-8c6a-4621-b976-40aae45f0900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArzLQVs9If1LpgB6LV0XhEcWPr5BAQAAAJOL39gOAAAA; expires=Sun, 24-Oct-2021 09:04:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 09:04:19 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3e355f145b6cc2ef245be6cef36797d594c737a457fbbbebedefb68f4d1325b104e1f753f6eaf57f8f8066868985d341f3dfac5bf64f451594d330c855e3bcd9a36fdea357d9dd3f7f4c1313f4f9ebcb8fbd567f429a1bbcaebb6c8f1ea47abf5a42c9a795e9f2eb2a2a4d6e755f57b4eab654b3d8fa7d5022f98262f045d6a419f2eabb6382fa4d7d7f992c66f2064ab6271b168b797559dafcaebdf131f8faf8ae5acba6ab21facebdcc005dd1a7abd585ebc6eb316b05fafa7d33c9fe533fabecdea8bbc7d1969455f4eeb9c7e9f1db75fb553fa646f676f777be7e1f6defe9b9d83477b3b8fee7d3a3ed8dbbbbff7f0fe4f51eb0b6a7b955d7f5503bf79dbae9a4777c3d9183366db84fb7899b7ee9557f905f59d951b5eddce89e2eb667b67775c6beb1eb45555b71b818ca545efc5597e999798b097fcfd2608b6690fc8c2320f71d22610ae610f46335d6c7a93beeebd32af9a162c7e522dcf8b8b75cdbc425c4742a82c4e93fbee5a5b2a778560bb20f3e5b422ee38010333f7d12bcb75598e3e7a9b5fff64b62edb33126ff964ea1abdcc9ae6aaaaed57cbfc82d897be38290b1a6c00ee3c2b9b3c78dbbc35cbcfd1c3eba67c42dc4cfcf8d1a3b65e535b92fe655bb4d7022d8ac16b561d34be27eb82905cd258fc6f89b1d74419bcf64bbe4fec02919b9ebd3c9ecd48eb3410d5ef7d747f6fbc7b70307ef070bcfbe0c14768551797f472d00c10461f65b359016267e573550cf6abcba26ed759f9226f89206f83a9314da6eba6ad163437c44b464f3865f45d1a3b49f2316626d44ce3cf091b9299f1eb7cbaae891e6382d156d3aa6cc66fca66778786ff0cd4a5c17f13f076bf417834a9f73e1cbf9362457a92b023cb52e64ff366f7d3830f06fa249bbe2505eb218bc17f38b271b81f4ed43edc0f22ae0786140369b76f9302dab3d0c8f8852cfd4654cb8b6a89ae3c21233e16fe9e154d362973edc04a3c69999fa4c9234120a968da3a2b962d587f512c0933fd4a6050a72aa22b953d27f4f28522734ce6aca18e3f3a5da24b983595dad3e56c55510fd4d7329f42fca8994228b3f6bcaa17b6cb8f9af6720f236ddeae8111942a7d4a5a6339cb48abd130b3553625e27ff468979a197d6400fe806861a137d7e4b62c9e666d06506a479f50db8fceb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff01fa32af28a58f572b1ab06810fbed31912e6295ef8f0f76efed3ddcdb85552eb3a6fda29ad1f4001ab5bf2502e17b512cfc2637a3f24b7ec9f7","7fc9ff03256e24c9230a0000"], [
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
  '108e56e1-aa91-4202-81e1-686ebf0ac093',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '5595',
  'x-ms-correlation-request-id',
  '9582640b-b27c-4c63-a5c6-f608782b0320',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T090420Z:9582640b-b27c-4c63-a5c6-f608782b0320',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 09:04:19 GMT'
]);
