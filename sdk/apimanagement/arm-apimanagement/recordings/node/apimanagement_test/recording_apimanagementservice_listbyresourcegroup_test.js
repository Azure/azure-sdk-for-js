let nock = require('nock');

module.exports.hash = "67aaa4fa9e2908460ffb7cb0e3b13089";

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
  '287c3834-52aa-4874-b1fb-28658fe20700',
  'x-ms-ests-server',
  '2.1.12071.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AurByQ2mOshAur42zDHqv3I; expires=Sun, 24-Oct-2021 06:50:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-jjw9s0j2cx-__N-KoSyJFkOfTsfWbdXw5tihKSsh5bvEoeyAhkcs7ZFFYNgGVl2049khqVrhmUnD25pxlswY66skkN4j5DWflaEqUqlDVbeuFW1qPVLPrj_zQuDEj5BsTyFKIByVXYvUmXtrJIBiDjSQbnRJLsew2gTM4tAZR8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:26 GMT',
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
  '6332f45a-4a68-47f2-bf85-b9e3f42b0900',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At7yKE7w_ANDgc4ceKZmdqQ; expires=Sun, 24-Oct-2021 06:50:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFiKtTv0dwCxzCf3pUY7uvAqB0k4oxcJMrA4X7g2QaAcMh76wgAHvdswejCfNz6mWwZ25iKoTnwDUSycD3-lEOd4eD970XalwjB5lFA3f2XDW1-u0grUgOW5wo-EY8WXmoF27q2eIaqxlH1YuVMUYC-ewpGP_tOa6p64SOUEQ6qYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.1&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=9c4aaf93-164b-43b8-a193-f73f7f407317&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '72601cd0-040f-4c9c-a388-1eec5c570800',
  'x-ms-ests-server',
  '2.1.12071.13 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aljn5dgV3kJAoN45EEkMh5MWPr5BAQAAADNs39gOAAAA; expires=Sun, 24-Oct-2021 06:50:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 24 Sep 2021 06:50:27 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ApiManagement/service')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3e355f145b6cc2ef245be6cef36797d594c737a457f7bf7eeddfd8f461f2db305e1f451f7e3f67a858f6f808686d945f3d1a35ffc4b461f95d534c350e8b5d3ac69d3af5ed3d7397d4f1f1cf3f3e4c98be2273ea34f09dd555eb7458e573f5aad2765d1ccf3fa74911525b53eafaadf735a2d5bea793cad1678c1347921e8520bfa7459b5c57921bdbece97347e03215b158b8b45bbbdacea7c555eff9ef8787c552c67d55593fd605de7062ee8d6d0ebc5f2e2759bb580fd7a3d9de6f92c9fd1f76d565fe4edcb482bfa725ae7f4fbecb8fdaa9dd2277b3b7bbbdb3b0fb7f7f6dfec7cfa6867ffd1bdbdf1bd4f77efedecff1435bea0a657d9f55735d09bb7edaa7974379c8c3123b64da88f9779eb5e79955f50d759b9e1d5ed9c08be6eb67776c7b5b6ee415b5575bb11c8585af45e9ce5977989f97ac9df6f82609bf6802c2cef10236d02e11af66034d3c5a637e9ebde2bf3aa69c1e127d5f2bcb858d7cc2ac4742483cae134b7efaeb5a5325708b60b325f4e2b628e13f02f331fbdb25c97e5e8a3b7f9f54f66ebb23d23e9964fa6aed1cbac69aeaada7eb5cc2f887be98b93b2a0c106e0ceb3b2c983b7cd5bb3fc1c3dbc6eca27c4ccc48e1f3d6aeb35b525e15fb6457b2dd0a218bc66cd41e37bb22e08c9258dc5ff96f87a4d94c16bbfe4fbc42e90b8e9d9cbe3d98c944e0349fd1eb1f8f8609f987abc77ffde4768541797f46ed00a00461f65b359015a67e573550bf6abcba26ed759f9226f891e6f8399314da6eba6ad163435c44a464b3855f45d1a3ac9f1312626d44be3cf091b1299f1eb7cbaae891c6382d156d3aa6cc66fca66778746ff0cc4a5b17f13f076bf417834a7f73e1cbf9362455a92b023bb52e64ff366f7d3830f06fa249bbe25f5ea218bc17f38b271b81f4ed43edc0f22ae0786f40229b76f93fed9b3d0c8f4852cfd4634cb8b6a89ae3c19233e16fe9e154d362973edc00a3c29999fa4c9234120a968da3a2b962d587f512c0933fd4a6050a72aa12b953d27f32a95a7cbd9aa2208046b994f215eda3fbddbbc5d03305423614ab2bf9c65a49b08db6c954d89861f3ddaa56646abc87ba38f7e4043b240fe5fe3c6ec13de3a92eec7aae46f808686efe7c6cccf7e5eb831f71fddbff768f7fef8fefedefec39d07b7f263f67b16535fb9d98fd9ff26fc98fd0ff663f63fdc8fd9ffda7eccfecf8e1fd39f951ff931f7ee8f77ef7dfa233fe69b30b90e1ecde9d737b516de8ffc9828dc0f22ae0786f40229b71ff93104e4fb","bfe4ff01fbb00fdb9a110000"], [
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
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '054da821-a544-463c-9ca4-f8c5f47b4dae',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '4760',
  'x-ms-correlation-request-id',
  '0402318d-82c9-4634-ba35-e757f1f7edbb',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210924T065028Z:0402318d-82c9-4634-ba35-e757f1f7edbb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 24 Sep 2021 06:50:27 GMT'
]);
