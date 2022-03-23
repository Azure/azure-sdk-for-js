let nock = require('nock');

module.exports.hash = "f8d249d490a5433bffcb49e95366dda7";

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
  '17f397b0-cc05-413e-95af-cd76d33c1f00',
  'x-ms-ests-server',
  '2.1.12529.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ai5xoQoJXARHg17TCF9up_4; expires=Thu, 31-Mar-2022 06:23:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrn7QzjsQf11-pW3gYo6mFOzX0zsit0Kuf90CkpnkaFcI94A-ndbfSRYBq7BSnre1L24MGpP8FOoz4Ye5-jyvl1DG6xbZKxRWtdLMtnoqaYDJ9yTLUkklTi7h1X4wPD7aWetNuAGt0jtT0fItr_dYy4By_J4K1qD8PahvkjXzedPMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:56 GMT',
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
  '17f397b0-cc05-413e-95af-cd76d53c1f00',
  'x-ms-ests-server',
  '2.1.12529.16 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AiP1wEdvBC1AnIoOWEd76m8; expires=Thu, 31-Mar-2022 06:23:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrI1IH2K2DhID6w6l9yonUunxUVtifKoOPh_mXSn58j4YbsAySTJLLvycFExyBDM9SdAhioxD1Rv8VpsVAecCsmtiE3tVBgslFwaIT-nzYeFxt_HB-nDh8esXbmp_Gmej7VUXmp8OMW6D57cs13AOf5_Zu-2U_A0rG0Vox9-Nh6f8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3e7f9950-2279-4692-9c8d-b63af1de83a5&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '68c52ac1-0210-4f9e-bb6f-e999ac5b1c00',
  'x-ms-ests-server',
  '2.1.12529.16 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkeTPkMEWsVDvISjxNePmXDLj78gAQAAAPyyr9kOAAAA; expires=Thu, 31-Mar-2022 06:23:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:56 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring/myservicexxx/apps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1aaae5679dd1679f3d1a35ffc51369b55cb936a795e5cc8dfab55594cb3b6309fae6bfee3755e5f165382f08b7fc9e8a346fe78955f144d5b5fe343fa74b59ed0ab1f3d3acfca26a73febeab268e8d56279f1bacd5a7af7a3d7ebe934cf67f9eca3d147e7bf68b6a48f16d70aedddbb77e3ec07eb3a5f14d3bad20f9b715151db79dbae9a2f972575a5d0db7cb1aaeaacbe7e5a346f09818f9ae207f9d9f2f3271f3dba3ffa6851ad97edcbac9d530777dbc5ea23a097d70da19b2fdbfe2b3b9d575c5bbc992fb349999f2e676f2afcf3fcb562415fb5d72b8ceb0b46b93a6fc7c7abd5cb326bcfab7a71f7f5aaa6b1df25923634866246e08a9686b05c97e5e8a3b21232d3eb79d6b46b69437fdd6dd693665a172b7cdbdc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9bbb8fe69c2be69eff224cc68347737a2e84f02e34b9fd00ffa8b905a660b8cd1fba4b926e88ba7599b818cd33aa7d99d3da1917d94ef6484d13d42f1d3dde9f6fe6c776ffbe0fcd3e936a1fee0fececeeef4fe342300f69537423f42895847c861bf3d6ee99bbd9dbdbded9d7bdb3bbb6f763e7db477efd1bd7be3fb0ff7ef7f7aefc14f51d39228f745352bce0b40a3f6b744207c2f8a85dfe466547ec92ff9fe","2ff97f005fb6a0a666030000"], [
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
  'Accept-Encoding,Accept-Encoding',
  'x-ms-request-id',
  'fd95b062-f799-41e6-9045-99d79a7fbc6a',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11998',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  '9d00189f-d1c6-4f64-a2ee-5f2d96cc1361',
  'x-rp-server-mvid',
  'ebc692a4-c2cd-44f5-bba2-1b5e5f04cb14',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  'fd95b062-f799-41e6-9045-99d79a7fbc6a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220301T062357Z:fd95b062-f799-41e6-9045-99d79a7fbc6a',
  'Date',
  'Tue, 01 Mar 2022 06:23:57 GMT'
]);
