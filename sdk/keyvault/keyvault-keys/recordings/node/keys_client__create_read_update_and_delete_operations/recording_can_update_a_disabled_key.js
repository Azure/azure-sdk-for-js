let nock = require('nock');

module.exports.hash = "2f704aa585d5ce1b68e7ad338a514417";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdateadisabledkey-/create')
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
  'westus2',
  'x-ms-client-request-id',
  '215b4263-b825-4044-a7b4-8d77548f42c3',
  'x-ms-request-id',
  'edb9432d-0330-432b-b635-d3f1a778d935',
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
  'Wed, 28 Apr 2021 21:25:17 GMT'
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
  'f3daeb74-579a-494f-b521-dc6db16d4f01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6UwoAAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:25:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrsB46yN3rnX5-FTYrIKn5m1dxx_DNS3WH3rgrgrdp8tIIX6z5LOL6s6s8oPSOL4cYu63OfXf3_La7TOCagBS5_lPGPoRFEIQQn0gl5X-FmTRt5k7wDqkLFwNbJl0yNCXWRH2KLxS273XAuTO8XA4YkXr4zXzxPQhSKOj2stpxo9YgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:25:17 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'bbf44c73-4fce-4bc3-89a6-a013157c4a01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6UwoAAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:25:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrO4bPKyLnPllutLLaQGEor6MX7iYuFRtcD7X3iLZ8UdNbP3anK33KMZiJTcNCB3FlhkIZMQaXbRjywIzzx1IUDLnhmz8xqJMxzDoypBtCupWv4idhxykMk_wwHay6xW_2HUkwXp6SLJSis5WXjBemwBZVESd5WPThpqxpj90943kgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:25:17 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '4811d3f3-eaea-47e2-891b-824dabbf3000',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIBgAAAO_IG9gOAAAA4BL6UwsAAAD3yBvYDgAAAA; expires=Fri, 28-May-2021 21:25:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:25:17 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-canupdateadisabledkey-/create', {"kty":"RSA","attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-/0ea6f629f8fa460a8806b81c650a530a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xKRNaC8y3lN3_izw_3SJUFn9opTDCQ42xb22ZaAXOE6q06rThvUu1CT6GsP6MhWsozBy7Lc5v2wScit5SWpcASfoCVqOBXW9n2VatX8AU2YscuJErkAzLWF4ayBVMTfCKdzPz1aNppirqmhrHzVX9TuLJIhMsKZjGuXZ2bJPJJmhBcitpvqIpE4Grnw365cT5aakaAc3lioQSY1Xps4Rf6JpI63bCl9QHbkRcClWK0s7qAL62Cw3VwejEirWeCH8QcXgRlgFHqOI5VeZ6EG6DtyIIQhXh5xUENMODvImiB1GU9WuwNFpfK1cZBE_UVryZltD4cLkR1gVbU5_7r64wQ","e":"AQAB"},"attributes":{"enabled":false,"created":1619645118,"updated":1619645118,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '215b4263-b825-4044-a7b4-8d77548f42c3',
  'x-ms-request-id',
  '420097bd-e755-4105-83d3-a65924556c33',
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
  'Wed, 28 Apr 2021 21:25:18 GMT',
  'Content-Length',
  '726'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/CRUDKeyName-canupdateadisabledkey-/0ea6f629f8fa460a8806b81c650a530a', {"attributes":{"exp":1546300800}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-/0ea6f629f8fa460a8806b81c650a530a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xKRNaC8y3lN3_izw_3SJUFn9opTDCQ42xb22ZaAXOE6q06rThvUu1CT6GsP6MhWsozBy7Lc5v2wScit5SWpcASfoCVqOBXW9n2VatX8AU2YscuJErkAzLWF4ayBVMTfCKdzPz1aNppirqmhrHzVX9TuLJIhMsKZjGuXZ2bJPJJmhBcitpvqIpE4Grnw365cT5aakaAc3lioQSY1Xps4Rf6JpI63bCl9QHbkRcClWK0s7qAL62Cw3VwejEirWeCH8QcXgRlgFHqOI5VeZ6EG6DtyIIQhXh5xUENMODvImiB1GU9WuwNFpfK1cZBE_UVryZltD4cLkR1gVbU5_7r64wQ","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1619645118,"updated":1619645118,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'fbb7b8fc-ba76-4ac0-b0b5-4be91a5aca16',
  'x-ms-request-id',
  '659c0044-c2d2-4562-9b56-f13c61606713',
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
  'Wed, 28 Apr 2021 21:25:18 GMT',
  'Content-Length',
  '743'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdateadisabledkey-","deletedDate":1619645119,"scheduledPurgeDate":1620249919,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-/0ea6f629f8fa460a8806b81c650a530a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xKRNaC8y3lN3_izw_3SJUFn9opTDCQ42xb22ZaAXOE6q06rThvUu1CT6GsP6MhWsozBy7Lc5v2wScit5SWpcASfoCVqOBXW9n2VatX8AU2YscuJErkAzLWF4ayBVMTfCKdzPz1aNppirqmhrHzVX9TuLJIhMsKZjGuXZ2bJPJJmhBcitpvqIpE4Grnw365cT5aakaAc3lioQSY1Xps4Rf6JpI63bCl9QHbkRcClWK0s7qAL62Cw3VwejEirWeCH8QcXgRlgFHqOI5VeZ6EG6DtyIIQhXh5xUENMODvImiB1GU9WuwNFpfK1cZBE_UVryZltD4cLkR1gVbU5_7r64wQ","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1619645118,"updated":1619645118,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f1b32e94-4c26-4fa7-ad70-0f245e7812bd',
  'x-ms-request-id',
  'bc1abee9-f342-410a-8e80-2a39ae8dd8da',
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
  'Wed, 28 Apr 2021 21:25:18 GMT',
  'Content-Length',
  '913'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5e1f1f79-8750-47a4-bfee-b7005a79ab71',
  'x-ms-request-id',
  '54ae71b6-29ca-40ea-99bb-5d66bce9ecfe',
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
  'Wed, 28 Apr 2021 21:25:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '6db593a8-dd76-466c-9f58-02ac686a9e29',
  'x-ms-request-id',
  '3c03cf70-531b-439f-b5b6-da845deebc90',
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
  'Wed, 28 Apr 2021 21:25:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '41837de0-94f1-468a-b755-f1915bcad0bd',
  'x-ms-request-id',
  '8367f762-3a4a-487a-9f48-4b82ce05ce21',
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
  'Wed, 28 Apr 2021 21:25:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'a5f5690e-2b87-4bf2-aff6-40aa1ebd00ef',
  'x-ms-request-id',
  '7875ddd9-199f-4ef0-b788-04016d56408c',
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
  'Wed, 28 Apr 2021 21:25:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '296bcff1-0a88-4c9b-ab2c-553bc9336954',
  'x-ms-request-id',
  '4ef36bdc-561b-4b8b-98ac-52380e56113d',
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
  'Wed, 28 Apr 2021 21:25:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f120f38f-bb4c-40b4-ba96-a00f3caa373a',
  'x-ms-request-id',
  'e8065fbb-2e65-460e-a677-dd8886024783',
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
  'Wed, 28 Apr 2021 21:25:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '69e94d17-5ab4-4e8e-9ed9-83a67a84f7d5',
  'x-ms-request-id',
  'f378af99-504d-4c46-87d5-b88ba9769b52',
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
  'Wed, 28 Apr 2021 21:25:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8bf80515-86d4-4a7f-a90d-1b4b9e00d2a3',
  'x-ms-request-id',
  '5a5359d2-45c5-4501-b4d8-b3a3ca89646c',
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
  'Wed, 28 Apr 2021 21:25:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-canupdateadisabledkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '118',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'cd664b12-7240-4179-90c0-d0667b6d3a53',
  'x-ms-request-id',
  '9bb5574a-803c-47ca-9d3a-b5387959dc82',
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
  'Wed, 28 Apr 2021 21:25:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-canupdateadisabledkey-","deletedDate":1619645119,"scheduledPurgeDate":1620249919,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-canupdateadisabledkey-/0ea6f629f8fa460a8806b81c650a530a","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xKRNaC8y3lN3_izw_3SJUFn9opTDCQ42xb22ZaAXOE6q06rThvUu1CT6GsP6MhWsozBy7Lc5v2wScit5SWpcASfoCVqOBXW9n2VatX8AU2YscuJErkAzLWF4ayBVMTfCKdzPz1aNppirqmhrHzVX9TuLJIhMsKZjGuXZ2bJPJJmhBcitpvqIpE4Grnw365cT5aakaAc3lioQSY1Xps4Rf6JpI63bCl9QHbkRcClWK0s7qAL62Cw3VwejEirWeCH8QcXgRlgFHqOI5VeZ6EG6DtyIIQhXh5xUENMODvImiB1GU9WuwNFpfK1cZBE_UVryZltD4cLkR1gVbU5_7r64wQ","e":"AQAB"},"attributes":{"enabled":false,"exp":1546300800,"created":1619645118,"updated":1619645118,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd35ed215-392d-499a-9b79-87f3498424b2',
  'x-ms-request-id',
  'cb18ac65-115c-4e8e-a9b1-2db2b41c4556',
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
  'Wed, 28 Apr 2021 21:25:35 GMT',
  'Content-Length',
  '913'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-canupdateadisabledkey-')
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
  '4dba80a7-5de3-44ee-b877-e746c1d7b335',
  'x-ms-request-id',
  '4a031bf4-beeb-47a4-8932-7d6fac1073c1',
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
  'Wed, 28 Apr 2021 21:25:36 GMT'
]);
