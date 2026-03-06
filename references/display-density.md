# Display Density

Use this file when the page is table-heavy and must show many business fields without becoming visually chaotic.

## Principle

Dense does not mean crowded. Dense means:

- strong alignment
- predictable spacing
- disciplined truncation
- consistent formatting
- clear semantic emphasis

## What to keep visible

Prioritize fields that support scanning:

- identity
- status
- ownership
- timing
- one primary business value

Everything else competes for attention and should justify its presence.

## Column strategy

Classify columns into:

- `core`: always visible, often pinnable
- `context`: useful for many users, optional
- `specialist`: role-specific or infrequent

Avoid giving every column equal visual weight.

## Text handling

- Use truncation for long strings in dense rows.
- Provide a safe reveal path: title, tooltip, detail drawer, or expand action.
- Wrap only where a multi-line row still scans cleanly.
- Keep date, currency, and status formatting consistent across the page.

## Visual hierarchy

- Use stronger weight on identity and the main field.
- Use quieter text on secondary metadata.
- Use color sparingly for status, warnings, and outcomes.
- Avoid rainbow badges or multiple competing emphasis systems.

## Table rhythm

- Row height should feel intentional and repeatable.
- Header density should match cell density.
- Numeric columns should align predictably.
- Null or missing values should have one consistent representation.

## Sticky and pinned elements

- Sticky headers help vertical scan continuity.
- Pinned columns help identity continuity in wide tables.
- Pin only what must stay visible; too many pinned columns defeat the table.

## Empty and loading states

- Empty states should distinguish `no data` from `no results after filtering`.
- Loading placeholders should match final density so layout shift stays low.
- Pending or refetch states should not erase already visible data unless necessary.

## Display anti-patterns

- Every cell looks equally important
- Long text wraps unpredictably across rows
- Badges replace readable text instead of clarifying it
- Tooltips are the only way to understand important fields
- Too many columns are visible by default

## Density review checklist

- Is the first scan path obvious?
- Are columns prioritized intentionally?
- Can users compare values down a column quickly?
- Are truncation and reveal behavior consistent?
- Does the table still feel orderly at realistic data lengths?
