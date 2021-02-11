let nock = require('nock');

module.exports.hash = "1b91dbeefd66be8d835c7c90dce21003";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestnode', {"PartitionKey":"P3_node","RowKey":"R3","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c","testField@odata.type":"Edm.Guid"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A57.0819651Z'"`,
  'Location',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P3_node',RowKey='R3')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa629-2002-00b8-4ddd-f8a3cb000000',
  'x-ms-client-request-id',
  '95c20bd4-7d93-4b58-ac65-e0ba8dfaeeaf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakestorageaccount.table.core.windows.net/tableClientTestnode(PartitionKey='P3_node',RowKey='R3')",
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestnode(PartitionKey='P3_node',RowKey='R3')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestnode/@Element","odata.etag":"W/\"datetime'2021-02-01T20%3A58%3A57.0819651Z'\"","PartitionKey":"P3_node","RowKey":"R3","Timestamp":"2021-02-01T20:58:57.0819651Z","testField@odata.type":"Edm.Guid","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-02-01T20%3A58%3A57.0819651Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa632-2002-00b8-55dd-f8a3cb000000',
  'x-ms-client-request-id',
  '6444951e-13ea-47f2-89bf-663c8d261fd7',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestnode(PartitionKey='P3_node',RowKey='R3')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd63fa63d-2002-00b8-5fdd-f8a3cb000000',
  'x-ms-client-request-id',
  '69c89ba9-c95e-4b2f-b36c-cd2f244bdb4e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 01 Feb 2021 20:58:56 GMT'
]);
