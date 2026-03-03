# Guia Rápido de Início

## 📱 Setup Inicial

### 1. Instalar dependências globais
```bash
# Node.js (v16+)
# Download: https://nodejs.org/

# Java JDK 11+
# Download: https://www.oracle.com/java/technologies/downloads/

# Android Studio
# Download: https://developer.android.com/studio

# Appium
npm install -g appium

# Appium UiAutomator2 Driver
appium driver install uiautomator2

# Allure
npm install -g allure-commandline
```

### 2. Configurar variáveis de ambiente (Windows)

Adicione ao PATH do sistema:
```
ANDROID_HOME=C:\Users\SeuUsuario\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-11

PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

### 3. Clonar e instalar o projeto
```bash
git clone https://github.com/seu-usuario/mobile-automation-wdio-appium.git
cd mobile-automation-wdio-appium
npm install
```

### 4. Baixar o APK
- Baixe de: https://github.com/webdriverio/native-demo-app/releases
- Arquivo: `Android-NativeDemoApp-0.4.0.apk`
- Coloque em: `app/android/`

### 5. Criar e iniciar emulador Android

Via Android Studio:
1. Tools > Device Manager
2. Create Device
3. Escolha: Pixel 4
4. API Level: 30 (Android 11)

Via linha de comando:
```bash
# Listar emuladores
emulator -list-avds

# Iniciar emulador
emulator -avd Pixel_4_API_30
```

Verificar conexão:
```bash
adb devices
```

### 6. Executar os testes
```bash
npm test
```

### 7. Visualizar relatório
```bash
npm run allure:report
```

## ⚡ Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm test` | Executa todos os testes |
| `npm run allure:generate` | Gera relatório Allure |
| `npm run allure:open` | Abre relatório Allure |
| `adb devices` | Lista devices conectados |
| `adb logcat` | Visualiza logs do Android |
| `appium` | Inicia servidor Appium manualmente |

## 🔍 Verificação Rápida

Execute estes comandos para verificar se tudo está instalado:

```bash
node --version       # v16+
npm --version        # v8+
java -version        # Java 11+
adb version          # Android Debug Bridge
appium --version     # Appium 2.x
allure --version     # Allure 2.x
```

## 🆘 Problemas Comuns

### Emulador não inicia
```bash
# Verificar emuladores disponíveis
emulator -list-avds

# Se nenhum aparecer, crie via Android Studio
```

### ADB não encontrado
```bash
# Adicione ao PATH:
%ANDROID_HOME%\platform-tools
```

### Appium não conecta
```bash
# Reiniciar ADB
adb kill-server
adb start-server
```

## 📚 Documentação Completa

Consulte o [README.md](README.md) principal para documentação detalhada.
