/* ============ palette ============ */
const RED='#e4002b', NAVY='#26436b', CHAR='#2e3030', GOLD='#b08a2e', GREEN='#3f6d4e', GRAY='#b7ab97', LIGHT='#e5dcc9', INK='#211d19', MUT='#8b8172';
const F="'Inter',sans-serif", FM="'IBM Plex Mono',monospace", FS="'Fraunces',serif";
const base={
  backgroundColor:'transparent',
  textStyle:{fontFamily:F,color:INK},
  title:{textStyle:{fontFamily:FS,fontSize:21,fontWeight:600,color:INK},subtextStyle:{fontFamily:F,fontSize:12.5,color:MUT},left:4,top:0},
  grid:{left:10,right:30,top:86,bottom:36,containLabel:true},
  tooltip:{trigger:'item',backgroundColor:'#fffdf7',borderColor:'#d9cfbc',textStyle:{color:INK,fontSize:12.5},extraCssText:'box-shadow:0 4px 18px rgba(0,0,0,.10);'},
  legend:{bottom:0,textStyle:{fontFamily:FM,fontSize:11,color:'#4c463e'},itemWidth:14,itemHeight:9}
};
function mk(id,opt){const el=document.getElementById(id);if(!el)return;const o=Object.assign({},base,opt);if(opt.legend)o.legend=Object.assign({},base.legend,opt.legend);const c=echarts.init(el);c.setOption(o);window.addEventListener('resize',()=>c.resize());return c;}

