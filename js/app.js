const drugs = [
{name:"Atenolol",class:"β1-selective adrenergic blocker",target:"β1-adrenergic receptor",mechanism:"Blocks β1 receptors and reduces sympathetic cardiac stimulation.",events:["β1 receptor blockade","↓ adenylate cyclase / cAMP signaling","↓ Ca²⁺-dependent cardiac stimulation","↓ heart rate & contractility","↓ cardiac output","↓ blood pressure"],therapeutic:"Antihypertensive; antianginal",adverse:"Bradycardia, fatigue, hypotension",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Propranolol",class:"Non-selective β-adrenergic blocker",target:"β1 and β2 adrenergic receptors",mechanism:"Blocks β-adrenergic receptors and reduces sympathetic effects.",events:["β1/β2 receptor blockade","↓ cardiac stimulation","↓ heart rate & contractility","↓ cardiac output","↓ blood pressure"],therapeutic:"Antihypertensive; antianginal; other approved uses",adverse:"Bradycardia, fatigue; bronchospasm risk",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Enalapril",class:"ACE inhibitor",target:"Angiotensin-converting enzyme (ACE)",mechanism:"Inhibits ACE, reducing formation of angiotensin II and aldosterone signaling.",events:["ACE inhibition","↓ angiotensin II","↓ aldosterone signaling","↓ vasoconstriction / sodium retention","↓ blood pressure"],therapeutic:"Antihypertensive; heart failure indications",adverse:"Cough, hyperkalemia, hypotension",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Losartan",class:"Angiotensin II receptor blocker",target:"AT1 receptor",mechanism:"Blocks angiotensin II signaling at AT1 receptors.",events:["AT1 receptor blockade","↓ vasoconstrictor signaling","↓ aldosterone signaling","↓ sodium/water retention","↓ blood pressure"],therapeutic:"Antihypertensive; other approved indications",adverse:"Hyperkalemia, hypotension",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Amlodipine",class:"Dihydropyridine calcium-channel blocker",target:"L-type calcium channels in vascular smooth muscle",mechanism:"Reduces calcium entry into vascular smooth muscle, promoting vasodilation.",events:["L-type Ca²⁺ channel inhibition","↓ Ca²⁺ entry","Vascular smooth-muscle relaxation","↓ peripheral resistance","↓ blood pressure"],therapeutic:"Antihypertensive; antianginal",adverse:"Edema, headache, flushing",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Metformin",class:"Biguanide antidiabetic",target:"Cellular energy-sensing pathways; hepatic glucose production",mechanism:"Primarily reduces hepatic glucose production and improves insulin sensitivity.",events:["↓ hepatic gluconeogenesis","↑ insulin sensitivity","↓ hepatic glucose output","↓ blood glucose"],therapeutic:"Type 2 diabetes management",adverse:"GI upset; vitamin B12 reduction with long-term use",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Aspirin",class:"Salicylate; antiplatelet drug",target:"Cyclooxygenase enzymes (COX)",mechanism:"Irreversibly acetylates cyclooxygenase enzymes; platelet thromboxane production is reduced.",events:["Irreversible COX acetylation","↓ thromboxane A₂ in platelets","↓ platelet aggregation"],therapeutic:"Antiplatelet use; analgesic/antipyretic uses",adverse:"GI irritation/bleeding; hypersensitivity",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Omeprazole",class:"Proton-pump inhibitor",target:"H⁺/K⁺-ATPase in gastric parietal cells",mechanism:"Suppresses the final step of gastric acid secretion.",events:["Proton-pump inhibition","↓ gastric H⁺ secretion","↑ gastric pH","↓ acid-related injury"],therapeutic:"Acid-related disorders",adverse:"Headache, GI effects; long-term risks require clinical context",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Salbutamol",class:"Short-acting β2 agonist",target:"β2-adrenergic receptor",mechanism:"Activates β2 receptors in airway smooth muscle, increasing cAMP and promoting bronchodilation.",events:["β2 receptor activation","↑ adenylate cyclase / cAMP","Airway smooth-muscle relaxation","Bronchodilation"],therapeutic:"Relief of bronchospasm in approved indications",adverse:"Tremor, tachycardia, hypokalemia",source:"Standard pharmacology references; verify against current official labeling."},
{name:"Atorvastatin",class:"HMG-CoA reductase inhibitor",target:"HMG-CoA reductase",mechanism:"Inhibits cholesterol synthesis and increases hepatic LDL receptor expression.",events:["HMG-CoA reductase inhibition","↓ hepatic cholesterol synthesis","↑ hepatic LDL receptor activity","↓ circulating LDL cholesterol"],therapeutic:"Lipid lowering; cardiovascular risk reduction",adverse:"Myalgia; liver enzyme elevations",source:"Standard pharmacology references; verify against current official labeling."}
];

const $ = id => document.getElementById(id);
let current = drugs[0];

function findDrug(q){return drugs.find(d=>d.name.toLowerCase()===q.toLowerCase()) || drugs.find(d=>d.name.toLowerCase().includes(q.toLowerCase()));}

function renderDrug(d){
  if(!d) return;
  current=d;
  $("drugTitle").textContent=d.name;
  $("classBadge").textContent=d.class;
  $("drugInfo").innerHTML=[
    ["Class",d.class],["Target",d.target],["Mechanism",d.mechanism],["Therapeutic effect",d.therapeutic],
    ["Adverse effects",d.adverse],["Reference",d.source]
  ].map(x=>`<div class="info-card"><label>${x[0]}</label><div>${x[1]}</div></div>`).join("");
  const nodes=[{type:"DRUG",name:d.name,desc:d.class},{type:"TARGET",name:d.target,desc:"Primary target / receptor"},{type:"MECHANISM",name:d.mechanism,desc:"Molecular action"}];
  d.events.forEach((e,i)=>nodes.push({type:i===d.events.length-1?"THERAPEUTIC EFFECT":"PHARMACOLOGICAL EFFECT",name:e,desc:"Pathway step"}));
  $("graph").innerHTML=`<div class="pathway">${nodes.map((n,i)=>`<div class="node" title="${n.desc}"><span class="type">${n.type}</span><strong>${n.name}</strong><small>${n.desc}</small></div>${i<nodes.length-1?'<div class="connector">→</div>':''}`).join("")}</div>`;
  $("searchInput").value=d.name;
  $("suggestions").innerHTML="";
}

function setup(){
  const names=drugs.map(d=>d.name);
  $("suggestions").innerHTML=names.slice(0,6).map(n=>`<button>${n}</button>`).join("");
  document.querySelectorAll("#suggestions button").forEach(b=>b.onclick=()=>renderDrug(findDrug(b.textContent)));
  ["drugA","drugB"].forEach(id=>$(id).innerHTML=drugs.map(d=>`<option>${d.name}</option>`).join(""));
  $("drugB").value="Propranolol";
  renderDrug(current);
}
$("searchBtn").onclick=()=>renderDrug(findDrug($("searchInput").value) || null);
$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("searchBtn").click()});
$("resetBtn").onclick=()=>renderDrug(current);
$("compareBtn").onclick=()=>{
  const a=findDrug($("drugA").value), b=findDrug($("drugB").value);
  const rows=[["Class",a.class,b.class],["Target",a.target,b.target],["Mechanism",a.mechanism,b.mechanism],["Therapeutic effect",a.therapeutic,b.therapeutic],["Adverse effects",a.adverse,b.adverse],["Reference",a.source,b.source]];
  $("comparison").innerHTML=`<table><tr><th>Feature</th><th>${a.name}</th><th>${b.name}</th></tr>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>`;
};
setup();
