# Contexto do Projeto CofCof Shopify

## Projeto
Tema Shopify da CofCof.co.

- Loja: `cof-cof-co.myshopify.com`
- Admin: `https://admin.shopify.com/store/cof-cof-co`
- Repositorio: `https://github.com/ArthurAlvesZz/cofcof-shopify-theme`
- Branch principal: `codex/correcao-cofcof`
- Fonte visual/funcional React: `C:\Users\TAY\AppData\Local\Temp\opencode\wrong-repo\src` (ArthurAlvesZzz/COFCOF.CO-Shopfy)
- Repositorio fonte React: `https://github.com/ArthurAlvesZzz/COFCOF.CO-Shopfy` (3 Z's)

## Temas Shopify
- Tema seguro (publicado como live): `Arthur Desenv.`
- ID: `156243919006`
- Tema proibido: `Craft` (`155205337246`)

## Regras absolutas
- Trabalhar apenas no tema `Arthur Desenv.` ID `156243919006`.
- Nunca usar `--live` (ainda que o tema seguro seja live).
- Nunca publicar automaticamente.
- Nao enviar para o tema `Craft` sob nenhuma hipotese.
- Nao quebrar checkout, carrinho, produtos, colecoes, payment widgets ou apps Shopify.
- Nao apagar `/pages/assinatura`.
- Nao remover videos, cards ou modal existentes sem pedido explicito.
- Nao alterar copy, layout, ordem das secoes ou identidade visual sem pedido explicito.
- Preservar estetica premium escura da CofCof.
- Fazer commits pequenos e descritivos.
- Rodar theme check antes de subir.

## Fonte de verdade
O repositorio React `ArthurAlvesZzz/COFCOF.CO-Shopfy` (3 Z's) e a referencia visual/funcional obrigatoria.
Contem 7 paginas React completas + componentes modulares. O tema Shopify deve ser fiel a este projeto, nao uma versao simplificada.

## Rotas importantes
| Pagina | URL |
|--------|-----|
| Home | `/` |
| Assinatura | `/pages/assinatura` |
| Cafes | `/pages/nossos-cafes` |
| Origem | `/pages/origem` |
| Onde Encontrar | `/pages/onde-encontrar` |
| Empresas | `/pages/empresas` |
| Quem Somos | `/pages/quem-somos` |
| Contato | `/pages/contato` |
| Colecoes | `/collections/all` |
| Carrinho | `/cart` |

## Paginas que dependem do Admin Shopify
Paginas que precisam ser criadas manualmente no Admin Shopify com template especifico:
- `/pages/origem` — handle: `origem` / template: `page.origem`
- `/pages/onde-encontrar` — handle: `onde-encontrar` / template: `page.onde-encontrar`
- `/pages/nossos-cafes` — handle: `nossos-cafes` / template: `page.cafes`
- `/pages/empresas` — handle: `empresas` / template: `page.empresas`
- `/pages/assinatura` — handle: `assinatura` / template: `page.assinatura`
- `/pages/contato` — handle: `contato` / template: `page.contato`
- `/pages/quem-somos` — handle: `quem-somos` / template: `page.quem-somos`

## Navbar
A navbar custom deve ser unica e global.

Arquivo principal:
- `snippets/cofcof-custom-nav.liquid`

Regras:
- Deve aparecer igual em todas as paginas customizadas.
- Fundo escuro obrigatorio.
- Logo COFCOF.CO visivel.
- Home sempre visivel.
- Assinar sempre visivel.
- Assinar aponta para `/pages/assinatura#planos`.
- Nao deixar header claro padrao Shopify aparecer nas paginas customizadas.
- Uma unica fonte/snippet para navbar.

## Videos hospedados
| Uso | URL |
|-----|-----|
| Hero background | `https://files.catbox.moe/v7x5pa.mp4` |
| Card 1 | `https://files.catbox.moe/d321i5.mp4` |
| Card 2 | `https://files.catbox.moe/i0tw82.mp4` |
| Card 3 | `https://files.catbox.moe/g3qrmh.mp4` |

## Imagens hospedadas
| Uso | URL |
|-----|-----|
| Xicara CofCof | `https://files.catbox.moe/b6r7po.png` |
| 4 Embalagens | `https://files.catbox.moe/0hkmbb.png` |
| 4 Cafes em fila | `https://files.catbox.moe/byx9ge.png` |
| 6 Cafes em fila | `https://files.catbox.moe/agtnqp.png` |
| 4 Cafes juntos | `https://files.catbox.moe/7r9wdw.png` |
| Cafes 16-9 | `https://files.catbox.moe/s5onxq.png` |

## Decisoes ja tomadas
- Fonte React principal = `ArthurAlvesZzz/COFCOF.CO-Shopfy` (3 Z's).
- Tema base = customizacao do tema Craft/Dawn, nao tema novo.
- Navbar custom unica = `snippets/cofcof-custom-nav.liquid`.
- Paginas custom usam templates JSON com sections isoladas.
- Mapa de parceiros usa Leaflet + dados JSON inline (futuro: Metaobjects).
- CSS escopado em classes `.cof-partner-full` / `.cof-*`.
- JS vanilla isolado em IIFE para cada componente.

## Fluxo Git
```bash
# Antes de alterar
git status
git branch

# Apos alterar
git add <arquivos>
git commit -m "Mensagem descritiva curta"
git push

# Subir tema Shopify
shopify theme push --store=cof-cof-co.myshopify.com --theme=156243919006
```

## Comandos de validacao
```bash
shopify theme check --fail-level error
shopify theme check
git status
git diff
```

Preview:
`https://cof-cof-co.myshopify.com?preview_theme_id=156243919006`

## Arquivos custom CofCof
### Sections
- `sections/cofcof-home.liquid` — Home page
- `sections/cofcof-catalog.liquid` — Cafes / Nossos Cafes
- `sections/cofcof-origem.liquid` — Origem
- `sections/cofcof-onde-encontrar.liquid` — Onde Encontrar (locator)
- `sections/cofcof-partner-map.liquid` — Mapa de parceiros (Leaflet)
- `sections/cofcof-empresas.liquid` — Empresas / B2B
- `sections/cofcof-subscription.liquid` — Assinatura
- `sections/cofcof-contato.liquid` — Contato
- `sections/cofcof-404.liquid` — Pagina 404 custom

### Snippets
- `snippets/cofcof-custom-nav.liquid` — Navbar global unica
- `snippets/cofcof-empresas-calculator.liquid` — Calculadora B2B
- `snippets/cofcof-footer.liquid` — Footer custom

### Assets
- `assets/cofcof-partner-map.js` — JS do mapa Leaflet
- `assets/cofcof-partner-map.css` — CSS do mapa Leaflet
- `assets/cofcof-hero-background.mp4` — Video hero
- `assets/cofcof-card-video-01.mp4`
- `assets/cofcof-card-video-02.mp4`
- `assets/cofcof-card-video-03.mp4`

## Pendencias conhecidas
- Paginas Shopify Admin para `/pages/origem` e `/pages/onde-encontrar` precisam ser criadas manualmente se retornarem 404.
- `page.contact.json` e `page.contato.json` coexistem — verificar qual e a pagina ativa.
- `sections/cofcof-onde-encontrar.liquid` existe mas `sections/cofcof-partner-map.liquid` e a versao ativa com Leaflet.
- O tema `Arthur Desenv.` esta publicado como live — cuidado com pushes diretos.
- `sections/cofcof-catalog.liquid` (Cafes) precisa ser revisado contra o React original.
- `sections/cofcof-subscription.liquid` (Assinatura) ainda nao foi iniciada.
