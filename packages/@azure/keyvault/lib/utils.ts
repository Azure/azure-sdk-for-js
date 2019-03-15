import { ParsedKeyVaultEntityIdentifier } from "./secretsModels";
import * as url from "url";
import * as util from "util";

export function parseKeyvaultIdentifier(
  collection: string,
  identifier: string | undefined
): ParsedKeyVaultEntityIdentifier {
  if (typeof collection != "string" || !(collection = collection.trim())) {
    throw new Error("Invalid collection argument");
  }

  if (typeof identifier != "string" || !(identifier = identifier.trim())) {
    throw new Error("Invalid identifier argument");
  }

  var baseUri;
  try {
    baseUri = url.parse(identifier, true, true);
  } catch (e) {
    throw new Error(
      util.format("Invalid %s identifier: %s. Not a valid URI", collection, identifier)
    );
  }

  // Path is of the form '/collection/name[/version]'
  var segments = (baseUri.pathname || "").split("/");
  if (segments.length !== 3 && segments.length !== 4) {
    throw new Error(
      util.format(
        "Invalid %s identifier: %s. Bad number of segments: %d",
        collection,
        identifier,
        segments.length
      )
    );
  }

  if (collection !== segments[1]) {
    throw new Error(
      util.format(
        'Invalid %s identifier: %s. segment [1] should be "%s", found "%s"',
        collection,
        identifier,
        collection,
        segments[1]
      )
    );
  }

  var vaultUrl = util.format("%s//%s", baseUri.protocol, baseUri.host);
  var name = segments[2];
  var version = segments.length === 4 ? segments[3] : undefined;
  return {
    vaultUrl,
    name,
    version
  };
}
