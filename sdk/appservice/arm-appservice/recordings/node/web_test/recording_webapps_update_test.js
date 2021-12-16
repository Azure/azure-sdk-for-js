let nock = require('nock');

module.exports.hash = "92d7bf919355037888d4505297dfc444";

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
  '6e42cbf6-77fe-4524-bb47-09aaa7541f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArTwlqCf9C1Coxv5Tc5vwT8; expires=Wed, 12-Jan-2022 08:38:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOoHJroQaGDAWbMcsw4Ss3hGLcGaATlzMsl3-TIxouMTPERfgnTB7CAHiK_tgYG1l8_gFWtq3-_1WXhr_hON3Ofi9QBD4y9QbjO-jvYcW4k-VcNbYz3GdIVSFxNeJSCJ-tmKuydLTGtQYtNdZn3GVhSMeMnRMs3J8rKcY7v4SFHogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:27 GMT',
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
  '68d71f8e-81a4-42ac-abb0-d60120192000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Agu49x_BKrNBhcfndG2aQdw; expires=Wed, 12-Jan-2022 08:38:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtNF2w6hNjvGpl_CPo3YOfu6gOeNqKMrpSSbyYTwZgUaL3zDCZxXoyApKixSG9KuT7K_7Es_NoPuKJP_G0OEX6WC3Jq6sWfFYTzl9ToI3c4m9jvXDmH-zs1tORiHp3pVCOkGhcqMkZATWdsAxaC5ZcgZSYW7BZYhselQ9AtGbrXcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1f6f8e98-012d-41c1-81b3-33713e94c80d&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8b939701-2336-4eda-ab78-39d2cde22100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArBAgXhhtgBItH7-IsYhQOgWPr5BAQAAAIP9SNkOAAAA; expires=Wed, 12-Jan-2022 08:38:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:27 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx', {"properties":{"serverFarmId":"/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/serverfarms/myappserviceplanxxx","reserved":false,"isXenon":false,"hyperV":false,"siteConfig":{"netFrameworkVersion":"v4.6","localMySqlEnabled":false,"http20Enabled":true},"scmSiteAlsoStopped":false}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffae0346bdaf4abd7f421f5becaebb6a0e68f7e71b483a6cd5a7cf86abd5c16cb0bfa645e35ed0b6a49af7ccf6b3bce7eb0aef3ab7c820f9af1326f3ffafee823fafbf52a9b028219f236baffea357dd3f037d4475e9e3f2f966fa9d1bc6d57cda3bb77afb2ab669bb09b6d4fcaf5f6dec1bd71b62a3a5d5cd1f0aa2beeead1fefdfdbb5f6356000b4880d251ec8496f42d7ed22841923a5f55f467555fbfa60f410a423c68515d2df3faa347cb75598e3e5a37d945fe5ac9f8a2aa1759494df2653629739a9eb65ee7a38fb2d9a2589e869f69936fdf9ade23ffeb66ba8834a129c11f2f83795fe46d36cbdacc604c74b7df7ecfb205cdd0faddb3773f49bc4a04a6ce2eb3728d2f3efa2523dbe8bb3227916600fd4ba87be2c6d779db122f1174fe903ebbcc8a329b1465d15ef728d534e509b0392f888181125e1a7d346d6afafd7b04714a5d994f31b82faa190190bf0db3be6e4a064c0ddd883c6af52945b0f41d6af9b468782ee8d362f5246bf219017c9537ebb2353d5d1675bbcecab397e68376be5e4c5675b1b44ddaeaab15d19900867f9f5990e61bd789c1e045d59e54cbf3e282f0041a18d81b117e6ab29c65f5cc9f076f687146f8ffcef05e5971fb08fc33ad16ab7538c94d5e5fe6f5b3ac5ef43f392371fae1286ceef29cba4463e2727c504cf355992d691a684c04913ea2e13d3acfca8604bc687eef7c493262fe9ed380eb9fb47f9659d3d23089f1f3d99b62917fd54e692c7b3b7bbbdbbb7bdbbbf7deec1c3cba47ffdb19efee11f88648449ae6553ead0891eba7f97946f36708ecf4f7b45ab6f9b23dde2473f57ad9528f1bdbd09ce43267d0214be286bcfef2fcbb55fd9688f3d1a3ddd1473341e169355d2fa847fa506687f8ef594d7c7a456d8d9ed0af56f355f793eb765e2d3b1f2e69f63b1fadaaabbc7e3dcfcbb2f34519ea2dd2576496ba6a4adbd6f92f5ad324bfa9b32911cbea63f3e5a26af3a7f9647d7171e3b71dc0b06bcf2bfea6f31e8be617d5121c4e2d4e88ca1755cdba571b4cebaf9afc8b6c49933b3b9b112169364e484ca885728a34a93b6dce9e1a106575d13c2dea7c4a7d90d1fa41febc5814566e67a4fe0bc2e8b4ae19850892abf5a42c9a397d817e44c774bf7999350dcda87d87442054f4649ea827d208d6d0102b2e0929a2d3eb963489d7309b12c8fcf7caafcd2773d2712586b85af90d67ca5bafaaca8e87149ea80ef973dde4f7f69e14ad7026593e32f7f67dd289afabe9dbbc6d3a23cecaabecbaf992265069fcd364a43a938a8f4802887a9eb90f3eecbc40c89f548b050d858ca94590fec6b4bd2c5639f12af182d36caa758f57ab12d68f4039cc8be5f1ba9d1fc37150d90cbe7843eec3d288bf7c335d938e5810b09755551a2ee90388368b80334ae2297822fa619725ca2a9b3dc9482142bacc87a45fc124afd6a5e3f9fc1d694202e3298d122c6bffcad66df5ed3c2bbbb3a61f07c05a91e62f45fb9b4f2f490bc133f0ff7e45a8e4c765172abe7a59179734f69755dd3627150dd27cc902307d91b734d0b7c7539fb9a61514a1fcbe5a3773f33bb9b2a49d0b127942c8fb50e417a3260662bdaa5fd1a85e5f65abd76515a00c97befce2faf52fea22ac1cf59acc0d592033853085f2fd3be969b8c1dbfcfa27a1ba5fe5e7799d2f5d13d3a020d99eae6bfa84dc04925d16621a2c3957c5ea7836235b477f7d74bcbc266d9bf1b7f8b32cab2bfa80dc06527180465642b4897c9766254ccb2cb7d6daff26cd84bc700348c8cffe5f8b03f1fe1724ff865850fe7b3b768ec4bb27a97b53361d054110bf887d7edeae9a40f65675fe5d7235f2d9d99222349aa08027cfd74b468464f835b18851f73b840a09473b3f99e7d3b72fb3d672e439e9ff1352b117f9f17a56b41655fd56c135e44440b819a69a2c12ac4e6b52a9700de0b1fc54b5b418d3788bc57a710aafa69876d026ccd80ebe2688c4982446f89c664fde150292ea7e77fdacccac5ca01b08a4f99b1454411a73dd10822e98c2771463ccc813abae215c60f38f9c834c73dd74048b34c639851b2225b51780c9d7cddb3541a0f910b79b3e982e100a1e974d452358add0ad9a8d36ab2ff2d648af8100f7962947e8564b2035fc0d0d1bd3631a4ccb823e3c26fc88fed77694c254f225c225fb85e2e1be11fb426ef52f5a934b00f4dd77a7efa6e51a8c07e6b0e3054e4c001b2718a8b36a417c4ecc4a4eaad8275114e4b23ad527f6e469a429a171fffeb3bdd3fdfd7bf78f3f7db07ff06ce7e4def1fea79f7e7a7fe7fe937b9f3ed8dbdffff4f821fd77faece9d393bd9d670f0f4e9f9d9eee3fb9fff4e4e4c1c1ce8353423f487314cb09b1ceeccc53007b3be3fd87e3dd9dfdf1fd1d6a41d14453d028ce3a2d31bfddb6247724cbeaf0783cf3fbfebebf9bfb43da35864da821fe8c2631e88b4e2c46d61a9e286232ce35dcbdbabaaae1cc501661dd4630bcbf37dedbdb1f3f3818dfdf1b01d1fdfbe3dd0784f3eefe88bffb9447f060c7fb8be219f3d77d8a165c4bfcb5bf37ea8cda50e8cb1f1a02de5f0f1e58a007bbe3bd9dfbe6cbfd83317da77f50cbbd7beebd5d42deff63f7c0ffebfe43ffaf07fe5f1e7cfcb5e7bedb1b7b78ed8d3ffdd4fbc303b1377ee820d01f0ec33d0acbf42fa2d6c3f103bfddeea73e88dd878e3cf463c7757c6fecdeba178c8bfe7ae8ff45bd74e791dc6b7143e1f2b3929d91a37ffd05452af535f4f34fac2b38e3f445b36e56f972864093ac9f0a2ef8d188fcab3c6b608fa8ad3107a7efc8f4e197af48133527e4b25327f2e6227bf7a21b10ca37f38aec479b2d56c4493df900ce25d995e5c5d9f2bc72af74552234877cd7662e16200e75113b8137213b41d548d4135127be1d812441a4176011586993d15ddb1e6087282628c9695005480a744d566039bd56b5fa02260f6a88d4f60561d47c499eac557702e622af88ace42d4c987c163cb924f0314f97b3554579157202353ab22d26eba29c910e858a369f89857912f966515c48d7180521279f52907101e9a648cf0f363f82b320fe20fd465f3623fa693e8157d0f98cd06b2a06e37ffaed376f5e763e3a7b493e520cc2cb326bcf299dc01fc366e317221e990bcf0bb086cad09cd8004191badcafd7139a3247dc0daeeb47afaf892116c7a4dd2e9604f097fc","92ff07b6ee7154d1170000"], [
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
  'e41934c0-0937-4c08-97f3-7f472830674a',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '498',
  'x-ms-correlation-request-id',
  'd5900270-bcb8-495c-aadf-c64b6cb11ce9',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T083835Z:d5900270-bcb8-495c-aadf-c64b6cb11ce9',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:38:34 GMT'
]);
