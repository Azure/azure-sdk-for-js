let nock = require('nock');

module.exports.hash = "2013d0a0cd0ee9d96c356642b3cb8925";

module.exports.testInfo = {"uniqueName":{"queue":"queue160717088511808435"},"newDate":{"now":"2020-12-05T12:21:25.116Z","tmr":"2020-12-05T12:21:25.118Z"}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue160717088511808435')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '017975bd-c003-003c-7e01-cb7c3a000000',
  'x-ms-client-request-id',
  'ed539f74-3e99-4003-a039-9ffa2a5affe8',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 12:21:25 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue160717088511808435')
  .query(true)
  .reply(200, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01797602-c003-003c-3901-cb7c3a000000',
  'x-ms-client-request-id',
  '2ba4a4b8-0dd9-4451-9591-612ac042fd37',
  'x-ms-version',
  '2020-02-10',
  'x-ms-approximate-messages-count',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 05 Dec 2020 12:21:26 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue160717088511808435')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01797626-c003-003c-5201-cb7c3a000000',
  'x-ms-client-request-id',
  'd7aa363f-4823-46ba-aa50-11f261b1da6e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 12:21:26 GMT'
]);
