---
name: cofcof-navbar-guardian
description: Use sempre que a tarefa tocar navbar, header, sidebar, menu mobile, logo ou CTA principal.
---

# CofCof Navbar Guardian

## Responsabilidades
- Proteger a navbar custom CofCof contra alteracoes nao solicitadas.
- Garantir consistencia visual e funcional em todas as paginas.

## Regras fixas da navbar

### Fonte unica
- A navbar custom deve vir de UM unico snippet: `snippets/cofcof-custom-nav.liquid`
- Nao criar navbar duplicada em sections ou templates individuais.
- Nao corrigir problemas de layout com `margin-left` isolado.

### Header padrao Shopify
- O header padrao Shopify (`sections/header.liquid`) nao deve aparecer em paginas custom CofCof.
- Se aparecer, remover ou ocultar via `layout/theme.liquid` com condicional de template.

### Estilo obrigatorio
- Fundo escuro (`var(--black)` ou `#0A0A0A`).
- Logo COFCOF.CO visivel e clicavel → `/`
- Links oficiais (ver `ROUTES_TEMPLATES_COFCOF.md`).
- CTA "Assinar" visivel → `/pages/assinatura#planos`

### Mobile
- Sidebar/menu mobile funcional.
- Mesmos links da versao desktop.
- Fundo escuro consistente.

### O que nao fazer
- Nao mexer no conteudo das paginas ao mexer na navbar.
- Nao alterar links sem confirmar rotas oficiais.
- Nao adicionar novas secoes de navegacao sem tarefa explicita.
