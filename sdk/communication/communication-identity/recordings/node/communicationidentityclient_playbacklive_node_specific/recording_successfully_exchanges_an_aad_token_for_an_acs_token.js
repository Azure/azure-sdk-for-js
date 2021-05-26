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
  'fpc=AhiFQbo5tYtNspK9ZY40b8M; expires=Fri, 25-Jun-2021 17:44:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevruGCZVIiV9FLq6pSOWHZogHe7ZcAjRnVscE1x9qjoQOIm3HBCw7frSXbJZSuOSIjDyE6QVIv602I1teabFUS4gGpe6npviGM-rAwlOpreDM1vRvMnvkEOToVPKooA_yDhyPfK8-Nl_8eA8CnaOpQVAUFCWT76K2PXPlfkVnkmB18gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:53 GMT',
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
  '2.1.11722.21 - WEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=Apvkn_b2c4pEiq_VMC3lI_E; expires=Fri, 25-Jun-2021 17:44:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpeFqoSUIbI2QoCTutEA-LtUxkPyJrp1Sj_HLznJOhOwUoOqQbTCeMy6iD5rzbi_itMmDOqs2hUCxV9TMdgnXC9PcrB_vN2kEQXEXzwA3CUT_4J3hva5_JuZ2pHCdRnyWJA7JLLZFO2WrqKWLPs0njZMjH5SGIHb9FcjSYzj17tQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sanitized/oauth2/v2.0/token', "client_id=sanitized&username=SDKUser@acsauthtest.onmicrosoft.com&password=XgAa?4dkbc$a$M4R&scope=https%3A%2F%2Fauth.msft.communication.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=password&client_info=1&client-request-id=sanitized")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP https://auth.msft.communication.azure.com/.default","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-l0dftPkBt-LsYmaCyeaYvZwB8NJgR8UIyyClKFp1E2opUcRfSOVhkQRJjv8No6xo-iqfzve6GF1DnKpnAXC6h-I9Dke8sCazv76tCAZMYvWtmpTazM_G1uVxiiGmetm0_Ra9xOGVUcTe3uol7cQGW3-w83uuCbLy4kbCGfvUHHMOk7gRoneJqr3mGWCxnDRMYlneB_vbVtWLCv3KOLSDCBX99G5qWuT_8eIDrm7k_Xyhk5yPOYB-zZPVXd2PWo0h9GLtlYymBBFJh9sQGAM3WGZrR7g16iCrUQQLN7tEXwtB3tXZjO_u58K5ynhhrSX0wegGP7iSGrk0PKyi0Pqj_I5frkRSmYpc_fA_wrCBwPZIUj_rrWyP0iA0TUV5Fou7x9jwBd8Nr1Saj6XFxincnEPEq1OUAqlB7oERSsaezFDaLtbnDLoqDynrABM5ZFrswuSfEhPaObfjcc2QQ2MzEocIScc23_-6W3oXGk4otyhsjIDwo9tokiE9ejalP4CasdXvJ6S7RjBc9sJ2hTNPuwzG3HVc8jbDwzrVQNCOH0oqZfv4MM3xjkbi6GElJQzA0vcFSGFRE6ywW6N8Ph3Y-J2_PWLnCjuHHzpZgUBh5QrP1noD2Xw2qKrR684-fbiuBArw32zm8qPvN-d2I0HhAgjDK8i7HgBXV4y6L-syQ54DFtwDw1NEEQJK0kXd7sZLWU63Sk9QxdULBGlF7MCZLaq3GejZuJO2X4CuwYJ4WU-i6bcbM_vFlGx-1UleuEOfobTbbVUnBlVjP1X5y2ftBDgy9_jhPl8xDNGC0CEQH7ix_U5z7XBAua9lO0sLITX4TuaNwsnv2PJLuxNjI7VphqWHV_MOHl0d8oF5o0nmgwU4xT9IxN0dk_GtKPZ72Vp72bSrn5cneyB_jWvQ71hDQJB4TxKXdguo968MK8om2","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MjIwNTA3OTUsIm5iZiI6MTYyMjA1MDc5NSwiZXhwIjoxNjIyMDU0Njk1LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6InJPZGxVN216NjB1cjZCbjVHaGplQVEiLCJ2ZXIiOiIyLjAifQ.hQGMGesWwxlDl7XnDSCN3B_ufueNVjZZ7EfG3w9EUx8MtZ0JvA5qyPnUQ-DiPUyCBif_gBbQ5LTQPdp7Z_AfsyNnDpfuxK1_aQh2hfMmWUAFcK1TTY143YcxjqvI2o4FBTuPpyGUtCtKPkkEGGG2oscQJD5I11T7TZLS-kcZIAI61V_xy2QlATJoPhe89SZQKGEJ5Yyo9klGW3H10VtRMmRVMj0-8iUlxboOAogz-Ef4efaES9CdXCQOjb-Ldbr3eUquGNOsg6hPRqh5gtAaDt_H9rfAxHqlmJlQ8tLTtTXnOv42xPCaZJgS0Au3BRg4jv6cjVH4m39kL8SxiLvN7Q","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  'fpc=AvPGwt8KOQJPreARm_x3jue4k9TnAQAAABaAQNgOAAAA; expires=Fri, 25-Jun-2021 17:44:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:54 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4542'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-05-27T17:44:55.7397231+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'hoEi88qYsUup6GraLI9Lhg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-31-preview1',
  'X-Processing-Time',
  '1012ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0F4muYAAAAAAp5rUjMCsHR5Jq+pbdexiEV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 26 May 2021 17:44:56 GMT'
]);
