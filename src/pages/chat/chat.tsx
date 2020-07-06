import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import openSocket from 'socket.io-client'
import PageWrapper from '../../components/commons/pageWrapper/pageWrapper'
import colors from '../../constants/colors'
import ChatPanelHeader from '../../components/chat/chatPanelHeader/chatPanelHeader'
import ChatPanelConversations from '../../components/chat/chatPanelConversations/chatPanelConversations'
import ChatPanelContactsSearch from '../../components/chat/chatPanelContactsSearch/chatPanelContactsSearch'
import ChatConversationHeader from '../../components/chat/chatConversationHeader/chatConversationHeader'
import ChatConversationMessages from '../../components/chat/chatConversationMessages/chatConversationMessages'
import ChatConversationFooter from '../../components/chat/chatConversationFooter/chatConversationFooter'
import { PanelConversation, Conversation, UserId } from '../../components/types'
import { getConversations } from '../../services/conversation'
import { serverURL } from '../../utils/request'

const ChatWrapper = styled.div`
  display: flex;
  height: 100%;
`

const ChatPanel = styled.div`
  width: 410px;
  border-right: 1px solid ${colors.navy.dark};
  background: ${colors.navy.medium};
`

const ChatConversation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

let socket: SocketIOClient.Socket

const Chat: React.FC = () => {
  const [userId, setUserId] = useState<UserId>('')

  const [panelConversations, setPanelConversations] = useState<
    PanelConversation[]
  >([])

  const [addContactMode, setAddContactMode] = useState<boolean>(false)

  const [conversations, setConversations] = useState<Conversation[]>([])

  const [conversationSelectedId, setConversationSelectedId] = useState<
    string | null
  >(null)

  const addMessageToConversation = (newConversation: Conversation) => {
    const conversationIndex = conversations.findIndex(
      (conversation) => conversation._id === newConversation._id
    )

    const conversationsUpdated = conversations.map((conversation, index) => ({
      _id: conversation._id,
      messages:
        index === conversationIndex
          ? newConversation.messages
          : [...conversation.messages],
    }))

    setConversations(conversationsUpdated)
  }

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))

    const fetchConversations = async () => {
      const { success, data } = await getConversations()

      if (success) {
        setPanelConversations(data.conversations)
      }
    }

    fetchConversations()

    socket = openSocket(serverURL)
  }, [])

  useEffect(() => {
    socket.off('message')

    socket.on('message', (socketData) => {
      addMessageToConversation(socketData.conversation)
    })
  }, [conversationSelectedId])

  const userInfo = {
    name: 'Roberto',
  }

  const conversationSelected = conversations.find(
    (conversation) => conversation._id === conversationSelectedId
  )

  const conversationSelectedMessages = conversationSelected
    ? conversationSelected.messages
    : []

  const panelConversationSelected = panelConversations.find(
    (panelConversation) => panelConversation.id === conversationSelectedId
  )

  const panelConversationSelectedContactName = panelConversationSelected
    ? panelConversationSelected.contactName
    : ''

  return (
    <PageWrapper backgroundColor={colors.navy.dark}>
      <ChatWrapper>
        <ChatPanel>
          <ChatPanelHeader
            userInfo={userInfo}
            addContactMode={addContactMode}
            toggleAddContactMode={() => {
              setAddContactMode((prevState) => !prevState)
            }}
          />
          {addContactMode ? (
            <ChatPanelContactsSearch />
          ) : (
            <ChatPanelConversations
              panelConversations={panelConversations}
              conversations={conversations}
              setConversations={setConversations}
              setConversationSelectedId={setConversationSelectedId}
            />
          )}
        </ChatPanel>
        <ChatConversation>
          {conversationSelectedId && (
            <ChatConversationHeader
              contactName={panelConversationSelectedContactName}
            />
          )}
          <ChatConversationMessages
            userId={userId}
            messages={conversationSelectedMessages}
          />
          <ChatConversationFooter
            conversationSelectedId={conversationSelectedId}
          />
        </ChatConversation>
      </ChatWrapper>
    </PageWrapper>
  )
}

export default Chat
