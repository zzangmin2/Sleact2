import React, { VFC, useCallback } from 'react';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}
const InviteChannelModal: VFC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser>('http://localhost:3095/api/users', fetcher);
  const { mutate: mutateMember } = useSWR<IChannel[]>(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/memebers` : null,
    fetcher,
  );

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(
          `http://localhost:3095/api/workspaces/${workspace}/channel/${channel}/members`,
          {
            email: newMember,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setShowInviteChannelModal(false);
          mutateMember();
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>채널 멤버 초대</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
