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
  '2f5cfbd6-a5e0-4746-b0f5-6335a71d89c5',
  'x-ms-request-id',
  'cc8a06c0-0920-43a6-a694-0b98d9318816',
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
  'Wed, 28 Apr 2021 19:21:10 GMT'
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
  '8dc6ef02-db99-4723-8151-7eaa48e9af01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbBQAAAICrG9gOAAAA; expires=Fri, 28-May-2021 19:21:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrPZ_wgDm5SeRzRpImZdZ4ynUhPnJBE49VyTnahfUT1lqRGBgKsz93g3Fr2j_9wVoSD1pJ6V5DJW3NDk40NRpP3Ob-m-avZ6FiQURLFx9xk_YVCN62iVTAeg0bUcmvmh2FE8bJTMJ5vTfgqJwyJXa6x5uMdcYgT2CXPow7M0YJ2YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:21:10 GMT'
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
  '0f7476e5-9360-42ba-b92b-ee550e302101',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbBQAAAICrG9gOAAAA; expires=Fri, 28-May-2021 19:21:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpOj4O8ShNs5LyjCyTYBA4F10szXc10CaUqepirmd7X0SXS_uaC35SIIvoQH7birLlus7e391sZAQ4myFoSKDCh2CVG6-WV2NbrmWErljTb4Ron1CoqhC5l61ggno5B-mnvWfpmUDShNpcWbKkCVU_ctlwaAIkgYR8UPzY9i51EQgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:21:11 GMT',
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
  'bf33e3d0-9f79-4b64-be71-030eaa021a01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AgEcO6Mgn-9Lr10m3z7WdtjmR1YbBQAAAICrG9gOAAAA; expires=Fri, 28-May-2021 19:21:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 19:21:11 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d","attributes":{"enabled":true,"created":1619637672,"updated":1619637672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '2f5cfbd6-a5e0-4746-b0f5-6335a71d89c5',
  'x-ms-request-id',
  '273e9902-377b-4c3f-9cea-3768763b26a7',
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
  'Wed, 28 Apr 2021 19:21:11 GMT',
  'Content-Length',
  '300'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canrestoreasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"}, [
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
  'ca1c646b-ea85-4089-a9b7-94e935117c2b',
  'x-ms-request-id',
  '250d558a-07f7-4250-b73a-fe0646af3bf0',
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
  'Wed, 28 Apr 2021 19:21:11 GMT',
  'Content-Length',
  '6266'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619637672,"scheduledPurgeDate":1627413672,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d","attributes":{"enabled":true,"created":1619637672,"updated":1619637672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '87bea892-5456-4e44-8591-ccba21d7f551',
  'x-ms-request-id',
  '2a71c216-e857-4aee-a534-82b7b27f83ad',
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
  'Wed, 28 Apr 2021 19:21:11 GMT',
  'Content-Length',
  '477'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '424e644d-b90e-42ff-925e-dd3430cb6694',
  'x-ms-request-id',
  'b4589681-238b-4c56-a82a-abe04c00c8b5',
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
  'Wed, 28 Apr 2021 19:21:11 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '14fa470d-13d2-463a-984d-8ea448d0a8b9',
  'x-ms-request-id',
  '99427bc4-20cc-43f9-b8e7-3051150d2f77',
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
  'Wed, 28 Apr 2021 19:21:11 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '08bdd87c-dcc7-440f-8cb6-5e74d0c17606',
  'x-ms-request-id',
  '4491b704-2885-4001-8d17-eca93ee25283',
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
  'Wed, 28 Apr 2021 19:21:13 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '569e4a31-6518-45b3-bc99-47db684673fb',
  'x-ms-request-id',
  'a0bf20ab-1402-44f0-92fb-5973dfbe3b9c',
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
  'Wed, 28 Apr 2021 19:21:16 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2f6eac08-8fa9-4107-a681-2e828906a14e',
  'x-ms-request-id',
  'baf32dd3-9d21-4869-ad75-141f6cefe7ce',
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
  'Wed, 28 Apr 2021 19:21:18 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a7b57c77-4871-4c9b-abe0-02b278f2d3e7',
  'x-ms-request-id',
  '19b623c6-aeb2-47f5-ad6c-c7681cbb7cb1',
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
  'Wed, 28 Apr 2021 19:21:20 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '382e21db-0c21-44c9-8aaf-c5e9ead8d180',
  'x-ms-request-id',
  '9065d526-603d-4c82-9baf-3cf5a3ef4ddd',
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
  'Wed, 28 Apr 2021 19:21:22 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '615afee8-89fa-49f8-826c-ac8ee4563e79',
  'x-ms-request-id',
  'f9c1d1c6-7f71-4d2c-9b39-2cd37121870d',
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
  'Wed, 28 Apr 2021 19:21:24 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1b8d4c2b-18ca-46f4-aa1d-2e8e5a00c983',
  'x-ms-request-id',
  '3ad88762-c3bb-435a-a5b2-842237372195',
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
  'Wed, 28 Apr 2021 19:21:27 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b2e1e835-e102-4c29-a9e4-97bb69928d44',
  'x-ms-request-id',
  'a39374be-f16c-4a15-b1c7-2ff57d5130ee',
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
  'Wed, 28 Apr 2021 19:21:29 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4f01f80e-1ecb-474e-ac29-8c1ec481b0df',
  'x-ms-request-id',
  'f5bddbfe-ff8a-4f3c-ac81-1f756b142c02',
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
  'Wed, 28 Apr 2021 19:21:31 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '01e99d98-f924-44c9-9b99-d21a3aca899d',
  'x-ms-request-id',
  '94b885ea-7957-481d-81c7-46d69b2d1fd8',
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
  'Wed, 28 Apr 2021 19:21:33 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '99c2c8d8-9cc0-457a-8876-782606d803e4',
  'x-ms-request-id',
  '279da857-b8bb-411f-9adf-ba059d8a50a6',
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
  'Wed, 28 Apr 2021 19:21:35 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e2227bac-1093-449b-affb-08ee940b6256',
  'x-ms-request-id',
  'c589106c-3847-4392-9781-5ce4835aaa8f',
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
  'Wed, 28 Apr 2021 19:21:38 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ed2da346-7989-4eb3-b301-286e300c7337',
  'x-ms-request-id',
  '4182a835-2d5b-48ab-90dc-c54ddcef09f2',
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
  'Wed, 28 Apr 2021 19:21:40 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e160c23d-3380-4c64-8fae-cc69ec2230eb',
  'x-ms-request-id',
  '17cc26d5-080e-4066-9f05-d4fafc64cda9',
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
  'Wed, 28 Apr 2021 19:21:42 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '02e2f890-2b05-4689-870b-645588c910ad',
  'x-ms-request-id',
  '7a9ead2c-193b-4115-97a6-056fb23c59a7',
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
  'Wed, 28 Apr 2021 19:21:44 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eec1abec-ec20-448b-a4d3-d2ebed2a9ec4',
  'x-ms-request-id',
  '7052faeb-2450-41cf-87ec-96455bfa8dba',
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
  'Wed, 28 Apr 2021 19:21:45 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'de7146cf-4532-45b4-9d5c-15426d85759a',
  'x-ms-request-id',
  '7d98bb82-a2c2-4900-b817-24b1c3b6e4f2',
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
  'Wed, 28 Apr 2021 19:21:48 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'eed27a05-1ef8-4e06-949a-9050e7b782dd',
  'x-ms-request-id',
  '468f18f1-4895-44dd-aaea-4d15716c154c',
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
  'Wed, 28 Apr 2021 19:21:50 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ee9a82a8-e244-48d8-837a-f3c61b3ca7e7',
  'x-ms-request-id',
  'f5a9946f-64dd-4cd3-8e1c-7319122dd239',
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
  'Wed, 28 Apr 2021 19:21:52 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f39ff960-3a77-4b7b-bdfb-cd011db508eb',
  'x-ms-request-id',
  'cfa2205e-4d82-4b86-b796-0a26b18d0e57',
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
  'Wed, 28 Apr 2021 19:21:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619637672,"scheduledPurgeDate":1627413672,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d","attributes":{"enabled":true,"created":1619637672,"updated":1619637672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '2bbfdbb2-474c-4515-819e-813e4f53b627',
  'x-ms-request-id',
  '78216851-e660-4ca8-8870-0ec9bd4ab673',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',addr=IP_ADDRESS
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:56 GMT',
  'Content-Length',
  '477'
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
  '109f9638-7e60-4f60-8289-12aa3140d8b3',
  'x-ms-request-id',
  '46636994-d317-44a0-9a80-c87f31136722',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=3153600addr=IP_ADDRESSns',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b9c9493d-25b3-4039-9f66-30e4ff83df70',
  'x-ms-request-id',
  '8ed27a5a-5b7f-417b-9bcb-927aac70a362',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=3153600addr=IP_ADDRESSns',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1d267b56-fe33-45fa-b5cb-ec209785f571',
  'x-ms-request-id',
  'a16d59e2-e009-456f-8a77-b5a42601d662',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=3153600addr=IP_ADDRESSns',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '86069d5b-14c4-48e0-a879-f5221eebf928',
  'x-ms-request-id',
  '5e281390-c796-43f4-8347-bba3779533b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=3153600addr=IP_ADDRESSns',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:21:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '538d683a-9e84-4a23-8929-7de2247b95fb',
  'x-ms-request-id',
  '8ec2f8f4-d62b-4899-8cd1-12f58e0879e3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',addr=IP_ADDRESS
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:22:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a1875902-af77-421f-9280-562357c56f3f',
  'x-ms-request-id',
  '080ea6fd-db5a-4def-a3bb-4c63a4dc0dec',
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
  'Wed, 28 Apr 2021 19:22:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6193c1a7-be97-47a2-966d-66dff78331ac',
  'x-ms-request-id',
  '4f4368c0-ef29-4720-94e8-9cff1ced2cff',
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
  'Wed, 28 Apr 2021 19:22:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd4a5d74a-3a99-4511-9c4c-368c1c089c39',
  'x-ms-request-id',
  '37ebe5f4-8351-49fd-b2e1-062e37d3304f',
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
  'Wed, 28 Apr 2021 19:22:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cefa624f-f116-432c-a35a-6ba3b29629f6',
  'x-ms-request-id',
  'f9dab6ef-cd45-4c6f-8a6b-50bd063975e0',
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
  'Wed, 28 Apr 2021 19:22:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e2d70328-b06f-4bf9-b143-f58fc755d47f',
  'x-ms-request-id',
  'd2dcbd1e-1213-4d50-98f0-a933912bede2',
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
  'Wed, 28 Apr 2021 19:22:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '84519993-b1d2-490e-aace-2a77cdf99f03',
  'x-ms-request-id',
  'b15a119b-1066-4ad5-9619-5a5bf08c0310',
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
  'Wed, 28 Apr 2021 19:22:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '81ebedc0-9241-4d8e-92c7-6a1771ffed7e',
  'x-ms-request-id',
  '9f89aa3f-308b-493b-b937-0617578b66f8',
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
  'Wed, 28 Apr 2021 19:22:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '72a82a6c-7bf0-42e8-ae08-92518ab8e286',
  'x-ms-request-id',
  'e115b484-512a-42fb-95dc-f519c1f4a19f',
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
  'Wed, 28 Apr 2021 19:22:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2f5d16e1-c676-4f02-9b68-7514867bc3d3',
  'x-ms-request-id',
  '68963dee-b345-4928-b7dd-1d95696ee8f9',
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
  'Wed, 28 Apr 2021 19:22:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ac5739f7-856c-414c-a904-2fd6c0ef401a',
  'x-ms-request-id',
  '9b8d7f28-4237-40bd-b4ab-a9df775348af',
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
  'Wed, 28 Apr 2021 19:22:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '789a6026-202d-4291-888b-cdc3b51cecf0',
  'x-ms-request-id',
  '5f2d18cb-bc37-4b05-802b-5d48757f9e1a',
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
  'Wed, 28 Apr 2021 19:22:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5cb2ba7e-b1cb-43b3-90cd-cb192e8d090b',
  'x-ms-request-id',
  '723b3634-307d-48fe-ade3-7d92d89d0ffa',
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
  'Wed, 28 Apr 2021 19:22:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '75dd2303-bfb3-46ac-9c66-85c819b643ff',
  'x-ms-request-id',
  '64964c62-6118-4937-a22e-34cf8dbfb049',
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
  'Wed, 28 Apr 2021 19:22:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6e2cdfda-0e10-4e65-bb33-97785ee7042a',
  'x-ms-request-id',
  '5491ba9c-65f1-4c4e-853f-de9ed4db13f7',
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
  'Wed, 28 Apr 2021 19:22:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '782a4dae-e88c-4346-842c-0a48952015b9',
  'x-ms-request-id',
  'cc216b7a-b347-4ec6-8a41-ceccc41286e7',
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
  'Wed, 28 Apr 2021 19:22:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fc681430-96a4-437d-beb2-95c9958adc5a',
  'x-ms-request-id',
  '0fa87e0d-4238-4c56-bcc8-30b406539439',
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
  'Wed, 28 Apr 2021 19:22:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '96629be7-53c0-4f73-852a-b1f420b81e65',
  'x-ms-request-id',
  '740284ae-e6eb-4de1-a7bd-a0ab3c152d57',
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
  'Wed, 28 Apr 2021 19:22:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '685',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1a5a5e7d-e8f6-4108-8be7-4049dc01079c',
  'x-ms-request-id',
  '563ad26d-3197-4476-822f-ca9c35ec8cc8',
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
  'Wed, 28 Apr 2021 19:22:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTZIcTZkTlVZeGJWanFKcEs5Q2VxTVFNakF2d2tXMXU2Yks2ZHlpTnppOTQ5Z3NDWl84ZlVFOW9KWlkwWUJvczRXcm9SSDl3SEh1TXVnVldweUhJM2w3MWlydktaeUFUTm5fQWNHbHVTVXpiT01rUGlvdS1WYjNXaERRS3N0ZVp3OVExdnFzLVUtR1dQYzFLaUZlSnd6aE9OMUg0cHNKdWFMbXFyZEZNUnRTbWstYnQ4VGFHZ1NmS2NXV0N1YWNLNlBvaThwWkNtOG9Bc3c5Nm9LbGxZdFdDQlpDdkxXbVFvZkdYZ0VWM3NmM1FYT2ZFaVFLZ0tsT3hoaW9YdUpDYUFvTlc3bHdxdVNjVDVJTHhaVHZIb0NjQ1NvQXFxOVlIamhBeUxRUGJLNjFQMkRHeTVjQm55Ym5Lel9felRHLTMzZWhIYXpwSk91ZGNBbllRa3BGMG93LmxmWmVicFFMamdpOWQtRGtCZU9Wb1EuY2pUbUYyUmtXcEpfNlVnVks0ZG1ueE5YLTJCa3l4angtXzJ3Q2dqcnltMlRBZmFOQlE5YmNoOExCT21ZQU5aT2RjekNJdmgtX1JiQlZVZ2xaWkh4b3l3cFR2Z1RORlA5d2dvZlh2S3BfYllzRm5XU1NhUUVmYnFNdVFjNWUxalJqVFZEQWlSQnRkZjdPWTNLeTNxaUFsOTU1cklzYXBBWm9MZjlrcUM1TGFPMkNJMkcwLV9ZRDlZemwwa2JoRnNlSHlEcUhDRlEtaWRneUh6cmJQdUlpaHlBR1kzMnBMVlE1M195X0dtWE5UMGxEMWdfaHhaQ3R0ZENjalVvWHpRMUUyd09VejRrZXVzWnRMSkFDYU53NDJfVkR1WF83bVhhcExSaXJDUFhzWF9HTlhnNWphNTRfSGltajg0Yy05amluQzkzV25wUzRYQmUtVXQ3TmpIZFBIblpyUi1nRHNNc2Fsckx6emtORmFRR2oyVHAzaWJRWTFRQ1IzVzh0ZC1VLUY0eUd5VGJ4dXBDWm9iRnBkNXlJWm1sbVNGQWdUWTVNUS03UmJucXhXM1FOWDBDcTB1SmF5cTl0TUh6NzFUN25oR2VRLTcyZzFDakl1Y3Y5TE9pRW82RkZ4SXdpUkN6Wks4N1ZiOW5Pd3NlRmdERzA0eFB1ZkQyZFd4V2Q0aXRBQXpmSDE1cFZDb1diakF4TmdrLUFTS2xYR1VHeThGSEYzekE1aW92MHBHc1Awd2Z4QkRUa3hET3lWY0hGeXlCQkJlbTdiWHVuSlRheDZmVU5wd0Jsbk9rR1RjZGtYUmpFTW9Sa0tCZzc5c0dHWVBQdWstanRnUml4RXgxOEVsaXpHYnpnZ2txWlFYUUpyRDgzekxNaEo4b2h6eDVfYWdoV0N3VEJjV0hGV3U4S2o2SHRNRktNMVl1dFhBeDltVDhYRVlyYXBMMnRfc1FMQ0JIckM4QzlzWTlHaTloUTlNS3M1YVRZUWZhT1VNMHRMSW5hNHVzNzJoYW5tZW9CQm51cjBnYXVLQ3F0SU1hbk01NExNeUdiYnZ4N05zTy1rb0VjTHh2TFJXVkxWYXBfZER4T3ZXeTdhMkdQUjdiYjg3QWZvMm9WZjJwYXZPaEZ0R1NwbWtqS01kbURJOWxZV2J5WHNhMUNtYVFIc3ROU3c2RVVTUjI3NGNTdzQtM2ROQThoSlJmVjJWRGVRR3NJR25kTmczV3ctY1FBRHRzcUF0VEtzTnNoUHVLenNtQXNyQWNaZGxLWlZnalNIcThBdHRSN0RTUHpBbDd5LWdxQk84RDRlNFIzQURjdXZueTR0dmtWeERHbnBOdWRfc2RhUzZ5dkMxRkZ3TWlxV3BqQ0NVTUNfWF8wNnR3NTJ6UHgxVm5aeVpmNjhpYUtLbWdQVk5rOGR4R2NOTVBRdEE4U0N0TTEzdTNPM2NPaGx6S0FQOWJxbGNzWWJrLWhnQ01OZFFDT1Zja1pzZ1NHNzlRWjh2c3c4ampPdEJraFE1VFVxN25pQ2djMEZ5MVZyLXRBZkxHWVV4d1NsdHJzM1I0N2IwckxkSW9EeDFUUWlXVU5CMEpHRjlfdjRERlIxUE1LY3VhTUhMdWdYOWpjMVlWZFYyLS1teDJBQS1RVjZORG0wSklmakFXTGJjTl9TempNcFlKVmlBUVh5QUNXbDNSUG82akVZQzMxMVc1MGVaWEtaQzJkZnJOS2x6RlFzSTlmaGd1LTBNZGQwOFpOdjVSSlhaS1RCOTRBQmJpbmNuZ1FaQk93QmZ0ZGtZYU5sd2o0Mlp5bDQ5bUtiU3FCWEhXckhPcC1hYVYtaHNHUDdtR3ZHekIwWi1FWlEwcHBTVEFOajFDbWt6bFBqc0Nxb2I4Mmd3RmxaeGJKeGlQQ2ozRU9JMGxRdnZNRTVDZ00zVWVoXzFwSEw4VGpSSWFSdkNuRmdvbTJQREtEWVgtYldLLTdBRXVNdmgwSUtsUFpfb1dzYkl6MG1SOTV1NE1xMFpESEVFaVc3Q01Ga3dScUJ6ckRIUy1FbmZIdDhVY3dYWjNHVTBnTEd2aEo0MFZyWDRDemdlNUkxU0tfb3EtTHdDY1UydWJfT1ZJOXZFaWQ1TExNV1NBMG9jUGZRQjEzQWNmam1pMFZTRkVJYWVZeE14SDlTa2FNZFIxT2ljVEZJeWNmMUZXVXFUdU0zUDRmN3lkRS14b285RGU5QUROOVNOQnFsZDQwU1M3VFJLazhldjBMUjBmcFVJdXJrV1Q2ckY1MjIydlQ3aWN2dE9lRmcxTGZaVEk2UFNjRFFfUnJWdTBGMG9ldkZXQVBLSkRJTmJfbHZndFBEYi1fT0V3NlhzT1ZMQ0VJX2dMZllBZWowV1RPYWZPV3F2bWduajFXQmFnRTVsRjBtN0ZXVG02UElVZ05QSDJFeENBVExURHJoU2QwVFpOZU85cDRuMlBLZ2ZPV2lHWkY5anN3UUNvdUxzS2pnSmZWYnowRjFtVVpoYzU1YnJDUUtHOVRmR1hJRkxSMGVPTHViWUZ0UmhtZVV6VTdpdUs1aEJkWVkzQ19uYkw5TlJlYmNCWVBaaWVsYTdqTG1aTndHLTQ2NlJVM0FROS1ObmlwaTRuelJGNGMtODdTM01vUkZibFEtS1NVODdaRmJKUVZ1a0Q2N3hDWDA2VnM3MHpsM054cllPUU9sXzdFZjVCSFpOcVZHR1JMOFFObElIY3lFNHR0UzZVWjFndEZqQ3VHVEVKaUVUTm1Wc09TTkcwQ1B6RERQR1hYWjZxN2NRRHZDMG84X3Jza0RBcWp3RUFXbjFYaHJiQlY3aW84WnBRaTlGQ0dFMGdDRVZBeWZlU1haNWVkVFRvYXFMaGVZaHJaTHZqYUV1aGk5OUhEVGpyd25zcENoc0hTb1NXZHEtSE95bHZYMWV6SkhXSGxySkNudi1GeGhSdmRwLUR0ZS1SZU96cWNDdXJiR2otZjRqUGJVZnUxVGdFc1BVZ0U2azVJVC1ZSWItdUZoZ0RDUUZmRXAzQU9UTXNKUkJBSGtpYlpiaWVPbDk5V1BwT0NISEFwd045Nmg3V2RDaTJLZnBQR0RJSlR1WHZLcVZjN1NTeE1oYmJTWVpHMkNqYlBOWF9HeWNGYlhOWlJkaW1qb0hOSUU2aWdkc3JhU1RRUFJuRlotNklnUnZlb0VpV291MnJWSy1WMlJVMF9BSWhfWEVhblN1TlJPWU1hbE9IeGppd3MxZ0Zpb214d2R3Qm5QaHhuRzRyc2dLUGtpdWdqRGdUREdfU3VYVDBhYS1oeU9NeVI4UDVBN290emp6SkoyQW5rYzdkRDkzZDVGbDh1Yi1nMUJsNXZZcjhfLXZPMjVJWG9GZTdueXZZY3RjTkJ3a3dlT1IwYVk5WFVhQy1FY2g0WjB2cWVycGJSNDJMX2JOdUpjbS1YRm14RVhnOEhQVFdrT3pvX0p6RnhKUUNqRnJTeFYxRTNYXzZyeEZyZHJ6MlIzZURNRGZWVHJacl93WUg2aG5mbkFhNWtuaVdUZ2RhV1hqTmMwU1NFVF82MWlFVUZpZVRFSEFJZVRNUThFdmtVd18zWkllcDQ5TWJVOXctcFRhMUMwSGRyTFdzVUl5NUxLQ2NTQU96dnVHdXRlQWcxa3g5UFBmT0tubUhyc2l5YUFEWTNtd3hzRWN5UzNVWFJJSmF1aG9fTjdDMnJtY0o0MnFMMUhSSF9kZkpaUk5TZ0ZiT1E1QWN4VWVTOENPQk5NaEVRWHczU3owRzlVSkw1WDBWNlcyanBZeXZ1TzdBM3FIcWlHSnljRzZkUlRYbXNHRHJWZjNhLTg2ZDB2dW5ELTk2bDVWZkhMNUlpOW9XSzd5RjlJcGpUa1N3WlZmeW8wRzFDbVdROERDeXktMTEwUF9VSDBnOEFZYUN1TUkzeDJ0VzhSUkllLV9BSDllVVJMTHpOMkhUcWVwdXBxMklDZldtUVFmYzJaSzVkMzFwSDBtMFRPY0w2bGlhVVRjb3VRcjdqZVlQLUJjWF81UEVEOF9KcTlSaUFUOEEwVDFRQUdfSkdQNmhHT2hocExwNmpCT2c0RWh6U250UXFRVWVlZHlHTW40azFVNXQyZDFOYTNaWnVVaUZ3b1J4N3RnNG1LenRPQ1dndGwxZ0ZJbGFNcHZXOXZkdUVlRlkwMTVXcnlBN0szeW45TGJLRWc0MmtBaE53cnlaYXZiWWZXNUxZemdpSWZsYU81Zy01UWxweEw3NVlBaFhSYWp5TUMxY0VCbEIwTi00Y3ExbnJOVmhFcHY1OE05clRoMWlZdDRJa2d2dkFMellwQk9GTzYwRGJCQkIzcWlNdkpKdmIzRWRLNDY1SG54cHRPSFp4YXByTUhPUnlFY3QyaE5rZkxaMWh1NUh5Wm9ENWpOSzJZZ0tnTUFkOEtFS2R6N0xNcjI5TnFnR1hVSFpSWGFoRXFiQ0M4WTZ3UnFyY0pUTUZVUmZYeG9OTEpsaHdIRHpOQUQ1WkV0OUFYdzVlbGJJejhIRmhTNnRiVFhjTjhFZ1FXLTItOHI4d3RnQ2xBZzRPdk03MEwwWVpWalB6VFVSWWNDWXRuOHB3MzctMjlJVklwdzd3eXJkTndQblk0MFB4X0lmMHdQSWFDaUhnUER4aWpMOWxhMUNxNFEtYk9NcDI5TGdFLU9uMFlDVE5rZFlSOGt5ZTdjXy1EQTVJTjJxQm45TmpqQmtPYnVqUzJmbzZUUDVNbmFxNHI0Vkhpa25aSVJOeHQ2MUl2WEk2SmZGNTJSczA1OUwwWFphazVJbmhwRnJXSkFMa193ajAzSHFhY0stb2VlaXRVRm56cmt5RnJPdWtZbC1PT2U3bFQwMFdCSW5mOXBocFVuSjV0amZUZm5JVDhZNXN4c1lzYUhMU3JVVEFQNDJTNWxEREo2aVY0UTdnV1pmdXlMdGYzSWp4cWFiMkNoMkZnalRrWEJ3bDkxLThxbnlaZFAyemw0VDE2ZHdxak1OSFZxeGFwWHAzM05Eb2xVS3NWQ1ptT0hZdzhzSDZYT2VqdEdLWDdaZVRlUm1vMnRKSnRWek9LVVJoTW5DWVo4XzFvUkJMaVpEVXp3Q1ZWODRZa3BIZlItQ3FKdlBSdUVRUzY3MWo0MFh0RmE2TDF0Z3I1UEhMWG1pV3Y3Mi04Y3A1ZTdMVGluRnkyMnFDRlpZc2U1amVXMUdxMzhTV3hYSUNxc1djQUwyVjcyS3ZXbTZsVmJ3RG1zLTV4NHBYeVoxQ3FDc3BYaWIzS1BsM0RuYmVDeVZwdENZbmx3TE10RmdWWGgzT2ZMSXg0dnpBdWpwM1dHclBYYzJoMGFlZkY3SlZyMS1GQnlTUFNHdEZTS0F6WGk2czFqZHlNRDdGRU5wWVNzcFg2TkJjUWRUbTdDTVZnYkg1VnppeWVLTzU5cmxocE5DTGhIakFYLU5YaXZzWk13UFNUTXlzYUF4NkVqd1VFSHZzMWo0X2NDSlVYZE5kUzUzMWhnOXlCVE81WjRma0EuMncxSmxvTTBtUFVpTFI1bEpuZS1lZVBLLTBGR0RBdTBhYTExMnRzSm1sSQ"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d","attributes":{"enabled":true,"created":1619637672,"updated":1619637672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '64b19bf9-7ee0-47fa-89b5-d1ae10a1b628',
  'x-ms-request-id',
  'a67fe89d-de53-49d7-9953-366ce2b5b6fa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',addr=IP_ADDRESS
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:22:42 GMT',
  'Content-Length',
  '286'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619637763,"scheduledPurgeDate":1627413763,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d","attributes":{"enabled":true,"created":1619637672,"updated":1619637672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '344409b0-13a0-4e16-be7c-9751cd2d5ffd',
  'x-ms-request-id',
  'bec74484-0b06-4ec2-b9be-61628a4ee871',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',addr=IP_ADDRESS
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:22:42 GMT',
  'Content-Length',
  '477'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2d4e63be-f32a-41c5-9b08-c483c8889924',
  'x-ms-request-id',
  '3c55c174-d40e-4907-91f4-936dc0cc7d4a',
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
  'Wed, 28 Apr 2021 19:22:42 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '438fce3b-d008-4672-9f66-a00ce48bd684',
  'x-ms-request-id',
  '58860d26-91c0-4bcf-8437-778a7ed893a0',
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
  'Wed, 28 Apr 2021 19:22:42 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'af35f27e-5715-4b6d-8aa2-c7bdbaeb6b90',
  'x-ms-request-id',
  '8cc25874-390f-4f06-9889-13c4eb74046e',
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
  'Wed, 28 Apr 2021 19:22:45 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '19c689cf-ca43-4c82-902c-3bd9c3b5cf6a',
  'x-ms-request-id',
  'fee6c89e-8aeb-4b20-92cb-f467a20cb65c',
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
  'Wed, 28 Apr 2021 19:22:47 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9effaa86-6cf1-42d3-b156-6ffb679155e2',
  'x-ms-request-id',
  '85647bc1-9d02-47d2-8507-f21f50b776c9',
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
  'Wed, 28 Apr 2021 19:22:49 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '802c3f8d-14ce-41e4-9cf3-0865341059ac',
  'x-ms-request-id',
  'a021f2d3-9524-4e3f-8853-11a4ca8e7496',
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
  'Wed, 28 Apr 2021 19:22:51 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '69feea80-a64c-428b-abd7-a86eac4d2ad0',
  'x-ms-request-id',
  'd46a6915-7907-4c92-8990-d3e675ca0eb2',
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
  'Wed, 28 Apr 2021 19:22:54 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd63cef15-206a-48b5-b96c-58b750810b82',
  'x-ms-request-id',
  '0426dce7-2e7e-436f-9119-77b7d60b2745',
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
  'Wed, 28 Apr 2021 19:22:56 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '65db26e6-8547-4eab-beea-b33a902d69fb',
  'x-ms-request-id',
  '16a91ad8-a1f3-42c2-bc5d-754780fc55b4',
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
  'Wed, 28 Apr 2021 19:22:58 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fe13ebcd-b4bd-403a-8485-6daf463e3db2',
  'x-ms-request-id',
  'e8c5676f-8a15-44a3-b709-bc9a07bd98cf',
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
  'Wed, 28 Apr 2021 19:23:01 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '892459e4-2648-4630-b132-ef55fae5e450',
  'x-ms-request-id',
  '93f86068-6910-4134-aee8-09a3a5ffaeab',
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
  'Wed, 28 Apr 2021 19:23:03 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '30257f72-456b-4da0-856c-6c7b3c46cda4',
  'x-ms-request-id',
  '5bb8eb86-5891-48bc-bd5f-46646ed478e1',
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
  'Wed, 28 Apr 2021 19:23:05 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e1731547-45b8-4425-a341-c451ce7a25d0',
  'x-ms-request-id',
  'b30fc712-a4fe-4193-9b5a-4a49f6cb67e0',
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
  'Wed, 28 Apr 2021 19:23:07 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49b5bae4-8a95-4ec4-a5c2-f2465fccc825',
  'x-ms-request-id',
  'ee02ff6e-8c8a-4fd0-b769-59b5ca3bc31b',
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
  'Wed, 28 Apr 2021 19:23:09 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7c3c01d4-93e7-49bf-a53d-fb802ff4be7b',
  'x-ms-request-id',
  '325dd282-bfc1-4aac-bf07-8db2f2a00eac',
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
  'Wed, 28 Apr 2021 19:23:11 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c43f7121-1665-4913-a743-6d5449d5b6e7',
  'x-ms-request-id',
  '79cc57da-65e7-4106-90d5-e419948bc88d',
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
  'Wed, 28 Apr 2021 19:23:13 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13a4fb30-e5a9-4986-ad5a-55c8e8697585',
  'x-ms-request-id',
  '88b3e8a8-6850-434d-8146-2917a89fde66',
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
  'Wed, 28 Apr 2021 19:23:15 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '98248c45-de1a-4433-a804-74b27d7aef80',
  'x-ms-request-id',
  '23e44cf1-1dd1-4124-870d-b59a31f345ff',
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
  'Wed, 28 Apr 2021 19:23:17 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '803b9862-41df-4433-a849-95a0ae5ddf65',
  'x-ms-request-id',
  'e37bcaf5-338f-44b2-b85e-96c9a01cec45',
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
  'Wed, 28 Apr 2021 19:23:20 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7e24098c-13ae-4a3e-9e24-c2e7686df0b2',
  'x-ms-request-id',
  '3bfe026c-b0c5-4873-b7b9-a5332874b71e',
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
  'Wed, 28 Apr 2021 19:23:21 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4c1be934-ee82-49d6-97a7-af69ff459779',
  'x-ms-request-id',
  '5e434f68-f3af-4ccd-9697-81bec4326844',
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
  'Wed, 28 Apr 2021 19:23:23 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '532aeb2b-04ba-47d9-9a07-f8cf68f2301d',
  'x-ms-request-id',
  'c3f45622-99f1-4412-ad12-93aa3a34a249',
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
  'Wed, 28 Apr 2021 19:23:25 GMT'
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
  '133',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4e5d4744-201b-47e6-b920-ffcda70c0263',
  'x-ms-request-id',
  'e7bb8bcb-b016-4c06-adfe-0922bbc95501',
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
  'Wed, 28 Apr 2021 19:23:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619637763,"scheduledPurgeDate":1627413763,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/e39916a57d39441187cba481c0cd648d","attributes":{"enabled":true,"created":1619637672,"updated":1619637672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '13d3268c-62c3-4224-8eb3-fddac4ff2bca',
  'x-ms-request-id',
  '6b2a38f8-593b-4c74-a12a-f8fff92145fc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',addr=IP_ADDRESS
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:23:29 GMT',
  'Content-Length',
  '477'
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
  '01d2f805-bf04-46c6-bc21-4e803c01123b',
  'x-ms-request-id',
  '79254f1c-efbf-4f50-b96d-a7e9f1b37e1f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=3153600addr=IP_ADDRESSns',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 19:23:29 GMT'
]);
addr=IP_ADDRESSaddr=IP_ADDRESS