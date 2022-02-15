let nock = require('nock');

module.exports.hash = "7ed101162609716b850536bba4bb022a";

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
  '2189fb2e-1297-411d-804d-5176a2301900',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjVDcwxF55VDucBYBGKcZs8; expires=Thu, 17-Mar-2022 09:32:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFzo0nydvzlVFIi4tpk3G_iygL__07I3QqHQULoYcn0VfmsFC2fMaI4rjLWx8lyFRbhyjCXNdTBF8S9kzDT90k-nifjQxpJxeFZonvjMaTTk-oa8cezoUANTqaoa9g_ZPXHCmgWfu7jCJ0kz1mK40tY-vMmlTmaSSr7YXy-tAXpggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:32:38 GMT',
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
  '4696e003-6b80-43c2-915c-43b98c6c1900',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtuKeHJH4xNHgFiSinwtGkk; expires=Thu, 17-Mar-2022 09:32:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrldBwtAr_oQfBokDlb_TmiNJOUN5iQ-mGD8wnwBpq39-iENMdall4b57xIkWH4ku0sBRDogGujxO83BRv0IAzxvQatC4UkILH90ky_WvN0OpgTiXzsDfcbrMHfl9XNlDDUlQMhtgsBwbe41Yvsz2m9jCHz7D9sUa-tWJ_QWn3smkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:32:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ded0a626-aacc-447b-bab3-e290014369d9&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '2189fb2e-1297-411d-804d-5176a3301900',
  'x-ms-ests-server',
  '2.1.12470.11 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqT21GxEahtHoaweS-odzGfLj78gAQAAADdqndkOAAAA; expires=Thu, 17-Mar-2022 09:32:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 15 Feb 2022 09:32:39 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .delete('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts/storageaccountzzzxxx')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'text/plain; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-request-id',
  'c505f276-8ab3-4d19-95c4-1ad6400f8d28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-deletes',
  '14998',
  'x-ms-correlation-request-id',
  '741dfdac-26e7-4cba-8924-ca8fa192407d',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220215T093249Z:741dfdac-26e7-4cba-8924-ca8fa192407d',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Feb 2022 09:32:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Storage/storageAccounts')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc51f376fdd1a35ffcd1325bd0df1fbd6eb3e52cab67bfffe7af5e7f34faa82df2dafbf4a35f32fae86db19cf147559d5de43fb947ad0a7c70b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7ce9b6a5d4ff3cfeb6abd6aee2eae7fba69f3a6bdbbaaabcb6296d7cddd2f8a695d35d5793bd60eef36f2f3783aadd6cb162fe927997cf2eedd3b42498713ffb2bd5ee1cb1b6153d3b29a66181035cfb3a65de3b336bb688864440bc27395d74424fcfdd1dbfcfaa4ceb9f99b02ddf347bbf4eadecedeeef6eedef6cec3373b9f3ebab7ffe8dec1f8e1a7fbbbbb077b3f4500a9d5de4dadb8b7e2326bf3d3e56c5515cbf6a45a2ef3297aa3debff7fdd1478b62592cd68b3765f393443afa9c60be79fe7af7f7dfa13eb2b2acae9e94d5e4e57a5216531a62ded07b6dbdce895a797b55d56f8fa7257df48b3f9a5caf327cf9d1f10fd675fe3aaf2f0b6a4d402e8bba5d67e50b69fe6a5dd2a7dc75b1f2fe98e5e7d9ba6c8f19374041d71840b35eadaaba6dbeddb6abe64d9d9d9f17d32f97e5b541235f4eeb6be61f60d1987ee9f7f3a234f47c23934703c01c1152f9329b9439b1a00029699a4ee5239985385d1f3c7c70b0f390e93a21aafc2c0127e804f535333935ee711cba27d6a4a9782392f6ed0abd125f5d1698c1627941b2d7e2ddd76b6a97cf0897d147d380cda2381c3cd8b9b7f76017ec457cb3c8ea6bc3374cd0d939fdf8688e897874372643636a319e56753ebe2281afae9a3131c95d82769513b136bef983dd7b636a157d5b68bdf1753489befb8bd63974d6c697b94df4ed16b376c3dbdc26fab630e0c697d124f22ecdb04ec0f3882e696876d7cd97e72fa5097d955d6645093cf06d3eada078fd57af484106afbe368de84bf7f22ff925dfff","25ff0f124b10bce7050000"], [
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
  'x-ms-request-id',
  'e3b073e8-8937-4b85-b041-74ca4d1e3e34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-Azure-Storage-Resource-Provider/1.0,Microsoft-HTTPAPI/2.0 Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-correlation-request-id',
  '17e9007f-df92-4464-a7f3-96de19e6f18a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220215T093249Z:17e9007f-df92-4464-a7f3-96de19e6f18a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 15 Feb 2022 09:32:49 GMT'
]);
