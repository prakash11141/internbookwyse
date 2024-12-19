'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the `IsActive` column to BOOLEAN
    await queryInterface.changeColumn('Users', 'IsActive', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true, // Default value for `isActive`
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column back to ENUM
    await queryInterface.changeColumn('Users', 'IsActive', {
      type: Sequelize.ENUM('Active', 'Inactive'),
      allowNull: true,
    });
  },
};
