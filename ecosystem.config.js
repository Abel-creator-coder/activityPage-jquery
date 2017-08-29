module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'server',
            script: './server.js',
            watch: true,
            cwd: './',
            env: {
                // NODE_ENV: 'development',
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'root',
            host: '113.209.11.221',
            port: "5674",
            ref: 'origin/master',
            repo: 'git@github.com:lzq2016/test.git',
            path: '/var/local/server/www',
            'post-deploy': 'pm2 reload ecosystem.config.js --env production'
        }
        // dev: {
        //     user: 'node',
        //     host: '212.83.163.1',
        //     ref: 'origin/master',
        //     repo: 'git@github.com:repo.git',
        //     path: '/var/www/development',
        //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
        //     env: {
        //         NODE_ENV: 'dev'
        //     }
        // }
    }
};
