#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DHT.h>
#include <Ticker.h>

#define DHTPIN 4
#define DHTTYPE DHT11

#define PH_AN_PIN 33  // Analog input pin of the pH sensor

// Network credentials
const char* ssid = "AndroidAP";  // Replace with your network's SSID
const char* password = "xbag0491";  // Replace with your network's password

DHT dht(DHTPIN, DHTTYPE);

AsyncWebServer server(80);

float temperature = NAN;
float humidity = NAN;
float phValue = NAN;
int phAnalogValue = 0;

// Calibration values (example values, adjust these based on your actual sensor calibration)
const int PH4_ANALOG = 1500;  // Analog value at pH 4
const int PH10_ANALOG = 3500; // Analog value at pH 10

// Function to convert analog value to pH
float analogToPH(int analogValue) {
  // Linear mapping
  float slope = (10.0 - 4.0) / (PH10_ANALOG - PH4_ANALOG);
  float intercept = 4.0 - slope * PH4_ANALOG;
  return slope * analogValue + intercept;
}

// Function to read sensor data
void readSensorData() {
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  phAnalogValue = analogRead(PH_AN_PIN);
  phValue = analogToPH(phAnalogValue);
  
  // Print the sensor data to the Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" °C, Humidity: ");
  Serial.print(humidity);
  Serial.print(" %, pH (Analog): ");
  Serial.print(phAnalogValue);
  Serial.print(", pH: ");
  Serial.println(phValue);
}

Ticker sensorTicker;

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  pinMode(PH_AN_PIN, INPUT);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Print the IP address
  Serial.println(WiFi.localIP());

  // Start reading sensor data every 2 seconds
  sensorTicker.attach(1, readSensorData);

  // Route to get sensor data
  server.on("/sensor", HTTP_GET, [](AsyncWebServerRequest *request){
    if (isnan(temperature) || isnan(humidity) || isnan(phValue)) {
      request->send(500, "application/json", "{\"error\":\"Failed to read from sensors\"}");
      return;
    }

    // Prepare JSON response
    String jsonResponse = "{\"temperature\": " + String(temperature) + 
                          ", \"humidity\": " + String(humidity) + 
                          ", \"ph\": " + String(phValue) + "}";

    // Adding the CORS header
    AsyncWebServerResponse *response = request->beginResponse(200, "application/json", jsonResponse);
    response->addHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    request->send(response);
  });

  // Start server
  server.begin();
}

void loop() {
  // No need to do anything here, as the sensor readings are handled by the Ticker
}
