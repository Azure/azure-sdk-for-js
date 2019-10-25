let nock = require('nock');

module.exports.testInfo = {"queue":"queue157049909022806061"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157049909022806061')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6537d2a5-c003-002b-4a79-7d44ce000000',
  'x-ms-client-request-id',
  '3c194ef2-770c-4b47-bf60-7560b4845e7b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157049909022806061')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43863f58-d003-013b-7379-7d347d000000',
  'x-ms-client-request-id',
  '2d280041-7f41-4216-86b3-8d10691fff87',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 08 Oct 2019 01:44:50 GMT',
  'Connection',
  'close' ]);

