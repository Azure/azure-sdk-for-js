let nock = require('nock');

module.exports.hash = "f7f2125f79556832daca294f412da8a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/create')
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
  '9a9c73bc-4570-4e77-b36d-781842e42872',
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
  'Thu, 25 Jun 2020 13:07:15 GMT'
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
  '42acee10-af7f-4e32-861d-b8de03341d01',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AjtR8ZPGbBxLtD2i2fdOkew_aSJHAQAAAISYhtYOAAAA; expires=Sat, 25-Jul-2020 13:07:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:07:16 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cd3b5585-d1f2-4955-ab57-c9561be1c334',
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
  'Thu, 25 Jun 2020 13:07:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending?api-version=7.1&request_id=75bc67898b784558971ff7cee3818cef',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3e4c0f13-81b3-4590-bd3b-e422049a91fc',
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
  'Thu, 25 Jun 2020 13:07:17 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  'b18d43a2-58b9-47f2-a294-a0739c01b6a7',
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
  'Thu, 25 Jun 2020 13:07:17 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/3bd86353f24f4b469c35d34397486f3a","attributes":{"enabled":false,"nbf":1593089836,"exp":1624626436,"created":1593090437,"updated":1593090437,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090437,"updated":1593090437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '78b88d7c-a3d0-4e49-baa9-6dbaa4206147',
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
  'Thu, 25 Jun 2020 13:07:17 GMT',
  'Content-Length',
  '1178'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '7270e7c8-7809-485e-b652-e72670370eaf',
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
  'Thu, 25 Jun 2020 13:07:17 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '55999d27-f91e-4c70-aa76-2f4ff0db2084',
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
  'Thu, 25 Jun 2020 13:07:17 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '5e247a70-471f-4641-bd90-3055fb274e50',
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
  'Thu, 25 Jun 2020 13:07:17 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1be9c966-7d4b-45c0-a43d-0d6002c7613b',
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
  'Thu, 25 Jun 2020 13:07:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '3c4ec221-b1f6-4efd-898f-fc2f8d816018',
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
  'Thu, 25 Jun 2020 13:07:19 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '013feb67-3a46-4296-b924-2d42ee7d9342',
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
  'Thu, 25 Jun 2020 13:07:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  'e21bf6cd-9160-42f0-86d0-1a7c8c24a974',
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
  'Thu, 25 Jun 2020 13:07:21 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd5ad1162-cbb5-4786-bf78-036514472133',
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
  'Thu, 25 Jun 2020 13:07:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  'b47b9022-ee79-4489-9687-c7bfab8a4d4a',
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
  'Thu, 25 Jun 2020 13:07:23 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7e2db181-3eec-47e0-992c-d18bea1c76a1',
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
  'Thu, 25 Jun 2020 13:07:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '3c684ba2-acd7-4da1-8662-c9b6b15e16a7',
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
  'Thu, 25 Jun 2020 13:07:25 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '18deebab-3be4-4488-9cb8-17407ec5f8ab',
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
  'Thu, 25 Jun 2020 13:07:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  'f61ddeb0-7b6e-41bc-8c7d-6131b13a92c4',
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
  'Thu, 25 Jun 2020 13:07:27 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c9f1af26-fd56-4346-b59e-bee9aefcd275',
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
  'Thu, 25 Jun 2020 13:07:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '8724d9bc-2a14-489a-92d9-dac9d343bcf5',
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
  'Thu, 25 Jun 2020 13:07:29 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f0c6dce5-704a-4b38-afd6-3cba80f9d893',
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
  'Thu, 25 Jun 2020 13:07:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  'a294589b-1e53-4d9d-969c-d23935e63efd',
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
  'Thu, 25 Jun 2020 13:07:31 GMT',
  'Content-Length',
  '1349'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '96e6c2fe-b474-42d6-bcc1-da4c1ab28393',
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
  'Thu, 25 Jun 2020 13:07:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAguShwEG2zQi0QqXV/TzGukNPas/i1UTwC/ViX02f6BeauhYC33xObxMUJrP2N5AMGGYWfgapkvRvAoM+XfpNU60RMt/RDYZ0VJAPiH1Sibl8D9fg3JtjKhqsFuR3MAyvBSG4PtIdfgcbW5vXvi32NpvVYwKux5zLak9J7it/pHCpCU2+uZKnKRCxEO0YIiAPq4FOV8Q8BCE+HgjaIp8PGHrhrUkCx8H6WV6jGS5nlUcpWVBqHG5anWRgMPGE+wFqt+naGbPNFbF1lNf3HP1I+WYQhvXeD7RuaF6B8hX/Or+SxqdiguTmJWy44TWxissXpQRneAbyHBID6aUi2QcxIQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABtj8tpB/FswJrVgtW026FffG6xQdPEZfhbQ8xHgxsjTLo+7o3MsXsYAknXnR644qrL0ePBHgRpLRp3NxWHp0DRxTdhBp9TZa8+HSI0dr/5exExDphIAARs0oGBWl4OIqsDhCX979wrp0hxp/PNklE0VcTNmtbsj7UbHMJf3821DDtp0zLCvbosdQMyyA+QZfpqhmdEA4JppW1aqkB7vtG5Ae8L3HQk2jax5Y1prmijvtBsyS5AUZ7x8Hi14jCX5d9b50Pc9cyxf9WCYBv7vkz9cD+rMO9DjiaqsgzaqwIzDz7VqbCBPlxSo6ep60uhkSgjWHwyCGDgoOkPngmXEFmI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-","request_id":"75bc67898b784558971ff7cee3818cef"}, [
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
  '86137844-c911-4fc7-8140-f23784ea2eb7',
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
  'Thu, 25 Jun 2020 13:07:33 GMT',
  'Content-Length',
  '1325'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","x5t":"2iIlPJHpkB8vq9QT6cQvpEYteVI","cer":"MIIDKDCCAhCgAwIBAgIQQQVqjNQwRm2/yr05YweyZDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NzMxWhcNMjEwNjI1MTMwNzMxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCC5KHAQbbNCLRCpdX9PMa6Q09qz+LVRPAL9WJfTZ/oF5q6FgLffE5vExQms/Y3kAwYZhZ+BqmS9G8Cgz5d+k1TrREy39ENhnRUkA+IfVKJuXwP1+Dcm2MqGqwW5HcwDK8FIbg+0h1+Bxtbm9e+LfY2m9VjAq7HnMtqT0nuK3+kcKkJTb65kqcpELEQ7RgiIA+rgU5XxDwEIT4eCNoinw8YeuGtSQLHwfpZXqMZLmeVRylZUGocblqdZGAw8YT7AWq36doZs80VsXWU1/cc/Uj5ZhCG9d4PtG5oXoHyFf86v5LGp2KC5OYlbLjhNbGKyxelBGd4BvIcEgPppSLZBzEhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQKn05fdl4Hr/vYasQivp4wVLcDuzAdBgNVHQ4EFgQUCp9OX3ZeB6/72GrEIr6eMFS3A7swDQYJKoZIhvcNAQELBQADggEBAGwxu2UnaLvHtQ/jgrx81a0aTDnmNiOFNtbg57jHbZy2euOx7yLS8tBxdwjvV59ft30lmkGmgzE4lN4vNGAzWVg5YluArlg0eISqPs/tEw/zgZnuYOXtNSCO17ZSb+Ur1pxkplFGlVUk0l7FJCzF5TZBJz4HGqhUM3B+Esw6GcAv8p/MumV0KRdK8kRtZOIVxY0Zd6z5pRX2XzlU+6w3UAyrN7McuXZzLRHItuXZj83Zl+jiGsv4g5Ao3wjLN+B96uJULVoiq7DMDewUY/Ei6/oG+/QELQ+nPX2Qnthl8IE30tePMfto1YdHagM8hpwYT9jNbuYjr50Xyf68wifgTAs=","attributes":{"enabled":true,"nbf":1593089851,"exp":1624626451,"created":1593090451,"updated":1593090451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090437,"updated":1593090437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '6a3ce711-6c6d-40a6-81b7-89a497ceb065',
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
  'Thu, 25 Jun 2020 13:07:33 GMT',
  'Content-Length',
  '2635'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-","deletedDate":1593090454,"scheduledPurgeDate":1600866454,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","x5t":"2iIlPJHpkB8vq9QT6cQvpEYteVI","cer":"MIIDKDCCAhCgAwIBAgIQQQVqjNQwRm2/yr05YweyZDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NzMxWhcNMjEwNjI1MTMwNzMxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCC5KHAQbbNCLRCpdX9PMa6Q09qz+LVRPAL9WJfTZ/oF5q6FgLffE5vExQms/Y3kAwYZhZ+BqmS9G8Cgz5d+k1TrREy39ENhnRUkA+IfVKJuXwP1+Dcm2MqGqwW5HcwDK8FIbg+0h1+Bxtbm9e+LfY2m9VjAq7HnMtqT0nuK3+kcKkJTb65kqcpELEQ7RgiIA+rgU5XxDwEIT4eCNoinw8YeuGtSQLHwfpZXqMZLmeVRylZUGocblqdZGAw8YT7AWq36doZs80VsXWU1/cc/Uj5ZhCG9d4PtG5oXoHyFf86v5LGp2KC5OYlbLjhNbGKyxelBGd4BvIcEgPppSLZBzEhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQKn05fdl4Hr/vYasQivp4wVLcDuzAdBgNVHQ4EFgQUCp9OX3ZeB6/72GrEIr6eMFS3A7swDQYJKoZIhvcNAQELBQADggEBAGwxu2UnaLvHtQ/jgrx81a0aTDnmNiOFNtbg57jHbZy2euOx7yLS8tBxdwjvV59ft30lmkGmgzE4lN4vNGAzWVg5YluArlg0eISqPs/tEw/zgZnuYOXtNSCO17ZSb+Ur1pxkplFGlVUk0l7FJCzF5TZBJz4HGqhUM3B+Esw6GcAv8p/MumV0KRdK8kRtZOIVxY0Zd6z5pRX2XzlU+6w3UAyrN7McuXZzLRHItuXZj83Zl+jiGsv4g5Ao3wjLN+B96uJULVoiq7DMDewUY/Ei6/oG+/QELQ+nPX2Qnthl8IE30tePMfto1YdHagM8hpwYT9jNbuYjr50Xyf68wifgTAs=","attributes":{"enabled":true,"nbf":1593089851,"exp":1624626451,"created":1593090451,"updated":1593090451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090437,"updated":1593090437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '0bdc06ae-0981-49cd-9859-eb0636f28335',
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
  'Thu, 25 Jun 2020 13:07:33 GMT',
  'Content-Length',
  '2844'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '687ef41f-4362-44dd-a2a0-04c9fbc02c24',
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
  'Thu, 25 Jun 2020 13:07:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0e100fe8-0013-47ae-b719-a6178ded4976',
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
  'Thu, 25 Jun 2020 13:07:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a39e33a3-fda4-475a-8c1a-28f51cb722c6',
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
  'Thu, 25 Jun 2020 13:07:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '18fe9f2c-8dd1-4e07-8e1a-42def7209190',
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
  'Thu, 25 Jun 2020 13:07:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6e8ff407-a825-4286-bf6b-541a4c15931b',
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
  'Thu, 25 Jun 2020 13:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e194b372-4072-4d71-8a92-e269883cf1e1',
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
  'Thu, 25 Jun 2020 13:07:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7ae0ec99-5580-441c-9475-ec2b61e812e6',
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
  'Thu, 25 Jun 2020 13:07:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '07c1a83c-46ad-4dc9-87bd-9ced73086ceb',
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
  'Thu, 25 Jun 2020 13:07:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c8075c71-b8d0-49bb-9bdd-151a73354b69',
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
  'Thu, 25 Jun 2020 13:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b0ba7a6c-abc3-4162-920a-9119c76d9035',
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
  'Thu, 25 Jun 2020 13:07:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5381b706-10f6-44bb-b4f9-03eecdec8248',
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
  'Thu, 25 Jun 2020 13:07:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c73ba4f3-db86-4ac5-abf2-5817f6855be9',
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
  'Thu, 25 Jun 2020 13:07:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '35c3b5bd-b7d7-4f03-a5ac-8119b713bcf4',
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
  'Thu, 25 Jun 2020 13:07:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e9061aba-4513-4d8a-8d42-092106295c60',
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
  'Thu, 25 Jun 2020 13:07:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '874cdb87-a025-4e78-819f-d90e25e10567',
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
  'Thu, 25 Jun 2020 13:07:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-","deletedDate":1593090454,"scheduledPurgeDate":1600866454,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/fc5bda3cb76a45dca6c71261b292c156","x5t":"2iIlPJHpkB8vq9QT6cQvpEYteVI","cer":"MIIDKDCCAhCgAwIBAgIQQQVqjNQwRm2/yr05YweyZDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NzMxWhcNMjEwNjI1MTMwNzMxWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCC5KHAQbbNCLRCpdX9PMa6Q09qz+LVRPAL9WJfTZ/oF5q6FgLffE5vExQms/Y3kAwYZhZ+BqmS9G8Cgz5d+k1TrREy39ENhnRUkA+IfVKJuXwP1+Dcm2MqGqwW5HcwDK8FIbg+0h1+Bxtbm9e+LfY2m9VjAq7HnMtqT0nuK3+kcKkJTb65kqcpELEQ7RgiIA+rgU5XxDwEIT4eCNoinw8YeuGtSQLHwfpZXqMZLmeVRylZUGocblqdZGAw8YT7AWq36doZs80VsXWU1/cc/Uj5ZhCG9d4PtG5oXoHyFf86v5LGp2KC5OYlbLjhNbGKyxelBGd4BvIcEgPppSLZBzEhAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQKn05fdl4Hr/vYasQivp4wVLcDuzAdBgNVHQ4EFgQUCp9OX3ZeB6/72GrEIr6eMFS3A7swDQYJKoZIhvcNAQELBQADggEBAGwxu2UnaLvHtQ/jgrx81a0aTDnmNiOFNtbg57jHbZy2euOx7yLS8tBxdwjvV59ft30lmkGmgzE4lN4vNGAzWVg5YluArlg0eISqPs/tEw/zgZnuYOXtNSCO17ZSb+Ur1pxkplFGlVUk0l7FJCzF5TZBJz4HGqhUM3B+Esw6GcAv8p/MumV0KRdK8kRtZOIVxY0Zd6z5pRX2XzlU+6w3UAyrN7McuXZzLRHItuXZj83Zl+jiGsv4g5Ao3wjLN+B96uJULVoiq7DMDewUY/Ei6/oG+/QELQ+nPX2Qnthl8IE30tePMfto1YdHagM8hpwYT9jNbuYjr50Xyf68wifgTAs=","attributes":{"enabled":true,"nbf":1593089851,"exp":1624626451,"created":1593090451,"updated":1593090451,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090437,"updated":1593090437}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '41192261-0c9f-41a6-b86b-80bb1bc9218b',
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
  'Thu, 25 Jun 2020 13:07:48 GMT',
  'Content-Length',
  '2844'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
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
  '4009d5ad-e3eb-4391-8a94-4e7467b52e12',
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
  'Thu, 25 Jun 2020 13:07:48 GMT'
]);
