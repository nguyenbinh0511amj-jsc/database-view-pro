---
name: database-view-pro
description: Design, build, review, or refactor CRM-style admin workbench pages with a list-detail workflow, dense filters, bulk actions, import flows, column management, responsive mobile/desktop views, optional KPI modules, and side drawers or modals for create/edit/detail. Use when the user wants a data-heavy operations page, back-office CRUD console, enterprise table-and-drawer UI, sales or operations workbench, or any admin screen that combines querying, triage, display density, and record editing in one surface.
---

# Database View Pro

## Overview

Build a data-heavy admin page that lets users find records fast, inspect them in context, edit safely, and run operational workflows without bouncing across many screens.

Prefer a master-detail workbench over a simple CRUD page when the same user needs search, filtering, bulk triage, imports, and record editing in one place.

Treat this as a general skill for enterprise admin pages, not only CRM leads. The record may be a lead, booking, customer, order, invoice, ticket, shipment, case, or any operational entity.

## Workflow

1. Identify the record type, primary users, and the highest-frequency operations.
2. Decide whether the page is `list-only`, `list + modal`, or `list + drawer`.
3. Define the canonical dataset, server query params, sort modes, and permission boundaries.
4. Build the list surface first: search, filters, sort, pagination, empty/loading states.
5. Add high-value workbench features only after the list is stable: bulk actions, import/export, saved columns, optional KPI modules, duplicate review.
6. Add the detail editor with narrow, safe mutation paths and explicit confirmation for destructive actions.
7. Validate desktop and mobile separately. Dense tables and mobile cards are different products.
8. Review performance, visual hierarchy, and state persistence before calling the page complete.

## Decision Rules

### Choose the page shell

- Use `list + drawer` when users repeatedly open a row, edit it, then continue scanning the list.
- Use `list + modal` when edits are short and focused.
- Use a separate detail page only when the record is large enough to justify route-level navigation.

### Choose the list presentation

- Use a dense desktop table for operations teams, sales admins, finance admins, and any workflow with column scanning.
- Add a card layout on mobile rather than forcing the desktop table to shrink.
- Support sticky headers and pinned columns when the table has many fields or horizontally scrolls.
- Keep identity columns, status, owner, and the main business signal visible without scrolling when possible.
- Prefer visual density with discipline: alignment, truncation, hover titles, badges, and predictable spacing matter more than squeezing in every field.

### Choose the filter model

- Keep 3-5 primary filters always visible.
- Put infrequent or niche filters in an advanced section.
- Use URL query params for filters, sorting, selected record, and drill-down entry points.
- Use server-side filtering for large datasets. Do not treat the browser as the source of truth.
- Add active filter chips when many filters can accumulate silently.
- Use presets for time-based queries when date ranges are common.

### Choose edit patterns

- Use inline edit only for fields with low validation complexity and high edit frequency.
- Use the drawer or modal for fields with dependencies, permissions, or multi-field validation.
- Separate `display transforms` from `edit values`. Never let a formatted cell leak into mutation payloads.
- Keep edits reversible in the session when practical. Avoid forcing users to reopen the row after every save.

### Choose summary modules

- Treat KPI, charts, and summary panels as optional modules.
- Add them only if they change decision-making on the same page.
- Keep them lightweight when the page's main job is record triage.
- Move them to a separate dashboard when they dominate the screen or compete with the list.

## Core Capabilities

- Query surface: global search, structured filters, presets, sorting, pagination, active filter chips.
- Record triage: quick scan table, row selection, duplicate hints, urgency/status signals.
- Detail workflow: open row in drawer, inspect context, edit fields, save, delete, confirm.
- Bulk workflow: multi-select, bulk delete/archive/reassign/merge/export, selection summary.
- Admin tools: create record, import data, review import preview, configure visible columns.
- Display tooling: responsive table/card rendering, column pinning, truncation strategy, hover detail, loading and empty states.
- Optional management layer: KPI strip, KPI modal, or summary widgets only when justified.

Read [feature-modules.md](references/feature-modules.md) when choosing which modules belong on the page.

## Implementation Guidance

### Data flow

- Use server-backed query state for list data.
- Derive UI state from query params where deep-linking matters.
- Keep list fetches and record-detail fetches separate so the drawer can refresh independently.
- Invalidate the smallest useful query set after mutations.
- Keep derived client-side transforms cheap and memoize only where the page demonstrably benefits.

### UX guardrails

- Preserve list context after save, delete, merge, and import.
- Keep scroll, pagination, filters, and open record stable when possible.
- Show loading skeletons for first load and softer pending states for refetch.
- Explain skipped rows, duplicate rows, and conflict cases explicitly in import and bulk flows.
- Make the primary scan path obvious: identity, status, ownership, timing, and main action.
- Do not overload color. Reserve strong color for status, urgency, warnings, and confirmed outcomes.
- Prefer one primary CTA per region. Toolbars should read as grouped actions, not noise.

### Permissions

- Decide early which actions are `admin-only`, `manager-only`, or `self-scope`.
- Disable controls in the UI, but enforce the rule in the API.
- Distinguish `read-only`, `editable`, and `editable but cannot clear` fields when roles differ.

### Responsiveness

- Desktop table and mobile cards can share data but should not share the same layout assumptions.
- Decide which fields are essential on mobile. Omit the rest or move them into detail.
- Keep action density high on desktop and low-friction on mobile.
- Avoid desktop-style filter walls on mobile. Collapse them into sections, sheets, or progressive disclosure.
- Keep mobile cards scannable in two passes: headline first, metadata second.
- Let mobile users open detail fast without precision clicking.

### Performance

- Paginate on the server for large datasets.
- Debounce search and autocomplete inputs.
- Avoid refetch storms from every keystroke or every local state change.
- Keep table cell renderers simple; expensive formatting repeated across hundreds of rows becomes visible.
- Split detail fetching from list fetching so opening one record does not block the whole page.
- Lazy-load heavy modules when they are secondary, such as merge tools, import previews, charts, or large editors.

## Delivery Checklist

- The page has a clear primary job, not a pile of unrelated widgets.
- The list is useful before advanced features are added.
- Filters, sort, and page state are shareable through the URL when needed.
- Drawer or modal actions do not destroy list context.
- Bulk actions show scope and confirmation clearly.
- Import flows separate parse, preview, decision, and commit.
- Table density is intentional, not accidental.
- Mobile remains workable.
- Summary modules are optional and proportionate.
- Performance holds up at realistic row counts.
- The page is reviewable: a second engineer can trace state, data flow, and mutation boundaries without guessing.

## References

- Read [feature-modules.md](references/feature-modules.md) to map user needs into modules such as display surfaces, filters, bulk actions, import, merge, optional KPI, and column settings.
- Read [implementation-patterns.md](references/implementation-patterns.md) for technical patterns covering query state, mutation boundaries, responsive rendering, performance, import design, and review criteria.
- Read [mobile-ux.md](references/mobile-ux.md) when the page must remain genuinely usable on phones or narrow tablets.
- Read [display-density.md](references/display-density.md) when the table is wide, dense, or visually noisy.
- Read [import-review.md](references/import-review.md) when the page includes upload, preview, duplicate handling, or commit flows.
- Read [bulk-actions.md](references/bulk-actions.md) when multi-select and batch operations matter.
- Read [permissions.md](references/permissions.md) when roles, scopes, or field-level editing rules differ across users.
