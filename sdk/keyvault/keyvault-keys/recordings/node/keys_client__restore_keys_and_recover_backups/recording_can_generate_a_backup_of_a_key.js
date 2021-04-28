let nock = require('nock');

module.exports.hash = "cdb6ba7c09bde3a86c26f974912c1b74";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create')
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
  '80efeb60-234d-4c33-a31b-7330db0e60ac',
  'x-ms-request-id',
  'b87747df-fccd-403e-8981-a8e15854fc18',
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
  'Wed, 28 Apr 2021 20:57:54 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '9cd5e52e-0159-4c77-a015-71dfabe56201',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw4AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:57:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrIuhX7yuMsWawyYDySl8YVA4dk5BbSuNWPdEyB94F6vF4Sz2Zmk5w_FG5T3UdBn_Fc7hmf8qcQtGz4hw_fU3rJGHKA_TnuFOUzElprrb-5HGXFNDGarQe7lfltyan0Hk_XDKIT1ImByfQ1t623qCxepT-EkrM6nzcg0ZGU2jNYFYgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:57:55 GMT',
  'Content-Length',
  '980'
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
  'b52c767d-2caa-4e71-bf97-facf67374901',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw4AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:57:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrJ37n4Vo1pWKxoaQYRdvmrTuEbkg_mOjDBvLGm4sgoLslqIiOKXetz-HXzeweJaim--q_C86rXQasnw5ZccCRAfC1kksh5ioFlEVt6nXSG_v-eVQWExtsE_FSLEA7sNHiFzs76ucq-aYuO6hDVOwBJj-IgURlIuZTRJtvmjTl4DEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:57:54 GMT',
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
  '1310',
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
  '19a8b5fa-57b0-41c8-91bf-83f560b73901',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw4AAADrwhvYDgAAAA; expires=Fri, 28-May-2021 20:57:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:57:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/4f3202d4f0db4714b220d0f4d0b7f7a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2PhKtpfvMGpkQI8prxpgjaPuwS4Y3ZxXoKZJBMW34qn_O-hXco1UQkZsjFacATfzA-DeiwRkDkSAiHnqOm8KH82AObhe6-BQI2h-dCMgS-XUb6-qHlO4l7b_GK4MY_zAalt6FjmEdlWT7ekwJHx0CvFF37___Kbjuhc3ICB4gUqAybXHTgiScDHCO8_MrdaFRITLicdzAgF4jcELiHGZ1RQ9j9BCqNHCAuUsLC3agOaa0qHRTvk5-PuD-5Z6THHkE-E2qS2xsqguBr7TAbIrqxAEAkiuJqRSRPuI6t15i4qSBNudkJmkKlOtUUIeYON5NwMSDvLbvSejvhSvmoOLjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643475,"updated":1619643475,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '80efeb60-234d-4c33-a31b-7330db0e60ac',
  'x-ms-request-id',
  'c7ea4519-b17d-47d2-9294-a24eb88741fd',
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
  'Wed, 28 Apr 2021 20:57:55 GMT',
  'Content-Length',
  '738'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuQV9pT3J4X0tJVnhDTzUwQzgyZUhkVUlBbFNmelF6dHNxZWZmZmpwRkQ0aWRkTEFHWTYtbFNiX2VyWWVUS1pOanNFU1lGODU1WG5SekczQm5LaER4NE40NDVramdBcXBQeHpyWG9WcjJHcmpEeDZwZHFDUmZYaDNyNmlmdExmTks1d0xYby1KWTJrTlpVOHFLLS04VlZxMXJ6aTU1czR0a2tydEMyVkg5UFVnekxWeGRIMTR3TTdubzNfeTdYcHlFb3F1ODcwLUpScEpvSDBjMnpUdlhicEM5T3RxcE15dEVyOGF3cDJKbjJqUU5LUUtoeklPODdlOUZ4SWJLQmpqSGxhLWROTG5IWEJVeHo3bzNQZFdJYnZwRUdjNGI4WDZvdW04blM0d0RPMXlsSjNIWkNRcVdUMVlVOS1WSlRQMDNuNnpqUU5QbDlXMzh6NmxYay1GeUd3LlNaNnR4NHlscjh5cUpJMGZJM1Z4SVEuck4zN2VNMW03REN0alZzNUItZGtEQnNjUmxLbC13dWRpU0t0N3VJR3hRRjRBQWowV2JRbHFBaGlmRXRXMUZWeTR1bUpHSC1kTWlKczlGWWoyYVhiQmlhMjlvSDRKSVlqZ1FyQXpKVXA5YkM3UVdSR1VVTHNYN043VDMyWEVRV0FRVWNIRUNEMzdPeGo3TmhTUGhTTUFEOHJOOVNid20zaTZueFZ2OE8zdkhiX2hsNTRpbWc0Y2tpUDJiTEUzOTE0VjBZNmxTVUF0azF0RXVvZ3JjcjZJZVNKcVFkdXh3WkpjU2EwcGRhenJRZTBrZUVvd2RRN0tpV3NnbkVIN2ExYk5JVGJlclVIaXpvUmNBR1F1WjBwZm1CbEFibFJZNTQxdkFKV2xiUmc2WktZY0VPaklpMUtlMGdZM0tlQVNFdlRVMWlINXRtVzJuX2lpRU5kOUxtaWw2ZGwzemNTeW9mOTU4S2FPVGE0OFBoemZvWGpaT1pSUDI4VmI0a3IzYThQazdjNlpqRUpESmJjbG5saFN6OWZodk5SbE56cDVwMjN5UkI0SllYcmk4M0V1V3ZZTEFKODhJR3hfcDBKclk5QU1DRmZEcFlWeV9lbGJhNnpGaktaa0kyc1FCRlpiVVhFSm5KbGVQMHlqblgyU3plUDNfeElER3kxSTUzSzctZmxYUHlKaThnSVY0QXdjdTNMZjhmUVZvVTBwR1V6OHpoZklXTmcyb25NSTFGbTUyclRBTVUwRXk0NFVzN1lKcDlUTlltTnRQVnVCbUVadmhZMDNhM0hfOE5SRFNWTndxTmd1R3lha3hOcjFEck1JT2RZNTl0bF9DUkU4U1UteG1yOFlDbFRsXzdOal9SSFB0MkNWZEhOT1RHNnJQMUN4bHZFUW9MRGdDMWRrWFlUQnczMl9NNVZZbkxtTjlCdnNBbk1ETFAtMUpXRXBsWUdDUTNER3VkNFBMblJ6elpuWFlPcVBiSHl4eWZwdldXQzQ2RWNoZ2MzemZNMzh6OUpjYzZpM254ZUpZMnBwalc3aTNBN3dzOXlOWFZtYkVTS2lCdnVxS2QxSXRvUHJxR1kyRHRzazZnVUY1WjhRSTkybW0wTTJURW9DdXZlcE1YWGdUWmlzbXN2WHZ4RU1ocjktMHplWnl2U1ZLaTFwNUFBazdCYjI4bmRKVjRCYlRJTUZzYWhQWXhsY0tzT3VOZWc0YXN6cFdaV0pwXzZuRi1uM0hHZEJkMVBhMnVQdFZEczE5VGFoai1yZ2dIUnhDWlptU09pTmRtTE9teU0wN0lwRnBaV18zajd2UmxsUVlWajBleWZMUmVER2VKb051d29sQnVRbmt1WTRqcktqSEZNRDFCZ0pZNUx0ejFYdTFSb2pYbEUzSWo2N1FhUWtvNEYxaVJqcktGMlZkelB3Zk1jOHRaV2lqNzkwM2tGMHVVTG5vMXpSaDhhdnRYdUhoYXVqcHRCOFlnbXVQTmQtR1MtNXVFdXVWWVREai1fT1k3aURVZURCRDNWeHo4Wjc0RXFVcEFBenlnR1RmTFFwOEZ2NjJTS2gtQ2VmbVZqLWo3YUF1Q0pLRk4zdnhMY3pOZW5HOVFIRHRIc2VzSGFWWTBPREJWNjRTUjRUM3ltUHdOc2ZuLXk3aUQyNG5tTTlZTGtfdzEzMTJXS2p1MkhtZVhoNW9IaXV3MG1qc1lVVWVIUXRoeWhGbTdKTHp1d3gwSEVFUkJVRmlzN08yUTdOTEdUYkNzd0RWaEtnT1dXbVhsS1ZGSE1ZT3d0NTRFbzZIUGJlR0Z0T29jek1mRllZWW8wVnVaVFNRYjdlSU43TWxhdjhxT3N2NkZrTjZEY3dHS0FEb3BpVW9RT3g3cDZneFhDeGVxMGItQ2RnVUJnWmRuQzlqZEVwR0dkeTNxNkEzVFdGY3hJaUFGWGlhNzZxWXNXTVRpYjhQQWJwZFF1UVRILTJ0d0xTV0pycnZLMUp2U0JUTjA3NXc3MkF6X0hNUEJzSk0xNUtmWTkwQ0otdWRZbktCbkpLOTRuNC1IQ3NmWmJXWDJZdjdnNUFGalhOOHNTOF9HZHA2Zjk2aXFXZldjejl1TGN6clVyQ1JXT2NQNlZCNlBFRVFObEIwT3hmdVJJZk5hVHd6a2xfTGduOXltelZtWGRsa3pnYjJoM3o5OTB6NkRQd21EWTB4QVhJR3BCNmRONXVub09YWVdpbjA4aE9vaHFsOUdhWmJ1dDhNb1B1azkycEtWemJDX0tzWENwV1Zkalo0N3pkYXpsVjl6a3BkQy1DdjcwWlZ1X3VtRWlkS2EyZjdqUnhPSHB5dHJPSFVjb2lqS1d1V20zaVY0endWeENNLTlEYlZHRFR2Q3ZkWHlkX0ZDdEpZYzFkRGllY1d1UlBtR05pX3NLVEN1OEN6ODVZR0JjczRYS3ZPbnRnSFplYk5KV2g2NHo2cGhkczd5dVBYSnh6QmNfUGVmN0pGZjhPczBDU2hHYk1UYUxhbFJ5WGdEWjI5VnZ5SmtFZXJnRzNLZnVmVTF4LWdCR0xQQm1ocVhPNVdselFkVThhb3lPb04ycWVhZUNIWW0wRXVJSVR4UXR6YzdVTWhKRmNTN2l6S3JROFEwU1doMWJWU1BWWDd1WUcwWkJTUDl3dDlWXzlsUmFRS2ZsS1o0WHgyMWxraXBZbWd1VG9nSTAxc3d6dDdXcDdzMlUxZVdFZ1lTSE1VdlZmNUxKdHMycmJzSWREZGE4TTdsOHNRX3dWUUpFcmJwMVF4cnduVnRLX0kzdGs4ZFIzYy1fZVJqYnZOQ0wwc0d0Wjk3NUh2bWRQV1gxM3o4SlMzd0dDV0Z0b1FyZzdmbkdoc2RzNFFfeGxuNl9uNGxSS0dReEZreW1wN3c0NXZIbUN5MWYxZXQ2bkNkMElieDdqOUs0SXZPQ2VwUUNLbWkwcU5IajBMYWtXVEFIeVQxX05ScERoem43SWstVUM3V2lKcEhLa3NLLWNKR0pLd1RnV25Hbnp6MHlJM1NwU2tVY3JzUV95WlgyZnVfQzhhaGlNVE5wbXgyXzNlZVhPcXdsbjltNlFuVEVqWVR4MGxURXJQQWJvVzdhUENVR0FEZ280TFh3ZUFwOUFKYkxaUUFybE52dkNpOTE2NUV3VVdXbUFSYS0xUzlBT195czExekp6cHVaVndWbzFDdVQxR3I0NlFSd1BfM3NFRzc4TzQ3c1VRWGJLTS1MVEc2SUE2LVJjanc5S1llM0F6cjNsNmFYYXFibWp1R25YSEE2UXg0azIyaDdwMG81cFpERk1iVmtOUG5raTk5bElFOGFjY29OM2hodHFlbV9DS1lhemFUdHRfTUctN3dSWW45Q05RVjFUVUhCNjJfMThzTC1CblRUbnpQRDJ5ZDBYZnd6MGJ3S2lyZUdzdjZNa3hzZGpVZ1VxWkpvWXJTbXhvLUtpUTE4S3FwMmItWFQ4eXJBZjZ1X18wUmdhZm1GNXNjTmdHcjI5Ri1CNmZWamlJOUU5aGF5Zm0wLXlQeWpTQTF3bVkwNnY0bVdkMTUtdUxoWW9ncFI2bEI5SGh1MUJwNTFhNi1ycmNpclE5bmhJc1FmUng1VEZXMG5NT09VWHBEeWtiT2pkaDNuMmxCcHZiVWdBMGNrMFB2djhPMjhtMjBzS3h4NGlaR0FHbWVRWWxuNVlDeFdmOFFjY0Jya2xRSlRBMzl2YjJsazUtazBJeXk4NmMtdmdSdGY0SDdNbndaY0tVSk1ncG9zc3U2cEU0eDdhcjJrR3dvNDAwQThKbm10TjVGZGVrT280QUZCT05kSHA5djhsOVIzSjg3UUdQMmFVcFdpT1IwMWlqaHVRNmlITjJjbUxYc3FwRHN2N1hhZkNxRkhSYW9JY3lZekNXeWstdDhXdVJ6TEpzb3dkc3dsb3NiSXNCaUNFdkFzdlhIbGhkUXJnU1pBWFFQbUhGTjRHR3FEc1RjdkhkVGlEZEltMVpJZGFQQmszTnZROWRQdGlrdXVNZUtkSUduYU5STHRWb2RzSVZRNERnRWFnZklkTU5MSHctTmR3N0g5NVdrTjZvUktVRjZ2ZmJ4bE01ZHpvSE5qNVVjUUlWRE96amt2LVZLaF9DRlR6ZnROV3Qwa3gtb0RGZnZWM2JZV1pMM2F2QUVQaVdQUEUzamp2X3BkZzYzZTBEeUNNcGNFaGkwMmNPMTdveUdudmdyTGVWckxIRG52RWg3WjBFb1NYVWVsa1c0UzdOREpnY1Z5R0kwY1JXRkxwUWNrM1FuRGZKZHMtZjF5NXl3ek9XcnB5eTA3RWg2U1ZrckZJZ3FWTTc0enVyMHA4UFhJUjZRNHBrLXlFa0lVSHF0dGNKR1B2TGl0Wjd6eGZ3aEx4Q28yV0dHbzNVR2Q2NVV5QjNwZ3VUTnBDTkRJMjVTcVZxU3QzUmtlUzBZOS1xTHlwRW5mOEt4VGU4cWt4ZmJzRUp2U2lPanMwemcweEtmY2EzTjFpSlB0UDFEUXZNMHBQcWlQdHJPMFR1eEU2b0VmWmNKT21EaURZUmxSLUppQnNJaGxXaXZwSjlWNTlVTGcxNUlSM3h5alNVMzlUZFo1VnVWU2hGd3U2VG1SNnM1QWN2bW1VNFFybnlSeTFXbFRSaVlHeGRWd1NqZ09GeU5SVEktcW4xNWg1Y3Uta05Ubi1mN3ZHRTlIUG1HOVB1YU1wY1R1TzBuU1BkNzBxcFlhNjVmbEt0YnBPMmtsdmJSRFJwTFFJUjNNRGZDa1dnZlM5QWFYaFJxUjZhQlIxck52a2wxYjByR0FhZ1Nhd3daVUZaY3Y2eDNndWQzS2N5dG5IQmNNWVFXTV8tRDg1YkJpQ0FaUVZYbUVwbktZdTBBamJoeDk3N01IWUdLbnRIRldrUU1pWkhCc191UDAta3F2b2paOEhiaDRRTEFYb2pDb3FlSnYtd2hMQXc4SmVZaUp6UVlGTmRLZU9ta1F6ZjFLUUV6NDN3eTRMbDdJcFVkOXBZRVdUdWNmNjhtMUJFN3cteDBBd0pJZFZRMU9jUnc2RXdCS0JGS0hGelFqa3dnWFRHVmQwUXV5M2Z1V1ZyaUdIWnZ3NEZDSVBpc2c4enU0eVM4aElCLTRpd0xYLURSTXd5ZHIyT0lYdjJOLUR1V2RSSGJQcVY5SmNwMUxEVGxIMXhIdno0ZEdiaVZKY3Rka0UteXNJcDVXcHQwWF96VU5zLWw4QVNZdFNnUU0wT2wtODI5TDR2dU8wWDNJNWZEcXhMQWo0d0tIMndzOFZqa0RHNk00VjNYdjNzNlVWbXdMZk1MSnd5eXlRbGhwVEttbThEX2xoT2ROOGFZS1dBQlVjRV9sdkhfSGliU2c3b2ZpNWhYbjdhTW16NUE4YS0tLXZqNDU1QklhbTg1VDY4V0ZtUFFqOVdKVzVJRlJUQmhxM1daNkhqakd1bmh0NldPQmZ3YnlFZmNpbDRaNzZ4enJkX2x0Tk9Eckg4SlEteEtmQm1OcnhnOHgxMnZ6SVRHWVJyREd3RlZ1Sk1HVzIzZ0Jpa1BmZlZlREQ1VXZrTGh6SWhYY2JFU1dCVHlScGIxcGhYUllIcExSQmpOWGtlRE9fRDd3YnNnV0Q4RzNQOXpZNzJ4LUFOVXh1VWVtbXJkcWI4SkpTWV9xWHRxckdaSEpmaXdGU01aRnZ0YmdsU1N1UndRNlRIT1FwbW1ieS1RR2dKTzMyT3NXNHpTWTZWUUFJcHJVU2pGQmY1bExvZ3dVS1ZVZU1maUcyX3E0c3lIRHVmdWgwdmlqenVMREpKbnl3a09IWHJQZ1BiQ2FGNWY5U01KNWZMX21zV0ZYNjBmejhIcnJPTXVBZ2M5OXBlZkZ3azBLR0dySnpENDF0eUpLT2RXaV8tTS1LS1YzZUJZWFhxQ2RfWXdjMTE4TEFKdTRwQ09STzNPNlhIS2ZneVUtelAzeHQ4NHhUQjY3QnVwY1d4UkRDY3o5Nk9NeTd0UzdGYm56czZhZHNuM19PRDNzUmQ0QkllU0VyYXZTWHdQREtMM3M5YTN3RTlaWGdwU0lncUtqa0pGMDNRNmRrbFlWd192bEdja0N6TWpRaGNFOTBwU1FSTXFJZ1gxSnBlUDh6RXRTX1hBVlMxN09aR0Z5MGZrZWFDM3ZzQlV1bVhZOFZlUFplektkZTRfMTV4bjhQczl5UVA3Q1d6dzhtaWR6cXVrWW5PV3ZyejJvWV9zdHpkU1NRZnAyTXZGVmdJU0duWUx3REpDRWpNTk5PRlFiNGxNX1pOZDRfdFB1WFVHREIxM1Q2MjBsams5X1Z5VS12R3h2UHlZU0FBQ1ZLbXY4UmJidnFqTUlvbV9fLVByVTJsREVXY3lRR2FOSG02RW5ZOEdndUgxTVN2NGtoR0dtdzNmNGJaMlIwWDNYWFh4T2xxbXhfWjZfMUdRWTdHdVVwc1dqTXVOczBzd2NqbV9jc00zRi1TWmJwaVZHRzlvS3IxWW5vcUIwQ0RSSXQzLWJMY1FZc0NvYldfcGJYWEJYbXM4dWtCVHA0c0ZPWWRiblkxa0hiX0xWRkdNZG16Z1VtazV3WnU2THQ0VGJOTkpaZ1BUSGNWcDNaNHJhV1ViVExJQlBSV1ZieGVqQ2tXcUV2bTNVRFJ5SGhpVDlrNUpNQ1MyNFNkUDhJeTNJWW1fRXlNc1dfYjZDcGozVWVGb3hRak1IajRjYXB1dDROVGZXMEhwUEY4dFJsVkZhSm51cWhDUmExSm1kbVQ0WmJoaXd6MW1uSzZBVzlxMGpyTlFRTmFwYVZBNkRXRmNOaldSelBMZ0NaVXNjdVpOdTNlbjA5OTVrYXdfLW8wUHB2V1locFhVMVJOd2R4VkphOHR4Vk9XLVBpMlpaVFM1NUFvaVA4S3FjYzkwV0R4WGJBbVJ0UUNrNlZWdGR3ZEFSQnBId29kTU9RZTlCLUlOanNMZ1hGSDBqUU1xbEE4U2RoRjd1OFNlZWhZSDBUaU4xdER4Nm5teFNISzdPd1dhQTZuenZ1QWxXdFIwbGd1ZXNSQlVUSGhzeUdQWW55TDRDd21OYlBsRzNOY1ptRnFEbXptQ2QzTUFudGttaFdWUEU5N3FkYVAwdHBuNnd6T1FNdzQtRTk4NjZ1NFNTM3g5bUVCenplWjRvS1Q4QnlHTXFEOWRPUlRLZU4xUHNoYVAxakpTaWtjZVItX2tvTEtjMm94RDNPWV9LNk42TW9yYmwzOXoyYnFkeVV1NEhWcDU4QzM5MVZ6Zk1OQzA3YlZhdGN6MVByb0ZpM1VSTndSbVVDTzRjZEhpSVJDX2o2QXYwQzZNN3lsWFoyYzRoMDZ0UzJLYnNIZVBzbDFqcGZQR19IMHptdHd2VEdhVUQzdzFIVjl6U3FsQ0oySzhmb3EzMEFqVzQ5bnlZZ3ZEUHpJLUV3ZTQtYW1wNUtBT1VYQWF4aU5IaFhIdHd1X19nbEdHcjRDZE9zQV9xazl5SnN0WVF1aWFTZjU2S1hEZ1JVSzVoY0l1MHYtaXpyYi1GamRMNjBBdmhQTlZabU13UGhpWmlGb0NodTBKOHJaUEd5ekJKWU9CY1BsMVhrRUpudHl3eVVrcDRzeWtwUV9OQVhyLS1zVzhKX0tOQ2JWdUc0T0ktZE1tWkw0T013Z2xESnN2M3ZCalpYbWxDOGFnQ3gxZWJyQ1VwRFBYZVF2bDQxZkhZVWw0VkRmZnZVZnlTcmt0d2lqWFJpTDJuT3FkUEdLQzZTa1pNUml3U2tIaFdNaUotejZJRGUzLXJUZTJoLUdISjR2LXNRbmVrODFGS0hra3VHZDh6NVphLWxRUWVTYlNkZ3BodTkwUHZ3ZDhjck5jUHdaYjR5T1o2Q3hTT3hfNzk2MTBLNk1IeFdrTWlnazVjeWFLdzdnZnk4VU93dHdram92MHhYOURMWFJjbmstRG00TmFCd2JVLUVoLWllZTJaa29BbTBRb0tWUlFRTlZTdllZV3h3SHF4WlRCQW1Iano1Q04wekl5Sjd5c3F3M0V0TnVmVlFFSjZUYkJpckdnNExjQmxUT1l1LWVlMm9wekVhaHhoeVNvaUs3WnlMbkFETkVaYzI1NlVoRFdyNVdYbmNDSkxrT2pjbXIzNUlhdWVNXy12U1VuSWhJOWhJbmg1R2stMGp4N1FsRWFKa3prS3NNT2tVS1lKOUYwai10aWR3WVUyLVB1ci1ZZXUxb185N2RsMVFhZVJpZk1ISExidE9sTm9ZSm9BMC1jdEVaS2RYdWlkVVplMWFOQ0w2UEJyNTMxcU5jV0w5RWw2WGxtOE1wN0xZRnFxSWF4NV9mWm44SlFyVnR5MmViNTNoTkdwVjdPVUwycTB2UlJXT1hpdXpsWlZEcmhHS2FMSjNSWkNocGxDSHYyMkg4TV9ubEJBSmdoRzRCUV9PY3pZaHh1LVpBSWFrV2k5M0tVTzVVdHpFdFFoRHpQeXc1SGJ5V2FQbVpJYW03MVBWVW8wYWJuaV8zNGVfbjVPUmthMzRLXzM5d09POVp1WXM0SmJsUXVLVzlSaGRxUXFrMVVxSER1WlpvYmhBWlB4UW8xbEp4OV9Mb1gtT3FJWXA5YnM5M1pPaHdmbHZ4bkVTZFNMMXY5dnVWNUJJeDNSY2xMekc2WDB2U21vWlZ6SE53aW5Hb1VoSmNCXzdxMy1idi16Ny1PTGJfWkdHMmdrYmVlQXRYcjBsbGZsMDBncnc5ZFluanhlbTUwVWdvVjBRdm5MekxrSms3TkEyRWdzMFk5N2ZBUUxZR3pfR0tNVXdlNTNhWUlGcFNCUmRXSDlPNGNqbEk5VTVSMUdvOFhNZkN6aVYtLVpyRDdyZnpFZTcyeEJVUGZzSGQxLVlqQzlvZmtQYzVyZ2dObFBRTXM3a2VyblhQZThnTHVidXpWdDNNaWRSN2dKREJjcHR4c1VaMExzTHAwdlhMLXRWWHlnU3ZCZEl5S293bWFITGE2SnN4SU8za0xtYXZ5QkNEVEQwOW9OaFhLd09Ya2RHZzg4OEhCQ2VjS2NqUVNXTTlmMjQ4OXk1bjVzR0FHZVVMUWd2N3dkVzl3S3ByWmpmbFhwZEU2UEdvQ2p4ekotZ1QwUWE5YUZHc3YtdkRiYV9rWTRKQkFJbldNaEp6R1BmZkZLMVJoZDJ6NHJzLW9tOXVhRDNpcEJxd3N5Nk8tTFdMU0YtVFpTRzJELUh1cmNZa3hkTld5eS1nbTZVZmNXejkwVnJKdnR2VlZVZjdMVlBZRlZOMUpTQTB3aV85MndOLW1aWFI2SGNmZG9veHUtRVQ1Vi1QcVpPci0xVXV6ay1tR3JUbXd5WmlPTnRDcEFlUElNbFBSZ1lRNjZTVi1QQmppSmhNcVhva01WYVRGWnpoYlJNTkVnQXdWb2xDSW9FOUhPNHlOOTFueVo0SG1IR1hPTzhjcGdMd2N1U0I5U3JsX0hoS2R2QVhJSzlBYk5Vc3FzTldPMW5GaE5FU2RCUXZnbnkwc0hvdDlFSXhYRlNodTRXbzkweUpfM0YzSHUzSjFmSjV4RGtYa3dNeGFEbG56RlBWVi1keHVFTEg0X25WelotRkZfalhoWU1BTnVhUW05T09YcmMxbXBWN1czemJCMWFjR2tiYTBXUG5LaEFiYVBMUTlNUXI0QnVDeGJBdkM1RmJnUS0zNnBRbjdoTC1uckVxR1gzRXNNb3RodG5DdDY5NU96UFgzWGhBLm5SV3hoNHpmRHo3SzNRQllxVGJvVlducVEzeXNrRU5RVVpRT1JuaGlIbG8"}, [
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
  'fe6c2405-fa55-4afc-8a8b-b01eade9033b',
  'x-ms-request-id',
  'd5adcea4-50fc-4a84-bdd9-a70b9ed2166e',
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
  'Wed, 28 Apr 2021 20:57:55 GMT',
  'Content-Length',
  '10443'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1619643476,"scheduledPurgeDate":1620248276,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/4f3202d4f0db4714b220d0f4d0b7f7a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2PhKtpfvMGpkQI8prxpgjaPuwS4Y3ZxXoKZJBMW34qn_O-hXco1UQkZsjFacATfzA-DeiwRkDkSAiHnqOm8KH82AObhe6-BQI2h-dCMgS-XUb6-qHlO4l7b_GK4MY_zAalt6FjmEdlWT7ekwJHx0CvFF37___Kbjuhc3ICB4gUqAybXHTgiScDHCO8_MrdaFRITLicdzAgF4jcELiHGZ1RQ9j9BCqNHCAuUsLC3agOaa0qHRTvk5-PuD-5Z6THHkE-E2qS2xsqguBr7TAbIrqxAEAkiuJqRSRPuI6t15i4qSBNudkJmkKlOtUUIeYON5NwMSDvLbvSejvhSvmoOLjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643475,"updated":1619643475,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9c804589-7be3-4108-8347-ec5e8a2a260e',
  'x-ms-request-id',
  '65113b9f-e878-4376-ae9f-966ed556e341',
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
  'Wed, 28 Apr 2021 20:57:55 GMT',
  'Content-Length',
  '921'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  'f5fc6320-3763-4088-b156-10d0d2c1f074',
  'x-ms-request-id',
  '785864d7-83c4-4db0-8e13-5d04f9b9c1e6',
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
  'Wed, 28 Apr 2021 20:57:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '8aaa58e2-38b4-4e2d-866b-c70c57621b1d',
  'x-ms-request-id',
  '12b1f664-00b1-45d5-bc6d-a3768020b4e2',
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
  'Wed, 28 Apr 2021 20:57:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  'cb907b84-10b2-4a86-9ab7-215c59114d5c',
  'x-ms-request-id',
  '564adfa9-06ef-4c77-a09c-2b6690e05150',
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
  'Wed, 28 Apr 2021 20:57:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '1c645d98-6073-4606-8b51-3f8bddd1ac96',
  'x-ms-request-id',
  '53ab4eed-f507-4c92-8b4d-51ba5a58ac83',
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
  'Wed, 28 Apr 2021 20:58:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '0d829dbe-facc-49d5-aa05-60caa40d6f9d',
  'x-ms-request-id',
  '27f19e3e-8071-416e-88a4-ee9c41f519c6',
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
  'Wed, 28 Apr 2021 20:58:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '5918544b-8b81-4093-9a18-ad7ae7e31d57',
  'x-ms-request-id',
  '72c10a28-a371-4a45-abce-c04d0e2e3a84',
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
  'Wed, 28 Apr 2021 20:58:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  'd9aa582b-5353-48f6-8db1-41195da4e3ff',
  'x-ms-request-id',
  '820b1b1d-b490-49ca-bb9b-4638162df1da',
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
  'Wed, 28 Apr 2021 20:58:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  'b9e99dfa-5c45-4589-989e-f4bfcb65ac50',
  'x-ms-request-id',
  'c2733d26-a877-4788-9e90-3d9eba03e9a0',
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
  'Wed, 28 Apr 2021 20:58:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '9ef9e796-b301-4253-ac22-13bc5a8c56a4',
  'x-ms-request-id',
  '32959bc9-e4b1-4d1d-8f81-3b8981f88ca7',
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
  'Wed, 28 Apr 2021 20:58:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: backupRestoreKeyName-cangenerateabackupofakey-"}}, [
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
  'westus2',
  'x-ms-client-request-id',
  '1db800d1-377d-458d-9aa6-e84d985ea637',
  'x-ms-request-id',
  '85ffb702-6278-4937-840b-934306d6bc02',
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
  'Wed, 28 Apr 2021 20:58:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1619643476,"scheduledPurgeDate":1620248276,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/4f3202d4f0db4714b220d0f4d0b7f7a0","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2PhKtpfvMGpkQI8prxpgjaPuwS4Y3ZxXoKZJBMW34qn_O-hXco1UQkZsjFacATfzA-DeiwRkDkSAiHnqOm8KH82AObhe6-BQI2h-dCMgS-XUb6-qHlO4l7b_GK4MY_zAalt6FjmEdlWT7ekwJHx0CvFF37___Kbjuhc3ICB4gUqAybXHTgiScDHCO8_MrdaFRITLicdzAgF4jcELiHGZ1RQ9j9BCqNHCAuUsLC3agOaa0qHRTvk5-PuD-5Z6THHkE-E2qS2xsqguBr7TAbIrqxAEAkiuJqRSRPuI6t15i4qSBNudkJmkKlOtUUIeYON5NwMSDvLbvSejvhSvmoOLjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619643475,"updated":1619643475,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '58840f84-4285-4f68-ad9b-1e0e367bdf87',
  'x-ms-request-id',
  '70262d26-f6ba-422c-a5e3-ea78b80f42ce',
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
  'Wed, 28 Apr 2021 20:58:14 GMT',
  'Content-Length',
  '921'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
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
  '045fee52-1271-4b50-b04f-2d40832ddda6',
  'x-ms-request-id',
  '43dc417c-73b1-481e-9113-8905a7b89ec4',
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
