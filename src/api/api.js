const axios = require("axios");
import config from "../../config.json";

const baseUrl = config.API_endpoint;

export const getUser = async (userId) => {
  const endpoint = `user`;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} });
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }
};

export const getProjectsByUserId = async (userId) => {
  const endpoint = `user/projects`;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

export const getTasksByProjectId = async (projectId) => {
  const endpoint = `project/${projectId}/tasks`;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

export const createProject = async (
  userId,
  projectName,
  projectDescription
) => {
  const endpoint = "project";
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.post(url, 
      {
        userId: userId,
        projectName: projectName,
        description: projectDescription,
        withCredentials: true,
      },
      {
        headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} 
       });

    return response;
  } catch (error) {
    console.error(`Error creating project: ${error}`);
    throw error;
  }
};

export const editProject = async (
  userId,
  projectId,
  projectName,
  projectDescription
) => {
  const endpoint = `project/${projectId}`;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.patch(url, {
      projectId: projectId,
      userId: userId,
      projectName: projectName,
      description: projectDescription,
      withCredentials: true,
    },
    {
      headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} 
     });

    return response;
  } catch (error) {
    console.error(`Error editing project: ${error}`);
    throw error;
  }
};

export const createTask = async (
  projectId,
  taskName,
  taskDescription,
  priorityId
) => {
  const endpoint = "tasks";
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.post(url, {
      projectId: projectId,
      taskName: taskName,
      description: taskDescription,
      priorityId: priorityId,
      duration: 0,
      withCredentials: true,
    },
    {
      headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} 
     });

    return response;
  } catch (error) {
    console.error(`Error creating task: ${error}`);
    throw error;
  }
};

export const editTask = async (
  taskId,
  projectId,
  taskName,
  taskDescription,
  priorityId,
  duration
) => {
  const endpoint = `tasks/${taskId}`;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await axios.patch(url, {
      taskId: taskId,
      projectId: projectId,
      taskName: taskName,
      description: taskDescription,
      priorityId: priorityId,
      duration: duration,
      withCredentials: true,
    },
    {
      headers: {"Authorization" : `Bearer ${sessionStorage.getItem("accessToken")}`} 
     });

    return response;
  } catch (error) {
    console.error(`Error editing task: ${error}`);
    throw error;
  }
};

// Get Task (for the timer page) (not needed?)
// Delete project
// Delete Task
