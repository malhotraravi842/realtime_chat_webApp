import { fb } from 'service';
import { createContext, useState, useEffect, useContext } from 'react';
import { newChat, deleteChat, leaveChat, getMessages } from 'react-chat-engine';
export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const createChatClick = () => {
    newChat(chatConfig, { title: '' });
  };

  const deleteChatClick = chat => {
    const isAdmin = chat.admin === chatConfig.userName;

    if (isAdmin && window.confirm('Are you sure want to delete this chat?')) {
      deleteChat(chatConfig, chat.id);
    } else if (window.confirm('Are you sure want to leave this chat?')) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };

  const selectChatClick = chat => {
    getMessages(chatConfig, chat.id, messages => {
      setSelectedChat({
        ...chat,
        messages,
      });
    });
  };

  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: 'bf8caf6e-3bb7-4c94-98ed-bb7ff96d12c8',
          });
        });
    }
  }, [authUser]);

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    chatConfig,
    setChatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  };
};
