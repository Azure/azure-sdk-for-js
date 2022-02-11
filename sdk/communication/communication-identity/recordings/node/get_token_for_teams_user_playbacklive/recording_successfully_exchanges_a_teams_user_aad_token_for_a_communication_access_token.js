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
  '2.1.12381.24 - NEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhfVVkehNqhHkM0Chgsc5rU; expires=Sun, 13-Mar-2022 11:19:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_OfKXJuW58RRnnck2LUnUAzH_CiiHrVzsb9Bzb0ZqumyOgHcXzoXRH3Sa5CGbRtaP0nsPqruCLGBotiDrAL3H0CsSABXa2saUgHFXmflDeGGtbx01xsI_PwawwIwp4Dv1m2FioM9wOuDQ0fVzrn4cjVYAQtp-F12aJ_8fL6GNdUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:36 GMT',
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
  '2.1.12381.24 - NEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=AtG-HxXPt3JJmZu-YevfhUE; expires=Sun, 13-Mar-2022 11:19:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0jpgsYf56rnny40bQ7NrGt7RMHXcG1ZlWTXS2ZB6BhYvearbrNv9ttyonBPswZ9asWVuv2FGNpe3aDuXFu8AcQw68fIhJ2wzCfLzjeinXQXc2Ac0rwxvjwTqxWlMNklIfAICFnt3guw4PGu_KQV6ZgAGuiJEa-cQyG1mcc3uQDwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=darwin&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":4694,"ext_expires_in":4694,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P8vJKzgx69yl_ZN5cY7-07-yZ-kz4p0AkJ4KRUpQ9UZYKTZRRKmzfCasgs0gkcCsEh-xwcoWK6Tm7TAlD9tKTIpNTaIev5PFiiNWjAXP6sfLC925mITkUoe77Go6OwXY7bCyVAp3sFVdGHYmiq6LbRJ0X0McCLaDKx5z7mOlgyWKtdt1ul2LD4fs0dEkDFybb9VWEyacMDbjMX9elSF2Gj-vNN0GYzLpaoksc_AxaxycIP3iKcaJQlt4k0OjSLvqdl9WHkrzkch3pAR4fd1hxWcQh5xUT9wKJero4h7W8ssxGr2leQlMJLbgyNHVOR1N2g5FGDuAr3DKxPrrjLLDRrKnENoUdExjqjc19gZaNATwMPQxw8VaAuskEtxUqF_2vQErOpKDiw0a14djhuMM6Y6NLbUAvSc4Nt0jXNvqxJIf6USZMKPmADRgP3ssFgSOqGTwTMfH1nOaQxY1sWw2iA0tK5Ic4C_h3alt9mZSaO14aw-wadycZKMWjuOAlZwRJGt27lDVSkoyUvv9wCYMmt5dYVTzWsRsU-5sxAYI9FO-WILPus4YEaAI3vcUzYcZi0scrn5nnD5_A_jZ1p-VumJtCxMyykR8eICtNztfTdg5t5nUvbWEgqFAZ0AjWXkvybglgp9RD77yxBMOP57KSXiEZavAMmp4JlCSPTEpQ6Tl71cShWM_kUvTBQ_mPkoaWvKsM2Tvx91pLsBWgAa8iqTa_pIig6VfmiP949cwdbQ7djqR1DLvmnbFcV_z2Jzz37uhrRfXeL0hZKbo3QzShwbWCsu9548rCeh0DYa6tER6oxwL0sDYmdV9Bnv_LxjkWmjegGe7W014Nw9Lm1ABU-EwBAXqXJDYix7H--eI56Vg6cjtt-qFbU63SbGD9zFYIKEGSdJ9BEEFRN5I6i9JNGeW5Bt1XY2a5DISR-0B6avP7Y","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2NDQ1NzgwNzYsIm5iZiI6MTY0NDU3ODA3NiwiZXhwIjoxNjQ0NTgxOTc2LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6IlI4NGJqQmFhTTB5cnFfQ05EUklmQUEiLCJ2ZXIiOiIyLjAifQ.clknTWG_7N9uto1sP5hFY7kPgpNq6k_Gpmu6d3GUUrF9VdD4WpVGqMdM7qTLXs1Pd2lJdfVgVGEcpgcMPfGlEQgOPUcALyHJdqXxOaCNTd_qWcDWIUS6AyZpOVWvTWUM5mKD1y4hadstgT6Ap5pcnbl-UJa3_IReYqmW5Y3tx_yCgy_Ot13p6mn_f-lQa2e7wp9_SbqPpHhVIy8S64TOWKMLBOHWK_zAycggZCEmVu_Igs7RmevwxBONHqtoUAM284S0RBsSIfuXZ2zSPu5CNMwYhiM-NwMOK5C_zsa2o8FBQiVH9nlh7NkvOZyMpjoYbUWY32_mllzeDzf5apXFXA","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12381.24 - NEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AvWXBkX2819Jl_eGqjBVvh24k9TnAQAAAEg9mNkOAAAA; expires=Sun, 13-Mar-2022 11:19:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 11 Feb 2022 11:19:36 GMT',
  'Content-Length',
  '4545'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:getToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2022-02-11T12:37:50.1157516+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'KSr7GY6qdEyMuwsjtXiPMQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview, 2022-06-01',
  'X-Processing-Time',
  '391ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0SUYGYgAAAAA/b/PUDrMPRaZdW3miRLoOUFJHMDFFREdFMDYyMQBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:37 GMT'
]);
