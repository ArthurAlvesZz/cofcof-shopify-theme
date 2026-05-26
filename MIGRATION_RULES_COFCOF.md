# Regras de Migracao React → Shopify Liquid

## Principios
- Migracao nao e redesign.
- Nao simplificar componentes para "caber no Shopify".
- Nao remover estetica premium escura da CofCof.
- Nao remover funcionalidades existentes no React original.
- Nao remover animacoes, hover states, transicoes.
- Nao trocar por tema Shopify generico (Dawn).
- Nao alterar copy, textos ou nomes sem autorizacao explicita.
- Nao alterar navbar ou footer sem tarefa explicita.
- Nao usar React, JSX, hooks ou React Router dentro do tema Shopify.
- Converter para Liquid, JSON templates, snippets, assets CSS e JS vanilla.

## Regras tecnicas
- CSS deve ser escopado em classes com prefixo `cof-` ou similar.
- JS deve ser isolado em IIFE, sem poluir escopo global.
- Nao usar `href="#"` em botoes sem acao real.
- Nao criar botoes sem acao definida.
- Nao usar texto invisivel em botoes (ex: "Botao" sem label visivel).
- Nao afetar checkout, carrinho, produto, colecao ou payment widgets.
- Nao publicar live automaticamente.
- Fazer commit por fase/page concluida.

## Checklist obrigatorio para cada pagina

### Estrutura
- [ ] Hero existe e corresponde ao React
- [ ] Navbar custom presente (via `snippets/cofcof-custom-nav.liquid`)
- [ ] Footer custom presente (via `snippets/cofcof-footer.liquid`)
- [ ] Header padrao Shopify oculto em paginas custom

### Componentes
- [ ] Cards com mesmas imagens/videos
- [ ] Botoes com hover/focus/active visiveis
- [ ] CTAs com links corretos
- [ ] Overlays/modal se existirem no original
- [ ] Animacoes e transicoes presentes

### Responsividade
- [ ] Desktop identico ao React
- [ ] Tablet funcional
- [ ] Mobile adaptado (sem quebrar)

### Navegacao
- [ ] Links apontam para rotas oficiais
- [ ] Nenhum link quebrado
- [ ] Nenhum placeholder como `LINK_CHECKOUT` ou `TRACE_LINK`

### Fidelidade
- [ ] Comparado visualmente com React original
- [ ] Diferencas documentadas com gravidade
- [ ] Nenhuma diferenca critica ou alta sem correcao

### Shopify Admin
- [ ] Pagina existe no Admin Shopify
- [ ] Handle correto
- [ ] Template JSON correto
- [ ] Section principal correta

## Bloqueios
Nao aceitar:
- "Simplificado para Shopify" sem autorizacao
- "O Shopify nao suporta isso" sem tentativa real de adaptacao
- "O React era so um prototipo" se o cliente pediu fidelidade
