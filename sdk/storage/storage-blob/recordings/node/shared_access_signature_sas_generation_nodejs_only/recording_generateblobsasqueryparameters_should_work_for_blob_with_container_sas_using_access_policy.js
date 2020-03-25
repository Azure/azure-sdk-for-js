let nock = require('nock');

module.exports.hash = "8a3f370f5e40335b44670a542e2f5fe2";

module.exports.testInfo = {"uniqueName":{"container":"container158201396829405794","blob":"blob158201396967604004"},"newDate":{"now":"2020-02-18T08:19:28.293Z","tmr":"2020-02-18T08:19:28.294Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158201396829405794')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 18 Feb 2020 08:19:29 GMT',
  'ETag',
  '"0x8D7B44B46852C97"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24c67cfc-001e-002e-1a34-e60d12000000',
  'x-ms-client-request-id',
  'efe6e993-1b2a-400c-992b-c48c24efd1fc',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 18 Feb 2020 08:19:29 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158201396829405794/blob158201396967604004')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 18 Feb 2020 08:19:29 GMT',
  'ETag',
  '"0x8D7B44B46BBC2A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24c67de6-001e-002e-6d34-e60d12000000',
  'x-ms-client-request-id',
  'a5c10137-c99a-4808-9df0-58f5575ab923',
  'x-ms-version',
  '2019-07-07',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 18 Feb 2020 08:19:29 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158201396829405794', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2020-02-18T08:14:28.2930000Z</Start><Expiry>2020-02-19T08:19:28.2940000Z</Expiry></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 18 Feb 2020 08:19:30 GMT',
  'ETag',
  '"0x8D7B44B46E8B22F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24c67ef5-001e-002e-6334-e60d12000000',
  'x-ms-client-request-id',
  'c620eaa7-b9ea-46d8-a091-0d1bf91fd94e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 18 Feb 2020 08:19:29 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158201396829405794/blob158201396967604004')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 18 Feb 2020 08:19:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7B44B46BBC2A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24c67ff3-001e-002e-4734-e60d12000000',
  'x-ms-client-request-id',
  '7330ae2c-76c9-4e49-9756-b74015fbc447',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Tue, 18 Feb 2020 08:19:29 GMT',
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
  'Tue, 18 Feb 2020 08:19:30 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158201396829405794')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24c680cf-001e-002e-0c34-e60d12000000',
  'x-ms-client-request-id',
  '9410fad5-38d2-4655-9df9-25633dc23239',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Tue, 18 Feb 2020 08:19:30 GMT' ]);
