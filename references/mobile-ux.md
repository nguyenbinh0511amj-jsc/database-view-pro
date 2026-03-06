# Mobile UX

Use this file when the workbench must remain usable on phones or narrow tablets.

## Goals

- Preserve the top mobile tasks without forcing desktop behavior onto a small screen.
- Keep first paint useful before the user opens filters or detail.
- Make row selection, detail opening, and primary actions easy with thumb reach.

## Mobile page model

Treat mobile as:

- `summary cards` for browsing
- `bottom sheet`, `drawer`, or `full-screen detail` for actions
- `progressive disclosure` for filters and secondary controls

Do not treat mobile as a compressed desktop table.

## Card design

Each card should have 3 layers:

1. Identity
2. Operational status
3. Secondary metadata

Typical mobile card composition:

- title or subject
- customer, owner, or record identity
- status badge and urgency
- one or two dates or values
- quick affordance to open detail

Keep the card readable in under 3 seconds.

## Filter behavior on mobile

- Keep only the highest-value filter or search visible inline.
- Move advanced filters into a collapsible panel, sheet, or dedicated filter screen.
- Show active filter counts and quick clear affordances.
- Preserve filter state when the user returns from detail.

## Action behavior on mobile

- Prefer one primary action in the top area.
- Group secondary actions in menus or action sheets.
- Avoid tiny per-row icon clusters.
- Keep destructive actions off the main tap path.

## Detail behavior on mobile

- Open detail with one tap from the card.
- Use sections or tabs if the detail surface is large.
- Keep save and close actions sticky or consistently placed.
- Preserve the user's return context: filters, page, scroll, open state.

## Touch targets

- Maintain large enough tap areas for cards, buttons, and badges that act as controls.
- Avoid relying on hover-only disclosure.
- Replace hover tooltips with explicit text, expandable sections, or detail views.

## Common mobile anti-patterns

- A horizontally scrolling table as the primary mobile experience
- Filters that push the list too far down
- Row actions that require precision taps
- Dense metadata blocks with no clear hierarchy
- Modals sized like desktop popups

## Mobile review checklist

- Can the user scan the list without opening detail?
- Can the user reach the primary action quickly?
- Are filters discoverable but not dominant?
- Is the detail surface readable without excessive scrolling?
- Does returning from detail feel stable?
