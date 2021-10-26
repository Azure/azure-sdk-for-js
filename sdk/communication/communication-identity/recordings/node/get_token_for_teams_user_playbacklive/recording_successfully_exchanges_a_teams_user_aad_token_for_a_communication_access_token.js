let nock = require('nock');

module.exports.hash = "c5f66726f0c736e2fbc272f2f87879bd";

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
  '2.1.12171.14 - NEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=AltTCh2f8jRIisDaEHb5yWg; expires=Thu, 25-Nov-2021 23:13:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0MU6fwfhvo7a2J-UzfL8o1PzzxzjaNi2O-aQlxDrIrftNYl2F1Y7BZ4Dq5GtAeEwjj12Ff5hy8srJgk1SzM-R_nLEVUxfAl7nP_lI43iS7fXRIDNSj1qSWjhdV8aL5Dn3xekN60Z_LIu6xFB0I_GGrQnYsfmW1C3K_JFkxIeGuogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Oct 2021 23:13:09 GMT',
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
  '2.1.12158.6 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=Aobr8SgTRQhMuXTKb1v5E24; expires=Thu, 25-Nov-2021 23:13:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVQ0NzCvltcmcpKLtrQygupEdWKYRcJpB1G4MHzlMauR66KdVFlEvTtrUqP62DoeH1audYz8lhbL16BFGxx6oPCGAvODJhJFXL_b62Wg87WCQLWY86DRDPftvR28DkzlPO_R2psezd-ae7m6r18Cd1mSdZnQRJn60VOgNvHH6jEcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Oct 2021 23:13:09 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P_1iKbfOqUgrGo_YwyQVeHqc1M-7z-wkE3DMkS8DuwQJwd4ZkiWpl8D3LZ8vucdQYNslR3fVeAtvC3TAaMHRLwYeqfCPXYYy0XJZeMSs4kpB3hOFV1qIut6GnE5FlLtBn9I-z6uO8EbFiaOxTpJK6-aKgXDlzqz8AUsxpU0muoXQ8ToExIAfr-fays5B9rtCQsOhERh5-AuoiImfZN1Xq6_qxKOopNi3hOpz2-ueWz8_7kn6tC_kjxX8kQgFK5dE5wuXlxUmGCbK0Yv9K_lmDCkv7IoG8ohBEjdYWmvaUegNw9WreGBlN_BoOqkRrHQcWLunQZ5Dpq_UN4T1OO_IpWC9rU7ZfQxSQbJKtiM6rIK8-KQNveF-TcAF8x4OE48s-hf9kL7RzwbcLl3UBFZQeU8OiIp1s9qRIL_67YiVozfrhZ9g1SSxXoXHtjXezH3Ccw6igo6FshRQwf-kHGUtFxmAzu7yeAqivf06eSnx8JNU7qAqcfIMPvwH8HGdBxkvpRw2zNlh9-x_NakKfSj0s5vT9NzvPYh-OnG6FrutEEMCNp1cpAuNUv6ArBlOmwVTO-ZTnL9IU4hSKfuQ3FsA01ooZVeNPnmzf5o9QuLZSMyDOCVgPFewEwf8kaFhLmDsHF8AyYyPz1Kr5ST4Lk5fxAWW5HM5I7o1kpC0A_RdQhCqsGJnP_WBNI5h-33uRB6vKGQrvtEsdkM2d6G-8xxq36bRoB7cTfS1jUQBLr4xh8o54iM6z1H8FscI9j-SaY-akLVOnJaa3uNn-l4FdN2wZPsLzEIe3MzI_Na3_5QxgMTAqd-2Ogia0ioodm8fO8lHkAmZWoYDipFRmVWtZff9yhdWOMqKcqZ51z4rb6NPODDsnIwgKtcsLtTlfaVkRQ3YD7-g0kxRq2JbeaQB1TAam6pjFEN4VOomn6nl2um-6R5e-Q","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MzUyODk2ODksIm5iZiI6MTYzNTI4OTY4OSwiZXhwIjoxNjM1MjkzNTg5LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6IkEzUkw5QkhZWDBpcU1sTk9qQlBMQUEiLCJ2ZXIiOiIyLjAifQ.ppdWz-Zgf81qxBVRRi6yFmy3HOZc3Z0ewcGqXYtXZwbj5ja_rmfB5jilpNQrlYwt8klqkKgia6IzMe3suIfR67aoCBYkcgd-mt_2NCYoN2GoIAH-E-hEW3rAEtoTSbR44RcjBapmwEX2xrvOPX_HQfMHp6DtBNgVexAz4b7vHGTs9faUBgUK1cb38ZkxiU0mVVRRJWfB5II79bTJb_F8ujr4z34LmBeNYAbru5xGloRu7niWeAZ5zcB9ChJrRXWlRFI2bZmvchXBwYLqXo6NQ7BdYQexKt74yqNlT7H5xLGK8cdyfc6o8cjQQK8PoLrgvsGCuYWgCCVL-LbwwnpcwA","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12158.6 - NEULR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApIVoR-yrd1NodDcmEPvZiW4k9TnAQAAAIWCCtkOAAAA; expires=Thu, 25-Nov-2021 23:13:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Oct 2021 23:13:09 GMT',
  'Content-Length',
  '4545'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-10-27T00:13:08.9147164+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'RVs0N8eewEGR9te2/mbeLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '415ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hYt4YQAAAAB2MnUC/nhsR4TkTeey6ctSUFJHMDFFREdFMDYxMABmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Tue, 26 Oct 2021 23:13:10 GMT'
]);
