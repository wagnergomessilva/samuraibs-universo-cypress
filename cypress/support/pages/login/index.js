import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go() {
        cy.visit('/')

        cy.contains(el.title)
            .should('be.visible')
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signIn)
            .click()
    }

}

export default new LoginPage()