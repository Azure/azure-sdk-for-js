let nock = require('nock');

module.exports.hash = "0b33336746428c641e40dfafcf71cd73";

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
  'bae650c5-8456-4d52-86bc-d03a8fc82300',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Amz426uYYLpOljncZha5VcA; expires=Thu, 11-Nov-2021 06:54:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmjrQl1WPmIUdn-Yxv5C9Ti7qe9e4PAOqt4deeJwOlDy4LilLIlktSXaNTmBE-8zn0Kqgz9Ndn_m9SeBCh-V4lC1cglFkxAwwLcllQrIU_nMSAK6zN_QmSd63SSg8PP4gCjZWr1HQkHXxFbrtdruASNtybV6xBRc5I8C5asRsG8QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 06:54:38 GMT',
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
  'd07ae7c8-a1e7-4dd6-be18-5eed9ca22300',
  'x-ms-ests-server',
  '2.1.12108.11 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AooGPZZDampKgmgGxOvDCgA; expires=Thu, 11-Nov-2021 06:54:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOj4hbIN2W4cosmRcSbbqSPQ9kTcn4kQX3UU5-dQYfth4MV5BQ6DHrbIAP5is78HWgcEcgZ8xJ8OHRBXZ-0bQrFMMgyEhxQMLxIDU_cPCssJi584s0ZTeYG1hmyVcZ072FcsH-Du5GsCYrx1DWYeMUe6zZCYtZklPLrdkaV7Elq4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 06:54:38 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c2c6727a-0c08-43e5-8a34-bbb1bea7f202&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'bae650c5-8456-4d52-86bc-d03a92c82300',
  'x-ms-ests-server',
  '2.1.12108.11 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AntZHVGOYBJFinbE8e3Fq90WPr5BAQAAAC0o99gOAAAA; expires=Thu, 11-Nov-2021 06:54:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Oct 2021 06:54:38 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/providers/Microsoft.Authorization/policyDefinitions/policynameaxx')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8afaa2ca6d76fae57f9478f3e3a59376db5f868f4d1a29ae1efb3e52c7f97cfe88359de4ceb62d516d5923e7f5a2d3f6ed3699d676d9e66e94f7e9166cbebab795ee7d47491b7d92c6b33409726b327d7f4d2f9834fcf0ff63ebdbffd69f620dfdecff6ceb71feece0eb6efefec4df24fcf77f667e7fbf4babef225fad9dbd9dbdddeddd9dedd7bb3f3e9a3dd7b8f761f8e771fdedb3bd8bdff53d474bda27ede0fbabe12817e7fffd1bd07e383fdbddd4f1fdcfba98f7ec94849f36a5d12297ef147c539fecdcab2a25fbef78b3f6aaa753da56f3ecaa64c95d147f92f5a672511f5a32f8a695d35d5793b3ea916ab759bdfbd2cea96befc229bce8b65dedcbdaa8b36a73e7ef147e7455ecee89db29a660aa720e4bef7519e35edbaa13fe5973dfa6d9a2fdb3a2be9d3efff92ef1382ed3ca7a6bff8a3fcfc3c9fb60464962faf3ffa25bf84be2a00f36eb39ed8696bee3edc3b7f787f7670be7d6ffae983edfdddbd7d22d1f4c1f6c1f47ce7c1743639dfdbdfbd4bdc7159ccf2bab9eb4671bc6ee7555dfc8011bc2b64799a9f17cb021f34fac9325be4d9bb7784672bdc746b00f40a5ea657e42bfc21909aeba6cd174f63dc94ed3fc876efed6c9f67f7a7dbfbb3c9cef6c3e9f4fef664fae9fd9dfbd383fd07fb0f08807d4539fc78b5a21e180ff7ed31681772c3aef0daa7fb3b0ff71f82d74a9a852faa5941f345d0a8fd2d1108df8b62e13789a0a28cb977ffe0c1fe3e31e62f","f97f00b9ec58c1c3030000"], [
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
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'x-ms-request-id',
  '9a49b2ec-50ae-4e89-843e-83c740a60719',
  'x-ms-correlation-request-id',
  '9a49b2ec-50ae-4e89-843e-83c740a60719',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211012T065438Z:9a49b2ec-50ae-4e89-843e-83c740a60719',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Oct 2021 06:54:37 GMT'
]);
