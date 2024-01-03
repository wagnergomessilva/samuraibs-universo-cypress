const { defineConfig } = require("cypress");
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const pool = new Pool({
        host: 'peanut.db.elephantsql.com',
        user: 'plobnobt',
        password: 'XmLPhj9qFnJNmUc_1Vcdku0_fRTNus-h',
        database: 'plobnobt',
        port: 5432
      })

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
        }
      })
    },

    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
