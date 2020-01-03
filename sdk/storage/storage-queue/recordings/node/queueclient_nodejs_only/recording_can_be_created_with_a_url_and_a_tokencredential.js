let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816841612402662"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816841612402662')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e39dc6b0-f003-000e-2847-688af7000000',
  'x-ms-client-request-id',
  '84639a4e-8f72-4078-a988-8da6abcddfdc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816841612402662')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31a526de-b003-002b-2447-681244000000',
  'x-ms-client-request-id',
  '59278483-d85d-4a84-aa95-1b712b41232e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:16 GMT' ]);

