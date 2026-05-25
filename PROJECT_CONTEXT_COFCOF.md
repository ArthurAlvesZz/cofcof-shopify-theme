# Contexto do Projeto CofCof Shopify

## Projeto
Tema Shopify da CofCof.co.

- Loja: cof-cof-co.myshopify.com
- Admin: https://admin.shopify.com/store/cof-cof-co
- Repositório: https://github.com/ArthurAlvesZz/cofcof-shopify-theme
- Branch principal de trabalho: codex/correcao-cofcof

## Temas Shopify
- Tema live/publicado: Arthur Desenv.
- ID do tema live: 156243919006
- Tema antigo (não usado mais): Craft
- ID do tema antigo: 155205337246

## Regras absolutas
- Trabalhar apenas no tema Arthur Desenv. ID 156243919006.
- Cuidado ao usar --live (Arthur Desenv. é o live agora).
- Não quebrar checkout, carrinho, produtos, coleções, payment widgets ou apps Shopify.
- Não apagar /pages/assinatura.
- Não remover vídeos, cards ou modal existentes.
- Não alterar copy/layout/design sem pedido explícito.
- Preservar estética premium escura da CofCof.
- Fazer commits pequenos.
- Rodar theme check antes de subir.
- Fazer push GitHub e depois:
  shopify theme push --store=cof-cof-co.myshopify.com --theme=156243919006 (ou --live, já que é o live agora)

## Rotas importantes
- Home: /
- Assinatura: /pages/assinatura
- Cafés: /pages/nossos-cafes
- Origem: /pages/origem
- Onde Encontrar: /pages/onde-encontrar
- Empresas: /pages/empresas
- Quem Somos: /pages/quem-somos
- Contato: /pages/contato
- Coleções: /collections/all
- Carrinho: /cart

## Páginas criadas manualmente no Admin
- Origem
  - handle: origem
  - template esperado: page.origem
- Onde Encontrar
  - handle: onde-encontrar
  - template esperado: page.onde-encontrar

## Navbar
A navbar custom deve ser única e global.

Arquivo principal:
- snippets/cofcof-custom-nav.liquid

Regras:
- Deve aparecer igual em todas as páginas customizadas.
- Fundo escuro obrigatório.
- Logo COFCOF.CO visível.
- Home sempre visível.
- Assinar sempre visível.
- Assinar aponta para /pages/assinatura#planos.
- Não deixar header claro padrão Shopify aparecer nas páginas customizadas.

## Vídeos
Vídeo de fundo do hero:
https://files.catbox.moe/v7x5pa.mp4

Cards:
- Card 1: https://files.catbox.moe/d321i5.mp4
- Card 2: https://files.catbox.moe/i0tw82.mp4
- Card 3: https://files.catbox.moe/g3qrmh.mp4

## Imagens hospedadas
- Xicara CofCof: https://files.catbox.moe/b6r7po.png
- 4 Embalagens: https://files.catbox.moe/0hkmbb.png
- 4 Cafés em fila: https://files.catbox.moe/byx9ge.png
- 6 Cafés em fila: https://files.catbox.moe/agtnqp.png
- 4 Cafés juntos: https://files.catbox.moe/7r9wdw.png
- Cafés 16-9: https://files.catbox.moe/s5onxq.png

## Arquivos importantes já mexidos
- AGENTS.md
- layout/theme.liquid
- sections/main-page.liquid
- snippets/cofcof-custom-nav.liquid
- sections/cofcof-home.liquid
- sections/cofcof-origem.liquid
- sections/cofcof-partner-map.liquid
- assets/cofcof-partner-map.css
- assets/cofcof-partner-map.js
- templates/index.json
- templates/page.origem.json
- templates/page.onde-encontrar.json

## Mapa de parceiros
Implementação atual:
- sections/cofcof-partner-map.liquid
- assets/cofcof-partner-map.css
- assets/cofcof-partner-map.js

Dados atuais ficam primeiro em JSON dentro do JS.
Futuro ideal: migrar parceiros para Metaobjects Shopify.

## Validação padrão
Rodar:
shopify theme check --fail-level error
shopify theme check
git status

Preview:
https://cof-cof-co.myshopify.com?preview_theme_id=156243919006

## Fluxo Git
Antes de alterar:
git status
git branch

Depois:
git add .
git commit -m "Mensagem curta"
git push

Depois subir tema:
shopify theme push --store=cof-cof-co.myshopify.com --theme=156243919006

Preferir usar --theme=156243919006 (equivalente a --live, mas mais explícito).
