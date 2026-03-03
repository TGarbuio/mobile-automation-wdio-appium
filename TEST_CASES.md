# Documentação dos Cenários de Teste

## 📝 Matriz de Testes

### Resumo Geral

| Funcionalidade | Total de Testes | Prioridade |
|----------------|-----------------|------------|
| Login | 4 | Alta |
| Sign Up | 3 | Alta |
| Formulários | 3 | Média |
| Navegação | 2 | Média |
| Gestos (Swipe) | 1 | Baixa |
| Data-Driven | 9+ | Alta |

**Total de Cenários Implementados: 22+**

---

## 🔐 Testes de Login

| ID | Cenário | Prioridade | Arquivo |
|----|---------|------------|---------|
| CT01 | Realizar login com credenciais válidas | Critical | [login.spec.js](test/specs/login.spec.js) |
| CT02 | Exibir erro ao tentar login com email inválido | High | [login.spec.js](test/specs/login.spec.js) |
| CT03 | Exibir erro ao tentar login com senha vazia | High | [login.spec.js](test/specs/login.spec.js) |
| CT04 | Verificar que campos de login estão visíveis | Medium | [login.spec.js](test/specs/login.spec.js) |

### Detalhes dos Testes de Login

#### CT01 - Login com credenciais válidas
**Objetivo:** Validar o fluxo de login completo com dados corretos

**Pré-condições:**
- Aplicativo instalado e aberto
- Emulador Android rodando

**Passos:**
1. Navegar para a aba "Login"
2. Preencher campo de email: `testuser@example.com`
3. Preencher campo de senha: `Test@123`
4. Clicar no botão "LOGIN"

**Resultado Esperado:**
- Mensagem de sucesso exibida contendo "Success"
- Alerta pode ser fechado

**Dados de Teste:**
```json
{
  "email": "testuser@example.com",
  "password": "Test@123"
}
```

---

#### CT02 - Email inválido
**Objetivo:** Validar mensagem de erro para formato de email incorreto

**Passos:**
1. Navegar para a aba "Login"
2. Preencher campo de email: `invalid-email`
3. Preencher campo de senha: `Test@123`
4. Clicar no botão "LOGIN"

**Resultado Esperado:**
- Mensagem de erro contendo "valid email"

---

## 📝 Testes de Sign Up (Cadastro)

| ID | Cenário | Prioridade | Arquivo |
|----|---------|------------|---------|
| CT05 | Realizar cadastro com dados válidos | Critical | [signup.spec.js](test/specs/signup.spec.js) |
| CT06 | Exibir erro quando senhas não conferem | High | [signup.spec.js](test/specs/signup.spec.js) |
| CT07 | Verificar que todos os campos estão visíveis | Medium | [signup.spec.js](test/specs/signup.spec.js) |

### Detalhes dos Testes de Sign Up

#### CT05 - Cadastro com dados válidos
**Objetivo:** Validar o cadastro de novo usuário

**Passos:**
1. Navegar para a aba "Sign up"
2. Preencher campo de email: `newuser@example.com`
3. Preencher campo de senha: `Test@123`
4. Preencher campo de confirmação de senha: `Test@123`
5. Clicar no botão "SIGN UP"

**Resultado Esperado:**
- Mensagem de sucesso "Signed Up"

**Dados de Teste:**
```json
{
  "email": "newuser@example.com",
  "password": "Test@123",
  "repeatPassword": "Test@123"
}
```

---

#### CT06 - Senhas não conferem
**Objetivo:** Validar validação de confirmação de senha

**Passos:**
1. Navegar para a aba "Sign up"
2. Preencher senhas diferentes
3. Clicar em "SIGN UP"

**Resultado Esperado:**
- Erro: "not match"

---

## 📋 Testes de Formulários

| ID | Cenário | Prioridade | Arquivo |
|----|---------|------------|---------|
| CT08 | Preencher campo de texto e verificar resultado | Critical | [forms.spec.js](test/specs/forms.spec.js) |
| CT09 | Alternar switch e verificar mudança de estado | High | [forms.spec.js](test/specs/forms.spec.js) |
| CT10 | Selecionar opção no dropdown | High | [forms.spec.js](test/specs/forms.spec.js) |

### Detalhes dos Testes de Formulários

#### CT08 - Campo de texto
**Objetivo:** Validar entrada e exibição de texto

**Passos:**
1. Navegar para aba "Forms"
2. Preencher campo de input: `WebdriverIO Testing`
3. Verificar resultado exibido

**Resultado Esperado:**
- Texto exibido igual ao digitado

---

#### CT09 - Switch toggle
**Objetivo:** Validar alteração de estado de switch

**Passos:**
1. Navegar para aba "Forms"
2. Obter estado inicial do switch
3. Clicar no switch
4. Verificar que estado mudou

**Resultado Esperado:**
- Estado do switch alterado

---

#### CT10 - Dropdown
**Objetivo:** Validar seleção em dropdown

**Passos:**
1. Navegar para aba "Forms"
2. Clicar no dropdown
3. Selecionar: "webdriver.io is awesome"

**Resultado Esperado:**
- Opção selecionada exibida no dropdown

---

## 🧭 Testes de Navegação

| ID | Cenário | Prioridade | Arquivo |
|----|---------|------------|---------|
| CT11 | Navegar entre diferentes abas do aplicativo | Critical | [navigation.spec.js](test/specs/navigation.spec.js) |
| CT12 | Retornar à tela Home após navegar | Medium | [navigation.spec.js](test/specs/navigation.spec.js) |

