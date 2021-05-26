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
  'fpc=Ap9r-G_hn9NDvA_PiLcpOdg; expires=Fri, 25-Jun-2021 22:07:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSAeFPsRePIresP_2AqHo0DkdXe3RKxBBH_oQoiWBKGoGECZJ6WGq44l-I37WtXaBi3xXhm38bYzzAhg9685xZUn6i7GBFDjlmr1_ZKliX56Sk14nSnO9t0lMVwvNzo8Q05Bn4XaAd9_K9eMUYHcwHCgwke3xgqywTxo-PvRpEkMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=corp; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estscorp; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:44 GMT',
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
  '2.1.11722.21 - WEULR1 ProdSlices',
  'Set-Cookie',
  'fpc=Anoc9b1fxulKk6wukTFl0yg; expires=Fri, 25-Jun-2021 22:07:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrmqsoMsE3YIo_vg3Awm4Rq01v3BNK7v1ymY1iX7vyfaI9eSDGxaSzsf9ooQDj12iRuFMZkfXWE5bOAoEorU8Ehnf4nYUg-UV0H2Iy9zWxGe0IKOyTkej1Xlc8v2jvm19m7gg_f62GrnFJ9Vpz5-vyTB_mTybjvnCFzlanF04eECggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:44 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1651'
]);

nock('M365AADAuthority:443', {"encodedQueryParams":true})
  .post('/M365AADTenant/oauth2/v2.0/token', "client_id=M365AppId&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&client-request-id=sanitized")
  .reply(200, {"token_type":"Bearer","scope":"https://endpoint/VoIP M365Scope","expires_in":3599,"ext_expires_in":3599,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P_UvO_jVbpTA1OsmPZPSUQeypXNVTKdCqTLXtSt_NXhJ2g2jBJMG-6Jml6a9C8EkxCeraSRalh6tQ2SZEbD1Tu6s06xgKfZX4J4m2z3mHCXKlQGYAWd4iaXpfuZU9ib-8nfXF8-QLnNsFLLxXDlkGA_jQHs_9t9Z-eh3KmatZJOitPFccAGjasnWczZ4yAc3VipJXQ4NUkKB1PqdWamE8CSO_kyafv1A2L3DsxZ0QhXM3FMrbqB-85QkiLWKp0iUeq7ESPr-nWydyf4-MEQE9B8PEsbx-dZK1iHIzRkvBTIA1l6yQYawXVOGXVR16Wff9_3EQ1cQRzxQ4RbeNkPbOW_AhdaVCymRqC0R3xoOlLW1gAvE90O-ayXDVFJGGRweFQ1Eo1Hh6FTRm8NNog5_WtzE34b5roWvCaLWQ0gKmaDNucHGshus41tbenqvxaO1IUR36Zd-CTmeRMvFq-sUFBVa1wT20yF7Urs0GrXv6dQHrFxttkVUxh0y4rrC3vss6T-Gnsg4zIFlcuZZhTUTlWxNUUoC36K7pCkf3YGYs7E_dRozLRIBVBZ1TTbn6c0K0cO1Q0Rcx7_VkKSlSBYjG3WM6lugKVzOycq8ACXTYqyfKsEIzlZKf_bvyNA_mpUDnoYS9O7S2vL4j08NV5p_f_S4PQBU2SaCdM1QLXRQosD5Av73YEd6cmBhH6hTb1r0vVFBENxbIhLjsyg6BQo4RyC5HyRtu8pmuGoz23dyBU0Ve2nq8soAm4wGDlNk2SERtGO3PZOv0NtaBZZemkmoph49AzhmWAcVlJuqE-zNVIuoIUpfjZs2FvcBGhYakBxD38k97MxE8obGu_PrHmY4p6vnc_qjnev8ePPZaAfBQCVhixAp1dF0rG-1B3ktuCiVRBoDwpdDyBfbULUhN_3U17uRYCDS7GSVtLLDIk77F-8","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJhZmJhZjA3Yy1kNmJhLTRmMjAtOWZlYS0yMDM5MjA4MGZjYTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyL3YyLjAiLCJpYXQiOjE2MjIwNjY1NjUsIm5iZiI6MTYyMjA2NjU2NSwiZXhwIjoxNjIyMDcwNDY1LCJuYW1lIjoiU0RLIFVzZXIiLCJvaWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJTREtVc2VyQGFjc2F1dGh0ZXN0Lm9ubWljcm9zb2Z0LmNvbSIsInJoIjoiMC5BWUVBeV8zenZzdmNxVUd1ZVdTUElxTXRJbnp3dXEtNjFpQlBuLW9nT1NDQV9LZUJBTXcuIiwic3ViIjoicmhraDI0Q2wxR0dQbkhpU3N0dzR4WXhPbV9rRGtVVEVOSWlUazRhLXkwOCIsInRpZCI6ImJlZjNmZGNiLWRjY2ItNDFhOS1hZTc5LTY0OGYyMmEzMmQyMiIsInV0aSI6InNDMkRpNjZGRmt5VXc5U2dzcEw0QVEiLCJ2ZXIiOiIyLjAifQ.OViYV4TihORSipx4XDleoRnumzGfyf4pDt3RCIbS-Sti9fQd8ERY8T8qc-5L1t9FS7KiT79egwbGQ70iCwByiH6gxloD2YSE_KbaW3t9LkP8NA4YB4pGPF6G8sxnBk1W8SbUXy5oyVLHwbtvX-8XGOvsOCLUuAIeZgs6B58A9YRGak6xNrsEimEF7nqryaanSBDX_o3jxmpp0a8w072qCnugzTqc2CqtBpWNX0m47oLBx92Cv4WMrjiYP37Mlp4ftl78lMXZGlm_Ow_i47neaOdFWsHsv8Ma9JNa-OGiyAC9DSpT1V9B8yYRxUvegm3CUhe4PHhvrtZuagjj9GAIYw","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '4542',
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
  '2.1.11722.21 - WEULR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AqoJx2XC-JhMroidIYuALsS4k9TnAQAAALC9QNgOAAAA; expires=Fri, 25-Jun-2021 22:07:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:45 GMT',
  'Connection',
  'close'
]);

nock('M365AADAuthority:443', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"sanitized"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1327',
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
  'fpc=AjeJ4_HVdWdPl6pSscEas6VWyo4SBAAAAKi9QNgOAAAA; expires=Fri, 25-Jun-2021 22:07:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-05-27T22:07:45.5952629+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'lzdI6zuKdEuD+guS88sQrg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-31-preview1',
  'X-Processing-Time',
  '325ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ssauYAAAAAB9GwebHub5TqjLkX01uU4nV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 26 May 2021 22:07:45 GMT'
]);
