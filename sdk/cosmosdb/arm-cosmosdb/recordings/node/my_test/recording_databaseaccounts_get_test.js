let nock = require('nock');

module.exports.hash = "1ca66fbbb001f403eae3f3e178d6faa5";

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
  'e6415b90-59ac-45e2-a118-6f0e76dd0600',
  'x-ms-ests-server',
  '2.1.12071.7 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnumYxZzLYhBrlvzr4rlNhI; expires=Mon, 18-Oct-2021 02:39:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_FBVWI658hoDeuYKX83BN-Oa8stSR9xgJj5Uavi0ZSl6gkhd3MstWpj10GEHQT2-qJohgq_X_eTJudxJNUBtoM4p7kdxeWauPe_CDcvUU5cTfIT6n4Kfdz2IsxrRjUcutPMvjscaii-AtiWB4dwngq7yA2MTNFQ26H4YuuwgwWMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 02:39:36 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '2e7a69bb-6906-4241-9094-705b8ca40700',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AkDFK9lDn2hPr_m2YPnwC8E; expires=Mon, 18-Oct-2021 02:39:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevryoJFXBdEozpgl_Jx_1hobPrXGEVJSVb5E2EdLqpoCROygCnA_cY3WwBdVhyTKYaGlqJnDK009OFz-YlazjpMrYzimqfvcE7fsiNq5AamJZcvbt5ScBI9A48CKWWat9PxCPhvxBLL_nu5ZuUWOxRzM8EBzyQhj2P4wb4V41-V8TsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 02:39:36 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=748ec12a-1ab3-4568-9d15-a2e798a518cc&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2e7a69bb-6906-4241-9094-705b8fa40700',
  'x-ms-ests-server',
  '2.1.12071.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiNvqr7NE6hJvtnmMGw3GkoWPr5BAQAAAGhI19gOAAAA; expires=Mon, 18-Oct-2021 02:39:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 18 Sep 2021 02:39:36 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DocumentDB/databaseAccounts/myaccountxxx2')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f56d3f5225fb64f9fdc9d656d36c99afc783aadd6cb162f66f2ebbb77eff63e1a7db4cc1639a1d4fdb8aca619b0a3af4eb3a64dbf7a4d1fb6d72bb4bd5547d4fc6db1c4683f2fab4956baa6f44d9b5d341f3dfac5bf64f451734dc3583ca597e9ef8fa6759eb5f9ecb8a5d7f676f676b7771e6eef1ebcd9d97b74efd347bbbbe3870f0f1ed07f3ff511bd49035fe5755be48084bf2e8b86102e9617af5b0242105eafa7d33c9fe533ea71a6dd9f2e67abaa58a28379dbae9a4777438a8c4dc3669cfd605de7e369b578b4bf7fef2ec158ad2765317d91b75755fd96c69937d4f547a7cb6c52721f39ff76bc6eab05d16efa2c2bcaea32af3f7a749e954d6ebeff625db6c5aaccbf5b176dfe5cc94c8082462f331a19bef8bdf2eb2f68506de5c014cd4f1675bbce4ac5e45951b6796dd030ad2e8336afd625e8f4bdef8f0cbec7abe20d4d277df8d1eb5f5412f6b3a2c117d4e1139ac6d917799b614e194d3358852d383eabf3fc4dd11bdff1322baf69f859f99ab0ce2e6826f4fbacfbcd49b53c2f2ed6359300b3d84ce7f922035e84d677f3b27c9a9f174b1a15cd77b16cda6c39cdcf688c1fe5e7f983f37cffdef6f9fefdfdedfd9d7bb3ed6c37dbdd9eeede7f3079f06072901fec634c34008f29bf3c3fcf6b854e4cb29c6535e66d969f67342967339af6a2bda62f9f1575d3620eaeed87242942cae369f9e47a95811c1fbda896397da3a4c3649634fd733be229cd6c410cbe9c5ebfac887708f62f36ddd1e0cd77cff3cbbc2470af89c8a0c4e8a345f6ee6c49b37a999567cbd739c199517ff7f90bc2bccc97d4f4654dd479f7d1a3dd9d1da20fb571c4fc92f8ae26b5402f41caae3089400fdfd167df534514b0fef615e9933504d708ff0bd10ddfa5cf450118e1b8498a14d44661ba4160cf557a5ed64545d813e57688079a9f228abfca676b9a3b74cf74fe25c4d5a43866ffff1de0283a1c3208ed7c4abdd759191bd66b7c9f9e4883f71c5f08fb9b1de7de7b8e33cf406b02d5199f334c06bd1b8725a0bed9e1ec0e0e87f8d2a0fc239ecc78583fe2c9deb004d4373b9c8d3c699bc324b1fff47559d342b21d93258ac20ae78e5eedc08cf0451ff8de0070a120bdd201ea26a30f6b1794985635468fdfb25536294af2b9981ef449b1f29ca649367dbb5e31c1e8dd5f6c3ce19739c19b1553ea817c51fef58b6a96bf0c5c5379d799f32f8ae59a5c771ace3e49977cfb2a27470098bb66df26779f1a1d9826ea339909051e1f7d9e571ffd12b2ef5dd7e495060b67f01a80ffacc82e965543ced7f3eae275deb6c449f4d52f569fedd9ba2cdfe4efda9f58e735e0b25f03c0e442105aa0971db3","7ef7ff00dc57a20acb0c0000"], [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-gatewayversion',
  'version=2.14.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11408',
  'x-ms-request-id',
  '7790c207-08a5-4b22-a261-32ca89fcff57',
  'x-ms-correlation-request-id',
  '7790c207-08a5-4b22-a261-32ca89fcff57',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210918T023937Z:7790c207-08a5-4b22-a261-32ca89fcff57',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 18 Sep 2021 02:39:37 GMT'
]);
