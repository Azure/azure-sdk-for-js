// Copyright (c) Microsoft Corporation.  All rights reserved.

// Register DocDB JavaScript server API for intelisense: 
//   either add the file to Tools->Options->Text Editor->JavaScript->Intellisense->References and reference the group registered 
//   or provide path to the file explicitly.
/// <reference group="Generic" />
/// <reference path="C:\Program Files (x86)\Microsoft Visual Studio 12.0\JavaScript\References\DocDbWrapperScript.js" />

/**
* This is run as user defined function and does the following:
*   For given document (CompanyRecord), compute the tax and return it.
*
* @param {Document} doc - the document (CompanyRecord) to compute tax for.
*/
function tax(doc) {
    // Use simple formula to compute the tax: use income multiplied by factor based on country of headquarters.
    var factor =
        doc.headquarters == "USA" ? 0.35 :
        doc.headquarters == "Germany" ? 0.3 :
        doc.headquarters == "Russia" ? 0.2 :
        0;

    // Check for bad data.
    if (factor == 0) {
        throw new Error("Unsupported country: " + doc.headquarters);
    }
    
    // Use simple formula and return.
    return doc.income * factor;
}
