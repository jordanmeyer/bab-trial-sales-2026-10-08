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

## Round 2 — passed after reset repair

Tested commit: `f30068f238939b95eb96ead3fc8f3d347785f4bf`. Same relevant paths and unchanged agreed PLAN.md. Exact committed/staged/working-tree freshness diffs, untracked relevant-file listing and plan comparison passed both immediately before the rerun request and after the results arrived.

Parent's CUA browser rerun observed **42/42 passed, 0 failed**. After reversed dates, keyboard Enter on Clear filters restored three records and $390.00 revenue/$234.00 cost/$156.00 contribution/17 units, and hid the error. North + Pen produced an empty view; mouse Clear filters restored the same baseline. No new console errors. Prior good/bad file import, keyboard Reset to demo, template download and 1439px/319px observations from Round 1 remain applicable: the sole app change schedules the native reset's existing render one task later. No model, parser, filters or layout changed. The originally failed round remains above.

Method: parent-operated CUA browser UI and rendered test page through the existing Python loopback server. Browser version was not captured. Network capture and 200% text zoom were not performed; their behavior remains unverified. Source inspection shows relative local assets/modules and no fetch, analytics, remote font or external-script calls; that is source evidence, not a measured network-isolation claim. No broader accessibility certification is asserted. The exercised numerical/parser and required functional flows pass; the stated inspection limits remain explicit.

## Round 3 — v2 active-filter summary passed

Tested commit: `ac70646e09ac7f83e87460138c4291d566ea0513`. The updated PLAN.md adds the simulated student's accepted summary behavior; formulas/units/limits and independent totals did not change. It is a substantive interaction acceptance addition, so the previous evaluation was not silently reused. All exact freshness checks and plan comparison passed before and after this rerun; no other executable tooling was added.

Parent CUA browser observed **42/42 passed, 0 failed**. October 2–3 + North + Notebook displayed `From: 2026-10-02 · Through: 2026-10-03 · Region: North · Product: Notebook` with independently expected $40/$24/$16/2 units. Enter on Clear filters restored `No filters` and $390/$234/$156/17. At 319px, date-plus-North summary wrapped without page horizontal overflow; desktop 1439px remained readable. This rounds out the new feature's affected checks; earlier import validation and model boundary coverage remain applicable because neither implementation changed. Existing reported inspection limits still apply.

Separate simplification pass: the same filter object now supplies filtering and summary text, avoiding independent filter state; one text node renders the summary and no extra controls, library or harness was introduced.

## Live update failure after Round 3

The second deployment's Actions run succeeded at `e2f238b402022b38899fc1686456f9f925205f5c`, but parent CUA navigation plus reload showed new HTML with old app.js: North totals were correct while the new active-filter summary was missing. This is a failed returning-visitor update, distinct from the passing local Round 3. An earlier parallel pricing observation first prompted preventative correction; later sales inspection established its own defect. Build changes the relative entry script URL to `./app.js?v=2`. The model is unchanged; the correction requires a new source checkpoint, local entry/summary retest and final live verification.

## Round 4 — cache-corrected entry passed locally

Tested commit: `774f00d46c6f777dfd861d39d971a80dbfc3bb3a`. Relevant source/plan freshness checks passed before and after the parent CUA rerun. PLAN.md and all formulas/cases remain unchanged; only the entry script URL differs from Round 3.

Parent observed the versioned entry loading successfully: North displayed the summary with $240/$144/$96/12; Enter Clear filters, after the scheduled redraw, displayed No filters with $390/$234/$156/17. Browser tests again showed **42/42 passed, 0 failed**. This proves the local entry and summary behavior; successful live correction still requires the actual deployed returning-visitor check. Earlier failed reset and live cache rounds are retained. Existing inspection limitations remain.


## October 9 checklist correction — source checkpoint and bounded evaluation

Source checkpoint: **3734d1f1676267bd8ec44924941fcda1a198563a**. Relevant paths: `app/`, `tests/`, `.github/workflows/`, `PLAN.md`, `BUILD-STORY.md`. The current plan replaces the three-line default with a varied synthetic sample, retains the hand check, defines contribution and row grain, and adds bounded grouping/pagination, contextual exports and a worked lesson. This is authorized by the real user's checklist request, not a new simulated student outcome. Earlier failed reset/cache rounds remain above.

Independent operations review read the complete model/controller/HTML/styles/lesson and plan. Source/model PASS: reversed dates suppress the answer and export controls; a valid empty subset remains a separate recoverable state; imported strings render as text; parsing completes before replacing the loaded source; grouping uses the exact region/product pair and presents each label in a separate cell. Both rendered tables are bounded at 50 rows, while exports retain all matching rows/groups. No remaining concrete source defect was found. Source simplification retains one totals/filter/group implementation and native controls, without dependencies or backend services. The unchanged workflow publishes only `app/`.

