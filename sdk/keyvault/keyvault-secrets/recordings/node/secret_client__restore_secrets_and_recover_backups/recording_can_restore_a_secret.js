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
  'cb1fae25-188c-46c1-abb8-74a508ba9a3e',
  'x-ms-request-id',
  'd255eabc-a6e2-4982-8722-2eb162e99437',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:18 GMT'
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
  'd72be028-8c9d-41d0-a962-9ca4b7880601',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbBAAAAKKzGtgOAAAA; expires=Fri, 28-May-2021 01:42:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrrmXgiry3964ikVJ8YrHZyzr1jQok_UbqKnmHTeRLz9KnxAdBykE-83jXAsofCXXqNrKdGwZq93TCriqxTl8WucpkvNUKBtinZvGDc-dVcaurC9wtlY_tS05IqalLghAePpzeWHAOgVh_YkTPvBtkDRSupzZzR1RbtTgWRreE3_EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:42:18 GMT'
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
  '9a98bc7a-8a88-4a90-acf2-be32cfc4c100',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbBAAAAKKzGtgOAAAA; expires=Fri, 28-May-2021 01:42:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrfw3KRcLsV40eIjcG4N5yquRIUSjEFe9Lzdy6SXAVj-p1BdXkVr5ADFF6OKs-8P4IOt5nRlNZL1uaDcYV9ktqzJcWWCIaQe63k_Ii1AAhqLNP-1t7C0A2XBeXLG2fO0VGA0P38F7DheAe3clzu0WSMQGkIaZR4P02c3FOq6kPn74gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:42:19 GMT',
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
  '22e97cd1-4cbd-4b9d-9f71-1688959e2100',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbBQAAAKKzGtgOAAAA; expires=Fri, 28-May-2021 01:42:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:42:19 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canrestoreasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934","attributes":{"enabled":true,"created":1619574139,"updated":1619574139,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'cb1fae25-188c-46c1-abb8-74a508ba9a3e',
  'x-ms-request-id',
  '2b752bf5-d341-47e4-96f3-d09042dd3af2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:18 GMT',
  'Content-Length',
  '300'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canrestoreasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"}, [
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
  '97de1192-67a9-46bf-9863-f60cb3c478f7',
  'x-ms-request-id',
  'b59a7892-7ab3-40a8-8d16-d074212290b5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:18 GMT',
  'Content-Length',
  '6266'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619574139,"scheduledPurgeDate":1627350139,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934","attributes":{"enabled":true,"created":1619574139,"updated":1619574139,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c4628032-d7e1-489e-8d3b-88f17939a862',
  'x-ms-request-id',
  'a93b55fb-2f54-49a9-aa9d-019c2af184bd',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:18 GMT',
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
  'eb8ac321-6563-4e79-b52c-9aaf29c3d45e',
  'x-ms-request-id',
  '3833bd70-5b77-420d-bef4-f9b85d6bbda1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:19 GMT'
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
  '3b89786a-b768-4f52-8dae-6cb2221dfbb7',
  'x-ms-request-id',
  '2c9526fa-ce0c-4d32-84a7-64d45abd7aa3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:19 GMT'
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
  '580d027f-5569-4aeb-bc4b-ed0af81d951a',
  'x-ms-request-id',
  '51838a98-3754-48aa-bd1a-b99f9de97036',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:22 GMT'
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
  'f4161703-d6f9-467e-81c7-dce8f5bb54c4',
  'x-ms-request-id',
  '4cd61085-fe80-462f-9a21-68bbbcd4a088',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:24 GMT'
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
  '6bd70f57-7bba-474a-ba8f-f5993bf93bf8',
  'x-ms-request-id',
  'cfe6cbff-c13b-4a0d-b790-923616d7d2f5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:26 GMT'
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
  '806d084e-bb38-4c3a-8fa3-bd714ec87fda',
  'x-ms-request-id',
  '78fcb2df-4939-4365-af90-44b54f7897ad',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:28 GMT'
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
  '47297279-3b13-4563-b01b-bd3962964862',
  'x-ms-request-id',
  'c04fb458-4830-49df-bb2f-04fa8be82167',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:29 GMT'
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
  'a00fdc31-64ef-46df-b59f-1fb093a298a6',
  'x-ms-request-id',
  'cf983dca-0669-4692-84bb-7d4c6dd144be',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:32 GMT'
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
  '343906a6-dacf-4cae-847d-1722074ea347',
  'x-ms-request-id',
  '60b46da3-36b1-403a-9ee3-425f8d3edb40',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:34 GMT'
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
  '67371b86-b620-4436-9e7d-d8c4f8f8baff',
  'x-ms-request-id',
  'bd48689b-ff32-45c1-8a4c-3b91a7fa6cee',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:37 GMT'
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
  'fac8ce39-b9ac-4386-b239-0133676acaba',
  'x-ms-request-id',
  '56631ec2-a6ff-48e3-940f-4f2b95d727ef',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:38 GMT'
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
  'cae96d81-568e-4668-a95f-3937ff9ad7a0',
  'x-ms-request-id',
  '1f469a8e-04a7-48f7-ab8f-b54770c98762',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:40 GMT'
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
  '38870e42-96bb-4e0e-a6f5-b53a72e7be69',
  'x-ms-request-id',
  'c2860f1f-a6b9-4adc-bb4b-dcd21b53efa6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:42 GMT'
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
  '719fc46c-44ab-42c5-98d7-4dd5d9f3f79b',
  'x-ms-request-id',
  'a1d52d65-6ece-4f51-ab19-216706486a0b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:45 GMT'
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
  '31c0a2f1-abfc-4760-8f32-4f5762681b1a',
  'x-ms-request-id',
  '232fe8e2-382b-47b9-a577-4bcf1c82fe9b',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:47 GMT'
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
  '9397bf34-9bf1-4d8f-9488-b8af07f4cd68',
  'x-ms-request-id',
  'e72d464e-7b12-40b7-98bf-f0d95997990a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:49 GMT'
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
  '0cb6b273-dcb9-4d9c-8d2f-a288cdce5023',
  'x-ms-request-id',
  '704d26ae-306f-4e56-b156-63b5186f34a6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:51 GMT'
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
  'bad8e878-5689-48d1-b246-73990e40bb7f',
  'x-ms-request-id',
  '2fdc8817-068e-455c-bd4d-915d704ac213',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:53 GMT'
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
  'ad630c66-c3db-4dcb-bc33-3e9f7d8100d5',
  'x-ms-request-id',
  '0cb52be0-a604-4ef9-b9fa-2f4efe725746',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:56 GMT'
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
  '3524dae2-2ec9-4d00-8234-e5ba6481f237',
  'x-ms-request-id',
  'cdf50368-dacd-4d56-ab9c-355e17826984',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:42:58 GMT'
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
  '16fc2771-0848-43d5-81e4-436202acdd40',
  'x-ms-request-id',
  '16902989-6b41-422f-8a01-389d164bfe37',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:00 GMT'
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
  '0f93b2fc-de28-41c4-9813-a681f990cc43',
  'x-ms-request-id',
  '21a0752d-310d-4a18-8f49-ebeaedcab3b3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:02 GMT'
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
  '7b26df4f-4b23-433f-99bd-7e5545f31f77',
  'x-ms-request-id',
  'c2763dae-9c5e-414c-b22b-08cb9dece9ff',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:04 GMT'
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
  'e28ea6c6-24a6-448a-8b49-aef06f611dfc',
  'x-ms-request-id',
  '0cb9aab8-6215-4ce2-ac89-1aa4ccfa9dfc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:06 GMT'
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
  'ca09dfde-d9e2-4f32-bd2f-190e1354cda1',
  'x-ms-request-id',
  '292af46c-0f8d-473f-8aab-875f133eb477',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:08 GMT'
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
  '7abeb10e-51f4-4a29-993b-6eeb5ac930ed',
  'x-ms-request-id',
  '3002d14f-1bef-4815-a5e3-41cf503d851d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:10 GMT'
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
  'dcdb723d-241e-4041-ba52-c14dd2e4940a',
  'x-ms-request-id',
  '2be152d1-8af6-4e7f-b523-827f603fa331',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619574139,"scheduledPurgeDate":1627350139,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934","attributes":{"enabled":true,"created":1619574139,"updated":1619574139,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a5f32f8f-b693-40e9-9377-76d97ab207da',
  'x-ms-request-id',
  '05745394-f753-418a-a0cf-c5c3e7ebc9d2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:15 GMT',
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
  'a13f2e15-0815-496b-8288-4f561c756e92',
  'x-ms-request-id',
  '08346a5a-a81f-469e-9bb3-3ae4c47e6331',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  'ca73f146-4d7d-4724-aeb6-f9c08a81500b',
  'x-ms-request-id',
  '437fbfbd-8909-4dce-97a0-f4c42e311347',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '55febda7-4c58-418b-83ac-067dca2499bb',
  'x-ms-request-id',
  'afbf4612-59f7-4cf7-9761-5b23da9be16e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '39af6b56-4f89-459c-aaaf-4b73e568b79c',
  'x-ms-request-id',
  '5141ee21-9fe6-484d-b646-f2bd5a02db46',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  'bbaeeac7-9427-4251-a415-37a76b7d768d',
  'x-ms-request-id',
  '646b23e3-f99d-412f-bd82-4878521ebdf9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '39e79756-3ebf-4a0f-86d4-7459847f0179',
  'x-ms-request-id',
  'e5f8ecda-cdf5-49f3-a7ed-3fd1011df0de',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '51f63671-a13d-46a0-aa53-00ff5828c7e1',
  'x-ms-request-id',
  'd21a6d81-39ee-4cc4-9bda-8ee88415a0b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '91386aeb-2d2c-40ed-a927-5e945dbc600e',
  'x-ms-request-id',
  'f838404e-42e8-4a48-9944-2975d0c4b1aa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '595c5609-82fc-4c92-999e-1a704efc360f',
  'x-ms-request-id',
  '1856063b-9c76-477f-a447-33b1281d9d92',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  'd12194f4-3d79-49ad-9263-8ed581bd791f',
  'x-ms-request-id',
  '39b85aa5-9c05-4d06-9fa8-20ecf01bc22c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '4a178073-0700-4a1b-af69-9ffcb3a84a00',
  'x-ms-request-id',
  '55420de5-a4ed-47b5-87be-fba1e60f2ded',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  'a81cb717-3226-479d-b104-cb4809d9801c',
  'x-ms-request-id',
  '9f38f611-29ee-482a-9684-475b2098b3f5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '2104ec23-3b8e-4fe1-a1ff-5cbebe17f8ad',
  'x-ms-request-id',
  '23d0545d-ff0b-4649-9958-055e7eeeaa40',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  'fe6365b3-e47d-42f0-ae50-682719f406d0',
  'x-ms-request-id',
  '999a984c-da29-4349-bcc8-83d9dd2e3223',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '33355cec-72cf-4ed2-b03e-9fd28b4c215d',
  'x-ms-request-id',
  '79d95113-855b-42b0-924d-84e31ba1b034',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  'e7e602f4-a017-4398-b8ff-f06c367d6a8e',
  'x-ms-request-id',
  'e1a8a1e9-cc15-40a0-8392-e626328d5a0a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '76bbe5c5-0200-4063-b3f8-b6d9fa7c2d77',
  'x-ms-request-id',
  '67bc38ac-e899-4748-8fe1-648d8532edea',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '2c43cb4a-ecc0-421e-9f18-03807a232db2',
  'x-ms-request-id',
  '4ed35aa4-357b-4ed1-8558-2910563d2a3d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '2c88ea9d-3da9-4570-a0b8-8d01ab6d7049',
  'x-ms-request-id',
  '67c0cf1b-9280-46c8-b58f-e989b8b29794',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '3b3158e6-480a-48ac-a7e3-e9e0c6e70972',
  'x-ms-request-id',
  'c63bc30b-b9e4-423b-873c-e5792e29c026',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(409, {"error":{"code":"Conflict","message":"There was a conflict restoring the secret 'https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934'. This can happen if either: a second secret with the same name was created after the first secret was deleted; thus trying to restore a secret whose name is already in use. To fix this, rename the second secret to something else so that the restore works. The second probable cause of this exception is when multiple operations are performed in parallel against the secret. To avoid this error, perform operations against a secret in a sequential manner."}}, [
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
  '4c66b370-eb1b-446c-9b48-9c19a026e5ce',
  'x-ms-request-id',
  '93bfcc53-9150-4674-84ea-766e44411e5c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/restore', {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuYTVOelQzbHRWMnZFMGxaeUdQV2dueGY0aEswNXZRcGt6NGVQa2xoYkl2NDZtWGd2YmYzSXU5cU5SZ0RZcW1ZYWVjODlWQnNtcTUxUnE0TEhULVRWTllqcmdFTG9sRmZoSWhYYlI0ZTNjLUpmM3d2dFR3dmZQUUxva1VscENVMDhiWUpxMTN4X2UxSFJ6MnczTVNJWTBycm03N3Y5QkxZM0lHczQ3RnlaVmZvUlVoS1BYVWs1RzMzVkdqczBtTFZodDlpM094dnZ0V05QYW1ac3Bod09taHp2RTNKVGlUS0pfVFdQMlR2ejMzLThIR3pMSFRFSEZSazU2QW14d0g1UXJmVjVYeHp4SUlXTTNfMW1XZk9IbWZ5anM3b3lnaklCVGVwekMwQ19fR2s4YlhYYlBDc01QNXdweDgzTjRTekp5NlNmLVB3STZRRS1sVzF6Q0NuZGlRLjZiRW53a2NEM1FFclI4YmVmNjEtd0EuT01ST0ZVbXU1UlIxWlRKZkVYMzd3eDlUQkM0eE5hYnNKVGd5RDUzeEkta0l5SEF3SFJEUGRUOFVQWThMaGRVd1BEUWc5Q0ZwWHVIWWNoajZ1dUtUeDJYYlVZNnlNZU9DeVI0Qk5wVUh0RU1kV0REMENTMVlUWlhzcG1Ha0xWMl9qNDNMQXJ5MTdYZ1FSQjY5YTVmaWJMNVFwdHhHRWUzRTNwY2tpOE56UV9VNGdkbnRqZU9nTS1qZDNMTXdjOFNrSFFwNzdLZUVMYW5Iekd4bThwTFJRbHJqaVprXy1LSldDMkhWM21KSmFtWUZmNVhYelVaOXZFc21YYkxRMUFWakFMa2tIcGtZYlA5WEFkZ0FYbFE2TDI0dnJsaURwQWowLUxjTGJGbzRrVWRuTlBSbkNSQlRjU3FqVm81ejR1Wi1vcWpqZ2sxM0ZwTDlJd1RLMFVSc2k2NzlhYVJyYlk2YldEVzVuSVFlQVp0YU1NM3JjamJEMmNsXzI0MnN0SXZmTEZmM3lxNkVKY29CekhEZHMzYWFsN1R1cW96XzYzU2tjR3dPRDFjVzJuQTZPQ0RwdmprU2FDVkRzdjlyVUROUVltR0l3d0wwLWdmMFVmOXY0ZUxHazhXMV9fbVRzc2o0TDNfWGkzRU5QbUgtclJJWWFRNXJWamlyQTd0X0NmVGFTZGxubDBxUjZyRkRFWHdTSkV0YjFCNGRrM3hHblJKZzhPcnF0ZXBLZlBMYW42eWhXTHZxUTJndHY3T1VrNWxuUkg4THZCalA3azZIc3puaWt4bmZlN1hqbENTY1ZBS21IVGFCcmo0eVc3clVCb3c3RzNxLTN2Si1tOHktNjdhQlFrOXA1d1V4bGRxRmlITG5McFFsYUZaUkNzSW5ZWk9sV2lJM1pvM2RYVU1HU2hLcTNYTkNsdnU2TmZ0US1KUVo4dDJSZGJKUlM3Vlg3WEFTSHV3ZVlTa2pQUW91RldkYnVRaFcwRHBJbEFXSFl6NGFhcXdNbzFUX1BTaklMRmJuOG5jcUhtOEhxODF2T1pvR0h4YWladkE0dU0wbGI3engzMW5TbTR2c1lLeklGZ0xNLW1zUi1fV0lNSU51Z0IxYV9mdkU3X1BzSnl4SktDVkhySWRYMGZRUGpoX0Y2Y3FlWEN4c25EV215R0NZVkdRaWoxY3NOelVkXzdZdlhtZUluQ2pMeFNOeW5lZDI3ejFjR2xCMzFTMGVheGJyNlpycEpwc2dqYWRCQUZvNUxvNE1OV011c1o3QWF5Q2VON2NXYTBnbXVWS29IblEtZmFUanVlMTNIS2syaG1xUUFXUExjMVUwQVROQzR1NVo0bVBUNlVld0hFYUlBNUxhanhTckc4anloRExRTnh4bjBOemNxLWR4OTRjUTVUMnFrcFkzMEhhZjB4UlRvbF9Ecy02T09KUWxxRm5CQmwwRF95dHdmSmY2c1lINGxsamF3Q2xBX1R6TGg3QzZXRFdZTC1DWHhfbUFqcVR3WkJHOVVzQkVsaWNod21tTHdGNG9udHFRX1gzMWo4WjlRek1leExwMS1FMG8xN3JfaFJvcGNaQ1FFd2M2RzNob1lOMU9HWlRPNENBSGdieGdyMVNBM192dTlSbkdrNTB0dER4cUVLSXQ0Vnl2ejFjWEZsMFVIcVdhYTdHaVZtdGFEeUM3djBHekZ6b3pIT2VUTVN3OGd0d21lWDJTWlluZl91WXQ5bmZ1VE1sbm5TWUR5WDFpZU16REk4OTM0NHZ0bUlYVjdoWEtrWHBhN1JwT0p6Zl90YTJZS2liaTNXc1pOVU9tYXhjWmxYc2tWMktlZ1F2ZXFQYVptajk1UnhQZHIxOFdWamxVeXgwRE5IMVk1dFlNblBrUmRzb0dKeUFXR01ZWGZpUHhFNmhvZGNaZGdhOGN0dVlBcjhnRHpmOUQ1bldXaF96ZWEzelNWMDJlOGF1WVFwQVRJNmlZMUgzN09jV2FtTHBUZkhlMC0td2xkaEZiWkhmQl9ZWV9vZjhyeURwd2dXRTRHT1NFa3pMcTk4Zi1QNzMxTGI5ejVyaEVaQlBOdGdLLVhDVmZGbk5EYmFzSkdubk53Zm1IaDF6aXVvdDREQnhrZXlKMmJHdVlVR3RpTjlaVTZRdG9RSTJmVm8wSW9mYm9ZYUMxbW9iV0doaXBrck5CSTlmOE1oRERIbFVRN1J3bXZRWTJYOVJlaEtRc0xIdXMzRXFIMFRvZEkzSDJZYWVXM19zN0NFZzdleTBzTlJ5VHo2SzdSUTVtV2pUY1FaLTBBZTJwMzhwZlQ3cDVxWjVZUkNTWXJmaWNWSVAxRE82RFhXWW42T0NvNDRTQXlEblNOWU1aOWZRWHNUNm9aLVdVMkdmMV9CWjc1alBYazR0cWs3MGVvSDZsM012WkpIM2RPOXV2VVZjV09keko3a1lQTUhMOGlLaWdObU5hT2tVRlVrNXNwdUIya003WjZ5dzJpekpqOEtOcHNHTTE3UU4ySElKRGVwVFlJZHM5Q29zdUJwT0ZHVlpERkpRbHpBV3U5OEpDTF9xRm9GaVQ4c0JCT2dFMjN6TnZ0MFJvZ0kxa29ILVU4M2ZkTDYzRmxndHJFMHdvLVhZbkxqX1RwaVhDVlRvOC1jbTF4cEczVTN2Z0lHcDZTNXBLdkF0V1JvWWhjcWxOQ1htdWl4R2xKN0MzeTdoT3hXZWxwcC01d1Vzbm5vNWJ6LXF5TU1nVUh2Nlc0TzZaS0xvUFdpV1NoTDkyTkwwWFM3N0plMG5LUUtncjFiWDMtcDdrb0pSZW5NNXBQVHlxRTJKZnViaVlNblRvZW5Idzc1cVo4WnBRbnpBUlozNnBBNTBDNmRqZnR6MW9TYWZDVXM2NV90NnV0dks3QzlwWXN0a0I4LXp6UlVQZUlQcVRCeDVrWU9PcmR4Y3lrWG5VOEZDN2Q4TTF2MGotMjd4d3RydnBwRHF2Y3N4TzZRSEdXLVJKRkF5d2ZHbDRwUkUzRkZGd29BX1hHNEZnRUM3ZXRPeTVJQldWYjNPNWtldHEwQjZJWVRJMlpHWG9KTFVRanE2UEsyeEc5ZlVqSnVwZUNGRUhnNk1qMTNTeGduX0VsQ1hqNTV3WEpvV0ZKTWFjcExRTm1FOVVBWjIxYU9lbG8xYkZzYVdWcmVTdHFzWjRlV0ZYX0tjQ3hNbENuRm9JV0pta0ROSkxvLWpfQllhT2JJeUxmOHhXWnFMTUFiaks4U25vMHRCdWN2UFJxWnJhVTdwbGpDT09YYlp5SFI1YnZTVUxzU3MwbVQ2YkEybG9Sdl9vQW84TXpoTFF4YXVERnBRQ3gwbl90MmlTZjVMaXVaY2xwNzU0RzZ5RUNBcUJpWTRIR3VmSXRLbUxYdTRxVUdwaXJCWHpyYTZUMXRjQkluWnJsejNDOVg5am5rdkp6WktHeXFVa2RnZ2ZZM1BIcDduSEhLRFZZS3MyeWJJM0l3LUdNN2wyRktpOW9MUng5cFF0dVo5MFc3VXNmZ3kxc1FPNkZ0VWlGZVEtSHBMdFAxODZLUWJQU2dTb3VVd0tKaG96aWEzUGlYYzYzSGgyQWtad2RNVFpPNWZPanc3WWFoRy03VUdkb0toNm1VTjJjX0xXQmNyZmdyd09uaHZXWndEVnUzU2RMZ1RPQnJLeXZXckJ4V3hEb0hzNm93dVZlQ3pPdkctQ1VvNS1fUmxWOG9aV2NhTG81dUQ4Z2o5ZXdJSTU4SEd3ZVdzd25MLVZoVWJ5MTJIUTBWdm1iMktKakxMLWhVb2F2akxFMEd5aTVCRjJjNENyVnFfZ2ZDZjhEWDdiS0VJY1VSTkIxYnNyVFE4S3hfQjZXSnA3RFVuU0xYQjgycDlaNEhjV0pvYzF2YmpDcDIyRjJPa0I2OXRGSnBTQ1d1cEZqcFdsVEV2VXhOSWw4aVdGRzNUUTZKcVJmWG5RM08wZUpEUWJQOFhSUWlNTl8tRFo5UElUYi1aVHJOMzlyQzlCZXVKV3pmenZMbERrT2pmSUl5ejZ1WXF6M0VpNmJwalVUdDJNV1RSWWVRcHA2a3RaUmlMb0NfSDdIdUREZWt5MlZOemstaExQMFRwcHphUTNJdWc3aDZRNnBTRFhnby1LNnlGblFXWU9paEJpUXhKNy03UVplQXQxWFRYTTdETEJWQVY3ZjFRVHlIcDJCalZOZTk4YWhmVEUyV0tHZFpVX2VrcV9TVjlUUlJuZ3JrMXlNRHJrcTFxc2VDdVU4bkREQnBpLVh3OWxaazVVcDRMQWtGbDcxcmVQenFjT28xdnF3OHpoSGEwMmphYUZDS0hVSVV0ZWpuS2ZJdDRlbjRrZ3J6YWlMdkIxd2s0TG14MnZMdEIxUnktWEQ2V3hna0hSVHBKdFhLYzNzVmpDTjZnRnc0a2E2ajdEblRrc3E0ekJyV2dTUGhXUE5QZDB2aFAwZW9rUnpETkdPVzVKYkI0RVZKdmdsdTlDWlA1bExMb2lJSzk3cTF1RHl0ZDNXa1FXYnEzaUlTTjFkQmotUnpmODZxeEZ6RmJMQ0laVkktX21VVktsRUZvdEZBYTBaejAxWFF2X0l3ZVR6WlVZUVVaem5LTjJwdzBMZlFMZklUMlBRZFoyQ0lWRWpwbE1Pc242dzRqOEY0NUhGbGg1eXl5RmRjUmJpQ1UyYzk0MFIwNFFqUG5CdWlIU19Pd1dhVm9JQ3VwRXRvV0NFNXFqektLZkxnNTJRQUNrcEM3WnBvZHcyR1pkSE1UZGZCUmVjMzdmZC05RmlYejZsV3lBRjB5QjRrOWp6UUx2Ty1vdnFWTTJoelYtazhKY3gyUHJhQkRZU2NVMHVCa3BOakVKaDN2LXp2R2tEVVF2RExia1IyVmdQWEF6NFNwMXFZQ2Uwb1AyWVF4aEpvbzdjQkFYVUZ4S3RLMHdBZzE1WWloekVOLUh4WjdhcEZpRUo4OERRZXIyNEstMnp5cnd4N0M1UmVHVWpVdlM0TW43dUlMYnJ6dk44dmZUVkNXempsdFYxang0bTNqaHpZbWdtYVMtWU9aQWtCTGdDNzhFa002a0xiNklaZXNlZVVPXy1CdmlXVkVwTTBjSWtPa004SUI5SENobWtWRURhbUdGaVlRV1dhWmlwUWVWRmQwR3Qwc3A3Tnh3TjcybTJIZnkyaGRRREdCd0pob014ejZiRzdWUFFrZ3NBZGg4QkpPc3U3RHhGVTFVeWxOeDlYbUlnZEtmOHpjVGFiWURNT0g0bEJicTFyWHdBazdQZzY4OHZkX0l0T0ZZMjBMYjBVejNkUVVmM3RsQk9VRGdxMHFyWHExRm9PTFlwbHZRZWIzaW5KUDJ5RFNEck9XdjhwMDJXZ2RjMHRhRE1RNXFtUnV2U0xhYm40dlAzOHBPX3VPbkNwaWxiSFp5UFM0RXNPY1BjR0dha0FOaldjWFBodktWYjh5RTFXR2NkNmpaUjlnbVFOMDVHU3JZUFZVNlJZUmEybVJ6MS12TEcxem1YbkNmamcuOG1mQVBTblQ2TzVncG5zRDdWekNDaVY2MVR3Ymk1SU9VeFJzbi01MWxXSQ"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934","attributes":{"enabled":true,"created":1619574139,"updated":1619574139,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '29052e09-e199-4415-a9d0-abd00b15426b',
  'x-ms-request-id',
  '938daa65-b4ae-4fcd-8886-9275871b4403',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:57 GMT',
  'Content-Length',
  '286'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619574237,"scheduledPurgeDate":1627350237,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934","attributes":{"enabled":true,"created":1619574139,"updated":1619574139,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '1e3d0b55-d7e8-4fca-acbb-04e2859d44c4',
  'x-ms-request-id',
  'fa9d0983-6b92-4170-ba0d-35091ec81930',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:57 GMT',
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
  '9bbb0137-e9b3-4b1f-bcb2-ab063cafcf03',
  'x-ms-request-id',
  '296ebb34-8a7a-4c67-ae9f-e0eeaa17ebaf',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:57 GMT'
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
  '18716b32-ac6e-4a33-b03c-e9999143f18b',
  'x-ms-request-id',
  'bf9e9c0f-76a9-409e-bafe-f225539429c0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:57 GMT'
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
  '60dd5479-476e-404b-b561-c67032608c05',
  'x-ms-request-id',
  'c506cfb6-3e62-4438-8e6d-8ff62435719e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:43:59 GMT'
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
  '478edf7a-41fe-4bfc-8be4-01708aa593d7',
  'x-ms-request-id',
  'cb582b4f-9a2b-478c-b8d7-2a22d4b91281',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:01 GMT'
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
  'fbbca251-4d56-4115-9b6a-a535882ae5b3',
  'x-ms-request-id',
  '7bdef075-6c05-42f4-b909-e6ec5d1a2502',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:03 GMT'
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
  '50f7b479-8b2a-43c7-b1fc-85c9df6734b3',
  'x-ms-request-id',
  '83f7f899-6bbc-4720-89a4-c8573ff9d520',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:06 GMT'
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
  '96ce6be3-b30f-43eb-898d-f5083836b655',
  'x-ms-request-id',
  'b5ef1d83-0b28-4b34-bc15-de51636629bc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:08 GMT'
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
  '5bc72bd1-1daa-41e1-8388-a98b607e2b91',
  'x-ms-request-id',
  '46c0ba91-ac06-4169-8ec3-0a5f0d2164e7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:10 GMT'
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
  '779d92be-3005-4315-afbe-ebbc7fc17baf',
  'x-ms-request-id',
  'e4eae0dc-bec7-4997-938a-60737115db4f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:12 GMT'
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
  '6f0ee59f-985a-4a01-9fb2-0169ddce0f19',
  'x-ms-request-id',
  '83addc6e-46d6-4d1f-96d2-2c84d82d9a85',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:14 GMT'
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
  '8d2161f0-a8d8-4eaf-9182-0feec57f3a9f',
  'x-ms-request-id',
  '0ba96084-d404-4606-ab32-9a9f0444af8d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:16 GMT'
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
  'e3317a03-75a8-4b2e-892d-4ee82d25072c',
  'x-ms-request-id',
  'a17b12c0-c32a-47c4-a6a1-86ce1b7dfda6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:18 GMT'
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
  '28d6c221-ddb8-431d-b7df-a2019d77cfff',
  'x-ms-request-id',
  '49f94f9e-6cf9-46fe-9a3a-ce4cac17c4f1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:20 GMT'
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
  'b47e47b2-32b3-4576-ade4-02e341bc538f',
  'x-ms-request-id',
  'b791f95e-3010-44ec-934d-ea58b36054a2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:22 GMT'
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
  'c01562df-5060-40a1-8018-55565eed562a',
  'x-ms-request-id',
  '84d16033-2c9a-4c2a-bde5-423445caf504',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:24 GMT'
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
  '9f1fd2f9-40ee-4a3b-9191-4721c8556eb0',
  'x-ms-request-id',
  'd1d94f06-be4f-4eeb-87ef-3025c205af71',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:26 GMT'
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
  '37b19f81-bd26-4d37-a4d2-9908e9e0e30b',
  'x-ms-request-id',
  '772f1fa4-0237-49a0-8c08-121abe76122e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:28 GMT'
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
  'b93f4943-522d-4c7b-ac97-6e275b493721',
  'x-ms-request-id',
  'b61ecea8-02bf-40ca-a2d3-d49f1126ef54',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:31 GMT'
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
  'd3b89bae-001d-4208-a428-affdfd5c7f50',
  'x-ms-request-id',
  'f204b9fc-e4e0-4280-839d-a50eb1a00e11',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:33 GMT'
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
  '80ae3670-189e-4f61-97b4-1087d0fa6a72',
  'x-ms-request-id',
  '86b50c66-0d9b-479e-8fa8-98ac8741617c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:35 GMT'
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
  '2e3318fa-d0a5-41e9-8085-1e9b903e3928',
  'x-ms-request-id',
  'd2f8f2e7-289f-4226-a618-5e91909a0795',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:37 GMT'
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
  '5ae172b6-cb7e-4ab0-a896-4ba2178bdeb7',
  'x-ms-request-id',
  '95cd0190-68d7-4d00-bfec-7dff2a2ea990',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canrestoreasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canrestoreasecret-","deletedDate":1619574237,"scheduledPurgeDate":1627350237,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canrestoreasecret-/a0a1398248a44502a0090e60a1733934","attributes":{"enabled":true,"created":1619574139,"updated":1619574139,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '46aa6543-256f-4d59-bcbb-f9900c209548',
  'x-ms-request-id',
  'b06365db-d894-45a1-8d86-196244fec66f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:41 GMT',
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
  'c31376f3-ce2c-4d04-9609-ae68dc08847e',
  'x-ms-request-id',
  '5c2b2292-ed0b-411e-ac51-bf25600c5a4a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=24.19.55.121;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 01:44:41 GMT'
]);
