/* Decidim què fem: preguntes amb opcions. Les respostes es guarden al navegador de cada persona. */
(function () {
  "use strict";
  const Q = [
    { id: "pla", t: "Quin pla ens ve de gust?", a: "Marca el que mes t'agradi.", m: 1, o: [
      ["Banys termals i relax", "Aigües sulfuroses a Dorres, Llo, Llívia o la Seu d'Urgell."],
      ["Passejar i fer una excursió suau", "Pobles, mirador i dia de natura sense córrer."],
      ["Neu", "Segons com estigui la muntanya a finals de novembre."],
      ["Dia de casa: jocs, pel·lis i festa", "L'aïllament ajuda a la festa."],
      ["Gastronomia", "Formatges, trinxat i cata a casa."] ] },
    { id: "zona", t: "On volem anar?", a: "Marca les zones que et sembla bé. Temps en cotxe des de Barcelona, aproximats i sense trànsit ni neu.", m: 1, o: [
      ["Cerdanya (Puigcerdà, Llívia, Bellver)", "Vall àmplia i plana envoltada de muntanyes, amb molt de sol. Puigcerdà té ambient, hi ha banys termals a prop (Dorres i Llo, al costat francès) i cases grans per a grups. Ideal per a relax i neu.", "~1 h 50 · 145 km"],
      ["Ripollès (Camprodon, Ribes de Freser, Collada de Toses)", "Pirineu verd, amb pobles de pedra, rius i masies. Spa La Collada en plena muntanya, tren cremallera de Núria i bona cuina de muntanya. Pot nevar.", "~1 h 50 · 125-145 km"],
      ["Alt Urgell (la Seu d'Urgell)", "Ciutat petita amb catedral romànica vora el Segre. Banys de Sant Vicenç i bons formatges de la zona. És la més lluny de totes.", "~2 h 30 · 200 km aprox."],
      ["Catalunya Nord (les cases ja trobades)", "Pirineus Orientals francesos: Cerdanya francesa, Capcir i Conflent, amb pobles medievals i molt paisatge. Aquí hi ha les cases que ja teníem. Cal passar la frontera.", "~2 h 20 - 2 h 50"],
      ["Priorat (Falset, Siurana, Poboleda)", "Terra de vinyers i pobles de pedra, amb clima més suau i sense neu. La millor per a cata de vins. No hi ha termes.", "~1 h 40 · 135 km"],
      ["Garrotxa (Olot, Santa Pau)", "Volcans, fagedes i cuina de poble. Passejades suaus i molt d'encant. Sense termes.", "~1 h 45 · 120 km aprox."],
      ["Girona i Empordà (Caldes de Malavella)", "La més a prop i sense risc de neu. Balneari a Caldes de Malavella i vins de l'Empordà a prop. Menys ambient de muntanya.", "~1 h 10 · 100 km aprox."] ] },
    { id: "transport", t: "Com hi anem?", a: "Marca les opcions que et van bé.", m: 1, o: [
      ["Cotxe propi, compartit", "Repartim la benzina i els peatges."],
      ["Cotxe de lloguer", "Ens va bé si som 6 o 7 i cal més d'un vehicle."],
      ["Tren fins a Puigcerdà", "Línia R3. Cal confirmar horaris i que algú ens reculli."],
      ["M'és igual, m'adapto", ""] ] },
    { id: "allotjament", t: "Quina casa busquem?", a: "Després les mirem a Cases i Comparar.", m: 1, o: [
      ["Gran, amb xemeneia o jardí", ""],
      ["A prop d'uns banys termals", ""],
      ["A tocar d'un poble, per anar a comprar a peu", ""],
      ["Aïllada, per poder fer festa", ""] ] },
    { id: "menjar", t: "Què mengem i bevem?", a: "Marca el que t'agradaria.", m: 1, o: [
      ["Cata de formatges de la zona", "Alt Urgell-Cerdanya i blau català."],
      ["Trinxat i plats de la Cerdanya", "Com el tiró (ànec) amb naps."],
      ["Vi comprat pel camí i cata a casa", "Al Bages o a Costers del Segre; a la zona gairebé no hi ha vinya."],
      ["Cuinar tots junts", ""] ] },
    { id: "pressupost", t: "Quant volem gastar en allotjament?", a: "Per persona, per a tota l'estada.", m: 0, o: [
      ["Menys de 100 €", ""], ["Entre 100 i 150 €", ""], ["Entre 150 i 200 €", ""], ["M'és igual", ""] ] },
    { id: "gent", t: "Quantes serem?", a: "", m: 0, o: [["6 persones", ""], ["7 persones", ""], ["Encara no ho sé", ""]] }
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
