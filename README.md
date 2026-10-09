# Sales lens

A self-contained dashboard for synthetic retail exercises. Upload a CSV, combine inclusive date/region/product filters, and inspect revenue, product cost, contribution profit and units. The active-filter summary explains which rows the totals include. Reset to demo clears filters and restores the three hand-checkable sample rows. Download the synthetic template for the required column format.

Live: https://jordanmeyer.github.io/bab-trial-sales-2026-10-08/

Source: https://github.com/jordanmeyer/bab-trial-sales-2026-10-08

From the project root run the existing runtime `/usr/bin/python3 -m http.server 9103 --bind 127.0.0.1`; visit http://127.0.0.1:9103/app/ and http://127.0.0.1:9103/tests/ . No installation/build step. Do not open file:// because JavaScript modules need the preview server.

All demo/fixture data is synthetic, authored for this trial and reusable. No external library or assets. System Georgia and Arial substitute for downloadable fonts; unchanged Duke navy/royal follow the bundled Campus Designer's public brand guidance. Independent exercise with no university affiliation or endorsement.

USD integer-cent arithmetic; quantity and unit amounts are bounded. Full import validation is transactional. Maximum 1,000,000 bytes/10,000 records; unsafe aggregate cents rejected. See PLAN.md for the exact schema, caps and independent expected results. Contribution profit excludes overhead, tax, shipping and returns; it is not accounting net profit. Negative margins are supported. There is no persistence, export of imported rows, forecast or shared storage. Reloading loses a local import; data is held only in this tab.

Pages deploys only app/ using the bundled workflow. Tests, reports and selected files are not site content. Evaluation and deployment records distinguish pure-model checks, real browser observation, and publication.
