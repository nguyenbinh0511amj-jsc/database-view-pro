# Import Review

Use this file when the workbench includes spreadsheet, CSV, or external-system imports.

## Import philosophy

The import flow is not just file upload. It is a review workflow with explicit state transitions.

Preferred phases:

1. Parse
2. Normalize
3. Preview
4. Review conflicts or duplicates
5. Commit
6. Report outcomes

## Preview design

A good preview shows:

- total rows seen
- rows kept
- rows skipped
- duplicate groups
- warnings
- per-row proposed action

The preview should answer:

- What will happen?
- Why?
- What needs manual review?

## Row decision model

Typical row decisions:

- `create`
- `update`
- `skip`
- `review`

Every non-trivial decision should have a visible reason.

## Conflict explanation

Explain conflicts with business language, not backend jargon.

Examples:

- duplicate external id
- invalid status
- missing required field
- source not allowed for selected channel
- ambiguous soft match

## Review ergonomics

- Allow search inside preview rows.
- Allow filtering by action type.
- Keep user decisions stable if the preview list is filtered.
- Show aggregate counts at the top.
- Keep skipped rows inspectable rather than hiding them completely.

## Hard vs soft rules

- Hard rules can auto-skip or auto-upsert if policy is explicit.
- Soft rules should surface candidates and let the user decide.
- Do not silently merge ambiguous rows.

## Commit behavior

- Commit should use the preview decisions, not recompute unrelated logic invisibly.
- Return final counts for created, updated, skipped, and errored rows.
- If partial failure is possible, say so clearly and report which rows failed.

## Import review anti-patterns

- Upload immediately writes to DB
- Preview without reasons
- Decisions reset when the user searches or filters
- Skipped rows disappear without explanation
- Commit rules differ materially from preview rules

## Import review checklist

- Is the preview understandable without reading backend code?
- Are counts visible and trustworthy?
- Are hard skips clearly labeled?
- Can the user inspect and search the preview?
- Does commit feedback match what the preview promised?
