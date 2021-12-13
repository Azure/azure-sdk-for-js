let nock = require('nock');

module.exports.hash = "eee383ef49bad09a5aa91ad20ba1e504";

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
  '59116ad3-9ebb-4758-b576-daba99c82300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArApyEQpqMVKsdASnOZmECk; expires=Wed, 12-Jan-2022 08:17:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrgUquAWi1MaI6CVF9DJsdC5juJ6zRMOcN30jXGk_t_NrBUKv8RykwYp5kXQNg8IcoXxD_X3gnhLMpz41CmkM4YLGXHEC6w7HCcJhybKLhNPCg-0a-Vba1iqPCrtRjZ5QvsVuxHpqPEK4VO-kjArtL05MJDQkPkBOPleIknlOvY9kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:17:20 GMT',
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
  '32f80083-0b31-4244-a179-32a944892100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuGXHfvTMKNAiWh8TLhipH8; expires=Wed, 12-Jan-2022 08:17:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkDc1wRABqULI2O6qEo00kYAbCOLTZ0zgwCyjhorI_X4B1_5Bk8ts1SCaEqL2zj7N3XYSW8E8rRCt1MzUbHGeEIA1e5bB11sjdEaT6ndZdpmlfgUOEhMhRih6g6m_YSotdnBy7v-4LZPEtNKUcl06f5gFr1xZdMX5jmhUQ0FH6VUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:17:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2df13254-87d6-47cb-a027-cc42d74c2fe2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '515b7f7a-a6ec-4d9d-a61d-90fd05c42200',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtAJvkZS2HZIgMI-HCmuBEgWPr5BAQAAAJD4SNkOAAAA; expires=Wed, 12-Jan-2022 08:17:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:17:20 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx', {"location":"eastus","sku":{"name":"S1","tier":"STANDARD","capacity":1},"properties":{"perSiteScaling":false,"isXenon":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36797d99d7e759bd40e36cb5c207c5345f95d9f2ddbb771f8d3e5a668b9c90897fd95eaff0e5204c6af2b6586230f436fd5156d30ca3a10ff2ac69d76840a8adf2ba2df2e6a347bff82379f919bd7c46af7d7a7070ff06149ab76bbca76d5eefd24704abc6ef6db69c65f58c3e698a1fd86fcfb345515ee32ffa639aadb269d1d29fbbbf64f4d15555bfcdebd7d2f8697e9eadcb961ab98f81d38ef9e00d75f382bb5daecb92d05c2f2679fde5f977f95b1acd2ec15fd775be6ce523400800f7be55f8faf98b08c0a6cd40b6471fbdcab3d935c1b8ca27af690c006c667bfb346bdaaf5ed3370d7f436f799c440d6fc34af456365b14cbd7459bfba39c574d5b2c2f4e9797455d2d1784e6f0372febeabc28edab8bec5db1582f7ac3a211633ea5978f7eb2a8db75563ecd6705314b3e7b495f19645ead976db1c8bb384dabc56adde65f5433fa88e8ab6fd25b0db5948fa5e5455ebdca2f840aa052fa15b880f80f205f4fb39206f0d1a3f3ac6cf2d14779492d8a293ece4f97d9a42490e63b1dcba93491a19c54841ecf926105409501f68983b916a48ae6f5aaa2171574437f9cbe5b15358bca1b1aaf69785ee7f997e7e7791dffbacd2ea833f93d10bb402bd0a78651e42b92286f6045f37be74bd047ff9e9388d73f69ff5ccc58303fbacaae9a6d12ddd9f6a45c6fef3dbcf7fb435609609bd517b9b2b4128486ef7fea313a01b82c1a1a069186c4b5a5a17cf47a3d9de6f98c5012e62612a2b50c2b7f57301d5f036955136ecceb09cd93257087fb7e502df357f96c4d3a0148f17848e6bf39fdf1","4bfe1fdb5c3069b8050000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  '"1D7EFF9E2018D4B"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '5dd37564-ff86-4cd7-b253-5c65f1ce4b7f',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'x-ms-correlation-request-id',
  'bd265879-9b42-47cb-a16a-5c6b32293799',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T081737Z:bd265879-9b42-47cb-a16a-5c6b32293799',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:17:37 GMT'
]);
