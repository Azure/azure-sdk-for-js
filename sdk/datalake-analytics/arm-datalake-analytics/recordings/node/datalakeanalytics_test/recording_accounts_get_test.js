let nock = require('nock');

module.exports.hash = "723cc51c398ab5334d9fd96b2f17b53d";

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
  'dc6a5af1-2776-4fe6-a4f6-1ed80c8b0100',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhM26ePgZXxBhR5MAFVuz7c; expires=Sat, 18-Dec-2021 02:16:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvwIqVscNzoPcXnDzExZkGTy-9-qJeaf9JHtC9MLQ1j3l64wYYGBobwqunAkrYSChVtl49Z_ys_MutoV6s6r5ALK63N6EGAPpxSkWfW_xpzq0GQIuhRLLYmhkQ-bgs7NUO0WMut01HNMk24FE6I_mVZ5DDpas6JnfbqxEEqPBM3kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 02:16:04 GMT',
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
  'b0945a43-ce20-4888-800b-bb5b686b0100',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnyPxvi5x-dFgfPau9SrI08; expires=Sat, 18-Dec-2021 02:16:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrP1ZanEu53X7FB-Bo8A3RaoVejnRhCGmpIyjv8GKGfTZfkiXnEsmOxXrO68El7fCc_VQ_di2TGlczP3bd-2sDQWb5qggf7WbihmFOeLikIqaeyXZYlRJMZwJPO7M1MPDIesilaplz8jnkxliwylND_DB-sJ6Ee6kJkyvRMX-1B_QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 02:16:04 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=bdc45619-36ed-4084-a7eb-72bba457cf89&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '8d1c6cc8-1901-4814-904a-5ab993970100',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ah7lRnxx-opMln51wFltD1cWPr5BAQAAAGOuJ9kOAAAA; expires=Sat, 18-Dec-2021 02:16:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Nov 2021 02:16:04 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.DataLakeAnalytics/accounts/myaccountxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e9f666df63c7b9b1f2fb3f2ba2da6cddd6c3aadd6cb16efe9afefdebdfb68f411bdbdcaebb6c89b8f1efde28f66f979b62e5bf3faebb6aaf36369fee67a9513e633ff2b7a3ff8fbf37cb9a7cd09dcf7be3ffae8bca8f3abac2c5fb7598bd74f97d9a4cc67f4a2f9e6b82cababe31facebfc6c452f455abc5a97c00ee02e8bba5d67e58bbcbdaaeab7de17b37cb2be00dad47dde34cff3cbbc2460049c006d1815b5595c5fe4cb5d348b7c0ff0bfb843a4667d7e5ebca33733608db74a7aabc15be365de7ef44b461f2db30546aba07f0921b85a4fca621a4381607e4017d9ac6cebac5816cb8b265bac8872d498befffa102fe6c5b2292ee68418104793ecc247963e5c64ef9ee617759e7f79fe32ab698ef2b268161f3dbab7c3df7da79a9ca0357d4000ae894f175f0cbcb1bb43afd826eec53dfa982045de7999d7d48cdea406c5f2655d5475d15e7b9f4eabc56adde62f2b22388f1e18ffa2755e5f33d95fe56dbe84dc1176d4c9bcb8ccbfc8db0ce3348da7ebbaa6366f8abc26829c9088ae172caac425cbfc2afa3991fbb268e8779a09c3edafd7c48df98cb9b9d1cf8ea72df5481fe4cbd9aa2a3056e2132793e360823223c03c49a38fb4dd1994c864727fffe05efee9f6646737dfde3f78f0703bfbf47c6ffbfcfeece1dec1c3d9fedea7e8675ae719707c53f0f4eeedeced6eefd2ff0edeecec3ddabdffe8fec1f8e1bd07070ff77f8a1a9744872faa59715ee4b35bbc405c535653064f2d737a79ddec119836bb2052fee28fdee6d7bbf4c56556ae739203a25ec630fd01a3b9e896dbe8af8f","7ec9ff03dd84e9fb43050000"], [
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
  '790e0c6e-fa62-4fb0-afa0-38e0e075fe9c',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11988',
  'Server',
  'Microsoft-IIS/10.0',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'x-ms-correlation-request-id',
  'f024e332-620e-4c63-a820-bc776ec86cf8',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211118T021606Z:f024e332-620e-4c63-a820-bc776ec86cf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Thu, 18 Nov 2021 02:16:05 GMT'
]);
