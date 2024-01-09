const { defineConfig } = require("cypress");
const { Pool } = require('pg')

module.exports = defineConfig({
  dbconfig: {
    host: 'peanut.db.elephantsql.com',
    user: 'plobnobt',
    password: 'XmLPhj9qFnJNmUc_1Vcdku0_fRTNus-h',
    database: 'plobnobt',
    port: 5432
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const configJson = require(config.configFile)

      const pool = new Pool(configJson.dbconfig)

      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        },
        findToken(email) {
          return new Promise(function (resolve) {
            pool.query('select B.token from ' +
              'public.users A ' +
              'INNER JOIN public.user_tokens B ' +
              'ON A.id = B.user_id ' +
              'WHERE A.email = $1 ' +
              'ORDER BY B.created_at', [email], function (error, result) {
                if (error) {
                  throw error
                }
                resolve({ token: result.rows[0].token })
              })
          })
        }
      })
    },

    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
