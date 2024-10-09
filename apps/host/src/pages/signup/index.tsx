import SignUpPage, { getServerSideProps as SignUpPageGetServerSideProps } from "activation/signup";
const SignUp = SignUpPage;
export const getServerSideProps = SignUpPageGetServerSideProps;
// @ts-expect-error фикс ошибки билда
SignUp.getInitialProps = undefined;
export default SignUp;