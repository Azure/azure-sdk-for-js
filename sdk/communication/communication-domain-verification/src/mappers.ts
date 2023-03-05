
import {
  VerifyDomainOwnershipPostResponse
} from "./generated/src/models";
import { DomainOwnership, DomainVerificationStatus } from "./models";

export function ConvertToDomainOwnership(verifyDomainOwnershipResponse: VerifyDomainOwnershipPostResponse): DomainOwnership
{ 
  var result: DomainOwnership= { status: verifyDomainOwnershipResponse.status as DomainVerificationStatus };
  return result;
}
