let nock = require('nock');

module.exports.hash = "3e0943c3aeaacaa674176ccf126edc59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-0/create')
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
  '680d3c87-e26e-45d5-bd4b-cc4f50a4a559',
  'x-ms-request-id',
  'b932e838-8834-47c9-8553-f5b83889e922',
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
  'Wed, 28 Apr 2021 20:40:41 GMT'
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
  '1f9398a4-7d83-436b-9d83-189c3bddfd00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbBQAAAAS-G9gOAAAA; expires=Fri, 28-May-2021 20:40:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrkoTevOXGgyKVkuzIdx3jHPMhGGdWvjRUQwxPYGAd6NKAZj0NTfsPA_le6_EaZrkFlyymqqZAmaUBqena3u1QE9UIATna5szCxV5IgC7Bv_R1xaX5Spq5ntVDz1FQIzWWdHntDjLQBsfBPbFDz1xzIEAKIG4njYm14qDZwRML_wkgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:40:42 GMT'
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
  '3a368e80-19a1-4207-a8bd-87493ac21101',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbBQAAAAS-G9gOAAAA; expires=Fri, 28-May-2021 20:40:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrhcHLSc8PxF0-abfK7aDROVaVXKQEhvSoN_U6i_400L9KvBO5GWE7kd52u7fR-y9TYC3ydY99kDZl_sjceDvQsxCoOvy3nOqEeL1FdtnGFjjW_atKftR2nO7YXU2rbbfSHlEV5zayVpTWAAzCYwLmsc-vVHnweeVAFbx-OtMJzlcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:40:42 GMT',
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
  'd2785768-1c4c-48e9-8a11-9f2abc6aed00',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApDQRp_1bOJGvyZBmEPP0xDmR1YbAQAAADC_G9gOAAAA; expires=Fri, 28-May-2021 20:40:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:40:42 GMT',
  'Content-Length',
  '1313'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending?api-version=7.2&request_id=9aa0bc18fab246f3a9189aa4bca1dc2f',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '680d3c87-e26e-45d5-bd4b-cc4f50a4a559',
  'x-ms-request-id',
  '3aec91b2-7d7e-47b5-bba8-6116d62f3e77',
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
  'Wed, 28 Apr 2021 20:40:42 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '6c8f66fe-659a-42de-bf7f-f4f5b60fb304',
  'x-ms-request-id',
  '4699b65b-9e6d-4fee-afc6-b135ce06e00c',
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
  'Wed, 28 Apr 2021 20:40:42 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '9826aa55-f7e0-4282-b6e6-a4a7efa905b0',
  'x-ms-request-id',
  '2d79e8dc-15f0-418b-b5ee-dc4c6d9ea725',
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
  'Wed, 28 Apr 2021 20:40:43 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '0506976e-b718-4a2c-8e25-3d52fc235ea8',
  'x-ms-request-id',
  '8e17d174-b646-4049-a2f7-a96bc17da977',
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
  'Wed, 28 Apr 2021 20:40:45 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  'd1ac5378-332f-48c4-8f43-4d0ca3ddc9dc',
  'x-ms-request-id',
  'cd7ea9b3-1537-4654-9062-f393f641d420',
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
  'Wed, 28 Apr 2021 20:40:47 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '660ab123-babe-48d3-99de-d08bb1e0b7e0',
  'x-ms-request-id',
  '96a96d56-2450-4c06-a499-9636e9f46327',
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
  'Wed, 28 Apr 2021 20:40:49 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '37d89184-f0be-4cfc-8d01-47b926fda65d',
  'x-ms-request-id',
  'ed39edcc-717d-4c4b-a268-c236a615c813',
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
  'Wed, 28 Apr 2021 20:40:52 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  'f5397574-2c10-4f63-8ca9-091576ed2693',
  'x-ms-request-id',
  '42f03895-50d0-431c-a3fb-f76382fd95e2',
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
  'Wed, 28 Apr 2021 20:40:54 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '3a65bd01-473d-411f-9582-56730764e5e8',
  'x-ms-request-id',
  '1095c6a2-e304-4062-9672-b3623b9b4e97',
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
  'Wed, 28 Apr 2021 20:40:56 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '13d0e846-333d-4e77-89dc-12c3c1cf7241',
  'x-ms-request-id',
  '92c41940-ff86-4abb-a9bc-932b6c8bb31a',
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
  'Wed, 28 Apr 2021 20:40:58 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  'ad60f65c-f9ff-4b20-a615-d9bb86765b78',
  'x-ms-request-id',
  'f9a17ebb-20bb-4ed7-bc0f-9bacba3a5e9f',
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
  'Wed, 28 Apr 2021 20:41:00 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '18fd9fd5-de99-443f-9f88-a8d5113e2a47',
  'x-ms-request-id',
  '530dee07-dd18-4671-87a4-5d06e19885b3',
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
  'Wed, 28 Apr 2021 20:41:02 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '5ebb9229-757c-4730-b14c-3f4cb18eec5e',
  'x-ms-request-id',
  '15fd5d3f-e3b1-461e-af89-58e4dfe06c01',
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
  'Wed, 28 Apr 2021 20:41:04 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '370803d3-45f8-4be9-97a0-d96b8ade6ecf',
  'x-ms-request-id',
  'b8cc7e8c-c76b-4a8f-93c3-4ebc75c03854',
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
  'Wed, 28 Apr 2021 20:41:06 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  'f0a54851-9f9b-4bcb-a8f8-4b29da4bd540',
  'x-ms-request-id',
  'cc8f0bbd-a337-4486-899d-53ce66c6399e',
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
  'Wed, 28 Apr 2021 20:41:08 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '702c2667-8cf4-4ede-b6ae-8c43b21a5456',
  'x-ms-request-id',
  'c2283b6e-b8ee-45f1-9161-b17d8066d467',
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
  'Wed, 28 Apr 2021 20:41:11 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  'ba884951-58a0-4391-a08e-076d31160bc8',
  'x-ms-request-id',
  '53e1ac78-edc8-4749-8ffb-6969d7a07721',
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
  'Wed, 28 Apr 2021 20:41:13 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '46974072-1137-4b50-98bb-aeef38390af8',
  'x-ms-request-id',
  'b1800a9b-8381-4b0d-ad15-70736e1a973e',
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
  'Wed, 28 Apr 2021 20:41:15 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  '7f79049a-c1b5-44e8-9461-f272795ca380',
  'x-ms-request-id',
  '9199f4c2-4fbe-4db7-915e-519040798b91',
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
  'Wed, 28 Apr 2021 20:41:17 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqgpzec/ukBrzJ1m3j1+gZRqvYRzpC5/Fg7y6mDneYXU9VPfd9XjuLUGPxTlsgvvo0+4/nafpnoXzidXdu5cKRFIIR+cKlMDI3cMzswjcfdUF8HieQ3c53Dq1L3834SZxdrKV4N2YW43uZVL3A6XYAsywEt+XqLt0Wjjeijy1YxAKrb3M9nvcFG/pID+ZTNJqUQWfkl4BOyWXD2LnxbhEd5JLPWrAcrpwCwyShMTM4bwmRtz3NP3OmI1c7vc/eXuNNRYrXrLY7xHMoQC4dbCt5lTi9PHO5QHEFRRwQietaPKuxVi3/HG5Rhh02O7C6i+9DTC1rcVc/mJhEuZs8rLd3QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAACMxH0mL9tewWIMFyHsMagmfaeyFVy0MNc1l+tILwvUS4dyEV58Phxk9FT7u0XFOQNtLWYSgJJIoxHNtRobxKT8tcgJBlb78nCoa5GXj8uqfipT+ug4LVCIUmUhTkLAdHJGG5baHgMo6xBZNDkJPEJi69EptJsVQTEoDQJlpYCTtITIx7bmAQvTmaCNL6eJuCpS4jriMwZkrZw/ksl1As474C6x6lxNfkpkNt+jU/mXu4gTcmHwWhfNpWkb0hHUFg12AI9lLhKoEA6TgDChk+aNPQ9FzB6HfLRif8auwTVMq9mSoj3JAOwxZaQBeqQVKB4Oy800VH90BmB73X0CwXI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0","request_id":"9aa0bc18fab246f3a9189aa4bca1dc2f"}, [
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
  'b6f3f001-12ec-42fa-86c5-1cd012e86948',
  'x-ms-request-id',
  'afab5a61-fd11-4204-b173-151f29a398d7',
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
  'Wed, 28 Apr 2021 20:41:19 GMT',
  'Content-Length',
  '1295'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","x5t":"Y8fffoAuCodHQHABYGfa41qERPk","cer":"MIIDKDCCAhCgAwIBAgIQbX7BCNcoS+Wc+yqMfDCNRzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzMTE3WhcNMjIwNDI4MjA0MTE3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqCnN5z+6QGvMnWbePX6BlGq9hHOkLn8WDvLqYOd5hdT1U9931eO4tQY/FOWyC++jT7j+dp+mehfOJ1d27lwpEUghH5wqUwMjdwzOzCNx91QXweJ5DdzncOrUvfzfhJnF2spXg3Zhbje5lUvcDpdgCzLAS35eou3RaON6KPLVjEAqtvcz2e9wUb+kgP5lM0mpRBZ+SXgE7JZcPYufFuER3kks9asByunALDJKExMzhvCZG3Pc0/c6YjVzu9z95e401FitestjvEcyhALh1sK3mVOL08c7lAcQVFHBCJ61o8q7FWLf8cblGGHTY7sLqL70NMLWtxVz+YmES5mzyst3dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSm2PQRsFB8Wj8+ny3YYROdMS6acjAdBgNVHQ4EFgQUptj0EbBQfFo/Pp8t2GETnTEumnIwDQYJKoZIhvcNAQELBQADggEBAGzE2wXctBxSzkGBXwAJ0vqxIgqGqL7w6WPcKxykLvoJ+yPvkGCeAJmOSzNDVcq2Xaig5WhXTPxWxCd4SLLnHSo3PV8G1WN9GugicZECA1dvQiBSg32OL4t94XPZQff1IYXtnZBXzbVhfcP2Yz557d7iLWvgYl6ziZ+KAmdF9YBzmOCSLn8oD0iHzSM/Yr6cXI/6n88yerWbRrxXuJWZVp5z9hEE3Ypen4EsUd3yCIGw5Vc4roae065Dpk/11mdQ42VUhrYfpoyedOHqH9W14C677eDZ5RAh7KQaWOt5IxzXNOLGVrZXSS6lQg7qQte3WEjaR9+nI0op7GZGT5U+WA4=","attributes":{"enabled":true,"nbf":1619641877,"exp":1651178477,"created":1619642478,"updated":1619642478,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642443,"updated":1619642443}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  '46a7014f-cb56-4a20-9b25-e20db9c0dbd9',
  'x-ms-request-id',
  '37df7562-0ba3-445e-9454-d4ee482fd646',
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
  'Wed, 28 Apr 2021 20:41:19 GMT',
  'Content-Length',
  '2560'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificates-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending?api-version=7.2&request_id=a8f3d9c241474b75ad57e7f1882b56dd',
  'Retry-After',
  '0',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '390de814-8975-4fda-962d-0503ff908903',
  'x-ms-request-id',
  '3f1231b2-6cf1-4846-8db1-d086952f383b',
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
  'Wed, 28 Apr 2021 20:41:19 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '36032f2a-84a4-4c55-a979-7aca70aada5e',
  'x-ms-request-id',
  '1a8178c4-079b-49bd-ba84-9d9091b2cec7',
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
  'Wed, 28 Apr 2021 20:41:19 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '8a8e6658-f83c-443d-a07a-76eb1c8d1672',
  'x-ms-request-id',
  'f208316f-2c85-42fc-8b12-138bfb1a4183',
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
  'Wed, 28 Apr 2021 20:41:20 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  'bd4aedc0-890a-433a-8bb7-e38205c0ede9',
  'x-ms-request-id',
  'd063adae-d549-4e4b-8a5f-a9ccd0d75e66',
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
  'Wed, 28 Apr 2021 20:41:21 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '7446eaa8-ec01-4f74-9aea-b897cb2a9679',
  'x-ms-request-id',
  'c9123d21-c420-4835-9725-bff6807bfa5a',
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
  'Wed, 28 Apr 2021 20:41:24 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '25f46a59-917b-44e7-8a93-ee807919f090',
  'x-ms-request-id',
  'e0cb811e-0715-4185-b10d-06dc9206e70d',
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
  'Wed, 28 Apr 2021 20:41:26 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '7fd15c9a-c9fd-4456-8bd2-9c67dd98fae4',
  'x-ms-request-id',
  '427a3a37-08d0-43aa-b05b-6fe08648d5a8',
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
  'Wed, 28 Apr 2021 20:41:28 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '4708abf5-421f-41f2-9738-e961d43a7578',
  'x-ms-request-id',
  '991d79a4-eef7-460b-908c-3fddbe725cf3',
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
  'Wed, 28 Apr 2021 20:41:30 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '215155ea-67a4-41cf-b023-d5e731bb3d94',
  'x-ms-request-id',
  'c45c158c-92ac-4add-9454-16add2a19aaf',
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
  'Wed, 28 Apr 2021 20:41:32 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '501ab526-736d-47f7-bb92-074cf6c277a5',
  'x-ms-request-id',
  'a574c721-ea88-46fe-bb2d-7fd53d559e71',
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
  'Wed, 28 Apr 2021 20:41:34 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '8926401c-3446-451f-87e0-8b9c12a88982',
  'x-ms-request-id',
  '145b8f42-668f-4f79-a57a-bb70ee8d3654',
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
  'Wed, 28 Apr 2021 20:41:37 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '89b0d67b-5042-4e7f-8086-60d7a3e55e41',
  'x-ms-request-id',
  'd95dc5bc-594a-4095-83f2-d0d554c808ba',
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
  'Wed, 28 Apr 2021 20:41:39 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  'bafc15e7-aeb2-4e0d-8ba9-936e6f458012',
  'x-ms-request-id',
  '87d0c7da-2f53-4d6a-b9eb-26b1e270b1a6',
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
  'Wed, 28 Apr 2021 20:41:41 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '8dcc0e93-5c0c-4e91-873d-2a352b3371d2',
  'x-ms-request-id',
  'c37cfb25-da38-4ac3-bf7a-c2815264957e',
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
  'Wed, 28 Apr 2021 20:41:43 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  'd46a8043-277e-4cd9-b382-c7efd7bd0696',
  'x-ms-request-id',
  '7fad0bce-2934-4405-a3f3-498db3202ff0',
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
  'Wed, 28 Apr 2021 20:41:45 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  'd0c1b1c8-ba12-496a-a0e0-1d007956759e',
  'x-ms-request-id',
  '72c89695-a306-4b7a-8a67-384e79726eed',
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
  'Wed, 28 Apr 2021 20:41:47 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '38141ad9-63fc-46b7-aa97-1d67729d0909',
  'x-ms-request-id',
  'a770caa6-f9ab-4122-ad87-c422c0773d00',
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
  'Wed, 28 Apr 2021 20:41:49 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '06d53be3-2615-46e8-95db-5692747908c7',
  'x-ms-request-id',
  'fea21cc3-0a5e-4239-86ba-a4c736aeb894',
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
  'Wed, 28 Apr 2021 20:41:51 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  'f0e81fff-7696-4816-9792-f2608bc6d59d',
  'x-ms-request-id',
  '75b1a05b-4b8a-4e10-a12a-66fd73c1dd9e',
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
  'Wed, 28 Apr 2021 20:41:54 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '8d61d134-77ca-4db8-9857-bec7ce47445c',
  'x-ms-request-id',
  '5116f322-c631-4e17-ba05-e869bf2881d7',
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
  'Wed, 28 Apr 2021 20:41:56 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAugAY9N5v3MjyVx1yWp9hAcdU64ictUo2jNcs6dAxTL2cPr4ztAPz75bgh4ou2Y/HOUwexX3PBhWy5AITGPY4srElZmQDsJhITgP/3+Q/leDvFSSj5nNoh/8WHWdHUAaiixqgFEeH1I2ygPzqAmSkheuuNSvfi9+F/kybDVoEQvk3pz6xrsuCtceZiVDky7Vxjl/dP21+ft0AQR8Oda36tygpOnNjcLgqMnbX8MfqGvBDTqIcTS605sv3CqgBhgEwvi79JD/uzBwRgubFpHrjtB4wCvNGyoJTIWMuavGLSmLKOt0UbiqcX1/CEWJYS6x7NAsLxxh577ZihoCZe3BDsQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB95x+0CYj2BhvhLEb1cZZRXn09AeW63uSwv8bnxOmGhX86Y+RTbXedLsf4hX4yDgX+fINyMn/9o2ev9SpECV1/psphHXoLjDH8ZIzrRwfEdnckrqwbroLdNktOPtGxoAylkTd3M9g8jZ/aHBjRnBRrerspluGp6ie54VHvpt0R9Opp4Uo3ztZ/r+of/uhsiuWZhmQ6Vvm0swQbXVHgTq1PSoNe+vpiKxIjxMLxDbpBcbyjdQ3lKcOCEEvcyDoer2Q0+APHj256zx7X6OpEzs8jdyk3LyTNZ1NqVL7BK1vhPuMhyXFe0zBUwFtJ3qPkY6/DEurEo8jem0SyjPT52wTA=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1","request_id":"a8f3d9c241474b75ad57e7f1882b56dd"}, [
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
  '7a6b7426-512f-4589-8890-e32e47af1794',
  'x-ms-request-id',
  'c56fb454-8d5d-4f11-b8da-bce78c683dd1',
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
  'Wed, 28 Apr 2021 20:41:58 GMT',
  'Content-Length',
  '1295'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificates-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","x5t":"_BLFN70dQkmLFAIPuJWKUJB4qMs","cer":"MIIDKDCCAhCgAwIBAgIQBMHtUDb4QkOG5FQL6jwLtTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzMTU2WhcNMjIwNDI4MjA0MTU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6ABj03m/cyPJXHXJan2EBx1TriJy1SjaM1yzp0DFMvZw+vjO0A/PvluCHii7Zj8c5TB7Ffc8GFbLkAhMY9jiysSVmZAOwmEhOA//f5D+V4O8VJKPmc2iH/xYdZ0dQBqKLGqAUR4fUjbKA/OoCZKSF6641K9+L34X+TJsNWgRC+TenPrGuy4K1x5mJUOTLtXGOX90/bX5+3QBBHw51rfq3KCk6c2NwuCoydtfwx+oa8ENOohxNLrTmy/cKqAGGATC+Lv0kP+7MHBGC5sWkeuO0HjAK80bKglMhYy5q8YtKYso63RRuKpxfX8IRYlhLrHs0CwvHGHnvtmKGgJl7cEOxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRAGCoKXFwcWge9lBxfov3P1lE9mzAdBgNVHQ4EFgQUQBgqClxcHFoHvZQcX6L9z9ZRPZswDQYJKoZIhvcNAQELBQADggEBAGIGjjpIrmLVYhm4Y/VDbFc6xgMzyXX6rrLNUL9Z4vWxdVslnPpQ8daO2xnkvepoMoeNZV1Dxc5nmqW4/XkOCx3aa8L30wlmio4WlsT/ff/sbHxuaQZpv/KVs4OQSQ4zULC4GKiqpqaZT4Bq3FQiJ9yp2ucSDBhGU7IxdVhCcY/nkTafxxFwwJa3L1nEpfBFlzLowr6OLa0IoMG7J1hnJqBeMPwufHR8mySHZxMRzA+YDyjtIbT0nTlx+tnt8De7Jerdbxh6HNI2c5sGe25JgBy1QQuxnOJqWwR9LMKURp7FrlhWZaYcqY1g4DKNVSzHprMTO+Yw999dIz6eQFZ8W/M=","attributes":{"enabled":true,"nbf":1619641916,"exp":1651178516,"created":1619642516,"updated":1619642516,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642480,"updated":1619642480}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  'dd31fa52-13cd-4451-aef9-f5df257cf8ef',
  'x-ms-request-id',
  'faec5621-311a-4ce5-8a58-5dd185cf0c82',
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
  'Wed, 28 Apr 2021 20:41:58 GMT',
  'Content-Length',
  '2560'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0","x5t":"Y8fffoAuCodHQHABYGfa41qERPk","attributes":{"enabled":true,"nbf":1619641877,"exp":1651178477,"created":1619642478,"updated":1619642478},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1","x5t":"_BLFN70dQkmLFAIPuJWKUJB4qMs","attributes":{"enabled":true,"nbf":1619641916,"exp":1651178516,"created":1619642516,"updated":1619642516},"subject":""}],"nextLink":null}, [
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
  '577c4667-8917-4f50-9895-0ceaf1451d2c',
  'x-ms-request-id',
  '2c38cac2-8547-4c22-96ae-6e34e13b4894',
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
  'Wed, 28 Apr 2021 20:41:58 GMT',
  'Content-Length',
  '585'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-0","deletedDate":1619642518,"scheduledPurgeDate":1627418518,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","x5t":"Y8fffoAuCodHQHABYGfa41qERPk","cer":"MIIDKDCCAhCgAwIBAgIQbX7BCNcoS+Wc+yqMfDCNRzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzMTE3WhcNMjIwNDI4MjA0MTE3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqCnN5z+6QGvMnWbePX6BlGq9hHOkLn8WDvLqYOd5hdT1U9931eO4tQY/FOWyC++jT7j+dp+mehfOJ1d27lwpEUghH5wqUwMjdwzOzCNx91QXweJ5DdzncOrUvfzfhJnF2spXg3Zhbje5lUvcDpdgCzLAS35eou3RaON6KPLVjEAqtvcz2e9wUb+kgP5lM0mpRBZ+SXgE7JZcPYufFuER3kks9asByunALDJKExMzhvCZG3Pc0/c6YjVzu9z95e401FitestjvEcyhALh1sK3mVOL08c7lAcQVFHBCJ61o8q7FWLf8cblGGHTY7sLqL70NMLWtxVz+YmES5mzyst3dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSm2PQRsFB8Wj8+ny3YYROdMS6acjAdBgNVHQ4EFgQUptj0EbBQfFo/Pp8t2GETnTEumnIwDQYJKoZIhvcNAQELBQADggEBAGzE2wXctBxSzkGBXwAJ0vqxIgqGqL7w6WPcKxykLvoJ+yPvkGCeAJmOSzNDVcq2Xaig5WhXTPxWxCd4SLLnHSo3PV8G1WN9GugicZECA1dvQiBSg32OL4t94XPZQff1IYXtnZBXzbVhfcP2Yz557d7iLWvgYl6ziZ+KAmdF9YBzmOCSLn8oD0iHzSM/Yr6cXI/6n88yerWbRrxXuJWZVp5z9hEE3Ypen4EsUd3yCIGw5Vc4roae065Dpk/11mdQ42VUhrYfpoyedOHqH9W14C677eDZ5RAh7KQaWOt5IxzXNOLGVrZXSS6lQg7qQte3WEjaR9+nI0op7GZGT5U+WA4=","attributes":{"enabled":true,"nbf":1619641877,"exp":1651178477,"created":1619642478,"updated":1619642478,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642443,"updated":1619642443}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  'e0729282-2857-4acc-9ee3-742297131e24',
  'x-ms-request-id',
  '21628259-a2d8-4557-9be9-ca6ce11801ca',
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
  'Wed, 28 Apr 2021 20:41:58 GMT',
  'Content-Length',
  '2754'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'ee08d165-d005-4a13-92d5-6931348d3124',
  'x-ms-request-id',
  '22cc4539-e97e-4a58-9d16-29515f1cb363',
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
  'Wed, 28 Apr 2021 20:41:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'e4451408-1309-4b11-af94-121e24213859',
  'x-ms-request-id',
  '85384761-35ac-4772-aefd-77fbe85b1354',
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
  'Wed, 28 Apr 2021 20:41:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'c9e07d54-0b2f-466d-8285-a4e09da9ad49',
  'x-ms-request-id',
  '2c4f515b-8137-4306-bf57-1a75e5501901',
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
  'Wed, 28 Apr 2021 20:42:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '16d00a5c-d2c0-417b-88b6-d5447c210e29',
  'x-ms-request-id',
  'edcb6d28-e07e-4b23-a4b5-a9d24c99a227',
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
  'Wed, 28 Apr 2021 20:42:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '1052a5e8-b538-4277-9eff-f5723fe9c4c8',
  'x-ms-request-id',
  'c11c4b88-bb95-4c7e-b234-5df10259fa73',
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
  'Wed, 28 Apr 2021 20:42:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'b166f211-b32c-4216-b27f-52b5171bfe6c',
  'x-ms-request-id',
  'f93cb0d6-6117-4c8b-bb0d-400429b210d3',
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
  'Wed, 28 Apr 2021 20:42:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'a5689e6e-c003-48b1-abe4-2a1039a31831',
  'x-ms-request-id',
  '12dc5c99-5f47-46e3-b023-b469daeba0df',
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
  'Wed, 28 Apr 2021 20:42:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '3ecf6ca6-12cc-49db-8e7a-a834c158a9f5',
  'x-ms-request-id',
  '52a8a5ce-a60a-492e-bb1c-65a7eaac0d58',
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
  'Wed, 28 Apr 2021 20:42:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '8b3a96bb-0625-428f-90e8-d02f24823ccb',
  'x-ms-request-id',
  '8b6b318e-f02c-464a-b662-4bc17d0a937e',
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
  'Wed, 28 Apr 2021 20:42:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'd9931f2b-9d20-4239-89b0-18198d349726',
  'x-ms-request-id',
  'c407a7c6-a5f5-4094-afbe-2d779b296535',
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
  'Wed, 28 Apr 2021 20:42:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'a54b3f9e-bbeb-4514-ba04-27f207c9c935',
  'x-ms-request-id',
  'a8c3c89d-7f1c-4159-9e1b-f4b6f1f641e2',
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
  'Wed, 28 Apr 2021 20:42:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '4113b7bf-6203-45e8-8993-5ccbae18e2cb',
  'x-ms-request-id',
  '7922eda6-b0f7-4a2a-9bb1-dcedb2cf0ffa',
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
  'Wed, 28 Apr 2021 20:42:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  'a4389fe4-a1ca-42e5-856e-23ee574ae7d2',
  'x-ms-request-id',
  'b80dfb11-2473-4d4c-aa4c-e6a9824670a7',
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
  'Wed, 28 Apr 2021 20:42:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '24f42c9f-b6fd-4029-8991-29a2dc43212a',
  'x-ms-request-id',
  'f7b35dd9-076b-421d-ad64-d3102e3c0763',
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
  'Wed, 28 Apr 2021 20:42:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '8e905f97-161d-41d5-84c5-f603abcbecf4',
  'x-ms-request-id',
  'dbaefcea-88a9-4669-9b02-653e3f9fcb51',
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
  'Wed, 28 Apr 2021 20:42:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '15070376-ccf7-4ec8-ae6a-207a7e8b3dd0',
  'x-ms-request-id',
  '997e0c46-2026-4300-a47a-ee5804c25292',
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
  'Wed, 28 Apr 2021 20:42:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '454d1fc5-bfa1-4fdb-9ac6-1e37dfc230b4',
  'x-ms-request-id',
  '79305577-5831-499c-9c87-32a3ce375c77',
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
  'Wed, 28 Apr 2021 20:42:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-0"}}, [
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
  '65524efb-0ae1-4d6d-82ec-c288ce336733',
  'x-ms-request-id',
  'c3efdb5b-d0ed-4da0-93c8-8352cd9b85fd',
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
  'Wed, 28 Apr 2021 20:42:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-0","deletedDate":1619642518,"scheduledPurgeDate":1627418518,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-0/93db79423bb742ea848e365ac72dfc84","x5t":"Y8fffoAuCodHQHABYGfa41qERPk","cer":"MIIDKDCCAhCgAwIBAgIQbX7BCNcoS+Wc+yqMfDCNRzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzMTE3WhcNMjIwNDI4MjA0MTE3WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqCnN5z+6QGvMnWbePX6BlGq9hHOkLn8WDvLqYOd5hdT1U9931eO4tQY/FOWyC++jT7j+dp+mehfOJ1d27lwpEUghH5wqUwMjdwzOzCNx91QXweJ5DdzncOrUvfzfhJnF2spXg3Zhbje5lUvcDpdgCzLAS35eou3RaON6KPLVjEAqtvcz2e9wUb+kgP5lM0mpRBZ+SXgE7JZcPYufFuER3kks9asByunALDJKExMzhvCZG3Pc0/c6YjVzu9z95e401FitestjvEcyhALh1sK3mVOL08c7lAcQVFHBCJ61o8q7FWLf8cblGGHTY7sLqL70NMLWtxVz+YmES5mzyst3dAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSm2PQRsFB8Wj8+ny3YYROdMS6acjAdBgNVHQ4EFgQUptj0EbBQfFo/Pp8t2GETnTEumnIwDQYJKoZIhvcNAQELBQADggEBAGzE2wXctBxSzkGBXwAJ0vqxIgqGqL7w6WPcKxykLvoJ+yPvkGCeAJmOSzNDVcq2Xaig5WhXTPxWxCd4SLLnHSo3PV8G1WN9GugicZECA1dvQiBSg32OL4t94XPZQff1IYXtnZBXzbVhfcP2Yz557d7iLWvgYl6ziZ+KAmdF9YBzmOCSLn8oD0iHzSM/Yr6cXI/6n88yerWbRrxXuJWZVp5z9hEE3Ypen4EsUd3yCIGw5Vc4roae065Dpk/11mdQ42VUhrYfpoyedOHqH9W14C677eDZ5RAh7KQaWOt5IxzXNOLGVrZXSS6lQg7qQte3WEjaR9+nI0op7GZGT5U+WA4=","attributes":{"enabled":true,"nbf":1619641877,"exp":1651178477,"created":1619642478,"updated":1619642478,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642443,"updated":1619642443}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-0/pending"}}, [
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
  'e0f8a565-d786-4709-af2c-5cb9e46d0da2',
  'x-ms-request-id',
  'a9440f91-20ff-40ab-b534-33a7e63af1aa',
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
  'Wed, 28 Apr 2021 20:42:34 GMT',
  'Content-Length',
  '2754'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificates-0')
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
  'dcf97da4-c346-4817-9088-ef16a121e813',
  'x-ms-request-id',
  '5459a67b-2a89-44ca-a840-cc7d9148999a',
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
  'Wed, 28 Apr 2021 20:42:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-1","deletedDate":1619642554,"scheduledPurgeDate":1627418554,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","x5t":"_BLFN70dQkmLFAIPuJWKUJB4qMs","cer":"MIIDKDCCAhCgAwIBAgIQBMHtUDb4QkOG5FQL6jwLtTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzMTU2WhcNMjIwNDI4MjA0MTU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6ABj03m/cyPJXHXJan2EBx1TriJy1SjaM1yzp0DFMvZw+vjO0A/PvluCHii7Zj8c5TB7Ffc8GFbLkAhMY9jiysSVmZAOwmEhOA//f5D+V4O8VJKPmc2iH/xYdZ0dQBqKLGqAUR4fUjbKA/OoCZKSF6641K9+L34X+TJsNWgRC+TenPrGuy4K1x5mJUOTLtXGOX90/bX5+3QBBHw51rfq3KCk6c2NwuCoydtfwx+oa8ENOohxNLrTmy/cKqAGGATC+Lv0kP+7MHBGC5sWkeuO0HjAK80bKglMhYy5q8YtKYso63RRuKpxfX8IRYlhLrHs0CwvHGHnvtmKGgJl7cEOxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRAGCoKXFwcWge9lBxfov3P1lE9mzAdBgNVHQ4EFgQUQBgqClxcHFoHvZQcX6L9z9ZRPZswDQYJKoZIhvcNAQELBQADggEBAGIGjjpIrmLVYhm4Y/VDbFc6xgMzyXX6rrLNUL9Z4vWxdVslnPpQ8daO2xnkvepoMoeNZV1Dxc5nmqW4/XkOCx3aa8L30wlmio4WlsT/ff/sbHxuaQZpv/KVs4OQSQ4zULC4GKiqpqaZT4Bq3FQiJ9yp2ucSDBhGU7IxdVhCcY/nkTafxxFwwJa3L1nEpfBFlzLowr6OLa0IoMG7J1hnJqBeMPwufHR8mySHZxMRzA+YDyjtIbT0nTlx+tnt8De7Jerdbxh6HNI2c5sGe25JgBy1QQuxnOJqWwR9LMKURp7FrlhWZaYcqY1g4DKNVSzHprMTO+Yw999dIz6eQFZ8W/M=","attributes":{"enabled":true,"nbf":1619641916,"exp":1651178516,"created":1619642516,"updated":1619642516,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642480,"updated":1619642480}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  '6b769b04-4e0a-407e-9881-7131751ba54d',
  'x-ms-request-id',
  '427db372-f426-46e5-aa8b-4cc9da1275be',
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
  'Wed, 28 Apr 2021 20:42:34 GMT',
  'Content-Length',
  '2754'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '2dd27c69-212f-4050-9f72-1de28c0b1dc3',
  'x-ms-request-id',
  '9c98d58c-2bac-451d-8ab8-07c689af36a8',
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
  'Wed, 28 Apr 2021 20:42:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '757b75d8-e523-459b-ad9e-bfeb3107e0e6',
  'x-ms-request-id',
  'aa824a4e-8c51-474e-a48a-29bb3bef5c74',
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
  'Wed, 28 Apr 2021 20:42:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '2d76e125-ed9e-4d5e-aa8a-0a8b6279392b',
  'x-ms-request-id',
  'dd8140ba-ea4f-4779-b847-e461c04f280b',
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
  'Wed, 28 Apr 2021 20:42:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '6248614b-629f-44f0-95f0-0700c5e754bb',
  'x-ms-request-id',
  '50e186f6-9062-4e67-af38-b196fbc30c19',
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
  'Wed, 28 Apr 2021 20:42:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'ef95d1c0-b3ef-4d21-99ef-d4b7ca3bcc6f',
  'x-ms-request-id',
  'a51824a0-a4d2-4537-bd0a-ce927a96377c',
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
  'Wed, 28 Apr 2021 20:42:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '155878a0-881c-466f-93b2-9ced581808d8',
  'x-ms-request-id',
  '847ec919-29ed-439a-bc0a-ab5ee62e36b1',
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
  'Wed, 28 Apr 2021 20:42:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '40091314-d1fa-4047-a02a-8e2b8a4db60a',
  'x-ms-request-id',
  'bf609d4a-09b3-4778-b0c1-862237bfc30f',
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
  'Wed, 28 Apr 2021 20:42:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'dacf2639-95bd-42c7-b01c-433bccee9eb6',
  'x-ms-request-id',
  'f569eab4-8ae5-4054-9483-c23ae4bfa7d8',
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
  'Wed, 28 Apr 2021 20:42:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'efff109e-ab50-4121-9c4e-30cc976840f0',
  'x-ms-request-id',
  'c0e028a6-e823-4ffa-bc33-af32733ad2e1',
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
  'Wed, 28 Apr 2021 20:42:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '0ac10137-d164-4370-aa91-f7a77c3bf49f',
  'x-ms-request-id',
  'd497a687-ed37-4077-9abe-a07a311dcb79',
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
  'Wed, 28 Apr 2021 20:42:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '0d5e48d3-2b14-4c83-bb7c-2f4b28082061',
  'x-ms-request-id',
  'a38f78fc-8566-4c63-bc1b-e18be43f45f0',
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
  'Wed, 28 Apr 2021 20:42:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '8c22367a-f5a4-43d4-a02d-78540d50f137',
  'x-ms-request-id',
  'e29394d6-0e69-4738-bbab-a8a3fae61fcb',
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
  'Wed, 28 Apr 2021 20:42:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'e9ab62a3-3e2e-49b7-af8b-5b62456f3dc9',
  'x-ms-request-id',
  '1f1be3a4-23c2-4f0a-a0b4-83721b9de4d9',
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
  'Wed, 28 Apr 2021 20:42:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '55d064f1-a93c-424d-bcb0-5e6225398b38',
  'x-ms-request-id',
  '502279a1-3e43-4df9-b15a-762c50dfe708',
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
  'Wed, 28 Apr 2021 20:42:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '1511670f-da21-4581-9562-c624956bed0a',
  'x-ms-request-id',
  '95731f19-6404-4d07-b23b-d6d36e2cf236',
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
  'Wed, 28 Apr 2021 20:43:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'ad911242-6405-4ad5-9a73-6660244649a9',
  'x-ms-request-id',
  'f59f8e46-f737-48c5-88c3-a0ee8138d1e1',
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
  'Wed, 28 Apr 2021 20:43:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'cf3937a1-5ff9-4c77-a963-1261dfc02e96',
  'x-ms-request-id',
  '24721c0d-3962-4b79-baaf-67f35d2145b8',
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
  'Wed, 28 Apr 2021 20:43:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'dc551157-70f1-4716-a8b6-af10eb5e7485',
  'x-ms-request-id',
  '47245fa5-7eb1-4268-a1da-cdef388a227f',
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
  'Wed, 28 Apr 2021 20:43:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '1ae4b9bf-cc01-4936-8846-2f1ba09be884',
  'x-ms-request-id',
  '54953449-d65d-47bb-be36-6b0b9096b4e1',
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
  'Wed, 28 Apr 2021 20:43:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '339a5bb5-6d66-4428-80c2-f8709e004b28',
  'x-ms-request-id',
  '3f7077c8-c5cd-445b-9bc6-f09e0e5693b4',
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
  'Wed, 28 Apr 2021 20:43:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '2631c71f-4ba0-4c1c-a6d8-64287776942f',
  'x-ms-request-id',
  '49f84db7-3933-4858-ac5c-deef4d4264bd',
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
  'Wed, 28 Apr 2021 20:43:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '8cca8141-2efd-4d8f-83b5-d468c7ee3499',
  'x-ms-request-id',
  'd53cc404-0bac-4f90-886b-e8aebfaa54f6',
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
  'Wed, 28 Apr 2021 20:43:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'b6b7ace0-d1d7-48d9-83f9-5b63e7fa97ee',
  'x-ms-request-id',
  '8e0994ac-83d2-478c-a09a-7a9fc89348eb',
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
  'Wed, 28 Apr 2021 20:43:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '7f372e63-0e94-473e-9104-3840849da18f',
  'x-ms-request-id',
  'bd2dc376-a2f8-4606-9ff4-b8c65c4fe1d0',
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
  'Wed, 28 Apr 2021 20:43:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '52f2b357-cb4d-4e32-9106-7a468a790bd5',
  'x-ms-request-id',
  '513328b4-bcc6-46c8-a76b-c80b1dee634c',
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
  'Wed, 28 Apr 2021 20:43:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'b4b58900-c6be-4478-9360-8c3bd5951a8c',
  'x-ms-request-id',
  '76e3e35e-a022-4a55-a46a-d80c9b5d5315',
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
  'Wed, 28 Apr 2021 20:43:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'd1f2b8b4-00f9-4050-8b3a-604d992e95ef',
  'x-ms-request-id',
  '2af705db-e497-4d99-adde-1bf449f78979',
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
  'Wed, 28 Apr 2021 20:43:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'a9350fa2-0723-4a74-9eb0-4c43c28d630b',
  'x-ms-request-id',
  'c77fdc2c-72c4-4f2c-856c-4459e7d29ee0',
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
  'Wed, 28 Apr 2021 20:43:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  'da9487a8-3bb3-43e6-8511-d12d6af0d6d8',
  'x-ms-request-id',
  '33f521ff-49ff-420a-90b4-91cb207ebc63',
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
  'Wed, 28 Apr 2021 20:43:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificates-1"}}, [
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
  '667f5f60-14ed-4e78-b164-fabb79264c27',
  'x-ms-request-id',
  '3dc22bba-78f5-49af-ad15-dd93b1036ffe',
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
  'Wed, 28 Apr 2021 20:43:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificates-1","deletedDate":1619642554,"scheduledPurgeDate":1627418554,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificates-1/3973d7331e8a492394a31fd9589b4252","x5t":"_BLFN70dQkmLFAIPuJWKUJB4qMs","cer":"MIIDKDCCAhCgAwIBAgIQBMHtUDb4QkOG5FQL6jwLtTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwNDI4MjAzMTU2WhcNMjIwNDI4MjA0MTU2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6ABj03m/cyPJXHXJan2EBx1TriJy1SjaM1yzp0DFMvZw+vjO0A/PvluCHii7Zj8c5TB7Ffc8GFbLkAhMY9jiysSVmZAOwmEhOA//f5D+V4O8VJKPmc2iH/xYdZ0dQBqKLGqAUR4fUjbKA/OoCZKSF6641K9+L34X+TJsNWgRC+TenPrGuy4K1x5mJUOTLtXGOX90/bX5+3QBBHw51rfq3KCk6c2NwuCoydtfwx+oa8ENOohxNLrTmy/cKqAGGATC+Lv0kP+7MHBGC5sWkeuO0HjAK80bKglMhYy5q8YtKYso63RRuKpxfX8IRYlhLrHs0CwvHGHnvtmKGgJl7cEOxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRAGCoKXFwcWge9lBxfov3P1lE9mzAdBgNVHQ4EFgQUQBgqClxcHFoHvZQcX6L9z9ZRPZswDQYJKoZIhvcNAQELBQADggEBAGIGjjpIrmLVYhm4Y/VDbFc6xgMzyXX6rrLNUL9Z4vWxdVslnPpQ8daO2xnkvepoMoeNZV1Dxc5nmqW4/XkOCx3aa8L30wlmio4WlsT/ff/sbHxuaQZpv/KVs4OQSQ4zULC4GKiqpqaZT4Bq3FQiJ9yp2ucSDBhGU7IxdVhCcY/nkTafxxFwwJa3L1nEpfBFlzLowr6OLa0IoMG7J1hnJqBeMPwufHR8mySHZxMRzA+YDyjtIbT0nTlx+tnt8De7Jerdbxh6HNI2c5sGe25JgBy1QQuxnOJqWwR9LMKURp7FrlhWZaYcqY1g4DKNVSzHprMTO+Yw999dIz6eQFZ8W/M=","attributes":{"enabled":true,"nbf":1619641916,"exp":1651178516,"created":1619642516,"updated":1619642516,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1619642480,"updated":1619642480}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificates-1/pending"}}, [
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
  'e1a6bc22-b3a3-4d15-bdda-27283997d3ef',
  'x-ms-request-id',
  '26683a64-afc6-4f77-9dbb-9a7efdc8c438',
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
  'Wed, 28 Apr 2021 20:43:36 GMT',
  'Content-Length',
  '2754'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificates-1')
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
  'ce196da8-f9c9-4556-b7b0-d3a78f1c6a26',
  'x-ms-request-id',
  'ad666754-37cf-43a4-b300-27061e62ca8a',
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
  'Wed, 28 Apr 2021 20:43:36 GMT'
]);
