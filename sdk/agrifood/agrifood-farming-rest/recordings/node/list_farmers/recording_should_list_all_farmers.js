let nock = require('nock');

module.exports.hash = "ebf25b0c0a54967fe752a1e011ace99d";

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
  '8a453358-17ce-46b0-a637-b2f236894a01',
  'x-ms-ests-server',
  '2.1.12171.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ake9tiC3KctLohuz0ng5qao; expires=Sat, 04-Dec-2021 17:00:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfqQhxHnAJ07Ma07NqrM_1qgpahT_UA4rUNLiV63nT6yrOxobAIP-GgiiJZiVZNcVpFQ3ZUA_D05rr-rTErr_FgXR8wLqUZQmkgFAs3SM8ucJy4VRtnOqmXeNiu_VT-9ZuH9WKTTUABt_EQRsxtduAqniPJO5dYHr14wb2IspAmEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:31 GMT',
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
  'a43996a2-e647-427b-a509-f2d8a52d2100',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjV1Tj8OKiNEmsCGrARcAC8; expires=Sat, 04-Dec-2021 17:00:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCBV3QOzvyXRl_CUtv3rHYVms8uSSUQL_cgLePP_IJcTeP_vgw6owBW1MH-zypOP_9Onz89Ln97TGEpG1VmE9QYnrg1tt6aU2ecJPibBXRHUPvRPYbre1NhDIaQaKO3g-e0FrbI4tX5MNiUzNpC5OmKgOsxHprvul1_t5I0VP9lwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:31 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=e6ddc4f6-eb3d-41e8-82ef-193ec60ea58a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'a9786c5a-2a9d-4bb8-82fc-3309b8a72300',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiNlk3LogHxMskidFTkEtHF4ycTJAQAAAK4IFtkOAAAA; expires=Sat, 04-Dec-2021 17:00:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Nov 2021 17:00:31 GMT',
  'Content-Length',
  '1321'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/farmers')
  .query(true)
  .reply(200, ["1f8b0800000000000403d497df6e9b3014c65f25e2ba96ec63636cdf4d9bf604dcacbb726cd37a25d001e914557df71df26fa421218d34a9c9054ac207fef8f93bf6e13579b1e53224e6e76b127d6212fb60fd637cb2a4b0cd2234c95d1272fb8027a8a2946b6709c50fa1b23ff4df24d58e7255f43f50ed9a60bbe0bfe1218f0bbc71021418a129612c0730343520ef51b8a87d2ce2b81272260d1706f87df276b775165b67e3b12d1c9617528ed8f252666ada16cf596ab83440a76ca13233421981cabdad0d27c206a4704cc6283fb66405b8906d2db59ded962d02fae2baf812ceb3533930439549d3299387cacaaee7e06b5d75755bcfbeef26d587d635f1b98b75850e7ed4cb66e6966d572f669be7990d04b3c7d0f4f69e9bfa39345d0c68fa3559e13564730d790a2bbccbef656856765e86d926536f7b462da6a12c63174851d67f886d5795235d68bbd1e94c039d8fb04b7946e7d3d389cf0f065243c51429dda78c62cab2c174beb37ad224f7e326c1867091496e304ce964e6d0646a18188145b3e759c587c7ae5c91f932969eb4fee9307c73cad408c0cc0535ed0dd87ac40bcaf440b9f7362046e0d097985337e22b68af7139592f1f1f290a9039d38631036c62aab74acc05f4caff57140ccba05ae2ba19ddac2f8abba4a86bfc6f6e9b7edced99bac27591fd2b8f21b2e80993003495428a8ca687045338413030b89e2096c0d492bc25b853de0641a9b5e2e290a054a70816fe7a82eae20cee94b74130d35a43764850d913040bc9ae2608d4d0cbaa78afbc0d828a674abf23a84f5571a1ae690e36b5895cb8be681ddc2b6f83e03a836a90415ce9c0db6dfb396c443d13a110d76510a160dfc0b1e13cd39a4a0290d37e33c62df97676920dc1f72d6a10e3756c0bb76be63fb81bf7c1c23ac676ea0cc394605e87cacf96c25f75dfeffa38ece831729c8d460ea854fcc3915b07091b3ba1d7ef3867701d293f1baeaeed181db2421a4e64c571a3e78106e1ae6485ef67589ee7db940dab8172c0ea2f000000ffff","cc98cb0ac2301045ffc5bd90c983b47e875b299158575ab00b71e1bf7ba73562696c4b5448d7b33adc4ce7dc1fdb4fe2a1c7ace4db2a6356f6132b178ef5e5cff045406f68da7f469359b252e7c6b37a860e02e1a90f910e820a4de48ae46c69018f985a5b840a43b3fe0bfc273ab279f2da5f9a6b3ba86d10315fc62346d29a6f90cd78578818e0f693b921e34ea23d1d2bf6af6ad477810cd53622acde50ed92c0992de2430af5c454d604c00d27ff07ae2f7060a8cf72e7b61a6a69148b17a519ad7752243d2e5b7c78b0cb57169a0acd58a49db3d0722d245f0e02c69fd5f5b5bb3f000000ffff","03005b4c262f47150000"], [
  'Date',
  'Thu, 04 Nov 2021 17:00:31 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '0HMCT639406F1:00000003',
  'api-supported-versions',
  '2021-03-31-preview, 2021-07-31-preview',
  'x-ms-throttle-information',
  '105',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Content-Encoding',
  'gzip'
]);
