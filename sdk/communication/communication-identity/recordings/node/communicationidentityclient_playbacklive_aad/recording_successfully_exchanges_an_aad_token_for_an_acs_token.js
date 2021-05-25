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
  '2.1.11774.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap1Uf_f1CYFDt6QWEWdZmd8; expires=Thu, 24-Jun-2021 20:47:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxLSpexs0u-CXbKzn1kuEbRlTPQbUCx5_UWdt2EeN4i1MQEMwKdVO-pnLHxkT8OAQWjc3uFIzAoZdFnDReLYwf161jD7MrdoEAK7WQA5x5ifkgTxu1Be5mGHPV34797Wzst2kIu0nFdVy5m2qIYPfl0SGE-crn5y5KAlrwTFKeuAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 20:47:24 GMT',
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
  'fpc=AoZailq0fmtLrEWIXU0EjzU; expires=Thu, 24-Jun-2021 20:47:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr28wYOgn43kgcqI_LEAr1nmIWTzYgEoKrznjJThByp56cf-VbkRv6WkMSF5EfyeZ49q_tCv8WKHdzo9RyWrcYDTZJXsSy1xIrT4lHy-hKjh4gBSyD-kBZKetsBz8m_X89lsrPKvpHvs0MKq1UG2NxV0CjoK88hMuCCB73VNFspmQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 20:47:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sanitized/oauth2/v2.0/token', "client_id=sanitized&username=SDKUser@acsauthtest.onmicrosoft.com&password=XgAa?4dkbc$a$M4R&scope=https%3A%2F%2Fauth.msft.communication.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=password&client_info=1&client-request-id=sanitized")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP https://auth.msft.communication.azure.com/.default","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P8Xip-cJRMVGJzY_Ut7n9TJ-BxnnTXQFB2ZjUyXS7343qVkhGw9Y0qmmTBd0NeHhVyBmSwf3JXEpkTj2Y0B36C9uuwLgOAz3Zae2MqydmCC-EY8wb578xlfIh4OgB7NaeSVheEpZwk-CC5rg-mM9gtuHTPQQIs5wMVEQe1kRXUVQbL9zdGdiBWIpQyVv5tdNHUGuSWS7BZERQ8Xja2PQg8diW7MRIqkDLyCXtrYYObJSqCUPvQWa2nOmw33739m_-9FFovmqCfHgBdnmlcUOCfsTedJ_QtivmorRcCKa-BtqgxnczGvRgYGdFGJMfFJ3BxspipJy38i7rSWCCc7eCt6kbXjrXc6eqNCxF43O0aGwg-e8yQOmGu_pfg8JJwCefAXp1bhltUHVcuxHLeqghMez7R8UVyY-RzSBVE01ge5HwbEtcxxx74w956ITK1soRxRJOoYgGQ1nukIXlAzAKjy7cEXKjpOxfFNKO1xQPeINqfmrvYl2DEPPmDwnDkTWCN-wdPy8FQct7e8PT4R7xRmWM4ZQr-YgJYNm_zPc9EZHUaIcjKbxm31fUp6aKYh2dhYxeWVzPizvn4xiRr9_O00J7W31B3wcHFz36mdK0DZpMJ34HnqKlGV31SfvO9vR8Qt6PBUzA3NMZZd3RjDVnPxoIPNHRiS73rdk0K6hl3fdfUBdzzfvOEiSahagptwlL7Xz03zQZtkbGB5nXqZFSSMvI1Ok5skTZGOFJdZpjGSBs_zIHtYr0uq4Zpdif1ontrTRuwaWo9QXDnSPu0xYQ0BRRC8VqT4ui1IB85gcw-UwwtQklFSMoxMtEcQMPlWfkXHsNiE-c--FNARjFbp3zVEWXlmbEmD5ahxjIXs1OhtmUHbJjJ78_Cma-dOQvF_aKD7PBlaZ-1PIx2xVeLYiq4mSM4jVwYWvC1Vkgn0zg-q","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MjE5NzUzNDUsIm5iZiI6MTYyMTk3NTM0NSwiZXhwIjoxNjIxOTc5MjQ1LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6Il9qUEpyVDgtN1VxRTZXWldQQmFzQVEiLCJ2ZXIiOiIyLjAifQ.YKlO6MjPxgG_W076Rz6dikunF0hub3UxMHaOIiIGR_w_f16DRbO9wVUGYzqqY5W7jbjdPbea8qU5ChRq0xzZXuRdX7nVkbGAxStB_xsWXmQzbxc95Ry2_JrrtRUihf-k6dqxwJy8crITWh3pv7hBaMYMOdmryxIeE5tOa4F9HqusZGzHldz7mpG_044f-2RmZv4aheM60r3AXP2tOOXEoQzVXO_bnkFxIckfaUZBqZfPfq9bGz7J7i8WcOUiT-gQFnIStO7xXiHWrJJK7c6kavxFXJ-mOvSOGfXlmhhcVPNASrbr2Z1aX4kfg8vWEtckLYMQRLdWiNMOGAdM8SacBg","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.11722.21 - WEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Auk88UgPlSpLnMyt-76CsgG4k9TnAQAAAFxZP9gOAAAA; expires=Thu, 24-Jun-2021 20:47:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 20:47:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4542'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-05-26T20:47:27.310081+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'kL+Wz6+4A0Sk24xGO/EWpQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-31-preview1',
  'X-Processing-Time',
  '1997ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0X2KtYAAAAADpjyCwf+E9RpA8dYKt0SroV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 25 May 2021 20:47:28 GMT'
]);
