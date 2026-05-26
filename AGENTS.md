# AGENTS.md

## Projeto

Tema Shopify da CofCof.co.

- Loja: `cof-cof-co.myshopify.com`
- Admin: `https://admin.shopify.com/store/cof-cof-co`
- Tema seguro/live: `Arthur Desenv.` (`156243919006`)
- Tema proibido: `Craft` (`155205337246`)
- Branch principal: `codex/correcao-cofcof`
- Repositorio: `https://github.com/ArthurAlvesZz/cofcof-shopify-theme`
- Fonte visual React: `C:\Users\TAY\AppData\Local\Temp\opencode\wrong-repo\src` (ArthurAlvesZzz/COFCOF.CO-Shopfy)

## Regras Fixas

- Ler este arquivo antes de iniciar novas tarefas.
- Nao usar `--live`.
- Nao alterar nem enviar arquivos para o tema `Craft` (`155205337246`).
- Trabalhar no tema `Arthur Desenv.` (`156243919006`).
- Nao quebrar checkout, carrinho, produtos, colecoes, payment widgets ou apps Shopify.
- Nao apagar `/pages/assinatura`.
- Nao remover videos, cards ou modal existentes sem pedido explicito.
- Preservar a estetica premium/escura atual da CofCof.
- Corrigir com minimo impacto.
- Nao fazer redesign sem pedido explicito.
- Nao alterar copy, layout, ordem das secoes ou identidade visual sem pedido explicito.
- Manter assets importantes dentro de `assets/` e versionados no Git quando forem parte da entrega.
- Fazer commits pequenos e descritivos.
- Fazer push para GitHub apos commit aprovado/validado.
- Subir somente para o tema seguro com:
  `shopify theme push --store=cof-cof-co.myshopify.com --theme=156243919006`

## Fonte de verdade

- **Repositorio fonte (React/TSX)**: `ArthurAlvesZzz/COFCOF.CO-Shopfy` (3 Z's)
- Local (referencia): `C:\Users\TAY\AppData\Local\Temp\opencode\wrong-repo\src`
- Contem 7 paginas React completas + componentes modulares que sao referencia visual/funcional obrigatoria.
- Nao usar o repositorio `ArthurAlvesZz/COFCOF.git` (2 Z's) como fonte principal — esta desatualizado.

## Validacao Padrao

- Rodar `git status` antes e depois.
- Rodar `shopify theme check --fail-level error`.
- Quando possivel, validar preview do tema seguro:
  `https://cof-cof-co.myshopify.com?preview_theme_id=156243919006`
- Testar rotas relevantes conforme a tarefa.
- Confirmar que placeholders como `LINK_CHECKOUT` e `TRACE_LINK` nao voltaram quando mexer em paginas customizadas.

## Paginas e Rotas

- Home: `/`
- Assinatura: `/pages/assinatura`
- Cafes: `/pages/nossos-cafes`
- Origem: `/pages/origem`
- Onde Encontrar: `/pages/onde-encontrar`
- Empresas: `/pages/empresas`
- Quem Somos: `/pages/quem-somos`
- Contato: `/pages/contato`
- Colecoes: `/collections/all`
- Carrinho: `/cart`

## Pendencias Conhecidas

- Paginas Shopify Admin para `/pages/origem` e `/pages/onde-encontrar` podem precisar ser criadas manualmente caso retornem 404.
- Handles esperados:
  - `origem` com template `page.origem`
  - `onde-encontrar` com template `page.onde-encontrar`
- O tema `Arthur Desenv.` esta publicado como live. Cuidado com pushes diretos.

## Resposta ao Usuario

Nas proximas tarefas, nao repetir todo o contexto do projeto. Responder de forma curta, com:

1. Plano curto.
2. Execucao feita.
3. Validacao.
4. Pendencias, se houver.
