document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("cofPartnerMap");
  const listElement = document.getElementById("cofPartnerList");
  const searchInput = document.getElementById("cofPartnerSearch");

  if (!mapElement || !listElement || !searchInput) return;

  const partners = [
    {
      name: "CofCof.co",
      type: "Referencia",
      city: "Uberlandia",
      state: "MG",
      neighborhood: "Cerrado Mineiro",
      address: "Uberlandia, MG",
      lat: -18.9128,
      lng: -48.2755,
      whatsapp: "https://wa.me/5534998728882",
      instagram: "https://instagram.com/cofcof.co"
    },
    {
      name: "Exemplo Emporio Premium",
      type: "Emporio",
      city: "Uberlandia",
      state: "MG",
      neighborhood: "Centro",
      address: "Av. Exemplo, 123 - Uberlandia, MG",
      lat: -18.9186,
      lng: -48.2772,
      whatsapp: "",
      instagram: ""
    },
    {
      name: "Exemplo Cafeteria",
      type: "Cafeteria",
      city: "Uberlandia",
      state: "MG",
      neighborhood: "Santa Monica",
      address: "Rua Exemplo, 456 - Uberlandia, MG",
      lat: -18.9141,
      lng: -48.2589,
      whatsapp: "",
      instagram: ""
    }
  ];

  let map = null;
  let markers = [];

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function createRouteUrl(partner) {
    if (partner.lat && partner.lng) {
      return `https://www.google.com/maps/search/?api=1&query=${partner.lat},${partner.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`;
  }

  function renderPartners(items) {
    listElement.innerHTML = "";

    if (map) {
      markers.forEach((marker) => map.removeLayer(marker));
    }
    markers = [];

    if (!items.length) {
      listElement.innerHTML = '<article class="cof-partner-card"><span class="cof-partner-type">Busca</span><h3>Nenhum parceiro encontrado</h3><p>Tente buscar por cidade, bairro, estado ou nome do parceiro.</p></article>';
      return;
    }

    items.forEach((partner) => {
      const card = document.createElement("article");
      card.className = "cof-partner-card";
      card.tabIndex = 0;

      const routeUrl = createRouteUrl(partner);

      card.innerHTML = `
        <span class="cof-partner-type">${partner.type}</span>
        <h3>${partner.name}</h3>
        <p>${partner.neighborhood} · ${partner.city}, ${partner.state}</p>
        <p>${partner.address}</p>
        <a class="cof-route-button" href="${routeUrl}" target="_blank" rel="noopener">Ver rota</a>
        ${partner.whatsapp ? `<a class="cof-route-button" href="${partner.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
        ${partner.instagram ? `<a class="cof-route-button" href="${partner.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}
      `;

      const focusPartner = () => {
        listElement.querySelectorAll(".cof-partner-card").forEach((item) => item.classList.remove("is-active"));
        card.classList.add("is-active");
        if (map && Number.isFinite(partner.lat) && Number.isFinite(partner.lng)) {
          map.setView([partner.lat, partner.lng], 15);
        }
      };

      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        focusPartner();
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          focusPartner();
        }
      });

      listElement.appendChild(card);

      if (map && Number.isFinite(partner.lat) && Number.isFinite(partner.lng)) {
        const marker = L.marker([partner.lat, partner.lng])
          .addTo(map)
          .bindPopup(`
            <strong>${partner.name}</strong><br>
            ${partner.neighborhood} · ${partner.city}<br>
            <a href="${routeUrl}" target="_blank" rel="noopener">Ver rota</a>
          `);

        marker.on("click", focusPartner);
        markers.push(marker);
      }
    });

    if (map && markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }

  function filterPartners(term) {
    const value = normalize(term).trim();

    return partners.filter((partner) => {
      return [
        partner.name,
        partner.type,
        partner.city,
        partner.state,
        partner.neighborhood,
        partner.address
      ].some((field) => normalize(field).includes(value));
    });
  }

  function initMap() {
    if (window.L) {
      map = L.map(mapElement, { scrollWheelZoom: false }).setView([-18.9186, -48.2772], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
      }).addTo(map);
    } else {
      mapElement.innerHTML = '<div class="cof-map-fallback">Mapa indisponivel no momento. Use os cards e o botao Ver rota.</div>';
    }

    renderPartners(partners);
  }

  searchInput.addEventListener("input", (event) => {
    renderPartners(filterPartners(event.target.value));
  });

  const waitForLeaflet = () => {
    if (window.L) initMap();
    else window.setTimeout(waitForLeaflet, 120);
  };

  waitForLeaflet();
});
