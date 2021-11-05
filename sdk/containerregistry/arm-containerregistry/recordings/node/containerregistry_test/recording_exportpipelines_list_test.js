let nock = require('nock');

module.exports.hash = "690f8f43d7e93ffda1ef95a9b796ffa1";

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
  '9f2a07e2-2a5f-4d52-857e-9dca14960500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AijRsg4rYzFKlIfjSt4hbo0; expires=Fri, 03-Dec-2021 09:46:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevro2Q8UwqZ5MkLNWWX8UK0Rpl-3Pv54jq9j3jxq3KRc_l3wfR1Q0q2hGs_dbLCHACA8KwkvSjnFoeLfSSVABst3ZS1DDTrhnOfgSZzbPTIxKhyD7bEnDGre6RT1JxDcJPWivDDeMxPTgMYt8e0m4am8Laa5Vr4mVwoVqeaX9yW7F4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:19 GMT',
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
  '17dca5ec-0afc-442e-a44f-9ebbd4660500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuBM6mf5vBhMkoucyT_0EMI; expires=Fri, 03-Dec-2021 09:46:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr4pUs_-mVwggU0CHqutRaxMPnqwQU3xdqj9S50MbT9rRYtAsqed82EdUQEoDmjuFb_nOhIyAcYlHxX5eW_Q5S6MivkI8NhF00KOm8587BqK-FJKvEIolu9gWGYTJVhLmoMI1TxlCSL-TAQgWJCxbVM10ojX_Kk4EWFqUlaBFp6eMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:19 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e5f1491a-2ff0-4257-a2e4-780442c430c8&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'fcd7eb22-1acf-4865-b1d2-d99b5e580500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq74gtPTloBFnYSwk-ZbVoUWPr5BAQAAAGxRFNkOAAAA; expires=Fri, 03-Dec-2021 09:46:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:20 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/exportPipelines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc517bbda25f3efaa298d655539db7e3936ad966c532af5fe51745d3d6d7776bf9a5c89bbbf9bb5555b72f8b555e5293e6a3d1476535cddaa25a128cd3e3d76fbe7a4d9f15b37cd916edf5478f7ef147abba584e8b55569ecda8c9fe4e7e9e3db8976f3fbcf7e9647bff7c726f7b92cda6db9f66d3fcdea77b7bf7f7b30302d0e6cb6cd9f21b0ff6ce1f1e1c4cceb70f3e3ddfdddedfcdceb71fee6693edbdd983e96c67777736d97f80376418cd75d3e68be3a6292e96f9eca35f025ce8e3bbcd7ad24ceb62054c9bbb0f09e6fdd9c1f9f6bde9a70f08e6de3ec19c3ed83e989eef10d4c9f9defeeedd3a6faa753dcd3fafabf5aab9bbb8fe6902ddb4775775754903ac9bbbb7a4d9e25affb87ef7eeddf5759786f4bd7cb2d24fa8150d68992d30a0f89732cca7599b81c4d33acfda7cf684e8fdd179b6ff20dbbdb7b37d9edd9f6eefcf263bdb0fa7d3fbdb93e9a7f777ee4f0ff61f30b9ec2b6f846ec7ab5559e844da6f8f5bfa666f676f777b77777be7de9b9d878ff63f7db47b7ffce9a73bfbfb7b7b9fecec3cdad9a1f665d6b45f54b3e2bc00487ae9965884ef4551f19bdc121f9a749aa3555eb7447dd0a7cdea8b9cdea5dfb48b1facebfc755bd5d945fea4ac2676faa8c3755d508b79dbae9a4777ef66d369b55eb6988cf1845a8ea7559d8faf8ae5acba6ac6cbbcbd3b35efa20dbdff36bffec96c5db65f057016d797f8702cff66e89fdf6e72a275db503fb5cc7393351840259c4a12fad19797797d55172d63da7cf47d1edd65d1d0f7c5f2e2754b33451dbd5e4fa7793e03cfff92efff","92ff0719272172e1030000"], [
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
  '2019-12-01-preview, 2020-11-01-preview, 2021-06-01-preview, 2021-08-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-request-id',
  'c862f5e9-2209-44c4-b622-c64d8eeca922',
  'x-ms-correlation-request-id',
  'c862f5e9-2209-44c4-b622-c64d8eeca922',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T094621Z:c862f5e9-2209-44c4-b622-c64d8eeca922',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 03 Nov 2021 09:46:20 GMT'
]);
