let nock = require('nock');

module.exports.hash = "9b1f648b9d2d41a7bd9932eaf6933bad";

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
  '861ea296-1c2c-49dd-984c-64b140b42000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Au6SYbZwdYZLvCt5nTXKmeo; expires=Wed, 12-Jan-2022 08:37:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEqlloDMYlWvK_82Jx1c8sWyJhTEOnukIzFC6oOnkwtAE4bHgXN9wtHYXDr_dsHEfaaIewlhyq9HkvR74GgYNYug87wbC6nwj5OEv4exBPmgvzfPgbTbzj4dvvSiq9tfxw-zRT57Ld-p18mOLkpOuJRLZGNdd-_30DlDXa13m-EcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:37:59 GMT',
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
  '6e42cbf6-77fe-4524-bb47-09aa32531f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AspBxlQE0AhJgC9UEOiEAoE; expires=Wed, 12-Jan-2022 08:37:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroYZD4MhLqdem881ql5bYm5Uq3W-PLQmSnAXsrNZhOLn0a7HhSWVN09rCD1MhiJC7m45ZWmUxL75-We_SW3FQ-s2fBQjGmzqC09mL8xQnjdH0SzQ87d_UMEX_8RETcr2nMviCXloBzBw7ihgXUWc8MoB-c7nXMfZJTKupfBxhmS4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:37:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8362ae36-2215-4dbe-870f-db9723b85f62&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1a38419d-bfc2-443e-bb1b-f20c200a2300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Al4ArxcLo9VDkLFJjysvskQWPr5BAQAAAGf9SNkOAAAA; expires=Wed, 12-Jan-2022 08:38:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:37:59 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx', {"location":"eastus","properties":{"serverFarmId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx","reserved":false,"isXenon":false,"hyperV":false,"siteConfig":{"netFrameworkVersion":"v4.6","appSettings":[{"name":"WEBSITE_NODE_DEFAULT_VERSION","value":"10.14"}],"localMySqlEnabled":false,"http20Enabled":true},"scmSiteAlsoStopped":false,"httpsOnly":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffa20cf9a768d06d4f92aafdb825a3ffac551f84d9bb5f8f0d57ab92c9617f4c9bc6ada17d4925ef99ed7769cfd605de757f9041f34e365de7ef4fdd147f4f7eb5536050433e2ed53eafdabd7f44dc3df501f7979febc58bea546f3b65d358feedebdcaae9a6dc26eb63d29d7db7b07f7c6d9aae8747145a3abaeb8ab47fbf7f7ef7e8d49012c20014247b11352d2b7f849a30449ea7c55d19f557dfd9a3e042908f1a04575b5cceb8f1e2dd76539fa68dd6417f96b25e38baa5e642535c997d9a4cc6976da7a9d8f3eca668b62791a7ea64dbe7d6b7a8ffcaf9be922d284a6047fbc0ce67d91b7d92c6b338331d1dd7efb3dcb163443eb77cfdefd24b12a11983abbccca35bef8e8978c6ca3efca9c449a01f42fa1ee89195fe76d4bbc44d0f943faec322bca6c5294457bdda354d39427c0e6bc20fe054a7869f4d1b4a9e9f7ef11c42975653ec5e0bea8660440fe36ccfaba291930357423f2a8d5a714c1d277a8e5d3a2e1b9a04f8bd593acc96704f055deaccbd6f47459d4ed3a2bcf5e9a0fdaf97a3159d5c5d23669abaf5644670218fe7d66419a6f5c27068317557b522dcf8b0bc2136860606f44f6a9c97296d5337f1ebca1c519e1ff3bc37b65c5ed23f0cfb45aacd6e12437797d99d7cfb27ad1ffe48cc4e987a3afb9cb73ea128d89cbf14131cd5765b6a469a0311144fa8886f7e83c2b1b12f0a2f9bdf325c988f97b4e03ae7fd2fe59664d4bc324c6cf676f8a45fe553ba5b1ecedeced6eefee6defde7bb373f0e8dec1a39dfbe3fddd4fe979407d3444275237aff26945d85c3fcdcf339a444365a7c4a7d5b2cd97edf126c1abd7cb96baddd88626269789832259124be4f597e7dfadeab744a18f1eed8e3e9a090a4fabe97a413dd2873245c484cf6a62d62b6a6b94857eb59aafba9f5cb7f36ad9f970492cd0f968555de5f5eb795e969d2fca507991d222dbd4d555dab6ce7fd19a66fa4d9d4d895856299b2f17559b3fcd27eb8b8b1bbfed0086717b5ef1379df7583ebfa89660736a714254bea86a56c0da605a7fd5e45f644b9adcd9d98c0849b37142b2422d945da449dd6973f6d48028ab8be66951e753ea832cd70ff2e7c5a2b0c23b231b501046a775cd2844905cad2765d1cce90bf4238aa6fbcdcbac696846ed3b2407a1b6271b453d915ab0d68658714948119d5eb7a44ebc86d99440e6bf577e6d3e9993a22b31c4d5ca6f3853de7a5555763ca4f5447fc89feb26bfb7f7a4688533c9fc91cdb7ef93627c5d4ddfe66dd31971565e65d7cd9734814ae39f264bd599547c441240d4f36c7ef061e70542fea45a2c682864512d82f437a6ed65b1ca895789179c7a53d57bbc5a95308104ca615e2c8fd7edfc18de83ca66f0c51bf2219646fce59be99a74c48280bdacaad270491f40b459049c51124fc113d10fbb2c5156d9ec49465a11d2653e24250b2679b52e1dcfe7ef481d12184f69946059fb57b66eab6fe759d99d35fd3800d68a347f2926c07c7a495a08ee81fff72b42253f2ebb50f1d5cbbab8a4b1bfaceab639a96890e64b1680e98bbca581be3d9efacc35ada008e5f7d5ba999bdfc99f25ed5c90c81342de8722bf18353110eb55fd8a46f5fa2a5bbd2eab0065b8f5e517d7af7f511761e5a8d76473c80c9929843d94efdf494fc30ddee6d73f09d5fd2a3fcfeb7ce99a980605c9f6745dd327e42b90ecb210d360c9c32a56c7b319193cfaeba3e3e53569db8cbfc59f65595dd107e43b908a0334b212a24de4bb342b615a66b935d9fe376926e4852f40427ef6ff5a1c88f7bf20f937c482f2dfdbb173a40a85c4ee4dd974340481fc22f6f979bb6a02e15bd5f977c9e1c867674b8ad3688602a63c5f2f191312e2d7c42346dfef102e241dedfc649e4fdfbecc5acb92e764004e48c75ee4c7eb59d15a5cf55b05d7901701e966986ab348b23aad49a7c23780dff253d5d2624ce32d16ebc5297c9b62da419b306343f89a201267921ce1739a3e79572848bafbddf5b332b382816e2091e66fd25005a9cc754308ba900adf51a431237facba867481cf3f726e324d76d3912c5219e714748898d45e18265f376fd70481e6439c6ffa60ba4040785c36158d60b542b73acd6d565fe4ad115f03014e2e538ed0ad96406af81b1a36a6c7349896057d784cf811fdafed282570942f1134d92f140ff78d181872ae7fd19a7c02a0efbe3b7d372dd7603c30871d2f706202d868c1409d550b627462567255c54089a620c7d5e93e31284f234d098dfbf79fed9deeefdfbb7ffce983fd83673b27f78ef7c9a3bdbf73ffc9bd4f1fecedef7f7afc90fe3b7df6f4e9c9deceb38707a7cf4e4ff79fdc7f7a72f2e060e7c129a11fe43a8ae584586776e66980bd9df1fec3f1eecefef8fe0eb5a098a2296814679d9698df6e5b923b1266f5783c9ef97d7fdfdfcdfd21ed1ac326d4107f465319f445272223730d57149119671cee5e5d5dd5f0662897b06e2318dedf1befeded8f1f1c8cefef8d80e8fefdf1ee03c279777fc4df7dca2378b0e3fd45518df9ebfe8edf127fedef8d3aa33614faf2878680f7d7830716e8c1ee786fe7bef972ff604cdfe91fd472ef9e7b6f9790f7ffd83df0ffbaffd0ffeb81ff97071f7fedb9eff6c61e5e7be34f3ff5fef040ec8d1f3a08f487c3706fbcbba77f11b51e8e1ff8ed763ff541ec3e74e4a11f3baee37b63f7d6bd605cf4d743ff2feaa53b8fe45f8b1f0a9f9f95ec8c3cfdeb2f2854a9afa19f7f625dc11ba72f9a75b3ca9733849b64fe5470c18f46e45f51e610f688da1a7370fa8e6c1f7ef98a345173423e3b75226f2eb2772fba11a17c33afc87eb4d962459cd4930fe05c925d595e9c2dcf2bf74a57254273c8776de68201e25017b7137813b813540d453d1175e2db114812447a0116819536195dca976a0fb043141494e435a8022405ba262bb09c5eab5a7d01930735446afb82306abe2457d6aa3b0173915744567217264c3e0b9e7c123899a7cbd9aaa2ec0a79811a1ed916937551ce488742459bcfc4c23c897cb3282ea46b8c8290934f29cab8807453a8e7479b1fc1591087907ea32f9b11fd349fc02be87c46e8351583f13ffdf69b372f3b1f9dbd24272906e16599b5e7944fe08f61b3f10b118fcc85e705584365684e6c80a8487deed7eb094d9923ee06dff5a3d7d7c4108b63d26e174b02f84b","7ec9ff03ad5a8f1cd6170000"], [
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
  '"1D7EFFCBFFC50A0"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '56d3537c-56d5-4b3f-896b-c9f45068102e',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '499',
  'x-ms-correlation-request-id',
  'e99fc707-8ce7-4c55-98e1-2a8f872cb325',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T083822Z:e99fc707-8ce7-4c55-98e1-2a8f872cb325',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:38:22 GMT'
]);
