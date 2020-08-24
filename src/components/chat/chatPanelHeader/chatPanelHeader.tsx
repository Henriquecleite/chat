import React from 'react'
import styled, { css } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { UserName } from '../../../types'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'
import PlusIcon from '../../../assets/icons/plus.svg'
import TalkBalloonIcon from '../../../assets/icons/talk-balloon.svg'
import LogoutIcon from '../../../assets/icons/logout.svg'
import Button from '../../commons/button'
import routesPath from '../../../constants/routesPath'

const ChatPanelHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: ${colors.navy.light};
`

const UserPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.blue.light};
  color: ${colors.text.white};
  font-weight: 700;
`

const UserNameWrapper = styled.div`
  flex: 1;
  margin-left: 16px;
  color: ${colors.text.white};
  font-weight: 700;
`

const Icons = styled.div`
  display: flex;
  align-items: center;
`

const ButtonWrapper = styled.div`
  margin: 0 10px;
`

const iconStyle = css`
  & > path {
    fill: ${colors.white};
  }
`

const PlusIconStyled = styled(PlusIcon)`
  ${iconStyle}
`

const TalkBalloonIconStyled = styled(TalkBalloonIcon)`
  ${iconStyle}
`

const LogoutIconStyled = styled(LogoutIcon)`
  ${iconStyle}
`

interface ChatPanelHeaderProps {
  userName: UserName
  addContactMode: boolean
  toggleAddContactMode: () => void
}

const ChatPanelHeader: React.FC<ChatPanelHeaderProps> = ({
  userName,
  addContactMode,
  toggleAddContactMode,
}) => {
  const history = useHistory()

  const handleClickOnLogoutButton = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('token')

    history.push(routesPath.home)
  }

  return (
    <ChatPanelHeaderWrapper>
      <UserPicture>{getInitialCapitalized(userName)}</UserPicture>
      <UserNameWrapper>{userName}</UserNameWrapper>
      <Icons>
        <ButtonWrapper>
          <Button onClick={toggleAddContactMode} variant="clear">
            {addContactMode ? <TalkBalloonIconStyled /> : <PlusIconStyled />}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={handleClickOnLogoutButton} variant="clear">
            <LogoutIconStyled />
          </Button>
        </ButtonWrapper>
      </Icons>
    </ChatPanelHeaderWrapper>
  )
}

export default ChatPanelHeader
