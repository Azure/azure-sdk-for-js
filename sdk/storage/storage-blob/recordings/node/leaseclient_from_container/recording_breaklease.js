let nock = require('nock');

module.exports.testInfo = {"container":"container156816848368300721"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816848368300721')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:24 GMT',
  'ETag',
  '"0x8D7365EBE191727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0556d705-a01e-0059-4d47-68637a000000',
  'x-ms-client-request-id',
  '6fc38069-5f70-4dae-beb4-6a8f628c97b8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:23 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816848368300721')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:24 GMT',
  'ETag',
  '"0x8D7365EBE191727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ec33199-601e-004f-6047-68a2e4000000',
  'x-ms-client-request-id',
  '3278985a-a76a-4754-87ea-f73a773e2ba3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Wed, 11 Sep 2019 02:21:23 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816848368300721')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:24 GMT',
  'ETag',
  '"0x8D7365EBE191727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fea9fbc-b01e-0009-0747-687c72000000',
  'x-ms-client-request-id',
  '63bfe748-fa55-4afd-8ecf-a39ed757f6ea',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:24 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816848368300721')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:24 GMT',
  'ETag',
  '"0x8D7365EBE191727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a27411c0-b01e-0046-2447-68b86a000000',
  'x-ms-client-request-id',
  '7a786778-79ed-48ce-8f43-794cff89fc28',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-time',
  '3',
  'Date',
  'Wed, 11 Sep 2019 02:21:24 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816848368300721')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:24 GMT',
  'ETag',
  '"0x8D7365EBE191727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9724a63-501e-004c-1e47-68a1e3000000',
  'x-ms-client-request-id',
  'fbcde43d-1016-48a7-8463-1524d5100ae6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'breaking',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816848368300721')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:24 GMT',
  'ETag',
  '"0x8D7365EBE191727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e4314b78-a01e-0052-7247-687b0e000000',
  'x-ms-client-request-id',
  'cab23371-bed0-4578-8374-ef82501071cb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'broken',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816848368300721')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e18a8683-d01e-0030-7347-683cd6000000',
  'x-ms-client-request-id',
  '4121349b-7331-4dc2-aa04-cf7114ba5b87',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:28 GMT' ]);

