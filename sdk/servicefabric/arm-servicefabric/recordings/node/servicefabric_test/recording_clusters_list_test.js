let nock = require('nock');

module.exports.hash = "24407c98612b7b185d604f8a4ee3290a";

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
  '9f30f205-82d0-49c8-908f-cc15f0642000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhkLDCJC0XdEmW2jOFrV1pY; expires=Wed, 12-Jan-2022 05:36:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQ7MiUQuMsMdrFx-oUZKNIX-cgPPstmuNFAlSbBQNQd1bdN5UE81vMnuz_W4axuSyo1JZG0WvsLr-cLXy6rFOUn8Pc1d1t83RrfrDSRAQVzrpcqZ-zkUaIs6yaQnMerCWhbKGZ5ddff8CvhR2WulD9zjwD-XFRP5d091QLj2iHZkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:02 GMT',
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
  'dcd37a9a-d598-498a-ac0d-377250792100',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvNWkECt5TRIq5J0Tbt8O-4; expires=Wed, 12-Jan-2022 05:36:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrU15Dw4_Q7MCb_cidRO4PqvU9uRQjrBqT9hS2_LAJ95oGSURBii8609w93M5jqsPxLNN3qOWMN-iRtqh7QDRtIfzgr7VmIEbodReP-UcJ5MDfnWUp34hv3MlBSoHDiq54Ob2nfBa--ITJBGyZXWMbZAf7A9lzx2Yhnnjf1nHmYZ4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:02 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f1a9bdeb-e89b-40d7-964d-382ff06aa82e&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '1a38419d-bfc2-443e-bb1b-f20c00562100',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Atm3iOgD7oxIqbywJiskmrUWPr5BAQAAAMLSSNkOAAAA; expires=Wed, 12-Jan-2022 05:36:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 05:36:02 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.ServiceFabric/clusters')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a3f67a85cf3ffaa298d655539db7e3d7797d594cf367d9a42ea677a7e5ba69f3baf968645f29ab69d616d512afe559d3aefd2f8b193ebedbac27cdb42e5668d7dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd2fea6abd6aee2eae7f9a3a6edabbabbaba2c6684c2dd9b70a477f4d777efde5d7b482db3050f72e8fbbccd2ef0fd77effebe1f7d7aefc183fd870f76eedf3f7870fffefeceeec3dff723af69734def2f9e666d462f5832d217d33acfda7cf6e49a3effe83cdb7f90eddedbd93ecfee4fb7f767939ded87d3e9fdedc9f4d3fb3bf7a707fb0ff61f38a0fedb6f743e8e57abb2503a471a1eb768b4b7b3b7bbbdbbb7bd7befcdcefd47f7ee3fbaff607cefc1c183879f1e7cb2b3f368672778b5a4b9faa29a15e7053ac2fbef8d6608e2265cfdd6b745d8bcfe4b2ca08f88015679dd167943207c92d317974543bd16cb8bd72d9185beffe8f57a3acdf3593e0b50d1793f63eecc1fe4d3e9bdf36c7b7af0706f7b3f3fb84f9c383bd89ee5f7eedfdbf9747270fef061eced936a96ff24f119f5083007e3bdf1eedebdfbe387f71f8694d6f616a7ef66454b383eabea1704c213176abbc896d945bec897ede972b6aa8a25136adeb6ab477789a14f04d458046d3c2dabf52c5badc6d90fd6753e9e568b47bb0f770ea2dd77e1350450c134223fe719e4c7c1ba5baf976db1c89d447d0d5215349413ccd73978227f335f2f26ab9af0c0f47deffb1b1b9f548b45b57c41e2da6f2cc8bece5b9092bf765f7a1a4d1e2bf25fad2eea6c96abc2f051c5f3d12aaba921864a8d0380783a40f158c0c4f42fabb23c5bd2cba45dcf96aff369b59c05936b1eab7e3ffad471b8797e49f8c1f7fd3fbdef025ad479596493a22cdaebe7f9655e02f4eba2bccc6bbffb8f96c46d10d2dee03a03b3835ab6bb970b1f041e334dd572994f21e486b15e5635988b187067a7fb0e18ee739ad1abec3ad2fc41b739b1b451216806843b3852a3a6cd6a03658ffaec764a4df2e54c1bdca3ef77c2ef9d4e91e7a37c3527c9abb312efdcdce73e61beb1cf4ff7a941f87dafcfa27959178bac86026eeb75defd7eb6aebb33fba4ae963fe8f3eee5e26c49e82da7243624b7d4f27eb749d1b00e2af306a33bcfca26f75b0cb1d7acc82e9655d316537abfaa493f1d4fa7e88378e0bc80a90c084544f21b417ca909430991268dcd43a78684d1ef9583069e71c5f351c362744323d2fc2df1623ea346e8925a995e4384e98bddcebb93b29a1896c40be054a846a03bc697a409491d5e15cb5975d58c97797bb703e117adf3753e0882bfbd11469b4dca6118fced8d3006a8b007709e9af159f0a3b5e84332cb4cade3755b2d48eca63ee88fb2cbac2881825a1f357ae0a18d6a644a50b52d351d3690783e6ad6ab1589cde9bb55515f7fd54ef1c6437ae01fdcdb7db377efd1fd87f4bf317d84a7f77ebebc2c48306039f1ea77854edeb869e4ee8f80bf9508dfcd2e9908f8e9f4b2bec43f4819ff","92ff077b96462a410b0000"], [
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
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-request-id',
  '56649fa2-6544-4d7c-bbce-2174fa1aa922',
  'x-ms-correlation-request-id',
  '56649fa2-6544-4d7c-bbce-2174fa1aa922',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T053603Z:56649fa2-6544-4d7c-bbce-2174fa1aa922',
  'Date',
  'Mon, 13 Dec 2021 05:36:02 GMT'
]);
