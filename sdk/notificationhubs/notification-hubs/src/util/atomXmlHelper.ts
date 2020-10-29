import * as Constants from './constants';

export function serializeToAtomXmlRequest(resourceName: string, resource: any): object {
  const content: any = {};

  // The top level key value pairs having undefined/null as the value are removed in order to address issue where the Service Bus'
  // ATOM based management operations throw a "Bad Request" error if empty tags are included in the xml request body at top level.
  const processedResource = Object.assign({}, resource);
  Object.keys(processedResource).forEach(function(property) {
    if (processedResource[property] == undefined) {
      delete processedResource[property];
    }
  });
  content[resourceName] = processedResource;

  content[resourceName][Constants.XML_METADATA_MARKER] = {
    xmlns: "http://schemas.microsoft.com/netservices/2010/10/servicebus/connect",
    "xmlns:i": "http://www.w3.org/2001/XMLSchema-instance"
  };

  content[Constants.XML_METADATA_MARKER] = { type: "application/xml" };
  const requestDetails: any = {
    updated: new Date().toISOString(),
    content: content
  };
  requestDetails[Constants.XML_METADATA_MARKER] = {
    xmlns: "http://www.w3.org/2005/Atom"
  };
  return requestDetails;
}
