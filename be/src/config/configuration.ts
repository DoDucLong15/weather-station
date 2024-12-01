export const configuration = () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) || 8080 : 8080,
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
    ssl_ca_file: process.env.POSTGRES_CA_FILE ?? '',
  },
  mqtt: {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_SUBSCRIBE_USERNAME,
    password: process.env.MQTT_SUBSCRIBE_PASSWORD
  }
});
