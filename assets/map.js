// ============================================================
// AltiusWork — Solutions page · interactive locations map
// Leaflet + CartoDB Positron · Alpes françaises (Suisse en second). Sites Restoleil (Base Camp Lodge) = partenaire ; autres lieux = exemples illustratifs.
// Bilingue : les textes suivent la langue de la page (<html lang>).
// ============================================================

const AW_LANG = (document.documentElement.lang === 'en') ? 'en' : 'fr';

const AW_T = {
  fr: { lieux:' lieux', lieu:' lieu', empty:"Aucun lieu ne correspond à ces filtres pour le moment.",
        hotel:'Hôtel', hotelPartner:'Hôtel partenaire', from:'dès', perDay:'/ jour', book:'Réserver', close:'Fermer' },
  en: { lieux:' places', lieu:' place', empty:'No place matches these filters for now.',
        hotel:'Hotel', hotelPartner:'Partner hotel', from:'from', perDay:'/ day', book:'Book', close:'Close' }
}[AW_LANG];

const AW_PLACES = [
  { id:'imperial-annecy', kind:'hotel', name:'Impérial Palace', city:'Annecy',
    types:['daily','meeting','office'], coords:[45.9065,6.1457], priceFrom:38,
    equip:{ fr:['Wi-Fi fibre','Bord du lac','Salles de conférence','Parking'], en:['Fibre Wi-Fi','Lakeside','Conference rooms','Parking'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Palace au bord du lac d'Annecy. Bureaux et salles de conférence dans un écrin Belle Époque.",
           en:"Palace on the shore of Lake Annecy. Offices and conference rooms in a Belle Époque setting." },
    photo:{ fr:'PHOTO — salle conférence bord du lac', en:'PHOTO — lakeside conference room' } },

  { id:'candie-chambery', kind:'hotel', name:'Château de Candie', city:'Chambéry',
    types:['daily','meeting','office'], coords:[45.5789,5.9350], priceFrom:39,
    equip:{ fr:['Wi-Fi fibre','Demeure de caractère','Salons de réunion','Parc'], en:['Fibre Wi-Fi','Character estate','Meeting lounges','Grounds'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Demeure de caractère aux portes de Chambéry. Bureaux privatifs et salons pour vos rendez-vous d'affaires.",
           en:"A character estate at the gates of Chambéry. Private offices and lounges for your business meetings." },
    photo:{ fr:'PHOTO — salon de réunion demeure', en:'PHOTO — estate meeting lounge' } },

  { id:'bcl-albertville', kind:'hotel', name:'Base Camp Lodge Albertville', city:'Albertville',
    types:['daily','meeting','office'], coords:[45.6759,6.3925], priceFrom:38,
    equip:{ fr:['Wi-Fi fibre','90 chambres','Salles de séminaire','Spa'], en:['Fibre Wi-Fi','90 rooms','Seminar rooms','Spa'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Groupe Restoleil, partenaire. 90 chambres sur la RN90, salles de séminaire et spa. Site pilote du corridor Tarentaise.",
           en:"Restoleil group, partner. 90 rooms on the RN90, seminar rooms and spa. Pilot site of the Tarentaise corridor." },
    photo:{ fr:'PHOTO — Base Camp Lodge Albertville', en:'PHOTO — Base Camp Lodge Albertville' } },

  { id:'bcl-bourg', kind:'hotel', name:'Base Camp Lodge Bourg-Saint-Maurice', city:'Bourg-Saint-Maurice',
    types:['daily','office'], coords:[45.6100,6.7690], priceFrom:38,
    equip:{ fr:['Wi-Fi fibre','Quartier des Alpins','Porte des stations','Café'], en:['Fibre Wi-Fi','Quartier des Alpins','Gateway to resorts','Coffee'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Groupe Restoleil, partenaire. Lodge lifestyle au Quartier des Alpins, porte des stations de la Tarentaise. 2e site du corridor pilote.",
           en:"Restoleil group, partner. Lifestyle lodge in the Quartier des Alpins, gateway to the Tarentaise resorts. Second site of the pilot corridor." },
    photo:{ fr:'PHOTO — Base Camp Lodge Bourg-Saint-Maurice', en:'PHOTO — Base Camp Lodge Bourg-Saint-Maurice' } },

  { id:'bcl-2alpes', kind:'hotel', name:'Base Camp Lodge Les Deux-Alpes', city:'Les Deux-Alpes',
    types:['daily'], coords:[45.0106,6.1244], priceFrom:40,
    equip:{ fr:['Wi-Fi fibre','Station d\'altitude','Lounge','Café'], en:['Fibre Wi-Fi','High-altitude resort','Lounge','Coffee'] },
    dispo:{ fr:'Saison · 8h–18h', en:'Season · 8am–6pm' },
    desc:{ fr:"Groupe Restoleil, partenaire. Lodge en station d'altitude (Isère), pour les saisonniers et les pros en workation.",
           en:"Restoleil group, partner. High-altitude resort lodge (Isère), for seasonal workers and workation pros." },
    photo:{ fr:'PHOTO — Base Camp Lodge Les Deux-Alpes', en:'PHOTO — Base Camp Lodge Les Deux-Alpes' } },

  { id:'bcl-feclaz', kind:'hotel', name:'Base Camp Lodge La Féclaz', city:'La Féclaz',
    types:['daily'], coords:[45.6360,5.9870], priceFrom:38,
    equip:{ fr:['Wi-Fi fibre','Massif des Bauges','Lounge','Café'], en:['Fibre Wi-Fi','Bauges massif','Lounge','Coffee'] },
    dispo:{ fr:'Saison · 8h–18h', en:'Season · 8am–6pm' },
    desc:{ fr:"Groupe Restoleil, partenaire. Lodge du massif des Bauges (ouverture 2026), à deux pas de Chambéry.",
           en:"Restoleil group, partner. Bauges massif lodge (opening 2026), a short drive from Chambéry." },
    photo:{ fr:'PHOTO — Base Camp Lodge La Féclaz', en:'PHOTO — Base Camp Lodge La Féclaz' } },

  { id:'arpette-arc1800', kind:'spot', name:'L\'Arpette', city:'Arc 1800',
    types:['spot'], coords:[45.5720,6.8270], priceFrom:13,
    equip:{ fr:['Wi-Fi','Restaurant d\'altitude','Terrasse','Café'], en:['Wi-Fi','Mountain restaurant','Terrace','Coffee'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Restaurant d'altitude à Arc 1800, coin travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. High-altitude restaurant at Arc 1800, a work corner during off-peak hours." },
    photo:{ fr:'PHOTO — restaurant Arc 1800', en:'PHOTO — Arc 1800 restaurant' } },

  { id:'presquile-lyon', kind:'hotel', name:'Hôtel de la Presqu\'île', city:'Lyon',
    types:['daily','meeting','office'], coords:[45.7640,4.8330], priceFrom:44,
    equip:{ fr:['Wi-Fi fibre','Centre-ville','Salles de réunion','Restauration'], en:['Fibre Wi-Fi','City centre','Meeting rooms','Catering'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Au cœur de la Presqu'île lyonnaise. Bureaux et salles de réunion à deux pas des gares et des affaires.",
           en:"In the heart of Lyon's Presqu'île. Offices and meeting rooms steps from the stations and business district." },
    photo:{ fr:'PHOTO — salle de réunion centre-ville', en:'PHOTO — city-centre meeting room' } },

  { id:'park-grenoble', kind:'hotel', name:'Park Hôtel', city:'Grenoble',
    types:['daily','meeting'], coords:[45.1885,5.7245], priceFrom:39,
    equip:{ fr:['Wi-Fi fibre','Face au parc','Day-offices','Parking'], en:['Fibre Wi-Fi','Facing the park','Day-offices','Parking'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Face au parc Paul Mistral. Day-offices et salles pour vos réunions au pied des massifs.",
           en:"Facing Paul Mistral park. Day-offices and rooms for your meetings at the foot of the mountains." },
    photo:{ fr:'PHOTO — day-office vue parc', en:'PHOTO — park-view day-office' } },

  { id:'chalet-megeve', kind:'hotel', name:'Grand Chalet', city:'Megève',
    types:['daily','office'], coords:[45.8570,6.6175], priceFrom:42,
    equip:{ fr:['Wi-Fi fibre','Chalet de standing','Cheminée lounge','Bureaux au calme'], en:['Fibre Wi-Fi','Upscale chalet','Lounge fireplace','Quiet offices'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Chalet de standing au cœur de Megève. Bureaux au calme pour travailler entre deux sommets.",
           en:"An upscale chalet in the heart of Megève. Quiet offices to work between two summits." },
    photo:{ fr:'PHOTO — lounge chalet cheminée', en:'PHOTO — chalet fireplace lounge' } },

  { id:'beau-rivage-geneve', kind:'hotel', name:'Hôtel Beau-Rivage', city:'Genève',
    types:['daily','meeting','office'], coords:[46.2074,6.1559], priceFrom:48,
    equip:{ fr:['Wi-Fi fibre','Vue Léman','Salles de réunion','Standing 5★'], en:['Fibre Wi-Fi','Lake Geneva view','Meeting rooms','5★ standing'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Suisse romande, marché desservi en second. Palace au bord du lac : day-offices et salles vue Léman.",
           en:"French-speaking Switzerland, served as a second market. Lakeside palace: day-offices and rooms with Lake Geneva views." },
    photo:{ fr:'PHOTO — suite vue lac aménagée en bureau', en:'PHOTO — lake-view suite set up as an office' } },

  { id:'rooftop-annecy', kind:'spot', name:'Le Rooftop', city:'Annecy',
    types:['spot'], coords:[45.8992,6.1294], priceFrom:13,
    equip:{ fr:['Wi-Fi','Rooftop','Café de spécialité','Vue vieille ville'], en:['Wi-Fi','Rooftop','Specialty coffee','Old-town view'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Toit-terrasse sur la vieille ville. Une parenthèse de travail au-dessus des canaux d'Annecy.",
           en:"AltiusSpot — Rooftop over the old town. A work break above the canals of Annecy." },
    photo:{ fr:'PHOTO — rooftop vieille ville', en:'PHOTO — old-town rooftop' } },

  { id:'carre-chambery', kind:'spot', name:'Le Carré', city:'Chambéry',
    types:['spot'], coords:[45.5646,5.9178], priceFrom:12,
    equip:{ fr:['Wi-Fi','Prises à chaque table','Café & lunch','Coin calme'], en:['Wi-Fi','Sockets at every table','Coffee & lunch','Quiet corner'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Café-lounge au centre de Chambéry. Un coin calme pour travailler, café et déjeuner sur place.",
           en:"AltiusSpot — A café-lounge in central Chambéry. A quiet corner to work, coffee and lunch on site." },
    photo:{ fr:'PHOTO — café-lounge centre-ville', en:'PHOTO — city-centre café-lounge' } },

  { id:'fabrique-lyon', kind:'spot', name:'La Fabrique', city:'Lyon',
    types:['spot'], coords:[45.7580,4.8320], priceFrom:12,
    equip:{ fr:['Wi-Fi','Prises','Café de spécialité','Ambiance créative'], en:['Wi-Fi','Sockets','Specialty coffee','Creative vibe'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Coffee shop de la Croix-Rousse. Prises à chaque table, ambiance créative pour travailler en solo.",
           en:"AltiusSpot — A Croix-Rousse coffee shop. Sockets at every table, a creative vibe to work solo." },
    photo:{ fr:'PHOTO — coffee shop Croix-Rousse', en:'PHOTO — Croix-Rousse coffee shop' } },

  { id:'cafe-centre-geneve', kind:'spot', name:'Café du Centre', city:'Genève',
    types:['spot'], coords:[46.2044,6.1480], priceFrom:14,
    equip:{ fr:['Wi-Fi','Prises à chaque table','Café de spécialité','Ambiance vivante'], en:['Wi-Fi','Sockets at every table','Specialty coffee','Lively atmosphere'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Suisse romande, en second. Brasserie de la rive gauche pour travailler en solo, café à la main.",
           en:"AltiusSpot — French-speaking Switzerland, secondary market. A left-bank brasserie to work solo, coffee in hand." },
    photo:{ fr:'PHOTO — lounge brasserie', en:'PHOTO — brasserie lounge' } },
];

const AW_TYPE_LABEL = { spot:'Spot', daily:'Daily Office', office:'Office', meeting:'Meeting Room' };

(function () {
  if (typeof L === 'undefined') return;

  const state = { type:'all', city:'all', activeId:null };

  const map = L.map('map', { scrollWheelZoom:false, zoomControl:true })
    .setView([45.85, 5.95], 8);

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
    countEl.textContent = visible.length + (visible.length > 1 ? AW_T.lieux : AW_T.lieu);

    // markers
    AW_PLACES.forEach(function (p) {
      const m = markers[p.id];
      if (matches(p)) { if (!map.hasLayer(m)) m.addTo(map); }
      else { if (map.hasLayer(m)) map.removeLayer(m); }
    });

    // list
    listEl.innerHTML = '';
    if (!visible.length) {
      listEl.innerHTML = '<p class="list-empty">' + AW_T.empty + '</p>';
    }
    visible.forEach(function (p) {
      const card = document.createElement('button');
      card.className = 'place-card' + (p.id === state.activeId ? ' active' : '');
      card.innerHTML =
        '<span class="place-kind '+p.kind+'">'+(p.kind==='hotel'?AW_T.hotel:'AltiusSpot')+'</span>'+
        '<span class="place-name">'+p.name+'</span>'+
        '<span class="place-city">'+p.city+'</span>'+
        '<span class="place-tags">'+p.types.map(t=>'<em>'+AW_TYPE_LABEL[t]+'</em>').join('')+'</span>'+
        '<span class="place-price">'+AW_T.from+' '+p.priceFrom+'&nbsp;€ <small>'+AW_T.perDay+'</small></span>';
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
  }

  const detailEl = document.getElementById('placeDetail');
  function openDetail(p) {
    detailEl.innerHTML =
      '<button class="detail-close" aria-label="'+AW_T.close+'">×</button>'+
      '<div class="detail-photo ph"><span class="ph-tag">'+p.photo[AW_LANG]+'</span></div>'+
      '<div class="detail-body">'+
        '<span class="place-kind '+p.kind+'">'+(p.kind==='hotel'?AW_T.hotelPartner:'AltiusSpot')+'</span>'+
        '<h3>'+p.name+'</h3>'+
        '<p class="detail-city">'+p.city+' · '+p.dispo[AW_LANG]+'</p>'+
        '<p class="detail-desc">'+p.desc[AW_LANG]+'</p>'+
        '<ul class="detail-equip">'+p.equip[AW_LANG].map(e=>'<li>'+e+'</li>').join('')+'</ul>'+
        '<div class="detail-foot">'+
          '<span class="detail-price">'+AW_T.from+' <strong>'+p.priceFrom+'&nbsp;€</strong> '+AW_T.perDay+'</span>'+
          '<a class="btn btn-gold" href="#contact-solutions">'+AW_T.book+'</a>'+
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
