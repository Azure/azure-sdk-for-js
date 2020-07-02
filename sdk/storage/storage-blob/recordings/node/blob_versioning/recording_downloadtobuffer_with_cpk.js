let nock = require('nock');

module.exports.hash = "084794f83c7ea813a5b667148ee3ceda";

module.exports.testInfo = {"uniqueName":{"container":"container158511863727805139","blob":"blob158511864171607121","blobCPK":"blobCPK158511864234403164"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511863727805139')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:44:02 GMT',
  'ETag',
  '"0x8D7D087E7EC2675"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d77b-e01e-000c-5870-021236000000',
  'x-ms-client-request-id',
  '52904539-8bc9-452c-9424-7cf890acd8c7',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 06:44:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511863727805139/blob158511864171607121', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:44:02 GMT',
  'ETag',
  '"0x8D7D087E81B3632"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d792-e01e-000c-6970-021236000000',
  'x-ms-client-request-id',
  'c82c4a86-3585-4953-9e56-f4976538b47b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T06:44:02.9474354Z',
  'Date',
  'Wed, 25 Mar 2020 06:44:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511863727805139/blob158511864171607121')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:44:03 GMT',
  'ETag',
  '"0x8D7D087E84C3A47"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d79c-e01e-000c-7170-021236000000',
  'x-ms-client-request-id',
  '47be5b35-a63e-4250-afb4-ddcd4ba846f4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-25T06:44:03.2706668Z',
  'Date',
  'Wed, 25 Mar 2020 06:44:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158511863727805139/blobCPK158511864234403164', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:44:03 GMT',
  'ETag',
  '"0x8D7D087E87C0590"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d7a4-e01e-000c-7870-021236000000',
  'x-ms-client-request-id',
  'aa8ea488-884a-4e53-b958-b557c9359b3b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2020-03-25T06:44:03.5818896Z',
  'Date',
  'Wed, 25 Mar 2020 06:44:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158511863727805139/blobCPK158511864234403164')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:44:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D087E87C0590"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d7ae-e01e-000c-8070-021236000000',
  'x-ms-client-request-id',
  'c5354194-7dfe-4845-9459-108112f4b9bf',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T06:44:03.5818896Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 06:44:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 06:44:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158511863727805139/blobCPK158511864234403164')
  .reply(206, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-10/11',
  'Last-Modified',
  'Wed, 25 Mar 2020 06:44:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7D087E87C0590"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d7b6-e01e-000c-0870-021236000000',
  'x-ms-client-request-id',
  '90c8af3a-8188-4362-8e3d-2387357bab52',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-25T06:44:03.5818896Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 25 Mar 2020 06:44:03 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 06:44:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158511863727805139/blobCPK158511864234403164')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d7d0-e01e-000c-1b70-021236000000',
  'x-ms-client-request-id',
  '04e6330a-0216-4ed6-a89e-29dfd9527d07',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 25 Mar 2020 06:44:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158511863727805139')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40e5d7de-e01e-000c-2670-021236000000',
  'x-ms-client-request-id',
  '0a8f9fc5-2e6e-4c63-8547-ea8e35eef7d6',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 25 Mar 2020 06:44:04 GMT'
]);
