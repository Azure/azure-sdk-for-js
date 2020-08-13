let nock = require('nock');

module.exports.hash = "6a465176d8e0e1527dbe46f685136469";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-0/create')
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
  '72b3dc9c-d933-4964-86a2-41dab2573d78',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:26 GMT'
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
  'dfd5f71c-ddc2-4d9d-ba74-d1b81b355000',
  'x-ms-ests-server',
  '2.1.10761.15 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aqf3Zr-Jio9Bs_5HRfD05jI_aSJHAQAAAN8gkNYOAAAA; expires=Sat, 01-Aug-2020 18:39:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:39:27 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending?api-version=7.1&request_id=37cf9b5c2fb44d3d9975170c29d5dc01',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fffb9050-134c-425a-bb2b-4d02538627e3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:27 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '78656ed3-0522-416e-ab5b-420857d49341',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:27 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '39705db9-e117-4aa5-a299-7b9e96979d6a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:27 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  'b6f314b3-755f-4315-920d-948ac4d08f2f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:29 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '6633592f-59c8-40fa-867a-173a14a039d7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:33 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  'd5913e02-ad0c-417c-b28d-c110e5c3413c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:35 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '718bc5bd-592a-431a-a4c9-94c545986b54',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:37 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '90aaedfb-8d9f-4304-bfa0-c2c0953274a0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:39 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '141c8292-32dc-44b0-9a18-a64c8c58c764',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:41 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  'a3f558fa-46b5-4fa7-a49e-dee20e629b23',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:43 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFNB9M5eSbnmP/CRvwywZzri4iIsxMQ0LrKiR4KrVEFku5LGhKxpvrQoIwb8+M8OdsGiOa816TxlvlLLqsPMWLa4oEn53l/Q+3NJ8Ep8SU59mc6QAXE7u6GaaEhQPboQxZomjQgtpf0iZIaN2WD4GfKAirzPr+QkzdzOanGbCNLIgOcHRMtwAmCZAIGll9k+IwmUwHwvQXVg02tSeG+a3AHCPMD/KGMrSC7o+32fNgSXUk+MysbAC7hkpJbcZ6F+Ax2zAnF55Ltzckyupj1+5MVOarPEvmxdVsAMAQRvMe8gMFu2IyeN/Lk1kE/mceQSh1+H/xz/2gRoiIOzpbHD3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAChzWHKplt5Wy9OEYSCSi5omdDEfUZerBJv6PQcfIwZXhSBrPIlv6XpMQFDmKbTG6GW0/kpFe3BOuPNlksjq4v5FpTEQdnUfpulLgq4iqc9rbcBB04ehePQa5gMom5rX+3H2PfK5TY8hPFQ4vDi19AjiJFy6lMtU0an9FJQSOcwMSLUinPBp8ga54G3MnEXSw7oinKAEPV6SyTV9w2TLB2OHQZuJIljb0O0MGiQFx1nnZueqSDmcksV6RicIkmjTto9zAm65qbOE/vSLHKW9VpkTDpT0bFAmwhId6c43r8L5bPiWbwi7idPskEWy9i1ld/tnO6qK/GWNz/+m2+QZH1w=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0","request_id":"37cf9b5c2fb44d3d9975170c29d5dc01"}, [
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
  '5e0254c3-c182-4569-9dd4-918d21cc7611',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:45 GMT',
  'Content-Length',
  '1305'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","x5t":"XAtBph5m_eiQj6gqry78Cl4eTJA","cer":"MIIDKDCCAhCgAwIBAgIQDO4hzPfvRiqaS+nVsUPP3TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyOTQzWhcNMjEwNzAyMTgzOTQzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCMU0H0zl5JueY/8JG/DLBnOuLiIizExDQusqJHgqtUQWS7ksaErGm+tCgjBvz4zw52waI5rzXpPGW+Usuqw8xYtrigSfneX9D7c0nwSnxJTn2ZzpABcTu7oZpoSFA9uhDFmiaNCC2l/SJkho3ZYPgZ8oCKvM+v5CTN3M5qcZsI0siA5wdEy3ACYJkAgaWX2T4jCZTAfC9BdWDTa1J4b5rcAcI8wP8oYytILuj7fZ82BJdST4zKxsALuGSkltxnoX4DHbMCcXnku3NyTK6mPX7kxU5qs8S+bF1WwAwBBG8x7yAwW7YjJ438uTWQT+Zx5BKHX4f/HP/aBGiIg7OlscPfAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSbYHlhlPp9ESLKqa+GvIvB2w9HCjAdBgNVHQ4EFgQUm2B5YZT6fREiyqmvhryLwdsPRwowDQYJKoZIhvcNAQELBQADggEBAA1wFnZVAHMarPPCmlVYycB2fZeDbYv4rK6dZoXODAz6gXBj9OKi4x6nysTQQCFRLUrTLnsy+E3D3E8RotsO7lMHwgadAi6WIcDzQeyMZw+Dd2mdRFo6UST/0LXNgdo0HyLLAjYatCOb/3h9sz7uB+L24QncPNg0psyyaGzh3JdgjJ3HWpFok9nhKmui1GqCO5c9P0WKzFlOufUIFjxY0K/zHMg/X7f7UduF4F9kE5BNhD0yn7vk/WwEML/7vfFc3cBKU4U+WQ9GjjNa9u0bWRyTJWTSgIInRantUyjTf1Olv1QtXaCCMXfzeynJLcnFcvomDn+qdNAws/4uIG6TUW0=","attributes":{"enabled":true,"nbf":1593714583,"exp":1625251183,"created":1593715183,"updated":1593715183,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715168,"updated":1593715168}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  '6b396b62-d2b6-4b85-a6ee-440c6f2e575f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:45 GMT',
  'Content-Length',
  '2585'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending?api-version=7.1&request_id=f8052d6ab4b54b9bbf939d0d7673758e',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '198abc41-304e-476f-a44c-26a4ae79ea20',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:46 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  'a2d941e8-5707-443a-a5c9-4177583b7759',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:46 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  'fb322787-da4d-4c1a-bdee-bce6ace9aab9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:46 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  '7483e321-71ea-4e9a-9f0b-22c3f91f266e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:48 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  '09f7d022-44c6-4603-a6e8-c9b3d12bd898',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:50 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  'd95b2890-4a90-4da8-adae-4f46409356f4',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:52 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  'bde67651-7487-4501-9dc0-33574fcb6632',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:54 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  'd0faa25d-e02a-4758-b6ef-86a12585c066',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:56 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  '23627fdb-1685-47c2-a614-8fddd0b5fbe9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:39:58 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrsBrU4K2E3UFEoTOo4dfm8itmzhlZCwIzuB/lyBvbmAhsqjZJmvxwHSXy89UYFgi80/dOqY/80QPo826OZxwUeHLKkVcwOA+jmHXc96o0dDAIorT+CMKYSOb20+b8NwMK5lt83veDcI82K/y0n6SuaoRURSf/adlbBVxIjGhhK0pLQ77n23jOeSIiyG6nXAW7VREjh5xiHfMGVJWrfshP1sQ9BkrTAqttTQCQ/5kJBmAgEBnfdr+1gTK/GkyNR4bnkAqxA6XqsJfrLqLGEylVvuP9kXL5CIxdElnBdiGgTOWYbeIFzHmqwZUKt8ZVIOeN7BOhWbCHmA8pSSRyj1cQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKgGqDY0N7WZo6xLO/epYidfk2upW3aCSyKLqsxB6ou1Xg6jwixfEpzBt0ska2G9YEDTpDSl10fiQuULGggxv103QTFpnS3KZrjTw1h2+Cz5E0QBAXTFuMzHRhsM1Nfc9b/mqQt6phOM8IFW79eCeEtdaRO9fTXG/Jtg3348A99/8Xg34ojitqoBwfvG7WSV1DcIzmmkeb7K4op48Dk6G3+qo5DrXgUjqAwd1oGUZG4urnwSOLIFe6iT4FCcXEfUwZlSETYMawgVe6ZWTJ0UsUMfkudcvOoTs4b1O38OVYJIkIyqeq/yv4JIE+HD+MH1Rnckr6w4fgU+RP9B5cXAkYU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1","request_id":"f8052d6ab4b54b9bbf939d0d7673758e"}, [
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
  'e9bfe284-dc19-4940-8021-b48e512a6505',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:00 GMT',
  'Content-Length',
  '1305'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","x5t":"HPdfY1PNIONnREkInhe0ClRMkxE","cer":"MIIDKDCCAhCgAwIBAgIQKlixH+AdTkuhU0g9F4dtIDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyOTU5WhcNMjEwNzAyMTgzOTU5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGuwGtTgrYTdQUShM6jh1+byK2bOGVkLAjO4H+XIG9uYCGyqNkma/HAdJfLz1RgWCLzT906pj/zRA+jzbo5nHBR4csqRVzA4D6OYddz3qjR0MAiitP4IwphI5vbT5vw3AwrmW3ze94NwjzYr/LSfpK5qhFRFJ/9p2VsFXEiMaGErSktDvufbeM55IiLIbqdcBbtVESOHnGId8wZUlat+yE/WxD0GStMCq21NAJD/mQkGYCAQGd92v7WBMr8aTI1HhueQCrEDpeqwl+suosYTKVW+4/2RcvkIjF0SWcF2IaBM5Zht4gXMearBlQq3xlUg543sE6FZsIeYDylJJHKPVxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/3p8F22NQpWLH8HHaI7jEnyKd+jAdBgNVHQ4EFgQUv96fBdtjUKVix/Bx2iO4xJ8infowDQYJKoZIhvcNAQELBQADggEBAK9XjSHCqkt5z3Va4gZlQfmrB6Jpbu+SIWnqo4SwU2jPeG6oRd0GenH2VRseYQVY32dK+wobzTt7WGF8rNCqUQeQVmUcLar7hbIcBGObpc7CBbEmX6kaLsQ5OggF/N5NG8Uk/hevv1vB9JZcEnL1F5A8FXVR+Kk7EyXGPEeEQutCCZ7f92cQul7KheMHuEqX94dwNIkOvHun3qwqQfHJf3OI9S+dUG1362LEAtEmJcS2gQSth+pttVZnea8WQhO47tjuJq4Twmh/LdTdDYm91fsqfdLnDqi7kIJIz/ZuTo60L2FszGwuY9SSJ9WHU747rqKROL71/vtWxH9Z1Z1PAZU=","attributes":{"enabled":true,"nbf":1593714599,"exp":1625251199,"created":1593715199,"updated":1593715199,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715186,"updated":1593715186}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  'fbaecf75-cc4f-49ee-ba75-ee9578bfa0b5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:00 GMT',
  'Content-Length',
  '2585'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0","x5t":"XAtBph5m_eiQj6gqry78Cl4eTJA","attributes":{"enabled":true,"nbf":1593714583,"exp":1625251183,"created":1593715183,"updated":1593715183},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1","x5t":"HPdfY1PNIONnREkInhe0ClRMkxE","attributes":{"enabled":true,"nbf":1593714599,"exp":1625251199,"created":1593715199,"updated":1593715199},"subject":""}],"nextLink":null}, [
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
  '6dd009e0-5d0c-40b5-aab8-b50c36b2fbe2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:00 GMT',
  'Content-Length',
  '595'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-0","deletedDate":1593715201,"scheduledPurgeDate":1601491201,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","x5t":"XAtBph5m_eiQj6gqry78Cl4eTJA","cer":"MIIDKDCCAhCgAwIBAgIQDO4hzPfvRiqaS+nVsUPP3TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyOTQzWhcNMjEwNzAyMTgzOTQzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCMU0H0zl5JueY/8JG/DLBnOuLiIizExDQusqJHgqtUQWS7ksaErGm+tCgjBvz4zw52waI5rzXpPGW+Usuqw8xYtrigSfneX9D7c0nwSnxJTn2ZzpABcTu7oZpoSFA9uhDFmiaNCC2l/SJkho3ZYPgZ8oCKvM+v5CTN3M5qcZsI0siA5wdEy3ACYJkAgaWX2T4jCZTAfC9BdWDTa1J4b5rcAcI8wP8oYytILuj7fZ82BJdST4zKxsALuGSkltxnoX4DHbMCcXnku3NyTK6mPX7kxU5qs8S+bF1WwAwBBG8x7yAwW7YjJ438uTWQT+Zx5BKHX4f/HP/aBGiIg7OlscPfAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSbYHlhlPp9ESLKqa+GvIvB2w9HCjAdBgNVHQ4EFgQUm2B5YZT6fREiyqmvhryLwdsPRwowDQYJKoZIhvcNAQELBQADggEBAA1wFnZVAHMarPPCmlVYycB2fZeDbYv4rK6dZoXODAz6gXBj9OKi4x6nysTQQCFRLUrTLnsy+E3D3E8RotsO7lMHwgadAi6WIcDzQeyMZw+Dd2mdRFo6UST/0LXNgdo0HyLLAjYatCOb/3h9sz7uB+L24QncPNg0psyyaGzh3JdgjJ3HWpFok9nhKmui1GqCO5c9P0WKzFlOufUIFjxY0K/zHMg/X7f7UduF4F9kE5BNhD0yn7vk/WwEML/7vfFc3cBKU4U+WQ9GjjNa9u0bWRyTJWTSgIInRantUyjTf1Olv1QtXaCCMXfzeynJLcnFcvomDn+qdNAws/4uIG6TUW0=","attributes":{"enabled":true,"nbf":1593714583,"exp":1625251183,"created":1593715183,"updated":1593715183,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715168,"updated":1593715168}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  '86b0f030-badd-48aa-a402-c37feabdf602',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:00 GMT',
  'Content-Length',
  '2784'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f48af6e6-f903-4d6b-b197-a4b6e78a4584',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c8609ce9-4e47-41ef-9918-6a010971d1d8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '76d198be-cee1-4935-bef5-773f7eeaf6ff',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2f22886d-264a-4bf6-a442-00327961ae2e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '89dd4a52-a865-41af-9d46-6c44680af0b1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '589ce8df-a3ab-4a65-90e8-887c09ce9d61',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ec9a8c44-70ea-4395-829e-49b3b19be6d5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a317be64-892b-4941-99fc-328896e2a3f6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '186fa025-bef5-4bc8-8ca9-db7aeb6cf277',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f9f98960-bbad-4e44-b8c1-69fdff100431',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '651a8c2d-c718-4ff2-a10f-2295101257f9',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a194a8dd-87f1-422a-ac8d-e8eaee7abb0d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e48d120a-f7b5-41e2-8dc6-f77f8a53fb88',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cc39b2f3-1130-4c3b-86ed-8a7f129cbb0a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ec6de782-1faf-4d35-a18c-7faeb17a7fae',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0aaecb66-e084-42fc-ac13-4e1aa97a519c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-0","deletedDate":1593715201,"scheduledPurgeDate":1601491201,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/e20f12f15c6f42f1b7cb7e6ed4052d83","x5t":"XAtBph5m_eiQj6gqry78Cl4eTJA","cer":"MIIDKDCCAhCgAwIBAgIQDO4hzPfvRiqaS+nVsUPP3TANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyOTQzWhcNMjEwNzAyMTgzOTQzWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCMU0H0zl5JueY/8JG/DLBnOuLiIizExDQusqJHgqtUQWS7ksaErGm+tCgjBvz4zw52waI5rzXpPGW+Usuqw8xYtrigSfneX9D7c0nwSnxJTn2ZzpABcTu7oZpoSFA9uhDFmiaNCC2l/SJkho3ZYPgZ8oCKvM+v5CTN3M5qcZsI0siA5wdEy3ACYJkAgaWX2T4jCZTAfC9BdWDTa1J4b5rcAcI8wP8oYytILuj7fZ82BJdST4zKxsALuGSkltxnoX4DHbMCcXnku3NyTK6mPX7kxU5qs8S+bF1WwAwBBG8x7yAwW7YjJ438uTWQT+Zx5BKHX4f/HP/aBGiIg7OlscPfAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSbYHlhlPp9ESLKqa+GvIvB2w9HCjAdBgNVHQ4EFgQUm2B5YZT6fREiyqmvhryLwdsPRwowDQYJKoZIhvcNAQELBQADggEBAA1wFnZVAHMarPPCmlVYycB2fZeDbYv4rK6dZoXODAz6gXBj9OKi4x6nysTQQCFRLUrTLnsy+E3D3E8RotsO7lMHwgadAi6WIcDzQeyMZw+Dd2mdRFo6UST/0LXNgdo0HyLLAjYatCOb/3h9sz7uB+L24QncPNg0psyyaGzh3JdgjJ3HWpFok9nhKmui1GqCO5c9P0WKzFlOufUIFjxY0K/zHMg/X7f7UduF4F9kE5BNhD0yn7vk/WwEML/7vfFc3cBKU4U+WQ9GjjNa9u0bWRyTJWTSgIInRantUyjTf1Olv1QtXaCCMXfzeynJLcnFcvomDn+qdNAws/4uIG6TUW0=","attributes":{"enabled":true,"nbf":1593714583,"exp":1625251183,"created":1593715183,"updated":1593715183,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715168,"updated":1593715168}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  '03836fad-453c-41ff-b3b4-89178b055af6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:32 GMT',
  'Content-Length',
  '2784'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
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
  '3b8b78a7-bea7-4928-82c0-2a3fe14c887d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-1","deletedDate":1593715232,"scheduledPurgeDate":1601491232,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","x5t":"HPdfY1PNIONnREkInhe0ClRMkxE","cer":"MIIDKDCCAhCgAwIBAgIQKlixH+AdTkuhU0g9F4dtIDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyOTU5WhcNMjEwNzAyMTgzOTU5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGuwGtTgrYTdQUShM6jh1+byK2bOGVkLAjO4H+XIG9uYCGyqNkma/HAdJfLz1RgWCLzT906pj/zRA+jzbo5nHBR4csqRVzA4D6OYddz3qjR0MAiitP4IwphI5vbT5vw3AwrmW3ze94NwjzYr/LSfpK5qhFRFJ/9p2VsFXEiMaGErSktDvufbeM55IiLIbqdcBbtVESOHnGId8wZUlat+yE/WxD0GStMCq21NAJD/mQkGYCAQGd92v7WBMr8aTI1HhueQCrEDpeqwl+suosYTKVW+4/2RcvkIjF0SWcF2IaBM5Zht4gXMearBlQq3xlUg543sE6FZsIeYDylJJHKPVxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/3p8F22NQpWLH8HHaI7jEnyKd+jAdBgNVHQ4EFgQUv96fBdtjUKVix/Bx2iO4xJ8infowDQYJKoZIhvcNAQELBQADggEBAK9XjSHCqkt5z3Va4gZlQfmrB6Jpbu+SIWnqo4SwU2jPeG6oRd0GenH2VRseYQVY32dK+wobzTt7WGF8rNCqUQeQVmUcLar7hbIcBGObpc7CBbEmX6kaLsQ5OggF/N5NG8Uk/hevv1vB9JZcEnL1F5A8FXVR+Kk7EyXGPEeEQutCCZ7f92cQul7KheMHuEqX94dwNIkOvHun3qwqQfHJf3OI9S+dUG1362LEAtEmJcS2gQSth+pttVZnea8WQhO47tjuJq4Twmh/LdTdDYm91fsqfdLnDqi7kIJIz/ZuTo60L2FszGwuY9SSJ9WHU747rqKROL71/vtWxH9Z1Z1PAZU=","attributes":{"enabled":true,"nbf":1593714599,"exp":1625251199,"created":1593715199,"updated":1593715199,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715186,"updated":1593715186}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  '03ad24ba-95c7-4219-bd9e-c0b5d075290b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:32 GMT',
  'Content-Length',
  '2784'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a788bcbc-05f6-4e02-bddf-786f03363ca0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '904374c5-f83b-4ea5-be98-d161bfe9e75a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c9adfe80-6a5a-4782-8f6a-ccd6fbf7b9a2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4cb9380c-1e9c-4600-b23a-524099017b9b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'abae2a22-ac32-4c80-a3a4-66e045ab657b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '32ce40dd-aef0-4d35-8789-8b813c48946f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b0405e62-293c-4bea-9665-3bfbb5f8dd4b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bb1af15e-2d4a-4be8-b4de-02b6365089a2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-1","deletedDate":1593715232,"scheduledPurgeDate":1601491232,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/873cf123a4c94c08a8c4f1ae3f4423e2","x5t":"HPdfY1PNIONnREkInhe0ClRMkxE","cer":"MIIDKDCCAhCgAwIBAgIQKlixH+AdTkuhU0g9F4dtIDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyOTU5WhcNMjEwNzAyMTgzOTU5WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGuwGtTgrYTdQUShM6jh1+byK2bOGVkLAjO4H+XIG9uYCGyqNkma/HAdJfLz1RgWCLzT906pj/zRA+jzbo5nHBR4csqRVzA4D6OYddz3qjR0MAiitP4IwphI5vbT5vw3AwrmW3ze94NwjzYr/LSfpK5qhFRFJ/9p2VsFXEiMaGErSktDvufbeM55IiLIbqdcBbtVESOHnGId8wZUlat+yE/WxD0GStMCq21NAJD/mQkGYCAQGd92v7WBMr8aTI1HhueQCrEDpeqwl+suosYTKVW+4/2RcvkIjF0SWcF2IaBM5Zht4gXMearBlQq3xlUg543sE6FZsIeYDylJJHKPVxAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBS/3p8F22NQpWLH8HHaI7jEnyKd+jAdBgNVHQ4EFgQUv96fBdtjUKVix/Bx2iO4xJ8infowDQYJKoZIhvcNAQELBQADggEBAK9XjSHCqkt5z3Va4gZlQfmrB6Jpbu+SIWnqo4SwU2jPeG6oRd0GenH2VRseYQVY32dK+wobzTt7WGF8rNCqUQeQVmUcLar7hbIcBGObpc7CBbEmX6kaLsQ5OggF/N5NG8Uk/hevv1vB9JZcEnL1F5A8FXVR+Kk7EyXGPEeEQutCCZ7f92cQul7KheMHuEqX94dwNIkOvHun3qwqQfHJf3OI9S+dUG1362LEAtEmJcS2gQSth+pttVZnea8WQhO47tjuJq4Twmh/LdTdDYm91fsqfdLnDqi7kIJIz/ZuTo60L2FszGwuY9SSJ9WHU747rqKROL71/vtWxH9Z1Z1PAZU=","attributes":{"enabled":true,"nbf":1593714599,"exp":1625251199,"created":1593715199,"updated":1593715199,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715186,"updated":1593715186}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  'da60c21d-82b6-4b7f-bf47-809ee4956d0e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:46 GMT',
  'Content-Length',
  '2784'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
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
  'fa26d464-4c59-47d9-8574-8ce8100bca61',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:40:46 GMT'
]);
