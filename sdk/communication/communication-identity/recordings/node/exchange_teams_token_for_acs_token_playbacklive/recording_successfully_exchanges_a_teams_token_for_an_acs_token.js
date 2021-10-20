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
  '2.1.12108.10 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=An-ihnWgf6BHtbDl6Y0rzzk; expires=Sun, 14-Nov-2021 18:36:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevroCUdJPdPAkHXnZ_e6Xe10ZxZAWeCUZysTcd1rxDepY3VypaSk46qHjr33Eue0zEpLQWbGIVYkSNgSoj93qqS_sQVpy0rRGVGH7UI0I8huTtqbT5IxrkVAEvCdUPABFjZoDhOITdRGFGEk9Wy-UNaezfAvPzfmRCbNfKglNax1RUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:21 GMT',
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
  '2.1.12108.10 - NEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ak7CBs_lr4lOq6Qlj2vRaSY; expires=Sun, 14-Nov-2021 18:36:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrtR78dLcm1Ve__pKQj_cfCpI-JNIrv5t31QYXUDqPrC-cuJvhsd2QtCxHqoK4XJTAsh9R3YJXP7x_3t7MIDKSEA7aLcdtwA7BT9y9liSoeei27jYaf-U9fiKT6q9i94py8-PAQf92yR2Mb48W-F4jb0siv8wN6rUA-LZrZNF9v9wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:21 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P_z4fWz4LwqRYZWckouRssewZiQ78wBWrgAwmjVIiw10bgHDD58X6JnScv1X-ijUiWkKGpa3R2o9-1uVdCwUjEAyG_enmXrN8GPE2GCQn_0EsDE9L22VjzX-6zTly8yqDA4bjc_LJxxCoNfRPSBK8Oj2TExYMEvOAg1fG7wj-glkUsunYK94a-Cc4inqkZuOm2rAnmYp-jALfIvqlRsrsZ4uzPkrLo3KUoa7DOUKREMzZAPoYD6T8WaXNjvBuyoTOV5ZTfZkmYc3KNRNCqmm-mk0TQUCJucXgJH24-g4gPG5AlkCZtWqfuSUTkbIqwRBMaeDxkeAlv_dc8hGuHOosoid0ZtOVf3QF7nF3h8sA8EzoChgkuvIfrNWYUcJ4wkdu-puaFFaMEniP3Tk8KwkANIYAV5Ypjnqn847aSHw2ty4cOA7sHEauLxs_FbOZPUP4HjsXk2_c47mGbEbLWOAAf0DlSpnwAf4M2D6-Bb4tVzpx4tKCMrLEmxEfK9bxIGl8B83qgqxTBTZoMmM80RiVaLAQDOwv8aHL9nECWqMh8Yg1GyaUTmitVaEjS9eS9FC8qks6WtSYJTahbczGajm8NXXMHmHLTf5CJ1tWlj329BMNPHNkDltveG4s6NwsfJpqpZHWqvAGXnhOiGixiXloMmelMDzrVMz4uqxxwCkJ-fsRpEZJqbj_aV5B9byE7BL3GLJHAfIOydnhOUU7IGsvdOrAuT27WfbNVgoL5eKHS0KBCzgjmo-QVRQWQB3N_QLZYU6t4I66C5xIDVP0g4RnYuozVfHwhcKPdRrLlXjNGRifVWvdpiFkBNgHff2D8pumRlRsPb5uf-5qXjZc5uRpAHufwPYm-9lN2oJ-VVwQDZjZ75FQEQdobNuKJCtmi6nfV_vJOrItjGEM30CNpE6Iqd0TD3yJ9MF6tp1QOsSKozkOeEktqQWqu72rBuwtp4StsHQKC0OKu4gde6nWgg8h1Bz-pNwyw","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MzQzMjI2ODIsIm5iZiI6MTYzNDMyMjY4MiwiZXhwIjoxNjM0MzI2NTgyLCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6ImFXRXVZRFdyZ1VXdGpUYkdmaU9SQUEiLCJ2ZXIiOiIyLjAifQ.T85huIKXtr2RhILlHX9kBBQk3mg5A0dZtTPXE4bFxH-pszFnyauxqlrq7tVVz2e6rKnPOt7u1VEyF31sBJbQ49arpikptqv6MfCWSXN4elnp5XloftUu8lo4Qtx85rsHeu41nrNFabtK8_-IxHs6PnON1RFI3Ywv7CGk0MNCVnjw_ri9Kf1krsaKjYB3vfBkLsZgoql3RYBIN7Q9qJAQpdBfl5yrCM-Y1Dx8CQY27BEuEnyogtrB3bMnRPa9WLfeQNw-BzRpjPtOLbsWkKv50UXrFt7ZJOiLJ7M6I3KczxQhLGLBQXZZa1nK0vpgzWrtftdB6bPhjT7zOz9zrw_Y2A","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12108.10 - WEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AmO1JKF-T3BBlfuw8T7RtaW4k9TnAQAAACXB-9gOAAAA; expires=Sun, 14-Nov-2021 18:36:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Oct 2021 18:36:21 GMT',
  'Content-Length',
  '4593'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-10-15T19:36:21.7937286+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'BZQ6VaaO1EK0LpOd6YZPqA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '426ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JsppYQAAAAD7ptTpMjopSJNwSPbKtDwOUFJHMDFFREdFMDkwNgBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 15 Oct 2021 18:36:22 GMT'
]);
