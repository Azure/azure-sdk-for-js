let nock = require('nock');

module.exports.hash = "4dd736c0146c2e8d3e14ef02e0b8fe19";

module.exports.testInfo = {"uniqueName":{"container":"container160258359833805473","blob":"blob160258359862402571"},"newDate":{"now":"2020-10-13T10:06:37.598Z","tmr":"2020-10-13T10:06:37.598Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzI5NywibmJmIjoxNjAyNTgzMjk3LCJleHAiOjE2MDI2Njk5OTcsImFpbyI6IkUyUmdZUGpDcnFiMHJ2TFgxOWZtRGJ1ME9IZzBBUT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJ1VXFQSnpUNVZrZUhjbWpKY2tNREFBIiwidmVyIjoiMS4wIn0.NiVOq6v527qlu3bv3_IaW1n9SdfNIF_vd19nxyUDobYGfKEixxpG9z_u5imn-w5gp0DfhYEkWaILy_u-sSg-uTp9L0MicQ8WWEnVYm9UAGOhoi3GSkDCmr2Im-7H5fKMziaLluqMSjkRnNNmw6d0RzC6xJoMKyYWEpX4IZxMVYF2mCIhVRIe3k3pHVXT6apU03-chbwhjsVVDaMfA6NBY84sFRJYVAH9ORp10KTidhaR9y0BqTt-r24wGPy0GaPRectGaJbLPFak2LTScx0ev7PRgNEiEVbCArVOox0egPC89UEgXMEhcrKgSo5ZhzrCSNgt0-rzeo9M-IFwp-aa1Q"}, [
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
  '278f4ab9-f934-4756-8772-68c972430300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AuiEYUa7F-tDoPpi7qpYXv900ISJAQAAAC1zF9cOAAAA; expires=Thu, 12-Nov-2020 10:06:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:06:37 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:06:37Z</Start><Expiry>2020-10-14T10:06:37Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:06:37Z</SignedStart><SignedExpiry>2020-10-14T10:06:37Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>pE9JqmX24mK5QH/NKgeCMtYAyjkxQ1ggkwfRmcz7vAw=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c5f6-601e-002d-4a48-a179c2000000',
  'x-ms-client-request-id',
  '0040906f-8e4b-4350-8373-2cb2be344b22',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258359833805473')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:38 GMT',
  'ETag',
  '"0x8D86F5FACD140D1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c602-601e-002d-5248-a179c2000000',
  'x-ms-client-request-id',
  'af92bdee-a0ad-4a86-8e12-c6485eb4c48d',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258359833805473/blob160258359862402571')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:38 GMT',
  'ETag',
  '"0x8D86F5FACFD9AC2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c60b-601e-002d-5848-a179c2000000',
  'x-ms-client-request-id',
  '39da8265-8c00-410f-9f50-c5ab4d5f4a73',
  'x-ms-version',
  '2020-02-10',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-10-13T10:06:38.7802818Z',
  'Date',
  'Tue, 13 Oct 2020 10:06:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container160258359833805473/blob160258359862402571')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D86F5FACFD9AC2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c629-601e-002d-6b48-a179c2000000',
  'x-ms-client-request-id',
  '0708ddba-9c83-43d3-9891-684141b4e876',
  'x-ms-version',
  '2020-02-10',
  'x-ms-version-id',
  '2020-10-13T10:06:38.7802818Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 13 Oct 2020 10:06:38 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 10:06:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258359833805473')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c635-601e-002d-7548-a179c2000000',
  'x-ms-client-request-id',
  '7e3e3c72-e1c4-4786-98d6-18262ab8a376',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:38 GMT'
]);
