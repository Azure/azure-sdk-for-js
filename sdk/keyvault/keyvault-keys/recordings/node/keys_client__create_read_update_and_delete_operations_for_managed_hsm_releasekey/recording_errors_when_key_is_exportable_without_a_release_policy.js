let nock = require('nock');

module.exports.hash = "ed0144555258e44db57c40caad94ff21";

module.exports.testInfo = {"uniqueName":{"exportablenopolicy":"exportablenopolicy162829788626407567"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ2bDVlQTMwckJRRlRDS1ZuaDZCUEpCOU82bzZHWENKdU5rdkUwZzFyQXIwRWE3OHBNeEFEYnVPNkJ6eV9yZV9NX24xMGRrUWJWemVENVZKSk1UQnJuM2dMcDRJWjlOMXBVbXFBbzExSG03aVpJQTc2QnR6bkh2RHltclJBbWRXUlhzcVpFc2w1VkpUWWZiVTB3NEhDWkhaUTdyUTdFc0d6VHprVWxEZFAzTEtUQlExZ1RmMk5qYUdoZFZ0TGYyUWE4MTNGTFVVVEo1cThxMTZlMkJwVjd3eGpUSnBaU1ZxQXU2V2VyY055SlhrSm5RSmNqSkhmYW0zdGdGVFItaTVvSXd3QmdXVG92SkpqSjRHcU03NW1IMko1SXpyTEJ4TUp0SnVmc1JJejZMZDFOaUdYUUp1ZmtHbzRzVUpaSEJMTEVZQ2VxRzlYNWVQRE1kU3VXaDRWbHcifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgyOTc4ODYsImV4cCI6MTYyODkwMjY4Nn0.xFYgSOKNMSMSmW1g780Nm0luh1wEKbI6xAvyjsSK3WCgTup6_qmiuplznfiW5C8O2iQd_wQGIgAJFSKvzx3RvoDNgYqZSGAuESWN66npvIT0DrHkvO4MwVwcGDNTH0lNAEFb-HD_I-SHtZ5LYeEYdbn4mnsNsuttmLJeoMyIff1gknvapaWMhtAK6v-x84NejAnYsWof_i6e7HHNA4K1mbZ1_kyGd6ngVz60VE9Ptcgr3nmdIFswlzLWuy4bvQ7xebV2qR9ICXZXPXmXDxAOhqKptSvSIV1P0SRWQVciFarAC4-OOKGE52owK7lpldlXmrTKgqMcNNq1SvPk1ASGog","attestationToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjA3djBzZFJmcFo0emVPQllXYkU2N21BcXhBR3RfWGRTY0V4TndscmZhc3MiLCJqa3UiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWR5bmF0dGVzdGF0dGVzdGF0aW9uLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJ2bDVlQTMwckJRRlRDS1ZuaDZCUEpCOU82bzZHWENKdU5rdkUwZzFyQXIwRWE3OHBNeEFEYnVPNkJ6eV9yZV9NX24xMGRrUWJWemVENVZKSk1UQnJuM2dMcDRJWjlOMXBVbXFBbzExSG03aVpJQTc2QnR6bkh2RHltclJBbWRXUlhzcVpFc2w1VkpUWWZiVTB3NEhDWkhaUTdyUTdFc0d6VHprVWxEZFAzTEtUQlExZ1RmMk5qYUdoZFZ0TGYyUWE4MTNGTFVVVEo1cThxMTZlMkJwVjd3eGpUSnBaU1ZxQXU2V2VyY055SlhrSm5RSmNqSkhmYW0zdGdGVFItaTVvSXd3QmdXVG92SkpqSjRHcU03NW1IMko1SXpyTEJ4TUp0SnVmc1JJejZMZDFOaUdYUUp1ZmtHbzRzVUpaSEJMTEVZQ2VxRzlYNWVQRE1kU3VXaDRWbHcifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2MjgyOTc4ODYsImV4cCI6MTYyODkwMjY4Nn0.xFYgSOKNMSMSmW1g780Nm0luh1wEKbI6xAvyjsSK3WCgTup6_qmiuplznfiW5C8O2iQd_wQGIgAJFSKvzx3RvoDNgYqZSGAuESWN66npvIT0DrHkvO4MwVwcGDNTH0lNAEFb-HD_I-SHtZ5LYeEYdbn4mnsNsuttmLJeoMyIff1gknvapaWMhtAK6v-x84NejAnYsWof_i6e7HHNA4K1mbZ1_kyGd6ngVz60VE9Ptcgr3nmdIFswlzLWuy4bvQ7xebV2qR9ICXZXPXmXDxAOhqKptSvSIV1P0SRWQVciFarAC4-OOKGE52owK7lpldlXmrTKgqMcNNq1SvPk1ASGog"}, [
  'Content-Length',
  '2684',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"a7c-Ln9sweFEVmXZKYbaecisUJutyis"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c567d9786f88fdaad2eff2dd60609acf1be768e501ba055d0cabd03a841da6a2;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Sat, 07 Aug 2021 00:58:05 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162829788626407567/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '8674b2c6-f71a-11eb-a358-000d3a0f8fc4',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
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
  '1a848548-2955-42ab-8949-0e177fbf0500',
  'x-ms-ests-server',
  '2.1.11935.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAgAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGVLODEZrCzGXX5gVIUS_LAjsQhXHz7LWTdxQU2pzrukVmKB-ncTxyx8Cl_DKPFXySQbpf0vZVW2qE49O7Jld-cO8ayM8KNS2SjdZ1dV9KbHrOatQfvLh93SDJK54x59dt2SzR_F3QJphGP4Tt_W2Dx0bhs6KPCmszpiqVl6HuicgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:05 GMT',
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
  '0fcb7e80-2b68-46f5-969a-532cc3120500',
  'x-ms-ests-server',
  '2.1.11935.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAgAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrlpomVFMIpguNRe_ulQGJkzH8CmkHDrl72SKNfgfRZg6UAZFYaEiyDP-goGlM2BcUYzagVK2nBYTD4-09EkHubhSFuy1ZgzUh7B8L3hDI0Lg4GTRZn26yG_Atd7DeV_FHybhoFPjZZrSnKyWiB60jgDzCjeIOT09s8gTyuc8QfAIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:05 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=cfbf0ea8-2f28-439a-9f22-ecc30150d2d6&client_secret=azure_client_secret")
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
  '23021cb1-e92c-41e7-aa0b-558a630d0500',
  'x-ms-ests-server',
  '2.1.11935.12 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aq02jTuddu9EjqDOZ9Yax-DA1qXKAwAAAJPRn9gOAAAA; expires=Mon, 06-Sep-2021 00:58:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 07 Aug 2021 00:58:05 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/exportablenopolicy162829788626407567/create', {"kty":"RSA","attributes":{"exportable":true}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Exportable keys must have release policy (Activity ID: 86a82188-f71a-11eb-a358-000d3a0f8fc4)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '18',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '138',
  'x-ms-request-id',
  '86a82188-f71a-11eb-a358-000d3a0f8fc4',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
