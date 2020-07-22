let nock = require('nock');

module.exports.hash = "e5940b93bc85d1aff38bb9c7f28bba2d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/create')
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
  'westus',
  'x-ms-request-id',
  'ca0de254-0f4e-4dc6-b437-417745c9cac2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:45 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  'd66b47e8-2f36-4179-8312-d9a1183d2300',
  'x-ms-ests-server',
  '2.1.10877.6 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvuQ-5XmkmBNl4r2vz0ak8Y_aSJHAQAAAFWEqtYOAAAA; expires=Fri, 21-Aug-2020 19:02:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 22 Jul 2020 19:02:45 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8e8Z2yd4o1ogafIiDCqj58nCklxd+hgjoUYuuEX7AX+/fv5JmGdiiiCYVWnsm3rJWbxEqGjflyd7kIlBjWIJjHSoQTPBUVqUD66mO7X0+MGu4nFWDKKOd6cYFWMopoRUE/lmLLV2aoI8Va0gdv9bReREhTtRCxf01QCOVkwCQ8/bhVNKvmpLXMho5Fek05FV/oqmcJejKQ26JE8EbdH7/SlRclBtf/1p5+i+bk9bY5CmYdcPvpcxtMB9C7FeFGoPdW6wN7R/l/g3ajILJgqbpIS2wjDQs3OneeU+pwjZKZPf0pTKCf85PvSWWeJ3ggLYkKHO16D7VMBSIJZJTkmJGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALmNsPe1caIkoc1tl2yiZ1KJbvs6/6Jpeon0tN3CzoNPTRyTwA3RRjLuRRuvsVEV01GrfxL5PeCW48qyjj6ObzhjE7CzVNP57wUW5N4Pv0TRqXKvEB8nFITmGpwDdr04SmL3extvYakYpqWDqU5G4p/asbps+9DnH8q4iFU+a4dsfnvv6GR04585ttkF4NjZ18F2xEp+lCFC/5SMbXo9Zwp/8PRfUMjoVlHEUDXw9fFQbKU8/11obSjVYHG5mGGI0YWo89AiWfhrLKvUeGzjo23BI+aX3gKYv7QXbip5wsauku//4qO/QTS1sEFcnUlu+Ur8hrp7jCYMqdZ4CvzBay0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"79f71da59ab448e5a7b07034795b7c41"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/pending?api-version=7.0&request_id=79f71da59ab448e5a7b07034795b7c41',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bcc21e29-275d-42b2-9538-f671acb02898',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:46 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8e8Z2yd4o1ogafIiDCqj58nCklxd+hgjoUYuuEX7AX+/fv5JmGdiiiCYVWnsm3rJWbxEqGjflyd7kIlBjWIJjHSoQTPBUVqUD66mO7X0+MGu4nFWDKKOd6cYFWMopoRUE/lmLLV2aoI8Va0gdv9bReREhTtRCxf01QCOVkwCQ8/bhVNKvmpLXMho5Fek05FV/oqmcJejKQ26JE8EbdH7/SlRclBtf/1p5+i+bk9bY5CmYdcPvpcxtMB9C7FeFGoPdW6wN7R/l/g3ajILJgqbpIS2wjDQs3OneeU+pwjZKZPf0pTKCf85PvSWWeJ3ggLYkKHO16D7VMBSIJZJTkmJGQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBALmNsPe1caIkoc1tl2yiZ1KJbvs6/6Jpeon0tN3CzoNPTRyTwA3RRjLuRRuvsVEV01GrfxL5PeCW48qyjj6ObzhjE7CzVNP57wUW5N4Pv0TRqXKvEB8nFITmGpwDdr04SmL3extvYakYpqWDqU5G4p/asbps+9DnH8q4iFU+a4dsfnvv6GR04585ttkF4NjZ18F2xEp+lCFC/5SMbXo9Zwp/8PRfUMjoVlHEUDXw9fFQbKU8/11obSjVYHG5mGGI0YWo89AiWfhrLKvUeGzjo23BI+aX3gKYv7QXbip5wsauku//4qO/QTS1sEFcnUlu+Ur8hrp7jCYMqdZ4CvzBay0=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"79f71da59ab448e5a7b07034795b7c41"}, [
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
  'westus',
  'x-ms-request-id',
  'bf30315f-a145-4d7a-a13d-a4b4d7b7ba09',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:46 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined","deletedDate":1595444566,"scheduledPurgeDate":1603220566,"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/bf8946e63d704bf6b8f6cb44e8e56afa","attributes":{"enabled":false,"nbf":1595443966,"exp":1626980566,"created":1595444566,"updated":1595444566,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1595444566,"updated":1595444566}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7693ec02-592d-41d7-9e26-4709867b8ae3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:46 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b3077b6d-1ab5-4a48-919e-eef9741fccaa',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02ffe148-54c2-476a-9f79-a41da67cfe05',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '641bef64-d497-4052-8d1f-cd2bdc7d6144',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a7c6534a-f1bd-4ba8-bf99-54bde0b32d5c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '465d2f5c-f0cb-49ad-9a14-6f47320fddc4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ab239943-8b33-445c-a76a-eb644993c696',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '50aa8e19-22af-4e7c-bb08-5496aeed7b21',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dc397b80-0837-4394-9777-b44380908883',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '47f5b7af-b132-4163-ad2e-54d74e99d9b1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:03:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '626cbf61-e5b1-43a5-a70b-4d2a584d3b6c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:03:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f241c946-8bd7-4af5-acb2-557202aded36',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:03:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined","deletedDate":1595444566,"scheduledPurgeDate":1603220566,"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/bf8946e63d704bf6b8f6cb44e8e56afa","attributes":{"enabled":false,"nbf":1595443966,"exp":1626980566,"created":1595444566,"updated":1595444566,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1595444566,"updated":1595444566}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '48a8bc91-72ac-4773-abf8-7835d43ea582',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:03:07 GMT',
  'Content-Length',
  '1362'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/apiVersionCertificateName-itshouldallowustospecifyanAPIversion-undefined')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ad11c374-20eb-4cea-809f-c0dc670dc5eb',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:03:07 GMT'
]);
