let nock = require('nock');

module.exports.hash = "e24bddbfb6f5d9e13969fc1ceaaeda82";

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
  '2.1.12108.11 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuI3S2CPnslLteckgKfNRWY; expires=Sat, 20-Nov-2021 14:53:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrRlb1zyxkm4SxduWJp8i2yEwOKjsXXl9l9lCDS27Y0APNGhxgIueu1Eoz37ZpgBThKL5IirG3rm377mrU9T84XaJb2c63h_PbM8gQYPJnXmx9xDafNQDK11gtyHnE4dqoerVO2oc6xUQ7ZHkgW53gogxH_8NHR3khmmwKfmj-IicgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 14:53:24 GMT',
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
  '2.1.12108.11 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=Ak9wEFYrFOVCu_-7F70X-8E; expires=Sat, 20-Nov-2021 14:53:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsAyzX_U1za5xyTBfbPpIk7rCekT5ZiB49JxtQyVf5LOCMdgdXmI4A9DkO-7tl2i-QamF5I7PV-J_0rp-Frxt4_373zu-AiIDn85dwYVKVdEGDCjo1rajLegcABMcwj94vzbvhxVa9cu8UE7kX_Se6PABnHF3KiIKPwVJKEH7vAYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 14:53:24 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P-Xcc5vmH8JsKQ4_ISickrhmzg9D7h6WfrTR9DmWiE3R6wtgPx0TrdjNJx1sZ-fEQNxvy6kHN4SbjrS-CWR7tbGfyuNb3iISN9C6o0dop0VBAbtOBBFGY7IgGdY_V1vf-KfESYVa-1CbBhM_WWjI6DRVmSOkcRjaeUzqyutDflMjfyKTlUCtQOHCY12mGTzUCBi0ASFEqdNaIRWM3EBTxXhXW88ApIMTZPEqyQTIYSSXFmJImiFoe2WqhsnkE8ISxDiXdPmHApGGdf7fOu9U9KzgW-Pvf4Tm8OT99d0oYAc_5keTYz5h6-7f1kPjMBCVXl7s4JpJsm1T-HYkLJk9EICsJRs-Tq5HfwEU3Jlmw-ofuttM2o3RbSfWB8gS-PwP1pvwv7ifyea00ftyPNElQetkidff4_DPs54Dh40SrzFklOLRLhEF0E8rM9cahEXN-U32ZDHJR80dD1b1GxdikkGJecHt3f-qIgTSrTvJFr5MN4d2-t1vu_RzABJx7uAT8b-Y5LFIH3i-V4GcJJ2qT6-eddwyF4qWQgKiR-1j16QkS0ZLwUCN9uD2zVTVS0BCkB66Mjfb_EFwoxNAlgCYfK4GkxaHkfA1lWgNoBVPg4Y-Yf3SB7peAqdFpdQBjz23bq7W5nO5OOaMzmeWvoVRkUyev3grAzMRCK7n1iC1ewgb7VV87mtZLrJxClILTLHLVt17VUaSiqYdAJismmh6PTE3FTojPfldVVyzt1T5-37cSl7iFGJFOF2AM3evNQOrc8hhkVknCGyM4NAeJ-a8L28xlZLZ9MtGmRuAwcIoz-5anBllwzV65dJKCmFUSxjVwD46Afa7cLz_TYu5TeQil2T3C7cHRsjIql5UTuPFxOZSa233Vm_xPbHDYSaQ_7eQfCrMopoINRVZqhwAa1B4diYxmA9_JhRyluB2ZdNP4G8SlFySZJwh0Wdu7AXb9gzu4auadASE6dChr6MXmk24xd9jB3v3uo","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MzQ4Mjc3MDUsIm5iZiI6MTYzNDgyNzcwNSwiZXhwIjoxNjM0ODMxNjA1LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6ImREVjEyVlhuZVVla0dKWjB5OENqQUEiLCJ2ZXIiOiIyLjAifQ.XzyqD9Gen6RnoClgswVxb5PHQwL_VlpG8MTchxfhGTXt2dEwehC-ds5qJe_lOpoTFEp2JLu25tA2-EtZdVETJyp-h582YKnqK4dpZ6gcjnRyxXvsuzWwBLAfyo5QL3oyjcnVI2bXaMsQcwLAx9yPU8OzABD3vyE61CuY4GR3jS3JjWK8mL34kncVel9d94cxCfC01uDJqsPNdVSuzsb7sMK0T9B6U9N_Sfob8pEwFv6gsvZtBbU4tlsFjyJdP99NLCXROlG7jAIlhDxRC9B5njaboCvPaGCw8ca0cLbvLqEObPyhk3c1y-Lk1cJjnIY9IB3mdcXht-7x31gD3l8DcA","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  '2.1.12108.11 - NEULR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApWQKuKx83hGuqU__oSViYO4k9TnAQAAAOV1A9kOAAAA; expires=Sat, 20-Nov-2021 14:53:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Oct 2021 14:53:25 GMT',
  'Content-Length',
  '4593'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-10-21T15:53:24.6000523+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'cJcNoyzKmEa79VQwdyOYfA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '517ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05X5xYQAAAABjujH7VDRcQptRUOFCWMzPUFJHMDFFREdFMDkxMQBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Thu, 21 Oct 2021 14:53:26 GMT'
]);
