# 🌫 AQI Prediction Using ARIMA Model

This project forecasts Air Quality Index (AQI) using the ARIMA time-series model. It ingests historical AQI data, fits an ARIMA model, evaluates accuracy, and visualizes predictions vs actual values.

## 🚀 Key Highlights

- Time-series forecasting using the ARIMA/SARIMA family
- Data preprocessing: handling missing values, differencing, and stationarity checks
- Hyperparameter tuning (p, d, q) using AIC/BIC grid search
- Model evaluation: MSE, MAE, RMSE metrics
- Visual plots comparing historical vs. predicted AQI

## 🧱 Tech Stack

| Component        | Technology/Library          |
|------------------|-----------------------------|
| Language         | Python 3.8+                 |
| Data Handling    | pandas, numpy               |
| Time-Series      | statsmodels                 |
| Visualization    | matplotlib, seaborn         |
| CLI & Execution  | Jupyter Notebook or .py script |

## 🔧 Prerequisites

- Python 3.8 or higher
- Required packages:
  ```bash
  pip install -r requirements.txt
  ```

## ⚙️ Setup

```bash
git clone https://github.com/Bharath5050/AQI_Prediction_Using_ARIMA_Model.git
cd AQI_Prediction_Using_ARIMA_Model
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🚀 How to Run

### Option 1: Jupyter Notebook

Open and run:
```bash
jupyter notebook
```
Choose the `AQI_ARIMA.ipynb` notebook and execute all cells to see data prep, model building, tuning, and forecasting steps.

### Option 2: Python Script

```bash
python forecast_aqi.py --data data/aqi_data.csv --output results/forecast.png
```
Adjust file paths as needed. The script will load data, fit the model, evaluate performance, and save plots.

## 🧠 Workflow Overview

1. **Load & preprocess data**:
   - Parse datetime, handle missing values, resample if needed.
2. **Stationarity check**:
   - Perform ADF test, plot rolling stats, apply differencing.
3. **Hyperparameter selection**:
   - Grid search using AIC/BIC criteria for (p, d, q).
4. **Train & evaluate model**:
   - Fit ARIMA model, compute MSE, MAE, RMSE.
5. **Visualize results**:
   - Compare historical vs. predicted AQI with line plots.

## 📊 Example Output

- Time-series plot with daily AQI and ARIMA forecast
- Metrics summary:
  - MSE: 12.34
  - RMSE: 3.51
  - MAE: 2.85

*(Exact values depend on your dataset setup.)*

## 🧪 Tests

If available:
```bash
pytest tests/
```

## 🛠 Future Enhancements

- [ ] Implement seasonal ARIMA (SARIMA) for periodic patterns  
- [ ] Add advanced forecasting (Prophet, LSTM, XGBoost)  
- [ ] Develop interactive dashboard (Dash or Streamlit)  
- [ ] Automate hyperparameter tuning with `pmdarima.auto_arima`  
- [ ] Include performance report generation

## 🤝 Contributing

🎉 Contributions are welcome!

1. Fork the repo  
2. Create a branch: `git checkout -b feature/my-feature`  
3. Add tests and docs  
4. Commit your changes: `git commit -m 'Add feature'`  
5. Push to your fork: `git push origin feature/my-feature`  
6. Open a Pull Request

Please follow the existing code style and add tests for any new features.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
