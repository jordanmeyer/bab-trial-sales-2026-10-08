import { demo, handCheck, parseSales, totals, filterSales, groupSales, money } from './model.js?v=4';
const $ = selector => document.querySelector(selector);
let rows=[], source='', visible=[], filters={}, page=0;
function row(values){const tr=document.createElement('tr');for(const value of values){const td=document.createElement('td');td.textContent=value;tr.append(td);}return tr;}
const rate=(profit,revenue)=>revenue?`${(profit/revenue*100).toFixed(1)}%`:'N/A (no revenue)';
function showPage(){
  $('#rows').replaceChildren(...visible.slice(page*50,(page+1)*50).map(r=>row([r.date,r.region,r.product,r.quantity,money(r.quantity*r.price),money(r.quantity*r.cost),money(r.quantity*(r.price-r.cost))])));
  $('#page-status').textContent=visible.length?`Rows ${page*50+1}–${Math.min((page+1)*50,visible.length)} of ${visible.length}; exports include all matches.`:'No matching rows';
  $('#previous').disabled=page===0;$('#next').disabled=(page+1)*50>=visible.length;
}
function render(){
  filters=Object.fromEntries(['start','end','region','product'].map(key=>[key,$(`#${key}`).value]));
  $('#active-filters').textContent=[['From',filters.start],['Through (inclusive)',filters.end],['Region',filters.region],['Product',filters.product]].filter(([,v])=>v).map(([k,v])=>`${k}: ${v}`).join(' · ')||'No filters';
  const reversed=filters.start&&filters.end&&filters.start>filters.end;
  $('#filter-error').hidden=!reversed;$('#invalid-result').hidden=!reversed;$('#valid-result').hidden=Boolean(reversed);
  $('#start').setAttribute('aria-invalid',String(Boolean(reversed)));$('#end').setAttribute('aria-invalid',String(Boolean(reversed)));
  if(reversed){visible=[];$('#count').textContent=`Invalid filter; ${rows.length} source records remain loaded from ${source}.`;return;}
  visible=filterSales(rows,filters);page=0;const sum=totals(visible);
  for(const key of ['revenue','cost','profit'])$(`#${key}`).textContent=money(sum[key]);
  $('#profit').classList.toggle('negative',sum.profit<0);$('#units').textContent=sum.units.toLocaleString('en-US');
  $('#count').textContent=`${visible.length.toLocaleString('en-US')} of ${rows.length.toLocaleString('en-US')} records · ${source}`;
  $('#rate').textContent=`Weighted contribution rate: ${rate(sum.profit,sum.revenue)} = ${money(sum.profit)} ÷ ${money(sum.revenue)}. It is not the average of row percentages.`;
  $('#empty').hidden=visible.length>0;$('#empty-message').textContent=`No sales match ${$('#active-filters').textContent}. Dataset ${source} is still loaded.`;
  const grouped=groupSales(visible);
  $('#group-count').textContent=grouped.length>50?`Showing the top 50 of ${grouped.length} product–region groups by contribution. Save analytical view JSON for every group.`:`${grouped.length} product–region groups.`;
  $('#groups').replaceChildren(...grouped.slice(0,50).map(g=>row([g.region,g.product,g.units,money(g.revenue),money(g.profit),g.units?money(Math.round(g.profit/g.units)):'N/A',rate(g.profit,g.revenue)])));
  showPage();
}
function load(text,name){
  const parsed=parseSales(text);rows=parsed;source=name;$('#filters').reset();
  for(const key of ['region','product'])$(`#${key}`).replaceChildren(new Option(`All ${key}s`,''),...[...new Set(rows.map(r=>r[key]))].sort().map(v=>new Option(v,v)));
  const dates=rows.map(r=>r.date).sort();$('#coverage').textContent=rows.length?`${name} · ${rows.length} sales lines · ${dates[0]} through ${dates.at(-1)}. Through date is inclusive; Clear filters restores the full dataset range.`:`${name} has a valid header but no sales rows.`;
  $('#error').hidden=true;$('#status').textContent=`Loaded ${name}.`;render();
}
$('#upload').onchange=async event=>{const file=event.target.files[0];if(!file)return;$('#status').textContent='Reading CSV locally…';try{if(file.size>1000000)throw Error('File exceeds 1 MB (1,000,000 bytes).');load(await file.text(),file.name);}catch(error){$('#error').textContent=`${error.message} Previous data remains loaded.`;$('#error').hidden=false;$('#status').textContent=`Import rejected. Still showing ${source}.`;}event.target.value='';};
$('#demo').onclick=()=>load(demo,'varied synthetic sample');$('#hand-check').onclick=()=>load(handCheck,'three-row hand check');
$('#filters').addEventListener('input',render);$('#filters').onsubmit=e=>e.preventDefault();$('#filters').onreset=()=>setTimeout(render,0);
$('#clear-empty').onclick=()=>{$('#filters').reset();render();};$('#previous').onclick=()=>{page--;showPage();};$('#next').onclick=()=>{page++;showPage();};
function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#export').onclick=()=>download(JSON.stringify({format:'sales-lens-view-v1',source,provenance:'Bundled samples are synthetic. A filename identifies uploaded data but does not verify its provenance; imported data is unverified.',filters,units:'USD integer cents in price, cost, revenue and profit; quantity is whole units',summary:totals(visible),groups:groupSales(visible),rows:visible,limits:'Sales lines summed without deduplication. Contribution excludes overhead, taxes, shipping and returns. Descriptive totals, not causal evidence.'},null,2),'sales-view-context-and-rows.json','application/json');
$('#export-csv').onclick=()=>{const cell=v=>`"${String(v).replaceAll('"','""')}"`;const lines=visible.map(r=>[r.date,r.region,r.product,r.quantity,(r.price/100).toFixed(2),(r.cost/100).toFixed(2)].map(cell).join(','));download(['date,region,product,quantity,unit_price,unit_cost',...lines].join('\n')+'\n','sales-matching-rows.csv','text/csv');};
load(demo,'varied synthetic sample');

window.addEventListener('pageshow',()=>setTimeout(render,0));
