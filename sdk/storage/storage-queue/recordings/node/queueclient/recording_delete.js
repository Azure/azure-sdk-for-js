let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816834382404455"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834382404455')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64272023-f003-0041-2e47-684eef000000',
  'x-ms-client-request-id',
  'c5450924-8ff7-493e-8922-b9a906219886',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:03 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816834382404455')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e69b886a-0003-001b-2947-68486e000000',
  'x-ms-client-request-id',
  '17be6e3d-f93c-4a26-8876-d8fab2873928',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:03 GMT' ]);

