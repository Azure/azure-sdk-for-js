let nock = require('nock');

module.exports.hash = "fcae71fe9c0a2f3a3343d2cefa28466e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/documentModels')
  .query(true)
  .reply(200, {"value":[{"modelId":"prebuilt-idDocument","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from US driver licenses and international passports."},{"modelId":"prebuilt-layout","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract text, selection marks, tables, and other layout information."},{"modelId":"prebuilt-invoice","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from English invoices, including customer, vendor, invoice ID, due date, total, and more."},{"modelId":"prebuilt-document","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract text, selection marks, tables, entities, and general key-value pairs."},{"modelId":"prebuilt-receipt","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from English receipts, including merchant name, transaction date, transaction total, and more."},{"modelId":"prebuilt-businessCard","createdDateTime":"2021-07-30T00:00:00Z","description":"Prebuilt model to extract key information from English business cards, including personal contact info, company name, job title, and more."},{"modelId":"copyTarget163337131337006713","createdDateTime":"2021-10-04T18:15:09Z"},{"modelId":"composedModelName163337183914902643","createdDateTime":"2021-10-04T18:23:59Z"},{"modelId":"modelName163337188938006462","createdDateTime":"2021-10-04T18:24:51Z"},{"modelId":"input1163337186973805237","createdDateTime":"2021-10-04T18:24:32Z"},{"modelId":"azsdkJavaScript037058","createdDateTime":"2021-10-04T18:10:39Z"},{"modelId":"input2163337183083602943","createdDateTime":"2021-10-04T18:23:54Z"},{"modelId":"copySource163337130657801160","createdDateTime":"2021-10-04T18:15:09Z"},{"modelId":"customFormModelName163337115963302920","createdDateTime":"2021-10-04T18:12:42Z"},{"modelId":"input1163337125098407403","createdDateTime":"2021-10-04T18:14:13Z"},{"modelId":"copySource163337187682004555","createdDateTime":"2021-10-04T18:24:39Z"},{"modelId":"composedModelName163337130609209319","createdDateTime":"2021-10-04T18:15:06Z"},{"modelId":"input2163337125098509178","createdDateTime":"2021-10-04T18:14:13Z"},{"modelId":"input1163337183083404470","createdDateTime":"2021-10-04T18:23:53Z"},{"modelId":"copySource163337125885001523","createdDateTime":"2021-10-04T18:14:21Z"},{"modelId":"copyTarget163337188343308910","createdDateTime":"2021-10-04T18:24:39Z"},{"modelId":"customFormModelName163337173870804431","createdDateTime":"2021-10-04T18:22:21Z"},{"modelId":"copySource163337183967902573","createdDateTime":"2021-10-04T18:24:02Z"},{"modelId":"customFormModelName163337159276803720","createdDateTime":"2021-10-04T18:19:55Z"},{"modelId":"copyTarget163337184656409458","createdDateTime":"2021-10-04T18:24:02Z"},{"modelId":"copyTarget163337126577104571","createdDateTime":"2021-10-04T18:14:21Z"},{"modelId":"composedModelName163337187639305208","createdDateTime":"2021-10-04T18:24:36Z"},{"modelId":"input2163337129909206437","createdDateTime":"2021-10-04T18:15:01Z"},{"modelId":"composedModelName163337125806502764","createdDateTime":"2021-10-04T18:14:18Z"},{"modelId":"input1163337129908806200","createdDateTime":"2021-10-04T18:15:01Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '763c241e-5579-40fd-85ff-9176807c017c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 04 Oct 2021 18:25:02 GMT'
]);
