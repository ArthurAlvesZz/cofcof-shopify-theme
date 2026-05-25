# CofCof Shopify Theme — Estrutura Completa

```
cofcof-shopify-theme/
│
├── AGENTS.md                          ← Instruções para IA
├── PROJECT_CONTEXT_COFCOF.md          ← Contexto do projeto
│
├── config/
│   ├── settings_data.json             ← Configurações atuais do tema
│   └── settings_schema.json           ← Schema do painel Shopify
│
├── layout/
│   ├── theme.liquid                   ← Layout principal (CSS global + estrutura)
│   └── password.liquid
│
├── assets/                            ← CSS, JS, imagens, vídeos, SVGs
│   │
│   │  ── CUSTOM COFCOF ──
│   ├── cofcof-partner-map.css
│   ├── cofcof-partner-map.js
│   ├── cofcof-hero-background.mp4
│   ├── cofcof-card-video-01.mp4
│   ├── cofcof-card-video-02.mp4
│   ├── cofcof-card-video-03.mp4
│   ├── cofcof-video-card-01.jpg
│   ├── cofcof-video-card-02.jpg
│   ├── cofcof-video-card-03.jpg
│   ├── video-1.mp4
│   ├── video-2.mp4
│   └── video-3.mp4
│   │
│   │  ── SHOPIFY CRAFT (DAWN) ──
│   ├── base.css                       ← Estilos base do tema
│   ├── global.js
│   ├── constants.js
│   ├── animations.js
│   ├── ... (demais component-*.css, section-*.css, icon-*.svg)
│
├── sections/                          ← Seções Liquid + JSON
│   │
│   │  ── CUSTOM COFCOF ──
│   ├── cofcof-home.liquid             ← Home page
│   ├── cofcof-origem.liquid           ← /pages/origem
│   ├── cofcof-onde-encontrar.liquid   ← /pages/onde-encontrar (locator)
│   ├── cofcof-empresas.liquid         ← /pages/empresas
│   ├── cofcof-404.liquid              ← Página 404 custom
│   ├── cofcof-partner-map.liquid      ← Mapa de parceiros
│   │
│   │  ── GRUPOS ──
│   ├── header-group.json              ← Agrupa seções do header
│   └── footer-group.json              ← Agrupa seções do footer
│   │
│   │  ── SHOPIFY CRAFT ──
│   ├── header.liquid                  ← Header padrão Shopify
│   ├── footer.liquid
│   ├── main-page.liquid               ← Template de página (contém lógica COFCOF)
│   ├── main-product.liquid
│   ├── main-article.liquid
│   ├── main-collection-product-grid.liquid
│   ├── main-search.liquid
│   ├── main-blog.liquid
│   ├── main-cart-items.liquid
│   ├── main-cart-footer.liquid
│   ├── main-404.liquid
│   ├── main-list-collections.liquid
│   ├── main-account.liquid
│   ├── main-login.liquid
│   ├── main-register.liquid
│   ├── main-order.liquid
│   ├── main-addresses.liquid
│   ├── main-activate-account.liquid
│   ├── main-reset-password.liquid
│   ├── main-password-header.liquid
│   ├── main-password-footer.liquid
│   ├── announcement-bar.liquid
│   ├── image-banner.liquid
│   ├── image-with-text.liquid
│   ├── slideshow.liquid
│   ├── collage.liquid
│   ├── collapsible-content.liquid
│   ├── collection-list.liquid
│   ├── contact-form.liquid
│   ├── custom-liquid.liquid
│   ├── email-signup-banner.liquid
│   ├── featured-blog.liquid
│   ├── featured-collection.liquid
│   ├── featured-product.liquid
│   ├── multicolumn.liquid
│   ├── multirow.liquid
│   ├── newsletter.liquid
│   ├── pickup-availability.liquid
│   ├── predictive-search.liquid
│   ├── quick-order-list.liquid
│   ├── related-products.liquid
│   ├── rich-text.liquid
│   ├── video.liquid
│   ├── bulk-quick-order-list.liquid
│   ├── apps.liquid
│   ├── cart-drawer.liquid
│   ├── cart-icon-bubble.liquid
│   ├── cart-live-region-text.liquid
│   ├── cart-notification-button.liquid
│   ├── cart-notification-product.liquid
│   ├── page.liquid
│
├── snippets/                          ← Snippets reutilizáveis
│   │
│   │  ── CUSTOM COFCOF ──
│   ├── cofcof-custom-nav.liquid       ← Navbar global única
│   └── cofcof-empresas-calculator.liquid
│   │
│   │  ── SHOPIFY CRAFT ──
│   ├── header-drawer.liquid
│   ├── header-dropdown-menu.liquid
│   ├── header-mega-menu.liquid
│   ├── header-search.liquid
│   ├── cart-drawer.liquid
│   ├── cart-notification.liquid
│   ├── card-product.liquid
│   ├── card-collection.liquid
│   ├── article-card.liquid
│   ├── facets.liquid
│   ├── price.liquid
│   ├── buy-buttons.liquid
│   ├── product-media.liquid
│   ├── product-media-gallery.liquid
│   ├── product-media-modal.liquid
│   ├── product-thumbnail.liquid
│   ├── product-variant-options.liquid
│   ├── product-variant-picker.liquid
│   ├── quantity-input.liquid
│   ├── share-button.liquid
│   ├── loading-spinner.liquid
│   ├── pagination.liquid
│   ├── meta-tags.liquid
│   ├── social-icons.liquid
│   ├── country-localization.liquid
│   ├── language-localization.liquid
│   ├── swatch.liquid
│   ├── swatch-input.liquid
│   ├── unit-price.liquid
│   ├── gift-card-recipient-form.liquid
│   ├── icon-accordion.liquid
│   ├── icon-with-text.liquid
│   ├── progress-bar.liquid
│   ├── quick-order-list.liquid
│   ├── quick-order-list-row.liquid
│   ├── quick-order-product-row.liquid
│
├── templates/                         ← Templates de página
│   ├── index.json                     ← Home (usa cofcof-home)
│   ├── page.json                      ← Página padrão
│   ├── page.origem.json               ← /pages/origem (usa cofcof-origem)
│   ├── page.onde-encontrar.json       ← /pages/onde-encontrar (usa cofcof-partner-map)
│   ├── page.empresas.json             ← /pages/empresas (usa cofcof-empresas)
│   ├── page.contact.json              ← /pages/contato (usa main-page + contact-form)
│   ├── 404.json                       ← (usa cofcof-404)
│   ├── product.json
│   ├── collection.json
│   ├── blog.json
│   ├── article.json
│   ├── cart.json
│   ├── search.json
│   ├── list-collections.json
│   ├── password.json
│   ├── gift_card.liquid
│   └── customers/
│       ├── account.json
│       ├── login.json
│       ├── register.json
│       ├── addresses.json
│       ├── order.json
│       ├── activate_account.json
│       └── reset_password.json
│
└── locales/                           ← Traduções (pt-BR, en, es, fr, etc.)
```

