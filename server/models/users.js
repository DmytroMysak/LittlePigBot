export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      facebookId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      telegramId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      selectedVoiceId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: -1,
        isInt: {
          msg: 'voice level bad value, expected number between -1 and 10000',
        },
        min: {
          args: [-1],
          msg: 'voice level can\'t be less than -1',
        },
        max: {
          args: [10000],
          msg: 'voice level can\'t be more than 10000',
        },
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      createdat: 'createdAt',
    },
  );
  users.associate = (models) => {
    users.hasMany(models.messages, { foreignKey: 'userId' });
    users.belongsToMany(models.clients, { through: 'usersClients', foreignKey: 'userId' });
    users.belongsToMany(models.roles, { through: 'usersRoles', foreignKey: 'userId'});
    users.belongsTo(models.voices, { foreignKey: 'selectedVoiceId' });
  };
  return users;
};
