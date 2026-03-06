# Bulk Actions

Use this file when users can select many records and perform shared operations.

## Goal

Bulk actions exist to reduce repetitive row-by-row work, not to expose every possible mutation in one toolbar.

## Good bulk candidates

- delete or archive
- assign or reassign
- status change
- export
- merge in tightly controlled scenarios
- trigger workflow or sync job

## Selection model

- Make the current selection count obvious.
- Distinguish `selected on page` from `selected across result set` if both exist.
- Provide a quick clear action.
- Keep selection stable through pagination only if that behavior is explicit and understandable.

## Action safety

- Destructive actions require confirmation.
- Confirmation copy should include scope and count.
- Warn if some selected rows are ineligible.
- Explain partial success when some rows cannot be processed.

## Bulk toolbar design

- Show only relevant actions once rows are selected.
- Keep the toolbar close to the list context.
- Put the most common safe action first.
- Move rare or dangerous actions behind extra confirmation.

## Merge-specific guidance

- Keep merge as a guided workflow, not a one-click bulk action.
- Limit candidate count when the workflow becomes ambiguous.
- Show field-level mapping or source-of-truth decisions clearly.
- Preserve an audit trail of what was merged.

## Eligibility rules

Before exposing a bulk action, define:

- who can run it
- which row states are eligible
- whether mixed-state selections are allowed
- whether the action is reversible

## Bulk action anti-patterns

- Hidden selection state
- Delete appears before safer actions
- Bulk toolbar always visible even with zero selection
- Merge exposed for arbitrary large selections
- No explanation for skipped or failed rows

## Bulk action checklist

- Is the selected count obvious?
- Are dangerous actions confirmed?
- Are ineligible rows explained?
- Is merge constrained enough to stay safe?
- Can the user recover context after the action completes?
