let nock = require('nock');

module.exports.hash = "d4f6972bb994b640bcae8d0352293f32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P8_node","RowKey":"R8","integerNumber":3,"floatingPointNumber":3.14,"booleanValue":true})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-10-15T16%3A13%3A13.0086838Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e928-c002-000d-31df-c16eb3000000',
  'x-ms-client-request-id',
  'b73e7251-919f-44c5-876e-1daa499af4c9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')",
  'Date',
  'Fri, 15 Oct 2021 16:13:12 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P8_node',RowKey='R8')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-10-15T16%3A13%3A13.0086838Z'\"","PartitionKey":"P8_node","RowKey":"R8","Timestamp":"2021-10-15T16:13:13.0086838Z","integerNumber":3,"floatingPointNumber":3.14,"booleanValue":true}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-10-15T16%3A13%3A13.0086838Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7e94e-c002-000d-53df-c16eb3000000',
  'x-ms-client-request-id',
  '6a6adf2c-b885-4409-aebf-a6d0641049bf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:12 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
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
  '5af7e978-c002-000d-77df-c16eb3000000',
  'x-ms-client-request-id',
  '0e3e6d32-9adf-4729-b6c1-787d77f45734',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:12 GMT'
]);
