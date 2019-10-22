let nock = require('nock');

module.exports.testInfo = {"container":"container157172179680805867","blob":"blob157172179688601576","dest-container":"dest-container157172179696509611","copiedblob":"copiedblob157172179722401723"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157172179680805867')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF16B809F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e766b2c-e01e-00db-5998-8895c9000000',
  'x-ms-client-request-id',
  'b0e9ec66-15ac-46fa-9e34-9a103d95ae35',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157172179680805867/blob157172179688601576', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF177EACC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd7073f1f-d01e-0079-2198-88afd0000000',
  'x-ms-client-request-id',
  '19ca953c-605a-4a8a-88b7-9c9747f64a08',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179696509611')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'ETag',
  '"0x8D756AFF185D0D9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e30e869-201e-0052-6098-882f1c000000',
  'x-ms-client-request-id',
  '807955cc-1a3b-4a3a-a45d-88b6be23e0d6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/dest-container157172179696509611/copiedblob157172179722401723')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'ETag',
  '"0x8D756AFF1B28DB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7720ac9c-a01e-00b8-4998-880832000000',
  'x-ms-client-request-id',
  '0740d1c3-8847-4307-843c-4743f9797d89',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '8300c788-ee6e-4a90-bc8d-d906876d7145',
  'x-ms-copy-status',
  'success',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157172179680805867/blob157172179688601576')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756AFF177EACC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e80fb625-401e-0036-0298-88de84000000',
  'x-ms-client-request-id',
  '8eadddbe-2533-45b0-80de-5300583df7f5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 22 Oct 2019 05:23:16 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/dest-container157172179696509611/copiedblob157172179722401723')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D756AFF1B28DB1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7720ad61-a01e-00b8-6b98-880832000000',
  'x-ms-client-request-id',
  'c01d2638-eddd-4b36-a16f-1b57bdf5c954',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '8300c788-ee6e-4a90-bc8d-d906876d7145',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container157172179680805867/blob157172179688601576',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Tue, 22 Oct 2019 05:23:17 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 22 Oct 2019 05:23:16 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157172179680805867')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e766eb4-e01e-00db-1898-8895c9000000',
  'x-ms-client-request-id',
  '027c1a42-4cdd-4d41-af5f-9c5cc8eeeb92',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/dest-container157172179696509611')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e30eaf2-201e-0052-1998-882f1c000000',
  'x-ms-client-request-id',
  '8a237a58-9cec-4681-8d23-41ade7b18c1d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 22 Oct 2019 05:23:17 GMT'
]);

