# **App Name**: AQI Predictor

## Core Features:

- Frontend (UI/UX): Design a clean, responsive interface showing both real-time AQI data (via external API like OpenAQ or IQAir) and predicted AQI values.
- Frontend Visualization: Include user dashboards with visualizations for pollutant trends (PM2.5, PM10, CO, NO₂, etc.) using Chart.js or D3.js.
- Backend & Machine Learning: Host a trained ARIMA model (built in Python) for time series forecasting of AQI for a selected city. Use Firebase Cloud Functions (Callable or HTTP) to expose a secure prediction endpoint that serves ARIMA predictions. Store and manage time series data in Firebase Firestore (historical AQI).
- Authentication & Personalization: Implement Firebase Authentication (Email/Password and optionally Google OAuth). Enable user preferences for location-based AQI tracking, storing selected regions and custom alerts.
- Visualization & Analysis: Present interactive graphs showing past AQI trends (last 30 days), predicted AQI for the next 7 days, and pollutant breakdown with color-coded health impact indicators.
- Firebase & Cloud Integration: Firestore: Store AQI data, model outputs, user settings. Firebase Hosting: Host the frontend. Cloud Functions: Serve ML predictions. Cloud Scheduler (Optional): Automate daily AQI updates and prediction refresh.

## Style Guidelines:

- Use a color palette that reflects air quality: blues and greens for good quality, transitioning to oranges and reds for poor quality.
- Choose a clear, readable font like 'Roboto' or 'Open Sans' for data clarity.
- Use intuitive icons for pollutants and AQI levels.
- Design a dashboard layout with clear sections for real-time data, predictions, and user settings.
- Incorporate smooth transitions and animations for loading data and updating charts.