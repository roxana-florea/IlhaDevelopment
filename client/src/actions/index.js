import axios from 'axios';


export const addPlan = (planObjWithoutId) => {
  console.log(planObjWithoutId);

  return dispatch => { //return function
    return axios                           // request plan
      .post('http://localhost:5000/plans', planObjWithoutId) //return post request response
             //response
      .then((backendResponseWithObjectWithNewId) => { //pass data in as a parameter, call the callback, dispatch the action. 
        console.log(backendResponseWithObjectWithNewId);
        dispatch({
          type: 'ADD_PLAN',
          value: backendResponseWithObjectWithNewId.data
        })
      })
  }
}



// export const deletePlan = (planId) => {
//   return {
//     type: 'DELETE_PLAN',
//     value: planId,
//   };
// };


export const deletePlan = (planId) => {
  console.log(planId);

  return dispatch => { //return function
    return axios
      .delete('http://localhost:5000/plans/'+planId ) //return post request response
      .then((data) => { //pass data in as a parameter, call the callback, dispatch the action. 
        console.log(data);

        dispatch({
          type: 'DELETE_PLAN',
          value: planId
        })
      })
  }
}


export const addTask = (taskObj) => {
  return {
    type: 'ADD_TASK',
    value: taskObj,
  };
};

export const deleteTask = (taskObj) => {
  return {
    type: 'DELETE_TASK',
    value: taskObj,
  };
};

export const updateTask = (taskObj) => {
  return {
    type: 'UPDATE_TASK',
    value: taskObj,
  };
};
