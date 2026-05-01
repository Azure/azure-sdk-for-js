# PR #37647 — @azure/postgresql-auth (new package)

Date: 2026-03-26
Outcome: issues_found (2 medium, 2 low)

Findings:
- Snippet names don't follow ReadmeSample<Feature> convention
- README uses dynamic await import() while samples use static imports
- GetEntraTokenPasswordOptions and SequelizeBeforeConnectHook missing from README Key Concepts
- @param options JSDoc should reference public type name not internal alias
