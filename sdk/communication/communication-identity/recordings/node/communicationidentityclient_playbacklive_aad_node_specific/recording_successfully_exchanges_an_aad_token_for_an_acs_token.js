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
  'fpc=AqdST3Uq2j1JrPXFHZl7DBc; expires=Fri, 25-Jun-2021 17:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrOXbB5M_G58qjBX4zG9BdSiGXPoe-cfyTgIwtD2c5jx5reyn-uVOP64OBZzz7q8um8PJXKVry8E_xrkruH6pnlQA0a9WXQ7eptn18NEyvO32RbQs9vXO7UEmAzr3bgDqkjx6CxJC6eSEjoM_8ALyTP0YNiRFFNcl6VeMEXaMBorwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:51 GMT',
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
  '2.1.11722.21 - NEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=Asu_ZAebyTxJhKlLQB39UgA; expires=Fri, 25-Jun-2021 17:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroZqikIPc8sZk97wVIorZDlPnnldzHwlWxf2M1ghrD1UglrRqYMLnduqXwUVcyNJBdVrmuPz-ksX8Cy7yGRdAZ9Q7MSMjqAxsuXTQvQ4GFEulCxOwES4YvUMjJpgrxC6zm3KmJLH4n0TF0ERJtu2Rd3sAP_LffMAQWguG-rq1w8IgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sanitized/oauth2/v2.0/token', "client_id=sanitized&username=SDKUser@acsauthtest.onmicrosoft.com&password=XgAa?4dkbc$a$M4R&scope=https%3A%2F%2Fauth.msft.communication.azure.com%2F.default%20openid%20profile%20offline_access&grant_type=password&client_info=1&client-request-id=sanitized")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP https://auth.msft.communication.azure.com/.default","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P9lvgRyNSn7q1n_QRaNcWe5EdUimBagVnR8Eiay8TfWy1fherDQ6BEktZf8TXwuhu-p-OMcIVfpjpegCtWLhspJW-FOwQu_-QqPF38LA2zi3WMOkSnaTHgob9o8a42bRnhKUIYxC23ZzvFa00ESBEj_l0UWzRJio0vLhpAumoa2HvTB9kwzRJmwaxNfvt-3bHSCFZIXK2JUw00l-38Zw75gvJfNmGDKRLZ9g7yCdidX93JSELAbKhci4I0YuQVCwPvN-F39DTSCghPY9VO4IJ3EqIKfcUcbmTNhotPrQRdXWvKLnnS9ykkf-6kn_q8fV_XvexpyabNwg-FSrzDLLJe9uLVsizsevSaNWV03USV9YkfmDPu3xQWOQ27gIrz-mYGSoZ409FIrpBdK45t7y_Jt9582TKjO0JWAoK9p44DdwG-cDaPuXFJPeJOag81CqzkgwjEHgLA_nAR08mJP1_bPmMyZwYNHs2TNfNSyz74miB8coCqIswlbE-CH-SpOOaNCkiG0CCy3NRoX7XN7XoJZKNwO16f6myVZOzPjKMIvajL35Whf_60aIQ1SuYQPF6QRJr6_UVIJOwIHfWShJkG5rrnUZUlkDJzaHKf2yyNYUQeHAVkKTnSGdR178fBOPYOOiINUDETYE7xWqwe6WDN-nsjB4z4V6mPhVX50_xwiZuLxV4sK5wJYfDzwp_T-KjjucgqkE_-KqVPEbWM7MC3dfyHAIZHC3MyLY7T_MGzhswONH7tJNJoEzU9ncw9a7mC6comeG_Hbz2NGP3EKy7wvU_2z1rkyw8-kVs7k02Ak5tTIPOnKIu7KMkp0ppjjINv8ZR-vbQPcLpYydJW5p5LCDkEf7Df3asJ93wfMaZiKa4N5VDVlAGWkGghERMvZ8T4NtDWLBSFEzc77HZiHrQ-P389r-IJVcVSMCAlcLHa6","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MjIwNTA3OTIsIm5iZiI6MTYyMjA1MDc5MiwiZXhwIjoxNjIyMDU0NjkyLCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6ImNBUUN5X2FMejBpQVJPTzlLTFVvQWciLCJ2ZXIiOiIyLjAifQ.GEpUO3jqsQraMc2urBCIIZuZbJOGDxowxqc08BLxNdQ1SrV-MEHhpuaJcBQ0s71ri0wBJ5JqdHusLa9Ygvq-UVs_ExD30uoh5_yZngjOH2MIGiKQ8AAL4smNcFriHK3T9vNCrWLLmDvgBeEnp435mi4E_fNJDT5YVPyzLoCaYL3eNZPuviiJESP7T3QVRariPN5UTWMH9jHBcI0WWLdd6rX4ALUKOMHBi6Q1p45L2UbBQCjGpRe5Fw8G2JihJgj5C5EmblpAB0jNHThLPeK8XgLh_GIgtILZWJ8TfiaE2g16BtEjD7WHOua6B9NHDOMkdzgBvQs6bwaumGDpk0jhIg","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.11722.21 - NEULR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ajtw5FGHaDhNoEeIDkkJluK4k9TnAQAAABSAQNgOAAAA; expires=Fri, 25-Jun-2021 17:44:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4542'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnVcF9NxGutDvPInXdHn3btWyo4SAwAAAA6AQNgOAAAA; expires=Fri, 25-Jun-2021 17:44:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 17:44:52 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-05-27T17:44:52.763652+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '5X9tq8sFzEGBO5hYC24t3w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-31-preview1',
  'X-Processing-Time',
  '440ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FYmuYAAAAAC4HxlzIIAXR40C5UUQHaIJV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 26 May 2021 17:44:53 GMT'
]);
