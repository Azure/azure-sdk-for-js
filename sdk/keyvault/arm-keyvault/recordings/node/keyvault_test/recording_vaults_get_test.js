let nock = require('nock');

module.exports.hash = "dba41dc4deb6687df792e23ff234ceb2";

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
  '055667e2-b61d-41bf-855f-58965cc64800',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=As-lRy04L-JMmBwCCOmzAb8; expires=Fri, 31-Dec-2021 03:09:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcJ99sYYlv4_otTA_EllGTMCJAD8q0isa39QkmPx2wI-XI-nQ7a668p09-rZvXooIvGv-zGRYZhdaPhi_6kAM4jvxTvMZZK9SAWGQRrUCMTmguNLOtcADDoZDxurFPtICro5j2DmBV6oH8W6ZW3tdGo-ewtBva9FzIKjyyRLIzewgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 03:09:28 GMT',
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
  '228585bc-dcee-45a0-a2bb-b294b8484200',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag92JvKCfxdJlWGkkQX4kRE; expires=Fri, 31-Dec-2021 03:09:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrTge-99SrMcLh2iQlXSh7gOCxUyh2pHminnkTyQSbzUgMjvWYnmy6O-8ZGtbTHjgt2lpCIrXTqqxOSfI5CGEIU_73pUI1qS8p9O7bFeMPX98Ay48nTiL1eCthWOZk-6NkxRxNrSk6JLqZsJxQX8meCnvoalQEl51KkrmC8qymspsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 03:09:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b1c7dd6c-23c7-4b56-a1c8-84ee64787541&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a0cc0735-c774-41c3-92ae-98476ddc4500',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AuYQeTnNWHJFmuTic0ErMHsWPr5BAQAAAGjeONkOAAAA; expires=Fri, 31-Dec-2021 03:09:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 03:09:28 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.KeyVault/vaults/myvaultzzzz')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e7faffcfa27b375d9debdc4bf68ccbffc809e8f461f2db3454e48841fb6d72b7c3808839a94d53403c2d42ccf9a768dcfdaeca2f9e8d12ffe25a38f9a6bc267f1346b33fafba3699d676d3e7b724d8dcfb3fd07d9eebd9dedf3ecfe747b7f36d9d97e389ddedf9e4c3fbdbf737f7ab0ff60ff0181b2afbc11548e57abb2d01eedb7c72d7db3b7b3b7bbbdbbb7bdb3fb66e7dea39d878f7677c7f7eedffb296a5612625f54b3e2bc00246a7bcbcec3f7a218f84d36a341d4a05959e5755be4a0ce47cddb357e9c678ba20452c7044e67a169b3e52cab6778a9cd97d9b23d03873c20963838989c6f1f7c7abe4b2c919d134b6493edbd1931c4ceeeee6cc26867d369de342f2b4293bbfade2ffe1a40aac94fe7537963479f6dfa7ff71ff3d01b34b445d1344417eaf3177ff436bfa69fdffb285f4eebeb554b0d66b9f9edaace56c44af4db7ae97e6f8a0b90f432af8b73fc7d91a36d5934f821534dbfac5733f9a558acaa1a5fcdf232e74f26d9f4ed7a45bf9058b4558d8fea7c5a1140fa6db5ae2ff28fbe4fdd101a39f12ee116f4d0f01fef096c8af93c073f30a54388161675480de8178bb31dc5225b66170477d96653428a474d545c93ecd21f00e4fe220cdd1f02dcfd2d80dcdf3d647fc92f217c890f26653e7b56d54ff355595d2ff225716d5baff3e0bba2797b2af346d3d9fffe4dbe589584ff108cd7a42b9e327ee673d6175fd505b1d3bc6d57cda3bbbefe19f36fe3ec07eb3a1f2ff3f62eb0860a033715cb8bd72d7546afbe5e136be7b37c86efd71362f017797b55d56f8fe9f38626e0a353ee9f04e797","fc3f0d03ee3e56050000"], [
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
  'x-ms-client-request-id',
  'ed11e268-2d03-4961-8794-7d9fc2671e5b',
  'x-ms-keyvault-service-version',
  '1.5.192.0',
  'x-ms-request-id',
  'c8863add-cb98-4ad6-bfc6-d3f80acc72e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  '8211620c-36c8-4b62-8a4a-60443a2ebb68',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T030929Z:8211620c-36c8-4b62-8a4a-60443a2ebb68',
  'Date',
  'Wed, 01 Dec 2021 03:09:29 GMT'
]);
