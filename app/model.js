const header = ['date', 'region', 'product', 'quantity', 'unit_price', 'unit_cost'];
export const handCheck = 'date,region,product,quantity,unit_price,unit_cost\n2026-10-01,North,Notebook,10,20.00,12.00\n2026-10-02,South,Pen,5,30.00,18.00\n2026-10-03,North,Notebook,2,20.00,12.00\n';

export const demo = "date,region,product,quantity,unit_price,unit_cost\n2026-08-01,North,Notebook,10,20,12\n2026-08-02,South,Pen,20,10,8\n2026-08-03,North,Pen,10,10,6\n2026-08-04,South,Notebook,5,20,12\n2026-09-01,North,Notebook,20,20,14\n2026-09-02,South,Pen,30,10,8\n2026-09-03,North,Pen,15,10,6\n2026-09-04,South,Notebook,10,20,12\n2026-10-01,North,Notebook,30,20,22\n2026-10-02,South,Pen,40,10,8\n2026-10-03,North,Pen,20,10,6\n2026-10-04,South,Notebook,10,10,12\n";

function csvRecords(text) {
  const rows = [];
  let row = [], field = '', quoted = false, closed = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') { field += '"'; i++; }
      else { quoted = false; closed = true; }
    } else if (c === ',' || c === '\n' || c === '\r') {
      row.push(field); field = ''; closed = false;
      if (c !== ',') {
        rows.push(row); row = [];
        if (c === '\r' && text[i + 1] === '\n') i++;
      }
    } else if (c === '"' && field === '' && !closed) quoted = true;
    else {
      if (closed || c === '"') throw Error(`Record ${rows.length + 1}: malformed quote.`);
      field += c;
    }
  }
  if (quoted) throw Error(`Record ${rows.length + 1}: unclosed quote.`);
  if (field || row.length || closed) rows.push([...row, field]);
  while (rows.length && rows.at(-1).length === 1 && rows.at(-1)[0] === '') rows.pop();
  return rows;
}

export function totals(rows) {
  const result = { revenue: 0, cost: 0, profit: 0, units: 0 };
  for (const row of rows) {
    result.revenue += row.quantity * row.price;
    result.cost += row.quantity * row.cost;
    result.units += row.quantity;
    if (!Number.isSafeInteger(result.revenue) || !Number.isSafeInteger(result.cost)) throw Error('Total exceeds safe integer cents. Reduce the dataset.');
  }
  result.profit = result.revenue - result.cost;
  return result;
}

export function parseSales(text) {
  if (new TextEncoder().encode(text).length > 1_000_000) throw Error('File exceeds 1 MB (1,000,000 bytes).');
  const records = csvRecords(text.replace(/^\uFEFF/, ''));
  if (!records.length || records[0].join(',') !== header.join(',') || records[0].length !== 6) throw Error(`Required columns in order: ${header.join(',')}`);
  if (records.length > 10_001) throw Error('File exceeds 10,000 data records.');
  const rows = records.slice(1).map((record, index) => {
    const fail = message => { throw Error(`Record ${index + 2}: ${message}`); };
    if (record.length !== 6) fail('expected 6 columns.');
    const [date, region, product, quantity, price, cost] = record.map(value => value.trim());
    if (![date, region, product, quantity, price, cost].every(Boolean)) fail('all fields are required.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(`${date}T00:00:00Z`)) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) fail('date must be a real YYYY-MM-DD date.');
    if (!/^\d+$/.test(quantity) || Number(quantity) > 1_000_000) fail('quantity must be an integer from 0 to 1,000,000.');
    const cents = (value, name) => {
      if (!/^\d+(\.\d{1,2})?$/.test(value)) fail(`${name} must be nonnegative USD with at most 2 decimals.`);
      const [whole, fraction = ''] = value.split('.');
      const amount = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
      if (amount > 100_000_000) fail(`${name} exceeds $1,000,000.`);
      return amount;
    };
    return { date, region, product, quantity: Number(quantity), price: cents(price, 'unit_price'), cost: cents(cost, 'unit_cost') };
  });
  totals(rows);
  return rows;
}

export function filterSales(rows, { start = '', end = '', region = '', product = '' } = {}) {
  if (start && end && start > end) throw Error('From date must be on or before through date. Results are invalid until corrected.');
  return rows.filter(row => (!start || row.date >= start) && (!end || row.date <= end) && (!region || row.region === region) && (!product || row.product === product));
}

export function money(cents) {
  const sign = cents < 0 ? '−' : '';
  const digits = String(Math.abs(cents)).padStart(3, '0');
  return `${sign}$${digits.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${digits.slice(-2)}`;
}

export function groupSales(rows) {
  const groups = new Map();
  for (const row of rows) { const key=JSON.stringify([row.region,row.product]); if(!groups.has(key))groups.set(key,[]); groups.get(key).push(row); }
  return [...groups.values()].map(group=>({region:group[0].region,product:group[0].product,...totals(group)})).sort((a,b)=>b.profit-a.profit||a.region.localeCompare(b.region)||a.product.localeCompare(b.product));
}
