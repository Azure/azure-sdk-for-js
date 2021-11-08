let nock = require('nock');

module.exports.hash = "fce818aafeae983ee9f8248fc2c124fb";

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
  'b44fc6d0-9744-4056-b74a-8e6f80260500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuGJnyXT8ilHsq9r6f5ebZE; expires=Fri, 03-Dec-2021 09:07:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFWmEp2k2QJuPBjYgUrTH4cVSPhVrF4-HZ-RlhXuTiXqLAqz-nicjABrZKjndRjakDxxi7K6p498tsh7qUvcJbzcOzSo7NehuzndzE2vw93cCKnQK3qHnKKH2qCoufMMZcE54CVBPE0rdnRinAekKQ_iTVbFFkbSzkAJ48I4vX00gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:06:59 GMT',
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
  '342d5fbc-e9cb-4f96-b790-c971463f0500',
  'x-ms-ests-server',
  '2.1.12197.4 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiIW6nm6FU9CkUyhx3qxZpc; expires=Fri, 03-Dec-2021 09:07:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6or6qJ9CcSMt-O6GzR2PPB1pr7kqgucPtpcIO1hza1tYcxjKmEQvSbyC-Lv36zRSrBz2OD4JtvkXG9oyPuSFPpjf2NCVhixe7Luk4O0yYG3OHK2TMX9_iQULtLTgUJmxxpQIS_Z1hHBoLV39lHva772uyQP_CsS414UMduACFjsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=fa2d0569-4368-434f-a1d5-029086ba364c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'bfd66bfb-5435-4e98-9043-de5d44bf0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Apb_NP_jwdVKkBFnehAPfEIWPr5BAQAAADRIFNkOAAAA; expires=Fri, 03-Dec-2021 09:07:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:07:00 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ServiceFabric/clusters/myclusterxxxy')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947edf52affe851fad117c5b4ae9aeabc1dbfceebcb629a3fcb267531bd3b2dd74d9bd7cd47236e5e56d3ac2daa255ec9b3a65d9b2f8a193ebadbac27cdb42e5668d3dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd2fea6abd6aee2eae7f9a3a6cdabbabbaba2c66d4f5dd9b70a377f4d777efde5d2b42cb6cc1038b7d97b7d905befbeedddff7a34fef3d78b07b7fefc1deee837b3b0ff6f676f67fdf8fb459734def2d9e666d468d995cf4e1b4ceb3369f3db9a6cf3e3acff61f64bbf776b6cfb3fbd3edfdd96467fbe1747a7f7b32fdf4fecefde9c1fe83fd0702cc7ff38dd2fc78b52a0ba567a7d1718b067b3b7bbbdbbbbbdb3bf7deec3c7cb4f3e9a3fb9f8e7776761e1cecdefb6467e7d1ce8e7dada4b9f8a29a15e7053ac0bbef855af8fa26fcfc96b74512affe1206f0114dea2aafdb226fe8554352faf0b268a8976279f1baa5e1d3771fbd5e4fa7793ecb67b66b9dc733e6b407f7f777b3fd87f7b6771f7c7a6f7b9f186dfb607fbabb3d3db837cda7f7f676f3d9fdee9b27d52cff49e217ea09200ec67be3ddbd7bf7c70fef3f7494d4b6168fef66454b783dabea17f4bab23bb55b64cbec225fe4cbf674395b55c59289316fdbd5a3bbc4902702662c42329e96d57a96ad56e3ec07eb3a1f4fabc5a3dd873b07bd6ebbb01a02a6201ae1fdf30cbcefe0dcadd7cbb658e44e1ade9334050de10473728eb9cedfccd78bc9aa261c3045dffbfe60c3936ab1a8962f48ccc28682e0ebbc05d9f82bf92235f38dc78ae757ab8b3a9be52ad8062d3c1fadb29a1a6148d4d002c1e301c2638111c3beaccaf26c492f5d66f4f3753ead96333b69e6f988be5cf31b9f0a779ae797b83fbe6f7ed5cfecf8eabc2cb2495116edf5f3fc322f01e675515ee6b5e9e6a325710a842840dc43da22bc6c772f17e6353c86ccd572994f217886215e56359882986667c76f0f26f99c66e32abb8e347de03725f633e28c2640cec3891a346d569bb7f7a81fbf23fa3a5fcef4cb7bf4dd8efb4e645b9e8ff2d59ca4a2ce4ab4dddcc73e6138d8c7a7fbf4a5fb2ee8a3685ed6c522aba1e8da7a9dfbdfcdd67577769ed4d5f207216f5d2ece9684ca724a6c4cf243adeefb5f170dcb7f993718c1795636b9f9b6cb0eb322bb58564d5b4ce99daa269d703c9d0226cde179013363094083f71b4074e86b86e090236dc843a346d4fbef95638c6a90f07cd4304b6f6840dab425dec967d400dd500bd35388207db1ebbd3729ab89612134066741fd00bd31be246d432ae7aa58ceaaab66bcccdbbbdedbbf689daff3c1d7f9db8defb7d9a41c7e9fbfddf8fec0a8f7004a45dcb0d0476bd13964c6982ac7ebb65a90584c0db88fb2cbac28d1a56a71351ae085a8384f0992b6a12671c382e7a366bd5a117b9fbe5b15f5f557ed14ad1fd2b3bdbbb77d6ff7cddebd47f71fd2ffc6f4119ee0dd7c79591023c3e2e0b5ef0a1d746c343af9c5f2a50ef2bbd9250f123f45d751c3","5ff2ff0081fcc8c4fc090000"], [
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
  '11999',
  'x-ms-request-id',
  '3b11b7a0-5927-47dd-b1a4-a64d31b9f961',
  'x-ms-correlation-request-id',
  '3b11b7a0-5927-47dd-b1a4-a64d31b9f961',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T090701Z:3b11b7a0-5927-47dd-b1a4-a64d31b9f961',
  'Date',
  'Wed, 03 Nov 2021 09:07:01 GMT'
]);
