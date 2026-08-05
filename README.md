verify and fix it by doing this exact plan:

- Read the implementation directly (Text node + submit flow + app wiring) using corrected workspace paths.
- Validate **Text node auto-resize** logic:
  - Confirm width/height are derived from content length/lines (or measured via textarea scroll size).
  - Confirm node container updates with input changes (not only on mount).
  - If missing, patch to resize reactively and keep sensible min/max bounds.
- Validate **dynamic variable handles** logic:
  - Confirm parser extracts `{{variableName}}` tokens using valid JS identifier rules.
  - Confirm deduping + stable ordering of variables.
  - Confirm left-side handles are rendered per variable and update on text edits/removals.
  - If broken, patch parser/rendering and ensure handle IDs are stable (`<nodeId>-<var>` pattern).
- Validate **submit + alert formatting**:
  - Confirm `submit.js` posts `{nodes, edges}` to `/pipelines/parse`.
  - Confirm frontend handles response keys `num_nodes`, `num_edges`, `is_dag`.
  - Confirm user-friendly alert string is shown on success; clear error alert on failure.
  - Patch message formatting if it’s raw or unclear.
- Run full manual verification:
  - Start backend (`uvicorn main:app --reload`) and frontend (`npm start`).
  - Build a pipeline in UI, test:
    1. Text expansion while typing multiline/long text
    2. `{{input}}`, `{{foo_bar2}}`, invalid tokens like `{{2bad}}`
    3. Add/remove variables and confirm handles appear/disappear
    4. Click Submit and verify alert displays node count, edge count, DAG boolean clearly
- If any mismatch appears, apply minimal targeted fixes and re-run the same click-through checks.
- Deliver a compliance matrix mapping each requirement to verified behavior + exact file/line references changed.
