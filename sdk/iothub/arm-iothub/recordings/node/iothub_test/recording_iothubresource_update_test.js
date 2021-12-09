let nock = require('nock');

module.exports.hash = "e3cd214a3cbe23dd7ad2cb121caa5d1a";

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
  '518e4bd1-1302-465e-a88a-d334cdad0300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhsIVc-G90ZNgFKPeoMgMpQ; expires=Sat, 08-Jan-2022 09:00:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3bzuo9p9RnTSinJkiHgYJx01PP9QG34DpwR13NEfFB0COPRVN38c9FxYe6CKDCDqOYxBku6WIZnyoWIDXB6PjEoeuboQvVYRpn-oSbgaXvw8c2FCJJEVobS2kpKFB9Hx6no1lV5WZbOWh8liMK840RJ9c8b1E2P73aAny6IIQBggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:20 GMT',
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
  '861ea296-1c2c-49dd-984c-64b1ae890300',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhGC4pgmbVlJhtCdzYzqTWI; expires=Sat, 08-Jan-2022 09:00:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3JbywlmOojj0auhcSAHIbAQo5tGXAmjGkTyJ6qCsvsV29cDYh_ManiCBqa__n-rBXV4BewbF_CTDtubuuNDcau8RjxAbu0Wve02jAcPiblgMg_kI-Af6Tqspi6Lb8JwCaRtUQ0_LTknHziQn79ulT2cHiDj5j3liFBhuBe3PbVQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:20 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=aa8caf65-e20c-4b2e-adeb-d325118ccd76&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '68d71f8e-81a4-42ac-abb0-d601d4a90300',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AnGBbVHJBJlOoJwJvWvC5G8WPr5BAQAAAKW8Q9kOAAAA; expires=Sat, 08-Jan-2022 09:00:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 09 Dec 2021 09:00:20 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac5f8b94b9f5f66e53adffde8978c3ef247cc34b8cda009a019f605864daf9971d3573975429fd06f4483555eb745ce7d1bbce88fefb9bfa8e52961997ef59a5ea8ab12a35bd5c522abaf09bfa0dd77097ed0aec9a7d572c62dbf4f4369b3169f1e4fdbe232a756d4fd65d1d0bbc5f2e2b57ef97a3d9de6f92c9fd1f7c5ea5951b679fd6a5d024342ea9cff7e91f104d4f431869a113ceeff985e5d6184c5ea8bac794b9fecdedb1defee3e18efde7f38be7f8fb158e6ed5555bf05ccd7794b607ff147b3fc3c5b972df062384ff3e53541c956abf2fa4df5644d9d9e2d4f2ff32566f074395b55c5b2fde8515baf73f4055004e766f4cab2baa20f86b1a3f99e574dab00220c36ce7eb0aef3ed99f0d498c642f0f20e6684cb2f960ff9b73a6fe95742e14db1c8cf964fb36bfa7897a89fd1cce3f3936a8de1ec791f9dcda8cdf73eda21e8bb1f11d156593b8f63442d72ed971a34934777ef4a9bed65b3edda6fef7e7a6fefc1a70f3fddbeb7b3bb974d77a7b307e326af318ec9ba195f15cb5975c523bafbd12f213a10dbb6c4161880814f28fde28ff49d27ebe627d6f99ae94ef8b94fdf54ab62aa9f320d8830fa67d3567576919f54cb362b9624f9f858bb3280ceb3b29c64d3b7aff019fa5361ffddcc17345e112cfa5044fb8bbc69082ca418dccef4a32fc11df491411e738a3e04a906442d9ad365362989d51f11f426c7b015c7602a7f37e54ffcde64cd9bb63c6ece9aeae0d31da88a976f76bf4dfd50d7cb9c39ed755b33e120e0f4a98c15dde323f4418810c2d426e88578377f51b5c57921f2cc1f9270bf7dbaaef9834ea75f10f8368aca227bf7342f49c4eb6b65addd1df49bf36849a4f3af566595cd3abd310d08e5b25acfde54425be010033732321b27c63969109e2c7afd1b1dc2799eb5248084ed472faa25e677512cdf94cd4f1237117cfa7877bc479f12b35457f9ecd92f9a2d9f17a47489b7e8ede6ed1a18294bbd8672688bbcc6ef6d063d09a537cd56d9b468afa94b7a852c14c92efe22db20a6853bfe25","bfe4ff01015db2a013070000"], [
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
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '4998',
  'x-ms-request-id',
  '288930d8-9e61-4914-a7d1-882eab78933d',
  'x-ms-correlation-request-id',
  '288930d8-9e61-4914-a7d1-882eab78933d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211209T090026Z:288930d8-9e61-4914-a7d1-882eab78933d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 09 Dec 2021 09:00:25 GMT'
]);
