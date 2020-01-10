let nock = require('nock');

module.exports.testInfo = {"container":"container157049332515001288"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157049332515001288')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 00:08:45 GMT',
  'ETag',
  '"0x8D74B83AF9969B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a94da456-601e-0044-706c-7dba90000000',
  'x-ms-client-request-id',
  '6f675812-9bad-43e1-9d12-9cfd8d19df68',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 00:08:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157049332515001288')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 08 Oct 2019 00:08:45 GMT',
  'ETag',
  '"0x8D74B83AF9969B6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca738475-401e-0017-2c6c-7da69f000000',
  'x-ms-client-request-id',
  '1c50b0ab-c6ab-494c-b746-0328dd13e80f',
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
  'Tue, 08 Oct 2019 00:08:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157049332515001288')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '374336f0-901e-003c-746c-7dd227000000',
  'x-ms-client-request-id',
  '70a2c222-ad8e-4726-9fca-1e047832b775',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 00:08:45 GMT',
  'Connection',
  'close' ]);

