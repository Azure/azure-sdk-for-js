let nock = require('nock');

module.exports.hash = "6c4609f6a5b5fbcc676d2f31d151cc20";

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
  'd59c84e0-9975-4d27-976e-da84c0d70300',
  'x-ms-ests-server',
  '2.1.12821.7 - SEASLR2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmDqe0x8TPxAmDrWXzC2_dM; expires=Fri, 24-Jun-2022 05:30:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBu3X25JAVbSgme8CI0UkPcTvbqPZehxP4VZ57dmf-PBGB0WDlbQCWFCM5d0v0fMeMFwdgUugEBnrf1cdeKCYimlowrPYo1uSzvju5nTw0TTAe4hKZpcgRwKA-P8m_5Na_FPmnenaodQs7G0p8hPze0Eeqt0uuis8bzXd3iG_zJwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:14 GMT',
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
  '96c0ae25-f52e-4aa8-b90e-78ccd6100300',
  'x-ms-ests-server',
  '2.1.12821.7 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AgVnDQElVc5Mh8ucloXTRZo; expires=Fri, 24-Jun-2022 05:30:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevridc2eyT8s8PGiHX2knG4xqLDH8bZuTcIamvRPKWQ4M7NwrLpka0Y-QQ7qVlPwwYrTuDthzms84MYQu4FyrYYRcCu3fkjpb0Vj-duKBxDoGvWd9GvnAkXm-bWxTfKFSUr1smlPKxkVdHydmxGaW5OrYczL16TKNeEIh7n_4qyB_EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:14 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.8.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=6d8b7d2a-1c9d-46f5-8384-13273c967f46&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '5a85cdd0-77c1-45d3-b8ac-189536880400',
  'x-ms-ests-server',
  '2.1.12821.7 - KRSLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqDSeOKzkuVKq_xBnPFKD9XLj78gAQAAAOe1H9oOAAAA; expires=Fri, 24-Jun-2022 05:30:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 25 May 2022 05:30:14 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Cache/redis')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffc5131fbe8d147779bf5a499d6c5aa2daa6573f7e1def9c3fbb383f3ed7bd34f1f6cefefeeed6f3fdc9d3ed83e989eef3c98ce26e77bfbbb77ebbca9d6f534ffbcaed6abe6eee2faa79b366fdabbabbaba2c6679dddcfda298d655539db7e3936c3acfefbeca67051ad6f839c547efdebddbddddfd68f451594d33f44db89c664d9b7ef59a3e5c660bc2f1a3e80bedf50adf45bbc0d7d945f3d1a35ffc4b461f113aabbc6e8b1c7fe3afcba2a18e8ae5c5eb366b01e3f57a3acdf3593ea3f7b8a79f24e4a9097db53fde19efeed3e7cddb355e578c5ed6f9a2582fe8f3f36c5194d7f888fe9866ab6c5ab4f4e72e759c2fb34999bfa896af9bf26555b71f3d6aeb753efaa858366db69c021f227f63bedcbdbfb3b34363f6daefdee38f7e502dd12946ddccb37a764633461f17cd171951bcb6709b9775b1c86aea1e1ffc925107f86e1f387d7423f0f3ac6c42e8fc490ffc5e1f3c7d14034fbd3af040157f5be8f8a007fc5e1f387d742370c6141f58e8fcc92ff9fee8a345b12c16ebc59bd29bedddf11e815aad2765317d91b75755fdf69858a3a199fae87489d9b42c72522dcf8b8b75ad4cfb8b3f5a64ef16f9a2aaafb75715bd4e5d7d9495e5dbfcbad92eeb35bd460da665912f5b407b406392cff42512a6bcbe24f88f3efa741f58d057e77576b1a017b88f0dedf4ab595eb6997e4eec9731e6bf1721f0d1a3e5ba2c471fcdaba67d210cdc17a9317f30e64fc657c572565d35e365de52172ba6f9a7f71e3c243a9b29f8f4de01b109a90d6a03baffacab109d90bb9745ddaeb352ff6cee52fff80592f9ee2ee1407f37fad37e4e8320996b8be9d94bc2747787a47a677c1f9f826d4eaaf5924644dc5a16cbb7f9ec35285c13d9bef77da223980cbf139b7dff977cff","97fc3fcfb262c33b050000"], [
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
  'd1fac3e8-e8a1-4709-b665-3aa0633d8315',
  'x-rp-server-mvid',
  '1628296c-6e23-4b03-a11b-fb9c3cab0b2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11650',
  'x-ms-correlation-request-id',
  '8ab37a18-4053-47f5-a55e-9e76c9569aa5',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220525T053016Z:8ab37a18-4053-47f5-a55e-9e76c9569aa5',
  'Date',
  'Wed, 25 May 2022 05:30:15 GMT'
]);
