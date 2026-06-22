// ============================================================
// AltiusWork — Solutions page · interactive locations map
// Leaflet + CartoDB Positron · demo data (Suisse romande / Haute-Savoie)
// ============================================================

const AW_PLACES = [
  { id:'beau-rivage', kind:'hotel', name:'Hôtel Beau-Rivage', city:'Genève',
    types:['hub','office'], coords:[46.2074,6.1559], priceFrom:39,
    equip:['Wi-Fi fibre','Café illimité','Écran 4K','Standing 5★'],
    dispo:'Lun–Ven · 8h–18h', desc:"Palace au bord du lac. Chambres lumineuses converties en day-offices et deux salles de réunion vue Léman.",
    photo:'PHOTO — suite vue lac aménagée en bureau' },

  { id:'trois-couronnes', kind:'hotel', name:'Hôtel des Trois Couronnes', city:'Vevey',
    types:['hub','office'], coords:[46.4615,6.8430], priceFrom:35,
    equip:['Wi-Fi fibre','Salle de réunion 12 pers.','Terrasse','Restauration'],
    dispo:'Lun–Sam · 8h–19h', desc:"Adresse historique face au lac. Bureaux privatifs et salon de réception pour vos rendez-vous d'affaires.",
    photo:'PHOTO — salon de réunion classique' },

  { id:'mirador', kind:'hotel', name:'Le Mirador Resort', city:'Montreux',
    types:['hub','office'], coords:[46.4869,6.8186], priceFrom:42,
    equip:['Wi-Fi fibre','Vue panoramique','Spa','Parking'],
    dispo:'Lun–Ven · 8h–18h', desc:"Resort perché sur les hauteurs. Cadre calme et panoramique, idéal pour les journées de travail au vert.",
    photo:'PHOTO — bureau panoramique hauteurs' },

  { id:'paix-lausanne', kind:'hotel', name:'Hôtel de la Paix', city:'Lausanne',
    types:['hub'], coords:[46.5188,6.6300], priceFrom:29,
    equip:['Wi-Fi fibre','Café illimité','Central','Lobby work-friendly'],
    dispo:'Lun–Ven · 8h–18h', desc:"En plein centre de Lausanne. Day-offices fonctionnels à deux pas de la gare et des transports.",
    photo:'PHOTO — day-office centre-ville' },

  { id:'royal-evian', kind:'hotel', name:'Hôtel Royal', city:'Évian-les-Bains',
    types:['hub','office'], coords:[46.4017,6.5760], priceFrom:38,
    equip:['Wi-Fi fibre','Parc privé','Salles modulables','Restauration'],
    dispo:'Lun–Sam · 8h–19h', desc:"Domaine d'exception côté français. Grandes salles modulables pour séminaires et comités de direction.",
    photo:'PHOTO — salle de séminaire domaine' },

  { id:'mont-blanc-cham', kind:'hotel', name:'Hôtel Mont-Blanc', city:'Chamonix',
    types:['hub'], coords:[45.9237,6.8694], priceFrom:32,
    equip:['Wi-Fi fibre','Vue massif','Cheminée lounge','Café'],
    dispo:'Lun–Ven · 8h–18h', desc:"Au pied du Mont-Blanc. Travaillez face aux sommets entre deux réunions ou journées à la montagne.",
    photo:'PHOTO — lounge vue Mont-Blanc' },

  { id:'imperial-annecy', kind:'hotel', name:'Impérial Palace', city:'Annecy',
    types:['hub','office'], coords:[45.9065,6.1457], priceFrom:36,
    equip:['Wi-Fi fibre','Bord du lac','Salles de conférence','Parking'],
    dispo:'Lun–Sam · 8h–19h', desc:"Palace au bord du lac d'Annecy. Bureaux et salles de conférence dans un écrin Belle Époque.",
    photo:'PHOTO — salle conférence bord du lac' },

  { id:'nh-fribourg', kind:'hotel', name:'Hôtel NH Fribourg', city:'Fribourg',
    types:['hub'], coords:[46.8020,7.1620], priceFrom:27,
    equip:['Wi-Fi fibre','Café illimité','Proche autoroute','Parking'],
    dispo:'Lun–Ven · 8h–18h', desc:"Accès autoroute immédiat. Idéal pour les commerciaux en tournée et les étapes de travail rapides.",
    photo:'PHOTO — day-office moderne' },

  { id:'cafe-centre', kind:'spot', name:'Café du Centre', city:'Genève',
    types:['spot'], coords:[46.2044,6.1480], priceFrom:12,
    equip:['Wi-Fi','Prises à chaque table','Café de spécialité','Ambiance vivante'],
    dispo:'Lun–Ven · 9h–17h', desc:"AltiusSpot — Brasserie emblématique de la rive gauche. Travaillez en solo, café à la main, dans une ambiance vivante.",
    photo:'PHOTO — lounge brasserie' },

  { id:'lacustre-lsne', kind:'spot', name:'Le Lacustre', city:'Lausanne',
    types:['spot'], coords:[46.5045,6.6300], priceFrom:12,
    equip:['Wi-Fi','Terrasse lac','Café & lunch','Coin calme'],
    dispo:'Lun–Ven · 9h–17h', desc:"AltiusSpot — Au bord du lac à Ouchy. Un coin lounge réservé au travail, café et restauration légère.",
    photo:'PHOTO — terrasse lounge Ouchy' },

  { id:'leman-montreux', kind:'spot', name:'Brasserie du Léman', city:'Montreux',
    types:['spot'], coords:[46.4330,6.9110], priceFrom:11,
    equip:['Wi-Fi','Vue lac','Café & cocktails','Prises'],
    dispo:'Lun–Ven · 9h–17h', desc:"AltiusSpot — Sur les quais de Montreux. Lounge convivial pour travailler ou recevoir autour d'un café.",
    photo:'PHOTO — lounge quai Montreux' },

  { id:'rooftop-annecy', kind:'spot', name:'Le Rooftop', city:'Annecy',
    types:['spot'], coords:[45.8992,6.1294], priceFrom:13,
    equip:['Wi-Fi','Rooftop','Café de spécialité','Vue vieille ville'],
    dispo:'Lun–Ven · 9h–17h', desc:"AltiusSpot — Toit-terrasse sur la vieille ville. Une parenthèse de travail au-dessus des canaux d'Annecy.",
    photo:'PHOTO — rooftop vieille ville' },
];

