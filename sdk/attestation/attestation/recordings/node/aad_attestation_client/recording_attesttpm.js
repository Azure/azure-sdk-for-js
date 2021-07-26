let nock = require('nock');

module.exports.hash = "dff37b137bb3af7478e0e67479c88cc5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'f494e691-1787-4c43-a2d2-14c379932901',
  'x-ms-ests-server',
  '2.1.11898.8 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ar3NpgXvHYZDh9jtUXJwxds; expires=Wed, 25-Aug-2021 22:51:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6ChGQwul1A2OXDiwKRibPoWJLpOJAFLFy9nLci6ZmmIRaJ_2334VvI4CUd3uK7s8cj8nF3MTItoM5QBu1FXo-4rv1p12F4-Huq1CLSc1ag82uILcq7xxg_nodmmCAMtuntXhzuKcbny4W649-4VnDY62rAOkcrh3cYYC5EKUXkUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 26 Jul 2021 22:51:05 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '1753',
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
  '547a7bc0-2b4f-460e-ae52-e06f8ef78f00',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ar3NpgXvHYZDh9jtUXJwxds; expires=Wed, 25-Aug-2021 22:51:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkFfNjT68ihHEg97zIQneRnNQ_VQDW6KLyxGokTBsibBs6i5fKDikjFe3JKFLT2B80iqjr0dsfYGLDbsMEhikT09Cv0gQ6-qCUGTxDu7ttphpFMHulgVKqPCGmdhaH2ZPf8H9h4YYjig3KuvbHqDb2jBsqSclZiQlBctVA5A8rl4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 26 Jul 2021 22:51:05 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=63f4167d-d1fb-415e-a5e6-212b35e5e826&client_secret=azure_client_secret")
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
  '02df26b7-a24d-42c1-a5d0-0e557dbe7600',
  'x-ms-ests-server',
  '2.1.11898.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ar3NpgXvHYZDh9jtUXJwxdsinVqPAQAAAFkzkdgOAAAA; expires=Wed, 25-Aug-2021 22:51:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 26 Jul 2021 22:51:05 GMT',
  'Content-Length',
  '1317'
]);

nock('https://aad_attestation_url.wus.attest.azure.net:443', {"encodedQueryParams":true})
  .put('/policies/Tpm', "eyJhbGciOiJub25lIn0.eyJBdHRlc3RhdGlvblBvbGljeSI6ImRtVnljMmx2YmoweExqQTdJR0YxZEdodmNtbDZZWFJwYjI1eWRXeGxjM3M5UGlCd1pYSnRhWFFvS1R0OU95QnBjM04xWVc1alpYSjFiR1Z6ZTMwNyJ9.")
  .query(true)
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vanNsYXJyeW9hdHRlc3RhdGlvbmFhZC53dXMuYXR0ZXN0LmF6dXJlLm5ldC9jZXJ0cyIsImtpZCI6InJQdEJHUldUbFBtenM1dTM1TDBRUkQ5V2R5bWVLUFJ4dGVUZVRsd04wRWM9IiwidHlwIjoiSldUIn0.eyJleHAiOjE2MjczNDM0NjcsImlhdCI6MTYyNzMzOTg2NywiaXNzIjoiaHR0cHM6Ly9qc2xhcnJ5b2F0dGVzdGF0aW9uYWFkLnd1cy5hdHRlc3QuYXp1cmUubmV0IiwibmJmIjoxNjI3MzM5ODY3LCJ4LW1zLXBvbGljeS1yZXN1bHQiOiJVcGRhdGVkIiwieC1tcy1wb2xpY3ktdG9rZW4taGFzaCI6ImM2c0VKUUl0VjUwT2VQOUlyUF9ienl3QU1PVnZqNXVEUGJrbEFfYndkWVEifQ.BicLREHgRGm5AWUicCloFCLeQr3ROZxdFUTDCicrGMVek7IrTh_ihHaCtUiKb4fAKY8K27lvoXe9jJB7u54z-8GDmha_QJpTUVAEVRrvShlSAiG3wDy7yv_S85-eJF5K4oh5WxBQV_ml38dEurQAE7sGuH8HgMgm3WwHzr4J9m9-2spymbFB5GfKVUOuQBWoIKqglROZitOQT2CFHpcTaDrBwdLtq_6VYlfuymEh2b0gOfU8yiUvmzkkCTV9EpLw4qmcSyBdAIUtcfML0kejjsBGFlAmoEe-Pzp_zNxkTj7OQpYcAck-lx90EmWBzem-uBGC9nvjfBinlmLT7bc1jw"}, [
  'Date',
  'Mon, 26 Jul 2021 22:51:07 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '837',
  'x-ms-request-id',
  '00-6c4b9697cbb169c8fa1b4aad166a8431-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01644.0004'
]);
