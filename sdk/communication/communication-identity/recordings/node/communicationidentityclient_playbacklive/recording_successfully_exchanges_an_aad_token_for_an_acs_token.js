let nock = require('nock');

module.exports.hash = "71926565b52ae3e30b98e3244aa5d93a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/sanitized/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11774.11 - SAN ProdSlices',
  'Set-Cookie',
  'fpc=AvRIrWZIJWtEhH9dTES0j6E; expires=Thu, 24-Jun-2021 20:47:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlcKNcTZQ0V0CMeUZKPJiMgRAgTktZOUuaoRJSD1D4HL8whmTJWhZR8hziJBUL2T23E4yxSYv_fiGoVvFcIXxPSs7Qu67hGW_f6Q-K1UmxVYeL28Z9a3jWdDznT2oD2QCj44u3SkwkITZfGmty_hQ0XYGho_qFHoCo3FzTq95M_kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 20:47:40 GMT',
  'Connection',
  'close',
  'Content-Length',
  '980'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sanitized/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/sanitized/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/sanitized/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/sanitized/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/sanitized/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/sanitized/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/sanitized/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"EU","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11722.21 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AobSVfhbhk9FrPxNgi38aio; expires=Thu, 24-Jun-2021 20:47:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrHtHanpe19H5NjeYB-4VT1frAIQ3WSJZpU7JIsG2_EsNzqOmlTTczuIB2uYl5XX5M03QdlGerZDZMwJNAlyj2UPlQvYgdW0WwIZznUgHARIZGTQfD6eKlibE_WmM8UAyEGbuo32fW3C-SLjqkCSEx8ZkzYFOGLaVPkk2kh9HCs9MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 20:47:40 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sanitized/oauth2/v2.0/token', "client_id=sanitized&username=SDKUser@acsauthtest.onmicrosoft.com&password=XgAa?4dkbc$a$M4R&scope=https%3A%2F%2Fauth.msft.communication.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=password&client_info=1&client-request-id=sanitized")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP https://auth.msft.communication.azure.com/.default","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-9pA8Q1twRq33yXaXknrUxqj0_oMAU6oTAFwydITVmKOGc5DKkdvjlNRD1c4YqDXllWfxUpj8OdJWhEB98y95m__s-qiSzKV-r7h6-jKn8rtTaPCVsoXsvQn6ZtxVT4vgb0eCyRKZQUKivSeMinWofFAn4R_JLNqmHG_YJ0BiXO6A-2Jr95vSgoP1aUCVIgIojCDMkGle6ZRNw1XwmAT8ISl7yFggTh6RUIkwgvekUEanIhTJXLz-coIqtHumovVLbnl7Slej5G8iFFkbGYX5_uIbyroG0oNJxK-Yp3fRMQaB7lxPdukGfIoqFYQLoGfC1kF2xy_Y5D-sDVDsWmOH0vLzda7qqtP5JBJK5nKwSaQ6Su5J6yWiVVQqTSFLhthlYamPUkaPEQleya_XaOfUB8B976Za_g4Rd81p1Ldlj_a3hj9drajP7XX5NaYzVpDtI6xUc6y2VIJyTlAaFzFYdkz8DawwIaBi5tokVEeW0pG4Hlw3MPqRffh0nvXtJXm0G4gnJ1I9xGHiASWkWlEbWLgN8krd57mvSG5iF6yqqXAY8iThukafm5aI-AEXXrKHa8mSKPMAGGiIhQ9WGJphJDaMfLUgVPj-B27hzuWOIe0Eeq_XqSp-njTCtQiL5IJ0QWw7HNyZwvMA5UUspW__PlIQeFHEOMyrlO2iFyVGXkafmkNL6guy4KIbC9KjxB45QYr9DcwiGqRRJlH7xRqnbY9uOnz8_IzOVAaT6sC74cB3MgyvBzSKWdoIqiag9NIkiSk-geR3pU-tl-rkDDsP8viR7xg1L75fKJrmOJeQjIzVeo0vx4Hesw4f1HPOFv2gJkMv8vPWXaqG6AYZBYiZe_yZLwBes7hGH29mmJKxA9NUcgyECOT54rlU3HAwcoOh74d7RpVbHUBpU-I301gTq7KDAgP7610RkrJgeUC3y","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MjE5NzUzNjEsIm5iZiI6MTYyMTk3NTM2MSwiZXhwIjoxNjIxOTc5MjYxLCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6IlVIazJ5Z0VNZmsyQzFYaGZUaDJPQVEiLCJ2ZXIiOiIyLjAifQ.nGQVJgRSm75pTEqLatftyjlMoeZte_sAxWZRk5d8mieU4YWFroTleI2RcR60ijl0Jm3nj_AOsNmtz-dNrncH9dkY2ZcnODHZiidIjDfYzjeqItBItGgSaXthpBRUKlSE95STrRRplHlwQU7cawDhgFO9QDscKhKqczMUR09wVPYUDdlOA5Ybc6NfLOqYr-V3xLpienGQE_U7cYNkiBYi0NamsveQpZHMtiXhR1JfiG9JHtQzIEjKFWGZiFijgePXO1-LtuMGHvDig2-OM6rrxIdNCU7k0FRYsGMtzsKnLUb2AEgT7e96OwhF8qq9344LQnf6vUzJ0PzZQ3LSjUPmQA","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11722.21 - NEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ao4RFBCOqLRHsRTLAS5nuMO4k9TnAQAAAG1ZP9gOAAAA; expires=Thu, 24-Jun-2021 20:47:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 20:47:41 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4542'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-05-26T20:47:42.3337726+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '8TTCxpJ0J02ScIbnJ2QFjQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-31-preview1',
  'X-Processing-Time',
  '1163ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bWKtYAAAAAAJ0vYWcPlBTZUO3tThk4TcV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 25 May 2021 20:47:42 GMT'
]);
