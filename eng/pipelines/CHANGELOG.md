# Engineering pipeline release history

## Unreleased

### Bugs Fixed

- Pass the triggering SDK PR from auto-release preparation to release-plan completion for all services. This keeps completion on the same plan when several active plans share a package name. Manual release inputs, publication jobs, and release gates are unchanged.
