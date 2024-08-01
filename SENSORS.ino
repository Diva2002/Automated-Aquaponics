#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11

#define PH_PIN1 26
#define PH_PIN2 27

// Network credentials
const char* ssid = "EACCESS";  // Replace with your network's SSID
const char* password = "hostelnet";  // Replace with your network's password

DHT dht(DHTPIN, DHTTYPE);

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  pinMode(PH_PIN1, INPUT);
  pinMode(PH_PIN2, INPUT);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Print the IP address
  Serial.println(WiFi.localIP());

  // Route to get sensor data
  server.on("/sensor", HTTP_GET, [](AsyncWebServerRequest *request){
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    
    int phValue1 = analogRead(PH_PIN1);
    int phValue2 = analogRead(PH_PIN2);

    if (isnan(temperature) || isnan(humidity)) {
      request->send(500, "application/json", "{\"error\":\"Failed to read from DHT sensor\"}");
      return;
    }

    // Prepare JSON response
    String jsonResponse = "{\"temperature\": " + String(temperature) + 
                          ", \"humidity\": " + String(humidity) + 
                          ", \"ph1\": " + String(phValue1) + 
                          ", \"ph2\": " + String(phValue2) + "}";

    request->send(200, "application/json", jsonResponse);
  });

  // Start server
  server.begin();
}

void loop() {
}