const AW_TYPE_LABEL = { spot:'AltiusSpot', hub:'AltiusHub', office:'AltiusOffice' };

(function () {
  if (typeof L === 'undefined') return;

  const state = { type:'all', city:'all', activeId:null };

  const map = L.map('map', { scrollWheelZoom:false, zoomControl:true })
    .setView([46.45, 6.65], 9);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution:'© OpenStreetMap · © CARTO',
    subdomains:'abcd', maxZoom:19
  }).addTo(map);

  // build markers
  const markers = {};
  AW_PLACES.forEach(function (p) {
    const cls = p.kind === 'hotel' ? 'aw-pin aw-pin-hotel' : 'aw-pin aw-pin-spot';
    const glyph = p.kind === 'hotel'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 21h16M6 21V8l6-4 6 4v13M10 21v-4h4v4"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 11h13M6 11V9a6 6 0 0112 0M4 11h15l-1 7a2 2 0 01-2 2H7a2 2 0 01-2-2z"/></svg>';
    const icon = L.divIcon({ className:'', html:'<span class="'+cls+'">'+glyph+'</span>',
      iconSize:[34,34], iconAnchor:[17,17] });
    const m = L.marker(p.coords, { icon:icon }).addTo(map);
    m.on('click', function () { selectPlace(p.id, true); });
    markers[p.id] = m;
  });

  // city filter options
  const cities = Array.from(new Set(AW_PLACES.map(p => p.city))).sort();
  const citySel = document.getElementById('cityFilter');
  cities.forEach(function (c) {
    const o = document.createElement('option'); o.value = c; o.textContent = c; citySel.appendChild(o);
  });

  // type chips
  document.querySelectorAll('.type-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.type = chip.dataset.type;
      render();
    });
  });
  citySel.addEventListener('change', function () { state.city = citySel.value; render(); });

  function matches(p) {
    const okType = state.type === 'all' || p.types.includes(state.type);
    const okCity = state.city === 'all' || p.city === state.city;
    return okType && okCity;
  }

  const listEl = document.getElementById('placeList');
  const countEl = document.getElementById('placeCount');

  function render() {
    const visible = AW_PLACES.filter(matches);
    countEl.textContent = visible.length + (visible.length > 1 ? ' lieux' : ' lieu');

    // markers
    AW_PLACES.forEach(function (p) {
      const m = markers[p.id];
      if (matches(p)) { if (!map.hasLayer(m)) m.addTo(map); }
      else { if (map.hasLayer(m)) map.removeLayer(m); }
    });

    // list
    listEl.innerHTML = '';
    if (!visible.length) {
      listEl.innerHTML = '<p class="list-empty">Aucun lieu ne correspond à ces filtres pour le moment.</p>';
    }
    visible.forEach(function (p) {
      const card = document.createElement('button');
      card.className = 'place-card' + (p.id === state.activeId ? ' active' : '');
      card.innerHTML =
        '<span class="place-kind '+p.kind+'">'+(p.kind==='hotel'?'Hôtel':'AltiusSpot')+'</span>'+
        '<span class="place-name">'+p.name+'</span>'+
        '<span class="place-city">'+p.city+'</span>'+
        '<span class="place-tags">'+p.types.map(t=>'<em>'+AW_TYPE_LABEL[t]+'</em>').join('')+'</span>'+
        '<span class="place-price">dès '+p.priceFrom+'&nbsp;€ <small>/ jour</small></span>';
      card.addEventListener('click', function () { selectPlace(p.id, true); });
      listEl.appendChild(card);
    });

    // close detail if active no longer visible
    if (state.activeId && !visible.some(p => p.id === state.activeId)) closeDetail();
  }

  function selectPlace(id, fly) {
    const p = AW_PLACES.find(x => x.id === id);
    if (!p) return;
    state.activeId = id;
    if (fly) map.flyTo(p.coords, 13, { duration:.7 });
    render();
    openDetail(p);
    // highlight active list card into view without page scroll
    const active = listEl.querySelector('.place-card.active');
    if (active) active.scrollIntoView ? null : null;
  }

  const detailEl = document.getElementById('placeDetail');
  function openDetail(p) {
    detailEl.innerHTML =
      '<button class="detail-close" aria-label="Fermer">×</button>'+
      '<div class="detail-photo ph"><span class="ph-tag">'+p.photo+'</span></div>'+
      '<div class="detail-body">'+
        '<span class="place-kind '+p.kind+'">'+(p.kind==='hotel'?'Hôtel partenaire':'AltiusSpot')+'</span>'+
        '<h3>'+p.name+'</h3>'+
        '<p class="detail-city">'+p.city+' · '+p.dispo+'</p>'+
        '<p class="detail-desc">'+p.desc+'</p>'+
        '<ul class="detail-equip">'+p.equip.map(e=>'<li>'+e+'</li>').join('')+'</ul>'+
        '<div class="detail-foot">'+
          '<span class="detail-price">dès <strong>'+p.priceFrom+'&nbsp;€</strong> / jour</span>'+
          '<a class="btn btn-gold" href="#contact-solutions">Réserver</a>'+
        '</div>'+
      '</div>';
    detailEl.classList.add('open');
    detailEl.querySelector('.detail-close').addEventListener('click', closeDetail);
  }
  function closeDetail() {
    detailEl.classList.remove('open');
    state.activeId = null;
    render();
  }

  // invalidate size once visible (in case of layout shift)
  setTimeout(function () { map.invalidateSize(); }, 300);
  window.addEventListener('resize', function () { map.invalidateSize(); });

  render();
})();
