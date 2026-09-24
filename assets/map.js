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

  // --- Partenaire confirme : Pathe Balexert (Geneve) ---
  { id:'pathe-balexert', kind:'spot', name:'Pathé Balexert', city:'Vernier (Genève)', types:['spot','meeting'], coords:[46.2205,6.1179], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Parking centre commercial'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Mall parking'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé Balexert : lounge pour travailler en journée et salles / auditoriums privatisables pour vos réunions et événements.",
           en:"AltiusSpot & meeting rooms, partner. Pathé Balexert cinema: a lounge to work during the day and private rooms / auditoriums for meetings and events." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Balexert', en:'PHOTO — Pathé Balexert cinema lounge' } },

  { id:'pathe-flon', kind:'spot', name:'Pathé Flon', city:'Lausanne', types:['spot','meeting'], coords:[46.5205,6.6295], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Quartier du Flon'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Flon district'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé Flon, au cœur de Lausanne : lounge pour travailler en journée et salles / auditoriums privatisables pour vos réunions et événements.",
           en:"AltiusSpot & meeting rooms, partner. Pathé Flon cinema in the heart of Lausanne: a lounge to work during the day and private rooms / auditoriums for meetings and events." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Flon', en:'PHOTO — Pathé Flon cinema lounge' } },

  { id:'pathe-westside', kind:'spot', name:'Pathé Westside', city:'Berne', types:['spot','meeting'], coords:[46.9535,7.3765], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Parking Westside'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Westside parking'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé Westside à Berne : lounge pour travailler en journée et salles / auditoriums privatisables pour vos réunions et événements.",
           en:"AltiusSpot & meeting rooms, partner. Pathé Westside cinema in Bern: a lounge to work during the day and private rooms / auditoriums for meetings and events." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Westside', en:'PHOTO — Pathé Westside cinema lounge' } },

  { id:'pathe-galeries', kind:'spot', name:'Pathé Les Galeries', city:'Lausanne', types:['spot','meeting'], coords:[46.5175,6.6335], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Centre de Lausanne'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Lausanne centre'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé Les Galeries (Rue du Petit-Chêne 27), au centre de Lausanne : lounge et salles / auditoriums privatisables.",
           en:"AltiusSpot & meeting rooms, partner. Pathé Les Galeries cinema (Rue du Petit-Chêne 27) in central Lausanne: a lounge and private rooms / auditoriums." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Les Galeries', en:'PHOTO — Pathé Les Galeries cinema lounge' } },

  { id:'pathe-ebikon', kind:'spot', name:'Pathé Mall of Switzerland', city:'Ebikon (Lucerne)', types:['spot','meeting'], coords:[47.0803,8.3387], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Mall of Switzerland'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Mall of Switzerland'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé au Mall of Switzerland (Ebisquare-Strasse 1, Ebikon) : lounge et salles / auditoriums privatisables.",
           en:"AltiusSpot & meeting rooms, partner. Pathé cinema at Mall of Switzerland (Ebisquare-Strasse 1, Ebikon): a lounge and private rooms / auditoriums." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Ebikon', en:'PHOTO — Pathé Ebikon cinema lounge' } },

  { id:'pathe-dietlikon', kind:'spot', name:'Pathé Dietlikon', city:'Dietlikon (Zurich)', types:['spot','meeting'], coords:[47.4230,8.6150], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Parking'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Parking'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé Dietlikon (Moorstrasse 2), près de Zurich : lounge et salles / auditoriums privatisables.",
           en:"AltiusSpot & meeting rooms, partner. Pathé Dietlikon cinema (Moorstrasse 2), near Zurich: a lounge and private rooms / auditoriums." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Dietlikon', en:'PHOTO — Pathé Dietlikon cinema lounge' } },

  { id:'pathe-spreitenbach', kind:'spot', name:'Pathé Spreitenbach', city:'Spreitenbach (Argovie)', types:['spot','meeting'], coords:[47.4185,8.3700], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Salles & auditoriums','Shoppi Tivoli'], en:['Wi-Fi','Bar / lounge','Rooms & auditoriums','Shoppi Tivoli'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot & salles de réunion, partenaire. Cinéma Pathé Spreitenbach (Sandäckerstrasse 4), près de Zurich : lounge et salles / auditoriums privatisables.",
           en:"AltiusSpot & meeting rooms, partner. Pathé Spreitenbach cinema (Sandäckerstrasse 4), near Zurich: a lounge and private rooms / auditoriums." },
    photo:{ fr:'PHOTO — lounge cinéma Pathé Spreitenbach', en:'PHOTO — Pathé Spreitenbach cinema lounge' } },

  // --- Partenaire confirme France : Espace 55 (Poisy, Annecy) ---
  { id:'espace55-poisy', kind:'spot', name:'Espace 55', city:'Poisy (Annecy)', types:['spot','daily'], coords:[45.9210,6.0790], priceFrom:38,
    equip:{ fr:['Wi-Fi','Espace de travail','Day-office & salles','Parking Parc du Calvi'], en:['Wi-Fi','Workspace','Day-office & rooms','Parc du Calvi parking'] },
    dispo:{ fr:'Lun–Ven · 9h–18h', en:'Mon–Fri · 9am–6pm' },
    desc:{ fr:"AltiusSpot & AltiusHub, partenaire. Espace 55 au Parc du Calvi (Poisy, près d'Annecy) : lieu de travail de proximité et espaces privatisables à la journée.",
           en:"AltiusSpot & AltiusHub, partner. Espace 55 at Parc du Calvi (Poisy, near Annecy): a local workspace and day-privatisable spaces." },
    photo:{ fr:'PHOTO — Espace 55 Poisy', en:'PHOTO — Espace 55 Poisy' } },

  { id:'amnesie-annecy', kind:'spot', name:"L'Amnésie", city:'Annecy', types:['spot'], coords:[45.9130,6.1450], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Coin travail','Heures creuses'], en:['Wi-Fi','Bar / lounge','Work corner','Off-peak'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot, partenaire. L'Amnésie a Annecy (37 Av. des Barattes) : bar-lounge pour travailler en journee sur les heures creuses.",
           en:"AltiusSpot, partner. L'Amnésie in Annecy (37 Av. des Barattes): a bar-lounge to work during off-peak daytime hours." },
    photo:{ fr:'PHOTO — bar-lounge L Amnesie Annecy', en:'PHOTO — L Amnesie bar-lounge Annecy' } },

  { id:'amnesie-pringy', kind:'spot', name:"L'Amnésie Pringy", city:'Pringy (Annecy)', types:['spot'], coords:[45.9490,6.1180], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Coin travail','Heures creuses'], en:['Wi-Fi','Bar / lounge','Work corner','Off-peak'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot, partenaire. L'Amnésie a Pringy (579 Rte des Vernes, Annecy) : bar-lounge pour travailler en journee sur les heures creuses.",
           en:"AltiusSpot, partner. L'Amnésie in Pringy (579 Rte des Vernes, Annecy): a bar-lounge to work during off-peak daytime hours." },
    photo:{ fr:'PHOTO — bar-lounge L Amnesie Pringy', en:'PHOTO — L Amnesie bar-lounge Pringy' } },

  { id:'le-clocher-annecy', kind:'spot', name:'Le Clocher', city:'Annecy-le-Vieux', types:['spot'], coords:[45.9200,6.1350], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Coin travail','Heures creuses'], en:['Wi-Fi','Bar / lounge','Work corner','Off-peak'] },
    dispo:{ fr:'Lun–Ven · 9h–17h', en:'Mon–Fri · 9am–5pm' },
    desc:{ fr:"AltiusSpot, partenaire. Le Clocher a Annecy-le-Vieux (20 Pl. Gabriel Faure) : bar-lounge pour travailler en journee sur les heures creuses.",
           en:"AltiusSpot, partner. Le Clocher in Annecy-le-Vieux (20 Pl. Gabriel Faure): a bar-lounge to work during off-peak daytime hours." },
    photo:{ fr:'PHOTO — bar-lounge Le Clocher Annecy', en:'PHOTO — Le Clocher bar-lounge Annecy' } },

  { id:'mylittlecup-geneve', kind:'spot', name:'My Little Cup', city:'Genève', types:['spot'], coords:[46.2155,6.1490], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café de spécialité','Prises','Coin travail'], en:['Wi-Fi','Specialty coffee','Sockets','Work corner'] },
    dispo:{ fr:'Lun–Ven · 8h–17h', en:'Mon–Fri · 8am–5pm' },
    desc:{ fr:"AltiusSpot, partenaire. My Little Cup a Geneve (Av. Blanc 51) : coffee shop pour travailler en journee, ideal pour les emails et les appels.",
           en:"AltiusSpot, partner. My Little Cup in Geneva (Av. Blanc 51): a coffee shop to work during the day, ideal for emails and calls." },
    photo:{ fr:'PHOTO — coffee shop My Little Cup Geneve', en:'PHOTO — My Little Cup coffee shop Geneva' } },

  { id:'boreal-geneve', kind:'spot', name:'Boréal Coffee Shop', city:'Genève', types:['spot'], coords:[46.2035,6.1400], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café de spécialité','Prises','Coin travail'], en:['Wi-Fi','Specialty coffee','Sockets','Work corner'] },
    dispo:{ fr:'Lun–Ven · 8h–17h', en:'Mon–Fri · 8am–5pm' },
    desc:{ fr:"AltiusSpot, partenaire. Boréal Coffee Shop a Geneve (Rue du Stand 60) : coffee shop pour travailler en journee, ideal pour les emails et les appels.",
           en:"AltiusSpot, partner. Boréal Coffee Shop in Geneva (Rue du Stand 60): a coffee shop to work during the day, ideal for emails and calls." },
    photo:{ fr:'PHOTO — Boreal Coffee Shop Geneve', en:'PHOTO — Boreal Coffee Shop Geneva' } },

  { id:'le-pele-laclusaz', kind:'spot', name:'Le Pêle Coworking', city:'La Clusaz', types:['spot'], coords:[45.9045,6.4250], priceFrom:13,
    equip:{ fr:['Wi-Fi','Espace coworking','Coin travail','Cadre montagne'], en:['Wi-Fi','Coworking space','Work corner','Mountain setting'] },
    dispo:{ fr:'Lun–Ven · 9h–18h', en:'Mon–Fri · 9am–6pm' },
    desc:{ fr:"AltiusSpot, partenaire. Le Pêle Coworking a La Clusaz (97 Rte de l'Étale, Aravis) : espace de coworking du reseau, ouvert aux membres AltiusWork.",
           en:"AltiusSpot, partner. Le Pêle Coworking in La Clusaz (97 Rte de l'Étale, Aravis): a network coworking space, open to AltiusWork members." },
    photo:{ fr:'PHOTO — Le Pele Coworking La Clusaz', en:'PHOTO — Le Pele Coworking La Clusaz' } },

  { id:'biche-contamines', kind:'spot', name:'Biche', city:'Les Contamines-Montjoie', types:['spot'], coords:[45.8215,6.7290], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bar / lounge','Coin travail','Cadre montagne'], en:['Wi-Fi','Bar / lounge','Work corner','Mountain setting'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot, partenaire. Biche aux Contamines-Montjoie (94 Chem. du Praz) : adresse de montagne pour travailler en journee sur les heures creuses.",
           en:"AltiusSpot, partner. Biche in Les Contamines-Montjoie (94 Chem. du Praz): a mountain venue to work during off-peak daytime hours." },
    photo:{ fr:'PHOTO — Biche Les Contamines', en:'PHOTO — Biche Les Contamines' } },

  // --- Groupe Restoleil : restaurants & bars (partenaire) - montagne (Tarentaise / 3 Vallées) ---
  { id:'rl-grange-vt', kind:'spot', name:'La Grange', city:'Val Thorens', types:['spot'], coords:[45.2985,6.5790], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Coin travail','Heures creuses'], en:['Wi-Fi','Coffee','Work corner','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Restaurant à Val Thorens, coin travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. Restaurant in Val Thorens, a work corner during off-peak hours." },
    photo:{ fr:'PHOTO — restaurant Val Thorens', en:'PHOTO — Val Thorens restaurant' } },

  { id:'rl-ptiteferme-vt', kind:'spot', name:'La P\'tite Ferme', city:'Val Thorens', types:['spot'], coords:[45.2970,6.5815], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Coin travail','Ambiance chalet'], en:['Wi-Fi','Coffee','Work corner','Chalet vibe'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Table de montagne à Val Thorens, pour bosser entre deux points.",
           en:"AltiusSpot — Restoleil group, partner. A mountain table in Val Thorens, to work between stops." },
    photo:{ fr:'PHOTO — table de montagne', en:'PHOTO — mountain table' } },

  { id:'rl-augustine-vt', kind:'spot', name:'Chez Augustine', city:'Val Thorens', types:['spot'], coords:[45.2995,6.5808], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Terrasse','Heures creuses'], en:['Wi-Fi','Coffee','Terrace','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Adresse conviviale à Val Thorens, coin travail en journée.",
           en:"AltiusSpot — Restoleil group, partner. A friendly spot in Val Thorens, a work corner during the day." },
    photo:{ fr:'PHOTO — restaurant convivial', en:'PHOTO — friendly restaurant' } },

  { id:'rl-jasper-vt', kind:'spot', name:'Jasper', city:'Val Thorens', types:['spot'], coords:[45.2962,6.5788], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Coin travail','Design'], en:['Wi-Fi','Coffee','Work corner','Design'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Lieu design à Val Thorens pour travailler au calme en journée.",
           en:"AltiusSpot — Restoleil group, partner. A design venue in Val Thorens to work quietly during the day." },
    photo:{ fr:'PHOTO — lieu design station', en:'PHOTO — design resort venue' } },

  { id:'rl-chaudron-vt', kind:'spot', name:'Le Chaudron Magique', city:'Val Thorens', types:['spot'], coords:[45.2978,6.5825], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Coin travail','Heures creuses'], en:['Wi-Fi','Coffee','Work corner','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Table de Val Thorens ouverte au travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. A Val Thorens table open to work during off-peak hours." },
    photo:{ fr:'PHOTO — restaurant station', en:'PHOTO — resort restaurant' } },

  { id:'rl-columbus-vt', kind:'spot', name:'Columbus Café & Co', city:'Val Thorens', types:['spot'], coords:[45.3000,6.5795], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café de spécialité','Prises','Ambiance café'], en:['Wi-Fi','Specialty coffee','Sockets','Coffee-shop vibe'] },
    dispo:{ fr:'Saison · 8h–17h', en:'Season · 8am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Coffee shop à Val Thorens, idéal pour les emails et les appels.",
           en:"AltiusSpot — Restoleil group, partner. A coffee shop in Val Thorens, ideal for emails and calls." },
    photo:{ fr:'PHOTO — coffee shop station', en:'PHOTO — resort coffee shop' } },

  { id:'rl-balcons-bp', kind:'spot', name:'L\'Auberge des Balcons', city:'Belle Plagne', types:['spot'], coords:[45.5078,6.7272], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Terrasse','Coin travail'], en:['Wi-Fi','Coffee','Terrace','Work corner'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Auberge à Belle Plagne, coin travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. An inn in Belle Plagne, a work corner during off-peak hours." },
    photo:{ fr:'PHOTO — auberge de montagne', en:'PHOTO — mountain inn' } },

  { id:'rl-chalet-bp', kind:'spot', name:'Le Chalet', city:'Belle Plagne', types:['spot'], coords:[45.5062,6.7290], priceFrom:13,
    equip:{ fr:['Wi-Fi','Brasserie','Café','Heures creuses'], en:['Wi-Fi','Brasserie','Coffee','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Brasserie de Belle Plagne, pour travailler café à la main.",
           en:"AltiusSpot — Restoleil group, partner. A Belle Plagne brasserie, to work coffee in hand." },
    photo:{ fr:'PHOTO — brasserie de station', en:'PHOTO — resort brasserie' } },

  { id:'rl-k2-bp', kind:'spot', name:'Le K2', city:'Belle Plagne', types:['spot'], coords:[45.5085,6.7295], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Coin travail','Terrasse'], en:['Wi-Fi','Coffee','Work corner','Terrace'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Adresse de Belle Plagne ouverte au travail en journée.",
           en:"AltiusSpot — Restoleil group, partner. A Belle Plagne venue open to work during the day." },
    photo:{ fr:'PHOTO — restaurant station', en:'PHOTO — resort restaurant' } },

  { id:'rl-alberto-tignes', kind:'spot', name:'Alberto', city:'Tignes', types:['spot'], coords:[45.4685,6.9060], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Coin travail','Heures creuses'], en:['Wi-Fi','Coffee','Work corner','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Table de Tignes, coin travail pour les pros en tournée.",
           en:"AltiusSpot — Restoleil group, partner. A Tignes table, a work corner for pros on the road." },
    photo:{ fr:'PHOTO — restaurant Tignes', en:'PHOTO — Tignes restaurant' } },

  { id:'rl-bergerie-stefoy', kind:'spot', name:'La Bergerie', city:'Sainte-Foy-Tarentaise', types:['spot'], coords:[45.5880,6.8950], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Cadre montagne','Heures creuses'], en:['Wi-Fi','Coffee','Mountain setting','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Adresse de Sainte-Foy-Tarentaise, au calme pour travailler.",
           en:"AltiusSpot — Restoleil group, partner. A Sainte-Foy-Tarentaise venue, quiet for working." },
    photo:{ fr:'PHOTO — bergerie de montagne', en:'PHOTO — mountain bergerie' } },

  { id:'rl-vogagoga-arc1800', kind:'spot', name:'Vôga Goga', city:'Arc 1800', types:['spot'], coords:[45.5710,6.8285], priceFrom:12,
    equip:{ fr:['Wi-Fi','Bar','Prises','Ambiance lounge'], en:['Wi-Fi','Bar','Sockets','Lounge vibe'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Bar-lounge d'Arc 1800, pour un point de travail rapide en journée.",
           en:"AltiusSpot — Restoleil group, partner. An Arc 1800 bar-lounge, for a quick work stop during the day." },
    photo:{ fr:'PHOTO — bar lounge station', en:'PHOTO — resort bar-lounge' } },

  // --- Groupe Restoleil : côte méditerranéenne (partenaire) ---
  { id:'rl-boucanet-graudroi', kind:'spot', name:'Le Boucanet', city:'Le Grau-du-Roi', types:['spot'], coords:[43.5480,4.1280], priceFrom:13,
    equip:{ fr:['Wi-Fi','Bord de mer','Terrasse','Café'], en:['Wi-Fi','Seaside','Terrace','Coffee'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Restaurant de bord de mer au Grau-du-Roi, coin travail hors service.",
           en:"AltiusSpot — Restoleil group, partner. A seaside restaurant in Le Grau-du-Roi, a work corner off-service." },
    photo:{ fr:'PHOTO — restaurant bord de mer', en:'PHOTO — seaside restaurant' } },

  { id:'rl-naiades-portgrimaud', kind:'spot', name:'Les Naïades', city:'Port Grimaud', types:['spot'], coords:[43.2735,6.5795], priceFrom:14,
    equip:{ fr:['Wi-Fi','Terrasse','Vue port','Café'], en:['Wi-Fi','Terrace','Harbour view','Coffee'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Adresse de Port Grimaud, terrasse au calme pour travailler.",
           en:"AltiusSpot — Restoleil group, partner. A Port Grimaud venue, a quiet terrace to work." },
    photo:{ fr:'PHOTO — terrasse port', en:'PHOTO — harbour terrace' } },

  { id:'rl-pacha-lamole', kind:'spot', name:'Pacha Café', city:'La Mole', types:['spot'], coords:[43.2055,6.4740], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café','Prises','Terrasse'], en:['Wi-Fi','Coffee','Sockets','Terrace'] },
    dispo:{ fr:'Saison · 8h–17h', en:'Season · 8am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Café de La Mole (golfe de Saint-Tropez), idéal emails et appels.",
           en:"AltiusSpot — Restoleil group, partner. A café in La Mole (Gulf of Saint-Tropez), ideal for emails and calls." },
    photo:{ fr:'PHOTO — café terrasse', en:'PHOTO — café terrace' } },

  { id:'rl-aquablue-lamole', kind:'spot', name:'AquaBlue', city:'La Mole', types:['spot'], coords:[43.2045,6.4760], priceFrom:13,
    equip:{ fr:['Wi-Fi','Terrasse','Café','Heures creuses'], en:['Wi-Fi','Terrace','Coffee','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Restaurant de La Mole, coin travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. A La Mole restaurant, a work corner during off-peak hours." },
    photo:{ fr:'PHOTO — restaurant terrasse', en:'PHOTO — terrace restaurant' } },

  // --- Groupe Restoleil : Provence intérieure / vallée du Rhône (partenaire) ---
  { id:'rl-sagittaire-vinsobres', kind:'spot', name:'Le Sagittaire', city:'Vinsobres', types:['spot'], coords:[44.3370,5.0570], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Terrasse','Cadre provençal'], en:['Wi-Fi','Coffee','Terrace','Provençal setting'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Adresse de Vinsobres (Drôme provençale), au calme pour travailler.",
           en:"AltiusSpot — Restoleil group, partner. A Vinsobres venue (Drôme provençale), quiet for working." },
    photo:{ fr:'PHOTO — terrasse provençale', en:'PHOTO — Provençal terrace' } },

  { id:'rl-carpediem-vaison', kind:'spot', name:'Le Carpe Diem', city:'Vaison-la-Romaine', types:['spot'], coords:[44.2410,5.0740], priceFrom:13,
    equip:{ fr:['Wi-Fi','Café','Terrasse','Centre historique'], en:['Wi-Fi','Coffee','Terrace','Historic centre'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Table de Vaison-la-Romaine, coin travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. A Vaison-la-Romaine table, a work corner during off-peak hours." },
    photo:{ fr:'PHOTO — restaurant Vaison', en:'PHOTO — Vaison restaurant' } },

  { id:'rl-cabane-larnas', kind:'spot', name:'La Cabane', city:'Larnas', types:['spot'], coords:[44.4000,4.5800], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café','Nature','Terrasse'], en:['Wi-Fi','Coffee','Nature','Terrace'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Adresse nature à Larnas (Ardèche), pour travailler au vert.",
           en:"AltiusSpot — Restoleil group, partner. A nature venue in Larnas (Ardèche), to work in the green." },
    photo:{ fr:'PHOTO — terrasse nature', en:'PHOTO — nature terrace' } },

  { id:'rl-cascade-larnas', kind:'spot', name:'La Cascade', city:'Larnas', types:['spot'], coords:[44.4015,4.5815], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café','Terrasse','Heures creuses'], en:['Wi-Fi','Coffee','Terrace','Off-peak'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Table de Larnas (Ardèche), coin travail sur les heures creuses.",
           en:"AltiusSpot — Restoleil group, partner. A Larnas table (Ardèche), a work corner during off-peak hours." },
    photo:{ fr:'PHOTO — restaurant Ardèche', en:'PHOTO — Ardèche restaurant' } },

  { id:'rl-escale-larnas', kind:'spot', name:'L\'Escale', city:'Larnas', types:['spot'], coords:[44.3985,4.5785], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café','Terrasse','Cadre calme'], en:['Wi-Fi','Coffee','Terrace','Quiet setting'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Étape à Larnas (Ardèche), pour un point de travail au calme.",
           en:"AltiusSpot — Restoleil group, partner. A stop in Larnas (Ardèche), for a quiet work break." },
    photo:{ fr:'PHOTO — étape Ardèche', en:'PHOTO — Ardèche stop' } },

  { id:'rl-boissy-rouret', kind:'spot', name:'Le Boissy', city:'Le Rouret', types:['spot'], coords:[44.3560,4.3170], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café','Domaine','Terrasse'], en:['Wi-Fi','Coffee','Estate','Terrace'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Restaurant du Domaine le Rouret (Ardèche), coin travail en journée.",
           en:"AltiusSpot — Restoleil group, partner. A restaurant at Domaine le Rouret (Ardèche), a work corner during the day." },
    photo:{ fr:'PHOTO — restaurant domaine', en:'PHOTO — estate restaurant' } },

  { id:'rl-castagnou-rouret', kind:'spot', name:'Le Castagnou', city:'Le Rouret', types:['spot'], coords:[44.3550,4.3185], priceFrom:12,
    equip:{ fr:['Wi-Fi','Café','Domaine','Nature'], en:['Wi-Fi','Coffee','Estate','Nature'] },
    dispo:{ fr:'Saison · 9h–17h', en:'Season · 9am–5pm' },
    desc:{ fr:"AltiusSpot — Groupe Restoleil, partenaire. Table du Domaine le Rouret (Ardèche), pour travailler au vert.",
           en:"AltiusSpot — Restoleil group, partner. A table at Domaine le Rouret (Ardèche), to work in the green." },
    photo:{ fr:'PHOTO — table domaine nature', en:'PHOTO — estate nature table' } },
];

const AW_TYPE_LABEL = { spot:'Spot', daily:'Daily Office', office:'Office', meeting:'Meeting Room' };

(function () {
  if (typeof L === 'undefined') return;

  const state = { type:'all', city:'all', activeId:null };

  const map = L.map('map', { scrollWheelZoom:false, zoomControl:true })
    .setView([44.6, 5.5], 7);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution:'Tiles © Esri', maxZoom:16
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

  // cadrage automatique sur l'ensemble des lieux (Alpes -> Méditerranée)
  try { map.fitBounds(L.latLngBounds(AW_PLACES.map(function (p) { return p.coords; })), { padding:[30,30], maxZoom:9 }); } catch (e) {}

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
