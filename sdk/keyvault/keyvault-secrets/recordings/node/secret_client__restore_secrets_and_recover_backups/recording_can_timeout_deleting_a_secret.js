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
  '2d4007d0-827c-43d4-817c-1e0d331e2e8f',
  'x-ms-request-id',
  '53688911-0ecf-42a9-838a-0feb30799c53',
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
  'Wed, 28 Apr 2021 22:59:07 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '5d7726b7-1d24-4984-9f64-df468c5c2500',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ags565BX9kNAvFMBrxPSoDbmR1YbBAAAALLeG9gOAAAA; expires=Fri, 28-May-2021 22:59:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrdFJf0quFFzIHHj_1e5QNhcplKpe4uf2XwGjnXFp8I5LDUpsqVIwrS4--QftHv_hy4r8e_i08Tc33iqseJk-at86z97DFB0rCAsFbtW2oJf8XAsYrYHvDCihRE47FVdEoxZUXjfevAZ0_p_Hb5LHKKXOwYOM-jE9cI1vjwkU4plcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:59:07 GMT'
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
  '085f4f7d-8c01-4e13-9607-f708b7b41b01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ags565BX9kNAvFMBrxPSoDbmR1YbBAAAALLeG9gOAAAA; expires=Fri, 28-May-2021 22:59:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrKsiKFnv9yveSXUcuwAqYEh0F1xfP3JlZIJzSSW5pHgZ_Cb9mdstHhpR2SYOEtdkGJE_3Iuqcw-9zkxIOxVwxuicN1mpZjiPtB12NexbqGvuGEtC_BzBkCTI-tS_7R4HLtU0twe7Vwng-dpyhYiwmxpyYToVceFGHCBBaI_fj9vogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:59:07 GMT',
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
  '076e25e2-b1ae-43ce-89f1-08dd3bae2a01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ags565BX9kNAvFMBrxPSoDbmR1YbBAAAALLeG9gOAAAA; expires=Fri, 28-May-2021 22:59:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 22:59:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/0ca838a142f44b4584ed4cff7397c81e","attributes":{"enabled":true,"created":1619650748,"updated":1619650748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '2d4007d0-827c-43d4-817c-1e0d331e2e8f',
  'x-ms-request-id',
  '00148181-16e5-41d3-a643-43fd4c2e443f',
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
  'Wed, 28 Apr 2021 22:59:07 GMT',
  'Content-Length',
  '307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRHAwV1JMVXNjR0ZNZVZuMGI4dEVlT2x1X2szSjlfV0QzS1FpbDFZSlpOWWU4enBvem5wZkQ1U3IzNVY1bWdvTHA0emZhTlVyNTlOdmJkaTBPMW9sa2dFSzhJRHdRMk9HQjVnNktNUFlqeGdWcFNLSnZsMEpQTksxb2s5LXI0N0RBUVBFbGM3UURVNWxteVh1eE5OQjNpMjZoMjVyQWwtaTJPMEZKdjdtTGFDUlkxdGF1NmpuUHJCZHBzMUwxcHJTQ1Z6Qk50aDJhdnh0QURzaXVRTzJzd3JWQU8yN3BFMGxMZHlfNFZVYnluVHpiVHR2SmVoc1BycWRwSDN5RWl2R29VQnpJcHpZNUE3RzVCVEItMXNkT2ZBNEEwRlBhV0R5SmlZTXc3OHUyNjFvQWVQRGo3UTd0Q1o0QTlMVnZyV1ZXalNuT0ZkOWpUZnROSHJUSDBMMXZRLkI5TXZnVHBINE5lWWhObjRGYzU5cXcuZnNyM1k1bDk2d2pmcjlMMVpndk5UR3l3OXg4M2c1UndhT1ZVRVdnS2txenp3Ry1Ic1doYUduVFcySXo3VWdoNnd6MlhmblFpblZITXhWQ29oV2h2T2tHb2NMclBBS3FuSFdzUWJ6Vkc3ekpmY2MySTRRcGZsZWJZYmEtbDgzU3dMek5hUU5BQV82NlhMWlRCVXlBVm5ONExqWWlfbXNIbWJjOHdfeG9ieFZnUXVGbzdZM1lrMXV2OHgwN0IzT0RDT2NTZldoUTZlWllIYWtZbXFxcG9aNURROUFzbW5odkRPd3lPSE9YdGFBaThxcG9BbnV6bmVxSG5RRDU2dkxES3dhNGFQSWdtUnZodDJ4b1JXSWQzV1JtWGdtVUViblF4VTBlYzFmc1FSR19qTXlRZmliSnZxbGZiTEJmM0V6Vm1xMUQ2VEhmcWh2ZmFDOG52UjFCRjV3M0N5Wks5S1NHdXNOY2t1LWcxcEZyd29nVkZOS25iNldsN216RHRuejUzYkhrSGo4OGp0OHI4bWRidTJ1N1VMeWR0NU8tdHd3OG5QN2lyNzN3VWZUSWhVeDBmV2lEOUVTb0I2Q0JoTWtqSzMzV3g0VDR6VU01aTExcXhmdkJveV9vRWZFNGdMZmRnTUZ6aWowVWxDeFprdWNoOTV3cHVLeWxvdG54UEZqTVJhRWRZYXBtUFR3VU8zcWotRWY3el9rQ1pUdFZFZS1SNGxNQlQyU01odXd5ZWotRzhjdkVYWkthNEFWWUtiUGVMLXREMnF1QlF5WUdwdVBEeEQ0cUdRX1h5Z3c5QllzQjVLd2tsMS15Z1QxeHpYODg2Qm9pa1hhQ1RiZFh0ZWtSb3dJektGWVRRZnQ1VFVJT2F5OUVZOTBOS0FIWlpQZENIQUVkXzRxLUZhODROQkZKQjNQV1hGRE5aa0ZoRkVmSmZqSVI4Zl8tOGw0NklsazNlOWZPUEpXNm90dkl1YmI4ZjBzenpVSFlyZWJyNzV4Qk1lQUtsT3lQeGhFT1pXUFQ5N0hCYVBETVl6SHpDS2hTMEJmemhudW1ZdGZqUTFGVEpzN0tocXROSDRVNFFaZEdhMmg0UlZ3N1ZSRWpvUHdNcGhtUzVvT3BvVFFYQ3NNbzlxdkU2aEJIRl9McmdIM29Id3p3cFNaSVFBTGVGZlJkcnU0M01xQW5adVNWbjUybVM2b1Y3cVZTOWNGaFJPRFF0ckh6cW50ODhhaGtuM183OERKRkJVOUhlcGlVaWp5cE9PbWpIWnM1RUpJTkI0SEo1ZU1tZG5KaHl4Y2hjS01iZVJqVkdqX2dTNnlodG1xWUJxQk1fdFJpVHQ0SzI4U2FHOG1ndVVXSU5hTURVRkl3VkZpQWM5eVZkWGlfM0VobGU4SkY3Ujg5Z0tOQkQtTnlSOXZvUC12M3dRaVNMclFPTDJIeWhXRXJqNHFFZUdwNmFJSlptdUZQRzdhSDF4Zllra1VOcXZZMy1VbDNEMTZHdWdmN1JONS1oVlZPeWdQX2ZLVjM4TF9meGNQakxlWHk0OEU1Z05Jb0lmSEJaZm9Rb0xXZ0FTR2kzQWhydlh4RkU4VjFnMW81d2x0LWZsYmtEbEJGVGhoeS0zNHV5U091Zkl3QXZCYmFUNS1COWNrbHBwbFVXaWdsSWxmdndWNTVHZ1dTREJtWnNqb29UQWl3VjFYQ282cS1qQnNmV29LN1VsQlRjMTI3RzlfQ3c4eHJ5WnlVbjN1SHlvY0ZoSGxkMTg4WDBEamR6TXFrcElaWV9EVzNNSi0zLTluMnkzaEdmTG95TnlLMFg2Tm9fZTM2WENwVlRURFNzeFJTUi1wdkxHR0NHREZDU2lsQ2Fza3hIUHYyckVBWTFFVjh4a1lRdFlXZ0p2aGxGUWtWQkRvNUh0b0RzY2otWWRZVnFKU1Z0V01rU2hqZzNnS1hia21qVmhuamZ6SVBhQWRESEVPOGRWbVdiRWlCTmROQ09EdGExbmRzNU9HcG8xVWpZYVpBMG1URTBwRUE4R0stZ1RGZE5LMVZoSW1GTk5SYWVTejJXVmZJcGo2YkVCdUdWZnZCWjA0VC1uZ1YxMGhVQkhRRm5RdDRBOHpXemlSRS1jeDY1cDhROUh6NWV0ejZZbDNGZTM5eElCNG5UdGR2WHRrV1hwMC1maHVRZEVGbWZDdHotMEJFSmJwbXZCT1BfREtFX3FPUGkyRUpCRGY1OC1icXlaeUJkODhKNmdxVEVIU1R2T3lUOVJRdm04emxLcUpHcG9DRTdjcW9nU0FCeEc4R2liQXZjdkp3UWVvX09BZG1rS1ZOMmd0Ylp1UVlFWnY4am0zUmNDTTlCRVEwajBzSkU2V09Gci1CRnJBTjBkOXJQc0FYR05xT3I1MkdUVzJpNGowNlllNjVTelhvanN5ZDNvcVY4RjUySGlSVG9IcGhKaFdhRTVCT3Z0c3RNLVJ1VHR1M0VieDlSNkFJd05pcWxUMDJiVmE5OThUSnBfLTBNZ1E0a2p5ekE3a0NwWFNFSlIzd2hrdTh0S3A1VVFfdTJzaXNEaVFNcHh5d1lHdTR5MXlXZ0cwYVpkT3U2ZFdxb1h4OHZINWZPLWl6dU95a0M3TXVTX3lWdlUzYmVqT0lhVU5zZ1M3NmZSTXZEWTFYQi1HTmJpM1NOd2F3WWE4cUc3d3Q5bnR3NlNzLUY5N2ZwZURVR3NCcnFUUUU5TERYU3Rzc2VtdERhaVB1Q3o3UnhINkNxaU82WkUzR2ZaNlMtSG5ic2hqSzBvaVo1d3NkWFBRYzI5SVM4eWx6YlZRZUwzVjJ4YXlmRDJHNXRrVldfRGhkWE5SNF82XzhkVGdFWklMSlJqck9RY0ZJbTJ2YnFTT3l5MklZSWNKZVVWNzVlME05eTVnWmIycDVId05lcjVyVzRsWGE2SlJHc09OeUVXazV6RGZmd2ZSV2FjYi1JWW1PaUJGRkpDbE8xSDh0TjJhTlRHZ2VtcV9vei1PWkxZNGpfeVJUbVBIcVNfZVVlbC1mV2JicHF3UDhsTGtycG1zUm5aTEllaUpSTFQ1aDVzNmZXaE9pSm9nRDd4SjFsMk9GempDUF9UU0FuWG1qTHVNMW9HbjFmYmkwcnJJanJwVWVqdWNWUjFlVlFsMVZqTTJwSGRseENoNnVwR3U3eTNpMWdXd2xZS3M0VlF6ZlFWN3lrYnhES1NHSDJJRFVZX3hJNWU0NS14NTZYbGk5OTU0TmtxUlUwT0Z6TmRoR0VHQktVWW5Wckd5RnRQb05mM05pUEEwNmU0UE9ZbGRXaXNKaXdqcFhzem1LQnhrSGJ1OE14XzJTMmI3UkxPbUhUQTZUWWZQWjdiV0Y5Rk0zemFFcWlYZW8ydko2QmRxSTZkQ2RwV25lc3ZjY1ZtMlFwejIzcU1MZG9RdnR0dlNtbGhSc3ppT0ZzbmZhS0VQX0dmZFBrVXdQbUN1NWZPOXFPck1qVFRtRWp5SGtlM05neTBpcmdNMnVtUGZpR2xrWExSVUtvejYtTzJ4aXVZMGI0UklLX19fWUpnR25vVDdRNXQzY1lfUDExcGhGUko2Rjl4REpEWmxOUkRWV2N1TlI0b0ZMZWVLRGM4YVZld2VpOUgyQmdpRFRPZjJIeVUtTUY4NTV5dTBvQmxxWDczY1FSMkQ5SWdzY0dpOUxGREI2TzNPZTZBNGhDNTV1NmVzUlhRa0t4eXkyNURJODh4WGxKSHVtYzZaYllLbm5ISWhwOFE4UTg3NVh3RDdKdkFLbEhCZVF5ZXhucWFhSEVpV2tWLVV1OURjbkU1Z3FoMm1USjR2bXBCY1RGNG5UTGJPemVrXzlKUVZ6TUV1TDdnUFUyTmI0S0NDSXIwNXJuN0JPM3hWemlpSmtWYmRiS29GVmduZGkxOWVaaUN6dkRDOHRndE1LSmtUUFZwbkw5d2pyQjBqVG5JeG5iVFRBcUhoZk9ESklJaE1HYTJnWUhoZEo0Vks4M2FvY0xaamg3OGNMUFZvamgzVlA2aElVWGlCejNWVm9QX2g2cmlNd1BBeEdIS05WR0hvY3EtWGt2YmJUWTF5NnJ3NzZZODlmbm83SzVvV0pES1VJdGRvdGNEU044ZnIwTG1hSllaYmxEalNwOUJyemlHUVBIZ0tIcWFITFdpX2ljY2N5aVFRYXRwdVpSYnhRTndqbzA2UlhUWFdVQVU3RHJ0UTVnbkxlb2thQi1XaFFvZWQwY25waVQ0NTZpYjd4Y095WmRUUUwySnoxaTBVcTVvT2lMZEFNOVA3dlZBNnRLd3djRGpsWExzdDQwVGtwRVhzajZNWFdEcGpSbGFadnRhZ3o0OUhoTTNPY1V1XzFoQ1NxRHF2VDlsbkdBN2NUdFEweS1HMEpNQURRNjFJd0tvYWRTUEE2RHhRTVVoQUx0RHVXVFRGWEM0VGRmSnVHaE4wQUdIc3VJYVpXQ2hKLXBhNmt3S0MzVlUwX3ZYLUgxNTlSVkpDQTNkWGZSaW1jVFl1U1VadkxMWVlYOFo1VnNSakJuWFJPeng3cm8zRG95LUFuV0hVMU0tZU5zMzBCX3JJSG5mSDZoei16dXJLU0NkdGhneWNGYlpJWmpXWm9DVWtsSFhXX0g5VG5EMTh4N1NESVl6WGVLVGJzaTZSLTNWcE1ia1JET1lONjluYWVkRzdrZTZXTlFMSDJ0QzlLSi1VTnVBc2lNNl9WZUhFZzJudjRZbk9EMEhweHpBQ1Rtdm82R2w4SzU2aG9iZDJSWmJyeFp6UktLcExYdjZPNTF1WmNPdGZ3YkludWVTU2tzTS1IZURSU3ZRcnUxSE9rZlBheE56OWNUSi1lcV9jS2FfTXBSdWRXQVVzemdfR2NVSHVsMDkzNy03cmRHenJlQUdlV1FlNlpiR2d5X0hXSjYxTXBWS3pRU1pGZWhJQ2FWdzJCUUVLOElXT2FIcE1Db1EwTGpoaTVEWDFVYzliOHpDVWc4eVlvWVE0SDNDNHFsVmpLSVpXWDZzODNUaElvejEta1FEaHB2dFJYR2FzMlFmNkdZRTNaaWZDVG03bzAtMGdvUU5xWmVYazJmOEM0bzlLQm9DZDhrYmtZZEtLaWNyOXZkU0FNYTdzUWNQSElYelVFZl9oS2N0SjkzdmZ0OWZkcTMtUDhYaDItYVVkbkVYak41VnA0QV95QmkzeE5HZTN2Z2d4YlREb2xZR1dXOUZONWFfVXUtR3VEb2ZTb1N3cVpkTXhSV0I3bjNHMkdNV1VxR1dGQkRGV1dkZEh3X0tKbVNEYnNwOVFZcXphQU1ZWnlveDNiaUVaVk4xOTBhZFhZcXJFcXh5Wkh1cHpFUmFzaW1FeHNmTk1DTzlHQlhia1lBbG5Vc2RxLXhJMjZWeWxjY1NOZ01neEZKWWlXVUljZF82WXZyZmVGVWM4eVNBemw1MXlySmsyQ3luSFN1SVduam83dFdfckRjRGg0ekpBYlVZUVdDVkxCeXhzM1lIRWliYjBSUzdOQUJtMUNsV2VrOW9GM0ppUWtXSzFvWDZhWTYtMncubkNkd3RxOUdqTHVDTkswWjRMRnBPUGlkQmVWN1VEWmF2QjhkdzJna0c0dw"}, [
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
  '97fef371-b0ee-4e50-9b94-720e0808b906',
  'x-ms-request-id',
  'c0779368-eca5-4447-b3ee-29b818b62a22',
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
  'Wed, 28 Apr 2021 22:59:07 GMT',
  'Content-Length',
  '6294'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1619650748,"scheduledPurgeDate":1627426748,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/0ca838a142f44b4584ed4cff7397c81e","attributes":{"enabled":true,"created":1619650748,"updated":1619650748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'ecded5fb-3094-4bea-a90b-3b36d551a28e',
  'x-ms-request-id',
  '7472dcd0-20e9-43a7-90d8-3697f29232bd',
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
  'Wed, 28 Apr 2021 22:59:08 GMT',
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
  '496af70a-e907-4460-a270-525fb9c76e68',
  'x-ms-request-id',
  'f9cde002-32a4-4e2c-82ef-cf9a3c153318',
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
  'Wed, 28 Apr 2021 22:59:08 GMT'
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
  'e280d8a2-1842-4643-bc44-a069cc684fbe',
  'x-ms-request-id',
  '7da42ce5-8dbb-450a-b060-47f3e105f1d2',
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
  'Wed, 28 Apr 2021 22:59:08 GMT'
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
  'd9a62d31-08a3-4dbc-bb40-6c1777a285f1',
  'x-ms-request-id',
  '444da640-d0d4-498c-a8cf-6c4987b79af7',
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
  'Wed, 28 Apr 2021 22:59:10 GMT'
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
  'f49861ff-20f4-467c-bd97-28e51a593303',
  'x-ms-request-id',
  '8847f51d-4e44-48f4-b597-4d2d4702b95f',
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
  'Wed, 28 Apr 2021 22:59:13 GMT'
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
  'ae394b58-3961-4b61-aead-f38199b18a9f',
  'x-ms-request-id',
  '9e66738d-93fe-4dc5-89e3-615f3b9ff09d',
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
  'Wed, 28 Apr 2021 22:59:15 GMT'
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
  '533127f6-80db-44d6-a84b-28517dcf4dca',
  'x-ms-request-id',
  '7b68f935-d5f7-465e-a0bb-893bbdcc9e2f',
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
  'Wed, 28 Apr 2021 22:59:17 GMT'
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
  '673b237a-ac82-4607-a73c-6ef736f20fe8',
  'x-ms-request-id',
  '1706bc49-9cce-4277-8ff5-105875d33258',
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
  'Wed, 28 Apr 2021 22:59:19 GMT'
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
  'df839a16-8748-48f1-aff1-8cf71d5069b2',
  'x-ms-request-id',
  '610d20b6-3782-43e5-99a8-7850c5ff5063',
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
  'Wed, 28 Apr 2021 22:59:20 GMT'
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
  '51c4fc56-6017-4971-af4c-99ee5794a42a',
  'x-ms-request-id',
  'dfea5ca4-dc02-49fb-88e1-18291e7c5e60',
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
  'Wed, 28 Apr 2021 22:59:22 GMT'
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
  '428c5286-1e98-49f6-a64f-b516e5146dcd',
  'x-ms-request-id',
  '2ebc374c-66bb-479f-b288-8657197e7196',
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
  'Wed, 28 Apr 2021 22:59:25 GMT'
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
  '68d3fb19-f8ea-460e-af5d-abe92f85c793',
  'x-ms-request-id',
  'eb6c3851-25eb-4feb-97ce-17c76183e7f0',
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
  'Wed, 28 Apr 2021 22:59:27 GMT'
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
  'c82e8388-0095-4b3c-ba3f-4bf48d2a7980',
  'x-ms-request-id',
  '459b67cd-61b0-4ac9-9c59-efde982e0a2f',
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
  'Wed, 28 Apr 2021 22:59:29 GMT'
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
  '87cdc5dc-b488-4621-b67b-a3d216917efb',
  'x-ms-request-id',
  'ee60418d-1790-4c47-94ed-8bd43cd4d23d',
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
  'Wed, 28 Apr 2021 22:59:31 GMT'
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
  'b2d9f2ec-3931-4a00-8eef-cdef391a11b7',
  'x-ms-request-id',
  '2e3489d7-9773-4fb3-8230-b30b51d0f403',
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
  'Wed, 28 Apr 2021 22:59:33 GMT'
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
  '67c594df-382f-412f-b198-ef2a6a9e93c8',
  'x-ms-request-id',
  '239b53af-7f20-4248-9f47-700159884b46',
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
  'Wed, 28 Apr 2021 22:59:35 GMT'
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
  'e72e2172-dd65-4411-95b8-64375d4c5b95',
  'x-ms-request-id',
  '56c01aa8-02ce-45b3-8697-030a3e2aebac',
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
  'Wed, 28 Apr 2021 22:59:38 GMT'
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
  'fb6fe03f-e9fd-498f-934e-7c863807cbf2',
  'x-ms-request-id',
  '842de745-6a7d-49fe-bf0d-8f6e5bdc6fd5',
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
  'Wed, 28 Apr 2021 22:59:40 GMT'
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
  '60395480-2aff-407e-b199-30f6bf99cd1c',
  'x-ms-request-id',
  'dca687ba-f247-4d88-9d5f-1536797bdb80',
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
  'Wed, 28 Apr 2021 22:59:42 GMT'
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
  '1e3a1607-4244-43c1-a41e-57432c8e8924',
  'x-ms-request-id',
  '33f59517-cc3d-417b-8ad2-8e75b1576b79',
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
  'Wed, 28 Apr 2021 22:59:44 GMT'
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
  '6dd9271e-dc73-4191-8c3f-0362ecbadbb3',
  'x-ms-request-id',
  '6460919f-232a-4d72-889d-0bf6650c6dd4',
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
  'Wed, 28 Apr 2021 22:59:46 GMT'
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
  '70ed3daf-ee78-4faf-bfdb-fed900df2f92',
  'x-ms-request-id',
  '772eeec8-b1a5-4dbb-857f-0df9db19f705',
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
  'Wed, 28 Apr 2021 22:59:48 GMT'
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
  'cb937503-ee8e-4a98-b5a3-e3cfa44eb8f9',
  'x-ms-request-id',
  '05ee2ca6-40e1-4739-bac6-abe7babcc0fe',
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
  'Wed, 28 Apr 2021 22:59:51 GMT'
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
  '3c2f8cc7-51ba-4f10-9c11-4e477890e412',
  'x-ms-request-id',
  'ba865044-9f36-4f65-adb6-28ba97f34ec9',
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
  'Wed, 28 Apr 2021 22:59:52 GMT'
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
  '8d8f0d93-7058-48a7-b5e1-848449f1aecb',
  'x-ms-request-id',
  '0c7d72ff-0ea5-4841-b7ab-0456f4641461',
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
  'Wed, 28 Apr 2021 22:59:54 GMT'
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
  'fa7c7a85-1c42-49c2-8aa4-8d8bde5a1d3c',
  'x-ms-request-id',
  '85fc3a1a-b83a-4b3e-bdb2-1d79f7b64d89',
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
  'Wed, 28 Apr 2021 22:59:56 GMT'
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
  'b8a48ca4-2364-415e-8625-458ceb9d625a',
  'x-ms-request-id',
  'a825c261-d413-48d2-8451-28527a89ccd5',
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
  'Wed, 28 Apr 2021 22:59:58 GMT'
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
  '7159ede0-cd05-40e1-b48f-9d5600538067',
  'x-ms-request-id',
  '648a1836-9fd5-4200-b0be-86d7ed4702ba',
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
  'Wed, 28 Apr 2021 23:00:00 GMT'
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
  'caafc7e0-8130-4fb2-8bcd-e6f76ed3ce9c',
  'x-ms-request-id',
  '846086e1-4672-4581-81db-e6c5cf763fde',
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
  'Wed, 28 Apr 2021 23:00:03 GMT'
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
  '43ecb06e-ae67-4146-80be-378c5029e077',
  'x-ms-request-id',
  '1aabb27b-a990-4cf8-8b46-80f06acf3a34',
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
  'Wed, 28 Apr 2021 23:00:05 GMT'
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
  'd2573085-d28b-4525-894b-40a3475eb0f7',
  'x-ms-request-id',
  'c00ab8f2-6d12-4af9-ac27-ca4a7a06058e',
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
  'Wed, 28 Apr 2021 23:00:07 GMT'
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
  '4ae574b5-c2b1-4479-936a-012cad48869b',
  'x-ms-request-id',
  '2069e057-4b57-4b0e-8a27-3bc033aa75ba',
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
  'Wed, 28 Apr 2021 23:00:09 GMT'
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
  '410f1393-715a-4f39-9794-7b535d5c6aa7',
  'x-ms-request-id',
  'da153777-ef26-4759-8f61-29f5524487ea',
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
  'Wed, 28 Apr 2021 23:00:11 GMT'
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
  'e6a041ec-46af-42e3-bd6c-c665ff31bf01',
  'x-ms-request-id',
  '5f95e667-241f-435a-ab2d-80bbcdc77989',
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
  'Wed, 28 Apr 2021 23:00:13 GMT'
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
  'e7ada283-ec80-4d79-977f-024e97698170',
  'x-ms-request-id',
  '085a4911-5c57-4271-93f6-04b40adca9eb',
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
  'Wed, 28 Apr 2021 23:00:16 GMT'
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
  '3e16b4f5-5e2f-43d2-a151-8ff444536fce',
  'x-ms-request-id',
  '5f4292b7-d433-4334-81ef-4b90d9b1aca1',
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
  'Wed, 28 Apr 2021 23:00:17 GMT'
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
  '88dca2ba-983e-4c8b-85c5-ddb53dafa064',
  'x-ms-request-id',
  '63d745c3-6aab-42a0-92f3-eed7e5b9081f',
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
  'Wed, 28 Apr 2021 23:00:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1619650748,"scheduledPurgeDate":1627426748,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/0ca838a142f44b4584ed4cff7397c81e","attributes":{"enabled":true,"created":1619650748,"updated":1619650748,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '153b431a-7257-47ca-87bc-e62e91b0725c',
  'x-ms-request-id',
  '0f3fb109-4f2c-4210-ad24-1fc89cc8dd07',
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
  'Wed, 28 Apr 2021 23:00:22 GMT',
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
  'd8ca6c6f-2be4-4651-95de-3b77245a1b64',
  'x-ms-request-id',
  '6108c11d-1dbb-40f4-b482-ec36721001a6',
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
  'Wed, 28 Apr 2021 23:00:22 GMT'
]);
