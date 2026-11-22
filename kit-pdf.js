/* Minimal PDF generator: real text, Helvetica (WinAnsi), A4, no dependencies.
   Builds the cover letter (fitted to page 1) and the CV as an ATS-readable, single-column PDF. */
var KIT_W={"Helvetica":[761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,761,556,0,222,556,333,1000,556,556,333,1000,667,333,1000,0,611,0,0,222,222,333,333,350,556,1000,333,1000,500,333,944,0,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500],"Helvetica-Bold":[761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,761,278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,761,556,0,278,556,500,1000,556,556,333,1000,667,333,1000,0,611,0,0,278,278,500,500,350,556,1000,333,1000,556,333,944,0,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556]};
var CP1252={0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F};
function kitCode(ch){var c=ch.codePointAt(0);if(c<128||(c>=160&&c<256))return c;if(CP1252[c])return CP1252[c];if(c===0x2192)return 0x3E;if(c===0x2010||c===0x2011||c===0x2212)return 0x2D;return 0x3F}
function kitWidth(s,bold,size){var t=KIT_W[bold?"Helvetica-Bold":"Helvetica"],n=0;for(var ch of String(s))n+=t[kitCode(ch)]||556;return n*size/1000}
function kitWrap(s,bold,size,maxW){var words=String(s).replace(/\s+/g," ").trim().split(" "),lines=[],cur="";for(var w of words){var t=cur?cur+" "+w:w;if(kitWidth(t,bold,size)<=maxW||!cur)cur=t;else{lines.push(cur);cur=w}}if(cur)lines.push(cur);return lines.length?lines:[""]}
function kitEsc(s){var out="";for(var ch of String(s)){var c=kitCode(ch);if(c===0x28||c===0x29||c===0x5C)out+="\\"+String.fromCharCode(c);else if(c<32||c>126)out+="\\"+c.toString(8).padStart(3,"0");else out+=String.fromCharCode(c)}return out}
function kitHex16(s){var h="FEFF";for(var i=0;i<s.length;i++)h+=s.charCodeAt(i).toString(16).padStart(4,"0").toUpperCase();return "<"+h+">"}
function kitPdf(d){
  var PT=72/25.4,W=595.28,H=841.89,ML=2.1*28.3465,MR=2.1*28.3465,MT=1.9*28.3465,MB=1.8*28.3465,CW=W-ML-MR;
  var INK=[0.110,0.098,0.090],MUT=[0.357,0.329,0.302],ACC=[0.639,0.129,0.373];
  var S={name:{b:1,s:20,l:24,c:INK},title:{b:0,s:11.5,l:15,c:ACC,sb:2},contact:{b:0,s:10,l:13,c:MUT,sb:4},h:{b:1,s:11,l:14,c:INK,sb:12,sa:4},body:{b:0,s:11,l:15,c:INK},letter:{b:0,s:11.5,l:16.5,c:INK,sa:9},role:{b:1,s:11,l:14,c:INK,sb:7},meta:{b:0,s:10,l:13,c:MUT,sa:2},bullet:{b:0,s:10.5,l:14,c:INK,ind:12},small:{b:0,s:10.5,l:14,c:INK}};
  var pages=[[]],y=H-MT;
  function np(){pages.push([]);y=H-MT}
  function measure(txt,st){var ind=st.ind||0;return kitWrap(txt,st.b,st.s,CW-ind).length*st.l+(st.sb||0)+(st.sa||0)}
  function para(txt,stName,bullet){var st=S[stName],ind=st.ind||0,lines=kitWrap(txt,st.b,st.s,CW-ind);y-=(st.sb||0);
    for(var i=0;i<lines.length;i++){if(y-st.l<MB)np();y-=st.l;pages[pages.length-1].push({x:ML+ind,y:y+st.l-st.s,t:lines[i],st:st});
      if(bullet&&i===0)pages[pages.length-1].push({x:ML+2,y:y+st.l-st.s,t:"\u2022",st:st})}
    y-=(st.sa||0)}
  function space(pt){y-=pt}
  function keep(h){if(y-h<MB&&h<H-MT-MB)np()}
  function header(title){var c=d.contato;para(d.nome,"name");para(title,"title");para([c.cidade,c.telefone,c.email,c.linkedin].join(" | "),"contact");space(6)}
  var L=d.rotulos||{};function lab(k,def){return L[k]||def}
  if(d.carta){var k=d.carta;
    var avail=H-MT-MB-(24+17+17+6+10+(k.para?23:0)),lt=function(){var t=measure(k.saudacao,S.letter)+measure(k.fecho,S.letter)+measure(d.nome,S.letter);k.paragrafos.forEach(function(p){t+=measure(p,S.letter)});return t};
    [[11,15.5,8],[10.5,14.5,7],[10,13.5,6]].some(function(z){if(lt()<=avail)return true;S.letter={b:0,s:z[0],l:z[1],c:INK,sa:z[2]};return false});header(k.linha_titulo||d.cv.titulo);space(10);if(k.para){para(k.para,"meta");space(10)}
    para(k.saudacao,"letter");k.paragrafos.forEach(function(p){para(p,"letter")});para(k.fecho,"letter");para(d.nome,"letter");np()}
  var cv=d.cv;header(cv.titulo);
  para(lab("resumo","Resumo profissional"),"h");para(cv.resumo,"body");
  para(lab("competencias","Principais competências"),"h");para(cv.competencias.join(" | "),"small");
  para(lab("experiencia","Experiência profissional"),"h");
  cv.experiencias.forEach(function(e){var h=measure(e.cargo+" | "+e.empresa,S.role)+measure(e.periodo+" | "+e.local,S.meta);e.bullets.forEach(function(b){h+=measure(b,S.bullet)});keep(h);
    para(e.cargo+" | "+e.empresa,"role");para(e.periodo+" | "+e.local,"meta");e.bullets.forEach(function(b){para(b,"bullet",true)})});
  if(cv.outras&&cv.outras.length){var h2=measure(lab("outras","Experiências anteriores"),S.h);cv.outras.forEach(function(o){h2+=measure(o,S.small)});keep(h2);para(lab("outras","Experiências anteriores"),"h");cv.outras.forEach(function(o){para(o,"small")})}
  if(cv.ferramentas&&cv.ferramentas.length){keep(measure("x",S.h)+measure(cv.ferramentas.join(" | "),S.small));para(lab("ferramentas","Ferramentas"),"h");para(cv.ferramentas.join(" | "),"small")}
  keep(measure("x",S.h)+cv.formacao.length*S.small.l);para(lab("formacao","Formação"),"h");cv.formacao.forEach(function(f){para(f,"small")});
  if(cv.cursos&&cv.cursos.length){keep(measure("x",S.h)+measure(cv.cursos.join(" | "),S.small));para(lab("cursos","Cursos e certificações"),"h");para(cv.cursos.join(" | "),"small")}
  keep(measure("x",S.h)+S.small.l);para(lab("idiomas","Idiomas"),"h");para(cv.idiomas,"small");
  pages=pages.filter(function(p){return p.length});
  // assemble the file
  var objs=[],enc=function(s){var a=new Uint8Array(s.length);for(var i=0;i<s.length;i++)a[i]=s.charCodeAt(i)&255;return a};
  function add(s){objs.push(s);return objs.length}
  var fR=add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  var fB=add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  var pagesId=objs.length+1;objs.push(null);
  var kids=[];
  pages.forEach(function(p){var cs="";p.forEach(function(it){var c=it.st.c;cs+="BT /"+(it.st.b?"F2":"F1")+" "+it.st.s+" Tf "+c[0].toFixed(3)+" "+c[1].toFixed(3)+" "+c[2].toFixed(3)+" rg "+it.x.toFixed(2)+" "+it.y.toFixed(2)+" Td ("+kitEsc(it.t)+") Tj ET\n"});
    var cId=add("<< /Length "+cs.length+" >>\nstream\n"+cs+"endstream");
    kids.push(add("<< /Type /Page /Parent "+pagesId+" 0 R /MediaBox [0 0 "+W+" "+H+"] /Resources << /Font << /F1 "+fR+" 0 R /F2 "+fB+" 0 R >> >> /Contents "+cId+" 0 R >>"))});
  objs[pagesId-1]="<< /Type /Pages /Kids ["+kids.map(function(k){return k+" 0 R"}).join(" ")+"] /Count "+kids.length+" >>";
  var cat=add("<< /Type /Catalog /Pages "+pagesId+" 0 R >>");
  var m=d.meta||{};var info=add("<< /Title "+kitHex16(m.title||d.nome)+" /Author "+kitHex16(d.nome)+" /Subject "+kitHex16(m.subject||"")+" /Keywords "+kitHex16(m.keywords||"")+" /Producer (Radar de Vagas) >>");
  var out="%PDF-1.4\n%\xE2\xE3\xCF\xD3\n",offs=[];
  objs.forEach(function(o,i){offs.push(out.length);out+=(i+1)+" 0 obj\n"+o+"\nendobj\n"});
  var xref=out.length;out+="xref\n0 "+(objs.length+1)+"\n0000000000 65535 f \n";offs.forEach(function(o){out+=String(o).padStart(10,"0")+" 00000 n \n"});
  out+="trailer\n<< /Size "+(objs.length+1)+" /Root "+cat+" 0 R /Info "+info+" 0 R >>\nstartxref\n"+xref+"\n%%EOF";
  return enc(out);
}
