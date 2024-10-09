import SignInPage, { getServerSideProps as SignInPageGetServerSideProps } from "activation/signin";
const SignIn = SignInPage;
export const getServerSideProps = SignInPageGetServerSideProps;
// @ts-expect-error фикс ошибки билда
SignIn.getInitialProps = undefined;
export default SignIn;
