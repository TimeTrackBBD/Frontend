provider "aws" {
  region = "eu-west-1"
}

data "aws_elastic_beanstalk_environment" "existing_time_track_env" {
  name = "TimeTrack-env" 
}

resource "aws_s3_bucket" "time_track_bucket" {
  bucket = "time-track-app-bucket"
  acl    = "private"
  
  tags = {
    Name = "time-track-app-bucket"
  }
}

resource "aws_elastic_beanstalk_application_version" "time_track_app_version" {
  name          = "TimeTrackApp"
  application   = data.aws_elastic_beanstalk_environment.existing_time_track_env.application
  description   = "The TimeTrack application"
  bucket        = aws_s3_bucket.time_track_bucket.id
  key           = "build.zip"
}
