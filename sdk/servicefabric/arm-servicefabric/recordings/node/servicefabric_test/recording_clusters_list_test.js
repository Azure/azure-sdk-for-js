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
  '8b939701-2336-4eda-ab78-39d2fdaf2000',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhOd-d2tsrZBs_hYJBpe45M; expires=Wed, 12-Jan-2022 06:38:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGZ57omWDcfx3fZtw54IAzL3I2VuMzzkwVpG9dPE1rDJHh2jvl0XVytE4cSSpg8mSXHZ4h8yfSphy4DNa8L3KE_eS-y32o8NTQN9MJa_MPTQVrMSwmJdBITQQpeu8bmbgbmmFNH5bsKY6D3CKSgBOKf-YbWfV2uewWjdbaB8cf6QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 06:38:57 GMT',
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
  'e64ab049-807d-4477-81d6-ab3851221f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtZk29ssyoRNv-P5OSLBkeY; expires=Wed, 12-Jan-2022 06:38:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfUyJwjxqABvWFINf7_I3-BFMID7YDjPDRl7QPTc_9uqdXiNYSt3jHDVkM6T5ZH6IZH-H_QiANo4tGzctwwK9BvLlRSyBnue-d6iWo5Unk_16GGX0LDLA2ruxyafwQSG88rMQfcVqnqb2J03g_w-jN-IjQGs15-CQm7J3aHwrTF0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 06:38:57 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d6e69970-146b-4f72-aeca-1607fb279815&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'e64ab049-807d-4477-81d6-ab3853221f00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmZ_uJf5Br1PoACxizsqXp8WPr5BAQAAAIHhSNkOAAAA; expires=Wed, 12-Jan-2022 06:38:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 13 Dec 2021 06:38:57 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups/myjstest/providers/Microsoft.ServiceFabric/clusters')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a3f67a85cf3ffaa298d655539db7e3d7797d594cf367d9a42ea677a7e5ba69f3baf968645f29ab69d616d512afe559d3aefd2f8b193ebedbac27cdb42e5668d7dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd2fea6abd6aee2eae7f9a3a6edabbabbaba2c6684c2dd9b70a477f4d777efde5d7b482db3050f72e8fbbccd2ef0fd77effebe1f7d7aefc183fd870ff6efddbb47781eecedecfcbe1f794d9b6b7a7ff1346b337ac19291be98d679d6e6b327d7f4f947e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ffc001f5df7ea3f371bc5a9585d239d2f0b845a3bd9dbdddedddbdeddd7b6f763e7d74efe0d1fdddf1c1bdbdfb070f3ed9d979b4b313bc59d2547d51cd8af302fde0f5f7c632047113aa7eeb5be26bdefe2516ce4734fdabbc6e8bbc21083ec1e98bcba2a14e8be5c5eb968842df7ff47a3d9de6f92c9f0598e8ac9f316f3e98e4f9fdfcfeeef6bdec9c46fd70f7d3edc9c12cdbce1fcca6f7ef4fcea793bd69eced936a96ff247119f5083007e3bdf1eedebdfbe387f71f8684d6f616a7ef66454b383eabea1704c213166abbc896d945bec897ede972b6aa8a25d369deb6ab4777899d4f04d458c46c3c2dabf52c5badc6d90fd6753e9e568b47bb0f770ea2dd77e1350450c134223de719a4c7c1ba5baf976db1c89d3c7d0d5215349413ccd73958227f335f2f26ab9af0c0f47deffb1b1b9f548b45b57c41c2da6f2cc8bece5b9092bf765f7afa4c1e2bf05fad2eea6c96abbaf051c5f3d12aaba921864a8d0380783a40f158c0c4f32fabb23c5bd2cba45bcf96aff369b59c05936b1eab7c3ffad471b8797e49f8c1f7fd3fbdef025ad479596493a22cdaebe7f9655e02f4eba2bccc6bbffb8f96c46d90d1dee03a03b3835ab6bb970b1f041e334dd572994f21e386b15e5635988b187067a7fb0e18ee739ad1abec3ad2fc41b739b1b4d1206806843b3852a3a6cd6a0385b472af536a922f67dae01e7dbf137eef748a3c1fe5ab39495e9d9578e7e63ef709f38d7d7eba4f0dc2ef7b7d16cdcbba586435f46f5baff3eef7b375dd9dd92775b5fc419f772f17674b426f3925b121b9a596f7bb4d8a867550993718dd795636b9df6288bd664576b1ac9ab698d2fb554dfae9783a451fc403e7050c6540282292df08e24b4d184a8834696c1e3a35248c7eaf1c34f04c2b9e8f1a16a31b1a91e66f8917f319354297d4caf41a224c5fec76de9d94d5c4b0245e00a7423502dd31be244d48eaf0aa58ceaaab66bcccdbbb1d08bf689daff34110fced8d30da6c520ec3e06f6f843140853d80f3d48ccf821fad451f9255666a1dafdb6a4162172af1ec322b4aa0a0d6478d1e7868a31a9912546d4b4d870d249e8f9af56a456273fa6e55d4d75fb553bcf1901eb807f776dfecdd7b74ff21fd6f4c1fe1e9bd9f2f2f0b120c584ebcfa5da193376e1ab9fb23e06f25c277b34b26027e3abdac2ff10f52c6bf","e4ff012a003b8a3f0b0000"], [
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
  '278680c5-d4b3-4615-8eac-d7b0c345fde5',
  'x-ms-correlation-request-id',
  '278680c5-d4b3-4615-8eac-d7b0c345fde5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211213T063858Z:278680c5-d4b3-4615-8eac-d7b0c345fde5',
  'Date',
  'Mon, 13 Dec 2021 06:38:57 GMT'
]);
