export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const formatTimeWithUnits = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
};

export const getPriorityId = (priority) => {
  switch (priority) {
    case "Low":
      return 1;
    case "High":
      return 3;
    default:
      return 2;
  }
};

export const getPriority = (priorityId) => {
  switch (priorityId) {
    case 1:
      return "Low";
    case 3:
      return "High";
    default:
      return "Medium";
  }
};
