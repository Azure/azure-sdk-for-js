let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157592665127602446","blob":"blob157592665147600158","randomstring":"randomstring157592665147601522"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592665127602446')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:24:11 GMT',
  'ETag',
  '"0x8D77CEE222E62DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcf7b22b-001e-00fa-59d6-aef991000000',
  'x-ms-client-request-id',
  '3ae0b546-ae3d-4465-9147-37fa69443fba',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:24:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592665127602446/blob157592665147600158', "randomstring157592665147601522")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'x/EHLw8yNJrur368nG4sNw==',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:24:11 GMT',
  'ETag',
  '"0x8D77CEE224BF478"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e6fa29f0-c01e-0124-4ad6-aeef6d000000',
  'x-ms-client-request-id',
  '09069b53-c884-4b0a-b533-91a70f079e63',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'PxU/7s2wiXk=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Dec 2019 21:24:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157592665127602446/blob157592665147600158')
  .reply(200, "randomstring157592665147601522", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'x/EHLw8yNJrur368nG4sNw==',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:24:11 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D77CEE224BF478"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b29f19ef-701e-00f5-57d6-ae1467000000',
  'x-ms-client-request-id',
  'f2a82c53-7dc9-4f85-92d3-c8786cd4d811',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 09 Dec 2019 21:24:11 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Dec 2019 21:24:11 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157592665127602446')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcf7b30f-001e-00fa-1bd6-aef991000000',
  'x-ms-client-request-id',
  '01af28af-1fad-4a6f-a16e-60aad2ada97d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:24:11 GMT' ]);
