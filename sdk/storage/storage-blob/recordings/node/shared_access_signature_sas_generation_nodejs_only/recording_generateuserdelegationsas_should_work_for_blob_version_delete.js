let nock = require('nock');

module.exports.hash = "7872ae4b23bd43f1c023ca7f23cf932b";

module.exports.testInfo = {"uniqueName":{"container":"container160241543590404390","blob":"blob160241543734202002"},"newDate":{"now":"2020-10-11T11:23:58.046Z","tmr":"2020-10-11T11:23:58.049Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160241543590404390')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 11 Oct 2020 11:23:57 GMT',
  'ETag',
  '"0x8D86DD824D7F69E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151e83-501e-0054-7ac1-9f85e6000000',
  'x-ms-client-request-id',
  '18d69adc-e637-45ab-ab53-ecce0a236d25',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 11:23:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160241543590404390/blob160241543734202002', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 11 Oct 2020 11:23:57 GMT',
  'ETag',
  '"0x8D86DD82512C0E5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151e97-501e-0054-08c1-9f85e6000000',
  'x-ms-client-request-id',
  '5095f632-3165-4c58-9ba9-efde4f13f72d',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-11T11:23:57.5274725Z',
  'Date',
  'Sun, 11 Oct 2020 11:23:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160241543590404390/blob160241543734202002')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Sun, 11 Oct 2020 11:23:57 GMT',
  'ETag',
  '"0x8D86DD82549923E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151e9c-501e-0054-0bc1-9f85e6000000',
  'x-ms-client-request-id',
  '194be09c-eed0-4538-bdc1-75cfea47f370',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-11T11:23:57.8877262Z',
  'Date',
  'Sun, 11 Oct 2020 11:23:57 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjQxNTEzOCwibmJmIjoxNjAyNDE1MTM4LCJleHAiOjE2MDI1MDE4MzgsImFpbyI6IkUyUmdZRGgzd1VuWXhwdjNZNlovNGZ2VEgxNkhBZ0E9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJhaHVlaVAzM0kwV2xVQ19xQmx3R0FBIiwidmVyIjoiMS4wIn0.vuCYt0svXFzjX6DpHwDAw2YW3bQV1hzYFQzm86EnmRWiryNU1lOK7ghay6JVLE3eFY8PTWHlMOVA1ObJHV7Tbm_JJwSNCjBdciAJOLNKgt7W3db7Xf81qd1EeRQB8rckWbbYUU91DOgM0mJJO7a2Bg6trP3bc4Tz5rBZ-ZN9Lk1Uru0zE-g9H9pUGWDPmDQKG1IWCHLBvO3tVD_7gmQH47eRYuLduaeyJE2HG_9ofoLuGMVKjZCCTpKTkb33WU5rcSD1JFe-kq6tuETnuk4tgYuJ0kiWdAolwUVZPld4XUL-oLTkK0LP9KvbUK6Q1InjHyTl0n8UwHezj6EtnQ-JXQ"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1318',
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
  '889e1b6a-f7fd-4523-a550-2fea065c0600',
  'x-ms-ests-server',
  '2.1.11140.10 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Ag9G8dNsTxNAqRBCzdn1MOl00ISJAQAAAE3iFNcOAAAA; expires=Tue, 10-Nov-2020 11:23:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 11 Oct 2020 11:23:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-11T11:18:58Z</Start><Expiry>2020-10-12T11:23:58Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-11T11:18:58Z</SignedStart><SignedExpiry>2020-10-12T11:23:58Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>p1Nm1ph5DharBcKtikPwvEHtAJ0Rm0VOOQIpkwUMwmw=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151ea8-501e-0054-13c1-9f85e6000000',
  'x-ms-client-request-id',
  'e91741d7-70d7-44fd-9b6a-a49ea0c9625f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 11:23:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160241543590404390/blob160241543734202002')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151eac-501e-0054-17c1-9f85e6000000',
  'x-ms-client-request-id',
  '7ac589b3-207c-4988-95ec-ccbe04a297e2',
  'x-ms-version',
  '2020-02-10',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Sun, 11 Oct 2020 11:23:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160241543590404390/blob160241543734202002')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151eb5-501e-0054-1fc1-9f85e6000000',
  'x-ms-client-request-id',
  '02d583ca-da09-4c3d-86db-f9b6ba17e15c',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 11 Oct 2020 11:23:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160241543590404390')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32151ec8-501e-0054-2dc1-9f85e6000000',
  'x-ms-client-request-id',
  '261ea782-3bd1-4571-8b60-1fa89adc2703',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 11 Oct 2020 11:23:59 GMT'
]);
