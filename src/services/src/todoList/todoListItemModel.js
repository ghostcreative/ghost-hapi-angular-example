"use strict";

/**
 * @name todoListItem
 * @type todoListItem
 * @property {Number} id
 * @property {todoList.id} todoListId
 * @property {String} description
 * @property {Boolean} isComplete
 * @property {Date} updatedAt
 * @property {Date} createdAt
 */

module.exports = (sequelize, DataTypes) => {
  const todoListItem = sequelize.define("todoListItem", {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        todoListItem.belongsTo(models.todoList);
      }
    }
  });

  return todoListItem;
};