let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816833487104994"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816833487104994')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89e36b25-b003-0020-0947-680a30000000',
  'x-ms-client-request-id',
  '0ed6218c-2d58-4ad7-8573-c13f0ece6e77',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:54 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816833487104994')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a67b3fa-8003-0001-0847-686701000000',
  'x-ms-client-request-id',
  'c6f4df3e-8fbc-4a3e-8e79-af575943c9f0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:54 GMT' ]);

