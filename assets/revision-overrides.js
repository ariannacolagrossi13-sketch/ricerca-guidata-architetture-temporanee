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

  // S04: Little Finlandia è P3 e non costituisce evidenza diretta per una famiglia P4 volumetrica.
  r=byId('S04');
  if(r){
    r[31]='Nessun caso diretto nel campione';
    r[32]='n.d.';
    ndCompat(r);
    r[33]='Famiglia progettuale mantenuta come opzione tipologica, ma non valutata quantitativamente: nel campione non è presente un caso diretto P4 volumetrico in legno. Little Finlandia è classificato P3 e non viene usato come evidenza per questa famiglia.';
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

  // Classi di durata non sovrapposte: il valore 6 mesi resta nella classe stagionale.
  F.filterable.forEach(c=>{ if(c[26]==='Medio 6–24 mesi') c[26]='Medio >6–<24 mesi'; });

  // Caso 46: sostituzione Zero Gravity Pavilion con BUGA Wood Pavilion.
  // I valori normalizzati rispettano le opzioni già previste dalla matrice.
  const bugaAbaco=[46,"Arte e istruzione","BUGA Wood Pavilion","ICD / ITKE – Università di Stoccarda",2019,"Heilbronn, Germania","Cfb+temperato","Padiglione sperimentale per concerti ed eventi pubblici","3 anni e 8 mesi","≃ 500 m²- s.coperta","Guscio ligneo segmentato a doppia curvatura","Legno ingegnerizzato (lamellare, CLT, LVL, compensato)","Aperto, coperto, con tre grandi aperture ad arco","Cassette lignee; membrana EPDM; rivestimento in larice","Guscio ligneo con membrana impermeabilizzante","Giunti a dita (finger joints) e bulloni rimovibili; giunzioni avvitate in alcuni archi","Fondazioni in calcestruzzo con elementi metallici di collegamento","P3 – preassemblaggio non volumetrico (2D)","Cassette lignee prefabbricate trasportate su autocarro","Assemblaggio del guscio in 10 giorni lavorativi","Smontato nel 2022 e rimontato nel 2023; 376 cassette riutilizzate","Leggerezza strutturale, prefabbricazione, riuso effettivo dei componenti","R2","Documentato","Alta","https://www.icd.uni-stuttgart.de/projects/buga-wood-pavilion-2019/"];
  const bugaFiltrabile=[46,"Arte e istruzione","BUGA Wood Pavilion","ICD / ITKE – Università di Stoccarda",2019,"Heilbronn, Germania","Cfb+temperato","Padiglione sperimentale per concerti ed eventi pubblici","3 anni e 8 mesi","≃ 500 m²- s.coperta","Gridshell","Legno ingegnerizzato (lamellare, CLT, LVL, compensato)","Aperto","Legno ingegnerizzato (lamellare, CLT, LVL, compensato) + Membrane","Membrana","G1","FP","P3 – preassemblaggio non volumetrico (2D)","Cassette lignee prefabbricate trasportate su autocarro","Assemblaggio del guscio in 10 giorni lavorativi","Smontato nel 2022 e rimontato nel 2023; 376 cassette riutilizzate","Leggerezza strutturale, prefabbricazione, riuso effettivo dei componenti","R2","Documentato","Alta","https://www.icd.uni-stuttgart.de/projects/buga-wood-pavilion-2019/","Pluriennale 2–10 anni","Media 50–500 m²",30,3,"T3","M5",2,"BUGA Wood Pavilion"];
  const i46=F.abaco.findIndex(x=>Number(x[0])===46);
  const f46=F.filterable.findIndex(x=>Number(x[0])===46);
  if(i46>=0) F.abaco[i46]=bugaAbaco;
  if(f46>=0) F.filterable[f46]=bugaFiltrabile;
})();
