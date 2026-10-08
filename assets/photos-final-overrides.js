/* Riallineamento foto alla numerazione dell'Abaco finale.
   Nel catalogo precedente mancavano Pikku-Finlandia (nuovo 25) e Global Village Shelter (nuovo 33). */
(function(){
  const p=window.CATALOG_PHOTOS=window.CATALOG_PHOTOS||{};
  const old={};
  for(let i=25;i<=35;i++) old[i]=p[i];

  // I casi già presenti nel vecchio catalogo slittano di una posizione.
  for(let oldId=25;oldId<=31;oldId++) p[oldId+1]=old[oldId];
  p[34]=old[33]; // Experimental Wooden Modular Housing
  p[35]=old[34]; // Prefab Bamboo Bio-concrete Shelter
  p[36]=old[35]; // Relocatable Modular School

  // Nuovi casi dell'Abaco finale.
  p[25]="https://cdn.ark.fi/20220517155428/pikkufinlandia_53a9348__photo_mikael_linden-scaled.jpg";
  p[33]="https://i1.wp.com/designlikeyougiveadamn.com/wp-content/uploads/sites/38286/2023/08/GVS-village2-prnt-1024x768.jpg?ssl=1";
})();