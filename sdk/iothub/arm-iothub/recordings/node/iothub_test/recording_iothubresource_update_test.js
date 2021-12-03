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
  'ecd311d4-8e69-40e0-8cc8-6290d8be0100',
  'x-ms-ests-server',
  '2.1.12249.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Aus7OfZK9lhIvwd8NhSstU8; expires=Sun, 02-Jan-2022 03:27:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNuP-rYpC8dFzIn1lhZog4ojuDD_okrfy0YmOICDdjtjZwgB0hpi89XIonYtzxoIFGgRmVRZlMHCm8lL8z5P5jnIwrsOCG7YCM-wSzHYg6TfcPLnR75_-_uGlNY7d643XMl0OwsUphqlkOxQtKJxJNk3yws_CzT00OvLP3AdpmpcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:43 GMT',
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
  'eb92b564-1fb3-4221-b0e7-177b9a6b0100',
  'x-ms-ests-server',
  '2.1.12249.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsBks4nk8NNKjAH1SzvaEFo; expires=Sun, 02-Jan-2022 03:27:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevri6fq65PNw4ucWNrGFNKDnj7rYaJmcaA7lDGtj8WBWqGN5UfymRv6acDuNo8z1CPH0KysJA2KzKG051ARhxWCHuBBIlOn2VKCK1oMavLsnIyh8OmSwVnf-_-JKqJUKVIQrByDmIuMm2gGa8LGFmVCGimgktH2K8ykQiR2gzKpmmQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8f5962c1-3e88-40c7-85ef-8da7b1c9bcbc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '286f026a-4e77-4472-873b-fa6ed28b0000',
  'x-ms-ests-server',
  '2.1.12249.16 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsYKWRyLMKROiEuCmVWeYEsWPr5BAQAAAK-FO9kOAAAA; expires=Sun, 02-Jan-2022 03:27:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 03 Dec 2021 03:27:43 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Devices/IotHubs/myiothubxxxxyyyjjrr', {"tags":{"tag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9fe697c5346fee9e55edb7a9276a5c54ed7c3d7947cff5f5f54fff745d7f34fa68992d724226fe657bbdc2978330a949594d330c809ae559d3aef1599b5d341f3dfac5f8b94b9f5f66e53adffde8978c3ef247cc34b8cda009a019f605864daf9971d3573975429fd06f4483555eb745ce7d1bbce88fefb9bfa8e52961997ef59a5ea8ab12a35bd5c522abaf09bfa0dd77097ed0aec9a7d572c62dbf4f4369b3169f1e4fdbe232a756d4fd65d1d0bbc5f2e2b57ef97a3d9de6f92c9fd1f7c5ea5951b679fd6a5d024342ea9cff7e91f104d4f431869a113ceeff985e5d6184c5ea8bac794b9fecdedb1defee3e18efde7f38be7f8fb158e6ed5555bf05ccd7794b607ff147b3fc3c5b972df062384ff3e53541c956abf2fa4df5644d9d9e2d4f2ff32566f074395b55c5b2fde8515baf73f4055004e766f4cab2baa20f86b1a3f99e574dab00220c36ce7eb0aef3ed99f0d498c642f0f20e6684cb2f960ff9b73a6fe95742e14db1c8cf964fb36bfa7897a89fd1cce3f3936a8de1ec791f9dcda8cdf73eda21e8bb1f11d156593b8f63442d72ed971a34934777ef4a9bed65b3edda6fef7ebaf7e9fece83fbdbbb79b67fff617670301b37798d714cd6cdf8aa58ceaa2b1ed1dd8f7e09d181d8b625b6c0000c7c42e9177fa4ef3c59373fb1ced74c77c2cf7dfaa65a1553fd94694084d13f9bb6aab38bfca45ab659b124c9c7c7da9501749e95e5249bbe7d85cfd09f0afbef66bea0f18a60d18722da5fe44d436021c5e076a61f7d09eea08f0cf29853f4214835206ad19c2eb34949acfe88a0373986ad380653f9bb297fe2f7266bdeb4e57173d654079fee4055bc7cb3fb6dea87ba5ee6cc69afdb9a090701a74f65ace81e1fa10f428410a636412fc4bbf98baa2dce0b9167fe9084fbedd375cd1f743afd82c0b7515416d9bba77949225e5f2b6bedeea0df9c474b229d7fb52aab6cd6e98d69402897d57af6a612da028718b89191d93831ce4983f064d1ebdfe810cef3ac2501246c3f7a512d31bf8b62f9a66c7e92b889e0d3c7bbe33dfa9498a5baca67cf7ed16cf9bc20a54bbc456f376fd7c04859ea3594435be4357e6f33e84928bd69b6caa6457b4d5dd22b64a14876f117d906312ddcf12ff9","25ff0f554a824313070000"], [
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
  'e2bacb2f-403c-4df6-9878-bfca6b73674f',
  'x-ms-correlation-request-id',
  'e2bacb2f-403c-4df6-9878-bfca6b73674f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211203T032749Z:e2bacb2f-403c-4df6-9878-bfca6b73674f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 03 Dec 2021 03:27:49 GMT'
]);
