

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no APP mobile', function () {

        const data = {
            customer: {
                name: 'Nikk Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            samurai: {
                name: 'Ramom Valdez',
                email: 'ramom@televisa.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        beforeEach(function () {
            cy.postUser(data.customer)
            cy.postUser(data.samurai)

            cy.apiLogin(data.customer).then(function () {
                cy.log('Conseguimos pegar o Token ' + Cypress.env('apiToken'))
            })
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            console.log(data)
        })

    })
})

Cypress.Commands.add('apiLogin', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})