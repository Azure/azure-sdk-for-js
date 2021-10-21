let nock = require('nock');

module.exports.hash = "51a56bee07b9f805b265df9075d533b5";

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
  '2.1.12108.11 - WEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=AolfSDoAkYVCjw3oUhmd_2A; expires=Sun, 14-Nov-2021 18:36:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvepOC3R3xXt0vmSgGWUPshLMsm0XfQ1LZNWmtq6h-nIvJx5A3dU_XXM2azLIXgbJ4LdpPw3xr4AU94S8o6NREzycj27MbGP6s5oSX0S3-f2R9ViGqTRfkVggTJ06ngYpAQNYeMTKZVT-n1iNNIW5djNsn1f2PWHeOSmWEtc4cvMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:16 GMT',
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
  '2.1.12108.10 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai-YSCLl6lJInlW7EPh7APA; expires=Sun, 14-Nov-2021 18:36:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1DdKq_8j-XfruwjNXgRfS7-_3THo1Dj0npmaZVdgJzlD9sf0CClBGQO2TQx7a3qzm3KTPP_hvgmRRuDzGAAYJVKmuHA4LYn8SJT5a20VoyeVWRC5pKWI4aZgAp2hvK3WATRx6M1u2tbx0ysEdWcZOHU7IDZZU0Y6rTgNq3iF2fggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:16 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P84sbV6Bg4LtFUhO7-NWVBxq4NxbkmKg-oZMEuLuGfdFFjjOVo3MBiB3kjbYdYKsZMonAx5SPKRxZj158LXwFyP1JNXWWfyCcgjwPbx2gfZr3xZXuGSWXQcXsrel0FSC19IRVMbZ0cf72WiFv-ao9xsCHgc9ogAy1SMKKQpzMaNtSpUUgSolX7X5Rc9WfrUi3pcEmH3qpQBn5e0ssXSO5oMMqbW5nYy8nfR5ydphu5WoAEq_2UmIlIWnfTYXCKCNUH_UrSqEiS_dJk0ez34KYzTsNWz6ue1Lj4UVegWhF8CAPNqL-04GuAV1vl9teql-H8G6DyvRZmDOkgplMHF6K9V8nH-y_dPtiXQila7ruX0CxIvKlSxhvVzWU8YzeB9-em3x6gIl6Vqmr3qbUmHjlR1i1dODMpt2PAiW3axMLey2I5PFTZM2jjRk_Sl6ch9l0bvz5kOyzqIctnv68sQwXJQ_EV2b02bjsclpnSdGZUCZxJcfCiX-IVmK7BozyJJcbGtzyDiqaj8b3TWVSsY2heqkL1bf0V7OqH1fjPY0iHui6TU0i6cG7N-htgCTHsCLnCOJDbfxC6kWR0WcVNlhM5i-2r7tgScTCC536tB_TtFU08t9nqivX5rrAVBaqC44IMeNUow5bD-yIJOYadYM17dz5suFDaClONBdGYo7L5Lsa66hGwp6z4QYxrzAOgB0r5CB3m1goIdSwzZxJ0x0sB6glVQdvuSfCsF4fPXh5Dy3h_iu67M1SXaq7VdlniO4iKDe2zzd6TApW_l7VSaf3uD04byUnGaArpBDeebWSU39K9uc0hediI1UUWlsGekEG1T5QzxKB4agcxEfkoi3aip6Kwdh8FHvtNSYXKoc8wZddBBHTG3Lq9wp3A3J6P1dZ5jIFUFdJbnc5rrxITfZOfO0dIxKONhlSuJAJ6_XtZJzWkGxzBH6IPhZivdF5JCIU3nXYDEkAm0FtO19aXOLQVF1A5wWII","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MzQzMjI2NzcsIm5iZiI6MTYzNDMyMjY3NywiZXhwIjoxNjM0MzI2NTc3LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6Ik52MGJoRTdUaDBDTGcxcDFyajlvQUEiLCJ2ZXIiOiIyLjAifQ.GE8T4YjNrUR4apWUZjJ7BOY_GuqcziMebQjMfnqcCGusaHMMmT09SHM37vSV3vo0E4oAgUqgM32Z_PV4gMLYX63NOm5IlPxBuFOO8cQzYzZ7k5_mXErmSUdYX8xgSmZEiscKW8REyL1t3oGnSYQRyjJl1A4OZz6-ml81IPE2xOkUoJlV_5iLkCXMIKkpa7R3T5bEBnuaHFPh15mqqoed1rHlnfnK42tJ0ASV7_R1a6rffVWm3wMuiZTWXqPR53rF0Gk0KD9T2aCcWEf-ywB4YXbnNKqn1RC9EX-FBrtzuxyPE0SK1R-TVCC2Lv_qYtUNe9ZGqp9QNJUBDu1jCtGerQ","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12108.10 - NEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AktWbAW_QOBPlwyPXbZYKZ-4k9TnAQAAACDB-9gOAAAA; expires=Sun, 14-Nov-2021 18:36:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:17 GMT',
  'Content-Length',
  '4593'
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
  '2.1.12108.11 - WEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhmLFFp31sJLsctqR5BkfJk; expires=Sun, 14-Nov-2021 18:36:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPNpgfu1XgovVMMYCBlMAiLu9QHns2iiODQGBWRlbwnV6glGkfzkfs8rM4sM2WfdmHfXVq9CuRjVLSnscdtKlNOgA9uR4-n7mVFdLyu9A2fIaSLJwpAIAf8ut-Nxfubx4yDQARiccABO9r-HJ_gAZ8HarcmmHmn-TQ05K9HszH-cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:17 GMT',
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
  '2.1.12108.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AldVB5nz4EhKnTq5Ij9eHic; expires=Sun, 14-Nov-2021 18:36:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-7QK-3qslFgUQnqzRojqsjll-3MnRIfSuO4g2M4PhktgxX54ISf69XKEA9l8gic49O2-1OlTDbeuQk9EyLN_DPSI5_y7L3Pdu7WVSbBnn4Is1k-9wN2mAouGQnwSgCL3-a43_SV7_v7hsIpaOpKdIGU56ufwLbbh0eH9mVXZPxkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:17 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "client_id=SomeClientId&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
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
  '2.1.12108.10 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ArQT_AUknlJFqn-sDDct0v8; expires=Sun, 14-Nov-2021 18:36:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:17 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-10-15T19:36:16.1982604+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'EVEN5jx0kEO3IDbPncX9uA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '841ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0IcppYQAAAABUSmU0JBmSRo7P0H/onrZ/UFJHMDFFREdFMDcwNwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 15 Oct 2021 18:36:18 GMT'
]);
