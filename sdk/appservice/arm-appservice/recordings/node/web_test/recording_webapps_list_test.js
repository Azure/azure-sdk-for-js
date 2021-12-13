let nock = require('nock');

module.exports.hash = "fa11008e2454bd54fb1d0d9c1317f4a9";

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
  'e64ab049-807d-4477-81d6-ab3801442000',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=An2WBw1kcw9Hs3LSND-MvUs; expires=Wed, 12-Jan-2022 08:38:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfQ9xxcrog7LCdPmTZtiJFvEjrULB5R2FbzO2GKhV-LHi3-EefvQvkciPccGJXzcZ3GVwaWblFT0g9bO-CoWIVoSuvlJjLK4KbtcpDilcc6W4ZVkXh3y8iRZu-wKw8E_c5OTRXBOXwEVu74SPPRUH4jbu4NjWIYGH-5B5ibBUNKEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:26 GMT',
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
  '8b939701-2336-4eda-ab78-39d2bae22100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkektGwpSOFMoHCHo94kKv8; expires=Wed, 12-Jan-2022 08:38:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO57eNlBqMKsGFeIrIVEDpicWcn6NJgVwnmUbDoaidOS5FUZi0BZArV_xg4AiddeUSmIsVvwuiyIlmtPiwWsGwTAnW0PVDxGup3DU8OtUdkuevjDKjSppUTCjJs5ARENy3uIh4IbA_at3Xl9zCyujlKCSWW2yiiW32g9PEdZVflUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:26 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b1887347-e4ee-49df-ba43-85129b617931&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '68d71f8e-81a4-42ac-abb0-d60118192000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiE7SRgERExKrukJfk2LNF0WPr5BAQAAAIL9SNkOAAAA; expires=Wed, 12-Jan-2022 08:38:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 08:38:26 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Web/sites')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3efe693bb4d415f5333fc7c47cf47a38f96d98290f828f8acbd5ee1b3c8bbf4e5db620974b3d58afe28ab69067ce983d3ac69d3af5ed387d4fb2aafdb829a3ffac5d10e9a366bf1e1abf572592c2fe89379d5b42fa825bdf23dafed38fbc1baceaff2093e68c6cbbcfde8fba38fe8efd7ab6c0a0866c8dbe8feabd7f44dc3df501f7979febc58bea546f3b65d358feedebdcaae9a6dc26eb63d29d7db7b07f7c6d9aae8747145c3abaeb8ab47fbf7f7ef7e8d59012c20014a47b1135ad2b7f849a30449ea7c55d19f557dfd9a3e042908f1a04575b5cceb8f1e2dd76539fa68dd6417f96b25e38baa5e642535c997d9a4cc697ada7a9d8f3eca668b62791a7ea64dbe7d6b7a8ffcaf9be922d284a6047fbc0ce67d91b7d92c6b338331d1dd7e4b3caf6c4133b47ef7ecdd4f12af1281a933958a8f3efa2523dbe8bb3227916600fd4ba87be2c6d779db122f1174fe903ebbcc8a329b1465d15ef728d534e509b0392f8881192582326d6af31b752480a8290ded8b6a86d79f170bfa6346ef1b7e7ddd940c9b5abb417904eb138b00ea3bd4f269d1f074d0a7c5ea49d6e43302f82a6fd6656bbabf2cea769d95672fcd07ed7cbd98acea62699bb4d5572b2235010cff3eb320cd37ae1383c18baa3da996e7c505e1093430b03722ffd46439cbea993f15ded0e2bcf0ff9de1bdb212f71158685a2d566b3bd34ff3197306de69f2fa32af9f65f5c2f4e33e3923c1fae1a86eeef29cba4463e2777c504cf355992d6936084d82481f11c68fceb3b221512f9adf3b5f92b498bfe734eefa27ed9f65d6b4345a12817cf6a658e45fb5531acbdecedeeef6eedef6eebd373b078fee1d3cdaf974bc779fc0374429d239aff26945885c3fcdcf339a464367a7c9a7d5b2cd97edf126e9abd7cb967adcd886a62697a98336591253e4f597e7dfadeab7449c8f1eed8e3e9a090a4fabe97a413dd287323bc486cf6a62d72b6a6b34867eb59aafba9f5cb7f36ad9f970494cd0f968555de5f5eb795e969d2fca508391e62203d55558dab6ce7fd19a26f94d9d4d895856339b2f17559b3fcd27eb8b8b1bbfed0086857b5ef1379df75842bfa89660746a714254bea86ad6c2da605a7fd5e45f644b9adcd9d98c0849b37142d2422d9453a449dd6973f6d48028ab8be66951e753ea83ccd70f72d693e6db19198282303aad6b462182e46a3d298b664e5fa01f5135dd6f5e664d43336adf211108553e192aea8914833539c48a4b428ae8f4ba2585e235cca60432ffbdf26bf3c99c545d8921ae567ec399f2d6abaab2e321bd271a44fe5c37f9bdbd27452b9c4936900cbf7d9f54e3eb6afa366f9bce88b3f22abb6ebea409541aff3499abcea4e2239200a29e67f8830f3b2f10f227d562414321b36a11a4bf316d2f8b554ebc4abc0005275fa9f23d5ead4a683b02e5302f96c7eb767e0c17426533f8e20d39124b23fef2cd744d3a6241c05e565569b8a40f20da2c02ce2889a7e089e8875d9628ab6cf624238508e9321f927e0593bc5a978ee7f377a409098ca7344ab0acfd2b5bb7d5b7f3acecce9a7e1c006b459abf14ed6f3ebd242d0407c1fffb15a1921f975da8f8ea655d5cd2d85f5675db9c543448f3250bc0f445ded240df1e4f7de69a565084f2fb6addcccdefe4d492762e48e40921ef43915f8c9a1888f5aa7e45a37a7d95ad5e975580329cfbf28bebd7bfa88bb072d46b32376481cc14c214caf7efa4a7e1066ff3eb9f84ea7e959fe775be744d4c8382647bbaaee913f21648765988ed604902cfbe5e03e29a2f48724c3ba8cdbd1d3b3af190895fdf944d47b408e217b1cfcfdb551370edaacebf4b463a9f9d2d29caa1a105b379be5e3222c4fdaf89b84651ee102ac456edfc649e4fdfbecc5a3b97e7a4394f48395de4c7eb59d15a54f55b05d790f98558304c55f6c4929dd6a48c605461eb7faa5a5a8c69bcc562bd38853f504c3b6813666c415e13449a5262407c6e092d0424a5f7eefa5999598e42376065f337897641ba66dd10822e20c177e4a7cfc887a9aec19660908f9c874986b4e9b024c9da39b9ecc25fb517c4c8d7cddb3541a0f910bf953e982e104e1d974d452358add0ad2adc36ab2ff2d6f0bd8100ff902947e8564b2035fc0d0d1bd3631a4ccb823e3c26fc88fed77694c254f225420efb85e2e1be11cd4c7ee92f5a933105faeebbd377d3720dc60373d8f10227268075b40dd459b5203e276625f74e34bb8818397b4e6988267e1a694a68dcbfff6cef747fffdefde34f1fec1f3cdb39b977bcffe9a79fdedfb9ffe4dea70ff6f6f73f3d7e48ff9d3e7bfaf4646fe7d9c383d367a7a7fb4fee3f3d397970b0f3e094d00f5205c57242ac333b5b1dcf66e4aa1212e46b8ef71f8e7777f6c7f777a805b9e34d41a338ebb4c4fc76db92dc912cababe0f1cceffbfbfe6eee0f69d71836a186f8339a08a02f3ac10cd939f870086a385ebf7b757555c30da0487cdd4630bcbf37dedbdb1f3f3818dfdf1b01d1fdfbe3dd0784f3eefe88bffb9447f060c7fb8b2201f3d7fd1dbf25fedadf1b75466d28f4e50f0d01efaf070f2cd083ddf1dece7df3e5fec198bed33fa8e5de3df7de2e21efffb17be0ff75ffa1ffd703ff2f0f3efeda73dfed8d3dbcf6c69f7eeafde181d81b3f7410e80f87e1de78774fff226a3d1c3ff0dbed7eea83d87de8c8433f765cc7f7c6eead7bc1b8e8af87fe5fd44b771ec93115070ece322bd919b9c8d75f908f5f5f433fffc4ba821b4b5f34eb66952f6708d14a1be7821f8dc8bfcab306f688da1a7370fa8e4c1f7ef98a34517342ce2e75226f2eb2772fbaa1947c33afc87eb4d962459cd4930fe05c925d595e9c2dcf2bf74a57254273c8776de6bc68e25017eb127813ec12548de13c1175e2db114812447a011681953619ddb5ed017688bce9921c085580a440d7640596d36b55ab2f60f2a086486d5f1046cd97e4035a7527602ef28ac84adec284c967c1533a02ded9e972b6aa283141ee93c615b6c5645d9433d2a150d1e633b1304f22df2c8a0be91aa320e4e45372cf2f20dd1423f961da477016c493a2dfe8cb66443fcd27f00a3a9f117a4dc560fc4fbffde6cdcbce47672fc9478a41785966ed3905e2fc316c367e21e291b9f0bc006ba80ccd890d104ea8b3fa7a3da12973c4dde0f47df4fa9a1862714cdaed6249007f091232cbfc5d4b710c2570e57d64c9f1db","2ff97f00f4ee2bce3b170000"], [
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
  '182fd9ff-1424-4647-ba3d-597ccbaf3c96',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-correlation-request-id',
  'cdfc9f62-5af7-4398-bee5-e0ed14c9fa2f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T083827Z:cdfc9f62-5af7-4398-bee5-e0ed14c9fa2f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 13 Dec 2021 08:38:27 GMT'
]);
