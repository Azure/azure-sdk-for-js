let nock = require('nock');

module.exports.hash = "0c8e4228309b12e6f31b264a6a092163";

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
  'd11fe169-964f-4d1e-9e35-df46790c0300',
  'x-ms-ests-server',
  '2.1.12821.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ahu6gXTotwtKibRVPfXT11M; expires=Fri, 24-Jun-2022 05:30:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXLCPteZfvHTLxya64HGHW56SZBb2QYn3jfzYm6pnAwYwKX77pg84m_C8D53DFek3nTeQObybCiQ91PJS6Qm73YjlpxdqPU2fH1g-vWN4PndUdCvZJi-6AI7xXOq6su-Rg-GZeFV0T4Vs3T06Io17qiCI7T13bIeIXvnylJVSZx0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:08 GMT',
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
  'd59c84e0-9975-4d27-976e-da8439d70300',
  'x-ms-ests-server',
  '2.1.12821.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avc43CpHBGVJt3qVuHViTjs; expires=Fri, 24-Jun-2022 05:30:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrI1FkvIodfcou-k39V2bB-063SjvOjNuxNUAoRCojd-VrGXPUsFVKz_ex4SPJ5_CAyrYUMxFCWhBnSKP7al4pNFkdGGtt3Aza2_SJM-ty8utRgG0xp0bjXVWaX8egaCRhkqrBckLrXzJuEjnHCT4oaKJH4rCmHNeRB3Yez4N0HwsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.8.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d8c95b39-0454-491d-8935-7760debecd0c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'd59c84e0-9975-4d27-976e-da843dd70300',
  'x-ms-ests-server',
  '2.1.12821.7 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ao7xST0Tw1pCmlatMhFQ19fLj78gAQAAAOG1H9oOAAAA; expires=Fri, 24-Jun-2022 05:30:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:09 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cache/redis/myrediscachexxx111')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4fb2e93cbffb2a9f156858e3e7141fbd7bf76e7777f7a3d1476535cdd037e1729a356dfad56bfa70992d72fa20fa427bbdc277d12ef07576d17cf4e817ff92d14784ce2aafdb22c7dff8ebb268a8a36279f1bacd5ac078bd9e4ef37c96cfe83deee92709796a425fed8f77c6bbfbf479f3768dd715a39775be28d60bfafc3c5b14e5353ea23fa6d92a9b162dfdb94b1de7cb6c52e62faae5eba67c59d5ed478fda7a9d8f3e2a964d9b2da7c0e77bbff8a3c67cb97b7f676787c6ecb5dfbdc71ffda05aa2538cba9967f5ec8c668c3e2e9a2f32a2786de1362feb6291d5d43d3ef825a30ef0dd3e70fae846e0e759d984d0f9931ef8bd3e78fa28069e7a75e0812afeb6d0f1410ff8bd3e70fae846e08c293eb0d0f9935ff2fdd1478b62592cd68b37a537dbbbe33d02b55a4fca62fa226fafaafaed31b1464333f5d1e912b36959e4a45a9e1717eb5a99f6177fb4c8de2df245555f6faf2a7a9dbafa282bcbb7f975b35dd66b7a8d1a4ccb225fb680f680c6249fe94b244c797d49f01f7df4e93eb0a0afceebec62412f701f1bdae957b3bc6c33fd9cd82f63cc7f2f42e0a347cb75598e3e9a574dfb4218b82f5263fe60cc9f8caf8ae5acba6ac6cbbca52e564cf34fef3d7848743653f0e9bd036213521bd40674ff5957213a21772f8bba5d67a5fed9dca5fef10b24f3dd5dc281fe6ef4a7fd9c064132d716d3b39784e9ee0e49f5cef83e3e05db9c54eb258d88b8b52c966ff3d96b50b826b27deffb444730197e2736fbfe","2ff97f0033bd5f402f050000"], [
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
  'x-ms-request-id',
  '6e331918-912a-46fb-b29c-828f2b94f5ab',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11652',
  'x-ms-correlation-request-id',
  '59377cec-a0be-4287-8282-039f484b3978',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053010Z:59377cec-a0be-4287-8282-039f484b3978',
  'Date',
  'Wed, 25 May 2022 05:30:10 GMT'
]);
