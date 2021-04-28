let nock = require('nock');

module.exports.hash = "35b30e34918b2521b394768199bbd301";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8ce7a590-3a87-4a0d-a5d5-1d3ed4829e1c',
  'x-ms-request-id',
  '2d2a7f1e-2ff4-42e8-98c9-44d3a12c5e5f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:41 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '94c6c03f-3f13-4661-a340-4524eaca3602',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbAQAAANitG9gOAAAA; expires=Fri, 28-May-2021 19:29:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrzRIentNfb-9WMbdWhm8iDWiJQOWiuNZUkdM2HSOMZt8zWse3-UlmWcNXdTSNIHd6IiBChw4Ycka-_ikScoCrEPXKJNoVr3xIu2ldHNQqeZ2KT9iafo7eicEFS2iJkPopb9BtumsL5hmWhQpY-vfIGzE2Xn369BOvAOsDTQ4Z4-wgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:29:41 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'dedc67f4-ae43-4b2e-817d-760fcdbd1501',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbAQAAANitG9gOAAAA; expires=Fri, 28-May-2021 19:29:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrTZUysXidwbKHU7l14gC0qRxlYLukMP-scbhZyCZ-aaL-1MUoKQXDjXSDoDnOQWK_CwVBqxZUUGd84lsdhFIbm3GqwGfdApNH99D0U-9WUOoAENC8cPr_BbrftN-6Ypp1wEnAwwZ8g3i0HMcp8oYgYyLUbzFGmfYpZ_Vd3Q4r7fYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:29:41 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1313',
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
  'c9b1dafe-fe4f-4e0b-b172-aa0364481101',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbAgAAANitG9gOAAAA; expires=Fri, 28-May-2021 19:29:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:29:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/f3b831d364a04a80adba4df301261c25","attributes":{"enabled":true,"created":1619638181,"updated":1619638181,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '8ce7a590-3a87-4a0d-a5d5-1d3ed4829e1c',
  'x-ms-request-id',
  'fc1296d1-ff5f-43f3-8b97-9c8ae8bc1eb0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:41 GMT',
  'Content-Length',
  '307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuVFFaVGRVV2YyZ3ZBb01VQ3l2OFBfQWtXQnF3UU5WUFNLYVcta0hmQ0hXZmdpZldxckwyQkxGVEVES0h6SWhGTHg3SjJXVGVfSUlSd293MTJRcjRlMTlhSXBjb0l3UEo4RTRUNEJicm45RkVqNFFZcmFhdzRNSmtnYVpvd0JfS1pTQ3B6VFNpUWZvR1dTckQ2MGk1UFZJNlZBZUFrTXN2X2g0ejdQQlQxSEZrckFyNTlNeHZSNGxYUFZTQks2SnhfbHdaRXJoZTYzQXU2Q0lKQ241UVpJd0FSZzljM3FYUklkb053cHZmdU5aemQ0eHpSa1dYREVPX0ozMTlRZ3pBLWZrYXFIZEJPUGtRRUZaVlF4Z1E0MzFqdElUSGtwODk2YXNQYlZ2XzFaMFRfczR4QjhPNGRrS25YOXlHaG9UTWE5NllBdkZoNGRSdVdoeE4tYkVRUERRLkZkVVczdUpHbjJteFJhaGdtcGlVVkEueUtTSnkwQW5wYkVLNmFEWHpjc1hFdy0yaVczYlE3NFRoZjhHZENQdHFxNU14OVYtNzViS1FIWWR2QXN5RXNFUmlESTZNOFNoRlJ6aVd6dGlPeVo2ZmlsTE5WaEJHOHJIMF9jMjRBdmNDQXV3ZW5OQTA1MTZrR0oxM3FZcG1QcVNyVl9xblkxNnBidUhTc2o4eldTVnFuV3FDRUc4NG5hWUlkVU9tWWdjVlR2anFXcHFGMVp1OGM0U2pYZGFKb3lSWC1mU3ZnNllGYUEzdEl5ZVlQbzVoYWFhYWNka2IwWXM0bDFVRXdrYWhoeHRqNVV1UjNCRmlfSXpIcnUzS2ZxS1p6RDE1V1F0YWtqRmpiZFZ6M2stdjNzajhZb0otX3pidDJWX05EV2RuSWJmRHZSQzN5aWtYOGRQNll6MUJuVWk4bzVqY1ljOEZBZlJDSDI2bFBRMzZmNkdiaWpfd3Rkak9UNUJCOVFySkpKaHFTRmsxSkx4UWZXeFlkbUtSR0ZrSWRoNGJBNGhlbGZ1X2RsUDMzVjNDRkhTT29xUWxtNUNOekpWTG9lcTg0VGV5SXVtSEpqcXBkaldkWnN2OHh6UEdFU05meGFLeXhNRDRLWmc1VmZxekNiazhxQUVPYXN4Qno0emV6MjNTVkoyNHBpSXFmaFk5SmNEZ0czbDJveU51SjdodlplaTEyMmtnY1hkOXdLVXZzcTRLalNSaU4xQ0RGUmVfdDNHVjd0UmkwZ01RSFktQlVQamRvR0hORXdLVUtadVdFSWdTdld5R3kzSW9aOFpJazFrbWxZYmpsc2JEZjlxTTRyTU15NzNwcGZicnU0SDVVZVllNVNzbWxscFExX205SmkxaDNhRTRuRm5Dc2t1blpLZk9halFaaTRTdXNPRGZKSWVDNzlDTy03TlhkUUJRZGcyNjBObTIwSHBpZHEyX2MwbHBDakZFZWwxYVpjTlc5aTBYaG5WeHhkcHRsZGlWeFFfM04weXVvUmxGNkNvX2tKN19XVFdsd1JJQlhMOEZmQnQ3Qm45X3pZSlNMSUZ5anRvX3AtdzJYQVdGRmNyeklnODJRWHI4ck9iR0RYNDJickprSEM5SEl0QU0wRUxMQWlSOTVYenlYUmNtV3JkZ3pRSUpXSVFzUFVyWUFEekRqdE1RMmN6RHhMa2hyLTUzZzRrVUVXX0NDeld3ZFNRLTVYZ2Jkb3lhMlVYcDNtWEhGbHZDamhOZFFqVWJ2OTJPdkd3NXEtdDVHWnNhUlRBazA4ZzFjMm5QMGFCSXJHTEJGSE9OdmFxbURKcTBRRkR0N1dNWW1oZU5vLUo5SXhQeGtlMHRDbV9RZ056TnBhWF9Xb0laYVZfdUlhNWhTaDVodThpSWhwTEdvbC1hdVFNVXBqNHRZQXAxdjVuSzVKMVJGWTRZUS1TeEJ1aHVBNjZ2c1laWmgxUWwxcldHTW8yeWlLLWFCSEFfd1g0dWhmN21iejNMZEJVZGJETTJWNFNtRnVqcEVTRjZQeW9ORlFXay04VmwxRFhsZTZBcUtWV3hiUXRqTTFlNTVIMHlTRlJuV2h1RDhEYkhnR3hUVXlwQW5ZQ3BLZ2N6M1pyWlNJNkRBVzhOY0VYZGVrUmZsZ3ZDQW1EUXh2Vks5dlh0SWl2WmVTZ1JUTS0xRC1rMWhFMDBBQjY0QU9SVUdma2FiaGFEV0ZnQ183Wjh5dnY2RUlKeXc5REU1X1c0NDhid3d0SUFoTTgzMDJzZWotdktJTmNrdXdOOHNrV3I5dkVHX29GYmNsX2UzVXRTTFFCUUU0V2swLVptMkZUX2ZSVWtybGFVamFVdHF1ckJhd0UtZjlzek5fOWJfeWEzNFM0RjdXdExiWklITHYtczRBWDFtdHJYbVB2ZmZib0pscU5UQTgtdXlTWUJjTk1XLXBZcTYtMDdxRi1Ia2FzOENXbThRTW4ycnM4RjVrNHV3eWxzbUN2Wk93UmR3WmJoUzNXTml0UlNCVHROeElHZng4VzY3S05NNDRWMGlNVkF1NTl1VTM4M0ZqVGYzLUtFY0NfRDhvemtsWFBpVUJjODYxRzJ0VEFRLWhseU00VHFpSDItS2JNOWFRVWtFNDQwb1B6azZial90U090TzlkV0w3VzdGd2RSdmxaV3pQVEVkb0ViN2FYUnhXTHlXTGU3RlBaVVpuaWQ1QnMtQVp0Q2tkQnY3OTNoOVBWVGJJQ3VTU0gxUWlKaW5FV2I3OWhSTnd0UzdyMUs5VFpOTzFXX2RvZHlvZnQtbUpaQTlqd0dQQm1zRm5rOWdGVnp1ZzJGVGhldk9NVmMtTGRCWnNqZUgxNVhvbjFIQkM5X0syakViZUtQTzRVUmN1d0tPY2FIM3FESzlDVnJzeHhZc0MtN2s0T0lqWm90TDItZy1mUXNKek9RaDladUhoWFpYaGQyVzl6RC1Xc1hsZjhCUmVyazZyTFpxSGgyNG9oTEl5NUdMVmNod3pqSlBsVzVzUHZiSnNfaFZMaE9mZWh2OTFMeU9TR0VJLUdWT25INVpKZ0FGSlF1RDZ1MDE1VlpGbHpZU2lZSUk5cENGOEpRM3pER2Z3MjJoSnNETEp5ZUtZNlFYRkFzOC1vT3N3YzJOSTQxNUFYcUkxcGNSNUdSSmY5ckJSLVZ6QlZ3Vi11d3BTUnVRQ0hHXzBEYmphcUtCd1hiUkNMUFpJMVhXYzRBb1lPVHBWdld3aW5UcXBhUHNmNmpBZ20taHhwREpna3BZaHI4b3Z4M1ZxY1RvRDRYRXViZEpUekdyX0dQVjZUWU1rU2VaUXBQUFZMeFE5SHZ2T2dqeEF0VHVsbkRvMks4dVRfRXdVY2FvT2VCSmtqdEtfNVU3THVmVTJYSjNIQzNvNDJpMkZWdUJ2OWkyXzdHQWQyUURwS3IwS2VCX2h5TmdpLWZSVWtUcG45a1pyY3VxUUxjM1dYeDIwdzdnM2stR1U4ZlFkcnRfNWRtSThPTDBMNnc4d3NlN2laeXpxMU5fWTZha2dPeDhlTThEUW1wT2lXVlRnNTN5MjlIbkVKV0VDRkQydGdtSlNRT1Jlbnc4WUVJTVMwdG5ka3BQZ1NBR3NWV1F4LUg3QnY4czBtQkhteEZoYlZKZ0JWemlYaVY2eUNPZnJ0NkotczFRckVncXpYcnUwZ2VFQzJRbDBEcWJ0UWg0RzN6c1JFbjhTT001LWlXUElweG1GVDJKU2otVGxjSENyVDl0U2tCVUxyREtsb21ZSDdBYmpreGJ1WUI3OXhPUldDMGVlalVScS1KbzhBUU1OWUt1YzVkNm1Ed2tHQ1YtX2xRaC1Rc3VJMjlXdEVUOV9iNHNLbkF2VDhjTGZQbU4xT0FIUTRtYnpMOVJ6MUFKcWdCMnZka3F0Z2V2ZkZZSGlpWnA1QXNvalB2R0daOE9qSE1BVDZ1T0JuWkxPNlZsYjJvMmJBSmU5emhHWFJtN01wbGxTV21wRXFvSlAteWZJU2U1bkF4OG9rTW1JVUhwRmlXOHdLNDhINnVUTTVtd1ktdVl5c19LNkd6VlNKUEtmU29oalVLaHZRb3JJb3hrRGF2b1ZBbmdIV2lYcll0VTVZVGpmNWw2NkpoV1BiemdQT1ZUN3ZmSnl0ZmZCd051WXFDVWVyR09qVDRpcVcwRzJ1OVFtNDBNR1psMDJZM1FvczNIWnZjSXZCX3RBWHpxckk1RWdPcWxqMm1ZVkdtVl94eGlnQUI3V3pCdHU2eW8wbXlLY3BKNkpvQ2NSMWZRYVBwektydC1OSWwxLW5xOGFFY0dFdC1SZlJLcVY0LW9jNWRuLXZxV2pRTnBWeTNqb0xxbVM2WWZwcC1lMTNuXzVjOFhYUENES1F0aTBpSUdQYVJtaVl3SDgtMXdXX3MzTmZpRUtQWTVVbTFUQ2NzQXRMOXVETk42VHZBWGllZklVZmRuQnJfM1duVmV6WmMzY2NxQ2xjbWdzdjVIbndqQkhwUkt6Y0FVUW5uS3AxTmozc3RjNWlPTmxpN2x2c0lzNVRzUUJiM0FCOTIzem1hRUp0b2Y4eUVaZjZ2eV9IVTZrc3p4RFBzMnp2OHFKd29vcVh3aXAwd0hHbEk4Qk00bGpqVXExd0ppZThXQjcwNHc1clZ1RkU0TzVfMFZFR2t4NmJWZ1VfUnVoSlNxWTFoQkYxNE5SbDMzNVNZc21HN1BlX1NnWE9DMVRXN3VpOVJLNDc0U2hLUGVlY21MRGxPNkRrZjhlcG5IS01NZzZnRWpTUy1RX0tqRFQzQmd5NnFmUlo1T2JEV3hJN2l2Z2UtMWpmM2NReFhMVEhjQ2cybWY4N25GRTdnQ2Y4OHBBM1Z5NVlOSzFJb1laV2NhbVpDelJadVlvelpmZXBvNFhCejh0dUpYenY0TVNzSGVpaWwtNVRsaDhjdm5LVnRsTmIzcWtFM29qM2FGeWRxYnhzU1JmZzJMRDZMdGxnWUNlLWV3ZGljT2VkR3hWcmV5Zjd3WGRWVUg2dGZzNkVMcC1EUWJWOTFzZWg1ZXVNSXFtNkVWWEw5WkY1M19Eb2lYQm9jRHU5QTFhcURVWlRFcUJBOXkxR3ctOXJuM3ZQejM0M0tqcjhUWVpUN0FCeVl6cGNnMHY2aDBDUF9qbkhTXzJjRzFzR2JjNVJTN1hPZzFLOEpVZjJlaUNJT2YwYjNNWDlLZUprblNJSUhWZ2pkRDZnVExJMXZoS2R6dGJaUlh0NkRTWXdHbEhrb2E5TzhKMnVHdE1ZZ01rMnlsYnlUSm01R0JTUDB3ckVPUldCVGEzUWU2ZmUzWldwWFVxRWlUbmVPbFBPTWhpMkh5cjhSdXFyRnBXc1pHNjdUR25JMlFXX2NqaXhtbnMzRW9aT2lTNjg1X3RXeFViWjA2Y2lxa2VmTTlqNEVEeVlHUHU3LTRzZ0VWWC1xcGdxMFczXzlBNS1uLW9YZDNVTjdpemY5TngwM3BFbFRZZDRhMGZkUy1rN0d5UkpJN1ZhWGpob29nNzVWSUt0YlBNdFZlZ3pnT294ZnM1Vy0zUV9QWjUyVkwzUjJHSU9jcnMySVdweWpyNEVIWFVKWThnZGU1c3BZYXFzUFgzTEVNaUNOTTZsV0szbDBYbUVtaEM3YXV3VmtSckZHYVdDQ3pOSlhXTURJNTMtUzVGME44VGVuZmN0QXhYVTRjaXFBbS1ROVZMcWhzUC1pV0pqUmkzV0R1MFZoUXBJWk9zNUVwb0dnVWRfSTZyQUw5Y1ZVMXVaQzU5TmRNU2dRRzRYN1c3YkZKcjJtZTRUcHdsQmhrYzB1bHVHR3ppdGhyVXd6aXdfamloZTBIcml3RHJnTzA4blRQOHpMdno2R3lJVkhPX1UzVC1mdXpJTXdobjh6YXdTM3NMRTlwZUw5MGRtVGVzY0VCQ0hNeDJ5c3VQSExkaWxOaWRhdXdvdGVQNVZCa21STzQ4SUZiWGdFV2lyd3lzU25xanpBbjh5NWIwOGR4VTh0cTg5RnF6WlJWbktQV3B6eU5MUlA1blRxeEdfZEFHQzNWbGJEeTQuRzhzWUt3ZHUtS05iM3NJdTlDTUpkOEVCdkdRVGs1YXV0ak1YWXlBVHo0QQ"}, [
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
  '66fdc674-a8ef-439a-997b-3968c6cccec0',
  'x-ms-request-id',
  '46dcca49-41db-427f-bb6b-cd1cb4750c05',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:41 GMT',
  'Content-Length',
  '6294'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1619638182,"scheduledPurgeDate":1627414182,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/f3b831d364a04a80adba4df301261c25","attributes":{"enabled":true,"created":1619638181,"updated":1619638181,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '7da19318-652b-48ea-8ab4-4212237eb52e',
  'x-ms-request-id',
  '0726ebcd-172f-4cb3-80be-59b2d12f2f32',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:42 GMT',
  'Content-Length',
  '491'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b86b1358-1d93-4cba-b304-7029d7d58a16',
  'x-ms-request-id',
  'af6be82c-03a0-40ae-9544-42090f0441a5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fe036ac5-3468-4a86-87fa-565c0263cfb7',
  'x-ms-request-id',
  'ca7700c8-f85f-4b83-896b-e79079734950',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13613253-fbeb-417f-8dbe-1394e020ee99',
  'x-ms-request-id',
  '7cb5340e-3bf9-4a1a-bee9-322ef15f31b5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b9d7a91a-8a72-4cae-93d3-813ca2d1d56b',
  'x-ms-request-id',
  'b64d6b1e-97c3-49f3-bc70-e0341acee56a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f7778205-05d0-49be-ac27-cbd06571be79',
  'x-ms-request-id',
  '5c93a109-124f-4901-abbf-980c5c2f4ff5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'dd7c9289-d70c-4a43-943e-6fb2206a8fc3',
  'x-ms-request-id',
  '69416dab-0b06-4ad9-b937-9941d4b67d7a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6ccfc3e8-7cc7-4649-88d6-5e0b50352232',
  'x-ms-request-id',
  'f7a05776-b0ce-4002-91b8-466fc42a61e9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '312d5ce8-8f44-48b1-b576-470b0f79061f',
  'x-ms-request-id',
  '6c871d06-6cf5-48d6-a871-b39b6128ec75',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '874007f0-5f6b-4ddd-ba0d-6f0bcffe997a',
  'x-ms-request-id',
  '280b5b5e-efba-4544-afd8-16a5cf03cd07',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ac1f72da-6623-4f62-af9e-6927c9a65e34',
  'x-ms-request-id',
  'ce74275f-e8bb-450a-9e86-38a0cb3cc1d2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:29:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1c3c600b-8d39-4f83-9082-581265b67717',
  'x-ms-request-id',
  'b50b348a-d7ba-4c7c-a62e-d22ca2f5d249',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2b677052-51eb-4649-b726-4ca5f30c7824',
  'x-ms-request-id',
  '604a934d-7cc5-4f4c-9adf-3334fb1e1b28',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8d74d5be-84f1-4311-91b2-cfcdf74f9ae2',
  'x-ms-request-id',
  'da0ff393-cc22-4ee2-b797-4c446819efcc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '08edbe46-8dd5-4b66-bbeb-c24f6448a060',
  'x-ms-request-id',
  '57d9e2db-30e2-4286-999e-2f480fea919f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2cf3d7aa-cb4e-4dab-9814-1a17cc8cf7d6',
  'x-ms-request-id',
  'ab83b14f-9d82-4320-9bae-eb7569b4bea2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'dae6d4d7-cb06-4f79-bed9-1f9d3260b04c',
  'x-ms-request-id',
  '2cb44d93-38e2-44c4-9b8b-f141c4c75779',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '47d7172b-38da-48ea-826e-f121253ca8de',
  'x-ms-request-id',
  '0ac6b78a-028a-4e38-8d46-eb1c2c13b5fe',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b2352b12-b675-4f5d-98a4-b0132eeadaac',
  'x-ms-request-id',
  '2ee377a0-44b4-4f9d-90b8-22abe122d1de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fb818e93-3faf-4f5d-a6cc-28ba2ea88c5e',
  'x-ms-request-id',
  'be4c18df-71d1-479a-8245-6bc24ee78d28',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '14aa99bb-2b25-4300-a900-89e735d8be34',
  'x-ms-request-id',
  '8f11df30-728e-43aa-8bb9-d43e2a7b73ac',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7c14d8d7-a9a7-426f-9c34-873aebe97088',
  'x-ms-request-id',
  '9a528e86-2f1a-44a6-8bad-800240eab8e9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESSct_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4fd83b2d-fe6a-4465-a546-cbab173b2ab7',
  'x-ms-request-id',
  '2f0a1e24-d54d-4a22-8735-508dabb418ef',
  'x-ms-keyvault-service-version',
  '1.2.265.0',addr=IP_ADDRESS
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2355407b-01c2-43bb-888a-11c17629bfa5',
  'x-ms-request-id',
  '1c15b30f-b25e-4addr=IP_ADDRESS404b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2a59f5e9-2c3f-4bea-93fd-082b8c75e0b2',
  'x-ms-request-id',
  '112f0c8f-085f-4668-b06a-792fc40e1eea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3ab62a26-6386-41a3-9d9c-c921073abe83',
  'x-ms-request-id',
  '3be2560a-5687-4107-ac16-ab208e8da41d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '21def32f-1e60-420e-b172-10d753e638f7',
  'x-ms-request-id',
  'fb497fa8-03a3-4a12-b177-e4ee16fc9251',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5ba132a6-88b4-4f91-bb05-da6947d6e891',
  'x-ms-request-id',
  '979351e5-e367-4f29-bc14-2f08d4b55901',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5a262dfe-8004-483e-8fb2-f8e26457a9b4',
  'x-ms-request-id',
  'caa651d9-9473-4c18-929c-bcf3aaee7ca8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ef58871a-35af-4682-a592-8fa7a32c2850',
  'x-ms-request-id',
  '1f703919-f163-4583-a010-58b81de5557c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '607718eb-4407-4ff4-be85-50735138872c',
  'x-ms-request-id',
  '220932b5-7962-453a-bec3-10f12c7cd67d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8c279199-96f6-4e1b-ab32-6403e6119011',
  'x-ms-request-id',
  '06d7594c-23ae-4270-8c66-37694b22816f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '09acb88b-a827-45ef-b2b1-3540dea29854',
  'x-ms-request-id',
  'c64b5fe4-cf81-405e-8ce1-af7eb694e1b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-cantimeoutdeletingasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '140',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '493d18d0-66ef-4b01-b668-ab6500c0cfa9',
  'x-ms-request-id',
  'e64580fc-0f66-437c-8df5-217d087a2178',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1619638182,"scheduledPurgeDate":1627414182,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/f3b831d364a04a80adba4df301261c25","attributes":{"enabled":true,"created":1619638181,"updated":1619638181,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '60d44042-3111-4fde-91ff-e0fb5ff6c030',
  'x-ms-request-id',
  '541d98bc-c00e-4faf-aaf8-4d64ab69a91d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:50 GMT',
  'Content-Length',
  '491'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
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
  'fbbf2b68-e9f0-4616-ace7-a7c12cdac2a1',
  'x-ms-request-id',
  '820d120f-0ca9-4b38-b600-abe1cfecc878',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:30:50 GMT'
]);
