let nock = require('nock');

module.exports.hash = "1bd53c422a517e7443264fd8c8ab8f20";

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
  'dc166749-de8d-4169-86e2-e69fa5931100',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ak9u4pn5z7BIvArwsYmjgRs; expires=Wed, 17-Nov-2021 07:36:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWYIkDYpxKO1J118zq5NRp1sDX-lOmIo8psq7wktkSXS4gGjh79_hIHAKfYWZ5Z9HpjEDridjiyFFWNIk9AefMMAWrW_k37XD_bLfO8ZW-fhLL2FhPfBHQLn6hivPcAV5i9oYUNwMRQ5pBAjTL3ndMnoYSmp3O3tiFpfmBk21VOggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 07:36:50 GMT',
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
  '359d9e5b-f9ee-4993-85f2-3e0b3b020800',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AoBZsj1OI5BHiKqytXINFcE; expires=Wed, 17-Nov-2021 07:36:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3c4IpfPI3hzbM5AqgjRE13JIA6uFE82fagmDhe503afOdg4ruuOfSEUZb0BWoj3gMaSv52Gl7lkEOB6eptSe1rRUTw3xBcDt9xtlGFWHa0o1r8tX1W7vUdZdlSZWnZpsAUjN5RsbTaM5m_V4VAhLSPz6K_xDLZubgkZfLfIRQSogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 07:36:50 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=abfc7cff-5ad0-4dd6-95b2-316d6a1194f2&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'cdee7f40-c5db-41db-bba8-8a2853701100',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AoULLS7Ii6NPkr_B7I6i5UgWPr5BAQAAABMb_9gOAAAA; expires=Wed, 17-Nov-2021 07:36:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 07:36:50 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Compute/virtualMachines')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9479759b9ce3f7a947e0f7fa5297f88e7a365b6c0e71f5d1675bbceca45369d17cbfcdd4723dba298e1fbbbcd7ad24ceb62d516d5b2b9fb70effce1fdd9c1f9f6bde9a70fb6f777f7f6b71fee4e1f6c1f4ccf771e4c6793f3bdfdddbb75de54eb7a9a7f5e57eb55737771fdd34d9b37eddd555d5d16b3bc6eee7e514cebaaa9cedbf149b558addbfcaee2f185e0d198bf2378b5d72bc6fc4618de3b6535cd3000bc97674dbbf6bf6cb38b86beb0b4a18fb21f34f974954ddfd2e71f2dab25613e736f50835599b5e755bd68f2b62d9617cd785e35edef9f2f09856ab9c897edb8c9ebcb629a8f4dcbdfbf5ab5f9ac58fefef4c7ef5f57553bcdeb16fd7ed4d6344506f62fb1bd7c449daea84d412309b1bb5c9cf1dc64d9f9ce34fb74677bf2607a7f7bfffcfe6cfbe1f9ecd3ed9dfc41367df0e9a707f7f743ace7593dbbcaeafc655d9d1725a8e881a5ef2f17af8b1fe0e38f5eb7d97246ad7fffa77bbfffe59ec5cec78fda376d55671783e08a057df92a3fcfeb7c39ed7d4d0d56eb495934f3bca6efdc7c7eb758ceaaabe6351190bef1fac3f351754ef0d07e73b3e6ed1a8df676763fdd7e9ab5d994e624d28c5e6d942f689e88497b2df277d9b4fd49d76c77ffdec37be3fd073bfbe3bddddd9d9d4fe9df4f3d028524220055f3b468c048ddd157cd1b65651d4aaf6f23a48beb9ffca26a6600d36d32ad73c2fb4b164f347d56578b33d0bddf92c5e2028d5ee5d9ecbb75d1f61b2db225bd3b8b634cdfeb8c1f4fa7d57ad91afc2db73c7ff5ba0b925efae16a1290094d2dc9427cc2d921ec667999fb147c9a13b7ccbbc3f808a0201d9f3fa146bb7b0ffcaf43981fcd88df4041c8ad2a5ef3f4295aaed1eb4e00018f9d7c5229d06a4613fefe4064eff7bff77092edefec4e1f4ef2fbfbf73fbd974df7f63e7db897ef9c4f1eeeec1f4cbaf813c02eab9c2e56ed75ac1df7c48cf2a25af678845adcc025d4e2ebf009bdf673c1295f93be5dec431ec0734bce4243ead2f1d6cedebd7e93b67a92cbfb3968749e954d1e36ea22d09b1665b5dd4e3bfa6213abddfbfd67b39d7b7bf78806bbd3ddfddd4f771f9eef9e3f9c3e7c482af0fcd369761019d08f58edd6ac760bfa76b1efce348de687cc6afe9fdf777ff88891791bf20ba64294fa85b21d747588ea47d96c512cbf221fcab02628bca6bf3bedaec4729e54cbf3e2625d1b272fe88f9af1d4c082ffe417c717e4095013785d012c6a962fb349991fafdb6a4190a65fad4893b3f7156bbccadae9fcb5fa7fd4a6d3a769f14535e30158a84faebf8c70e44759d3e44d03d7d1bcc166fc697e9eadcbb6c303c104f8542740e4b9d6397b96dffb7ef84d5696d5d5e9bb365f82145f927349f810db53d3de003faaf35fb42eeafcf335119e2652c8f7bab85866a5b677cd7d0c3e5ae6ed5555bfa577cce49b8fcee0829d932b463d7eef17b304feac0be00be9fa6e0f85bb85f995820b300891437ced5f4c7f91eb5a5f7ff408c3fc25bfe4fbc1f8a8a91083e69db40c39513457afd7d3699ecf48604c4b9d22fe4122f24b","fe1f2ad16515900d0000"], [
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
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/HighCostGet3Min;139,Microsoft.Compute/HighCostGet30Min;699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '37444e38-6448-4baf-9260-b1c8027f4fc5',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11811',
  'x-ms-correlation-request-id',
  '517b5a1c-f1bf-4052-8ba3-3b8498e1629e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211018T073651Z:517b5a1c-f1bf-4052-8ba3-3b8498e1629e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Oct 2021 07:36:50 GMT'
]);
