let nock = require('nock');

module.exports.hash = "52c2da2d77afc1517bde875df20c5c04";

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
  '9e21a3f3-9d46-4882-8eff-839ea1210900',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArIwytKrxf5LmnCHLKNfn70; expires=Sun, 16-Jan-2022 03:22:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrnh6CrmCndCCMr_6Nz49cDokAUe99DuBiWPEfcc62RXLPAKS7raNPHyXTm9UgBdSjTT8815u9_UBcYgscdHpGZ57cqQyAnvOHWSP1XZxF--tq0CKd2IqWHjVvXJ6d3v4fUHy5ldG7woNPNOluDfJMLeqBCLDisjuqIU8Yd2C9xU8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 03:22:53 GMT',
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
  'c0adb44a-88a3-4762-bed1-f4d04f850900',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvMT_j__wBlPhT9OfOtS-Z4; expires=Sun, 16-Jan-2022 03:22:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr7VSbXWuvcRIUX28HPlVLRBV8YJwR_HISXGm6wEBmyiLKQgN-RkZ4BDwXwYglgd_wZ1m1fzn_KjlqQMupYecgBBWxfB3J6SFq3R5zewlnKS0QptbqnUwul1vUVCM82fa6h0CIuwKOl7yiDr2R5txp9W-YlxL-uZlbU9TO9NK39ZYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 03:22:53 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=844c9444-36bd-4328-8d30-b02d16a6e155&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a60e0c08-89eb-433f-a476-c0a93f3a0900',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ag-0kWHKxolEhrESYnXy75sWPr5BAQAAAI35TdkOAAAA; expires=Sun, 16-Jan-2022 03:22:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 03:22:53 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows/myworkflowxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478ff8afcba229aa65b1bc78dd666dfed1a38f5eafa7d33c9fe5b38f461f4deb9c3e9cbd2916f8666f676f777b776f7bf7c19b9d7b8ff6f61edddf1befecddbbbf73ffa7d0769e2d2f36b7ddbd776f6fff1e1a37dad9e9329b94dcd5655e0311fa6ce7e0fec1fd4f770f1edebfbf7b6fffc1fd079feeee52838cd06a9ad3e56c5515cb96dacddb76d53cba7b970631db26f079d6b4eb665c5617c5749cfd605de7e369b578b4bf7fefee5555bf3d2fababe6ee6cf78086b69f3f78f020dffff4607732994cf7f7cf77f287f71e3efc347f481dcdf2f36259b48ccc2ffee8776ba6f37c9179fdc907e345b6cc2ef245be6c5d67c0e5b298d150ee7e514cebaaa9cedbf17320a46f3577f776763fdddea1ffed5aac5c87e39f6eaae58f130ed36ad912e49f2448f43175be3bdec17ff4d52aabb345ded23784de2f197dd4d6c5c585fd2b9b028efe51addbd5bae53fe8afee8bb992b239a996e7c5c5bacef02a7df791410cbf138c0b6a7571b63a9ecd6a9a0170cef77ef14799fc05d4ee8d1fee8d1f1e8c77699e7ec9c8ff6a7f67bcbbb73b7eb83bde8f7db5bb3f3ed81bef3eec7eb7776fbcbbb33bdebdf770bc7bff5eeccb9df11e7df77027f61d5efc744c74ee7cb9bbb33fdebf0f88e383ee77f6c53d7af120fde8977c1fa4f4196ed3f81fd08b0478e7d3f1fdfd0e601ee683f1c387e3070fe35ff160f60e3a5f32d0dd4f897cf4ff4fef13423463c415cb7cda56f5ed26863a78b03bdedb274add8b74aedfeded10f4ee77981afcb8b7d7ff8ededbdd1d1fecdced21ad5f12293ea56f1f74be2511dd3d202eb94f23fbb437733b63fe8ee6e1c1a77dc8ded70ff718f4f77f0978ba98d197779bf5a499d6c50afcdbdc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeee5d825badeb69fe795dad57cdddc5f54f376ddeb41b04d808051a9bdfdfbd7b4712b924b12234ba1fb7d72b7c3c08879a94d55485ee23d15e1ffd","92ff078029d330a3050000"], [
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
  'eastus:5285aa88-ff1e-4e94-97b6-35f9228cf1f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '19999',
  'x-ms-correlation-request-id',
  '90cb57d4-6e08-420e-a626-7eed86e01e9f',
  'x-ms-routing-request-id',
  'JAPANEAST:20211217T032254Z:90cb57d4-6e08-420e-a626-7eed86e01e9f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 03:22:54 GMT'
]);
