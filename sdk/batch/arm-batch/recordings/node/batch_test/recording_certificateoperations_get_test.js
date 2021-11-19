let nock = require('nock');

module.exports.hash = "efe3a26e7878182504d0754e824bf112";

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
  '664eecc4-7611-4b76-8573-207637f31700',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=ArDBvpQUZiRCm9GWWjeAApM; expires=Sun, 19-Dec-2021 07:07:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkXSyDjQMZjhy7n49nn_l331qoEL_vDRR9jbWZ6cBTBGAa2ZVHIGtPYrJPnZxlZAmDrTM18pQKKyL3BdG4sbWldeMAZH9sZy5l11SAE3apO5TbnVtnkJkCBscOHvbEevc00H0gX3itKTPQP-u-HvVXYW4122sRhNtUsPzskRJZVQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:32 GMT',
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
  'f2cd5188-710b-40eb-b71f-1e61918a1900',
  'x-ms-ests-server',
  '2.1.12231.8 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AhiDARwU2UxKgmK6Jon0EGA; expires=Sun, 19-Dec-2021 07:07:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrihMsnrWdJjo5pogik6UdZl_R_dIY7_K5hYL9LPQSoHDmfnCYu8qsGr9rd-j-QJv0uNx7yps5K1fJb5z3ftG2OGROnoL8LcApTY5jONbVUVSI8NzlWA-amWFkr5y0MKNiBsd9sM2OzX1OCQpUh9zmlh6QilCXQTNgOPKUEwKOwIEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:32 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.3&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=949eadef-d969-416c-8c35-302ae6cac59f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a7763080-2c94-4c8e-a565-c4ea85a64300',
  'x-ms-ests-server',
  '2.1.12231.8 - KRSLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArG959KVE3BNhP5g1xlb_4YWPr5BAQAAADVEKdkOAAAA; expires=Sun, 19-Dec-2021 07:07:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Nov 2021 07:07:32 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Batch/batchAccounts/myaccountxxx/certificates/sha1-cff2ab63c8c955aaf71989efa641b906558d9fb7')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147cb6c917ff4e8a3669eed6e4fcfcff7b2c9a7f7a607d387f7ef67d9f983dd87070ff3f3ecd3fdddc9c39d4fefdf3f983d3c9f3cf868f45131a397ee36eb4933ad8b555b54cbe6eec3bdf387f76707e7dbf7a69f3ed8dedfdddbdf7eb83b7db07d303ddf79309d4dcef7f677efd67953adeb69fe795dad57cdddc5f54f376ddeb47757757559ccf2bab9fb4531adaba63a6fc74fb2763abf3bc1bfc7d369b55eb67821935fdfbd7b77779ad76d715e4c330271f77d87d05eaf30f2cdddf93dd03b799b5dd03bdfbdfbfb7eb4f3eee0e9c3e3277b4ff6f7eeededdd3f3efe7d3fa206348c155ea1d68f7ef147ed7cbd98acea62d91e9717555db4f305bd0d44a9a9fb923e7b0fbca98bcba2218a17cb8bd72d2146afbf5e4fa7793ecb67b1efdfd4d9b22930476f0a9eecbd9dbddded5dfadfc3373b0f1ed1ffeedd1befeddefbf4e1bdfb3f4500ceab7a9101a997e7efe8cfd57a5216d3a7599bd1475f9c9d3da97f707272fc937b17c757674f8e2fce7ee2db3ff579bbf776e7f9c9f367bfd7eff3fb9c3c7b577e67f9f6cdf1779e5c7c553fbdf8e2e4db3ff1d5f1174f7e9f77cf9e1ebf7e72f1e2279f1c7ff1e664f73b97937b3f71f113df9d9593c58bfb5f3cd9ffbd9fbe39ddfbe2e9e9d5176f8eef7df1f4f8ea8b67153edbef7c7675fad3a73ff1c5f1fee7c7bb5f9d1ebffbe2db93c5c3b73ff57bbf789bfde0e4c9f207c72f9e5cbcfd45f3b7c5e70faf769e1cffc4e9b3e3e32f9ffcf44f1c5f5dfc3e6f4f2e7e9fd3e3f5efbdff7b7ff1ddeb5707d39f7875727cb0fbe6a7bffd655ebff8f2d9972b6ab8f7e5c14f9fce7eeaf2175dbd2abffa7d2ebe28f3d3df67efcbf2e5ec936556bebb2a7fe2e127bf68f2e2ed8bcfcf7f7a393ffbe2a2f8cefd932fcadffb62f6ea8b67f74e3f7dbafc62f9b65d7cfbd9e70f9feffce4e2273e7d7ed13e98cc7fef57076745fbeadbf9ef535e5edf7ffe9df2ead3e7d332bfff7b65cdde4fefbf99ff3e3ffdfc27263ffde48ba7af7fefa7fbdfbefca917f9fe57bfcfe95727c757a7c7c7d98be75f9cbebd7a75f5fb3cfdc9573b4f9e9c1e5fbdac6864eb9ff8cef39ff87d66dffeeae0f8a7bf7b3abff7e4a7defe3e9f9efe3e37d1fa627efcf98bbdabe35f74f1e46d31fff6cbf58bd7bfe8f77efa7bef7c71fcf6f327af9b2f695e674f7ee2f8e94ffcc493fbb39f7e99ef7cfee9f4de4f1d3c5dbffaf4f4272667f3275fbc599eecfce0f779392f2e7ed127ef769f7f7e70efc1a7bb67f5c1cbe2f5f5279f56efae4ebefd65f6fbfcd4f5e53cffeececb27d7cbf6e4ee779f5d7d55acce970f0e3efa25","bfe4ff0162be310078040000"], [
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
  'Last-Modified',
  'Fri, 19 Nov 2021 07:07:33 GMT',
  'ETag',
  'W/"0x8D9AB2B423225AA"',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11981',
  'x-ms-request-id',
  '06b57bd8-cfb2-43c4-aa81-ec9d8e9eb747',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '602ad4c1-6b56-4eb2-bfbc-1d18d163b2a3',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211119T070734Z:602ad4c1-6b56-4eb2-bfbc-1d18d163b2a3',
  'Date',
  'Fri, 19 Nov 2021 07:07:34 GMT'
]);
