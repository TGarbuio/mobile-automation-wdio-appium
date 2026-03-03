pipeline {
    agent any
    
    environment {
        ANDROID_HOME = "${env.ANDROID_HOME}"
        JAVA_HOME = "${env.JAVA_HOME}"
        PATH = "${env.PATH}:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools"
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
                bat 'npm install'
            }
        }
        
        stage('Install Appium Driver') {
            steps {
                echo 'Instalando Appium UiAutomator2 Driver...'
                bat 'npx appium driver install uiautomator2'
            }
        }
        
        stage('Check Android Emulator') {
            steps {
                echo 'Verificando emuladores Android disponíveis...'
                bat 'emulator -list-avds'
            }
        }
        
        stage('Start Android Emulator') {
            steps {
                echo 'Iniciando emulador Android...'
                script {
                    // Inicia o emulador em background
                    bat 'start /B emulator -avd Pixel_4_API_30 -no-snapshot-load -no-audio -no-boot-anim'
                    
                    // Aguarda o emulador estar pronto
                    echo 'Aguardando emulador inicializar...'
                    sleep(time: 60, unit: 'SECONDS')
                    
                    // Verifica se o device está online
                    bat 'adb wait-for-device'
                    bat 'adb devices'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Executando testes de automação...'
                script {
                    try {
                        bat 'npm run test'
                    } catch (Exception e) {
                        echo "Testes falharam, mas continuando para gerar relatório"
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('Generate Allure Report') {
            steps {
                echo 'Gerando relatório Allure...'
                script {
                    try {
                        bat 'npm run allure:generate'
                    } catch (Exception e) {
                        echo "Erro ao gerar relatório Allure: ${e.message}"
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
            
            // Encerra o emulador
            script {
                try {
                    bat 'adb -s emulator-5554 emu kill'
                } catch (Exception e) {
                    echo "Emulador já estava encerrado"
                }
            }
            
            // Limpa workspace se necessário
            cleanWs()
        }
        
        success {
            echo 'Testes executados com sucesso!'
            emailext (
                subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: """
                    <p>Build executado com sucesso!</p>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Build URL:</b> ${env.BUILD_URL}</p>
                    <p>Confira o relatório Allure para detalhes dos testes.</p>
                """,
                to: 'team@example.com',
                mimeType: 'text/html'
            )
        }
        
        failure {
            echo 'Pipeline falhou!'
            emailext (
                subject: "Jenkins Build FAILED: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: """
                    <p>Build falhou!</p>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Build URL:</b> ${env.BUILD_URL}</p>
                    <p>Verifique os logs para mais detalhes.</p>
                """,
                to: 'team@example.com',
                mimeType: 'text/html'
            )
        }
        
        unstable {
            echo 'Build instável - alguns testes falharam'
            emailext (
                subject: "Jenkins Build UNSTABLE: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: """
                    <p>Build instável - alguns testes falharam.</p>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Build URL:</b> ${env.BUILD_URL}</p>
                    <p>Confira o relatório Allure para detalhes dos testes.</p>
                """,
                to: 'team@example.com',
                mimeType: 'text/html'
            )
        }
    }
}
