FROM python:3.7

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# root directory for our project in the container
RUN mkdir /backend

# Set the working directory to /backend
WORKDIR /backend

# Copy the current directory contents into the container at /music_service
ADD . /backend/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt