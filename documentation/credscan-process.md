# Guide for monitoring CredScan checks

This guide describes how package owners can monitor their package's Credential Scanner (CredScan) status and correct
any warnings.

General information about CredScan can be found in the overview documentation at [aka.ms/credscan][credscan_doc]. The
Azure SDK's motivation and methodology for running CredScan is documented [here][devops_doc].

## Table of Contents
- [Check CredScan status](#check-credscan-status)
- [Correct active warnings](#correct-active-warnings)
  - [True positives](#true-positives)
  - [False positives](#false-positives)

## Check CredScan status

CredScan is run each night over the entire `azure-sdk-for-js` repository as part of the
[js - aggregate-reports][aggregate_reports] pipeline. The scan produces a list of active warnings in the "Post
Analysis" task of the "ComplianceTools" job ([example output][credscan_output]).

Each warning will begin with the path to the file containing a potential credential, as well as the row and column where
the credential string begins. For example, for a potential credential that starts in row 29 and column 13 of a
particular file:
```
##[error]sdk/{service}/{package}/{path-to-file}.ts:sdk/{service}/{package}/{path-to-file}.ts(29,13):
```

The warning will then list an error code and description of why the potential credential was flagged.

## Correct active warnings

If you find any warnings listed for a package you own, the next step is to determine if the potential credential found
by CredScan is an actual credential (a true positive), or a fake credential/false flag (a false positive).

### True positives

If CredScan discovers an actual credential, please contact the EngSys team at azuresdkengsysteam@microsoft.com so any
remediation can be done.

### False positives

If CredScan flags something that's not actually a credential or secret, we can suppress the warning to shut off the
false alarm. CredScan allows you to suppress fake credentials by either suppressing a string value or by suppressing
warnings for a whole file. **Files that contain more than just fake credentials shouldn't be suppressed.**

Credential warnings are suppressed in [eng/CredScanSuppression.json][suppression_file]. Suppressed string values are in
the `"placeholder"` list, and suppressed files are in the `"file"` lists under `"suppressions"`.

If you have a fake credential flagged by CredScan, try one of the following (listed from most to least preferable):
  - Import and use a suitable credential from a file that's already suppressed in [eng/CredScanSuppression.json][suppression_file]. If the fake credential will be used by multiple packages, consider adding and exporting it in the `test-utils` package.
  - If the test credentials are specific to your package, create a `fakeTestSecrets.ts` file under your `test` folder, add and export the fake secrets from this file, and add the file path to the list of suppressed files if necessary.
  - Replace the credential with a string value that's already suppressed in [eng/CredScanSuppression.json][suppression_file]. "SecretPlaceholder" is a good one to use.
  - Add the string that uses credential to the list of suppressed string values. For examples, `"password: fakeTestSecretPlaceholder,"`

Ideally, fake credential files -- which contain nothing but fake secrets -- should be suppressed and their fake
credentials shouldn't appear in any other files. Sanitizers should be used to keep fake credentials out of test
recordings when possible. String value suppression should be avoided unless the string appears in many files.

Suppressing string values will disable warnings no matter where the string comes up during a scan, but is inefficient
and inconvenient for lengthy strings. **Note** due to current limitation of the CredScan tool, a whole text line is suppress if the line matches one suppression pattern, which means if a real secret and a suppressed string value are in the same line, the real secret are not reported! We should be very careful when adding a suppressing string value.

Suppressing warnings in a file is convenient for fake credential files, but strings in that file will still trigger warnings if present in another unsuppressed file.

[aggregate_reports]: https://dev.azure.com/azure-sdk/internal/_build?definitionId=1394&_a=summary
[credscan_doc]: https://aka.ms/credscan
[credscan_output]: https://dev.azure.com/azure-sdk/internal/_build/results?buildId=1326164&view=logs&j=3b141548-98d7-5be1-7ef8-eeb08ca02972&t=7989ab4d-bdd3-5239-37e1-e3681bbc7025&l=49
[devops_doc]: https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/413/Credential-Scan-Step-in-Pipeline
[suppression_file]: https://github.com/Azure/azure-sdk-for-js/blob/main/eng/CredScanSuppression.json
