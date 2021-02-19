let nock = require('nock');

module.exports.hash = "be9b92feaacb6b5a267c72822d47cc24";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificateversion-/create')
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
  '93167547-5d07-42e3-bbe5-ee203ee413ce',
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
  'Tue, 16 Feb 2021 18:57:24 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
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
  '8368dd18-e1f8-4f78-bf3b-e1dc3667ea00',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDBwAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:57:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:57:25 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificateversion-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending?api-version=7.2&request_id=773fbaa7a452457ab2385044ad4b80ba',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2edc5120-25d7-49a1-9406-5d5f8e478101',
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
  'Tue, 16 Feb 2021 18:57:25 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  '133464fd-dfa4-4944-9e99-a906cbb22573',
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
  'Tue, 16 Feb 2021 18:57:25 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  '376ac18e-0b60-41e5-8430-9dc4791a3e2c',
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
  'Tue, 16 Feb 2021 18:57:25 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  '78470817-bce0-48e1-a9bf-0e435ded2b92',
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
  'Tue, 16 Feb 2021 18:57:27 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  '9b66e42e-60a0-42ea-ba4e-b70dbf388be3',
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
  'Tue, 16 Feb 2021 18:57:29 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  'dbe3962e-7e1b-4831-b52f-7b919249690c',
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
  'Tue, 16 Feb 2021 18:57:32 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  '57d95e6f-627d-4b63-b0e9-2d6d6b20dc6b',
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
  'Tue, 16 Feb 2021 18:57:34 GMT',
  'Content-Length',
  '1334'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs8ECm3gBR2VmN9IQHdShb7W8qJQQJdipIIZJxEQkvmz8h3a5+iAKGDt3IowfJkudrHRyFVW8Q1iFg5b3IBM41iuKt0s5wcyhz9K4cJO6gGVEXhDYn4pNYRBJvKcimxp2PWnXjlkZeDbevD7nWQ8M61ZlZ9DQHMBilGxP06KBxn2A//zHSl91uWBOMX34ZCdtqS8COuseJ7pq/gajWJ+UNC0i3YrT993tcPW/NdcY2akasQD+bM0s70ybE9RFUovDf+BgLzn9N3KYgxtENVnK1BSN1tME8jEIuZ6lZ45/0ByZU4vEv10jt9QRBQImQ3NuOcYbArFVZXoEL9X80Hj50QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABoAckxKhmtfB7vEzGc0QaTJpnu1JqkzAZXpkl3cOEahMyB0EsgbbZkbki+7FHzxO1l42ZILDou8ckzgsqeQezcfHnnXsLqYrNAZGMnYxQ7n82tzEZ9XvXl1461POqF1ix1ZIAcQXC85U887+iXxQI8djBo8KkoSAGZ9MjpWgNJCOW7y0XjAhZGnuhQHNQ8Uab0ypsglHRWp5cFjkxsaGhgWYxQq5NOn5JiwZ7Rkh57pNX06aBx7bYeXVbKZq2CPgSz6Pc64xnpYjHpOYrQboeQPTbybGfhtlgUMPW5uvVC6QSUfYeK2AAF+EdSyFCcTLLbDslq1IWGedw5J+CrzZmM=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-","request_id":"773fbaa7a452457ab2385044ad4b80ba"}, [
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
  '371175ea-fd8f-489a-bd4b-5c87d89f2942',
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
  'Tue, 16 Feb 2021 18:57:35 GMT',
  'Content-Length',
  '1295'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","x5t":"xQON5ydzG4k264z_AnnrKbTazH4","cer":"MIIDKDCCAhCgAwIBAgIQAMvFlk1YR9eiACV8UFb2PjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzM0WhcNMjIwMjE2MTg1NzM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzwQKbeAFHZWY30hAd1KFvtbyolBAl2KkghknERCS+bPyHdrn6IAoYO3cijB8mS52sdHIVVbxDWIWDlvcgEzjWK4q3SznBzKHP0rhwk7qAZUReENifik1hEEm8pyKbGnY9adeOWRl4Nt68PudZDwzrVmVn0NAcwGKUbE/TooHGfYD//MdKX3W5YE4xffhkJ22pLwI66x4numr+BqNYn5Q0LSLditP33e1w9b811xjZqRqxAP5szSzvTJsT1EVSi8N/4GAvOf03cpiDG0Q1WcrUFI3W0wTyMQi5nqVnjn/QHJlTi8S/XSO31BEFAiZDc245xhsCsVVlegQv1fzQePnRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtcPWpXTrPfeB5qo/Ln/8ia5tj+jAdBgNVHQ4EFgQU7XD1qV06z33geaqPy5//ImubY/owDQYJKoZIhvcNAQELBQADggEBAGqLTfQ1bULD7u219phd4amNGM+2Cq0rzAsYpF9mfdCQJAzN202CwaPu1q6W+kQaYpztrfrRkkueAr/FpAhO2CjBxDl/5AIgnM90sl867FCpFj6gU5eVXyCPG4fMG7F5YQOKDYPInIorW4Y8daTrKGeCnv2Q72Vj8TsiMppJ5j7GnnpArzLLueOuPOd5CxinrRBs66XWoYKftCtKnmLBR+YfClhACVf9uvAk+FUyXRiRSmnlJgaZPO5hGJffEEtLOZmQSfixnZVwTHKbpk9PskczKd8wCCEV3jVedHO52LF8ertFT/SjqkWvSSbblPIsmlBkw6HFtoQbKi+ro0V5Jek=","attributes":{"enabled":true,"nbf":1613501254,"exp":1645037854,"created":1613501854,"updated":1613501854,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501846,"updated":1613501846}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  '8070de96-8925-4dfb-bb80-33970cd4bfc9',
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
  'Tue, 16 Feb 2021 18:57:35 GMT',
  'Content-Length',
  '2569'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","x5t":"xQON5ydzG4k264z_AnnrKbTazH4","cer":"MIIDKDCCAhCgAwIBAgIQAMvFlk1YR9eiACV8UFb2PjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzM0WhcNMjIwMjE2MTg1NzM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzwQKbeAFHZWY30hAd1KFvtbyolBAl2KkghknERCS+bPyHdrn6IAoYO3cijB8mS52sdHIVVbxDWIWDlvcgEzjWK4q3SznBzKHP0rhwk7qAZUReENifik1hEEm8pyKbGnY9adeOWRl4Nt68PudZDwzrVmVn0NAcwGKUbE/TooHGfYD//MdKX3W5YE4xffhkJ22pLwI66x4numr+BqNYn5Q0LSLditP33e1w9b811xjZqRqxAP5szSzvTJsT1EVSi8N/4GAvOf03cpiDG0Q1WcrUFI3W0wTyMQi5nqVnjn/QHJlTi8S/XSO31BEFAiZDc245xhsCsVVlegQv1fzQePnRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtcPWpXTrPfeB5qo/Ln/8ia5tj+jAdBgNVHQ4EFgQU7XD1qV06z33geaqPy5//ImubY/owDQYJKoZIhvcNAQELBQADggEBAGqLTfQ1bULD7u219phd4amNGM+2Cq0rzAsYpF9mfdCQJAzN202CwaPu1q6W+kQaYpztrfrRkkueAr/FpAhO2CjBxDl/5AIgnM90sl867FCpFj6gU5eVXyCPG4fMG7F5YQOKDYPInIorW4Y8daTrKGeCnv2Q72Vj8TsiMppJ5j7GnnpArzLLueOuPOd5CxinrRBs66XWoYKftCtKnmLBR+YfClhACVf9uvAk+FUyXRiRSmnlJgaZPO5hGJffEEtLOZmQSfixnZVwTHKbpk9PskczKd8wCCEV3jVedHO52LF8ertFT/SjqkWvSSbblPIsmlBkw6HFtoQbKi+ro0V5Jek=","attributes":{"enabled":false,"nbf":1613501254,"exp":1645037854,"created":1613501854,"updated":1613501856,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'd639abbe-997e-48dc-a13f-8643e7c6cef3',
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
  'Tue, 16 Feb 2021 18:57:36 GMT',
  'Content-Length',
  '1903'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","x5t":"xQON5ydzG4k264z_AnnrKbTazH4","cer":"MIIDKDCCAhCgAwIBAgIQAMvFlk1YR9eiACV8UFb2PjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzM0WhcNMjIwMjE2MTg1NzM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzwQKbeAFHZWY30hAd1KFvtbyolBAl2KkghknERCS+bPyHdrn6IAoYO3cijB8mS52sdHIVVbxDWIWDlvcgEzjWK4q3SznBzKHP0rhwk7qAZUReENifik1hEEm8pyKbGnY9adeOWRl4Nt68PudZDwzrVmVn0NAcwGKUbE/TooHGfYD//MdKX3W5YE4xffhkJ22pLwI66x4numr+BqNYn5Q0LSLditP33e1w9b811xjZqRqxAP5szSzvTJsT1EVSi8N/4GAvOf03cpiDG0Q1WcrUFI3W0wTyMQi5nqVnjn/QHJlTi8S/XSO31BEFAiZDc245xhsCsVVlegQv1fzQePnRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtcPWpXTrPfeB5qo/Ln/8ia5tj+jAdBgNVHQ4EFgQU7XD1qV06z33geaqPy5//ImubY/owDQYJKoZIhvcNAQELBQADggEBAGqLTfQ1bULD7u219phd4amNGM+2Cq0rzAsYpF9mfdCQJAzN202CwaPu1q6W+kQaYpztrfrRkkueAr/FpAhO2CjBxDl/5AIgnM90sl867FCpFj6gU5eVXyCPG4fMG7F5YQOKDYPInIorW4Y8daTrKGeCnv2Q72Vj8TsiMppJ5j7GnnpArzLLueOuPOd5CxinrRBs66XWoYKftCtKnmLBR+YfClhACVf9uvAk+FUyXRiRSmnlJgaZPO5hGJffEEtLOZmQSfixnZVwTHKbpk9PskczKd8wCCEV3jVedHO52LF8ertFT/SjqkWvSSbblPIsmlBkw6HFtoQbKi+ro0V5Jek=","attributes":{"enabled":false,"nbf":1613501254,"exp":1645037854,"created":1613501854,"updated":1613501856,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"subject":"CN=MyCert","issuer":"CN=MyCert","sans":{},"serialnumber":"00CBC5964D5847D7A200257C5056F63E"}, [
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
  '0392d288-b592-4df2-bcad-42cc432b386d',
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
  'Tue, 16 Feb 2021 18:57:36 GMT',
  'Content-Length',
  '1864'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-","deletedDate":1613501856,"scheduledPurgeDate":1614106656,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","x5t":"xQON5ydzG4k264z_AnnrKbTazH4","cer":"MIIDKDCCAhCgAwIBAgIQAMvFlk1YR9eiACV8UFb2PjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzM0WhcNMjIwMjE2MTg1NzM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzwQKbeAFHZWY30hAd1KFvtbyolBAl2KkghknERCS+bPyHdrn6IAoYO3cijB8mS52sdHIVVbxDWIWDlvcgEzjWK4q3SznBzKHP0rhwk7qAZUReENifik1hEEm8pyKbGnY9adeOWRl4Nt68PudZDwzrVmVn0NAcwGKUbE/TooHGfYD//MdKX3W5YE4xffhkJ22pLwI66x4numr+BqNYn5Q0LSLditP33e1w9b811xjZqRqxAP5szSzvTJsT1EVSi8N/4GAvOf03cpiDG0Q1WcrUFI3W0wTyMQi5nqVnjn/QHJlTi8S/XSO31BEFAiZDc245xhsCsVVlegQv1fzQePnRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtcPWpXTrPfeB5qo/Ln/8ia5tj+jAdBgNVHQ4EFgQU7XD1qV06z33geaqPy5//ImubY/owDQYJKoZIhvcNAQELBQADggEBAGqLTfQ1bULD7u219phd4amNGM+2Cq0rzAsYpF9mfdCQJAzN202CwaPu1q6W+kQaYpztrfrRkkueAr/FpAhO2CjBxDl/5AIgnM90sl867FCpFj6gU5eVXyCPG4fMG7F5YQOKDYPInIorW4Y8daTrKGeCnv2Q72Vj8TsiMppJ5j7GnnpArzLLueOuPOd5CxinrRBs66XWoYKftCtKnmLBR+YfClhACVf9uvAk+FUyXRiRSmnlJgaZPO5hGJffEEtLOZmQSfixnZVwTHKbpk9PskczKd8wCCEV3jVedHO52LF8ertFT/SjqkWvSSbblPIsmlBkw6HFtoQbKi+ro0V5Jek=","attributes":{"enabled":false,"nbf":1613501254,"exp":1645037854,"created":1613501854,"updated":1613501856,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501846,"updated":1613501846}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'f7acb8f4-be07-4ff4-92c3-c5520665f32a',
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
  'Tue, 16 Feb 2021 18:57:36 GMT',
  'Content-Length',
  '2764'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '23a5a245-0f69-45aa-9712-a19cf20a1b34',
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
  'Tue, 16 Feb 2021 18:57:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5d03331d-1526-4aad-871b-4422451b5e22',
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
  'Tue, 16 Feb 2021 18:57:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6fae33f4-d179-49f4-9685-8b71f0169f17',
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
  'Tue, 16 Feb 2021 18:57:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b8d173f4-f857-4fde-95b2-5642320923d6',
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
  'Tue, 16 Feb 2021 18:57:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '6bdaf866-5b88-4f2b-8005-76ef7be4d67f',
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
  'Tue, 16 Feb 2021 18:57:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-","deletedDate":1613501856,"scheduledPurgeDate":1614106656,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/b4014c1518c54ac5b39f70b981d41184","x5t":"xQON5ydzG4k264z_AnnrKbTazH4","cer":"MIIDKDCCAhCgAwIBAgIQAMvFlk1YR9eiACV8UFb2PjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzM0WhcNMjIwMjE2MTg1NzM0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzwQKbeAFHZWY30hAd1KFvtbyolBAl2KkghknERCS+bPyHdrn6IAoYO3cijB8mS52sdHIVVbxDWIWDlvcgEzjWK4q3SznBzKHP0rhwk7qAZUReENifik1hEEm8pyKbGnY9adeOWRl4Nt68PudZDwzrVmVn0NAcwGKUbE/TooHGfYD//MdKX3W5YE4xffhkJ22pLwI66x4numr+BqNYn5Q0LSLditP33e1w9b811xjZqRqxAP5szSzvTJsT1EVSi8N/4GAvOf03cpiDG0Q1WcrUFI3W0wTyMQi5nqVnjn/QHJlTi8S/XSO31BEFAiZDc245xhsCsVVlegQv1fzQePnRAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTtcPWpXTrPfeB5qo/Ln/8ia5tj+jAdBgNVHQ4EFgQU7XD1qV06z33geaqPy5//ImubY/owDQYJKoZIhvcNAQELBQADggEBAGqLTfQ1bULD7u219phd4amNGM+2Cq0rzAsYpF9mfdCQJAzN202CwaPu1q6W+kQaYpztrfrRkkueAr/FpAhO2CjBxDl/5AIgnM90sl867FCpFj6gU5eVXyCPG4fMG7F5YQOKDYPInIorW4Y8daTrKGeCnv2Q72Vj8TsiMppJ5j7GnnpArzLLueOuPOd5CxinrRBs66XWoYKftCtKnmLBR+YfClhACVf9uvAk+FUyXRiRSmnlJgaZPO5hGJffEEtLOZmQSfixnZVwTHKbpk9PskczKd8wCCEV3jVedHO52LF8ertFT/SjqkWvSSbblPIsmlBkw6HFtoQbKi+ro0V5Jek=","attributes":{"enabled":false,"nbf":1613501254,"exp":1645037854,"created":1613501854,"updated":1613501856,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501846,"updated":1613501846}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'c19e5a3b-16d9-4420-8837-bd2de4770d18',
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
  'Tue, 16 Feb 2021 18:57:44 GMT',
  'Content-Length',
  '2764'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
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
  '35c957fb-3965-4fd0-819f-aa4def7ebb8b',
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
  'Tue, 16 Feb 2021 18:57:45 GMT'
]);
