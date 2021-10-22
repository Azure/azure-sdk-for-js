let nock = require('nock');

module.exports.hash = "fd12cc7ebda641aea994a48c55503671";

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
  'ea3e9b90-f5ac-4be3-85d3-ff0285fb1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Akbw2k6JxBlCrFox_QgAKfc; expires=Fri, 19-Nov-2021 07:58:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmYUSEJ_x2hDVkUtw5xDhXeO9sOJZAXYhIFh4SccGCpqT-wHgWaAM8WCvP9wbRzq9ty7vecgf7VgHWK9cRqFaJAqk8-Uf7J2vmsoHhzxCZlYwyfYewLTQ9DBModuaIL3Onsd_BmGFL6SUAZIjuc1_eJDbq7VzZSEsVK7voPkUit4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:12 GMT',
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
  'cdee7f40-c5db-41db-bba8-8a2808f11e00',
  'x-ms-ests-server',
  '2.1.12158.6 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AvhL9xnTstZCtB_ZyuGvkbQ; expires=Fri, 19-Nov-2021 07:58:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYD0DdcdFEHFNRhSSlKJVtw1gfD8zQw9yDtuaTNg9jMN_gaLj9L-ZhNiFXebmAJ9cXLylyUlcsS5J99DdBLhsnz0PJdNF67X-8swDMFkpHm4vvmyh01NA5KmQg-9ccnYOpK4rxl0rtYJrDhCNX3YrIE57pAmepxqn8ZBvWD98p80gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2390eeae-af1c-427a-9469-45ff3c050c1c&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  'dc166749-de8d-4169-86e2-e69f791c1f00',
  'x-ms-ests-server',
  '2.1.12158.6 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ak-BGtAhCHxItm7HuH5HXNIWPr5BAQAAABTDAdkOAAAA; expires=Fri, 19-Nov-2021 07:58:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Oct 2021 07:58:13 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.ContainerRegistry/registries/myregistryxxxyy/tasks')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc517bbda25f3efaa298d655539db7e3936ad966c532af5fe51745d3d6d7776bf9a5c89bbb6dd6bc6d3e1a7db4aaab555eb7f4d1478f7e31feba2c9aa25a16cb8bd76dd602e0ebf5749ae7b37c46ada7759eb5f4f553f96a6f676f777b77677b6fe7cdce8347f70f1eedee8cef3d38b877f0e9fe273b3b8f7676e89586c0ac09f847a7cb6c5232945599b5e755bd408f15be7a5e2cd7efe88bac9ece8b369fb6eb1ae0b3c5ecd3fd8f7e097d7e912f5b1ace7971b1ae1901bc3a5dad3f7ab4475fb7c522afd6ed478fee7dbab3831ef315be57823cada66ff39aa0170b82f3225b60a8dffba8cd9b16447874b9fbd1f7e9cbe6e5ba991b1c1fb5f53a1f7db4ac4eb2e99c809c6765437fcf18d4b3a2cc5f66eddcc2c607047f4af4cedfb5fad5bc6d57cda3bb772f8a76be9e8ca7d5e2eeeb36bfcc9f539f797d7759cdf2ed795e96d5555597338c9226e6e2823025d42759939f01dd37c39fbd91e1bd5a2f317eea7fbd9ad1b4e8b72fb3ebb2ca66dae8697e9eadcb961a45a6634924a10f16d74f3a3d7cf44b7e09a15510393ebadbac27cdb42e56207e73f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa769669af62e33d92caf9bbbb7e4d5c5b5fe71fdeeddbbeb6be15dfa143fe9137f08eea336bba061121750976ff36bfa5644854654565365a28ff2ac0139882ed784dc82f83ac34bcce7f9ec095e3bcff61f64bbf776b6cfb3fbd3edfdd96467fbe1747a7f7b32fdf4fecefde9c1fe83fd0704c0bea2243f5eadca42fbb1df1e1393f6a566e7e1f8fefec1c307bb0fadd49484d717d5ac382f00925eba2516e17b5154fc26b7c4e797fc92efff","92ff075f8b40246b040000"], [
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
  'x-ms-correlation-request-id',
  '1c4f49cd-2aea-4890-9ab8-c2a91d3c61cb',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11992',
  'x-ms-request-id',
  '8e5f9ea0-1cc7-4294-9ef8-ebc2305fca2d',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'nginx/1.15.10',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211020T075814Z:1c4f49cd-2aea-4890-9ab8-c2a91d3c61cb',
  'Date',
  'Wed, 20 Oct 2021 07:58:14 GMT'
]);
