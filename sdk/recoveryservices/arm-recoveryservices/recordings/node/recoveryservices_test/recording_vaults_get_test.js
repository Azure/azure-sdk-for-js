let nock = require('nock');

module.exports.hash = "3278ce129ddce44c9004726e64776f56";

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
  'dcd37a9a-d598-498a-ac0d-3772f1350c00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjrcC25v5YFDrPYv0Bh8dxU; expires=Sun, 09-Jan-2022 08:05:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhZ-7x0dAW-8XsxtrTlNBdLmwr8FZxLDcVZEU0smUTxZlHsCcG2MOGGxWBjl_QvBoyOJWKyDr-ufa7KT1bLjaXWPBnxnSDGtFWO3gpqH-f37ctSuucRwXSlfDTGeQcUkevuvGxxMNwj-1Bh8zYSm9bpq4DgjJbqrCrBgbK7ZSuYMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 08:05:42 GMT',
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
  'cc3cd611-5a11-4fd8-9a15-7b1054d50a00',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ajt39jI4d29Kujex-jbSHf8; expires=Sun, 09-Jan-2022 08:05:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkpooOHNdP-ndZhTKcilYbFFdhpojF_QC07E8lDExzVcM-L48-1t4kM9X1sgm5ssDKxYuKWdaMB5tM4KkMy33Ig0-7osGPVRQUidcLyeK7vtcKF34Fl7XMsjSYe1CBGeJjC0UGEermsxcbsWG69uywXxZGAu3-MOKXjuv7O-tBqIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 08:05:42 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=3241b6ff-8c23-45fa-beb4-dd1d9597d257&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '26d71743-73ca-49e7-9274-7b1012920b00',
  'x-ms-ests-server',
  '2.1.12261.14 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ap22pq2MGEJKiB8ucLTPrCwWPr5BAQAAAFcBRdkOAAAA; expires=Sun, 09-Jan-2022 08:05:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 10 Dec 2021 08:05:42 GMT',
  'Content-Length',
  '1374'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.RecoveryServices/vaults/myvaultxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1476535cddaa25a7ef4e8a33c6bda75f3d1e8a365b6c8e9efc5f565b62edb77efded167799b5dd067dfbdfbfb7e34cbdabc2d16f9c77b3b7bbbdbbb7bdbbb3b6f760e7ef77bc73bf7e99ffd9df1c383bd07fbfb0f7feae3dff7237ab398e5cbb668af3f7af48b3f6af365b66ccf6604e9c1def9c38383c9f9f6c1a7e7bbdbfbbbd9f9f6c3dd6cb2bd377b309dedeceece26fb0fe8ed555d2ca7c52a2bf9a5d9ecc1c1c3e9ee83ed9d077bf7b6f7cf77ee6f4fcef7ef6def640ff6b29dc94e369b64f4527bbdc2005e5f376dbe386e9ae26299cf3efa258056adf2ba2df206d8d05f974543832f9617af5b1a15de594fa7793ea3e6685d5cd2a7a7cbd9aa2a962d377956d54fb2e9dbf58adabea896f970b3d7459bbfcaa7d5655ed3d8a531a150601c779bf5a499d6c50aa46fee3e245adc9f1d9c6fdf9b7efa8068b1b74fb4983ed83e989eef103526e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa769744d7b974731cbebe6ee17c5b4ae9aeabc1d9b7e5fe7f56531cd9bbb3c9378897f9129552addf816356ddeae4130650c1ae17296d544d15f","f2ff00efd3441e41020000"], [
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
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '3346758a-d26c-4257-8cd5-2f65b46a63e0',
  'x-ms-client-request-id',
  'b3024aa2-5f4a-4bcb-827f-827c3440d8c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-correlation-request-id',
  '3346758a-d26c-4257-8cd5-2f65b46a63e0',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211210T080544Z:3346758a-d26c-4257-8cd5-2f65b46a63e0',
  'Date',
  'Fri, 10 Dec 2021 08:05:44 GMT'
]);
