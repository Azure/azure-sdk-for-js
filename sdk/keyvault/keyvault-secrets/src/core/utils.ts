import { ParsedKeyVaultEntityIdentifier } from "./keyVaultBase";
import * as url from "url";

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
    throw new Error(`Invalid ${collection} identifier: ${identifier}. Not a valid URI`);
  }

  // Path is of the form '/collection/name[/version]'
  var segments = (baseUri.pathname || "").split("/");
  if (segments.length !== 3 && segments.length !== 4) {
    throw new Error(
      `Invalid ${collection} identifier: ${identifier}. Bad number of segments: ${segments.length}`
    );
  }

  if (collection !== segments[1]) {
    throw new Error(
      `Invalid ${collection} identifier: ${identifier}. segment [1] should be "${collection}", found "${segments[1]}"`
    );
  }

  var vaultUrl = `${baseUri.protocol}//${baseUri.host}`;
  var name = segments[2];
  var version = segments.length === 4 ? segments[3] : undefined;
  return {
    vaultUrl,
    name,
    version
  };
}
