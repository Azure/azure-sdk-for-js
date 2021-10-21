let nock = require('nock');

module.exports.hash = "db141a03ddf108cbb5b30d6f1fe930d5";

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
  '2.1.12108.11 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AixFuG4CH3ZOiN9HJK3EWaw; expires=Sat, 20-Nov-2021 14:09:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrPHK1BvfcaqcJt85UNFhs_DTXBlvq8xwM0ZHt92uWBNUl-YYLrE-KBuUHOue9kDkDinXDSTk8T1n-UdGISQ9AQZbrE5ps5lsduI225ecUhdPOSIM972YStp7dL8Z-cyJsMUTIKaKxXch9WoKKSOUtYxQ7JeN_iOB6eIsHqltUD0AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 14:09:11 GMT',
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
  '2.1.12108.11 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AmAkrIE2KlxMuh5aaqBPoNo; expires=Sat, 20-Nov-2021 14:09:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr1RSF1E0kmTt6JW8AgVEh_en6GJdYcGaVlFUcuoHdXdIs64VFvRUV1UB0OJlWEALdnyE2jwjVkr1EyfPdIFbDNOiGElmHMRkjk5f5N-b3-9U3Pqbw8kpyFbSn0ikw7z0-NpdgCwG7QrVp9YiaDBIcwmiLTRF-8CFlx1MH3OvBwmkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 14:09:11 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P_PDKkmJygmEx6NJO1o_vh-GBRB-09P0uYEu0uOCPBfYXy4WOjY9S-9zYJfUGn54mIlE3XRC3h90-YroyU4WD59kIECuCFUm9ugk2F-NaOpssX3L-88dIUp3hp2xpAKsKPpolFqgrEu9HaDOFrea1d45KVGCHZtOvejTHCQZSfmdbwFoEy91MzSIS99YLCEEJKFDGHgx7YEfVQVlR9dTDGehZmmzYLsaCdKxzR_iNksNWMlx1xjtST17eibllpJuDT1kwRIa6G4mI48E3jFgcZtzHS2SCr6Sa47WMbQXxMzgV6sWNNvq9Cowps9P7lQZtgAX2sqbkv-0qFUdzYOMeWnKSOjkjK0M4G2WZICsHft2rP6K2pKcNVlyU0e0spuPUDszrWOG9a0rX5TINFoVdHfHh8zmLxOuZCUgxGr_J2cEs4T6ZJCEefbtGU3pxO6W8MqgZHK_G1Vq3al5BNQdTXrAtT7stHW6WwLJeBK7YneruHa9r7ZC5XjePjqs3EmAnt1Y2MB6qE4rfMdNKsz70HHmCxoIwt2G4OYmezm606t-IszM1XHjvxF50teTIjbMRSzJdwBDjslFAZnwNH_TBGXvn6ZdJD5mpQhYVMFDNFaVcxZbLw0U7s98pzq4s_9qbU0Ppecn6AyMJbZs-QZdzHya2PNrz5G4yObrkXMGka3UvWXgqljQCFg8enSGaHu_ImG_soSMV8K-Rc2MlL-dXmIKruqGlflaD5MXe5kofxblk4Qnh9e8WHm8NAJPBf12wP2ILTn2ZpNS7jBpzMlvdOkgeP5Xzt9_LKMSZ0FGuCfInjHcHVbI9nAg3rMhNR4PBlZxXeiyL5cV6gBhJLjhgVQeNkudTkaLr7pqnYpnuTDm-16FDiw4akDjzR6aFUbvGAhRZHpcFl29TeFwp-iZhlAU6GbvGCmBYsASdmnlS2VikU","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MzQ4MjUwNTEsIm5iZiI6MTYzNDgyNTA1MSwiZXhwIjoxNjM0ODI4OTUxLCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6IkZnZUlQOUg4U2ttWXdSOXdxX2M0QUEiLCJ2ZXIiOiIyLjAifQ.OsaIn908O0SiZTMW1yDHCxxXmBPj6Zn-3FlKsdqxPQHI9FtriQP2FZPDaIK57SFAh4cpIIZ1wRxNMvQAVHpdKYqikPPhGzWNBkFsG2UPNREcvYhUPcvBNOR00pyMaMles1NsnOMqGEPo5oAAXlGEqbpkGomZBcIdXTEFbg3LgyV7G95D1KfdnEUra0zy3AttMpTDxRoDQr5zErGLrrS_636CPEHN7_8BsXCpOAPQF-JrGuLBOQn66HEMxna9UKcANaS-BREr6lWp3l0l2f8ESB4w0Vlu-_XdMYs7VudLo1JpG16W029BTWfapyk2psYZYgrM3uLCyGtWCxmvU3kK1A","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12158.6 - WEULR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AiQBqnuIZ_lLuG3xHoib_3G4k9TnAQAAAIdrA9kOAAAA; expires=Sat, 20-Nov-2021 14:09:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 14:09:12 GMT',
  'Content-Length',
  '4545'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-10-21T15:09:10.2228145+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'csoDSH71KEyUZ6QAMNqwgw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '346ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iHRxYQAAAACKzRX0oIoiQIe4JGn5JWpGUFJHMDFFREdFMDYxMgBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Thu, 21 Oct 2021 14:09:13 GMT'
]);
