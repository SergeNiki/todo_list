const roles = {
  ADMIN: 'админ',
  SUPERVISOR: 'руководитель',
  SUBORDINATE: 'подчинённый',
};
const taskStatus = {
  TO_FULFILLMENT: 'к выполнению',
  IN_PROCESS: 'выполняется',
  COMPLETED: 'выполнена',
  CANCELED: 'отменена',
};
const taskPriority = {
  HIGH: 'высокий',
  MEDIUM: 'средний',
  LOW: 'низкий',
};

module.exports = {
  roles,
  taskStatus,
  taskPriority,
};
