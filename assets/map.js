// ============================================================
// AltiusWork — Solutions page · interactive locations map
// Leaflet + CartoDB Positron · demo data (Suisse romande / Haute-Savoie)
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
  { id:'beau-rivage', kind:'hotel', name:'Hôtel Beau-Rivage', city:'Genève',
    types:['hub','office'], coords:[46.2074,6.1559], priceFrom:39,
    equip:{ fr:['Wi-Fi fibre','Café illimité','Écran 4K','Standing 5★'], en:['Fibre Wi-Fi','Unlimited coffee','4K screen','5★ standing'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Palace au bord du lac. Chambres lumineuses converties en day-offices et deux salles de réunion vue Léman.",
           en:"Lakeside palace. Bright rooms converted into day-offices and two meeting rooms overlooking Lake Geneva." },
    photo:{ fr:'PHOTO — suite vue lac aménagée en bureau', en:'PHOTO — lake-view suite set up as an office' } },

  { id:'trois-couronnes', kind:'hotel', name:'Hôtel des Trois Couronnes', city:'Vevey',
    types:['hub','office'], coords:[46.4615,6.8430], priceFrom:35,
    equip:{ fr:['Wi-Fi fibre','Salle de réunion 12 pers.','Terrasse','Restauration'], en:['Fibre Wi-Fi','12-seat meeting room','Terrace','Catering'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Adresse historique face au lac. Bureaux privatifs et salon de réception pour vos rendez-vous d'affaires.",
           en:"Historic address facing the lake. Private offices and a reception lounge for your business meetings." },
    photo:{ fr:'PHOTO — salon de réunion classique', en:'PHOTO — classic meeting lounge' } },

  { id:'mirador', kind:'hotel', name:'Le Mirador Resort', city:'Montreux',
    types:['hub','office'], coords:[46.4869,6.8186], priceFrom:42,
    equip:{ fr:['Wi-Fi fibre','Vue panoramique','Spa','Parking'], en:['Fibre Wi-Fi','Panoramic view','Spa','Parking'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Resort perché sur les hauteurs. Cadre calme et panoramique, idéal pour les journées de travail au vert.",
           en:"Resort set on the heights. A calm, panoramic setting, ideal for work days surrounded by greenery." },
    photo:{ fr:'PHOTO — bureau panoramique hauteurs', en:'PHOTO — panoramic office on the heights' } },

  { id:'paix-lausanne', kind:'hotel', name:'Hôtel de la Paix', city:'Lausanne',
    types:['hub'], coords:[46.5188,6.6300], priceFrom:29,
    equip:{ fr:['Wi-Fi fibre','Café illimité','Central','Lobby work-friendly'], en:['Fibre Wi-Fi','Unlimited coffee','Central','Work-friendly lobby'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"En plein centre de Lausanne. Day-offices fonctionnels à deux pas de la gare et des transports.",
           en:"In the heart of Lausanne. Functional day-offices steps from the station and transport." },
    photo:{ fr:'PHOTO — day-office centre-ville', en:'PHOTO — city-centre day-office' } },

  { id:'royal-evian', kind:'hotel', name:'Hôtel Royal', city:'Évian-les-Bains',
    types:['hub','office'], coords:[46.4017,6.5760], priceFrom:38,
    equip:{ fr:['Wi-Fi fibre','Parc privé','Salles modulables','Restauration'], en:['Fibre Wi-Fi','Private grounds','Modular rooms','Catering'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Domaine d'exception côté français. Grandes salles modulables pour séminaires et comités de direction.",
           en:"An exceptional estate on the French side. Large modular rooms for seminars and executive committees." },
    photo:{ fr:'PHOTO — salle de séminaire domaine', en:'PHOTO — estate seminar room' } },

  { id:'mont-blanc-cham', kind:'hotel', name:'Hôtel Mont-Blanc', city:'Chamonix',
    types:['hub'], coords:[45.9237,6.8694], priceFrom:32,
    equip:{ fr:['Wi-Fi fibre','Vue massif','Cheminée lounge','Café'], en:['Fibre Wi-Fi','Mountain view','Lounge fireplace','Coffee'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Au pied du Mont-Blanc. Travaillez face aux sommets entre deux réunions ou journées à la montagne.",
           en:"At the foot of Mont Blanc. Work facing the peaks between meetings or mountain days." },
    photo:{ fr:'PHOTO — lounge vue Mont-Blanc', en:'PHOTO — Mont Blanc-view lounge' } },

  { id:'imperial-annecy', kind:'hotel', name:'Impérial Palace', city:'Annecy',
    types:['hub','office'], coords:[45.9065,6.1457], priceFrom:36,
    equip:{ fr:['Wi-Fi fibre','Bord du lac','Salles de conférence','Parking'], en:['Fibre Wi-Fi','Lakeside','Conference rooms','Parking'] },
    dispo:{ fr:'Lun–Sam · 8h–19h', en:'Mon–Sat · 8am–7pm' },
    desc:{ fr:"Palace au bord du lac d'Annecy. Bureaux et salles de conférence dans un écrin Belle Époque.",
           en:"Palace on the shore of Lake Annecy. Offices and conference rooms in a Belle Époque setting." },
    photo:{ fr:'PHOTO — salle conférence bord du lac', en:'PHOTO — lakeside conference room' } },

  { id:'nh-fribourg', kind:'hotel', name:'Hôtel NH Fribourg', city:'Fribourg',
    types:['hub'], coords:[46.8020,7.1620], priceFrom:27,
    equip:{ fr:['Wi-Fi fibre','Café illimité','Proche autoroute','Parking'], en:['Fibre Wi-Fi','Unlimited coffee','Near motorway','Parking'] },
    dispo:{ fr:'Lun–Ven · 8h–18h', en:'Mon–Fri · 8am–6pm' },
    desc:{ fr:"Accès autoroute immédiat. Idéal pour les commerciaux en tournée et les étapes de travail rapides.",
           en:"Immediate motorway access. Ideal for sales reps on the road and quick work stops." },
    photo:{ fr:'PHOTO — day-office moderne', en:'PHOTO — modern day-office' } },

  { id:'cafe-centre', kind:'spot', name:'Café du Centre', city:'Genève',
    types:['spot'], coords:[46.2044,6.1480], priceFrom:12,
    equip:{ fr:['Wi-Fi','Prises à chaque table','Café de spécialité','Ambiance vivante'], en:['Wi-Fi','Sockets at every table','Specialty coffee','Lively atmosphere'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Brasserie emblématique de la rive gauche. Travaillez en solo, café à la main, dans une ambiance vivante.",
           en:"AltiusSpot — Iconic left-bank brasserie. Work solo, coffee in hand, in a lively atmosphere." },
    photo:{ fr:'PHOTO — lounge brasserie', en:'PHOTO — brasserie lounge' } },

  { id:'lacustre-lsne', kind:'spot', name:'Le Lacustre', city:'Lausanne',
    types:['spot'], coords:[46.5045,6.6300], priceFrom:12,
    equip:{ fr:['Wi-Fi','Terrasse lac','Café & lunch','Coin calme'], en:['Wi-Fi','Lake terrace','Coffee & lunch','Quiet corner'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Au bord du lac à Ouchy. Un coin lounge réservé au travail, café et restauration légère.",
           en:"AltiusSpot — Lakeside in Ouchy. A lounge corner set aside for work, coffee and light bites." },
    photo:{ fr:'PHOTO — terrasse lounge Ouchy', en:'PHOTO — Ouchy lounge terrace' } },

  { id:'leman-montreux', kind:'spot', name:'Brasserie du Léman', city:'Montreux',
    types:['spot'], coords:[46.4330,6.9110], priceFrom:11,
    equip:{ fr:['Wi-Fi','Vue lac','Café & cocktails','Prises'], en:['Wi-Fi','Lake view','Coffee & cocktails','Sockets'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Sur les quais de Montreux. Lounge convivial pour travailler ou recevoir autour d'un café.",
           en:"AltiusSpot — On the Montreux waterfront. A friendly lounge to work or meet over coffee." },
    photo:{ fr:'PHOTO — lounge quai Montreux', en:'PHOTO — Montreux quay lounge' } },

  { id:'rooftop-annecy', kind:'spot', name:'Le Rooftop', city:'Annecy',
    types:['spot'], coords:[45.8992,6.1294], priceFrom:13,
    equip:{ fr:['Wi-Fi','Rooftop','Café de spécialité','Vue vieille ville'], en:['Wi-Fi','Rooftop','Specialty coffee','Old-town view'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Toit-terrasse sur la vieille ville. Une parenthèse de travail au-dessus des canaux d'Annecy.",
           en:"AltiusSpot — Rooftop over the old town. A work break above the canals of Annecy." },
    photo:{ fr:'PHOTO — rooftop vieille ville', en:'PHOTO — old-town rooftop' } },
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
