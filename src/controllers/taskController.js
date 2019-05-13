'use strict'

var Task = require('../models/task');

function addTask(req, res) {
    var params = req.body;
    var task = new Task();

    if (params.name && params.description && params.deadline && params.taskOwner) {
        task.name = params.name;
        task.description = params.description;
        task.deadline = params.deadline;
        task.taskOwner = params.taskOwner;
        task.status = 'TO DO';

        task.save((err, storedTask) => {
            if (err) return res.status(500).send({ message: 'Error at saving task' });

            if (!storedTask) {
                return res.status(500).send({ message: 'Task could not be saved' });
            } else {
                return res.status(200).send({ task: storedTask });
            }
        })
    }
}

function getTask(req, res){
    let idUser = req.params.id;

    Task.find({taskOwner : idUser}).exec((err, userTasks) => {
        if (err) return res.status(500).send({ message: 'Request error!' });

        if (!userTasks) {
            return res.status(500).send({ message: 'No found tasks' });
        } else {
            return res.status(200).send({ tasks: userTasks });
        }
    })
}

function editTask(req, res){
    let idTask = req.params.id;
    let params = req.body;

    Task.findByIdAndUpdate(idTask, params, {new : true}, (err, editedTask) => {
        if (err) return res.status(500).send({ message: 'Failed to edit the task' });

        if (!editedTask) {
            return res.status(500).send({ message: 'Task could not be edited' });
        } else {
            return res.status(200).send({ task: editedTask });
        }
    })    
}

function deleteTask(req, res){
    let idTask = req.params.id;

    Task.findByIdAndDelete(idTask, (err, deletedTask) => {
        if (err) return res.status(500).send({ message: 'Failed to delete the task' });

        if (!deletedTask) {
            return res.status(500).send({ message: 'Task could not be deleted' });
        } else {
            return res.status(200).send({ task: deletedTask });
        }
    })
}

module.exports = {
    addTask,
    getTask,
    editTask,
    deleteTask
}