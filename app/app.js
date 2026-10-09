import { demo, parseSales, totals, filterSales, money } from './model.js';
const $ = selector => document.querySelector(selector);
let rows = [], source = '';

function render() {
  const reversed = $('#start').value && $('#end').value && $('#start').value > $('#end').value;
  $('#filter-error').hidden = !reversed;
  const visible = reversed ? [] : filterSales(rows, Object.fromEntries(['start', 'end', 'region', 'product'].map(key => [key, $(`#${key}`).value])));
  const sum = totals(visible);
  for (const key of ['revenue', 'cost', 'profit']) $(`#${key}`).textContent = money(sum[key]);
  $('#profit').classList.toggle('negative', sum.profit < 0);
  $('#units').textContent = sum.units.toLocaleString('en-US');
  $('#count').textContent = `${visible.length.toLocaleString('en-US')} of ${rows.length.toLocaleString('en-US')} records · ${source}`;
  $('#empty').hidden = visible.length > 0;
  $('#rows').replaceChildren(...visible.map(row => {
    const tr = document.createElement('tr');
    const revenue = row.quantity * row.price, cost = row.quantity * row.cost;
    for (const value of [row.date, row.region, row.product, row.quantity, money(revenue), money(cost), money(revenue - cost)]) {
      const td = document.createElement('td'); td.textContent = value; tr.append(td);
    }
    return tr;
  }));
}

function load(text, name) {
  const parsed = parseSales(text);
  rows = parsed; source = name;
  $('#filters').reset();
  for (const key of ['region', 'product']) {
    const select = $(`#${key}`);
    select.replaceChildren(new Option(`All ${key}s`, ''), ...[...new Set(rows.map(row => row[key]))].sort().map(value => new Option(value, value)));
  }
  $('#error').hidden = true;
  $('#status').textContent = `Loaded ${name}.`;
  render();
}

$('#upload').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  $('#status').textContent = 'Reading CSV locally…';
  try {
    if (file.size > 1_000_000) throw Error('File exceeds 1 MB (1,000,000 bytes).');
    load(await file.text(), file.name);
  } catch (error) {
    $('#error').textContent = `${error.message} Previous data remains displayed.`;
    $('#error').hidden = false;
    $('#status').textContent = `Import rejected. Still showing ${source}.`;
  }
  event.target.value = '';
});
$('#demo').addEventListener('click', () => load(demo, 'synthetic demo'));
$('#filters').addEventListener('input', render);
$('#filters').addEventListener('submit', event => event.preventDefault());
$('#filters').addEventListener('reset', () => setTimeout(render, 0));
load(demo, 'synthetic demo');
