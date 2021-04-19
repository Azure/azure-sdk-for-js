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
  'Bearer authorization="https://login.windows.net/azuretenantid", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b08e7464-f401-4937-ae60-ddfe10d6d514',
  'x-ms-request-id',
  'f7527461-f6d2-4e78-b2d8-ac9e8570426d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 22:59:59 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '5d842031-7e46-4bfd-b14f-f06125bce900',
  'x-ms-ests-server',
  '2.1.11654.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIAgAAALUBENgOAAAA; expires=Wed, 19-May-2021 23:00:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrpnEu8fNeO7RyBNlhR74fEMkdVMwCAo3I22FIX9ixj356lYWDr1ZcMkbEFqZ_nnw0Jvpzxo0m9iXdZkse6VwOi72_sMgPwM1AgF2U2LeTEMndbZHPff9XQ3DI1qgVGGUNDpdxhKxVrcyTpnhckKXLCJsr2_LSEIMtDr0xbbdU4IUgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 22:59:59 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'a0a377f4-e3bd-45f8-b20d-707f50040600',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIAgAAALUBENgOAAAA; expires=Wed, 19-May-2021 23:00:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3unoovNVdJiHMLcQ0A96DdrkUb-DEvUqiBGC2k5WmaH8b3ErQDiz4vU8r4tBgqpM6zlKd9zmZ08_qEtVz29JIoDzJrmrIEfh1BrBsoMXhWbtc4Ovkad12lZcj9OrI5VFuFbUlsTwnssokczRhStVmL9n0iYBFxDt870Dp1BPGR4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 22:59:59 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '5712c4ff-8330-4b86-bc03-83a60d698f00',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Am4P9qXnsuVOnZ-0fdcw79ML6tuIAgAAALUBENgOAAAA; expires=Wed, 19-May-2021 23:00:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 19 Apr 2021 23:00:00 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/af8119a6f2a841529171a9e0e15bdfbf","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"whoT4i9Td-BD6DrDEc6hEf46mUA-U-Q50Tu1MnQa88ZiuMEIkD_aGfx-P-6x9ohbeJTFUy6wsGXMnv8EBqfmFDkRtXxOsRnKKKTNlrnSvC1xY5LjFY1dRLlxRl2IiSngs6TkYT0GnL4U4t_gckJkqR0sMS6iaoau2TSauwT8O6AhblHrTvF-e6t1TDyxWGfXu3uo5HqEr2U1Rf-a0pr3y9JMtkxx050_R59gNl4mcON52VARn8n5yJOuYUI0Lqoq4X7UytWaeHjPA4SqUoeyv050pubQSq62QBFPM2X2xGFR2K_7CYVegwke3qrdN3azondhIHHm6YoaDk5mne-1bQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873200,"updated":1618873200,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b08e7464-f401-4937-ae60-ddfe10d6d514',
  'x-ms-request-id',
  '1c096c34-4885-4af4-93dd-5ee846c8170b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:00 GMT',
  'Content-Length',
  '730'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/backupRestoreKeyName-cangenerateabackupofakey-/backup')
  .query(true)
  .reply(200, {"value":"JkF6dXJlS2V5VmF1bHRLZXlCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUkwTXpnMVlqQTNZaTFrTlRRM0xUUXlaVFV0WVdVNVpTMDJNVEJrWXpNNVpHWmhaamdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuTFVLUFBPYmJBRTRyZzA4S2dDdFhSV1dmdUlya0NNTUV1X1hnUXF6OTc0NDROWUllX0MxeDhoXy14dGU3RnNsb2hHNHh5eVFjeUFCejJXMm1Zc19OTjJIcFhMQjg4LXljeEhOVHlYSVVWUENCMV9vaXluLWpsT29iX0R0QjJJMzdUaHRCaFp4ZGlHXy1BOG42ZF9vODNES3hHNDMtdVowcGsxdThSQkpoUWtzb0g3Mkx6c1cwLXI5TjUyWVcyVndPQm90QUtIb2Z3dmNVRlJEczkzS2tKeGx6TVJkaXBVVXFBS2trSVB2eUtOcWFDc29jQ3FNWXFobktfbTg3alVrSUFmakNvVHFrWW96d2NuUkJ6aWhkOG9vejZRbDRGb3RoQWdzaEdJQUZSY0ptZFk5TGdRSzJ0MlZEOXF1MHpfM1E4QThOeFprS1Q5U0MxN1MyNVRCX2pBLlhleVdjanE0R2lXQnp3TWcxREJSVncuTUt3TUtOcHZNT3NWbW5ROEVVM2wxRVZtUHl2bTJYMTRFMnhPUkN5cFo1bjRJYjQyRWhzQmZPN0huLVlKMEdvVS1rZ2RYaV9yOE9VeTNzQ3g3UkZSVXBfVHZKdHhpc2F4T09hRmwwUWNTUFVCMlQ5LUgtZzVuQ2xGSWpRbG9WRWdRaHpnX0ZwT29SSE94ZnFzeFZtcDBWTFFEa1pheW1Rb2NuTm9kaHd6NmVnS3hUYTcwU1AwNzRkM2F5YktXZDdGWFZsM0dvUHA0R0ZNcTQwbWg2V3VPV1BIOHRtYVl2UTZlUnNxdUZGXzQzbThpdkN3QWRxdUxSeFJoclowdkdKdGlsdWlIMEVxTzBUSVJpSnBBeGJQbHN1VFNzUlZNM1czV0wzMnhRdmw3ampkYlZGMEdlWnhpdUVEWWFud2ZZd041RXlLZWExRUpBb21udC1xWlY2OFRienlNbDZhQ1hWam0yUXZadGowcFVzVllhbUJiTXFVY1dFMmp5RDBybXF4dkhyRWF3YWRBSnNrcFEtMzN6RkZONmQ0NTVBMmVPMmpENkRRd2ZCZTY5ZmxGTW9uQUJReUdNY0dJblVpeXczTmx4eTZQV0NCdVdXV0hLLWdkTWpiZkRjODFsZzRCbDBuckdDZWt6Z293Sk5OUGcxTFhzNFFFWnljSlZHRVQyRUQ0QTRnZmJ4c1hwUEN2VVV3dGZmcU1mZzVVNVplbHc2WTgwQ1ZvdHk3UG5mZldNRnZackc3d2dRVTcwRl9RNjBZd1BIeC1CdkdBYTVTaDhWRjFGU2xLT3p6ajZKR1RneGVVMGNfOE5TcVVWYWlYcjJROWhNVE9fN25HdWYxQk44WXg2aV9nOWEtQ3drejY0M012cDB2MGN2bW9MSjdwVHJBV1hrNGFTQnBPNk85dDB1N3pycm1uNVVpZ3JjRFRPVkU1WGtTd2FYeFFWMGNwTUp6LW4tcUlrT1F2YURFZGJDajBJV3JkNEpQSEJtZmlDSlV6NXduS1QtVlF4LVU5VGlmc216UzFVX002VE1icGE3OF8yUjBvUGpkN3VWOFZYelZWbzhUMUM2RXdfS1FWRjFmLXBLY1QtSmx0eGZFeFhfSEtFWVBJOUVDSk9QVVNEMUk4eGY2VzFDTzZYMHR4WTE5WUxZcTQzS2xUemZaSFl3Mm1JWXdjS0VYdk83TEVFQ2RtN1IwRU90T0JkZGtQbW5jb2NKWnpibHI2TXl1UnIyQzc4SjZjdDViNUxEaHNUd18wZWNreUtyZ3BkUDlRNnJZRVB0YTVva3NMTHZKM3RfcnVPM2ZQN0tPSmI4R3ByeHFQNXN6Wm9lbWhEYVhkQjJIWDZmeEpoREZkbjJHa3JzbnZDYjdtcEt6UEsyUGxJVmRsbWtYcGxHSkNRMUdCeUhzeVVneHQ4MHRySUtrYzNtbjd6eTdhcW9kTDMzZmJOcC1Yanp0SFQ1ek5MV2d4NWNDWGswLVFGNVNLUloxQ25GT0ZiTEhPaWczb0pFb1F0NDdrRXpXTWVpTkV2T0hhSlRGM0FvRU5DaFBsR0gtOW9JWjBDMHhXZG1lWjBpT3FvN19fSG5fb2tzSVp4aUlrYS1kclhWajdGakMyQXZpQm8yaU80V1VKTTZlQ1dqSXZFa1BrNjVxSWdWNVdXRWNJMkxrVlFFYlhhb21DZlpzcHNmOGF3bWZSR3JxNmZFc19GTHh6ZVBaTTJkbkJhVEV1UWlmOS14U2lwWXhTcGI1QVB0aWtocDd6azJLZ3NPeDZVazBvdVB5TEg2aDBvUkc2VmI4TUhoZXR1dHJFTThqb0Vrc2VYS3B2WkRuczFPQUxHd2J4NnVPSmNUbDlZa0JIZ3poWGt4YldJRjRzRExuS2VxcXFPclVtaVM2T0FvY1VIY1ByUmRVNzYzM2FkY2N4bnJ4MWVnQW9qZTFvenJsOHlwZ0l5NHcwNHByZHFpX2J6RVlMUmRQRTVxcHUyVkNpOFhhUlUyaklGLUhtSXluNDA0TlF6WEhCd2ZzX1FxSUFBbm9LWEw3ZmZnd0dUOThSbmlTSXhJVTJmd2xSek1TZGw4UlZSN2xiRi1PX0ZkTm5NUnhTcC1TcVpwYkc1eVBJRXo2Q3VMRXJqQmxpTEY4QklJYlVDamNCNUVnOWRkWmFjWFVSLXZnUnlyZ2duZzlLd25mLXAzWm9XcUZEY2FxejlzN3FTNkhHN3RQaWoyTlNwclU5WDVnaEE3Nm8xUUsxZUFyS0NEV1BVdkFSZE9CUmVTdUdYakI5a0pOZWlZTlRod3NZdUluc3FUa0ZQUzdYV3Jpblh5VHN2a3hnMlJPQ21XXzVNSXBaU2w5U0o2eW5rdUI4c2VQVEVObGlyYWRfX3VLOE83bjRacC16c2dUUWdjaUVwazJDSHlCX3N6ZWZ3TkdaaXJ6NVBZZlhtUmRfQ0c5d25wVHk0UkRNVWltR29TMlJkVnlYNTZYcWc1WXUtUEtId1BBY3VmOGtndlM1X3JWTWx0eG81Vkd1Z1ViVllfaWRaN3V2bkw4Tkc1ZW05T2J1RG96X1ktdmI5cDlJV2NwNkxSVXB3eG44UmljZko5NUw2VThVRno1VHRyeEc1Tk4tSHNCQ3E5emEwSy1MTzV3S2NVSGtKT1hNYlVKMEtVZ1VpZGdwQzFibnMwcWxuckhQM3pVUWlmMEtuVVlZNDlVRF9hc05HNEtTN003QXoxWmtMazE5LVRISkJaYU5DeUF3S1gtM3lxUGV3cHF2bkgwcVlBUHRUcTZLLWVjdlRxNVJwUVZXRDVEWTJoNXowcDFweW9rdFlfUGFzc2V2c0JVMlFUYzRyRG1mMmhBUHNGNFk5M1oxYVV6dVhZV21oa1o4eDNHRGJXb2lOc0ZQV0FkYTdsWnRQSGhRalg4TGttOC1VSnJFeXVmeEJjcWRPVXpXbDI5V2FVaGRvMndYb1d0NFhoZWdYV09sdFE0XzEtakxhZ2hQSy1tM0c0S0NzVVBlcXk2dGhieVBLWlNWdlZndWhuSGphenp4OWliRnpZdGh3MWtjQl9qNVNmbnRZZXA2RU9BdXVSTkhaeVpmdTN3OFFsaEVNS1NVcmQzNnFvUGY3ZmZUSU9kc2p4bHFsMTVpa0pBeFFvYk10ZFRtRHNUems5WFoxdXFSQzQ0dnMzTmMyVzNsSjlsLUxjbkFvTExHNXhSNThLUUdydzl6eXh6OUZIVXk0cUNJWTlGTUtDckRRU3pJZTdGa1dNc2JzeWZWNU1iZGpRQTk3dG5tQW9UTXFYX21OSzMyMUdjb29OLXhtSkdlSmpxRUdXaHE1cjFWNG1ubW82LUluaEZtTXYwcE1fUFlpVDRRSTZtRWV5STdjUUMzcld3UkRjcmRBQkQtYVRaWkx5bUEtTXBLN05vck1uQWpadlRSbXJ0LXozakJST1RfbTNib3AzMy12ZGx3c2ZHYTQ5M1NtY1VGQlFnaXlBTWxVQVpCN0lla0NscWJUbzJUWDFjbi0wUW9Jcm1YakhOWmhJeE9ZWVFMNEg5cnZPTUV2RGtLWjQxRE1IUmVMdWFSMklvTnlwQ0Rqb2pQNV90emFUbDBwc2hyV0JWdjBGcWFHbmVyNTZxbHhpdEw3YlFjRkdtbEQ4cmxwNDdmd1BVZkc5Z2YtQWEyRWQ4R3BiWDBlcjZhVDctaTdPZXQyOE9ZY1p5QnhqcnUtZ2JLLXFjRS1KelFMWmJiN3g0dVp1Vm1FeFNhN2E4aThrS0l2MmZJa1dKUjc1SXpuWXFuT0JtSWpmWmx6U3dLbk9VdUJra1pHUHVKeC1PRG5ycVIyNk9manZpRzd0dmcxUVJudjRFNkR1ZlB5bmJRUFhkTGNSSmViRmtZWWpBOUtIS09jM1U2Mk42RDE5d2ZHN012bjhIUlFvXzRWU2d3S1FPNjIxdmdrVW1rVEdtWXFrdDdQbll1elVRUlZPRldabS1wZnZTdVlqYjczd0ZPV3c3c3prRmwxNkFUTFpqNzY5TWdVZVlMQzNvN2JHVU1zd3llc1ROV2p4b1p0UEdkWEJFcHJMbExqcnk3TkFlNXJvc1FDRXJlYkpZUjBGVlc3SWF0Mk9vLXR6ck02WDd0cjVwTVBXZjBOamVwQlQ1M0pzY202UW92bDlGYUwtY0N1MUhMcThHUl91N3RZLUFMckxvV21uMlA5ekRxdTF5NzhwYk95QmtrWkRsZ1RlbWd3TnZIOHpHaUhLbzN1cDk5Ui1WMFhUM2FOdkw3Vkc2dnRmU0VJaHM0SUZvcmJPazFEbEkzcXZqS0hNb1J2M1lNSzJPRUQzWld6ZFdhZ0xmZUh0T3VxcXVWMFVaSXRiTTVockFqakZBdFpNM1VtbVZKRFFYRWdKVXdWZVV6LTJWM2FqaWY1aUFmSEVxZWdFQVNic3NJOER3QTQtcWhyb3duVE1ORWFDclFhVVNkR1lsU19CbWpTVUxSM2ZDRHF6LXpvM041RG5ZQ0RPSmYya3d0eF9WWjFXQlN0MTNzbm8zQVg2aGpwb1REX1hkZzF2ZC1GVE9vclRrYnBEUUdiSW93emc2dUpjSk5pbHl0OGJ6VHdhODRkemc4WWZFY3RMaGY0Vng3TnYxMjc1LVlmTjFqdW5wX2gteUdIaDZ6dUhKZXdJVWgwc2c0ZGFIaDBfb29ITk9oSlQwZlFlYUNLV3BERlZISEJFMDVKMTd5amF5MjRxNl9DT2ZBZ3J1cE15NFZKZjRzdVBhZGlvWU9yUV9fSThEWHpnTGRrY0RzTGtyaHlCb3ZoZW1BbkRPdE5kZGdIM1MwaTcyUWVQT3FudmI1MWVTM3cxNGE0UU1lemctX012ZGwwd2ZhMTdxdXdNc1ByU2ljSXg2MjFDakJLUWdvVWNISzdBYVZhOXYxWVpfREtXMXRLZGV2T3Fra01wV3hCMUZpamwtbzdPUHJyclppTW94c1hkdkNMLVV0T0ZhSWNWU1pyZjIwYVJUbi1nY014LWE5SXpFdHdxMTd1d0VjMHVUTnhlTllvM0NqTU9idFIzdGxXa3BUVERRc3p6UFU1cGY1MjFUNlBfQ1VJVlViY2dLWXpyRnltZ2hERWEybzNxakNxaVk0RWoxZGZJTUJ2WVpING91cnZKYlBwZjVHQnlyVkpBdzFsaVRPeGF2M3I3UTFYaUh2VzJtbkJEbXo1SnY1SjF4RnF4bGNsYkRORWQ4SnZfRGVYS25uQ2VUUEJiY2ZuakRrMjVsQjZSZ0pTYjVtdFBBQThpUHBCb3ZwUDFBSF8wRHI4Q19VbnFFQ2xGX0xFbzlhWVEwWVg3anJGSUI5RUFuM2g1blQwbXo1eXUxcWFkOUNpbko0QVIyVjBfbHBrbnY5V3kzSTk5WERGczZrb1dOUW5kNngyc1lGaEIwY2duRkVUMWRUdWFaZnNLSXdMYzk1bGo3UEpoeEhuaHpwY2E5MVhmNzdDSkM2b0ZFMnM4VUs0aGNZWGJXUXFjSklJTG1qMlFQNER4WW9tUlVya1dfWVJtMlRIWGxXMHFlanZtR3VXMXlHTGlzaHloN0VPR200NnJYcVhFMVl3aHlYcEtJLVZiZkpGYmVpWlRWS0JjazRlQWhJVDY5Zi1xRDFGTWZMVHp1YVRudko1RXUxU0sxbnBpdWRWZ3FOQU1rc3AwcGtlb0VUaE56a0Y2T29WX2JSU0NiX3FHZDdGbm5ZXzNuYmZxdkVtbkY4cHYyR1NtMXh5akg4UFZ3ejJCR0N4WkdCeGNuZnF0Y2lvQ2tCMHBnUkR5ZldWUjFGbnRKOVl3S1NjV0J1MUt1YWtGZTVjVmJPNDllUGtPY0tyZ19KSHduaEVlNmQzNGVMZktoVlViVERhWHh2NTMxTDZoWnlMWFV2Z19PMG9Ccm13MF9KelllbVM0LXVockYwQW1ONzJSVEpzR292RW1nTTA1NTF0VkFLVVM4OW5PMldSNDRKazR6YnRTT1RQOTVfQWsxZmNXZzdxdjFOS0haT0pXS3k4V1dOS09RYjAxMEFBVHAwcWRYNk9FbkZTLWU1VE9sNTc3MFBBdWVGWW5fTkRpT1NYRklmY2wwNWxtbVBjbnlESXh2UUlmMHlCek1CVndXNzNGRWJyLXh3OUlVZGtQYmdoeG13OFJIdmEteGV4T010WUdiQ0c3YWh3MkVzMXYxOEJ5a3Z2VnhyOTYzd19XZUVyVXRmUXlYNjMxcjdnQnl6ZnNmbC1MZkRYanhlQXllQkNOTmU4TGt0b2RzV0NQc1prbVVTb2V5TU5ONnV1VURiLURuNkFXYWpWXzdMSWlLWU5nYXpYaXpKc214cnV2TUx2cWJyclFDWDNFSmlMQ2FESWtQS2V6aWotdnAtWk8zQVd5enc0aWgtOHl2bko1WjdDSFhySURydGhCRFlxQlA1TWs0VEtna2x5a3FOS3Z6TnZFVmp4clJnOWg2dXhWbkY4NDdiRFhLRnlrb1RVUi1IQnliWWdwcDVrSEE2M3VfVTByeWpHX3ZUMXZyWE5ZSEpzYURpeFVHTVh5WGY5MEI2SWdFMF9EOV9RQjNQVEZWdE1aNDBkcmRaR2hNMEpwWWJuNFM2ZDZYX0dTS1lldDdibmhNT185Q1FmUnM3MnFTMU83R09uT1g1dkxSMFBzSEJheHRRbFBVa1FUT3RTX3hqQjZsY3EyZXV0d3AwUHlVa1NmMzZBcTVxQkFENVRQVTNPZDJtd19nckNjSGNDMHpsa19pUkVEMkh5OXI1eVJZS0RubG1iUFpPMkdQVW1xZFhjZlhMOC1xQ0tKQlhmbzdaSVQzS2RJM0plaFUtbDhScG0xbXZIaGhWWThOb2JDcjN3WnN5OWdfUjVqaU9sOE14RFRLbllNYjlnX21ZLVhySHh5a0JoMzMxV3ViNm8yNjh0emlDZUxHaHdyQkh4UXhXSzBuSEhtVGRMWXdPNl93T0Z6bjR5emhwQ01kQ2JEa0pOZnFESHB5OXJMLW1qd2lOWk5ZSGMxSTRNXzg5YVNCY05JM2ozckdLY2FQeVVfdUxSSUpBYzFIcGg5WVItT3lXd2Y2NDVjMU5XWk9sNFB0c0NBNUJpR2Rud3hBcFJ6UXlSWEtTbkcxeTQtelVMbmFtcEpnN1dGUVp5UVJ2NkVJMzR3WW9PQ2pSNUlzR2VvMGJsNlVJbVU5QmJHcnZNT085ZFJkRnRHN2dQOF9Kc1htNFp5ZEZ2TUMtdGdnREVTaHdoMmZzWWhqVktoUURsQTNlYWpDSEJGZEJvUDl1VG5qZ2RwekFZT1VfWTlOa0FqTExSU2xFVzFJT1lSZGM1WXZaVk90RjB2c1EzQ1JSLTItejl2Nk5FQ29kRnhhdUlmQUNMb3ZOYlNiMWJMX29NWkV2Q1lfaG0tekk3ZFM0amJlSHZzOTVycVpDWmtfTm1XaldNd1hxN185eEZxaWU4ZTV3QS1WSWpaZzN0eXpYM0FLMjdycUNHQi1MX2hmVTFtaFFCbkNELUtlUVBLRGVGMFZtM0dEME1SZGFSN0g2SDhvbDJ1bWQ4cjhzNGc3cXlOR1JJVWdTYTd2VkRfLTFBODBMRWFNREQ4ajJrMU5mY3FPNms2UTAyenFWV0s3UHNZOUozRTJmTXRkY254SVpnNldLY2NicDdzN1R5RXFwM2x1aDltTHZzTGVOWGctcVhqWE93NjFLTndqTEJQa3NFYXBvanlpSF9sVkV5WmZPeWpiYzN1XzBoUDMxdkN1SHU5ZEo5TU1XSmdEajAwQ2VzVWI3TFNqd2JHNzl2T2p0MzZEOXd0RG5Zb1hPcC1SM09BUklHYUJFeDkwSWpXemljaEY5dWY4OVZPR3YyTU1WWm1GOThKd24teHJMS3Jra2M1OVFyUjZSVVRrUHgtTkt1bkJGdVJvSFZ2VF9PU0h2ZlVqeDRDbkNpaFRIY0QweUhoSzl3dkUwbFlUMUc1YUZPLUNZNEgyNEp6TlJpcXJtMTdObGJIRmRoMzBPOHVTSWx1cEZ2WmU2UHdHTEVhYXhxdXpMMXU2MWRaT01uR3l1X2VLdzRjOXpka0VHUWFBUE1lUFZuSXZKWVctR1NrYzVYTFdlNlZ0Mm5WN2lfU0NCVFNaZTFRenNaTWE5TS1Ec0NTSGk4S0VrZDRSenpRZEpkakdHRTRCVXdkVUIxOWlWQXd5aVZIRUgxTjhWZXpyRzV0OXRfYWJhNDl2bWN3OS1oMkdTem9DLU5IbzFBQjNvUk1TclpCcHlOZVhmSFk4Ti1iVHBBdHN4ZFNIOTR0ZERLRGl4a3FIN3JBMDdMN1VCNkgzOTFMc0ZybFdNMkRvY1dZZE5ENGVETVhaMVNuVy1zakVuWFFLNktXNndYRy1UajJzelNNRjdjRzZCT2E0YmRCdmxjeTdoM0xJblY5TkpKX0ZTQjRvN2JYemYwUWJCQ1Q3V1VaUVZYTzM4RmFIdE8zTXRjWkpzSUFDUnVHMFpGQURTeE4zU3VQazgzT05xSHpXNW9wN1o1QWRVYmk2SnMybHZvcDlOamFONzA5ejYwTkVSTTVtVWhYSzhRSTBFcVZOQmp1VWlqYWxRYW03blR4SmdURlpqYkNSa2pmQ1lObHdzNkRBbGlYRjRBNWNpQVhxNmhBUVdlUkd3cTV0eHV4LXhUN2hDd25obmh6V203Z2ljS3Z1MzBVRG50SGFLZWkwdDNGeW83aWpLRGZiRG9pcERNQXpwWVl1RXZQMGdsQnN0ZU9hUnM5M0N5REdhY0k2cy1aWUxTLXJCZmdWQWNLMVdJMThiSEl6Vkh5V2o5NjBnSWx4NV9ZMFM1aVZUU193M3BTdzNmcjEtVkVLX0RicVZTSTVybnVkRGk5dkRQV3FVSE13dzZxbktsXzRfd3FJTkRJU1A0YjMxRHBlSXlKN1RNTzNkYjFITkhCNUI2SmNDYnI4dmR0SUxzaUxBRHVISFZZa0YyQnZhYzJTQUphVUtrODVERGZKRjc5MUU2V3MyS29ZSC1VRFRuVTBNREprWk9XaUEycHpUQ21HZ2pmTVJCd3ZkYUppT3cxUnZNTjBHcXNCSG5lZjV2MVFLRmhYWHhYZlRMMEQ0SFlfYVEwZmRJNjlLekdZR3p0OGtOTnVKOUpJWmJjcEJpRnY3anREb0VTekk0Qm5rX3F6X0o1OWpqRENvQVZLcFdlaW5zNWlKR05xMXN5MTZablZyMkFSdE1SNWNXUkxmNXppUjkweWtxUWd1Yk53OXdXN1YxbFpxMTBhM0JpN3N5dUZpX0ZuVjVFOFFDQ0o1UWUwX2cwUnVHQnpHNGZKR2JqRjFmTFQ0Y0NTVGd4RDFpazJ6U05rWkE4X2hBUEhoUksyU3ZJWmdrRVVlNVhCNFQybzJ1MWlQNTg0SHBybEdVXy0zMEtfNThfMWg2Z0hFNWpTM0JPWTN3QjduQjExLWcwbzVmU1paaVMzaFA1enpVeUVoXzRjSVRwRndhZ3ZGQXQ3QTVyUkNEMmx5TVhSdndveVRPcVE2dlJXTVI3RnFhMmw3STBtOU1oT2hRejQ2WERQbXNoV193UDJpTi1SQmhKX0ZuM1VQZC1iNlhNTmw4MDdUNmRBdDdPOVhHWEd4WU42YnY3X1dXRHVtZFc2dDl3aXpjQjlsY21RN0lNX0IySWd6VFctNG5NQklkcWcwaG15cF82WEZmRVhUN1A3TFIxd1FzUW50VU9haTV0OW9IckR1ZktXam5mMTNZdWdtSWZ3allGZFNNdDNnMnJ2cTN6QXJLSlA2RUdSRUZyYmFPVXh1Zno0LVRSU1JKZm0waHRNMHBOeE5LLV90Z3NFTXFHaUlRMGdlUlJLRnNZd05DQ2FxbFVWcl90NW1MM0dWOE5UX1JQMzJZRFRYZ21rVnhQLVVldUtYRjlEekpSalh6UWhnR0lhcWVTX1VrQ3JyMmJ6cmdkYlpsM29WZ0F0MEFwZmtPbUd6ejBRR1BIekdQNlg1YWpqbFYwY3FiZThVanM3Rk5Zc1drQjV3Z29Ud0xSV1llTkJOZE9KQ2c5dzJWT1pyX3BiZG9IU3J4bnAtMW85QXhibTYtN1hKSlA3YmQ4eFNiY0NHU281cEU1Ri05Qzh5ZHdhOFpTNlh2bnJhdHBNa1lSa3NSWjF4U2JiaGh0QnhLNVdnSUpjRUtYNHVKbzVkOXFjUXZUdXZFeXgxS2xxalhxc25DNDFfMGVFRjBTZlV0M0RIZm9MWWZ2Nm0tVTlTTG1CRHRnSTZ1V0taT2ZmdExCMmdYWFM2ZDAxSFI4TU9SdlkwM0k3RTNhVUdLUzB3bDYyTnpDMWk4NkxIbkhSZXdfYlRnaXhtUnluM2IxUlE0d3RvdFJCTE84WmZESEZvZno5ME95d09EY0NDc0dvdE40dmoxMkVzdGV2QUhZTkRWNHY3azc2dmIwUmJmZnR4aG1LdnFTMVRhelE0TzBqR1U3RnRJNXN1dVFmeFpHQjBtQTRCcmFRTmRqLW84YTY2TW5DR1duZUI2TjRDdWt5OUN1SnFnNzVIUGZrbk92V3F0MDdBbElmYzVQZDRMMjdLVHdhMG5oRmIwQXc3M3pKT0UwOE0teUpPWHhGd2YzRXhQSTVKbUVEcHZKakJRZkpCazJsSlMzeU42UExpUUktTWlBNmRZdHZOM2FyZkkxeXJfcmZOZWJwZnltZ1FUYjk0M19fWXJ3Y2Z1aGoyODhySUJ2MVpkOTUwQjIwUkJBclFaU3hzOUUydlNVOXVQVEJpSFg2ZUREQW9KZGJrY1FQN2NEdTlqZGJfS1RSZlBHdE1oYmo4bUFPLVlCcExfamo0MjBIQ1ZIaUhfWjBzOExMWFFmQ1JtZXpSU3ROVVVuZDhjdXhyc2xWWUp3TmNxc2dyd3k2X1kzX3JsaWVQOHBMRDA4UmhyeGdRZTZjNEJ4NW0xYXhTREhYZU9hY0Z5T0RvUnp0RmR5dlpvX0ZxNzFPRUNsa0NRNEtWVjZWaW1pel9jdkNiU0lGUnFCU2FLdkhmd0dNX0VObERSQWwwUUhlODZCN29DZU50MFdIYVAtUktsZFJ2VzlWaDJzcjdnYWtTTmlFLk5FdTd5Sk5lSG1SWnY3VjlrUW94Y3BBekM5aXNxSWdVcGJMS0dtSWw2aGc"}, [
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
  'cc7843f1-e94f-4683-96cc-ec816ad94a98',
  'x-ms-request-id',
  '06541099-cc76-4a82-81ed-1e79ef2daafb',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:00 GMT',
  'Content-Length',
  '11779'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1618873201,"scheduledPurgeDate":1626649201,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/af8119a6f2a841529171a9e0e15bdfbf","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"whoT4i9Td-BD6DrDEc6hEf46mUA-U-Q50Tu1MnQa88ZiuMEIkD_aGfx-P-6x9ohbeJTFUy6wsGXMnv8EBqfmFDkRtXxOsRnKKKTNlrnSvC1xY5LjFY1dRLlxRl2IiSngs6TkYT0GnL4U4t_gckJkqR0sMS6iaoau2TSauwT8O6AhblHrTvF-e6t1TDyxWGfXu3uo5HqEr2U1Rf-a0pr3y9JMtkxx050_R59gNl4mcON52VARn8n5yJOuYUI0Lqoq4X7UytWaeHjPA4SqUoeyv050pubQSq62QBFPM2X2xGFR2K_7CYVegwke3qrdN3azondhIHHm6YoaDk5mne-1bQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873200,"updated":1618873200,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'ca0e109a-9418-4369-8c3b-c547dc9146e6',
  'x-ms-request-id',
  '2cf7d994-6c0c-41e0-8ad9-678d53f2af4d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:00 GMT',
  'Content-Length',
  '914'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9c14e125-4d0d-4822-8cc7-504669ee9f1e',
  'x-ms-request-id',
  '6ddcab17-a23e-4f2a-8ae1-022c683801c6',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:00 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '50d1b6e1-8edf-4914-a1ac-52bc4e8954cd',
  'x-ms-request-id',
  'b3fcc68f-f1db-451c-baa9-cf42d0bc8686',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:01 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b0312244-0528-403c-8d4d-c4a8ac2b0c08',
  'x-ms-request-id',
  'e2b6fc76-806d-4050-b874-3a530cff0a36',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:03 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '93aa0562-11a9-4f46-a1f1-a33289b3fd9e',
  'x-ms-request-id',
  'cb1c2711-600e-49c7-ad74-d461eac85c8f',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:05 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '91a86bb0-d99c-4d4f-af71-e4864f7de821',
  'x-ms-request-id',
  '47ffd40e-7e06-4fb5-a2ba-f9ca75b709d0',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:07 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '685771fb-7c7c-4dbb-b29c-73759eeded09',
  'x-ms-request-id',
  '9a7beb2c-091a-4c47-ba10-addac1222479',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:09 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '59cd1af9-993b-4a35-8b00-8eaf98d52a49',
  'x-ms-request-id',
  '4d8c6c87-b3cc-47f9-9add-addd8b17c46b',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:11 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5ee7da63-463b-4f34-975a-387d4a47c855',
  'x-ms-request-id',
  'a6a2b86b-d767-4d40-b3d1-34ed7164df25',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:13 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '71a4bd2a-2340-4a32-977f-5bc136899597',
  'x-ms-request-id',
  '4298957c-448d-4d71-a9c9-1449f0a2d9bf',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:16 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b0b25340-4f2b-48f0-aa08-8ae7645505e8',
  'x-ms-request-id',
  '4fb35dae-8aa1-4e78-a650-2158dc716970',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:18 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '74ddb7f9-2bcc-482b-a113-e0c49ef72202',
  'x-ms-request-id',
  '0e3ed505-de2b-4f52-b935-4d05fce0bdb8',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:20 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f2e5255d-6490-40ca-ba1f-b99fc1e26b01',
  'x-ms-request-id',
  '54ea8a1f-2819-4a25-852d-dde4952ef060',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:22 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e116f8df-ef5b-46e6-b870-d658e0501b36',
  'x-ms-request-id',
  'f6d7b8b2-2407-47d7-95e6-bfe67dd9be00',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:23 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '97798ad5-0b04-4234-93ba-5e254030f389',
  'x-ms-request-id',
  'd469ff3c-e3a0-444b-a53b-09ef7e7706b8',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:25 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6d93e3a0-d7d7-4b75-9426-1625e337b1d4',
  'x-ms-request-id',
  '414f12cc-2aeb-4031-8262-d4eb512cd58d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:28 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'be3a4232-39f2-4be7-b046-28285f8963b6',
  'x-ms-request-id',
  'cad17121-c920-42b9-bd86-1b23894f1c78',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:30 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fbcb1e39-4b6f-4e40-ba05-78f56d69b072',
  'x-ms-request-id',
  'e515f601-0748-4bf1-b651-f11aa501bd7f',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:32 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5b45ade8-0392-436d-b30d-fc0ed2448f17',
  'x-ms-request-id',
  '89166605-216c-449a-a7b7-6c2928c8e3df',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:34 GMT'
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
  '130',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'fb36fc0d-a38f-42b5-96b4-56f3485e3463',
  'x-ms-request-id',
  '6348ead1-07c2-4a9c-89fe-8a36373169bf',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/backupRestoreKeyName-cangenerateabackupofakey-","deletedDate":1618873201,"scheduledPurgeDate":1626649201,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/backupRestoreKeyName-cangenerateabackupofakey-/af8119a6f2a841529171a9e0e15bdfbf","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"whoT4i9Td-BD6DrDEc6hEf46mUA-U-Q50Tu1MnQa88ZiuMEIkD_aGfx-P-6x9ohbeJTFUy6wsGXMnv8EBqfmFDkRtXxOsRnKKKTNlrnSvC1xY5LjFY1dRLlxRl2IiSngs6TkYT0GnL4U4t_gckJkqR0sMS6iaoau2TSauwT8O6AhblHrTvF-e6t1TDyxWGfXu3uo5HqEr2U1Rf-a0pr3y9JMtkxx050_R59gNl4mcON52VARn8n5yJOuYUI0Lqoq4X7UytWaeHjPA4SqUoeyv050pubQSq62QBFPM2X2xGFR2K_7CYVegwke3qrdN3azondhIHHm6YoaDk5mne-1bQ","e":"AQAB"},"attributes":{"enabled":true,"created":1618873200,"updated":1618873200,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '52bf1c90-048f-4b9c-a59f-555475d4c4f1',
  'x-ms-request-id',
  '611a399e-191d-4873-a44a-f45d5d67a4d4',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:38 GMT',
  'Content-Length',
  '914'
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
  'eastus',
  'x-ms-client-request-id',
  'fd6d34a7-1c9c-469d-9cd4-d858541083a2',
  'x-ms-request-id',
  '7dbfe8d0-0da6-4e79-a2e0-a812a078a731',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=20.94.195.230;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 19 Apr 2021 23:00:38 GMT'
]);
