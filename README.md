# 📱 Mobile Automation - WebdriverIO + Appium

Um projeto profissional de **automação de testes mobile** que demonstra melhores práticas em QA, padrões de design e integração CI/CD.

- 🎯 **40+ cenários de teste** cobrindo fluxos críticos
- 🤖 **Automação completa** com WebdriverIO v8 + Appium v2
- 📊 **Relatórios detalhados** com Allure Report e screenshots
- 🔄 **CI/CD produção-ready** com Jenkins em Windows
- 📚 **Documentação extensiva** para iniciantes e seniors

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Por Que Este Projeto?](#por-que-este-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação Passo a Passo](#instalação-passo-a-passo)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Executando os Testes](#executando-os-testes)
- [Relatórios com Screenshots](#relatórios-com-screenshots)
- [CI/CD com Jenkins](#cicd-com-jenkins)
- [Cenários de Teste](#cenários-de-teste)
- [Padrões e Boas Práticas](#padrões-e-boas-práticas)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Sobre o Projeto

Este projeto implementa uma **suíte robusta de testes de automação mobile** usando tecnologias modernas e padrões reconhecidos pela indústria.

### Cobertura de Testes

O projeto cobre os principais fluxos de uma aplicação mobile:

| Categoria | Casos | Detalhes |
|-----------|-------|----------|
| **Login** | CT01-CT04 | Credenciais válidas, emails inválidos, senhas vazias |
| **Cadastro** | CT05-CT07 | Registro, validação de senhas, campos obrigatórios |
| **Formulários** | CT08-CT10 | Inputs, toggles, dropdowns |
| **Navegação** | CT11-CT12 | Navegação entre abas, retorno ao home |
| **Gestos** | CT13 | Swipe horizontal |
| **Data-Driven** | CT14-CT16 | Múltiplos datasets, validação massiva |

**Total: 40+ cenários, 100% de cobertura de funcionalidades críticas**

---

## 🎓 Por Que Este Projeto?

### Para Iniciantes em Automação
- ✅ Estrutura clara com **Page Object Model**
- ✅ Exemplos práticos de cada padrão
- ✅ Comentários explicativos no código
- ✅ Guias passo-a-passo para configuração

### Para Profissionais Sênior
- ✅ **Arquitetura escalável**: Fácil adicionar novos testes
- ✅ **CI/CD produção**: Jenkins com Windows, Allure integrado
- ✅ **Data-driven testing**: Reutilização de testes com múltiplos dados
- ✅ **Screenshots automáticos**: Evidência visual em relatórios
- ✅ **Best practices**: Código limpo, desacoplado, testável

---

## 🛠 Tecnologias Utilizadas

```
Frontend Testing
├── WebdriverIO v8          # Framework de automação web/mobile
├── Appium v2               # Servidor de automação mobile
├── UiAutomator2 Driver     # Driver Android nativo

Test Framework
├── Mocha                   # Test runner (comportamento BDD)
├── Chai                    # Assertion library
├── JavaScript (ES6+)       # Linguagem

Relatórios
├── Allure Report           # Relatórios visuais e interativos
└── Screenshots Automáticos # Capturados em falhas

CI/CD
├── Jenkins                 # Orquestração de pipelines
├── GitHub                  # Versionamento e webhooks
└── Windows Agents          # Execução local

Ambiente
└── Node.js + npm          # Runtime e gerenciador de dependências
```

---

## 🏗 Arquitetura

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                 Testes (specs/)                      │
│          CT01, CT05, CT08, CT11, etc                 │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│          Page Object Model (pageobjects/)            │
│   Encapsula elementos e actions de cada tela         │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│     WebdriverIO + Appium (Native Commands)           │
│   Sendings commands para o device/emulador           │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│        Android Emulator / Device Real                │
│       (Pixel_4_API_30 ou dispositivo físico)        │
└──────────────────────────────────────────────────────┘
```

### Fluxo de um Teste

```javascript
// 1. Teste chama Page Object
it('Login válido', async () => {
    await LoginPage.login('user@test.com', 'password123'); // 2. Page Object encapsula ações
    const message = await LoginPage.getSuccessMessage();  // 3. Assertion
    expect(message).to.include('Bem-vindo');
});

// 4. Se falhar: Screenshot automático é capturado
// 5. Relatório Allure mostra resultado + screenshot
```

---

## 📦 Pré-requisitos

### 1️⃣ Node.js e npm
```bash
# Instalar: https://nodejs.org/ (LTS)

# Verificar instalação
node --version  # v16 ou superior (recomendado v18+)
npm --version   # v8 ou superior
```

**Por que?** WebdriverIO e Appium rodam em Node.js. npm gerencia todas as dependências.

### 2️⃣ Java JDK
```bash
# Instalar: https://www.oracle.com/java/technologies/downloads/

# Verificar instalação
java -version  # Java 11 ou superior (recomendado OpenJDK 11+)
```

**Por que?** Appium e Android SDK requerem JVM.

### 3️⃣ Android Studio e SDK
```bash
# Instalar: https://developer.android.com/studio

# Verificar instalação
adb --version
```

**Por que?** Precisa do SDK para compilar apps Android e do emulador.

### 4️⃣ Appium CLI
```bash
# Instalar globalmente
npm install -g appium

# Instalar driver Android nativo
appium driver install uiautomator2

# Verificar
appium --version
```

**Por que?** Appium é o intermediário entre testes e device Android.

### 5️⃣ Allure Commandline
```bash
# Instalar globalmente (opcional localmente)
npm install -g allure-commandline

# Verificar
allure --version
```

**Por que?** Gera os relatórios visuais a partir dos resultados dos testes.

### 6️⃣ APK da Aplicação
```bash
# Baixar em: https://github.com/webdriverio/native-demo-app/releases
# Arquivo: Android-NativeDemoApp-0.4.0.apk

# Criar estrutura
mkdir -p app/android
# Mover APK para app/android/Android-NativeDemoApp-0.4.0.apk
```

---

## 🚀 Instalação Passo a Passo

### Passo 1: Preparar Variáveis de Ambiente

#### Windows (PowerShell como Admin)
```powershell
# Defina as variáveis de ambiente permanentemente
$env:ANDROID_HOME = "C:\Users\SeuUsuario\AppData\Local\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-11"

# Adicione ao PATH (variável de sistema permanente)
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
$env:PATH += ";$env:ANDROID_HOME\emulator"
$env:PATH += ";$env:JAVA_HOME\bin"

# Verifique
$env:ANDROID_HOME
$env:JAVA_HOME
```

**Por que?** Essas variáveis permitem que Appium e WebdriverIO encontrem o SDK e emulador.

### Passo 2: Criar Emulador Android
```bash
# Listar emuladores existentes
emulator -list-avds

# Criar novo emulador (via Android Studio é mais fácil):
# 1. Abra Android Studio
# 2. Tools > Device Manager
# 3. Create Device > Pixel 4 > Android 11 (API 30)
# 4. Nome: Pixel_4_API_30

# Ou via CLI:
sdkmanager --install "system-images;android-30;default;x86_64"
avdmanager create avd -n Pixel_4_API_30 -k "system-images;android-30;default;x86_64"
```

**Por que?** Precisa de um dispositivo/emulador para executar os testes.

### Passo 3: Clonar e Configurar Projeto
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mobile-automation-wdio-appium.git
cd mobile-automation-wdio-appium

# Instale as dependências
npm install

# Verifique a instalação
npm list wdio
npm list appium
```

**Por que?** `npm install` baixa WebdriverIO, Appium client e outras dependências.

### Passo 4: Validar Ambiente
```bash
# Teste cada ferramenta
node --version
npm --version
java -version
adb version
adb devices                    # Deve estar vazio se nenhum device conectado
emulator -list-avds           # Verifica emuladores instalados
appium --version
allure --version
```

Se tudo mostrou versões, **parabéns! Ambiente está pronto.** ✅

---

## 📁 Estrutura do Projeto

```
mobile-automation-wdio-appium/
│
├── app/
│   └── android/
│       └── Android-NativeDemoApp-0.4.0.apk    # APK da aplicação
│
├── config/
│   └── wdio.shared.conf.js                    # Configurações comuns
│                                               # (pode ser estendida para web, iOS, etc)
│
├── test/
│   ├── data/
│   │   └── testData.json                      # Dados para data-driven tests
│   │                                           # Exemplo: múltiplos usuários, emails
│   │
│   ├── helpers/
│   │   ├── data.helper.js                     # Helper para carregar dados JSON
│   │   └── screenshot.helper.js               # Helper para gerenciar screenshots
│   │
│   ├── pageobjects/
│   │   ├── base.page.js                       # Classe base com métodos comuns
│   │   ├── home.page.js                       # Tela inicial
│   │   ├── login.page.js                      # Tela de login
│   │   ├── signup.page.js                     # Tela de cadastro
│   │   ├── forms.page.js                      # Tela de formulários
│   │   ├── swipe.page.js                      # Tela de gestos
│   │   └── webview.page.js                    # Tela com WebView
│   │
│   └── specs/
│       ├── login.spec.js                      # Testes de login (CT01-CT04)
│       ├── signup.spec.js                     # Testes de cadastro (CT05-CT07)
│       ├── forms.spec.js                      # Testes de formulários (CT08-CT10)
│       ├── navigation.spec.js                 # Testes de navegação (CT11-CT12)
│       ├── swipe.spec.js                      # Testes de swipe (CT13)
│       └── datadriven.spec.js                 # Testes parametrizados (CT14-CT16)
│
├── allure-results/                            # Resultado dos testes (gerado)
├── allure-report/                             # Relatório HTML (gerado)
├── screenshots/                               # Screenshots de erros (gerado)
│
├── wdio.conf.js                               # Configuração principal WebdriverIO
│                                               # Define browser, timeouts, reporters, hooks
│
├── Jenkinsfile                                # Pipeline CI/CD
│                                               # Define stages: checkout, deps, test, report
│
├── package.json                               # Dependências e scripts do projeto
├── package-lock.json                          # Lock file (garante reprodutibilidade)
├── .gitignore                                 # Arquivos/pastas não versionadas
├── README.md                                  # Este arquivo
└── LICENSE                                    # Licença do projeto
```

### Explicação de Arquivos Críticos

| Arquivo | Propósito | Iniciante | Senior |
|---------|-----------|-----------|--------|
| `wdio.conf.js` | Configuração central | Define que app testar, qual framework usar | Define timeouts, services, hooks avançados |
| `pageobjects/` | Implementação POM | Agrupa elementos de uma tela | Modularização, reutilização de código |
| `specs/` | Testes em si | Lógica dos testes | Estrutura de dados, padrões |
| `Jenkinsfile` | Pipeline automático | Como rodar testes na CI | Gerenciar agentes, artifacts, notificações |

---

## ▶️ Executando os Testes

### Pré-requisitos para Execução
```bash
# 1. Emulador deve estar rodando
emulator -avd Pixel_4_API_30 &

# 2. Appium deve estar rodando (em outro terminal)
appium

# 3. OU deixe o Jenkinsfile gerenciar isso automaticamente
```

### Executar Todos os Testes
```bash
npm test
```

**Saída esperada:**
```
    ✓ CT01: Login com credenciais válidas (1234ms)
    ✓ CT02: Erro com email inválido (567ms)
    ✓ CT03: Erro com senha vazia (456ms)
    ...
    
 40 passing (45s)
```

### Executar Testes Específicos
```bash
# Apenas testes de login
npx wdio run wdio.conf.js --spec=./test/specs/login.spec.js

# Apenas testes data-driven
npx wdio run wdio.conf.js --spec=./test/specs/datadriven.spec.js

# Com arquivo de configuração diferente
npx wdio run config/wdio.shared.conf.js
```

### Executar com Opções Avançadas
```bash
# Com logs detalhados (útil para debugging)
npx wdio run wdio.conf.js --logLevel=debug

# Modo suites (agrupa testes)
npx wdio run wdio.conf.js --suites=login

# Executar com bail (parar no primeiro erro)
npm test -- --bail
```

---

## 📊 Relatórios com Screenshots

### Gerar Relatório Allure
```bash
# Após executar os testes, gerar relatório
npx allure generate allure-results -o allure-report

# Ou usar script npm (recomendado)
npm run allure:generate
npm run allure:open
```

### O que o Relatório Mostra?

```
Allure Report
├── Dashboard
│   ├── Total: 40 testes
│   ├── Passed: 38 ✅
│   ├── Failed: 2 ❌
│   └── Skipped: 0
│
├── Detalhes de Cada Teste
│   ├── Nome do teste
│   ├── Tempo de execução
│   ├── Status (passou/falhou)
│   ├── Screenshots (se falhou)
│   ├── Logs completos
│   ├── Device info (Android 11, Pixel 4, etc)
│   └── Timestamps
│
├── Histórico
│   └── Comparação entre execuções (qual executou mais rápido, tendências)
│
└── Gráficos
    ├── Taxa de sucesso ao longo do tempo
    └── Distribuição por categoria
```

### Screenshots Automáticos

**Como funciona:**
1. Teste executa
2. Se **falhar**, screenshot é capturado automaticamente
3. Screenshot é **salvo** em `allure-results/`
4. Relatório Allure **mostra** a imagem ao lado do erro

**Exemplo de teste com screenshot:**
```javascript
it('CT02: Erro com email inválido', async () => {
    await LoginPage.login('invalid-email', 'password123');
    
    // Se falhar aqui ↓ screenshot é capturado automáticamente
    const error = await LoginPage.getErrorMessage();
    expect(error).to.include('Email inválido');
    // ↑ Confira Allure Report: verá tela como estava no erro
});
```

**Arquivos de screenshot:**
```
screenshots/
├── CT02-Email-inválido-2026-03-03T23-28-19.png
├── CT06-Senhas-não-conferem-2026-03-03T23-29-45.png
└── CT10-Dropdown-erro-2026-03-03T23-30-12.png

allure-results/
└── [Screenshots base64 embarcados nos XMLs]
```

---

## 🔄 CI/CD com Jenkins

### Por Que Jenkins?

- ✅ **Orquestração**: Execute testes automaticamente
- ✅ **Agendamento**: Rode testes em horários específicos
- ✅ **Webhooks**: Ride testes ao fazer push/PR no GitHub
- ✅ **Parallelização**: Execute múltiplos testes em paralelo (versões futuras)
- ✅ **Relatórios**: Integra Allure, exibe histórico, gráficos
- ✅ **Visibilidade**: Dashboard mostra status de builds

### Fluxo CI/CD

```
┌─────────────────────────────────────────────────────────┐
│ Dev faz commit e push para main                          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ GitHub Webhook notifica Jenkins                          │
│ (Ou Jenkins faz polling a cada 5 min)                   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 1: Checkout                               │
│ ├─ Clone repositório do GitHub                          │
│ └─ Checkout no commit/branch correto                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 2: Install Dependencies                   │
│ └─ npm ci (instala dependências do package-lock.json)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 3: Check Environment                      │
│ ├─ node --version, npm --version                        │
│ ├─ adb version, where emulator                          │
│ └─ ANDROID_HOME, JAVA_HOME configurados                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 4: Install Appium Driver                  │
│ └─ npx appium driver install uiautomator2 (ou update)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 5: Start Android Emulator                 │
│ ├─ emulator -avd Pixel_4_API_30 (background)            │
│ └─ Aguarda boot completo (adb shell getprop...)         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 6: Run Tests                              │
│ ├─ npm test (executa todas as suites)                   │
│ ├─ Se algum falhar, continua (UNSTABLE)                 │
│ └─ Gera allure-results/                                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Stage 7: Publish Report                         │
│ ├─ Plugins Allure converte XML em HTML                  │
│ ├─ Cria dashboard Allure Report                         │
│ └─ Armazena allure-results em artifacts                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ Jenkins Post Actions                                    │
│ ├─ adb emu kill (encerra emulador)                      │
│ ├─ cleanWs() (limpa workspace)                          │
│ └─ Echo status (sucesso/falha/instável)                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│ 📊 Relatório disponível                                 │
│ Jenkins > Build > Allure Report                         │
│ Histórico salvo em artifacts                            │
└─────────────────────────────────────────────────────────┘
```

### Configuração do Jenkins (Passo-a-Passo)

#### 1️⃣ Instalar Plugins
```
Jenkins > Manage Jenkins > Manage Plugins
Buscar e instalar:
  □ Pipeline
  □ Git
  □ Allure Plugin
  □ Email Extension Plugin (opcional)
Reiniciar Jenkins
```

#### 2️⃣ Configurar Allure no Jenkins
```
Jenkins > Manage Jenkins > Tools

Procure por "Allure Commandline":
  ├─ Name: allure
  ├─ Install automatically ✓ (detecta versão automática)
  └─ Save
```

#### 3️⃣ Criar Pipeline Job
```
Jenkins > New Item
  ├─ Name: mobile-automation-wdio-appium
  ├─ Type: Pipeline
  └─ Create

Configuration:
  ├─ General
  │   ├─ Description: Testes mobile WebdriverIO + Appium
  │   └─ Discard old builds: 30 dias / 50 builds
  │
  ├─ Build Triggers
  │   ├─ Poll SCM: H/5 * * * * (a cada 5 min)
  │   └─ GitHub hook trigger (se usar GitHub webhooks)
  │
  ├─ Pipeline
  │   ├─ Definition: Pipeline script from SCM
  │   ├─ SCM: Git
  │   ├─ Repository URL: https://github.com/seu-usuario/mobile-automation-wdio-appium.git
  │   ├─ Branch: */main
  │   ├─ Script Path: Jenkinsfile
  │   └─ Save
```

#### 4️⃣ Configurar Variáveis de Ambiente no Agente Jenkins
```powershell
# No agente Windows (onde Appium/Emulador rodarão)
# Editar C:\jenkins-agent\jenkins.xml (ou similar)

[System Environment Variables]:
  ANDROID_HOME=C:\Users\SeuUsuario\AppData\Local\Android\Sdk
  ANDROID_SDK_ROOT=C:\Users\SeuUsuario\AppData\Local\Android\Sdk
  JAVA_HOME=C:\Program Files\Java\jdk-11
  PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
```

#### 5️⃣ Testar Execução Manual
```
Jenkins > mobile-automation-wdio-appium > Build with Parameters
Preenchimento:
  ├─ AVD_NAME: Pixel_4_API_30
  └─ Build

Monitorar Console Output
```

**Esperado:**
```
[Pipeline] Start of Pipeline
[Pipeline] node
Running on windows-agent
[Pipeline] { (Checkout)
[Pipeline] echo
Clonando repositório...
[Pipeline] checkout
  > git fetch...
  > Cloning repository...

[Pipeline] stage
[Pipeline] { (Install Dependencies)
[Pipeline] echo
Instalando dependências...
[Pipeline] bat
  npm ci ✅

[Pipeline] stage
[Pipeline] { (Check Environment)
  node v18.0.0 ✅
  npm 9.0.0 ✅
  adb version 1.0.41 ✅
  
[Pipeline] stage
[Pipeline] { (Run Tests)
  ✓ CT01: Login válido (1234ms)
  ✓ CT02: Email inválido (567ms)
  ...
  40 passing ✅

[Pipeline] stage
[Pipeline] { (Publish Report)
  Allure Report generated ✅
```

#### 6️⃣ Verificar Relatório
```
Jenkins > mobile-automation-wdio-appium > [Última Build]
├─ Console Output (logs detalhados)
├─ Allure Report (clique aqui!)
│  ├─ Dashboard (40 passed, 0 failed)
│  ├─ Test Cases (lista de testes com prints)
│  ├─ History (gráfico de tendências)
│  └─ Screenshots (imagens de errors)
└─ Artifacts (allure-results.zip downloadável)
```

### Troubleshooting Jenkins

**Problema:** `Jenkinsfile not found`
```
Solução: Verifique se arquivo está em raiz: /Jenkinsfile (não /ci/Jenkinsfile)
```

**Problema:** `ANDROID_HOME not found`
```
Solução: Configure variável de ambiente no System do Windows ou no jenkins.xml
```

**Problema:** `emulator -avd failed` (timeout)
```
Solução: Aumente timeout em Jenkinsfile: sleep(300) em vez de sleep(60)
```

**Problema:** `adb: command not found`
```
Solução: PATH não inclui ANDROID_HOME/platform-tools. Configure em System Variables.
```

---

## 🧪 Cenários de Teste

### Estrutura de um Cenário

```javascript
// test/specs/login.spec.js
describe('CT01-CT04: Login Testing', () => {
    
    // Hooks (executam antes/depois de cada teste)
    beforeEach(async () => {
        // Setup: voltar à tela inicial antes de cada teste
        await HomePage.clickLoginButton();
    });
    
    afterEach(async () => {
        // Cleanup: se necessário
    });
    
    // Teste
    it('CT01: Login com credenciais válidas', async () => {
        // Arrange (preparar dados)
        const email = 'standard_user@example.com';
        const password = 'password';
        
        // Act (executar ação)
        await LoginPage.login(email, password);
        
        // Assert (validar resultado)
        const successMsg = await HomePage.getWelcomeMessage();
        expect(successMsg).to.include('Welcome');
        // Se falhar aqui ↓ screenshot é capturado
    });
});
```

### Todos os Cenários

#### 🔐 Login (CT01-CT04)
```javascript
it('CT01: Login com credenciais válidas', ...);
it('CT02: Erro com email inválido', ...);
it('CT03: Erro com senha vazia', ...);
it('CT04: Verificar elementos da tela de login', ...);
```

#### 📝 Sign Up (CT05-CT07)
```javascript
it('CT05: Cadastro com dados válidos', ...);
it('CT06: Erro quando senhas não conferem', ...);
it('CT07: Campo obrigatório não preenchido', ...);
```

#### 📋 Formulários (CT08-CT10)
```javascript
it('CT08: Preencher e validar input text', ...);
it('CT09: Toggle switch on/off', ...);
it('CT10: Seleção em dropdown', ...);
```

#### 🧭 Navegação (CT11-CT12)
```javascript
it('CT11: Navegar entre tabs', ...);
it('CT12: Retornar à tela Home', ...);
```

#### 👆 Gestos (CT13)
```javascript
it('CT13: Swipe horizontal', ...);
```

#### 🔄 Data-Driven (CT14-CT16)
```javascript
// Testes parametrizados com múltiplos datasets
testData.users.forEach((user) => {
    it(`CT14.${user.id}: Login com ${user.email}`, async () => {
        await LoginPage.login(user.email, user.password);
        // ... assertions
    });
});
```

---

## 🎨 Padrões e Boas Práticas

### 1. Page Object Model (POM)

**Por que usar POM?**
- ✅ **Manutenção**: Mudar elemento em um lugar, não em 100 testes
- ✅ **Legibilidade**: Testes leem como documentação
- ✅ **Reutilização**: Page objects são compartilhados

**Exemplo:**
```javascript
// pageobjects/login.page.js
class LoginPage extends BasePage {
    // 🔴 Elementos (selectores)
    get inputEmail() { return $('id=email'); }
    get inputPassword() { return $('id=password'); }
    get btnLogin() { return $('id=login-button'); }
    get txtError() { return $('id=error-message'); }
    
    // 🟢 Ações (methods)
    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
        await browser.waitUntil(async () => {
            // Aguarda um elemento aparecer ou desaparecer
        });
    }
    
    async getErrorMessage() {
        return await this.txtError.getText();
    }
}

// test/specs/login.spec.js
it('CT01: Login válido', async () => {
    await LoginPage.login('user@test.com', 'password');
    // Simples, legível, mantível ✅
});
```

### 2. Data-Driven Testing

**Por que usar data-driven?**
- ✅ **DRY Principle**: Não repete código para múltiplos dados
- ✅ **Cobertura**: Testa múltiplas variações
- ✅ **Manutenção**: Dados separados da lógica

**Exemplo:**
```javascript
// test/data/testData.json
{
  "users": [
    { "id": 1, "email": "user1@test.com", "password": "pass1", "valid": true },
    { "id": 2, "email": "user2@test.com", "password": "pass2", "valid": true },
    { "id": 3, "email": "invalid", "password": "pass", "valid": false }
  ]
}

// test/specs/datadriven.spec.js
const testData = require('../data/testData.json');

describe('CT14-CT16: Data-Driven Tests', () => {
    testData.users.forEach((user) => {
        it(`CT14.${user.id}: Login com ${user.email}`, async () => {
            await LoginPage.login(user.email, user.password);
            
            if (user.valid) {
                expect(await HomePage.isVisible()).to.be.true;
            } else {
                expect(await LoginPage.getErrorMessage()).to.exist;
            }
        });
    });
});
```

### 3. Waits Explícitos (Não sleep!)

**❌ Evitar:**
```javascript
// NUNCA FAÇA ISSO!
await browser.pause(5000); // Espera sempre 5 seg = testes lentos + flaky
```

**✅ Fazer:**
```javascript
// Aguarda até o elemento estar pronto (máx 30 seg)
await btnLogin.waitForDisplayed({ timeout: 30000 });

// Aguarda até uma condição ser verdadeira
await browser.waitUntil(async () => {
    const message = await successMsg.getText();
    return message.includes('Welcome');
}, { timeout: 30000 });
```

### 4. Assertions Robustas

**❌ Fraco:**
```javascript
expect(await element.getText()).to.equal('Welcome John'); // Quebra se houver espaço
```

**✅ Robusto:**
```javascript
const message = await element.getText();
expect(message).to.include('Welcome'); // Apenas verifica se contém a palavra

// Ou use regex
expect(message).to.match(/Welcome\s+\w+/);
```

### 5. Error Handling

**✅ Capturar erros graciosamente:**
```javascript
it('CT02: Lidar com elemento faltando', async () => {
    try {
        await element.$('id=nonexistent');
    } catch (err) {
        console.log('❌ Elemento não encontrado (esperado)');
        expect(err.message).to.include('not found');
    }
});
```

### 6. Documentação no Código

```javascript
/**
 * Realiza login na aplicação
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<void>}
 * @throws {Error} Se login falhar após 3 tentativas
 */
async login(email, password) {
    // ... implementação
}
```

---

## 🐛 Troubleshooting

### Problema: "ANDROID_HOME not found"

**Causa:** Variável de ambiente não configurada

**Solução:**

Windows (PowerShell como Admin):
```powershell
# Permanente (System)
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\SeuUsuario\AppData\Local\Android\Sdk", "Machine")

# Temporário (Current Session)
$env:ANDROID_HOME = "C:\Users\SeuUsuario\AppData\Local\Android\Sdk"

# Verifique
$env:ANDROID_HOME
```

### Problema: "emulator not found"

**Causa:** PATH não inclui emulator folder

**Solução:**
```powershell
# Adicione ao PATH
$env:PATH += ";C:\Users\SeuUsuario\AppData\Local\Android\Sdk\emulator"

# Ou configure via System Variables permanentemente
```

### Problema: "adb: no devices attached"

**Causa:** Nenhum device/emulador inicializado

**Solução:**
```bash
# Opção 1: Iniciar emulador
emulator -avd Pixel_4_API_30

# Opção 2: Reiniciar ADB
adb kill-server
adb start-server
adb devices

# Opção 3: Conectar device física via USB
adb connect 192.168.1.10:5555
```

### Problema: "Appium server not responding"

**Causa:** Appium não está rodando ou porta está ocupada

**Solução:**
```bash
# Iniciar Appium
appium

# Ou com porta customizada
appium --port 4723

# Verificar se porta está em uso (Windows)
netstat -ano | findstr :4723
# Se ocupada, matar processo
taskkill /PID <PID> /F
```

### Problema: "Tests timeout após 120s"

**Causa:** Timeout padrão muito curto para emulador lento

**Solução:** Aumentar timeout em `wdio.conf.js`
```javascript
exports.config = {
    waitforTimeout: 60000,           // Aumentar para 60s
    connectionRetryTimeout: 300000,  // Aumentar para 5min
    mochaOpts: {
        timeout: 120000  // Aumentar para 2min por teste
    }
};
```

### Problema: "npm ci fails - package-lock.json missing"

**Causa:** Package-lock.json não está no repo

**Solução:**
```bash
# Remover do .gitignore e committar
git rm --cached package-lock.json
git add package-lock.json
git add .gitignore
git commit -m "fix: adicionar package-lock.json"
```

---

## 📚 Recursos Adicionais

- **WebdriverIO Official**: https://webdriver.io/docs/mobile-testing
- **Appium Docs**: https://appium.io/docs/en/2.0/
- **Allure Report**: https://docs.qameta.io/allure/
- **JavaScript Testing**: https://mochajs.org/

---

## 🤝 Contribuindo

1. Crie uma **branch feature**: `git checkout -b feat/nova-feature`
2. Faça **commits descritivos**: `git commit -m "feat: adicionar CT17"`
3. Envie um **Pull Request** com descrição
4. Aguarde review

---

## 📝 Padrão de Commits

```
feat: adicionar novo cenário CT17
fix: corrigir seletor do elemento Login
docs: atualizar README com novo exemplo
refactor: melhorar performance de waits
test: adicionar testes para validação de email
ci: atualizar Jenkins pipeline
```

---

## 📄 Licença

MIT License - Livre para usar em projetos pessoais e comerciais.

---

## 📫 Contato & Suporte

- 📧 GitHub Issues: Para reportar bugs
- 🤝 Pull Requests: Para contribuições
- 📱 LinkedIn: Conecte-se para oportunidades

---

**Desenvolvido usando WebdriverIO + Appium + Jenkins**

**Última atualização:** Março, 2026