### Detalhes dos Testes de Navegação

#### CT11 - Navegação entre abas
**Objetivo:** Validar navegação completa pelo app

**Passos:**
1. Navegar para Home → Verificar presença do logo
2. Navegar para Login → Verificar campo de email
3. Navegar para Forms → Verificar campo de input
4. Navegar para Swipe → Verificar tela de swipe

**Resultado Esperado:**
- Todas as telas carregam corretamente
- Elementos de cada tela estão visíveis

---

#### CT12 - Retorno à Home
**Objetivo:** Validar navegação de volta à tela inicial

**Passos:**
1. Navegar para Forms
2. Retornar para Home
3. Verificar presença do logo

**Resultado Esperado:**
- Logo da Home visível

---

## 👆 Testes de Gestos (Swipe)

| ID | Cenário | Prioridade | Arquivo |
|----|---------|------------|---------|
| CT13 | Realizar swipe horizontal para esquerda | High | [swipe.spec.js](test/specs/swipe.spec.js) |

### Detalhes dos Testes de Swipe

#### CT13 - Swipe para esquerda
**Objetivo:** Validar gesto de swipe

**Passos:**
1. Navegar para aba "Swipe"
2. Realizar swipe horizontal para esquerda
3. Verificar que ainda está na tela

**Resultado Esperado:**
- Swipe executado com sucesso
- Aplicativo responde ao gesto

---

## 📊 Testes Data-Driven

| ID | Cenário | Quantidade | Arquivo |
|----|---------|------------|---------|
| CT14.x | Login com múltiplos usuários válidos | 3 | [datadriven.spec.js](test/specs/datadriven.spec.js) |
| CT15.x | Validação de emails inválidos | 3 | [datadriven.spec.js](test/specs/datadriven.spec.js) |
| CT16.x | Preenchimento de formulário com múltiplos valores | 3 | [datadriven.spec.js](test/specs/datadriven.spec.js) |

### Detalhes dos Testes Data-Driven

#### CT14.x - Login com múltiplos usuários
**Objetivo:** Validar login com diferentes conjuntos de dados

**Dados de Teste:**
```json
{
  "validUsers": [
    {"email": "user1@test.com", "password": "Test@123"},
    {"email": "user2@test.com", "password": "Test@456"},
    {"email": "user3@test.com", "password": "Test@789"}
  ]
}
```

**Resultado Esperado:**
- Cada usuário consegue fazer login com sucesso

---

#### CT15.x - Emails inválidos
**Objetivo:** Validar múltiplos formatos inválidos de email

**Dados de Teste:**
```json
{
  "invalidEmails": [
    {"email": "invalid.email", "password": "Test@123"},
    {"email": "@test.com", "password": "Test@123"},
    {"email": "test@", "password": "Test@123"}
  ]
}
```

**Resultado Esperado:**
- Cada email inválido gera erro apropriado

---

#### CT16.x - Múltiplos valores em formulário
**Objetivo:** Testar formulário com diferentes entradas

**Dados de Teste:**
```json
{
  "formInputs": [
    {"text": "WebdriverIO"},
    {"text": "Appium Automation"},
    {"text": "Mobile Testing"}
  ]
}
```

**Resultado Esperado:**
- Cada valor é exibido corretamente no resultado

---

## 🎯 Cobertura de Testes

### Funcionalidades Cobertas

✅ **Autenticação**
- Login com credenciais válidas
- Validação de email
- Validação de senha
- Cadastro de novos usuários
- Confirmação de senha

✅ **Formulários**
- Input de texto
- Switch/Toggle
- Dropdown/Select

✅ **Navegação**
- Troca entre telas
- Verificação de elementos

✅ **Gestos**
- Swipe horizontal

✅ **Validações**
- Mensagens de erro
- Mensagens de sucesso
- Presença de elementos

### Métricas

| Métrica | Valor |
|---------|-------|
| Total de Testes | 22+ |
| Testes Críticos | 6 |
| Testes de Alta Prioridade | 7 |
| Testes de Média Prioridade | 6 |
| Testes de Baixa Prioridade | 1 |
| Testes Data-Driven | 9 |

---

## 📝 Convenções

### Nomenclatura de Testes

```
CT{número} - {Descrição clara e objetiva}
```

Exemplo: `CT01 - Deve realizar login com credenciais válidas`

### Estrutura de Arquivos

```
test/specs/{funcionalidade}.spec.js
```

Exemplo: `test/specs/login.spec.js`

### Tags Allure

Todos os testes incluem:
- `Feature`: Funcionalidade sendo testada
- `Severity`: Prioridade (critical, high, medium, low)
- `TestId`: Identificador único (CT01, CT02, etc.)
- `Description`: Descrição detalhada

---

## 🔄 Manutenção

### Adicionar Novos Testes

1. Crie um novo arquivo em `test/specs/`
2. Siga o padrão Page Object
3. Use data-driven quando aplicável
4. Adicione tags Allure
5. Documente aqui

### Atualizar Testes Existentes

1. Localize o teste pelo ID (ex: CT01)
2. Edite o arquivo correspondente
3. Execute o teste
4. Atualize a documentação

---

**Última Atualização:** Março 2026
**Responsável:** Equipe de QA
