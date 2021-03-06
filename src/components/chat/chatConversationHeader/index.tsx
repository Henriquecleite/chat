import React, { useContext } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import getInitialCapitalized from '../../../utils/string'
import LeftArrowIcon from '../../../assets/icons/left-arrow.svg'
import PageContext from '../../../contexts/pageContext'

const ChatConversationHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: ${colors.navy.light};
`

const ContactPictureWrapper = styled.div``

const ContactPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.green.medium};
  color: ${colors.text.white};
  font-weight: 700;
`

const ContactName = styled.div`
  flex: 1;
  margin-left: 16px;
  color: ${colors.text.white};
`

const LeftArrowIconStyled = styled(LeftArrowIcon)`
  margin-right: 24px;

  & > path {
    fill: ${colors.white};
  }
`

interface ChatConversationHeaderProps {
  contactName: string
  toggleToPanelOnMobile: () => void
}

const ChatConversationHeader: React.FC<ChatConversationHeaderProps> = ({
  contactName,
  toggleToPanelOnMobile,
}) => {
  const { isMobile } = useContext(PageContext)

  return (
    <ChatConversationHeaderWrapper>
      {isMobile && (
        <LeftArrowIconStyled
          data-testid="left-arrow-icon"
          onClick={toggleToPanelOnMobile}
        />
      )}
      <ContactPictureWrapper>
        <ContactPicture>{getInitialCapitalized(contactName)}</ContactPicture>
      </ContactPictureWrapper>
      <ContactName>{contactName}</ContactName>
    </ChatConversationHeaderWrapper>
  )
}

export default ChatConversationHeader
