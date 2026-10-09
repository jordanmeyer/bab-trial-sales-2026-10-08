# Sales lens — agreed v1 plan

## Purpose and scope

An MBA student managing a synthetic pop-up retail exercise compares sales by region/product and date. One useful task: load a local CSV or synthetic demo, filter it, inspect revenue, cost, contribution profit and units. This is descriptive arithmetic, not demand forecasting or full accounting profit.

Bundled demo and test records are wholly synthetic, authored for this trial and available for reuse. No third-party dataset, framework, library, font download, API, analytics, account, persistence or server-side import. Visitor files remain transient browser memory. Download a synthetic CSV template; reset restores demo and clears filters.

## Inputs and model

Exact CSV header order: `date,region,product,quantity,unit_price,unit_cost`. Dates are real calendar dates in YYYY-MM-DD. Region/product are required trimmed text. Quoted fields support embedded commas, escaped double quotes, line breaks; CRLF and initial UTF-8 BOM accepted. Blank trailing lines ignored; missing/extra columns, malformed quotes, blank required values and bad numeric/date values reject the entire import. Errors identify the CSV record when applicable. A failed import preserves the currently displayed dataset and says so.

USD only. Quantity is a nonnegative integer ≤ 1,000,000. Unit prices/costs are nonnegative decimal values with up to 2 fractional digits, each ≤ $1,000,000; no currency symbols, thousands separators, exponents or negative inputs. Convert dollar strings to integer cents before arithmetic; do not round invalid extra decimals. Row revenue = quantity × unit price cents; row cost = quantity × unit cost cents; contribution profit = revenue − cost. Cost may exceed price, producing a visibly signed negative result. Totals are sums after all filters. Total revenue/cost must remain JavaScript safe integers in cents; otherwise reject the import. Max file size 1,000,000 bytes, max 10,000 data records. Contribution excludes overhead, taxes, shipping, returns and refunds.

All filters combine (inclusive start/end dates, exact region/product match); reversed dates show an error and zero results until corrected. Header-only data and no matching records show zero totals and a clear empty message. Loading new data resets filters. No export of imported rows.

## Independent expected answers

Student-supplied demo: North Notebook, October 1: 10 × $20 = $200 revenue, 10 × $12 = $120 cost, $80 contribution. South Pen, October 2: 5 × $30 = $150, 5 × $18 = $90, $60 contribution. North Notebook, October 3: 2 × $20 = $40, 2 × $12 = $24, $16 contribution. Sum = $390 revenue/$234 cost/$156 contribution/17 units. North = $240/$144/$96/12 units. October 2 only = $150/$90/$60/5 units.

Precision case: quantity 3, price $0.10, cost $0.03 → 30 cents revenue, 9 cents cost, 21 cents contribution. Negative margin: quantity 2, price $4.00, cost $5.00 → $8 revenue/$10 cost/−$2 contribution. Zero quantity → all amounts zero. Empty selection → all zero. Large boundary: quantity 1,000,000 and both unit amounts $1,000,000 → $1,000,000,000,000 revenue and cost, zero contribution. Ninety-one such rows exceed safe integer cents and must be rejected.

## Interactions and acceptance

Desktop: clear upload/demo controls, four total values, date/region/product filters, results table with source name and matching count. Narrow: controls stack, summary stays readable, table scrolls within its own labeled region. Keyboard: native file/select/date controls, button actions and source link reachable, visible focus, no trap. Clear loading and import failure text; negative contribution uses a minus sign, not color alone. Imported strings rendered as text.

Browser tests must import the real model, show loading/failure states and a visible summary. Cover demo independent totals, combined filters, precision, negative/zero/large boundaries, quoted fields/BOM/CRLF, missing columns, malformed rows, missing values, invalid dates, file/row caps and aggregate overflow. Real CUA browser review must exercise file upload, failed import retention, filters, reset, template download, desktop/narrow/keyboard behavior, console and observed network scope.

## Agreement and remaining questions

The simulated student agreed to v1 and supplied/corrected consequential policies in SIMULATED-CONVERSATION.md. No material model question remains. Campus Designer uses unchanged navy #012169 with Georgia/Arial system fonts, without university marks or affiliation claims. Public repository and first/second deployments were authorized by the real user; final approval is not required again. A later small improvement will be agreed after the first deployment.

## Agreed v2 improvement after first live deployment

Show the active inclusive date bounds, region and product below the matching-record count, or “No filters” when all controls are clear. This makes the scope of displayed totals explicit. The simulated student accepted it after observing v1 live. The model, input rules and all known answers remain unchanged. Acceptance: initial/reset/clear view says No filters; selecting North says Region: North; combined selections list each active date/region/product; cleared inputs disappear from the summary. Summary text must wrap at narrow widths and be inserted as text.
