let nock = require('nock');

module.exports.hash = "40cd5f694d7496e4da00a77363113c14";

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
  '0204ff98-cfb5-4141-a3a3-b5e1ab381e00',
  'x-ms-ests-server',
  '2.1.12529.16 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AjFFLzWYNddDonsBH308Kfo; expires=Thu, 31-Mar-2022 06:23:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8zzqNfU2PhQaWwkQao0tH2F_fcPmDsKziO7EwkDCuMYZ-lnFSu3y34ijW7Z4qUEpuLg0v_QFSUO8Lk8aSBltnalNs5UbrfckXbarSmxmiQYs9svZPwZa48eqNcSWw-9JaE_PwUyKOieGF7GOWMu8dInK_ty13wCFZtf6J9cVdm0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:54 GMT',
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
  '68c52ac1-0210-4f9e-bb6f-e999965b1c00',
  'x-ms-ests-server',
  '2.1.12529.16 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AtcUQUNupntChV867XEhEpE; expires=Thu, 31-Mar-2022 06:23:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcT43KQ-NBF_acCRgQxa-NqQzTbUqqGg6SYkuOVoM9b3QoF8ujyF5p7VLdWqo6RgOgQMIcLCrsM54Vy6iRlcKqSlurNDGX_TZ1gt_FJuh2ucDT3rPfQnxCRWDZ3lAxfXOz2-OwZ-j0UcnhY-gNX6XITi3GLKyfFI3pUfbfri7xjUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:54 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d07262fb-9bd1-4bd3-983e-3ddb6840aeff&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '68c52ac1-0210-4f9e-bb6f-e999995b1c00',
  'x-ms-ests-server',
  '2.1.12529.16 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AovYd5CDMLtCoQpm_adSKW3Lj78gAQAAAPuyr9kOAAAA; expires=Thu, 31-Mar-2022 06:23:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 01 Mar 2022 06:23:54 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.AppPlatform/Spring/myservicexxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478ff8afcba229aa65b1bc78dd666dfed1a38f5eafa7d33c9fe5b38f461ffda05ae6aff2d97a39cb96ed478fceb3b2c9471f5de635def9e8d1bdd1474d5e5f16d3fc6c466f66b3ec60e7c1bdbddd870feeef3f78783ed93dcff666b3073bf7f61fe6d9f421015ce6ed5555bf7d5957e74549bdfde28faa753ba9a883b39782d17a521653fee37b1feded8c3fdd1befddfb74bc7bb0476f9bbf1f8c1fec7cf4fd5ff24b461fadaaabbc3698bf5a2f31106a78fe8b6684de478b6b45efddbb77e3ec07eb3a5f14d3bad20f9b71517d4430daeb15defe82bfaacedbf1f16af5b2ccdaf3aa5edc7dbdaa0564f3760dfc96d9028d5fefd04744c51abfb719d1a79e0156594db39669f3519e35edba41b3ec8246f38b3f7a9b5fefd2e79759b9ce77d1b800d1ee36eb4933ad8b155e6bee3edc3b7f787f7670be7d6ffae983edfdddbdfded87bbd307db07d3f39d07d3d9e47c6f7ff76e9d37d5ba9ee69fd7d57ad5dc5d5cff74d3e64d7b97a77346b37377d360a8bd5280c842f8e9903a9f36d70473f1346b33e03ead73a2f1ecc93535cc7732c2e31e21f6e9ee747b7fb6bbb77d70fee9749b107e707f6767777a7f9a1100fbca1ba12f2142332bd4b1df1e1357d1b4eeed6defdcdbded97db3f3e9a3dd878ff6f6c70707f7f7eeddff296a59121dbfa866c5790160d4fc96fd87ef4591f09bdc88c92ff9","25ff0fdab240223e030000"], [
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
  '85c2d718-91e0-445b-b507-45e9c537b92e',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '11999',
  'Request-Context',
  'appId=cid-v1:797d7e4e-8180-497e-a254-780fbd39ba4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-client-request-id',
  '0590ca48-f458-4abf-b4b1-520f42c9e4c8',
  'x-rp-server-mvid',
  'ebc692a4-c2cd-44f5-bba2-1b5e5f04cb14',
  'Server',
  'nginx/1.17.7',
  'x-ms-correlation-request-id',
  '85c2d718-91e0-445b-b507-45e9c537b92e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220301T062355Z:85c2d718-91e0-445b-b507-45e9c537b92e',
  'Date',
  'Tue, 01 Mar 2022 06:23:55 GMT'
]);
