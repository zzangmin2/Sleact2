import React, { VFC } from 'react';
import { ChatZone, Section } from './styles';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';
import Scrollbars from 'react-custom-scrollbars';

interface Props {
  chatData?: IDM[];
}
const ChatList: VFC<Props> = ({ chatData }) => {
  console.log(chatData);
  return (
    <ChatZone>
      {chatData?.map((chat) => (
        <Chat key={chat.id} data={chat} />
      ))}
    </ChatZone>
  );
};

export default ChatList;
