let nock = require('nock');

module.exports.hash = "d754d51527d102fcb0c6320fb9fe4afa";

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
  'd4101ec2-ba9d-4bf0-b788-a4a244db0400',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AglzeoWyO8BKhtdALPUgUrs; expires=Fri, 03-Dec-2021 09:45:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIBOX1GraaaHIw4-VVocXSXTrMGP4u2MWtvEasMoHYqNDEuSWEEyhvrmc_1sp-OY6Jc1Um89ueqfMlFVTmRSYY8it_Y0ayi-xwnesxnbydQSAY14q8oJeUOBH2VIOqIj5cOt6LCaMYa1pkG46ECqNVr3FnaXxSP58VvUMIIM5ZrMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:45:57 GMT',
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
  'c62deb8d-f9b3-498a-868e-f4d0017e0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsX2HWHA6f9Hp0Q5wEj6_r4; expires=Fri, 03-Dec-2021 09:45:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhGotZVdGqgWbPdzmr70xW7R3r0JC9GDCqcvKNO13NcmIN6tzdLfgbabpdKF_2e7Ya4RmWfwroS8mrb5QRDepcgzoEXJifnRZYdDOXK1b1aGpWuh78NutGQDvPPI6FpX01ScvCL5rIq_Z6I8n_Q2M-ChKh98RZzVZndCR9PTBad4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:45:57 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=13daf320-cbf6-4ddc-b630-c26750d16c1d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'd4101ec2-ba9d-4bf0-b788-a4a24adb0400',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoNLMTwQtgRIlP-lhC38wW4WPr5BAQAAAFZRFNkOAAAA; expires=Fri, 03-Dec-2021 09:45:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:45:58 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy', {"location":"eastus","tags":{"key":"value"},"sku":{"name":"Premium"},"properties":{"adminUserEnabled":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a39775be28d68b8f461fb5455e7b1ffc12fae47a85265f14d3ba6aaaf3767c522ddbac58e6f5abfca268dafafa6e2dbf147943108a19b5bedbac27cdb42e566d512d9bbb0ff7ce1fde9f1d9c6fdf9b7efa607b7f776f7ffbe1eef4c1f6c1f47ce7c1743639dfdbdfbd5be74db5aea7f9e775b55e357717d73fddb479d3de5dd5d56531cbebe6eeed70a037f58feb77efde5d5f134e3accfe176535cd80227d99674dbbc600daeca2016ddee6d7f4f16556ae73d0a1b92674164fb336c397d33acfda7cf6044dceb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff01c1b5afbc118a1eaf5665a1dddb6f8f5bfa666f676f777b77777be7de9b9d878ff63f7db4737ffc60effebd7b9fee7db2b3f3686787da9784ee17d5ac382f00925eba2516e17b5154fc26b7c487e843d3b4ca6be21f265e595d14cbd7797dc9ecd421fc38fbc1bacea7f5b8a8a83b1e39f54ca4052e1b3afb296a4ddd5c160d352f9617af5b79e5f57a3acdf3593ea3efb3d9a2587ed5e4f5e9329b94f4d1a3f3ac6c72e281bcbdaaeab7afd665fe3aa751fde28f66f979b62edbe3297a2730c765595d1188cba26ed759f9c2bd4043fadef789b557f60f0cb8229ae9707fd13aabb3654b1cf9129fd27c90881176c4508f3e9a158da0422fb5f5ba695d1b15ae17559bd5e0c7e83b75dee604bb5abaf766d935b57a2073f5d56a467498bd2998c9fbf47b38beb7fbe9ce83dd5d9dac816ef277abaaf670b38d72a5e42f41a3e5b4be66a90e9af8700899ec74395b55c5b2ed4e82ffddb7aba67d912d40401077551797340cf32d49f832e79931dfaf2784994eca314d78435f7c643a08e6f7c9f52a6b9a2f194d343a06bb81190b7a8b9afea05ae6aff2d97a39cb9618eb474f0dfac43fcb6a79bda8d6cdcb75591ae882fe2ff9","25ff0fe289350a38050000"], [
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
  'api-supported-versions',
  '2021-08-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1196',
  'x-ms-request-id',
  '5355e9e0-f8cf-40de-8057-ab74351a81d7',
  'x-ms-correlation-request-id',
  '5355e9e0-f8cf-40de-8057-ab74351a81d7',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T094611Z:5355e9e0-f8cf-40de-8057-ab74351a81d7',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 03 Nov 2021 09:46:10 GMT'
]);
