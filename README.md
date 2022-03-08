# Machine Learning Service
## Description
This service uses pre-trained models to detect objects in images with a set accuracy percentage. 
We prepared a docker container preloaded with all the necessary libraries to run this service.

## Pre-requirements

1. Install Docker 
https://docs.docker.com/get-docker/

## Getting Started

1. Clone this repository

 ```bash
   git clone git@github.com:latam-03-at/ml-service.git
   ```
2. Go to the repository directory that you just clone

```
   cd ml-service
   ```
3. Build the ml-service container

```
docker-compose up -d
```
4. You are now able to use the service.

## Use the service

We use Postman for this service. To configure the collection: 
1. Create a POST request.
2. Enter as request URL the following: http://localhost:3000/api/v1/recognize-objects
3. Set the following variables:
 * percentage (you can set any value from 0.00 to 1.00. E.g. "0.7")
 * object (you can write the object required. E.g. "dog")
 * model (you can write the pre-trained model that you want to use. You can choose between "yolo", "coco" or "mobilenet". E.g. "coco")
 * images (You can upload a single image or an array of images that you want to analyze in jpg or png format)
 4. Click on "send". 
