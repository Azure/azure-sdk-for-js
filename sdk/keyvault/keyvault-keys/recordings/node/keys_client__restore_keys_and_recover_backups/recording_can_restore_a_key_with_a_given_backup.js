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
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ca0e5b87-eb25-46df-9304-9634f08188aa',
  'x-ms-request-id',
  '6d727f3c-4ce8-4cea-a69a-9e7de0b14d0c',
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
  'Wed, 28 Apr 2021 21:39:34 GMT'
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
  '1d3c3b37-4c9f-4cb6-8a36-c0e802cce302',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxAAAAB7zBvYDgAAAA; expires=Fri, 28-May-2021 21:39:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVWNWVbxTlpTgDVQB1Kdgzfv7vdYd63a1BbOxtx1vIyRW18TvY89oiJSVyk75ei_Oy-pXNRjgGPhQFv49-rR-QbNsiDCbPA75C_hVzP33rSJHM-ni_f7rU5dB4zId-wpehOAf-M12huoZw_ztl5I6rHRtmoqaOQNGlBCSrb0wAKwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:39:34 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '916aa140-b328-4977-9558-729d1b1e3400',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxAAAAB7zBvYDgAAAA; expires=Fri, 28-May-2021 21:39:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkZ9q76XdVAsjAopUpGAEy43qx1wN4ZEaVYeGC1KI8Y5BmD6SLDfYIYn2zvewpm5VM1r_FgZsz37YyEUUIq6ArQ3jc7pCUh08X4MexxWsgvj2CGF47Q-4EXpbSKM1cGR0uv0QDOCu80pZyNiLePafDFJbu1bNWOZMZzFklV0NZSwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:39:34 GMT'
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
  'd85b3d8a-8fe6-4af0-825f-44969a714600',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxAAAAB7zBvYDgAAAA; expires=Fri, 28-May-2021 21:39:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:39:34 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5QjQyJ3mVnwx2-xCV-mQmb1UWsPRSyaQu_KSw0QDsKGsWYaDK5550GCWCoVHEr57TizAnF1uIM7NAy-12TiW9KzPPSh0SvymlFuI3I_jJaKOzDn85Qs8xTvJAH9vbGYo4lRjke3qK3oZwbzocJclKpmSVEUBvmOBKf5O0IQtVW9jglm-Bumo2hipyd8AFJE7zpyonc2Zyrn03LB59fFRTHDVpj12WlHqRV0zDRE9LMuDMNkvGvWDh706AWX5RzqKvfglDdVUxiwObi8Wq0PNWPUOL4xGfdll1L_gata4TFPoMnlCi_Ug5qtwF_aCMm92NKHxX11ofJRLDzm11xuIbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645975,"updated":1619645975,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ca0e5b87-eb25-46df-9304-9634f08188aa',
  'x-ms-request-id',
  '02518a6d-0771-467e-ba59-8cd81cc54dc2',
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
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"}, [
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
  '9f9704f6-728d-4db9-b038-10fde9cda866',
  'x-ms-request-id',
  '75b20380-0707-4843-84f2-5df6011f2ff1',
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
  'Wed, 28 Apr 2021 21:39:35 GMT',
  'Content-Length',
  '10471'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619645976,"scheduledPurgeDate":1620250776,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5QjQyJ3mVnwx2-xCV-mQmb1UWsPRSyaQu_KSw0QDsKGsWYaDK5550GCWCoVHEr57TizAnF1uIM7NAy-12TiW9KzPPSh0SvymlFuI3I_jJaKOzDn85Qs8xTvJAH9vbGYo4lRjke3qK3oZwbzocJclKpmSVEUBvmOBKf5O0IQtVW9jglm-Bumo2hipyd8AFJE7zpyonc2Zyrn03LB59fFRTHDVpj12WlHqRV0zDRE9LMuDMNkvGvWDh706AWX5RzqKvfglDdVUxiwObi8Wq0PNWPUOL4xGfdll1L_gata4TFPoMnlCi_Ug5qtwF_aCMm92NKHxX11ofJRLDzm11xuIbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645975,"updated":1619645975,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd3196c35-4ec6-4a22-80c3-6241d2f2b160',
  'x-ms-request-id',
  'b7f96df2-d4f6-45ac-86d5-51d3e8304b07',
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
  'Wed, 28 Apr 2021 21:39:36 GMT',
  'Content-Length',
  '931'
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
  'westus2',
  'x-ms-client-request-id',
  '1850d267-b049-42d0-be2b-0d098bf9ad74',
  'x-ms-request-id',
  '8f2660e9-aa90-4d90-b41a-8751fb5e5d09',
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
  'Wed, 28 Apr 2021 21:39:35 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  'c1cc1515-c646-4c30-b6a5-bc1c9e4adbce',
  'x-ms-request-id',
  '9defda38-809f-43c7-82b4-22a7840d631c',
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
  'Wed, 28 Apr 2021 21:39:36 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  'de6ca008-5cea-4bed-b6cc-ebf900e5f1d4',
  'x-ms-request-id',
  'c4631d37-49da-4e77-883d-ff8dbd3fda18',
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
  'Wed, 28 Apr 2021 21:39:38 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '773cfbad-84d3-410c-9d44-c320ed9d0d20',
  'x-ms-request-id',
  '544b91c9-db59-455e-a40b-851eb16a146a',
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
  'Wed, 28 Apr 2021 21:39:40 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '3b0b4135-b9ba-485f-9679-1d2af6f186b9',
  'x-ms-request-id',
  'fe6f51d4-658d-4d34-8394-608bd5deb4b5',
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
  'Wed, 28 Apr 2021 21:39:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619645976,"scheduledPurgeDate":1620250776,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5QjQyJ3mVnwx2-xCV-mQmb1UWsPRSyaQu_KSw0QDsKGsWYaDK5550GCWCoVHEr57TizAnF1uIM7NAy-12TiW9KzPPSh0SvymlFuI3I_jJaKOzDn85Qs8xTvJAH9vbGYo4lRjke3qK3oZwbzocJclKpmSVEUBvmOBKf5O0IQtVW9jglm-Bumo2hipyd8AFJE7zpyonc2Zyrn03LB59fFRTHDVpj12WlHqRV0zDRE9LMuDMNkvGvWDh706AWX5RzqKvfglDdVUxiwObi8Wq0PNWPUOL4xGfdll1L_gata4TFPoMnlCi_Ug5qtwF_aCMm92NKHxX11ofJRLDzm11xuIbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645975,"updated":1619645975,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9e1d4cbd-14df-4bf2-ad96-41d11ecd3f6d',
  'x-ms-request-id',
  '5a1903ed-8d32-48bf-8645-2567c5fb86f7',
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
  'Wed, 28 Apr 2021 21:39:44 GMT',
  'Content-Length',
  '931'
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
  'westus2',
  'x-ms-client-request-id',
  '33d02d14-f12d-4bef-990f-cead66e2bbea',
  'x-ms-request-id',
  '894f4623-4c85-49b1-a9dd-355dfda418e3',
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
  'Wed, 28 Apr 2021 21:39:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f8f75718-55da-4694-94fb-5fadc5fd0351',
  'x-ms-request-id',
  '7c10c17a-ce0e-4277-8e46-a0742969346e',
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
  'Wed, 28 Apr 2021 21:39:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '076c886d-05e4-4255-8706-fca3db823e9f',
  'x-ms-request-id',
  'd9bfc9fc-4b9a-4992-9292-c4743f58c461',
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
  'Wed, 28 Apr 2021 21:39:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b5ca0d85-de9b-4b59-82c8-8cc97c98f66a',
  'x-ms-request-id',
  'a276e49b-2b04-4f98-a901-7e9f262ec655',
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
  'Wed, 28 Apr 2021 21:39:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '97c1ee07-181d-4342-bb9f-294c64043ee3',
  'x-ms-request-id',
  '6bdeb242-7b15-465d-a72c-007e097fbfe9',
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
  'Wed, 28 Apr 2021 21:39:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3c10dc23-9c05-4391-95fa-7e4a5cdabdc6',
  'x-ms-request-id',
  '3c80dbd4-4833-491b-992c-2d90290f992e',
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
  'Wed, 28 Apr 2021 21:39:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '661',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1968759d-bd5e-4dca-a4e3-0140723b4210',
  'x-ms-request-id',
  'ade2d7e1-be31-45c0-ab9f-3c7c9caeac3a',
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
  'Wed, 28 Apr 2021 21:39:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaVhaeEVUQ1VGRF9kS1RUdU1hRkk1dFJJeWZ1ZHU0YjFmNUV1a21rYWtNbE5rQmNLVVV3WlluUks5VXdXS2tWcWdBRWFwX3NSZlBSQ3hqWEx0Z3E2UHRaQXNSdXdtTzEtQWhNa2o0dUg2UFA1X2wtZzFFbExJY3hOb2xfODd0cW94Sk8yTzZvMEUwZ3NnVXBPODlNTjVILVdfQnhDSktURVBNMkxXT3NULWJkNmZWaG5qUndhT1dXX3R3UFRBcjhxSVU3VUZ6bko5NFZJc1ZXNGhzWmJpZUR5cjF1cHpnaHBrMC1XQjZxX1NmV0gtamlxUjhmMUwxSWt2VXFCUU5SVUNLNUs0MkxLUHVuTmtVZHNqdjA3SzVNNjdlVkRKTjA0aDQ4SjZ6aTdDWnFOQ3ZRZ2tmaWJpVnlZTmNCYzBwMmppREdGOTlQSVJVaXFFbmlJcTBid01nLjAydk9Kblp1WWMyQTBiYUhVeG1SckEuZjg3MGxsQldWckhrbVQzdUxaNWw5bHBaV0lNdVBJOWRIWExnUk1jb1FWTDlpR3RDSU1xSXR1WVY4b3FvSUM0SXNUZlIweU5PLWNUOTBoZGN6R0NpNGVFSUZUZGs4dm91Y19RT09iLTZKcm5McUczODdEaUoteXg1Y3RZbUhQNzU3NmF1VWVoejJua3p0UTQ4MnhQcG5ZY2c3cE1IMXF5UEpsMWx1aTB1ZDdvYlF5RldSS0dOcDJKdmp2Z2IzeGctbm13Y1c4a25oVld6U3ZaX3d3MUlWc3VNSUNTLUdLT094R0d6VjdkallDSlhLTVRETDdUektSLXRVQ0pqSHFuUmlYTmdhZHhsYW1zN1l5TmZRMUNMVFV0Qms4MXFLZXlmQU1Qam1xSEttOHJIVUMtZElWaU5WUVFkWWxZNFR1NFRIa1dOdTZma1BpSER0VDJOZWMwZkN4aVRuQXNCYm01Y1F3ZFlDNXVpMTdveTJLSDNGZUxOWHE4QnRkV1FJczlWS3d4U2pSWVY3Y1h4UkpKZDBtdjMtREx5QXhVZDV5MnhsLTdsOTlEaDAtNTBReGJ0THdCbmVVZjJzT1pvOFlKbDdCWHhhTVdmdTNDWUdzcVNPUWp3MjJseGs3dVRaWlcyalh3R2pKLU1qa2E0ajJxMFR1WVpOOW5qV09wRzlBdG1FaVpweFNCQzViYVJPRFdWeVdFUzJJWEw0RkJCTzRfNHctWk5aV1FoeEZkRkNVNVJJVFctZnNSOWZmVjRxc1FZTDlOeDQzd0VnRlJ5UTlZVmVFZ0hqZWJ3bGtjY0JDVERBVmdYNHdEQzNsS1hiYmkxalNuUVhIU3FmaHktQWhSUmhqLVhueXl6TTJPWHByQS1BajBObkEwSE1rT3JzNkRpZEVhdzhrLWt2Sm9EQXcxblZZVDhURGVvdHpWYVFpZVlwWDFRNF9KSFlPN3VfY1Z4Y2Y1amJaOHloVjZEemk4OFlnRTJranJDdjB0YzUtUmR3Rm1Kd2dUMjVqcEllMnItUlF5QU0yTml0cDl3RGpackV2RnNDSXR0Z2oxVkRmZEFjbm1sTHU1YWJ4d1FpUFE0TkFHY091VDV2Vy1oT1VRb0VhbGw0aW5fSld6VndSdjJJMDhBZjMyWlprTW1UY0FBVC1qVVZudndjbXk4d09rVndfaW5KbExoVGRqTlZDLVQybXpRMkJIS3BoOEVIQXpzSTBUaGhzaV84Zm9WZXlOdDFYanE1cFNkNTRvZnhUVmQyamJnaFJDdjNKSTBpbi13eVN4TUd1YUJNOGxxNlRPODVqWF92LWhNTkdtVUpkZm1pZjVrVHBRWWdJSjFjT2tscUg3bmhnaUNnMWx6bjRFT1k4TlBtRXh5WWlycDEwUVNPWl92MnpzV05iNWJZQUdpXzRZd1FtcTdya1JOLWZTVG1fWkljSjdxZ1otdUpFb3R4N1p1bHQteVJVY0Mzc2lpRFhERlVzZlhramFkejE5dXhMUHVGaVdxUGhrV2NvMERCU3FIT1hFVWR4TDBNOTdxRFA3X01yUjR5QmFtZllERFczTUtEMnFTQ0RoTGx1RG43Z25MUWp6NFVydE5vcGtkakZUU3c2Y0JfNkhNb0Q0R0luMHNxRG82c1hsb2lzN0FaZzVELUZtcEpwSzFrUGdBWnJUY05Oa2lCX3R3R0E2eHlIazdhZlkwMEpKdmJzMmZHdEJMT0JTY05iVUlaMFR4VjdYeGJGRUd2cWFkQmFsczdWcTNEejhrX0tmNDhteVdyMFZnR2RPNDFQWHhsdE12NV9QQWRseWdSV1JtUGZWdTRNX2VQRWF4eGRMWHhlcW9QOWcyeXQwMkViaEZUcWtzbjA3U1lNVXRsM1FTc1VveUFrTExzRW9RSS0yMXZPcHB5LU5SWTZLYUpkbENIY3JZQ3pKd2RfWFpVdEdmTlpWaWNQNUdoVU93MmdNVTlydzRPMlRYbHRwdXpfb2tpRXZic2JlVTZXLTN5Rzdza0FZT3I0YjVIUV9fdVQxTEQ5LV9BUFJIeHJESk40Qm0xZEdLNy1BX0NLWVNGYUdXVVU0MkVBeFBGdEtHU0l2N3c3T2g5WVFKNnc1OWFZVVNpUmhRbGg0azhWQVRyT0o4NmtEUU9ucFVHWjB6b0NoZVRLdldQcXFvLXhCSVpTNXhSWDhUNGRXQ3A3R2VITUZrSHJaVk1JRU9OaFh0VlNKeGpZd2dUdm0xX0lVQ3JWYUFieUJPZWIwbGJOU1dnel9fbWJYaFF6M1FxZENEaTdOc1NxTFNVLVFjNHozc1VEMkM2dlY5c21KdzZuR0ZCUmg2LUVKaHgzaVlnQTkyN0FRTjRKR0I5YUI3RGFRNTB6OGk3UzlXcE5iU2FyUHBCdElDZmZnR2VWVE1BRzhZYlV5YUdMaWFBeVNULW9UbnVMdUwyX0lHZ3ZnX29ETWw3Qmh1WjJEUTlGMzFlY2x5djBHOXBmbTU4ZlJYZTVjbno2ZGpaU3NrN09ja2ZJWmxKSjI4Tm5xUHFHWWV4N29IbWE4ZGhZdlhGVVVUTE40Nl80eXFPaDROckx6aVU2TmQ1d3h4ZWVIWGJFN0dGWERLX0RoNk9fZmZ4SGtjbVU2dWNMdFFYREp2a3VETjJIZ00xZ25pbGw0Y2p6ajBtblpzVTVQZXE2ZXFYT3pPQkt1VzhjekM5Zm96aDJ3NXdHY3dEV2hkMmlVaV83VWRXNjdhVkdlcnlUQkNObFMtX0VYVy1fS2VqSUNYQVJlLW5Wc1lNU2tnLUF1U1k1bFJ3UEpQZU5ySkV0ZnNoTWtzSl9zaXVkVXFuSzRJVjBDNFhjdF9BMTRHdHByVWNVcXVtNjRhSHVqeEhFN1laNHFKS3RoNFk0T1dvbWJRTXdyZFppNXdKMlJIcmU0ODAzNTNtUFhDRE8zYXM2ZjBIY1ZCVUJHbnliM1p2cGx5NGxKLXhkRzMtcjlSUFBscFlYOUthSXVlNjhEWFJRUHBYOW4wcVY0U1ZPWlVjV1N0TDBnVEhFZ2JjanZBdS1TeVZiWW41UlRIaXZJd2x6U1BCN1M3empsalRFeVNqcW00X3RKUDk3QURmbVV3RVRkSDc3RnFtaVZfZUVaWHJjelJmQkc5QTVvQWNIbl9kUmIwcWI1QzNsWkZxLVZfZmlhcEFQZVk0UHV2RTIzNk5DTWJ3clpnQU5YSTRWbmRIVFpNUzF6YzRtVjA0dTUzM25JZnptTkZVSk9mQTk1WFRGejB5TVc4ZGM4dDRHZE9zM1JFR0VxbnozbzNhdnFLbUVhWUt6X0s0S1NBTzZrY01BY2NsRUVSNUl1VnNFMVlyRWFSc2VqcmhULTVqQmhsQ09TdE04eV9TVjZLcWZReEdtU0NnelRIWjF4LXJfc3B0UGJUM3lUMWMwQklDZ09LNllWem0weUtMZHRqczJKMUk0ejY2eXR4WmlLV2k2X1ZZR3FFWGh4cGVBaGNpQ1MxN0NqOWxFUXl0ZTRuLU9xU3FsSnExeXR0UEZyTHdGU0x5TkRfLU8tMDIyUW1Za21pRklCU3RqSmJlbjdsZmh5QmU3cURNUnNUSWZpRHVuMGdiLXZSMWFGWm5XTnZ6bjZiYmduQ29IUmt6Wm42MjZMbXlKSU9JRTB0cUpIRzBWQ0YxRXBfejgzX0JoTDkzNzRmSlQ5OHN5UlhRVkZLNC03YXAyWFEwdTVkRjNmbmVINElURnQyb25zeFNCdkRiQjc0N1A4RzNFU0ZxSHV2RWVSRXFraWN0RDlpN3lDRWVMc1U3czBkcTVwN192MmhtcjlhVGhCd1huVmowbTJMYVJ6WU45M2VUcnFSd2RyQWMxRnZFcDlQVGVxM2pGTTc1RU45MlZsUWJXaGJQZXNJUERYS19mdE9iRnZPYUY1ekh2cW9mZVR4c0MzcXhBTGhpRWtCVmJNYnNSbGZld0JRdS1OV3V3QlFsQzR3aDhLQU12S0tQUzNXem9rbU92cGVEa2lVLUNCVFhwSmNoWVZjYmZsNmZYaW55bm1rMC1kUEo3LWMtbnJrdjlKSk1YUXFsU1NkM0RfMnQ5bUw5OURqbkhUeElTcmZINjFfanRjNHVZT25KTGlxWGtzUGJjTzlTWUdnS0dwbWNPMUQxMmVUdFBRVV9nQ1hoRmJvSUExdnh3V0pKR1dVX3dCWUtBeW1nMW1HYy1BcHNWMW9ITXlNMzBoVUluWGMxU2lkWkZjTUxZTzdIR28xaG1BWWVGcjF1YVA3c1dERTZUZm00bzRBeFVzeDhWN0o2OGk0VktWR3d1OHl6RVZ1RHZtX0JWaFUxWmVEcW5qenp2cENCT0RlQ1pUWE56bUpmVnU0S3ZTZEhtem9TWG5XeVZiOWlkNmw0YjlWMUlGa1hRWFRvV2FpSzdZdDA2amdGeUxzQTQtWElkR2xMV1llOWFyZUtKaGFYaTAwbzFETXlVTkgxNmEwME9nZWJ3MkpIR09La3JPNTJtNm1XS2poUWFJM3hvaVAtbXhJRmExd1ZSSDBUa2tfMmthYUtPU3Y0clVqUFlRRzVkdHQxY0o5NU1lb2NidnVnYTRKZnVlczFXY1NaQ1U5ZDhZUzdTSVY3NnQ1VzFYMVIzU0hidTFSV3gyRmVHN2xTanlsUmRUdDhMQmxaNkh0TEt1Ni1DMDFvZzh5S2YwMXlWV1pRTFV4MEpZY0w5U3B3Sy1zVXAzcndBQ1FjS2NhNVBvZjk3am9lTG84YXNrM2RxdkFwYXhkX0FGTHV3QVVjdENFZzlvbWl5NEZJT2dSMDdlTnRucmJGMTRYQ1BaWE1tZXVaY3Y2bkxYTy1Oc01VTmV5Tlo3OTBkRkRRUXE3ZWJ0YmVRNGNXRHRUOHFqZXVQMDJyMEh2eG0zU1hlY0tWc2JfbmRpVkh1YnltT0NoUnlUcnFfbGZpQ3ZjaU1jVVlHZU1OOXk0TTF4SEFreTNHMEs3ZjN0RVROYUYydHV6UEdoQU5tRzJkazV5UDBlSGxtTFhaR3pnQ25uVERYRmU1UEtVa0poNHR6SXBLNUU5Z1FzekNXV2VnaV9iUHFZWE1fNWNGcXRJMUV1Q2kxc2NPMjFnbnZHNGdRZ3A4QllYMl9XNU91dkpTZm52ZzlzUkpxSkVVTG1ac010QVdjVkRzUXAwOGwyQW9VdWEwN0RNR3FPcm8zTmROLS1WQVlvb1RWbnV1cVNvTnJjU3NVRm5EUkFlTzJrYjFzMTIteXpDNndIUU1HSGxBTFBEZjFUSjZicF80OUR0eUhIdFdmMjB3NC1sYVc1V21ZbkI1dGNRSlRldllvZXpLNUVzTXYwT2Z0STlfejRLV05nZkItbW1JenVxOU5zQWtxNm9Ic1EtMk5DVlZma2xnUE1tWEZEMVBqN3Z2RnU3V25Pa0FfeW5rTGxsZVVVYTlLRXdGOERCMllJdU11ODk0cFJoRHFMVHFfVENMSHJHamRlNDhsQk9HTTlsYS1Xcy1nZVRFeEMtUHp3dDU1SDcwanF6eGVxQ1B1VlNpUkJKT1gyZDZ6NkQyWmduR014d1RQMG5BTU1NQVRJZnI4QUFNS1Bhc19VTWRvUGd0NUhuRDlVLXJIZkJEVlhaekpfc2JfN2Z0TVZPWF9yaTdaZ2o5VVVIV2VQR0tsRFktay1oQmlxRV9ZR0l2TkVESXRDVnQ3c3NIc2ZaTWxvUWM1SGJBUXp1VEFrMGF3ci1ndTlTWHppTnJyb21xNk1wLVRCOUhnZmhTZjZSbkRTNU9ramdNTWtlV2JwSWR3T0ZqU1k1T1pHQ282c3pjUlQ2c2Y2alpWaENVUjFtQS1kbzdOcUprTHowSDZyTHE1RTQySGhGbjZCX0hzTVVzRGU2dm5leVYxdFktLXV5ZmVRUDhZc1BFNXU5bHhtQ2VmYTZHVDJvaWlVbmtTY0JKZGdNVkZ4XzN1WDJCZkpxVXEteXlOdFpuZnZPbEFyZExvTjZoRi1EekVBSFNNVy1OeVNmUVU2dmkzRkpQOUZkeEtQRV8tbUllT0RUc0Zoa2Y0UUxzUUtVX1RnY1FILWk2VlpKdzlERjBrR0xWRHR5dHUzbVpVcldLRWFIWWNGQkd3NW1KbFY4SThoSlRGQUFRODN5R0ZKejFSZjhaaWstU2VwWElyaHVJRVRwRjJkejRyTXlfN0pid3dlV0dZSUJocVBFblRNU0pMRG41Q3R6eWFfeE1wTHJ3aWI1bzRocHc2R0ZPSXFfY1EzRTY0T3ljTnJoYkVTY0dHRm9OSzJoa0JTaWJZNWFuYTJkZDR3WVJfRzgwWDVteFc1cDZGMXNkWTVhYzkzN2FzczAtNmJzdUtEejFSZzhrM1N1TjY5T3NtZnJSeUNoZm5uRUJBVEI5MVpBZzJkSm9WVE1tVmUweEJKeGotaXdRRVQwcnlOTldGV21NMzdSeTVVbGtFNkIzVjhPTjlnYkc2M2hnM3A4T1FwTnVCVjhKbFAxOUpQYnlOOGtlTl9wXzNlWUUtWGc5RU9qVjhNU0k0Q0RQa25nVGVDMGtUaTV5RkZkRURnSXQ3czJ6bDNJWFFHTEg0RWlGZndZb2NRbWpMRm9LZlhlUE9yaU1pY3BSbnRUS0NvYXJDQVdObE1CQmhJeS1oeDliZGtMR0RYT3FsaW5mSUhQYzdVTVp0cjFOYkpva3NqaHVNWlJSY0d0VjdnYktUclZQTXU3Ym94LUt5NmthRFEzQ1BkOF9HUWZnRVBGbjlLREgyQXFaRkI0MFpscGQ0WG1UWk1wbm53SVJ3Q180ak1Hb1VXcEhMdTFzVXpNZWlCLXN6ZmVIcmZ0VWVRRXVpQlA5TXhVRE96X29sMV85RkllZ3FnZjZTUnZfMEZ4U3dEWXRkVENMUlEyR3Y4eFhjUXZQWjRrVU5SeUNWdEthSlBzd0VJTXpJb2tMUlRLdGxfME00WmpHQ0JCemc4ZUF3QXhpWlVHMzhvZnYzTmdaTm9BaUNTOFVnM2JKSG9DVEdobXN3MUNvc2lyX0ZrVXFPYkZZVHdDM2ZBTHlLM1ZEZTV0R2xQQVJpVm1IOHB1X1ktRWp5MnVLNGgxd1haNTA4RHdJcE45eDRSTEp1cklaOWl1LU1FdjhIdUdPY1prcnMyWkYxbTNJM2J6RTV2Z3NFWGNmNm54OTdwcHNKQzFkRl82VV9sYnZUSEpHSmQ5TUZLNTBXSEVvSHpmczB5TEFXQ2N6N0taN1NZUWFubXFLTFkzRk9KeXhTbmhDTnpLV1Z2WXp4VEZIbUlVam91LVVIVnJFdDZOVmZzMVNHZVpoVDhxWEVoNWI3U2NPWGpoRnE2ZnZocWY1aEVuRUZDWUVrSHc3eEJ0Y0NEZDQ4MzNCZ19uUGx1NWNuVmVITkY0R2ZjaHFaRlFjS2JxX1l4MFRXT19XYV9FY1hjR1E1RWFxTEIyVW9UeEJ2T0NjQU5rQW5ZemFYWXFUN0dHZjNkUnBJM1VQSlFybzV4SHJPa3RiRFVLcE5ZNFBfdURpNTlWWnY0bGF1ekRxYlVHaXVBckNnazgwOW1XeWp6U25HLU5RWGVZNmRBTHhpZTJBbWJWSXNGN1p3cHBRVUtYWDR5M3ZNOFpUUUgyVjc3ZzhCZVpWOW1ZX1RJSWdBN3lQYXVzckpEU2N4NThCYW52WWxhTE5KeXh4NmtzSWtXQlJsYXFNVWxSTVhxQjE2a2Z0LU91WU43REFjOXRXLXJwa2JLRVVhNWVQUFg0R1p2UEVWZFVCY2J0SC1iNjUtVmdSaGptVzRIRGpDcENDTzQzWmlPRmIyUmlfaC1naExEclZ3aUNEMU1KM08xaVdndXZxZk55U2lrc2EzbXZOOW44U2FoYnBaV0M0a1JwTVo3WVlqcFB6QVBmUmNob2lZdWkxcmdwSUVScFVmNXVPaWY2WmVnclVDdFM2bDRGNThWeGNMODRMdEROMWx6QUF6TG1URUVCYzc3Uko0c2dfUUFEbnZZNjRUaHlVRVVzY1R4UW1wMzBfazhFR1N0SEFDSGdjZ2ZDaC1Sa1diUWpubTlleExnZ2gwV1Z4amQwdC1rY3UxYUV0SFJrXy0xR1ZPN1BSM1RXWFVPQzhOUmtTMjRmZUhnS3VnN3hwQnltWWdZbmF6SEhiSE9rOEthYWd5ejcwOWJxMTZlWVJTblRVRlppa0t3YlBVY2czbGxWemM0SHN0dkhQcm9iYXBCbXB0T2plVVJEaktxbGJEMTdpTW5TZFBzYmNYVEo1WTk3S01nVXZNRTlMU25rYndyWE5TUTFpMHpjcUNaWGk0VEo4ZENOMWNneDZlRmNRVjhLb2w1amVtRFdqMThvY3lGQ216Tmd6N0Jrcmdsd0pGbjRSR2lrdzE2NC13VkFGOWx6OHZmVzVRY3lCY3ZxY0RfTlJjZEltbzlCRWpCYk5OUjhMN1dFa1p2TWJJTjQyTVVad2dETTZfbE1EQk9PUlcteGtRSm9pTllfeS0tRE5jRVlxZWo0NTJWMjVtLUtsVGY1Ti05VW9uMzhaVC11VENuRzVmMHk5YTNXZTRWWEt6dTIxQ2RSY3Z0cEZseVgxeDhmLU9HNnhSSnplc1g5NWFtRUFfdkhEUlZVbDFKemFYejBKazdvS0NQRFlPZU1xUzdjVU5ldlgtUXJ1XzlURnltS01IbGFqaUR4YVluSm9QdG1Xbm0wLVZMcGlfWGx4ZEpheS1NR082WnU3eWlTN0N1ZENPbUNWTHB1YUprLTFIb2hrUkhnVjRSdkdHTHFfbDFzcXF1ZFdYVUYwSjVVajlmQjlPdHNUYlZsMFY4UHIzWWJsSG5USmg4RU9LVVVUQi1TYnVYa3JRUEd1Zks5QXplcnZtWmF4dUE1TGdwRjNpc2toTnV5R3dRUlpOR2xVVXN1aHpxLVFDSXFYeGlRb0M5X0FSRlNNcXNMRHFYYzF1dDNTMkU3akxESHl3U24tMnBoS0pSaUVoREZJOFFmVGxsZS1iVGVGRTl4MDd5OG80QkpKVFhYamgxMnFLQTV1SThJZGliQWM0Sm9MVW5vamxsRWhnem5fLTQ3VXQxNDFaVTVYUTdNaG1NVlRNVl9hNU1PNUgxd09fbjZCRTQ1b05uc2VDbUE2d3NJZkY1aWFzTm96OElDOEJUT0l2cjNxSHhnaEJEeHh0Y0JORnVELVVpMFBjcTBvWHd6ZV9TTmJGM0VkbTAtSWRJWDB2WWZfRk5IZjdtcUFnR2NPOWF1cktfVHp6d0VybjllZGVDQ1A0MWhQSEtjbGtacmhfNU14TTNxZFBvX0E3VndqbmphLUNfMkhQRVlQTE9ZV1FYUFBQQ3NaVG9OOWEtNGpEbVJvOS03U2xkb2duVUVPYkVrb3BrN1dDX0o0YlpHOTVGMVYzWHVNSW54UW16a2FfN3FLblNxYkFnQ3o4QkR5cjZ1ZDAtOXhSdnFjX2huLWJ6WVpFak1ENHJwWGVHeURRbUsyWVZmaFRWcmJ3UWxHNUQzcTVZeHRDLW5qbzloOXhoTmFobVltZ0ZFRVZTVEdjVmhQUEh0WE1BN2NBcnNvLWVJcFJkLWF6LUF4ZGY0ZTAyeExIX1Fob3BpZEJ0RnVqOW05cjJseVU2WHl6UVJDNlIxTmNKVm5PMVlTeGdKdDBHWTY4M0VmV3Utd3lvTEVhd0ZqNHJiUkVPbFFlT3dvbmhFclIyUm9DSVAzdHVKTmJHXzVyREVObVYtb1FIdGJrV0F4bUplVndoT29JT3YxLXdlY0hZLnVGbFJYMUxIMEZBLWVMaGJNR3ZpeXhQNEFkcFFseEpfUVp1UFYyXzVzd1E"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5QjQyJ3mVnwx2-xCV-mQmb1UWsPRSyaQu_KSw0QDsKGsWYaDK5550GCWCoVHEr57TizAnF1uIM7NAy-12TiW9KzPPSh0SvymlFuI3I_jJaKOzDn85Qs8xTvJAH9vbGYo4lRjke3qK3oZwbzocJclKpmSVEUBvmOBKf5O0IQtVW9jglm-Bumo2hipyd8AFJE7zpyonc2Zyrn03LB59fFRTHDVpj12WlHqRV0zDRE9LMuDMNkvGvWDh706AWX5RzqKvfglDdVUxiwObi8Wq0PNWPUOL4xGfdll1L_gata4TFPoMnlCi_Ug5qtwF_aCMm92NKHxX11ofJRLDzm11xuIbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645975,"updated":1619645975,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f0dfbdab-e290-4d36-9d08-7a16f682416b',
  'x-ms-request-id',
  '535a11e5-fd95-4238-b9fa-3ffa64983d65',
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
  'Wed, 28 Apr 2021 21:39:55 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619645995,"scheduledPurgeDate":1620250795,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5QjQyJ3mVnwx2-xCV-mQmb1UWsPRSyaQu_KSw0QDsKGsWYaDK5550GCWCoVHEr57TizAnF1uIM7NAy-12TiW9KzPPSh0SvymlFuI3I_jJaKOzDn85Qs8xTvJAH9vbGYo4lRjke3qK3oZwbzocJclKpmSVEUBvmOBKf5O0IQtVW9jglm-Bumo2hipyd8AFJE7zpyonc2Zyrn03LB59fFRTHDVpj12WlHqRV0zDRE9LMuDMNkvGvWDh706AWX5RzqKvfglDdVUxiwObi8Wq0PNWPUOL4xGfdll1L_gata4TFPoMnlCi_Ug5qtwF_aCMm92NKHxX11ofJRLDzm11xuIbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645975,"updated":1619645975,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '2fdfa7c0-6cc6-4b52-89d6-933a5ca34b79',
  'x-ms-request-id',
  '90b42324-3b88-42d9-9441-dd3af717d77d',
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
  'Wed, 28 Apr 2021 21:39:55 GMT',
  'Content-Length',
  '931'
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
  'westus2',
  'x-ms-client-request-id',
  '113afc00-aefc-40e2-ab27-9f4e9553271b',
  'x-ms-request-id',
  '03312302-1c47-4510-982b-804596a07949',
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
  'Wed, 28 Apr 2021 21:39:55 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '9663af07-abcd-406b-b38a-580991e50225',
  'x-ms-request-id',
  '0466d56b-6f57-4609-adc8-7328cfbe279d',
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
  'Wed, 28 Apr 2021 21:39:55 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '642123d5-89dd-446d-80b0-37d35f59379f',
  'x-ms-request-id',
  '92a088e4-4de5-438b-b123-66ade6ca6a2c',
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
  'Wed, 28 Apr 2021 21:39:57 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  'b43bab25-a98f-48c5-a1b9-ca8dd579a7c9',
  'x-ms-request-id',
  '7ad60798-ae6b-48c3-844f-ee73fd546c4a',
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
  'Wed, 28 Apr 2021 21:40:00 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  'c6fb209b-3d11-4470-b545-4710f86499d1',
  'x-ms-request-id',
  '0c016d05-0728-47da-9fea-0015a87f3a49',
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
  'Wed, 28 Apr 2021 21:40:01 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '978a8258-eaf4-4216-bf48-5f7a2805efe6',
  'x-ms-request-id',
  '1c731c7f-91e7-433a-aa72-adc6c6f2faf6',
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
  'Wed, 28 Apr 2021 21:40:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619645995,"scheduledPurgeDate":1620250795,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/0044bfaa5c184e7386d6562be239b099","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"5QjQyJ3mVnwx2-xCV-mQmb1UWsPRSyaQu_KSw0QDsKGsWYaDK5550GCWCoVHEr57TizAnF1uIM7NAy-12TiW9KzPPSh0SvymlFuI3I_jJaKOzDn85Qs8xTvJAH9vbGYo4lRjke3qK3oZwbzocJclKpmSVEUBvmOBKf5O0IQtVW9jglm-Bumo2hipyd8AFJE7zpyonc2Zyrn03LB59fFRTHDVpj12WlHqRV0zDRE9LMuDMNkvGvWDh706AWX5RzqKvfglDdVUxiwObi8Wq0PNWPUOL4xGfdll1L_gata4TFPoMnlCi_Ug5qtwF_aCMm92NKHxX11ofJRLDzm11xuIbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645975,"updated":1619645975,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ba07545d-067a-4169-9ec6-bcadef1400e3',
  'x-ms-request-id',
  '10832380-8bd3-482c-99f8-6081e56fa3c9',
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
  'Wed, 28 Apr 2021 21:40:06 GMT',
  'Content-Length',
  '931'
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
  'westus2',
  'x-ms-client-request-id',
  '1fbcc77d-6a9a-47cc-8d90-f4a5824f46e4',
  'x-ms-request-id',
  'b8d056d4-8ac3-4797-b3bc-aa9efbcfc65d',
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
  'Wed, 28 Apr 2021 21:40:06 GMT'
]);
