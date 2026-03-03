# Configuração do Jenkins para o Projeto

Este guia explica como configurar o Jenkins para executar os testes automaticamente.

## 📋 Pré-requisitos no Jenkins

### 1. Plugins Necessários

Instale os seguintes plugins no Jenkins:

1. **Pipeline** - Para executar Jenkinsfiles
2. **Git Plugin** - Para integração com GitHub
3. **Allure Jenkins Plugin** - Para relatórios Allure
4. **Email Extension Plugin** - Para notificações por email
5. **Android Emulator Plugin** (opcional) - Para gerenciar emuladores

Para instalar:
- Jenkins Dashboard → Manage Jenkins → Manage Plugins → Available
- Busque e instale cada plugin
- Reinicie o Jenkins após instalação

### 2. Configurar Ferramentas Globais

Jenkins Dashboard → Manage Jenkins → Global Tool Configuration:

#### Node.js
```
Name: NodeJS
Install automatically: ✓
Version: NodeJS 16.x ou superior
```

#### Java (JDK)
```
Name: JDK-11
JAVA_HOME: C:\Program Files\Java\jdk-11
```

#### Allure
```
Name: Allure
Install automatically: ✓
Version: 2.27.0
```

### 3. Configurar Variáveis de Ambiente

Jenkins Dashboard → Manage Jenkins → Configure System → Global properties

Marque "Environment variables" e adicione:

```
ANDROID_HOME = C:\Users\Jenkins\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-11
```

## 🔧 Criar Job no Jenkins

### Opção 1: Pipeline Job (Recomendado)

1. **Criar Novo Job**
   - Dashboard → New Item
   - Nome: `mobile-automation-tests`
   - Tipo: Pipeline
   - OK

2. **Configurar Pipeline**
   
   **General:**
   - Description: "Automação de testes mobile com WebdriverIO e Appium"
   - ✓ GitHub project: `https://github.com/seu-usuario/mobile-automation-wdio-appium`

   **Build Triggers:**
   - ✓ Poll SCM: `H/5 * * * *` (verifica a cada 5 minutos)
   - ✓ GitHub hook trigger for GITScm polling (para webhooks)

   **Pipeline:**
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: `https://github.com/seu-usuario/mobile-automation-wdio-appium.git`
   - Credentials: Adicione suas credenciais GitHub
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`

3. **Salvar**

### Opção 2: Freestyle Project

1. **Criar Novo Job**
   - Dashboard → New Item
   - Nome: `mobile-automation-tests`
   - Tipo: Freestyle project

2. **Source Code Management**
   - ✓ Git
   - Repository URL: `https://github.com/seu-usuario/mobile-automation-wdio-appium.git`
   - Credentials: Suas credenciais
   - Branch: `*/main`

3. **Build Triggers**
   - ✓ Poll SCM: `H/5 * * * *`

4. **Build Environment**
   - ✓ Provide Node & npm bin/ folder to PATH

5. **Build Steps**

   Adicionar → Execute Windows batch command:
   ```batch
   npm install
   npx appium driver install uiautomator2
   npm test
   ```

6. **Post-build Actions**
   - Adicionar → Allure Report
     - Path: `allure-results`

## 🔗 Configurar GitHub Webhook

Para execução automática ao fazer push/PR:

### No GitHub:

1. Vá ao seu repositório
2. Settings → Webhooks → Add webhook
3. Payload URL: `http://seu-jenkins-url/github-webhook/`
4. Content type: `application/json`
5. Trigger: ✓ Just the push event
6. Active: ✓
7. Add webhook

### No Jenkins:

Certifique-se de que o plugin "GitHub Plugin" está instalado e o job tem:
- ✓ GitHub hook trigger for GITScm polling

## 📧 Configurar Notificações por Email

### 1. Configurar SMTP no Jenkins

Jenkins Dashboard → Manage Jenkins → Configure System:

**Extended E-mail Notification:**
```
SMTP server: smtp.gmail.com
SMTP port: 587
Credentials: Adicionar credenciais do email
Use SSL: ✗
Use TLS: ✓
```

**E-mail Notification:**
```
SMTP server: smtp.gmail.com
Default user e-mail suffix: @gmail.com
Use SMTP Authentication: ✓
User Name: seu-email@gmail.com
Password: sua-senha-app
Use SSL: ✓
SMTP Port: 465
```

### 2. Ajustar Jenkinsfile

Edite as linhas de email no [Jenkinsfile](Jenkinsfile):

```groovy
emailext (
    to: 'seu-email@example.com',  // ← Altere aqui
    ...
)
```

## 🤖 Configurar Emulador Android no Jenkins

### Opção 1: Emulador Persistente

Mantenha um emulador sempre rodando:

```batch
# Script para manter emulador ativo
start /B emulator -avd Pixel_4_API_30 -no-snapshot-load
```

### Opção 2: Android Emulator Plugin

1. Instale o plugin "Android Emulator Plugin"
2. Configure no job:
   - Build Environment → ✓ Run an Android emulator during build
   - AVD name: `Pixel_4_API_30`
   - OS version: Android 11.0 (API 30)

## 📊 Visualizar Relatórios Allure

Após executar o job:

1. Entre no build
2. Clique em "Allure Report" no menu lateral
3. Visualize:
   - Overview: Resumo geral
   - Categories: Tipos de falha
   - Suites: Agrupamento de testes
   - Graphs: Gráficos de tendência
   - Timeline: Linha do tempo de execução

## 🎯 Exemplo de Configuração Completa

### Jenkinsfile Simplificado

Se precisar de uma versão mais simples do Jenkinsfile:

```groovy
pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/seu-usuario/mobile-automation-wdio-appium.git'
            }
        }
        
        stage('Install') {
            steps {
                bat 'npm install'
                bat 'npx appium driver install uiautomator2'
            }
        }
        
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        
        stage('Report') {
            steps {
                allure includeProperties: false,
                       jdk: '',
                       results: [[path: 'allure-results']]
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```

## 🔍 Troubleshooting

### Problema: Jenkins não encontra o Android SDK

**Solução:**
```groovy
// No Jenkinsfile, adicione:
environment {
    ANDROID_HOME = 'C:\\Users\\Jenkins\\AppData\\Local\\Android\\Sdk'
}
```

### Problema: Emulador não inicia

**Solução:**
- Use um emulador x86 (mais rápido)
- Aumente o timeout de inicialização
- Considere usar dispositivos reais conectados via USB

### Problema: Testes falhando no Jenkins mas passando localmente

**Solução:**
- Verifique timeouts
- Aumente waits nos testes
- Verifique recursos do servidor Jenkins (RAM, CPU)

### Problema: Allure Report não aparece

**Solução:**
1. Verifique se o plugin Allure está instalado
2. Confirme que `allure-results` foi gerado
3. Configure corretamente o caminho no post-build

## 📚 Recursos Adicionais

- [Documentação Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [Allure Jenkins Plugin](https://docs.qameta.io/allure/#_jenkins)
- [GitHub Webhooks](https://docs.github.com/en/webhooks)

## 💡 Dicas

1. **Paralelização**: Para executar testes mais rápido, configure múltiplos executores
2. **Artefatos**: Salve screenshots e logs como artefatos do build
3. **Histórico**: Configure retenção de builds (ex: últimos 30 builds)
4. **Credentials**: Use o Jenkins Credentials Manager para senhas
5. **Backup**: Faça backup regular da configuração do Jenkins

---

**Configuração concluída!** 🎉

Agora seu pipeline CI/CD está pronto para executar testes automaticamente.
