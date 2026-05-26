---
name: shopify-liquid-migration
description: Use quando for converter ou corrigir paginas React/TSX para Shopify Liquid mantendo compatibilidade com temas Shopify.
---

# Shopify Liquid Migration

## Quando usar
- Converter componente React/TSX para Liquid/JSON/Snippets
- Corrigir pagina Shopify existente para ficar mais fiel ao React original
- Criar nova section Liquid baseada em componente React

## Regras de conversao

### Proibido no tema Shopify
- JSX, React.createElement, hooks, React Router
- Componentes React importados
- `className` (usar `class`)
- `style={{ }}` de objeto JS (usar string ou CSS classes)

### Obrigatorio
- Usar templates JSON (`templates/page.*.json`)
- Usar sections Liquid (`sections/cofcof-*.liquid`)
- Usar snippets para componentes reutilizaveis (navbar, footer, cards)
- Usar schema settings/blocks para dados editaveis no Admin
- CSS escopado em classes com prefixo `cof-`
- JS vanilla isolado em IIFE

### Estrutura de section Liquid
```liquid
{% liquid
  assign variavel = section.settings.campo
%}

<div class="cof-meu-componente">
  <!-- HTML Liquid -->
</div>

{% schema %}
{
  "name": "Meu Componente",
  "settings": [...],
  "blocks": [...],
  "presets": [{ "name": "Meu Componente" }]
}
{% endschema %}
```

### JS vanilla isolado
```javascript
(function() {
  'use strict';
  var root = document.querySelector('[data-cof-meu-root]');
  if (!root) return;
  // logica aqui, sem poluir escopo global
})();
```

## Validacao
- Rodar `shopify theme check --fail-level error` apos cada alteracao
- Verificar preview em desktop, tablet e mobile
- Confirmar que header padrao Shopify nao aparece em paginas custom

## Seguranca
- Nunca mexer em checkout, carrinho, produto, colecao ou payment widgets sem pedido explicito
- Nao usar `--live` no theme push
- Nao expor secrets ou tokens
