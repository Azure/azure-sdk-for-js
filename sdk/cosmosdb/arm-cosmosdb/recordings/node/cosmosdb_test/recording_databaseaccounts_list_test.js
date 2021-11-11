let nock = require('nock');

module.exports.hash = "de33ebb0ef19ac76d33e9ba8414e51e3";

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
  '428c2df3-e54a-4b33-a537-d9d8c09f1600',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AlYUlMEnzwFAg6KqAzS3Xck; expires=Sat, 11-Dec-2021 08:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkBy6xicmlCL9lYP-9h08YNbSPV0LofJOd9C4lQv9dTnZXXea-FZnjxx_TUcV3Vsa1T-NlTvBCKKPd8jYTfdUU1gnQ2D0a_NgLJOU-39rjEfAYD1DMIZZTLC1wHlTfZzhLDEx8HQZtMyXU_c576l6MOZ0luLXz42Ega-meAjA9IsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:42:48 GMT',
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
  'af479aa7-2da5-4dfb-aaf6-8cc30bea1400',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnCzjkJMME5KqkvIQKzhqPw; expires=Sat, 11-Dec-2021 08:42:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraA6HOxeW0H089n_fdWkGqlKSuKIuywmTyvJtb2kKy6Uz5QgSnOfKyRJr76VGLe4CcipJw75Jgy7q85dHC9GHu2Zzd117N1z77vhm3kB9puQrlnIlOGSmn-OAWEOzV2d-tLSFP80j-5PLRMDgKJu_eColuk-USvW6n-_dma0Un1QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:42:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3a0b6a95-5807-41bf-a419-df5a184db04b&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '428c2df3-e54a-4b33-a537-d9d8c39f1600',
  'x-ms-ests-server',
  '2.1.12231.7 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgVQOvS2HmdAkOF1NcTNKtUWPr5BAQAAAIjOHtkOAAAA; expires=Sat, 11-Dec-2021 08:42:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 08:42:48 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.DocumentDB/databaseAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3a7d574bdc897edd3277767599b4db2263f9e4eabf5b2c58b99fcfaeeddbbfb1f8d3e5a660bc2eca3eec76535cd801d7d759a356dfad56bfab0bd5ea1edad3aa2e66f8b2546fb79594db2d235a56fdaeca2f9e8d12ffe25a38f9a6b1ac6e229bd4c7f7f34adf3accd67c72dbdb6b7b3b7bbbd8bffbdd9397874efe1a39d07e3fd070f1fdefff4a73ea21769dcabbc6e8b1c80f0d765d110bec5f2e2754b3008c0ebf5749ae7b37c461dceb4f7d3e56c55154bc09fb7edaa79743724c8d8346cc6d90fd6753e9e568b47fbfbf7ee128cd57a5216d317797b55d56f699879435d7f74bacc2625f791f36fc7ebb65a10e9a6cfb2a2ac2ef3faa347e759d9e4e6fb2fd6655baccafcbb75d1e6cf95ca042868f432a391e18bdf2bbffe8206d5560e4cd1fc6451b7ebac544c9e15659bd7060dd3ea3268f36a5d824edffbfec8e07bbc2aded06cd2871fbdfe4525613f2b1a7c411d3ea1599c7d91b719a694d1348355d882e3b33acfdf14bdf11d2fb3f29a869f95af09ebec826642bfcfbadf9c54cbf3e2625d3309308bcd749e2f32e045687d372fcba7f979b1a451d17c17cba6cd96d3fc8cc6f8d1bdfdf3c9a79fe6f9f6799693c49c9f4fb727e7f7f6b6771fec1f7c3afd349feddc9f624c34008f27bf3c3fcf6b854e4cb29c6535e66d969f67342967339af6a2bda62f9f1575d3620eaeed87242842cae369f9e47a95811c1fbda896397da3a4c3649634fd733be229cd6c41fcbd9c5ebfac887708f62f36ddd1e0cd77cff3cbbc2470af89c8a0c4e8a345f6ee6c49b34a7ae36cf93a273833eaef3e7f419897f9929abeac893aef3e7ab4bbb343f4a1368e985f12dfd5a415e82508d9152611e8e13bfacce8a180f5b7af489dac21b746f65f886af82e7d2ef26f84e3262952501b85e906813d57e979591715614f94db211e687e8a28fe2a9fad69eed03dd3f997105793de98fdff7780a3e870c81eb4f329f55e67656c58aff17d7a220dde737c21ec6f769c7bef39ce3c03ad0954677cce2e19f46e1c9680fa6687b33b381ce24b83f28f7832e361fd88277bc31250dfec7036f2a46d0e93c4fed3d7654d0bc9764c96280a2b9c3b7ab50333c2177de07b03c08582f44a07a89b8c3eac5d50625ad5183d7ecb56d9a428c9e7627ad027c5ca739a26d9f4ed7ac504a3777fb171845fe6046f56c0d5205f947ffda29ae52f03d754de75e6fc8b62b926cf9d86b34fd225dfbecac91100e6aed9b7c9dba74607a689fa4c664281c7479fe7d547bf84ec7bd73579a5b1c219bc86ef7d9f5a902f40f031708b3c3b2fbfe4977cff","97fc3fc2c9a5669f0c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11312',
  'x-ms-request-id',
  '47742dcd-7f4f-451c-89f2-c8dac92fc6f6',
  'x-ms-correlation-request-id',
  '47742dcd-7f4f-451c-89f2-c8dac92fc6f6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T084249Z:47742dcd-7f4f-451c-89f2-c8dac92fc6f6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 08:42:48 GMT'
]);
