
import {
  VerifyDomainOwnershipPostResponse
} from "./generated/src/models";
import { DomainOwnership, Status } from "./models";

export function ConvertToDomainOwnership(verifyDomainOwnershipResponse: VerifyDomainOwnershipPostResponse): DomainOwnership
{ 
  var result: DomainOwnership= { status: verifyDomainOwnershipResponse.status as Status };
  return result;
}
