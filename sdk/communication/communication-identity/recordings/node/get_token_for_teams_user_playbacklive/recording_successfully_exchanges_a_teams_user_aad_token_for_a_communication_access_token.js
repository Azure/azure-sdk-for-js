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
  'fpc=ArBhOv66bcJPva2X7MKmONI; expires=Fri, 25-Mar-2022 14:11:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrYeka8fO9n79Zoc2k8pXQtpGQGCPk52KRFQVAuigRP2SYO--43HlJDjNpnZb2hw04CtKOUKDTaRvFr_OT5keSq5tHYoPRm8W9OGQFKd3HeAMEjXq159xFI4P5MN9PJPJF9jX2SEp0PQ-wWeUtUo9F9Qv4GDh_rXkpl2JyvMpgsicgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 23 Feb 2022 14:11:49 GMT',
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
  '2.1.12470.11 - WEULR2 ProdSlices',
  'Set-Cookie',
  'fpc=AnsFppRVXt5Cn_IFnMlPlmI; expires=Fri, 25-Mar-2022 14:11:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrWBQPgsXqn_NhfdqWC5RTzutIib_tANgLUyE5ijsV0zLA2pAB0SwxPmIRvQHxEGX2uyOC9c3hW-hl1bHxjy3R3LX4XfJZGsbHf0iq8nYWvy2jFSLijlTK1CWMxNHKsty301ePdWxARdsdlRxGomLp3IACYcqggHyHKUC8ZcNga00gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 23 Feb 2022 14:11:49 GMT',
  'Content-Length',
  '1753'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token', "client_id=00000000-0000-0000-0000-000000000000&username=MSALUsername&password=MSALPassword&scope=M365Scope%20openid%20profile%20offline_access&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.5.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=00000000-0000-0000-0000-000000000000&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"https://auth.msft.communication.azure.com/Teams.ManageCalls https://auth.msft.communication.azure.com/VoIP M365Scope","expires_in":5282,"ext_expires_in":5282,"access_token":"sanitized","refresh_token":"0.AYEAy_3zvsvcqUGueWSPIqMtInzwuq-61iBPn-ogOSCA_KeBAMw.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAgDs_wQA9P95rlgx0E0Rj9EamuXEFwWg3RRCkqmP1QieDVu8OvDGPxexdoVBu7DEpproFgxTa_6QG8DX_7NgD7mPHNVj84Dc0bBkPCe7LjEIjSG5CmB_-NNH05hM1N7L0nJnTvRhRQwfSalfKu7MEbnEp3HcrsJmONfGNYxNqd5aAJLMjPgkaY4Y3wtIy0RdCa3jX-IUgj5Y-PeLEMzPfw7el98F3GXOYlmbJEZplGEcdO2jzrCLtWGa5X5hzTGdybBQz_zbqfu90V0tJbkd7URwaWVHkcz4vkF5SYsny77JHucqph_p8xv4kDiRiHTdhBkbRcayC_E3pEV0ULSLHk6KIyS1sNp0dogOcGn9jZP1PRkDc_cXkNRXcfBY-tSg8Kdnbm0WkVvWGJB09uhNKOgjbPfKADSjnzzOm0W32PXAVIT50JTvH1-5rK7s6dtjwufb99LEkASnVNApuHg3OaK93hGunDzB3jTbTGM6gUpqdN-c-o8YbpFvSJaom6CPT5ipr5rLku9dXjHV0OidUnGD7Qdg_vH3r5GCvQArjE5EVwEgcX3pxWg6X6pH9V67avfOh0WFXoEjrXIcQwYtn-I3kFRfRS-tgJA5h6mXjhOSAMuW0wiUGviQQ5FKcdMMMu6BI3HUxhhO_rgfbZA_Gb2uWkf21eAErJcSlu2M9eBvHJMQxDsfRiWWXFlp72DaD_8_jUFstx0z2KD8MbBuW_DhFWdOKpDVJ9XYPaajLjZJ2CcqHn-JTIUXh9gxlvQUvCN0Fga0jW2MnFwbeUbOppsvp0jSwUnexXQpaG9nn2v0rP8ANoIOzrKh1dxVHnY-kQJOgzkx54eJgPLm7tBUhCaH-MW_TUbghpA37EnJpEFB07CIJfn7Q-QzANURrPmlaTVUxG8NP2mCNzPArhMXtYYIJqjHhzgZlIrq-duiT9itX_wH7R_IBu8","id_token":"sanitized","client_info":"eyJ1aWQiOiI4MWU3OGNhOC1hZGU1LTQ5OTgtOWMwNS0xZTE3Zjg1MGZjZmUiLCJ1dGlkIjoiYmVmM2ZkY2ItZGNjYi00MWE5LWFlNzktNjQ4ZjIyYTMyZDIyIn0"}, [
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
  'fpc=Am4npxZyQplBiFC0odF9-z64k9TnAQAAAKU3qNkOAAAA; expires=Fri, 25-Mar-2022 14:11:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 23 Feb 2022 14:11:49 GMT',
  'Content-Length',
  '4648'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2022-02-23T15:39:52.6478293+00:00"}, [
  'Content-Length',
  '818',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '7b0Ndpub2kW5FMtPy84k5w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'api-supported-versions',
  '2021-03-31-preview1, 2021-10-31-preview, 2022-06-01',
  'X-Processing-Time',
  '267ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0pkAWYgAAAABbWyWh10A+QpnwtzGoE0e0UFJHMDFFREdFMDYxOABmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Wed, 23 Feb 2022 14:11:50 GMT'
]);
