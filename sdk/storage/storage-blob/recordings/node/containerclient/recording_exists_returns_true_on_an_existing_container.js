let nock = require('nock');

module.exports.testInfo = {"container":"container156996519029203415"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156996519029203415')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:30 GMT',
  'ETag',
  '"0x8D746B6065A6F31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52d32937-001e-0097-549e-7853bf000000',
  'x-ms-client-request-id',
  '2248c915-a1a6-4a14-8865-e58022a8bbc2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156996519029203415')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Oct 2019 21:26:30 GMT',
  'ETag',
  '"0x8D746B6065A6F31"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ecce4b28-201e-004c-139e-78f769000000',
  'x-ms-client-request-id',
  '76d2d0cd-826c-4452-ab33-fd90635db26b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
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
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156996519029203415')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3885459c-f01e-0067-479e-7883d1000000',
  'x-ms-client-request-id',
  '850eb963-5c39-49e2-9dd0-0b5d2694fc6b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 01 Oct 2019 21:26:29 GMT' ]);

