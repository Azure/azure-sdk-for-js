let nock = require('nock');

module.exports.hash = "a1e81eb55400bda425d12897b40d7253";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/create')
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
  '1299c4c6-5346-4e3a-b0ce-97db1177802c',
  'x-ms-request-id',
  'f53d77c1-d4a9-4943-92bc-b61da4b8a807',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT'
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
  'db987154-05a1-4277-bfcb-6a98f8638901',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:03:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsvQkCxRu2yApcwYt032JmCPkpfqCSfCXUgWBS6LfGMfj_ygfqP4eXshpWI6-A39WAuOYN3RIKSITTu3OrpUr8e5b43Deb9WM9753kdsC__mwZewsJj1WHho9QL__Qc47xIfmMdZp1dsc3iV16tXTFUSi3ttHRRMfPuBNGiVSjfcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT'
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
  'b7aa2fd8-941e-454f-90df-abc0b522fa00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:03:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0w1GPp1FcFEnH7HRssy7XWagvnBw8v0YlQqKuPw_Auk_GiYctsjga1RTXUJe3YEudCSLvBWJCwyW226VlYjvs-CaOqjBklm48qRDrUTxbUbYjumEH-fK1hTtQOUl_ZdZU4iLwI93bPBWtSojfPu70XUoM9AiNaJex7IEkVtjGM8gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT'
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
  '8fa1c2cf-b116-417a-8b4c-05132c2b2401',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAgAAAODDG9gOAAAA; expires=Fri, 28-May-2021 21:03:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=fe01b1ce44c64803b375c029d6442607',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1299c4c6-5346-4e3a-b0ce-97db1177802c',
  'x-ms-request-id',
  '0eac2ae5-f687-4033-b15d-292d78162dec',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f9d5fd84-73c0-4b8b-9636-64b033973389',
  'x-ms-request-id',
  '241aeb32-20ce-461a-85a9-2adc1e7bed05',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:56 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '33de2b8d-709a-4b62-bd1e-ff3a40f88092',
  'x-ms-request-id',
  '1bf5b6c0-8b04-4688-bf45-573f68387a10',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:55 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5dec54af-cabf-4f35-a77c-ebf8b0ab59f3',
  'x-ms-request-id',
  '0c7859e0-0827-401a-9f4e-df930db395f6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:03:58 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e73df60b-3eba-470f-8f0a-97f5d1b4b23f',
  'x-ms-request-id',
  '77b88b8f-7741-4841-935a-5d9faae3966c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:01 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7abfa159-8784-450e-bae0-542290d37726',
  'x-ms-request-id',
  'b0603d2f-3adb-4646-a86b-e08d3b675960',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:02 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c4886e83-9ef9-44ae-83b8-3aa40ed378e1',
  'x-ms-request-id',
  '86b011b5-3edf-4f5b-9f79-1787ec21a513',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:04 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1f9df790-c6ff-4686-bb61-cbe1a40892e8',
  'x-ms-request-id',
  'f5f22bda-3f0f-416c-a5e6-67f6e6bec458',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:06 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9e050f5b-c8c3-4352-adee-ce663731fbe3',
  'x-ms-request-id',
  '3915bdbd-86d2-4dc7-9fae-122ac345da15',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:09 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '91c6dd93-53e6-440b-846d-24aa87d4e687',
  'x-ms-request-id',
  'c8d95a2e-c01b-4c5b-a628-ec4d7b0c8af5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:10 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '30fe36ca-c3b3-43cd-bfe1-79c7aaa515b5',
  'x-ms-request-id',
  'a26090bb-92f3-4d5a-8b68-c95797cd9a47',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:12 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '86a9cdaf-da2c-4754-9dc8-2cc41fca8de2',
  'x-ms-request-id',
  'f0b8ca49-710e-44fb-b239-83e21cf2e7b5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:15 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '94cbff79-cd5e-41d9-9ce2-8c3fda90bf15',
  'x-ms-request-id',
  '55146abd-348f-438a-ae91-10bbc3b39189',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:17 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6375dab2-024b-412f-853b-9161261cb687',
  'x-ms-request-id',
  'b3affdcf-ddfb-439a-841b-6f5e5e937606',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:19 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '63c80aba-d8bb-483d-8f26-d704addeaa9a',
  'x-ms-request-id',
  'e4e64c37-0a32-47e0-8080-567a8a9bdd86',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:21 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bcb8c129-b406-4e17-9ffa-098a4b81a7a6',
  'x-ms-request-id',
  '5f1e99c2-141e-43d4-941b-d8296dba06b2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:23 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9130cd6d-1cf0-4a14-9667-fcb9b8fc89cb',
  'x-ms-request-id',
  'cd7ffe6e-22f1-4eb4-b5c9-25b456376af2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:26 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7bb736e1-157f-482b-b26a-eef463cbf67b',
  'x-ms-request-id',
  '5eafacaa-28ff-4926-83e0-808ab8fbc81d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:27 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a742e0c0-3a3e-42e7-8c63-4fca143202dd',
  'x-ms-request-id',
  '6ac9e230-ffb3-413a-ae3b-8b938af958f0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:30 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'edbfe679-8788-4fe8-9099-ca5735c4e936',
  'x-ms-request-id',
  'cd6ced7f-3d21-457c-ac84-9282eb290f03',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:32 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4df64aa2-669f-4c82-a99f-4fab2084cdf2',
  'x-ms-request-id',
  '8d8fca9e-edb9-4c9e-b82b-f558385ab7c1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:33 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '06b878a8-dfba-4dc8-9747-151f10449101',
  'x-ms-request-id',
  'd86ce12a-e858-4053-9df7-8c6045366192',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:35 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd402f165-6d39-4295-bc68-1a34772c11ea',
  'x-ms-request-id',
  '596edd9d-764f-4fa0-bef1-0f3ea4deb1e8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:37 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'dc7bc694-d2fb-43af-9b6a-2f448e03530b',
  'x-ms-request-id',
  '0f1bdac0-78d8-4772-882d-eeb75e868367',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:40 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '127fb198-b763-4b5d-be8d-5e8677d14875',
  'x-ms-request-id',
  'd418a48c-c817-4314-8be6-a5c9c41a65f3',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:42 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '87b0b8c2-1758-4f2b-9f55-e869999b7b92',
  'x-ms-request-id',
  'f7c2ee83-591a-49e5-959b-638b0eaa23a4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:44 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '83ffdd05-61f5-470a-aec7-e5a09b352498',
  'x-ms-request-id',
  'd609b637-a221-4d65-b688-a83aa95bacb4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:47 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5229d360-8205-4462-bcdd-ae9fbb92a301',
  'x-ms-request-id',
  'f0bfb7c9-2351-47e3-91e9-e4e6b7b6c949',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:48 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8b94ec17-ccfc-458e-aa45-afa80ba075cc',
  'x-ms-request-id',
  '2a498593-9491-446e-a869-ca80cf4b7b92',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:50 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b004578b-f0f6-4fc9-adf7-d7147ce56e1a',
  'x-ms-request-id',
  'e75db3e4-e4b9-4067-abbd-951588627836',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:53 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '75566dd7-9f44-4939-9022-9fb530489453',
  'x-ms-request-id',
  'b14892ab-2db0-4b9f-bc62-ca03940fb72f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:55 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '03305350-55c8-4164-bf53-b38b43cb6420',
  'x-ms-request-id',
  '8cda1de2-d3d0-403a-92e7-8f8487dc53fa',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:57 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a5bb3a62-c1db-4574-8ca1-77fb16454473',
  'x-ms-request-id',
  '00762cb9-aa7a-47f4-94c5-48ca87e96061',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:59 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '83eeef17-4cab-4593-97b6-85d13a7c86d3',
  'x-ms-request-id',
  'bb8ac2d1-ff4c-4009-84ea-e9ab3cadb080',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:01 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0f51f3ca-abf4-4924-b285-82787c5b9c1b',
  'x-ms-request-id',
  '49999723-2469-41a2-afbb-070cea53fe5d',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:03 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7d2f3920-171d-4db1-bdbe-70254bcebcb0',
  'x-ms-request-id',
  'dfc67aac-27e6-4258-94af-819f48f46574',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:05 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '21cb8e9c-dfba-4645-8b67-12c13559da7c',
  'x-ms-request-id',
  'aa6229e0-28f7-4525-8a41-28c523fdeded',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:07 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '99acf956-e460-416a-8b92-dd646dc0fd3f',
  'x-ms-request-id',
  'd3e5b29c-57da-4c4f-ac7c-956cee600912',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:09 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '81ae0098-cf1b-4716-839d-c0378deea008',
  'x-ms-request-id',
  '4207473a-0cae-4d30-93b7-1952adeeac02',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:11 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqK94gYhFBX1DkuqKFlt3m94Sarq7GmlwGJnUTSMcVlfFa+fLTX42miw9vBCZkLOp6wY2TniETk53oVM1k3Hmf43uoJTbf7FROJyEaEUIXmI5n1sA0BYlTWOaOStTYzso/rNykKNzdnnxEzAudS51J10WS/IuCkBtvyAv4lAc0KDIG+Ahsa5eCovGw6xS/eHyvJynXXgDKbxCZlqq0NxkDAtQiDNKSt6X/guQs1DMFOsBPgjSfmxTAbPCDYlRDtMGikxZlkHrA7R0l3eZXX7L6yZOxHmdN29ifVoGFT1b/a6x0NzjCuIU43m4p2mVc14+ryuix28xcMOcZ4VtEhheFQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKdUlsKZJCdNbMcAn0mXE8YYjRzZh3aUU55pSzHBjhlTA3MmXDL/Ay6vaqXIwEg0GxlsbHvwYC6u091gk4BcUL/d1gazAXiFB2PtpOVBgkKDOL66mPDYVzAYQgJGWB3fhn1tUEqgxGy8ouiDXGHrSsP4BdUwhxYJqR2bb6S0DGxnftvh0t2zeEg7lu0wOl4pat9Z8Zgs2qi1+q8Ysaqsb53lcSj8GQ6Wg932UMjrRmky5Ctp7nDEjXGESbVwr5k4k+SMgsna5pDqGjoBIckPyA6toEI1oWTe9gTtdPEzadMvw5lM7UpiVS0U9O+gIbUoeTzmANqqCEXmaCWdTlL+wgc=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-","request_id":"fe01b1ce44c64803b375c029d6442607"}, [
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
  'b4fa2695-de24-44d3-a852-e51a6b2b829e',
  'x-ms-request-id',
  'ec920b6f-f37e-45af-91bf-942beac4c72a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:14 GMT',
  'Content-Length',
  '1317'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","x5t":"addWavrM0tKYmhKO9bVV6OdBBio","cer":"MIIDKDCCAhCgAwIBAgIQJxhf+x6jTi+zisTQGTbmZjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NTEyWhcNMjIwNDI4MjEwNTEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCor3iBiEUFfUOS6ooWW3eb3hJqursaaXAYmdRNIxxWV8Vr58tNfjaaLD28EJmQs6nrBjZOeIROTnehUzWTceZ/je6glNt/sVE4nIRoRQheYjmfWwDQFiVNY5o5K1NjOyj+s3KQo3N2efETMC51LnUnXRZL8i4KQG2/IC/iUBzQoMgb4CGxrl4Ki8bDrFL94fK8nKddeAMpvEJmWqrQ3GQMC1CIM0pK3pf+C5CzUMwU6wE+CNJ+bFMBs8INiVEO0waKTFmWQesDtHSXd5ldfsvrJk7EeZ03b2J9WgYVPVv9rrHQ3OMK4hTjebinaZVzXj6vK6LHbzFww5xnhW0SGF4VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRglzvWPxuQl5FBmRGzVR1xXRn/VjAdBgNVHQ4EFgQUYJc71j8bkJeRQZkRs1UdcV0Z/1YwDQYJKoZIhvcNAQELBQADggEBAIM1CW+za6aXZcO1vn7DtJr0k42TQKPu8hj42QuYwjT+02J7pNF43O5sm7Ngm8hUrpZhHBw4f+vc6atqjPw0VBGf8mQbTXwTNqzVRBxTOR7fg/VXm9BD0KjrQ0FoZa7gKzB197ajm9j97J0w/+uwMTN+ckyuOi7Xram6GUjrckaEM+wAslPgHEQH6jlZxtPXsXwR5sMyChEeyz6isQ7CiRHLXPutbSdW4nA8hgg85Jjsw3hy8M8l1kE8LNiLGR7zMFeD9BD/Zm7OiUDoim0dXAYaIv/IxWV9GRGcOXggRfs+XU+YK/HMJ5qxTCQ4iW/5s4uRrP2GzcX6RcBbH1lq8P8=","attributes":{"enabled":true,"nbf":1619643312,"exp":1651179912,"created":1619643912,"updated":1619643912,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643836,"updated":1619643836}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '2b0f1a8f-a3e0-47a8-ad5d-0cdb626c9c99',
  'x-ms-request-id',
  'c8158b7c-a2ea-4a5e-81aa-edcb0dd58f61',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:13 GMT',
  'Content-Length',
  '2615'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1619643914,"scheduledPurgeDate":1627419914,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","x5t":"addWavrM0tKYmhKO9bVV6OdBBio","cer":"MIIDKDCCAhCgAwIBAgIQJxhf+x6jTi+zisTQGTbmZjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NTEyWhcNMjIwNDI4MjEwNTEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCor3iBiEUFfUOS6ooWW3eb3hJqursaaXAYmdRNIxxWV8Vr58tNfjaaLD28EJmQs6nrBjZOeIROTnehUzWTceZ/je6glNt/sVE4nIRoRQheYjmfWwDQFiVNY5o5K1NjOyj+s3KQo3N2efETMC51LnUnXRZL8i4KQG2/IC/iUBzQoMgb4CGxrl4Ki8bDrFL94fK8nKddeAMpvEJmWqrQ3GQMC1CIM0pK3pf+C5CzUMwU6wE+CNJ+bFMBs8INiVEO0waKTFmWQesDtHSXd5ldfsvrJk7EeZ03b2J9WgYVPVv9rrHQ3OMK4hTjebinaZVzXj6vK6LHbzFww5xnhW0SGF4VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRglzvWPxuQl5FBmRGzVR1xXRn/VjAdBgNVHQ4EFgQUYJc71j8bkJeRQZkRs1UdcV0Z/1YwDQYJKoZIhvcNAQELBQADggEBAIM1CW+za6aXZcO1vn7DtJr0k42TQKPu8hj42QuYwjT+02J7pNF43O5sm7Ngm8hUrpZhHBw4f+vc6atqjPw0VBGf8mQbTXwTNqzVRBxTOR7fg/VXm9BD0KjrQ0FoZa7gKzB197ajm9j97J0w/+uwMTN+ckyuOi7Xram6GUjrckaEM+wAslPgHEQH6jlZxtPXsXwR5sMyChEeyz6isQ7CiRHLXPutbSdW4nA8hgg85Jjsw3hy8M8l1kE8LNiLGR7zMFeD9BD/Zm7OiUDoim0dXAYaIv/IxWV9GRGcOXggRfs+XU+YK/HMJ5qxTCQ4iW/5s4uRrP2GzcX6RcBbH1lq8P8=","attributes":{"enabled":true,"nbf":1619643312,"exp":1651179912,"created":1619643912,"updated":1619643912,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643836,"updated":1619643836}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '98c73b88-e89a-4e91-badb-b7092139c601',
  'x-ms-request-id',
  '8f60b584-185b-468b-8330-bfb3901e0e39',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:14 GMT',
  'Content-Length',
  '2820'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'cbc0df4b-0f4f-4952-9973-61761f922d94',
  'x-ms-request-id',
  '4c7a42c1-6ba1-40cd-ba23-a1899735aa15',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd9682904-a52f-42d9-a0b3-69c8d565519b',
  'x-ms-request-id',
  'e24cdf98-2ae9-4b38-a2e7-d81f23b26958',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '326f8f26-a5c9-418e-a767-adbd0c729ba7',
  'x-ms-request-id',
  'ffcf3c97-080e-42cd-b49b-8b2a3343e27e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3ceccf19-965c-45c1-85c8-5b5e607967d5',
  'x-ms-request-id',
  '7bc7991f-f742-4c94-8a42-f4882d4059dc',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '454e29e5-b472-4a15-970b-1013085a3477',
  'x-ms-request-id',
  '039dcff5-1b56-475d-9d65-968375491df1',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a911008c-60c7-45eb-abd7-7cad3b71b83b',
  'x-ms-request-id',
  '67f51371-be99-4b94-9c48-cf6190e1a4c6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ab46153e-5012-4763-bcf7-b01bca8a4187',
  'x-ms-request-id',
  '6ddf3f61-406c-4adc-985e-272bf50ebfe9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bcde82d6-15d1-49dc-b435-ea5a1ba96a2c',
  'x-ms-request-id',
  'df899146-b918-43d2-bedf-8643e482c424',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'aaefe762-00c7-4311-9ec8-45d9aa5a488b',
  'x-ms-request-id',
  '31f714f7-8eb7-4c4d-84ea-eeddb9862ad9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '84da34dc-7895-4ee5-ae34-da4bd98c7123',
  'x-ms-request-id',
  '3a963240-d868-4022-bc31-59b3f8b806ef',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '64fcb3d1-3c80-457d-a3e5-76da3b666b8c',
  'x-ms-request-id',
  'bb4a3d9f-e9bc-4200-b83e-2ff26d8811e8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b6a58ab1-c860-49d6-bdc9-7cd4ca1d38b6',
  'x-ms-request-id',
  '1f28225f-3700-4767-8331-718fc362d3f2',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6f03426b-f77e-412e-8fbc-b321fb16660c',
  'x-ms-request-id',
  '31512593-87a7-4362-b008-fae2faa8d6b4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'f64776eb-936b-473f-a6f4-7b07ed381027',
  'x-ms-request-id',
  'dc4b35d1-5373-41c9-b301-f11df5044f35',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '13b8619a-9baa-447e-8727-9cde28e9e109',
  'x-ms-request-id',
  'e968c506-45bd-4fa6-a622-44ed9e93fa31',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '7dc4ec29-8fe5-4537-a197-c1a75a12de20',
  'x-ms-request-id',
  'ba42cab3-79c8-452b-afcf-c520ac081015',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6ea544f7-86b1-4d2b-b284-fe5d3e20a2c9',
  'x-ms-request-id',
  '07169bc1-3758-40f7-b753-830a59a7457c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9bb24454-6824-4391-8f35-0d5b080d8857',
  'x-ms-request-id',
  'b3198a68-59e5-4701-bcc3-cda9cafae961',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5942305c-627e-4551-9ec4-c7716d4cec13',
  'x-ms-request-id',
  'a5eb2b5c-9f28-465e-b485-88e2700d7c4c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'd284a1c3-e5c9-445e-9747-198735fce337',
  'x-ms-request-id',
  'a9ef4040-0492-496c-a4eb-aabd8f003d3a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3b58afd9-81ff-40cf-8056-1e55f8d5a1e7',
  'x-ms-request-id',
  '0f77fdf3-a582-4c39-b7d8-bf4aa1315b44',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8a8c2731-3f35-4126-b093-b30c93f33085',
  'x-ms-request-id',
  '3a743361-e935-4c7a-9407-e36c58f38339',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '3728e14b-8d8f-4026-b89a-f1ef1f20b7f8',
  'x-ms-request-id',
  'af0eb7ed-6685-4a28-8d96-bac893cb553e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b5151036-aa8b-4e58-baef-4d3419f18e22',
  'x-ms-request-id',
  '13029b66-4764-4cd5-9e93-9e98bfa98990',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0ad1ee22-836a-479a-93bd-018cba76d4c1',
  'x-ms-request-id',
  '5e27e215-b4d2-4436-a9ef-53bf332708a7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '343351ac-1379-4f0b-854c-b9bd94fa740d',
  'x-ms-request-id',
  'e9ff3c1d-d2e5-4f34-84f3-9cfe5333eada',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1619643914,"scheduledPurgeDate":1627419914,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","x5t":"addWavrM0tKYmhKO9bVV6OdBBio","cer":"MIIDKDCCAhCgAwIBAgIQJxhf+x6jTi+zisTQGTbmZjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NTEyWhcNMjIwNDI4MjEwNTEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCor3iBiEUFfUOS6ooWW3eb3hJqursaaXAYmdRNIxxWV8Vr58tNfjaaLD28EJmQs6nrBjZOeIROTnehUzWTceZ/je6glNt/sVE4nIRoRQheYjmfWwDQFiVNY5o5K1NjOyj+s3KQo3N2efETMC51LnUnXRZL8i4KQG2/IC/iUBzQoMgb4CGxrl4Ki8bDrFL94fK8nKddeAMpvEJmWqrQ3GQMC1CIM0pK3pf+C5CzUMwU6wE+CNJ+bFMBs8INiVEO0waKTFmWQesDtHSXd5ldfsvrJk7EeZ03b2J9WgYVPVv9rrHQ3OMK4hTjebinaZVzXj6vK6LHbzFww5xnhW0SGF4VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRglzvWPxuQl5FBmRGzVR1xXRn/VjAdBgNVHQ4EFgQUYJc71j8bkJeRQZkRs1UdcV0Z/1YwDQYJKoZIhvcNAQELBQADggEBAIM1CW+za6aXZcO1vn7DtJr0k42TQKPu8hj42QuYwjT+02J7pNF43O5sm7Ngm8hUrpZhHBw4f+vc6atqjPw0VBGf8mQbTXwTNqzVRBxTOR7fg/VXm9BD0KjrQ0FoZa7gKzB197ajm9j97J0w/+uwMTN+ckyuOi7Xram6GUjrckaEM+wAslPgHEQH6jlZxtPXsXwR5sMyChEeyz6isQ7CiRHLXPutbSdW4nA8hgg85Jjsw3hy8M8l1kE8LNiLGR7zMFeD9BD/Zm7OiUDoim0dXAYaIv/IxWV9GRGcOXggRfs+XU+YK/HMJ5qxTCQ4iW/5s4uRrP2GzcX6RcBbH1lq8P8=","attributes":{"enabled":true,"nbf":1619643312,"exp":1651179912,"created":1619643912,"updated":1619643912,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643836,"updated":1619643836}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '7332c914-51e0-4817-8ae3-aca795596f39',
  'x-ms-request-id',
  '3fdf593e-ac2d-4d8f-ab40-0e0973b157a4',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:02 GMT',
  'Content-Length',
  '2820'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1619643914,"scheduledPurgeDate":1627419914,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/200198a07bc2487db72d3b6c812508f3","x5t":"addWavrM0tKYmhKO9bVV6OdBBio","cer":"MIIDKDCCAhCgAwIBAgIQJxhf+x6jTi+zisTQGTbmZjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjA1NTEyWhcNMjIwNDI4MjEwNTEyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCor3iBiEUFfUOS6ooWW3eb3hJqursaaXAYmdRNIxxWV8Vr58tNfjaaLD28EJmQs6nrBjZOeIROTnehUzWTceZ/je6glNt/sVE4nIRoRQheYjmfWwDQFiVNY5o5K1NjOyj+s3KQo3N2efETMC51LnUnXRZL8i4KQG2/IC/iUBzQoMgb4CGxrl4Ki8bDrFL94fK8nKddeAMpvEJmWqrQ3GQMC1CIM0pK3pf+C5CzUMwU6wE+CNJ+bFMBs8INiVEO0waKTFmWQesDtHSXd5ldfsvrJk7EeZ03b2J9WgYVPVv9rrHQ3OMK4hTjebinaZVzXj6vK6LHbzFww5xnhW0SGF4VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRglzvWPxuQl5FBmRGzVR1xXRn/VjAdBgNVHQ4EFgQUYJc71j8bkJeRQZkRs1UdcV0Z/1YwDQYJKoZIhvcNAQELBQADggEBAIM1CW+za6aXZcO1vn7DtJr0k42TQKPu8hj42QuYwjT+02J7pNF43O5sm7Ngm8hUrpZhHBw4f+vc6atqjPw0VBGf8mQbTXwTNqzVRBxTOR7fg/VXm9BD0KjrQ0FoZa7gKzB197ajm9j97J0w/+uwMTN+ckyuOi7Xram6GUjrckaEM+wAslPgHEQH6jlZxtPXsXwR5sMyChEeyz6isQ7CiRHLXPutbSdW4nA8hgg85Jjsw3hy8M8l1kE8LNiLGR7zMFeD9BD/Zm7OiUDoim0dXAYaIv/IxWV9GRGcOXggRfs+XU+YK/HMJ5qxTCQ4iW/5s4uRrP2GzcX6RcBbH1lq8P8=","attributes":{"enabled":true,"nbf":1619643312,"exp":1651179912,"created":1619643912,"updated":1619643912,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619643836,"updated":1619643836}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '46faad2e-c189-417b-958d-4c85a0a71f8c',
  'x-ms-request-id',
  '5484388e-91bf-4a59-8f4b-0abc31e19dc8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:02 GMT',
  'Content-Length',
  '2820'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
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
  '8a94a3f2-30a6-4ab3-b0d7-286acef89af2',
  'x-ms-request-id',
  '1c126a0b-f605-4e68-9398-97dc5b5a189a',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=IP_ADDRESS;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:06:03 GMT'
]);
