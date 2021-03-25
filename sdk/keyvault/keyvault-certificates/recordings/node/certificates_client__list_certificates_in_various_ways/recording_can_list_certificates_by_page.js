let nock = require('nock');

module.exports.hash = "256eced09da590aa04a35aa6c4ba10d6";

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
  'westus2',
  'x-ms-request-id',
  '6fc38462-23f1-401a-9d37-9d3f7e3ed0ce',
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
  'Tue, 16 Feb 2021 19:01:26 GMT'
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
  '6fa85750-a30c-42d2-8239-ec25c17bfa00',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEwAAACEMvtcOAAAA; expires=Thu, 18-Mar-2021 19:01:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:01:27 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending?api-version=7.2&request_id=d3a0e5a8c1d84af9bd38051a44e74a25',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b36f74a6-571f-4a56-9f9f-86b85a53ca09',
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
  'Tue, 16 Feb 2021 19:01:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
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
  '7c36294f-825f-4368-8d7b-d70f9dfbc3d0',
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
  'Tue, 16 Feb 2021 19:01:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
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
  '87004735-57ea-4faf-823d-099c58c5bdab',
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
  'Tue, 16 Feb 2021 19:01:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
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
  '7425e397-4cc9-41ff-8670-655d90afcb96',
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
  'Tue, 16 Feb 2021 19:01:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
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
  '767acfd8-14e0-4a21-97dd-002fee5c1a7f',
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
  'Tue, 16 Feb 2021 19:01:32 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
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
  '19e3479d-beb4-433b-9487-6c19bed8588a',
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
  'Tue, 16 Feb 2021 19:01:34 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtU7mhqt+vxYZYf7iu0RGL1cDR9XxKvSvFZowh85XXghOB5i71G39CRdRcN3gdo0EG8QPRuSCHIMZDMlVMkUqa89WxRuOEKPAtHfH7oO0tqE9Ff213cmEiQPkzGnar6DHd4c+iy2VXKr6B/GUPZhUaRLaqkb1eMmklEoc+3d7i3skcUsP2soSHjQ32LaxmY+klb38eyVyru4Uencci9FtKQB29/hjq2rKgOUeJzljN8BtZvYLehcLXP099VJeU4LcF8sJrYJIpI6X0iVJP5eH9U25NnDnlRnhxBdExpoPjFHaCHR1/DdT1AaFjCB22f41oqzgk44o2PaMQmZZxoDLJQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJJ3ume5pVaLfBeby4KO8fcqc6+rZgNIzrMOA4TPKyBQM3vm4E9MOfLBUj3eYCZ119ig7zHeRl8F88znU/T6BNnyXpd8Q/BIJXeZkAFEp24fROpzLrPMmq8hb+bZyZNoktLJlZmQnZCn8InU1omsdEzALkR/mnN24blUZ484edwuqafmN1IFb/2xgf/cfS95amgPLHwDVZx1qDEnwF5ckOCjdF+PLOfxZREFfOExr2Os2ugJCcqmsOQwmDHl906nnGI71vIfyPakBiLBcmIfr6f2VExPfYWc48r4ZjoU4i854mCw7sSVk3S0BCuQqR/MdjfIds3oV9HmBIpX8GYfIu8=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0","request_id":"d3a0e5a8c1d84af9bd38051a44e74a25"}, [
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
  '046ed365-2243-476c-bb6e-5737e142c473',
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
  'Tue, 16 Feb 2021 19:01:36 GMT',
  'Content-Length',
  '1289'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","x5t":"hqW7Pf8MN_RsgP0fjJ6j7qyXAx4","cer":"MIIDKDCCAhCgAwIBAgIQI4hs0S57RiqgrN591UEH8jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTM1WhcNMjIwMjE2MTkwMTM1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1TuaGq36/Fhlh/uK7REYvVwNH1fEq9K8VmjCHzldeCE4HmLvUbf0JF1Fw3eB2jQQbxA9G5IIcgxkMyVUyRSprz1bFG44Qo8C0d8fug7S2oT0V/bXdyYSJA+TMadqvoMd3hz6LLZVcqvoH8ZQ9mFRpEtqqRvV4yaSUShz7d3uLeyRxSw/ayhIeNDfYtrGZj6SVvfx7JXKu7hR6dxyL0W0pAHb3+GOrasqA5R4nOWM3wG1m9gt6Fwtc/T31Ul5TgtwXywmtgkikjpfSJUk/l4f1Tbk2cOeVGeHEF0TGmg+MUdoIdHX8N1PUBoWMIHbZ/jWirOCTjijY9oxCZlnGgMslAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQTCr4KHhRcDBpiBTXCpExTAUEBSTAdBgNVHQ4EFgQUEwq+Ch4UXAwaYgU1wqRMUwFBAUkwDQYJKoZIhvcNAQELBQADggEBAIQVR3xcqr1zm4P2CqM3E4/nAD2u6a5+/GrxVugxIOQzqeTUYTX+AN36ZVpY1lfJBRaOIw/I7qdpiNFWH4uxn59j967a4S+S+eJaYsHiKhWATcMmLRGTA3qlSfa2XJwFI20e92OTaGxVbDZHCuOEScCuhRGzLdzX4Rfmgszd5pa/rAK2fv38mnBC28TxN0vv/wN65CDQNklWANIOCsVwvBWGjeHcmHizeGvbLINvQJGEDdLyg00XT1BY1IxVWHhKvan1ibsab/qYVpZU0isMxntr1vhzrNxOJSQ0RA0zVl4AjL2uba9Of8x1hXxWc96nszbGEJw0sEsAoMlqHcDtEV4=","attributes":{"enabled":true,"nbf":1613501495,"exp":1645038095,"created":1613502095,"updated":1613502095,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502088,"updated":1613502088}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  '66efd37b-0bb9-4c83-b726-9a52ade2d8f4',
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
  'Tue, 16 Feb 2021 19:01:36 GMT',
  'Content-Length',
  '2554'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/listCertificateName-canlistcertificatesbypage-1/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending?api-version=7.2&request_id=21fe2d64ca7a4425930f1793c3461183',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '0aef6547-079f-4e63-bfe7-d2bb0e256e26',
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
  'Tue, 16 Feb 2021 19:01:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
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
  '5a66fcb1-8e24-4cde-8581-4c946afd61f9',
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
  'Tue, 16 Feb 2021 19:01:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
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
  '9b97389a-3251-4c55-9874-63c4c75bd574',
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
  'Tue, 16 Feb 2021 19:01:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
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
  '412ae1a6-6c81-4735-ad4d-233fa3ddd074',
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
  'Tue, 16 Feb 2021 19:01:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
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
  '01896b7f-d8bc-409a-b790-c980f3d2d129',
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
  'Tue, 16 Feb 2021 19:01:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
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
  'b0ea21aa-d1d4-4821-93d9-c99ed0eb97da',
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
  'Tue, 16 Feb 2021 19:01:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseu2S/Qvsv0PhBvWsE+OBpnB5RXlyIy0GIL/zo0omygxy26RvEcUSQGI8deN7BDRzEnPQpz0TPhlQv72RYw1e6jjt+BzEV2QtrNqkrgH1ImWm410BTeiqhx+QyvTYZFtpj8VBGrP4o4Hqy8OGgNoLjhMhw1RIeNWQQafO9/lmozIrHAOZLCGkd7A4+YuQe5zT8AFCM+FtDuOqDJ/n9BBCKgO0ylm4aseVfhZn9k+lSbCci+MfyxWKD/ApbaD1PL9LGcJGE77GzcZn8RuWf/mxuAQ5RLtXJoASzwCLWvaAjHwjGku1axIhs2t3EG+Fqm2kqPPkvrUP31bXQKfsUyPwQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIDYRwCXeOp2NxxtGeWr4kvT6TqWjmEH3ABje0gRnU+e33tkCyyXAzw1zUMfEWmw5KYwBEg7uupl4fKwtnVqcMld2lVF0Bo32xEFPEnK/a2tMDEnadow6goNWo91aM9AXeDapa7c9jHMtYvYqbt0iQGg2lcS8DYjDiSa04ymPLAuAvkaD9EuaT4xwos3t8Q0Y+dUSF2Ep7PC6y/GL4yozzJDeWeSiEtzXp4WoyNj8fiBiZcgTZhP8Its057cZg46zxgGwGzZ/+5EQCp6RetOZYI2SRGiX1lBWOS0DU5yVjpH15cCKdnLAh0eh592cN+dVhql3CtV9hOkA9nzZPtXmVE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1","request_id":"21fe2d64ca7a4425930f1793c3461183"}, [
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
  '307050f0-3b68-48d0-8462-222e38b71a3a',
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
  'Tue, 16 Feb 2021 19:01:44 GMT',
  'Content-Length',
  '1289'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/listCertificateName-canlistcertificatesbypage-1/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","x5t":"l1ovs9EYVhymNGqaUQHbogx8FfQ","cer":"MIIDKDCCAhCgAwIBAgIQc8K8PRPnTBKVlYzqOGOU/DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTQ0WhcNMjIwMjE2MTkwMTQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCx67ZL9C+y/Q+EG9awT44GmcHlFeXIjLQYgv/OjSibKDHLbpG8RxRJAYjx143sENHMSc9CnPRM+GVC/vZFjDV7qOO34HMRXZC2s2qSuAfUiZabjXQFN6KqHH5DK9NhkW2mPxUEas/ijgerLw4aA2guOEyHDVEh41ZBBp873+WajMiscA5ksIaR3sDj5i5B7nNPwAUIz4W0O46oMn+f0EEIqA7TKWbhqx5V+Fmf2T6VJsJyL4x/LFYoP8CltoPU8v0sZwkYTvsbNxmfxG5Z/+bG4BDlEu1cmgBLPAIta9oCMfCMaS7VrEiGza3cQb4WqbaSo8+S+tQ/fVtdAp+xTI/BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZmGnBTT6vW06WgAhMaQIBKG4K4jAdBgNVHQ4EFgQUGZhpwU0+r1tOloAITGkCAShuCuIwDQYJKoZIhvcNAQELBQADggEBAE2Land192Tu6VqflOolP8dJOAkZnzno6xVQntEO+wucyiTlQo8G6lIQaRMhCxVrWTTNgNpdjpmZxDIY/AKZNJSlhBj4ptHuy9UpImzP7MbNR0YVLdKack2DGF39J6kymvF/n9OgIVG+Hw19hfHaVakUzuKdktvtblGTttZTgXPxPhSo1ORmoQUGCWKwun/7RQVuVmKuC9IhNtfmewgRzh+fx+AwHLylAbm09too2PxVs7UG4TIGAfhBFC1zY1nb/3Cntq7rzw4yRlGgR15jLSR6w1CuvSoqgwJaNqaqnIViaZX8V1O+Ph0A9zhXS+svCku+4rGRSywllkEGki6xKq4=","attributes":{"enabled":true,"nbf":1613501504,"exp":1645038104,"created":1613502105,"updated":1613502105,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502097,"updated":1613502097}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  '97656a13-9741-4e6e-8b18-40d5a2d2231a',
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
  'Tue, 16 Feb 2021 19:01:44 GMT',
  'Content-Length',
  '2554'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates')
  .query(true)
  .reply(200, {"value":[{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0","x5t":"hqW7Pf8MN_RsgP0fjJ6j7qyXAx4","attributes":{"enabled":true,"nbf":1613501495,"exp":1645038095,"created":1613502095,"updated":1613502095},"subject":""},{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1","x5t":"l1ovs9EYVhymNGqaUQHbogx8FfQ","attributes":{"enabled":true,"nbf":1613501504,"exp":1645038104,"created":1613502105,"updated":1613502105},"subject":""}],"nextLink":null}, [
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
  '012bb40f-76ad-4ccd-85e4-848e80e33ead',
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
  'Tue, 16 Feb 2021 19:01:45 GMT',
  'Content-Length',
  '579'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-0","deletedDate":1613502105,"scheduledPurgeDate":1614106905,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","x5t":"hqW7Pf8MN_RsgP0fjJ6j7qyXAx4","cer":"MIIDKDCCAhCgAwIBAgIQI4hs0S57RiqgrN591UEH8jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTM1WhcNMjIwMjE2MTkwMTM1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1TuaGq36/Fhlh/uK7REYvVwNH1fEq9K8VmjCHzldeCE4HmLvUbf0JF1Fw3eB2jQQbxA9G5IIcgxkMyVUyRSprz1bFG44Qo8C0d8fug7S2oT0V/bXdyYSJA+TMadqvoMd3hz6LLZVcqvoH8ZQ9mFRpEtqqRvV4yaSUShz7d3uLeyRxSw/ayhIeNDfYtrGZj6SVvfx7JXKu7hR6dxyL0W0pAHb3+GOrasqA5R4nOWM3wG1m9gt6Fwtc/T31Ul5TgtwXywmtgkikjpfSJUk/l4f1Tbk2cOeVGeHEF0TGmg+MUdoIdHX8N1PUBoWMIHbZ/jWirOCTjijY9oxCZlnGgMslAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQTCr4KHhRcDBpiBTXCpExTAUEBSTAdBgNVHQ4EFgQUEwq+Ch4UXAwaYgU1wqRMUwFBAUkwDQYJKoZIhvcNAQELBQADggEBAIQVR3xcqr1zm4P2CqM3E4/nAD2u6a5+/GrxVugxIOQzqeTUYTX+AN36ZVpY1lfJBRaOIw/I7qdpiNFWH4uxn59j967a4S+S+eJaYsHiKhWATcMmLRGTA3qlSfa2XJwFI20e92OTaGxVbDZHCuOEScCuhRGzLdzX4Rfmgszd5pa/rAK2fv38mnBC28TxN0vv/wN65CDQNklWANIOCsVwvBWGjeHcmHizeGvbLINvQJGEDdLyg00XT1BY1IxVWHhKvan1ibsab/qYVpZU0isMxntr1vhzrNxOJSQ0RA0zVl4AjL2uba9Of8x1hXxWc96nszbGEJw0sEsAoMlqHcDtEV4=","attributes":{"enabled":true,"nbf":1613501495,"exp":1645038095,"created":1613502095,"updated":1613502095,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502088,"updated":1613502088}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  'fe749808-52f4-4fcc-8b2c-ee00510ce0bc',
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
  'Tue, 16 Feb 2021 19:01:45 GMT',
  'Content-Length',
  '2745'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '56f2f528-795c-40b7-b7a8-60edf862f8e7',
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
  'Tue, 16 Feb 2021 19:01:45 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'fb9cb1d2-06ff-473a-819c-a32c270b3014',
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
  'Tue, 16 Feb 2021 19:01:45 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4ee9feba-3b72-4f97-8e88-210ec7f010ad',
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
  'Tue, 16 Feb 2021 19:01:47 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ffd517da-8190-4c42-8144-64be7c58dd1b',
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
  'Tue, 16 Feb 2021 19:01:49 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '8c88d9fe-6824-4115-8db8-8be06679472b',
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
  'Tue, 16 Feb 2021 19:01:51 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3a121009-e94a-4f6e-a558-449de410b3bb',
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
  'Tue, 16 Feb 2021 19:01:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-0","deletedDate":1613502105,"scheduledPurgeDate":1614106905,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-0/828888621e7e4a5e93a11f90abb83c72","x5t":"hqW7Pf8MN_RsgP0fjJ6j7qyXAx4","cer":"MIIDKDCCAhCgAwIBAgIQI4hs0S57RiqgrN591UEH8jANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTM1WhcNMjIwMjE2MTkwMTM1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC1TuaGq36/Fhlh/uK7REYvVwNH1fEq9K8VmjCHzldeCE4HmLvUbf0JF1Fw3eB2jQQbxA9G5IIcgxkMyVUyRSprz1bFG44Qo8C0d8fug7S2oT0V/bXdyYSJA+TMadqvoMd3hz6LLZVcqvoH8ZQ9mFRpEtqqRvV4yaSUShz7d3uLeyRxSw/ayhIeNDfYtrGZj6SVvfx7JXKu7hR6dxyL0W0pAHb3+GOrasqA5R4nOWM3wG1m9gt6Fwtc/T31Ul5TgtwXywmtgkikjpfSJUk/l4f1Tbk2cOeVGeHEF0TGmg+MUdoIdHX8N1PUBoWMIHbZ/jWirOCTjijY9oxCZlnGgMslAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQTCr4KHhRcDBpiBTXCpExTAUEBSTAdBgNVHQ4EFgQUEwq+Ch4UXAwaYgU1wqRMUwFBAUkwDQYJKoZIhvcNAQELBQADggEBAIQVR3xcqr1zm4P2CqM3E4/nAD2u6a5+/GrxVugxIOQzqeTUYTX+AN36ZVpY1lfJBRaOIw/I7qdpiNFWH4uxn59j967a4S+S+eJaYsHiKhWATcMmLRGTA3qlSfa2XJwFI20e92OTaGxVbDZHCuOEScCuhRGzLdzX4Rfmgszd5pa/rAK2fv38mnBC28TxN0vv/wN65CDQNklWANIOCsVwvBWGjeHcmHizeGvbLINvQJGEDdLyg00XT1BY1IxVWHhKvan1ibsab/qYVpZU0isMxntr1vhzrNxOJSQ0RA0zVl4AjL2uba9Of8x1hXxWc96nszbGEJw0sEsAoMlqHcDtEV4=","attributes":{"enabled":true,"nbf":1613501495,"exp":1645038095,"created":1613502095,"updated":1613502095,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502088,"updated":1613502088}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-0/pending"}}, [
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
  'eecb3897-9aa7-48e2-b9e8-5499ee3c27fd',
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
  'Tue, 16 Feb 2021 19:01:55 GMT',
  'Content-Length',
  '2745'
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
  'westus2',
  'x-ms-request-id',
  '43899dec-04a9-46a0-8703-235e2b1461c4',
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
  'Tue, 16 Feb 2021 19:01:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-1","deletedDate":1613502116,"scheduledPurgeDate":1614106916,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","x5t":"l1ovs9EYVhymNGqaUQHbogx8FfQ","cer":"MIIDKDCCAhCgAwIBAgIQc8K8PRPnTBKVlYzqOGOU/DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTQ0WhcNMjIwMjE2MTkwMTQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCx67ZL9C+y/Q+EG9awT44GmcHlFeXIjLQYgv/OjSibKDHLbpG8RxRJAYjx143sENHMSc9CnPRM+GVC/vZFjDV7qOO34HMRXZC2s2qSuAfUiZabjXQFN6KqHH5DK9NhkW2mPxUEas/ijgerLw4aA2guOEyHDVEh41ZBBp873+WajMiscA5ksIaR3sDj5i5B7nNPwAUIz4W0O46oMn+f0EEIqA7TKWbhqx5V+Fmf2T6VJsJyL4x/LFYoP8CltoPU8v0sZwkYTvsbNxmfxG5Z/+bG4BDlEu1cmgBLPAIta9oCMfCMaS7VrEiGza3cQb4WqbaSo8+S+tQ/fVtdAp+xTI/BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZmGnBTT6vW06WgAhMaQIBKG4K4jAdBgNVHQ4EFgQUGZhpwU0+r1tOloAITGkCAShuCuIwDQYJKoZIhvcNAQELBQADggEBAE2Land192Tu6VqflOolP8dJOAkZnzno6xVQntEO+wucyiTlQo8G6lIQaRMhCxVrWTTNgNpdjpmZxDIY/AKZNJSlhBj4ptHuy9UpImzP7MbNR0YVLdKack2DGF39J6kymvF/n9OgIVG+Hw19hfHaVakUzuKdktvtblGTttZTgXPxPhSo1ORmoQUGCWKwun/7RQVuVmKuC9IhNtfmewgRzh+fx+AwHLylAbm09too2PxVs7UG4TIGAfhBFC1zY1nb/3Cntq7rzw4yRlGgR15jLSR6w1CuvSoqgwJaNqaqnIViaZX8V1O+Ph0A9zhXS+svCku+4rGRSywllkEGki6xKq4=","attributes":{"enabled":true,"nbf":1613501504,"exp":1645038104,"created":1613502105,"updated":1613502105,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502097,"updated":1613502097}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  'ea5756a2-26a4-4737-af07-63390497b5c2',
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
  'Tue, 16 Feb 2021 19:01:55 GMT',
  'Content-Length',
  '2745'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2087b918-2796-4944-8ed9-b72ffbd6cd70',
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
  'Tue, 16 Feb 2021 19:01:55 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ad472f97-0835-4b42-850d-cb6c563f5344',
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
  'Tue, 16 Feb 2021 19:01:55 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '36727710-af8f-4508-aec5-74eb0aa22305',
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
  'Tue, 16 Feb 2021 19:01:57 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'aab4c45d-baf5-4c33-bc98-6bf44f52dc48',
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
  'Tue, 16 Feb 2021 19:02:00 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '10f04f7b-c3a7-4bfa-99fd-4c5e5bf6731f',
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
  'Tue, 16 Feb 2021 19:02:02 GMT'
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
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3aa2e063-f091-436f-9274-268d7ab85931',
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
  'Tue, 16 Feb 2021 19:02:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/listCertificateName-canlistcertificatesbypage-1","deletedDate":1613502116,"scheduledPurgeDate":1614106916,"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","kid":"https://keyvault_name.vault.azure.net/keys/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","sid":"https://keyvault_name.vault.azure.net/secrets/listCertificateName-canlistcertificatesbypage-1/3fd22c66d7b842ad983268a5f9e901a5","x5t":"l1ovs9EYVhymNGqaUQHbogx8FfQ","cer":"MIIDKDCCAhCgAwIBAgIQc8K8PRPnTBKVlYzqOGOU/DANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1MTQ0WhcNMjIwMjE2MTkwMTQ0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCx67ZL9C+y/Q+EG9awT44GmcHlFeXIjLQYgv/OjSibKDHLbpG8RxRJAYjx143sENHMSc9CnPRM+GVC/vZFjDV7qOO34HMRXZC2s2qSuAfUiZabjXQFN6KqHH5DK9NhkW2mPxUEas/ijgerLw4aA2guOEyHDVEh41ZBBp873+WajMiscA5ksIaR3sDj5i5B7nNPwAUIz4W0O46oMn+f0EEIqA7TKWbhqx5V+Fmf2T6VJsJyL4x/LFYoP8CltoPU8v0sZwkYTvsbNxmfxG5Z/+bG4BDlEu1cmgBLPAIta9oCMfCMaS7VrEiGza3cQb4WqbaSo8+S+tQ/fVtdAp+xTI/BAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQZmGnBTT6vW06WgAhMaQIBKG4K4jAdBgNVHQ4EFgQUGZhpwU0+r1tOloAITGkCAShuCuIwDQYJKoZIhvcNAQELBQADggEBAE2Land192Tu6VqflOolP8dJOAkZnzno6xVQntEO+wucyiTlQo8G6lIQaRMhCxVrWTTNgNpdjpmZxDIY/AKZNJSlhBj4ptHuy9UpImzP7MbNR0YVLdKack2DGF39J6kymvF/n9OgIVG+Hw19hfHaVakUzuKdktvtblGTttZTgXPxPhSo1ORmoQUGCWKwun/7RQVuVmKuC9IhNtfmewgRzh+fx+AwHLylAbm09too2PxVs7UG4TIGAfhBFC1zY1nb/3Cntq7rzw4yRlGgR15jLSR6w1CuvSoqgwJaNqaqnIViaZX8V1O+Ph0A9zhXS+svCku+4rGRSywllkEGki6xKq4=","attributes":{"enabled":true,"nbf":1613501504,"exp":1645038104,"created":1613502105,"updated":1613502105,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502097,"updated":1613502097}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/listCertificateName-canlistcertificatesbypage-1/pending"}}, [
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
  '2cefc345-4f49-4f01-a73c-207f1dc908f8',
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
  'Tue, 16 Feb 2021 19:02:05 GMT',
  'Content-Length',
  '2745'
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
  'westus2',
  'x-ms-request-id',
  '3ea7398f-5ca3-4186-a28d-0314ccb7ee1d',
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
  'Tue, 16 Feb 2021 19:02:05 GMT'
]);
