# Mobile Automation - WebdriverIO + Appium

Projeto de automação de testes mobile utilizando WebdriverIO, Appium e Mocha para o aplicativo **Native Demo App** do WebdriverIO.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Executando os Testes](#executando-os-testes)
- [Relatórios](#relatórios)
- [CI/CD com Jenkins](#cicd-com-jenkins)
- [Cenários de Teste](#cenários-de-teste)

## 🎯 Sobre o Projeto

Este projeto implementa automação de testes mobile com 10+ cenários de teste cobrindo:
- ✅ Login e Cadastro de usuários
- ✅ Navegação entre telas
- ✅ Preenchimento de formulários
- ✅ Verificação de mensagens de erro
- ✅ Testes data-driven com múltiplos conjuntos de dados
- ✅ Gestos (swipe)

## 🛠 Tecnologias Utilizadas

- **Linguagem**: JavaScript/Node.js
- **Framework de Testes**: WebdriverIO v8
- **Biblioteca de Automação**: Appium v2
- **Test Runner**: Mocha
- **Assertions**: Chai
- **Relatórios**: Allure Report
- **CI/CD**: Jenkins
- **Controle de Versão**: Git/GitHub

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js e npm
```bash
# Verificar instalação
node --version  # v16 ou superior
npm --version   # v8 ou superior
```

### 2. Java JDK
```bash
# Verificar instalação
java -version  # Java 11 ou superior
```

### 3. Android Studio e Android SDK

1. Baixe e instale o [Android Studio](https://developer.android.com/studio)
2. Configure as variáveis de ambiente:

```bash
# Windows (adicione ao PATH do sistema)
ANDROID_HOME=C:\Users\SeuUsuario\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-11
```

### 4. Appium
```bash
npm install -g appium
appium driver install uiautomator2
```

### 5. Allure (para relatórios)
```bash
npm install -g allure-commandline
```

### 6. Baixar o APK do Native Demo App

Baixe o APK da aplicação de teste:
- Acesse: https://github.com/webdriverio/native-demo-app/releases
- Baixe o arquivo: `Android-NativeDemoApp-0.4.0.apk`
- Crie a pasta `app/android` na raiz do projeto
- Mova o APK para: `app/android/Android-NativeDemoApp-0.4.0.apk`

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/mobile-automation-wdio-appium.git
cd mobile-automation-wdio-appium
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o emulador Android

#### Criar um emulador via Android Studio:
1. Abra o Android Studio
2. Vá em **Tools > Device Manager**
3. Clique em **Create Device**
4. Escolha um dispositivo (ex: Pixel 4)
5. Selecione uma imagem do sistema (ex: API 30 - Android 11)
6. Finalize a criação

#### Iniciar o emulador via linha de comando:
```bash
# Listar emuladores disponíveis
emulator -list-avds

# Iniciar emulador
emulator -avd Pixel_4_API_30
```

#### Verificar se o device está conectado:
```bash
adb devices
```

### 4. Ajuste a configuração do projeto

Edite o arquivo [wdio.conf.js](wdio.conf.js) se necessário:
- `platformVersion`: Ajuste para a versão do Android do seu emulador
- `deviceName`: Nome do dispositivo
- `app`: Caminho para o APK

## 📁 Estrutura do Projeto

```
mobile-automation-wdio-appium/
│
├── app/
│   └── android/
│       └── Android-NativeDemoApp-0.4.0.apk
│
├── config/
│   └── wdio.shared.conf.js          # Configurações compartilhadas
│
├── test/
│   ├── data/
│   │   └── testData.json            # Dados para testes data-driven
│   │
│   ├── helpers/
│   │   ├── data.helper.js           # Helper para carregar dados
│   │   └── screenshot.helper.js    # Helper para screenshots
│   │
│   ├── pageobjects/
│   │   ├── base.page.js             # Base Page Object
│   │   ├── login.page.js            # Login Page Object
│   │   ├── signup.page.js           # Sign Up Page Object
│   │   ├── forms.page.js            # Forms Page Object
│   │   ├── swipe.page.js            # Swipe Page Object
│   │   ├── home.page.js             # Home Page Object
│   │   └── webview.page.js          # WebView Page Object
│   │
│   └── specs/
│       ├── login.spec.js            # Testes de Login (CT01-CT04)
│       ├── signup.spec.js           # Testes de Cadastro (CT05-CT07)
│       ├── forms.spec.js            # Testes de Formulários (CT08-CT10)
│       ├── navigation.spec.js       # Testes de Navegação (CT11-CT12)
│       ├── swipe.spec.js            # Testes de Gestos (CT13)
│       └── datadriven.spec.js       # Testes Data-Driven (CT14-CT16)
│
├── wdio.conf.js                     # Configuração principal do WebdriverIO
├── Jenkinsfile                      # Pipeline CI/CD Jenkins
├── package.json                     # Dependências do projeto
├── .gitignore                       # Arquivos ignorados pelo Git
└── README.md                        # Documentação do projeto
```

## ▶️ Executando os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes específicos
```bash
# Apenas testes de login
npx wdio run wdio.conf.js --spec=./test/specs/login.spec.js

# Apenas testes de formulários
npx wdio run wdio.conf.js --spec=./test/specs/forms.spec.js
```

### Executar com diferentes níveis de log
```bash
# Com logs detalhados
npx wdio run wdio.conf.js --logLevel=debug
```

## 📊 Relatórios

### Allure Report

O projeto está configurado para gerar relatórios detalhados com Allure Report.

#### Gerar e visualizar relatório:
```bash
# Após executar os testes, gerar o relatório
npm run allure:generate

# Abrir o relatório no navegador
npm run allure:open

# Ou executar ambos de uma vez
npm run allure:report
```

#### O relatório Allure contém:
- ✅ **Resumo dos testes**: Total executado, passou, falhou
- ✅ **Screenshots**: Capturas automáticas em caso de falha
- ✅ **Logs de execução**: Detalhes de cada passo
- ✅ **Informações do ambiente**: Device, plataforma, versão
- ✅ **Histórico**: Comparação entre execuções
- ✅ **Gráficos**: Visualização de tendências

### Screenshots

Screenshots são capturados automaticamente quando:
- Um teste falha
- Através de chamadas explícitas no código

Os screenshots ficam salvos em:
- `allure-results/` (para o relatório Allure)
- `screenshots/` (se salvos manualmente)

## 🔄 CI/CD com Jenkins

### Pré-requisitos no Jenkins

1. **Plugins necessários**:
   - Pipeline
   - Git
   - Allure
   - Email Extension

2. **Configurar Jenkins**:

```groovy
// Configure as variáveis de ambiente no Jenkins:
ANDROID_HOME=/path/to/android/sdk
JAVA_HOME=/path/to/java/jdk
```

### Configurar o Job no Jenkins

1. Crie um novo **Pipeline Job**
2. Configure o repositório Git
3. Aponte para o `Jenkinsfile` na raiz do projeto
4. Configure triggers:
   - **Poll SCM**: `H/5 * * * *` (verifica mudanças a cada 5 minutos)
   - **GitHub webhook**: Para execução imediata após commit/PR

### Pipeline Stages

O pipeline executa as seguintes etapas:

1. **Checkout**: Clona o repositório
2. **Install Dependencies**: Instala dependências npm
3. **Install Appium Driver**: Instala driver UiAutomator2
4. **Check Android Emulator**: Verifica emuladores disponíveis
5. **Start Android Emulator**: Inicia o emulador
6. **Run Tests**: Executa os testes
7. **Generate Allure Report**: Gera relatório Allure
8. **Publish Report**: Publica relatório no Jenkins

### Notificações

O pipeline envia notificações por email em caso de:
- ✅ Sucesso
- ❌ Falha
- ⚠️ Build instável (alguns testes falharam)

Configure o email no [Jenkinsfile](Jenkinsfile#L112).

## 🧪 Cenários de Teste

### Login (4 cenários)
- **CT01**: Login com credenciais válidas
- **CT02**: Erro com email inválido
- **CT03**: Erro com senha vazia
- **CT04**: Verificação de elementos da tela

### Sign Up (3 cenários)
- **CT05**: Cadastro com dados válidos
- **CT06**: Erro quando senhas não conferem
- **CT07**: Verificação de campos obrigatórios

### Formulários (3 cenários)
- **CT08**: Preenchimento de campo de texto
- **CT09**: Alternar switch
- **CT10**: Seleção em dropdown

### Navegação (2 cenários)
- **CT11**: Navegação entre abas
- **CT12**: Retorno à tela Home

### Gestos (1 cenário)
- **CT13**: Swipe horizontal

### Data-Driven (múltiplos cenários)
- **CT14.x**: Login com múltiplos usuários
- **CT15.x**: Validação de emails inválidos
- **CT16.x**: Preenchimento com múltiplos valores

## 🎨 Padrões Utilizados

### Page Object Model (POM)

Todos os elementos e ações das telas estão encapsulados em Page Objects:

```javascript
// Exemplo de uso
const LoginPage = require('../pageobjects/login.page');

await LoginPage.login('user@test.com', 'password123');
const message = await LoginPage.getAlertMessage();
```

### Data-Driven Testing

Testes parametrizados usando arquivos JSON:

```javascript
// test/data/testData.json contém os dados
testData.validUsers.forEach((user) => {
    it(`Login com ${user.email}`, async () => {
        await LoginPage.login(user.email, user.password);
    });
});
```

## 🐛 Troubleshooting

### Problema: Emulador não inicia
```bash
# Solução 1: Verificar se há emuladores disponíveis
emulator -list-avds

# Solução 2: Criar um novo emulador via Android Studio
```

### Problema: ADB não encontrado
```bash
# Solução: Adicionar ao PATH
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Problema: Appium não conecta ao device
```bash
# Solução: Reiniciar ADB server
adb kill-server
adb start-server
adb devices
```

### Problema: Testes lentos
```bash
# Solução: Ajustar timeouts no wdio.conf.js
waitforTimeout: 5000,        # Reduzir de 10000
connectionRetryTimeout: 60000 # Reduzir de 120000
```

## 📝 Melhores Práticas

1. **Sempre use Page Objects**: Não acesse elementos diretamente nos testes
2. **Mantenha os testes independentes**: Cada teste deve ser executável isoladamente
3. **Use data-driven para cenários repetitivos**: Evite duplicação de código
4. **Capture screenshots em falhas**: Facilita debugging
5. **Mantenha os testes pequenos e focados**: Um teste = uma funcionalidade
6. **Use waits explícitos**: Evite `pause()` ou sleeps fixos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub.

---

**Desenvolvido com ❤️ usando WebdriverIO + Appium**
