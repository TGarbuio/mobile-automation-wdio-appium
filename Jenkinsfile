pipeline {
  agent { label 'windows' }

  options { timestamps() }

  parameters {
    string(name: 'AVD_NAME', defaultValue: 'Pixel_4_API_30', description: 'Nome do AVD Android para execução')
  }

  environment {
    // Defina APENAS 1 base, sem loop entre vars
    ANDROID_HOME = 'C:\\Users\\heloi\\AppData\\Local\\Android\\Sdk'
    JAVA_HOME = "${env.JAVA_HOME}"
    PATH = "${env.PATH};${ANDROID_HOME}\\platform-tools;${ANDROID_HOME}\\emulator;${ANDROID_HOME}\\cmdline-tools\\latest\\bin"
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Clonando repositório...'
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Instalando dependências do projeto...'
        bat 'npm ci'
      }
    }

    stage('Check Environment') {
      steps {
        echo 'Validando ambiente Android/Node...'
        bat 'node --version'
        bat 'npm --version'
        bat 'echo ANDROID_HOME=%ANDROID_HOME%'
        bat 'where adb'
        bat 'where emulator'
        bat 'adb version'
      }
    }
    
    stage('Install Appium Driver') {
      steps {
        echo 'Garantindo Appium UiAutomator2 Driver...'
        script {
        // tenta instalar; se já existir, faz update
            bat 'npx appium driver install uiautomator2 || npx appium driver update uiautomator2'
            bat 'npx appium driver list --installed'
            }
        }
    }

    stage('Start Android Emulator') {
      steps {
        echo 'Iniciando emulador Android...'
        script {
          bat 'start "" /B "%ANDROID_HOME%\\emulator\\emulator.exe" -avd %AVD_NAME% -no-snapshot-load -no-audio -no-boot-anim'
          bat '''powershell -NoProfile -Command "while ((adb shell getprop sys.boot_completed 2>$null).Trim() -ne '1') { Start-Sleep -Seconds 5 }; Write-Host 'Emulador pronto'"'''
          bat 'adb devices'
        }
      }
    }

    stage('Run Tests') {
      steps {
        echo 'Executando testes de automação...'
        script {
          try {
            bat 'npm test'
          } catch (Exception e) {
            echo 'Testes falharam, mas continuando para gerar relatório'
            currentBuild.result = 'UNSTABLE'
          }
        }
      }
    }

    stage('Publish Report') {
      steps {
        echo 'Publicando relatório...'
        allure([
          includeProperties: false,
          jdk: '',
          properties: [],
          reportBuildPolicy: 'ALWAYS',
          results: [[path: 'allure-results']]
        ])
      }
    }
  }

  post {
    always {
      echo 'Pipeline finalizado'
      archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true

      script {
        try { bat 'adb emu kill' } catch (Exception e) { echo 'Emulador já estava encerrado' }
      }

      cleanWs()
    }

    success { echo 'Testes executados com sucesso!' }
    failure { echo 'Pipeline falhou!' }
    unstable { echo 'Build instável - alguns testes falharam' }
  }
}
