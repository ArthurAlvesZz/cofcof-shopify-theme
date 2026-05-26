---
name: cofcof-button-contrast-audit
description: Use para corrigir botoes/CTAs com texto invisivel, hover quebrado ou contraste ruim no escopo custom CofCof.
---

# CofCof Button Contrast Audit

## Problemas comuns
- Texto branco em fundo branco (ex: `color: var(--sand)` em botao com background claro).
- Hover state inexistente ou quebrado.
- `::before` com animacao de slide que esconde o texto.
- Botao com `span` como unico conteudo visivel, mas sem fallback.
- Link sem `href` valido.

## Regras de auditoria
- Todo botao custom CofCof deve ter:
  - cor de texto visivel em estado normal
  - cor de texto visivel em hover
  - cor de texto visivel em active/focus
  - `cursor: pointer`
  - `href` valido (se for link) ou `type="button"` (se for botao)
- Nao afetar botoes nativos Shopify (checkout, carrinho, produto).
- Nao afetar payment widgets ou apps.
- CSS escopado em classes CofCof (`cof-*`, `cp-*`), nunca global.

## Padrao de botao CofCof
```css
.cof-btn {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  font-family: var(--fl);
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
  transition: color .38s;
  text-align: center;
  font-size: 10px;
  padding: 16px;
}
.cof-btn > span { position: relative; z-index: 1; }
.cof-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateY(101%);
  transition: transform .42s cubic-bezier(.2,.7,.2,1);
  z-index: 0;
}
.cof-btn:hover::before { transform: translateY(0); }
```

### Variantes
- `.cof-btn-sand` — fundo sand, texto black; hover: fundo black, texto sand
- `.cof-btn-ghost` — borda fina, texto sand; hover: fundo sand, texto black

## Validacao
- Inspecionar cada botao visualmente em normal, hover e focus.
- Verificar se o `span` interno nao esta vazio.
- Verificar se `href` nao e `#`.
