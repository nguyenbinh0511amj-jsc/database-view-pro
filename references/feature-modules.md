# Feature Modules

Use this file to decide which modules a workbench page needs. Do not add every module by default.

## Essential modules

Every workbench page usually needs:

- `header`: title, record count, context text
- `primary actions`: create, refresh, maybe import/export
- `list query`: search, 1-3 key filters, sorting, pagination
- `record surface`: table on desktop, cards on mobile
- `detail surface`: drawer, modal, or detail route

## Display modules

Use these to shape how the page looks and scans:

- `desktop table`: dense tabular scan surface for high-volume work
- `mobile cards`: compact mobile-first summaries
- `status badges`: concise semantic signals
- `row highlight system`: selected row, warning row, changed row, stale row
- `sticky header`: keep context during vertical scroll
- `pinned columns`: keep identity or key business columns visible
- `column manager`: show, hide, and pin columns
- `cell overflow strategy`: truncate, wrap, tooltip, or expand on demand
- `loading states`: skeletons, pending indicators, optimistic hints
- `empty states`: no data, filtered-empty, error-empty
- `summary strip`: optional inline metrics above the list

## Common advanced modules

Add only if the user workflow justifies them:

- `advanced filters`: secondary fields, date ranges, multi-select lookups
- `active filter chips`: useful when many filters can be live at once
- `bulk actions`: delete, assign, merge, archive, status change, export
- `inline edit`: only for high-frequency, low-risk fields
- `column manager`: show/hide columns, pin/unpin, order preference
- `saved UI preferences`: page size, column choices, drawer width, open advanced filters
- `KPI strip`: lightweight numeric context above the list, optional
- `KPI modal`: richer management stats without turning the page into a dashboard, optional
- `import workflow`: upload, preview, review conflicts, commit
- `duplicate review`: show likely matches, explain why, force decision
- `drill-down mode`: open page from another page with prefilled filters or focused detail state
- `saved views`: reusable filter/sort/column presets
- `secondary actions rail`: less frequent actions grouped away from the primary CTA
- `audit visibility`: show metadata such as created at, updated at, source, editor
- `split detail tabs`: separate business fields, notes, history, attachments, and custom fields

## Module selection heuristics

### Add bulk actions when

- Users act on many rows in one session.
- The same action is repeated row by row.
- Admin users need cleanup or reassignment workflows.

### Add import when

- Records are frequently created from spreadsheets or external systems.
- The organization already works in Excel.
- Manual creation is too slow for the volume.

### Add duplicate review when

- Records may come from many channels.
- Source identifiers are inconsistent.
- The cost of creating a duplicate record is meaningful.

### Add KPI only when

- The page doubles as an operations cockpit for the same user persona.
- Summary metrics change user behavior on the same page.

Avoid KPI blocks that only duplicate a separate dashboard.

### Add column manager when

- The table is too wide for one fixed view.
- Different roles care about different fields.
- The page is used every day and users benefit from saved density preferences.

### Add mobile cards when

- The page must be usable on phones.
- The desktop table has more than 5 meaningful columns.
- Tapping a card can naturally open the detail surface.

## Suggested module packs

### Minimal workbench

- header
- primary actions
- search
- 1-3 filters
- table or card list
- detail surface

### Standard operations workbench

- minimal workbench
- advanced filters
- active filter chips
- bulk actions
- column manager
- saved UI preferences
- mobile cards

### High-volume enterprise workbench

- standard operations workbench
- import workflow
- duplicate review
- saved views
- pinned columns
- audit visibility
- optional KPI

## Anti-patterns

- A huge table with no drawer and too many inline editors.
- A drawer that edits everything while the list also tries to edit everything.
- Advanced filters always open with 20 controls visible.
- Import that writes immediately without preview.
- Bulk delete without clear selection summary.
- Desktop-only tables on mobile.
- Metrics, charts, and forms competing for the same visual priority.
- Color-coded everything with no real hierarchy.
- Too many tiny actions in every row.
- Mobile cards that still read like desktop rows.
- Columns added endlessly without ownership rules.
