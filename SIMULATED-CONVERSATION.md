# Simulated student conversation

This is a simulated interview conducted between trial agents. It is not testimony from a real student. The frozen plugin was read before this interview; implementation follows the replies.

## Planning interview

Agent: Who uses the CSV dashboard and what decision should totals support? Approve schema date,region,product,quantity,unit_price,unit_cost (USD, nonnegative integer quantities and nonnegative prices/costs with at most 2 decimals), or provide correction? Should invalid/missing rows reject the entire import with row-specific error, or skip? Which filters matter for v1; date range, region, product? I propose contribution profit = quantity × (unit_price − unit_cost), excludes overhead/tax/shipping/returns, with integer cents and totals after filters. What plausible output would mislead your user?

Simulated student: I am an MBA student managing a synthetic pop-up retail sales exercise. I want to identify which regions/products contribute revenue and contribution profit, not forecast demand. Approve your schema and USD/integer quantities/cents policy. Reject the entire import with row-specific errors; do not silently drop records. Date range, region and product filters all matter. Contribution profit excludes overhead/taxes/shipping/returns; negative margins are allowed when unit_cost exceeds unit_price and should be visibly negative. Missing inputs are errors, empty filtered results should show zero totals and a clear empty state. Support quoted commas and escaped quotes in product names, CRLF and a UTF-8 BOM. No external requests; selected data stays transient. Cap files at 1 MB/10,000 rows, unit amounts at $1,000,000 and quantities at 1,000,000; reject aggregate values beyond safe integer cents. Use at least this hand-checkable sample: 2026-10-01,North,Notebook,10,20.00,12.00; 2026-10-02,South,Pen,5,30.00,18.00; 2026-10-03,North,Notebook,2,20.00,12.00. Expected overall revenue $390, cost $234, contribution $156, 17 units; North $240/$144/$96 and 12 units. I agree with v1 scope. Include a downloadable synthetic CSV template and a reset-to-demo action.

## Evaluation review

Agent: PLAN names contribution profit (not net), caps/rules, rejection preserving prior dataset, no returns/refunds, no persistence; remaining model limitation is sales rows must already express valid nonnegative quantities and unit values, so returns need separate treatment beyond v1. Please confirm assumptions/limitations acceptable after inspecting results or flag a misleading interpretation.

Simulated student: Accepts assumptions. For the small update after first deployment, an active-filter summary is good.

## Post-publication improvement interview

Agent: A focused small update is an active-filter summary beside the matching count (dates/region/product, or “No filters”). It changes presentation only and makes filtered totals harder to mistake for the whole dataset.

Simulated student, after first live verification: Accepts the v2 active-filter summary proposal: show dates/region/product or “No filters”, keep calculations unchanged.
