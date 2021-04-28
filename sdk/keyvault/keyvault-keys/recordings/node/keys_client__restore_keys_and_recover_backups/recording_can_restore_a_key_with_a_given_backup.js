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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5c93b98e-02aa-44b4-b96c-da5720ae8021',
  'x-ms-request-id',
  '31c4eb23-29a6-4602-85c8-a815e41a008b',
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
  'Wed, 28 Apr 2021 20:58:15 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  '75baafc2-5b1b-4abd-80a9-6914f6e21402',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw8AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:58:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrZZUQwNfTynxGwJMp7w542_w4Gb1IRK8ZUmui2RqaLEP6o4JBrQKykNSBNsFxdBv0FNFeOH5iGQ20ptAtj5uzDhrEgdJaWV-hgPyLm0EztU9V56rtAV33k4krL4uRtTmjVmfi1iPrkNyVou-ptq66moRA2Imx5QWAod8WkUGvvXsgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:58:16 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'd85b3d8a-8fe6-4af0-825f-4496eac84400',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw8AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:58:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGYq-IyGGB4_4Z0Yr5adtszes-h0PJqpwRXopEolsw4lBSxqW4RWUoJScOKovOVubk2xsTJWJVfCcGjKO7YvNy1XKu9KhFelLhfq4Ph3kQdda-4Y26raZbv5T2abQYUdGzhU3ecCf-mq0BwLVq81w7_NUSRH26E1iaVOz3HQfZVggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:58:15 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '2edd392b-81a3-4a8b-9002-96df99086900',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw8AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:58:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:58:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vVa4sSa9UKMW3VFCV_C5tuCpcapI-AXzy0BzE6oFQZtAxMCQyasLu9alTMko5Nc6phlUUC3HZZ3V7FazzUCJT_DZzn1n6fhYhW8vnfbdvBTUh1nrCLmcKBFtaMNTJFaIjTyt3jukIFRKB_Q5ivIXRdVKpiZyCzEakl9M7caVDSvYBwHCRIobnJBfyyIomYoiwOXbclVtjA5ClvMRDGWfykXa3COlGtBVXC8qZNbw2NJzdze22OCM5JELIWcv5tjIeuDWKQ0FqWr9MA3ZpS5I8mRhXNrxkbxvc67zadO5ZXW_ForVEvDMGtzfnYhMtwaEok2JOO6RA7n6tPpFQyig5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643496,"updated":1619643496,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '5c93b98e-02aa-44b4-b96c-da5720ae8021',
  'x-ms-request-id',
  'd3a1143b-c90a-4664-a7d0-65c6408c7da9',
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
  'Wed, 28 Apr 2021 20:58:16 GMT',
  'Content-Length',
  '745'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"}, [
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
  'f5626285-eb65-41eb-98d1-4c4282e2f5cf',
  'x-ms-request-id',
  '03b58498-5093-4fe9-8d87-3c6121c8f5b3',
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
  'Wed, 28 Apr 2021 20:58:16 GMT',
  'Content-Length',
  '10471'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619643496,"scheduledPurgeDate":1620248296,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vVa4sSa9UKMW3VFCV_C5tuCpcapI-AXzy0BzE6oFQZtAxMCQyasLu9alTMko5Nc6phlUUC3HZZ3V7FazzUCJT_DZzn1n6fhYhW8vnfbdvBTUh1nrCLmcKBFtaMNTJFaIjTyt3jukIFRKB_Q5ivIXRdVKpiZyCzEakl9M7caVDSvYBwHCRIobnJBfyyIomYoiwOXbclVtjA5ClvMRDGWfykXa3COlGtBVXC8qZNbw2NJzdze22OCM5JELIWcv5tjIeuDWKQ0FqWr9MA3ZpS5I8mRhXNrxkbxvc67zadO5ZXW_ForVEvDMGtzfnYhMtwaEok2JOO6RA7n6tPpFQyig5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643496,"updated":1619643496,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9adbe04f-c880-440b-a142-6ce69e95e4c9',
  'x-ms-request-id',
  '7c211b33-7b73-473e-ab8b-cdcbc8653483',
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
  'Wed, 28 Apr 2021 20:58:16 GMT',
  'Content-Length',
  '935'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3b2a53c1-8fcb-48da-bd3a-be27c215bf12',
  'x-ms-request-id',
  '7998d1dc-3e64-44f0-9c00-e38b0892c34b',
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
  'Wed, 28 Apr 2021 20:58:16 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '79cc6959-17f9-4a6b-97fa-7cbd69f903d1',
  'x-ms-request-id',
  'f2543fed-3876-49b3-8696-d12d78dff219',
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
  'Wed, 28 Apr 2021 20:58:16 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '70dfd0c4-ffeb-4295-a2e9-f7b2946b66f1',
  'x-ms-request-id',
  '9fb411d6-ebfd-44a8-be24-5335bc734480',
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
  'Wed, 28 Apr 2021 20:58:18 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '904c1159-f22d-465c-b5a1-d23c84b3927e',
  'x-ms-request-id',
  '909eb2ba-3d19-4257-b026-02511e9ff2c6',
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
  'Wed, 28 Apr 2021 20:58:20 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b2416c0a-6af8-47de-9879-813c24d7cbcd',
  'x-ms-request-id',
  'c709f0f1-df63-4e14-8e97-fa0edb865a1a',
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
  'Wed, 28 Apr 2021 20:58:22 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b8b3936e-1c8a-4226-9e8b-a8e6a00e31f9',
  'x-ms-request-id',
  'af02078a-62c8-424f-a788-8370e6045b94',
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
  'Wed, 28 Apr 2021 20:58:24 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd7f398b0-538a-4e7b-a818-baaeae2805cc',
  'x-ms-request-id',
  '9887f2b5-d5c5-4493-b8ad-827e6815fab3',
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
  'Wed, 28 Apr 2021 20:58:27 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '180cfff2-1ba5-45f7-b8b0-4cbacd2162b7',
  'x-ms-request-id',
  '0f04440f-0d18-4e23-8a75-0071b16fb282',
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
  'Wed, 28 Apr 2021 20:58:29 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'bafc5985-b8d8-4da3-8c6f-cd9d9c98a0fe',
  'x-ms-request-id',
  'afdc546c-b10d-4ecd-bc65-99ed88466ae5',
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
  'Wed, 28 Apr 2021 20:58:31 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c4ed90d0-9711-45b0-89fe-da162d9c5b72',
  'x-ms-request-id',
  'fa6a1c9c-f53e-4523-ac58-c1cbeeb3268c',
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
  'Wed, 28 Apr 2021 20:58:34 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '25fcf65f-2f93-43bc-a960-3bfdf493d6a7',
  'x-ms-request-id',
  '1be55209-98d7-4530-b68f-4b7fd9bcef78',
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
  'Wed, 28 Apr 2021 20:58:35 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '89a237cc-16e5-429a-b0e3-5c4b9bac0e26',
  'x-ms-request-id',
  '8112012b-d64c-43f1-ab09-0af1cb4f2016',
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
  'Wed, 28 Apr 2021 20:58:38 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '425df732-e6d6-4941-9453-497d0b55ead7',
  'x-ms-request-id',
  '413bf597-c8cd-49ca-8201-dc47f330368c',
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
  'Wed, 28 Apr 2021 20:58:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619643496,"scheduledPurgeDate":1620248296,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vVa4sSa9UKMW3VFCV_C5tuCpcapI-AXzy0BzE6oFQZtAxMCQyasLu9alTMko5Nc6phlUUC3HZZ3V7FazzUCJT_DZzn1n6fhYhW8vnfbdvBTUh1nrCLmcKBFtaMNTJFaIjTyt3jukIFRKB_Q5ivIXRdVKpiZyCzEakl9M7caVDSvYBwHCRIobnJBfyyIomYoiwOXbclVtjA5ClvMRDGWfykXa3COlGtBVXC8qZNbw2NJzdze22OCM5JELIWcv5tjIeuDWKQ0FqWr9MA3ZpS5I8mRhXNrxkbxvc67zadO5ZXW_ForVEvDMGtzfnYhMtwaEok2JOO6RA7n6tPpFQyig5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643496,"updated":1619643496,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'c339a4e8-7e49-4dec-b7b4-2aada3aed503',
  'x-ms-request-id',
  '5ac3396e-3672-4981-97ab-a4813c6c4909',
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
  'Wed, 28 Apr 2021 20:58:42 GMT',
  'Content-Length',
  '935'
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
  '35f7731e-a00d-42c2-ac19-87143d81d17e',
  'x-ms-request-id',
  '54f69e82-86a3-40d0-be5f-f82676367195',
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
  'Wed, 28 Apr 2021 20:58:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  'ba53fa30-d2e5-4dbb-ba3c-54021e8272c7',
  'x-ms-request-id',
  '5eac4adf-c3f5-4094-b69f-8b027b79478c',
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
  'Wed, 28 Apr 2021 20:58:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '4d986584-6218-4785-bb2e-bcbfbdbef77d',
  'x-ms-request-id',
  '78450e3e-0ec4-4d83-ba6c-67cd455b5ba8',
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
  'Wed, 28 Apr 2021 20:58:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '8dd45a5b-1796-4949-869d-2010c893aace',
  'x-ms-request-id',
  'c6d7de96-b824-4394-b89a-048c8e6fd281',
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
  'Wed, 28 Apr 2021 20:58:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '05a0f41e-07a0-4846-abcb-72a3b13476e6',
  'x-ms-request-id',
  'e8044c19-6cbe-4150-8c7f-ef59af89898c',
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
  'Wed, 28 Apr 2021 20:58:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '7bea305d-7a6e-41fb-ae20-2595ccaedd3f',
  'x-ms-request-id',
  'eb8b23f5-1011-4050-af4f-28a6cb3723ab',
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
  'Wed, 28 Apr 2021 20:58:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '0afab9be-7bc3-418d-8b56-50b4c1d4f0db',
  'x-ms-request-id',
  '39097b72-0dab-419a-afbb-464a6ca41087',
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
  'Wed, 28 Apr 2021 20:58:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '744a257a-a29b-4db7-859f-65e14ef17823',
  'x-ms-request-id',
  '05f287cc-cfb4-469b-bdc5-c51952e6a5f2',
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
  'Wed, 28 Apr 2021 20:58:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '48af23c5-04bd-4f6a-a376-bdf46ff2a919',
  'x-ms-request-id',
  '9cd7bf66-29ec-4512-a1c5-42a1eab716d8',
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
  'Wed, 28 Apr 2021 20:58:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '9dadec06-0cba-42b6-bbb5-b2a4dff3dd20',
  'x-ms-request-id',
  '5e3648b9-8962-4c23-b605-611334ab9920',
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
  'Wed, 28 Apr 2021 20:58:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the key 'https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc'. This can happen if either: a second key with the same name was created after the first key was deleted; thus trying to restore a key whose name is already in use. To fix this, rename the second key to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the key. To avoid this error, perform operations against a key in a sequential manner."}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '2190494d-0261-4d8e-823d-0786fac44111',
  'x-ms-request-id',
  'a60f5ddf-9ccd-4e1c-9f16-031da341d95d',
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
  'Wed, 28 Apr 2021 20:58:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/restore', {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuU1ExVExYQ1R5M3hyZllBVWdWQU9IdUVHcmxCbko1YWJsMHliaGI3NmZHd21OdjVuOUhHVmh5UkZjTWRpLTdlZmpwbmZ6Tkd3bGFCVzI3UHdjVzF3elJCTnBlME84SjdaMWd2OXhBMUwxOXBubGRLWEVWdmN0S0hSRzViT3E2Z09BenZoeWxxYkxPWjBELV9RdlNiNFc0RDcycDFmaWFNUDg0c2hvYUlHZXZMQV9fRVJFbVROaU5WM2VSLVB5a0pyMVNGeGk1VGNMR1o0c1JKcDNsWVRIOWpuUzJ2Ty1hXy12RUFvOGs0ekVhRTA1Z3BHVFEyYktNbzhFNVNxMXRHLUlfSlJnNXFQMjFpbHEwTVVEN1pwZDI1b084TEsyYS1tcEkyZzNCOXpYenhjWEk0XzU2dURtTHBoMDFJclU1RzVpYVZYYjNLZmZielRuUC16bG1scHdBLjI1Z2dTa1BsTDZIYUhySFRIYnVqQUEuMjFyQ3p4bDZCTkJYdld2UERMc24wVFRGT1N1NGVaSXlmQ08yYnhOWUM4bzdPNDZhZXh2cUMwTzlRMmJpdFVKYVVPRUNVMmpPOUZXUW53Y193RGdIX2NzZldmanZnV0ZUcW5jSURBTHUxY1VKdkNHS1diVzdHblcwTU5USTg4Yk4wa0NmOWhURHlNcXVQcVJRaU16NmZROTJaMTR4c3d4dDBNYUxjRVloeEFrVnhlRXhvMFpoRFpMSUhoTExGb1dZWkJHMGJpMUlZY0xpb3pQQlo1SGxibEpMNExjRnI5YUZzR3puOTg5RTdmaktxWjhuamRpUHJ1V1JjV0Y3b0dub0RXX1dSVWkzWVJja3d6dzJlQUtENTAzS1JLaS04QmI5ZXdLaWJmWmJtdXpJaldHdFFzdWpfLU9QQkJRTjI3cHpNNVVXOEw3TWZkN09tTVNzQTZENXZoS205SkhLWGE3UFlDcm1TUHA0c0g0aGhMU3lrZXh0TEZCczFGSEctQVZBNVdjNzZUZlZOdi04Zkp2dnZqNHVOSU9Uc2dVTXNhUHcyYVFpUFZEbW5kRHo3amE3bU5UMzBPZVVrNU9uWWxaZ2xSVmFLQjZOY3U2Q2l6S21EelJyTHJybkFLYVpaVEl4UWdQV1ZGQ1FiaTB3azl0WkZFdFJ6WnVZcjJ0SWlWWkVHQVMwQ1JERDdJZHNJRnBxTUtRTmJxZk5pS1lYaUtpbUdvbzV4ejNsb0tFanNlUmJReE53Z205cVd5YzFBNkE2bDdDV2FzcmxfRENydThJZDNGdnRGTmRJR1lzUnM2RHp2SEw2akZMRTJWZmk4ZF9VWWtub1JGcWJON0p4N1A2MzNpUDNpeTVaM2x6dEl0NU9OV2F3SVhsWFAxVTllVFgtWDBBRGFGYUo5NDY2X1BUcG40WktSdG5IOUF4c3dtcm1hcjZUcE9hb2JhWDNlVEk3VzBYRWRDRXBTeGdPcy1XN1hnNHl4ZFktQmdSRnBCbXlsRGkxMmFieHkwdFJKdGpObm04VW5KSExhMHp4SEdMdmF4ak5MekRwT1YzWEJHdldCemItUkxvZkdQaE5rdjNBaU1PWXlYSVdQNlRyUXdRd3luN0tzdnIzclE1R1JJZHNEcEZPcE1KMHZkX2ZOR1VBQ3lXdktnSTNaQjRnLVFiSWRwb09DVTJNUmJXelNNOEZrc0xrbUs3S2RhNXhTcHRUUlBFRTBVRjQ5SmQtQmlBQ3FCNUt0d0tsdFZ4ZUZsNjRBVzRhaTdwZWFYVkdoZzZBMzFNS05iMFdmYVZuWGFtVGZVMEQ2OFNTNTRFY1ZuWnVfSlBlTDMxVjRYWnhLazNXbGtUZlBYZDc4bkliWXdRWUFpN0pOeFlDN19iV2VJSm1xZWNQbUF2LVhmUllJVnlpbGkzWDhpTzgtbDJnNm5uY3FUc1dyRUpyYzFQcHJkbTM0bVE0djNQamRpZFlDWEcweFh5Vkhfd0VfN0JtRkFSeEctNDJWSVVlNFE4LW1JMWk1YktHUkR1Sm9nWWljOWt2aFpmRzJLQkxXdU9ENHVZX0RJWTdlTk9HSFRBSXY0NXhWM1diVFZiaDM2eVp6d0RoSzZWYVZ3dHRwcXI0enp0cVQ0M2NJRlZLLWhtM1ZzMjJRNXRJWmM0aG5UUWFHRVBZaGJJRWRvWFA3bVgwRkdBYXFVa25EcnlxS2FCUFhzTW8zcDFlM3VncjNWdnRmRmJDUXNlajZDanRSOXhPT04xLUNiR0lmVFJTdF94R2xFd3lpaGZYRmpUMzFxbG4zV3ZYUG4wS1JrblBORElfcWo3cWt4bVNVRVRjQnNQWkFWejlWWUo2VXZWQUdlb2xOY1ZnQ2dzMWdoeWpaVlRqaUQ5TGV6UlRpbEQ5d1BiRFZJN21kbE4yajIxaFh3R1FhaDAtVmo4Mk02b0ZjelFCcnZoMkF4clBfbUZCWWswbVFqclc5eUNvT2ZWSWxuMk1JTTdDT040MENtYWVfRUJyLU1zUXAwcjNIcUVrNmlqeUszbDBGRVpMazJXYzBUYUhxZjlvMEhid3hJal9ZWnZQa3RCVTN5a09EQkVWWTNfdFFsQzNySUVWUXJmV1BqLV94YXd0d0hfbXE5V0pGdG9qRDFFVWlKOGIzUF9rZjZBQm5qWjFnVFI1b1p1RmtYYlVEekVzV1oweVQ3Rl9yM01ycDVaX083dzN6NDFSUlJ3dkxQWUJ3Zi13d3FDV1A3T3IycG1IR2doY0xpQUo5UFZVUjVuM2dBVTZ0WlVDQmE1NkRSVUw4MFpJRzJtblI2dmtVSlV4dUp1SVlBME52NXhEYUJHRlhBYmVkZGJ4YncyTDJ6eHQ3MFRHNW9laDljSzc5ZUExMkpNLTJOa1pCTGU0RDNzZ2JjRXBrUm8wbms2d1dDY1BhTWdydFFNdGlLOW9MM1FyTjAyaXRVcXRQdWZSVkREZjFEWXJsSjhtZENEOTZ0X0Via0dfUktVeWFRa2ZGTFpuMU5lVjNpRDZoT01EQ0NTX2Q1UmhFOS1YNFhzN01sdXdCVXhyQTBLbXg0MGhJYlAtZlZJaEtnYVdROXA5RWJ3aUxJZFg0eUpWYzNaNEtPTHVWTldUQ0VhVk5DaV9sYUhFTG9Ld2FVbmQtZDhfekhQUXBBTG53WHlFQWV1NzN4MjBYb2RwYkxQY0lsNmk1MllfQkphdXdvYkJHLUVaN1R4dzhwQ1ZnMnRwcVc1cHRYSEZFYWhXcWo5czQ1UzRSM1RtT2NjODc0NHItdklGVlhBb09tVWtVTUdWeVhfZWVkZjNGeWRSNTNJQk42TW1NNG1lcFQ4YUpUT1FobnozNXRIeFNOdjdJd3BBRTNuOGdLU0xNZHV6WmhpbS1nR0x4TEd1UjBlTnZORE94d2U2UXpmdGR4RVVBaVVWMDVkQXRQeHo4RTdueTExcHU0ejU0cDM2bzNONXo3bEI3bG45d1NwazhuYVY3aU5fVHNhSkt3dkV2U1l5SVRsS1FpLXhTNVFGajF2cW9iZVR5N2xIOUdjeVZlbl9xbTQwUGR4ZG9iVFRxdnZwdVAtU1M5S0MtQ29hWldQSkttVm1hZm5wSFItTGRmT3lKQnVlMDBCcnJpNm9OSGtnRmVuSW9HRW0ydFN5c0hMVVNnRzJ6WEFiMF9vN0E1LWJsdjJBSnhjbnpIZzhFaDZmZGQ3UUY0d2ljN1Z0RUlrOW1nVE1sU210dzFVUy1MYl9sc2t3cmJlTVBLR2lRUTJDZm9pb1pFSXUyd3pCbnJtV1QxNlVOOGtnY0FZT1dYVFd5QUI5aFlycUVjUVlEZS1SaWJiMVBwc3BoZWdVRVIxN1J6Q2FMa1FrWkdOMkJPcFlVZEN5cDl2SVlXaG1KTGV5OFczV1FxUWZsaVB2bjdCVzNZWGsxNnIwUHQ3MGd6SnBET2VWNm11S1JSZE9XVjNzRlZsOWFmZkJSZ1dNZjJYRmllRVV4YlZTRzFXR0wzc3lESUlwekdfdmVZenJnUDR2ZmV5YnJWNmIyZGk1QnJnUWJIZ2tFX2UwZWFjczc3ZjRGU3pvTHlTTFRJMW84bVdTbVZxdG1nWnFmT2dBVkpkYTR5Q1V3MWVGZVJOSjBCMXVzN2FJbU80X0pvSlp0QzhNTmRxSlg0N1k4aGtuQnFXZUFsSWUzWkJGak9FdTcxNXVqNW5ISnJKWHZVNUY5N0tvTmlfd1NaSmIzU2ZPUmt4Yk1LalVXTXBtSktEZk1lQksxOHZZdHJFaldnSkFWSHdlWlRHOEwxUnhDTVdtWjBtRURpeGo3UnR1TGhYcmRVdFp6WXJyQTVWMF9HYVpfRUxidzZJY0I5dmtOTWd4RWlQRVgtQlRUZU9DM3ZHMHJuV1Q4QloyczFzZnVmazFhUXlOeDREVHVwN1hmOG9OOE85dlRFWUxZRG84QU1EcWJ0VTRJS3ZYWjVxV0RSMWdjMWZSQndleWlnVjVRUDBZTmNYcXVHbkQ4THZuWG9aeHZxTktIWW1GblozdEFqOExNT0d5MUdORi1Da1lfbTBUOUJqM0xTa3htei04Z2tLak04SHNVZGI2Y010YXdUUnhvR0hzcDlCZ2Y1OFN5OG1YWXlWQjdyVE5tMzZWWndEX0JrU2FrV3ZIQVZOQ3d0OWJhSFoyMnFORW9JdXdKQTAwOHpqTlhMMHhBYUY3c0FleWU2VUdwSHNYVzBndktzS0I0bmZLSzIwOG8xMS13UHJoMFVvWlBnNWlZdXBjbnAzZ3lTc3FtTzJJaDIxM0xyT3hDS0xscENZWkxMd1NSX25rbWJLbGV0aVJZbVlxVGxZQkJXSndIdHpsM3RrRFZhN292eWVFNHFERHBNcW1nTTdOY2V4Uy1wbDEtLTFPM3V1SmV6cDI3QWhfUTE2U2dHUmtwSTBuSjZDRDgyY2ZlZmdWSDU0NzltNkt3TVNFWi1iRk4wSERVMUJpUDJ1Yy1LSWQ2dVE5T0RvUS1VTVFJaERjR0pEaWJ0MUJOU2NiNTMyaVRyM2liMjRXN0VqbEdhazJhT3JVUVd1M1hiZTlwelB5NFFkQllDU3NTVTlxN0JEeGtSRFFZWk5BRXVtamdIWDNyRVJtZzBfX25qZ1pndXRIZWcxU3NkU1BtLVFTcnRtbXpNS0JKTFpCSHZpYnV5NjgyMWsyNG9fVWkwRDc3Z19LSC1neGREQmRLd2oxWVY4MFVvaWpKTy02QmJaZmRmdWtxQk1OX2lnUXpfcVlEeU01VVdwY241RVFXaW1aNG1majBqUTVuT2praVd3b2hvYnh0a3NsVVc0NzU1aW1IeWNncWYtZ195cTQ4RjJGVUlhWVJpcWc2U3AycDR0eWEzQ2tDUUJOY1ZhTkV6eWxUdjBQNGRxZGFPaVpPcW82YUNUZG9QcWREb3IxcVFBYzU5MFVxTUw5aGR6SjBTODhxSFRXQ3c4T1FFc2FtM09fVnFBWktNRzF0dTdtX3JhTTQ2ZWdfWFpHTlNJc3hMSmRMRjNqcS1sWU52UTdtZ3g2TEdtemFkREZhLU5QZnQyYjRoQ0RtMWJYaGdoRl9FanBIUmVOaTQ3Z2VTcjEtY0xQdTZQakNMdnhtWTZBdkw3SE9IOEp5bWJpaWktTldsVGhidV9zZzl2dWR3Q1pBcXlaV2t4dDNFSTBHM3ZGR29rUUhWbmRkeXpnZTlEa2I3Y2dPQi1VVGl5YmRJdlcyNWNJOVg0Ujdkb0F0V1FNY3h1eGxCRUF2bzlQR1VfUDVoS1JiQkZDUFFabFZ4azR4NXo4MmlPU2xIOFkwamNjTWh6TXFLYUI5M2xXb2lMWGN1NkNTdkxhLU5NVDJaVXk1MEFnWno4dG9ES0VVdnlxQ09vaVptcjhtMzIzdmxsdThDOXB1QkNKYjNsd01yVXRtcWZzejJhODZTZXNkWDRDdExtOHc2MFdwOGFEYU1NSkdrY2p1enBDdTRwb1BSVElrVmcxYmxMc1hPOFR1YXdYa1NmT1dXcGx3cEFrSXloaEVwbUR6c2tENG5WT1ZFX1FXVHZUUEpBMVdCNEhERm1KaF9rR2lXdm4xdEctOTc5d0xGdGJjWmtqcDJZVkR1NzBvbldDQ2hfeVF2YzB3a0tsWFpFM2lHbDVPSnhidzMxc3J1VHVVS056UEJOb0R6NkRZSGlnTzAtRkwwTlU2WmtvX1M1MFFNM243SUkzZkFrRDZadXhVSjBqRTFhSklEUi1kQUdRdGZJVjdzYmZ1OEFydkNzU01PRlRndEpCNllZUTlpMUVDSFBJVGhRa1VSb3BIQkZITEh3Yzk3Z3BfWWRuWnBENEhpd1FOQmhOaFdrNDNmc0hNMGJfWkhna1lZNFFfMWFEYlVpZ2hIZThjRkJlNVZkdk9UMDhhaGN2UUY5aFdDVDE2dVcybEpBRUpaN2tkQkU2b2xRcGcwWWJhQkMyQmpnNWpOUm9LOVAwSUNQTjRlbUhMa1BfUWZqUEtfWFdSVWJtNmZUQTBfM3VFVHdfam9KRjk3Zkx6dWVlUTc5QVZQTnVGZmpqc3g1bHprbENyWDdOWFZ1WlR1THFnelRQSzNuSlgyWVpqTzBiTVFjNllMNFktVmhQTmV2aVR6XzZ6RDJQUEcwV2tJanlpQi1sYnhjUWQzdlNEcm9QMHFWWU51a0tWdUNyWUQtRzJLT2cteTQtemRhdlFpWWR3V25DU1BOemRaUjJZaXNBUl9XYlVmeGM1OUxwSDhQNGQ1STNhcHBlY0t1OWdBM254Z0dXYzk2VWl2b1VhZ1ZWWmVSQnY0NzkxLXJhd1ZGc3k1S04ydTBobmttT1FXWEpFSkNtZFJ6SkZHRmNfdl85QWFvaFRkNTBQLWpRX0kxOVNYU3ZlSW9hSGUxaEQ3TEVrTDVWQVptLWJJQi1VRWZPTGI3Yl9QWlZ1SlFsclhaTzl3WVlJTW5xbWVmcWVPNUpMMXNJUDJtdE5jTC14X0hKdmctUEExcTZ2MFQ5aTJyQ3hoMEhpX0otYlpuSjc1TjlMY3VGSzhuVDY4V2t3OERCZmR3SlhTX2NtQ0EtNmFmRTExWmdvWXJuaTlUSjdFbGdTYmljZlNuQnBraW9Hd2dHSC1XYWVzVUJhbkFPR3dNakhPZ0N3QVdCQ01hQnFxLXZFUHBGWmFPM1I0RG5BSlFJbHdQa0dkdG1tQ29mZGRDcEpBLUEwOEZrUGlvR19YZkRGQmw3QVlEQ0FFaHB1WktqdXdBQmRwM2FJU1hFVlpNbU9hT0FiY0IwcmJpNkxsdWRyMWViaVYyY2VURGVNNHFjM1lfZEZQeHlldEpXSmtwekk2MjNBM3dVN1QxaWxRRkxzbFlzcHR2a1pJcFpLemxCaUlRZ3VTX0xXM0xsZHMwamwxeTFXb3M4OVJsNXR3R1J2LXl1RTlLVWQzTGpvREhGMjdGRmRIOXpuUjNGRDM0Zk52RmNQZ3VyX2x4RWZzeWJGMFZHR1JmdlpOVl80WkE5akN3dWo4WFJRNEs0VGxlWV9zeWF0RnR2RE5TeE5kcFYxZzRMemtDS1c2NC0yQm56dUViV3ZSM2lOQTJielpwOFlha1VaUkdRUDA2UWJ6QzRWNDVSek83cUxEc01yeDdsTW9kTWRsckFMUXBBZGdlRUdMX20tWTFXUVcxWjZCc2I1dWpUb3BmMi1ocS1iOUNELU1wZVdyUHk2OUtjSG1rWmF6MkhnUTJqVkhYamc3UURNTTRwdUM2UUVBeUFNS0tjSWdOSllMMzZQUndrSXlmdndwS3IyajVhNVMwaXBBNzluNFdOYjdpd3BzVDIwZ0xsSXNtVXVpN2tnaWg4WVpEdnFTeTFfbW5TcWxaOFFYaUZCYThOTlc0aVJ0bGZ6a1lJNEdWa1BSVXpweGRoWTRNb1YzS3J0NHE4dXFVZy1RUzUzZDEtSnhuX1JuTlhQSXlJTnI4ejBVMVBFX0tVSThFRE5OSkxNQVF0NGJoazBMeTExalAwSVYxLXRHTHpYZ25VQkJXT1BRaDU3ZTlwbXFMcVpha0U0TzFxTXhxMzMzcTFrQnhmeDc4ckdzLUdqNlZJMFM4WGFnQTJ3OThBenVwVjF3V1dNQ3B0QlAtbHZYekl5RVFGa3NIX2dzSHNyRzFnWnNDYlFPeFRoRW1RYTMzNWEtU1VOVmNpR3BKdkt5dTFpcjBtbXNlZ0ZQTUNMa3NvM1RwVVlVb0V1Nlg5cW1NWmxnRlFhMk1NeVJyU2pUdVFLWGwzV0RKVEQwc0NocjZvYWlEVWVINDdaaExlcXhheWxQeXlpZDZWSS0ydWRwUHBzU1U1MTVFcDAydWdUdjE0Ujg4dDZTcGZMMkt0YzR2a09UaGFFU213dmVXcHROOVdUcmhqcTZvbTNzcVNuT0p4SFprSUV3WmxyNmhiZmhLelpTUUVLWFJ2NU83RmV3cWV1TFpnS3JjQWlSc3FxcHNidFZoQm40cUFfeDRtdmI5V2dFVEl6b2p3Yzl6ZW0zdmhtVnBmRXZ2dE4weFhjNGphdGJvOEtiVG5vd0x0SlNLM1FBQkJVX1Btb3F3V01LNXFoOXFHRzhtemRNVDEwalJfSkxyVUFua28xT2tUc3VHTjJURmJtUElHRTZwNzNYMkdJdFhVMGtuMkNzZzBmaTJRUEVYMEM5eXRYWTBOSTlxeTJaNGZqZUVkR1N5b3g5ZGYxMVBLS0U1cW1DMnRyY0hGcWJtenBGZTBNYjZHd3RaTmMtejZSV0hGVG4yQnE4RnFKSVR0TFpIaUZDdVJPRjJ5NExGU0dJNy10WTdjenNwRXpCc1JOdERfY3dhVi1fQzVoN0NOckpIUVp3QXNpQnk4QXFYakZBdlo2NVUyZlJOWjlxbTBRRUF1Vk5ZejBqTDUzM1phRFpnZ2I0SGEwQnM5OHJ2cGF4OVJnMWl0T2lXRnNwcTRqOXNpZHR3ZU44OUZqVWJJTG03Q2tMQWlKS0ZkN2xuLW5zVmNrUFlNV0szeUd1X1dUREZ4c1NUeWZQMGdqNHNRN3o3YTRoZFRCMGZvXzRpUC1wOVJFQkRPRGZSNDZweTdfbE9sOC1tZkdNRXlHOWxTYjZlNkRDZ3Y1MzNncWwycUtxSHQtYzZzZWE1ZXhnMkVDMnVtYnVkOXltcndXUHJpbjUwV0lPQmtOU1VwOUM3M1M0RV8wdTB0Qnc2MHo4UnZVMHhlS0JLemV0NXk2czJWLTJwMzM3UGF2VXpBQm5LYXZVUDdSLVhOYXJRc3NMTjFSVUhINGxCbVpFSFoybl82R0dSaXRObHZrdTRyQmtHMzRRdkVQT2FBWWNyRGJZOTJ0bEJOcHlhLU43OEJ6bG1tcHNvNlRRZk5lbFB1QklsV1c0VzBjVWdDNGhoZkdFZ29ubTdoclFoOVlPZHYzOEMyU2dnOElkMzk0OEdUYkE3cGlTbUs0ZVpDQ1RUcGs1ekhPY0otajhqSVBSS1h2S09QS19sLURzMld2VDNObFIyeVh5TXdOZnpkN3BvZ3ZxTGVKeU5KUlBxUzhJX1cyM2lza1M3QUJqVEhuc2dMRExEUlZ3VF9Yd0pnTVlySGZyVjA5bmEzVFMzRDhlMXZSTzNBV19wckpWaEJoYlB6c3M3b2VucTRZRkwxaU9iRG5pTEZ5dU9yU1FHVnllcVBSYVQ3N0xZNVI0QkdoT212SVNzaGc2bzY3cVhFQnF6TXl4RHQxeUZkR1hFektVeXM2TnBVVjRjOVJJNFV4SXRtSWIwZlBtajdoaWZyc2VYb0MyZFE1OGxHRGlKWDlCSzA1ZGU2VjJpTmVCRTVHRXpobjh1cmdvRG1qa3NVS1B1aHJ0Rjh3ZW1KNXNVM29LckZxWGZsZzUwRnIzLWdyMjczM0YxdERwaTBNSlo4MGowNEU0enA4Zzk0VWdnV2NLbm1KWTI3RUpsRVlVT3FfdzBidmdsSlh1SXQ5MGRacDJFbjNPSnZETGEwVTJyUUVIa3VQSGRKelo2aUF6X2NXbC1KVWlSSHhlNUlwbzVmWGhQMVU5M3drbkFMSFVFdDZLV04xa25WOUlUTU4wYXppUDhPU3UzVVVyT2hzNDE3cFdlYVVQOGU1aEdGTUplSEVueUJsb1Bfbk5DN1ZKMVJlX0tZcWlfTTBfVVU4a05sd1RYWmdvdVFXaVhTUk9lX1h3UzlVc1RBNDhreDFtdDE4d3dJR2dCeVNKdE5rS2JNN2R1NXNtUE43d3BGYmV2RTVKalJ4SWZNOUlJLkE2SDdJUzFBOE9hU3ZBcGl1UnlrVWVsTm5nOTIxSDV4aEhqNTh4a244ZFk"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vVa4sSa9UKMW3VFCV_C5tuCpcapI-AXzy0BzE6oFQZtAxMCQyasLu9alTMko5Nc6phlUUC3HZZ3V7FazzUCJT_DZzn1n6fhYhW8vnfbdvBTUh1nrCLmcKBFtaMNTJFaIjTyt3jukIFRKB_Q5ivIXRdVKpiZyCzEakl9M7caVDSvYBwHCRIobnJBfyyIomYoiwOXbclVtjA5ClvMRDGWfykXa3COlGtBVXC8qZNbw2NJzdze22OCM5JELIWcv5tjIeuDWKQ0FqWr9MA3ZpS5I8mRhXNrxkbxvc67zadO5ZXW_ForVEvDMGtzfnYhMtwaEok2JOO6RA7n6tPpFQyig5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643496,"updated":1619643496,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '24d7e78e-c1e8-4197-acb9-b4b96078ee03',
  'x-ms-request-id',
  'c89f3eb1-feb0-43ab-a209-f280a6154469',
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
  'Wed, 28 Apr 2021 20:59:01 GMT',
  'Content-Length',
  '745'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619643542,"scheduledPurgeDate":1620248342,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vVa4sSa9UKMW3VFCV_C5tuCpcapI-AXzy0BzE6oFQZtAxMCQyasLu9alTMko5Nc6phlUUC3HZZ3V7FazzUCJT_DZzn1n6fhYhW8vnfbdvBTUh1nrCLmcKBFtaMNTJFaIjTyt3jukIFRKB_Q5ivIXRdVKpiZyCzEakl9M7caVDSvYBwHCRIobnJBfyyIomYoiwOXbclVtjA5ClvMRDGWfykXa3COlGtBVXC8qZNbw2NJzdze22OCM5JELIWcv5tjIeuDWKQ0FqWr9MA3ZpS5I8mRhXNrxkbxvc67zadO5ZXW_ForVEvDMGtzfnYhMtwaEok2JOO6RA7n6tPpFQyig5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643496,"updated":1619643496,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '88013dd2-f930-4722-b082-11582e45d602',
  'x-ms-request-id',
  'f211950d-b4f7-4487-ab00-316bbdc9efd1',
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
  'Wed, 28 Apr 2021 20:59:01 GMT',
  'Content-Length',
  '935'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '283b094b-46f0-41c7-9ebc-191c4b879305',
  'x-ms-request-id',
  'fad1ab94-d619-49c1-ad5c-8d392b86dd55',
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
  'Wed, 28 Apr 2021 20:59:02 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '27ca2814-0e51-4900-9643-cc8a3165b980',
  'x-ms-request-id',
  '036a1a29-fce2-4490-99fe-d2b32908907c',
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
  'Wed, 28 Apr 2021 20:59:01 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f2153217-1e69-4d6d-9029-df946b3a5786',
  'x-ms-request-id',
  'bdf78d59-f428-4c1d-ac37-698aebb3afe5',
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
  'Wed, 28 Apr 2021 20:59:04 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ed0dee27-8fc2-4608-b0b6-bd392a82b08c',
  'x-ms-request-id',
  'af6f844b-accb-4d08-bf9d-642548dc5a08',
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
  'Wed, 28 Apr 2021 20:59:05 GMT'
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
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '293b5e2a-e663-4328-8c10-c7b89378273f',
  'x-ms-request-id',
  '063fcf28-e3d8-484d-aea9-8161112cce94',
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
  'Wed, 28 Apr 2021 20:59:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-canrestoreakeywithagivenbackup-","deletedDate":1619643542,"scheduledPurgeDate":1620248342,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-canrestoreakeywithagivenbackup-/d4736938b2e640ee8433c24b025c1fbc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vVa4sSa9UKMW3VFCV_C5tuCpcapI-AXzy0BzE6oFQZtAxMCQyasLu9alTMko5Nc6phlUUC3HZZ3V7FazzUCJT_DZzn1n6fhYhW8vnfbdvBTUh1nrCLmcKBFtaMNTJFaIjTyt3jukIFRKB_Q5ivIXRdVKpiZyCzEakl9M7caVDSvYBwHCRIobnJBfyyIomYoiwOXbclVtjA5ClvMRDGWfykXa3COlGtBVXC8qZNbw2NJzdze22OCM5JELIWcv5tjIeuDWKQ0FqWr9MA3ZpS5I8mRhXNrxkbxvc67zadO5ZXW_ForVEvDMGtzfnYhMtwaEok2JOO6RA7n6tPpFQyig5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619643496,"updated":1619643496,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e2d15288-62a7-4e25-864d-136e06407a37',
  'x-ms-request-id',
  '8eaf82a1-093d-4518-9d83-129cd6c569c7',
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
  'Wed, 28 Apr 2021 20:59:10 GMT',
  'Content-Length',
  '935'
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
  '519539a8-cf14-4925-9f3d-761511f80e1a',
  'x-ms-request-id',
  'c69424bc-a8a5-4833-965c-6a0f3d98cf8a',
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
  'Wed, 28 Apr 2021 20:59:10 GMT'
]);
