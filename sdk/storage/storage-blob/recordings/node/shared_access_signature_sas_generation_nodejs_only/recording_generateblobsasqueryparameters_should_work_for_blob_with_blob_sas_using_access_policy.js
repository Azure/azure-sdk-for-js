let nock = require('nock');

module.exports.hash = "0561452bc1a37c1779c77e9482e1b8f5";

module.exports.testInfo = {"uniqueName":{"container":"container158167179550507142","blob":"blob158167179583908200"},"newDate":{"now":"2020-02-14T09:16:35.505Z","tmr":"2020-02-14T09:16:35.505Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158167179550507142')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:35 GMT',
  'ETag',
  '"0x8D7B12E96FFB25E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821cd3-101e-0032-3017-e35f72000000',
  'x-ms-client-request-id',
  '7bf18575-3106-4058-91b5-a8d21052702e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 14 Feb 2020 09:16:35 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158167179550507142/blob158167179583908200')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:35 GMT',
  'ETag',
  '"0x8D7B12E973040E5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821dfd-101e-0032-4c17-e35f72000000',
  'x-ms-client-request-id',
  'fdb58ffb-20a8-48e6-ae1b-7f498e8abee0',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 14 Feb 2020 09:16:35 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158167179550507142', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2020-02-14T09:11:35.5050000Z</Start><Expiry>2020-02-15T09:16:35.5050000Z</Expiry><Permission>racwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:36 GMT',
  'ETag',
  '"0x8D7B12E975DD7BA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4821f47-101e-0032-0717-e35f72000000',
  'x-ms-client-request-id',
  '389c162b-69c3-4914-8540-ac7a1a687958',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 14 Feb 2020 09:16:36 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158167179550507142/blob158167179583908200')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 14 Feb 2020 09:16:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7B12E973040E5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f482208a-101e-0032-3717-e35f72000000',
  'x-ms-client-request-id',
  '2a336425-e443-460f-bd3d-cd521eca8aab',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Fri, 14 Feb 2020 09:16:35 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 14 Feb 2020 09:16:36 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158167179550507142')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f48221a3-101e-0032-4217-e35f72000000',
  'x-ms-client-request-id',
  'f1972c60-e9eb-4df4-8d1f-3ee8ac3994a4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 14 Feb 2020 09:16:36 GMT' ]);
