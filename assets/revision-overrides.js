// Correzioni metodologiche allineate ad Abaco FINALE e matrice revisionata.
(function(){
  const S=window.FINAL_SOLUTIONS;
  const F=window.SITE_FINAL;
  if(!S||!F) return;
  const byId=id=>S.find(r=>r[0]===id);
  const ndCompat=r=>{ for(let i=16;i<=28;i++) r[i]='n.d.'; };

  // S03: la fonte deve sostenere il caso realmente usato come riferimento.
  let r=byId('S03');
  if(r) r[32]='https://www.sciencedirect.com/science/article/pii/S2352710223012767';

  // S04: Puuinfo documenta esplicitamente elementi volumetrici lignei (P4).
  // Il caso è riferimento diretto tipologico; i punteggi prestazionali non verificati restano n.d.
  r=byId('S04');
  if(r){
    r[31]='25 – Pikku-Finlandia / Little Finlandia';
    r[32]='https://puuinfo.fi/arkkitehtuuri/public-buildings/pikku-finlandia/?lang=en';
    ndCompat(r);
    r[33]='Riferimento tipologico diretto: Puuinfo descrive la costruzione con elementi volumetrici lignei e il loro montaggio a partire da giugno 2021. Il caso 25 è riclassificato P4. S04 partecipa alla ricerca guidata; le compatibilità prestazionali non documentate restano n.d. e non vengono inventate.';
  }

  // S07: nessun caso diretto nel campione = nessun punteggio di compatibilità attribuito.
  r=byId('S07');
  if(r){ ndCompat(r); r[32]='n.d.'; r[33]='Famiglia progettuale mantenuta come riferimento tipologico; in assenza di un caso diretto nel campione, le compatibilità sono indicate come n.d. e non concorrono al punteggio.'; }

  // S10: Japan Pavilion Hannover è una gridshell in tubi di carta con rinforzi lignei, non una gridshell lignea.
  r=byId('S10');
  if(r){
    r[31]='Nessun caso diretto nel campione';
    r[32]='n.d.';
    ndCompat(r);
    r[33]='Famiglia progettuale mantenuta come riferimento tipologico, ma non valutata quantitativamente: il Japan Pavilion Expo 2000 è classificato nel campione come gridshell in tubi di carta con rinforzi lignei e non come gridshell lignea.';
  }


  // Confini operativi delle famiglie: unità costruttiva prima di materiali e strategie.
  const note=(id,extra)=>{const x=byId(id);if(x)x[33]=String(x[33]||'')+' | Delimitazione metodologica: '+extra;};
  note('S05','Kit ligneo piano flat-pack con pannelli assemblati in opera; la famiglia non presuppone pannelli CLT. Non trasferire automaticamente prestazioni di un pannello CLT.');
  note('S16','Sistema con pannelli portanti CLT e giunzioni reversibili; il materiale strutturale CLT distingue questa famiglia dal flat-pack ligneo generico S05. Reversibilità effettiva e connessioni richiedono verifica specifica.');
  note('S03','Modulo volumetrico tridimensionale in acciaio fabbricato come unità edilizia; non coincide per definizione con un container ISO riconfigurato.');
  note('S15','Container ISO riconfigurato: il container standardizzato è l’unità primaria, a differenza del modulo volumetrico in acciaio progettato ad hoc di S03.');
  // S11 viene articolata in due sottotipi tecnologicamente omogenei.
  const s11=byId('S11');
  if(s11){
    const a=s11.slice(), b=s11.slice();
    a[0]='S11a'; a[1]='Pareti/moduli in tubi di carta'; a[2]='Pareti a tubi o blocchi impilati'; a[8]='T1'; a[9]=1; a[10]='M2'; a[11]=2; a[14]=1;
    a[31]='26 – Paper Log House Kobe; 27 – Paper Log House Turkey; 28 – Paper Log House India';
    a[32]='https://shigeruban.net/works/paper-tubes/paper-log-house-kobe/';
    a[33]='Sottotipo S11a: pareti/moduli in tubi di carta. Le prestazioni di grandi luci e la logistica della gridshell S11b non sono trasferibili a questo sottotipo.';
    b[0]='S11b'; b[1]='Gridshell/reticolare in tubi di carta'; b[2]='Gridshell / reticolare'; b[8]='T3'; b[9]=3; b[10]='M4'; b[11]=4; b[14]=3;
    b[31]='4 – Japan Pavilion Expo 2000 Hannover';
    b[32]='https://www.sciencedirect.com/science/article/pii/S2352710222001486';
    b[33]='Sottotipo S11b: gridshell/struttura reticolare in tubi di carta. Le prestazioni non sono trasferibili alle Paper Log House di S11a.';
    const pos=S.indexOf(s11); S.splice(pos,1,a,b);
  }
  // S13 conserva il codice per continuità, ma è una strategia trasversale e non una famiglia concorrente.
  const s13=byId('S13');if(s13){
    s13[1]='Strategia trasversale di riuso di componenti';
    s13[2]='Trasversale / applicabile a più sistemi';
    for(let j=16;j<=28;j++)s13[j]='n.d.';
    s13[33]='Strategia trasversale, non famiglia tecnologica omogenea: il riuso può essere applicato a più sistemi costruttivi. S13 resta codificata per continuità della tesi e per documentare i casi di riuso, ma non partecipa alla graduatoria tecnologica; nella ricerca guidata il riuso è intercettato dagli scenari di afterlife, in particolare R4.';
  }
  // Correzioni puntuali dei casi filtrabili: non attribuire G/reversibilità contro l’evidenza dell’abaco.
  const row=id=>F.filterable.find(x=>String(x[0])===String(id));
  let c=row(37); // Hiyoshi Pavilion
  if(c){ c[15]='n.d.'; c[29]='n.d.'; }
  c=row(40); // Permanently Temporary Pavilion
  if(c){ c[15]='G1'; c[29]=3; }

  // Caso 25: allineamento tra abaco e matrice dei casi filtrabili.
  const p25=F.abaco.find(x=>Number(x[0])===25);
  const f25=F.filterable.find(x=>Number(x[0])===25);
  if(p25) p25[17]='P4 – preassemblaggio volumetrico (3D)';
  if(f25) f25[17]='P4 – preassemblaggio volumetrico (3D)';

  // Classi di durata non sovrapposte: il valore 6 mesi resta nella classe stagionale.
  F.filterable.forEach(c=>{ if(c[26]==='Medio 6–24 mesi') c[26]='Medio >6–<24 mesi'; });

  // Caso 46: mantenuto come Zero Gravity Pavilion secondo l'abaco verificato; nessuna sostituzione con BUGA.\n\n  // Allineamento casi 39 e 42 con Abaco e matrice verificati.
  let a39=F.abaco.find(x=>Number(x[0])===39), f39=F.filterable.find(x=>Number(x[0])===39);
  if(a39){ a39[4]=2019; a39[8]='4 settimane'; }
  if(f39){ f39[4]=2019; f39[8]='4 settimane'; f39[26]='Breve < 1 mese'; f39[33]='Arte e istruzione; Cfb+temperato; Breve < 1 mese; Struttura reciproca; Legno massiccio'; }

  let a42=F.abaco.find(x=>Number(x[0])===42), f42=F.filterable.find(x=>Number(x[0])===42);
  const p42='Steven J. Preston (studente di ingegneria), con Lawrence C. Bank – University of Wisconsin–Madison';
  if(a42){ a42[3]=p42; a42[5]='Madison, Wisconsin, USA'; a42[6]='Dfa+continentale umido'; a42[8]='14 giorni'; }
  if(f42){ f42[3]=p42; f42[5]='Madison, Wisconsin, USA'; f42[6]='Dfa+continentale umido'; f42[8]='14 giorni'; f42[26]='Breve < 1 mese'; f42[33]='Arte e istruzione; Dfa+continentale umido; Breve < 1 mese; Reticolare / truss; Carta e cartone'; }
  // Audit 46 casi: categorie controllate per la ricerca guidata.
  // Attività specifica = normalizzazione della funzione descrittiva; fattori di sito = solo condizioni già documentate, mai dedotte dalla sola città.
  F.activitySpecific={1:'Promozione',2:'Vendita',3:'Vendita',4:'Esposizione',5:'Esposizione',6:'Esposizione',7:'Esposizione',8:'Esposizione',9:'Esposizione',10:'Esperienza immersiva',11:'Esposizione',12:'Sport',13:'Esposizione',14:'Eventi culturali',15:'Spettacolo',16:'Festival',17:'Spettacolo',18:'Festival',19:'Supporto festival',20:'Eventi',21:'Spettacolo',22:'Spettacolo',23:'Servizi al pubblico',24:'Eventi corporate',25:'Congressi ed eventi',26:'Alloggio emergenziale',27:'Alloggio emergenziale',28:'Alloggio emergenziale',29:'Alloggio temporaneo',30:'Rifugio',31:'Rifugio',32:'Alloggio temporaneo',33:'Rifugio',34:'Alloggio emergenziale',35:'Rifugio',36:'Istruzione',37:'Istruzione',38:'Workshop',39:'Installazione culturale',40:'Workshop',41:'Istruzione',42:'Didattica ed esposizione',43:'Installazione artistica',44:'Mostra ed educazione',45:'Culto',46:'Esposizione'};
  F.siteFactorsControlled={1:['Sole / rischio di surriscaldamento','Pioggia o neve','Terreno irregolare / pendenza'],2:['Sole / rischio di surriscaldamento'],8:['Pioggia o neve','Altro fattore specifico'],9:['Altro fattore specifico'],16:['Altro fattore specifico'],18:['Pioggia o neve'],20:['Sole / rischio di surriscaldamento'],27:['Altro fattore specifico'],29:['Terreno irregolare / pendenza'],34:['Pioggia o neve','Terreno irregolare / pendenza'],35:['Vento / forte esposizione'],37:['Vento / forte esposizione']};

  // Allineamento documentale finale dei casi studio.
  const setCase=(id,vals)=>{const a=F.abaco.find(x=>Number(x[0])===id),f=F.filterable.find(x=>Number(x[0])===id);Object.entries(vals).forEach(([k,v])=>{const i=Number(k);if(a)a[i]=v;if(f&&i<26)f[i]=v;});};
  setCase(12,{8:'4 anni'});
  setCase(20,{8:'8 mesi'});
  setCase(24,{8:'4 settimane per edizione',25:'https://www.form-tl.de/en/project/international-airshow-farnborough-gb/'});
  setCase(26,{8:'n.d.'}); setCase(27,{8:'n.d.'}); setCase(28,{8:'n.d.'});
  setCase(31,{8:'n.d.',19:'2 adulti, 1 giorno, utensili comuni'});
  setCase(32,{8:'n.d.',20:'Progetto di ricerca; realizzazione e riuso effettivo non accertati',23:'Non noto'});
  setCase(34,{8:'n.d.',20:'Prototipo costruito; durata e riuso effettivo non documentati'});
  setCase(35,{23:'Non noto',24:'Fonte bibliografica da verificare'});
  setCase(36,{19:'2 mesi complessivi di produzione e installazione'});
  setCase(39,{4:2020,8:'4 settimane'}); setCase(41,{8:'n.d.',19:'Costruito in 10 giorni'});
  setCase(43,{20:'Convertito in 410 set di arredi',23:'Documentato'});
  setCase(44,{8:'5 settimane (6 maggio–12 giugno 2022)'});
  setCase(46,{2:'Zero Gravity Pavilion',3:'Serenay Elmas, Günther H. Filz, Athanasios Markou / Aalto University',4:2019,5:'Espoo, Finlandia',8:'Installazione 11–22 ottobre 2019; ulteriori cicli di assemblaggio e riuso documentati',10:'Padiglione cinematico leggero, sistema Stewart–Gough con struttura lignea e copertura in compensato',20:'Smontato e rimontato più volte in luoghi differenti; componenti separabili; riutilizzabilità teorica del 96% in massa dopo i cicli',23:'Documentato',25:'https://research.aalto.fi/en/publications/an-ephemeral-kinematic-pavilion-in-the-light-of-assemblydisassemb/'});


  // Sincronizzazione definitiva approvata: casi e S04.
  setCase(12,{8:'4 anni'});
  setCase(25,{17:'P3 – preassemblaggio non volumetrico (2D)'});
  setCase(26,{8:'n.d.',9:'≃  18 m²- s.coperta'});
  setCase(42,{3:'Steven J. Preston (studente di ingegneria), con Lawrence C. Bank – University of Wisconsin–Madison',5:'Madison, Wisconsin, USA',6:'Dfa+continentale umido'});
  setCase(44,{10:'Sistema pannellizzato CLT',17:'P3 – preassemblaggio non volumetrico (2D)'});
  setCase(46,{2:'BUGA Wood Pavilion',3:'ICD / ITKE – Università di Stoccarda',4:2019,5:'Heilbronn, Germania',6:'Cfb+temperato',7:'Padiglione sperimentale per concerti ed eventi pubblici',8:'3 anni e 8 mesi',9:'≃ 500 m²- s.coperta',10:'Guscio ligneo segmentato con 376 cassette prefabbricate e giunti a incastro/bullonati',11:'Legno ingegnerizzato (lamellare, CLT, LVL, compensato)',12:'Filtro (mesh, schermature)',13:'Legno ingegnerizzato (lamellare, CLT, LVL, compensato) + Membrane',14:'Pannelli leggeri',15:'G1',16:'A',17:'P2 – Kit di componenti su misura',18:'Componenti modulari',19:'Prima costruzione: 10 giorni lavorativi per montare i segmenti prefabbricati; ricostruzione 2023: 12 giorni lavorativi per struttura portante',20:'Smontato a fine 2022 e ricostruito a Mannheim nel 2023: riutilizzate 376 cassette, 107 parti metalliche e circa 90% dei bulloni; pannelli di facciata sostituiti',21:'Riduzione e riuso materiali',22:'R2/R3',23:'Rimontaggio documentato a Mannheim nel 2023; riuso parziale degli strati di facciata',24:'Alta',25:'https://www.mdpi.com/2075-5309/15/11/1857; https://www.icd.uni-stuttgart.de/projects/buga-wood-pavilion-reuse-2023/'});
  const ff=id=>F.filterable.find(x=>Number(x[0])===id);
  let z=ff(12);if(z){z[8]='4 anni';z[26]='Pluriennale 2–10 anni';}
  z=ff(25);if(z)z[17]='P3 – preassemblaggio non volumetrico (2D)';
  z=ff(26);if(z){z[8]='n.d.';z[9]='≃  18 m²- s.coperta';z[26]='n.d.';z[27]='Piccola < 50 m²';}
  z=ff(42);if(z){z[3]='Steven J. Preston (studente di ingegneria), con Lawrence C. Bank – University of Wisconsin–Madison';z[5]='Madison, Wisconsin, USA';z[6]='Dfa+continentale umido';}
  z=ff(44);if(z){z[10]='Pannelli portanti 2D';z[17]='P3 – preassemblaggio non volumetrico (2D)';}
  z=ff(46);if(z){z[2]='BUGA Wood Pavilion';z[3]='ICD / ITKE – Università di Stoccarda';z[4]=2019;z[5]='Heilbronn, Germania';z[6]='Cfb+temperato';z[7]='Padiglione sperimentale per concerti ed eventi pubblici';z[8]='3 anni e 8 mesi';z[9]='≃ 500 m²- s.coperta';z[10]='Guscio ligneo segmentato';z[11]='Legno ingegnerizzato (lamellare, CLT, LVL, compensato)';z[12]='Filtro (mesh, schermature)';z[13]='Legno ingegnerizzato (lamellare, CLT, LVL, compensato) + Membrane';z[14]='Pannelli leggeri';z[15]='G1';z[16]='A';z[17]='P2 – Kit di componenti su misura';z[18]='Componenti modulari';z[19]='Prima costruzione: 10 giorni lavorativi; ricostruzione 2023: 12 giorni lavorativi per la struttura portante';z[20]='Smontato a fine 2022 e ricostruito a Mannheim nel 2023; riuso documentato di componenti';z[21]='Riduzione e riuso materiali';z[22]='R2/R3';z[23]='Rimontaggio documentato a Mannheim nel 2023; riuso parziale degli strati di facciata';z[24]='Alta';z[25]='https://www.mdpi.com/2075-5309/15/11/1857; https://www.icd.uni-stuttgart.de/projects/buga-wood-pavilion-reuse-2023/';z[26]='Pluriennale 2–10 anni';z[27]='Media 50–500 m²';z[33]='Arte e istruzione; Cfb+temperato; Pluriennale 2–10 anni; Guscio ligneo segmentato; Legno ingegnerizzato (lamellare, CLT, LVL, compensato)';}
  if(F.activitySpecific)F.activitySpecific[46]='Concerti ed eventi';
  r=byId('S04');if(r){for(let j=16;j<=28;j++)r[j]='n.d.';r[31]='Nessun caso diretto nel campione';r[32]='n.d.';r[33]='Famiglia tipologica consultabile fuori graduatoria: Little Finlandia è P3 e Fuggerei NEXT500 è un sistema pannellizzato CLT P3; nessuno dei due sostiene S04 come modulo volumetrico 3D in legno.';}

})();