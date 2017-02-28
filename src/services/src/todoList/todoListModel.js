"use strict";

/**
 * @name todoList
 * @type todoList
 * @property {Number} id
 * @property {String} title
 * @property {Date} updatedAt
 * @property {Date} createdAt
 */

module.exports = (sequelize, DataTypes) => {
  const todoList = sequelize.define("todoList", {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        todoList.hasMany(models.todoListItem);
      }
    }
  });

  return todoList;
};