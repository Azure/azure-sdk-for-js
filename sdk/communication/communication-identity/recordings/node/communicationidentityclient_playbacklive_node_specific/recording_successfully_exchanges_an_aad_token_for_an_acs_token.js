let nock = require('nock');

module.exports.hash = "59094860faedaf7cb05b7dfc9168d91d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('M365AADAuthority:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"M365AADAuthority/M365AADTenant/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'fpc=AqcR4EghelFJhNZq5CrIHRQ; expires=Fri, 25-Jun-2021 22:07:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrigURxNnS3xgqdmELOadU8M-LDymE0N2RtYoMDgxka0cWDLes9ISMcp47uuuBz-ywj-1zVSDyWRBS6gzPNO0Bmx9WBBNZROnO-E17zZnz4XXe7ij-YXGc7BdHcUQDvAPWih1J8ESq13Ri-CM5Nt21AkiZ25gERbV6guiIh-vQEUYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '980'
]);

nock('M365AADAuthority:443', {"encodedQueryParams":true})
  .get('/M365AADTenant/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"M365AADAuthority/M365AADTenant/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"M365AADAuthority/M365AADTenant/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"M365AADAuthority/M365AADTenant/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://endpoint/oidc/userinfo","authorization_endpoint":"M365AADAuthority/M365AADTenant/oauth2/v2.0/authorize","device_authorization_endpoint":"M365AADAuthority/M365AADTenant/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"M365AADAuthority/M365AADTenant/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"EU","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'fpc=AlnWhseX88BItdIjWg-cFwg; expires=Fri, 25-Jun-2021 22:07:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrdye2LN7Y0T0d3SToexJ7SLmdjyDLwypbID5jpv3-OuLJuUVTMbVoN_BMrFUXKowA-MiYNLli-PaO7PHiDhSLTsCZc7d9eYgHcAfs1LsoF8D7tyHFceNnjrEih5e0b9Y87Mvwoz82arpFc21L9rmMfbjsr7aTjRtsgeTyfRVI0MUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
]);

nock('M365AADAuthority:443', {"encodedQueryParams":true})
  .post('/M365AADTenant/oauth2/v2.0/token', "client_id=M365AppId&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&client-request-id=sanitized")
  .reply(200, {"token_type":"Bearer","scope":"https://endpoint/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-xRwLBbD570jfL12FHMGaf5sg8tbol4Cl79sKwMtRIuz3HRF-7fPMvcEJ5UwqEp5sxKlT9CIOqtOrpGO4pH5TJJDWNTKhKqijZC_4AVbqJsMvJrfbRRDci5xdN-3VUV8_OEhjk78m5jVSUwJTdjzPviGLSZbPuwoFSn9hLkqBtxsALOMiOlgGABKeVhOEjBX_Rzijgjt9MPnp6ta5N71EAvi8x5Ul5MB4zo1tWzEH-CoJ-ZtUbutCzVvg5_25bcn3SEK8SzsMc2-8RPE8Xpqs9jvqIwpN6wKm25AH088SN87cFTYdZSxwxLRUaqj3ELw-TP0SkC496pDMLEUBbyMdVqR1bJpJyjgOow49Z_CwW_D45Znu0U6wYnYIFXgiTz-zEaIReA7Qrsc3sMDLPCkhU6mhHOSZFND8utyQfTOUlzJyXslqxN-nl2uGbGqM7EFG5-K4PbKDW0ACfjlES1ImhK6wH6qUCEWwqwG5-Za8dsqDrWcSy0Nmfk6KtbhJ2mizsYgtNZdjD2keRwJZWvlkClsyw2ngtabkL2EQf7id8B-TyLk0Gl6NYe45ciXMeEvXIVNWFAFyY2XYesed3Qoi8oe5qoeASRuCA5kxM0MzRxtNqNxS-DJtHW-zy49lPQCWm6fW2IDuU-PhW5Dt9HPIukAQWf2RzyUs8gkjGZ9t4T0fbYhsoGARX_BZsF12128stid_j_X-mQtEhY4XrKx1hL8UpORNw6jjccWWpshqbH-rI93RLFoVkVqWUzAc51DaxPl595uIW0LpZmVHQfG47f5fOmxbL-0PQj8JHaoa0wyyTlQgDD2s8DeJ4EXFHT6wwn3AOV_xwmM_LEpZKg3Cl0aqY9xsW5SLWho4imfoDrMNuPzAokK2lfb7NisMyWG-vzCe1iic4hCMJLNrCKKV08IyDXS4QnyOujceOx0p3","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MjIwNjY1NjcsIm5iZiI6MTYyMjA2NjU2NywiZXhwIjoxNjIyMDcwNDY3LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6Im41WGQ0bGZ3aFVTQ1l3al85OVpQQWciLCJ2ZXIiOiIyLjAifQ.L8FNGTeRXDWA4l2PY1XbC8QW5YRwrS23u2tl7ysEm_V0kX6EQSo4yPLoDSZ99Ma6Kz-HfsxsOJbjMyFPu6SW7AWknD9G_n1yCjPIyFd0aY5F2lF8oKhARY3Bjw4eKwEkbMPlj0l7Tv1LxtZExoYNluWBEDvaGyCtddshjOUcc7OGG-JFNgSZx8yWWH7LY_SJoa7okcEDk8KqZPrwEGoXCSrq98wEtWWmmkFWWYAIbnHKvTgqkZHRRvQAuNVQxj7Bf32aVGi_fmEu_3KdUxv5s-zKJMW_VLFkQDRUSIlf1zMt86CzN5mBpis2exm1L9pobkUil531gkXZBTl0E9dy5Q","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  'fpc=AgmzBLNmcFJAlw0-tJdWtV-4k9TnAQAAALK9QNgOAAAA; expires=Fri, 25-Jun-2021 22:07:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '4542'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-05-27T22:07:47.419509+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WsavLQFlGUWDtsLgv+ysYg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-31-preview1',
  'X-Processing-Time',
  '276ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tMauYAAAAAB1F+0Avli1RKQ3T2XFrSmJV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 26 May 2021 22:07:47 GMT'
]);
