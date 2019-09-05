let nock = require('nock');

module.exports.testInfo = {"share":"share156767545700908974","share156767545700908974":"share156767545700908974156767545740800183"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767545700908974')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'ETag',
  '"0x8D731E2D33E92AD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '441c8fc3-401a-002b-0ccb-63774f000000',
  'x-ms-client-request-id',
  '0a512164-e426-4850-940b-e64c7ecbfd17',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767545700908974156767545740800183')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'ETag',
  '"0x8D731E2D37F2218"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e69357a6-601a-0003-58cb-6316e7000000',
  'x-ms-client-request-id',
  'c869b5ae-f98a-4917-b5bf-a3c45d4fbdd6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767545700908974156767545740800183')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'ETag',
  '"0x8D731E2D37F2218"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '593cc73f-701a-00eb-0ccb-638f71000000',
  'x-ms-client-request-id',
  '72035efd-3df6-4033-be14-275e8b0c9811',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767545700908974')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9dd4204a-501a-0107-11cb-6365ed000000',
  'x-ms-client-request-id',
  '26eb2970-a72d-417f-b82e-a97a1c8ccecd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:17 GMT',
  'Connection',
  'close' ]);

