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
                bat 'rm -rf out/cache/'
                bat 'cp -r out/static out/server/app'
                bat 'cp public/* out/server/app'
                bat 'tar -czvf out.tar.gz -C out .'
            }

            stage('Deploy to DigitalOcean') {
                bat 'scp out.tar.gz donotdont@blog.common-services.com:/home/donotdont/blog8next14cicd'
                bat 'bash -c "ssh -t donotdont@blog.common-services.com \'cd blog8next14cicd;tar -xzvf out.tar.gz;exit;\'"'
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
