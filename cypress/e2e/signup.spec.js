import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    context('quando o usuário é novato', function () {
        const user = {
            name: 'Wagner QA',
            email: 'wag.gomes2015@gmail.com',
            password: "abcd1234"
        }
        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            // cy.intercept('POST', '/users', {
            //     statusCode: 200
            // }).as('postUser')

            // cy.wait('@postUser')

        })
    })

    context('quando o e-mail já existe', function () {
        const user = {
            name: 'João teste',
            email: 'joao.teste@gmail.com',
            password: "abcd1234",
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: "abcd1234"
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha tem menos de 6 caracteres', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {

                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p
                }

                signupPage.form(user)
                signupPage.submit()

            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alertHaveText(alert)
            })
        })
    })


})