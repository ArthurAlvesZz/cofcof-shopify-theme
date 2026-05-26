---
name: cofcof-route-template-audit
description: Use para auditar rotas, handles, templates JSON, sections e paginas que caem em visual antigo/404.
---

# CofCof Route & Template Audit

## Quando usar
- Ao suspeitar que uma pagina esta caindo em template errado.
- Ao identificar header padrao Shopify em pagina custom.
- Ao encontrar 404 em rotas que deveriam existir.
- Como verificacao pre-commit em tarefas de rota.

## Checklist de auditoria

### Para cada pagina custom CofCof
1. A URL existe e retorna 200?
2. O handle Shopify esta correto?
3. O template JSON correto esta atribuido?
4. A section principal esta carregando?
5. O header padrao Shopify esta oculto?
6. A navbar custom CofCof aparece?
7. Os links estao corretos?

### Tabela de auditoria

```
Pagina | URL | Handle | Template atual | Section | Problema | Correcao
```

### Acoes manuais no Admin Shopify
Quando uma pagina precisa ser criada/ajustada no Admin:
1. Ir em `https://admin.shopify.com/store/cof-cof-co/pages`
2. Criar nova pagina ou editar existente
3. Definir handle correto
4. Selecionar template JSON correto em "Tema > Template"
5. Publicar

### Paginas que tipicamente precisam de acao manual
- `/pages/origem` — handle: `origem`, template: `page.origem`
- `/pages/onde-encontrar` — handle: `onde-encontrar`, template: `page.onde-encontrar`
- `/pages/nossos-cafes` — handle: `nossos-cafes`, template: `page.cafes`
