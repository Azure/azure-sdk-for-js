let nock = require('nock');

module.exports.hash = "203b6241d42d1c404abfe2b9b73e6b03";

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
  'cbb7014b-61d7-483f-8200-5804bc3f0900',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhQ2XVuhz2FKkbOk38Q3DsI; expires=Sun, 16-Jan-2022 03:22:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKRyhO-ZldLPR1if9F3pp5NsAmV6DPby2jk_ICina4i9mSE0ZssLpcepxb7WwSo124PrkOryzq5D9v3u0RRYNHSpX3CUxtfyc410O9Rg3JEq-h57BeIWFcj-PvWgj_9Y9dyFIdxwvdivznYASZSwsB-tSf55WYYrIjlqqd6HSiBggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 03:22:54 GMT',
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
  'cbb7014b-61d7-483f-8200-5804be3f0900',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsaDWvniZ9lJgfpUaoBh4H8; expires=Sun, 16-Jan-2022 03:22:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCAsmoGa5Jn9OlZZTb8fNDs195pvSf_bW92cnX9Z5XSKFrGrtrCW3qvBj9TJBf8NeoLNA1qbH3zAoGewZ6PdgPGZXPqeUcUWuZmA-o0tCHodeyXY1Bg8vURd4XozFEZ83_CAHXylmurIU1GpcRzK6nPk7BwKrSRoeGwF6E5K5m80gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 03:22:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1a824847-9914-44f9-b0fd-9d2e8c8b67e8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a60e0c08-89eb-433f-a476-c0a9493a0900',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArBpeyequlFPnyNySXt1wQMWPr5BAQAAAI75TdkOAAAA; expires=Sun, 16-Jan-2022 03:22:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 03:22:54 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d123feebb2688a6a592c2f5eb7594b6d3e7abd9e4ef37c96cf3e1a7d34ad73fa70f6a658e09bbd9dbdddedddbdeddd076f76ee3ddadb7b747f6fbcb377effecefd9f42db79b6bcd8dc76f7debdbdfd7b68dc6867a7cb6c52725797790d44e8b39d83fb07f73fdd3d7878fffeeebdfd07f71f7cbabb4b0d3242ab694e97b355552c5b6a376fdb55f3e8ee5d1ac46c9bc0e759d3ae9b71595d14d371f683759d8fa7d5e2d1fefebdbb5755fdf6bcacae9abbb3dd031ada7efee0c1837cffd383ddc96432dddf3fdfc91fde7bf8f0d3fc217534cbcf8b65d13232bff8a3dfad99cef345e6f5271f8c17d932bbc817f9b2759d0197cb624643b9fb4531adaba63a6fc7cf8190bed5dcdddbd9fd747b87feb76bb1721d8e7fbaa9963f4e384cab654b907f9220d1c7d4f9ee7807ffd157abacce16794bdf107abf64f4515b171717f6af6c0a38fa47b56e57eb96ffa0bfba2fe64acae6a45a9e1717eb3ac3abf4dd470631fc4e302ea8d5c5d9ea7836ab6906c039c44899fc05d4ee8d1fee8d1f1e8c77699e7ec9c8ff6a7f67bcbbb73b7eb83bde8f7db5bb3f3ed81bef3eec7eb7776fbcbbb33bdebdf770bc7bff5eeccb9df11e7df77027f61d5efc744c74ee7cb9bbb33fdebf0f88e383ee77f6c53d7af120fde8977c1fa4f4196ed3f81fd08b0478e7d3f1fdfd0e601ee683f1c387e3070fe35ff160f60e3a5f32d0dd4f897cf4ff4fef13423463c415cb7cda56f5ed26863a78b03bdedb274add8b74aedfeded10f4ee77981afcb8b7d7ff8ededbdd1d1fecdced21ad5f12293ea56f1f74be2511dd3d202eb94f23fbb437733b63fe8ee6e1c1a77dc8ded70ff718f4f77f0978ba98d197779bf5a499d6c50afcdbdc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeee5d825badeb69fe795dad57cdddc5f54f376ddeb41b04d808051a9bdfdfbd7b4712b924b12234ba1fb7d72b7c3c08879a94d55485ee23d15e18","d7ff03b2b1ea20af050000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-request-id',
  'eastus:1b69ace3-51c9-404f-9bfa-5dbe3df42148',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '19998',
  'x-ms-correlation-request-id',
  'b35efaf5-a898-4534-8a9b-735be1798dae',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T032255Z:b35efaf5-a898-4534-8a9b-735be1798dae',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 03:22:55 GMT'
]);
