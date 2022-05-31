let nock = require('nock');

module.exports.hash = "f4b5f468e44a0f5e3f2fe8e51391bb93";

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
  '5dd4fdbd-15fa-4ea3-94b6-bd1d59061b00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtpCgcNMUXxAjgjvxk5w6hk; expires=Thu, 30-Jun-2022 03:48:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOHHaF1vj0CtQ9Jss7iJcR2vAAEGnPEn7EzBRrFVOXXs20Fk_wmwGgLLkoL4gizMyJJDFP6m5Hovr0CErmYcYaUBQYiz1IbCXfdOA4v4AouNpi868lAMTifwcNoSXBx8rGrIS8usmXnuZL5ZVH8hmFGnmn9-4rDMOkOnJNXDTkeogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:51 GMT',
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
  '8347f94c-67d6-49fe-87f8-43ac21870d00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnL0e-X100ZMhc_0HRA7Wak; expires=Thu, 30-Jun-2022 03:48:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroeZ3qxcteBl391n3cxhTrfpMsBGvHPB8FtdlBy3AVRSjFrU7l4igYEyaxapUIK_fo5_OxlQWj7-jcRqiCxiKoflEj8g85pW5PAl7_dkG8S5llc7Z9cHFv9IN7-quj2fJiwrWBAVruBXcL7YBJ-NWraMvRyUnDMFDy4tVF9nLF5YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:51 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=55d12eb0-23b5-41f5-a8e1-8425dbb82638&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6d7b0126-0475-4e07-bd58-4539a8061b00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnyCpmLqHbxBlAiItM4WlYwX6p3SAQAAACSHJ9oOAAAA; expires=Thu, 30-Jun-2022 03:48:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:51 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36797d99d7e759bd40e36cb5c207c5345f95d9f2ddbb771f8d3e5a668b9c90897fd95eaff0e5204c6af2b6586230f436fd5156d30ca3a10f4eb3a64dbf7a4d1f126eabbc6e8bbcf9e8d12ffe48de7e466f9fd17b7bfb0ff70e6e40e2aaaadfe6f5ebe20768f2343fcfd6651b7c0c403be68337455ebf6070cb755912e8f56292d75f9e7f97bf251476471f4dd7759d2f5bf9081002c0bd6f15be7efe2202b069b3764dbf7ef42acf66d704e32a9fbc5e6553003673b40d8a7cf59abe69f81b7acb9b7f6a781b06a0b7b2d9a258be2edadc1fe5bc6ada627971babc2cea6ab9203487bf795957e745695f5d64ef8ac57ad11f160d199320dd7cf49345ddaeb3f2693e2b688ef3d94bfaca60f36abd6c8b45de456a5a2d56eb36ffa29ad14744607d93de6aa8a57c2c2d2ff2ea557e21640099947140fe367f3dcd4a1ac1478fceb3b2c9471fe525b528a6f8383f5d669392409aef7430a7d244c67252117a341ec70b808a11c6a883c916a48ae6f5aaa2171574437f9cbe5b153573f81b1aaf69785ee7f997e7e7791dffbacd2ea833f93d90964098e953c329f215898137b0a2f9bdf325e8a37fcf4932eb9fb47f2e662c4e1f5d6557cd3609dc6c7b52aeb7efed3cf8fd59c208629bd517b932b5528426d8ffd4637582705934340ea2cd6be26d1acb47afd7d3699ecf0827616fa2215acbb8f2770513f235b056e976835e4f68a22c853bfcf7836a99bfca67ebe52c03523ca05f42e47ebb86ba50cdf01a9c4f2aa4c6ef6d466d6be0d110caf804df9e678ba2bcc65ff4c73423192b5afa73f797fc","92ff07964c43ae70050000"], [
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
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '0d0170e0-a62e-4070-9ead-82d94f869f84',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '84d91c97-7253-4a15-96b2-48103f69c562',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034853Z:84d91c97-7253-4a15-96b2-48103f69c562',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:48:52 GMT'
]);
