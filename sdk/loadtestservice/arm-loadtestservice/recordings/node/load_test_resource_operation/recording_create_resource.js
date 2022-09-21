let nock = require('nock');

module.exports.hash = "3d5dbf02f1fc11ecbed1736ba264f732";

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
  'e7d7bbf8-821f-4770-a496-be3a2568dc00',
  'x-ms-ests-server',
  '2.1.13622.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqkoHlFihn1FvMMvNWDGw2A; expires=Fri, 21-Oct-2022 18:06:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrc76zc9Q_clov5HPteCfEUMhTwExr6eQjMoEgzBW-yxstZtCuiuuMpEbFeXUSyNK7n0Brj-942aGL1X8DNHL24gqoKdcpuo-a2p_-1Ut9p5tEtlyP6zpyRN7uhO9a77cfDJ9icEBmkqNWTl_RUrlyBFEovNHkOP_rl7tUeGgjK4ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 21 Sep 2022 18:06:35 GMT',
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
  '8b349d60-8882-4ac6-9ac4-d63426d30300',
  'x-ms-ests-server',
  '2.1.13672.7 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlKjy8SiFZ5Gkdk6Y91Swho; expires=Fri, 21-Oct-2022 18:06:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevra09AqaAIWeMKV-uf0lgFJEKHdb-cwzlv28vuGepCv4nxRibOoq2zryh__k5Q07u6kCu0Zf7Bt8p5rG8WcgQVmBHos5UR4mEb9jycQ8ZCf_46fWHMNwrhG36vrW_r5PWOk0iM0v-SA9L9RG7JTEmyU1YO6Fl77Lle5b_r0Dc8kiYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 21 Sep 2022 18:06:35 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=993b3667-9553-46ba-915a-35895d93599c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '95917bd6-38e4-4881-a6a0-287e703b5301',
  'x-ms-ests-server',
  '2.1.13672.7 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AuwO9-qCdZ1Akn-hltX9Y3acMqfgAQAAAKtJvdoOAAAA; expires=Fri, 21-Oct-2022 18:06:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 21 Sep 2022 18:06:35 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/rg-sdktests/providers/Microsoft.LoadTestService/loadTests/sdk-malt-js-resource', {"tags":{"team":"SDK Developers"},"location":"westus2","properties":{"description":"New Load test resource from SDK tests."}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd07d307bb93fb9fdedbde994d77b6f727f4cf647afee9f6cea7e707e73bf7773f9d3ec8eed67953adeb69fe795dad57cdddfa62bb99bd6df3a66deeaeeaeab298e57573f78b625a574d75de8e9f57d9ec0d7dfb3aaf2f8b697eb7d4bf9bbbf4daf6222bdbed9f6eb60dd08f461f2db3454ea80d7cdb5eaff0edc2c2073ceedd83cf7f53e3b29a661819bd70451fad9b3dfab0cd2e9a8f1efde28fda3c5bd017af9ffe5ee9d3fc322fab1521fed12f197dd45c376dbe789ab5199a4deb3c6bf3d9936b6a3bfdf4feeedea7f71f6cdfcf260fb7f71fee9f6f67f7f766db936cba37cd669fdedfbbf729f5605f7923c81eaf5665a198d86f8f5bfa666f676f6f7be7e1f6deee9bdd83473b9f3edadf193fd879b0736f6fffa7a8699935ed17d5ac382f008ddadf1281f0bd28167e939b5121aad0bc2edba2252c887402f145b5ccf1154d3bd1ae2d72a6eb8c08f7b2cc96f957afcea8d141fe6067f2f0c16c7b67676f777b7fe77ebe9ded1c9c6f9fef3e3c389f4cefdd9fdd7f30d6d9194f97ed36419bd9592d9617e3ec07eb3a1f4fab05a14d5f5e160d0d81be78dd121da987d7ebe934cf67f9eca35ff2","4bfe1f34bd2fa1d8020000"], [
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
  'ETag',
  '"f201aca9-0000-0800-0000-632b52b10000"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-providerhub-traffic',
  'True',
  'mise-correlation-id',
  '8afb7376-a987-4be8-8648-1ed1b2ab5b3b',
  'x-ms-correlation-request-id',
  '547e0ee1-da39-4e7e-a5e7-94b01fac58fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '2ea543ea-5008-4dbd-a01a-1160af111572',
  'x-ms-routing-request-id',
  'SOUTHINDIA:20220921T180643Z:547e0ee1-da39-4e7e-a5e7-94b01fac58fc',
  'Date',
  'Wed, 21 Sep 2022 18:06:42 GMT'
]);
