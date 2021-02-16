let nock = require('nock');

module.exports.hash = "5cba5dd5f0ab5cb08051e271df472ade";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
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
  'x-ms-request-id',
  '91085b06-1c47-4b8c-ad8e-037f14dddb27',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:05 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  'e8b47690-2ac1-4fd6-9e99-5c9220b7f300',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDDwAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:59:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:59:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-', {"provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}}, [
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
  'x-ms-request-id',
  '982a75f1-f9d4-4001-99da-6aca80a6d5d4',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:05 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending","issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyHWkmYdcCXhv3FIWnoV8hA4FLveXqsepalk2U4MvQg3mSwNkgAI62vGjpkCdLZshag+8dgQikvBYEOjdUJkrr0IRQcBWJdEM03baRrnLpP1s/cUUC4osBYG4jcMfbPzEnCV81613f4Cx2Mp4QzC3FfYyLl/AIuZFdcLY4QFDv4mkkAdAWAM4M1vJmsZFqJ/Re3LU/GUn/AnFng0A8PNFK37sQROrWxJb1pLpmkBhw3vUMI/Hkor07seC4zpbR7LnbsLQ14d9cJ8kvp1MWCCksB+Mm9UXj4JPyExGY3q2AwecyXWEKKI84CA+Jsoiq0ywEX/jXU2cLIYQvP4JpaSF/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpjbpHmYsbLrfSVx91QzyVkk9wCOBlmvd5lvfn0w+dKKWMdVWQf4T90x/7eiTxBrVoSTrV7CklZIaBlCYcplM/vj+oYG/UChsAemPD2V0cxnaJNn5LwbobSu/q6b7raT5CUh2GQQFOsD+VmdHqRi5kfT+JurNCFmT1PKF8TirBl+n2LYA0L2Ymi3pqSQPhkVi0kr7FLJvRt5CfhqhQRdOnJGP0O3gAyIWnb/RkBjdOD1QLdasLsdXpgklOprHgK4ecDNgyiZyeT2N0tDasOxyQVxE/NkYcfbUBwHJqyoeW7kcXlicMK+GWGYp1U556cPTN7EawnX2JcVdjURH5s/JM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a29f37448b8b4747851f315c5ab9a7a4"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending?api-version=7.2&request_id=a29f37448b8b4747851f315c5ab9a7a4',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3918f7eb-2c95-495f-95b6-ab1e182645ac',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '1417'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending","issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyHWkmYdcCXhv3FIWnoV8hA4FLveXqsepalk2U4MvQg3mSwNkgAI62vGjpkCdLZshag+8dgQikvBYEOjdUJkrr0IRQcBWJdEM03baRrnLpP1s/cUUC4osBYG4jcMfbPzEnCV81613f4Cx2Mp4QzC3FfYyLl/AIuZFdcLY4QFDv4mkkAdAWAM4M1vJmsZFqJ/Re3LU/GUn/AnFng0A8PNFK37sQROrWxJb1pLpmkBhw3vUMI/Hkor07seC4zpbR7LnbsLQ14d9cJ8kvp1MWCCksB+Mm9UXj4JPyExGY3q2AwecyXWEKKI84CA+Jsoiq0ywEX/jXU2cLIYQvP4JpaSF/QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpjbpHmYsbLrfSVx91QzyVkk9wCOBlmvd5lvfn0w+dKKWMdVWQf4T90x/7eiTxBrVoSTrV7CklZIaBlCYcplM/vj+oYG/UChsAemPD2V0cxnaJNn5LwbobSu/q6b7raT5CUh2GQQFOsD+VmdHqRi5kfT+JurNCFmT1PKF8TirBl+n2LYA0L2Ymi3pqSQPhkVi0kr7FLJvRt5CfhqhQRdOnJGP0O3gAyIWnb/RkBjdOD1QLdasLsdXpgklOprHgK4ecDNgyiZyeT2N0tDasOxyQVxE/NkYcfbUBwHJqyoeW7kcXlicMK+GWGYp1U556cPTN7EawnX2JcVdjURH5s/JM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a29f37448b8b4747851f315c5ab9a7a4"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fbbad309-dbfd-4952-a17b-edca6c94f626',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '1417'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/c6dbd7e536454f989aabb3fa5e4064e4","attributes":{"enabled":false,"nbf":1613501346,"exp":1645037946,"created":1613501946,"updated":1613501946,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
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
  'x-ms-request-id',
  '6bd71d5c-36bf-4a9d-ad51-be3f50ddb2e9',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '1245'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}}, [
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
  'x-ms-request-id',
  'c827b77c-162c-443a-8719-ac84d0594ba2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-', {})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}}, [
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
  'x-ms-request-id',
  '881d6b48-0426-49b6-8f47-095ece00fad1',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}}, [
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
  'x-ms-request-id',
  '1a266192-4410-403b-be93-9696bb7dff65',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","provider":"Test","credentials":{"account_id":"keyvaultuser"},"org_details":{"zip":0,"admin_details":[{"first_name":"John","last_name":"Doe","email":"admin@microsoft.com","phone":"4255555555"}]},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}}, [
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
  'x-ms-request-id',
  '07799386-2391-4ad3-b241-88edd34bdb7b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '408'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/issuers/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateIssuerNotFound","message":"Issuer not found"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'c4484d69-fc87-4756-a42d-3005153b36b9',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","deletedDate":1613501947,"scheduledPurgeDate":1614106747,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/c6dbd7e536454f989aabb3fa5e4064e4","attributes":{"enabled":false,"nbf":1613501346,"exp":1645037946,"created":1613501946,"updated":1613501946,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
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
  'x-ms-request-id',
  '0bf6348c-f9b3-49d8-ac83-0d9042ca2759',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT',
  'Content-Length',
  '1449'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'cba6f6e3-9030-4c42-bb63-0975e064e53d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6deb3517-9b3c-4de0-9fb5-a385b2c02567',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '16a41510-910b-41f2-8e76-f23d89358e98',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '986326e3-2a9f-49a0-85cf-f4f95b835468',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '161',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6982f73e-1cea-4f9c-ac4f-de7aa1c45835',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-","deletedDate":1613501947,"scheduledPurgeDate":1614106747,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/c6dbd7e536454f989aabb3fa5e4064e4","attributes":{"enabled":false,"nbf":1613501346,"exp":1645037946,"created":1613501946,"updated":1613501946,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"CRUDCertificateName-cancreatereadanddeleteacertificateissuer-"},"attributes":{"enabled":true,"created":1613501946,"updated":1613501946}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-/pending"}}, [
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
  'x-ms-request-id',
  '2665f6ba-05bb-4520-9460-0459d9568832',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:15 GMT',
  'Content-Length',
  '1449'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-cancreatereadanddeleteacertificateissuer-')
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
  'x-ms-request-id',
  '254532de-d4d5-462c-b6b6-cdc8b6dfc978',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 18:59:15 GMT'
]);
