let nock = require('nock');

module.exports.hash = "b49793bd1dd08ef55a2ddc4aa2808065";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P8_node","RowKey":"R8","integerNumber":3,"floatingPointNumber":3.14})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.5421452Z'"`,
  'Location',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d80b2-7002-00b5-45cd-5c8c40000000',
  'x-ms-client-request-id',
  'ec5b4161-9551-4cb5-b604-02deed9753fe',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A10.5421452Z'\"","PartitionKey":"P8_node","RowKey":"R8","Timestamp":"2021-06-09T01:17:10.5421452Z","integerNumber":3,"floatingPointNumber":3.14}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.5421452Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d80be-7002-00b5-50cd-5c8c40000000',
  'x-ms-client-request-id',
  '59cb11fe-fd0b-48af-8e85-3e660e771b65',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d80d0-7002-00b5-61cd-5c8c40000000',
  'x-ms-client-request-id',
  '60809a14-9c29-441d-bfc6-69346e2c6ad5',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);
