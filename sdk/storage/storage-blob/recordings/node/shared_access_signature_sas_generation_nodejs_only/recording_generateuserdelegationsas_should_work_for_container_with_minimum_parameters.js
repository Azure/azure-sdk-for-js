let nock = require('nock');

module.exports.hash = "5c45c034633ef927b271c27527735d9b";

module.exports.testInfo = {"uniqueName":{"container":"container160258096217500558"},"newDate":{"now":"2020-10-13T09:22:41.527Z","tmr":"2020-10-13T09:22:41.527Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72f988bf-86f1-41af-91ab-2d7cd011db47/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=ff2898b4-369c-47c3-a476-f45ffc9064ef&client_secret=kFm4Gh3r_3ZXon03pcLz10_.X-.5mKFKrf&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MDY2MSwibmJmIjoxNjAyNTgwNjYxLCJleHAiOjE2MDI2NjczNjEsImFpbyI6IkUyUmdZSGljN0g0aDQ4dXhzL1Z1SFoxZTIyc21BUUE9IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJKc1FSZnhSd2FVLTA2TDJKejVNREFBIiwidmVyIjoiMS4wIn0.U6mAVll_xXZdhZUTB__p2nfh0-EBGucdUzhb_aCDCcfJ3FKr_gnX7X_HAtISSRIgtZSGf24ROnJebaYb61U77j0vLZi4AsX47lNFJ03Pqg6vy-OtngLrUIix0_LgAFnh3nwPg66aCayjWw4jJNbFzju1cqAglOSvZtlC_YUYtHHfVKj65gP4G5drtbv2bjEGInVHuqo8VGtd1sgXWaMtG6NO6_2w8ZA_Q4xneQIk9YPEZ2ifuhGoDRozSohH4EgpCtjYqkPdAvSP1K3U9i_rBuNceuMATjssZRtejSmuMDA1DcWT-HOXFThG8NiCfq-b9sSD9zY_snCUZP3A8Fo5dg"}, [
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
  '7f11c426-7014-4f69-b4e8-bd89cf930300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AhSk4DNuAuxLltsFjIZ3QEN00ISJAQAAAOFoF9cOAAAA; expires=Thu, 12-Nov-2020 09:22:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 09:22:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T08:22:41Z</Start><Expiry>2020-10-14T09:22:41Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>72f988bf-86f1-41af-91ab-2d7cd011db47</SignedTid><SignedStart>2020-10-13T08:22:41Z</SignedStart><SignedExpiry>2020-10-14T09:22:41Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>nxjTxNuewXDkBVCyEznrHdUc1aBevORZkqxi/RR/9RM=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95af6-401e-0058-2c42-a112ee000000',
  'x-ms-client-request-id',
  '8df9ee6a-f74b-41b8-9b7d-6554f7934e9c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258096217500558')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 09:22:42 GMT',
  'ETag',
  '"0x8D86F59898A8DD4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95afd-401e-0058-3242-a112ee000000',
  'x-ms-client-request-id',
  'bc550a1b-0b03-4fad-a783-1e7e53f329be',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160258096217500558')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160258096217500558\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b09-401e-0058-3942-a112ee000000',
  'x-ms-client-request-id',
  '272705dc-acac-4038-a885-f9df7df0e8b3',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 09:22:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258096217500558')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbc95b0e-401e-0058-3d42-a112ee000000',
  'x-ms-client-request-id',
  '2f9c2a43-e31e-4708-bca0-1e22cf3739e8',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 09:22:42 GMT'
]);
