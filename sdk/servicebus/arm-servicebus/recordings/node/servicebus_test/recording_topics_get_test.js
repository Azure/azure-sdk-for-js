let nock = require('nock');

module.exports.hash = "6158eeec707308f9fd6b953db94f5438";

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
  '25e1b200-ca8c-4386-a214-6e1256cb2700',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao6ijO9fXe5HiY1ckuP8uXc; expires=Thu, 13-Jan-2022 02:49:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrq1fWY1lz1a2wP6Anwk8bXKVvMDAVFcbmM5j-6ncKgXoGTZMYf65KdJ8epeBlEO99bAQ6sLIzT7l_z7MQ09LJfSeQXG1SZc1A2Mw1Q1bgIuawi5Mhk0IgB3IGrSo9iLDXANSH-kPNATdTQofqsLdDHtyUM4qs9IfnFvqnN5HzyOIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Dec 2021 02:49:50 GMT',
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
  '25e1b200-ca8c-4386-a214-6e1258cb2700',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Apw1VgVNz89LjYUo_qfO6QE; expires=Thu, 13-Jan-2022 02:49:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnMnGl8Y2hEU2rfr9R2ARlOdP0gItCfRss3NRinaLGryLzB3AkNTxKgELIWBhPVW4INKBNP51kxqTtkGvblG_vtdRMEj68Fg4V8P6c3nPUCw5Qf3E1ssH1xyIsgPN0MD8JgKte2wNg4qUzpj6Gx1PCxk5rPstb3fTNgT4QhytIdQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Dec 2021 02:49:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b5d3c257-c18e-4653-95ef-9929b670c5f9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '25e1b200-ca8c-4386-a214-6e1259cb2700',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhGSHenaNlFOjLAlUBpJIi0WPr5BAQAAAE_9SdkOAAAA; expires=Thu, 13-Jan-2022 02:49:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 14 Dec 2021 02:49:51 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceBus/namespaces/mynamespacexxx/topics/mytopic')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e5fe7f56531cd9fac9bbbcb6c9137ab6c9ae315fbc7bb77efeeb6d5aa98e253fee5a3d147f89690731fb4d72b7c1085fb821a33a8e6ee1b346fa87d594d338c88de39cd9a36fdea357d48f8adf2ba2df2e6a347bff8a345f6ee8bbc69b28bfc75f183fc6cf97b156535b9a6817cf468effea7a38f66f979b62e5b6df3a658e46faae7c525d078b9bbf3e983fbbb0f1f3e7db3f7edfd832fee8ff71f3cb87fb0f300bd105c01f8457e9129c0dd9dbdfdd14775fe8bd60511efe97a5516845ffe346ff3a9a0799e954d4e9df6befa76d1b4557d8dfebf5b2c67d515fa7fb3bbf30575952fb349993fc9dae93c9f7d4963e331537f6dbd26600da3f14450d8a1bfdbac5dd3af1f1d13641a087db25eadaabafdb2a6592b9617e6c56cdd564ff39250f87279362b6f1cb2e0f13223da020186a40392af4edfad68dcd4b5c09fd6390d7176dc12e0bd9dbdddedddbdedddfd373b7b8ff61f3ebabf33debff7530475bd9a6d6c75ff1e37cba634f38db6dbd9d9d9dde6ffbdd9d979c4ff431b9fc94faaf5929a123da6f88d089d1525a1f68b0912c8a213ee9acdf26cf63c6fdbbcee7dd580f0eb329ff5be69eb6cd99c475e315f3c1d82fa4b7ec92f","f97f00c6c206829c030000"], [
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
  'x-ms-request-id',
  'e0300fb1-e894-45f7-868a-4dcdb4cfd86a_M2CH3_M2CH3',
  'Server-SB',
  'Service-Bus-Resource-Provider/CH3',
  'Server',
  'Service-Bus-Resource-Provider/CH3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11979',
  'x-ms-correlation-request-id',
  '2fc531e2-557b-41ec-a863-d91c18fa2eae',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211214T024951Z:2fc531e2-557b-41ec-a863-d91c18fa2eae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Dec 2021 02:49:51 GMT'
]);
