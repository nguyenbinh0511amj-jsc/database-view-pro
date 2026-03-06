# Permissions

Use this file when different roles or scopes affect what the user can see and do in the workbench.

## Permission model

Model permissions explicitly across three layers:

- `visibility`: can the user see the record or field?
- `interaction`: can the user open, filter, select, or export it?
- `mutation`: can the user create, edit, delete, merge, import, or bulk-change it?

Do not collapse all permission logic into a vague `canEdit`.

## UI states

Common states:

- `hidden`
- `visible but disabled`
- `editable`
- `editable with constraints`

Examples of constrained edit:

- can change value but cannot clear it
- can edit only self-owned records
- can use single-record actions but not bulk actions

## Workbench-specific permission points

Check permissions for:

- visible filters and filter options
- table columns
- inline edit controls
- create/import/export buttons
- bulk actions
- detail fields
- destructive actions
- merge and duplicate-review workflows

## Role and scope patterns

Typical scopes:

- `admin`: full dataset and high-risk actions
- `manager`: team scope with some elevated actions
- `operator` or `sales`: self-scope or assigned-scope

Define whether the scope is:

- hard-enforced by backend query filtering
- user-selectable
- visible in the URL

## Backend enforcement

- The UI may disable or hide actions, but the API must enforce the same rule.
- Never rely on hidden buttons as the real permission barrier.
- Keep backend permission failures understandable so the UI can show useful feedback.

## Field-level behavior

- Separate read-only fields from editable fields explicitly.
- Document fields that can never be cleared by certain roles.
- Prevent invalid mutation payloads before sending them when possible.

## Permission anti-patterns

- The page visually offers actions the backend always rejects
- A role can see controls but not understand why they are disabled
- Permission logic is duplicated inconsistently across list and drawer
- Bulk actions ignore row-level eligibility

## Permission checklist

- Can each role understand what they are allowed to do?
- Are disabled states explained where needed?
- Does backend enforcement match UI assumptions?
- Are list, detail, and bulk workflows permission-consistent?
- Are scope boundaries explicit and testable?
