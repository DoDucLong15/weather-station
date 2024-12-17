#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <RTClib.h>

const char* embedId = "1fe78b11-37d2-4d03-a1b0-b70ab2219e6c";

// Replace with your WiFi credentials and MQTT broker details
const char* ssid = "Duc Long";
const char* password = "0378334905";
const char* mqtt_server = "192.168.1.8";
const char *topic = "ddlong07/iot/weather";
const int mqtt_port = 1883;

// Define sensor pins and variables
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

RTC_DS1307 rtc;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Initialize serial, WiFi, MQTT, sensors
  Serial.begin(921600);
  Serial.println("Beginning Weather Station!");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  client.setServer(mqtt_server, mqtt_port);
  dht.begin();
  if (! rtc.begin()) {
    Serial.println("RTC module is NOT found");
    while (1);
  }
  rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
}

void loop() {
  // Connect to WiFi and MQTT broker
  if(reconnect()) {
    client.loop();
    // Send data
    sendSensor();
  }
  delay(5000); // Delay between readings
}

bool reconnect() {
  Serial.println("Connecting to MQTT... ");
  uint8_t retry = 3;
  while (!client.connected() && retry > 0) {
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    client_id += String(random(0xffff), HEX);
    Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
    if (client.connect(client_id.c_str())) {
      Serial.println("Public hivemq mqtt broker connected");
    } else {
      Serial.println("Failed with state ");
      Serial.println(client.state());
      delay(2000);
    }
    retry--;
    if(retry == 0) {
      return false;
    }
  }
  return true;
}

void sendSensor() // function to read sensor values and send them to Blynk
{
  Serial.println("Start send data to MQTT... ");
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  if (isnan(humidity) || isnan(temperature)) 
  {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  Serial.println("Success to read from DHT sensor!");
  // Publish sensor data to MQTT topics
  DateTime now = rtc.now();
  String time = formatTwoDigits(now.year()) + "-" 
                 + formatTwoDigits(now.month()) + "-" + formatTwoDigits(now.day()) + " "
                 + formatTwoDigits(now.hour()) + ":" + formatTwoDigits(now.minute()) + ":" 
                 + formatTwoDigits(now.second());
  String message = "\{\"temperature\": " + String(temperature) 
                  + ", \"humidity\": " + String(humidity)
                  + ", \"time\": \"" + time + "\""
                  + ", \"embedId\": \"" + embedId + "\"}";
  char buffer[message.length() + 1];
  message.toCharArray(buffer, message.length() + 1);
  client.publish(topic, buffer);

  Serial.println("Finish send data to MQTT... ");
}

String formatTwoDigits(int number) {
  return number < 10 ? "0" + String(number) : String(number);
}