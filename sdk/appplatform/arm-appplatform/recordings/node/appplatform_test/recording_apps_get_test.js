let nock = require('nock');

module.exports.hash = "7bfb7ea332b8c00b4c96c259c5015c4f";

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
  '61682844-3496-487a-99ec-6ec84efd2300',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhXie_p2HNhNszwBKULRSZc; expires=Fri, 26-Nov-2021 02:04:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlF5LVaRRxNy5KtoDsvV7b20WGTbRxRHUllcaGjx6P3YZSZL_VFv80LhStDbncUiHQcgHvXDv-63yMKrjl2lvwWGYS5gAGNax9PKAa6Mo6pjgCccuRDJFPVg-ymU2DlPKnBRM473w8K_pOBycJQ-AJ1u605tValnbk8QTSmWNbAQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 02:03:59 GMT',
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
  '06d95b41-9b34-4c31-8318-ef9959d62300',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AiTeRwPg0fdCoY5mntRuZVw; expires=Fri, 26-Nov-2021 02:04:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6tcaxYUZ4NWD_fyJfFoODRK3xClGknmRCR2EGeIoixbgfyXcR-5n_YG1U2nrInoMp91mSiiYpu2hx3Ka91m-Zno1u1WghDIY5V1QHOM2g_lfs_m3CoQs67Kvh9Q2ZWjj8uNcsLMOuBqVuXIByxhgOhR_vvlXtAWVRURhsihnKYAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 02:03:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=32545816-d3e2-4a82-9594-7b144b36c624&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2e8633a5-c0fd-4bc7-80d5-d332743e2900',
  'x-ms-ests-server',
  '2.1.12171.14 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmUUe2vpsQhNu7GbPe1JRzUWPr5BAQAAAJCqCtkOAAAA; expires=Fri, 26-Nov-2021 02:04:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 27 Oct 2021 02:03:59 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring/myservicexxx/apps/myappxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8aff5a42ca61f3d3acfca261fe1cbcba229aa65b1bc78dd666dfed1a38f5eafa7d33c9fe5b38f461f9dffa2d9923e5a5c37797d594cf377efde8db31faceb7c514ceb4a3f6cc645456de76dbb6abe5c96d716fab4ce09e4ec4db100dcbd9dbdddeddd9dedbd076f76f61eeddc7b74ffe14fd16b6dbe585575565f3f2d9ab740b1297e909f2d3f7ff2d1a3fba38f16d57ad9beccda3901b8db2e561ffd12423aaf9ba269f365db7f65a7f38a6b8b37f3653629f3d3e5ec4d857f9ebf5654e9abf67a0524bfe07155e7edf878b57a5966ed79552feebe5ed544a0bbd96ad510c6c58cc0152d8d73b92ecbd1476535cd5aa221bd9e674dbb9636f4d7dd663d69a675b1c2b7cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f26ec9bf62ecfd48c467377238afe4c31bef409fda0bf08a965c613613ff925","ff0f270aac231e020000"], [
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
  'cb62f182-029b-4b71-bae0-586e39ef880c',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11996',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  'dbac0dd3-6376-4b12-8bbe-2490072a5023',
  'x-rp-server-mvid',
  'c98d556d-0be2-4fd7-8a47-2c7368eb00a4',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  'cb62f182-029b-4b71-bae0-586e39ef880c',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211027T020401Z:cb62f182-029b-4b71-bae0-586e39ef880c',
  'Date',
  'Wed, 27 Oct 2021 02:04:00 GMT'
]);
