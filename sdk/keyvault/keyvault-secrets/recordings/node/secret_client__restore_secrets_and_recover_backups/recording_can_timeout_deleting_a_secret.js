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
  '5f5945cd-9f5d-48a1-a54e-26e73c32736b',
  'x-ms-request-id',
  '8be468b3-f8be-491a-bfbb-7f0a3bd8959f',
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
  'Wed, 28 Apr 2021 01:44:42 GMT'
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
  'f635684a-7be8-47c0-9ec2-b923c9a73401',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbAQAAAM60GtgOAAAA; expires=Fri, 28-May-2021 01:44:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrkq27a86XljVHdNHCBc2K6auc1HXxe1IDgkZLtFX0lJTO1XZyI5vNUMt-L-PajPJGmGTwhLUpORydFC1ZXzIIPmoeUaIeunkYscsI9kwNm2B9EKDx3e2oaUywr5BlWkt__bsmXyRS_jRy9dQjmFrqBqS73qBiCxCCpl1p5yCFAy4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:44:42 GMT'
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
  '9a98bc7a-8a88-4a90-acf2-be325cdfc100',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbAQAAAM60GtgOAAAA; expires=Fri, 28-May-2021 01:44:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpOU54d_AuqGvhXwf4Gp9DbReDhlmQHuUMRgQIq4cfsXfKGMY2iWfJECZPzKGf8RNeGstr4uPfbnSwtkdF0HuKcpGQVj7Grtk1rpRaJKq6XJE_5QWFKihg97uYCbHxgUKEKG1TTKKFQT_aO6NK7Ih0Rm3zQTHYerSDpUtxN_Q240gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:44:42 GMT'
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
  '01737d7b-1b97-44f9-ad7f-f4245604e800',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbAgAAAM60GtgOAAAA; expires=Fri, 28-May-2021 01:44:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:44:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/8064119a16d9496daa966156d414dee3","attributes":{"enabled":true,"created":1619574283,"updated":1619574283,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5f5945cd-9f5d-48a1-a54e-26e73c32736b',
  'x-ms-request-id',
  '87e1db0c-7a5d-4017-91b9-6bf28418274d',
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
  'Wed, 28 Apr 2021 01:44:42 GMT',
  'Content-Length',
  '308'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuWjNpc0J5bGNsYUh4LS05TlQxdUFTd2JoeTJwb2Vwd0tGRjhjQy0yNGxtT2F2cXFIbW9YM3Z4c29YSkhoXzBoLXFmUmd3V3U3NjJEMDFjZURwZG82S3BqY1BTTlpGLVhNckJEQWJPd3k4Q3B3cTcwOWl0YlFkWXVmYVhsc1pBLVo3eXFBdWU1UVFsQWxVRjFWSmEwRVV4TUt4UTQ0TGdsbVZUOFRVYkhUTkdsZkREcFU5VEM0N3RzS20ybW9WU19QM3VyRW02cjhHMkxJVnV2dzRYRWlBT2pSdzRCZ2FKN3pEWlN1M2I0NVE1RmNxejZqMi1JNzFEdGMwRE8zT1laN1RrZXNpa3ZFb1NNTEI1RFN4M05NbVZTanRud1lvcXRZcHM3TE12anBzV0Vid0daRGxnUGhyNVQyam92cFRHb2RLM0tUU0ljX0EzaTJZX1RydXBNdVhRLkw2VGZ1MjdzLWlmNFczV1YtTGNCUFEuemVZcC1PaTJIVmRpRklTcnBZNGppVWZSZGxDeU5UWDgybmJWOXl3cE95ZHUxenZQcTRpSkZ3dHRkN01Tb0FVVnQ5cW1vMEQ1SW9qaDY5TE5DWENmMDBpN094U1gtLTVEaFVzVVlEUXlKZWkyYU8xRTZGVWRUZDNkN0p2bUxlRVpRd093TlhiRUtCaWlDbERvZnpNTzBhMTdoUTZuLWpYUW1keHEwY0RzMTl6a3d5SGEyazltRnZOR0s2R1hZTERSczVBb1V5eWRFb2JBdE9JaEZtWXZNTWRaVlhHTVN6M0FpbGJYMGNscjZfcFUxWmZpdm5CQkQ3M3l2ZFNhVWxJV19fNzZER3hteVc2WmFUMjIxX3pSOHlYTHduYkVSWlM2VUN4MHpTZkItdzk0MGhZa2JUNEQ5RTdEc2dDU1pNVEpSMVFZbkJHb2RzajRrMW11SXcwWXRNMTNXOVhIM1pDZXp4cGczN2E0YU1VZ01XRmpjRTRxeEg5SFBvOFhYM3V6ejQ1WnF6SzdnekFXdUhKcEpxZFBuWGwwcXFLcVZsTGRGdjYyYk9Bb3dYa085Sno2SVROb29XVGlmLWdVT3Nsb0pnZHZxMG9STmJhSVJqNEU3NnI3S1pJeFdQVk1XY3FWLU9vY3BjRktMcnV5MUd4d255aDNoYXh2ZTNTMWRseUptU3FnQW1vNVJLc3d1TzBEYXdvU3prU1ppN1AtNGtFSDhIQmluNGJ3SWRWMUNaei15bGM1TEtmZVY0di1rRGkyOE1mb1FxTEZCdVp3bzkxVUFhbFFtaGl3Qm9zVGEtOTNwQjdDRG1Ddm9uOGVhS2h1M2RJd0tCMWd2ODJFUE5HeEZnTGkxUk5YbFFsd2FqOVljNEJjaWVhZHE5V2dFcWN4eG8wUnIxTGpWQmtFSFBXUC14R3p4M0FJTnN6a2tRWDBrenhDR2tLYWJRZGZDUGpyR2JOdmNsZ0lPdjNhZmNDVUljSFotdF9LYmN1bldCSUtRczVvRUlGM1Nma2Z5Vk11S1dmWDQybW5ZWWNBYlJSTGV5SEtndlFoM0sya2VPdVdudU1sbkYyQ3pYN0VrUnFyWFdpcmdJdzdqVllWel9hb1ZaM0VfUkxWb0U5bGNlTmdYS2swWURRd2E3QzVwdGlMZE0yX3Ixb1dmTzNUcTJDcEpUOHl6a3J3VnJfMlo5emp4SmdQcTBnSm9NcFIxY1ctZnpZNUFjQ0FnNWpYZHVzblg2dVpfeGs3UUZlaGF0QTZyVVZoX19pTWIwUlF1SnJYY3BNTE9YNGlrbWktZ3J1Y2ZvMjN4YlRUUGprRkpRUzZObXI0SmhXLVlrUVpJNy1SUk9xQjJOVmFUU0ZKUDBBNVRFbFFwNEJCYUE0V3A2SU1aQVdVQzhiel92eXh4MTJPY1R6YUZZX3VIZkd3OThHUW8tMGpyNWE4MjkxbFNGRm1keWRNcTRhdmNJX2d0aU5SVG84OFgyWmtPaUllLS1zQndYSi02RTJJcEZSbG9xbzA1cmE4eDdySHpEejg4R0FaXzg5cDFueTZValM5a2lfMHUtVVRIVS1LZHdYdUZzZDR1RGFXWUdDU3pleW82Y1VjSjZYdjBYUk80eGRSQ2o5UmM0SGlCYzF3WkRlOHM2Um0yRnRNS0VmcmRrOUQzT3hTaGNmUy0xcmlSQ3dURC1zeDEybmxSNHdpdGwxam9NQnYxeTZ1SG5fYk5wbk5CQlRNVEhiQ2ljdTFUaGllekJCaTdZdkJCRnhQcWNaU0NLUjRtdHpZaFlES1JWZUVxa1hOUWhFVEdTQXg3QTJwRU1SWkpnejBXWUpMWm1qY2ZGQUlXdEI5eU5fLXNIOHBNcjYxRjFZSjRNM1JYMWxMTVp6emVNaGtURVd6WGY3Z29RMlVkUkRZZWRJdzl3dWJic1p5Sjk4cTBkelNVZ1lESnZFbF9NWnRwQ0Y1RGVkSzk3WGNPa2JmRnQxNWNtcEE1ZDJHbDZoU0N5M2VRLU9ZSjN6VUc3aGRWdE8yejBHYW1tdG5ndG9ranE1a2x5dk13OENxSHN6NTJndDhKbFB2OTkzc3NLWXdOTXctWDlMQmwwSjBRNENKV2F5ZGpIWF9BSjY1YldsV2lzc2tEOHF6MU1TdEJYUW5WN3ZXZmNWdlZfZ0JHaHpjLU9QdF9PRFNqS2NlOGtlZ1dJOGtzTUx3NDJXZzRwamY4MVB4LTlUNXRjc2lGakh4bzlEbEhzdHp6cGhPZ1NfNkp6MEtRY0oxVWk1eGFTVWktNDZjcXBpTFFuNnNkSHZIbnduNGs0T1BfWVFlZnVSeEpwUllTaHJGNmxBcDVPSndfWWV4Y3BiNjdZdmRjM3VoSlRhTXg0Ml9kWmdWS190eWtVbGNkTG5UUXZmaUVRckVSMFlJaWtPSGtCQ2VsTldtYkFhMktRajd2Ym1qMG45TEdTMWJLdk1wenhHSlNob0tSVzZwVEdBNWpyS1lmcVFMSmJvVUlwNUpKdzF0OW03NExqNWg4b1VTQlBiVkhnUnVtMFFDdEFrdGNxVGhGb01pRFE5MWx6akg1RktqS21BbTNxYWJwMkVzUjdNZzFpS20yeFlRSmpJdGNRZWFWM0VFRzVLSnM4a1p3NXZIVGJwVFl2Y1NGV0doeFlnQWdSdENMSUFkZzVFbUl3bV94Skd4bVRPVDUxOXB4NFFtcmtLQTBHSXRJVDhFbThKU3h3aUdxcldiTEVWWk55UXI5OFItQlEzd3VHVF9VUmNxbnJ4NXdWNlR4bWRUN2VSclo5VlRsTnduUmc5b3NoN3RxRWY1RFQxOFJDWmhjMlZiVzlxd1ZRNDlHdFB0U04xcVg1QmpBYllzczZxRXR3Z0hHQU82YWEyQmJyNjBXa0tEZE1oM0NBeFJfUWZWTlFSaE1MYm1aRGhic3IxcFptYTVWV3Q2aVMzcndOQ2QwaU0yMkk2UTR2bWE2ZUxCek9fMDJPMTJUQTBDdlQzS011b05SMkZmQ19YelNMVldicU9jSll3cEdKTVg4TFJnTWpqV1Jmek1OTENvdUw1UkZJcTlfdVZOYTJKeXVhX1EzLWpsTjRRVXgzZ1ZRazNmR0RqSUtLa3pfS3VyWHRRRV9DYnRDdzFLd05uaDBadXJyMkVFMHdBWGNJLXRwVUNsdHhBUmFtRkhZVHMyVU1Vc0RBQnUyaUZUSXFNY1VSSWRDZkJmZGlCamlBYmFqd1pNbDVZM1RFalRiZ0NPQ2M2Ui1raGppMTd6NEUtV3RYNDRuRHlHRjMyMlNoUmpIWTVmbVY2UjhhM0Z5NlNOLXhPdFB4dXRuMHNOTVhaMm4wdmFTOW1ENWx3YkNGanlwRGRGNHd2NXpUREpNVGw4MldRTkhXbGdFY2JlTm80dDBlcnRTRlZ2cUVLdEF6dnFCS1ZSWEp0N0FydEx6Sk5NWTZhcW1URVpSRXdiS2dKR0lQVG5nY25xNHJuWkFZYUNIcm9mbXFOdTY3MGxTbVJzTGVOWXVrdGNtMHZHU1ZEX214STRMN0tXVWptUXNaanV2cEpodjVXRkM2bTloOXA5QjhHSkdsX3VHaUJmaUhkaEJIalh0RkRaaUhBMGVTSmpHVGFjc3Y2cHdsd3JVQVdNUDN4Y3BtZkZNYThRT2xFdmU5NUZpWG1jODJXbTFJS0ZyWnQ3c3JfOU1qTDRtUTZkNkNOTmtRSHNWODJmUjFHR3hQS1piaXN2SUZ1NmVFSHF1TWVCTFNmR3lYb0ppcS1SaGFWd1kwLWZLZVlFeUVvc1Fxc2hYSjRCT0VkQ2t5ZFZqSC1xd0ZLdXBYLU1XenVMQzJMSFRDZ25teW9qMXlkOEZlYVEtQnI2T3VhYllkOFl1Umoyd2Y4Tl92QlFkWjlBc3cyRHl1UWV4WFNwRE81ZTFud1dDcUV3NU0yT0pTTEhTVFZtdFcyd0ZUeHJsdlI4YnBFYUE3a3dxa3BndlY3SlZTOHFmNkRSTkJ2MGFLM2F5V3FNRHNQUkkyZ1pBSHpLSF9qZUFIVDAyU3d2bEFNSjBSOWpfaXIzVkpXbmpWSEpEYzJ2bXVCZm94cDB3d184RTR1SF91ZWZ1WmdBMWJYYmN2a0VyN21uT1R5WWVkRXVxQ292Tm9XQXBnVk1CYWpjVVVHY0c2dDVKTEtqS2kzbmdRQ2JZeHdaNUMwR3pfVUlsNmZPdWZ2MW0xcDRNbTFVNEg5WFo3NzJOQ2Q0cmU2a0gzN1JqRktEUXZPYVRTZkNZR011VFl1Y0JfT3BpcHA0QjdHbGs3OWUwQkJCV1BtajVvME9uNmJjVndTMWRCUThyRmFRaW0wblNaTDVHRF9UbjF6OXdpRGtZRlZWZlZsSk1xanZlbWhwR0llbVdfVzlUUXBSMVNBamNCS2ZSZlRCX2lld0J1bWFtRURzbGVKamgyUnlucUlkWFo5NjZBMGVqY2dJWFZqLTh1OFo0UTRoRmMwZ1hZQkdyOGNUZ2hkR0xJV0pXRVZZc2U3bnY2R2tHZ0hQU0VCMHdKdUllS0hYTHVUR2lBN1JjZWZ5QnFHclYzTDB0MHFTUm5ULV8wTWhNdmtrS3hfVDl4V2lOb253a3BlbElKQkZuSDJVdXBvalFXTjB6by1Zd0gwQ05iU0VjTWdYUHktVTJEbVctQTRvamlUTkk1TkpObVM3LTBvVW1NV3MtOTB6QlAzRDB4Vk45ZmpvdDVvYmxmc0lnNUpfUDcwRV9vTk5RcEJLMXlKYmtIT1NwbnVPMUlzQ3cwaHA4c0QxTjk3UGgtTWhLXzdzQ1NlZkoxQjZRamM3cEI5RkkxZXRiZ0N5end4M283MFY3Y1VTNXVHQ0V0Rm1hczYxbTRoUkpCZHhwa2xYdHpRWTA1LVRuOENZVktfbEFfLU55UW5oTmo5MkgyekxLek5DUUViMkF6OFBSM0lULW92TXo0VjNuVXpvMGtfcXNvNGFUTFhTUWpXVV9DRFdZSF9ESV9NV1RLa3d2UWwzNVJ0d1E1enMxek9JS29ZWDduaDJVNWQxVl9aS0x1UkR0OXRyaVp6bWVxcEZTTldFTXUtR1lKdE96Wm84ZE5HOGRWdW81dFJxX3FWYXVzb2pva3Z1U1BTeXFhaklhV21WUzNvSG9rMm82MUprNUwzRVNYNmV3aXg5U1RjMUU4d1NkRGhjRHlqNkQ0YUNEaFQwODdCTjhSclFyT2xGd2hwMTB3VGtub3o3Z0dfMzNhdl9hWVk1V1JYeXhfQm9IVFI5cHhpLUtHcUFOU3Vnd25JWHJ3VnFvWTZEUnhWekZJaTVpcEVHYmlBVndUY2ZPWFFWUGU4a0YxVEh6ak5FR1BnY3FHN0ZPc0NtMzMtTXdkRzYwcS1PX0tad3N1R01USmlHMWVHekp2cnk2NktpekxlcE1Xb1hIV1VRaGNPVGltUml2dWIwdUVPa0dNbU9mOVNXMG45ekdwSDQ1TUplTjJWMjhiQzVnS053YkRxb0hIOXVySmdDRjlqbVlGdi05dnBQWVg4X1poQ0pGcGdwUVNhem1LQkotaFUuRE55OGJ5dzhILW5nS3BCVWdhNlhoY1dBbW9IMWtEcGNSdmRrWFBnRUIzSQ"}, [
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
  '0cbc1958-126d-4281-b512-d5509ffdef8e',
  'x-ms-request-id',
  'e2b90571-12d8-4ed6-be6a-bf28e5f3d82a',
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
  'Wed, 28 Apr 2021 01:44:42 GMT',
  'Content-Length',
  '6294'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1619574283,"scheduledPurgeDate":1627350283,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/8064119a16d9496daa966156d414dee3","attributes":{"enabled":true,"created":1619574283,"updated":1619574283,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '7ca0a97f-e746-4864-8ab6-ca0bf38e262c',
  'x-ms-request-id',
  'c354aa7d-f55b-45ba-b5dc-8a3ea18e8193',
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
  'Wed, 28 Apr 2021 01:44:43 GMT',
  'Content-Length',
  '493'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7342443e-9773-4d32-a50a-f0e552dce17e',
  'x-ms-request-id',
  '4c09ed96-7862-4386-87f9-3307a60539f5',
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
  'Wed, 28 Apr 2021 01:44:43 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '228d9451-d2d5-44a3-aa59-2279c0db3931',
  'x-ms-request-id',
  '520788e8-c381-48c4-aa22-b573f9554212',
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
  'Wed, 28 Apr 2021 01:44:43 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'efa4c321-05b9-47ce-8ab5-46423540c26a',
  'x-ms-request-id',
  '7a528178-6fe4-48d3-8014-318f809e177e',
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
  'Wed, 28 Apr 2021 01:44:45 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0105b529-6ce0-4114-a63b-8fac036805c5',
  'x-ms-request-id',
  '94a83ea3-3570-4f7e-9c8c-21c987b41ce7',
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
  'Wed, 28 Apr 2021 01:44:47 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c82aeffc-cfc4-45e0-9480-7461269aeb49',
  'x-ms-request-id',
  '760ffa7a-4b44-4355-8cfe-ccfb7cea24f0',
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
  'Wed, 28 Apr 2021 01:44:50 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '811ed990-49f6-4c0b-a841-d01673ae01ad',
  'x-ms-request-id',
  '05e7593c-c471-4e4f-bda9-79c5276d85c9',
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
  'Wed, 28 Apr 2021 01:44:52 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '006ed9c4-ad73-4abc-a7e9-c0c6f6a30d0b',
  'x-ms-request-id',
  '6b43b201-8ada-4aa3-909e-be90ae70814d',
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
  'Wed, 28 Apr 2021 01:44:53 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bc52b705-d19b-49d3-a314-65c400b7d3b8',
  'x-ms-request-id',
  '16ee251c-71fc-4311-a734-fc139136b02f',
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
  'Wed, 28 Apr 2021 01:44:55 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0af5101c-0e33-4de4-9949-5b3e7b0b2769',
  'x-ms-request-id',
  'a159db15-686e-4cf7-b562-8a169ec92da1',
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
  'Wed, 28 Apr 2021 01:44:58 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '2becd268-554f-4d80-9605-d56f113003fd',
  'x-ms-request-id',
  'de043929-fd91-443a-8cc0-4f1ce2c086fe',
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
  'Wed, 28 Apr 2021 01:45:00 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '824bbda7-a9a2-4812-a6b2-b49888f342e8',
  'x-ms-request-id',
  '65044b38-2d47-4feb-9a6e-825d60c0bff8',
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
  'Wed, 28 Apr 2021 01:45:02 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1806c83b-6293-4ac8-8c41-6369bb220723',
  'x-ms-request-id',
  '334ccbea-f69e-4da3-98c2-9464a1655f9e',
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
  'Wed, 28 Apr 2021 01:45:04 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '27645192-c9c2-46d8-bb76-f37c072ac5af',
  'x-ms-request-id',
  'fc6ec23e-331e-4767-a541-7edc365b310b',
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
  'Wed, 28 Apr 2021 01:45:06 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6be421b0-85c9-4ad1-9aa9-4923fa414e6b',
  'x-ms-request-id',
  'fe2cb491-a81b-4fff-8aae-4ee652c63970',
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
  'Wed, 28 Apr 2021 01:45:08 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8bc20e43-c6e6-4d4b-9248-76f2dcb33088',
  'x-ms-request-id',
  'dae93529-a649-4c52-a380-ef545fe1d270',
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
  'Wed, 28 Apr 2021 01:45:11 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ac369687-3f13-437a-be4c-905f77b636a5',
  'x-ms-request-id',
  'ca3cff78-7eff-4bdd-b5fb-7ae5b2fd2677',
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
  'Wed, 28 Apr 2021 01:45:13 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '414e64e2-de6e-4ee5-a31f-7a910636468b',
  'x-ms-request-id',
  '9fba2862-77ba-49ea-a586-d717ebe199b2',
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
  'Wed, 28 Apr 2021 01:45:15 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7f2baa33-aa96-4e90-80e9-cf0d58ec7cbc',
  'x-ms-request-id',
  '43ce11cc-5a90-448b-ae49-a7dba6fb4745',
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
  'Wed, 28 Apr 2021 01:45:17 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8ecd8ea6-37ba-469e-b9c4-68567aaf6de4',
  'x-ms-request-id',
  '32611584-cf49-44fd-833a-3b4e5d31430a',
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
  'Wed, 28 Apr 2021 01:45:19 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e10de19b-f138-4c11-b7fe-ffa8a978207f',
  'x-ms-request-id',
  '6533a537-057b-42a5-9222-11bb8f1c444f',
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
  'Wed, 28 Apr 2021 01:45:21 GMT'
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
  '141',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '627a60b8-4bcb-46bc-80ec-2098a3828cee',
  'x-ms-request-id',
  '169593b4-fecc-46b6-90c7-2d2b55ead777',
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
  'Wed, 28 Apr 2021 01:45:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-cantimeoutdeletingasecret-","deletedDate":1619574283,"scheduledPurgeDate":1627350283,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-cantimeoutdeletingasecret-/8064119a16d9496daa966156d414dee3","attributes":{"enabled":true,"created":1619574283,"updated":1619574283,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '438adc0a-f6b7-4d51-a69d-146bf52e53da',
  'x-ms-request-id',
  'c4c82a95-bb72-4d6d-ad2e-7feee8c1cd29',
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
  'Wed, 28 Apr 2021 01:45:26 GMT',
  'Content-Length',
  '493'
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
  '83f4de51-0d98-4a60-a76d-edf55a68cc3e',
  'x-ms-request-id',
  '68ce1ee5-4103-4036-b13d-4feec3eff668',
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
  'Wed, 28 Apr 2021 01:45:26 GMT'
]);
