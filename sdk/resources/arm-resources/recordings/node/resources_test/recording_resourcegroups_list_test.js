let nock = require('nock');

module.exports.hash = "b2e158b2e5dd4fe209f4c56ad666f8b6";

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
  '06e8a334-c653-458a-90ba-720289964800',
  'x-ms-ests-server',
  '2.1.12249.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnF7wmwIzVtEuJrif9cMjWg; expires=Fri, 31-Dec-2021 02:43:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrASUMTIMmHHnQePPT35KM0gDhBYB5mNKgsiED_KWJ6GcxH5Z-OJcM0CLQhM5eGXqTRQEe_k5GIM5fbKfvNbBFWHK5zLWkk0_t8nK9naAhePAoU3rsCwD8TqvrXX5ek5zqencvvnx7B7u6TPl65X4SUsA9u7FPpBObrba3IAlqSHwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 02:43:00 GMT',
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
  '5c20cdd3-2e65-4999-871b-c936ed833300',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjYxF5tGTkFKhQ-cnK2JKkc; expires=Fri, 31-Dec-2021 02:43:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYhrtZd6KHWjplBZ9p28qcnTcwux0V2gwuXr23ig1_evQ0goSa67g5wol0O54EiJNHV7u-XmtSD0DT3GklB-Sc-0zxXZkOQc7yeXOQ8_c40e3mYZsXxRpbaHxAHvxypvMEz98HjdJAw-g8IFmnRulUXr_jA2_X3jGyJm_odEvgqogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 02:43:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b75bbfb0-835a-4ff3-8c97-ca55c064a689&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '93ef7e08-1935-4d62-bd81-4c49711d4700',
  'x-ms-ests-server',
  '2.1.12249.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApeRO671ha1FjvSGBrTGyUoWPr5BAQAAADTYONkOAAAA; expires=Fri, 31-Dec-2021 02:43:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 01 Dec 2021 02:43:01 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourcegroups')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe66e337bbbbdccdbed366fdaed5f94ed7d34fa68992da88f8f22dfb4d72b7cf34531adaba63a6fc7af1458d3014b6dcb6a9a012d6a9f674dbbc6676d76d17cf4e817ff92d147abba5ae5755be4f81b7f5d160d352e9617afdbac4527afd7d3699ecff2d947bfe4978cbeb9f116d7e54fcff6aedaea17cdf7efcdf27ab97fafc9ae7eb0f845efdee6595ddc9b4c7f5191cd2ece9b36dfafd6ed4f139cc5a2292febfdebf3abbdcb45ddfca2bca82e1645fbd3342025d5370bf41ba2f2474ff3326ff3e3f336afe9ebbd9dbd9ded9d83edddfb6f761e3cdad97bb4f7e9f8dede83837bfb1ffd5ccec7f10f5ee7d397d9f4edf1baad4eaae57971f1ea731a845276e8eb0fa5118df0e766bc4ff3f36c5db6065dfe74fbf4abd784930e79438bffcf8e9ad8bffac19cba685a4243071a7ef8a16353aeffb9e4e5fa6275bd7d71fffebde9e40757b3bdf983eb8b8bf95ef6f6eae2bc7870af7cbbbfbaae7e7a7fff17bdfbc1249bbf5d14e54fefad3e7d7baf78f060954fb36c71beff8beebfdd7bfbf67e71fe8b1efca09dd1a894543f0b90bf217a13bb76b4cceef62e299a876f76f71fedee3cbab74b6d9fac8b7276062a0352693ef94e35e97ef462bd9830a0e0d357d42bf72e9ffe9ccf713e59ecfff4e5b2b9fc45ab9f2eeeb79f4edaebab07cdbb9fbeb8df3c2896c5bd9f6eaaabe5a43cbf7e502d2fd6fbd73407efe6b3f3eb8b4f57b3f9f5bdc983f96472be9c5e4e17e734447f8ebf59c83fa439deffffe31c67c5fdfbcbcbc9fa07ef3e7d505ed6ebf3f6bcacaa5ff483e5a78bb67efb8bda62ba98edad1fac2e7f30bd3729ef9f37b3f6174d7e7a7ffad365397bdb4ee6d7efde2dafcef3b7b3694d43f4e7f89b85fcc398e3fb9f3eba77406d79a2fe7f34c7b3e2172dee7f7afeb6acebe5a2783bdb5ffff4fdf3eca7dfaeeeefb5d3bde9aa5d5c650faedeadaeb37bef1e4cf77ffafebdd9d5d583457ef936fbc1e4a22aa6cb966667fed3b3f60734447f8ebf59c83f94397ef0e8dea7d49627eaff4773bc77fdd3173f9d4fde5ecedb657b515ffea06d1fdcdf7ff76ebabaff8b26d5fdf3c94fb78b1fb4d3362b26e54fb7fbd79ffea24fcf17edf545fd8ba6e5bbcbe50fc88dbf97e5f5fd9fde8397e2cff1370bf9677f8eef3fdad97db4fbffc739860bf9fb4fcbe2f75f5c2cdadf9f82d6abaa7efbfb9f17757e9595e5efcf5feba7070f09c86e0e8be5cf2537796f083fbb7346911a19d77bf71fdddfa7b64cf8ff1fcdd9bdbdfdf672fa6e42ce6cfeee325b4deebf2df27936b95ccc17d9d52fbafae97bebfa417e3ebd7c57ccf73ebd58de6bafdbfae2ddfdf607f756fbf555d5943fbd9fdf2b7ffad3fa8286e8cfe5370bf967778e452ef71e3edab9476d79a2fe7f34c717b3fb55f6d3efb2f90f5697cd4f5fb6f564afb8f845c583f38b767d7ff2e96cf6d3fbe73f7dbdaaf37bfb3ffd76efe2fea7cbea172daff6ab2cff45f78b7c552cefe5e757f9fdf5f524a321fa73fccd42fe61ccf1bd9dff7fcef12fba57df7f3bb9ba6cdb5f54de9bdd7ff7801cd3fdfb4533dbfbe94531cbceb3bdd54f7ffa83f9bd6c7a55b4ed0f2e9aecfc07f7afafcedb8babbdf3a6c9af1f4c160f286ff683bd2b1aa23fc7df2ce41fd21cdf439e9427eaff47733cbfbecedbe5e4fa0189dc058d7f92b53fd8bb3c3fbfdedf9b2fe79faecbe583d9836c7df1f6fcfc7e7e2f7b3b230aff60b9ffe94f67f38b6c3269eebdbb7cf083f5457bfef61d0dd19fe36f16f20f658e771feddda7b63c51ff3f9ae37bd37cff6279fee041565e5ecfdafad359f38b3e2d7e503eb83f9f5f5ce5efee91bb7a55df9bdf5bac2ef62e66d5fdfa6dd3ccaad522cb9af3c52aafd6970f2ed6d7949c0075fc39fe6621ff50e6f8dea3bd1d6acb13f5ffa339fe45f36535dfdf7ffb83c5455edf5b5c15f562f6f6fe2cbff7837bebb76556eecdb34ff39fa660f5fe6c31bbfee9b7f5e4a2985f2d17f7cf57a4441f646f7f7aff6aba9f5dcd8b390dd19fe36f16f20f658e2975f5ffc758e8dddee4ea41bba8aef756d3b70f66ab7bf7effff4bbd5d5deecedf534bf575cff60feeea7dffee017ed3fb8b857edffa28ba6ada6f79af37276717faf9d2c3e6ddf4edb72fa6efdf6c1644d43f4e7f89b85fc439ae3bdff3ffa5cedbdeb7245e9c377ed79b597b7f3b7f756f7ee3d382fef5d4c96f90fee519e69feaedeffc1a76fdb1fccea7bedbdcb2a9f4ce64d71b1f736a375caeaa7d7d307b369b9f8e9fa010dd19fe36f16f20f658ee97fe88b27eaff47739c55d572bddc5facf6f7ae1764267fd066e52f9a4c174493ebf26ab1fec1bcfc4559d93c7877afddcb67d5fafabaca48f626f5b2bafce9d9db79f1837bb309ad085cd558edf1e7f89b85fc4399e34f1fedffffd11e3f98fea0bdffd34d917dba7f2f232fe8fee20775f1e9bbcbf376beb76c2eaab757f7d7ef26c5797b6f9add6fdf65efda7ab12ade5d2cdf9e5fccdebefd458bebfd8b6cffea6d7d8195007f8ebf59c83ffb73fce9a3fbbbf43f6acb13f5ffa339cef2f379bd78777fbd9a3d98cc3fddbf9a65ef566fe7d7976f6b5ae9bbbaf8458b4b8a64defde09296087e70b937dbaf97efdefdf4745a14d7cda70fdad50f7ed1d5fefedeea07f54fe734447f8ebf59c83fbb73bcbbff66f7c1a35dca3fffff3197797ff58b661757b362daaca717b45c7b3edf9fe5e50f7ed17d9aae77ebf65ed1e6e7d9455156ababea6afed3ab9f9e5cfca28b7c72effe0f2eaf66d5f55533fbc1fadd62f2f6ed12abb6f41210fe5980fc439ae3bdff3fe640dafbeb9faef78a4f2fe63f5dfda207f39ab2cbbfe832bfce6929e7dddeeafc17bdcde68bf3abfaedfebb753ebb7abbaee98ffadebde9e5629fd66f3f7d77bd773fa3d5faec073f002569fa80f0cf02e49fe539beff66e7e1a3fdbd47fbff7ff4b9ae7e50e79f5efda2c5747e3e2d2f67cde562f1834f97979f7e3a5fe4453399bcdbabae7f3a6beeddffe9fbd9f4f2edbdebf9f2a7ef4d7f70fde979395fcc57ef2e2717fb93627d35992c6888fe1c7fb3907f4873fcffcb75a772efed0f2e57f3fa7aefb258accfef5f4dd657797e9d5d53f8322b09a962359f16b3aada3f9fec17d3453ecfaf7ff08bf67e5139af8b1fb4cda72466597d7e7fde3e98d010fd39fe6621ffaccf31d616e97fff7fd4d5fbcb65733dbfbc57cd7ed1de64ff174dead9fd76767d7ebfb87fff1765ebd574b2ffd3ab0bea7e7aef9ab2cbf31f64e5fcea9c22dd4ff73e6dab4f7f5135ad7ed0525663b6582053e1cff1370bf98732c7648f0fa82d4fd4ff8fe6b8be9767d349797db52e8ae9c52faadebe5b5c5dddfbc1c5a745d9fca2f52faae68459763d994f9afad3f3d5a7ed7a7eafb8f7e90f2e266d9e53028bd618f6cbfdd97affdef98a86e8cff1370bf98732c7fbffbf8b9d16d73fddb479d3126a3a37de27df144de9e72e7d7e9995eb7cf7e774b84fc98d5f97ad19077fbafdddaf5e13b23afc0d2dbe2639ae88984c0e1ae7cfcda817d932bbc867dbf5c5b6cc6dbe875054473cf0ed078d16d64ee13eb9a64fef7ef8207e5191553f98139d9af62ed36e96d7cd5d87decb757d59e45777b3e9b45a2fdbe66e3018e1c49f4bd66bb2c5aaccb7cda7db17f81859739d86c1ef3f78226890ff2f1a321690370d19dfff9087fcfd5ff2ff004eebb0e8f3350000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11994',
  'x-ms-request-id',
  'a0839e58-7cc2-414d-ad26-196a26880724',
  'x-ms-correlation-request-id',
  'a0839e58-7cc2-414d-ad26-196a26880724',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211201T024301Z:a0839e58-7cc2-414d-ad26-196a26880724',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 01 Dec 2021 02:43:00 GMT',
  'Content-Length',
  '2826'
]);
