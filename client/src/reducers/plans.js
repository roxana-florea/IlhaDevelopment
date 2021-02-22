const plansReducer = (state = [], action) => {
  const plansArr = [...state];

  switch (action.type) {
    case 'LOAD_PLANS':
      return action.value;

    case 'ADD_PLAN':
      plansArr.push(action.value);
      return plansArr;

    case 'DELETE_PLAN':
      return plansArr.filter(plan => plan._id !== action.value);

    case 'ADD_TASK':
      const uselessPlan = plansArr.filter(plan => plan._id === action.value.planId);
      uselessPlan[0].tasks.push(action.value);
      plansArr.filter(plan => plan._id !== action.value.planId).push(uselessPlan[0]);

      return plansArr;

    case 'DELETE_TASK':
      const planWhereTaskShouldBeDeleted = plansArr.filter(plan => plan._id === action.value.planId);  //
      planWhereTaskShouldBeDeleted[0].tasks = planWhereTaskShouldBeDeleted[0].tasks.filter(task => task._id !== action.value._id);// the plan we need where the task was removed
      plansArr.filter(plan => plan._id !== action.value.planId).push(planWhereTaskShouldBeDeleted[0]);//we return all the plans except the plan with deleted task
      return plansArr;

    case 'UPDATE_TASK':
      const planToBeUpdated = plansArr.filter(plan => plan._id === action.value.planId);
      planToBeUpdated[0].tasks = planToBeUpdated[0].tasks.filter(task => task._id !== action.value._id);

      planToBeUpdated[0].tasks.push(action.value)
      plansArr.filter(plan => plan._id !== action.value.planId).push(planToBeUpdated[0]);


      return plansArr;

    default:
      return state;
  }
};

export default plansReducer;
