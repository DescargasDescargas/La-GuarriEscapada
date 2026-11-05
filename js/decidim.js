/* Decidim què fem: preguntes amb opcions. Les respostes es guarden al navegador de cada persona. */
(function () {
  "use strict";
  const Q = [
    { id: "pla", t: "Quin pla ens ve de gust?", a: "Marca tot el que t'apeteixi.", m: 1, o: [
      ["Banys termals i relax", "Aigües sulfuroses a Dorres, Llo, Llívia o la Seu d'Urgell."],
      ["Passejar i fer una excursió tranquileta", "Pobles, mirador i dia de natura ."],
      ["Poble", "Dormim a un poble o al tocar. romantitzar fer vida de poble ."],
      ["Dia de casa: jocs, pel·lis i festa", "L'aïllament ajuda a la festa."],
      ["Gastronomia", " cata de vi a una bodega o lo que sea."] ] },
    { id: "zona", t: "On volem anar?", a: "Marca les zones que et sembla bé. Temps en cotxe des de Barcelona, aproximats i amb trànsit normal; sense neu.", m: 1, o: [
      ["Cerdanya (Puigcerdà, Llívia, Bellver)", "Vall ampla envoltada de muntanyes, amb pobles de pedra, molt de sol i ambient de muntanya. Puigcerdà té força vida, amb bars i restaurants. A prop hi ha banys termals naturals a l'aire lliure (Dorres i Llo, al costat francès), formatgeries artesanes i possibilitat de trobar neu. Ideal per combinar relax, gastronomia i una casa rural amb vistes.", "~2 h – 2 h 30 · 145-170 km"],
      ["Ripollès (Camprodon, Ribes de Freser, Sant Joan de les Abadesses)", "Pirineu verd, amb pobles de pedra, rius, boscos i masies envoltades de muntanya. Camprodon té ambient, bars i restaurants. Es poden fer excursions, pujar amb el tren cremallera de Núria i gaudir de la cuina de muntanya. Una bona opció per una escapada rural d'hivern, amb possibilitat de neu.", "~1 h 45 – 2 h 15 · 125-145 km"],
      ["Catalunya Nord (Cerdanya francesa, Capcir, Conflent)", "Pirineus Orientals francesos, amb pobles medievals, paisatges de muntanya i petits pobles amb encant. Hi ha banys termals naturals a l'aire lliure, com Saint-Thomas, Llo i Dorres, a més de mercats, formatges i gastronomia francesa. Ideal per combinar aigües termals, muntanya i turisme rural. Cal passar la frontera.", "~2 h 20 – 2 h 50 · 170-200 km"],
      ["Priorat (Falset, Siurana, Porrera, Poboleda)", "Terra de vinyes, cellers i pobles de pedra envoltats de muntanyes. És una de les millors zones per fer tasts de vins, visitar bodegues i descobrir productes locals com formatges, olis i embotits. Falset té bars i restaurants, i Siurana ofereix unes vistes espectaculars. Clima més suau i menys possibilitats de neu.", "~1 h 40 – 2 h 15 · 135-150 km"],
      ["Garrotxa (Olot, Santa Pau, Vall d'en Bas)", "Zona volcànica de boscos, fagedes i pobles medievals amb molt d'encant. Destaca per la gastronomia de muntanya, les formatgeries artesanes i els restaurants de cuina local. Ideal per fer passejades, visitar pobles, descobrir productes de proximitat i allotjar-se en una masia rural.", "~1 h 45 – 2 h 15 · 120-140 km aprox."],
      ["Girona i Empordà (Caldes de Malavella, Peratallada, Pals)", "Una zona de pobles medievals de pedra, paisatges rurals i molta oferta gastronòmica. Es poden combinar visites a cellers de la DO Empordà, tasts de vins i formatges amb una escapada termal a Caldes de Malavella. Una opció més suau, amb bars, restaurants i pobles molt bonics per descobrir, però amb menys ambient de muntanya.", "~1 h 10 – 2 h · 90-140 km aprox."] ] },
    { id: "transport", t: "Com hi anem?", a: "Marca les opcions que et van bé.", m: 1, o: [
      ["Cotxe propi, compartit", "Repartim la benzina i els peatges."],
      ["Cotxe de lloguer", "Mirar a cuant ens surt ."],
      ["Tren.", "Cal confirmar horaris i mirar quin agafariem."],
      ] },
    { id: "allotjament", t: "Quina casa busquem?", a: "Després les mirem a Cases i Comparar.", m: 1, o: [
              ["A tocar d'un poble, per anar a comprar a peu, al bar i restaurant del poble ", ""],
      ["Aïllada, per poder fer festa", ""] ] },
    { id: "menjar", t: "Què mengem i bevem?", a: "Marca el que t'agradaria.", m: 1, o: [
      ["Cata de vi en alguna bodega  ", "Alt Urgell-Cerdanya i blau català."],
      ["La laura compra al super , cuina la nat , neteja la mari tot a caseta ", "Com el tiró (ànec) amb naps."],
      ["m'agrada la idea de cata pero a casa uwu", "Al Bages o a Costers del Segre; a la zona gairebé no hi ha vinya."],
       ] },
    { id: "pressupost", t: "Quant volem gastar en allotjament?", a: "Per persona, per a tota l'estada.", m: 0, o: [
      ["Menys de 100 €", ""], ["Entre 100 i 150 €", ""], ["Entre 150 i 200 €", ""], ["M'és igual", ""] ] },
    
  ];
  const CLAU = "guarri:respostes";
  let S = { nom: "", r: {} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(CLAU) || "{}")); } catch (e) {}
  const desa = () => { try { localStorage.setItem(CLAU, JSON.stringify(S)); } catch (e) {} };
  const esc = (x) => x.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const arrel = document.getElementById("preguntes-decidim");

  arrel.innerHTML = Q.map((q) => `
    <section class="seccio" id="${q.id}" aria-labelledby="t-${q.id}"><div class="contenidor">
      <div class="seccio__cap"><div><h2 id="t-${q.id}">${q.t}</h2>${q.a ? `<p>${q.a}</p>` : ""}</div></div>
      <div class="opcions">${q.o.map((o, i) => `
        <label class="opcio"><input type="${q.m ? "checkbox" : "radio"}" name="${q.id}" value="${esc(o[0])}">
        <span><b>${o[0]}</b>${o[2] ? `<span class="dist">🚗 ${o[2]}</span>` : ""}${o[1] ? `<small>${o[1]}</small>` : ""}</span></label>`).join("")}</div>
    </div></section>`).join("");

  arrel.querySelectorAll("input").forEach((inp) => {
    inp.checked = (S.r[inp.name] || []).includes(inp.value);
    inp.addEventListener("change", () => {
      S.r[inp.name] = [...arrel.querySelectorAll(`input[name="${inp.name}"]:checked`)].map((i) => i.value);
      desa(); resum();
    });
  });
  const nom = document.getElementById("nom");
  nom.value = S.nom || "";
  nom.addEventListener("input", () => { S.nom = nom.value; desa(); resum(); });

  function text() {
    const l = Q.filter((q) => (S.r[q.id] || []).length).map((q) => `• ${q.t.replace(/\?$/, "")}: ${S.r[q.id].join(", ")}`);
    return `${S.nom || "Jo"} voldria (30 nov – 2 des):\n${l.join("\n") || "• (encara no he triat res)"}`;
  }
  function resum() { document.getElementById("resum-text").textContent = text(); }
  resum();

  const avis = document.getElementById("avis-copiat");
  function mostra(m) { avis.textContent = m; avis.classList.add("visible"); setTimeout(() => avis.classList.remove("visible"), 2200); }
  document.getElementById("copia").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(text()); mostra("Respostes copiades. Enganxa-les al grup!"); }
    catch (e) { const t = document.createElement("textarea"); t.value = text(); document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); mostra("Respostes copiades."); }
  });
  document.getElementById("esborra").addEventListener("click", () => {
    S.r = {}; desa(); arrel.querySelectorAll("input").forEach((i) => (i.checked = false)); resum(); mostra("Respostes esborrades.");
  });
})();
