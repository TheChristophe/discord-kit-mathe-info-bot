import { Sequelize } from 'sequelize';

export const database = new Sequelize('database', 'super', 'geheim', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite'
});
