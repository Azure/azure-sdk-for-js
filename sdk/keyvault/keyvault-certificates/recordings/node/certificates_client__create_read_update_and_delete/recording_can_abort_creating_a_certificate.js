let nock = require('nock');

module.exports.hash = "597135b0275ffe1ed317fa1b50b8f464";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canabortcreatingacertificate-/create')
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
  '7a6df183-8f82-4be8-b12e-aab600b333ed',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:53:33 GMT'
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
  'b08a1e6c-c485-4766-b9a0-e04f82f41d01',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ap1BRSAoxP5BiD54t9DojXU_aSJHAQAAAEyVhtYOAAAA; expires=Sat, 25-Jul-2020 12:53:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:53:33 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canabortcreatingacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqg2W0ZsKE76Eb4OXTSymjny7Si2KtB8qU5y2HmTs2gndhtBh7+7C0CLXmfonJxUEb/EqZmVrUlD/0qurtRuXGR23zm2ZyYCBW/3+1G6aa1Zr9Jd7ciBELV9V6gaUanML+4gAqiEYqpYQyGCZEk5EhrP/P88OI/rVc7Mx9svCrdg0nva56wnC1qEDh42WHmknRE49m/Qh+rL40ejPDZEDzqe35VhTJF89n0QZjQWAv3rygRUpi2sr9pEWpQZNVk4gX0EowrjgmQ+0EWbV1ssb97Ug6MTwCWvditVkQGtZfkxkFs6g7TpL1O1e95yidr+MESVOuGlFQKFKOniMAgYDfwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB/cqgTWcT2MrxU1yZxXOh3ypljJX1Z8KDLpwh1WE9FUs5ihLSct5lk1k3W5jM7ioy6dntM9bBlEAYqlooK+gKYD7PYz1PlZV4lMkE8mE7p8guSOiLHbqLddGh97YRSSaoIDnhT8WXi2gSS8dWwpR+cj+iIouTZjOm7wLCvyZcTA3dwm84erQ61EjbWYLgJuehR+BOOl+A3E5Vi5S0+OshAe0xQpopXjHGmKm8KkPOtoEDqYG7jSn9o6o1KvfYvYwFDmzWjGOg3m+tZSRxk39EuV7/t+Zd2CzfTqHdMqBVaq7wkYHoWVZnUePc1/6zsmsCzqLnMJqMAvr7kq4eNcr+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8c1d8d53c88948a08ad2f74b96be5ec7"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending?api-version=7.1-preview&request_id=8c1d8d53c88948a08ad2f74b96be5ec7',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '06eea3e2-f38a-4ec4-9502-b5f5c9c0d5ef',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:53:34 GMT',
  'Content-Length',
  '1342'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqg2W0ZsKE76Eb4OXTSymjny7Si2KtB8qU5y2HmTs2gndhtBh7+7C0CLXmfonJxUEb/EqZmVrUlD/0qurtRuXGR23zm2ZyYCBW/3+1G6aa1Zr9Jd7ciBELV9V6gaUanML+4gAqiEYqpYQyGCZEk5EhrP/P88OI/rVc7Mx9svCrdg0nva56wnC1qEDh42WHmknRE49m/Qh+rL40ejPDZEDzqe35VhTJF89n0QZjQWAv3rygRUpi2sr9pEWpQZNVk4gX0EowrjgmQ+0EWbV1ssb97Ug6MTwCWvditVkQGtZfkxkFs6g7TpL1O1e95yidr+MESVOuGlFQKFKOniMAgYDfwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAB/cqgTWcT2MrxU1yZxXOh3ypljJX1Z8KDLpwh1WE9FUs5ihLSct5lk1k3W5jM7ioy6dntM9bBlEAYqlooK+gKYD7PYz1PlZV4lMkE8mE7p8guSOiLHbqLddGh97YRSSaoIDnhT8WXi2gSS8dWwpR+cj+iIouTZjOm7wLCvyZcTA3dwm84erQ61EjbWYLgJuehR+BOOl+A3E5Vi5S0+OshAe0xQpopXjHGmKm8KkPOtoEDqYG7jSn9o6o1KvfYvYwFDmzWjGOg3m+tZSRxk39EuV7/t+Zd2CzfTqHdMqBVaq7wkYHoWVZnUePc1/6zsmsCzqLnMJqMAvr7kq4eNcr+k=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8c1d8d53c88948a08ad2f74b96be5ec7"}, [
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
  '5363eeb0-45e6-41bf-8bad-bb2a30ca2047',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 12:53:34 GMT',
  'Content-Length',
  '1342'
]);
