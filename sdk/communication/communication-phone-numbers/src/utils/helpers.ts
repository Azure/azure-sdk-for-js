import { PhoneNumberCapabilities, PurchasedPhoneNumber } from "../models";
import { PurchasedPhoneNumberCapabilities as GeneratedPurchasedPhoneNumberCapabilities } from "../generated/src/models"
import { PurchasedPhoneNumber as GeneratedPurchasedPhoneNumber } from "../generated/src/models";

export class Helpers {
  public static getPurchasePhoneNumber(number : GeneratedPurchasedPhoneNumber){
    return {
      id: number.id,
      phoneNumber: number.phoneNumber,
      countryCode: number.countryCode,
      phoneNumberType: number.phoneNumberType,
      capabilities: this.getCapabilities(number.capabilities),
      assignmentType: number.assignmentType,
      purchaseDate: number.purchaseDate,
      cost: number.cost,
      operatorId: number.operatorId,
      operatorName: number.operatorName
    } as PurchasedPhoneNumber;
  }

  public static getCapabilities(capabilities : GeneratedPurchasedPhoneNumberCapabilities){

    if(!capabilities.hasOwnProperty("tenDLCCampaignBriefId") || capabilities.tenDLCCampaignBriefId === undefined){
      return {
        calling: capabilities.calling,
        sms: capabilities.sms,
      } as PhoneNumberCapabilities;
    }
    else{
      return {
        calling: capabilities.calling,
        sms: capabilities.sms,
        tenDLCCampaignBriefId: capabilities.tenDLCCampaignBriefId
      } as PhoneNumberCapabilities;
    }
    
  }
}

