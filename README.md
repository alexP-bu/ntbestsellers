**Do you need to view the current NY Times Bestsellers clearly, quickly, and effectively?
Look no further - this application displays the bestsellers in a clear, concise, and
easy to understand manner.**

---

This is a web app developed for a client who needs regular listings of the NYTimes bestsellers for their bookstore.

The app makes calls to the NY Times API in order to retrieve these current bestseller lists:
 - Hardcover Fiction
 - Hardcover Non-Fiction
 - Paperback Trade Fiction
 - Paperback Non-Fiction
 - Middle Grade Hardcover
 - Graphic Books and Manga

The app is desgined to be containerized with docker (via the included Dockerfile)
The steps to do so are:

1. Build the container image
```console
docker build -t ntbestsellers .
```
2. Tag the container image
```console
docker tag ntbestsellers gcr.io/LINK_TO_PROJECT_HERE
```
3. Push to GCP
```console
docker push gcr.io/LINK_TO_PROJECT_HERE
```

4. Complete setup in GCP or AWS to deploy the application. 

Link to app (hosted on GCP via Cloud Run): https://getbestsellers-lvy73psbaa-uc.a.run.app

### Application By Alexander Pozin