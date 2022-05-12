namespace NodeJS {
    interface ProcessEnv {
        POSTGRES_HOST: string
        POSTGRES_DB: string
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        POSTGRES_TEST_DB: string
        POSTGRES_TEST_USER: string
        POSTGRES_TEST_PASSWORD: string
        ENV: string | 'dev'
        BCRYPT_PASSWORD: string
        SALT_ROUND: string
        JWT_SECRET: string

    }

}