import pandas as pd
import m2cgen as m2c 
from sklearn.linear_model import LinearRegression

model = LinearRegression()

# Load the red wine data
red_wine_csv = "red_wine.csv"
red_wine_df = pd.read_csv(red_wine_csv, sep=';', quotechar='"')

# Remove double quotes and semicolons from column names
red_wine_df.columns = red_wine_df.columns.str.replace('"', '')

# Load the white wine data
white_wine_csv = "white_wine.csv"
white_wine_df = pd.read_csv(white_wine_csv, sep=';', quotechar='"')

# Remove double quotes and semicolons from column names
white_wine_df.columns = white_wine_df.columns.str.replace('"', '')

# Combine the dataframes
train_df = pd.concat([red_wine_df, white_wine_df])

include = ["fixed acidity", "volatile acidity", "citric acid", "residual sugar", "chlorides", "free sulfur dioxide", "total sulfur dioxide", "density", "pH", "sulphates", "alcohol","quality"	]
dependent_var = "quality"

if include:
     train_df = train_df[include]

independent_vars = train_df.columns.difference([dependent_var])
categoricals = []
for col, col_type in train_df[independent_vars].dtypes.iteritems():
     if col_type == 'O':
          categoricals.append(col)
     else:
          train_df[col].fillna(0, inplace=True)
train_df_ohe = pd.get_dummies(train_df, columns=categoricals, dummy_na=True)

x = train_df_ohe.get(train_df_ohe.columns.difference([dependent_var]))
y = train_df_ohe.get(dependent_var)
model.fit(x, y)

model_to_python = m2c.export_to_python(model)

model_columns = list(x.columns)

with open("model.py", "w") as text_file:
    print(f"{model_to_python}", file=text_file)
    print(f"columns = {model_columns}", file=text_file)

print("Model exported successfully")

