let nock = require('nock');

module.exports.hash = "e34b7a3168d3718ee63cf7d04caaed57";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '00000000-0000-0000-0000-000000000000',
  'x-ms-ests-server',
  '2.1.12381.24 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmZouuGakI9ImrTzqbsyME8; expires=Sun, 13-Mar-2022 11:19:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrjFe_9EDgcLVVSMplu5_Zoy4ByCJjKp2qSPvK2tQGGuBx6hcSGcJr7JztPx97wQ4BVCTdkh7g3PzfFmAQhMXR3gqv75ks5nTfUq0jV7-W7P7cgRv2ixMT4_D19uoxD_48NzM5GisXlgdeVmS3oVpJTFL75CDmSHWHPPcQ3iuVYAkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:32 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/00000000-0000-0000-0000-000000000000/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/kerberos","tenant_region_scope":"EU","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '00000000-0000-0000-0000-000000000000',
  'x-ms-ests-server',
  '2.1.12381.24 - WEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=ArqUYu_oGqZAtzypC_ZuIPw; expires=Sun, 13-Mar-2022 11:19:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6r3vr7NhJkinkPjJGAt5M-ykKjIswKrxI9u3WL5Yefhccsy6XW-ClaIMckX1iwLQAxl4JoCzFjMv9JNF5HwMILZe8knLDt5zJMxneDwPtMqfEL16CIxNel1xoas8o7rIRlCeCJwov7FPsh8rotwjZAPkG7aQJKfTGhxyGBdqpvQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:32 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":4992,"ext_expires_in":4992,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-arzHgeDTGFx69M19c4w86ufA0iR86Zo1To7DrcJMDZbln1Mxvst_ArAQxVoBqdp3Gp4i-AwlZxhC_6nsB_yEkKmVQcaBaZ-G14rfB4lUSMNVdWKjM0usGoTlZFLg027BoTHyL6f2JE_NVkz3P1wcwKIaAZi8okNuqscGzz3rEfdcO6ljDvnmYTZ7WwASYFnTPc6Ke0u8U-GM31SJjVUwDNQQaRvfhEoX4U-QpQ0R0yr0t01ajVh9YErBqlpShGoD_ztgV9BxcXKl8L7dCjC_YwpcG9m9UsmJbiPAIZsTRRAbIsuGgxMqDEnewqef5mk8dSzz8jhICIfluMlGNNDuQMOeaX6_K57I_nHTHjG5PcRKLpzYAPhZDzb01dlMIeO5uFX7G53odSxyWHCnDYGgp9ufsY3hhxA3aeIyCJtJkdVOJ4gcNOy40vUVHWMGqUficgcSruxGGNwHiPSEUv333y5Q8A6dd7yPnmm7X7UicCErf6dW27zI-oUK3pMM9YZ7PVn3WBTJN2jwaTnsofWoMsww82g2082LqpSyvsLOcrBuUZ49IfYzVVMBULmKxCqrfpp-t_oOalbL7WUfG92dNG5mHjJnhLrZS9mb_CzGf73tqFKWWQcOcs5OSIElNJ8_7QstTcsCtpUlfifhazYyLK0b_T-GGOFeTsN5JUyXXUoNIiuDWiEoU2i4lx626KDlKVk4FoLYUuCxrWv6mvlcBdl9dIWpT2Ukmbq5djujqBsYxH59vXrDp781g4mn3J6IClWKp0iRlixrAFHD_aVaHQPMQUENYq-EsXHGx_j58rST38Njj_4WVqh04_n1VOJo2AAoGkTVjEdyBnT_omjRPzxa7TFt0CK1v3-eL63cftjZ1cjVHG8896SprSJM7x1PoFqlLAhOsItdhE72ny_1B9yydelL5mLh5iEfkAFMADKM","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2NDQ1NzgwNzMsIm5iZiI6MTY0NDU3ODA3MywiZXhwIjoxNjQ0NTgxOTczLCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6ImdiMkhKUnhjOGt1SmlwYy03Q2NqQUEiLCJ2ZXIiOiIyLjAifQ.so395Si5ef97gxmuEM0QVb7t6JFcgjbkipES_gtXcHp5Y5Kc8VwcoMtvSaT29naTOtCtJoqLhOxnhbdPZA_w2NTGGuelrL1Wh9L4ff21JkCYeYZxklRtcer_IwAGe7IaEzIDV-uQPY10g5TKe05uGRhRBeXlMSSj3nZEXQtmD3J4x6kKIsnFMzkcIUZywn7evY5vpIHlOC0V2-MaajKHdmqubXjNlqHtUUYYOSbqPnW8MHC198lp7Kg8cpYAvEpIbAJRssWt3a1yXeODqaXBSrLXDg39Im_FEqb2XHldGAW-xSjVm-khxP8RtQRyxK0n5BxEbir0jnFixGSzcEgkdg","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '00000000-0000-0000-0000-000000000000',
  'x-ms-ests-server',
  '2.1.12381.24 - WEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvVOF4MCxIRHrxd1Fo-i5mW4k9TnAQAAAEQ9mNkOAAAA; expires=Sun, 13-Mar-2022 11:19:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:33 GMT',
  'Content-Length',
  '4545'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/SomeTenantId/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '00000000-0000-0000-0000-000000000000',
  'x-ms-ests-server',
  '2.1.12381.24 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ar7nA9tH_EtEr1ibL4BnoJQ; expires=Sun, 13-Mar-2022 11:19:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr5cLp7-jKHXWOficyafo6ilrSo3rqY39o7jWRgwD45FvOUTEM9BeQU11xKdFQoYGWTMzxAPqr8cNLhXxnsYfJIP-ghBOLJwEYVToMpHmako8zzhEgTuIxUlHLrF8zN0CqG3BArasH4Td-VfngsBbD5RKCenUzxxUEylqYq95YiFMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:33 GMT',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/SomeTenantId/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/SomeTenantId/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/SomeTenantId/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/SomeTenantId/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/SomeTenantId/kerberos","tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '00000000-0000-0000-0000-000000000000',
  'x-ms-ests-server',
  '2.1.12381.24 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Av21vosifSNJj3lXXgEnX4o; expires=Sun, 13-Mar-2022 11:19:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrR_GrxgNOWLalNiKXpahSOSDSO4ecOpiwZXLebHEkC9xxeWOq-1nHhERqfsB5nui6BgWNaPcqvVkfvLtL-Svxry5cm6etFQrrNrzqfZWK1BVxSXzoX4jWTzvWjdberhW21QCUyeeXh3e4O8jNuPeaCc_Jorms6m03LHpGI5PbfeogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:33 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"sanitized"}, [
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
  '00000000-0000-0000-0000-000000000000',
  'x-ms-ests-server',
  '2.1.12381.24 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmRzlw9yS1dOivVQ2wrMTag; expires=Sun, 13-Mar-2022 11:19:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:33 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:getToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2022-02-11T12:42:45.4153762+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '5WeULlQmskiJSbmM4TfaDg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview, 2022-06-01',
  'X-Processing-Time',
  '466ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0RUYGYgAAAABG5KGtL/H8Tp9rprRCcgqOUFJHMDFFREdFMDYxNwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:34 GMT'
]);
