from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # To enable CORS
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Folder to store uploaded files
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def extract_green_area(image):
    """
    Extract green regions of the plant using HSV color space.
    """
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_green = np.array([35, 50, 50])
    upper_green = np.array([90, 255, 255])
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    return green_mask

def calculate_height(mask, image, real_distance=10, focal_length=1.8):
    """
    Calculate the plant height based on mask and camera parameters.
    """
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return None
    largest_contour = max(contours, key=cv2.contourArea)
    _, _, _, h = cv2.boundingRect(largest_contour)
    pixel_height = h
    sensor_height_mm = 4.8  # Example sensor height in mm
    image_height_px = image.shape[0]
    real_height_mm = (pixel_height / image_height_px) * sensor_height_mm * (real_distance / focal_length)
    return real_height_mm / 10  # Convert to cm

@app.route('/upload', methods=['POST'])
def upload_file():
    """
    Handle file upload without specifying filename in URL.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Sanitize filename and save file
    filename = file.filename.replace(" ", "_")
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

@app.route('/upload_image', methods=['GET'])
def process_image():
    """
    Process the uploaded image and return the plant height.
    """
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'Filename not provided'}), 400
    
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    # Read the image and process
    image = cv2.imread(filepath)
    if image is None:
        return jsonify({'error': 'Invalid image file'}), 400
    
    mask = extract_green_area(image)
    real_height = calculate_height(mask, image)
    if real_height is None:
        return jsonify({'error': 'No plant detected'}), 400
    
    return jsonify({'height_cm': round(real_height, 2)})

if __name__ == '__main__':
    app.run(debug=True)
