let nock = require('nock');

module.exports.hash = "86e97322b2e8f4d38e68fd863edf8d02";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
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
  '88fe6d5c-eb24-463b-b70c-79897dacae82',
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
  'Tue, 16 Feb 2021 18:59:55 GMT'
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
  '75c5fe6b-cdd1-4b26-a533-628a2d343100',
  'x-ms-ests-server',
  '2.1.11496.6 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEgAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 18:59:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:59:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898","x5t":"lGzPLAjrXaKHOAGPLtXPboHrpgc","attributes":{"enabled":true,"nbf":1613501224,"exp":1645037824,"created":1613501824,"updated":1613501824},"subject":""}],"nextLink":null}, [
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
  '38dd8c1b-cd3f-4ddb-b6dd-88f3c5fd67f1',
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
  'Tue, 16 Feb 2021 18:59:56 GMT',
  'Content-Length',
  '304'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898","deletedDate":1613501996,"scheduledPurgeDate":1614106796,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/5c845a606c3b4094bf75c4933ac6ea74","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/5c845a606c3b4094bf75c4933ac6ea74","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/5c845a606c3b4094bf75c4933ac6ea74","x5t":"lGzPLAjrXaKHOAGPLtXPboHrpgc","cer":"MIIDKDCCAhCgAwIBAgIQDE9maXVRRFSsADzywbVZVjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzA0WhcNMjIwMjE2MTg1NzA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCk59pBl/JF3uwC83zovw8kcs9d5vIauz1fbR6jHZwIuUHTX89DGzcooHEivM+WD/VrGdC4C6Crhu7I7TgKiPT1EIvpSA9Kz2rBGt1SaMLat7zLqUIip6143IBDJL7sl3EVC97nrxsAS358dTizl0P3vjGTaeEzGkC/bz18JAi5vzEFAiNWi1qz8+sxXnZHJV27+jxT5ZPrlIWtP0TKbMseS6MUuAaF6OLmJWHLj/M4GFtsjZfGBdjrtRwwZIUkCquoERB6rOmqUVqxGS0PZeMQAxOEaqJo+zoKEBXF6SpT1IHM3gqFUQ4lwIjv816B9MB2zvjUt1WsVk8p/vCP463VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSQnKKLJDcPM4/qJlj31TcFXLYDYzAdBgNVHQ4EFgQUkJyiiyQ3DzOP6iZY99U3BVy2A2MwDQYJKoZIhvcNAQELBQADggEBAAg6QDCyeHAzra/HEnOVVBlLTH2551yq8XEX3cHL9OZNEJZPQZ4XoCLZWAKsONhMMtazlpl9/nF1xikwn/NPigXYMTJXRJBULPRyL83dBdfKwkIkeRvruWUfaZt0A0EnREVAo1VpUAXgqTdUS/5seCE4fjUAjnrtYwielnpdTuOGeuIT4D8l9SKMvj6plPpY3304cUQwohpo7ayGnUKIes1Os/kQSZ+/DqiaQYSvpYzFMwtmT9q07ZK3DIvmS2U87eiKYejq6WU5KvRIHhoaA0PTadLTeu0oqQZNIynJdB+E81ST9ULUuDrOQKh7XZ7elyNn7Bg3bohFBsyhLu2/wec=","attributes":{"enabled":true,"nbf":1613501224,"exp":1645037824,"created":1613501824,"updated":1613501824,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501815,"updated":1613501815}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/pending"}}, [
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
  'f0aa65d5-f729-482e-856c-242debaf7616',
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
  'Tue, 16 Feb 2021 18:59:56 GMT',
  'Content-Length',
  '2751'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-9834596194625898"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '25a1ada8-8fc0-4e8d-9c49-ad3326813528',
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
  'Tue, 16 Feb 2021 18:59:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-9834596194625898"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4b499e82-3301-47cd-a240-8e9478192777',
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
  'Tue, 16 Feb 2021 18:59:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-9834596194625898"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3a0dc48f-5252-4aea-a36e-bb2192ce6c86',
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
  'Tue, 16 Feb 2021 18:59:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-9834596194625898"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b423f4af-e679-4d8f-a930-35cf9860187d',
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
  'Tue, 16 Feb 2021 19:00:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-9834596194625898"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'af820c1d-81df-46ff-8688-046ed41e4aaa',
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
  'Tue, 16 Feb 2021 19:00:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canabortcreatingacertificate-9834596194625898"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'f2676126-a508-45de-9e98-c61044816bd9',
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
  'Tue, 16 Feb 2021 19:00:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898","deletedDate":1613501996,"scheduledPurgeDate":1614106796,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/5c845a606c3b4094bf75c4933ac6ea74","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/5c845a606c3b4094bf75c4933ac6ea74","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/5c845a606c3b4094bf75c4933ac6ea74","x5t":"lGzPLAjrXaKHOAGPLtXPboHrpgc","cer":"MIIDKDCCAhCgAwIBAgIQDE9maXVRRFSsADzywbVZVjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg0NzA0WhcNMjIwMjE2MTg1NzA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCk59pBl/JF3uwC83zovw8kcs9d5vIauz1fbR6jHZwIuUHTX89DGzcooHEivM+WD/VrGdC4C6Crhu7I7TgKiPT1EIvpSA9Kz2rBGt1SaMLat7zLqUIip6143IBDJL7sl3EVC97nrxsAS358dTizl0P3vjGTaeEzGkC/bz18JAi5vzEFAiNWi1qz8+sxXnZHJV27+jxT5ZPrlIWtP0TKbMseS6MUuAaF6OLmJWHLj/M4GFtsjZfGBdjrtRwwZIUkCquoERB6rOmqUVqxGS0PZeMQAxOEaqJo+zoKEBXF6SpT1IHM3gqFUQ4lwIjv816B9MB2zvjUt1WsVk8p/vCP463VAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSQnKKLJDcPM4/qJlj31TcFXLYDYzAdBgNVHQ4EFgQUkJyiiyQ3DzOP6iZY99U3BVy2A2MwDQYJKoZIhvcNAQELBQADggEBAAg6QDCyeHAzra/HEnOVVBlLTH2551yq8XEX3cHL9OZNEJZPQZ4XoCLZWAKsONhMMtazlpl9/nF1xikwn/NPigXYMTJXRJBULPRyL83dBdfKwkIkeRvruWUfaZt0A0EnREVAo1VpUAXgqTdUS/5seCE4fjUAjnrtYwielnpdTuOGeuIT4D8l9SKMvj6plPpY3304cUQwohpo7ayGnUKIes1Os/kQSZ+/DqiaQYSvpYzFMwtmT9q07ZK3DIvmS2U87eiKYejq6WU5KvRIHhoaA0PTadLTeu0oqQZNIynJdB+E81ST9ULUuDrOQKh7XZ7elyNn7Bg3bohFBsyhLu2/wec=","attributes":{"enabled":true,"nbf":1613501224,"exp":1645037824,"created":1613501824,"updated":1613501824,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613501815,"updated":1613501815}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898/pending"}}, [
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
  '17abc15e-b29d-430a-b251-1d85aad65848',
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
  'Tue, 16 Feb 2021 19:00:07 GMT',
  'Content-Length',
  '2751'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canabortcreatingacertificate-9834596194625898')
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
  '7533796d-e920-4b98-b759-d6d1c91c98ec',
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
  'Tue, 16 Feb 2021 19:00:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [
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
  '529e6e53-871e-4c3b-9ac8-5a20c05b2060',
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
  'Tue, 16 Feb 2021 19:00:07 GMT',
  'Content-Length',
  '28'
]);
