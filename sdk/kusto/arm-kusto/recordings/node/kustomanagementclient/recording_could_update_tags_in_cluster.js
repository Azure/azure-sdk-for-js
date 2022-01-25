let nock = require('nock');

module.exports.hash = "06161678b424436e8013c70972537c50";

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
  'fd19186e-7628-4427-a0dc-1df1ee301500',
  'x-ms-ests-server',
  '2.1.12381.20 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AgasqL__UHFMhz6cbEJ5CGA; expires=Thu, 24-Feb-2022 05:30:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr55_R0S0pSQ2QyxBx56f0njL_nWwjDO2-zC9khnM9-OXJdel7DDJIKg2EluVrcNkc0UhoGRRScKfqjQTuvZePKJxZZsEbe78_MfEwvr62ZGO1NrcxQQi2lYKUbdbuWZUJtoISGOhNf2-TUGQlUeViwNJ9cmueS3c17eZk1joXrfAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:28 GMT',
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
  '1fb782fc-6d81-4f95-86cf-dd1f5da91500',
  'x-ms-ests-server',
  '2.1.12381.20 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjWoDMcYCfJCkpisS7p_75I; expires=Thu, 24-Feb-2022 05:30:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIptY4bsnFvlKIh1iHdGTtIUj8MqT8cd4Lz_Wz5ZJibKnf7_StfvzKZN0xHO1muVrQ4f5hdYs3TvaZFcBgrdiDCeCV7wDO_KvbbIR8nv4WrCDknV-BaBY49l5KkUcb-idkDuNbnCCU2gJmNsnPtJ-1Ov_FOM9M7F1En8jEwr6eBEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9645bb71-a5cd-4a63-83bb-76eabfe18b44&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1fb782fc-6d81-4f95-86cf-dd1f60a91500',
  'x-ms-ests-server',
  '2.1.12381.20 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ai7ddOVVbPhCqFLOGjypxkFhwqemAQAAAPSBgdkOAAAA; expires=Thu, 24-Feb-2022 05:30:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:28 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/marytest/providers/Microsoft.Kusto/clusters/mytestclustername6', {"tags":{"key1":"value1","key2":"value2"},"properties":{}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8bacbe6ef3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bfebdd64d5bdd3d29e907be5870cba9fcb9cc16f9a71f8d3ec24f4225fa5d7bbdc2774300a945de6617d4e2f7fd686f676f6f7b67777beffe9b9dfb8f76771feded8cf776f6f71feeeefcd4effb11b52cab69866152ebef524fe9e9baae08fae8a3e6edfaa347bfd8e0f1bacd96b3ac9efdfecf0f9adfff728fbe6f8bbcf6bea04fa6d92a9b16edf5478ff67e097d9f5d3400f036bfdea5769759b9ce77a915fdbd67fedefb881a128556794de0b879d3662d3a7cb55e2e8be505bdc09fbccab306482ed76539fa685d17d464deb6abe6d1dd08fdc657f441ce2319bfa58fabf155b19c5557cd7899b7047296b5d9d9f2821ad1c8bf0a80519ff4f1f6fbc36c6bfa309f9dbee317ca37f9325bb634a4ef7d7ff4d16551b7ebac7c91b75755fdf6a45a9e1717eb5ae92e43aa88d916c50ff2d9f1baad9a69561211e41b023429f3a745f3f67439adafa91dde3acfca26375fbe6eeb3c5b10ea3228fb2dd1fa27b375d9be04d64a62015a66cb8b75769103dd654310e99b5f2c930294695a04f2cb757d419fc84bf2d1d36a4dff4671b92896f91b61ce9fbc4734c9a6d37c4544395ecf8a7c3945f72007c94a5b17d3f6cb753ba9d6cb99d2e5985a37d4e4231a2b3a024f6565595de5b367bf68b67c5e6064787f450814d3ee5ba78c9df7d2d9ea158d3277ef09fe20f0ebb65a7df488a68cd026febb2c4002a21f713373dfeb3541cd67048d2841e2bb6c99af7f31352e96d3629595675014f70ff2e9fe837cba9deddfcbb7f7efe7a419b23d92b607e73b9f3e9c3e383f9f80e589c4c40bfcc603d225070793f3ed834fcf77499764e7a44bb2c9f6de8c34c9ceeeee6cb2ff006f08115f5f134b2d8e9ba6b85802975f","f2ff000188cb83a1040000"], [
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
  '"2022-01-25T05:11:20.2044910Z"',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '8e173164-c2fa-4f51-8d61-4b288d4fbbc8',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '199',
  'x-ms-correlation-request-id',
  '46ea73ad-e274-49c9-ac4b-cf33c3c80200',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220125T053035Z:46ea73ad-e274-49c9-ac4b-cf33c3c80200',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 25 Jan 2022 05:30:35 GMT'
]);
