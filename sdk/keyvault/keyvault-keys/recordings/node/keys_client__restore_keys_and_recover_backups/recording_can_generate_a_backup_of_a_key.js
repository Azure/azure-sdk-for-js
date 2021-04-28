let nock = require('nock');

module.exports.hash = "cdb6ba7c09bde3a86c26f974912c1b74";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create')
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
  'westus2',
  'x-ms-client-request-id',
  '21104572-572d-4379-a7b7-3bf952f2de00',
  'x-ms-request-id',
  '301aaaff-0521-4e0e-8b0f-f1fbe04960fa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:22 GMT'
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
  'e1231bf4-7d48-424e-89f4-263c59314d03',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxAAAAB7zBvYDgAAAA; expires=Fri, 28-May-2021 21:39:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrMTF0alYbcJDECKWAFsCEbLrzD5rUEJPC8OrgoHFxYFoYbswfEbtX7xsNm3tVLri_ZUYDusWCuqHb6h_j0gMmG-7z9KSGRigiSVdu77ETQ0vqI6eEuxo2puhG3ylEArM1-EBQTCEVYcCDNi0XZ8ci-ixWMdDIxLtbovUkOU4S39cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:39:22 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '916aa140-b328-4977-9558-729d7f1c3400',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxAAAAB7zBvYDgAAAA; expires=Fri, 28-May-2021 21:39:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrChG2ypAfKoVd-hQNiky328I1rUCrRFPurG7wsjE8u3WDLp4hoVP1hZTlJ3jWqPbWi3tpOuAJe5r7ejlo0FcbZyGnFYWCzp83LB8lpmdj2R56UX1PEasK0uOye31tZOSAqC79kiU2zKm21JgYjKi0ObeS6ZYwzRI_8vEbGiMwILkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:39:22 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  'e87435ef-c35e-4fcd-ae69-757521bf5d01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxAAAAB7zBvYDgAAAA; expires=Fri, 28-May-2021 21:39:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:39:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/82955178c46543fbb77562128172aeb5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"s7x9yjgiOcpQc4cGHc2vA4GCEjUcu9goS3eicqMAQ-RFNOoyaSi5ttqIpnm5Hla0GPNE2kyMTbxMO_mSnaOyA9HlCnLh1yarzynWuDwqSfKi9eatLaUCsrz-1rdkuWTeC70DrDVzTFx4mZBpSw8_XeECg0YoJ1pXFOTokbXDAQteYee8HaUl3cDNJ8F8miaJkrCbddI_QgYm8L-yLUtuaqsa6VpVVw_KzUynxgJkVRt1nuN0AG6spNHqAS2LUDSKDYpuENZxFVsAHvq0uQ4ckcWbkuZlfjSWgT8O-SOqwNP7Et8f6ga5CuvN4S0qByG1gXQKwPBs4dpw-zsejh_OPQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645963,"updated":1619645963,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '21104572-572d-4379-a7b7-3bf952f2de00',
  'x-ms-request-id',
  'bead8a99-7e4e-4efa-868c-592dbd072038',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:23 GMT',
  'Content-Length',
  '738'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuQ1U1Qy11MzNWZjM4bmdlM3dDMUpHTVNZdkJGVjhGNTRqczF1T2M5dmVvc0prZlU0U0xDTDFlRVdiWGdOdjA1dGpoY1ZsOG01aXhSSC14Y3Jza2ptdHZDeW55ZmZiOGdzdDBDTWdMdldkNEUtclhNY21HNTN3TEU0TjhiQ3FsR0Y2X05OaVJmWDR1alZieW03QjZNSy1OOHlSbUJad2xzY01hb2ZRNGdwOTVIZnRhbnlTR2VFSy1yUHJTQ2JUWmREQ3ZnWU9hR0VybkpZTk5QVFE5bTl5M3R4UmJPQ3ZnR0NuNGt5cjZFLU1XaEZaaktFdV9VaWhLSEUyWDNRRm5YdVJQMGNCUzFzbmhtLUlIX2sxb2lfSGlLaTFhamVXb0d6T1FNa05qVFh5Q3Q5MndJalJlbzk2M2dDekhEZ2dUdXpDeXhacEhuSzJNMEZrVkRQeURwREVBLkVrbk4wcEZ5c0ZFeXVUbmh2X2NfSncuQXFsdUNhMUhLdTJiVl83YkZuUDd0b0tQbXRSZzMzMUdoTmFBcS1Lam5Za0dFZmk5YzU3NEE3LVdlSXo3dm45QWlwNnZMLWdteFVjZy05VXU3ZmFuejdLclRlbDF1ZEdsdVI0WUVMbm1RYjBlbzhyMEdraXczQXM2Q0lQWHFFYXhUd1libGhCc1R2ZnR0Nk5CN0tCcHZQaktaT0FIVk1fMnNud2RfSzB1RnRXa0ZKOGRUN2h5MTlYbXdCckRNVUJIVmp6QjNKRTdkcXFBcTQ4dmtiU3RtdjVjNllzRTBzbG5XT3FaTktxUDVHN2lsY1l1VzIwNG1sVEhGRVY0eE5ZZ09nMzZvUEpNamZsMmhISjA2bkpiZjJfT2I0MUZTVkg5dXR6MXF1OTlnVVRxT0RfZVZveWNMRjk4MzM2R3JucEJiT1pla0VfRm10SFZNOVdKOHU4RmI1aDl0d0p1R1VvUDVORVJNX2tuX0tfakdwZDhKTS1Nd3F6cmpuR2lJd3N1N1lWQXFMNGdKWi1zMVJwaXp3VkNMNUl4T2NtNGxicmxuLTBWZUY3c3piMDA3R1p1ZGhDQkJSNl91SFp6Z0s1SVdIU0R6SEN0bFNmemlKd1U1QTdnVkFKNk43ZHVKNmJ2ZEY0b2UyNG8yMzhxOTBuVUVRX1RXLVZ1YXFOcW4wOTJqajA1LTN4bFF0Z3F5NE9LVjRIOEFvSVEyRmVQMDJSRTNwVTF3a0lCSGZtdlI4UVhCeHNpaXhvTGl0R0FFbHdQMnlpdHVMNWVRVlRtSkNaWUpSWm14WXpaa3pBc1ZHTzgtYm14OWZ3X3c0ZDJnVDRQZk1UN3NDTzRDWm1mbHNUNE9RN25zUnV5aFN3SnlSczFack9WLUFMWWdXU2hDRjJ4WWoyZEJHTmMtTjRWTW5INDhsUmRCMG9BVVFpVHZHbDRna2R3d08ta1duQkl1anAyU2VoTVE0TXlKRm1fdDBnd0VnOGxkaDdqZU5ZbGVvNWZyOWFnQnFYZUdmRU9TeS1kbUd1aFdFX243YVl4NTNtUHo4UXRMOUNpQUh2bWtKamxPZU9wQzdFbjRlWHNpYjJPb2xzcjlDUEhOQktLOXNxZzNLVnZnNkZQVXVGSUpwVEExNGJrX0RZcHo5ZWx2SXVydTdBaUJwdFd6TzdLd2V0NHdvZTZlX1hzQm9vNkJtSUhMN0t0YldZdElrNDFwbmFqMzlzcXhZVkU2aVFnaXh2TEV6U1Z4ajVSMGQ0WWhGVktsVjN2a1FXM0tBM3B6akw0cGVYU0NaNi0teGVqMk1pSGZVS1psM3U1NWRVbDYtSFNFNGN1VWxRMU1sQWFWQnY3SThYYW5rR3IzU0M2dWNzT0tYeF95Y3JmeUhITUQwXzRJMlVuS19TT180S1BaY3p5UHRfT1R4RmFtNUN2Y0J6TEJKRlV6eXVYR1N3MGVPMXlJOEpOVS1EdTVUYWQ1S2hvbXVKdFlJWVIyM0pEa1JHVnNqX1B2RWJjUWwwb1NOTVphMDhUU0NNYnE2WjllT0p1bG9RNzJwZDh5RjEtbkRYUVFoY19sSGw4c01tS3pMa3VpejIwNWFxMGk1ZzY1RlNhWDZPWWtycTYxNjRFdUdmRXp0YS1qWWIzVUdQU1AyRmR0YUhtSFFGVjJsT1VMZWJ0VWVWUzNMVWtUc0JfdldMSUkzLXJMVUJIZURMYm5hdEstS2l2VzMtQ1IwOXdtQV9XbFdMYXRoVlh5ZXducWEzSkdRWHdOcEZwRUVCOUtUNU1CU2ZUekZWb3VKTnV0ejVGRzJfM1hYWnBmNmpERlA4ZVpwQWpWd2VBb0tFSmNkQm1TQ29lcWJWUXZfSk5JUUNidW9feHJOcUVrNnpLNkZZSFl4VE1RVzFFNmp6LWpLRGw0dFNldm9pVkp1XzlBVTRNWGFyRFhqbXROMnBKVFNTQktjcWNudDVLZkJfWTN0UTdabTgxemRSeFpyaDlrWGtIOXhWdGozOVpfTkRCNjhIZkItYjVXb3lYOXlPemRYY0xFS0lOaTJ3YXljVkVpN2NiaVhfMDB3UHlEQl9GQjUwUldIbnc1R1g0Q3FPbElEcHBfZFdxc0R0MDQ1elNVWUY2dFpFMWNBZlQ1eFYwM2IzT0NoM3hYbnVOT0E0ckJzY2tjc29DY0NuVzZnMmZGSEJRMXVWVE9vdDNiOEhqSTkzUjU0dm1NdHlTU2Zybkh1VWp3dmtzX1owSFBfVW1iM2tLb3o3X0E0bE9IYS1uSGZtcV9vU0JmOTBobk1fNzhWdHZaaDRSeWdfQ2M4aHlBRmhvM1cycTd0QkJSTVFfQWoxWk1nOW1QUGVoNmlBa05Kcm9HOEZJWXNJQjBNeEd3dkhMUDVBUkpNdG1qSm5WSGFVMm9yMk93S0RlOXdJX0NtcDI3dF84TDFmYlowWUd6TFJ5T1dzaFdIZk5ldUxiM2NLQXBDTXJEQVJzWGlBbjVkYnNnZkxDZzJXQ1djNE00NVlEZjRPOTlXRHFleHd3UnFJSWIxQTJUeXVhVXAzNDUzbEo1T084RHZ0YjZzU2JyX2pSaU1iZHpVcGwyaFJCMWFZc1o5b2JZOS0xNkxrdkYtZGNwcDBQWE9LMjdJT0JWRjNvUlBnRnJTY0dZaXdXS09fbnZMVk9scDB5eU1nMENJSmxQX3dxZ0ZuM3RjM21ScVNqU1doZi1MZ2sySUg0b3d5MVB5WFJQdG1vVl9SV3Q3WWxDUHVyRDVxdUVfVGlsYzNMckdzcVFrMzh4ck5rdzlTZ1VLTTFsTllUbHZYbWwzcFJOVmlNZE5RYVFUdDdQUGU3WUl6b004TzZWQ0dieVptQ3JxZG8zTTFPb2RLa3M4RE1Eb0hFdFZldkU4Y1VsVnJvamQwSDB6SzBiNGVKRlgya0E0NFB5c1NRTUdWaUNKdElCUkRMRjEza04tWlYwSjF2cm1zeDlxTDgwZlJEanR0Y0hxaWVybF9zVEw2UGtVblhDUi1wTGdMRDdnMTR4N09KREhFdXJ4ZHVqRS1ra3N3c25YbXRuTmVNLUc0YVNNbWtGVXpKSHNHdjlvallMdTdvSGt6RC0tVHRBcUoxWWRldUFzdWN3MlhrRWs0dk1BNWV6TUpBdVF4XzJpdllvQ2h0U1ZyWXpCeUlYMTFSMDhRbEdCQ00wQWVmamVyUWNxMkRDUFBxSkVySTFyWVNra2FBRy0tN0YtTHpFbm1NYmJFSEttb2IwLV9fS2lqbTB1STd0bk1hNFR0OWNEODI1M1c0ZnZUQXBlWGNfX25XQWtJaDdRd2lZS29xVzctNWY0Z2lXUzNXcklodU8yZkRqb1pRNDV0WWRMRmZmMGxuMG01UHRlNFVQbmJoZ0VaOXRpLWFFckZNRG9INjRXaDNhTzd4MC0xZFRfS0g3cUhFTGVCNjItMnBNT1pnc0Z4RHpIZ25IejB4eHFmSG1hVU5EcTFkZWlJSUQ2MDF6dFVXTkVyekpweDNDY19YMC1hZ0w0M09GN04waW04UGV2eENfOEpRMi1sN2piMHJveG05R1RwdDJza0hpR2U3MDR3VDFNTjdYcW1LWXRSZXJ0amJNaHlReVZ0Ny1kaERQZTdoNm1oRG43cktlOGYxMTJOVmNEbE5XT1NHSlljcThSUlVUb0hMYlRlMzNUS2QzU1UzQVVCQjU1VlNHN3FiVWlPUl9QbUlod2ZnTEF4SndtYlpBb3Z6TjZCclctX0Y3RnpGYU0tcU9sVzY0WjUxWElwU1B3c3Z1dnpEX3lmaWxFR3dBNjJNOExBd3NjTTVfdHZuT3NrQVItd0lEM2JzbUFEQmJFdkMxcDBKdHJSVnVLYm5sbTRNM1pNb2xzQTBDUm9FVk1xMDd5czdTNlQyUlJTUU5SaTJyNnQ1c2JrR1U5TVhGVVowZ1VFc1NfMXhTWWs4WXZqaXdvMkpGQ3NqeEVxR0hrdDlPc29OZFQ0RG5pekxfZEFqcDNGTjBKaTNYc3MwTFNtREw1VEJPYS0zck5oT0gyQ2VFYlBpZVlCQkpRUFUycHU4SXo1QzVXZG5kc0wzSTVnelFvZnA2T2pWU1ozUDJwaFFFb1hnRWlJcW9Jc2o1bWJmT3hyb3QzWExiTkwxLXB4YTFqUXJCSzg2YXpSMF9ydXdKM3Zrd3VSVVFhWXN6QlE1ZWlSSWc3Yk5QSHJuOUdGd0tFby1udnQwZlNwWWthZGdPbUttbzhObVNuQ212Y0xfSTdmaVk1X3diZEw2RE5QZWhkSEwxZ1ctc1NzX1RpVFJlc0s0QXFSNzZRbVhlaW9jaFVCU2JJb2k5MGZ1ZnNkMndjZkFOMXJKR1NyM2pWM3RiZHA2YUFUOEg1UjJVREtvTHNuTDJNU3dpeXJZVzU1TnNPanhsdHlhc1ktM3lxeXdxek81Z0M4U2tUU0o0Z0o3Mmd3VHYtcEJvZjdBcGoxdGxOS3NCdUItVTJBRlI3ZVpDUFlLeVVhYm15ellFeGVuN1l3Q29KTVIycUFmY3hyUS1ad1dRNWdSdVdUNlJqSDhOZlYtN1pySlo4Vm9LRzF0TVNULW5ma1FZT0dRc05GanA5c2NhYXZITnVKa2FBZklDc2lUSU8zY0pqa3RlZThfWjlBN0ZWLUN5Y1djZVJZLVg0ZDhlWENndThzWlZVRkRwazlWNWROTWFTQTJhYUs3SVZoeWNhdU9yc0F5NjhvdDJSR1d4M3BOSVVDeVI0OFBwQ0JON0xSbGdaUU5PbkxaVjRyaW82ZTdaSUt0bktzTmRiRXV4Mk5OTTEteExjTGx6ell3R1NzdU5ZWVNHcGhkakJWTlJibWtVZUdkS05oNmNsbGt4LVZ2M2czQnV0ekxKYjhJYjIweXlXRl9tRU9BTTJSTzIySzF5Xzh1eVVXcnNWLXRQdTNKTV9kV29NWWdZTXBVV2dZSDcwTG9BTHhOcmNRLWk2REtETy1PV0lRcDdaUTRRRWdMY2l3SURNeTA1ZHJqNVhJU3gxdjRzZllXYURER3BxZkc4ZGZlTHp4M3R0U2U4Qm1iMkVDT2NWbFlfMTNxWjNNU3VCR0FIUWstRWJRZWJjZk1pSmVVeTZ2djk1NWFST1VvTEhwdHFVUk4wVlZWRGFwNjBqTXJEeVZfZDZxYWtQdjhvSkpnejlVbzFjVm5MMkVkWE9RSVE3bExNa3lzdjBTMUE2WE8zQjZxNmh4WHJRSlZqNHd2VFllekw5NTJCRmNBQTY1eGQ1cU1JblRmSUh5UkkxRk4tLXl3RndMdjBzNmZMWWhPUElWOVZ6YmxRcFJzNXp5QVFLcVZVQlV5OXAwT0FidUZKTDVCYW5ZcS13MDVLaVl3dWFMYzBsc1ZiaEhYWURadGVxOU1tbWxaUGZ0VFlVdDZnWjl0N2VHWnJsdWxsZFgzZDlMNUdlLW1LQlpseEVCb1R4a1NwcVhvMmZ0TG9US2tUN0tkOVVXeGdTRGdLNFJRTjQyYjVxdjViZmhIRkZEUGIyUTNIXzRRVnQ2cC1SQnQtQUFMVlJZakppYnFkWU43N0NrdExKOW0yTTRfd3lLWUkwbUFESEZZOHJ5VVpaV2hwRmlfMGQtTGozMEZzNmMxZFFEOHBuTU5aU3IxYVJ2Q1JDZ1hRNUFvUkcySXVXSl91dlBZRHBPcWd6YlFVMV81c1VuanFBbFRmSUhGOHExTmpHTzBaZEZTS3NuVU5ZSEZuNTRDdlNMMF9FNktuRGdWdlBuSFBFN3hMNXZqWDVETmxFMFNBblZlUlhHUEdkbUhLRFlZZ1JqRUlhVTRUTzhGdDZTVEw0YzJ2VkZwSjVkOU9WN21GNUowMnJvOGFyVF9oY29aaWtienViMVBBUHNpcFVuUUxreTlEZGQzWU9OSGVncGZKQ0hmaWk4Mm0taEJFblA0SVR5LU56RGFQYkVJUGdQSGVNUjVvWG12RDd3WTBOallxR1NsR2pOem9hV05mNEFETTJZTTZNUWp6a2Y4MXpLZmZkdkg1RmxsS04yTzlzdmxkaWVaMGNfR2NRWXZsa29ZSGd1NGE1MUF2aTl5eXF0UGF4ZjZYLWI1YU5xQTN5SlcwNDRDVWJ3bzFQZlpIZXFZcGpEVVNJSWJOZFkyeWRqVm5jVExwdGg5T3hWOThHeEZqR3U4VGRWNEhscGU4TlFEQlJyVk1OeDFqaUxMZDV6bzNSNXNVUTVORDQtakNwNUFIRERkQWc1Q0JjLXVaZTRJRG9lX1M3amFZeDJyM09YdzFVa2lmN21zbk1vd29WUWlGN3NXNkExQTJ5ZEJMcUZTeHFabi1rZlBHMXNuOHlFWjN5THNkRFRrRnp4Zy01SHVaUkdUVkZmakFmMTc0RFBOdDRraUhSZFVDY3JBendfNlhtLUgza202RndVeHpya0dpUG40aUd2dldwMEdTcV9WZDRtd1pMeTktY1p1a3dZc0RKdFFicHR1YWl3QmdkUVZHc1NiRlF0Vk5SLWo5VV9PV1FBWWd6X051cDNyZ1Nnc1ZyTGowUTdJNG5zdXVkMEo3NGx5ZC1EVzh1Rmh5TjlTNDh1TFRhelktMWc0S01EV3Q2SEZwMU0xNUtuSl90ajU3aHlhZDdvLXdrX0didTRWeTNDejB2R0I3SnFZRXRNQ2JuMDEyTk9FZ1R0R08ydE53VnhkUG9aTmJBbXAyQ1hNQW1kVUktdjBlbUs4T1FwQ0hYMmJ6VVFTdWRNVVFNUEhUNjVCdkh2Z0FRWVh1eDdKUzR1WWdmbS0wdmlBMGpXaEczdXAwcHZEclBEQVZIWTVZRXA2V1VsUHVJRW5Kd2xOaTRZWExOTFhLVkUwdkMzLTduaUw0c1VHNVFQZkZZUFUwaEttZ2ZUV0hERmV1eXpVQkR0RUk4QmlEcW9hVmZuTUZyUEpicFBiaEExQkthd2JPVV90X1E3UjJBR2d1cWkyNmJ5SFRZYnI2enB4cG9YQTVkS2oyQy1vR09SaFhPNFVGMURQRllNSXFYSUpGc2NqLWtYN29MM1RYMFU5NU81TmlNaHVWYVpQZjZwRnd5WDI2Z1QwamZUdDh5cUVyX2I0aUUyN1hOaHFDQzQ2SlgxRXg5eEhCTnVuWnFvaUNkVFY3cFJDNW1sUl9DdFYtZGJfYUpiR1Y4N016V09MeW84Q1p0N3VMMGwxREREdGpiMU1YMGFJTGM5c0w0VkxBM1BGU3h0MnpIZDV4S2RCU1NEYk5mcHlqeDE3aXhoYnhlSkhpQ0dnMTFSUTkwTk0yLXpObDFNV0NiSEt3MFNuY0w2aUF3Ym9IdTh4RzNtRjdPUUpsSVpOMksyd0hNWnp0OW5KVndvdUNUY3JmMzVoR1lYVS1kWGlwZGNLTllvM0VpWTBRVlc1OU44cXFXRlBoT1V5ZlE1VFYyaTlHWk9UMDYwS0R2VUZ4VkVZOE5oS25lT1M2Y0QwbEktRlpjWUNNM3RpaUZRX3dScmtMWFlFUW94Y0pZY250SXpjNV80U3N1aEVoRElvNzk0MW83Vy1xMzZsRzRUU0N1dGt3cVk5dGxJZTJaTGdieXcweTUtbjE0NHBqNnhDa3BTX20wWjhPOUU3dElxZUJ6VmlzRXlfNnBBMWdxTjc4ajF0Z3hNN1VIUjZCNm1iQnE5LUdPQnNBOG9uVWF3VkMwejB1NVFpektYRTJfZFJ1SUVSNG5Pd1Zpb0FjMm03U2RCMjB3amdFN0p4TlBRdVV1bGlYTDRzTml1SUZuR2ZCY0ZBeWR5UzFaXzJ3WTFaMXVVQkxhTXhnQU94aHBtRk4ySzVyeTIzWGRPNVlSZEg4b0ZRUU9xYmRIdGhmS01FUWFiRnFjWHpKUDVkU0ZTcXVyYXo3Qkw5RHVWS3JWdUN1SE5GcHM3Q0dlWDkwNlRDQ2VUWFpwT0tYVVFsTEdlb2FSTVZEdTUtTzQwRVY3aF9yVENkaUZHTW5oelFxWFBQYWtoODlyUm51S2lKRnNJZGNvZW9DVEs5VXZuNmhzdmozNmVzRGEyRW1JZ3VFLVVReHlJVXZBYjdUS2VZa2pBdnZSak5sQUk5NWZsVlczVHhBQ1A2TTRDUVJLQTVCblA0bFEyclI3bjZydG13ZFI4NEZEb2hwZzFxTzQ2c1REbmh3WmtyNTFXWllEemlVX1VWNE9RMUJjUFhMRXVUQWlIWms0SG1HWUJBb3dfVTd0UG43azBCckJ5ek1ZTkh0azRGY3lMM3pMSS1EZk9nam95R256TTVGSTB5eldXbW1uSTg2bVJZWEdCYmVBNGI2dmFiWUNDdHFjVlVKcVplRHZiU05haTI4OXM0Y21aTEVhOG5Kc1FkMnBDaHRWOVBBZ2ZaOWNVb1g0bmtTUWFWbzlKVllyWTR6LUh5dHBDekZZSkxfS25GOTVhazBuN3ZJZmtwcnllVlZ4dkthU0R2bUJBU2hwSHUtMDE0ZWNtbkpYSE5ocFBoY1NvQ3pOVzhqb3VCeUs2eGt6dkpOcWlhUjRZcVN3ZTZKSTRsdVNYdlBlQkZCMkxDVE5vc2hOTTlyUlJFd1A1RGlDV3dFSEEwZ243TTVNS0hkTWtwQ2JMLVdHbVhGTnJGT1JPUmhITlphR19NR2tmSUprZzM3R3p0UWNwcUVlUjJmOHQ1UGdHWnlhNmJWdk1LN3RDbWtPcFN5SURyQ0UtLUlJZUtERThGU2sxVk1EckhhNEFmaDhvWkhqUnlocGY1TXhNRzN0bERqWERTYlh1S2xjWGd3eURUTVA0eG8tc1ByRXBJMmtfV2hqR0I2T1VIbms1WjgtRUtaU1Fpc0lsTlctbFBtTjlmbE5BUFdjczJNRDdrZWR6WVhuOG81WlZCcW5aTmF4MnlDZ09jdTdQbzVsWmRWNHVZMENRekRHM3dLSVlRQlRtYXRGN2RPS2J2bk9JZGNod0gtQzQ1LUEyNWc0ZVNhNEJMaTAzZ0lNdzM3SGVnQXNmbXFFLU40YkpYM2h4dnhsZjhyTllGYlJhWVFKWVJQSzAzS2c1WlB0dko4SjFjOVBYOXlHX1J1UEk2Z01DTEJ3OVdoZTd1aGN0QnlGWkkzTDY4RmR6ZGlodVdDTjFvSHZ3UEh2dENsM05KTXdVSm16QVROeVJnbXRhS1JSRWZWUDNEdjlRUGRxUFZvYXZUY3BVZmFrSllybUVxNTFyNmU4aHhNdXV6QS1OMFhGQldyaTJpYXJEN3pVYkVXVHFWTmZ1TklTQWdqR1Z1V1FRSU94U2E0YkNjb1FITk9MdmZMZVhZaEl5d3ZEaGtyd2NLUmJfRzd3cVEzTmQ5Tjl1eHhIN01NYVFHTDIxOGVvbGtSaFMxMThNcDJBNGZXdjlFb1JQWkVSZXdQVnZPaldlWV9CUDlKdk44VGw4NVhvZ1ZvdG9JRURUT3ZlTS1qRTdvNFJ4Z2dJcHNkU3RqUWdUa3hlcE45WGFWMzNUbWdUQ3NkQ3phQ3p0R0t0MmhPMDJwVnp1Z1FJeVFHRmx2QjJfQUU4YWVvSjJDRVZ0ZE1KT0M3R2tsQnpsNkl0SU9Pd3JEaWlnbXJKb2J4UHBTSHUweU9ER3VVWUMyQWdYLTFsSlpldEhKRU0xdlNtUVN0cXdrVkd0QXozLU9LVHg5QWNodEVIdTQxM3FLRUtMWHFqU2N4bndsblVoMzdraUdQWWZUSVRDMTM3SlVQQWJWN2w0VnBuNFkxYmxRckdkRFZab2d2U0htN3FkSm9BLmtnRi1yLVVWSk1wLXVVUHBzQ2k1ZzRzeEVJX2dxZU5XT2JVSmh5MW1obkk"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1f4d67a9-f922-42cf-80aa-b7e7c8ce5f82',
  'x-ms-request-id',
  '1f2422f3-a94f-4088-a2d8-fda57f480e0b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:22 GMT',
  'Content-Length',
  '10443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1619645963,"scheduledPurgeDate":1620250763,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/82955178c46543fbb77562128172aeb5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"s7x9yjgiOcpQc4cGHc2vA4GCEjUcu9goS3eicqMAQ-RFNOoyaSi5ttqIpnm5Hla0GPNE2kyMTbxMO_mSnaOyA9HlCnLh1yarzynWuDwqSfKi9eatLaUCsrz-1rdkuWTeC70DrDVzTFx4mZBpSw8_XeECg0YoJ1pXFOTokbXDAQteYee8HaUl3cDNJ8F8miaJkrCbddI_QgYm8L-yLUtuaqsa6VpVVw_KzUynxgJkVRt1nuN0AG6spNHqAS2LUDSKDYpuENZxFVsAHvq0uQ4ckcWbkuZlfjSWgT8O-SOqwNP7Et8f6ga5CuvN4S0qByG1gXQKwPBs4dpw-zsejh_OPQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645963,"updated":1619645963,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6ba495d7-af4b-45d5-a3a3-0e504aee7ef7',
  'x-ms-request-id',
  '2f795540-b502-4531-8f2e-46e3722ec85f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:23 GMT',
  'Content-Length',
  '921'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '65a54076-863a-445d-b328-2c0a5a2a3484',
  'x-ms-request-id',
  '02b8ccfa-5742-4b0c-b211-1ea90e6868bc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '016bd80d-dac4-4f6e-930f-d7469b2555d0',
  'x-ms-request-id',
  '0883c90c-aa4c-42a9-a711-ce00c52e7d43',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5ec2de28-31b8-41d3-aba6-c55cc592513a',
  'x-ms-request-id',
  '2bc03aad-7414-46c4-9f6d-b767811aa37a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f8ab7f2e-a227-435e-8d83-721c023ebd40',
  'x-ms-request-id',
  'f26c5791-2eec-4054-a834-cdae1cf61af5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '0c6e363c-cb00-4bc9-97d7-81f77c975627',
  'x-ms-request-id',
  'c3a8c280-f650-4039-a39d-3192e687f411',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '131',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'a34e870b-ed8b-4da9-b912-12bf530f7ed0',
  'x-ms-request-id',
  '4efc2b5c-3eb1-45a4-b0ec-17b286536298',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1619645963,"scheduledPurgeDate":1620250763,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/82955178c46543fbb77562128172aeb5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"s7x9yjgiOcpQc4cGHc2vA4GCEjUcu9goS3eicqMAQ-RFNOoyaSi5ttqIpnm5Hla0GPNE2kyMTbxMO_mSnaOyA9HlCnLh1yarzynWuDwqSfKi9eatLaUCsrz-1rdkuWTeC70DrDVzTFx4mZBpSw8_XeECg0YoJ1pXFOTokbXDAQteYee8HaUl3cDNJ8F8miaJkrCbddI_QgYm8L-yLUtuaqsa6VpVVw_KzUynxgJkVRt1nuN0AG6spNHqAS2LUDSKDYpuENZxFVsAHvq0uQ4ckcWbkuZlfjSWgT8O-SOqwNP7Et8f6ga5CuvN4S0qByG1gXQKwPBs4dpw-zsejh_OPQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645963,"updated":1619645963,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6fb3aa40-f402-4605-a1a1-44239d188292',
  'x-ms-request-id',
  '09ff8774-7a9c-4a65-a8d9-be2ef7e326b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:34 GMT',
  'Content-Length',
  '921'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '18553a91-b869-4c60-a768-034643bf30ee',
  'x-ms-request-id',
  '817eed4b-a786-41f2-ae7d-07c6f496cee9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:39:33 GMT'
]);
