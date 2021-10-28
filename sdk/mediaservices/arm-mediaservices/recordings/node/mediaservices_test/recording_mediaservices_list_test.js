let nock = require('nock');

module.exports.hash = "06dc2249448b4f7ca91cfae0a8ea3f52";

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
  '2098487b-0f48-41e6-8c25-f80f9a832f00',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AvT3vfppzWlGreWq35Ezfu8; expires=Sat, 27-Nov-2021 05:46:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0E47BozBK6g46GeA-GoINKG5P4QX7aa0c_LTA1mjGSg_Mx6TL1FCltpEdFMCzWWLv-B-Jtf9PYnSLhw_m_7EU8RdPf6WqqKIut_3HTQW9ZqcEcQoXbQWCVaj4mMcPn9DT6QUpUN6XJt0mmmgfxysdPn4t_R5jXgwY3oiVA6LrrsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 05:46:48 GMT',
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
  '8579ae79-88f2-4484-8e23-a1e4d2ac2f00',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AmcnskksWXBLrmpqdRziAHQ; expires=Sat, 27-Nov-2021 05:46:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr2tmzUOd71zxprt6ecfHEUrcQsjr7KBkueN1S13gZFAf5yDprSzzbNi7Gh5p-aFhIubLhmqjYVQBN-0A974I08y_pv_EQs2hoI87NmOU8Xqc2frwaSs4SEoyYfGpydturqAJS5LJXR7DGZvn7r8AetZI2Jn1aNfRDUD0-iko6ImsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 05:46:48 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=a05792c3-13e7-4698-88a8-4adebb30056f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '8579ae79-88f2-4484-8e23-a1e4d3ac2f00',
  'x-ms-ests-server',
  '2.1.12171.14 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ar9w4RG-aqFCuENi2PrBBp0WPr5BAQAAAEgwDNkOAAAA; expires=Sat, 27-Nov-2021 05:46:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 28 Oct 2021 05:46:48 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Media/mediaservices')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7af43dfc91a6fc199e8f96d9823efe6871bdc86745f6eeddbb8f461f1533fae46eb39e34d3ba58b545b56cee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff76e9d37d5ba9ee69fd7d57ad5dc5d5cff74d3e64d7b77555797c52caf9bbb5f14d3ba6aaaf376fc05fabbcbbd36797d594c73bcc07f0b16edf50a986d7c839a95d534038ad4f4346bdaf4abd7f42175b8caebb6a0168fec5869b4fcf26b79f90ca3dcddcd66e79feee7dbf73fddbdbfbdff60f2603b3bb87f7f3b3fc827f97476bebf73fe29c16bdaaace2ef2e3e9b45a2f5b02aa7494c7eb01cf0f877eaf05a5bb1dd4ccdf99fcfd831ffc20a0e6cbba5864f5f5473ec6bfc4fdf17d37d4753bcf976d6189fbfa9a705910a47c39adaf7954016d69dcda87b4fcbd72bf975f32fae86d7efd342f8bcb9cbaefbc48c8e64d73522ddbba2a3b5fd2d7b3fc3c5b97edf1543afde8b82cab2bc2a458f16fcf8ba6edcc089ef0efeffb7f7a2326c456eb49594c5fe4ed5555bf253a122ad4c9e9329b94f9cc8e811a363cb0a7599b05387e34adf3accd674f685c1f9d67fb0fb2dd7b3bdbe7d9fde9f6fe6cb2b3fd703abdbf3d997e7a7fe7fef460ffc1fe0342ddbef2466876bc5a110e426bfbed310deba3bd9dbdddeddd9dedbd83373bf71fed7ffa68ffdef8defdbdfd7bf71ffe14352d89e7bfa866c5790168d4fe960884ef45b1f09bdc8c8aa187d2967f10d1","7fc9ff033c5cad587f040000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'fc63e794-e298-4d0f-9914-b22486390784',
  'x-ms-client-request-id',
  '3c9842dc-16a4-42fc-a4da-c74ddc85a9ec',
  'OData-Version',
  '4.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  '7fdcb274-0dc6-40f9-85e4-82fd97b58b09',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211028T054648Z:7fdcb274-0dc6-40f9-85e4-82fd97b58b09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 28 Oct 2021 05:46:48 GMT'
]);
