let nock = require('nock');

module.exports.hash = "7b438c529ee288da48a192b3e47abd89";

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
  '79bca180-7e9b-4281-95ff-85b4c2822600',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ah_MqMpDnahFs1yDyNsCg5o; expires=Fri, 26-Nov-2021 06:38:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0gw0h-EMnMKpT3ZHczRK_lC-5T7TYEsHHM9Qa8OP1OO7rxW0yd4CYO5AIeh9zvCeJKogTfWBnyT85IpoJPBxMdhG598GDM9eJFj-exoWzdLpTyckfbvU-21o0ZL5o1TFeUdyQ1_KVjlkW4i3BUdW3JmhFpjCld7z7-JUlH1bY7sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:21 GMT',
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
  '8579ae79-88f2-4484-8e23-a1e44fe92700',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AqF1BTSUbyxMnpqyc5stFUc; expires=Fri, 26-Nov-2021 06:38:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrY6-zoSXuUiufqAc5czwZVXZn3HxwFUOOiRkX5DllSFjCKOAiypjMX_Ehxh1O06-alUyjixfV_h3z-8VO-EgKUJ03wLG5_9mOD4U-ba0lMd-OA5fsFRRiZliyqtf2xu2odILGSTJ784gUx9yMpPZk19koc9oMg0UoWCiy9utRE1QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:22 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f6ddf4ed-6ebc-4940-a31b-208f685dccde&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2098487b-0f48-41e6-8c25-f80fe1cf2700',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AijRs71H4BNAiXpQZBOGjcsWPr5BAQAAAN7qCtkOAAAA; expires=Fri, 26-Nov-2021 06:38:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 06:38:22 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerService/managedClusters/myreourcexyz')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227e7192a61f15b38f1ea51fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fca2aed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3936ad966c532af5fe7f56531cdef2eb2657691cf4eca35bd444d17d775ced0de5dffe0a311102bab69066c805e9e35edba91cf97d922c767fd37daeb157fb3a1db2fc26ee53d427895d76d9137f43688c21f5d160df55e2c2f5eb759cb705fafa7d33c9fe5337e8d1a55570459bfe5f7d28fa6d50c7f7df46abdc4bb1fe1d35f22cddfae2779bdcc89463f495d136cb4db1defed8c1f2ac0d9b27959e7e7c53b7c93bd6d7eba69666ff5bbf35f34e317ccc7342be7b3dd4ff7a6e3f9743516028db31f2cde1e34e3a2d297b21facebfc6555b759f9ec279ebe88bfbfe2ef3782b9c897edcbaa2a5fd6d57951329dbe876f74d46e52083a379617e98b69b5a6bf1ea5bbe683cbc5ebe207dc9628b79c65f5ecf77ffa7aeff7bfdcb3af54cdd3a2798b569f3fa176bb7b07e1376fcc34cb5cdaf740df326ffd265fbeb6df2eb2772fab1930dfdddd311f1a8ef9c9a26ed759f945369d13b7bc9e6665fe3a6f853de8c1cb2766203bf6ed45b1b49f9acff2653629f3e3755b010a38e051dad6ebdc7c7f1bc642b33e6bd1a731e632ec455f57f5744e0258676d550fb018b55a2890d7d724020bfb71d518a23d2f96eb77dee7af7fafaff0f157131aeada7ebe2430670b9a00afa7e3dfebb5b4dade3dd8d9273ed89b1a019c6defedeced8e7777c6bbf72c0c21d6b3b397afe9edf3ac6c72fee297e0dfef73a38f1a11dc9775b19c16abcc7020b517aa7c342d0be2b733d662e7d9fe836cf7decef679767fbabd3f9bec6c3f9c4eef6f4fa69fdedfb93f3dd87fb0ff80892624e331bc522df6794d5a0c40be38f9fd8d2aa35f9c8ef9fd4538047945fdd593e3137ac74ef04724de5755fdb687a5f9bc5c5f144c2a302b7d28d0a0ecb2d993accc96539af6b76bb4a0d967f18835e9c2a7591561f872dd4e882567672fc1e9fa2511893e6336950f64f8f4797e7e9e4fdbe2320fdf13d9b6d24d0d3fdc4a307dc9246ca66ed478bc10e2dd5dad2765313d7b793c9b11d4266feedebf379d3e383f9f6cdfdbddb947137ebeb33d991d3cd8beff209be4d9bdbddd83fbe73ce1f43057115ff10fa500c9d9eca498d5181cb1e6defefe7867bc7377f7534374653faf0dffe7b5209dadc6e5eca5d76477c736a8a66ff3fa495dcc2e1c9c077be3dd0768e641aa740e8c1cfa13ce8310a469aadf1d936cb142c66c198df451a65aa7cf1f1f4d04ce76532c8a32abb7c1f9db62b8a911090ec99ec1237fb722cea33ee98b9a7eab8c9240cfdbf962d55e6f4fd6e5dbed19d42d3aa141fb4d2eea6c9a9fafcb6d32b1a423d98a6f37f9142d3fdd099a321e3ce7d021db6d216664f77ed0675b9181da5e2feb3c9b5d6f93ad9ed2f089ddd174ffbe69b9ccafb6693eb71b90607bbd027ed935daeca8d4128ddf768019c9f8c868a58fe4f55975b51400dbd9398d633b9bb108ecee58cc061ad2ef962ab6df81b6e75951928546e37b31b8a4e7d92e38c244bb378331adf6e2addaa22c7e20b3d1ce4982e655c963da195b1a52f3e576b124dc2eb312dff963785bac78c29aedaba29d6fc3412bb71b32363a150117755b376c6e3041cc7150993e538b6caba41f93396cb8d929abd9195a7243020be5c85c6d9d8e2759534ca5df8fc88b63c67d56e70c9fa4fe97","fc3f405f4a4ce80a0000"], [
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
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211027T063823Z:d2f8a451-26cb-4a00-8f39-3ea8d79cd7ed',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11932',
  'x-ms-correlation-request-id',
  'd2f8a451-26cb-4a00-8f39-3ea8d79cd7ed',
  'x-ms-request-id',
  '7f239c94-321a-4c75-acd9-66bde39ede13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'nginx',
  'Date',
  'Wed, 27 Oct 2021 06:38:23 GMT'
]);
