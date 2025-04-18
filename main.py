from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)

# Initialize Babel
babel = Babel(app)

# ✅ Home Route (Fix for 404 Error)
@app.route('/')
def home():
    return render_template('index.html')  # Ensure 'index.html' exists in the templates folder

# 🧑‍🌾 Farmer Registration Route
@app.route('/register_farmer', methods=['GET', 'POST'])
def register_farmer():
    if request.method == 'POST':
        farmer_name = request.form['name']
        selected_crops = request.form.getlist('crops[]')

        crop_prices = {crop: request.form[f'price_{crop}'] for crop in selected_crops}

        # Simulated data processing
        print(f"Farmer: {farmer_name}")
        print(f"Selected Crops and Prices: {crop_prices}")

        return "Farmer registration successful!"

    return render_template('register_farmer.html')

# 🌾 AI-based Crop Recommendation
def recommend_crops(soil_type, weather):
    recommendations = {
        "loamy": {"rainy": ["Rice", "Maize"], "sunny": ["Wheat", "Barley"]},
        "clay": {"rainy": ["Paddy", "Sugarcane"], "sunny": ["Cotton", "Chickpea"]},
        "sandy": {"rainy": ["Millets", "Peanuts"], "sunny": ["Carrots", "Watermelon"]}
    }
    return recommendations.get(soil_type, {}).get(weather, ["No specific recommendation"])

@app.route('/crop_recommendation', methods=['GET', 'POST'])
def crop_recommendation():
    suggested_crops = None
    if request.method == 'POST':
        soil_type = request.form['soil_type']
        weather = request.form['weather']
        suggested_crops = recommend_crops(soil_type, weather)

    return render_template('crop_recommendation.html', crops=suggested_crops)

# 👥 Buyer Registration Route
@app.route('/register_buyer', methods=['GET', 'POST'])
def register_buyer():
    if request.method == 'POST':
        buyer_name = request.form['name']
        contact = request.form['contact']
        selected_crops = request.form.getlist('crops[]')

        crop_quantities = {crop: request.form[f'quantity_{crop}'] for crop in selected_crops}

        # Simulated data processing
        print(f"Buyer: {buyer_name}")
        print(f"Contact: {contact}")
        print(f"Interested Crops and Quantities: {crop_quantities}")

        return "Buyer registration successful!"

    return render_template('register.html')

# ✅ Ensure Only One Instance of app.run()
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Allows access from other devices



