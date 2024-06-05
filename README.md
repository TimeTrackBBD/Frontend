# TimeTrack

TimeTrack is a web application that allows users to create projects and track the time they spend working on tasks for each project. This tool is designed to help users manage their time efficiently and keep track of their productivity.

Access TimeTrack online: [TimeTrack](https://timetrack.projects.bbdgrad.com/)

## Features

- **User Authentication:** Secure login and user management.
- **Project Management:** Create and manage multiple projects.
- **Task Tracking:** Track time spent on various tasks within each project.
- **Task Prioritization:** Easily set the priority level of the different tasks.

## Libraries and Frameworks

TimeTrack is built using the following key libraries and frameworks:

- **React:** A JavaScript library for building user interfaces.
- **Material-UI (MUI):** A popular React UI framework.

## Getting Started

To run TimeTrack locally, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Configuration

Create a `config.json` file in the root directory of the project with the following fields:

```json
{
  "redirect_uri": "",
  "client_id": "",
  "API_endpoint": "",
  "Cognito_endpoint": ""
}
```

### Run the code

- Run the command `npm i` to install the required packages.
- Run the command `npm run dev` to launch the application.
- The website should launch in your browser at the url: `http://localhost:8080`

### Deployment

- The website can be deployed with the `deploy-website` workflow.
- This will build the package and upload it to the elastic beanstalk instance.
- The workflow will run on merge into main, or can be triggered manually.
