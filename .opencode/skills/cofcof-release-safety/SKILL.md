---
name: cofcof-release-safety
description: Use antes de commit, push GitHub, theme push Shopify ou qualquer validacao final.
---

# CofCof Release Safety

## Checklist pre-commit
- [ ] `git status` — arquivos esperados, sem lixo
- [ ] `git branch` — confirma `codex/correcao-cofcof` (ou branch correta)
- [ ] `shopify theme check --fail-level error` — 0 erros
- [ ] Nenhum secret, token ou senha nos arquivos alterados
- [ ] Nenhum placeholder como `LINK_CHECKOUT` ou `TRACE_LINK`
- [ ] Nenhum arquivo do tema Craft incluido
- [ ] Mudancas apenas nos arquivos planejados

## Checklist pre-push Shopify
- [ ] Tema alvo: `Arthur Desenv.` ID `156243919006`
- [ ] Nao usar `--live` em nenhuma circunstancia
- [ ] Nao publicar automaticamente (nao usar `--publish`)
- [ ] Preview testado: `https://cof-cof-co.myshopify.com?preview_theme_id=156243919006`

## Comando seguro de push
```bash
shopify theme push --store=cof-cof-co.myshopify.com --theme=156243919006
```

## Checklist pre-commit GitHub
- [ ] `git log --oneline -5` — commits recentes fazem sentido
- [ ] `git diff --cached` — revisao final
- [ ] Mensagem de commit descritiva e curta
- [ ] Push apenas apos aprovacao do usuario

## Relatorio pos-push
Apos cada push, relatar:
1. Arquivos alterados
2. Commits incluidos
3. Preview URL
4. Status do theme check
