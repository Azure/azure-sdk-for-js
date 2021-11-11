let nock = require('nock');

module.exports.hash = "52c2da2d77afc1517bde875df20c5c04";

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
  '937ffe50-6350-4c7f-a79b-24e522550400',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Al-Tl0FzsA1Pmhwap8ZOyMI; expires=Sun, 21-Nov-2021 07:40:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrC2L2SI-lfvtDiwdxMFoMfvcPtQpRSyYqa8lE8vlfEahB6n-k2zjSGfBq_60m-8wRM2NgzxGupJgVz9w4OcdUhXmZrCxjq84t1e8yUQH_uR20GOPSa7rG11srwhVYmDIyzG6ywrn0byGxMPDgFXIpu1DGIEfR7bMHQRRv8Qo8HUwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:35 GMT',
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
  '53655d19-bea4-49aa-aa61-16d5369f0900',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao2oWnhhZ2ZLoTG2giYYrAg; expires=Sun, 21-Nov-2021 07:40:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_9JmhVCr6lgg9MYniA5L4h_b4o1fbuqicOuVDmvaR9hhL33U5le8RB8lwB_DAi1_tSmMzhqNwZw7JUd-uX-PSr14bgOKnex1-fRT5ppWQHFEH4ZFZR2alDwR4ggEDrpqa9WhnPdN91bFY4RhUm2905aNqJM18OQc1V3aHPmLXjIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=ae72bbb5-2021-4984-b389-456a2dfd3314&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '8579ae79-88f2-4484-8e23-a1e408b40400',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtCsK5tZZOxCsuFN16IVALoWPr5BAQAAAPRhBNkOAAAA; expires=Sun, 21-Nov-2021 07:40:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 22 Oct 2021 07:40:36 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows/myworkflowxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478ff8afcba229aa65b1bc78dd666dfed1a38f5eafa7d33c9fe5b38f461f4deb9c3e9cbd2916f8666f676f777b77677b6fefcdce8347fb3b8feeed8fefef3edcd9d97bf053683ccf96179b1bef3c7cb8bf771f8d1beded74994d4aeeeb32af81097db67370ffe0fea79f3ed83dd8c71bf70e1eeeec52838cf06a9ad3e56c5515cb96dacddb76d53cba7b974631dbdeb93fceb3a65d37e3b2ba28a6e3ec07eb3a1f4fabc5a3fdfd7b77afaafaed79595d3577cfcf77f61feccd3ecd3e7df070ffd3879387b3c9fec387d3fd83fb7b0fa70f327434cbcf8b65d13232bff8a3dfad99cef345e6f5271f8c17d932bbc817f9b2759d0197cb624643b9fb4531adaba63a6fc7cf8190bed5dcdddbd9fd747b87feb76bb1721d8e7fbaa9963f4e384cab654b907f9220d1c7d4f9ee7807ffd157abacce16794bdf107abf64f4515b171717f6af6c0a38fa47b56e57eb96ffa0bfba2fe64acae6a45a9e1717eb3ac3abf4dd470631fc4e302ea8d5c5d9ea7836ab6906c03adffbc51f65f21750bb377eb8377e7830deddddfde8978cfcaff677c6bb7bbbe387bbe3fdd857bbfbe383bdf1eec3ee777bf7c6bb3bbbe3dd7b0fc7bbf7efc5bedc19efd1770f7762dfe1c54fc744e7ce97bb3bfbe3fdfb80383ee87e675fdca3170f3efa25df07257d7edb34fc07f41ec1ddf9747c7fbf039747f960fcf0e1f8c1c3f8573c963dea32f89281ee7e4ad4a3ff7f7a9f10a20923a658e6d3b6aa6f372fd4c183ddf1de3e11ea5ea473fd6e6f87a077bfc3cce0c7bdbdfe77f4deeeeef860e76e0f69fd9248f1297dfba0f3ed7d9ae9036292fb34b24f7b13b733e6ef681a1e7cda87ec7dfd708f417fff9780a58b197d79b7594f9a695dacc0becddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefde25b8d5ba9ee69fd7d57ad5dc5d5cff74d3e64dbb417e8d4ca0b1f9fdddbb7724904b922a42a3fb717bbdc2c78370a849594d55e63e12e5f5d12f","f97f0048d51ea2a3050000"], [
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
  'eastus:5451360f-33c9-4792-82fb-4a441420823d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '19999',
  'x-ms-correlation-request-id',
  '6103bda4-99a3-4e8d-833e-f4585853943a',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211022T074036Z:6103bda4-99a3-4e8d-833e-f4585853943a',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 22 Oct 2021 07:40:36 GMT'
]);
