let nock = require('nock');

module.exports.hash = "75402fe6f1951c602e0c3a78d3a4a8dc";

module.exports.testInfo = {"uniqueName":{"container":"container159210827403703315","blob":"blob159210827405304335","blobCPK":"blobCPK159210827405309896"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827403703315')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8E478ED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090df-201e-003e-0502-42dadf000000',
  'x-ms-client-request-id',
  'fbdbd75f-56c1-4e6a-9fc3-13aaf50fee62',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827403703315/blob159210827405304335', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8E72E6D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090e6-201e-003e-0b02-42dadf000000',
  'x-ms-client-request-id',
  '1580214e-43dd-4225-b39e-ef815dbc67cb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.0616813Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827403703315/blobCPK159210827405309896', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8E978C3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090ef-201e-003e-1402-42dadf000000',
  'x-ms-client-request-id',
  'c851fda9-94e3-4b8c-aba1-31ec8205dc88',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2020-06-14T04:17:54.0766915Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827403703315/blobCPK159210827405309896')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8EC114B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090f5-201e-003e-1a02-42dadf000000',
  'x-ms-client-request-id',
  'df9b7675-aec3-4a07-9557-e921e1bf9e7d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.0947035Z',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827403703315/blobCPK159210827405309896')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c13090ff-201e-003e-2402-42dadf000000',
  'x-ms-client-request-id',
  '80dd7e2c-ad72-4f2b-a2b2-b6847fc65836',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827403703315/blobCPK159210827405309896')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8EFBB78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309104-201e-003e-2802-42dadf000000',
  'x-ms-client-request-id',
  '06bc2688-f1fd-46bc-b865-49f70f298142',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827403703315/blobCPK159210827405309896')
  .reply(200, [], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'AQIDBA==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E8EFBB78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309107-201e-003e-2b02-42dadf000000',
  'x-ms-client-request-id',
  'c9aaa01f-97d2-42e4-892d-d4b08d3236c5',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.0947035Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827403703315/blobCPK159210827405309896')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8EFBB78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309108-201e-003e-2c02-42dadf000000',
  'x-ms-client-request-id',
  '32a4725e-da17-4110-8ed7-d05c10e14a08',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.1477395Z',
  'x-ms-snapshot',
  '2020-06-14T04:17:54.1467395Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827403703315/blobCPK159210827405309896')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'AQIDBA==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E8EFBB78"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309115-201e-003e-3602-42dadf000000',
  'x-ms-client-request-id',
  '7e99b3dd-2100-43cb-8043-a0d2b541e68a',
  'x-ms-version',
  '2019-12-12',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827403703315/blobCPK159210827405309896')
  .query(true)
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309119-201e-003e-3a02-42dadf000000',
  'x-ms-client-request-id',
  '856135a2-74ea-4c78-8682-8ac1b793b461',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827403703315')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309121-201e-003e-4002-42dadf000000',
  'x-ms-client-request-id',
  'a886bf23-0f89-4c70-af89-b17f05e65f51',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);
