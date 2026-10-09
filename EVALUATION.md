# Evaluation — sales lens

## Evidence basis

Synthetic student interview and independently supplied expected values are in PLAN.md and SIMULATED-CONVERSATION.md. This evaluates descriptive contribution arithmetic, not a certified accounting model. Relevant paths are `app/`, `tests/`, `.github/workflows/`; inspecting the complete tracked file list found no other executable tooling. PLAN.md is part of the source checkpoint.

## Exploratory round — pure model, before browser run

Existing Node 22.19.0 invoked `tests/cases.js`, which imports the actual `app/model.js`. All **42/42** cases passed. This is a pure parser/calculation check, not rendered UI or browser evidence. No runtime was installed. Independent known answers include demo $390/$234/$156/17 units, North $240/$144/$96/12, October 2 $150/$90/$60/5, precision 30/9/21 cents, negative margin $8/$10/−$2, and zero/large-limit behavior.

Coverage: exact arithmetic, filter intersections and inclusive bounds, partition reconciliation, quoted commas/quotes/newlines, CRLF/BOM, header-only/empty input, missing/reordered/extra columns, missing fields, malformed quotes/rows, invalid dates/leap day, zero/negative/fractional values, decimal precision, row/file/amount/quantity limits and unsafe aggregate cents. Currency formatting is checked at the largest safe integer cent value.

Tooling finding retained: default `git diff --cached --check` returned 2 because deliberate CRLF bytes in `tests/fixtures/quoted-sales.csv` were reported as trailing whitespace. The fixture must keep CRLF to exercise the requirement. `git -c core.whitespace=cr-at-eol diff --cached --check` passed; this scoped invocation does not modify global/local Git configuration.

## Round 1 — source checkpoint prepared

Tested source candidate: `dcb4dd086ac250ee34fdb7f61140b4e2b22b4cc8` (including Pages workflow, public source link and agreed plan). Before requesting the browser run, all three freshness diffs exited 0, ignored/untracked relevant source listing was empty, tested PLAN.md existed, plan diff was empty and plan status was clean. No code changed after that request.

Parent CUA observed 42/42 passing browser tests and correct demo, North, empty and October 2 known answers. Actual quoted-sales.csv upload produced $24.20/$11.06/$13.14/3; South produced $4/$5/−$1/1. Invalid quantity failed with a record-2 error and preserved the previous South subset. Keyboard Reset to demo worked. Actual downloaded template contained the expected three synthetic rows. Desktop 1439px and narrow 319px had no page overflow. Browser console errors were empty.

**Failed required interaction:** after reversed date bounds, pressing Enter on Clear filters cleared the native controls but left zero totals and the reversed-date alert. This is a real browser-discovered defect: the reset handler queued rendering in a microtask, which ran before the native reset default action. The pure model cases did not cover event timing. Round 1 fails acceptance despite 42/42 numerical/parser checks.

Build fix: schedule rendering in the next task with setTimeout after native reset completes. No domain-model or plan change. A new source checkpoint and browser rerun are required; old results are not relabeled.

Simulated student reviewed and accepted the stated contribution-profit assumptions and limitations.

## Review and scope

Separate source simplification pass: one CSV parser and one totals function, shared by UI/browser tests, native input/select/table primitives, no runtime/build dependency, no generic harness. Publication contains only app/; test fixtures and reports remain source-only. Full initial history was inspected: approved public author attribution and public/synthetic content only; no deleted sensitive records or imports.

Known limits: no returns/refunds model, full accounting costs, persistence, network services or forecast. File caps bound computation but this is not a general-purpose data warehouse. Browser observations apply only to the exercised browser/viewport/actions, not a universal accessibility/security certification.
