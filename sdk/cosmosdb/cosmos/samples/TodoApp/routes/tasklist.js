const CosmosClient = require('../../../').DocumentClient;
const TaskDao = require('../models/TaskDao');
const async = require('async');

class TaskList {
    /**
     * 
     * @param {TaskDao} taskDao 
     */
    constructor(taskDao) {
        this.taskDao = taskDao;
    }
    async showTasks(req, res) {
        const querySpec = {
            query: 'SELECT * FROM root r WHERE r.completed=@completed',
            parameters: [{
                name: '@completed',
                value: false
            }]
        };

        try {
            const items = await this.taskDao.find()
            res.render('index', {
                title: 'My ToDo List ',
                tasks: items
            });

        } catch (err) {
            throw err;
        }
    }

    async addTask(req, res) {
        const item = req.body;

        try {
            await this.taskDao.addItem(item);
            res.redirect('/');
        } catch (err) {
            throw err;
        }
    }

    async completeTask(req, res) {
        const completedTasks = Object.keys(req.body);
        const tasks = [];

        try {
            completedTasks.forEach((task) => {
                tasks.push(this.taskDao.updateItem(task));
            });

            await Promise.all(tasks);

            res.redirect('/');
        } catch (err) {
            throw err;
        }
    }
}

module.exports = TaskList;