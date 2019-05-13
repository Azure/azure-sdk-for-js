let nock = require('nock');

module.exports.testInfo = {"queue":"queue155564489074501630"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564489074501630')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62a4aaab-d003-0096-5960-f6ff6c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:34:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564489074501630')
  .query({"comp":"metadata","timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc6b3c7c-d003-0015-3960-f65fc1000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:34:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564489074501630')
  .query({"comp":"metadata","timeout":"30"})
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8857589-2003-0088-3760-f62581000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-approximate-messages-count',
  '0',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:34:51 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564489074501630')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d8fe49b-9003-0030-1460-f6c772000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:34:52 GMT',
  'Connection',
  'close' ]);
