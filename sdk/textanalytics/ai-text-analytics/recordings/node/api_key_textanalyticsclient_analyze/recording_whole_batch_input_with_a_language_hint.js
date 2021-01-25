let nock = require('nock');

module.exports.hash = "c8eb8ec49148f3997b148dde3f0af7b0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(404, "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\"http://www.w3.org/TR/html4/strict.dtd\">\r\n<HTML><HEAD><TITLE>Not Found</TITLE>\r\n<META HTTP-EQUIV=\"Content-Type\" Content=\"text/html; charset=us-ascii\"></HEAD>\r\n<BODY><h2>Not Found</h2>\r\n<hr><p>HTTP Error 404. The requested resource is not found.</p>\r\n</BODY></HTML>\r\n", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'text/html; charset=us-ascii',
  'apim-request-id',
  '2362041c-e7ec-43fc-8157-56ede67f5873',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 19 Nov 2020 20:21:28 GMT'
]);
