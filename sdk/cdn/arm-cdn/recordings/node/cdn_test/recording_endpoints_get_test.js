let nock = require('nock');

module.exports.hash = "356719bc015940ab6a6655fb2cec3622";

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
  '0d3eafcc-bc79-481b-b7ec-4c35e68f0900',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvksSWEhZh1GgYC-MkbJFLU; expires=Sat, 11-Dec-2021 05:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBnIG4iWWaBtv73cCXrjsMe4buDBval_S1jbCcUVtM7CH6OF9ECtiEl9ONxPx9xZOKVuNZ7IK3HYirCoZSOWbu0qxHK0UQ0-mdHKxm1f06ti4KxFZbaEW9OBLqGUaU9GC87QFy3UKzf1Rn8L2ZeUQIvavvFTWR1UHJVhl2ftUKUMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 05:40:24 GMT',
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
  '92d93328-dfb9-47fd-8666-6d88b6fe0600',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtqyoLDj-9ZJjA9tX0qDo3Q; expires=Sat, 11-Dec-2021 05:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPMgm_5m87lXX5jZBc3005edYgWMzvLac9d9ObKiA-qdQ2CZOVy-jZF1xbbYBB93gMSJu0p43yrZArKko_1-KXAIjAO17PtbsJjDC2hmrmn_V6wNQoNIO49sfYIYhugPTHW7uIYwrlQWdiARpJX4rbw5EP-WfGyWD8oIP9rKKc7IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 05:40:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9efb1854-7960-4572-9f6c-47a06186a13a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '92d93328-dfb9-47fd-8666-6d88b7fe0600',
  'x-ms-ests-server',
  '2.1.12231.7 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuyANUZvJtRHnv8mzAA5bj8WPr5BAQAAAMmjHtkOAAAA; expires=Sat, 11-Dec-2021 05:40:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 11 Nov 2021 05:40:25 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cdn/profiles/myprofilexxx/endpoints/myendpointxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e393d9129f9f17658e96faebbb77efeee6cbd9aa2a962d3e36bfd3e71f8d3e6aaf5739a13600c4b46da8e5325ba0651740594d338c87befa2e21f6159ab6d945f3d1a35ffcd1dbfc7a973ebfccca75befbd12f197d44805779dd16397f3daf9af645d6873ace7eb0aef37c76918f97794bf0aabab82896dfa6e6dfce331a34bd707575359e14cb8bf1b45ad8162fb3764edfdd2d16d9454e9f4eab659b2fdb3734c6e64d75522d56444eeafa7b1fb5f9bbf6eebc5d94d42a5badca420671b79ab679bbddb4759e2d3efafee8a3a2316fd1b7a7cb6c52e634936dbdcef1ddb7db76755c96d555f7c3a6f3e92f5ae7f5f5ebb626844fb2e99c7e3cc9e7d9655161284fae5759d3e8e7844f45fcb1287ec00801f58f1e2dd765c9c49be43244f940068df1fc62333bf2d12e41a1d67152e3d7ddf13c270c957873c2f86555b7062efe6efc0f04aa4f7ff97c55d3088af6dafc7d95171773fb561e928b1a5f666dfebc58be3d2e8b8cd09266dee7af94d9cfe8a5de97cf2da3055f9d2adfbc6eb3761d037abc2252100b7e419308b6e016bfe497d0e412ee34accf59b28888f4c92c3fcfd665fba5fb429a132bad9bb65a3cad1699509c1a5fe4d5b3a26c4906e5ef595e169734cf2f2b62274b93755dbe2e2e9634b5bf577e4d2de5d3ab7c4278513b1ed2b3a2ceafb2b2943781b469479cc714c1e808f58f5ead97004593864115e04afad37cfb7a3d9d92dc10cd7fc92f","f97f00088390f674040000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '21a24a25-86cc-4716-ac8d-b848da5ad9d3',
  'x-ms-client-request-id',
  'fcce9074-6a89-4b7e-8d60-452ae7a9c4f0',
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '48',
  'x-ms-correlation-request-id',
  '97587b08-b335-45e9-9509-008c9a45e1c2',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211111T054026Z:97587b08-b335-45e9-9509-008c9a45e1c2',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 11 Nov 2021 05:40:25 GMT'
]);
