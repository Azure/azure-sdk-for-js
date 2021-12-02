let nock = require('nock');

module.exports.hash = "d86a34d0632b273cc64395b2fefe23c0";

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
  '35088ef4-dbbb-428f-a809-02210d3a0200',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhJe9qH7tmxEu908fKz3Af4; expires=Sat, 01-Jan-2022 06:50:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrQOsBFfx7wlHtxomwCVNuxuiCN4RIAnmkCUnwF3wG8xWc9a4uZx7Qn3_Nm55euIztCvXu97Ra6hqzmSYeA0ctZ55tEujfTEReNFZtfL-DW06dDq4jpZ5bL1wuh_MIscus2PO6gBeuiN4EDcyljzcD-ECOhbfIo7FZ3mhSWnWYGvAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:50:43 GMT',
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
  'd30cc59e-025f-4903-adf4-7465c14e0200',
  'x-ms-ests-server',
  '2.1.12231.10 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjeUjmUs2JlNnXKz4WaDgDg; expires=Sat, 01-Jan-2022 06:50:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrl1GbRHrWHFYd-wAscbc7VQYqldfTGXfgZ8C_FrsvdOJYNs9bWDou06JbO71YF2-jf-k-c9IQ1NwzgMijehMaVbJy-pVYbPBtc9VxBvko1BInd8jIT8gvLInBwKPeyyH9wo6oi3DO9Ly9-MHpnD1hyC9B6xvDPityAn_z7IIYh4ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:50:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c52eccb2-383f-489a-a437-9746e2b05262&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '78434e2b-f6d4-4f30-a1e5-2c45c2c30300',
  'x-ms-ests-server',
  '2.1.12231.10 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AljX_PlRX_tGvV-CaUU92E8WPr5BAQAAAMJjOtkOAAAA; expires=Sat, 01-Jan-2022 06:50:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 02 Dec 2021 06:50:43 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Relay/namespaces/mynamespacexxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cddbf5478f7ef147cb6c917ff4e8a3d76db69c65f5eca3d1476d91d7fe27bf64f45131a30fee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc7aff232bbbe0b7c9a5536cdd1dafef1eedd3bc20c7f1222bdcfdbeb153eef827a615a35d4a6aca61910a776a759d3a65fbda60fdbeca20111e8e72e7d719995eb7c170326fc56794d94e0afe9afcba2a1978be50591a54567afd7d3699ecf72506c91b775313d03916e439547bd014ceb9ca0ce8e5b82b0b7b3b7bbbdbbb7bdb3f766e7d347fb0f1fdd7f30de7f70efa7a8d97a351b68767fe7d1feeef8de43b46af2fab298e64fd6cde972b6aa8a259acfdb76d53cbadba1e958db4ed6cdf8aa58ceaaab66bcccdb47fbfbf7ee02128d754d14f8e878da1697f947bfe4","97fc3ff933050637020000"], [
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
  'e2188694-e241-4bfd-aaa1-638902279660_M9CH3_M9CH3',
  'Server-SB',
  'Service-Bus-Resource-Provider/CH3',
  'Server',
  'Service-Bus-Resource-Provider/CH3',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11980',
  'x-ms-correlation-request-id',
  '34cd3215-fed8-4253-b43b-a5fd6baadd55',
  'x-ms-routing-request-id',
  'JAPANEAST:20211202T065044Z:34cd3215-fed8-4253-b43b-a5fd6baadd55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Dec 2021 06:50:44 GMT'
]);
