#!groovy

node {
    try {
            agent { docker { image 'node:20.14.0-alpine3.20' } }
            stage('Checkout GitHub') {
                checkout scm
                slackSend color: 'warning', message: "Started `${env.JOB_NAME}#${env.BUILD_NUMBER}`"
            }

            stage('Install module NPM') {
                bat 'node --version'
                bat 'npm install'
            }

            stage('Test by Jest') {
                bat 'npm run test'
            }
    }catch (err) {
        slackSend color: 'danger', message: "Build failed : face_with_head_bandage: \n`${env.JOB_NAME}#${env.BUILD_NUMBER}`"
        throw err
    }

    try {
        stage('Build by NextJS') {
            bat 'npm run build'
        }
    } catch (err) {
        slackSend color: 'warning', message: "`${env.JOB_NAME}` - Build # `${env.BUILD_NUMBER}` - FAILURE (`${err.message}`)!"
        //throw e // rethrow so the build is considered failed
        //echo e // rethrow so the build is considered failed
    }

    try {
            stage('Package gz') {
                bat 'tar -czvf out.tar.gz -C out .'
            }

            stage('Deploy to DigitalOcean') {
                bat 'scp out.tar.gz donotdont@178.62.235.240:/home/donotdont/blog8next14cicd'
                bat 'bash -c "ssh -t donotdont@178.62.235.240 \'cd blog8next14cicd;tar -xzvf out.tar.gz;exit;\'"'
            }

            stage('Publish results') {
                slackSend color: 'good', message: "Build successful: `${env.JOB_NAME}#${env.BUILD_NUMBER}` <${env.BUILD_URL}>"
            }
    }
    catch (err) {
            slackSend color: 'danger', message: "Build failed : face_with_head_bandage: \n`${env.JOB_NAME}#${env.BUILD_NUMBER}`"
            throw err
    }
}