/* ---- 2.1 store counts ---- */
const chains=['Subway',"McDonald's",'KFC',"Domino's",'Bakers Delight*',"Hungry Jack's",'Boost Juice*','Red Rooster','Pie Face*','Zambrero*'];
const counts=[1256,1078,817,720,519,489,374,325,299,288];
mk('chart-stores',{
  title:{text:"Australia's largest QSR networks",subtext:'Locations, 2026 (Subway Feb · Domino’s Mar · KFC 16 Jun · McDonald’s & HJ Jul · Red Rooster Jan) · * Nov 2025 · ScrapeHero'},
  tooltip:{trigger:'axis',axisPointer:{type:'shadow'}},
  xAxis:{type:'value',axisLabel:{fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
  yAxis:{type:'category',inverse:true,data:chains,axisLabel:{fontSize:13,color:INK,fontWeight:500},axisLine:{show:false},axisTick:{show:false}},
  series:[{type:'bar',barWidth:20,
    data:counts.map((v,i)=>({value:v,itemStyle:{color:chains[i]==='KFC'?RED:(["McDonald's","Hungry Jack's"].includes(chains[i])?CHAR:GRAY)}})),
    label:{show:true,position:'right',fontFamily:FM,fontSize:12,fontWeight:600,color:INK},
    markLine:{silent:true,symbol:'none',lineStyle:{color:RED,type:'dashed'},label:{fontFamily:FM,fontSize:10,color:RED,formatter:'KFC: 817'},data:[{xAxis:817}]}
  }]
});

/* ---- 2.3 net store growth ---- */
const grow=[['Zambrero',31],['KFC',29],['Guzman y Gomez',27],["McDonald's",25],['Sushi Hub',22],['Subway',18],['Oporto',17],["Hungry Jack's",16],['El Jannah',15],["Nando's",10],['Red Rooster',-1]];
mk('chart-netgrowth',{
  title:{text:'Net new stores in 2025 — strongest sector growth in a decade',subtext:'Top 36 QSR brands, 12 months to 31 Dec 2025 · sector net +250 (359 openings − 109 closures) · GapMaps'},
  tooltip:{trigger:'axis',axisPointer:{type:'shadow'},formatter:p=>p[0].name+': '+(p[0].value>0?'+':'')+p[0].value+' net stores'},
  grid:{left:10,right:70,top:86,bottom:20,containLabel:true},
  xAxis:{type:'value',axisLabel:{fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
  yAxis:{type:'category',inverse:true,data:grow.map(g=>g[0]),axisLabel:{fontSize:12.5,color:INK},axisLine:{show:false},axisTick:{show:false}},
  series:[{type:'bar',barWidth:17,
    data:grow.map(g=>({value:g[1],itemStyle:{color:g[0]==='KFC'?RED:(g[1]<0?GOLD:(["McDonald's","Hungry Jack's"].includes(g[0])?CHAR:GRAY))}})),
    label:{show:true,position:'right',fontFamily:FM,fontSize:12,fontWeight:600,color:INK,formatter:p=>(p.value>0?'+':'')+p.value}}]
});

/* ---- 2.2 share of spend ---- */
mk('chart-share',{
  title:{text:'Share of Australian QSR spend',subtext:'Consumer survey, 2023 — "share of spend" among QSR brands'},
  tooltip:{formatter:'{b}: {c}% ({d}%)'},
  legend:{orient:'vertical',right:10,top:'middle'},
  series:[{type:'pie',radius:['46%','72%'],center:['38%','58%'],
    label:{formatter:'{b}\n{c}%',fontFamily:FM,fontSize:12,color:INK},
    itemStyle:{borderColor:'#fffdf7',borderWidth:3},
    data:[
      {name:"McDonald's",value:54,itemStyle:{color:CHAR}},
      {name:'KFC',value:22,itemStyle:{color:RED}},
      {name:"Hungry Jack's",value:12,itemStyle:{color:NAVY}},
      {name:'All other QSR',value:12,itemStyle:{color:GRAY}}
    ]}]
});

/* ---- 3.1 financials ---- */
mk('chart-fin',{
  title:{text:'KFC Australia (Collins Foods): FY24–FY26',subtext:'Revenue, same-store sales growth, underlying EBITDA margin'},
  tooltip:{trigger:'axis'},
  legend:{data:['Revenue (A$m)','Same-store sales growth','Underlying EBITDA margin']},
  xAxis:{type:'category',data:['FY24','FY25','FY26'],axisLabel:{fontFamily:FM,fontSize:13,color:INK}},
  yAxis:[
    {type:'value',name:'A$m',min:0,max:1400,nameTextStyle:{fontFamily:FM,color:MUT},axisLabel:{fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
    {type:'value',name:'%',min:0,max:26,nameTextStyle:{fontFamily:FM,color:MUT},axisLabel:{formatter:'{value}%',fontFamily:FM,fontSize:11,color:MUT},splitLine:{show:false}}
  ],
  series:[
    {name:'Revenue (A$m)',type:'bar',barWidth:64,data:[1121.0,1154.2,1241.3],itemStyle:{color:RED},label:{show:true,position:'top',fontFamily:FM,fontWeight:600,fontSize:12.5,color:INK,formatter:v=>'$'+v.value.toLocaleString()+'m'}},
    {name:'Same-store sales growth',type:'line',yAxisIndex:1,data:[3.8,0.3,2.7],lineStyle:{width:3,color:NAVY},itemStyle:{color:NAVY},symbolSize:10,label:{show:true,position:'top',distance:10,fontFamily:FM,fontSize:11,fontWeight:600,formatter:'+{c}%',color:NAVY,backgroundColor:'#fffdf7',borderColor:NAVY,borderWidth:1,borderRadius:3,padding:[3,6]}},
    {name:'Underlying EBITDA margin',type:'line',yAxisIndex:1,data:[19.8,19.3,19.1],lineStyle:{width:3,type:'dashed',color:GOLD},itemStyle:{color:GOLD},symbolSize:10,label:{show:true,position:'bottom',distance:10,fontFamily:FM,fontSize:11,fontWeight:600,formatter:'{c}%',color:GOLD,backgroundColor:'#fffdf7',borderColor:GOLD,borderWidth:1,borderRadius:3,padding:[3,6]}}
  ]
});

/* ---- 3.2 digital ---- */
mk('chart-digital',{
  title:{text:'Digital share of KFC Australia sales',subtext:'App + kiosk + delivery, % of total revenue'},
  tooltip:{trigger:'axis',formatter:'{b}: {c}% of sales'},
  xAxis:{type:'category',data:['FY24','FY25','FY26'],axisLabel:{fontFamily:FM,fontSize:13,color:INK}},
  yAxis:{type:'value',max:50,axisLabel:{formatter:'{value}%',fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
  series:[{type:'bar',barWidth:84,
    data:[{value:29.4,itemStyle:{color:GRAY}},{value:34.2,itemStyle:{color:'#d4665a'}},{value:43.2,itemStyle:{color:RED}}],
    label:{show:true,position:'top',fontFamily:FM,fontSize:16,fontWeight:600,formatter:'{c}%',color:INK}}]
});

/* ---- 5.1 value ladder ---- */
const offers=[
  ['HJ Large Frozen Drink',2.00,CHAR],['HJ Medium Chips',2.50,CHAR],['HJ BBQ Cheeseburger',3.00,CHAR],
  ['KFC Original Slider',3.75,RED],['HJ Chicken Royale',3.75,CHAR],['KFC Go Bucket',4.95,RED],
  ["Macca's McSmart Saver (app)",6.95,NAVY],["Macca's McSmart Meal",7.95,NAVY],
  ['HJ Cheeseburger Super Stunner (small)',9.15,CHAR],["Macca's McSmart Plus",9.95,NAVY],
  ['GYG Chicken Mini Meal',12.00,GOLD],['KFC Zinger Box',14.95,RED]
];
mk('chart-ladder',{
  title:{text:'The 2026 value ladder',subtext:'Flagship advertised value offers, national menu prices (A$)'},
  tooltip:{trigger:'axis',axisPointer:{type:'shadow'},formatter:p=>p[0].name+': $'+p[0].value.toFixed(2)},
  grid:{left:10,right:70,top:86,bottom:20,containLabel:true},
  xAxis:{type:'value',max:17,axisLabel:{formatter:'${value}',fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
  yAxis:{type:'category',inverse:true,data:offers.map(o=>o[0]),axisLabel:{fontSize:12,color:INK},axisLine:{show:false},axisTick:{show:false}},
  series:[{type:'bar',barWidth:17,data:offers.map(o=>({value:o[1],itemStyle:{color:o[2]}})),
    label:{show:true,position:'right',fontFamily:FM,fontSize:12,fontWeight:600,color:INK,formatter:p=>'$'+p.value.toFixed(2)}}]
});

/* ---- 6.1 delivery ---- */
mk('chart-delivery',{
  title:{text:'Food delivery market at Menulog’s exit (Nov 2025)',subtext:'Approximate market share — the market now resolves to an Uber Eats / DoorDash duopoly'},
  tooltip:{formatter:'{b}: {c}%'},
  legend:{orient:'vertical',right:10,top:'middle'},
  series:[{type:'pie',radius:['44%','70%'],center:['38%','58%'],
    label:{formatter:'{b}\n{c}%',fontFamily:FM,fontSize:12,color:INK},
    itemStyle:{borderColor:'#fffdf7',borderWidth:3},
    data:[
      {name:'Uber Eats',value:54,itemStyle:{color:GREEN}},
      {name:'Menulog (exited)',value:24,itemStyle:{color:GRAY}},
      {name:'DoorDash',value:15,itemStyle:{color:RED}},
      {name:'Other',value:7,itemStyle:{color:LIGHT}}
    ]}]
});

/* ---- 4.5 challenger class ---- */
const chall=[['Oporto',225],["Nando's",143],['El Jannah',50],['NeNe Chicken',40],['Gami Chicken',38],["Chargrill Charlie's",30],['Frango',17],['Belles Hot Chicken',6],['Fried Brothers',4],["Flappy's",3]];
mk('chart-challengers',{
  title:{text:"The challenger class: Australia's chicken insurgents",subtext:'Restaurants, 2025–26 · company data & press reports — for scale, KFC operates 817'},
  tooltip:{trigger:'axis',axisPointer:{type:'shadow'}},
  grid:{left:10,right:60,top:86,bottom:20,containLabel:true},
  xAxis:{type:'value',axisLabel:{fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
  yAxis:{type:'category',inverse:true,data:chall.map(c=>c[0]),axisLabel:{fontSize:12.5,color:INK},axisLine:{show:false},axisTick:{show:false}},
  series:[{type:'bar',barWidth:17,
    data:chall.map(c=>({value:c[1],itemStyle:{color:c[0]==='El Jannah'?RED:(["Flappy's",'Fried Brothers'].includes(c[0])?GOLD:(['Oporto',"Nando's"].includes(c[0])?CHAR:GRAY))}})),
    label:{show:true,position:'right',fontFamily:FM,fontSize:12,fontWeight:600,color:INK}}]
});

/* ---- 7.1 wages ---- */
mk('chart-wages',{
  title:{text:'The labour cost floor keeps rising',subtext:'National Minimum Wage ($/hr) and annual award increase (%), effective 1 July'},
  tooltip:{trigger:'axis'},
  legend:{data:['National Minimum Wage ($/hr)','Award wage increase (%)']},
  xAxis:{type:'category',data:['2023','2024','2025','2026'],axisLabel:{fontFamily:FM,fontSize:13,color:INK}},
  yAxis:[
    {type:'value',min:20,max:28,axisLabel:{formatter:'${value}',fontFamily:FM,fontSize:11,color:MUT},splitLine:{lineStyle:{color:'#e9e0cf'}}},
    {type:'value',min:0,max:8,axisLabel:{formatter:'{value}%',fontFamily:FM,fontSize:11,color:MUT},splitLine:{show:false}}
  ],
  series:[
    {name:'National Minimum Wage ($/hr)',type:'bar',barWidth:46,data:[23.23,24.10,24.95,26.44],itemStyle:{color:CHAR},label:{show:true,position:'top',fontFamily:FM,fontWeight:600,fontSize:12.5,color:INK,formatter:p=>'$'+p.value.toFixed(2)}},
    {name:'Award wage increase (%)',type:'line',yAxisIndex:1,data:[5.75,3.75,3.5,4.75],lineStyle:{width:3,color:RED},itemStyle:{color:RED},symbolSize:10,label:{show:true,position:'bottom',distance:10,fontFamily:FM,fontSize:11,fontWeight:600,formatter:'+{c}%',color:RED,backgroundColor:'#fffdf7',borderColor:RED,borderWidth:1,borderRadius:3,padding:[3,6]}}
  ]
});

/* ============ hero counters ============ */
function animateCounters(){
  document.querySelectorAll('.hstat .num').forEach(el=>{
    const target=parseFloat(el.dataset.count), dec=parseInt(el.dataset.decimals||0);
    const pre=el.dataset.prefix||'', suf=el.dataset.suffix||'';
    const t0=performance.now(), dur=1400;
    function tick(t){
      const p=Math.min((t-t0)/dur,1), e=1-Math.pow(1-p,3), v=target*e;
      el.textContent=pre+v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,',')+suf;
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ============ scroll spy + progress + reveal ============ */
const links=[...document.querySelectorAll('.rail a')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
const sel=document.getElementById('mobileSelect');
function onScroll(){
  const y=window.scrollY;
  const h=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('progress').style.width=(y/h*100)+'%';
  let cur=0;
  secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*0.35)cur=i;});
  links.forEach((a,i)=>a.classList.toggle('active',i===cur));
  if(sel)sel.selectedIndex=cur+1;
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
/* ticker */
(function(){const items=['Finger Lickin\' Good','817 restaurants','A$1.24bn FY26 revenue','43.2% digital mix','+29 net new stores in 2025','It\'s finger lickin\' good','#1 QSR brand index','36% of market is breakfast + late-night'];const half=items.map(t=>'<span>'+t+'</span><span class="dot">●</span>').join('');const tr=document.getElementById('tickerTrack');if(tr)tr.innerHTML=half+half;})();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}}),{threshold:0.06});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
animateCounters();
