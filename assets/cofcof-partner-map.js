(function() {
  'use strict';

  var root = document.querySelector('[data-cof-partner-root]');
  if (!root) return;

  var partnerData = [];
  try {
    var script = document.getElementById('cpPartnerData');
    if (script) partnerData = JSON.parse(script.textContent);
  } catch(e) { console.warn('Invalid partner data', e); }

  if (!partnerData.length) {
    document.getElementById('cpList').innerHTML = '<div class="cp-empty"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><h3 class="display">Nenhum parceiro cadastrado.</h3><p class="body-p">Adicione parceiros pelo editor do tema.</p></div>';
    return;
  }

  var searchEl = document.getElementById('cpSearch');
  var searchClear = document.getElementById('cpSearchClear');
  var listEl = document.getElementById('cpList');
  var ctaCard = document.getElementById('cpCTACard');
  var filtersEl = document.getElementById('cpFilters');
  var previewEl = document.getElementById('cpPreview');
  var previewClose = document.getElementById('cpPreviewClose');
  var mapEl = document.getElementById('cpMap');

  var activeCat = 'Todos';
  var searchTerm = '';
  var activePartner = null;
  var hasUserClosed = false;
  var map = null;
  var markers = [];
  var LAT_CENTER = -18.9;
  var LNG_CENTER = -48.2;

  function getCategory(partner) {
    var cat = (partner.category || '').toLowerCase();
    if (cat === 'emporio' || cat === 'revenda' || cat === 'delicatessen') return 'Emporios';
    if (cat === 'restaurante') return 'Restaurantes';
    if (cat === 'padaria' || cat === 'confeitaria') return 'Padarias';
    if (cat === 'hotel') return 'Hoteis';
    if (cat === 'posto' || cat === 'rota cofcof') return 'Postos';
    if (cat === 'conveniencia') return 'Conveniencia';
    if (cat === 'cafeteria') return 'Cafeterias';
    return 'Outros';
  }

  function getCategoryLabel(partner) {
    var cat = (partner.category || '').toLowerCase();
    if (cat === 'emporio' || cat === 'delicatessen') return 'Emporio';
    if (cat === 'padaria' || cat === 'confeitaria') return 'Padaria';
    if (cat === 'posto' || cat === 'rota cofcof') return 'Rota CofCof';
    if (cat === 'cafeteria') return 'Cafeteria';
    if (cat === 'restaurante') return 'Restaurante';
    if (cat === 'hotel') return 'Hotel';
    if (cat === 'conveniencia') return 'Conveniencia';
    return partner.category || 'Outros';
  }

  function getCategoryIconSVG(category) {
    var cat = (category || '').toLowerCase();
    if (cat === 'restaurante') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>';
    if (cat === 'emporio' || cat === 'revenda' || cat === 'delicatessen') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
    if (cat === 'padaria' || cat === 'confeitaria') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2A10 10 0 0 0 2 12c0 2.2.8 4.2 2.2 5.8a2 2 0 0 0 2.6.2l3-2.3a2 2 0 0 1 2.4 0l3 2.3a2 2 0 0 0 2.6-.2A10.1 10.1 0 0 0 22 12 10 10 0 0 0 12 2z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>';
    if (cat === 'hotel') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>';
    if (cat === 'posto' || cat === 'rota cofcof') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>';
    if (cat === 'conveniencia') return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>';
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  }

  function getPinIconSVG(category, isFeatured) {
    var w = isFeatured ? '24' : '18';
    var h = isFeatured ? '24' : '18';
    var cat = (category || '').toLowerCase();
    if (cat === 'restaurante') return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>';
    if (cat === 'emporio' || cat === 'revenda' || cat === 'delicatessen') return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
    if (cat === 'padaria' || cat === 'confeitaria') return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2A10 10 0 0 0 2 12c0 2.2.8 4.2 2.2 5.8a2 2 0 0 0 2.6.2l3-2.3a2 2 0 0 1 2.4 0l3 2.3a2 2 0 0 0 2.6-.2A10.1 10.1 0 0 0 22 12 10 10 0 0 0 12 2z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>';
    if (cat === 'hotel') return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>';
    if (cat === 'posto' || cat === 'rota cofcof') return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>';
    if (cat === 'conveniencia') return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  }

  function normalize(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function getFiltered() {
    var term = normalize(searchTerm);
    return partnerData.filter(function(p) {
      if (activeCat !== 'Todos' && getCategory(p) !== activeCat) return false;
      if (!term) return true;
      var n = [p.name, p.type, p.category, p.city, p.state, p.neighborhood, p.address, p.description];
      return n.some(function(f) { return normalize(f).includes(term); });
    });
  }

  function getCategoryCount(catName) {
    if (catName === 'Todos') return partnerData.length;
    return partnerData.filter(function(p) { return getCategory(p) === catName; }).length;
  }

  function renderFilters() {
    var btns = filtersEl.querySelectorAll('button');
    btns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.cat === activeCat);
    });
  }

  function renderList(items) {
    listEl.innerHTML = '';
    if (!items.length) {
      listEl.innerHTML = '<div class="cp-empty"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><h3 class="display">Nenhum parceiro encontrado.</h3><p class="body-p">Tente buscar por cidade, bairro ou nome.</p></div>';
      return;
    }
    items.forEach(function(p) {
      var card = document.createElement('div');
      card.className = 'cp-card' + (activePartner && activePartner.id === p.id ? ' active' : '');
      card.innerHTML = '<div class="cp-card-i"><div class="cp-card-img">' + (p.image ? '<img src="' + p.image + '" alt="' + p.name + '" style="width:100%;height:100%;object-fit:cover;display:block">' : '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.15"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>') + (p.featured ? '<span class="label" style="position:absolute;top:8px;left:8px;background:var(--clay);color:var(--black);font-size:8px;padding:2px 6px">Destaque</span>' : '') + '</div><div class="cp-card-body"><div class="cp-card-cat">' + getCategoryIconSVG(p.category) + '<span class="label">' + getCategoryLabel(p) + '</span></div><h3 class="display">' + p.name + '</h3><p>' + p.neighborhood + ' · ' + p.city + '</p></div></div>';
      card.addEventListener('click', function(e) { if (e.target.closest('a')) return; selectPartner(p); });
      listEl.appendChild(card);
    });
  }

  function selectPartner(p) {
    activePartner = p;
    hasUserClosed = false;
    renderList(getFiltered());
    showPreview(p);
    focusMap(p);
  }

  function focusMap(p) {
    if (!map || !Number.isFinite(p.lat) || !Number.isFinite(p.lng)) return;
    var isDesktop = window.innerWidth >= 768;
    var center = L.latLng(p.lat, p.lng);
    var zoom = 15;
    var targetPoint = map.project(center, zoom);
    if (isDesktop) targetPoint.x -= 240;
    else targetPoint.y -= 150;
    var offsetCenter = map.unproject(targetPoint, zoom);
    map.flyTo(offsetCenter, zoom, { animate: true, duration: 1.2 });

    // update marker styles
    markers.forEach(function(m) {
      var el = m.getElement();
      if (el) {
        var inner = el.querySelector('.custom-pin');
        if (inner) {
          inner.style.transform = (m._partnerId === p.id) ? 'scale(1.1) translateY(-6px)' : 'scale(1)';
          inner.style.width = (m._partnerId === p.id) ? '48px' : (m._partner && m._partner.featured ? '40px' : '36px');
          inner.style.height = (m._partnerId === p.id) ? '48px' : (m._partner && m._partner.featured ? '40px' : '36px');
          inner.style.backgroundColor = (m._partnerId === p.id) ? 'var(--sand)' : (m._partner && m._partner.featured ? 'var(--clay)' : 'var(--black)');
          inner.style.borderColor = (m._partnerId === p.id) ? 'var(--black)' : (m._partner && m._partner.featured ? 'var(--black)' : 'var(--sand)');
          inner.style.color = (m._partnerId === p.id) ? 'var(--black)' : (m._partner && m._partner.featured ? 'var(--black)' : 'var(--sand)');
        }
      }
    });
  }

  function showPreview(p) {
    previewEl.hidden = false;
    document.getElementById('cpPreviewName').textContent = p.name;
    document.getElementById('cpPreviewDesc').textContent = p.description || '';
    document.getElementById('cpPreviewAddrLine').textContent = p.address || '';
    document.getElementById('cpPreviewAddrSub').textContent = (p.neighborhood ? p.neighborhood + ' · ' : '') + p.city + '/' + p.state;
    document.getElementById('cpPreviewHoursText').textContent = p.openingHours || 'Horario nao informado';

    var imgEl = document.getElementById('cpPreviewImg');
    if (p.image) {
      imgEl.innerHTML = '<img src="' + p.image + '" alt="' + p.name + '" style="width:100%;height:100%;object-fit:cover;display:block">';
    } else {
      var cat = (p.category || '').toLowerCase();
      var showBg = '';
      if (cat === 'posto' || cat === 'rota cofcof') showBg = ' style="background:#1a1a2e"';
      else if (cat === 'cafeteria') showBg = ' style="background:#2d1b0e"';
      else if (cat === 'emporio' || cat === 'revenda' || cat === 'delicatessen') showBg = ' style="background:#1e2a1e"';
      else if (cat === 'restaurante') showBg = ' style="background:#2e1a1a"';
      imgEl.innerHTML = '<div class="cp-preview-img-fallback"' + showBg + '>' + getCategoryIconSVG(p.category) + '</div>';
    }
    imgEl.innerHTML += '<button class="cp-preview-close" id="cpPreviewClose" aria-label="Fechar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    document.getElementById('cpPreviewClose').addEventListener('click', closePreview);

    var routeBtn = document.getElementById('cpPreviewRoute');
    routeBtn.href = (Number.isFinite(p.lat) && Number.isFinite(p.lng)) ? 'https://www.google.com/maps/dir/?api=1&destination=' + p.lat + ',' + p.lng : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.address || p.name);

    var profileBtn = document.getElementById('cpPreviewProfile');
    if (p.profileUrl) { profileBtn.href = p.profileUrl; profileBtn.style.display = ''; }
    else { profileBtn.style.display = 'none'; }

    // Badges
    var badgesEl = document.getElementById('cpPreviewBadges');
    var badgeRoute = document.getElementById('cpBadgeRoute');
    var badge24h = document.getElementById('cpBadge24h');
    var showBadge = false;
    if (cat === 'posto' || cat === 'rota cofcof' || p.showRouteBadge) {
      badgeRoute.hidden = false; showBadge = true;
    } else { badgeRoute.hidden = true; }
    if (p.isOpen24h || (p.openingHours && p.openingHours.toLowerCase().includes('24'))) {
      badge24h.hidden = false; showBadge = true;
    } else { badge24h.hidden = true; }
    badgesEl.hidden = !showBadge;

    // Social: Instagram
    var instaEl = document.getElementById('cpSocialInsta');
    if (p.instagram) { instaEl.href = p.instagram; instaEl.hidden = false; }
    else { instaEl.hidden = true; }

    // Social: WhatsApp
    var whatsEl = document.getElementById('cpSocialWhats');
    if (p.whatsapp) { whatsEl.href = p.whatsapp; whatsEl.hidden = false; }
    else { whatsEl.hidden = true; }

    // Social: Share
    var shareEl = document.getElementById('cpSocialShare');
    if (navigator.share) {
      shareEl.hidden = false;
      shareEl.onclick = function(e) {
        e.preventDefault();
        var shareData = { title: p.name, text: p.description || 'Conheca ' + p.name, url: p.profileUrl || window.location.href };
        navigator.share(shareData).catch(function(){});
      };
    } else { shareEl.hidden = true; }
  }

  function closePreview() {
    hasUserClosed = true;
    activePartner = null;
    previewEl.hidden = true;
    renderList(getFiltered());
    if (map) {
      markers.forEach(function(m) {
        var el = m.getElement();
        if (el) {
          var inner = el.querySelector('.custom-pin');
          if (inner) {
            inner.style.transform = 'scale(1)';
            inner.style.width = (m._partner && m._partner.featured ? '40px' : '36px');
            inner.style.height = (m._partner && m._partner.featured ? '40px' : '36px');
            inner.style.backgroundColor = (m._partner && m._partner.featured ? 'var(--clay)' : 'var(--black)');
            inner.style.borderColor = (m._partner && m._partner.featured ? 'var(--black)' : 'var(--sand)');
            inner.style.color = (m._partner && m._partner.featured ? 'var(--black)' : 'var(--sand)');
          }
        }
      });
    }
  }

  function initMap() {
    if (!window.L) { mapEl.innerHTML = '<div style="padding:24px;color:rgba(246,241,235,.68)">Mapa indisponivel no momento.</div>'; return; }

    mapEl.innerHTML = '';
    map = L.map(mapEl, { scrollWheelZoom: true, zoomControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);
    new L.ZoomControl({ position: 'bottomright' }).addTo(map);

    var valid = partnerData.filter(function(p) { return Number.isFinite(p.lat) && Number.isFinite(p.lng); });

    valid.forEach(function(p) {
      var isFeatured = p.featured;
      var icon = L.divIcon({
        className: 'bg-transparent border-0',
        html: '<div class="custom-pin" style="background-color:var(--black);width:36px;height:36px;border-radius:50%;border:3px solid var(--sand);box-shadow:0 8px 16px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;color:var(--sand);transition:all .3s cubic-bezier(.34,1.56,.64,1);cursor:pointer">' + getPinIconSVG(p.category, false) + '</div>',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
      var marker = L.marker([p.lat, p.lng], { icon: icon }).addTo(map);
      marker._partnerId = p.id;
      marker._partner = p;
      marker.on('click', function() { selectPartner(p); });
      markers.push(marker);
    });

    if (valid.length > 0) {
      var group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }

    // auto-select first
    if (valid.length > 0 && window.innerWidth >= 768) {
      selectPartner(valid[0]);
    }
  }

  // Event listeners
  searchEl.addEventListener('input', function() {
    searchTerm = this.value;
    searchClear.style.display = this.value ? '' : 'none';
    renderList(getFiltered());
  });

  searchClear.addEventListener('click', function() {
    searchEl.value = '';
    searchTerm = '';
    searchClear.style.display = 'none';
    renderList(getFiltered());
    searchEl.focus();
  });

  filtersEl.addEventListener('click', function(e) {
    var btn = e.target.closest('button');
    if (!btn || !btn.dataset.cat) return;
    activeCat = btn.dataset.cat;
    renderFilters();
    renderList(getFiltered());
  });

  previewClose.addEventListener('click', closePreview);

  // Update filter counts
  var filterBtns = filtersEl.querySelectorAll('button');
  filterBtns.forEach(function(btn) {
    var count = getCategoryCount(btn.dataset.cat);
    var span = document.createElement('span');
    span.textContent = count;
    btn.appendChild(span);
  });

  // Init
  var waitForLeaflet = function() {
    if (window.L) initMap();
    else window.setTimeout(waitForLeaflet, 120);
  };
  waitForLeaflet();
})();
