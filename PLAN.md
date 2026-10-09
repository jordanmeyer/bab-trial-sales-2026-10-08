# Sales lens — current teaching plan

## Purpose and scope

A learner compares a product–region group's contribution total with its per-unit contribution and weighted rate, then asks why a high-revenue group may contribute less. The app provides a varied twelve-line synthetic default, the retained three-row hand check, local CSV import, exact filtering, grouped comparisons and contextual exports. This is descriptive arithmetic, not demand forecasting, causal evidence or full accounting profit.

Bundled examples and test records are synthetic and available for reuse. Uploaded files are unverified user-provided data; their filenames identify a source without establishing its provenance. The app uses plain HTML/CSS/JavaScript and system fonts: no framework, remote data, analytics, account or server-side import. Visitor files stay in transient browser memory. Nothing is saved automatically. Download the synthetic template; reset restores the varied sample and clears filters and errors.

The original October 8 trial and planning conversation remain historical, explicitly simulated records. The real user's October 9 checklist instruction authorizes these corrections; neither the source records nor automated checks establish a real student outcome. app/learn.html owns the prediction tasks, worked answers and optional returns extension.

## Inputs and model

Exact CSV header order: `date,region,product,quantity,unit_price,unit_cost`. Dates are real calendar dates in YYYY-MM-DD. Region/product are required trimmed text. Quoted fields support embedded commas, escaped double quotes and line breaks; CRLF and an initial UTF-8 BOM are accepted. Blank trailing lines are ignored; missing/extra columns, malformed quotes, blank required values and invalid numeric/date values reject the entire import. Errors identify the CSV record where applicable. A failed import preserves the loaded dataset and identifies it.

Each row is a sales line. There is no transaction identifier. Identical rows may be legitimate separate sales; all are summed without deduplication. Grouping uses the exact region/product pair, and the view displays those names in separate columns so delimiters inside a name cannot obscure group identity. Imported strings render as text.

USD only. Quantity is a nonnegative integer ≤ 1,000,000. Unit price/cost are nonnegative decimal amounts with at most two fractional digits, each ≤ $1,000,000; no currency symbols, thousands separators, exponents or negative inputs. Convert dollars to integer cents without rounding invalid extra decimals. Revenue = quantity × unit price; product cost = quantity × unit cost; contribution after product cost = revenue − product cost. Cost can exceed price. Contribution excludes overhead, taxes, shipping, returns and refunds; it is not net business profit.

Totals sum the matching sales lines. Weighted contribution rate is aggregate contribution ÷ aggregate revenue, with N/A when revenue is zero; never average row percentages. Group contribution per unit is aggregate contribution ÷ aggregate units, displayed to the nearest cent, with N/A at zero units. Internal `profit` fields in the JSON mean contribution after product cost, not net profit. Revenue/cost totals must remain safe integer cents or the import is rejected. File bounds are 1,000,000 bytes and 10,000 data records.

All filters combine: inclusive From/Through dates and exact region/product matches. Reversed dates are invalid: show the error and retain source identity, suppress totals/groups/table/exports until corrected. They are never a zero-sales or no-match answer. Valid no-match and header-only datasets produce zero totals, N/A rate and a clear source/filter explanation. First/last source dates are visible; Clear filters restores the full dataset range. New data resets filters.

## Independently derived lesson answers

The varied sample covers August–October, both products in both regions, changing costs and two loss-making October lines. Its 12 rows total $2,950 revenue, $2,350 cost, $600 contribution and 220 units. The weighted contribution rate is 600 / 2,950 = 20.33898%.

| Region | Product | Units | Revenue | Cost | Contribution |
| --- | --- | --- | --- | --- | --- |
| North | Notebook | 60 | $1,200 | $1,060 | $140 |
| North | Pen | 45 | $450 | $270 | $180 |
| South | Pen | 90 | $900 | $720 | $180 |
| South | Notebook | 25 | $400 | $300 | $100 |

North Notebook leads revenue but not contribution. North Pen has the same contribution as South Pen at half the volume: $4/unit and 40% versus $2/unit and 20%. These figures do not establish a regional causal effect. October North Notebook loses $60; South Notebook loses $20.

The retained original hand check is synthetic, from the simulated planning record: North Notebook 10 × $20 with $12 unit cost; South Pen 5 × $30 with $18 unit cost; North Notebook 2 × $20 with $12 unit cost. Totals are $390 revenue, $234 cost, $156 contribution and 17 units. North has $240 revenue, $144 cost, $96 contribution and 12 units. October 2 alone has $150 revenue, $90 cost, $60 contribution and 5 units. North + Pen has no matches in this tiny dataset.

Precision case: quantity 3, price $0.10, cost $0.03 gives 30 cents revenue, 9 cents cost and 21 cents contribution. Quantity 2, price $4 and cost $5 gives $8 revenue, $10 cost and −$2 contribution. Zero quantity produces zero amounts. A valid empty selection produces zero totals. Quantity 1,000,000 with price/cost $1,000,000 gives $1 trillion each and zero contribution; 91 such rows exceed safe integer cents and must be rejected.

## Interaction, exports and recovery

The grouped comparison shows at most 50 product–region groups ordered by contribution, with an explicit cap notice. The detailed table paginates 50 matching sales lines per page. Exports include every matching row, irrespective of the displayed page. Group ordering and rows retain exact arithmetic before display rounding.

Save analytical view JSON contains format/source identity, provenance limits, active filters, currency/quantity units, exact totals, every group, every matching row and model limitations. JSON money fields are integer cents. CSV exports all matches in the six import columns, with per-unit dollar values at two decimal places and quoted/escaped text. Save JSON beside CSV for context. Nothing persists automatically; upload remains local. Rejected imports retain the prior loaded source, while resetting a sample clears filters/errors.

Native upload/date/select/buttons and visible focus support keyboard navigation. A visible analysis link reaches the results heading. Invalid filters, no matching data, rejected import and an empty valid file remain distinct. Narrow layout stacks controls, wraps source/filter text, and gives tables labeled local scroll regions. Enlarged text and actual control reachability require browser observation, not just width measurements.

## Verification and evidence limits

Model tests import the real functions and cover independent totals/groups, duplicate policy, reversed dates, filter intersections, cents, negative/zero/large values, quoted fields/BOM/CRLF, invalid rows/dates, byte/row bounds and overflow. Required actual browser checks cover import/failure retention/reset, invalid/no-match recovery, paging, local exports, template, keyboard, 320px and 200% text. EVALUATION.md distinguishes checks already observed from pending checks. A 10,000-row fixture exercises the accepted maximum with at most 50 detailed DOM rows. Instrument actual parse/render time separately from browser-tool upload latency before claiming comfortable performance on intended student hardware.

The actual novice CSV correction workflow and broader uncoached interpretation task remain external evidence gates. Actual screen-reader speech/focus observations are separate from DOM/keyboard evidence. Record exact app source and failed rounds in EVALUATION; do not turn automated checks into student outcomes.

## Historical decisions retained

SIMULATED-CONVERSATION.md preserves the original v1 scope and later simulated agreement to show active inclusive filters. Those records are not fresh approval or a current no-export/zero-results contract. This plan reflects the real user's October 9 corrections; the public source history preserves prior versions. The optional next assignment adds stable sale IDs, separate return events, aggregate-before-join logic and cohort interpretation; it does not enlarge this introductory dashboard into a returns system.
