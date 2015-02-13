var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

module.exports = TaskList;

function TaskList(task) {
    this.task = task;
}

TaskList.prototype = {
    showTasks: function (req, res) {
        var self = this;
        
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.completed=@completed',
            parameters: [
                {
                    name: '@completed',
                    value: false
                }
            ]
        };
        
        self.task.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            
            res.render('index', { title: 'My ToDo List ', tasks: items });
        });
    },
    
    addTask: function (req, res) {
        var self = this;
        var item = req.body;
        
        self.task.addItem(item, function (err) {
            if (err) {
                throw (err);
            }
            
            res.redirect('/');
        });
    },
    
    completeTask: function (req, res) {
        var self = this;
        var completedTasks = Object.keys(req.body);
        
        async.forEach(completedTasks, function taskIterator(completedTask, callback) {
            self.task.updateItem(completedTask, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
}