## Arquivos mais relevantes para edição

| Arquivo | Função |
|---------|--------|
| `layout/theme.liquid` | Layout principal, CSS global CofCof, controle header/footer |
| `sections/main-page.liquid` | Lógica das páginas custom (assinatura, contato, etc.) |
| `snippets/cofcof-custom-nav.liquid` | Navbar única global |
| `sections/cofcof-home.liquid` | Home page |
| `sections/cofcof-origem.liquid` | Página Origem |
| `sections/cofcof-onde-encontrar.liquid` | Locator / Onde Encontrar |
| `sections/cofcof-empresas.liquid` | Página Empresas |
| `sections/cofcof-404.liquid` | Página 404 |
| `sections/cofcof-partner-map.liquid` | Mapa de parceiros |
| `assets/cofcof-partner-map.js` | JS do mapa |
| `assets/cofcof-partner-map.css` | CSS do mapa |
| `templates/page.origem.json` | Template Origem |
| `templates/page.onde-encontrar.json` | Template Onde Encontrar |
| `templates/page.empresas.json` | Template Empresas |
| `templates/page.contact.json` | Template Contato |
| `templates/index.json` | Template Home |
| `config/settings_data.json` | Config do tema no Admin |
| `config/settings_schema.json` | Schema do painel Shopify |
