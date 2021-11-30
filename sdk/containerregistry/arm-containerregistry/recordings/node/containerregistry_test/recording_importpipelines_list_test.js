let nock = require('nock');

module.exports.hash = "b2eb479644b403de342c6dc257e1f896";

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
  '561aaf9e-25b5-44db-9d11-585d2c240500',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApnQl6akY4pKqRS5C_HosAo; expires=Fri, 03-Dec-2021 09:46:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSqEBOhOEU7VTFEMNe-p-TZkqKc1OwXKvmpVUx2nfKKBEwlCEJT1CgaHU4oMvFgbtijXYrDRKf3nzANjIk3DPKGJKHuS4X9hf3zARumFFyT14MedUsD0Ah8xwF7peKlIs_V1PVh9Gs4sS5zxCavvz-TpePqhsDDeJIHNmkaVYpgkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:18 GMT',
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
  'c62deb8d-f9b3-498a-868e-f4d0b57e0600',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AnK3rRL8xKlBpbwC2Mtp2os; expires=Fri, 03-Dec-2021 09:46:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrj-MsHQEV0wl-D5NA_RVqwwFCoCujr6KjSRjM-CsD_LiQb1P0OF6qzulTontXuGX9raa59ty8NKVJtZkjHe-xv71jHh1s3wHpt5w5msVlTwbWQE7BAbia1b1BFDvJHB1Wx6CtkUpLQACYnU-tLNlzLYlzhXJpeA9pS6UCfNybO1ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:18 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9b94c02a-76ae-48d4-9fa6-4f54d834b1e2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '561aaf9e-25b5-44db-9d11-585d30240500',
  'x-ms-ests-server',
  '2.1.12197.4 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Alecmtub5BVLn95BoYaC7OcWPr5BAQAAAGpRFNkOAAAA; expires=Fri, 03-Dec-2021 09:46:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 03 Nov 2021 09:46:19 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/importPipelines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc517bbda25f3efaa298d655539db7e3936ad966c532af5fe51745d3d6d7776bf9a5c89bbbc56255d5edcb629597d4a4f968f451594db3b6a89604e3f4f8f59baf5ed367c52c5fb6457bfdd1a35ffcd1aa2e96d362959567336ab27fffe1a7b3bdece1f6fe4136dddebf7f7fb23df974f7fef6c3bd2cdbbbf760efde747f8f00b4f9325bb6fcc683bdf387070793f3ed834fcf77b7f777b3f3ed87bbd9647b6ff6603adbd9dd9d4df61fe00d194673ddb4f9e2b8698a8b653efbe8970017faf86eb39e34d3ba5801d3e6ee4382797f7670be7d6ffae90382b9b74f30a70fb60fa6e73b047572beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7f9a4037eddd555d5dd200ebe6ee2d69b6b8d63faedfbd7b777ddda5217d2f9facf4136a45035a660b0c28fea50cf369d66620f1b4ceb3369f3d217a7f749eed3fc876efed6c9f67f789c0b3c9cef6c3e9f4fef664fae9fd9dfbd383fd074c2efbca1ba1dbf16a55163a91f6dbe396bed9dbd9dbdddedddddeb9f766e7e1a3fd4f1fedee8df7eedddfdff974ff939d9d473b3bd4becc9af68b6a569c1700492fdd128bf0bd282a7e935be243934e73b4caeb96a80ffac83ce237e592e31facebfc755bd5d945fea4ac2676faa8c3755d508b79dbae9a4777ef66d369b55eb6988cf1845a8ea7559d8faf8ae5acba6ac6cbbcbd3b35efa20dbdff36bffec96c5db65f057016d797f8702cff66e89fdf6e72a275db503fb5cc739335180071cec505e143380bf66fbc0fdaac5dd3c03e3a5d6693125c4e2f54c2da24d21f7d7999d75775d1e66fb20b48e8d3bcccdbfc3583c168bf5cbe5e4fa77983ef30f262b9cebf5c9ed67555371f7d9f8977593404ad585ebca6be40317e239f7167dfff25","ff0fd9bb11f540040000"], [
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
  'api-supported-versions',
  '2019-12-01-preview, 2020-11-01-preview, 2021-06-01-preview, 2021-08-01-preview',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-request-id',
  '9d03a84e-32bf-4ab6-9408-dcb07761b0b3',
  'x-ms-correlation-request-id',
  '9d03a84e-32bf-4ab6-9408-dcb07761b0b3',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211103T094619Z:9d03a84e-32bf-4ab6-9408-dcb07761b0b3',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 03 Nov 2021 09:46:19 GMT'
]);
