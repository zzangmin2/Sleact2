import React, { useCallback, useState } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header, Error, Success } from './styles';
import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
const SignUp = () => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError && nickname) {
        console.log('서버로 회원가입하기');
        setSignUpError(''); //비동기 요청을 보내기 전에 set함수 초기화
        setSignUpSuccess(false);
        axios
          .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
          })
          .then((res) => {
            console.log(res);
            setSignUpSuccess(true);
          })
          .catch((err) => {
            console.log(err);
            setSignUpError(err.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}></Input>
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="nickname" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></Input>
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword}></Input>
          </div>
        </Label>
        <Label id="passwordCheck-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            ></Input>
          </div>
        </Label>
        {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
        {!nickname && <Error>닉네임을 입력해주세요.</Error>}
        {signUpError && <Error>{signUpError}</Error>}
        {signUpSuccess && <Success>회원가입 완료!</Success>}
        <Button type="submit">회원가입</Button>
        <LinkContainer>
          이미 회원이신가요?&nbsp;
          <Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
      </Form>
    </div>
  );
};

export default SignUp;