Independent sample arithmetic: North Notebook 1200−1060=140 on 60 units; North Pen 450−270=180 on 45; South Pen 900−720=180 on 90; South Notebook 400−300=100 on 25. Together this is 2950 revenue, 2350 cost, 600 contribution and 220 units;600/2950=20.33898%, not an average of row rates. North Pen's 4/unit and 40% differ from South Pen's 2/unit and 20%, while both contribute 180. This is descriptive synthetic variation, not a regional causal effect. The corrected two-row import gives 2×10.10+4=24.20 revenue,2×3.03+5=11.06 cost and13.14 contribution.

### Actual authored import/render browser round

The coordinator ran `tests/import-workflow.html` in the actual Codex in-app browser: **4/4 passed**. The harness supplies synthetic `File` objects through `DataTransfer` to the real app input and dispatches its change event. The app's File.text/parser/render responses are not stubbed. This is an authored browser integration check, not operation of the native file picker and not a novice task. Full observation JSON is retained in the course repository at `evidence/browser-app-builder/checklist-corrections/2026-10-09/sales/browser-imports.json`.

Reported environment: Chrome/155.0.0.0 user agent on the configured Mac, 16 logical cores, actual app iframe 1280×843 CSS pixels. Timings start at the synthetic input change event, after app load, and end at completed result DOM or after two subsequent animation frames. They include File.text, parsing, grouping and DOM work, not just parser time.

| Actual scenario | Observed result |
| --- | --- |
| 10,000 rows, each a distinct region/product group;297,830 bytes | Accepted 10,000; revenue 100,000/cost 40,000/contribution 60,000/units 10,000. Detail and group DOM tables each had 50 rows; top 50-of 10000 notice present.56.7ms to result DOM;132.5ms through two following animation frames. |
| Unclosed quote | Record 2 unclosed-quote error; retained the 10,000-row source name, totals and both 50-row tables.3.2ms to rejection DOM. |
| Corrected same filename | Two rows; 24.20/11.06/13.14 and 3 units; current filename/count updated and error cleared.19ms to result DOM. |
| Names A / B + C versus A + B / C | Remained two distinct identities in separate Region/Product cells; 30 revenue/8 cost/22 contribution.1.3ms to result DOM. |

The accepted maximum was measured in this configured browser once. It does not establish comfortable performance on intended student hardware. The checked-in `maximum.csv` is a separate 10,000-row repeated-group fixture; the harness constructs its stronger unique-group fixture itself. Root also reported an actual 46/46 model-browser pass before the final display/provenance corrections. The model and model tests did not change after that run; this is retained model evidence, not a new browser run at this committed checkpoint. The new 4/4 import harness exercises the changed grouping/display/import behavior. Historical 42-case rounds above remain separately scoped.

### Remaining gates and fixture limits

The version 4 URLs cover current local stylesheet, entry module and model. `tests/layout.html` is an authored same-origin iframe fixture: it selects nominal width then snapshots computed fonts and doubles existing elements for 200% text. It is not device zoom; its border changes the measured inner width and new DOM needs enlargement reapplied. Complete current320px and separate 200% readability/reachable-control tasks remain open here, as do final current invalid-filter/no-match/reset task records, actual downloaded CSV/JSON/template inspection, complete keyboard tasks and actual screen-reader operation. Historical 319px checks are not transferred to this changed interface.

SALES-13 specifically requires a novice to download/edit/import/corrupt/correct a CSV and recover. The authored harness establishes app behavior under synthetic input events; it does not close that human requirement. Actual uncoached interpretation/limitation tasks also remain open. The optional returns assignment is limited to stable IDs, separate event grain, aggregate-before-join and cohort/observation-time reasoning; no returns feature is added to this introductory app.

Staged whitespace checks passed with the existing scoped CRLF-fixture allowance. Source/plan/tests were committed before this report-only addition; final relevant-source/PLAN/BUILD-STORY diffs against that checkpoint were empty, as were ordinary and ignored untracked relevant-file listings. Only this evaluation changed. No push or current live verification occurred. This is a bounded source and import/render integration result, not full checklist closure or publication approval.


### Current-checkpoint browser suite confirmation

After the source/report commits, root reran the actual browser suite against the current files: **46/46 passed, zero failures**, including the final review labels and current asset references. Source checkpoint remains `3734d1f1676267bd8ec44924941fcda1a198563a`; no app/model/test change followed the run. For Sales this supersedes the earlier timing limitation on the model-suite observation; the prior observation remains truthful history. This new suite result does not close pending actual layout, export, mobile-keyboard, screen-reader or novice tasks. No push occurred.
