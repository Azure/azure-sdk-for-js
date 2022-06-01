let nock = require('nock');

module.exports.hash = "d6b655829196a81dda482a2ee867b7f9";

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
  'b6c873aa-5ee3-4a46-988c-8a309fb51400',
  'x-ms-ests-server',
  '2.1.12381.20 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsZP8JJfUVFIuu33_kyxB-M; expires=Thu, 24-Feb-2022 05:30:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryXolHcqckK5fgLKM1VD62Mtmn5vOyvsywJzceQoOeUw8VIB04vTOSKb1apeodqBZWZ97lmmmC7vCDoZiFlOVibAlDicJvxAZfy4p9zov0hzt6c-FFMXUvh6oCEpkwiR9vfpl54lWpxhj2-kM7HwejlAp3uqSfr4_W1MU0JQ36B8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:24 GMT',
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
  '25ece5ac-0666-4b3d-8e2c-1086b22f0d00',
  'x-ms-ests-server',
  '2.1.12381.20 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AuR9sVBPqwpPmVkPh34X_dQ; expires=Thu, 24-Feb-2022 05:30:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreovygADaTjFQAFl8c2CZi3SKKf60i9-evP2ymGlJ6TCyBYcJiq7ashkgzslJkU_VZBmtPT0SIkMtgadWrEUu3ZIFzTHjVa8YHtZyXzxTB0rq8wZ7owmKyZMWwQx-rP_FPwFFusiI0c97HfoIUdhSr0iAfqXDtpS6vWKRoaXyCEEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8693c431-aea1-47df-8eda-c7b5f2096ad4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a89dcb42-9bcc-469a-98ee-2849841c0e00',
  'x-ms-ests-server',
  '2.1.12381.20 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Auca646ElFdAlqGAORz9vPhhwqemAQAAAPGBgdkOAAAA; expires=Thu, 24-Feb-2022 05:30:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 Jan 2022 05:30:25 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/marytest/providers/Microsoft.Kusto/clusters/mytestclustername5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8bacbe6ef3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bfebdd64d5bdd3d29e907be5870cba9fcb9cc16f9fd8f461fe127a112fdaebd5ee1bb2180d4226fb30b6af1fb7eb4b7b3b7b7bdb3bbbd77ffcdcefea3fb0f1edddb1defeddddb7fb073f053bfef47d4b2aca6198649adbf4b3da5a7ebba22e8a38f9ab7eb8f1efd6283c7eb365bceb27af6fb3f3f687effcb3dfabe2df2dafb823e9966ab6c5ab4d71f3ddafb25f47d76d11000fa8d48b0ca6b6a8fbf3f6adaac05c457ebe5b2585ed07bfcc9ab3c6b80c5725d96a38fd675414de66dbb6a1edd8d10687c451fe48ceaf82d7d5c8daf8ae5acba6ac6cbbc2590b3accdce9617d48886f655008cfaa48fb7df1f665bd387f9ecf41dbf50bec997d9b2a5217deffba38f2e8bba5d67e58bbcbdaaeab727d5f2bcb858d74a58195245dcb4287e90cf8ed76dd54cb3928820df10a049993f2d9ab7a7cb697d4dedf0d6795636b9f9f2755be7d982509741d96fdfe6d73f99adcbf625b056120bd0325b5eacb38b1ce82e1b8248dffce28f2eb3724dfd7eeffb342d02f9e5babea04fe425f9e869b5a67fa3b85c14cbfc8d70df4fde239a64d369be22a21caf6745be9ca27b908384a1ad8b69fbe5ba9d54ebe54ce9724cad1b6af2118d151d8169b2b2acaef2d9b35f345b3e2f3032bcbf22048a69f7ad53c6ce7be96cf58a4699bbf7047f10f8755bad3e7a4453466813ff5d162001d18fd895b9eff59aa0e63382469420f95cb6ccb8bf981a17cb69b1caca336882bd9d6cf670ffd3d9f6de6efe707b3f9f66db93fb93e9f66cfae9fd7b0f3e9de693fc53c287484cbcc06f3c206571703039df3ef8f47c979445764eca229b6cefcd4855ececeece26fb0ff08610f1f535b1d4e2b8698a8b2570f925","ff0f4b034f6c82040000"], [
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
  '"2022-01-25T04:57:31.2234708Z"',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '59d9fdfb-7879-47e5-bae8-5de17b3a2a7e',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '298',
  'x-ms-correlation-request-id',
  '73b9cc1e-39db-4f71-905b-91433a506412',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220125T053027Z:73b9cc1e-39db-4f71-905b-91433a506412',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 25 Jan 2022 05:30:26 GMT'
]);
