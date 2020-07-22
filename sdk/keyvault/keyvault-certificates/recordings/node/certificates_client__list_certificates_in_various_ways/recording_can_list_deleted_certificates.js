let nock = require('nock');

module.exports.hash = "5980c9c73aaf3d2b7eef3a7232e94fba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-0/create')
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
  'b65c08a5-4bd8-44f7-ae69-973b4bcc23f0',
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
  'Thu, 02 Jul 2020 18:38:07 GMT'
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
  '0a15349b-cc41-4681-9c3d-26bc74d05500',
  'x-ms-ests-server',
  '2.1.10761.15 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArzegKO5qUBGlihV-tHiESs_aSJHAQAAAI8gkNYOAAAA; expires=Sat, 01-Aug-2020 18:38:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:38:07 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending?api-version=7.1-preview&request_id=2f1ebc1b9e8c4514a8b2445a9a7f6423',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'abdaae0a-4829-4fd5-9c83-a6d027a676f8',
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
  'Thu, 02 Jul 2020 18:38:08 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '9f5fad99-85cd-45a6-bb3c-02a3b51531a1',
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
  'Thu, 02 Jul 2020 18:38:08 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '17addaf8-02f3-4749-ba45-abe8f0be2baf',
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
  'Thu, 02 Jul 2020 18:38:08 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '7f1814a4-22b3-4ca1-a92f-b1e05b747959',
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
  'Thu, 02 Jul 2020 18:38:10 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '38540cd9-198c-4147-b171-f8d139e514a7',
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
  'Thu, 02 Jul 2020 18:38:12 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '27a715f3-fd15-41b0-9e90-a2d2e2aee853',
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
  'Thu, 02 Jul 2020 18:38:15 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '14d5cc61-9c21-4035-9465-75b42647b781',
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
  'Thu, 02 Jul 2020 18:38:17 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  'f1695668-070e-4c1c-a2b6-af67f664925a',
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
  'Thu, 02 Jul 2020 18:38:19 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '53b471e6-804e-41c6-980b-208893229b06',
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
  'Thu, 02 Jul 2020 18:38:21 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '5288001a-6aa6-458f-85d5-bdeec73b2ab4',
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
  'Thu, 02 Jul 2020 18:38:23 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '0266ad71-7173-402b-a7a1-bbdd5b66be71',
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
  'Thu, 02 Jul 2020 18:38:24 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '7eb980ef-41c7-4917-9c80-3bdee31e2407',
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
  'Thu, 02 Jul 2020 18:38:26 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAze3vSRmVUoFamxCLJqBpU7SbiuOy3OH1OYfMq5znSg+JSnRt2v3K1f2WG0EO7gkU4KRmpvKgDGmK3LJarWcm4luZRVj9912ucPpgcrx4vEMBNo1PK+MW++MCznBRCi9HwQ7VZq3DhuRRAUpu4I+DDRu+8d69uUN3DyWDcjs6lQPddqkAX9+bmYYRjnkX+VST9epUYRqB04jq+s8a/O3tbymwVXuQyg0ciyET5TXDWBIA+9QEiUCZCa3Pf/dgjcgSGrVu1pEUmm4Uh8GwCcX4Aw41BM0eAvE9ewLZQuaw225IBft6PtGcOtL8F6BLuIpRVu1PCF26kMlCs2gZkg3Z5wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAK+S6LUZf1p+cXerGzoIPyvgZOILzUD2WWl2WNGWno5n9Uj1JpVhOadUw8+Baj2yzvppnris3beZeI8RpxG2yH+nYt5q/q0axA0mNEVZZYEkE3m/zIHyrd9/z0RtBwLBCgUMlesxYHIHnJDLJ7hwm+7gYBv7VL0U8I9OUPIup77QlHjRfquNvpRF5izwlnv6zLKlk6YrDuYfUNCashZBQlWeF8+p/nlJjuket4iSRjJrYzyJ1GmVaSt+IpV6FCtqC9rh9r8bK7q/uxZs3P8TudyffB0ciLw65cbgJEru0MPWcfoDcLvomop2bThfEt8OwPoYhS+4ayA5pSQ7QnDTpBU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0","request_id":"2f1ebc1b9e8c4514a8b2445a9a7f6423"}, [
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
  '2eef570b-7f95-4ded-9a51-1acf329054c1',
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
  'Thu, 02 Jul 2020 18:38:28 GMT',
  'Content-Length',
  '1307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","x5t":"9SUQIDnt1IY1yiuMqJaByqgPp5Q","cer":"MIIDKDCCAhCgAwIBAgIQJJjwHUDYTiS+NkoH6MVHEzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyODI4WhcNMjEwNzAyMTgzODI4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN7e9JGZVSgVqbEIsmoGlTtJuK47Lc4fU5h8yrnOdKD4lKdG3a/crV/ZYbQQ7uCRTgpGam8qAMaYrcslqtZybiW5lFWP33Xa5w+mByvHi8QwE2jU8r4xb74wLOcFEKL0fBDtVmrcOG5FEBSm7gj4MNG77x3r25Q3cPJYNyOzqVA912qQBf35uZhhGOeRf5VJP16lRhGoHTiOr6zxr87e1vKbBVe5DKDRyLIRPlNcNYEgD71ASJQJkJrc9/92CNyBIatW7WkRSabhSHwbAJxfgDDjUEzR4C8T17AtlC5rDbbkgF+3o+0Zw60vwXoEu4ilFW7U8IXbqQyUKzaBmSDdnnAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSNii+x4zQMscNwNhWbqZGUESWr9jAdBgNVHQ4EFgQUjYovseM0DLHDcDYVm6mRlBElq/YwDQYJKoZIhvcNAQELBQADggEBAAWyJ9PFQqUiPs5eIkL2V5w5t4D3EeUrl3B+Qsyi0gOjwj45oRaqc7Odi/hhi4scteVpWjoxTBoPTUR0Yngwjc+8UoP3M4QaO7UOvMs9upZZY3dIG3ac/il6aEfwCoCAQilVglEncAf44uu0pSEMQzCldNlX28nPRjelTLMLDYmUlEFD07iuOSGTtouBrHdCcvfjLMiFAsF5nXgCZgPVou3vWQvUSs2xOSqYiZSWEaF0nvxBrGU/lis5ZpthA5gL/PJEi3gm32d26cjnP6araye0N0fbcUbAjmLUWgvTJ20SVy3pHMr8Paf9yntlQ7C11N2C+Za5FjsC2zBGymRJHkI=","attributes":{"enabled":true,"nbf":1593714508,"exp":1625251108,"created":1593715108,"updated":1593715108,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715088,"updated":1593715088}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '96c98d78-003c-4bdb-9195-339be93d9980',
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
  'Thu, 02 Jul 2020 18:38:28 GMT',
  'Content-Length',
  '2590'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistdeletedcertificates-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending?api-version=7.1-preview&request_id=5c4f0be66962434f920e74f9916578b0',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '72880a7b-f126-42c8-a407-6cccc89a29bc',
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
  'Thu, 02 Jul 2020 18:38:29 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '760a0312-2d17-4dfc-82dd-41943eafc893',
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
  'Thu, 02 Jul 2020 18:38:29 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  'f782e57a-b8fa-4dd9-a442-132136d66b94',
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
  'Thu, 02 Jul 2020 18:38:29 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '6231bd2b-f1fa-4872-9b0d-e403d1dd41f1',
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
  'Thu, 02 Jul 2020 18:38:31 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '199646a7-3340-4661-889c-19faac0ecbbc',
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
  'Thu, 02 Jul 2020 18:38:34 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '550f7bb5-32aa-4acf-bb36-f94934cc8ee1',
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
  'Thu, 02 Jul 2020 18:38:36 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  'e14b6a5a-d490-4eff-90a9-3968b1f05028',
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
  'Thu, 02 Jul 2020 18:38:38 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  'adac09dc-bd18-4364-b787-fad14d3c8c03',
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
  'Thu, 02 Jul 2020 18:38:40 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '84366a28-af24-4f52-ba29-770a74c0db2d',
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
  'Thu, 02 Jul 2020 18:38:42 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '509c2994-ac1c-4daf-899e-3fc8066e2899',
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
  'Thu, 02 Jul 2020 18:38:44 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '0dfa6867-ff13-4cb2-b076-740eeea5697d',
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
  'Thu, 02 Jul 2020 18:38:46 GMT',
  'Content-Length',
  '1340'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqeOz+85bIeq/Ceiy00t0JCEPx6Ugl/FdRRqv+V4v4nMjD+2uasi8TQGJsqsGzyNUn+T/jtRCwkDXG8YTYHcHXn4SD8KwMb3+zAPubHyJm5QKRbRDUfc/BHy6ZXxXL6Mm8OquKHyMiayPXPHd//6u9p1Mu4k+4WGvM9PSzNVmjVohaKC1JNzy4XwtSCEFHY3ejJ0KommIKJ1WvoQZAnCcG4RuAKF+/RO7ISfC+dmdf28zKx886+zURaCtrJ0mY5lzx2yA8mpHwMTlX9rd7FIUhBspF+5Nv7qheae4vsOankCbNTc4s6CzUmOJ592m2tRdV9zhxwBf+lO86JqlYbl7HwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAEoh0NFwWJaTkKj6IhwJ+bmFPSZomdQxAKHTaZPJnwL+EqCHHTx/ShOJpUv7eCJBKJEXKSsgtL7KuHzmpqou3uZjOwYyysjuF6bckccR5IytOQSUBzq79ibK5TEvI/5iSiEd/8a6MHAV3m68phAzpRRRsn2Wq17XATDDbkPTpsGdChA+1ZX/UNfdXi4xlZJYQSv4IRvgZ4puJxKX2DWX1cR7a+dS9YSGk9QtAEndVbt2DjHtGg/oObM4EkBQqnSCgh46x2LUYBzqyeos2speK4D1Ej6W6YB6r6lPj098ZP2yvtuqYVJqB0fD+WV0NaJupy4o4NfCwn0qy48IWcDWoOk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1","request_id":"5c4f0be66962434f920e74f9916578b0"}, [
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
  '65e2f77b-0dce-4555-8abf-7bfaa9880902',
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
  'Thu, 02 Jul 2020 18:38:47 GMT',
  'Content-Length',
  '1307'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistdeletedcertificates-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","x5t":"6ek0CCdH0bgOND--zrB5-RLTuNY","cer":"MIIDKDCCAhCgAwIBAgIQORf0l675RcGjU5hUuV8a3zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyODQ2WhcNMjEwNzAyMTgzODQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCp47P7zlsh6r8J6LLTS3QkIQ/HpSCX8V1FGq/5Xi/icyMP7a5qyLxNAYmyqwbPI1Sf5P+O1ELCQNcbxhNgdwdefhIPwrAxvf7MA+5sfImblApFtENR9z8EfLplfFcvoybw6q4ofIyJrI9c8d3//q72nUy7iT7hYa8z09LM1WaNWiFooLUk3PLhfC1IIQUdjd6MnQqiaYgonVa+hBkCcJwbhG4AoX79E7shJ8L52Z1/bzMrHzzr7NRFoK2snSZjmXPHbIDyakfAxOVf2t3sUhSEGykX7k2/uqF5p7i+w5qeQJs1NzizoLNSY4nn3aba1F1X3OHHAF/6U7zomqVhuXsfAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRfuOh3NttFH18bh7Io+iDQsvm/qTAdBgNVHQ4EFgQUX7jodzbbRR9fG4eyKPog0LL5v6kwDQYJKoZIhvcNAQELBQADggEBAFDL++nrOzm3l0padpphiY6TgKuuw5mIFNYNcXJEU/X6ZF8Ynun80EM2lGaT9i5EJfoXVst96JbS+fgQhYixOT1QadtstvWSnq1gUSh1hjYRHsdjBAoqXhG6v+PhovNaLy1J5UBQSiNy2fXnk97x6EFwZvaYl0ln424nvm/fPtfCzdmf1DaBdV52R3uNu+zjXr0+eLOwZzrQQH5djfV5To5dorh9RJ1jRXCGrVCno5sEHcTqYxYNSLTT3HDcvCoFP2pjhn9gMQGNuJ+bWwPbOCGgzm6yblcMMNwICxAaKhEukXwz0MAgAvl+Y8L3agUjOmYw25wK2UROefgVXgvDR78=","attributes":{"enabled":true,"nbf":1593714526,"exp":1625251126,"created":1593715126,"updated":1593715126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715110,"updated":1593715110}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  'a86a375f-0619-432d-8cad-0b19db2a1aef',
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
  'Thu, 02 Jul 2020 18:38:48 GMT',
  'Content-Length',
  '2590'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1593715128,"scheduledPurgeDate":1601491128,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","x5t":"9SUQIDnt1IY1yiuMqJaByqgPp5Q","cer":"MIIDKDCCAhCgAwIBAgIQJJjwHUDYTiS+NkoH6MVHEzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyODI4WhcNMjEwNzAyMTgzODI4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN7e9JGZVSgVqbEIsmoGlTtJuK47Lc4fU5h8yrnOdKD4lKdG3a/crV/ZYbQQ7uCRTgpGam8qAMaYrcslqtZybiW5lFWP33Xa5w+mByvHi8QwE2jU8r4xb74wLOcFEKL0fBDtVmrcOG5FEBSm7gj4MNG77x3r25Q3cPJYNyOzqVA912qQBf35uZhhGOeRf5VJP16lRhGoHTiOr6zxr87e1vKbBVe5DKDRyLIRPlNcNYEgD71ASJQJkJrc9/92CNyBIatW7WkRSabhSHwbAJxfgDDjUEzR4C8T17AtlC5rDbbkgF+3o+0Zw60vwXoEu4ilFW7U8IXbqQyUKzaBmSDdnnAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSNii+x4zQMscNwNhWbqZGUESWr9jAdBgNVHQ4EFgQUjYovseM0DLHDcDYVm6mRlBElq/YwDQYJKoZIhvcNAQELBQADggEBAAWyJ9PFQqUiPs5eIkL2V5w5t4D3EeUrl3B+Qsyi0gOjwj45oRaqc7Odi/hhi4scteVpWjoxTBoPTUR0Yngwjc+8UoP3M4QaO7UOvMs9upZZY3dIG3ac/il6aEfwCoCAQilVglEncAf44uu0pSEMQzCldNlX28nPRjelTLMLDYmUlEFD07iuOSGTtouBrHdCcvfjLMiFAsF5nXgCZgPVou3vWQvUSs2xOSqYiZSWEaF0nvxBrGU/lis5ZpthA5gL/PJEi3gm32d26cjnP6araye0N0fbcUbAjmLUWgvTJ20SVy3pHMr8Paf9yntlQ7C11N2C+Za5FjsC2zBGymRJHkI=","attributes":{"enabled":true,"nbf":1593714508,"exp":1625251108,"created":1593715108,"updated":1593715108,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715088,"updated":1593715088}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '32fc72f6-211a-432d-b0bc-952c50aa120c',
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
  'Thu, 02 Jul 2020 18:38:48 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8e4439d3-82e7-4336-92d1-5e8c2a92d90a',
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
  'Thu, 02 Jul 2020 18:38:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cca42ec6-4dd1-4bc8-94d3-491d3233c484',
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
  'Thu, 02 Jul 2020 18:38:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e075e7c0-2f43-4ead-a8cf-3354a41e4ca3',
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
  'Thu, 02 Jul 2020 18:38:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7ae02015-2cf8-4a69-bc8e-f6848c26253f',
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
  'Thu, 02 Jul 2020 18:38:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d467d16-754d-4a9d-9a0b-6ed0e604cf97',
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
  'Thu, 02 Jul 2020 18:38:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6fe2efb2-863b-426a-89c0-6ff79f67eb92',
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
  'Thu, 02 Jul 2020 18:38:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0b22419f-d700-49bd-9cc9-856d4cdce228',
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
  'Thu, 02 Jul 2020 18:38:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b38ad1f9-ab52-4f19-b4ad-1e0c9b50477f',
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
  'Thu, 02 Jul 2020 18:39:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1593715128,"scheduledPurgeDate":1601491128,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-0/bcbd0f68412744518b1b34131753d78c","x5t":"9SUQIDnt1IY1yiuMqJaByqgPp5Q","cer":"MIIDKDCCAhCgAwIBAgIQJJjwHUDYTiS+NkoH6MVHEzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyODI4WhcNMjEwNzAyMTgzODI4WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN7e9JGZVSgVqbEIsmoGlTtJuK47Lc4fU5h8yrnOdKD4lKdG3a/crV/ZYbQQ7uCRTgpGam8qAMaYrcslqtZybiW5lFWP33Xa5w+mByvHi8QwE2jU8r4xb74wLOcFEKL0fBDtVmrcOG5FEBSm7gj4MNG77x3r25Q3cPJYNyOzqVA912qQBf35uZhhGOeRf5VJP16lRhGoHTiOr6zxr87e1vKbBVe5DKDRyLIRPlNcNYEgD71ASJQJkJrc9/92CNyBIatW7WkRSabhSHwbAJxfgDDjUEzR4C8T17AtlC5rDbbkgF+3o+0Zw60vwXoEu4ilFW7U8IXbqQyUKzaBmSDdnnAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSNii+x4zQMscNwNhWbqZGUESWr9jAdBgNVHQ4EFgQUjYovseM0DLHDcDYVm6mRlBElq/YwDQYJKoZIhvcNAQELBQADggEBAAWyJ9PFQqUiPs5eIkL2V5w5t4D3EeUrl3B+Qsyi0gOjwj45oRaqc7Odi/hhi4scteVpWjoxTBoPTUR0Yngwjc+8UoP3M4QaO7UOvMs9upZZY3dIG3ac/il6aEfwCoCAQilVglEncAf44uu0pSEMQzCldNlX28nPRjelTLMLDYmUlEFD07iuOSGTtouBrHdCcvfjLMiFAsF5nXgCZgPVou3vWQvUSs2xOSqYiZSWEaF0nvxBrGU/lis5ZpthA5gL/PJEi3gm32d26cjnP6araye0N0fbcUbAjmLUWgvTJ20SVy3pHMr8Paf9yntlQ7C11N2C+Za5FjsC2zBGymRJHkI=","attributes":{"enabled":true,"nbf":1593714508,"exp":1625251108,"created":1593715108,"updated":1593715108,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715088,"updated":1593715088}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0/pending"}}, [
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
  '92195523-bb83-4c5a-baa0-505bded1baf8',
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
  'Thu, 02 Jul 2020 18:39:03 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1593715143,"scheduledPurgeDate":1601491143,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","x5t":"6ek0CCdH0bgOND--zrB5-RLTuNY","cer":"MIIDKDCCAhCgAwIBAgIQORf0l675RcGjU5hUuV8a3zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyODQ2WhcNMjEwNzAyMTgzODQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCp47P7zlsh6r8J6LLTS3QkIQ/HpSCX8V1FGq/5Xi/icyMP7a5qyLxNAYmyqwbPI1Sf5P+O1ELCQNcbxhNgdwdefhIPwrAxvf7MA+5sfImblApFtENR9z8EfLplfFcvoybw6q4ofIyJrI9c8d3//q72nUy7iT7hYa8z09LM1WaNWiFooLUk3PLhfC1IIQUdjd6MnQqiaYgonVa+hBkCcJwbhG4AoX79E7shJ8L52Z1/bzMrHzzr7NRFoK2snSZjmXPHbIDyakfAxOVf2t3sUhSEGykX7k2/uqF5p7i+w5qeQJs1NzizoLNSY4nn3aba1F1X3OHHAF/6U7zomqVhuXsfAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRfuOh3NttFH18bh7Io+iDQsvm/qTAdBgNVHQ4EFgQUX7jodzbbRR9fG4eyKPog0LL5v6kwDQYJKoZIhvcNAQELBQADggEBAFDL++nrOzm3l0padpphiY6TgKuuw5mIFNYNcXJEU/X6ZF8Ynun80EM2lGaT9i5EJfoXVst96JbS+fgQhYixOT1QadtstvWSnq1gUSh1hjYRHsdjBAoqXhG6v+PhovNaLy1J5UBQSiNy2fXnk97x6EFwZvaYl0ln424nvm/fPtfCzdmf1DaBdV52R3uNu+zjXr0+eLOwZzrQQH5djfV5To5dorh9RJ1jRXCGrVCno5sEHcTqYxYNSLTT3HDcvCoFP2pjhn9gMQGNuJ+bWwPbOCGgzm6yblcMMNwICxAaKhEukXwz0MAgAvl+Y8L3agUjOmYw25wK2UROefgVXgvDR78=","attributes":{"enabled":true,"nbf":1593714526,"exp":1625251126,"created":1593715126,"updated":1593715126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715110,"updated":1593715110}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  '2fa22001-553d-430e-bbee-5aee6689fb0a',
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
  'Thu, 02 Jul 2020 18:39:03 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'db9027a9-f4d1-4387-88e8-927f65311a22',
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
  'Thu, 02 Jul 2020 18:39:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '950dee46-c49c-463c-9cac-46670d0824e4',
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
  'Thu, 02 Jul 2020 18:39:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1b7fe832-b101-4f86-8ee3-894e7877b64f',
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
  'Thu, 02 Jul 2020 18:39:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f77fb4d8-26f1-4e1f-a79e-54254233cd9b',
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
  'Thu, 02 Jul 2020 18:39:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f7d4f48a-5029-4cfd-a440-1f20f3ad043c',
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
  'Thu, 02 Jul 2020 18:39:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b94fb576-3fd0-4530-b0cb-a554a813afe1',
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
  'Thu, 02 Jul 2020 18:39:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bbeebde2-709e-4ffd-8fff-216d113bc3a9',
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
  'Thu, 02 Jul 2020 18:39:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0807c163-094a-41a7-9695-8cfe961eb0f3',
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
  'Thu, 02 Jul 2020 18:39:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a35bf209-ed8f-4dda-b0b2-99e201f63143',
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
  'Thu, 02 Jul 2020 18:39:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '02263a3a-39df-4102-bf4b-4413c559955d',
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
  'Thu, 02 Jul 2020 18:39:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'bf0c51d5-12d7-42a1-9588-4e8b4f3b1589',
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
  'Thu, 02 Jul 2020 18:39:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistdeletedcertificates-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ee15a76a-cc76-47c9-9a56-ee7c9c072aee',
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
  'Thu, 02 Jul 2020 18:39:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1593715143,"scheduledPurgeDate":1601491143,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistdeletedcertificates-1/7b623317bd2d46e39c1ac45dc1d160be","x5t":"6ek0CCdH0bgOND--zrB5-RLTuNY","cer":"MIIDKDCCAhCgAwIBAgIQORf0l675RcGjU5hUuV8a3zANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgyODQ2WhcNMjEwNzAyMTgzODQ2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCp47P7zlsh6r8J6LLTS3QkIQ/HpSCX8V1FGq/5Xi/icyMP7a5qyLxNAYmyqwbPI1Sf5P+O1ELCQNcbxhNgdwdefhIPwrAxvf7MA+5sfImblApFtENR9z8EfLplfFcvoybw6q4ofIyJrI9c8d3//q72nUy7iT7hYa8z09LM1WaNWiFooLUk3PLhfC1IIQUdjd6MnQqiaYgonVa+hBkCcJwbhG4AoX79E7shJ8L52Z1/bzMrHzzr7NRFoK2snSZjmXPHbIDyakfAxOVf2t3sUhSEGykX7k2/uqF5p7i+w5qeQJs1NzizoLNSY4nn3aba1F1X3OHHAF/6U7zomqVhuXsfAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRfuOh3NttFH18bh7Io+iDQsvm/qTAdBgNVHQ4EFgQUX7jodzbbRR9fG4eyKPog0LL5v6kwDQYJKoZIhvcNAQELBQADggEBAFDL++nrOzm3l0padpphiY6TgKuuw5mIFNYNcXJEU/X6ZF8Ynun80EM2lGaT9i5EJfoXVst96JbS+fgQhYixOT1QadtstvWSnq1gUSh1hjYRHsdjBAoqXhG6v+PhovNaLy1J5UBQSiNy2fXnk97x6EFwZvaYl0ln424nvm/fPtfCzdmf1DaBdV52R3uNu+zjXr0+eLOwZzrQQH5djfV5To5dorh9RJ1jRXCGrVCno5sEHcTqYxYNSLTT3HDcvCoFP2pjhn9gMQGNuJ+bWwPbOCGgzm6yblcMMNwICxAaKhEukXwz0MAgAvl+Y8L3agUjOmYw25wK2UROefgVXgvDR78=","attributes":{"enabled":true,"nbf":1593714526,"exp":1625251126,"created":1593715126,"updated":1593715126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715110,"updated":1593715110}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1/pending"}}, [
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
  '5689d9a0-716e-401b-90a2-0c701836e649',
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
  'Thu, 02 Jul 2020 18:39:26 GMT',
  'Content-Length',
  '2790'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-0","deletedDate":1593715128,"scheduledPurgeDate":1601491128,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-0","x5t":"9SUQIDnt1IY1yiuMqJaByqgPp5Q","attributes":{"enabled":true,"nbf":1593714508,"exp":1625251108,"created":1593715108,"updated":1593715108,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}},{"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistdeletedcertificates-1","deletedDate":1593715143,"scheduledPurgeDate":1601491143,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistdeletedcertificates-1","x5t":"6ek0CCdH0bgOND--zrB5-RLTuNY","attributes":{"enabled":true,"nbf":1593714526,"exp":1625251126,"created":1593715126,"updated":1593715126,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}],"nextLink":null}, [
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
  '99b980e8-66a5-4106-ba29-6176bbf35b2a',
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
  'Thu, 02 Jul 2020 18:39:26 GMT',
  'Content-Length',
  '1093'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-0')
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
  '447cfc39-b536-4de0-8fd2-a877748c88dc',
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

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/listCertificateName-canlistdeletedcertificates-1')
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
  '4896c14b-6434-433e-a054-66e351aca01f',
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
