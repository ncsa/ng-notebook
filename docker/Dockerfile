# To keep the example simple, this Dockerfile combines resources for Angular
# development and for the simulated workflow into a single image. In a real
# project, it will probably make sense to split this into at least two images
# and to covert some build-time steps into run-time steps.

# node base image is a good starting point for Angular development
FROM node:12.13.0-buster

# install Angular CLI
RUN npm install -g @angular/cli@10.2.0

# install Chrome for Angular tests
RUN curl -o /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update && apt-get install -y /tmp/chrome.deb
RUN rm /tmp/chrome.deb

# create a directory to mount a host volume, which we'll use for output
RUN mkdir /hostmount

# copy project files
RUN mkdir /ng-notebook
COPY . /ng-notebook

# build the Angular application
WORKDIR /ng-notebook/angular
RUN npm i
RUN ng build -prod --output-hashing=none

WORKDIR /ng-notebook

CMD ["python3", "workflow/assemble_page.py"]