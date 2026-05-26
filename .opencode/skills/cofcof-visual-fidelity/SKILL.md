---
name: cofcof-visual-fidelity
description: Use para comparar o projeto React/TSX com o tema Shopify e preservar fidelidade visual/funcional.
---

# CofCof Visual Fidelity

## Fonte de referencia
- React original: `C:\Users\TAY\Desktop\Material de Clientes\COFCOF\COFCOF-repo\src`
- Repositorio: `ArthurAlvesZz/COFCOF.git` (2 Z's)
- Contem 17 paginas completas como referencia obrigatoria.

## Abordagem
- Tema Shopify atual corrigido e a base operacional. Nao refazer do zero.
- Comparar pagina por pagina, secao por secao.
- Documentar diferencas em tabela obrigatoria.

## Tabela de comparacao obrigatoria

```
Pagina | Secao | React original | Shopify atual | Diferenca | Gravidade | Correcao
```

### Gravidades
| Gravidade | Descricao |
|-----------|-----------|
| Critica | Funcionalidade ausente, layout quebrado, link errado |
| Alta | Animacao ausente, espaçamento muito diferente, cor errada |
| Media | Pequena diferenca visual, fonte ligeiramente diferente |
| Baixa | Detalhe menor, aceitavel sem correcao |

### Regras
- Nao marcar "OK" se houver diferenca critica ou alta sem correcao.
- Nao aceitar "simplificado para Shopify" como justificativa.
- Exigir comparacao em desktop, tablet e mobile.
- Se o React original tem animacao/hover/transicao, o Shopify deve ter equivalente.

## Fluxo de correcao
1. Identificar pagina no React original
2. Identificar section/template correspondente no Shopify
3. Comparar estrutura, estilo e comportamento
4. Documentar diferencas na tabela
5. Corrigir diferencas criticas e altas
6. Re-validar
