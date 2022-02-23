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
  '2.1.12470.11 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=ApvopePYRUxDsNdFWpKCCNA; expires=Fri, 25-Mar-2022 13:36:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr_SDsZXWXZp7hbFqVyqlJU07nSOgeTWrCtukLNmOdxHIbCgTK7iCfE84-me7lwbU4VxCL0ebxxYYXodx4FIgQEtYdJMiZ5iUAqTv4fYE2Iplms9mvkHw93XFpiZ5NSA5pwS0iLbInVb4h5rq6XpSasVQN1Iyoy4s5-Gmtvu6xf0MgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 23 Feb 2022 13:36:59 GMT',
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
  '2.1.12470.11 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjGwpKIkcptGgH8RC2_ACes; expires=Fri, 25-Mar-2022 13:36:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrBo69IUwWxU0_LTX9yWtbNiuZyX9d25BrgQvIcawaOA9gsfv6RVpDya3m8ABS8F6dB5JtQ71uqvwl9RAoOMWGe8m8y1pkS92Dru3zoZZ_r72nxOEUSuLixJXw0K0Dkaf0UUGUfOdLkFBSFNvT10pca0EWpdSCIlaHNfQPvKH540ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 23 Feb 2022 13:36:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/Teams.ManageCalls https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":4966,"ext_expires_in":4966,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P90FOBrnJm8FzqgO6BtUTbmjOW7kY0peNCMKfRP8D5aFzg26QRWXo18M_UTo6zATqkqi_2amqJ0hes1SdOqJbTQSWYXumxMvFFc2oac9JY5GESNSVpSzltnLQzjCKydG2DeLRmOlIPy-sajMp1lW_GUhHiGefdqM9E0B2wMRnz9phxW0qo4S51V6SK4gPseBrbv90E4vNcwrHgGgkI2vz-Ug54Ckyf5vA8qlTX7ixyXZTFHUu6EmH12Ta2T4Nu7mbo3bk4cf-P3TveZs4y2UIIHf5q0fSrEx7XrOJovvU7TdffhWm4P6m5etKP08_2fRV7IqDXWqMtg2RiU4cvGbShjqUKwXfrHxLPScwKXQbUwOuaKaHi9zSss3joDf_sCdEoiL7SZpBmbCWZOCi_qU0UJTVtRtJJCBi69SHN7BwPxdkWiFHGCppwIN2SEdKSV3LNbJEJU4AztS3NMox1W-lunJmhLCpyClQt7GDE18usaFk4PNBdv6c2kNMskJAcehPwungsGB16okbVz7UsDW4bPVcmp8UR9nvOoxNnR1lp8MZXtOfKcu-Tnvg4UJ-h5DEInsHM5P0NxJqdnwqO3mkDRCeoRqBCeN7WSXFRVReQjJHHsYSP5QFtOjo0Hh1O0AiEYN_oaLr-IHg3IrvhMFXXR06lmjGDOKmdQuSSb7psLsWtjdXtKVCI1STlo_RjTQafIg33eiYx-eoLMKGypHorkHq5wyL4DTEi2Ql1BVgh348QFPBNOT3lTM-OLmC0dCl530sxGKc6aXc0uULpsw_IXfC3OIBAy20EqKCaXaFFkz0tZkGmBR5moSbvlmcFDYHMXoXOyBXvFyvSg_crGlWeR8RZ2gmuj5AOv1cnTcTqqQCpczbIxkX5CHuvXW-gcVnyTjO9SiuHWMCkDNyvb5Jtbh8Fawo9KthDBwufK9s3FC6Q","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2NDU2MjMxMTksIm5iZiI6MTY0NTYyMzExOSwiZXhwIjoxNjQ1NjI3MDE5LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6IjFvaG1JampyRFVtVU5fNXM0LWlzQVEiLCJ2ZXIiOiIyLjAifQ.oTBFUJq_MMbR1dtyWz2GtcP4jMxA5ABi5K9G8BC0lv3S2Jmn5id-ZNN62pNnDlRkEX7ZXbZ0xIWSmyOTf2KsuMfMuFSYFGak5Ywu8WnpMwK8UsyYWdDrVtaIvAqXyttQif9yGPfOHKFcIOxFpqd4oE5Xn56wS5I_Y0VGB3vEPI4KEHzdaoIRcH-pMVF6Tx56fxGQAuByXzwFHljDfOsLzD1i-PXC3cYCCkA-u1JRfcW50jTt0twaq8_PCNa3C3-uEj76Xtt7gNUHL3KyVBJ5g_lhgbokxjH6YoymbcLEDAhWDgTZowzXIPK4GVFjEqknLQskPeN5ARqU5NRK6Yo0Cg","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12470.11 - NEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApE2vQF8eidDn4Q7CBRbSwm4k9TnAQAAAHsvqNkOAAAA; expires=Fri, 25-Mar-2022 13:37:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 23 Feb 2022 13:36:59 GMT',
  'Content-Length',
  '4648'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2022-02-23T14:59:45.0791576+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'C0aScykU4kmjJffcLU9t1w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview, 2022-06-01',
  'X-Processing-Time',
  '833ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fDgWYgAAAACuRs7wRmtdTJBNmmeZVFjVUFJHMDFFREdFMDYxNwBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Wed, 23 Feb 2022 13:37:00 GMT'
]);
