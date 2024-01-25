# BottleBrain: Wine Quality Detector

## Introduction

BottleBrain is a machine learning model designed to predict the quality of a wine based on its characteristics using the [Red and White Wine Quality Analysis Model](https://www.kaggle.com/datasets/saigeethac/red-and-white-wine-quality-datasets). Built on the Cartesi DApp, BottleBrain leverages the power of blockchain technology to provide a transparent, secure, and efficient wine quality prediction service.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker: A platform that allows you to automate the deployment, scaling, and management of applications.
- Python 3.8+: The programming language used to develop BottleBrain.
- Pip: A package installer for Python.

## Installation

### Docker

Docker is a platform that allows you to automate the deployment, scaling, and management of applications. It uses containerization to package up an application with all of its dependencies into a standardized unit for software development.

To install Docker, follow these steps [click to install Docker](https://docs.docker.com/get-docker/)

### Sunodo

Sunodo is a powerful tool for managing and deploying applications. To install Sunodo, follow these steps [click to install sunodo](https://docs.sunodo.io/guide/introduction/installing)

## Clone the repository:

```javascript
git clone https://github.com/the-first-elder/BottleBrain.git
sunodo build
sunodo run
```

## Usage

BottleBrain takes in the following parameters:

- `Fixed Acidity`: The amount of organic acids in the grape juice that are not volatile.
- `Volatile Acidity`: The amount of organic acids in the grape juice that are volatile.
- `Citric Acid`: The amount of citric acid in the wine.
- `Residual Sugar`: The amount of residual sugar left in the wine after fermentation.
- `Chlorides`: The amount of salt in the wine.
- `Free Sulfur Dioxide`: The amount of sulfur dioxide added to the wine to prevent oxidation.
- `Total Sulfur Dioxide`: The total amount of sulfur dioxide in the wine, including both free and bound forms.
- `Density`: The density of the wine.
- `pH`: The acidity or alkalinity of the wine.
- `Sulphates`: The amount of sulphur compounds in the wine.
- `Alcohol`: The amount of alcohol in the wine.

Example request:

{"fixed acidity": 7.4 , "volatile acidity" : 0.7 , "citric
acid" : 0 , "residual sugar" : 1.9 , "chlorides" : 0.076 , "free sulfur dioxide"
: 11 , "total sulfur dioxide" : 34 , "density" : 0.9978 , "pH" : 3.51 ,
"sulphates" : 0.56 , "alcohol" : 9.4 }

### Open a new terminal in the same working Directory

Input the following:


> sunodo send generic <br/>
>    Select Foundry <br/>
>    Use Default Rpc Url <br/>
>    Use Default Wallet Mnemonic <br/>
>    select any address <br/>
>    use Default Dapp Address <br/>
>    select string encoding and input `example request stated above` as requested string


## Contributing

We welcome contributions from the community. Please feel free to submit a Pull Request or open an Issue.
