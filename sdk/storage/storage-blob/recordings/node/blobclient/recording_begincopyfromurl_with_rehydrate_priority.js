let nock = require('nock');

module.exports.hash = "7c1156ec1ea33497df5e4fcace763744";

module.exports.testInfo = {"uniqueName":{"container":"container159210827417807072","blob":"blob159210827419405420","copiedblobrehydrate":"copiedblobrehydrate159210827420909670"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827417807072')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8FBD5BD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309125-201e-003e-4402-42dadf000000',
  'x-ms-client-request-id',
  '244e7138-aa40-4e48-88f2-fd06f275fec5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827417807072/blob159210827419405420', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E8FE8B35"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130912b-201e-003e-4902-42dadf000000',
  'x-ms-client-request-id',
  'cb85e919-6f3f-4f17-a4c2-fd142d081a11',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:54.2147893Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827417807072/copiedblobrehydrate159210827420909670')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'ETag',
  '"0x8D81019E901E730"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130912f-201e-003e-4d02-42dadf000000',
  'x-ms-client-request-id',
  'e9868276-67fa-439e-b528-5eeec2a11d64',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.2368048Z',
  'x-ms-copy-id',
  '5820e9c2-8a3a-470a-971a-b7ee45b1775f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827417807072/blob159210827419405420')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E8FE8B35"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130913b-201e-003e-5802-42dadf000000',
  'x-ms-client-request-id',
  '9b4835ef-97c8-4104-b0bd-c2d793320d5d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.2147893Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827417807072/copiedblobrehydrate159210827420909670')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E901E730"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130913f-201e-003e-5c02-42dadf000000',
  'x-ms-client-request-id',
  'd21a881e-42e0-4615-b4b2-6394c93cce81',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.2368048Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '5820e9c2-8a3a-470a-971a-b7ee45b1775f',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159210827417807072/blob159210827419405420',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827417807072/copiedblobrehydrate159210827420909670')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309141-201e-003e-5e02-42dadf000000',
  'x-ms-client-request-id',
  '59fb1e9a-63a1-498e-8bdf-f2ae3502e69b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827417807072/copiedblobrehydrate159210827420909670')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E901E730"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309144-201e-003e-6102-42dadf000000',
  'x-ms-client-request-id',
  '6f79ed1f-6867-4ca4-acea-e2d40d63473e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:54.2368048Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '5820e9c2-8a3a-470a-971a-b7ee45b1775f',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container159210827417807072/blob159210827419405420',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Sun, 14 Jun 2020 04:17:54 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'x-ms-rehydrate-priority',
  'Standard',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827417807072')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130914a-201e-003e-6702-42dadf000000',
  'x-ms-client-request-id',
  '516d8e62-0864-4693-bf20-00299e4ba6af',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:53 GMT'
]);
