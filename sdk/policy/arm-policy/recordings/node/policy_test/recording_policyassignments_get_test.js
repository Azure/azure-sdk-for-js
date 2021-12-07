let nock = require('nock');

module.exports.hash = "da175dcb796641a7d5ce170197d3482f";

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
  '68234bd5-29fc-4e9b-822e-513f7aca1800',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Alqs1ABuKu5BrxgT2yS_xpo; expires=Thu, 06-Jan-2022 09:30:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2f7HuxzRRwAqB32ohB1jpoPrUGclk9cWa7IU2Vwv5LOuBvrNraC4Ui_3blR2h4e_k7VHJGEHZM-0E4TNiF6ifGq2Pv9BxmW3ekuURAg-dfE6LJNkBuDBXrq73fizpgseABdXGiLiwos0IdpvDJG-jxCUjs6tvlKDA3p7x2WmSIkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 09:30:29 GMT',
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
  'c1cfa25c-7442-47ca-b044-7b176c201b00',
  'x-ms-ests-server',
  '2.1.12249.17 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Apw-GaPHJ2tIpASyu4JEd5w; expires=Thu, 06-Jan-2022 09:30:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevraav_dfhwSMxnVvr8EfRx1LXNo8L8babAlCarYty-FZOPOa1ymKHo5OKkFzYwywsa5eGKeg06oiqzZzsSclRJD9FZySlk_UsFwgmAFeIzoWybOslWlGR50nXzwt37ELRaxa9FXFrhnZytXnTOPu7U1NtWGXrsWKBwjX7jrwwxynwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 09:30:29 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b61fc8f8-2191-4691-8023-564dc0deecea&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'daa1b668-967a-4557-9fd1-c449070a1a00',
  'x-ms-ests-server',
  '2.1.12249.17 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhrwJCuYbg5HjhvA87LxGMMWPr5BAQAAALYgQdkOAAAA; expires=Thu, 06-Jan-2022 09:30:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 07 Dec 2021 09:30:29 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123//providers/Microsoft.Authorization/policyAssignments/passigment')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8afaa2ca6d74ff3f36259b445b53c9b7df4e8a3bbd4e6b298e57573f78b625a574d75de8ebfc896d945bec897eddd85fdf5f3ba5aaf9abb7b3bf26cd3ff77f10fff26fff0b3bb772f0af478ddceabbaf84186beef769169eefe74239f7d34faa89912deef85dcc5ed9123f88bbccd66599b812ad33acfda7cf6e49afa3b7ff0e9f9c1dea7f7b73fcd1ee4dbfbd9def9f6c3ddd9c1f6fd9dbd49fee9f9cefeec7c9f5ed757be5cd22b7b3b7bbbdbbb7bdb3b0fdeec3c7c746fe7d1dec3f1a70f088f070f7e8a9aae57d48f405faecbd27e8077f1c12f197d942fcfab7acaa3f8a29a61d844956c5db61fd197c5fbcdd17b90210a343647c74d535c2c01bdb9bbcaf0077ea7b1b5d73c49b77e9b5e59660bbc128069ae9b365f3c8d4d47b6ff20dbbdb7b37d9edd9f6eefcf263bdb0fa7d3fbdb93e9a7f777ee4f0ff61fec3f2000f6953782d0f16a453d3312eedbe396be894ed6bd4fef3fdcc75c9559831928ce0b00a3e6b7ec3f7c2f8a84dfe4464c7ec9","2ff97f004a30272aba030000"], [
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
  'Server',
  'Kestrel',
  'x-ms-ratelimit-remaining-tenant-reads',
  '11993',
  'x-ms-request-id',
  'f12508eb-351f-4009-b3e9-ac7566cd0ccb',
  'x-ms-correlation-request-id',
  'f12508eb-351f-4009-b3e9-ac7566cd0ccb',
  'x-ms-routing-request-id',
  'JAPANEAST:20211207T093030Z:f12508eb-351f-4009-b3e9-ac7566cd0ccb',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Dec 2021 09:30:29 GMT'
]);
