const router = require('express').Router();
const Plan = require('../models/plans');

router.route('/').get((req, res) => {
    Plan.find()
        .then(plans => res.json(plans))
        .catch(err => res.status(400).json('Error: ' + err));
});



//adding the plan
router.route('/').post((req, res) => {
    console.log("hello");
    console.log(req.body);
    const planName = req.body.name;
    console.log(planName);
    const tasks = [req.body.tasks];
    console.log(tasks);
    //   plan.date = Date.parse(req.body.date);
    const newPlan = new Plan({ planName, tasks });
    console.log(newPlan);

    newPlan.save()
        .then(() => res.json('Plan added!'))


        .catch(err => res.status(400).json('error is here' + err));

});



//display all the plans
router.route('/:id').get((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => res.json(plan))
        .catch(err => res.status(400).json('Error: ' + err));
});

//deleting a plan
router.route('/:id').delete((req, res) => {
    Plan.findByIdAndDelete(req.params.id)
        .then(() => res.json('Plan deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * updates an existing plan item. 
 * For this endpoint, we first retrieve the old plan item from the database based on the id. 
 * Then, we set the plan property values to what’s available in the request body. 
 * Finally, we call plan.save to save the updated object in the database.
 */
router.route('/:id').put((req, res) => {
    Plan.findById(req.params.id)
        .then(plan => {
            plan.plaName = req.body.planName;
            plan.save()
                .then(() => res.json('plan updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//updating task
router.route('/:plan_id/tasks/:task_id').put((req, res) => {
    Plan.findById(req.params.plan_id).update(

        { "tasks._id": req.params.task_id },
        { "$set": { "tasks.$": req.body } }

    ).then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// deleting task
router.route('/:plan_id/tasks/:task_id').delete((req, res) => {
    Plan.findByIdAndDelete(req.params.plan_id).update(

        { "$pull": { tasks: { "_id": req.params.task_id } } }

    ).then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/:plan_id/tasks').post((req, res) => {
    Plan.find().update(

        {"_id": req.params.plan_id},
        { "$push": { "tasks": req.body } },
         


    ).then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});









module.exports = router;