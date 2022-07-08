let nock = require('nock');

module.exports.hash = "449e2a52554d7490885039be3197a9d9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-')
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
  'd5826914-5abe-4ddd-8c9b-9d36b35e36dd',
  'x-ms-request-id',
  'ddcf66d6-42ce-49e6-897f-17168a01c523',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:47:49 GMT'
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
  'ed78b1d5-11a8-4af5-8d72-9d1ba4875601',
  'x-ms-ests-server',
  '2.1.12651.7 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ApN6j_A4SkZAtLad9P2GhRg; expires=Thu, 26-May-2022 22:47:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpMatJYPFzKawQc-o0SUcL6Y00JkDGaGHihr9WoU9H7rtkYPimFJiQjx4ozn1huC-LWCeJvyfjdQR94UdNAlHZH6K6tvBQ7yqdsX1klyFhYTR9xju5AJiF2Lc9IGDnP7N2u2iizmV6mkSDRY0XEN6A_6zOWsvv0X7fRYNk-yioy8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:47:49 GMT',
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
  '2fa2cd32-6a27-43f6-9d58-fa1230326b00',
  'x-ms-ests-server',
  '2.1.12651.9 - EUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlqbWZeBTiNHqQMwRt5ojSo; expires=Thu, 26-May-2022 22:47:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGBN3QXA3RRlS9iLU7ME7HDJckLH7L_q9uxBFFdRLsBWpCvjO3BAQz4LhIuUWcsTMKpXtB9HUrF-SiF1D3VaJyWBvESW5KCumcXyxZeizI2fLgOGYxvr25gc-7wcV_ne4JaSf2DoVnQptb1Bqj5U_LDCxL13MWWv9U5AY46ZtwwwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:47:49 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=c8384dd6-cf04-4f8c-aaf0-8d7f059803f4&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '02893b20-9fcd-41eb-8f07-96ed9ff86600',
  'x-ms-ests-server',
  '2.1.12651.9 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AnsRWkMkmHJDhHslPoHffDhPlvakAQAAAJZt-tkOAAAA; expires=Thu, 26-May-2022 22:47:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:47:50 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/backupRestoreSecretName-canbackupasecret-', {"value":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"value":"RSA","id":"https://keyvault_name.vault.azure.net/secrets/backupRestoreSecretName-canbackupasecret-/b66ac455c2db44a5badb06ce487cc73b","attributes":{"enabled":true,"created":1651013270,"updated":1651013270,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd5826914-5abe-4ddd-8c9b-9d36b35e36dd',
  'x-ms-request-id',
  'ae0855ec-074b-4a34-ae4d-3ca6de59ed66',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1882;da_age=1882;rd_age=1882;brd_age=7440;ra_notif_age=8522;dec_lev=2;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:47:50 GMT',
  'Content-Length',
  '304'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/backupRestoreSecretName-canbackupasecret-/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuaFd4X1VtbXAzVk43UlpCSnpFcVVoX01hZWhaa1hjNjdTSTFYeXZyUHk2UnFyQ2RrNHdwa3RvTGc2NzF3aXJtcjQ5NW95eVllSTlpbzdEck1NVE1aNmdkOWFPUDRvZ3J5WGctS3k5NWZSVFRkRDZYMlVOb00yWEFRZXVtNFd4dUp4U3NzWlRPd2twNll1UjhNRk5FNnk4NHJUU0EzMENBekljVi1IWVNXbEJuQW02TThRanFkOEM2NU0tbk5fZVg0Wi1tMzgxUjM5TnRBeUh0UWMtSUo5N2t5eGRxZjlJTVJveHdtOFFoRXduWGxYM0ZmQW1nWGw0SGRTZ1VKZlJCaVBmTTQtRWJQM2JVUkV0OHdiV1NJQnlOclhVTTh0dlQ5NGhlVEdMd1pLTEdWZXZFNXNHaUFyakxzSWtDTUoweThPUXdGYTlKZjlXM2YwS1pkZ0FOd1dBLmREdlNFWVgxMnNLeElPbTI4WHZQQWcudXl4eVNlYS16U3VkOVUxYkM5NHNWNF9FUWFtT0dTeEJzVm1DWkhKeDJib3loc1h0Ni1EZTZ5YmdaR0VrUVhkUmpXRkswamZoWjd4S0V2Ym1JazdPSHJhQ0VadmtuUUc0TlNjVkZKcFh0UFFid3BSQWxwMHhOSENaZWN4bklQTzZEMmg0Ul9xTzcwTFdGTVc5R042Zi1qN0tVWGRsUTVzMmFEXzhFRHVYWGRWR0hJRElFX3Y3ZzZmWXVrcDBrbzB5dkhIZkJjS0oxb3ZWYmNVZUVSOHh0dklXNHl5N2NxdFJMRUVfWFU4SlBmcnhvNVU0amd6cEZfYTFpLXVkM2VldnluVjRkRDUyNmk3M2lSZUwxbEItZ2tNSlhPZlItMEM2QXZUcEJiSjA3SjNKN3kzeThWdVc0UUxyd1JnUE41Y1d5QnNWRVNyYUNiUFZfTlNYb0tPTUFXa0hTcjFWRTJyNlJ5MVhFMmUtWURkTzA1YWc3cWotSFlyR3UzQUU3eVk3NXZyRjlaQ0tGU1IxZHZEbWJVYkx2dXhJbVdYcDBHZ19uX2dKMjBoRkZzd0NTa0o3T2dHQkxWVjdfeG9sYjI1VEYtNXI3clBYaVhPZ3lzN2ZTazV0NWhIcU5pZkxPa2E1VGNZSkJReTczb0J5ZVJQZG9Fa1ZFVEtPZEFiV18tT25IVVBZMXRqMHEzd0o4S0pLcXRTLWVSUWV6bjdmRWRiR0FCclFmbUV3Qms1RXBjbVJqcXZhanV0WnF5cXRXSUR2SV9NdXk0bHdZV2ZscFR0LXcwcDBBUWJtUXRKb3ZmZU91alpDZ0tmUzRfNkhCcUZKSllVUkFxV3FLNlV1ZDlSX2JtM3dSWjg5WXJRQUpWb3JHZDFjdVdURnJVT0JSaWFvYVdobzBKcHNSR0tBUlI1VDZkZlJBWldCRDYtcnpzNGpEZ193ODZrNFJNZjR2NkdtY1hSNWFEU2IxYTZEcXYzYXpQX1pjQjU3a2YybVZuU0I0T1J3Z25RVnlRelktQmREY09xOFpmS0g2MkFONVIzbThyS2RndlRsM0pvbTdiZ29sYWxfcVp4YVJYTDcyVEZ3SGpKbDBLRzViVERkNDJlQzFXcXNuS3JrWm9MZ1VtZjIyMF9ORERxN1A0VWEwUVF1Y3VhdkFuM0ZWRVBSNDc0Nk5PcTVqV3JyNG9FcXNTNXNfcF9ObUpmV1hzU1VZUlRvWWljQUZMb1VjSEg2UFYxc3RRNThiVGRNRGtVN21XaEpaUEc0aFFndEZrekgzSUlwamo1YkZ4RVhwbUVJcHlYeXg2Y1ZTVkpCcVBBa0tLU25iU2RPU3BFWWh1d1RpcThRbi1Wc3M2WEdSTk9icWNBbVRtN2JXSzdSNVg5V2l4eEFoRU02bXlMWTJsSzVkS2FuTEVsbkR3cEgwcUVBM3pLQl9jN2RYcTIyV0FSX0h4N29KejM1a2NMVGY2cnFhR2NlUDhWeENWZXFJT1NjZ3JnYm9IT2xQVjZOTE9NMUphUUtJWWRrZDRpTTdmY0Jrb1RfU2xEUVJCRlJTUXVZRkp5TnB6LTVHLV9leVB0WG55NDF0MVNNWHhoUkJ3TTZtdU1yVGRETTRlQkxFUHpUT2J2allfYjU1aUpuZEtheFA2emZpTGpKNzl1Ym5sS2pFZGtkMDF6ajF0dllURllTa0RQNTNGNWRMMEZ0UE5ub0FMZ1ZpcUlBZ1NlSkdCdE1Qbm9vb3dHeEZjMGNLNzVkWFNtVlRDT1pWZWg5TFl6bkt1UjBJMmxwSGNRZmxJUlBCYkhKZ09pNVJtVm16QWx1YzNKQTc4OXJXNlB5dnQ2Zmo3Y2VEUkt3bXBzV1J4NFZOWi14X3E2UnUyYVZxN2Npd3pYUzZEbkxGTW5KVzV6d3Vtd1RfZEcwYUw4eFV0LTNiemFKeDhpeWsyNjBJYUlRTGxlZVVkTElqSGJXODZVWm14UDRmblNrcWJXbUtlcTBTdUh6UEtReWdIR2NOUXM5U3JDYm9vTm83dFpkaW5NQk5wNXd3R2J0T1Z2NGtmbUlPYTZwUE9WZGRDdkJ6MTNvX0EtOHFkT256d1NaVFVGMzBQTzFGS1kxNnRKSC1aaHItYzYwRk5za2VTNFAzNFo2bVF5aVRlN2F1T1pNUXgyZEY3cGl1aks2c3BwcjgwNXlGczZaVktBQ1F6M2pNeGtLcDBSODdXYW9ETFpvaUltVWJxZG9MX0xpYVN3LW9TYVJHemhnR3o4VmdWUFhEWVVaX2laSkNoRnpaWFloNHF0TU1abmtRa1FfZHJ4ZTA4cWV0cV91RXhHZkdmREdTTE1NV01qNjJPZWZqSWpWTjZSY0gyc04tdFAtdXF0MERSTU1OYldIS2s0T3YyYWtVTnJOWFladDZjU0JMRzlaSXkxQ2tSc2hsNlItVFBibWNpbGVPQnBwcjJaNW9OTWZ4ODdYSHBFSXc2Y0hSNTA3aUhZSlA1QW03c2V6OXd6cVplZGJKenRNd1NLXzUydGlwQjEyRXg1QXZvel82NHhOaE93ZV9kYjdBX1Mwb25rcFdnbGl3aTE0MldRTDBsb3JaRG5oZnJxRVpsRmFTTlQ2VWJDSzNOai1ZNDhWT1FycDl1WGhrWkhfQ1prelo0SUtHZEo0RUE5WFY0Wm5RT2JsVzVOeWtSN2NIem5VNFM4NVc1eWRaT3VUazlMR0puSzlNRk5jYnVzVDZMU3A4ZS1OaFdHa0RlMEpoYWdHbkhuRXZDZnkzUDQxOWtrRzVrS1U5TTVWR0tfWUFxYkI2dzd3WnVRU2NNdHJUaTM5Zy0yTFF4c3YtN0FvMUpLZG14dUEzS0NzVHVuM200WGsxLUUySE5WMVI4cDZvdVg4Y2N1UDhGRHFicHljUjhQRnZxekIxcjRNREI3TlFsZkpFWVcyYkRUUWw5eDU0aU8xN3d5M0VYdjhHNklUT3lmR2xlX3M0TEYwUF82cG04ejJsejZWWXNVd3VxeXl0el8xTUdUM1hHYjd6LThZd3NwZV93LjgybnhPRFQ0NTdaekZRd0h0VVJ1VE5DenZpZUFsdmkxWUVyUVk5QzQweXc"}, [
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
  '4b69bc3e-6178-43f5-8570-bb49e330e868',
  'x-ms-request-id',
  '64153877-57ca-45a3-87d1-dffe678765f8',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1882;da_age=1882;rd_age=1882;brd_age=7440;ra_notif_age=8522;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:47:50 GMT',
  'Content-Length',
  '3791'
]);
