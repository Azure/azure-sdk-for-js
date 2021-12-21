let nock = require('nock');

module.exports.hash = "7cf4fbdc9b57dfb28a2aee73be78bc47";

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
  '308adc6f-5ac2-4a02-b79a-da33cd650000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=At3bm6_Oh5tOmljgfI91-_I; expires=Thu, 20-Jan-2022 01:09:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruXPZLszYr0_cw9Z9lr53hdmPdnj4Y8299bjF_0UOGM3QIwELGgKpUZoVy9q9PhIPExVR3_fMhZyaFIOoXe8dZ-GZN9E30mIXCDCX5wdd7hq1mXJgFoYuXPM5LdSpjEy7E7DIpQ1YYCfh_pSwrbdLQaeLY9KCOzxy6V1dkGEyUJcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 01:09:47 GMT',
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
  '7777f699-653d-4eb0-b230-12e513680000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Auix_QK-iHdBpOvQOOaVKic; expires=Thu, 20-Jan-2022 01:09:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr8giCshtSkGIvGXsVWszEZ8O7sraR9YeSj8h23oa_NxCaYTf8NXwbzfv5axWEJuJIMp5Yp76ggUFPati2Kjfq7Gj9vc3ngAfiCOhjmvwN8IqKZnth8SVSslt8uHTzds0PKZhk67L8ZD3ICzmqNRWPiPZlq31s2tiWYCWhC7j_WOggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 01:09:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=8de68596-6fe3-43c7-9f84-33497b08148f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '308adc6f-5ac2-4a02-b79a-da33cf650000',
  'x-ms-ests-server',
  '2.1.12261.17 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AlBUA6dquvZGpfxFke3DZszLj78gAQAAAFogU9kOAAAA; expires=Thu, 20-Jan-2022 01:09:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 01:09:47 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('//subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Logic/workflows/myworkflowxxx/providers/Microsoft.Insights/diagnosticSettings')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534bfa8abf5aab9bbb8fee9a6cd9bf6eeaaae2e8b595ed347c5b4ae9aeabc1d97d54531bd7b55d56fcfcbea8abeb936bfbf7bf72efa46b16c8a8b79dbdc9d15d9c5b26ada62fa3a6fdb627941adaedd87f4febb8f461fb5d72b1ace475fd8f7cf86dfa7e6cb6c81e611406535cd40848f1e2dd76539fae86db12402c9ef6d462febef84f32aafdb22a74f7ef1474d5bd5d9457e3c9d56eb657b466f7c10493f1f24a91be06be9f26ed8355ed24f32f9e4fafa9a86d5e4f56531cd9fac9b57eb320782320c4c43b3caa6fcd107e17c1b3600c998ba5969e7d762400d992bf80f998cfc325fb6df5e4f8ed7edbcaa8b1ff0bb66001f84ed6d287caabddf05b7305678c1fe4128decdba88a145ef436ae90de6050120ec17d7fcc17c3d91af17795b1753e2a6ef7d1f5c084e23e92466cc2faafa9a5ef82ed10612f38a26b5201023fb250fc6cc68becc26654ef469eb753efaa8ce5bea8510795995c594e0fc62d7e23c2b1b6a32cbaea9b39d5ff24ba4e3639a9d6b1288e62911a658f228deb078a1835f32228d01882dc1e20fbeff4b","fe1fc6e841354f040000"], [
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
  'x-ms-request-id',
  '7ff81124-18ae-4d76-809e-18dbb61029ca',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-correlation-request-id',
  'af6cab94-4448-4ac6-be63-271c4b683bcf',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20211221T010948Z:af6cab94-4448-4ac6-be63-271c4b683bcf',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 21 Dec 2021 01:09:48 GMT'
]);
