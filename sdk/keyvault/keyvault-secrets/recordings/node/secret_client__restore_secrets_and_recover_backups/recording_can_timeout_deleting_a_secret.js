let nock = require('nock');

module.exports.hash = "dc5f6550fbca3d2d78218c5414f34faf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f56e99da-f6ca-4f61-88dd-963150383ff8',
  'x-ms-request-id',
  'efff7524-9b96-4633-9d3c-481b3973365f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT'
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
  'a1d7cdc0-6277-4808-bbd6-bc2d07f10601',
  'x-ms-ests-server',
  '2.1.12651.7 - NCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AmLgShH_4l1KgucLqksxEpU; expires=Thu, 26-May-2022 22:48:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevry9wW15ljJ2_OPOTJ4wnTSPXLEYRcspDNGeYrsDUrncTmd12XjUEHF8QeKaA8mg6wmA2Ujvn9xBbz7mn1TWZhp-9ltGhQyrD5UzvYIetnysCkIvgFaLutjVMLQoLVSh0GvCo3XEDgiu1eIpbqJAQEKsG-SB2Vu4d7qxtxvMt1F_cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '39b7b375-0cb3-472b-a18b-4199219c0500',
  'x-ms-ests-server',
  '2.1.12707.9 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=As2v7O8fIIVLipMRbY1nhJU; expires=Thu, 26-May-2022 22:48:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrFRj0AkSPMAyn9lT08MkIcfGBI5ZHeIHEPRLs67TrPiA0STKfBAZ87N0bzymNRZS0KbWaTWSGlUAC-fdPLlABLJhyg5ZFXc8fOkpbJtE_hW4rb9Eff2_vMoMtY34BG_KNIIo9mccaAk3SUvP0UAHsp_VxrPtCpuTIpBcWOLBARzwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4d74dc90-10d6-41f4-b165-5befe1b8ebad&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '4cc7a8b8-e03a-476f-aa60-815e45687800',
  'x-ms-ests-server',
  '2.1.12651.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Aie1iMoAe_tJvlyaXZPjqhxPlvakAQAAALtt-tkOAAAA; expires=Thu, 26-May-2022 22:48:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/345132398fe24e9590d356314c109433","attributes":{"enabled":true,"created":1651013307,"updated":1651013307,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f56e99da-f6ca-4f61-88dd-963150383ff8',
  'x-ms-request-id',
  '96377780-57a5-4dc2-a712-0b57308d1152',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1919;da_age=1919;rd_age=1919;brd_age=7477;ra_notif_age=8559;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT',
  'Content-Length',
  '313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuajNDcVRPQ2dscE03TGtzSkFMNXc3TjJndjh6Vk1aSkFsc0JzQW12d1RmUVE2N3JqNzVPTWw1b1hPN29ZY21WNXlseUlsaGJadWhRVUwxbWdxNGZ0WjdhSTZEZ01zNFphVFdlSUhodWp3bjBpNFEtdFJUYVlDc2RiV2h3WDBCLUR5bmd0UzNLeU9XVXVmSDdNZC1ZaHJsRFBmRUdJdHNNSk1pb0JzcHFldkFiRExUSldSd09qQjFoRGxYT0JUNm1RYV9KVFlCMS1GSGVXdWhrWWN2QnlUTEhrMzBBd1g3N0JmcnNrU041Q1EtQjZRel9hZzhUTGZxNklJamlSWGxQaWxyaFBDaHdXNU1LVVN3dktGbU9jNUtUOFE3V3VONkdmVlRFdmxQUGJzRGhqMXZBYURoVDYzVUdSQ09hNlg1VVBjMnd1NU9LbnpYaWNyd1ZTZXNfZVNnLlEzRXNockRSTXR5Tk1TVjlHYUZya3cuNjk4ZHJMVVZLZGZPZjdnRjViUTJyNFVKVUFJVWJrU2Q4S2ZMcXhzeGNPb0pxalJBRDNVaVFHdGRPdlFuMVdLU190U19lVXNJMENtRnZrSlZrRDEyTktDUTZQN0pCRnRFLVZmYTBfUmZOcWpLNElIM2hIZk1OTDNLRHFvX2sxQmt6bTc1UVJBQUpxRHcxR3gwU2hNNFZPdm8zUlNHY1JJeElUbXpOSy1yVUY1bGF1WFVab21nSjJFcEZsOExQejJXQXloNzlhcmRtaHBFaEZMUkRwUGdDbUxabTkySEpjZlFLd2ZDb1M3V0RPQkJXRGNJcjE4bmNFQ3JXZGl4Q0ExQmY2U3ZnYmF2Qy1KMkdmMm9FREg5ei1EdHJCSlVFbDRGU3B4YVU1NWFFQ2hiOGpMZFM5bng4Q3pjUW5BbnRCUU9Fd2VRaTIxR3pFbjlzLVN6T0N6ZzUwblBsbHg2YTg1azVpaDlWdmZsYmppMldRYTUwWTFvYzNBMEJDak05ZEZFZE1kbzRoZG9qT1FmM3hoSzQ5VzF2UXUwUGhoNzZtMDVUeFg5RktBS1prN25wZ0oydU9RU0NmVUQ4R0xjaFlzbzNyRVlCbWx4U09EeHJrc1hWMmRYdWxVTmdVS2JXUjhCN05vblJFYkdqYkNMdHppQVlOaWJJdW4wTmpIdUliU1Jqc1drUU4wNGswcHBVOF9oTjB3czRwMWIyV1dtNG5WUDNFV0h0cFJUb2tQSmlqdFY3Wlc4dEFIVGZyOEJYeU9lT1dwWWtSYVhkRzFGQVJVdVY3dVpGd2JBYWp2Y0NUQTc3R0VReU5KLUMyTDhoQThPTHV5a01mNmFnLXBQUEU0aWtON196OGlJRUJ5STlnTC1pU1pjV1BFemkxcGl4QlZybTFqRllWWExscWMxWUZKQ05vQ3dkV01xcTd3OW51SklHNzRYRzBIbWhmSG9aakhTNHZ4X3lKWDYyTXNHOHBOZHJFZGxSU2t2UGxBelBRLTg3enU0QV85aGdMOHA5Snl0em9tWHlzOC0ybHdqN1M1MlNNNFNWT3l1aGNzSHJyRUw5U3hWMXlZQ3VQdlVoaUM0d2dlYVljZ3AwNlZVWXdvLXlxTnVGLVliZU12U09WSjcxUi1GcmpaYXIzd1VkbG5ubzBGNDZyMkFXNmxlNWg4R1VlalhWUUtxZHo1VDh5S2FjZFVCNFhBYkswM2hYOE5RazI5RGJhOF8tSEFGV0MtTXlQUllBdXNNOXVqVmpSSnVzN3RvRXBsektkTVpJbmU1ZmFFeGZ4cUUwOVplOXBVcVZkeG5td0w3QXg1c3drc29tUDM2aUlfRHNxS29yT0VyaU9aOW9wczgySWJHUzR4NDZVTzE0aEI5OERMOFF1WVpLc3ZacG54QWgta0E4bjVhbEwwaG8xR0cwdThKT0pQaWl5cnRDQkJ0Q0pVSjdURUJaQ2pycXppTmJ0VzZ6RnlGVDhYSnJfRnN1UjY5VDN3NlFSYWtiR1VaaDNvRFhPX3lvZ2FJYTNwdVlWVHpwTUZNYjZ1VWlBaTlfVU9uX3RMdk40dTFyYm50R1VObHNtdHBEbm8zWHZobkp1SUtiMk9RUmFKQlN1VURKZER0WGVFbVo2Tk1ubXlHNkhlVnd6OGhQOHZ2eDRiQlU2NjBCc0I4Z2UwNW9DbkVYSWp2aElCbm41QlRteFdZSXpwS0ktX28zbjVxOUNfY1dKS3k2eFlpU25MenI1VTNqZTBLVkZZbTNkdlFZLTJfOVUzQmwwLWJJZDBxb2RKSkJjaGRfWmpFTDdFYVhvUjdQZkY4aGRlS0gybzYtTlRna3p3RE5ERURFSndHMnJWb3p1VEpHZjlHbDlNU0RnUF9faFRlTlk4UGhmOHFmZ1ZXRElZMjFJbEpWYnUtR3RSdWVrM3JZcEQ5Q3V2TDNKdDktdDRIRng3dUNHb3EySjNydVE3LTBfT285blctOEFTd0I1Zmc0RXJ5OU1GUXczTm9fMlB6emp5d0ROcV9jdUpVYUpSU2Vzd2wzdVRYNEFhSktQODB2VG5GdWZwUjFSOHY1blYzUzd2M2dqb0Z4YWlUTThwd21vbU9fRHZNRVBnTDVtd0hSZ2Z5NXQ5SHNOWEI0R05DaFpQWEhRMDFvc0ZFTXpkOS1HMUlrN1pyd0pHdjlUZU4wLWp1VHBFUF9jS21MRF9BQ20zSWJZSnQ3SXlwa1BINW02TTR0SVB3QmpUOUxCS18tSUgwazlWMF9OM1Awb3E1NXRjcEdEUHNmUmZXY3RNbk5aa1NDTm9kZmZ2LWlRWmdlLXN6U1JQWnljT3hua1AxbUhBeG9QTUdoTVZ2RVk1MDRObGtnUTBLUEt4U1JSd2VSV0o0akxpOHJRRjBucG1yX1BCTjliZVlzWWw2bFRxMFNfLU05RnV5WDhxTWxBNmZZSmNqWkN6RjJMZTJqeVp6bmctUThfZHl3VTdNb0g0UnVuYjBkYlVLMmtSSk11dnREOUxtaWpMaVpzcFhZZXV0czhDY004c0lhN1BibGJnbEdmZnRrWGVWNVdmVWFVRjRYeGd0Rmx0UHhJS3BQcDVCOVM0ajdyTmxHYXNEUXVOUXE2OEdzeEJpSTNxRjhtNklNNFpHZklFOWlzdFFZcF9qOG42dG9ZMHQ2UE5idFJhNHpfMVBYN2FtVXlfbXdKMldBaVI5bm1DY3pEMUdWRHZlaC1jRVN5dXNtdDB2VkJ1cHloVV9oTVZlVDE3YVcxYzBaM19ob3dmNTBLVGhPSzFxVG95Y2Y4UkxsNmZLdkFST09VUm9JVjZkVjZLTHZtOUdoOFJmUnZsclZvR2xaNEpUZW5kSURPcGxXLTdaYkRHRDJaUVAxNjJLTlFRamhCOWVveVNheFpyS0lpMENSdmpJUG5icEFSaEpZX01RX2MwSGhtUGpnYlFVT3hEVjhlYllXUmJJWEt4OHVTTHZyeUdpaThBMFU2aloxWVpwSDVQbUdTektMc0swVHhna2RqVFZnRG93RGp5Y3NiVTBGZlM1Z1dMQUZCTVY4ZzJmYm9jLnpwTzdfX1FGWWE4R3dFVnZoT3VwT3ZsOFRqUGN3UHUxYXpWeHZxQVBhenc"}, [
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
  'fd134ee4-87b7-4a60-93e2-4ab70ac08df5',
  'x-ms-request-id',
  '0463bf1e-c659-4c61-bbb6-f1ad4ad2e0ac',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1919;da_age=1919;rd_age=1919;brd_age=7477;ra_notif_age=8559;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT',
  'Content-Length',
  '3819'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1651013307,"scheduledPurgeDate":1651618107,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/345132398fe24e9590d356314c109433","attributes":{"enabled":true,"created":1651013307,"updated":1651013307,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '535bbc2c-7043-41d4-887e-6cce00a8878b',
  'x-ms-request-id',
  'e2df5030-e625-4905-b880-4ecc361f92d6',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1919;da_age=1919;rd_age=1919;brd_age=7477;ra_notif_age=8559;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT',
  'Content-Length',
  '494'
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
  'westus2',
  'x-ms-client-request-id',
  '99a71242-66c6-40c6-82c6-bd0f149b9928',
  'x-ms-request-id',
  '61177982-3a2c-473c-9002-613fa2bda31e',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1919;da_age=1919;rd_age=1919;brd_age=7477;ra_notif_age=8559;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '46b903ec-b3c5-47f4-a448-87e133f8488d',
  'x-ms-request-id',
  '20854f5b-7a4f-4c3b-b4c4-67994c117e02',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1919;da_age=1919;rd_age=1919;brd_age=7477;ra_notif_age=8559;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:27 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '59c211e2-4056-4f40-9d1e-de4ce5615918',
  'x-ms-request-id',
  '9d07feb4-648b-4fe5-b6a5-3198fc3b0996',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1925;da_age=1925;rd_age=1925;brd_age=7482;ra_notif_age=8564;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1651013307,"scheduledPurgeDate":1651618107,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/345132398fe24e9590d356314c109433","attributes":{"enabled":true,"created":1651013307,"updated":1651013307,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '92b1a8b4-068c-4d4b-a497-0dd917d98d1d',
  'x-ms-request-id',
  '784c5374-9244-4339-b466-b5c46e112355',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1930;da_age=1930;rd_age=1930;brd_age=7487;ra_notif_age=8569;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:37 GMT',
  'Content-Length',
  '494'
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
  'westus2',
  'x-ms-client-request-id',
  '3c87059f-55bd-4e37-a3a2-ad91681a38a6',
  'x-ms-request-id',
  'ee3f1366-9b0d-4248-b1e7-41040c3537a5',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1930;da_age=1930;rd_age=1930;brd_age=7487;ra_notif_age=8569;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:48:37 GMT'
]);
