let nock = require('nock');

module.exports.hash = "37a08100ed6592cd54bb718b89d4b663";

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
  '518e4bd1-1302-465e-a88a-d334bbad0300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ApbszVJPtZZGuXPGAiijK-8; expires=Sat, 08-Jan-2022 09:00:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrM5DGBz7MCFk5t4_AK-BKGpOROmj8C8RcUL2FuaMLLlYiFCIL33ZIz3IGVBVMnRH_PCH6ch6_NMcuMSyaf7cQQsHCGDtPt204tjnLgGwFwerBrc__g54c5Rmou-_WcM5h83t3CpPECIYlhVVN5Ostf8T5lJMkIXuRs0H-brahuOAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:18 GMT',
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
  '8b939701-2336-4eda-ab78-39d23c880400',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ar_Cz8OAskpCsGRhT8tpass; expires=Sat, 08-Jan-2022 09:00:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrvd00eHnosgzpFq0ED0ae0ZSQr-8Xc0M76hqwu6NkzUQd2Md1OMV1Jm3Ymaj1eUMlSmtozOGoou2_h28bxoeCBm2SbneC4zlLv8LTLOzyeq7CvTVtAv9hJ757z8zkzH7QQDReGmYa89NwanVZnMsMwrkyM85HtKZj_N-JQFigzq0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3129b07f-aa3d-4ac2-ac02-2550b175bdaf&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'ce3fce6e-e1c9-4d21-a5ce-788a87a30400',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoPsfkcmuotPub0d7fiJ3mkWPr5BAQAAAKO8Q9kOAAAA; expires=Sat, 08-Jan-2022 09:00:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:18 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac51fbdcdafe9e3cbac5ce7bb1ffd92d147fe809904b71933c133a3bec0a8e935336cfa2aa7bee893637a9e3ebbff743dd9f98c3e2572acf2ba2d7246c3a0487f7ccffd456f9d12c2e957afe985ba2a31d0555d2cb2fa9a700dda7d97fa0ada35f9b45aceb8e5f769586dd6e2d3e3695b5ce6d48ababf2c1a7ab7585ebcd62f5fafa7d33c9fe533fabe583d2bca36af5fad4b6048489df3df2f329e8b9a3ec6b03382c7fd1fd3ab2b8cb6587d91356fe993dd7bbbe3dddd07e3ddfb0fc7f7ef3116cbbcbdaaeab780f93a6f09ec2ffe68969f67ebb2055e0ce769bebc2628d96a555ebfa99eaca9d3b3e5e965bec4649e2e67abaa58b61f3d6aeb758ebe008ae0dc8c5e595657f4c1307634f7f3aa69154084d7c6d90fd675be3d13f61ad358085edec18c70f9c5f221ff56e72dfd4a28bc2916f9d9f269764d1fef12f5339a797c7e52ad319c3defa3b319b5f9de473b047df72322da2a6be7718ca845aefd528366f2e8ee5d69b3bd6cb65dfbeddd4fefed3df8f4e1a7dbf77676f7b2e9ee74f660dce435c6315937e3ab6239abae7844773ffa25440762e196d8020330f009a55ffc91bef364ddfcc43a5f33dd093ff7e99b6a554cf553a6011146ff6cdaaace2ef2936ad966c59294003ed6ae0ca0f3ac2c27d9f4ed2b7c86fe54ee7f37f3058d57848c3e1429ff226f1a020b8106b733fde84b70077d6490c79ca20f41aa01518be674994d4a62f54704bdc9316cc53198cadf4df913bf3759f3a62d8f9bb3a63af8746797fa79f966f7dbd40f75bdcc99d35eb73513ee23f954c68aeef111fa204408616a13f442bc9bbfa8dae2bc1079e60f49b8df3e5dd7fc41a7d32f087c1b456591bd7b9a9724e2f5b5b2d6ee0efacd79b424d2f957abb2ca669dde9806847259ad676f2aa12d7088811b19998d13e39c34084f16bdfe8d0ee13ccf5a1240c2f6a317d512f3bb28966fcae627899b083e7dbc3bdea34f8959aaab7cf6ec17cd96cf0b52c0c45bf476f3760d8c94a55e4339b4455ee3f736839e84d29b66ab6c5ab4641176e915325624bbf8eb171b2bc31dff925f","f2ff00b1cdeee81e070000"], [
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
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11950',
  'x-ms-request-id',
  '3a702769-1ca1-4977-b2ec-df1047bdc63c',
  'x-ms-correlation-request-id',
  '3a702769-1ca1-4977-b2ec-df1047bdc63c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T090019Z:3a702769-1ca1-4977-b2ec-df1047bdc63c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 09:00:18 GMT'
]);
