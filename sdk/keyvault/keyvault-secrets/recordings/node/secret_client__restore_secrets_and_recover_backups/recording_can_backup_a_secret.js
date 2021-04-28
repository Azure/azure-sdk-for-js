let nock = require('nock');

module.exports.hash = "d9b266a98c31754155e3c9e8b5f8ef15";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-')
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
  'f7c6e919-751e-4abc-962b-ba169faa84ed',
  'x-ms-request-id',
  '09ab82b9-8e9f-49d1-a1d6-36d80566b84f',
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
  'Wed, 28 Apr 2021 01:41:33 GMT'
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
  'bf645da9-134d-4370-890a-c610afae2301',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbAwAAAKKzGtgOAAAA; expires=Fri, 28-May-2021 01:41:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrwb0m-bwgWyBXaBFPo2fRK6pkavZqKRF65uEUTcGhOf1wKzHlpbDWsaRbFMJY4NbamkpsCalH9ZLhS-HSTMuUxcVVHzM9HDgp_irjqsmXNi8XLBvHW5ArIP4xoGo2QW_LWZua4SPNjlm1aw246JQTHlP5pByPcOtcFwZYV64gRvEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:41:32 GMT',
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
  '48f3a097-523c-4a9f-89cc-a2d9edd71e00',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbAwAAAKKzGtgOAAAA; expires=Fri, 28-May-2021 01:41:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrLjZStsu7L109o1Nj6KrR-cMEACRnl3j98MjSVTZdC0sBSjbiEo96p_9dcAtO5XPjJbKpLAgJkflb2j-ENThIvu9DGayOFfrEjBwU2364-2iD7lsJgXQEGiCA3lPHBjTVYrLSPVa-kwL_QA2nKtA0swbvyBJj7bBOdZ2W59fXIqggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:41:33 GMT'
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
  '48f3a097-523c-4a9f-89cc-a2d9efd71e00',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AkR6LPOPJSFHutaMN4V6Jo3mR1YbBAAAAKKzGtgOAAAA; expires=Fri, 28-May-2021 01:41:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 01:41:33 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/fbe0ca8d2df44694beeebaebbe78233c","attributes":{"enabled":true,"created":1619574094,"updated":1619574094,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f7c6e919-751e-4abc-962b-ba169faa84ed',
  'x-ms-request-id',
  '573f565e-69c3-4328-a624-c648a48e9dea',
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
  'Wed, 28 Apr 2021 01:41:33 GMT',
  'Content-Length',
  '298'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canbackupasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRjdkRE1JNXZMczl5YzJmV0hIQXFKcURyYjNPUkhvSGRLQUh2a3VZVzhZb3Z6aTQzOE56cTd2WVZVbm1qQndwbzFCSm5aWUNYMnRfcTJkWHJJSnVzVjJPVnVENkItRmNkamplNERMOGs0aFg0WXhMZ2VqWUgyS1B3ZWxPUklxNWg3d0pPdXBqdmVtWEpqNXY3eXQtRXVDYXJQZ1djMldsQk82Z1E2ZkQ2ZzhxMTRSN1NkV051dWhXaDhKWE1DYmczOWxPbldFdFZ5VGN6NW93SHZuRnV3MUt4R1l2YWVDbjdtQ2c0amNiWnhCaXJueW1YT2xwWGVKbi1tM0FNTGR3NGY1QWRZbHZSdVZzaEpkY3hyamlPTS1pd1JNVHBTT2lKWnN5aEg5N0hXc1ItYzRCMU9wR3lCRm1ZVHI5R1VyOTh5WFJOQUdxWmo0R1ZXLVkwcnpHb2JBLkhqcGZmV1R4MW1MYkdSdTA0WE5NeHcuejBnV184OEt0SVFpWEVsWHQ2c0N6Q0xCYUp6U3hCRHk4SkstR0RPWkVrenpiSUJMVTQwb3NDQ3BiOW45VVBocmhMaF8tYTNtdkRrVThlVEJUMjVqazJ6aGszcjY4ckd0aXlXU2ZJQUxUQzB3NS1NZno4MHJiOVRlSGhYb3JidDVGbFl0MUpHTXREOEV2RGJHX0JaQ3hTX05PT2lHVldXSDE3TmVVZHNNT1BnWkk0bVlDR05ZOTZncHlWcm9QQ2pqZUtqVmVaV3FTeGstZzd0ZzJzMzQ5Rkx4R0I1RFFvV2k3TFp2aVFGU1VhazhlaHlBMkRtUzZFYzEzYzdIRm5nOGdkREVrZWtKWVRIdU1kUVdjcGRkTmJ6LVp5UktkYWI0em1EY2liSDNCdndCXzRhRTN1dl9PVnhQVjRQTkJab3FVUmhMZE1EWDRPa2R3NE9GTDZiRy1SYkNyeHJNajFWa3NWcF9wb285VXctNmtSNTIzMXB0S1NhUUkxM01zVXVvX3NPOXBNX3NST3RKUW5JWlJFNFlDNFYyT1hSaGw3eTNWeVo4WDRuOTB4STc4cklUWFgxWHNROUgtREFzNnVDcW5HSXNwRG01Qkl5U1Y5OTduLUg4N3NySS1VN3NmQmRXM0Q0MHZsNklNOGRMRW9pZFlZMGl4UU5SQmdQc0FVd0RTS3RDUExYT2dSMFUwSkkzSUpUMkM3bGoteDZLbm1JOFRZMm8wYzNBMFJmSmo1VElaXy1kb01EUWhpaXVDX0IySGdHOEhHZHV5bmtUT3VxZHh2S0t0ZWxaS2dkVEtYZkl0aUVoQTJPS204dDA0bDg4YkFlV0lfZzQzS3lrRmVtRVNFOTN6X3BwV2lXSWRVSmNJbkxfUXFpQnBLX3ZEcElrUFRMMWc5ZVM5dllkWDVTbVZvRGZQZWZ2bnlpd1ZPNTFNRXNwOVlJVjJrT3Y4cjVmdFRaUFpoWFRFU2VnanRMNU5pTVQ5eU1OcXprcjEwUUtmaEZlMzVRSXFKSTlaQmNiTllObGlNZXhkOUd5c2VJRjFVc0c1aFFwcVdZUUhYWjlpMDhfYjdFMXVteUgySnBCeW50WDR2cTVfelZ1RG0zMW5LTkR2N3dNNm5QV0xnN2NOcWZpQ3p0eFZCV2hnT0RZTTJRVHZWaGhvVmZWclJnaUtZSkZwMGs4YjEtd2I1b3JJQkhfWng4SHZrLTl5ek9hRk91RnhBQWlvcG5sdE5KUTZ3MGhucVJQbU52cDB5YzgxaDZpTndneTNmVTVPU29nR2k0VDFRWWt0ZnlWRjFkcU1NcGpnbXprTG5SckV3bFU3R29GRGkwV1FNMFEwcVZpdTExMDgwcmlCQjhJOGRZSHlkamJwOTMwSERqX2RVdkJCY09HNnZJTUdOSWU1WWFCQldmTWdSV3hTU0hZdkNHWXRHODdfQ1N4ejdpaUg5SDd1LVE1VWQtRVRZU2YxeU5XZk9EeEkwc3JNbEJkR3l5TDRjQkJWQnlFNG9CNGNyX2xmZTViT25VRk9tZkQyTjdaY1VVN0lKZkYtOUpFdkNSTmY0WmhPMXlFeExnOXRhMDM5TzdLVmNEakJmd2liWTJnN0x5WDVfT0pUMWplUTdLaVJhT0V4emVLM1lSOTcwWjVxV2VCZ2JpeldKd2ZqODIwdFZUdkVjbU1ETmN0cnVEVUJPUlc3SGpQTldiMUk2ZTZSTzZSenFVaG5oQ2ZkdDVZNWVGeDd5S2Z4ejNQQlZfbHctU2Y5S0xkYWhSWUFGZ2JfdzJiZHFlTTlCRlVIMjVZSG9LcjB1ZjVDM293cDctai1Nd2x5WjlCSm5jZ19uMHlveGZQWTB6V2R4bmxPMW5ZZ0N1WGF0UUpuODlpZlZPSHlLS2RSd1U2ZzV6Ykl1ZkxJM0NXSEhpUTljZVJ4LUh5TTRJTTNYY3QtaThhMWI5ZnFkUVVPajFMYTNGWHlzMVVsQXJ0SWxUSXdJUHRmTDg3NmZqa1lLeWptNjN4QjN2TXI5OVZKRkNzTTd3aFktd1RQaEhZRnVxUkp0XzEzSWJJZjBvczh5em9FN3BtOG8xM0traE93QS1ubV9nY0tkaU1HcDU0VlZRUjJWeHlNTU5nY0J5YWxwRl93RlJ6QlJ4dFRmc05PVmNmeTk1cm9CbnU4VlNJOXZXLTJIbTVpb1hWbWc3U28xa0x2OXQ0ZV9lc2dTYTlpVURiUVE2QVhLNHJjbnZVTTVYUjloa0drNUJpbHVLZVViamlST05xTWJxSEUxUUMyWXFBNmZHQjAtOGtkWWktV2VtbUZ5RHlKaHN0a1QxUVlEZGhLR0VDTDVtTlNwUnVuaXlOVy1iTjJmMU9TY2liNHdQSGNVdV9aZ0p5SGJtczMyV1FsYlZsWk5FVko3bjV1UXZGdDhySmZiQVVYLVcxSDJLbm1DcTVvdktVeWJvc0lMUkR4b1Y5X1o0U3VrNkItOTFiWkYybHVvWkVUSTN2aXVJSHdZWUhial9sbHZ4R2tHUkhPeDk5YXJvQ0tlRW80LWJ3VmF4YUNTNVpxeTJZc0doZWoyRF8yWmdHeEJWUy1BZkJBd3FJaS1uakRjX1g1ZlJCT0x1RWRFUy1NV0xndkNXVFFPa0U4NnFFcnBGcFdhSHZud1Q1UW9wQUlIUFJuTmszcW1iQ3I3QkdEZm5mLWhRMlFXRjNuNS04S2VfUnkxSTZhTDMydjYzekFVQWFuRE9kdG9NVVV6SWpDY1FsUDFtTURMaEh6akM5TVdTYnp2NGZ0WThmTVNGd1A4QUpIekl3SUV4NmxlZ2p0TW1PeEMwWXhYNzBicHJGeDBWeHFHaVdYZG5vZUFpNVpGaHVwU29qR3lrOGxMSWpfYks4RFRIYzdWMWhDWTRkWFNRRVMwSjdRd2JCMnd0NVlnVm4ydURTMTZTVUlSRm5OS2ZDRVRHc3R0blotZGFmSUhqbHoxWE9mMnMwNmdRSDViNFhlbjdtZmNKR0UxYzh0UUt1THRSY1MxU0R6aENtWDdOUXdOZFFiZWlBbGFVYUl5WmtQd2EyYUhxSENLZl9zUXhCRDFMNTRabVo3ZTFpTjdRVmdEVmppTE1HQjdrQmM4V0ZJRy1sQWZlYmtvTEs0WTh6OXhDUnRhSHJSU2pXVVB1OE41bDFQNUM3R0tlZjlUVzY1NmVMNUhiQTdVbHM4QTVWQU82QkQ2VHdITHk2dUZaMjg4NVhiQUxmNjJ4ZkR3ZWF3OGJtdUM5VzJuWV9tdWNBYjU0bmNnVWxoWUxLdHlZRWxYRjdHYUZ1MnZ1Vkl6dG1nUC11WG96dGxySFEyQVF0ckw5dFlySmxCcU04aHZpTFhvaWRhWmliNnNkZmtKcGpJaEtTcVIwQjlVTXJ2WEQwal9BTlJlU0xtSGN5WldqQU50M3hWZmRoUGpJZFp5MVBJNTU2V2ZWZTRvZ0twZjVsRmZ6cnpoeHJ2MDJwNGoyLXU4aWZKN1Fpb0J3OEl3eEJUam9xNzhRcjJ1bHRLWDJvWmNTNFZiS3Bxd1FqSjdnVkN4akE0LWw5UEY2Q0NOdW5qb1V4dUFyZTFjbS1iN192M2xDem1Xektfbl8zVXdKdjRPNGJFa0RLa09MM0R3RnU2b0Rmckw1OFhZdTlyb3ZfTWpYWnZiTm1EMEwyRkJkSnowTGlmOU9DZlNHS0tnYmRLOHN6SUhmcmNnX2pjNDFEUUIxZzN2TGpEZXhHaTNFc0xlMm5yNy1QeGt1anNWaGpVQlQ0SFltY0g3Y0J1ZFhQdmNlNnJaUmo5c0FobzN4LWRSTm1kaklla2Y3djQ2Mnl6SzlyV1VpOEQ4WUI5OGxZUmFmbVMycWVBU3ZOa25rcW1xODJ3S1BNV1RhaGdOS3RHWHA3QnNVVVB0MlNQbEFBbnlXUTNmdnd6bDFPcEJ1eU5Hc0hCRGRiNGpIU3AyYld1RFJBMlJ6THBHNXR1aHBzb3daQUI5Y2p1UnpJekhYMko3V2Qyc0k4aUczMndrbG56RHNkSUxyZE1BdU93dzJZeHpOSER5WE85WExqWDFGZWkwWXk3M2FfbzhvYmJPcGltMkRqYW5Vcmdra1R0NzZWWElJa2dfdjllbFI2X3FRMnZFQ19KQ2RJdFFBOW1XY2tySFhfNThqMHRNaDEtVFRyV1JzeW5XUW5peWFlVkF0TVJiV1RnUzZMZm5LNkZBSERYbGdFdkZSaFQ5NkFyTUNPaFB1OE0zMndTRFZkSTZ3Z1pDN0szZUJldkdHZ2xUOTBhOHBoeFRWQmM3bHZuMVlSOU5GRFV0R0hHaFpjeDIyMmg2ZFIxNzhCOEwtcF9LdkpGUkRac21VZTI4Z0drbGRwbHo1YXR3V2ZNYk5zSFhpb3VNdmJrNUpTSVd0ejI2OVh2bEJxSnhzRkZKOTYxT19BVWJDOGw3RjlDRTVQZzRIako4dW5YV0tCVUxaajZGVzZIRmk0ZEJXSk0tNGl0ZVoxZ24xSDdRbG5DOExRLTBDakk4RWV2UURlWm40cDBDbDBNWVI2OVRSOXZEUk1hcVk3RjdYbUVJWkF6cmJyb3M4Z2dXcDRHVGNzMVJIekNEWDBPSDZWY2lkY1p1YU9pWUFEa3BoX2VjT3BxRnkyODh4YThicm5aM1gxa0NSZDJMZHJsM3ROMm1ja2dJOWJkS2MyU3AtaUc0alMtQkFSdWlKbnV3RklNYW1zVGk5TlA4a0hmVVJ5RW9fMWNzbFhqc294OUlEMDd3ZzdnS2NPeGJFOEZOc1VNVlNydXhTM3UtSjRyRmhpUl9ZQTVRTGFIZzAyREJaaEh6Q3NSYmdNajh6dnZnRGJKa2c3X0hjeTRrMVhlRGIxMEVxT20wMUV0Z3M3VlVHbHRzSE5aejNyOHJEWnU2VWZFZ2h6NU4xRWt5bWNjNHBPbFNWYkk0bXJWUFFrUG0yLXp6Z0FxMUkxT0J3eVNVU1kwSDNqbnFkYWJna3YzNTZsNTRoQWJZZjF1NDdhQ2dqdlZ1cFBGTWtKNDhOMmliZTBKTTBmTU5tT2s5SV9pam5hdzJZdWM1a1dFMnA4Q08zLTdqdVZmWkhOakdTeWZtaGZpc29YS1UyWnZfUE5RTnlYNDdKV1ljSF9OQ1hCaktHaUI0bWRiX2loTHNObWJCYmgzUTBOdHlFVWRaMzVlSTBqRjAwRlFkU05sWkdWMTZtclBiRU5QSkpwY09BcURxQllCZkVWY21nV0hJUUZoRWZDc25SenA4dC1SMEpEdzJkOFo1RzZZN090OTV3RjF2UC1haXNSb3ZZR0ZGbmg5Q2pNOTliYy1xOVpzMDBrWGU0ZHJ5YVFXU0V6SFkxOWprVm1xNjR2WjhJcEd3Wk9makNtcXVndUF1Q3hDX1ExRDFfNk5XR3RqcGRaM0d2NDR3R2IwMHVLSmdJbUh6YktBSEdUQXg2elEyR25oZkhBR1pGc25WYlJoQ19rTVY4T1EtcFNobU1HdHVUWWRVbjdXMVlZbTZ3WmtKUElBQ242cVEuRDNUOVNSSnJ1clZFX2hJeThubkJFTkxodHI2c0pfcTZjZl8xX3VueGpfdw"}, [
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
  '09532d44-a913-4773-92a7-1470fd4036df',
  'x-ms-request-id',
  'd025bf74-e5af-4232-909e-76ededaf9a16',
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
  'Wed, 28 Apr 2021 01:41:34 GMT',
  'Content-Length',
  '6266'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1619574094,"scheduledPurgeDate":1627350094,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/fbe0ca8d2df44694beeebaebbe78233c","attributes":{"enabled":true,"created":1619574094,"updated":1619574094,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'd82bfbcc-0a7a-4364-a8d6-9353b47b7e4b',
  'x-ms-request-id',
  '5ff6825b-01f8-430e-9277-6c7694260cac',
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
  'Wed, 28 Apr 2021 01:41:34 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '30f83082-fbe8-4181-a5c6-60c887d55d4c',
  'x-ms-request-id',
  'a74257ea-625e-4336-a6cb-debaa761ff61',
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
  'Wed, 28 Apr 2021 01:41:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'c5c5310b-61db-4c43-b1a2-e94d41c17f0d',
  'x-ms-request-id',
  '03a64c38-6c4a-4bda-b1fd-517910532a9b',
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
  'Wed, 28 Apr 2021 01:41:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '159a5495-5f2e-484b-a8aa-4bd3a341dff3',
  'x-ms-request-id',
  '36f5c9ee-6878-4fa4-9ad9-87cfa0b59eb8',
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
  'Wed, 28 Apr 2021 01:41:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '9b047739-af0b-4c3b-8505-17ac36b9425d',
  'x-ms-request-id',
  '4471128b-fdab-41a4-89a9-f6852ee9cee3',
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
  'Wed, 28 Apr 2021 01:41:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '999e2d0a-477a-47fa-b0ee-97fbcac050e0',
  'x-ms-request-id',
  '6e1a4a45-8751-47ae-9f1a-85af350af938',
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
  'Wed, 28 Apr 2021 01:41:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'bdb977be-48bf-4642-b471-f38cd364bdee',
  'x-ms-request-id',
  '163fd363-51ac-4823-9b04-a1edfef68840',
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
  'Wed, 28 Apr 2021 01:41:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '104a56fe-488d-418d-8b54-955418ca72a1',
  'x-ms-request-id',
  '0714909e-8e19-4786-8143-a32aab54e421',
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
  'Wed, 28 Apr 2021 01:41:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '61a0731f-0b01-45a4-987e-61dc424d8444',
  'x-ms-request-id',
  '85844c20-b4e3-4df8-b4d0-448d0d1b514b',
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
  'Wed, 28 Apr 2021 01:41:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '5bf82a77-dc02-4532-93ca-7ff361bca2c5',
  'x-ms-request-id',
  '3bf7fa97-671b-4a9c-91b8-9c542303b9b8',
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
  'Wed, 28 Apr 2021 01:41:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1aed66a5-fb2c-42ef-befa-5e3b0c93494b',
  'x-ms-request-id',
  '23b1fd78-f4fc-41ac-915e-6ffb6c630e9b',
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
  'Wed, 28 Apr 2021 01:41:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '2c8c601a-3b26-4b19-b5a2-3c685f9ab343',
  'x-ms-request-id',
  '43d3b1b4-dd4f-4e65-9d1e-6c87ab92f41f',
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
  'Wed, 28 Apr 2021 01:41:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'a18d1a0d-23de-4995-a2d7-a46903ba2852',
  'x-ms-request-id',
  '1611b53f-eb8c-4f57-a256-3d73a5b91c09',
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
  'Wed, 28 Apr 2021 01:41:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '9da6c9cf-e274-43c4-80a1-37cd12db62b9',
  'x-ms-request-id',
  'a7f51af6-cdd1-463b-a241-ad62152a66de',
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
  'Wed, 28 Apr 2021 01:41:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'ef7d379e-bfbc-4c91-a43a-b2961e8486dd',
  'x-ms-request-id',
  '14cceaa8-b7d2-44a7-a5c7-c54d83f91efb',
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
  'Wed, 28 Apr 2021 01:42:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'f794a212-39e4-4692-8e6b-bf79ed4436ed',
  'x-ms-request-id',
  '052e6666-a46a-418a-a140-c268177e204b',
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
  'Wed, 28 Apr 2021 01:42:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '0463d3f1-938a-42ff-a4b8-612dcb4c00af',
  'x-ms-request-id',
  '005669c2-0ca9-4ba0-bec2-23cf64767401',
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
  'Wed, 28 Apr 2021 01:42:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'ceb3c18e-2235-4c2d-9420-69d729a36c8f',
  'x-ms-request-id',
  'eddde9a2-f6e0-4b56-b803-12fc0f28cfa0',
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
  'Wed, 28 Apr 2021 01:42:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  'cdc9690c-f514-4789-bd75-e2f9ffe90ce4',
  'x-ms-request-id',
  '5bfcea03-46ce-42e4-9241-d1564b487ca3',
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
  'Wed, 28 Apr 2021 01:42:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '23e6f072-4f40-4488-82d8-326e658e1e9a',
  'x-ms-request-id',
  '60c45c53-780c-43aa-98d6-a9a924736bcf',
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
  'Wed, 28 Apr 2021 01:42:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '1da85576-1738-4fc3-9d4f-0b607b377596',
  'x-ms-request-id',
  'e5a2a3f0-2e67-4348-bdf6-51b94d044bc2',
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
  'Wed, 28 Apr 2021 01:42:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: backupRestoreSecretName-canbackupasecret-"}}, [
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
  'eastus',
  'x-ms-client-request-id',
  '601b8eb0-9955-4f82-acad-42e0b9690df9',
  'x-ms-request-id',
  'eb44be18-a537-4eea-bce0-490f6e69e255',
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
  'Wed, 28 Apr 2021 01:42:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/backupRestoreSecretName-canbackupasecret-","deletedDate":1619574094,"scheduledPurgeDate":1627350094,"id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/fbe0ca8d2df44694beeebaebbe78233c","attributes":{"enabled":true,"created":1619574094,"updated":1619574094,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '8dae8105-0799-4187-b729-c1c9808c6b4f',
  'x-ms-request-id',
  '9c48eb4e-0153-4d28-9957-392155dde2f0',
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
  'Wed, 28 Apr 2021 01:42:17 GMT',
  'Content-Length',
  '473'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/backupRestoreSecretName-canbackupasecret-')
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
  '8a871929-ce6d-4585-a851-6a014a6ac937',
  'x-ms-request-id',
  '907b6ab6-870f-43c3-96bc-a1f54178ed80',
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
  'Wed, 28 Apr 2021 01:42:17 GMT'
]);
