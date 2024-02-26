import React, { useCallback, useState } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header, Error } from './styles';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangeNickname = useCallback((e) => {
    setNickName(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        console.log('서버로 회원가입하기');
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form>
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
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
        </Label>
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
