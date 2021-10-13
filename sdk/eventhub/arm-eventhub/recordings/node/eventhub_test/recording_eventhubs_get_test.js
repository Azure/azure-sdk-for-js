let nock = require('nock');

module.exports.hash = "cc91dec2b569aca558e2eef196034081";

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
  '2df955eb-876d-4dd3-8a71-ec390fa90200',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhXTlgUOFQxJpJjFYXgvVjU; expires=Sun, 07-Nov-2021 03:05:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXwrBlnYFX2JWVTu1s4CPc-o9igaAB0qCXs9vmmbEZ3M93jjbX17opJ6pUfGPDYxT9NCk3igcxNHONlEhVsbJpdO4mXs0YqtDNHSRy_ROpqznb09sdmgIljXv3bGJbX9mZOBcnNPjFHW9dvldiCT2ONywVQd_pN9EHNbtGUlJKA8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:43 GMT',
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
  '34b08262-d419-4c23-84e8-b4a362d31600',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AknwPmE_VVJGttd44ZuwirE; expires=Sun, 07-Nov-2021 03:05:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrBjYMexFbb9jW9F4LZJxsMjKs3UEInZTMgpxFFumI75bloY5LNncqs9_llCEQgEYXPkUfhurfAC4yyOIRfr86keVvAxdZeEeiyAbjSq78XFcVSs45FJk3hMU5BQxbSyjrBkLaJdXFb0-pwY7dFEyeA-eoyXxxjYyqsAX-RFrR6ggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:43 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=657b8e02-368b-4dd7-b458-6d187460b638&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2df955eb-876d-4dd3-8a71-ec3910a90200',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvJzpdC7_GFBpE3RjUwryT4WPr5BAQAAAIes8dgOAAAA; expires=Sun, 07-Nov-2021 03:05:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 08 Oct 2021 03:05:43 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.EventHub/namespaces/mynamespacexxx/eventhubs/myeventhubxxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8beb9f6edabc69efaeeaeab298e57573f78b625a574d75de8e4f2ff365fbedf5e4ee325be4cd2a9be678c1fef1eeddbbbb399acc090dfac2fc4e9f7f34fa08cd08c7eec7edf50a1f473a79412f30dce6aef9aca117ca6a9a617cf4d269d6b4e957afe943c27695d76d91371f3dfac51fd17b4d7691bfca5b7a8d9a9e2d9f66d7f4cd3e35cca8153e3ba9d6cb963f6adaac5dd3b71f1d4fdbe2322768d33acfda7c764cdf7fb4b7b3b7bbbdbbb3bd73f066e7dea39dfb8fee1d8cefeddea356ebd56cb8d5febdf1fd870fa895edf06c467d7cefa31dfa6c97febf47ffbff7d1f7a9b36cd5aeebfc696e670e43c897d9a4cc6952db7a9d8fe8cf69352b9617d4d5f1655dd1bb339aa462a994f8c586ba8650c7f5744e63191fff80403f2192bda57f26f45a48a8a6ad6a22d4f1740a6abc525638a36e7fd679e9b5747d3744012fe927997c225c3221ec4faa659b15cbbc26eca6f6f7d147998c15ecf2acaa1719e6e317e32f669e5f72f7171ba2d0af2fdd6cd05fbf4f9ed5f4e30b0236a79fc424f4efb76908f4e38b62b96ef1f6eb9c3a9bfd928f7ec92f197d542cdbbcbecccab3a57c4a44dcdddb21162a7e903f2f16457bb67c724d43a68f77f60fee3ff8f4de2ff925bf","e4ff01191c3aa39d030000"], [
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
  '22721803-c793-4a50-a770-4bcc7401cc1e_M11SN1_M11SN1',
  'Server-SB',
  'Service-Bus-Resource-Provider/SN1',
  'Server',
  'Service-Bus-Resource-Provider/SN1',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11978',
  'x-ms-correlation-request-id',
  '1b2746ac-8e63-4220-aa0f-cfdf8133b65e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211008T030545Z:1b2746ac-8e63-4220-aa0f-cfdf8133b65e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 08 Oct 2021 03:05:44 GMT'
]);
