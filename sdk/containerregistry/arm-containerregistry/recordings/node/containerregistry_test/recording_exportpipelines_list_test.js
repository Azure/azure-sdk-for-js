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
  'b337dc1f-cf49-42cb-831f-bd2eb4c21f00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApYkbKvcilBGn1EP4lH8rpE; expires=Fri, 19-Nov-2021 07:58:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjMNvaKl1bkoPC_sgk0tuNMo2jbQm4dYy7g_iGQk5A1VW9YCidZAQhVO49GGS4xHjP8NKzevWkj1sj25jB1y_jadRmfJ9dm1ZzUpP4o7PSRXPr1TZZ47bQHMz07V7KCm_0xN4MRh1becS9yydGBrInXeWRJEKMUPCsraUxyXu2E4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:02 GMT',
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
  'dc166749-de8d-4169-86e2-e69f2b1c1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ah0N9TAi8TRFkgQ_qFWKY14; expires=Fri, 19-Nov-2021 07:58:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFzLVHnMaWHPypb0q3df-Y4s3YYTu3l4AO2qKYENikIv7LekmCQ79v2wINqKK_eHNJhqoN8FhpDuSNkkG72ZN4sKC_QrPIYHibA6DQz6Jf0JtDv9z6LiAunn5mlqapA8PcJkq-2dasz3ZK1HvLGca97uYfTRVzVdeeZt12IvhvAEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:02 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ee2d786e-737c-406e-98ec-f8c4bd7ded27&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'ea3e9b90-f5ac-4be3-85d3-ff023afb1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvnH4UVJipFAmINa7iek4AEWPr5BAQAAAAvDAdkOAAAA; expires=Fri, 19-Nov-2021 07:58:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:03 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/exportPipelines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc517bbda25f3efaa298d655539db7e3936ad966c532af5fe51745d3d6d7776bf9a5c89bbbf9bb5555b72f8b555e5293e6a3d1476535cddaa25a128cd3e3d76fbe7a4d9f15b37cd916edf5478f7ef147abba584e8b55569ecda8c9ce74773add3dd8dfdedf7d30d9de7f706fb6fdf0e1ecd3ed83dd9dfbbb0fefe59f9e1f4c09409b2fb365cb6f3cd83b7f78703039df3ef8f47c975ecbceb71fee6693edbdd983e96c67777736d97f80376418cd75d3e68be3a6292e96f9eca35f025ce8e3bbcd7ad24ceb62054c9bbb0f09e6fdd9c1f9f6bde9a70f08e6de3ec19c3ed83e989eef10d4c9f9defeeedd3a6faa753dcd3fafabf5aab9bbb8fe6902ddb4775775754903ac9bbbb7a4d9e25affb87ef7eeddf5759786f4bd7cb2d24fa8150d68992d30a0f89732cca7599b81c4d33acfda7cf684e8fdd179b6ff20dbbdb7b37d9edd9f6eefcf263bdb0fa7d3fbdb93e9a7f777ee4f0ff61f30b9ec2b6f846ec7ab5559e844da6f8f5bfa666f676f777b77677b6fe7cdce8347f7e97f0fc7bb07f71e3edcbfffc9cecea39d1d6a5f664dfb45352bce0b80a4976e8945f85e1415bfc92df1a149a7395ae5754bd4077ddaacbec8e95dfa4dbbf8c1bace5fb7559d5de44fca6a62a78f3a5cd705b598b7edaa7974f76e369d56eb658bc9184fa8e5785ad5f9f8aa58ceaaab66bcccdbbb53f32edad0fb6ff3eb9fccd665fb550067717d890fc7f26f86fef9ed26275ab70df553cb3c3759830154c2a924a11f7d7999d75775d132a6cd47dfe7d15d160d7d5f2c2f5eb73453d4d1ebf5749ae733f0fc2ff9fe","2ff97f0002b050ede1030000"], [
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
  '11996',
  'x-ms-request-id',
  '5e27f035-cd42-4b5d-860e-440d7048a849',
  'x-ms-correlation-request-id',
  '5e27f035-cd42-4b5d-860e-440d7048a849',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211020T075804Z:5e27f035-cd42-4b5d-860e-440d7048a849',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 20 Oct 2021 07:58:03 GMT'
]);
