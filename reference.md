## Run Local

```
docker build -t nest-docker-cloudrun -f Dockerfile .
docker run -it -p 3000:3000 nest-docker-cloudrun

```

## Push
### Via Docker
```
docker build -t nest-docker-cloudrun -f Dockerfile .

docker tag nest-docker-cloudrun gcr.io/cfe-project-357217/nest-docker-cloudrun

docker push gcr.io/cfe-project-357217/nest-docker-cloudrun

```

### via GCloud Build

```
gcloud builds submit --tag gcr.io/cfe-project-357217/nest-docker-cloudrun

```
