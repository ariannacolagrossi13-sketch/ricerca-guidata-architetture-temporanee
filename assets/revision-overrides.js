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
    r[33]='Riferimento tipologico diretto: Puuinfo descrive la costruzione con elementi volumetrici lignei e il loro montaggio a partire da giugno 2021. Il caso 25 è riclassificato P4. La documentazione dell’unità volumetrica non convalida automaticamente le compatibilità prestazionali 1–3 della famiglia, mantenute n.d. in attesa di verifica.';
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

  // Caso 46: sostituzione Zero Gravity Pavilion con BUGA Wood Pavilion.
  // I valori normalizzati rispettano le opzioni già previste dalla matrice.
  const bugaAbaco=[46,"Arte e istruzione","BUGA Wood Pavilion","ICD / ITKE – Università di Stoccarda",2019,"Heilbronn, Germania","Cfb+temperato","Padiglione sperimentale per concerti ed eventi pubblici","3 anni e 8 mesi","≃ 500 m²- s.coperta","Guscio ligneo segmentato a doppia curvatura","Legno ingegnerizzato (lamellare, CLT, LVL, compensato)","Aperto, coperto, con tre grandi aperture ad arco","Cassette lignee; membrana EPDM; rivestimento in larice","Guscio ligneo con membrana impermeabilizzante","Giunti a dita (finger joints) e bulloni rimovibili; giunzioni avvitate in alcuni archi","Fondazioni in calcestruzzo con elementi metallici di collegamento","P3 – preassemblaggio non volumetrico (2D)","Cassette lignee prefabbricate trasportate su autocarro","Assemblaggio del guscio in 10 giorni lavorativi","Smontato nel 2022 e rimontato nel 2023; 376 cassette riutilizzate","Leggerezza strutturale, prefabbricazione, riuso effettivo dei componenti","R2","Documentato","Alta","https://www.icd.uni-stuttgart.de/projects/buga-wood-pavilion-2019/"];
  const bugaFiltrabile=[46,"Arte e istruzione","BUGA Wood Pavilion","ICD / ITKE – Università di Stoccarda",2019,"Heilbronn, Germania","Cfb+temperato","Padiglione sperimentale per concerti ed eventi pubblici","3 anni e 8 mesi","≃ 500 m²- s.coperta","Gridshell","Legno ingegnerizzato (lamellare, CLT, LVL, compensato)","Aperto","Legno ingegnerizzato (lamellare, CLT, LVL, compensato) + Membrane","Membrana","G1","FP","P3 – preassemblaggio non volumetrico (2D)","Cassette lignee prefabbricate trasportate su autocarro","Assemblaggio del guscio in 10 giorni lavorativi","Smontato nel 2022 e rimontato nel 2023; 376 cassette riutilizzate","Leggerezza strutturale, prefabbricazione, riuso effettivo dei componenti","R2","Documentato","Alta","https://www.icd.uni-stuttgart.de/projects/buga-wood-pavilion-2019/","Pluriennale 2–10 anni","Media 50–500 m²",30,3,"T3","M5","n.d.","BUGA Wood Pavilion"];
  const i46=F.abaco.findIndex(x=>Number(x[0])===46);
  const f46=F.filterable.findIndex(x=>Number(x[0])===46);
  if(i46>=0) F.abaco[i46]=bugaAbaco;
  if(f46>=0) F.filterable[f46]=bugaFiltrabile;

  // Allineamento casi 39 e 42 con Abaco e matrice verificati.
  let a39=F.abaco.find(x=>Number(x[0])===39), f39=F.filterable.find(x=>Number(x[0])===39);
  if(a39){ a39[4]=2019; a39[8]='4 settimane'; }
  if(f39){ f39[4]=2019; f39[8]='4 settimane'; f39[26]='Breve < 1 mese'; f39[33]='Arte e istruzione; Cfb+temperato; Breve < 1 mese; Struttura reciproca; Legno massiccio'; }

  let a42=F.abaco.find(x=>Number(x[0])===42), f42=F.filterable.find(x=>Number(x[0])===42);
  const p42='Steven J. Preston (studente di ingegneria), con Lawrence C. Bank – University of Wisconsin–Madison';
  if(a42){ a42[3]=p42; a42[5]='Madison, Wisconsin, USA'; a42[6]='Dfa+continentale umido'; a42[8]='14 giorni'; }
  if(f42){ f42[3]=p42; f42[5]='Madison, Wisconsin, USA'; f42[6]='Dfa+continentale umido'; f42[8]='14 giorni'; f42[26]='Breve < 1 mese'; f42[33]='Arte e istruzione; Dfa+continentale umido; Breve < 1 mese; Reticolare / truss; Carta e cartone'; }
  // Audit 46 casi: categorie controllate per la ricerca guidata.
  // Attività specifica = normalizzazione della funzione descrittiva; fattori di sito = solo condizioni già documentate, mai dedotte dalla sola città.
  F.activitySpecific={1:'Promozione',2:'Vendita',3:'Vendita',4:'Esposizione',5:'Esposizione',6:'Esposizione',7:'Esposizione',8:'Esposizione',9:'Esposizione',10:'Esperienza immersiva',11:'Esposizione',12:'Sport',13:'Esposizione',14:'Eventi culturali',15:'Spettacolo',16:'Festival',17:'Spettacolo',18:'Festival',19:'Supporto festival',20:'Eventi',21:'Spettacolo',22:'Spettacolo',23:'Servizi al pubblico',24:'Eventi corporate',25:'Congressi ed eventi',26:'Alloggio emergenziale',27:'Alloggio emergenziale',28:'Alloggio emergenziale',29:'Alloggio temporaneo',30:'Rifugio',31:'Rifugio',32:'Alloggio temporaneo',33:'Rifugio',34:'Alloggio emergenziale',35:'Rifugio',36:'Istruzione',37:'Istruzione',38:'Workshop',39:'Installazione culturale',40:'Workshop',41:'Istruzione',42:'Didattica ed esposizione',43:'Installazione artistica',44:'Mostra ed educazione',45:'Culto',46:'Concerti ed eventi'};
  F.siteFactorsControlled={1:['Sole / rischio di surriscaldamento','Pioggia o neve','Terreno irregolare / pendenza'],2:['Sole / rischio di surriscaldamento'],8:['Pioggia o neve','Altro fattore specifico'],9:['Altro fattore specifico'],16:['Altro fattore specifico'],18:['Pioggia o neve'],20:['Sole / rischio di surriscaldamento'],27:['Altro fattore specifico'],29:['Terreno irregolare / pendenza'],34:['Pioggia o neve','Terreno irregolare / pendenza'],35:['Vento / forte esposizione'],37:['Vento / forte esposizione']};

})();