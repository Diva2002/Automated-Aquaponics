from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Folder to store uploaded files
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define start date (3rd November)
START_DATE = datetime(2024, 11, 27)

def extract_green_area(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_green = np.array([35, 50, 50])
    upper_green = np.array([90, 255, 255])
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    return green_mask

def calculate_height(mask, image, real_distance=10, focal_length=1.8):
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return None
    largest_contour = max(contours, key=cv2.contourArea)
    _, _, _, h = cv2.boundingRect(largest_contour)
    pixel_height = h
    sensor_height_mm = 4.8
    image_height_px = image.shape[0]
    real_height_mm = (pixel_height / image_height_px) * sensor_height_mm * (real_distance / focal_length)
    return real_height_mm / 10  # Convert to cm

def calculate_growth_stage():
    # Get today's date and calculate difference in days from 3rd November
    today = datetime.now()
    delta = today - START_DATE
    days_since_start = delta.days
    
    # Classify growth stage based on the days passed
    if days_since_start > 42:
        return "Optimal for harvesting"
    elif 35 <= days_since_start <= 42:
        return "Few more days to go"
    elif 21 <= days_since_start <= 34:
        return "Growing stage"
    else:
        return "Baby spinaches!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = file.filename.replace(" ", "_")
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

@app.route('/upload_image', methods=['GET'])
def process_image():
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'Filename not provided'}), 400
    
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    image = cv2.imread(filepath)
    if image is None:
        return jsonify({'error': 'Invalid image file'}), 400
    
    mask = extract_green_area(image)
    real_height = calculate_height(mask, image)
    growth_stage = calculate_growth_stage()

    if real_height is None:
        return jsonify({'error': 'No plant detected'}), 400
    
    return jsonify({
        'height_cm': round(real_height, 2),
        'growth_stage': growth_stage
    })

if __name__ == '__main__':
    app.run(debug=True)
