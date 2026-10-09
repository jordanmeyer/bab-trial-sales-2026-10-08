import { parseSales, totals, filterSales, money, demo } from '../app/model.js';
const header = 'date,region,product,quantity,unit_price,unit_cost\n';
const csv = line => header + line;
const standard = '2026-10-01,North,Notebook,10,20.00,12.00';
const equal = (actual, expected) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw Error(`Expected ${JSON.stringify(expected)}; observed ${JSON.stringify(actual)}`);
};
const rejects = (text, message) => {
  try { parseSales(text); } catch (error) {
    if (!error.message.includes(message)) throw Error(`Wrong error: ${error.message}`);
    return;
  }
  throw Error('Expected rejection; import accepted');
};
export const cases = [
  ['Independent demo totals: $390/$234/$156/17', () => equal(totals(parseSales(demo)), { revenue: 39000, cost: 23400, profit: 15600, units: 17 })],
  ['North totals: $240/$144/$96/12', () => equal(totals(filterSales(parseSales(demo), { region: 'North' })), { revenue: 24000, cost: 14400, profit: 9600, units: 12 })],
  ['Inclusive date window: October 2', () => equal(totals(filterSales(parseSales(demo), { start: '2026-10-02', end: '2026-10-02' })), { revenue: 15000, cost: 9000, profit: 6000, units: 5 })],
  ['All filters combine', () => equal(totals(filterSales(parseSales(demo), { start: '2026-10-02', end: '2026-10-03', region: 'North', product: 'Notebook' })), { revenue: 4000, cost: 2400, profit: 1600, units: 2 })],
  ['No matches → zero totals', () => equal(totals(filterSales(parseSales(demo), { product: 'Unknown' })), { revenue: 0, cost: 0, profit: 0, units: 0 })],
  ['Integer cents: 3 × $0.10 less 3 × $0.03 = $0.21', () => equal(totals(parseSales(csv('2026-10-01,N,P,3,0.10,0.03'))), { revenue: 30, cost: 9, profit: 21, units: 3 })],
  ['Negative margin allowed: $8 − $10 = −$2', () => equal(totals(parseSales(csv('2026-10-01,N,P,2,4,5'))), { revenue: 800, cost: 1000, profit: -200, units: 2 })],
  ['Zero quantity produces zero dollars', () => equal(totals(parseSales(csv('2026-10-01,N,P,0,20,12'))), { revenue: 0, cost: 0, profit: 0, units: 0 })],
  ['Zero unit amounts are valid', () => equal(totals(parseSales(csv('2026-10-01,N,P,2,0,0'))), { revenue: 0, cost: 0, profit: 0, units: 2 })],
  ['Upper per-row limits: $1 trillion', () => equal(totals(parseSales(csv('2026-10-01,N,P,1000000,1000000,1000000'))), { revenue: 100000000000000, cost: 100000000000000, profit: 0, units: 1000000 })],
  ['Aggregate overflow rejected', () => rejects(csv(Array(91).fill('2026-10-01,N,P,1000000,1000000,1000000').join('\n')), 'safe integer')],
  ['Quoted comma and escaped quote', () => equal(parseSales(csv('2026-10-01,N,"Notebook, ""Blue""",2,10.10,3.03'))[0].product, 'Notebook, "Blue"')],
  ['Quoted newline preserved', () => equal(parseSales(csv('2026-10-01,N,"Two\nlines",2,10,3'))[0].product, 'Two\nlines')],
  ['BOM + CRLF + trailing blank line accepted', () => equal(parseSales('\uFEFF' + demo.replaceAll('\n', '\r\n') + '\r\n').length, 3)],
  ['Header-only CSV is empty', () => equal(totals(parseSales(header)), { revenue: 0, cost: 0, profit: 0, units: 0 })],
  ['Empty file rejected', () => rejects('', 'Required columns')],
  ['Missing column rejected', () => rejects('date,region,product,quantity,unit_price\n', 'Required columns')],
  ['Reordered column rejected', () => rejects('region,date,product,quantity,unit_price,unit_cost\n', 'Required columns')],
  ['Extra row column rejected with record', () => rejects(csv(standard + ',extra'), 'Record 2: expected 6 columns')],
  ['Missing row column rejected with record', () => rejects(csv('2026-10-01,N,P,2,10'), 'Record 2: expected 6 columns')],
  ['Missing field rejected', () => rejects(csv('2026-10-01,N,,2,10,3'), 'Record 2: all fields')],
  ['Interior blank record rejected', () => rejects(csv(standard + '\n\n' + standard), 'Record 3: expected 6 columns')],
  ['Unclosed quote rejected', () => rejects(csv('2026-10-01,N,"P,2,10,3'), 'unclosed quote')],
  ['Characters after closing quote rejected', () => rejects(csv('2026-10-01,N,"P"x,2,10,3'), 'malformed quote')],
  ['Quote in unquoted field rejected', () => rejects(csv('2026-10-01,N,P"x,2,10,3'), 'malformed quote')],
  ['Negative quantity rejected', () => rejects(csv('2026-10-01,N,P,-2,10,3'), 'quantity')],
  ['Fractional quantity rejected', () => rejects(csv('2026-10-01,N,P,2.5,10,3'), 'quantity')],
  ['Quantity above cap rejected', () => rejects(csv('2026-10-01,N,P,1000001,10,3'), 'quantity')],
  ['Three decimal places rejected, not rounded', () => rejects(csv('2026-10-01,N,P,2,10.001,3'), 'at most 2 decimals')],
  ['Exponent notation rejected', () => rejects(csv('2026-10-01,N,P,2,1e2,3'), 'at most 2 decimals')],
  ['Negative price rejected', () => rejects(csv('2026-10-01,N,P,2,-1,3'), 'nonnegative USD')],
  ['Unit price above cap rejected', () => rejects(csv('2026-10-01,N,P,2,1000000.01,3'), 'exceeds $1,000,000')],
  ['Unit cost above cap rejected', () => rejects(csv('2026-10-01,N,P,2,3,1000000.01'), 'exceeds $1,000,000')],
  ['Impossible calendar date rejected', () => rejects(csv('2026-02-30,N,P,2,10,3'), 'real YYYY-MM-DD')],
  ['Leap day valid in leap year', () => equal(parseSales(csv('2024-02-29,N,P,2,10,3'))[0].date, '2024-02-29')],
  ['Leap day rejected in common year', () => rejects(csv('2026-02-29,N,P,2,10,3'), 'real YYYY-MM-DD')],
  ['Exact 10,000-row cap accepted', () => equal(parseSales(csv(Array(10000).fill('2026-10-01,N,P,0,0,0').join('\n'))).length, 10000)],
  ['10,001 data rows rejected', () => rejects(csv(Array(10001).fill('2026-10-01,N,P,0,0,0').join('\n')), '10,000 data records')],
  ['Byte cap counts UTF-8, not characters', () => rejects(csv('é'.repeat(500001)), '1 MB')],
  ['Currency formatting preserves cents/sign', () => equal([money(0), money(21), money(-200), money(9007199254740991)], ['$0.00', '$0.21', '−$2.00', '$90,071,992,547,409.91'])],
  ['Partition totals reconcile independently', () => {
    const rows = parseSales(demo), north = totals(filterSales(rows, { region: 'North' })), south = totals(filterSales(rows, { region: 'South' }));
    equal([north.revenue + south.revenue, north.cost + south.cost, north.profit + south.profit], [39000, 23400, 15600]);
  }],
  ['Quoted import totals: $24.20/$11.06/$13.14/3', () => equal(totals(parseSales(csv('2026-10-01,North,"Notebook, ""Blue""",2,10.10,3.03\n2026-10-02,South,Pen,1,4.00,5.00'))), { revenue: 2420, cost: 1106, profit: 1314, units: 3 })],
];
