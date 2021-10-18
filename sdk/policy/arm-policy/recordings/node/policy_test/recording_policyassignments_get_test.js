let nock = require('nock');

module.exports.hash = "da175dcb796641a7d5ce170197d3482f";

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
  '6e696c6f-a9ba-43a3-bb16-4b5882ea0f00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ao96P-vBZfhDgjUkdDRbWZg; expires=Wed, 17-Nov-2021 02:55:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKw3bAu1H06nS6Z6lk88UHVzxgLzqSOUuI4m_oEs9R0-Lp8SQtiGXDy6aXrVSTfT_olcOV9dSENyNfF7KCgT_F2vdvYj4Ex0icHzHYngbqHiJWSiRzbeXUvtaLJK8puV3r7vHFdkh9SNBA_f6QfIdceRzkM3QyWKAF2hRV64W5awgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 02:55:36 GMT',
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
  'dc166749-de8d-4169-86e2-e69fa0e20f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuuUROv_FhdKtVpvCFlbakI; expires=Wed, 17-Nov-2021 02:55:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDRNCLW1n_npz5yW9OPS1b9idWNhyekulr23k8BLlloJY7DzMO0JE3B-_L7lUMdDcc0hKX0OsxAey0nFP5T-c6X18JmBvXg5X4hdNe6k5NO71_xEq2pZHydESPwu5elFmBMKJTEcbBoAnqW7SjhRT-wNm8HDFCctNLMJuemrT4_ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 02:55:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=756733e3-53a4-49c4-972e-37820fe49233&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'ea3e9b90-f5ac-4be3-85d3-ff0295541000',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AtO-F_PgTHlGi5FoFohIWjoWPr5BAQAAACjZ_tgOAAAA; expires=Wed, 17-Nov-2021 02:55:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 18 Oct 2021 02:55:36 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//providers/Microsoft.Management/managementgroups/20000000-0001-0000-0000-000000000123//providers/Microsoft.Authorization/policyAssignments/passigment')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478fe8afaa2ca6d74ff3f36259b445b53c9b7df4e8a3bbd4e6b298e57573f78b625a574d75de8ebfc896d945bec897eddd85fdf5f3ba5aaf9abb7b3bf26cd3ff77f10fff26fff0b3bb772f0af478ddceabbaf84186beef769169f49365b6c8b377ef3e1a7dd44c09f9f7c2f0e2f61812fc45de66b3accd409a699d676d3e7b724dfd9d3ff8f4fc60efd3fbdb9f660ff2edfd6cef7cfbe1eeec60fbfecede24fff47c677f76be4fafeb2b5f2ee995bd9dbdddeddd9deddd83373b7b8feedf7f74efd3f1a7bb0f76f6f7effd14355dafa81f81be5c97a5fd00efe2835f32fa285f9e57f59447f14535c3b08934d9ba6c3fa22f8bf79ba8f7204314686ca28e9ba6b858023a4d54863ff03b8dadbde649baf5dbf40aa6985e09c034d74d9b2f9ec6a623db7f90eddedbd93ecfee4fb7f767939ded87d3e9fdedc9f4d3fb3bf7a707fb0ff61f1000fbca1b41e878b5a29e1909f7ed714bdfc426ebfe439aadfb98ab326b3003c5790160d4fc96fd87ef4591f09bdc88c92ff925","ff0fb9790b49bf030000"], [
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
  'x-ms-ratelimit-remaining-tenant-reads',
  '11998',
  'x-ms-request-id',
  '46487860-a668-4859-8242-7df91b89488f',
  'x-ms-correlation-request-id',
  '46487860-a668-4859-8242-7df91b89488f',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211018T025537Z:46487860-a668-4859-8242-7df91b89488f',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Oct 2021 02:55:36 GMT'
]);
