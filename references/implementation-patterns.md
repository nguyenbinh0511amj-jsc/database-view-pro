# Implementation Patterns

## Query architecture

- Use one query for the list and one query for the selected record.
- Put list state in a stable query key: search, filters, sort, page, page size, scope.
- Debounce free-text inputs before list fetches.
- Let the server own filtering, sorting, and pagination.
- Keep lookup queries separate from the main list query.
- Treat autocomplete, filter option loading, and record detail as independent concerns.

## URL state

Use URL params for:

- search
- high-value filters
- ordering
- page or page size when shareability matters
- selected record or focus mode when entering from another page

Do not store transient form drafts in the URL.

Keep URL state human-debuggable. Prefer simple keys over opaque blobs unless the state model is too large.

## Table strategy

- Render display cells from normalized data, not raw API noise.
- Keep cell renderers small and deterministic.
- For wide tables, support horizontal scroll and sticky headers before inventing a custom grid.
- Add pinned columns only when users must keep identity columns visible.
- Decide a column ownership rule: always-visible core columns, optional context columns, admin-only columns.
- Define per-column behavior explicitly: width, alignment, truncation, sortability, editability, tooltip rule.
- Use semantic formatting for dates, currency, status, and null values consistently.

## Mutation strategy

- Keep list mutations narrow.
- Use inline edit for isolated fields.
- Use the drawer for cross-field validation or role-sensitive edits.
- After save, invalidate list and detail queries with minimal scope.
- Confirm destructive actions in a separate dialog.
- Keep payload builders explicit rather than blindly PATCHing full records.
- Separate draft state from fetched server state so dirty tracking remains understandable.

## Import workflow

Split import into four phases:

1. Parse file
2. Produce preview
3. Review conflicts, duplicates, skips, decisions
4. Commit decisions

Never collapse these into a single write path if data quality is a concern.

For large imports:

- Summarize counts at the top.
- Keep per-row decisions inspectable.
- Show why each row is `create`, `update`, `skip`, or `review`.
- Preserve decisions if the user filters or searches inside the preview.

## Duplicate review

- Distinguish hard matches from soft matches.
- Hard matches should auto-skip or auto-upsert based on explicit policy.
- Soft matches should present candidates and reasons, not silent automation.
- Show the exact reason for skip or review in the UI.
- Candidate lists should be small, ordered, and explainable.

## Responsive pattern

- Treat mobile as a card workflow.
- Put only key facts on each card.
- Open the same detail surface from both card and table rows.
- Avoid horizontal table scrolling on mobile as the primary experience.
- Collapse secondary filters and admin utilities aggressively on mobile.
- Keep touch targets large and group actions into clear primary/secondary sets.
- Treat drawer width, modal size, and form density as separate desktop/mobile decisions.

## Performance pattern

- Paginate and sort on the server for large datasets.
- Use placeholder or keep-previous-data patterns to reduce visible flicker.
- Avoid recomputing expensive derived maps on every render.
- Be careful with per-row closures, heavy formatters, and wide lists of controlled inputs.
- Split rarely used panels so they do not bloat the initial render path.
- Keep import preview, merge workflows, and chart-heavy modules behind interaction when possible.

## Mobile optimization checklist

- Is the first screen useful without opening filters?
- Are the top card fields enough to decide whether to open the record?
- Can the user reach key actions with one thumb?
- Are long values truncated safely with a way to inspect them?
- Does opening detail preserve return context?
- Are filter panels and modals small-screen friendly?

## Visual review checklist

- Is there a strong scan line for each row or card?
- Are primary actions visually obvious?
- Are warnings and destructive states distinguishable without overwhelming the page?
- Do empty, loading, and error states feel intentional?
- Are table headers, cells, and badges visually consistent?

## Review checklist

When reviewing a workbench page, check:

- Does the user finish the top 3 tasks without route thrash?
- Are list state and detail state coordinated cleanly?
- Are destructive and bulk actions explicit?
- Does the import path surface conflicts before write?
- Are permissions visible in the UI and enforced in the API?
- Is the mobile layout actually usable?
- Is the display hierarchy clear at first glance?
- Is performance acceptable with realistic row counts and realistic filter usage?
