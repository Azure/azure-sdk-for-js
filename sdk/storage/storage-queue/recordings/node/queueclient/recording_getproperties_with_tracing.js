let nock = require('nock');

module.exports.testInfo = {"queue":"queue157014675414309143"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157014675414309143')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ee885bd-7003-009a-0a45-7a66d4000000',
  'x-ms-client-request-id',
  'de40052f-77a6-44fa-8751-4197df50c780',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 23:52:33 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157014675414309143')
  .query(true)
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f348a6dd-2003-0063-3f45-7a65f6000000',
  'x-ms-client-request-id',
  '4a5b71ab-bba2-4a6d-b218-fa9bd1d1a0e7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-approximate-messages-count',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 03 Oct 2019 23:52:34 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157014675414309143')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c37d9fad-c003-007b-4045-7aba91000000',
  'x-ms-client-request-id',
  '061f616c-a69d-4a6c-b567-f4cafdbd1276',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 03 Oct 2019 23:52:34 GMT' ]);

