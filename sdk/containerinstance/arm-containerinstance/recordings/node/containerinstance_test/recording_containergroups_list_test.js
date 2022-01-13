let nock = require('nock');

module.exports.hash = "03e0656663770886eb80137826937055";

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
  '8c3ca41f-18f5-4cfa-9296-993a9b0ef201',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsagmgJxR85JtWxe4De6kPU; expires=Thu, 03-Feb-2022 03:19:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO4EixkPLarvSOaYZb2c5RdiFhVtXfnPDqL4CcDxEDBv3A57XHOHAZi9-zams3TvjwNVokUgy3Rzsu7dpcc63ZnDx5ibeSavWctEjZvjy556mPTmbmEtl9Uv3cND8Kd0Bz-jj-QpiVR6KTS_D1-tSnt_P12eX5Pli71x85by6TkcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 Jan 2022 03:19:00 GMT',
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
  'd937ebaa-2810-4319-8fb4-dedfefc46202',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Al1yckXK3K9FubKzKkxF3jM; expires=Thu, 03-Feb-2022 03:19:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnlSuEHNwp2O3b6fmK7nrhvPFkEm-2jL7HK35HvIfqOpXqt5jD4Nt3lg075tAlLolhBeEgquFG8ETmzdE-n-bs3u92shzDj-Vuwyh3IOu6xCVkx7Yz6tPHozMG2H8Xx0V4ppwWwFmBTJCFLTknyv9tMJGYyUU8m8Bh9buo8H3ez0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 Jan 2022 03:19:01 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2871b209-91fa-44d3-a836-3d0ba4b753db&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '19e2e25f-66fa-4e3c-a0ce-e282aca3b202',
  'x-ms-ests-server',
  '2.1.12261.17 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhLTPQ6LgH5JgnpXxcMmzeTLj78gAQAAAKSzZdkOAAAA; expires=Thu, 03-Feb-2022 03:19:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 04 Jan 2022 03:19:01 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerInstance/containerGroups')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d1a35ffc51f376fdd1a38f5eb7d97296d5b38f46f8fab2688a6a592c2fe8e3965efae8f57a3acdf3598eefa7d5b2cd8a655ed3eb046d992dd06271bd6dbf28960d819be6efde517302e7f5562cb20b345f5e144b7c3bad160bea99207d9f9a56754bad08287efbe8d1c1ce2fa14ff3e5655157cb45be6c7f32ab8b6c520214dad77953adeb29fefcc5f4c72f5ae70ddeffc51f2df245555f9f2d3f7ff2d1a3ddf17dea664583dc1def8c3ebac06fbf98fa5d2fa987dd918efff73ad8f9e897fc925f32fae8b22ad78bfc0b7c4da008151d5fbe58b5d7dbf22de1bd408397593ba7af16cbf6eee27a56d41ffd92efff12605c2c8bf6c4100350e833c2b5cdeaf6655516d36b7ae9cbe5b3ac28d7358055cd9beb153a795e2cd7a08a74833787fae73f9f52978f7e3177392bb28b65d5b4c594defac51f95d5c5f1322bafcddf5755fdb65965d3fc8c48edfe2a6632e86246c42d5ac28b484fd3372d5659c94d1fdcdbcd1edcdf9d6eef7e7afe707bffdebdc9f641fee0607b6fe7def4c1fd079fee4f1e029d365f66cb56ded83b7f78703039df3ef8f47c777b7f373bdf7eb89b4db6f7660fa6b39dddddd964ff01de9011bfbe6eda7c71dc34c5c592b88b71a18fef36eb4933ad8b554b7cd8dc7d4830efcf0eceb7ef4d3f7d4030f7f609e6f4c1f6c1f47c87a04ecef7f677ef1285991b3eafabf5aaa119f96902ddb47789012f69807573f78b625a574d75de8eedec9c29abdeb5cc6b5f0f3f79c7ccac9311ff5287f41ebdd04b6535cd30487a31cf9a76dd8089","fe1fa5a14ee7ae030000"], [
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
  'eastus:08dcaad7-658c-41ed-9fe3-125c5079c36f',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11703',
  'x-ms-correlation-request-id',
  '53a76da4-8563-4366-b876-60050a67f7db',
  'x-ms-routing-request-id',
  'KOREASOUTH:20220104T031901Z:53a76da4-8563-4366-b876-60050a67f7db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 04 Jan 2022 03:19:01 GMT'
]);
