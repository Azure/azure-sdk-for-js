let nock = require('nock');

module.exports.hash = "58844a114a380117593d789374129591";

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
  '90421fa0-e33c-4f15-bc0d-232e9ab71a00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Arcdc8eN0xxGh_4cGuB-utw; expires=Thu, 30-Jun-2022 03:48:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0lGM6wOlLh20Z-_4OuQQIit4c1MZxZ6RogzGSZ7r0TiUjBIxTBaqJ1v0ibQWU8PLDZ_ryLEKQv9QrWg-TV5kNzJ3eY8uf8yv0YK1Lt9nYUI4ZNhnYqvNRyd9S8BjHHhfh8dP-ayGwIdDaw1qpp0XffmuZBQN04hbs3cUu4hT-A8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:52 GMT',
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
  '8347f94c-67d6-49fe-87f8-43ac2a870d00',
  'x-ms-ests-server',
  '2.1.12821.9 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Al_yHox8sOdMk6Sulx9Wiy4; expires=Thu, 30-Jun-2022 03:48:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxfEkQouXO_2Nk1ujFGhncyW6ejDw3aNdu-89T_K0TQZslUFmNR4npyfW-tinqWyug6ce3SzuIP-kVnOmdR5HfEPpeXPkdeEeSGVbwpqVsVTi1CBzrhitbWP8BjsV7cmYPmUeZ1p8kLBSxCbEZr3efPPQQZVl-dX3Ql57cXTRbH8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:52 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=02d2a746-66b0-4dda-b125-707bffbb2b31&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'fb5a535c-34a8-46f1-8d9b-3f1e0e651c00',
  'x-ms-ests-server',
  '2.1.12821.9 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmUOZQOS825FgHj_c6W5ELIX6p3SAQAAACSHJ9oOAAAA; expires=Thu, 30-Jun-2022 03:48:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 31 May 2022 03:48:52 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Web/sites/mysitexxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8ebf9b4fee36057d4dcdf0f31d3d1f8d3e5a668b9c7a0f3e6baf57f82cf22e7df9b65802dd6cb5a23fca6a9a015ffae0346bdaf4abd7f421f5becaebb6a0e68f7e71b483a6cd5a7cf86abd5c16cb0bfa645e35ed0b6a49af7ccf6b3bce7eb0aef3ab7c820f9af1326f3ffafee823fafbf52a9b028219f236baffea357dd3f037d4475e9e3f2f966fa9d1bc6d57cda3bb77afb2ab669bb09b6d4fcaf5f6bd9d07e36c5574bab8a2e15557dcd5a3fdfbfb77bfc6ac00169000a5a3d8092de95bfca451822475beaae8cfaabe7e4d1f82148478d0a2ba5ae6f5478f96ebb21c7db46eb28bfcb592f145552fb2929ae4cb6c52e6343d6dbdce471f65b345b13c0d3fd326dfbe35bd47fed7cd7411694253823f5e06f3bec8db6c96b599c198e86ebffd9e650b9aa1f5bb67ef7e927895084c9d5d66e51a5f7cf44b46b6d177654e22cd00fa9750f7c48daff3b6255e22e8fc217d769915653629caa2bdee51aa69ca1360735e10030325bc34fa68dad4f4fbf708e294ba329f62705f543302207f1b667ddd940c981aba1179d4ea538a60e93bd4f269d1f05cd0a7c5ea49d6e43302f82a6fd6656b7aba2cea769d95672fcd07ed7cbd98acea62699bb4d5572ba233010cff3eb320cd37ae1383c18baa3da996e7c505e1093430b03722fcd46439cbea993f0fded0e28cf0ff9de1bdb2e2f611f8675a2d56eb70929bbcbecceb6759bde87f7246e2f4c351d8dce5397589c6c4e5f8a098e6ab325bd234d09808227d44c37b749e950d0978d1fcdef99264c4fc3da701d73f69ff2cb3a6a56112e3e7b337c522ffaa9dd258f676f6f6b677ee6fdfdb7db373efd1fec1a37bf7c7fbfb04be211291a679954f2b42e4fa697e9ed1fc19023bfd3dad966dbe6c8f37c95cbd5eb6d4e3c63697c446af2a9a8ae3b2b49a4b51a7f9ca653ea15f96c42979fde5f977abfa2d11eea347bba38f6682ded36aba5e1036f4a1cc1c017d56130f5f515ba343f4abd57cd5fde4ba9d57cbce874be28cce47abea2aaf5fcff3b2ec7c51863a8d741999acae0ad3b675fe8bd6c4006fea6c4a84b423365f2eaa367f9a4fd61717377edb010c9bf7bce26f3aefb1d87e512dc1fdd4e28466e0a2aa592f6b8369fd55937f912d69e26767332224cdd4098910b5d0a9902675a7cdd95303a2ac2e9aa7459d4fa90f32683fc89f178bc2caf48c4c4341189dd635a3104172b59e944533a72fd08fe89fee372fb3a6a119b5ef90788446804c17f544dac21a2162d3252145747add9296f11a66530299ff5ef9b5f9644efaafc410572bbfe14c79eb5555d9f1903214b5227fae9bfcdede93a215ce24ab48ae807d9ff4e5eb6afa366f9bce88b3f22abb6ebea409541aff3419b0cea4e2239200a29ee70a041f765e20e44faac582864286d622487f63da5e16ab9c789578c1693dd5c8c7ab5509cb48a01ce6c5f278ddce8fe154a8dc065fbc21d7626954837c335d93fe5810b09755551a2ee90388368b80330ae4297822fa619725ca2a9b3dc9485942bacc87a47bc124afd6a5e3f9fc1d694902e3298d122c6bffcad66df5ed3c734a29fc3800d68a347f2996c17c0ad506afc1ffbba7eadc572febe292c6feb2aadbe6a4a2419a2f5900a62ff29606faf678ea33d7b4822294df57eb666e7e273797347741224f08791f8afc62d4c440ac57f52b1ad5ebab6cf5baac0294e1ee975f5cbffe455d8495a35e932922eb64a6106652be7f273d0d37789b5fff2454f7abfc3caff3a56b621a1424dbd3754d9f900b41b2cb426c074b1278f6f51a10d77c419263da416deeedd8d189cf4cfcfaa66c3aa2251f9e14ab395981359926f345b35ead68d2c8bc065ffba87cc1ef76009eb7ab2660f7559d7f972c7f3e3b5b52c0443409d8e07cbde41190d8bca659311a7687c640fcd8ce4fe6f9f4edcbacb54c704e2af784b4da457ebc9e15ad1da37eabe01ab2e9902786a9568278b9d39ab418ac311c889faa961663a249b1582f4ee16414d30eda84199b9ed70491788138179f5bb208e5495bbebb7e56669615d10d64c0fc4d3aa12025b56e084117dbc877a44500d9e9628a0266e42b55d7607130db47ce8525a3dc74d89be4f69c0202e1d5da0b91e4ebe6ed9a20d01489634c1f4c1708d68ecba6a241ad56c04495779bd517796b64c8408003cac4a411544b2035fc0d510233661a4ccb823e3c26fc684aaeedc08541e54b0434f60bc5c37d235a9e1cdf5fb426c30cf4dd77a7efa6e51abc087eb1e3054e4c00ebc91ba8b36a413243fc4b6ea458091157722a9d0212adfe34d294d0b87fffd9dee9fefebdfbc79f3ed83f78b67372ef78ffd34f3fbdbf73ffc9bd4f1fecedef7f7afc90fe3b7df6f4e9c9deceb38707a7cf4e4ff79fdc7f7a72f2e060e7c129a11f24228ae584b86976b63a9ecdc8252624c8a71defee3e1cd3bff43d79fb4d416338ebb4c3ec862d490c4927a8cbe1f1cbeffbfbfe6eee0f69d71816a186f8339a62a02f3a9112d94bf8828898381370f7eaeaaa863b4131feba8de377707fbc777f7fbcfbe9a723f7d7deee8effd7debeffd7bda0e5fd7bf6affbe307f8dd8dd8d0e6cb1f5ee7fafbaeffc79edfeade43ef8ffbf7fd3f1c68fac36ff6e9aeff87dfec81ffcd833dfb078dffa1fb6a77bc7b7060ffba37de0d90b8e790d8a1e1fa40f602d489b0f62ffaee9efb6e975afa7fb86ff6c67b3b8e808496fb6a970231ff0f4683fad0c9238f563c3f78d9ac6467e45b5f7f41c1417d0dfdfc13eb0afe2f7dd1ac9b55be9c91612a4a1b3583018d7cbfcab306f688da1a7370fa8e6c267ef98ad44e73425e3275226f2eb2772fba31987c33afc87eb4d96245ecd31308e05c925d595e9c2dcf2bf74a57ff414dc8776de6dc6f624b17401378134113540dfe3c9974f2da9140923c7a01ea9f353419ddb5ed017688dcf0923c0fd576a42dd7a4f297d36bd5a12f60f2a07348475f1046cd97e43c5add26602ef28ac84a6ec684c967c15372036edde972b6aa28cd417e970624d40279a70ddedd645d9433d2a450d4e633b1334f22df2c8a0bc109c323ace55372f82f20eb1475f981df47f022c437a3dfe8cb66443fcd2770173a9f11de4dc560fc4fbffde6cdcbce47672fc9eb8a41785966ed3985fdfc318c397e21aa92d18011a7a1932e227f50cd95990ce20f04284aa0d7eb09cda5a3fa0637f2a3d7d7c4298b63d275174b02f84b","7ec9ff036bd412bf79170000"], [
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
  '"1D874A14DFCCF00"',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '8e62ba71-dee1-4fb5-b301-3b52d860aab7',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '654d0be0-db69-40fa-9c81-740ab0d5cdb6',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220531T034854Z:654d0be0-db69-40fa-9c81-740ab0d5cdb6',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 31 May 2022 03:48:53 GMT'
]);
