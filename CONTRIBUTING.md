# Guia de Contribuição

Obrigado por considerar contribuir com o projeto de automação mobile! 🎉

## 📋 Como Contribuir

### 1. Fork o Projeto

```bash
# Clone seu fork
git clone https://github.com/seu-usuario/mobile-automation-wdio-appium.git
cd mobile-automation-wdio-appium
```

### 2. Crie uma Branch

```bash
# Crie uma branch para sua feature
git checkout -b feature/minha-nova-feature

# Ou para correção de bug
git checkout -b fix/correcao-bug
```

### 3. Faça suas Alterações

Siga as convenções do projeto (veja abaixo).

### 4. Commit suas Mudanças

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

### 5. Push para o GitHub

```bash
git push origin feature/minha-nova-feature
```

### 6. Abra um Pull Request

1. Vá ao repositório original no GitHub
2. Clique em "New Pull Request"
3. Selecione sua branch
4. Descreva suas alterações
5. Aguarde review

---

## 📝 Convenções de Código

### Estrutura de Page Objects

```javascript
const BasePage = require('./base.page');

class MinhaPage {
    // Selectores
    get meuElemento() {
        return $('~meu-elemento');
    }

    // Métodos
    async minhaAcao() {
        await BasePage.clickElement(this.meuElemento);
    }
}

module.exports = new MinhaPage();
```

### Estrutura de Testes

```javascript
const MinhaPage = require('../pageobjects/minha.page');
const allure = require('@wdio/allure-reporter').default;

describe('Minha Funcionalidade', () => {
    beforeEach(async () => {
        allure.addFeature('Minha Feature');
    });

    it('CT{numero} - Deve fazer algo específico', async () => {
        allure.addSeverity('critical');
        allure.addTestId('CT{numero}');
        allure.addDescription('Descrição detalhada');

        // Arrange (preparar)
        await MinhaPage.navegar();
        
        // Act (agir)
        await MinhaPage.executarAcao();
        
        // Assert (verificar)
        const resultado = await MinhaPage.obterResultado();
        expect(resultado).to.equal('esperado');
    });
});
```

### Nomenclatura

#### Arquivos
- Page Objects: `{nome}.page.js` (ex: `login.page.js`)
- Specs: `{nome}.spec.js` (ex: `login.spec.js`)
- Helpers: `{nome}.helper.js` (ex: `data.helper.js`)

#### Variáveis e Métodos
- camelCase para métodos: `minhaFuncao()`
- camelCase para variáveis: `minhaVariavel`
- PascalCase para classes: `MinhaClasse`

#### Commits
Siga o padrão Conventional Commits:

```
feat: adiciona nova funcionalidade
fix: corrige bug X
docs: atualiza documentação
test: adiciona testes para Y
refactor: refatora código Z
style: ajusta formatação
chore: atualiza dependências
```

---

## 🧪 Adicionando Novos Testes

### 1. Crie o Page Object

```bash
# Crie o arquivo
touch test/pageobjects/nova-tela.page.js
```

```javascript
const BasePage = require('./base.page');

class NovaTelaPage {
    get elementoImportante() {
        return $('~elemento-id');
    }

    async executarAcao() {
        await BasePage.clickElement(this.elementoImportante);
    }
}

module.exports = new NovaTelaPage();
```

### 2. Crie o Arquivo de Teste

```bash
touch test/specs/nova-tela.spec.js
```

```javascript
const NovaTelaPage = require('../pageobjects/nova-tela.page');
const allure = require('@wdio/allure-reporter').default;

describe('Nova Tela - Descrição', () => {
    beforeEach(async () => {
        allure.addFeature('Nova Tela');
    });

    it('CT{numero} - Deve executar ação', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT{numero}');
        allure.addDescription('Descrição do teste');

        await NovaTelaPage.executarAcao();
        // assertions...
    });
});
```

### 3. Execute o Teste

```bash
# Executar apenas seu novo teste
npx wdio run wdio.conf.js --spec=./test/specs/nova-tela.spec.js
```

### 4. Documente

Adicione seu teste ao [TEST_CASES.md](TEST_CASES.md).

---

## 🔍 Code Review

Seu Pull Request será revisado considerando:

### ✅ Checklist

- [ ] Código segue as convenções do projeto
- [ ] Testes estão passando
- [ ] Não há erros de lint
- [ ] Page Objects estão bem estruturados
- [ ] Testes estão documentados
- [ ] Screenshots/evidências foram capturados
- [ ] README atualizado (se necessário)
- [ ] Commit messages seguem padrão

### 📋 O que será avaliado

1. **Qualidade do Código**
   - Legibilidade
   - Manutenibilidade
   - Seguir DRY (Don't Repeat Yourself)

2. **Testes**
   - Cobrem o caso de uso
   - São independentes
   - São determinísticos (não flaky)

3. **Documentação**
   - Comentários quando necessário
   - README atualizado
   - Casos de teste documentados

---

## 🐛 Reportando Bugs

### Antes de Reportar

1. Verifique se o bug já foi reportado
2. Tente reproduzir em ambiente limpo
3. Colete informações relevantes

### Template de Bug Report

```markdown
**Descrição do Bug**
Descrição clara e concisa do problema.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [ex: Windows 10]
- Node: [ex: 16.14.0]
- WebdriverIO: [ex: 8.36.1]
- Appium: [ex: 2.5.1]
- Emulador: [ex: Pixel 4 API 30]

**Logs**
```
Cole logs relevantes aqui
```

**Contexto Adicional**
Qualquer outra informação relevante.
```

---

## 💡 Sugestões de Features

### Template de Feature Request

```markdown
**Sua feature resolve qual problema?**
Descrição clara do problema que existe hoje.

**Solução Proposta**
Como você imagina que a feature funcionaria.

**Alternativas Consideradas**
Outras formas de resolver o problema.

**Contexto Adicional**
Screenshots, mockups, exemplos, etc.
```

---

## 🎯 Áreas que Precisam de Contribuição

### Alta Prioridade

- [ ] Adicionar testes para WebView
- [ ] Implementar testes de acessibilidade
- [ ] Melhorar cobertura de testes de gestos
- [ ] Adicionar suporte para iOS

### Média Prioridade

- [ ] Criar mais helpers utilitários
- [ ] Melhorar tratamento de erros
- [ ] Adicionar retry automático em falhas
- [ ] Implementar testes de performance

### Baixa Prioridade

- [ ] Adicionar mais exemplos de data-driven
- [ ] Melhorar documentação
- [ ] Adicionar vídeos de execução
- [ ] Criar dashboard customizado

---

## 📚 Recursos Úteis

### Documentação

- [WebdriverIO](https://webdriver.io/)
- [Appium](http://appium.io/docs/en/latest/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Allure](https://docs.qameta.io/allure/)

### Comunidade

- [WebdriverIO Discord](https://discord.webdriver.io/)
- [Appium Discuss](https://discuss.appium.io/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/webdriver-io)

---

## 🤝 Código de Conduta

### Nossos Padrões

- Seja respeitoso e inclusivo
- Aceite feedback construtivo
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

### Comportamentos Inaceitáveis

- Linguagem ou imagens inapropriadas
- Trolling ou comentários ofensivos
- Assédio público ou privado
- Publicar informações privadas de outros

---

## ❓ Dúvidas?

Se tiver dúvidas sobre como contribuir:

1. Verifique a documentação existente
2. Procure em issues fechadas
3. Abra uma nova issue com sua dúvida
4. Entre em contato via discussões do GitHub

---

**Obrigado por contribuir! 🙏**

Suas contribuições tornam este projeto melhor para todos.
