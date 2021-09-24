let nock = require('nock');

module.exports.hash = "507b92ef1b4dd3c3465dc828fc8fe9c7";

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
  '6332f45a-4a68-47f2-bf85-b9e3f82b0900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AlUsu5XtgNFBqhQTVVSfvtI; expires=Sun, 24-Oct-2021 06:50:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrneh0XctFe_Mz6vjQ98hMGXp5Wc-O0duVaJNsXiiHq1kZiXXELobZFTUqX9b4sgcN8gPesIKaCdGQ-izDsxP6ZLuC3b8OtdeoJRmE45SfcFTx3wyFdJA5P65KROY1DZVXPTgy20KKkxNVJBhHlnsiwNow3hdbxwhjcgxHQ5MHZ-MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:27 GMT',
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
  '38719b22-bb0c-4fad-9308-c2ad7b400800',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Av7BqZu_OppIpG0xmznrCVQ; expires=Sun, 24-Oct-2021 06:50:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8zVrKUpSVXLl_xyUTSQlsCHR0XnJJ0d9e6DnQpDFJEP69snayfsCA0Q_D2-MxjVQx5Ml30hVMQ_uBI7Sja8sQNopCfZqgL4N3qREPLDJR6JonQ790ABUnGATu-Z6IWK3EUZ5H0v40wP6kzB-mIsgPpyIlOFN09AjF77TegN2Ip0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:28 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a359fda9-b89f-4bbb-9a89-167523bbf9c4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '6332f45a-4a68-47f2-bf85-b9e3fb2b0900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqH5EIqDN3RInSCjtx8DodIWPr5BAQAAADVs39gOAAAA; expires=Sun, 24-Oct-2021 06:50:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:28 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedddbb77f73f1a7db4cc163921d3fdb8bd5ee1e31ba0a16176d17cf4e817ff92d1476535cd30147aed346bdaf4abd7f4754edfd307c7fc3c79f2a2f889cfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d60bf5e4fa7793ecb67f47d9bd51779fb32d28abe9cd639fd3e3b6ebf6aa7f4c9decedeeef6cec3edbdfd373b9f3edad97f746f6f7cefd3dd7b3bfb3f458d2fa8e95576fd550df4e66dbb6a1edd0d2763cc886d13eae365deba575ee517d475566e78753b2782af9bed9ddd71adad7bd05655dd6e04329616bd1767f9655e62be5ef2f79b20d8a63d200bcb3bc4489b40b8863d18cd74b1e94dfabaf7cabc6a5a70f849b53c2f2ed635b30a31ddf77eb1e1709adb77d7da52992b04db05992fa71531c709f897998f5e59aecb72f4d1dbfcfa27b375d99e9174cb2753d7e865d63457556dbf5ae617c4bdf4c54959d0600370e759d9e4c1dbe6ad597e8e1e5e37e513626662c78f1eb5f59ada92f02fdba2bd1668510c5eb3e6a0f13d591784e492c6e27f4b7cbd26cae0b55ff27d621748dcf4ece5f16c464aa781a47e8f587c7cb04f4c3ddebb7fef2334aa8b4b7a37680500a38fb2d9ac00adb3f2b9aa05fbd56551b7ebac7c91b7448fb7c1cc9826d375d3560b9a1a6225a3259c2afa2e0d9de4f8181313eaa5f1e7840d89ccf8753e5dd7448e31c168ab695536e33765b3bb43a37f06e2d2d8bf0978bbdf203c9ad37b1f8edf49b1222d49d8915d29f3a779b3fbe9c107037d924ddf927af590c5e03f1cd938dc0f276a1fee0711d703437a8194dbb749ffec596864fa42967e239ae545b544579e8c111f0b7fcf8a269b94b97660059e94cc4fd2e491209054346d9d15cb16acbf289684997e2530a85395d095ca9e937995cad3e56c55110482b5cca7102fed9fde6ddeae0118aa913025d95fce32d24d846db6caa644c38f1eed5233a355e4bdd1473fa02119","20ff0fb1a2b8d8c6080000"], [
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
  'ETag',
  '"AAAAAABBNiQ="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  'b72515af-98d6-4985-9d71-3f057af26495',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4759',
  'x-ms-correlation-request-id',
  '19248995-ac02-4856-8f2d-4d4e324005f8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065029Z:19248995-ac02-4856-8f2d-4d4e324005f8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:28 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service/myservicexxx5', {"properties":{"customProperties":{"Microsoft.WindowsAzure.ApiManagement.Gateway.Security.Protocols.Tls10":"false"}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e8f57c517d932bbc817f9b2bddbe4f56531cde915fdedddbb77f73f1a7db4cc163921d3fdb8bd5ee1e31ba0a16176d17cf4e817ff92d1476535cd30147aed346bdaf4abd7f4754edfd307c7fc3c79f2a2f889cfe853427795d76d91e3d58f56eb495934f3bc3e5d644549adcfabeaf79c56cb967a1e4fab055e304d5e08bad4823e5d566d715e48afaff3258ddf40c856c5e262d16e2fab3a5f95d7bf273e1e5f15cb5975d5643f58d7b9810bba35f47ab1bc78dd662d60bf5e4fa7793ecb67f47d9bd51779fb32d28abe9cd639fd3e3b6ebf6aa7f4c9decedeeef6cec3edbdfd373b9f3edad97f746f6f7cefd3dd7b3bfb3f458d2fa8e95576fd550df4e66dbb6a1edd0d2763cc886d13eae365deba575ee517d475566e78753b2782af9bed9ddd71adad7bd05655dd6e04329616bd1767f9655e62be5ef2f79b20d8a63d200bcb3bc4489b40b8863d18cd74b1e94dfabaf7cabc6a5a70f849b53c2f2ed635b30a31ddf77eb1e1709adb77d7da52992b04db05992fa71531c709f897998f5e59aecb72f4d1dbfcfa27b375d99e9174cb2753d7e865d63457556dbf5ae617c4bdf4c54959d0600370e759d9e4c1dbe6ad597e8e1e5e37e513626662c78f1eb5f59ada92f02fdba2bd1668510c5eb3e6a0f13d591784e492c6e27f4b7cbd26cae0b55ff27d621748dcf4ece5f16c464aa781a47e8f587c7cb04f4c3ddebb7fef2334aa8b4b7a37680500a38fb2d9ac00adb3f2b9aa05fbd56551b7ebac7c91b7448fb7c1cc9826d375d3560b9a1a6225a3259c2afa2e0d9de4f8181313eaa5f1e7840d89ccf8753e5dd7448e31c168ab695536e33765b3bb43a37f06e2d2d8bf0978bbdf203c9ad37b1f8edf49b1222d49d8915d29f3a779b3fbe9c107037d924ddf927af590c5e03f1cd938dc0f276a1fee0711d703437a8194dbb749ffec596864fa42967e239ae545b544579e8c111f0b7fcf8a269b94b97660059e94cc4fd2e491209054346d9d15cb16acbf289684997e2530a85395d095ca9e937995cad3e56c55110482b5cca7102fed9fde6ddeae0118aa913025d95fce32d24d846db6caa644c38f1eed5233a355e4bdd1473fa02119","20ff0fb1a2b8d8c6080000"], [
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
  'ETag',
  '"AAAAAABBNiQ="',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '96397827-9504-421e-a20b-761ba55bf66c',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1197',
  'x-ms-correlation-request-id',
  'd0c0c06e-f1a1-44ec-86f9-1e62c5ae6eba',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065030Z:d0c0c06e-f1a1-44ec-86f9-1e62c5ae6eba',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:29 GMT'
]);
