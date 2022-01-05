let nock = require('nock');

module.exports.hash = "069e5ab3202ac8825de7d59059befbac";

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
  'bf2f8fbd-74eb-40ff-afe0-ffdb8e013100',
  'x-ms-ests-server',
  '2.1.12261.14 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AqPPzGha-RhBkMbRnvbm1qk; expires=Sun, 16-Jan-2022 08:30:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrViIwiwLwF8obduXViyvYyPx6OZAmMUBovMe4tSE_mxCxw05aKh5aOp9kPpiylrzM_EFtIyakurbwjKI2qUlE9zSQLYHSGy94I7Vjm43QAqAzK4yNLppbpBV6Tkz7iPacwBsA6mMhsaI-UmlAjcfXVrfnIvno1hL3Slv5dE1m3YwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:30:01 GMT',
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
  '6c4db82a-6462-4be7-bacb-5a9e92301500',
  'x-ms-ests-server',
  '2.1.12261.15 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArhVZ0jsHTBKlLqMTj0deeo; expires=Sun, 16-Jan-2022 08:30:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevreNANfXaS2MwMq3yZDR1r-_9lChln19YxMl-mSrG65zdb1cNZQXK12FgYiQI4S1cPrqrBq_38Q-2VIWZtCn_PVtpLSgs_hbd1RKKoGCa2dQ5aOemgwpB5OwyC9a0RzK817GnV3cQcYhwttDXpuRUpTFqm0bbwsnBEgUDBCsk8w_QgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:30:02 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=d65ae1fb-9d18-45be-a32e-b4401eb45a17&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'dc248362-e1c8-4d46-8353-bc9b569b1200',
  'x-ms-ests-server',
  '2.1.12261.15 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AsPijgUwRk5Nhu7PWimlsQDLj78gAQAAAIpBTtkOAAAA; expires=Sun, 16-Jan-2022 08:30:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 17 Dec 2021 08:30:02 GMT',
  'Content-Length',
  '1393'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .patch('/subscriptions/azure_subscription_id/resourceGroups/myjstest/providers/Microsoft.Databricks/workspaces/myworkspacexx', {"tags":{"mytag1":"value1"}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147abba5ae5755be4cd478f7ef1478b6c995de4b3577953adeb69fe795dad5767b38f1e7d74b7594f9a695dacdaa25a36771fee9d3fbc3f3b38dfbe37fdf4c1f6feeedefef6c3dde983ed83e9f9ce83e96c72beb7bf7bb7f6a1347717d73fddb479d3ee7d34fa6895d5d9226ff39a7bcd97d9a4cc9f51bfd96275026cce8b69869ef06d7bbdca0983275555d29b9759b9a63fcfb3b2c97fc9485f7d51bd5c4fca627ab6baf18565d67e9eb5f95576fd225bd0e7b6f9ebb62e9617ee05b4dcbe90a61fd18bab3a27acf3d3e5b4be662a78efc6bb5a294eb7eae86a5b9a6f172bf456e7a560d8acb2698e5f3641984db87d4624beba9f5f4ef3ea6a4fa0fca27551e767cbf33a6bda7a3d6dd7ef350233836fb20b9e286dfce5e4a7f369eb9affe28fb2d58a70d729fb6896b5d9a42ea66f1b6ae3fed8ce9797455d2d17f9b2a556844ffed12fa15e9ab6aa89eb8ea7d36abd6c6f1eabb6ef8d563f5738afdfae6f02f5bacd96b3ac9efdfe9fbf7a0d0097cbbc3d9ecd68d4cdcb3a3f2fde6d7a797767bc7bef210f8064e8b26868ecd48260b6f8faf57a3acdf3593ea357b2753bafeae2074c1f22e4f72076c5725aacb292a5eb61f6603f3bfff47c7bb67bffdef6febdfd83ed870707d976bef7e983bd877b3b933c7f4870eaaacc9f125ecb0280f8cd83fc1ebd78ffc17676707ebebdbf7f6fba9d3db83fddde3bcf0fa6fb93e9e4d37bf73ffa25df1f7d34ad73426cf6e41a63aa0abcbb7f9e7ffa70efe0c1f6f9cebd3dea756f6f3bbbbffbe9f6c1fec124fb34cb1f105cead59b5bee32dfc948c0ef91c47fba3bddde9fedee6d1f9c7f3add264df0e0fececeeef4fe340335d72b9afa1f6a8f5755fd96e585dfba778ff4d283fbf70feeed7dbaf77017806d83afea925a10d4ed6eab31fd2ffb01890921af7c3b26b6a09795824fe99f370518eba3bd9dbddd6d4266f7c19b9d83477b0f1eed3f18dfdbbfb7fbf0e0d39f023e3ce6bbcdfa9bd29c7799d166a435ef7e514cebaaa9cedb31e1a378deb5c3c32bf68f77ef08f965c618773f56e6be011a356cdeae318d0a86989c0507832c2b9929faf88a705ca375abfa62714dbfedd2372c34bb1ffd92","5ff2ff006e714c3a71060000"], [
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
  'westus:203c7885-73ef-4ea6-b162-77f433f2eb5a',
  'x-ms-ratelimit-remaining-subscription-resource-requests',
  '149',
  'x-ms-correlation-request-id',
  'a2d0b57f-4a64-47a1-b2b3-406618377fcd',
  'x-ms-routing-request-id',
  'KOREASOUTH:20211217T083012Z:a2d0b57f-4a64-47a1-b2b3-406618377fcd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 08:30:12 GMT'
]);
