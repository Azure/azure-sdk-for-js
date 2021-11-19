let nock = require('nock');

module.exports.hash = "0428fa6bf02d601dfe177bd5c6bdbd0d";

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
  '28c05690-0988-4995-88b0-4641063a3600',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApYNUlQybaFIrsuaSoStyAA; expires=Sun, 19-Dec-2021 07:07:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRlXJiBxDTmRVizk3C9qp-GsLF8yOvaO0qgxbaAvXshspGRGew5BNUHsGqLSCZxkiZe9ooBgUxTMir-U5skdoTwgsi4gkpUnpMz58Re7dtknTgVMwNWGaWuApcZbW4Hz4PwLZ_KB6pSmgUAoCSqvCd16Xq0uzdkwG1FmVfIJna_8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:37 GMT',
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
  'dacf03b6-bde0-4e46-97b5-da4851a03c00',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsD96ROidn1HpKhjf33ZX9s; expires=Sun, 19-Dec-2021 07:07:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrpk_q_jlS90Ye2KI1dPOnx1ChaqMPlU8reHbFL-D5ZLAcpdKQFAhl3FBO-3wZql_3qd-u_65rbiUPiZkQNErtPBL-w6iyRr0UDj3j-clRHd7TAm2c3XtV_ggmebAz2ukns9VfAbjz_ACWJCiq_RjViNw3_cZID65F7vcgyLutbOkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:37 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4dce4116-0b7a-4f8f-9cb2-185b92eaaa3f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'f2cd5188-710b-40eb-b71f-1e612b8b1900',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkxCDJA18uRPlgGgzDUtUlkWPr5BAQAAADlEKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:37 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Batch/locations/eastus/cloudServiceSkus')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1325bd02f1f1ddfff68f4d179b628caeb17f249d366cb5956cf8e777effe307cff81b6a32cd56d9a4288bb6c81bfffd93aaa60f4606f0477b1ffd9291fdf28b7c51d5d767cb2f265e8bddfd7bf73ef55bbd5eaf5655dde6b327d7dfcd27dfadeab779fdaa2a03b06d4d3fe2effc6451b7ebacfc229bce8be5c697bec8de3dcddaec69d1bc3da9d6cbd66bbaefb77358e44db5aea739de785dfc20ef8ce4feceee834f77fc37435c6e787df7dec1de3ebdfe7d0fc0f1a7d4e01b9c8e605cd1e9d83bf8f44130691e691d217ec8d371e0b77358dc40cf1d22e70e11d4bd1a2273c3fb7b0f770f7af3f1801a7c83f3110c2c3a1ff71fdcdb0f66cda3ada3c40f793e7603817568dc40d09d8383871f20209fee3ebcbf47affb1372faaeadb3e7597d9153c31feac4fcbf526ffdbf67627e16e6241083e89c3cd8fd3498388fbc8e163fe429091072586ca6e8cf86eefa229f15eb0535fa06a724b014d129b977ff2098378fbc8e183fe429091072586c26e9cf82757fbdc8ca92da7c8313b2eb23189d90dd070f8359f388eb48f1439e90002187c5668aeedddb2119f1df0c71b9e175e80a7afbfbbfe4fb","bfe4ff01d02260f8080b0000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-request-id',
  'd444c4ef-d7f6-4354-a027-11c0dd429186',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'aa2a5746-764e-4b48-800c-49b28ffe5bf8',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070738Z:aa2a5746-764e-4b48-800c-49b28ffe5bf8',
  'Date',
  'Fri, 19 Nov 2021 07:07:38 GMT'
]);
