const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// TODO: userId, name combination should be unique
const tasksSchemaObj = {
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    max: 50,
    required: true
  },
  focusTime: {
    type: Number,
    required: true
  },
  relaxTime: {
    type: Number,
    required: true
  }
};
const tasks = new Schema(tasksSchemaObj);

// TODO: error handle when userId is not ObjectId
tasks.statics.getTasksOfUser = function (userId) {
  return this.find({userId});
};

// TODO: error handle save()
tasks.statics.add = function (taskObj) {
  return new this(taskObj).save();
};

tasks.statics.getId = function (userId, taskName) {
  return this.findOne({userId, name: taskName});
};

tasks.statics.getTask = function (taskId, userId) {
  return this.findOne({_id: taskId, userId});
};

tasks.statics.deleteTask = function (taskId, userId) {
  return this.deleteOne({_id: taskId, userId});
};

exports.tasksSchemaObj = tasksSchemaObj;
exports.Tasks = mongoose.model('Tasks', tasks);