pipeline {
    agent any

    options {
        timestamps()
    }

    parameters {
        string(name: 'AVD_NAME', defaultValue: 'Pixel_4_API_30', description: 'Nome do AVD Android para execução')
    }
    
    environment {
        ANDROID_HOME = "${env.ANDROID_HOME ?: env.ANDROID_SDK_ROOT ?: 'C:\\Users\\heloi\\AppData\\Local\\Android\\Sdk'}"
        ANDROID_SDK_ROOT = "${ANDROID_HOME}"
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
            }
        }
        
        stage('Install Appium Driver') {
            steps {
                echo 'Instalando Appium UiAutomator2 Driver...'
                bat 'npx appium driver install uiautomator2'
            }
        }
        
        stage('Start Android Emulator') {
            steps {
                echo 'Iniciando emulador Android...'
                script {
                    // Inicia o emulador em background
                    bat 'start "" /B "%ANDROID_HOME%\\emulator\\emulator.exe" -avd %AVD_NAME% -no-snapshot-load -no-audio -no-boot-anim'

                    // Aguarda boot completo do Android
                    bat '''powershell -NoProfile -Command "$boot=''; while ($boot -ne '1') { Start-Sleep -Seconds 5; $boot = (& adb shell getprop sys.boot_completed 2>$null).Trim() }; Write-Host 'Emulador pronto'"'''

                    // Verifica se o device está online
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
                        echo "Testes falharam, mas continuando para gerar relatório"
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
            
            // Encerra o emulador
            script {
                try {
                    bat 'adb emu kill'
                } catch (Exception e) {
                    echo "Emulador já estava encerrado"
                }
            }
            
            // Limpa workspace se necessário
            cleanWs()
        }
        
        success {
            echo 'Testes executados com sucesso!'
        }
        
        failure {
            echo 'Pipeline falhou!'
        }
        
        unstable {
            echo 'Build instável - alguns testes falharam'
        }
    }
}
