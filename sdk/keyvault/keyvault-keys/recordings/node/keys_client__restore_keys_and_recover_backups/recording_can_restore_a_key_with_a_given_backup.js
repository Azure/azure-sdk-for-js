let nock = require('nock');

module.exports.hash = "813a5c03b94129dea3f4b4def51b5b65";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azuretenantid", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b2c544e9-db97-4bb8-a6f1-59dbc339c249',
  'x-ms-request-id',
  'c2b52035-1fdd-40df-b74a-8bad3eee31f1',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '8afd50b0-cb7e-4925-9a5d-608387f54f00',
  'x-ms-ests-server',
  '2.1.11654.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIAwAAALUBENgOAAAA; expires=Wed, 19-May-2021 23:00:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrwEGNMMID2sOPyu8AVJGR4ev1yfbZjNbT8lLmkaCs5YXrhoBS_4dLN5u4JCVL2kuTNaORjnGj1hOfdQDu_M_8wJ0T_JUVlOy5CelmNbvVSUyQGWxvHJAg_QrGPbSIJxzaKNPIkHVPQXRJPdvguSCrQhrmA_vQxsr6ij34X5us0jYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1651',
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
  '19a8b5fa-57b0-41c8-91bf-83f558220500',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIAwAAALUBENgOAAAA; expires=Wed, 19-May-2021 23:00:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrm98QQOp0TUSj04ypwmUznAzOVPGEog5eTc5Glrxye9jO0dVwzCn2UJSrXKGIKUDMJE5oNbEg5UgbZlniqy45yMKNzrws0cI-IdX09c2ppWuXYQe4Ltxz7Y8nygC3-uYwGQtDFvHFnDnf8OzNYLvPp3OVis-J6MR0vahD3waH7nsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  '4ccd109b-fc21-4815-911e-ce06a8390700',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIBAAAALUBENgOAAAA; expires=Wed, 19-May-2021 23:00:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8-N6zbKHsE1YIc3XfRL3L0yENMR6nT2rE1zAg1FA4hU1KXhYeiXz-K0vk86czSlDYCuix3XHHBzIYzXw5H3eLXfWrwj48IqfDoOkcc9TpXL9PIff1dxGKYUN2AxLvveZn8k-iSkbGduwDecAY8-q2SCvzZ_X_SiA50smq2OHJ1fuwIFrdm8GMaRQpBeUzQM13-UHS853hkfA5wPSZDl-AVxZWWekz-wl_QSCnFALGrtcRoTEaLxDPsucT9XczmJLe063zq_c1WsyCze9VX9O_qDx7LU4_OoAhzvzPrXkTkP4J0_bfZE9kp1oHHwZazxlLBjRPxdZloxVZjvZj3QmDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873240,"updated":1618873240,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b2c544e9-db97-4bb8-a6f1-59dbc339c249',
  'x-ms-request-id',
  'db9514e8-6977-4cd8-9cb8-c984eecaf0c9',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT',
  'Content-Length',
  '736'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bb789388-0011-4990-bc04-8851eb289433',
  'x-ms-request-id',
  'e1c9fd16-ca80-41ef-ac60-0f43c225a56a',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT',
  'Content-Length',
  '11808'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1618873240,"scheduledPurgeDate":1626649240,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8-N6zbKHsE1YIc3XfRL3L0yENMR6nT2rE1zAg1FA4hU1KXhYeiXz-K0vk86czSlDYCuix3XHHBzIYzXw5H3eLXfWrwj48IqfDoOkcc9TpXL9PIff1dxGKYUN2AxLvveZn8k-iSkbGduwDecAY8-q2SCvzZ_X_SiA50smq2OHJ1fuwIFrdm8GMaRQpBeUzQM13-UHS853hkfA5wPSZDl-AVxZWWekz-wl_QSCnFALGrtcRoTEaLxDPsucT9XczmJLe063zq_c1WsyCze9VX9O_qDx7LU4_OoAhzvzPrXkTkP4J0_bfZE9kp1oHHwZazxlLBjRPxdZloxVZjvZj3QmDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873240,"updated":1618873240,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ca5eece5-6b83-4adb-b8a9-a85a8b5cc97b',
  'x-ms-request-id',
  '416deec8-5271-4fe6-acc4-c693a3938b00',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:39 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd5e0f7fa-42db-4c87-9376-7504279fb428',
  'x-ms-request-id',
  '2e541e6a-b8e9-4946-840f-75bf69363d14',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '91c940cc-f14c-495a-8e9c-1afbd2dd45c9',
  'x-ms-request-id',
  '2a47faff-e584-4e96-85e6-846fd21e940c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e8ad16d9-9f14-4ddf-a62c-dd189d9d5967',
  'x-ms-request-id',
  '15f21fd8-127d-4f41-af49-e9fcc5024fe6',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'efbef65c-e7c8-4131-b074-b1117941bb64',
  'x-ms-request-id',
  '8a9400c0-e3d7-46cd-a603-f692b5304a7c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '735bb20f-39dc-464c-a7f6-070d4b0f7aa1',
  'x-ms-request-id',
  '2cb5aea7-8390-4b8c-b723-cc0c1870cf1e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '79eacb9e-3d38-4420-82dc-4237f87fc453',
  'x-ms-request-id',
  '5ea96fbe-9311-4d01-968f-40cfec33367e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b1b764da-1bd8-4f72-8155-4fabf2498871',
  'x-ms-request-id',
  '9b4e5033-d15b-4404-aacc-8dfb41cebf6e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '945153ab-044f-493f-87f8-02602f5a490f',
  'x-ms-request-id',
  'aa07e312-2c54-4d64-ba6b-b321c3213675',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'febf23bd-7d66-4e10-9491-3d33c720d01e',
  'x-ms-request-id',
  'dc78849b-a4e8-48d1-b663-5c1eadb28860',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '15c54dcb-09fe-4513-ad19-42728aa556cc',
  'x-ms-request-id',
  '6e1fce36-62a3-4d3c-9081-15ad05ccae93',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6f85a368-c63a-4f69-9400-5a4cfcf7c063',
  'x-ms-request-id',
  'df46fddf-2da5-4320-ba2b-6bf33637f5a4',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '88d06bc4-5c04-47c2-b29d-adcd8bc52b92',
  'x-ms-request-id',
  '25de39bc-d196-49bc-9e63-fe7db10b811d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2a5096c4-4534-4123-9dd7-4f1d049ff73a',
  'x-ms-request-id',
  '1c4ced3b-f160-4d8b-8f79-746099da4573',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '233e44d2-8fae-4382-a1a1-a221b1d90518',
  'x-ms-request-id',
  '3a78bfb8-1f39-46d2-8591-e1fd9e750287',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '71ad351f-0e51-4158-8f64-f455e0b3a1ea',
  'x-ms-request-id',
  'c4c3d0ca-92a2-4964-909e-4dd26d98c314',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e4b5732d-cfb9-44d1-8494-8a2bb3ebf1a5',
  'x-ms-request-id',
  '4b127d0e-6fb4-4fea-87d0-855472569e58',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c0591393-fbbc-4353-a9d6-2616ad14fd71',
  'x-ms-request-id',
  '52354b66-2bf1-4ba9-9f06-659fad961833',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cdcd52b4-0c79-4c2c-a322-55bffb3db592',
  'x-ms-request-id',
  'e82caff3-524b-49aa-8ce1-7d56901c76ed',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8f56689c-a611-44ae-a592-3e7b3301e459',
  'x-ms-request-id',
  'b9244268-aaea-4e8f-9bd1-b78fec102a0e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49dbec3b-5fd7-4e83-9bf7-abf96049ecfd',
  'x-ms-request-id',
  '670b8b7a-fa79-4b18-8849-2f4912ff7a25',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8a146220-01ed-4408-9c78-0cc59f465887',
  'x-ms-request-id',
  '4eb652eb-cdc0-408f-a007-830fe5dc99e0',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd92f4cc2-3e8f-46a5-a0cf-99cfe64151bf',
  'x-ms-request-id',
  '47641ad3-fc2e-4af1-a295-4e79b4247929',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f58c5300-0602-4bfc-9cc0-bca7d976194e',
  'x-ms-request-id',
  '10c6cfd6-d93d-416b-8fa6-196e036ffdf4',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1618873240,"scheduledPurgeDate":1626649240,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8-N6zbKHsE1YIc3XfRL3L0yENMR6nT2rE1zAg1FA4hU1KXhYeiXz-K0vk86czSlDYCuix3XHHBzIYzXw5H3eLXfWrwj48IqfDoOkcc9TpXL9PIff1dxGKYUN2AxLvveZn8k-iSkbGduwDecAY8-q2SCvzZ_X_SiA50smq2OHJ1fuwIFrdm8GMaRQpBeUzQM13-UHS853hkfA5wPSZDl-AVxZWWekz-wl_QSCnFALGrtcRoTEaLxDPsucT9XczmJLe063zq_c1WsyCze9VX9O_qDx7LU4_OoAhzvzPrXkTkP4J0_bfZE9kp1oHHwZazxlLBjRPxdZloxVZjvZj3QmDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873240,"updated":1618873240,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b7e20d79-dec3-4ef8-87df-ec4a61dcff6f',
  'x-ms-request-id',
  '52106866-3b3d-4a06-ab7d-198fd42d23bd',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:26 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '36ff7c9d-16a3-4dda-94bf-c8a0283ed215',
  'x-ms-request-id',
  '37307deb-570a-4492-b177-04de6e2f345b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e049b36d-cc8e-458f-be7c-d0220e92078f',
  'x-ms-request-id',
  'a56235e5-dd87-49f3-a4e7-ddd9da169e73',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1315aa9d-310b-437b-853f-995819d9decc',
  'x-ms-request-id',
  'e484f3b3-4311-48d8-a15b-7fa5475d0d1b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '62b57c83-0ff3-4776-af72-683c6eb0fb1c',
  'x-ms-request-id',
  'a0017b00-6907-47c1-b518-69ceb68f33e3',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '71e29263-1cf6-42c1-b595-9d8821532785',
  'x-ms-request-id',
  'd5b3f72b-74b2-4567-a360-b894c4f0a425',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7018c6de-45c1-449b-bef2-c3afd978bb78',
  'x-ms-request-id',
  '3354bd43-81c8-4d0f-9c53-2b4dcdea744f',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b6faab24-a3b5-4d0b-8424-744ec6b31a8e',
  'x-ms-request-id',
  'df3b430e-f169-407c-8a66-17fd9b62f3c2',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd32659d5-aa43-4ad0-9ead-387f2560494a',
  'x-ms-request-id',
  '9a0c7a4e-b601-4d05-96c9-2868804a0478',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd148e457-2d85-41ce-8a4d-c4219bdc7173',
  'x-ms-request-id',
  '35b60e71-15ce-40fd-9b9b-eca9f41978da',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e7346111-c227-43bd-ab8c-806bd876acab',
  'x-ms-request-id',
  '907ab526-8550-4f3c-bc01-59917ddc10b6',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a9893d3f-d1f1-4663-8d70-97f9d967200d',
  'x-ms-request-id',
  'd8436587-574d-4e3f-bf60-aba45860998c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6645196e-6fb8-471d-8b62-3db9faeed309',
  'x-ms-request-id',
  'de226c64-1f34-4e13-aad5-828f45063d2b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '51c217b9-7614-422e-8565-8f3699a91b3d',
  'x-ms-request-id',
  'b722e245-f709-4098-9c36-a9c8d711eaab',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9c1e9a1d-75d3-4261-b5fd-8c119c2c8b66',
  'x-ms-request-id',
  'e5b41da5-a8b6-45c6-a885-e3037c55dfbf',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e2901c63-07c2-4d46-b68f-d634515245a9',
  'x-ms-request-id',
  'ceb5c8df-8777-4b25-a3d9-6acee1605f7f',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a02ef000-665b-4113-bc70-f5a2620a8f07',
  'x-ms-request-id',
  '52f79802-4831-47b8-ab7e-28c6765e1c80',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7326239f-ccae-4373-9ab1-b42a0f96084a',
  'x-ms-request-id',
  '3e4a3c80-f016-4c03-812f-275a3fc96421',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f12e9bb-e211-407b-a6d2-37fea59eed85',
  'x-ms-request-id',
  'b7303f55-439f-4bac-98a8-bfa23875f899',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:01:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de3e55a5-bb57-42dd-9bf3-fe20a787a546',
  'x-ms-request-id',
  'd317e13a-0e22-4662-b77c-ff581d58938d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '882119e3-480d-4177-85bd-5340b54ca0c5',
  'x-ms-request-id',
  'c1ffc275-5f0c-4247-9325-6d0c4be01f17',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '91708ce8-baf0-40f5-b027-f930d93061f7',
  'x-ms-request-id',
  '1b7b60bf-ea00-4167-a5ff-a60323628bec',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ccb84b20-b5e4-44ac-9330-71fa8ca8c804',
  'x-ms-request-id',
  'cf27a895-37da-40bb-8efd-2f1b8fc324ba',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2d8e8bde-278f-42e5-890f-8fa28642a3c4',
  'x-ms-request-id',
  'a9b319b5-18e2-492f-8534-a24ee4c2e5ee',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '663',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4e92b3d6-e669-4eee-ab32-34bf1ccf0916',
  'x-ms-request-id',
  '1ef479b0-38f2-4ec3-9448-aa51ae55bbe1',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaGFqRG1fX0ZHYnAyZHpuS2t5R3lqamVWYU5fdzBKVGpwM0tQMXRoZkdzT3U3bENOODFKTk02ZW10dzNXS3k2RDJ5cWlNQXlFSVJlVDNVUUpRcUtxZHBMUjBjLXVUaVdUbE9BRDJhLThLTHFsaDc3TTJPS2h0V25QSW5raDZDYTJINW5obDE2Nkh5OEJFZ0xyalg3aWpfdXg3Y3JCMEE2dVNtd1Z1ZHN2dk5KdGZieFBVS0JsOWI2WWhyYUE4ZWRVVVF1NkQzQ2VfN1NkQTNSUlRJcGFQZ1F3Y0xGeXJVTnl6VUZ3S0lPZGZEWmlsT3d4TFlraEVHX3BqOE9Wa1VKU0NGRHYxeWhJZ3k0MlpJOTljVTVhazFqaGJ0UEgxUHI5Rk92UDhncUZtSXZFZkd5eEJBdlg4eGhzUHBxY2pRdFJTaGd5Qm0xczlVUDl0NENwUk94MHd3Lm45OVBwdHgtVVVCQndDbjNiSVdSTUEuSHpFdUZTOXZ1RmU3dFpHaE9xSTdKUWxCU0g1dXdwTUozM1U4bEV5bkF5VHpYUDBVLTBNc2I3VHBXbUdqM2xfcm85c3VwX1hxYXlKV1NIQTl5ZEFrTEFTRkhjNXQ5NjhTQlpKdk1YdERXeGtnR2phVVV5czlCYjRPTjF5UXFXWFRMcmlCUnROYXVNajBuODVSNlFoM2JYOENXdDZyQjVScVdUSXoxWHItOHRqTTlZOGRKUUpHSnVoenFPdVBmY2JjOGRlRXFZWEFzTjhYdmNnRHFHbmljMjA2ck1KdEFlYnIwSFhEV3NHM3UyenFqRHdOa1JKV3k3Nl9ucndDRVl4NERMUFpqMFc4aVhGbEg5alRjSDU5ci1kajJQV3JtcndDZm8wQ0FpRUdiVEdHaWtkQnYyNUlRQUhPX1c5VmFqSkZkejFuNTlDd1NaOU13Rnd0WXAzUmQzNkUtWGRGSEN1RkprdG9VRnN5VUtzdkl2Tm1iUTFJWENSamlYQlF1NWFsRlhZUUJTdXhZM3l6UDlJS25QcEdyWnNQRVd6X3lmbVRmMWpaLVNxOGNEbDZKaU5ibFVkMmw2YllrRUFGa3ZFT1ROTkUzdmQtTEo4V2RNdWhudGZkMXNqdEk4dTAxRE95dUpxV2pYVzdkQm44VTd5WXY1SnQxOFNUR1JYcG02cjlTYjQyZlRYSjBsUFZGTllqSmJwYzhjVFBLV21DUWpuUUpWOG00b05sOFAzXzQtQzM4YTV5c0VLOFNvYVJXcFFfcnY0LU1FWGhOUHBhMUJST2FUSk1FR083bVdEMEt5R3VoLVoxSU5RamFSTzZTVEdSckpwRXR6M1RDRUhBSlJpSlBJTkF5OThVSE5BdnQ0bjhhYzBYU3RGelo1WjQ4TUlNdEFROHc0TU5WMlNVY1QwRVVmVmJ3dmZqZm56RHRfRzl2YkpaQWR3QXZFWDBWSTlzei1WU1hBcGxqdjZwV3U2YjFuQ1NFN1pJOU53cGZJdWtPNmh6VUVYTWtRSzMzRnlBQWw2a2RzTHdUTE11U0ZGbTZwd2NkU3NBeGwxb3VIWGVTbDNoaVllUm9yb1ZadHRGdGFQVEZqZEZoS2Ryc2RJYnNpaUVDYWIwc2JrRl8tY2dOOThacU5iNVFIdnJ4VWdKV19VRGVFSVBISHVoVmVtLTNRV09sN0tSRHNoS29XYldBeVA0VE9pQUlhWjlZZ2R5bHhkSzFhdGY5VHZSVDdKR2oxbjZrTGR1U0o0SmU0RDkwc0NQZ21xQU1wWjZKSDZaemhCRGg1X2dUSXNLOFBSdm5oUTNQeVc3UUM0MWdBa09SeUZEZ05JRTdEZVhFSEVpNlhYTTZYV3FkMGp3VWdvQ25BOWRjd3lpVVRRQlpoUUpmOUh6N3VHaGRlY2hmeWdTNUVxU0dmdkxpVVhFc3lmZGZhTF9WUGh2cVI2MUJYM1ZGUE9YZDg3bURJZW56Wlo0eERQLWVuLTQ0bmMxajVZWkRTTFEzamNKazZTajZZSkhGZGlPZFFIWVNpb3dkMW15WllRR0V1Z0t1WmZUTk9rRkd0bnR5eXAzdVpxeVM2Ujc2U01BbTVJc3BldFRDUnpueGhRNXNadlE3dzdYN25HbjhvVlFhMW9BME9NeUk5a3JxcUpQSUVCWjBxdFdTTGI0MlB5eUtMbU1ieHF3LTdwc0FfSWl4SjR0aEJIX29wc0QzeVk0WFVxYnlHc1VlWUhPVF9XNzI1dlRkS014T0FLdVpsdTIzSm0yVHdJaXh3RmpiaFZTbFZUM05PNGlXdnlUX2gzRHlnZFV0RnVBT3BSMVhkbWxYMlVJSkl0TlA3NjNPblFtUDN6b0g1aWk2ZXVRNWZYbUhwWWpLWmdlR3Y4N0MwQUxBcllVVW1CNkI0TXR3TkRIMm5TZ0R3Q1o5aU54VERpX3lOV3RGenpRZTFyNmRaaDRka2paVWpNRGRneV9DOTVvbnZNcjV6RjNOemNveGZ6eDZlNXlFYnFuV3pyQnV3b213eEpUelhvaF8wRVVYbmdMVzRvZ1hDUEwyTG5LemZwekQzQWxseVJZTHJoWlFQRjlsYVFBbWc2QllVdlNPbVVpWGNiSXVoUWlFWUREMXRucXY0eDctM21vb24tQXZyNVFUaTRUMWtld21lSGVKbTdqa3JqaUxvM29KNjZyZWRISFB6ck9PNUxsbGpDaVA5eXhfeExiT1BKUVVZdnFBNHE0X1NrOFV1dUNjZFktcEdxc29RTllRQ2lleWMzV0gwcDRRTmZMRXZIRkFzaFdRV3pScTZRTFhwbGVnOU9Od3J6ekV3VEpVYlB2amlXNVltbG5vMFpaNVRTWW1QaWhMcUFpV3BzTXYxbWt4YUJJcENHcVlGM0VnWEZEMmZSZ0lxQnVUZVJDUDZKZGdRQ1V3VFV6NnYzNk9JRGFtV1N4Q0FjRzBJcVMxNENUVGlwc1RUWTN1WDF3YmNBbXItOTVTTGhtLWMwTWt3NjJTa2hnTDhyWHBYdGItdVZfTWhCRjJyVXM5WEFkUXV3cUVXQ1h1RElBWTVnVFpmalpmMDRSYURTU3JLbDZNajVNbGhxNTFSTUs4T3I5QzJCXzhoREswTTFUU1J0Z3dGazEzbXNSN3JUTlZLdDUzWDJRSUFrc2Z6bERPU3VZaGNZb3JwOTFLaFhCMFQyTVZJc195ZFFRM0xiRFVheUJSa21ZRzNGOXBLRlRnakR0cFVfYVlTc19LTXdsRmRYVXNDTGk0V1c0VXI0YjJUbjdMSzFnRm12ZWdBRm1GekV5bVI1QlZ6aUV3SDRVem5tUVJUZjJ1dk1XUlFZMGw2dTY3aDdUWUZjZndEUXg2M0s0TjduSjE3dDVCY1JLUlZvbWVaMmlkcW5vMklqZ2x4VWxxSzZic3MtbDhLdGo4dlJJXzI3a0lvakpUQXh1NmpkSXVOOVhCU0t3d1RudklzMG9qMHZ6V2dKelVuQ1lqRHhhalZtODlBWjVEbENDUmVURmU0NTB3STdSU2J4UGNoQVlvYTZ3ODNNTW1ZNldfX18zTlZSYlcybHRRaWhLa2lpVXdWcXg4dFg1WlE5ME96ZTVxaGcxdFpJVFVmWC1ERFdzRGhIcjZYcFhPdy1fdlQwUFdKT1k0UU5rQ2JacjRnVjlHMWJiV1U4YjhyemJBMEhKTFVXNHJFa2dTLWNjOUZ4Q2JQc3RkSE1jOEVzTjdCTFZaV1JMbE1rSURrMkc1U19veG12NHJLd0dQSmhMMFV6azAwQlBjVGJ2LUpLTFk1NlVvTXFYRmlPRUxxRkMyckllakUweEgzQmM0WkxJcUhWSTlxOE1rdXZKYTNzU25mSF9ULVA2TnFETmRxVmgzR0xkNTNESTlmMlNaRThSZXJieU5xQmgydTltb3J5a19EbTdOdjlrX281dnJ4NFJWNEVyRXRvTXJiX2NWRDlydTV2cENEZ1VEdWpjUnNueFM2YkVXcGxZejVwTEh4WlhGU3ZFdFpUNndnTkE4bHBXM0JkNU1aaVhxSzVvTHkwaFVmT053VFdMQm5zbGFlMnA0UmRhQjcxX0FmVjZ1SnlWaFZIM21CN3k1c1B4eWpENUk2X1NmSDVlaTdPSjlOUmVtcU05MFlQb3ZvNWhzRndsT2ZKNUJzVlc5MEh3ZlFnaFI4MGhCdWpJQ1pUTUViSHdYYU83WklRblh5d0hUYVNPYUxPT0pUbDRmUHdlZ09Bb0xnS0RWalFGQVdoOVFwME1rRFdwcjJmbHlxX3hOcFEtSWVaNWlrTUxXUkU5MDdPNTZ0NTBZZHRYcWxhbXQ4eXV0VGY0LVRNQktsWV9ZUXdHRFczV0FRS0hJYjFJaDA0ako1NTlRYTBMY2s3WlR0VmNENmZTS2tNenlfOUdOV0FNS0VEclVoUXJjeDM1Vl9udFFDaWZGZWw1S1V5bkZPcWppWWR0YVRPTU5ldmpvd3k5X01WOWdvVU01MGpxU3dncXBVZXo5TVdrYU1jSEdJcDJmZlpWekdDLVZLMjJzSk1XQmFMU2RUVE5DdTNSWm91MVg3T1VRVnIyYXBKMWxwUTAzemlManVJVFB3SkFlQzV1VVFxeU9jVjhGbnpNSENaZXhndHVLS29aM3U1UUFjS3dBRDZiTFJMYjEtYTF6d3ZOT0JDYzNXLXdMTW85aGtseUNmQldFUXdEOHlYY184bnFQcXdIbHFzWEkyTGE2Z21CX2ZldmJlQmMzTW5zaHpsb3E5Mnk0ZmRuRVNGVDJJNmtidmJPT2h4XzFITlpGQThsUWhNTUVrYTgwMllZN1lvTXlZTXpGYnRoVW5uU01lQlpacnJlVWtuNnJ5aFNmWmE3c2RnTFducnFyaGZCOXpYVTdzcURya0JtRWRhQjA0X2JaSnhiRmY2eW90QUk0aWtTR0NkWE9OdHRldmIyVkwxT1dNSndDOXRHN2ltaV9fSDJDcG90cFVndEVBekJ0ZGNPTFJDclAzNnpKeVBQTE5ySUI0ZzJCaTNCSWJsNERJOUhtaUxjZWRoQTQxTlNid1Jrb2g3S19pYU53M0p2ZWRQWDJNX25jaU5TaGFqSXVrRnlBSVEzMVVtQ1UybWRDQXA2dVBKb0Q1d05yU0dUVVpTcnZ2eG11Z0tzMWg0VTRQeDd3SFVlX2lxeHhJdDNwVmlmTUplZ3BGUzNGZVJ2UUxXeVFMTldaNVNfUWJrSkZuVlVyT3VMZ0NXVmpHb2tGU0RRa0dSUkxCUTJkdS1YQUd5anBQZ0dORXRKX0h6U1EzUXIxZkdlLUNHWElfam5QemRfQktvOENXMGU0Tng1Um8xNzVTUDBZZ2EwTmZWMnJlblhBU0xwM0lQODNYV0ZlOGpPYTgwZTdvZkcxTmxMU21kZzB2UnlQRXYtYmNVV0ZYRW5GU2s1dWRqMGUxOTQtV1BjeVRXTmJOVkZrM2pJdzUtcTJtSEtBTDBENHY4MFo1VWVBUjlMRkxrRWlCYnNYUEtneTFxenFCbS1SeVdpN2V0UGV3MFJHYzl4M05MSGM3ekpZNm1FOVpFTW9nQzY5WUpqaDVvdjc5WWFucm83ZFpCN3I1Z3BDS09zRVU0T1p6RUFockhWVS1HNDBfSkxPbmw3dVVMOHo1VWNpMlhocDl5WjVZRjd1UHVDdmsybFg4dUVQX05pd0hIWGVCcldMZHJKSTJ5cVZyMkhKY2xWUTlpSjA2UkFzekVZYUlZcXR4OHpFdlBwWWZyb3FtSEZjeUZVYUxhYzhKalVrR3VUeUltWDhzcGNaeHY3RTZpa21feFpPbHcySUE5SjgxbjBUeF9mU015VGEzV2VyYzFQdlBhaTFBWmhobjR1SGhMRmtJWmNzOXplWmZKYVp3a0JGX2FOSFp5WnVVNGRELV9talNsWG14bXIwcC01clVhakNYY3RLOWIzWnFmOEdFVDRLcFkzeWhMeUZWc0U4YV8xT0J4blE0cTYzU0RPRUVvV2N5UUpocXZxN2hGdFptRlhWWTJobE9QSFJpQlRVenVlQkJqR2JiTTFZcVFCazZYZE5nb3Vic3owTEtLY0VQTWVSMDg0emNNNlBoTUNHRW5mVm1RR2RXcnF0a3Fka0RmcmVEbncyVXNWVG1JcjU2a3JlWFducmoxY3FNZ2l0SmJfQWprajR4bkRyMFRFM3ZkSktQcGpCeUxrdllydzNiQUlCV2x5ZkRzSVBoakV1aXBWMDRTQklTY2toZi1ZMlYtUGxNTG1NbHlyVjFOQ2tiaUN5cUZZZUo4NGhNV3Iwa2FPQzYwVHpZRm00UlM3UC1xMU5GODM1aC1QaEN0QUNqVk5WN2N2SVVxWVFYTXpBbmVyblYyQTczTXJ0eEZNNUhIak8ya1dnOVM5OWxnRWxFNHo4c1dRengyamdubkM1RGdFRmNkRFpUdUlYOWR5cllJVEJtckR1UTRTLUswV1Z5ZzB5UGxzR0pPVFNIY1NiSndpbWZ6YWZObXIzUnR1RUZZZlNqVk5qUWpPYXU4dE1hV0I3c0s2U3BPUDBIYVNPYkNxRDBoMm1lMno3d2FaSGFGMUIzWVpRNjEtb2x6Sjd4Wm1UMkpWOVRITmlvN0RXUGdLMUJ1RExxVThuV0hVSGltbzFwR1p1NHEtRVk1MmtyOEN1M0tzSWU3bUJaMW1EVVZ3S19NMFl4a0hGNHhxcnBkRlMxdFJ5MTNfQVZ0MDNNRl9TVXBxazRRaWtRNmdSWVBIV09zWHJlN3puTFJuUFJROTk3Zk1aSmFpcGhmNnVDQy1Xei1BNVQtNVRGeWJaWm9uTVVCVVkydHo0Rk43WVAzeDdYbjlWazlsblVVTkwwakd0ZHQ3SDRRYkt0T25RNTQ5OTB4QmNOV1ZrTXgwRVdfRmllbk1sSGFNdk5pWkFEUE9IdnZrdG1UeUVyS3F3cFUzRnV1WURZcGN5aHpvOU1pRG1oOHZnUWFGbjh2Q25oQ3gwNHczeVBiMU13WWpoYzJwZ3JfSU4zOWVtMm1Ea1M2MDQ0aTdXUGsteVRra3ZnVVprdjMyeUhROGRaWGlBNGZ3Q2ljTWJDU05vUTFYcEtIY3BlcE9SaG80aVNRWmZiMjB0cW1zY1lTS2x0UmZpVkQxaHl2Sm1GQnNQUG56VkkyalcxSW5RUkhZMkZURU11blRWNkhrSGpwa1dRSlNHVEkxLWFHdC13WWRzcHBkdGpyS1JWM0owUjBMNl9TdW9KelRwa3RBczhjb0o1MlUyUDNBU2IwcXdkNG1mMXNDYmV6ZWVqWGFpRlQ3MnZSUVV3SXIteVpEdTZkdVlGRjBLNzJEZjI1Q2M5T1A3ZTRRMXJud0V1bk53WGFmY1c4X1RMSEVOS0VMbjlYMEk2a2N5RjhlVVVicDFjZklVTW0yQklUWWJSSTVZdE1OQUdPQ0xjcHRFaUFuc3k4ZTQwSm9qU1lSR3RYOUhGRnRPTzY0Z3hKVnY4X0tNNUoySU5YaGE3OFQtWlk4U0pHRkE2ekJ2TzNwU2d0ZFl3ZXkzUGtyQ3FzdjhjUDVIVS1oZUhFNE4ybUtaQ1UxTElTam5QX2RUaHd2akdFODBrTUVKS1FYeEM2MEp0LTUyNHdadkRSZ2hNOVlzbjRsLV9fZVJpM2tSa2JlSUwtUGZEQ0laNmZCR2lYeC1jM3ZfSzR0OFEyTXI5WHpCUEhmd0M1S2trX2xRRE9xY1hzZGxfeDJrLTZqdGtiZFN5V01pWF9qbWFMdnA3VnNFUnc2X0hocnJxdEdWczhvY3daNlNoZG5uZGtVV1d0Q2F4TlBnSHdqOUQta1N2Y2lnM0VfNFBONWNtYWFsUVRiQ1MyTkppWFVtOFBZSHBkLUNMTnFZOFg1czRyTnM1M0ZlWUlWY0dCU2RFZHlmZzc1eXkzQ1BJUmRBWUdkTU42a0VsYlN0TkVEdkZXRkFCM1VxUWVxc01oS0p1LWwwYUhPbUF5Tnh2UC1LMUZMU1VIQ1pabHBaTVhMeFh4QktMaTJLT3V4QnJDd0k2cnNtdHFLc3hQdXJQR3g4Ny04NFJkLURHQWdpOE90TkNBaWFLcFZxMFRHS1RCX3RJNlhpZ1JkMXFyNlJDWlhQdDBlYnZkSnpqM2UtNHZEY3ZhaDVGN1NBeTNKbm1qWEN2N0JkUGlsWFhKNTliLW5xaTU0V2VyZWxYYzBzSDNUQ0FOUjRqR3lfa1czOWlkUHVwQXNSUVNGTnVocVVvNG9lWXpPLVROaWFkNjN1X2FrcGpQTTF6bVFOdWlISXJPLVBjdmowdWtIX3dVMTc0MERQWTYtYWV6OXJINHU0eW9xZU9VejVzbmU1eVdrM3JpZXc0MUZNc2g3ZjMwcHhkd19uVlNsZDdLelNudEZkbzBBcnNDVGdEcm9BeXZrSlc0WGJPZVFRRGdyYTBZYmswenNpeUpVbEctMVpoV1ByVWJjaTB3NFVaTWttSzVhVHdPRk1FZ2tGYmNRa05GTXVOZHhfYWdtam5DcnVRNDRGWjJPaFpCRGtpaThTTTdUME9HUDBBVVpPMjl1SkkxNXIyekVVNEh4WVdhR0J5SkNJLTR0TGpuWndIc205TV9lZjF6c2NPQ0xQZXFJd2dkckYzMEdvcUxxNGdkdEw4MnNGSndlZUp4bTJyRGF2WE5rY2lNaEFxTl9fQkh5OWtVQUx4encyVGlLWWVtZEdxVUNZZV9UclF4bXVua0FRR0tsZlN6LVg2QXkyQkY3Uml6azJQcHRBMGdycWFaNERxRHN3NkY3UmJSRk9yMUs5S25aVGdHU190QW9oN2hPeFlQZGo4Zi1GVGNHcERaTlI2U2h1MkxrYUpCb1RYS3E2UnJpMFFadUMzY1UzcksyRmFDUlVXMU53UnNjTE00VUd2VlBSWlhSVVJZOUlqLXlBTmdGRi1EREQ4LXV6VVoyRXNZdjZoNFlUZXoyeXNWNGU3clllSGdLZ2NoaUlkbV9PcExNQjc2WTJKVkl3Q2NJYmVFYllFZU5PNHk3NjRicC1EdlFjMjI5dU84V3h3U1hMVGxoSE5DZ216Ukc5VkpQY2hoTEJGMVkyTWE2M0dEYnV5ZDFtWDVGeW9BNkNISHRVdmMxbjVKSnk2SkhPVGNkZFZqb00xbElhck1oXzVqZkZWNWRURDBGN1V4WWwzdFpBaklUTzFpWVR6bHlXUDZ3YUJ6MnptX21KT2JUNGVrWmNJdUxaMFBwSmI3bVJaUXhaVERLQ1dXcHJSTkZXUTBYT1ppbFlqVkE2OS11ZWZRQjJCV202cEhYUlZEWEIzazJjMnBDR1UweTRjNUJwbkxLTTNBeGRoT1gtaUpqbDc0OVlIUjNFbGlDS0o0MHd0YS1VNzltc2E1Z21hRTE2MGJ5eXVyUldXVElYTlk1QzNxTDdhcHVxUFlPV182YnYzMDRaS2NhX3JHUUJGMGxmNUZablE5TDlQMksyMC1UQ0dVcWtpMTNUdVRMUDhyZHFxdWJVX2xOXzhKeUJUcmo2NmdYM1pnLWt1MHdqSkVNcWxoTEgxeEZsZG1rbXcwY1ZYN2V6ck4tNlZIS0p4M0ZyejR3WG1mdmJoUE1BZXZqeFFITHFHdlZUTEFlVWlrVGlYV3gyR0VlQk05U2xWM0RxWnhlNWx0QXE1bXZUZ05BWTZHbERBQTFMWGNGOHZOaWwtU0lMWUhzZVdxSGp4VjVXejFYLWJPamxfbURsbndQZ2hTU3ItbWRETDRUR0NBZ3Z3ekRLckZ5UGxYa1hDUE5pLV9TTGN6OEFuamExd1NGZzRGaTFwS0U3NVhzVl9HQ1pUV1psaGxVSWJjZkI5Q1ZRVkltZU5iRFFRRkd5YnlVMHNTMXRWRWxQeGVFMjBCNFBHYUhrdTRKcHI1QjZTMzItc2ZZQ3hTemUwaWFmM2tiWlhGWEc1Z0pvSGpaRVZJN0xvbVFMQmRHXzFGOUpKUzFjakFjZi00WHNPU1JHOWRPMV9GY2dTOEVPcm5sZk5adVduTTlLZmhpeTYxQUpQVTVuZzFCU002ekN5cGxwcnJsVXVheDViYkItS0JmWnI3RW1WYW9lTUdrZ1d2aXhIZGpzOHZaV2Q2dGJTUVcyaWlyRTFPOHdHMGlYMDNwekw5VUx3WVFrWGxvYzRkbFZWVjVrbmJiTUh2emVuYzA0TkV5bFIyQkV1d0JYRnlZb2RlQTRkTnQwcVBlZDQ2M21pNmh1SEVmaHFReE5FdFVMak9Db3VyWHhWYmltZnZody01ZGNZZ0JqQjRnQktQSHBhaW5HdHpIQnc5NG9hb0dKbUJrMldPZWhvb0NuSXgzOW51SzdkcXFEc01KaUo0bi1iQjlYMUtXUGU4UlVrdTNsa0g4WmdPamhKaFVNeU9FUTB0NzdsdFJYSTFpOVZzbS1faVFrcW5uNkZnSWRMUWJDZ201UGxHX0xWdmZKNXM3TXIyYlpHTVpxWUhSaVd6VUtOWGZJZnRpbXpiUktVQ0VUanhGcC1zb09CWjNnQWdOMEYzaUdPQWpLR0lVVmRYZmhRMWpFOEotSDA3bzA3bUhqbnhzc0xwVjk3MWpyUnFxYXNyaEJNZjNsTDI5ZmNhaEFOeDlGbDhlemVYcnNMTlBtOU5KQ2hHU3RVd1hRNXFmNENfUjVua3ZULWw1X044b0t2Z3p6dFRkMkd5WDhhRHRzNVJPb1g4bHVqdnZnMUFLb1ZsclZESXNYWDllZ0RnLWxFLW1qZ0JVNFA2UEFSakdaQWR1c0NtMHRfOVd3UXdubVM3UTYwbnpEYTJXQmRpT1VDdnlIYmVKeF9FX3o0V1BZcE5xTFVObWh3dHpkbWtHbzhNbHllNVhLODVnRVRxajNOTGVlazNrLVVPMEpvcDRYa0VQdUk1Z3NwdW42Sl9lbmlJNi1aUENFWXA3MktHWXpqUDBtNmI4eEtZZXBBREs3LS10ckxpT3ZmeDl0OGNuMjlKMjJ3dUd6bE1QcUJUSldUQXZWaC1RUmFVWVRtTzVzU011Z1hES3psSmJsbURObmtJMDRaUEpZcEdremtBN1NmbTZHOUhhdE9QZmp5dWxrSDRHX0RBUlZ3M1piM3RoN3RLTU00bjZZd1JITjNGY3BCRGRVTDltNmlhMU1zUjBvREpRR2FES3ZVX1pzUFFxUXhzdS03UEdyc2xnSVFFZ010ZVpnMGRIbGVhLWZQNDdMQnJmZDFpVE1jTEZSSzJwQTIzNHc2Wk5KUjNnRElzb25hT1VtR204QnM3TmkyUEh4WURaSGpSc2YyR3E2Um9LZm52a0ZUdnRHY3dOdjJFclBFY0tibFd5SVR2QWNWWklVNGhBbXpoV0p5aXlVSmg3ZDB5TjRWZllPRTR4bmlEWnFMTk5kTnctX2YySnNIb2lPM1JrQ3RJUmUtdzBWVlkzSFNuNGlCTzlGdmFMUVFJRktCQ3ctUWpjRE96N3lXZkNTclFXRlFRS2RfdUQ3RlBkSmljTVp3X3hXa0dsY25ubGo0UWJ6Unlid3VYR1NIUlZYWklZQzFGWm5lMkt6WUNRTGZ5M3ZmV2VWRFhzcklCUDVnWjRPcTQ5STR3Z0NPbWtVN2hhRjNZc25SNXdZUS5RN1JJamVCME9NRkVZZGtYamkwZlBobC0wTW1WbVZ3NXN6OUZDWi1kZzhF"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8-N6zbKHsE1YIc3XfRL3L0yENMR6nT2rE1zAg1FA4hU1KXhYeiXz-K0vk86czSlDYCuix3XHHBzIYzXw5H3eLXfWrwj48IqfDoOkcc9TpXL9PIff1dxGKYUN2AxLvveZn8k-iSkbGduwDecAY8-q2SCvzZ_X_SiA50smq2OHJ1fuwIFrdm8GMaRQpBeUzQM13-UHS853hkfA5wPSZDl-AVxZWWekz-wl_QSCnFALGrtcRoTEaLxDPsucT9XczmJLe063zq_c1WsyCze9VX9O_qDx7LU4_OoAhzvzPrXkTkP4J0_bfZE9kp1oHHwZazxlLBjRPxdZloxVZjvZj3QmDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873240,"updated":1618873240,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c3d510f6-dec6-40fd-bba0-3242fc642c6e',
  'x-ms-request-id',
  '926fe357-e839-4ec9-836c-3016f71e4e53',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:14 GMT',
  'Content-Length',
  '736'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1618873334,"scheduledPurgeDate":1626649334,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8-N6zbKHsE1YIc3XfRL3L0yENMR6nT2rE1zAg1FA4hU1KXhYeiXz-K0vk86czSlDYCuix3XHHBzIYzXw5H3eLXfWrwj48IqfDoOkcc9TpXL9PIff1dxGKYUN2AxLvveZn8k-iSkbGduwDecAY8-q2SCvzZ_X_SiA50smq2OHJ1fuwIFrdm8GMaRQpBeUzQM13-UHS853hkfA5wPSZDl-AVxZWWekz-wl_QSCnFALGrtcRoTEaLxDPsucT9XczmJLe063zq_c1WsyCze9VX9O_qDx7LU4_OoAhzvzPrXkTkP4J0_bfZE9kp1oHHwZazxlLBjRPxdZloxVZjvZj3QmDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873240,"updated":1618873240,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '58f5b5bc-7f00-4bf6-a7e4-0359b1eef775',
  'x-ms-request-id',
  'd8c64222-067a-49c4-b230-3b33d015cadb',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:14 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c66dc91a-14c1-445b-8b12-d1374a2be169',
  'x-ms-request-id',
  '1173268c-4545-4bfb-86f7-dea5d02ecdfc',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4adfd10e-1540-4648-b5c3-7dde3e2efffe',
  'x-ms-request-id',
  '56beec19-04a8-4f93-b8db-32991e0d27d0',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ac101385-52b0-4179-9b1d-460c56ed150f',
  'x-ms-request-id',
  '3fc79be7-5cf8-4cbf-a607-8013b79edc87',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1e994af3-fc69-451a-9a47-d69985096827',
  'x-ms-request-id',
  '0d93668a-4c4a-4c02-b7af-0ac98341b345',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '365a44f5-ee23-436c-87b5-15e05df3fcc9',
  'x-ms-request-id',
  '72c1fa76-dc11-4036-b178-2f21052f027a',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c18526fa-e53f-4056-870c-fc61cb4b0a0b',
  'x-ms-request-id',
  'a3b78003-2aed-4ff1-a015-2d8804950f4e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1bc53cb0-dcdf-4d6c-8ce9-701f85568bc8',
  'x-ms-request-id',
  '3d84ed79-bfd9-4f25-a3ba-b375c2f28406',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0ddfb65f-3ed9-4e54-8ed3-6acad492f6ea',
  'x-ms-request-id',
  'acca62e3-7b91-48cb-874c-15b36a517021',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b7beb6f4-9c54-4dce-a61d-aa30d7345608',
  'x-ms-request-id',
  '9208ab27-ebfb-4354-9487-285c6c6ad0ea',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '117687ac-9e04-4cb7-9207-ae21e8c71dab',
  'x-ms-request-id',
  '3fe34bfa-1c6a-402c-bb0e-e478136d4085',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8471fbbe-00c8-41fc-b8d4-1842216dacf8',
  'x-ms-request-id',
  '2f0ef9ed-34de-41eb-be37-c4ed700369bc',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bec85a21-ebb6-4e57-a668-e6b8f7f120ed',
  'x-ms-request-id',
  'ecaf1f3b-2255-4faa-9694-dbc492ac8640',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1ee650ed-cc30-4272-b744-e8cb200aa10f',
  'x-ms-request-id',
  '6163f5dc-3bd4-41e2-bfc3-ef10075e077c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7584685d-73a4-41cb-b4dc-91664da922c2',
  'x-ms-request-id',
  '98102134-3da5-4aab-b67b-4ba9051d5c1a',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f76d67d-0621-46b2-8f67-863f7d9b0a63',
  'x-ms-request-id',
  'fcecdc96-8eaf-4460-8112-6337b8299363',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de53c418-1b17-423c-93ce-7b09dcdece0f',
  'x-ms-request-id',
  '8dc9a5f9-b51c-4a3c-8719-e132c5bea849',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f7840c17-c7fe-4d67-9ce4-09f284c90681',
  'x-ms-request-id',
  '19bfa1b0-937b-4d8d-9186-443716666689',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bc6d6bc6-f53e-4e5d-9f2e-097f1c341ed1',
  'x-ms-request-id',
  '297690fb-9eb1-402a-9db7-87ef1249ec24',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c1303882-17ae-4bea-9b49-d1a3cc7934a8',
  'x-ms-request-id',
  '707fd463-f182-4012-b4ee-c80953950b31',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cda1e5ab-92be-4b9c-9479-062e25e76b53',
  'x-ms-request-id',
  'eeaa119f-0920-4c0b-aa17-323725a5c44e',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '262a92f3-3060-431a-9b3a-71e4cb32d3bb',
  'x-ms-request-id',
  'cd693b94-19b6-4e1e-b2b9-d1c615f0eceb',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '552b4e51-68a0-4026-91bc-1a62c4d1d510',
  'x-ms-request-id',
  '93da1ab2-3675-43d7-be53-d31fccd5a39c',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '78786e50-5caf-405c-8b89-e964399d18ac',
  'x-ms-request-id',
  'd6745f4d-a927-4615-a12a-505ba7a39670',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:02:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '07c4842c-c4cb-4498-bc84-ca892a1a6019',
  'x-ms-request-id',
  '27d9068e-b79a-4e90-9bdf-dfcf7397e013',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:03:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '08e76150-2db0-4904-8f6d-56366fe4574d',
  'x-ms-request-id',
  '0cb74e2c-ec96-4c60-9a9e-37afde9b3be0',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:03:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-canrestoreakeywithagivenbackup-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '28a7ddff-c880-4662-9e76-52a7dcc885c2',
  'x-ms-request-id',
  '55382fba-ad71-4b41-9ce5-ed7e463fe1a2',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:03:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1618873334,"scheduledPurgeDate":1626649334,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/3b66525884204f6c856943dfeba602a3","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"8-N6zbKHsE1YIc3XfRL3L0yENMR6nT2rE1zAg1FA4hU1KXhYeiXz-K0vk86czSlDYCuix3XHHBzIYzXw5H3eLXfWrwj48IqfDoOkcc9TpXL9PIff1dxGKYUN2AxLvveZn8k-iSkbGduwDecAY8-q2SCvzZ_X_SiA50smq2OHJ1fuwIFrdm8GMaRQpBeUzQM13-UHS853hkfA5wPSZDl-AVxZWWekz-wl_QSCnFALGrtcRoTEaLxDPsucT9XczmJLe063zq_c1WsyCze9VX9O_qDx7LU4_OoAhzvzPrXkTkP4J0_bfZE9kp1oHHwZazxlLBjRPxdZloxVZjvZj3QmDQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873240,"updated":1618873240,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'af4974ca-3a98-4721-ac98-efaf3de481a0',
  'x-ms-request-id',
  '0e8bc5e8-0215-4488-8edd-c7e9063b9ce6',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:03:07 GMT',
  'Content-Length',
  '926'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '21065a26-85e6-445f-a38b-adc0f278a91c',
  'x-ms-request-id',
  '475fe928-a978-418c-8c2c-f8eab184ef92',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:03:07 GMT'
]);
