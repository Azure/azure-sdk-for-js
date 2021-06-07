let nock = require('nock');

module.exports.hash = "aa3b6087ef6b9016a7abcfb57aeb9b31";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-')
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
  '9a58bfc5-a2b3-40a9-a9c6-d4bf87d06399',
  'x-ms-request-id',
  '2fc3f392-6786-496a-97de-51c1fe8be75d',
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
  'Wed, 28 Apr 2021 22:56:13 GMT'
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
  '9eba47e6-a966-411e-889a-9ed984675100',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ags565BX9kNAvFMBrxPSoDbmR1YbAgAAALLeG9gOAAAA; expires=Fri, 28-May-2021 22:56:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0H_6LjExpQsIo9F-kkh25dF0rTAeRgf1WpYyD0n7dRFaNtsCPUMUs_pY_pCbTrxMYS6K4otBkdtP0SlE4ULtatilshLrQWGcLK2LvQDIwW5Kptz6rrJnu1feOx4qfIyLgjusslNh45ruxC38kl1qM2QYseZ1DIYgDYb9Ar2Pxi8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:56:14 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '8fa1c2cf-b116-417a-8b4c-05135e0c2c01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ags565BX9kNAvFMBrxPSoDbmR1YbAgAAALLeG9gOAAAA; expires=Fri, 28-May-2021 22:56:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrltXByWXTIMTCH6ZWQPRLK5kdilUjltIs7MtlqCfa-4-crD9zpTzShLl8efDKaKGWBz47zKSAscqCByJRwLJVaWmVgQwAtkib6rg9iWo96AFukSRACPs86XkWiX3VxJCJpkKFLJdP_vnzdwULdfABTRAQnVJumnfh2p9XqqRZKC4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:56:14 GMT'
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
  '8c44592b-6afa-4b29-97ba-e5e10fad6d00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ags565BX9kNAvFMBrxPSoDbmR1YbAwAAALLeG9gOAAAA; expires=Fri, 28-May-2021 22:56:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:56:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5","attributes":{"enabled":true,"created":1619650574,"updated":1619650574,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '9a58bfc5-a2b3-40a9-a9c6-d4bf87d06399',
  'x-ms-request-id',
  '5a0f0f03-f439-40f7-97b9-54c2178b2347',
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
  'Wed, 28 Apr 2021 22:56:13 GMT',
  'Content-Length',
  '299'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canrestoreasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"}, [
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
  '62849414-fbb1-42fa-9155-fefcb7efda2e',
  'x-ms-request-id',
  'deefccec-070e-4a68-b274-d7e8be581f1f',
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
  'Wed, 28 Apr 2021 22:56:14 GMT',
  'Content-Length',
  '6266'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619650574,"scheduledPurgeDate":1627426574,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5","attributes":{"enabled":true,"created":1619650574,"updated":1619650574,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '983e2570-2eb6-4ee9-98d4-0deb193bfd0c',
  'x-ms-request-id',
  'cb4b4e6c-b7b2-47e7-b1a9-4006b02980ef',
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
  'Wed, 28 Apr 2021 22:56:13 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e1c6d861-671e-45bb-ade4-c4e6f50ab463',
  'x-ms-request-id',
  'd48d3563-f7a2-4ffc-aea0-2f5284da93ab',
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
  'Wed, 28 Apr 2021 22:56:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7a2c9e3b-6b7e-46cb-9a58-d6ffbbc32dbe',
  'x-ms-request-id',
  '486d56a6-b3a2-4ce4-8ad6-e32538f77e0b',
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
  'Wed, 28 Apr 2021 22:56:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c20c35e1-55d6-423f-895d-3551b0727e61',
  'x-ms-request-id',
  '2c67540c-c246-4ae8-9646-3f00cc95e577',
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
  'Wed, 28 Apr 2021 22:56:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '74a05b00-c27c-4b24-8683-da695f2065e1',
  'x-ms-request-id',
  '040e23c2-9bef-4e46-b5d9-291da0476287',
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
  'Wed, 28 Apr 2021 22:56:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c2923251-a3b7-40fc-a795-760d2a565ac3',
  'x-ms-request-id',
  'f9b86a51-eacf-4d0e-a3e7-6425f6616a07',
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
  'Wed, 28 Apr 2021 22:56:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '94eb8f5f-7458-45ad-b628-5c58de7d06f9',
  'x-ms-request-id',
  '5a597670-c8c8-4cc7-af24-174924c6d691',
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
  'Wed, 28 Apr 2021 22:56:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7d61b9fa-5a2f-4fd6-b888-5a9e951c79fc',
  'x-ms-request-id',
  '9cf614b1-37f3-415a-8073-388b05f50200',
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
  'Wed, 28 Apr 2021 22:56:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b4a0013a-69ac-4cb2-bf05-f76fc0dc3811',
  'x-ms-request-id',
  '8c1d32a9-1133-4272-af48-851240068b82',
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
  'Wed, 28 Apr 2021 22:56:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'daba5407-22f3-4d5f-94aa-10093a6441c6',
  'x-ms-request-id',
  'ba5f299e-997c-4fc7-83be-84616cc610c5',
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
  'Wed, 28 Apr 2021 22:56:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9afe9201-ebce-40ba-9b71-422cd2d02dc3',
  'x-ms-request-id',
  '0397bcf5-fc7b-44fb-8667-16047b7279e9',
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
  'Wed, 28 Apr 2021 22:56:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6ae18425-5986-4575-9d5c-d29a2d22c421',
  'x-ms-request-id',
  '629860ff-fe2f-4f74-97b7-b9a7085524cb',
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
  'Wed, 28 Apr 2021 22:56:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bbf9b4ca-4d2e-40d9-9e65-06ab124cf460',
  'x-ms-request-id',
  '91675319-9abe-4c81-be93-0526447d9806',
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
  'Wed, 28 Apr 2021 22:56:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '325d836b-4d5b-4584-93e7-07093a48d363',
  'x-ms-request-id',
  '0605c9ca-4747-4f68-bf1e-f0aad7d867a5',
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
  'Wed, 28 Apr 2021 22:56:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2310b0cb-bd7d-472b-8127-68143a3861ff',
  'x-ms-request-id',
  'ebded30a-c48a-49f9-a345-ba32fd5261ab',
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
  'Wed, 28 Apr 2021 22:56:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f70c95a-c126-4139-83fb-55eb837d4ee8',
  'x-ms-request-id',
  '16bce430-b3fb-4334-85df-7cb0db762341',
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
  'Wed, 28 Apr 2021 22:56:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'abcc7059-eed8-4125-b923-242998c9192c',
  'x-ms-request-id',
  '9636bc6f-9612-4ca0-ae3d-28a730857041',
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
  'Wed, 28 Apr 2021 22:56:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '120011bf-13d9-4d57-a20f-99015e5a83ee',
  'x-ms-request-id',
  'a547b6c0-3ca9-4157-b1cd-2874a469d1db',
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
  'Wed, 28 Apr 2021 22:56:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9d043ed1-7c77-4150-ac89-0e42067b1ca2',
  'x-ms-request-id',
  '4a7b9dc0-ee05-404f-a415-c3a2b536992c',
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
  'Wed, 28 Apr 2021 22:56:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd8aef32e-16b0-4fad-a923-a23b3057c5e6',
  'x-ms-request-id',
  '33fb94a1-ee1f-45a5-91d5-b045c88f8aec',
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
  'Wed, 28 Apr 2021 22:56:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '54136707-1753-4326-994d-bfee6a35dc94',
  'x-ms-request-id',
  '6ec70a8e-b2a9-4632-8246-0f91ec7dd748',
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
  'Wed, 28 Apr 2021 22:56:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cd23b665-0c79-410a-86b3-ce9656212ab5',
  'x-ms-request-id',
  '37d8cdc0-6a2d-4f39-bd21-be865cc78f22',
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
  'Wed, 28 Apr 2021 22:56:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '46fca0c9-8130-446c-b7a4-6457a90fff7f',
  'x-ms-request-id',
  '25c4596e-aebe-4c64-9b8a-e890fbd8158f',
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
  'Wed, 28 Apr 2021 22:56:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619650574,"scheduledPurgeDate":1627426574,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5","attributes":{"enabled":true,"created":1619650574,"updated":1619650574,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f3d7f537-188f-4c27-b425-cf3013c2f9c8',
  'x-ms-request-id',
  'd61eed9d-567b-4451-aed5-2af17cdc4c93',
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
  'Wed, 28 Apr 2021 22:56:58 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
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
  'b59f4c9d-47ff-45c4-b9e7-97c5c4950019',
  'x-ms-request-id',
  '8000838c-1c60-4a91-b302-916961ff508a',
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
  'Wed, 28 Apr 2021 22:56:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'abf3d73f-543d-4f7d-9427-b4c05b78a080',
  'x-ms-request-id',
  'a41148bc-262e-4745-9812-5f51df2fe106',
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
  'Wed, 28 Apr 2021 22:56:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '85bb11ac-3602-444a-808d-22833f2d5e98',
  'x-ms-request-id',
  'f4782174-9c46-47ec-b5a1-470dd5bfef27',
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
  'Wed, 28 Apr 2021 22:56:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3a1c890-213d-47e0-8dde-cc562ba2ca04',
  'x-ms-request-id',
  'c9899a69-296b-4e21-aec3-a99e431ba947',
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
  'Wed, 28 Apr 2021 22:57:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'aa487fd3-7d81-4fc6-aa59-cdd9c074c20c',
  'x-ms-request-id',
  'ef197862-a0d3-4e52-ba80-b6a864c6a2a9',
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
  'Wed, 28 Apr 2021 22:57:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a9fff2d9-386f-4060-a622-0c8c74d56799',
  'x-ms-request-id',
  '5eca55fa-8f81-4955-b23c-5410fa557df7',
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
  'Wed, 28 Apr 2021 22:57:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '846f0620-f908-4ac3-b086-183c1e208057',
  'x-ms-request-id',
  '5c63a129-39b3-4859-b77b-e10bc426ed70',
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
  'Wed, 28 Apr 2021 22:57:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b1b5020b-1279-40fa-a54f-f866477610dd',
  'x-ms-request-id',
  '7628f098-c537-41bf-a695-1cd1cdcbf60c',
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
  'Wed, 28 Apr 2021 22:57:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f6a9f916-e073-46df-80fb-52d8d07e247a',
  'x-ms-request-id',
  '5f591abe-46bc-4e66-bf2d-c078ef6f38f8',
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
  'Wed, 28 Apr 2021 22:57:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ec95e0c5-edea-43a6-bde0-6eb13597941e',
  'x-ms-request-id',
  '1ccb5d7b-3ac9-467b-be33-d957c4b8572b',
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
  'Wed, 28 Apr 2021 22:57:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2c66ef8c-3e4d-431e-9cdc-95a8ae307609',
  'x-ms-request-id',
  'c2c30a99-d225-4bdc-9445-983ba74e90c0',
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
  'Wed, 28 Apr 2021 22:57:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9fafb54d-a43c-472f-9c81-be57bc0964c5',
  'x-ms-request-id',
  'dfa93937-8d26-48fd-bcc4-746d423a6290',
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
  'Wed, 28 Apr 2021 22:57:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e24908ef-4d88-40af-9596-4c76cca434bc',
  'x-ms-request-id',
  '6bba7a2b-0eb6-41dc-9200-eaf81f07c6a4',
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
  'Wed, 28 Apr 2021 22:57:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e48cc8b0-b809-40e7-ba22-624381ca807e',
  'x-ms-request-id',
  '8f8d8f64-d214-4861-b700-6c9a157e34ff',
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
  'Wed, 28 Apr 2021 22:57:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '023499a8-190c-4ec6-a4ce-7e3912e456dd',
  'x-ms-request-id',
  'af619bfb-5421-4845-a5fe-6bac904b02c1',
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
  'Wed, 28 Apr 2021 22:57:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0de1a422-9ae4-4fb6-a097-93a5ec27865f',
  'x-ms-request-id',
  '9b25e50e-a20c-4434-a4ff-c5718da7a0c2',
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
  'Wed, 28 Apr 2021 22:57:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '74afe8c7-d8db-4bff-a9f9-e6d746c616b0',
  'x-ms-request-id',
  '090a06bd-ca14-4893-a27a-4a476d019358',
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
  'Wed, 28 Apr 2021 22:57:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ad23fd51-a8cd-43cb-9f12-4237a53c1905',
  'x-ms-request-id',
  '4828a24d-697d-455a-b13c-0ec68a511840',
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
  'Wed, 28 Apr 2021 22:57:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a74b78e3-5ac2-48ad-8645-15750f239914',
  'x-ms-request-id',
  '137111df-0814-4e0b-896b-c005325f4783',
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
  'Wed, 28 Apr 2021 22:57:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '684',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '927e3f22-3621-4df7-8106-9ce1738e99a2',
  'x-ms-request-id',
  '57b52acc-92db-4b52-9faf-33e3d590a9ad',
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
  'Wed, 28 Apr 2021 22:57:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuREdZemNCSm5sei1Ydy01UGlGbXp1MnlzRWI2RmJZTUxoak1Fc0QyV2NyZ29MT2F5SG5nUVVsdXZvd25QYzZHT1dReDNxcEludmdNM1haU2o0UEgxaEF4c3FiSi1lcVMxUFpGZDhLa2h4UlFWV3JIUlQxcEJ3RDZZRGIzNGtYX3RReEdjeUhjRmhsZVJuOWxyMWZQQjVTWlk1bWNUdlJoY0tGMEpxcjAwMENzbDIxZVJCWHJVWmJ0OHkyS1JhSGRaSmY4SV95RGRoQ1EzUTQ3ZUhGbHZQMTViT1RxMVVkMzYzbHVhRTBQUWhpZ2FVMHFPMVlwY3RqbV9tV0RUMzNYVnRnYVNSOWFUUjNqNjVQYXZpbzNQeGJlTFZTakhnUGFUYnNpSmFFRGtPS2RLSFhRZlE1dUdacTg4ZmEtM182UHZXYmRiaXlJXy1MV3hOcWlNbURwNGlnLno2SUR5RzhvRGF0bnRma2YzejVpTmcuZmZGRWVTWEFQRHJxSUE1SXZhOEJMX2QwUFg2WnltMUtwbUZDdmJXdVpIR3ZHcnJLSG9qc3FRYnBxcGM4Wk01UGpEdnRUWW9OSkFmVkVJNUoxd0tRdUJTcWdnQ3dIYUZDbFBWemgwRzBkRXRfWUxOcVVGNUtMZi1GLTNEOUdlQmQxZl9CdzdYM1Z3UkhLN2FKcW5WcEgtRlB5WjJmTnQyREo1Y3c0OG12eWc0bThienloWTR5VUxpSzhzTExWN0VRTm1MaHVacEpwajF5SVczdUVvXzI1ZmlqU0o4THFZbHRYRFRwdjB5OG1nWXo2NmI5N0hvbVlNeWJDekJ4N0Ftc0w2QnZ0VnJDMmg1UXpCQ19VUDNOYXpHX0REa3lKODhSTW5YMkx4LVF3cjV3WkNGcXhRMkgwOWJtTjJyOFJzaVpCZERhVjB5RmZYVUZBX0diYjVfZ083Z1NOUnhDNEJ5X3Z4Mi00RGkyTTJRYmFLS0F5czJHZVdwTzBISThtdkE4NXhSVzRHSVhHM1I2ZVVtODhSc0ctRTRPVER1Y0hmNFQ4MTBQN3pkaUoyLWJGWWdybmx1VTFjOWFyMW1NRVJaMmZBcjhmcF9vbEF2alljNFdtWm5QbExfd3VteVNUenZqME53YWt2NzdXUjV4eDdtQ1lHZG5RdW1wVGxmOGFZRzFmTlZnZE5ZbXhQMjFsVDE2Q19IR3hHVVc5M3B6VnRnZjlaNXVxeEFjOGw4a1RiLVRfWEh2azBDUzNqX3JIbUFseG5xS19FU1l1ZTlTT2dlY195WGd5a1lZOFdXNlFjdEl5MDE5SEN4bjFyX2M3VHVEV2g5cV9JdWZoRzZ5azJaRmJvS3ZqU2gxeDlnLV9yQ0F3eG9mdFpyZUo2a0dockx6dGhkYkp1ejhNR2FTalhBRGxVYmR1Z1c3QmVJNkhDaGUzZFYxQW45cUhZM3lxT0xsNEkzWmVBajdyY09KUmtFMGstMUFKV1Z3aGRTbHpMRUN6UENKYkdtZHFIQXdjMG1xTGJhWm1kQzZRUmdUOE9qeGJOQTUwd1g0M0JsSUVIRkhJTGNUWEpPRGNPR1EtYjBFRmlqRlNubXRmZDVURjJJNk9OWnhsV3QyZlAzTDJZTlpxUkt4SkpUcldtQmxwd2JFNVVTbnN5QlBvdS1URldJLThBOUF1MFloLTh3eFVKTFRxd1Jyb050MENETzY1WGsxR0JiUjV1VDlBeDhFN25CamtpM0JnTG55S29hZzYxa3lPbENwSndGYnY2bmpJRXdmT2lWSlJPbmw1eEozV3hIZnhUZm1HeFdEeW80NnVwTFFUMG95Z2VpRlFIVXR4WEtmTnlOWnhlTFQ1X2k1am1FazdGY1pzQlJjUWRpczBDVkhHcGV2Qk9EQTZvNXdtdmk2Nng0a0VUSnF0cEFMcDRmb3BqcDNuZjQ3QjBjS1dYeTlCQnIwcEllU29zbU5FMExGVFhvRFFWM01kRkMtLXJ5RFI0Wm4wUmxCazAyd3g2WUc1eGYyUUxPWi1jQWJBNWdoeFhBSng0YUxwY3RlVC11amJBSkxqT21nUEJDdjB5Q21MM0VCMUlPU2pwNjRwa1V0TXlOcDRENkF2eUU4a2VtWk5UOUdfRnZFZG1zd2lCMXFvb1Z4RnJhNEtaQ01XT05xeHpUakVoa2lrV2lhS0kxMHN5YWdHR3JKbDN4aUxYa2N5dkt6eURCRnhvMmpoYWF0eGptazZrVlNrVk9wUjFncXgtRFN3dUR3NWQ5M0hlVmQ2S0lWRm9RbFEwWkRhUVN3VUxlYVlRVTFqRlhUR3VmNFllYmplaW15TnQ2MHg3TWFxel9oV1pWanB1RkxzUndDYlJZYXAwN3VLT1V3UnNEQlBBdlk1MmptUjNxZnFDNWd0RURNSWdfSi1vTUtwUS1oekVKR2U1aHRETG12X25sX1VKYTljNEVPVVpaN2dXQnRoZTVyN2x5cnFKRTk5ZmxMeWtEOHRrX0l1RHVwOWxDSDB1OUVWakV1a3p2bk1NQUl1SVFkdmpFZEhacl9KV05McVZXbEJKVDVCYm5hUENWdWhXWG0zeENIaHN2OV9JeDhObkc3YmhEYnhyTEZucjY0TGtJWEVEWlpyOFZCSG5VNDY3OGIwRGdscVh6WHRydHdGbHVYVUxPd3FOeE9fOUhpQlBXZ1dpSHg2ZTRING1yMDFjUG4yVElXN0lOMGN1aWIxSmQ5cG1ESERpLXhkaGdyYVoyTXJwU1ZOcmdGeFU3N1F3d3NhZFpyNC1kUFRoVGRmckprSHlpWnFoa0dKd1lzRVY4UXdUb3lpTTMzbG9fNTQtSXR2Q3hQdkZ5VXFKb24wY0tnRDNlbmNjR3huV3RZeEZGWGFmUm5VTzlXb0N0NDRyazVwMmlnelVCODFIS1RqOEdtcnFYbmRoYXd5cDF6MkNtY0dpWnk2dDBuVXVSQmxXbW1jWm53MEdrVGtqYkFFNm80S0R0dXhoTlNwYlpuc2Y1Nl9WR2RLeEtiVmhnZHItelBnTTB0dGhzMTZMOWxDSjY1WXQxRzJGLVN1TFdja0dLdnJaWlY0eV9Zbkh4VDlIRkZ5TllBUEdxUDZ3d2I5Wlh4NDBzZzdvWjVoc0RSRk5DYzZrMzlmQWFFbHd1OFk3WDZTenBtWW9UdElJS3k3T3BteDJuZTY2UzFHYkxUN01pRjk1LXEzdWR6VnhpMTBIV2g2d2N3OGlXQWxQV1JfMW9TdWZCRHUwWkFySUFERmljM2ZJTWE5RkFsb2JYbnpPczB0ZjlPV19HYUVWR0lfaUxsN3dzblhVWUU2eDFudVFFYVhUNGY3Q01CZHhKTUcwY25GaXdSVkt4V1ZqTEdmUUdVWF8yRTBpSmRJZXk2ODdSUlpHZjZRY0Z2VnNoMi1Cenp6eFR3ZDNQeGlPSjUwOC1wUjhyT0xTTUFXbUY5bnE2bl80bUZ1WXZfTktJeVh5NTVkSGRnZEk2UG1abFhHT2VCLTVHWG1lNEJIejZvX0ZvME5CWkk1MjNWLURBX1pGcXJkTFJZTTBLak5Id3E0Qmg4RmgwY3RmRFEta1V2eFRQbEhINDFUTnAwaUpVYmpjN0RING82OXlEdEZZMnEzMWlPMjQ4LU54X2dpOExzWERYV1pkRF81WUJlUmlFbkdYM25ZWkpQUjhMZ29QaEhsRFFIM0s3VDdKMEJQZGhjbEpWVnk1UXE5bHBnam9GT2R1cmVJTWZmeklSWVFIcnp2eWRfXzBrd3h1cnJtTzA0d19NSU11NzJ1RXlLTzRLSTN0d3BpWmlLUGhKRVVlbFlzM0I2dGtQY2FvazhuWE9EdEs2eGJmLXB3eS1Sd1JCa2EtdEFLUlBubkstc3ZfM3RBNG5SMVlKYTJ1ZzQ1OEFzWUdmalBJaFFTYnVKZjVvdktEMkF5dlB4dk5hYXhBblNqNm9obWF6SWFPSF9vX3Rsd2tEM3JJZktxQ0kwVkJacFQ0MDZ4anhkcmtrS2FBNHJTSUNfZFZpRGNMam00cUZPX1FyZ1I1T0w0Ry00ZmtLR2lEaUdrOEtqUzBLVm1ISi13dVdVZkxmYmk2Ykw2TlNQR0RNazZoV3NsQXFvQkZSYWZzbU1ISEppUUVjcTdqWDZtNFFkYkV3YlNiRTdhSk9rZXpzTkx3Vk43WExxTjRocVNzVDNXb1VkdVczN2hBYVJ4Tl9zYThKaDlPYkxKNHZoRTNNcExoMTN3YkdmMkpxM1JpamRHclE5cVNqMkl0SW9UOWNFVHdNcUQ2a1lQSmJ0U0x5dlZaLThRYlNvOGp2Yloxdklpdk5CSWhzY25PdjEtZnhJNWxieUZrS00xUFNtaUtBV1NSUVhyR1pvTVR6Zk13cDJhNkc4LXZ4LVJaVzI5NGFOa1ZCTVZhUXpQUDd6UnUzamlMVXFTUUFmc092NVRScmRlbHlVQy1JdU5TOHFkUWpndUZpZ3R6LVJRWDA0MHViMUxPU09lRmI0VURhNnkwOURDZGp6NERlQW9CN1MwaG1WN0JKc0MzWVhaTVM4VVZGNTR6aGk0Nnk1WUZfbWRvWmRqLUJRNjM1Q1ZIQlliRkZkaks2LVN0dXdMYUlFS2lCakQ3VXlMT3Q4LW5ZNUJWR0NSanBJSDNBWWl0ME5XUXNLdC1acDZFVUwxTlNNNm5ILTBWdFZDNnZOeEdhMlpkSWxFTkkxcnNyWExzOEpkSUJwenZuQThIRUVHbDR4b1QyUlZCcTBfQXR3em15SktPY1RtT0RRQ1BiWjBBRF85WDJFMnc3WEdDU2c4NW95QTNxbDRnTUZYVGpDSkFvTThuNG05VWJhTWpYYnRaTnlBbVU5SEJjZ0t4VXNFVXFJek9nZVFmWWRxcTBsVGY5UGxWX2YwOXpJcUR4Q2puTERfbUYyUmpEckdkRklyYlJiUW4wckpPb3kyWjdnQVRmRzZiU0RXM2xxUE15MXhEVjNES00xN1lGaHREbmRqS08wdUdGcE9ZTDRxTmU0cW9IZVRXWEtqV3k2Zm1sZ2xscTdGTEY0ejR3c29KdmdmaWQ3SjdFSlhtMjNUQXZDU1ZEUkN0a0hIamJ1NmRDbDk3VHpNRzlrZ0loRmFDcHQ1UVFjeDhNc3kxT1BzVXBNSWJLSnduSFpRUmtjN2xJSFE4aFlocEJ1R1NEdUhxYzlQMEIzdVZfbVBmR25sNHg0NGREbklrQWpwaXRBRFVNT2FsZzlkdkZacnUyQy13QUNTY21uN1dlS1kzZlpDSl9ybUdMQmR0TkpSTkQ4WkN4VHNQbUw4NXlLbWJaUXlZS0YxYjNpQmk4dFp2UFFwbVEwZkVtTlNsdDRJT0RybGdGSnZCNFZuZVBSNkFHbFVpU3hnWV9aakFPTjNTNFQ5ZzIxMThCb0QtTFZjWElJUkZaSk5QWE5iVFFidkJwM1daQy1JMHZucXpTTVlCUVo1TWZOZjNUenV4X1g0OWJOSVYzekxHTC0tS0ZsMDRQT3owNmVQYmxLdTlrQml2M2VlWmdVTERkVDlzWmFpSEMwU3FmSFBwYUh6cG1hZzNtTnJJcFdBZGZMUFItLTF1R2t2M2EzX1l5dXdkOUJmYVhzRVU4d21nMDN5Nm16cjM2S0NlWDRrU1NpNl9lLXhjNlUzd3k3cUFpTjlyQTJNT1JlSm1JZjBxMDlTam01QjVzRUhCZ3RuUnM5a0hIbHIxLU9Pai0ySXpxTEhCTjBDbWpMbGE2NVNHU2ZYNE9KX1VIN1Q2RFpQYVFIMWVWSHU3QXdTUnhGenpTR3BuNUx4MVB6VG5hWTk3d0ZzV21KNGNJNEkyaDJjRXNZLWk3RDZBci1jWTVuU0E4d2RDZ3lvelEzS2s1bTlEMGo4cWhDajhHSXdIVnNicFhjTnhRaFB6d1dDX2ZxdzkyRVhVYmNmYndNQ2EtTjkyeU4wZ2RCN2JxSnNQNllTY1dfTGw1M3o5Vm9zU0txaXpfYmhkbTctbi1fN3E1OEtJaTdPU0VXT2cuS1ljV2JkWkdjUVdpZ0g5djc0WmZicW5ubU9ULU1yV1czamNMcER2a0dMaw"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5","attributes":{"enabled":true,"created":1619650574,"updated":1619650574,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'd539369c-f34b-4c75-ac03-7c30c360c4e9',
  'x-ms-request-id',
  '6696d6bb-1498-4b14-99d3-347597f553c8',
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
  'Wed, 28 Apr 2021 22:57:37 GMT',
  'Content-Length',
  '285'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619650658,"scheduledPurgeDate":1627426658,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5","attributes":{"enabled":true,"created":1619650574,"updated":1619650574,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '6f1e75fb-46c2-4b0a-bd11-b5e72f04817d',
  'x-ms-request-id',
  '66e109f5-f4a2-474c-ad39-2b7d89ce2c03',
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
  'Wed, 28 Apr 2021 22:57:37 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3be26132-ceb7-4132-9850-0a7fab14c4a9',
  'x-ms-request-id',
  'd2ac82c8-ec83-41d0-ae43-3accd7f68620',
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
  'Wed, 28 Apr 2021 22:57:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bb05939a-20dc-496b-9b37-54bd5f9ed906',
  'x-ms-request-id',
  '911e0aba-cd88-4832-a9b6-2d0303b67721',
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
  'Wed, 28 Apr 2021 22:57:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e5af198e-fb4b-4edd-94df-d76aba156b01',
  'x-ms-request-id',
  '9377c656-7e34-48ab-ba00-6a4b3b6642b7',
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
  'Wed, 28 Apr 2021 22:57:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f0175b46-861b-4c87-b833-3225cc74db23',
  'x-ms-request-id',
  '6e50a2b5-1a38-47eb-b1a8-b1670d0421e9',
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
  'Wed, 28 Apr 2021 22:57:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7a4de57e-f2bf-4ac6-b953-d96de39145f8',
  'x-ms-request-id',
  'b1291f26-1d9a-4abc-a32b-57463bb5f5dd',
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
  'Wed, 28 Apr 2021 22:57:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b275a166-67cd-4218-ac8e-6ce4664ce2e0',
  'x-ms-request-id',
  'c09f5516-2501-46d0-8f93-65225e45fddc',
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
  'Wed, 28 Apr 2021 22:57:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b19732c5-97e8-4ded-9f86-91c20029b246',
  'x-ms-request-id',
  'e0564965-dc81-4583-90c1-29c67b187a51',
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
  'Wed, 28 Apr 2021 22:57:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cc516baf-4fe8-4de6-9b95-7074dc5e88dc',
  'x-ms-request-id',
  'c629355c-5d7f-4de3-b8b0-19597519f37e',
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
  'Wed, 28 Apr 2021 22:57:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd474bd4d-05b3-4d5f-96a4-5563c510072b',
  'x-ms-request-id',
  '6f91f0cf-3cb0-41ba-a8d7-850f00bf616b',
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
  'Wed, 28 Apr 2021 22:57:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e61c59d3-fb01-4293-97a8-fbd7013c9714',
  'x-ms-request-id',
  'd976400b-3783-4067-b805-41d23da5d2a3',
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
  'Wed, 28 Apr 2021 22:57:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0eae2d60-615a-4b53-aa3e-0cfd2f08211d',
  'x-ms-request-id',
  '8ea67963-de43-4677-b341-514c248d6137',
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
  'Wed, 28 Apr 2021 22:57:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fe6373d9-7c60-4874-9ce8-8cb1874912fe',
  'x-ms-request-id',
  '5edc6365-d59a-41e5-a32a-927908e516e1',
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
  'Wed, 28 Apr 2021 22:57:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cdcefe93-961c-45c5-97d6-e980bcd67fdb',
  'x-ms-request-id',
  '2200e10f-df2c-44ad-accf-377fde11be6b',
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
  'Wed, 28 Apr 2021 22:58:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '50cb5130-5fb2-4519-992f-5faf08ce0be9',
  'x-ms-request-id',
  '37528a8b-d3bb-4e93-af3a-63242b364d5c',
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
  'Wed, 28 Apr 2021 22:58:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a30c1fa1-062f-4f3d-ac72-bc23277a31f2',
  'x-ms-request-id',
  'd5cdc33f-2795-48ae-96a9-d38244e72213',
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
  'Wed, 28 Apr 2021 22:58:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'df0f851e-d272-4b37-be2a-4717be70e6df',
  'x-ms-request-id',
  '5edbf332-46b9-499c-ac7a-c8bb653d3844',
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
  'Wed, 28 Apr 2021 22:58:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eb01425b-16ee-4043-afd5-f7998a153781',
  'x-ms-request-id',
  'fb594951-0f74-46e2-88c5-7134d8b46da6',
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
  'Wed, 28 Apr 2021 22:58:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1a2d400b-f21d-47e4-8fcb-aa868ee61dbe',
  'x-ms-request-id',
  '49e7616a-7248-4ad5-9585-ec3a308f06de',
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
  'Wed, 28 Apr 2021 22:58:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd05abdb3-58a8-4acf-bea0-3a41a3620bbc',
  'x-ms-request-id',
  'b2b1c069-a7dc-4913-96e9-63cc932a51e2',
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
  'Wed, 28 Apr 2021 22:58:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '66b98a30-b304-49c5-9b96-660d95e8a852',
  'x-ms-request-id',
  '968e56f8-feab-4036-8371-0ba5360a5c2c',
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
  'Wed, 28 Apr 2021 22:58:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8563af22-1e8a-42ff-8e6d-d519bec3f571',
  'x-ms-request-id',
  '2401f007-147e-4559-b19e-13bcec9d0e4e',
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
  'Wed, 28 Apr 2021 22:58:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e3784309-cb2f-48f7-84da-b46639ea2b67',
  'x-ms-request-id',
  'bc6bbc6d-4b83-4db0-83f6-9c3ef2c6ce95',
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
  'Wed, 28 Apr 2021 22:58:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '15a7ff64-9cc6-4d26-be12-058ab553a9cc',
  'x-ms-request-id',
  'b1c34a07-8c73-4fc9-a2c2-87fdfc06f27b',
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
  'Wed, 28 Apr 2021 22:58:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '35fcd9c2-33e3-4f93-8dd9-81d8413fb4a8',
  'x-ms-request-id',
  '4f3a7ea4-14eb-4fa0-adf1-f5d6c7fe1e76',
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
  'Wed, 28 Apr 2021 22:58:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9014d902-044f-4a9f-acdc-eb3b8caad31e',
  'x-ms-request-id',
  '9265471b-a427-4f01-802a-b9534b7f4d3a',
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
  'Wed, 28 Apr 2021 22:58:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3f7a7be4-b045-4b02-ace0-908e04865138',
  'x-ms-request-id',
  '6116e74a-d190-443d-b8ce-12d1beb8254b',
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
  'Wed, 28 Apr 2021 22:58:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e214f9f7-a431-4ec3-a984-11f5e402cea0',
  'x-ms-request-id',
  '7b63121b-28e5-497f-adce-e8ec08756ad5',
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
  'Wed, 28 Apr 2021 22:58:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8d21f0ae-4011-4d3c-a815-f20f7870c31d',
  'x-ms-request-id',
  '15a142ae-00d9-465b-82b3-c8d28c954c2f',
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
  'Wed, 28 Apr 2021 22:58:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fdf71070-317f-463b-b620-3717efd65fd0',
  'x-ms-request-id',
  '2e0db55e-c397-408d-b0bb-6a88d7db0e78',
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
  'Wed, 28 Apr 2021 22:58:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '33c15ed2-c685-4242-8311-0120864ee1c0',
  'x-ms-request-id',
  '6587b10c-3dd1-4730-aeb8-337726f64e1f',
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
  'Wed, 28 Apr 2021 22:58:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9ad45cfd-1262-455b-9cd8-6dd4e280faf0',
  'x-ms-request-id',
  '29185c3d-a977-4d96-bd3a-ed76b9b3da22',
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
  'Wed, 28 Apr 2021 22:58:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1bc8f55a-39ce-49f0-88cb-2f3f1499c471',
  'x-ms-request-id',
  'b1fe86b9-086c-4d86-a964-b2cc8cc8e84d',
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
  'Wed, 28 Apr 2021 22:58:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2ed9280a-3c26-47fc-b482-59396036b0cb',
  'x-ms-request-id',
  'f95b96c6-e520-4e16-9a2a-316280b16810',
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
  'Wed, 28 Apr 2021 22:58:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f0c97628-97ea-4a5a-a150-d486dec16b65',
  'x-ms-request-id',
  '4867ef92-22bc-471c-b482-67fc8a00eb3d',
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
  'Wed, 28 Apr 2021 22:58:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8bcd648b-1b65-4536-b641-4179ab311173',
  'x-ms-request-id',
  '3f593823-0f6c-4079-84aa-dcb1260b0e45',
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
  'Wed, 28 Apr 2021 22:58:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '33066705-baa6-40ae-b3e1-97582e2752f9',
  'x-ms-request-id',
  '69af3c86-f7de-4780-a648-ca3ec9cf59cd',
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
  'Wed, 28 Apr 2021 22:58:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '091235e2-5ec0-4b09-90ba-ade5aa7fd0a1',
  'x-ms-request-id',
  '03d43a5a-eef5-42c0-816a-0ccc1797556e',
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
  'Wed, 28 Apr 2021 22:58:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd221961d-717a-40f1-8b56-05134f1d1c24',
  'x-ms-request-id',
  'c233ba65-5fe6-416d-a380-6650281f665e',
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
  'Wed, 28 Apr 2021 22:58:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '21b50c23-8036-44c2-961b-5a660c5194ef',
  'x-ms-request-id',
  '3edbc91e-28a9-40c5-bdc6-3f14300c6c98',
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
  'Wed, 28 Apr 2021 22:58:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0d4bc70f-6431-4394-b2b5-cf3dad816e72',
  'x-ms-request-id',
  'f520a262-82e6-42f5-970b-f168ef0d3bf1',
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
  'Wed, 28 Apr 2021 22:58:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2f5cf970-7204-45c3-8a04-1c09c587d82b',
  'x-ms-request-id',
  '20315e93-bd31-4467-8a12-68b8329c0f1a',
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
  'Wed, 28 Apr 2021 22:59:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6b225d01-fa53-4599-8ccd-6b25e3a9f0b2',
  'x-ms-request-id',
  '63a3fe78-a2a3-4f75-bf82-adb983e819cb',
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
  'Wed, 28 Apr 2021 22:59:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canrestoreasecret-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '132',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b1c7bebb-5b23-4057-b2b5-1e3ae0368c55',
  'x-ms-request-id',
  'c2c8e922-141a-4a58-896e-65e0bd6e7ffc',
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
  'Wed, 28 Apr 2021 22:59:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619650658,"scheduledPurgeDate":1627426658,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/0725931897d6404abcf13318f4d1d7f5","attributes":{"enabled":true,"created":1619650574,"updated":1619650574,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4cfd732a-4fc1-44c0-a168-f4aa521cee96',
  'x-ms-request-id',
  'a9f0b737-5735-4906-93db-2d0f021a053c',
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
  'Wed, 28 Apr 2021 22:59:06 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
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
  '81e79858-a5c4-4e1e-afaa-a14f68e251be',
  'x-ms-request-id',
  '135facf2-d292-4b7c-8e42-1ae4254f2fe9',
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
  'Wed, 28 Apr 2021 22:59:06 GMT'
]);
