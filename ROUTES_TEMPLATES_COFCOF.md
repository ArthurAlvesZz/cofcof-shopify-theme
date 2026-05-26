# Rotas e Templates CofCof

## Tabela oficial de paginas

| Pagina | URL final | Handle Shopify | Template JSON | Section principal | Status | Acao Admin necessaria |
|--------|-----------|----------------|---------------|-------------------|--------|-----------------------|
| Home | `/` | `index` | `index.json` | `cofcof-home` | OK | Nao |
| Assinatura | `/pages/assinatura` | `assinatura` | `page.assinatura.json` | `cofcof-subscription` | OK | Nao |
| Cafes | `/pages/nossos-cafes` | `nossos-cafes` | `page.cafes.json` | `cofcof-catalog` | OK | Criar pagina com handle `nossos-cafes` e template `page.cafes` |
| Origem | `/pages/origem` | `origem` | `page.origem.json` | `cofcof-origem` | OK | Criar pagina com handle `origem` e template `page.origem` |
| Onde Encontrar | `/pages/onde-encontrar` | `onde-encontrar` | `page.onde-encontrar.json` | `cofcof-partner-map` | OK | Criar pagina com handle `onde-encontrar` e template `page.onde-encontrar` |
| Empresas | `/pages/empresas` | `empresas` | `page.empresas.json` | `cofcof-empresas` | OK | Nao (ja existe) |
| Quem Somos | `/pages/quem-somos` | `quem-somos` | `page.quem-somos.json` | `main-page` | Pendente | Usa template padrao `main-page` — verificar se precisa de section custom |
| Contato (pt-BR) | `/pages/contato` | `contato` | `page.contato.json` | `cofcof-contato` | OK | Criar pagina com handle `contato` e template `page.contato` |
| Contato (EN) | `/pages/contact` | `contact` | `page.contact.json` | `cofcof-contato` | Duplicado? | Verificar se `contact` e `contato` coexistem ou um pode ser removido |
| Colecoes | `/collections/all` | — | `collection.json` | Shopify nativo | OK | Nao |
| Carrinho | `/cart` | — | `cart.json` | Shopify nativo | OK | Nao |
| 404 | `/404` | `404` | `404.json` | `cofcof-404` | OK | Nao |

## Regras de rotas

### Navbar
- Deve apontar apenas para rotas oficiais listadas acima.
- URLs no navbar:
  - Home → `/`
  - Nossos Cafes → `/pages/nossos-cafes`
  - Origem → `/pages/origem`
  - Onde Encontrar → `/pages/onde-encontrar`
  - Empresas → `/pages/empresas`
  - Quem Somos → `/pages/quem-somos`
  - Contato → `/pages/contato`
  - Assinar → `/pages/assinatura#planos`

### Templates
- Nenhuma pagina custom CofCof deve cair no template padrao `page.json` (claro da Shopify).
- Header padrao Shopify (`header.liquid`) nao deve aparecer em paginas custom CofCof.
- Uma unica navbar custom deve ser usada em todas as paginas custom.
- Paginas que usam `main-page` como section (ex: Quem Somos) precisam de revisao para usar section custom.

### Paginas com template padrao (pendentes de revisao)
- `/pages/quem-somos` — usa `main-page` em vez de section CofCof dedicada. Verificar se o React original tem pagina Quem Somos. Se nao tiver, manter como esta.

### Paginas duplicadas
- `page.contact.json` e `page.contato.json` — ambos apontam para `cofcof-contato`. Verificar qual e a pagina ativa e se ambas sao necessarias (uma pode ser EN, outra PT-BR).
