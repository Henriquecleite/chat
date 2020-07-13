import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import PageWrapper from '../../components/commons/pageWrapper'
import colors from '../../constants/colors'
import TextInput from '../../components/commons/textInput'
import Button from '../../components/commons/button'
import FormElementWrapper from '../../components/commons/formElementWrapper'
import { email, name, password } from '../../constants/formElementNames'
import { signupRequest } from '../../services/auth'
import { isFormValid } from '../../utils/validation'
import routesPath from '../../constants/routesPath'

const SignupFormWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 0 16px;
  padding: 32px;
  background: ${colors.navy.light};
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const Signup: React.FC = () => {
  const history = useHistory()

  const [formElementsValue, setFormElementsValue] = useState<{
    email: string
    name: string
    password: string
  }>({
    email: '',
    name: '',
    password: '',
  })

  const [formElementsValidation, setFormElementsValidation] = useState<{
    [email]: boolean
    [name]: boolean
    [password]: boolean
  }>({
    [email]: true,
    [name]: true,
    [password]: true,
  })

  const [formValidationVisibility, setFormValidationVisibility] = useState<
    boolean
  >(true)

  const [loading, setLoading] = useState<boolean>(false)

  const handleClickOnSignupButton = async () => {
    if (!formValidationVisibility) {
      setFormValidationVisibility(true)
    }

    if (isFormValid(formElementsValidation)) {
      setLoading(true)

      const response = await signupRequest(
        formElementsValue[email],
        formElementsValue[name],
        formElementsValue[password]
      )

      setTimeout(() => {
        setLoading(false)

        if (response.success) {
          const {
            data: { userId, userName, token },
          } = response

          localStorage.setItem('userId', userId)
          localStorage.setItem('userName', userName)
          localStorage.setItem('token', token)

          history.push(routesPath.chat)
        } else {
          setFormElementsValidation({
            ...formElementsValidation,
            email: false,
          })
        }
      }, 400)
    }
  }

  return (
    <PageWrapper backgroundColor={colors.navy.darker}>
      <SignupFormWrapper>
        <SignupForm>
          <FormElementWrapper margin="0">
            <TextInput
              name={email}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
              label="E-MAIL"
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextInput
              name={name}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
              label="NAME"
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextInput
              name={password}
              formElementsValue={formElementsValue}
              setFormElementsValue={setFormElementsValue}
              formElementsValidation={formElementsValidation}
              setFormElementsValidation={setFormElementsValidation}
              formValidationVisibility={formValidationVisibility}
              type="password"
              label="PASSWORD"
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <Button
              label="Sign Up"
              loading={loading}
              onClick={handleClickOnSignupButton}
            />
          </FormElementWrapper>
        </SignupForm>
      </SignupFormWrapper>
    </PageWrapper>
  )
}
export default Signup
